import { NextIntlClientProvider } from "next-intl";
import Breadcrumbs from ".";
import { mount } from "cypress/react18";
import { fallbackLng } from "@/lib/i18n/settings";
import { ListItem } from "schema-dts";

const items: Array<InternalLink> = [
  { id: "1", title: "News", uri: "news" },
  { id: "2", title: "Some article", uri: "news/some-article" },
];

describe("<Breadcrumbs>", () => {
  it("generates an ordered list within a nav element", () => {
    mount(
      <NextIntlClientProvider locale={fallbackLng}>
        <Breadcrumbs breadcrumbs={items} />
      </NextIntlClientProvider>
    );

    cy.get("nav > ol > li").should("have.length", items.length);
  });
  it("add links for each breadcrumb", () => {
    mount(
      <NextIntlClientProvider locale={fallbackLng}>
        <Breadcrumbs breadcrumbs={items} />
      </NextIntlClientProvider>
    );

    cy.get("nav > ol > li > a").each((element, i) => {
      expect(element.attr("href")).to.contain(items[i].uri);
      expect(element.text()).to.eq(items[i].title);
    });
  });
  it("tags the last link in the list as the current page", () => {
    mount(
      <NextIntlClientProvider locale={fallbackLng}>
        <Breadcrumbs breadcrumbs={items} />
      </NextIntlClientProvider>
    );

    cy.get("nav > ol > li > a")
      .last()
      .then((element) => {
        expect(element).to.have.attr("aria-current", "page");
      });
  });
  it("has some structured data", () => {
    mount(
      <NextIntlClientProvider locale={fallbackLng}>
        <Breadcrumbs breadcrumbs={items} />
      </NextIntlClientProvider>
    );

    cy.get("script")
      .should("exist")
      .should((element) => {
        const json = JSON.parse(element.text());

        expect(json["@type"]).to.eq("BreadcrumbList");
        expect(json.itemListElement.length).to.eq(items.length);

        json.itemListElement.forEach((item: ListItem, i: number) => {
          expect(item.name).to.eq(items[i].title);
          expect(item.item).to.contain(items[i].uri);
        });
      });
  });
});
