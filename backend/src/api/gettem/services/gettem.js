'use strict';

/**
 * gettem service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gettem.gettem');
