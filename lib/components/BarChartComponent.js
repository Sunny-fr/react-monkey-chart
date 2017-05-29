'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Charts = exports.Chart = exports.Legend = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./charts.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var comparator = function comparator(a, b) {
    return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' ? a.value - b.value : a - b;
};

//<Legend labels={ this.state.labels } colors={ this.state.colors } />


var Legend = exports.Legend = function (_Component) {
    _inherits(Legend, _Component);

    function Legend() {
        _classCallCheck(this, Legend);

        return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).apply(this, arguments));
    }

    _createClass(Legend, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                labels = _props.labels,
                colors = _props.colors;

            return _react2.default.createElement(
                'div',
                { className: 'Legend' },
                labels.map(function (label, labelIndex) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('span', { className: 'Legend--color', style: { backgroundColor: colors[labelIndex % colors.length] } }),
                        _react2.default.createElement(
                            'span',
                            { className: 'Legend--label' },
                            label
                        )
                    );
                })
            );
        }
    }]);

    return Legend;
}(_react.Component);

var Bar = function (_Component2) {
    _inherits(Bar, _Component2);

    function Bar() {
        _classCallCheck(this, Bar);

        return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
    }

    _createClass(Bar, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                grouping = _props2.grouping,
                _props2$layered = _props2.layered,
                layered = _props2$layered === undefined ? false : _props2$layered,
                orientation = _props2.orientation,
                _props2$transparency = _props2.transparency,
                transparency = _props2$transparency === undefined ? false : _props2$transparency,
                color = _props2.color,
                label = _props2.label,
                size = _props2.size;

            var className = 'Charts--item ' + (grouping || '');
            var labelStyle = { color: color };

            var style = _defineProperty({
                backgroundColor: color,
                opacity: !transparency ? 1 : size / 2 + .5,
                zIndex: 1 }, orientation === 'horizontal' ? 'width' : 'height', size + '%');

            return _react2.default.createElement(
                'div',
                { className: className, style: style },
                _react2.default.createElement(
                    'b',
                    { style: labelStyle },
                    label
                )
            );
        }
    }]);

    return Bar;
}(_react.Component);

var Chart = exports.Chart = function (_Component3) {
    _inherits(Chart, _Component3);

    function Chart() {
        _classCallCheck(this, Chart);

        return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
    }

    _createClass(Chart, [{
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                grouping = _props3.grouping,
                height = _props3.height,
                children = _props3.children;

            var className = 'Charts--serie ' + (grouping || '');
            var style = { height: height || 'auto' };

            return _react2.default.createElement(
                'div',
                { className: className, style: style },
                children
            );
        }
    }]);

    return Chart;
}(_react.Component);

var Charts = exports.Charts = function (_Component4) {
    _inherits(Charts, _Component4);

    function Charts() {
        _classCallCheck(this, Charts);

        return _possibleConstructorReturn(this, (Charts.__proto__ || Object.getPrototypeOf(Charts)).apply(this, arguments));
    }

    _createClass(Charts, [{
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                grouping = _props4.grouping,
                _props4$transparency = _props4.transparency,
                transparency = _props4$transparency === undefined ? false : _props4$transparency,
                data = _props4.data,
                _props4$orientation = _props4.orientation,
                orientation = _props4$orientation === undefined ? 'vertical' : _props4$orientation,
                height = _props4.height;


            var layered = grouping === 'layered';
            var stacked = grouping === 'stacked';
            var max = data.reduce(function (prev, serie) {
                var max = serie.concat().sort(comparator).pop();
                return max >= prev ? max : prev;
            }, 0);

            return _react2.default.createElement(
                'div',
                { className: 'Charts ' + orientation },
                data.map(function (chart, chartIndex) {
                    var sortedSerie = chart.concat();
                    var sum = chart.reduce(function (state, current) {
                        return state + current;
                    }, 0);
                    sortedSerie.sort(comparator);

                    return _react2.default.createElement(
                        Chart,
                        { key: chartIndex, grouping: grouping, height: height || 'auto' },
                        _react2.default.createElement(
                            'label',
                            null,
                            chart.label || ''
                        ),
                        chart.map(function (item, itemIndex) {
                            var color = item.color || '#43A19E';
                            var size = item / (stacked ? sum : max) * 100;

                            return _react2.default.createElement(Bar, { transparency: transparency,
                                layered: layered,
                                label: item,
                                size: size,
                                orientation: orientation,
                                grouping: grouping,
                                color: color,
                                key: itemIndex });
                        })
                    );
                })
            );
        }
    }]);

    return Charts;
}(_react.Component);

exports.default = Charts;