module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/my-listing/edit/:id",
        destination: "/my-listing/add"
      }
    ]
  }
};
