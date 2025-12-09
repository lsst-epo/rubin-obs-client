# API

There are different API calls happening here, of note:

- `entries.js` will map Craft CMS section handles, like `news` to the correct GQL fragment
- `summitData.js` will query the Hasura federated API and is called from the [SummitDataProvider](/contexts/SummitData.js)
- `auth.js` calls the OAuth interfaces in the Craft CMS GQL API
- (to-do: flesh out more)