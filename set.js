// ES6 Set
(function(global) {
    var NaNSymbol = Symbol('NaN')

    var encodeVal = function(value) {
    	return value !== value ? NaNSymbol : value
    }

    var decodeVal = function(value) {
    	return (value === NaNSymbol) ? NaN : value
    }
})(this)