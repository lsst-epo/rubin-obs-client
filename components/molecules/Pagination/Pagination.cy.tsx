import { mount } from "cypress/react18";
import Pagination from ".";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import I18NextClientProvider from "@/contexts/i18next";

describe("<Pagination>", () => {
  it("renders to page", () => {
    const searchParams = new URLSearchParams({ page: "2" });
    const limit = 30;
    const offset = 30;
    const page = 2;
    const total = 90;

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={limit} offset={offset} page={page} total={total} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.viewport(1440, 900);
    cy.contains("Showing 31 to 60 of 90");
    cy.get("ul").should("exist");
    cy.get(':nth-child(3) > [rel="prev"]').should(
      "have.attr",
      "href",
      "?page=1"
    );
    cy.get(':nth-child(3) > [rel="next"]').should(
      "have.attr",
      "href",
      "?page=3"
    );
  });
  it("should not have a previous button when on the first page", () => {
    const searchParams = new URLSearchParams({ page: "1" });
    const limit = 30;
    const offset = 0;
    const page = 1;
    const total = 90;

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={limit} offset={offset} page={page} total={total} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.viewport(1440, 900);
    cy.get(':nth-child(3) > [rel="prev"]').should("not.exist");
  });
  it("should not have a next button when on the last page", () => {
    const searchParams = new URLSearchParams({ page: "3" });
    const limit = 30;
    const offset = 60;
    const page = 3;
    const total = 90;

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={limit} offset={offset} page={page} total={total} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.viewport(1440, 900);
    cy.get(':nth-child(3) > [rel="next"]').should("not.exist");
  });
  it("renders less than 10 pages", () => {
    const searchParams = new URLSearchParams({ page: "1" });
    const limit = 30;
    const offset = 0;
    const page = 1;
    const total = 60;
    const paginationElements: string[] = [];

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={limit} offset={offset} page={page} total={total} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.get("ul > li").should("have.length", 2);
    cy.get("ul > li").each(($element) =>
      paginationElements.push($element.text())
    );
    cy.wrap(paginationElements).should("deep.equal", ["1", "2"]);
  });
  it("renders exactly 10 pages", () => {
    const searchParams = new URLSearchParams({ page: "1" });
    const limit = 30;
    const offset = 0;
    const page = 1;
    const total = 300;
    const paginationElements: string[] = [];

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={limit} offset={offset} page={page} total={total} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.get("ul > li").should("have.length", 10);
    cy.get("ul > li").each(($element) =>
      paginationElements.push($element.text())
    );
    cy.wrap(paginationElements).should("deep.equal", [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ]);
  });

  describe("renders greater than 10 pages", () => {
    it("should have ellipses as second-to-last item when current page at the start of the page range", () => {
      const searchParams = new URLSearchParams({ page: "1" });
      const limit = 30;
      const offset = 0;
      const page = 1;
      const total = 330;
      const paginationElements: string[] = [];

      mount(
        <I18NextClientProvider locale="en">
          <SearchParamsContext.Provider value={searchParams}>
            <Pagination
              limit={limit}
              offset={offset}
              page={page}
              total={total}
            />
          </SearchParamsContext.Provider>
        </I18NextClientProvider>
      );

      cy.get("ul > li").should("have.length", 10);
      cy.get("ul > li").each(($element) =>
        paginationElements.push($element.text())
      );
      cy.wrap(paginationElements).should("deep.equal", [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "...",
        "11",
      ]);
      cy.get(':nth-child(3) > [rel="prev"]').should("not.exist");
      cy.get(':nth-child(3) > [rel="next"]').should(
        "have.attr",
        "href",
        "?page=2"
      );
    });
    it("should have ellipses as second and second-to-last item when current page in the middle of the page range", () => {
      const searchParams = new URLSearchParams({ page: "15" });
      const limit = 30;
      const offset = 0;
      const page = 15;
      const total = 900;
      const paginationElements: string[] = [];

      mount(
        <I18NextClientProvider locale="en">
          <SearchParamsContext.Provider value={searchParams}>
            <Pagination
              limit={limit}
              offset={offset}
              page={page}
              total={total}
            />
          </SearchParamsContext.Provider>
        </I18NextClientProvider>
      );

      cy.get("ul > li").should("have.length", 10);
      cy.get("ul > li").each(($element) =>
        paginationElements.push($element.text())
      );
      cy.wrap(paginationElements).should("deep.equal", [
        "1",
        "...",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "...",
        "30",
      ]);
      cy.get(':nth-child(3) > [rel="prev"]').should(
        "have.attr",
        "href",
        "?page=14"
      );
      cy.get(':nth-child(3) > [rel="next"]').should(
        "have.attr",
        "href",
        "?page=16"
      );
    });
    it("should have ellipses as second item when current page at the end of the page range", () => {
      const searchParams = new URLSearchParams({ page: "27" });
      const limit = 30;
      const offset = 0;
      const page = 27;
      const total = 900;
      const paginationElements: string[] = [];

      mount(
        <I18NextClientProvider locale="en">
          <SearchParamsContext.Provider value={searchParams}>
            <Pagination
              limit={limit}
              offset={offset}
              page={page}
              total={total}
            />
          </SearchParamsContext.Provider>
        </I18NextClientProvider>
      );

      cy.get("ul > li").should("have.length", 10);
      cy.get("ul > li").each(($element) =>
        paginationElements.push($element.text())
      );
      cy.wrap(paginationElements).should("deep.equal", [
        "1",
        "...",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ]);
      cy.get(':nth-child(3) > [rel="prev"]').should(
        "have.attr",
        "href",
        "?page=26"
      );
      cy.get(':nth-child(3) > [rel="next"]').should(
        "have.attr",
        "href",
        "?page=28"
      );
    });
  });
});
