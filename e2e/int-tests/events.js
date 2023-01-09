import { Selector } from "testcafe";

const targetLoadTime = 10000;

fixture`Events`.page`./calendar?page=1&type=past`;

test("Page Loads", async (t) => {
  const errorHeading = await Selector("h1").withText("Page not found");

  await t.expect(errorHeading.exists).notOk();
});

test("Has Upcoming Events List", async (t) => {
  const eventsItemsCount = await Selector("a").withAttribute("class", /events/)
    .count;

  await t.expect(eventsItemsCount).gte(1);
});
