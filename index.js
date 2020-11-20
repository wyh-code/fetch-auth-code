'use strict';

const fetchAuthCode = require('./lib/fetchAuthCode');
const qr = require('./lib/qr')

module.exports = fetchAuthCode
module.exports.qr = qr