import { graphql } from "@/gql";

const CalloutMain = graphql(`
  fragment CalloutMain on callouts_callout_Entry {
    backgroundColor
    dynamicComponent
    header
    cantoAssetSingle {
      ...CantoAssetMetadata
    }
    links {
      ...LinksFragment
    }
    padImage
    order
    ratio
    text
    calloutType: typeHandle
    width
  }
`);

export default CalloutMain;
