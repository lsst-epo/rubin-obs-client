# `notFound()` handling pattern

No—not for the same underlying “does this entry exist?” decision.

Three `notFound()` calls are not inherently wrong when each protects a different resource. Here, however, the layout and page independently query the same entry, implement slightly different fallback rules, and can disagree. That duplication caused the current bug.

A better separation is:

- `page.tsx` owns entry existence, locale fallback, and `notFound()`.
- `generateMetadata()` returns empty/default metadata when metadata is unavailable.
- A shared loader owns the lookup and fallback rules so both consumers resolve the entry consistently.

For example:

```ts
async function resolveEntry(uri: string, requestedLocale: string) {
  let resolvedLocale = requestedLocale;
  let entrySectionType = await getEntrySectionByUri(uri, resolvedLocale);

  if (!entrySectionType && requestedLocale !== "en") {
    resolvedLocale = "en";
    entrySectionType = await getEntrySectionByUri(uri, resolvedLocale);
  }

  return {
    entrySectionType,
    resolvedLocale,
  };
}
```

Then the page makes the authoritative decision:

```ts
const { entrySectionType, resolvedLocale } =
  await resolveEntry(uri, locale);

if (!entrySectionType) {
  notFound();
}

const data = await getEntryDataByUri(
  uri,
  entrySectionType.sectionHandle,
  entrySectionType.typeHandle,
  resolvedLocale
);

if (!data?.id && !data?.entry?.id) {
  notFound();
}
```

Those two page-level checks are defensible because they verify different stages:

1. The URI can be resolved to an entry type.
2. The full entry data actually exists and is usable.

For metadata, avoid turning missing metadata into a 404:

```ts
export async function generateMetadata(...) {
  const { entrySectionType, resolvedLocale } =
    await resolveEntry(uri, locale);

  if (!entrySectionType) {
    return {};
  }

  const metadata = await getEntryMetadataByUri(uri, resolvedLocale);

  if (!metadata?.entry) {
    return {};
  }

  // Build metadata...
}
```

An even cleaner design would use one cached loader that returns section/type, full entry data, and the resolved locale. React’s `cache()` can deduplicate calls made by `generateMetadata()` and the page during a render.

One caution: `generateMetadata()` may legitimately call `notFound()` when metadata lookup is also the canonical existence lookup. But if you adopt that pattern, it should use the exact same shared resolver and fallback behavior as the page. In this codebase, making the page authoritative and treating metadata as optional is simpler and less error-prone.

## Where to display a “page not translated” message

Resolving the fallback in `app/[locale]/[...uriSegments]/page.tsx` makes sense because that route is the first shared component that knows both:

- the locale requested in the URL; and
- the locale from which the entry was actually loaded.

However, passing a boolean such as `isNotTranslated` into every page template is not the best boundary. It couples every template to routing and fallback behavior, creates repetitive rendering code, and makes it easy for one template to omit or implement the notice differently.

Instead, have the catch-all page render one shared notice as a sibling of the selected template:

```tsx
const result = await resolveEntry(uri, locale);

if (!result.entrySectionType) {
  notFound();
}

const isLocaleFallback = result.resolvedLocale !== locale;

return (
  <>
    {isLocaleFallback && (
      <TranslationFallbackNotice
        requestedLocale={locale}
        contentLocale={result.resolvedLocale}
      />
    )}
    <Template
      section={section}
      breadcrumbs={breadcrumbs}
      data={data}
      locale={locale}
      contentLocale={result.resolvedLocale}
      searchParams={searchParams}
    />
  </>
);
```

The distinction between `locale` and `contentLocale` is useful:

- `locale` is the requested UI/URL locale. It can continue to control the header, footer, navigation, and translated interface labels.
- `contentLocale` is the language of the loaded CMS entry. Use it for content semantics such as an article's `inLanguage`, structured data, and any content-specific follow-up queries.
- `isLocaleFallback` is derived from those values rather than stored as another independent piece of state.

If the banner needs a consistent container or placement, introduce a route-level wrapper such as `ResolvedEntryPage` or `EntryPageShell`:

```tsx
<EntryPageShell
  requestedLocale={locale}
  contentLocale={resolvedLocale}
>
  <Template {...templateProps} />
</EntryPageShell>
```

This wrapper can own the fallback notice and accessibility details while templates remain focused on presenting their entry types.

Putting this behavior in `app/[locale]/layout.tsx` or `PageWrapper` would be too high in the component tree. Those components wrap routes that may not load CMS entries at all, and a parent layout cannot receive the resolved fallback locale from its child. It would have to perform another lookup or introduce broader request state, recreating the duplication that caused the `notFound()` problem.

Therefore, the recommended ownership is:

1. A shared cached resolver determines `requestedLocale`, `resolvedLocale`, entry type, and entry data.
2. The catch-all page calls `notFound()` when the entry truly does not exist.
3. A route-level `EntryPageShell` displays the fallback notice once.
4. Templates receive `contentLocale` only when they need to format or query content according to its actual language.
5. `generateMetadata()` uses the same resolver and `resolvedLocale`, but does not own the visual notice.

This keeps the decision close to routing, the message consistent across entry types, and locale semantics explicit without pushing route-specific behavior into the global layout.
