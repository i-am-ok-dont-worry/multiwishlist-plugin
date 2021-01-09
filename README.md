# Multiwishlist plugin
The wishlist extension provides functionality for listing and maintaining 
items a customer would like to have, for example products intended 
for buying or desired as gifts.

Note that this plugin allows to handle multiwishlists per customer and is 
compatible with [Magento Amasty Multiple Wishlist plugin](https://amasty.com/multiple-wishlist-for-magento-2.html).


## REST endpoints
Plugin exposes rest endpoints for basic CRUD operations:

* `GET /vendor/multiwishlist/{{customerId}}` - returns list of customer multiwishlists
* `GET /vendor/multiwishlist/single/{{wishlistId}}` - returns a single wishlist
* `POST /vendor/multiwishlist` - creates a wishlist
* `DELETE /vendor/multiwishlist/{{wishlistId}}` - deletes wishlist
* `PUT /vendor/multiwishlist/{{wishlistId}}/add/{{productId}}` - adds product to a wishlist
* `DELETE /vendor/multiwishlist/remove/{{itemId}}` - removes item from a wishlist

## Interface
Wishlists endpoints operates on and returns full mutated 
[Wishlist](https://gitlab.grupakmk.pl/internal/frontend/api/addons/libstorefront-addons/libstorefront-multiwishlist-plugin/-/blob/master/src/types/index.ts) object.
