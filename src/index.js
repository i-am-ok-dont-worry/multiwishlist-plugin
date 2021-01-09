const Validator = require('./validator/multiwishlist-validator');

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
  const createMage2RestClient = () => {
    const client = getRestApiClient();
    client.addMethods('multiwishlist', (restClient) => {
      const module = {};
      module.getMultiwishlists = ({ customerId, pageSize, currentPage, sortBy, sortDir }, token) => {
        const url = `/kmk-multi-wishlist/wishlist/customer/${customerId}`;
        return restClient.get(url, token);
      };

      module.getMultiwishlist = (wishlistId, token) => {
        const url = `/kmk-multi-wishlist/wishlist/${wishlistId}`;
        return restClient.get(url, token);
      };

      module.createWishlist = (wishlist, token) => {
        const url = `/kmk-multi-wishlist/wishlist`;
        return restClient.post(url, { wishlist }, token);
      };

      module.deleteWishlist = (wishlistId, token) => {
        const url = `/kmk-multi-wishlist/wishlist/${wishlistId}`;
        return restClient.delete(url, token);
      };

      module.addProductToWishlist = (wishlistId, productId, token) => {
        const url = `/kmk-multi-wishlist/product/${wishlistId}/${productId}`;
        return restClient.put(url, token);
      };

      module.removeProductFromWishlist = (itemId, token) => {
        const url = `/kmk-multi-wishlist/product/${itemId}`;
        return restClient.delete(url, token);
      };

      return module;
    });

    return client;
  };

  /**
   * Creates wishlist
   * @req.body wishlist data
   */
  router.post('/', (req, res) => {
    const wishlistData = req.body;
    const { token } = req.query;
    const client = createMage2RestClient();
    try {
      new Validator(wishlistData).validate();
      client.multiwishlist.createWishlist(wishlistData, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  /**
   * Returns single wishlist details
   * @req.params.returnId Return order identifier
   */
  router.get('/single/:wishlistId', (req, res) => {
    const { wishlistId } = req.params;
    const { token } = req.query;
    const client = createMage2RestClient();
    try {
      if (!wishlistId) { throw new Error('Wishlist id is required'); }
      client.multiwishlist.getMultiwishlist(wishlistId, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  /**
   * Returns list of wishlists for customer
   * @req.params.customerId - Customer identifier
   */
  router.get('/:customerId', (req, res) => {
    const { customerId } = req.params;
    const { token } = req.query;
    const additionalParams = req.query;
    const client = createMage2RestClient();
    try {
      if (!customerId) { throw new Error('Customer id is required'); }
      client.multiwishlist.getMultiwishlists({ customerId, ...additionalParams }, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  /**
   * Deletes wishlist
   * @req.params.wishlistId {string} - Wishlist identifier
   */
  router.delete('/:wishlistId', (req, res) => {
    const { wishlistId } = req.params;
    const { token } = req.query;
    const client = createMage2RestClient();
    try {
      if (!wishlistId) { throw new Error('Wishlist id is required'); }
      client.multiwishlist.deleteWishlist(wishlistId, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  /**
   * Adds product to wishlist
   * @req.param {string} wishlistId - Wishlist id
   * @req.param {string} productId - Product id
   */
  router.post('/:wishlistId/add/:productId', (req, res) => {
    const { wishlistId, productId } = req.params;
    const { token } = req.query;
    const client = createMage2RestClient();
    try {
      if (!wishlistId) { throw new Error('Wishlist id is required'); }
      if (!productId) { throw new Error('Product id is required'); }
      client.multiwishlist.addProductToWishlist(wishlistId, productId, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  /**
   * Removes product from wishlist
   * @req.param {string} itemId - Id of item that needs to be deleted from wishlist
   */
  router.delete('/remove/:itemId', (req, res) => {
    const { itemId } = req.params;
    const { token } = req.query;
    const client = createMage2RestClient();
    try {
      if (!itemId) { throw new Error('Item id is required'); }
      client.multiwishlist.removeProductFromWishlist(itemId, token)
          .then(response => apiStatus(res, response, 200))
          .catch(err => apiError(res, err));
    } catch (e) {
      apiError(res, e);
    }
  });

  return {
    domainName: '@grupakmk',
    pluginName: 'multiwishlist',
    route: '/multiwishlist',
    router
  };
};
