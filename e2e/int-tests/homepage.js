import { Selector, Role } from "testcafe";

const targetLoadTime = 10000;

fixture `Homepage`;

test("Page Loads", async t => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has News Items", async t => {

  const newsHeading = await Selector("h2").withText("News");

  await t.expect(Selector(newsHeading.nextSibling("ul"), { timeout: targetLoadTime }).childElementCount).gte(1);
});

test("Has Slideshow", async t => {
  await t.expect(Selector(".flickity-slider", { timeout: 12000 }).childElementCount).gte(1);
});

// .timeouts({
//     pageLoadTimeout:    2000,
//     pageRequestTimeout: 60000,
//     ajaxRequestTimeout: 60000,
// });