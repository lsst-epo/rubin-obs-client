/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n    query RecentAssetsQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum {\n            id\n          }\n        }\n      }\n    }\n  ": types.RecentAssetsQueryDocument,
    "\n    query GalleryTitleQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n        }\n      }\n    }\n  ": types.GalleryTitleQueryDocument,
    "\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: \"id\", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  ": types.GalleryImageQueryDocument,
    "\n    query AllGalleriesQuery($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  ": types.AllGalleriesQueryDocument,
    "\n    query MyQuery {\n        entries {\n            ... on galleries_gallery_Entry {\n            id\n            title\n            assetAlbum {\n                id\n                approvalStatus\n                owner\n                size\n                smartTags\n                url {\n                HighJPG\n                }\n                additional {\n                AltTextEN\n                AltTextES\n                CaptionEN\n                CaptionES\n                Credit\n                Description\n                }\n                default {\n                DateCreated\n                Author\n                Copyright\n                }\n            }\n            }\n        }\n    }": types.MyQueryDocument,
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
export function graphql(source: "\n    query RecentAssetsQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum {\n            id\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query RecentAssetsQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum {\n            id\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GalleryTitleQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GalleryTitleQuery($site: [String], $uri: [String]) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          title\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: \"id\", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GalleryImageQuery($site: [String], $uri: [String], $id: String) {\n      galleriesEntries(uri: $uri, site: $site) {\n        ... on galleries_gallery_Entry {\n          assetAlbum(where: { key: \"id\", value: $id }) {\n            additional {\n              AltTextEN\n              AltTextES\n              CaptionEN\n              CaptionES\n              Credit\n              TitleEN\n              TitleES\n            }\n            default {\n              ContentType\n              DateCreated\n              DateModified\n              DateUploaded\n              Size\n            }\n            approvalStatus\n            height\n            id\n            name\n            owner\n            ownerName\n            scheme\n            size\n            smartTags\n            tag\n            time\n            url {\n              directUrlOriginal\n              directUrlPreview\n              directUrlPreviewPlay\n              download\n              metadata\n              preview\n              PNG\n              HighJPG\n            }\n            width\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AllGalleriesQuery($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  "): (typeof documents)["\n    query AllGalleriesQuery($site: [String]) {\n      galleriesEntries(site: $site) {\n        ... on galleries_gallery_Entry {\n          slug\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query MyQuery {\n        entries {\n            ... on galleries_gallery_Entry {\n            id\n            title\n            assetAlbum {\n                id\n                approvalStatus\n                owner\n                size\n                smartTags\n                url {\n                HighJPG\n                }\n                additional {\n                AltTextEN\n                AltTextES\n                CaptionEN\n                CaptionES\n                Credit\n                Description\n                }\n                default {\n                DateCreated\n                Author\n                Copyright\n                }\n            }\n            }\n        }\n    }"): (typeof documents)["\n    query MyQuery {\n        entries {\n            ... on galleries_gallery_Entry {\n            id\n            title\n            assetAlbum {\n                id\n                approvalStatus\n                owner\n                size\n                smartTags\n                url {\n                HighJPG\n                }\n                additional {\n                AltTextEN\n                AltTextES\n                CaptionEN\n                CaptionES\n                Credit\n                Description\n                }\n                default {\n                DateCreated\n                Author\n                Copyright\n                }\n            }\n            }\n        }\n    }"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;