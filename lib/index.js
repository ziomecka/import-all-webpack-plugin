"use strict";

var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var path = require('path');

var defaultExclude = 'index(\\.{,3})?';
var fileNameRegexp = '[\\w-\\d]+';
module.exports = (_temp =
/*#__PURE__*/
function () {
  function ImportAllPlugin(dirPath) {
    var _this = this;

    var exclude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultExclude;

    _classCallCheck(this, ImportAllPlugin);

    _defineProperty(this, "verify", function () {
      return Array.isArray(_this.exclude) ? !_this.exclude.includes : function (value) {
        return !new RegExp(_this.exclude, 'gi').test(value);
      };
    });

    this.dirPath = dirPath;
    this.exclude = exclude;
  }

  _createClass(ImportAllPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this2 = this;

      var dirContent = fs.readdirSync(this.dirPath);
      var newEntries = dirContent.map(function (fileName) {
        return path.resolve(_this2.dirPath, fileName);
      }).filter(this.verify);
      compiler.options.entry = newEntries.reduce(function (acc, value) {
        var name = value.match(new RegExp("".concat(fileNameRegexp, ".\\w+$")))[0].match(new RegExp(fileNameRegexp))[0];
        return Object.assign(acc, _defineProperty({}, name, value));
      }, {
        main: compiler.options.entry
      });
    }
  }]);

  return ImportAllPlugin;
}(), _temp);