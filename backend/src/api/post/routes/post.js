"use strict";

/**
 * post router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::post.post", {
  config: {
    update: {
      policies: ["global::is-owner"],
    },
    delete: {
      policies: ["global::is-owner"],
    },
  },
});
