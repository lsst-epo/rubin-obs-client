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