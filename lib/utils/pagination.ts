export function getIsFirstPage(page: number) {
  return !page || page === 1;
}

/**
 * If an odd number of items is shown on the first page,
 * then we need to factor in the adjusted limit on that page
 * for all subsequent pages 🙃
 */
export function getOffset(limit: number, page: number, showsFeatured = false) {
  // if list shows no featured item, calculate offset normally
  if (!showsFeatured) return (page - 1) * limit || 0;
  // if we're on the first page, there's no offset
  const isFirstPage = getIsFirstPage(page);
  if (isFirstPage) return 0;
  // for subsequent pages, the offset is reduced by one
  return (page - 1) * limit - 1;
}
