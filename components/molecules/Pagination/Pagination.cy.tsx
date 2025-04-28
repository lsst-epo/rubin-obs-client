import { mount } from "cypress/react18";
import Pagination from ".";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import I18NextClientProvider from "@/contexts/i18next";

describe("<Pagination>", () => {
  it("renders to page", () => {
    const searchParams = new URLSearchParams({ page: "1" });

    mount(
      <I18NextClientProvider locale="en">
        <SearchParamsContext.Provider value={searchParams}>
          <Pagination limit={30} offset={0} page={1} total={495} />
        </SearchParamsContext.Provider>
      </I18NextClientProvider>
    );

    cy.get("ul").should("exist");
  });
});
