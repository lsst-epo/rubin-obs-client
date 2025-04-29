import { mount } from "cypress/react18";
import Pagination from ".";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import I18NextClientProvider from "@/contexts/i18next";

const limit = 30;
const offset = 30;
const page = 2;
const total = 90;

describe(
  "<Pagination>",
  {
    viewportHeight: 1440,
    viewportWidth: 900,
  },
  () => {
    it("renders to page", () => {
      const searchParams = new URLSearchParams({ page: page.toString() });

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

      cy.contains("Showing 31 to 60 of 90");
      cy.get("ul").should("exist");
      cy.get('[rel="prev"]').should("exist");
      cy.get('[rel="next"]').should("exist");
    });
    it("should not have a clickable previous button when on the first page", () => {
      const page = 1;
      const searchParams = new URLSearchParams({
        sort: "asc",
        type: "image",
        page: page.toString(),
      });

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

      cy.get('[rel="prev"]').should("not.exist");
      cy.get('[rel="next"]').each(($element) => {
        expect($element)
          .to.have.attr("href")
          .match(/page=2/);
      });
    });
    it("should have clickable next and previous buttons when on a page in the middle of the range", () => {
      const searchParams = new URLSearchParams({ page: page.toString() });

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

      cy.get('[rel="prev"]').each(($element) => {
        expect($element)
          .to.have.attr("href")
          .match(/page=1/);
      });
      cy.get('[rel="next"]').each(($element) => {
        expect($element)
          .to.have.attr("href")
          .match(/page=3/);
      });
    });
    it("should not have a clickable next button when on the last page", () => {
      const page = 3;
      const offset = 60;
      const searchParams = new URLSearchParams({ page: page.toString() });

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

      cy.get('[rel="prev"]').each(($element) => {
        expect($element)
          .to.have.attr("href")
          .match(/page=2/);
      });
      cy.get('[rel="next"]').should("not.exist");
    });
    it("renders less than 10 pages", () => {
      const searchParams = new URLSearchParams({ page: page.toString() });
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

      cy.get("ul > li").should("have.length", 3);
      cy.get("ul > li").each(($element) =>
        paginationElements.push($element.text())
      );
      cy.wrap(paginationElements).should("deep.equal", ["1", "2", "3"]);
    });
    it("renders exactly 10 pages", () => {
      const offset = 0;
      const total = 300;
      const searchParams = new URLSearchParams({ page: page.toString() });
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
        "9",
        "10",
      ]);
    });

    describe("renders greater than 10 pages", () => {
      const limit = 30;
      const offset = 0;
      const page = 1;
      const total = 900;

      it("should have ellipses as second-to-last item when current page at the start of the page range", () => {
        const searchParams = new URLSearchParams({ page: page.toString() });

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
        cy.get("ul > li").eq(8).contains("...");
      });
      it("should have ellipses as second and second-to-last item when current page in the middle of the page range", () => {
        const page = 15;
        const searchParams = new URLSearchParams({ page: page.toString() });

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
        cy.get("ul > li").eq(1).contains("...");
        cy.get("ul > li").eq(8).contains("...");
      });
      it("should have ellipses as second item when current page at the end of the page range", () => {
        const page = 27;
        const searchParams = new URLSearchParams({ page: page.toString() });

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
        cy.get("ul > li").eq(1).contains("...");
      });
    });
  }
);
