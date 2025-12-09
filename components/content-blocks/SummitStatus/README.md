# Summit Status

The summit status component deviates quite a bit from the usual content block workflow:

- For one, data is not fetched from Craft, but from the Hasura federated query API.
- Also, despite being dynamically fetched it is not rendered in a [<DataList>](/components/dynamic/DataList/index.js) nor [<GridBox>](/components/content-blocks/GridBlock/index.js), but either in a [<WidgetPreview>](/components/layout/WidgetGrid/), [<WidgetGrid>](/components/layout/WidgetGrid/), or in the "compact view" homepage widget container.
- There is also a dedicated [SummitDataProvider](/contexts/SummitData.js) that will soon run only on the client