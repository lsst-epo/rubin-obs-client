import { Selector } from "testcafe";

const targetLoadTime = 10000;

fixture`Rubin Voices`.page`./explore/voices/all-rubin-voices`;

test("Page Loads", async (t) => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has Voices Grid", async (t) => {
  const voicesCount = await Selector("a").withAttribute(
    "class",
    /staffProfiles/
  ).count;

  await t.expect(voicesCount).gte(1);
});
