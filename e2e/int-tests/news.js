import { Selector } from "testcafe";

const targetLoadTime = 10000;

fixture`News`.page`./news`;

test("Page Loads", async (t) => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has News Grid Items", async (t) => {
  const newsItemsCount = await Selector("a").withAttribute("class", /news/)
    .count;

  await t.expect(newsItemsCount).gte(1);
});
