# Multiwishlist plugin
The wishlist extension provides functionality for listing and maintaining 
items a customer would like to have, for example products intended 
for buying or desired as gifts.

Note that this plugin allows to handle multiwishlists per customer and is 
compatible with [Magento Amasty Multiple Wishlist plugin](https://amasty.com/multiple-wishlist-for-magento-2.html).


## REST endpoints
Plugin exposes 4 rest endpoints for basic CRUD operations:

* `GET /vendor/multiwishlist/{{customerId}}` - returns list of customer multiwishlists
* `GET /vendor/multiwishlist/single/{{wishlistId}}` - returns single wishlist
* `POST /vendor/multiwishlist` - creates wishlist
* `POST /vendor/multiwishlist/{{wishlistId}}` - updates wishlist
* `DELETE /vendor/multiwishlist/{{wishlistId}}` - deletes wishlist

## Filtering wishlists list
Wishlists list can be filtered and sorted via additional query parameters on 
endpoint `GET /vendor/multiwishlist/${customerId}`:
* pageSize - `{number}`
* currentPage - `{number}`
* sortBy - field by which list will be sorted
* sortDir - sort direction `{asc|desc}`
