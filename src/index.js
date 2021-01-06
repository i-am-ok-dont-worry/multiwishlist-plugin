/**
 * Plugin allows to handle multiwishlist features
 * @param config
 * @param db
 * @param router
 * @param cache
 * @param apiStatus
 * @param apiError
 * @param getRestApiClient
 * @returns {{router: *, route: string, pluginName: string, domainName: string}}
 */
module.exports = ({ config, db, router, cache, apiStatus, apiError, getRestApiClient }) => {
    console.warn('----> Plugin initialized');

    return {
        domainName: '@grupakmk',
        pluginName: 'multiwishlist-plugin',
        route: '/multiwishlist',
        router
    };
};
