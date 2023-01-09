import { Selector } from "testcafe";

const targetLoadTime = 10000;

fixture`Slideshows`.page`./gallery/slideshows`;

test("Page Loads", async (t) => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has Slideshows", async (t) => {
  const slideshowsCount = await Selector("a").withAttribute(
    "class",
    /slideshows/
  ).count;

  await t.expect(slideshowsCount).gte(1);
});
