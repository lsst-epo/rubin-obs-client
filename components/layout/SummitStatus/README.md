# Summit Status Widget Layouts
Currently the only widgets on the website are the summit status dashboard widgets (aside from the first look overlay "widget" video.)

It's possible at some point we may refactor out these layouts and genericize them to be of use to other widget types, but for now they are very specific to the summit status dashboard widgets.

## Organization
There are some stubbed out UI elements for the "full" view of the summit status dashboard page, but they currently exist as homepage "compact" view components. The `<WidgetContainer>` wraps all of the compact view widgets. Each widget is displayed within a column and row of the `<WidgetGrid>`. The individual widget is wrapped in a `<WidgetSection>` component. The `<WidgetPreview>` layout is intended to be used in the "full" view page.