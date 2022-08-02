'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('ShowBasket', cache.applyDefaultCache, function (req, res, next) {
  var BasketMgr = require('dw/order/BasketMgr');
  var basket = BasketMgr.getCurrentBasket();
  var info = [];
  if (basket) {
    var products = basket.getAllProductLineItems();
    var productsIterator = products.iterator();
    while (productsIterator.hasNext()) {
      var item = productsIterator.next();
      info.push({
        id: item.productID,
        name: item.productName,
        quantity: item.quantityValue,
      });
    }
  }

  res.render('basket', { productsInfo: info });
  next();
});

module.exports = server.exports();
