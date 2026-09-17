# NOIRLab API Service

We make use of the NOIRLab public OpenAPI API to ingest press releases, news articles and media assets and display them on our site in our branding. This directory is an almost fully generated client for the NOIRLab API, with the exception of a manually written interceptor layer to handle media asset caching.

## The NOIRLab API spec
…


## The generated hey-api client
At the root of this project, there is an `openapi-ts.config.ts` config file which points to the publicly hosted NOIRLab API spec and uses it as input to generate the contents of the `schema/` folder in this directory. 

`index.ts`: Initializes the client, attaches the interceptors to the client, and re-exports the generated types and services. 

### schema/
`client.gen.ts`: Creates and exports the pre-configured hey-api HTTP client.

`types.gen.ts`: Generated TypeScript types and interfaces derived from the NOIRLab API spec — request shapes, response shapes, path/query parameters, etc.

`sdk.gen.ts`: Typed service classes exposing API methods grouped by domain
   
`schemas.gen.ts`: JSON Schema definitions generated from the NOIRLab API spec, used for validation.
   
`zod.gen.ts`: Zod validators auto-generated from the NOIRLab API spec, providing runtime type-safe parsing of API responses.
   
`transformers.gen.ts`: Converts release_date strings from the Blog Posts API into JavaScript Date objects after the raw API response is received.
   
`index.ts`: Barrel file re-exporting everything from types.gen and sdk.gen.

### interceptors/
...
