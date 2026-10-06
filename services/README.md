# Services

The `/services/` folder contains modules that interact with external systems or provide specific application-wide features. It acts as an abstraction layer for:

- Triggering actions for ending preview mode or for revalidation.
- Defining GraphQL fragments for interactions with Craft CMS for content.
- Providing utilities for interacting with Noirlab-specific APIs or services.
- Managing page revalidation.
- Handling session-related data, particularly for preview functionalities.

## Adding a New Content Block
After adding a new content block in Craft, you can run `yarn codegen:gql` to generate the new type associated with it. The new type definition will automatically update some files in the`/gql/` folder. However, some manual changes in this folder are required to complete hooking up the new content block to the client. 

1. In `/services/craft/entries/content-blocks/`, add a new file with a GraphQL query corresponding to the new content block and any of its fields you want to query.
2. `/services/craft/entries/content-blocks/ContentBlocks`, add your new content block's fragment to the overarching, holisitic `ContentBlock` fragment.
3. Regenerate your types to get a `FragmentDoc` generated for your type. This change will show in the `/gql/` folder, not here. This can be used for type inference of props when fragment masking, which requires colocating the data requirements of UI components with said components.

And you're all set with the `/services/` folder. You'll need to make updates to `/lib/api/fragments/content-blocks.js` and in the `ContentBlockFactory` as well.

## Notes regarding tests for...

### sessions/preview.ts

- `next/headers` is mocked because `cookies()` and `draftMode()` only work inside a Next request scope.
- `draft()` isn't exported, so the `draftMode()` error branch is covered through `token()`.

### actions/revalidate.ts

- `env` is mocked because `.env` is gitignored and `createEnv` throws on missing variables in CI.
- `redirect` from `next/navigation` is mocked because the real one throws to halt execution.

### revalidation/*

- `env` is mocked for the same reason as in `actions/revalidate.test.ts`. `index.ts` and `indexNow.ts` read it into module-level constants, so those tests use `vi.resetModules()` and a dynamic `import()` to apply a different env per test.
- `index.ts`: `getPathname` from `@/lib/i18n/navigation` is replaced with a stand-in, because the real one can't load under Vitest. `next-intl` imports `next/navigation` without a file extension, which Node's ESM resolution rejects. The path tests therefore cover what `index.ts` passes to `getPathname` and how it builds the `href`, not next-intl's own locale prefixing. A change in next-intl's behavior wouldn't be caught here.
- `additional.ts`: `parts = ["gallery"]` with no slug calls `revalidateTag("gallery")` twice, because `parts.pop()` returns the section itself. The tag Set dedupes the result, so tests don't assert on call counts.
- As in `helpers/noirlab.ts`, `"server-only";` at the top of these files is a bare string and has no effect. It should be `import "server-only";`.

### noirlab/*

- `env` is mocked for the same reason as in `actions/revalidate.test.ts`.
- `interceptors/request.ts`: tests run in the `node` environment (via a docblock), because `isServer` is a module-level constant and the global `jsdom` environment defines `window`. The interceptor mutates the request options and returns nothing, per the hey-api `ReqInterceptor` type, so tests assert on the mutated options.
- `index.ts` has no tests. It only registers interceptors on the client, and a test that mocks the client would restate the code. A real request through the client with a stubbed `fetch` would be the meaningful test.
- `schema/*.gen.ts` is generated and excluded from coverage.

### craft/globals/logos.ts

- `getImageProps` from `next/image` is mocked to echo its arguments, so the tests assert on the values the logos are built from.
- The test for the small image is commented out because it exposes a bug: the `if (logoSmall)` branch builds the small image from `logoLarge`'s `url`, `width` and `height` instead of `logoSmall`'s. Fixing the code was beyond the scope of adding tests.
- An empty `logoLarge` array passes the schema (the `v[0]` transform runs after the type check) and then throws on `logoLarge.url`. This is not tested.

### craft/globals/organization.ts

- `useFragment` from `@/gql` is replaced with a function that returns its data unchanged, because fragment masking only narrows types and does nothing at runtime. `getLogos`, `getSocials` and `getGlobalData` are mocked, since each has its own tests or is outside this folder.
- The test for `sameAs` is commented out because it exposes a bug: `Object.values(socials)` includes `__typename` and `email`, so `sameAs` contains `"siteInfo_GlobalSet"` and the email address as well as the social profile urls. Fixing the code was beyond the scope of adding tests.

### craft/globals/* (contactForm, footer, socials, rootPages)

- `queryAPI`, `getLocale` and the `graphql` helper from `@/gql` are mocked. The query document is only passed through to `queryAPI`, and `getLocale` needs a request scope. For `rootPages`, `useFragment` returns its data unchanged, because fragment masking only narrows types.
- The `globals` tag test in each file guards a cross-module contract: `revalidation/additional.ts` revalidates `tags.globals`, so a request without the tag would never be refreshed.
- `rootPages.ts` has no `globals` tag, unlike the other global sets, so revalidating `globals` won't refresh it.
