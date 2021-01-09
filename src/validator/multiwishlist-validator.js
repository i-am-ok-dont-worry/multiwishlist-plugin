let Validator = require('validatorjs');

class WishlistDataValidator {
  validate () {
    const rules = {
      customer_id: 'required',
      name: 'required'
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
