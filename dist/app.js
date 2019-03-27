'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _express = _interopRequireDefault(require('express'));

var _swaggerUiExpress = _interopRequireDefault(require('swagger-ui-express'));

var _swagger = _interopRequireDefault(require('../documentation/swagger.json'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express.default)();
app.use(_express.default.json());
app.use(
  '/api-docs',
  _swaggerUiExpress.default.serve,
  _swaggerUiExpress.default.setup(_swagger.default)
);
var port = process.env.PORT || 6000;
app.get('/', function(req, res) {
  res.send('Welcone to Authors Heaven');
});
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log('App is listen on Port '.concat(port));
});
var _default = app;
exports.default = _default;
