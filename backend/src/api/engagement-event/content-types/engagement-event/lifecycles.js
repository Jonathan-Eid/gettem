'use strict';

module.exports = {
    beforeCreate(event) {
        const ctx = strapi.requestContext.get();
        if (ctx) {
            const forwarded = ctx.request.get('x-forwarded-for');
            event.params.data.ipAddress = forwarded ? forwarded.split(',')[0].trim() : ctx.request.ip;
        }
    },
};
