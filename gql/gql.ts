/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  "\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n":
    types.PagePreviewQueryDocument,
  '\n    query RecentAssetsQuery(\n      $site: [String]\n      $uri: [String]\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(whereIn: { key: "scheme", values: $scheme }) {\n            id\n          }\n        }\n      }\n    }\n  ':
    types.RecentAssetsQueryDocument,
  '\n    query GalleryTitleQuery(\n      $site: [String]\n      $uri: [String]\n      $id: String\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          assetAlbum(\n            whereIn: { key: "scheme", values: $scheme }\n            where: { key: "id", value: $id }\n          ) {\n            additional {\n              TitleEN\n              TitleES\n            }\n            id\n            name\n          }\n        }\n      }\n    }\n  ':
    types.GalleryTitleQueryDocument,
  '\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: "id", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            keyword\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  ':
    types.GalleryImageQueryDocument,
  '\n    query RandomAssetQuery($site: [String], $scheme: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          slug\n          assetAlbum(\n            random: 1\n            whereNotIn: { key: "scheme", values: $scheme }\n          ) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  ':
    types.RandomAssetQueryDocument,
  '\n    query LinkedPosts($site: [String], $id: String) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          id\n          uri\n          title\n          sidebarAssets(type: "associatedAsset") {\n            ... on sidebarAssets_associatedAsset_BlockType {\n              __typename\n              asset(where: { key: "id", value: $id }) {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  ':
    types.LinkedPostsDocument,
  '\n    query GalleryForAsset($site: [String], $id: String) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          slug\n          assetAlbum(where: { key: "id", value: $id }) {\n            id\n          }\n        }\n      }\n    }\n  ':
    types.GalleryForAssetDocument,
  '\n    query MainGalleryQuery($site: [String]) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          isVisible\n          galleryEntry {\n            ... on galleries_gallery_Entry {\n              __typename\n              slug\n            }\n          }\n          slideshowEntry {\n            ... on slideshows_slideshow_Entry {\n              __typename\n              id\n              uri\n              title\n              richTextDescription\n              images: representativeAssetVariant {\n                ... on assetVariants_Asset {\n                  __typename\n                  altText\n                  width\n                  height\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n      slideshowsMain: pagesEntries(site: $site, slug: "slideshows") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n        }\n      }\n    }\n  ':
    types.MainGalleryQueryDocument,
  "\n    query AllGalleries($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          id\n          uri\n          slug\n        }\n      }\n    }\n  ":
    types.AllGalleriesDocument,
  "\n    query AllGallerySlugs($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  ":
    types.AllGallerySlugsDocument,
  '\n    query GalleryMetadataQuery(\n      $site: [String]\n      $slug: [String]\n      $uri: [String]\n    ) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          galleryEntry(slug: $slug) {\n            ... on galleries_gallery_Entry {\n              id\n            }\n          }\n        }\n      }\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          slug\n          title\n          description\n          cantoAssetSingle {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n          assetAlbum(first: true) {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n        }\n      }\n    }\n  ':
    types.GalleryMetadataQueryDocument,
  "\n    query GalleryQuery(\n      $site: [String]\n      $uri: [String]\n      $whereIn: [WhereInFiltersInput]\n      $whereNotIn: [WhereNotInFiltersInput]\n      $whereContainsIn: [WhereContainsInFilterInput]\n      $forPage: ForPageInput\n      $sortBy: SortByInput\n      $sortByDesc: SortByDescInput\n    ) {\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          description\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            forPage: $forPage\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n            sortBy: $sortBy\n            sortByDesc: $sortByDesc\n          ) {\n            ...CantoAssetMetadata\n          }\n        }\n      }\n      metaGalleries: galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n          ) {\n            id\n          }\n        }\n      }\n    }\n  ":
    types.GalleryQueryDocument,
  '\n    query MediaPolicyPage($site: [String]) {\n      pagesEntries(site: $site, slug: "media-policy") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n          title\n        }\n      }\n    }\n  ':
    types.MediaPolicyPageDocument,
  '\n    query getNavigationItems($site: [String]) {\n      navigationItems: entries(\n        section: ["pages"]\n        site: $site\n        level: 1\n        isVisible: true\n      ) {\n        id\n        title\n        uri\n        children(isVisible: true) {\n          id\n          title\n          uri\n          children(isVisible: true) {\n            id\n            title\n            uri\n          }\n        }\n      }\n      galleriesEntries(site: $site, isVisible: true) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  ':
    types.GetNavigationItemsDocument,
  "\n    query SearchResultsPage($site: [String]) {\n      searchResultsEntries(site: $site) {\n        ... on searchResults_searchResults_Entry {\n          title\n          id\n          dynamicComponent\n        }\n      }\n    }\n  ":
    types.SearchResultsPageDocument,
  "\n    query NewsSitemapData($site: [String]) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          title\n          uri\n          date\n          dateUpdated\n        }\n      }\n      globalSets(site: $site) {\n        ... on siteInfo_GlobalSet {\n          siteTitle\n        }\n      }\n    }\n  ":
    types.NewsSitemapDataDocument,
  '\n    query ImageSitemapData($site: [String]) {\n      galleries: galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          dateUpdated\n          assetAlbum(\n            whereIn: { key: "scheme", values: ["image", "video", "document"] }\n          ) {\n            id\n            scheme\n            url {\n              directUrlOriginal\n            }\n          }\n        }\n      }\n    }\n  ':
    types.ImageSitemapDataDocument,
  '\n    query SitemapData($site: [String]) {\n      pages: entries(\n        site: $site\n        section: ["pages"]\n        type: ["not", "redirectPage"]\n      ) {\n        uri\n        dateUpdated\n      }\n      homepage: homepageEntries(site: $site) {\n        ... on homepage_homepage_Entry {\n          uri\n          dateUpdated\n        }\n      }\n      staff: staffProfilesEntries(site: $site) {\n        ... on staffProfiles_staffProfiles_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      slideshows: slideshowsEntries(site: $site) {\n        ... on slideshows_slideshow_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      glossary: glossaryTermsEntries(site: $site) {\n        ... on glossaryTerms_glossaryTerm_Entry {\n          dateUpdated\n          uri\n        }\n      }\n    }\n  ':
    types.SitemapDataDocument,
  "\n  fragment accordionGroupBlock on contentBlocks_accordionGroup_BlockType {\n    id\n    typeHandle\n    header\n    backgroundColor\n    accordions: children {\n      ... on contentBlocks_accordion_BlockType {\n        id\n        text\n        header\n      }\n    }\n  }\n":
    types.AccordionGroupBlockFragmentDoc,
  "\n  fragment firstLookWidgetsBlock on contentBlocks_firstLookWidgets_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    filmReel {\n      ... on filmReel_item_BlockType {\n        text\n        share\n      }\n    }\n    firstLookWidget\n  }\n":
    types.FirstLookWidgetsBlockFragmentDoc,
  '\n  fragment imageBlock on contentBlocks_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n    backgroundColor\n  }\n':
    types.ImageBlockFragmentDoc,
  '\n  fragment imageBlockNews on contentBlocksNews_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n  }\n':
    types.ImageBlockNewsFragmentDoc,
  "\n  fragment imageComparisonBlock on contentBlocks_imageComparison_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption: captionRichText\n    images: multipleCantoAssets {\n      ...CantoAssetMetadata\n    }\n  }\n":
    types.ImageComparisonBlockFragmentDoc,
  "\n  fragment linkedImageListBlock on contentBlocks_linkedImageList_BlockType {\n    id\n    typeHandle\n    description\n    header\n    variant: linkedImageListVariant\n    linkedImageList {\n      ... on linkedImageList_linkedImage_BlockType {\n        id\n        image {\n          ...CantoAssetMetadata\n        }\n        link: imageLink {\n          customText\n          target\n          text\n          title\n          type\n          url\n        }\n      }\n    }\n  }\n":
    types.LinkedImageListBlockFragmentDoc,
  "\n  fragment shareBlock on contentBlocks_share_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    shareTitle\n    shareVariant\n    text\n  }\n":
    types.ShareBlockFragmentDoc,
  "\n  fragment skyviewerBlock on contentBlocks_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n":
    types.SkyviewerBlockFragmentDoc,
  "\n  fragment skyviewerNewsBlock on contentBlocksNews_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n":
    types.SkyviewerNewsBlockFragmentDoc,
  "\n  fragment textBlock on contentBlocks_text_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    text\n  }\n":
    types.TextBlockFragmentDoc,
  '\n  fragment videoBlock on contentBlocks_video_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption\n    url: externalUrlTranslatable\n    cantoAsset: videoType\n    fullscreenVideo\n    fullWidth\n    cantoAssets: responsiveAssets {\n      ... on responsiveAssets_asset_BlockType {\n        orientation\n        asset(where: { key: "scheme", value: "video" }) {\n          ...CantoAssetMetadata\n          default {\n            DateUploaded\n          }\n          metadata {\n            MIMEType\n          }\n        }\n      }\n    }\n  }\n':
    types.VideoBlockFragmentDoc,
  "fragment CantoAssetDetailed on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    CaptionEN\n    CaptionES\n    Credit\n    TitleEN\n    TitleES\n  }\n  default {\n    ContentType\n    DateCreated\n    DateModified\n    DateUploaded\n    Size\n  }\n  approvalStatus\n  height\n  id\n  keyword\n  name\n  owner\n  ownerName\n  scheme\n  size\n  smartTags\n  tag\n  time\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n    download\n    metadata\n    preview\n    PNG\n    HighJPG\n  }\n  width\n}":
    types.CantoAssetDetailedFragmentDoc,
  "fragment CantoAssetMetadata on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    TitleEN\n    TitleES\n    CaptionEN\n    CaptionES\n    Credit\n  }\n  height\n  id\n  name\n  scheme\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n  }\n  width\n}":
    types.CantoAssetMetadataFragmentDoc,
  "fragment LinksFragment on links_link_BlockType {\n  mixedLink {\n    ... on linkField_Link {\n      customText\n      text\n      title\n      type\n      url\n      element {\n        uri\n      }\n    }\n  }\n}":
    types.LinksFragmentFragmentDoc,
  'fragment SiteInfoFragment on siteInfo_GlobalSet {\n  language\n  name\n  handle\n  siteTitle\n  siteDescription\n  siteImage {\n    ... on generalImages_Asset {\n      altText\n      width\n      height\n      url @transform(mode: "crop", width: 800)\n    }\n  }\n  contactInfo {\n    ... on contactInfo_mail_BlockType {\n      id\n      text\n      typeHandle\n    }\n    ... on contactInfo_phone_BlockType {\n      id\n      text\n      typeHandle\n    }\n  }\n}':
    types.SiteInfoFragmentFragmentDoc,
  "\n    query getContactForm($set: [String], $site: [String]) {\n      contactForm: globalSet(handle: $set, site: $site) {\n        ... on contactForm_GlobalSet {\n          contactFormTopics {\n            ... on contactFormTopics_topic_BlockType {\n              id\n              value: topicValue\n              label: topicLabel\n            }\n          }\n        }\n      }\n    }\n  ":
    types.GetContactFormDocument,
  '\n    query getFooter($set: [String], $site: [String]) {\n      footer: globalSet(handle: $set, site: $site) {\n        ... on footer_GlobalSet {\n          id\n          name\n          handle\n          links {\n            ...LinksFragment\n          }\n          colophon\n          supportersLogos {\n            ... on generalImages_Asset {\n              altText\n              width\n              height\n              url @transform(mode: "fit", width: 1000)\n            }\n          }\n          supportersLogosAlt\n        }\n      }\n    }\n  ':
    types.GetFooterDocument,
  "\n    query getLogos($set: [String], $site: [String]) {\n      siteInfo: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          __typename\n          logoLarge {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n          logoSmall {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n        }\n      }\n    }\n  ":
    types.GetLogosDocument,
  "\n  fragment rootPageInfoFragment on rootPageInformation_GlobalSet {\n    name\n    handle\n    customBreadcrumbs {\n      ... on customBreadcrumbs_ancestorsAndRoot_BlockType {\n        header\n        pageEntry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  }\n":
    types.RootPageInfoFragmentFragmentDoc,
  "\n    query getRootPages($site: [String], $set: [String]) {\n      rootPages: globalSet(handle: $set, site: $site) {\n        ...rootPageInfoFragment\n      }\n    }\n  ":
    types.GetRootPagesDocument,
  "\n    query getSocials($set: [String], $site: [String]) {\n      socials: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          email\n          facebook\n          instagram\n          linkedIn\n          twitter\n          youTube\n        }\n      }\n    }\n  ":
    types.GetSocialsDocument,
  '\n    query RelatedInvestigation($site: [String], $ids: [QueryArgument]) {\n      investigation: entry(type: "investigation", landingPage: $ids, site: $site) {\n        sectionHandle\n        ... on investigations_investigation_Entry {\n          uri\n          title\n          duration: plainText\n          typeHandle\n          externalUrl: externalUrlTranslatable\n          status: investigationStatus\n          landingPage {\n            ... on pages_investigationLandingPage_Entry {\n              id\n              uri\n              title\n            }\n          }\n          \n        }\n      }\n    }\n  ':
    types.RelatedInvestigationDocument,
  '\n    query GetSiblings(\n      $uri: [String]\n      $site: [String]\n      $parentId: Int\n      $level: Int\n    ) {\n      siblings: entry(uri: $uri, site: $site) {\n        prev(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n        next(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n      }\n    }\n  ':
    types.GetSiblingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n"
): (typeof documents)["\n  query PagePreviewQuery($site: [String], $uri: [String]) {\n    entry(site: $site, uri: $uri) {\n      __typename\n      uri\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query RecentAssetsQuery(\n      $site: [String]\n      $uri: [String]\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(whereIn: { key: "scheme", values: $scheme }) {\n            id\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query RecentAssetsQuery(\n      $site: [String]\n      $uri: [String]\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(whereIn: { key: "scheme", values: $scheme }) {\n            id\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GalleryTitleQuery(\n      $site: [String]\n      $uri: [String]\n      $id: String\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          assetAlbum(\n            whereIn: { key: "scheme", values: $scheme }\n            where: { key: "id", value: $id }\n          ) {\n            additional {\n              TitleEN\n              TitleES\n            }\n            id\n            name\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query GalleryTitleQuery(\n      $site: [String]\n      $uri: [String]\n      $id: String\n      $scheme: [String]\n    ) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          assetAlbum(\n            whereIn: { key: "scheme", values: $scheme }\n            where: { key: "id", value: $id }\n          ) {\n            additional {\n              TitleEN\n              TitleES\n            }\n            id\n            name\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: "id", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            keyword\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: "id", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            keyword\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query RandomAssetQuery($site: [String], $scheme: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          slug\n          assetAlbum(\n            random: 1\n            whereNotIn: { key: "scheme", values: $scheme }\n          ) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query RandomAssetQuery($site: [String], $scheme: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          slug\n          assetAlbum(\n            random: 1\n            whereNotIn: { key: "scheme", values: $scheme }\n          ) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query LinkedPosts($site: [String], $id: String) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          id\n          uri\n          title\n          sidebarAssets(type: "associatedAsset") {\n            ... on sidebarAssets_associatedAsset_BlockType {\n              __typename\n              asset(where: { key: "id", value: $id }) {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query LinkedPosts($site: [String], $id: String) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          id\n          uri\n          title\n          sidebarAssets(type: "associatedAsset") {\n            ... on sidebarAssets_associatedAsset_BlockType {\n              __typename\n              asset(where: { key: "id", value: $id }) {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GalleryForAsset($site: [String], $id: String) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          slug\n          assetAlbum(where: { key: "id", value: $id }) {\n            id\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query GalleryForAsset($site: [String], $id: String) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          slug\n          assetAlbum(where: { key: "id", value: $id }) {\n            id\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query MainGalleryQuery($site: [String]) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          isVisible\n          galleryEntry {\n            ... on galleries_gallery_Entry {\n              __typename\n              slug\n            }\n          }\n          slideshowEntry {\n            ... on slideshows_slideshow_Entry {\n              __typename\n              id\n              uri\n              title\n              richTextDescription\n              images: representativeAssetVariant {\n                ... on assetVariants_Asset {\n                  __typename\n                  altText\n                  width\n                  height\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n      slideshowsMain: pagesEntries(site: $site, slug: "slideshows") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query MainGalleryQuery($site: [String]) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          isVisible\n          galleryEntry {\n            ... on galleries_gallery_Entry {\n              __typename\n              slug\n            }\n          }\n          slideshowEntry {\n            ... on slideshows_slideshow_Entry {\n              __typename\n              id\n              uri\n              title\n              richTextDescription\n              images: representativeAssetVariant {\n                ... on assetVariants_Asset {\n                  __typename\n                  altText\n                  width\n                  height\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n      slideshowsMain: pagesEntries(site: $site, slug: "slideshows") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query AllGalleries($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          id\n          uri\n          slug\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query AllGalleries($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n          id\n          uri\n          slug\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query AllGallerySlugs($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query AllGallerySlugs($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GalleryMetadataQuery(\n      $site: [String]\n      $slug: [String]\n      $uri: [String]\n    ) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          galleryEntry(slug: $slug) {\n            ... on galleries_gallery_Entry {\n              id\n            }\n          }\n        }\n      }\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          slug\n          title\n          description\n          cantoAssetSingle {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n          assetAlbum(first: true) {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query GalleryMetadataQuery(\n      $site: [String]\n      $slug: [String]\n      $uri: [String]\n    ) {\n      pagesEntries(site: $site, uri: "gallery") {\n        ... on pages_galleryLandingPage_Entry {\n          __typename\n          galleryEntry(slug: $slug) {\n            ... on galleries_gallery_Entry {\n              id\n            }\n          }\n        }\n      }\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          slug\n          title\n          description\n          cantoAssetSingle {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n          assetAlbum(first: true) {\n            additional {\n              AltTextEN\n              AltTextES\n              TitleEN\n              TitleES\n            }\n            height\n            id\n            name\n            scheme\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n            }\n            width\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query GalleryQuery(\n      $site: [String]\n      $uri: [String]\n      $whereIn: [WhereInFiltersInput]\n      $whereNotIn: [WhereNotInFiltersInput]\n      $whereContainsIn: [WhereContainsInFilterInput]\n      $forPage: ForPageInput\n      $sortBy: SortByInput\n      $sortByDesc: SortByDescInput\n    ) {\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          description\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            forPage: $forPage\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n            sortBy: $sortBy\n            sortByDesc: $sortByDesc\n          ) {\n            ...CantoAssetMetadata\n          }\n        }\n      }\n      metaGalleries: galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n          ) {\n            id\n          }\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query GalleryQuery(\n      $site: [String]\n      $uri: [String]\n      $whereIn: [WhereInFiltersInput]\n      $whereNotIn: [WhereNotInFiltersInput]\n      $whereContainsIn: [WhereContainsInFilterInput]\n      $forPage: ForPageInput\n      $sortBy: SortByInput\n      $sortByDesc: SortByDescInput\n    ) {\n      galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          description\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            forPage: $forPage\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n            sortBy: $sortBy\n            sortByDesc: $sortByDesc\n          ) {\n            ...CantoAssetMetadata\n          }\n        }\n      }\n      metaGalleries: galleriesEntries(site: $site, uri: $uri) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(\n            whereNotIn: $whereNotIn\n            whereIn: $whereIn\n            whereContainsIn: $whereContainsIn\n          ) {\n            id\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query MediaPolicyPage($site: [String]) {\n      pagesEntries(site: $site, slug: "media-policy") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n          title\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query MediaPolicyPage($site: [String]) {\n      pagesEntries(site: $site, slug: "media-policy") {\n        ... on pages_pages_Entry {\n          __typename\n          uri\n          title\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query getNavigationItems($site: [String]) {\n      navigationItems: entries(\n        section: ["pages"]\n        site: $site\n        level: 1\n        isVisible: true\n      ) {\n        id\n        title\n        uri\n        children(isVisible: true) {\n          id\n          title\n          uri\n          children(isVisible: true) {\n            id\n            title\n            uri\n          }\n        }\n      }\n      galleriesEntries(site: $site, isVisible: true) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query getNavigationItems($site: [String]) {\n      navigationItems: entries(\n        section: ["pages"]\n        site: $site\n        level: 1\n        isVisible: true\n      ) {\n        id\n        title\n        uri\n        children(isVisible: true) {\n          id\n          title\n          uri\n          children(isVisible: true) {\n            id\n            title\n            uri\n          }\n        }\n      }\n      galleriesEntries(site: $site, isVisible: true) {\n        ... on galleries_gallery_Entry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query SearchResultsPage($site: [String]) {\n      searchResultsEntries(site: $site) {\n        ... on searchResults_searchResults_Entry {\n          title\n          id\n          dynamicComponent\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query SearchResultsPage($site: [String]) {\n      searchResultsEntries(site: $site) {\n        ... on searchResults_searchResults_Entry {\n          title\n          id\n          dynamicComponent\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query NewsSitemapData($site: [String]) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          title\n          uri\n          date\n          dateUpdated\n        }\n      }\n      globalSets(site: $site) {\n        ... on siteInfo_GlobalSet {\n          siteTitle\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query NewsSitemapData($site: [String]) {\n      newsEntries(site: $site) {\n        ... on news_post_Entry {\n          title\n          uri\n          date\n          dateUpdated\n        }\n      }\n      globalSets(site: $site) {\n        ... on siteInfo_GlobalSet {\n          siteTitle\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query ImageSitemapData($site: [String]) {\n      galleries: galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          dateUpdated\n          assetAlbum(\n            whereIn: { key: "scheme", values: ["image", "video", "document"] }\n          ) {\n            id\n            scheme\n            url {\n              directUrlOriginal\n            }\n          }\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query ImageSitemapData($site: [String]) {\n      galleries: galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          uri\n          dateUpdated\n          assetAlbum(\n            whereIn: { key: "scheme", values: ["image", "video", "document"] }\n          ) {\n            id\n            scheme\n            url {\n              directUrlOriginal\n            }\n          }\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query SitemapData($site: [String]) {\n      pages: entries(\n        site: $site\n        section: ["pages"]\n        type: ["not", "redirectPage"]\n      ) {\n        uri\n        dateUpdated\n      }\n      homepage: homepageEntries(site: $site) {\n        ... on homepage_homepage_Entry {\n          uri\n          dateUpdated\n        }\n      }\n      staff: staffProfilesEntries(site: $site) {\n        ... on staffProfiles_staffProfiles_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      slideshows: slideshowsEntries(site: $site) {\n        ... on slideshows_slideshow_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      glossary: glossaryTermsEntries(site: $site) {\n        ... on glossaryTerms_glossaryTerm_Entry {\n          dateUpdated\n          uri\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query SitemapData($site: [String]) {\n      pages: entries(\n        site: $site\n        section: ["pages"]\n        type: ["not", "redirectPage"]\n      ) {\n        uri\n        dateUpdated\n      }\n      homepage: homepageEntries(site: $site) {\n        ... on homepage_homepage_Entry {\n          uri\n          dateUpdated\n        }\n      }\n      staff: staffProfilesEntries(site: $site) {\n        ... on staffProfiles_staffProfiles_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      slideshows: slideshowsEntries(site: $site) {\n        ... on slideshows_slideshow_Entry {\n          dateUpdated\n          uri\n        }\n      }\n      glossary: glossaryTermsEntries(site: $site) {\n        ... on glossaryTerms_glossaryTerm_Entry {\n          dateUpdated\n          uri\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment accordionGroupBlock on contentBlocks_accordionGroup_BlockType {\n    id\n    typeHandle\n    header\n    backgroundColor\n    accordions: children {\n      ... on contentBlocks_accordion_BlockType {\n        id\n        text\n        header\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment accordionGroupBlock on contentBlocks_accordionGroup_BlockType {\n    id\n    typeHandle\n    header\n    backgroundColor\n    accordions: children {\n      ... on contentBlocks_accordion_BlockType {\n        id\n        text\n        header\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment firstLookWidgetsBlock on contentBlocks_firstLookWidgets_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    filmReel {\n      ... on filmReel_item_BlockType {\n        text\n        share\n      }\n    }\n    firstLookWidget\n  }\n"
): (typeof documents)["\n  fragment firstLookWidgetsBlock on contentBlocks_firstLookWidgets_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    filmReel {\n      ... on filmReel_item_BlockType {\n        text\n        share\n      }\n    }\n    firstLookWidget\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment imageBlock on contentBlocks_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n    backgroundColor\n  }\n'
): (typeof documents)['\n  fragment imageBlock on contentBlocks_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n    backgroundColor\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment imageBlockNews on contentBlocksNews_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n  }\n'
): (typeof documents)['\n  fragment imageBlockNews on contentBlocksNews_image_BlockType {\n    id\n    typeHandle\n    caption\n    image: contentImage {\n      ... on contentImages_Asset {\n        altText\n        width\n        height\n        url @transform(mode: "fit", width: 900)\n      }\n    }\n    cantoImage: cantoAssetSingle {\n      ...CantoAssetDetailed\n    }\n    floatDirection\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment imageComparisonBlock on contentBlocks_imageComparison_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption: captionRichText\n    images: multipleCantoAssets {\n      ...CantoAssetMetadata\n    }\n  }\n"
): (typeof documents)["\n  fragment imageComparisonBlock on contentBlocks_imageComparison_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption: captionRichText\n    images: multipleCantoAssets {\n      ...CantoAssetMetadata\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment linkedImageListBlock on contentBlocks_linkedImageList_BlockType {\n    id\n    typeHandle\n    description\n    header\n    variant: linkedImageListVariant\n    linkedImageList {\n      ... on linkedImageList_linkedImage_BlockType {\n        id\n        image {\n          ...CantoAssetMetadata\n        }\n        link: imageLink {\n          customText\n          target\n          text\n          title\n          type\n          url\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment linkedImageListBlock on contentBlocks_linkedImageList_BlockType {\n    id\n    typeHandle\n    description\n    header\n    variant: linkedImageListVariant\n    linkedImageList {\n      ... on linkedImageList_linkedImage_BlockType {\n        id\n        image {\n          ...CantoAssetMetadata\n        }\n        link: imageLink {\n          customText\n          target\n          text\n          title\n          type\n          url\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment shareBlock on contentBlocks_share_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    shareTitle\n    shareVariant\n    text\n  }\n"
): (typeof documents)["\n  fragment shareBlock on contentBlocks_share_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    shareTitle\n    shareVariant\n    text\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment skyviewerBlock on contentBlocks_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n"
): (typeof documents)["\n  fragment skyviewerBlock on contentBlocks_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment skyviewerNewsBlock on contentBlocksNews_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n"
): (typeof documents)["\n  fragment skyviewerNewsBlock on contentBlocksNews_skyviewer_BlockType {\n    id\n    embedTitle\n    typeHandle\n    captionRichText\n    dec\n    fov\n    ra\n    fullWidth\n    backgroundColor\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment textBlock on contentBlocks_text_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    text\n  }\n"
): (typeof documents)["\n  fragment textBlock on contentBlocks_text_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    text\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment videoBlock on contentBlocks_video_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption\n    url: externalUrlTranslatable\n    cantoAsset: videoType\n    fullscreenVideo\n    fullWidth\n    cantoAssets: responsiveAssets {\n      ... on responsiveAssets_asset_BlockType {\n        orientation\n        asset(where: { key: "scheme", value: "video" }) {\n          ...CantoAssetMetadata\n          default {\n            DateUploaded\n          }\n          metadata {\n            MIMEType\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  fragment videoBlock on contentBlocks_video_BlockType {\n    id\n    typeHandle\n    backgroundColor\n    caption\n    url: externalUrlTranslatable\n    cantoAsset: videoType\n    fullscreenVideo\n    fullWidth\n    cantoAssets: responsiveAssets {\n      ... on responsiveAssets_asset_BlockType {\n        orientation\n        asset(where: { key: "scheme", value: "video" }) {\n          ...CantoAssetMetadata\n          default {\n            DateUploaded\n          }\n          metadata {\n            MIMEType\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CantoAssetDetailed on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    CaptionEN\n    CaptionES\n    Credit\n    TitleEN\n    TitleES\n  }\n  default {\n    ContentType\n    DateCreated\n    DateModified\n    DateUploaded\n    Size\n  }\n  approvalStatus\n  height\n  id\n  keyword\n  name\n  owner\n  ownerName\n  scheme\n  size\n  smartTags\n  tag\n  time\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n    download\n    metadata\n    preview\n    PNG\n    HighJPG\n  }\n  width\n}"
): (typeof documents)["fragment CantoAssetDetailed on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    CaptionEN\n    CaptionES\n    Credit\n    TitleEN\n    TitleES\n  }\n  default {\n    ContentType\n    DateCreated\n    DateModified\n    DateUploaded\n    Size\n  }\n  approvalStatus\n  height\n  id\n  keyword\n  name\n  owner\n  ownerName\n  scheme\n  size\n  smartTags\n  tag\n  time\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n    download\n    metadata\n    preview\n    PNG\n    HighJPG\n  }\n  width\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment CantoAssetMetadata on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    TitleEN\n    TitleES\n    CaptionEN\n    CaptionES\n    Credit\n  }\n  height\n  id\n  name\n  scheme\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n  }\n  width\n}"
): (typeof documents)["fragment CantoAssetMetadata on CantoDamAssetInterface {\n  additional {\n    AltTextEN\n    AltTextES\n    TitleEN\n    TitleES\n    CaptionEN\n    CaptionES\n    Credit\n  }\n  height\n  id\n  name\n  scheme\n  url {\n    directUrlOriginal\n    directUrlPreview\n    directUrlPreviewPlay\n  }\n  width\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment LinksFragment on links_link_BlockType {\n  mixedLink {\n    ... on linkField_Link {\n      customText\n      text\n      title\n      type\n      url\n      element {\n        uri\n      }\n    }\n  }\n}"
): (typeof documents)["fragment LinksFragment on links_link_BlockType {\n  mixedLink {\n    ... on linkField_Link {\n      customText\n      text\n      title\n      type\n      url\n      element {\n        uri\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment SiteInfoFragment on siteInfo_GlobalSet {\n  language\n  name\n  handle\n  siteTitle\n  siteDescription\n  siteImage {\n    ... on generalImages_Asset {\n      altText\n      width\n      height\n      url @transform(mode: "crop", width: 800)\n    }\n  }\n  contactInfo {\n    ... on contactInfo_mail_BlockType {\n      id\n      text\n      typeHandle\n    }\n    ... on contactInfo_phone_BlockType {\n      id\n      text\n      typeHandle\n    }\n  }\n}'
): (typeof documents)['fragment SiteInfoFragment on siteInfo_GlobalSet {\n  language\n  name\n  handle\n  siteTitle\n  siteDescription\n  siteImage {\n    ... on generalImages_Asset {\n      altText\n      width\n      height\n      url @transform(mode: "crop", width: 800)\n    }\n  }\n  contactInfo {\n    ... on contactInfo_mail_BlockType {\n      id\n      text\n      typeHandle\n    }\n    ... on contactInfo_phone_BlockType {\n      id\n      text\n      typeHandle\n    }\n  }\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getContactForm($set: [String], $site: [String]) {\n      contactForm: globalSet(handle: $set, site: $site) {\n        ... on contactForm_GlobalSet {\n          contactFormTopics {\n            ... on contactFormTopics_topic_BlockType {\n              id\n              value: topicValue\n              label: topicLabel\n            }\n          }\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query getContactForm($set: [String], $site: [String]) {\n      contactForm: globalSet(handle: $set, site: $site) {\n        ... on contactForm_GlobalSet {\n          contactFormTopics {\n            ... on contactFormTopics_topic_BlockType {\n              id\n              value: topicValue\n              label: topicLabel\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query getFooter($set: [String], $site: [String]) {\n      footer: globalSet(handle: $set, site: $site) {\n        ... on footer_GlobalSet {\n          id\n          name\n          handle\n          links {\n            ...LinksFragment\n          }\n          colophon\n          supportersLogos {\n            ... on generalImages_Asset {\n              altText\n              width\n              height\n              url @transform(mode: "fit", width: 1000)\n            }\n          }\n          supportersLogosAlt\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query getFooter($set: [String], $site: [String]) {\n      footer: globalSet(handle: $set, site: $site) {\n        ... on footer_GlobalSet {\n          id\n          name\n          handle\n          links {\n            ...LinksFragment\n          }\n          colophon\n          supportersLogos {\n            ... on generalImages_Asset {\n              altText\n              width\n              height\n              url @transform(mode: "fit", width: 1000)\n            }\n          }\n          supportersLogosAlt\n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getLogos($set: [String], $site: [String]) {\n      siteInfo: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          __typename\n          logoLarge {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n          logoSmall {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query getLogos($set: [String], $site: [String]) {\n      siteInfo: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          __typename\n          logoLarge {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n          logoSmall {\n            url {\n              directUrlOriginal\n            }\n            width\n            height\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment rootPageInfoFragment on rootPageInformation_GlobalSet {\n    name\n    handle\n    customBreadcrumbs {\n      ... on customBreadcrumbs_ancestorsAndRoot_BlockType {\n        header\n        pageEntry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment rootPageInfoFragment on rootPageInformation_GlobalSet {\n    name\n    handle\n    customBreadcrumbs {\n      ... on customBreadcrumbs_ancestorsAndRoot_BlockType {\n        header\n        pageEntry {\n          id\n          title\n          uri\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getRootPages($site: [String], $set: [String]) {\n      rootPages: globalSet(handle: $set, site: $site) {\n        ...rootPageInfoFragment\n      }\n    }\n  "
): (typeof documents)["\n    query getRootPages($site: [String], $set: [String]) {\n      rootPages: globalSet(handle: $set, site: $site) {\n        ...rootPageInfoFragment\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n    query getSocials($set: [String], $site: [String]) {\n      socials: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          email\n          facebook\n          instagram\n          linkedIn\n          twitter\n          youTube\n        }\n      }\n    }\n  "
): (typeof documents)["\n    query getSocials($set: [String], $site: [String]) {\n      socials: globalSet(handle: $set, site: $site) {\n        ... on siteInfo_GlobalSet {\n          email\n          facebook\n          instagram\n          linkedIn\n          twitter\n          youTube\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query RelatedInvestigation($site: [String], $ids: [QueryArgument]) {\n      investigation: entry(type: "investigation", landingPage: $ids, site: $site) {\n        sectionHandle\n        ... on investigations_investigation_Entry {\n          uri\n          title\n          duration: plainText\n          typeHandle\n          externalUrl: externalUrlTranslatable\n          status: investigationStatus\n          landingPage {\n            ... on pages_investigationLandingPage_Entry {\n              id\n              uri\n              title\n            }\n          }\n          \n        }\n      }\n    }\n  '
): (typeof documents)['\n    query RelatedInvestigation($site: [String], $ids: [QueryArgument]) {\n      investigation: entry(type: "investigation", landingPage: $ids, site: $site) {\n        sectionHandle\n        ... on investigations_investigation_Entry {\n          uri\n          title\n          duration: plainText\n          typeHandle\n          externalUrl: externalUrlTranslatable\n          status: investigationStatus\n          landingPage {\n            ... on pages_investigationLandingPage_Entry {\n              id\n              uri\n              title\n            }\n          }\n          \n        }\n      }\n    }\n  '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query GetSiblings(\n      $uri: [String]\n      $site: [String]\n      $parentId: Int\n      $level: Int\n    ) {\n      siblings: entry(uri: $uri, site: $site) {\n        prev(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n        next(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n      }\n    }\n  '
): (typeof documents)['\n    query GetSiblings(\n      $uri: [String]\n      $site: [String]\n      $parentId: Int\n      $level: Int\n    ) {\n      siblings: entry(uri: $uri, site: $site) {\n        prev(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n        next(\n          descendantOf: $parentId\n          section: "pages"\n          site: $site\n          level: $level\n        ) {\n          uri\n          title\n        }\n      }\n    }\n  '];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
