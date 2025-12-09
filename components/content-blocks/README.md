# Content Blocks

The content blocks map 1:1 to Craft CMS content blocks and are created on the page via the [Content Block Factory](../factories/ContentBlockFactory.js), for example in the [homepage](/components/templates/HomePage/index.tsx).

Typically the content blocks are returned from the entry query and looped over where the output of the content block factory is added to the page.

In the case of the homepage, the query that gets the content blocks is defined [here in the getHomepage() function](/lib/api/homepage/index.ts).

Bear in mind that if you have created a brand new content block, or modify an existing block, you will need to run `yarn codegen:gql` for the generated queries and types to be created.

## Barrel Importing

`/components/content-blocks/index.js` does barrel importing, so when adding new content blocks ensure you import/export them from the `index.js`.