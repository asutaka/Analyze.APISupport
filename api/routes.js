'use strict';
module.exports = function(app) {
  var productsCtrl = require('./controllers/ProductsController');
  var usersCtrl = require('./controllers/UsersController');
  var logsCtrl = require('./controllers/LogsController');
  var telegramsCtrl = require('./controllers/TelegramsController');

  //Product
  app.route('/products')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:id')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
	
  //User
  app.route('/users')
    .get(usersCtrl.get)
    .post(usersCtrl.store);

  app.route('/users/:id')
    .get(usersCtrl.detail)
    .put(usersCtrl.update)
    .delete(usersCtrl.delete);
	
  //Telegram
  app.route('/telegrams')
    .get(telegramsCtrl.get)
    .post(telegramsCtrl.store);

  app.route('/telegrams/:id')
    .put(telegramsCtrl.update)
    .delete(telegramsCtrl.delete);
	
  app.route('/telegrams/:phone')
    .get(telegramsCtrl.detail);
	
  //Log
  app.route('/logs')
    .get(logsCtrl.get)
    .post(logsCtrl.store);

  app.route('/logs/:id')
    .delete(logsCtrl.delete);
	
  app.route('/logs/:phone')
    .get(logsCtrl.detail);
};
