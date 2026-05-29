# API

There are different API calls happening here, of note:

- `entries.js` will map Craft CMS section handles, like `news` to the correct GQL fragment
- `summitData.js` will query the Hasura federated API and is called from the [SummitDataProvider](/contexts/SummitData.js)
- `auth.js` calls the OAuth interfaces in the Craft CMS GQL API
- `metadata/index.ts` contains the GQL query that retrieves the data that gets fed into Next.js's `generateMetadata()` function in `{root}/app/[locale]/[...uriSegments]/layout.tsx`. This is the data that transforms into `<meta>` tags for Open Graph.
- (to-do: flesh out more)