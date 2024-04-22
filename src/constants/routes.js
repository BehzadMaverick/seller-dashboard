export const routes = {
  overview: "/overview",
  listing: "/my-listing",
  addItem: "/my-listing/add",
  editItem: (id) => `/my-listing/edit/${id}`,
  viewItem: (id) => `/my-listing/${id}`
}
