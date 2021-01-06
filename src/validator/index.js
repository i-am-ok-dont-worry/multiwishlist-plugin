let Validator = require('validatorjs');

class WishlistDataValidator {
  validate () {
    const rules = {
      customer_id: 'required',
      shared: 'required',
      sharing_code: 'required',
      name: 'required',
      type: 'required'
    };

    let validation = new Validator(this.wishlistData, rules);
    if (validation.fails()) {
      throw validation.errors.all();
    }
  }

  constructor (wishlistData) {
    this.wishlistData = wishlistData;
  }
}

module.exports = WishlistDataValidator;
