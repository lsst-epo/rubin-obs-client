# App Router Implementation

The homepage can be found at `/[locale]/page.tsx`, and subsequent pages at `/[locale]/[...uriSegements]/page.tsx`, and their supporting `layout.tsx` files. In the layouts, Next.js's `generateMetadata()` function, which is the primary mechanism for configuring Open Graph, can be found in both layouts.

In `/[locale]/[...uriSegements]/page.tsx`, a section map containing page templates is evaluated and a template or page component is added to page. These templates or pages may contain factories for building out content blocks.