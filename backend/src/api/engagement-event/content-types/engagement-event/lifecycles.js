'use strict';

module.exports = {
    beforeCreate(event) {
        const ctx = strapi.requestContext.get();
        if (ctx) {
            event.params.data.ipAddress = ctx.request.ip;
        }
    },
};
