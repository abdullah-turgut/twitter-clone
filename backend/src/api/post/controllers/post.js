"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async me(ctx, next) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No auth header found" }] },
      ]);
    }

    const data = await strapi.entityService.findMany("api::post.post", {
      populate: "image",
      filters: {
        author: {
          id: user.id,
        },
      },
    });
    if (!data) {
      return ctx.notFound();
    }

    const sanitizedEvents = await this.sanitizeOutput(data, ctx);

    return this.transformResponse(sanitizedEvents);
  },
  async create(ctx) {
    const { id } = ctx.state.user; //ctx.state.user contains the current authenticated user
    const response = await super.create(ctx);
    const updatedResponse = await strapi.entityService.update(
      "api::post.post",
      response.data.id,
      { data: { author: id } }
    );
    return updatedResponse;
  },
}));
