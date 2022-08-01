import { Selector, Role } from "testcafe";

fixture `404`
  .page("./totally-bogus-page-url");

test('404 Page Loads if route does not exist', async t => {
  const errorHeading = await Selector('h1').withText("Page not found");

  await t.expect(errorHeading.exists).ok();
});