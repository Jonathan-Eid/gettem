module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: "strapi::security",
    config: {
    contentSecurityPolicy: {
    useDefaults: true,
    directives: {
    "script-src": ["self", "https:", "http:"],
    "frame-src": ["self", "https:", "http:"],
    "frame-ancestors": ["self", "https:", "http:"],
    },
    },
    }
    },
];
  