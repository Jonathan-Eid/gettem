    //config/plugin.js
    
    module.exports = {
        "rest-cache": {
            config: {
                provider: {
                    name: 'memory',
                    getTimeout: 500,
                    options: {
                      // The maximum size of the cache
                      max: 32767,
                      // Update to the current time whenever it is retrieved from cache, causing it to not expire
                      updateAgeOnGet: true,
                      // ...
                    },
                },
                strategy: {
                    
                    enableEtagSupport: true,
                    logs: true,
                    clearRelatedCache: true,
                    maxAge: 3600000,
                    contentTypes: [
                        "api::card.card",
                        "api::github.github",
                        "api::resume.resume",
                    ],
                },
            },
        },
    };