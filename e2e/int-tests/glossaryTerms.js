import { Selector } from "testcafe";

const targetLoadTime = 10000;

fixture`Glossary Terms`.page`./education/glossary`;

test("Page Loads", async (t) => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has Glossary Terms", async (t) => {
  const voicesCount = await Selector("a").withAttribute(
    "class",
    /glossaryTerms/
  ).count;

  await t.expect(voicesCount).gte(1);
});
