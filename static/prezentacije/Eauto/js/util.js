function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}

jQuery.fn.outerHTML = function() {
  return jQuery('<div />').append(this.eq(0).clone()).html();
};

jQuery.fn.absoluteTop = function() {
	/*console.log('absoluteTop: '
		+ this[0].nodeName
		+ '#'
		+ jQuery(this).prop('id')
		+ '.'
		+ jQuery(this).prop('class')
		+ ': +' + jQuery(this).position().top);*/
	debugLine('absoluteTop: '
		+ this[0].nodeName
		+ '#'
		+ jQuery(this).prop('id')
		+ '.'
		+ jQuery(this).prop('class')
		+ ': +' + jQuery(this).position().top);
	if (this[0].nodeName.toLowerCase() !== 'html')
	{
		return jQuery(this).position().top + jQuery(this).parent().absoluteTop();
	}
	else
	{
		return jQuery(this).position().top;
	}
}

if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  }
}

jQuery.extend( jQuery.fn, {
    hasParent: function( p ) {
        return $(p).find(this).length;
    }
});

jQuery.extend( jQuery.fn, {
    hasParentFilter: function( p ) {
        return this.filter(function () {
            return $(p).find(this).length;
        });
    }
});

$.fn.toEm = function(settings){
    settings = jQuery.extend({
        scope: 'body'
    }, settings);
    var that = parseInt(this[0],10),
        scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
        scopeVal = scopeTest.height();
    scopeTest.remove();
    return (that / scopeVal).toFixed(8) + 'em';
};


$.fn.toPx = function(settings){
    settings = jQuery.extend({
        scope: 'body'
    }, settings);
    var that = parseFloat(this[0]),
        scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(settings.scope),
        scopeVal = scopeTest.height();
    scopeTest.remove();
    return Math.round(that * scopeVal) + 'px';
};

function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

function zeroes(num, iterations)
{
	ret = '';
	
	if (typeof iterations !== 'undefined')
	{
		for (var i = 0; i < iterations; i++)
		{
			ret += '0';
		}
	}
	else
	{
		if (num < 100)
		{
			ret += '0';
		}
		if (num < 10)
		{
			ret += '0';
		}
	}
	if (typeof num !== 'undefined')
	{
		ret += num.toString();
	}
	return ret;
}

function formatValue(val, unit, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	var _addUnit = typeof addUnit !== 'undefined'
		? addUnit : true;
	var _outputFraction = typeof outputFraction !== 'undefined'
		? outputFraction : false;
	var _decimalPlaces = typeof decimalPlaces !== 'undefined'
		? decimalPlaces : 2;
	var _decimalMark = typeof decimalMark !== 'undefined'
		? decimalMark : ',';
	var _thousandsSeparator = typeof thousandsSeparator !== 'undefined'
		? thousandsSeparator : ' ';
	
	/*console.log('formatValue(' + val + '): '
		+ 'unit = ' + unit
		+ ', addUnit = ' + _addUnit
		+ ', outputFraction = ' + _outputFraction
		+ ', decimalPlaces = ' + _decimalPlaces
		+ ', decimalMark = ' + _decimalMark
		+ ', thousandsSeparator = ' + _thousandsSeparator
	);*/
	
	
	if (!_outputFraction)
	{
		_decimalPlaces = 0;
	}
	
	val = (Math.round(val * Math.pow(10, _decimalPlaces))/Math.pow(10, _decimalPlaces)) + '';
	parts = val.split('.');
	if (parts.length < 2)
	{
		if (_outputFraction)
		{
			parts.push(_decimalMark + zeroes(undefined, _decimalPlaces));
		}
		else
		{
			parts.push('');
		}
	}
	else
	{
		parts[1] = _decimalMark + parts[1].substring(0, _decimalPlaces);
	}
	if (_thousandsSeparator.length > 0)
	{
		var regex = /(\d+)(\d{3})/;
		while (regex.test(parts[0]))
		{
			parts[0] = parts[0].replace(regex, '$1' + _thousandsSeparator + '$2');
		}
	}
	var ret = parts[0]
		+ (_outputFraction ? parts[1] : '')
		+ (_addUnit ? ' ' + unit : '');
	//console.log('output = ' + ret);
	return ret;
}

function formatNumeric(amount, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(amount, '', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatPercentage(num, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(num, '%', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatCurrency(amount, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator, currency)
{
	return formatValue(amount, typeof currency === 'undefined' ? '€' : currency, addUnit, outputFraction,
		decimalPlaces, decimalMark, thousandsSeparator)
}

function formatMonths(amount, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	if (amount % 10 == 1 && Math.floor(amount / 10) % 10 != 1)
	{
		return formatValue(amount, 'mesec', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
	}
	else if (amount % 10 < 5 && amount % 10 > 0 && Math.floor(amount / 10) % 10 != 1)
	{
		return formatValue(amount, 'meseca', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
	}
	else
	{
		return formatValue(amount, 'meseci', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
	}
}

function formatDistance(dist, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(dist, 'km', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatHorsePower(hp, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(hp, 'KS', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatPower(power, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(power, 'kW', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatVolume(vol, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(vol, 'cm³', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function formatRPM(rpm, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	return formatValue(rpm, 'rpm', addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
}

function rangeToString(low, high)
{
	//console.log('rangeToString: low = ' + low + ', high = ' + high);
	var range = '';
	if (typeof low !== 'undefined')
	{
		range += 'l' + low;
	}
	if (typeof high !== 'undefined')
	{
		range += 'u' + high;
	}
	if (range.length == 0)
	{
		range = '*';
	}
	return range;
}

function buildRange(varLow, boundLow, varHigh, boundHigh)
{
	var range = '';
	if (varLow != boundLow)
	{
		range += 'l' + varLow;
	}
	else
	{
		//debugLine('buildRange: varLow == boundLow');
	}
	if (varHigh < boundHigh)
	{
		range += 'u' + varHigh;
	}
	else
	{
		//debugLine('buildRange: varHigh >= boundHigh');
	}
	if (range.length == 0)
	{
		range = '*';
	}
	//debugLine('buildRange(' + varLow + ', ' + boundLow + ', ' + varHigh + ', ' + boundHigh + ') = ' + range);
	return range;
}

function buildRangeArray(low, high, delta, maxItems)
{
	var _delta = delta;
	
	if (typeof maxItems !== 'undefined')
	{
		// determine is current delta giving more items than maxItems
		if (Math.floor((high-low) / delta) > maxItems)
		{
			_delta = Math.floor((high-low) / maxItems);
		}
	}
	
	console.log('buildRangeArray: low = ' + low
		+ ', high = ' + high
		+ ', delta = ' + delta
		+ ', maxItems = ' + maxItems
		+ ', _delta = ' + _delta
	);
	
	var currentRangeStart = low;
	var result = [{high: low}];
	while (currentRangeStart < high)
	{
		var newSubrange = {};
		if (currentRangeStart + _delta < high)
		{
			newSubrange.low = currentRangeStart;
			newSubrange.high = currentRangeStart + _delta;
			result.push(newSubrange);
		}
		currentRangeStart += _delta;
	}
	result.push({low: currentRangeStart - _delta});
	return result;
}

function buildArray(low, high, delta, maxItems)
{
	var _delta = delta;
	
	if (typeof maxItems !== 'undefined')
	{
		// determine is current delta giving more items than maxItems
		if (Math.floor((high-low) / delta) > maxItems)
		{
			_delta = Math.floor((high-low) / maxItems);
		}
	}
	
	var current = low;
	var result = [];
	while (current <= high)
	{
		result.push(current);
		current += _delta;
	}
	return result;
}

function formatRange(range, formatFunction, formatFunctionAndLess, formatFunctionAndMore, formatFunctionAll,
	noRangeWhenSingleValue)
{
	var parse = range.match(/(l(\d+))?(u(\d+))?/);
	var lower = parse[2];
	var upper = parse[4];
	var ret = '';
	
	var nRWSV = typeof noRangeWhenSingleValue === 'undefined'
		? false
		: noRangeWhenSingleValue;
	
	/*console.log('FORMATRANGE: range = ' + range
		+ ', lower = ' + (lower != null ? lower : '(null)')
		+ ', upper = ' + (upper != null ? upper : '(null)')
	);*/
	
	/*debugLine('FORMATRANGE: range = ' + range
		+ ', lower = ' + (lower != null ? lower : '(null)')
		+ ', upper = ' + (upper != null ? upper : '(null)')
	);*/
	
	if (lower == '') lower = null;
	if (upper == '') upper = null;
	
	if (lower != null && upper != null)
	{
		if (typeof formatFunction !== 'undefined')
		{
			ret = formatFunction(lower, false) + ' - ' + formatFunction(upper);
		}
		else
		{
			ret = lower + ' - ' + upper;
		}
	}
	else if (lower == null && upper == null)
	{
		ret = formatFunctionAll();
	}
	else if (lower == null)
	{
		if (nRWSV)
		{
			if (typeof formatFunction !== 'undefined')
			{
				ret = formatFunction(upper);
			}
			else
			{
				ret = upper;
			}
		}
		else if (typeof formatFunctionAndLess !== 'undefined')
		{
			if (typeof formatFunction !== 'undefined')
			{
				ret = formatFunctionAndLess(formatFunction(upper));
			}
			else
			{
				ret = formatFunctionAndLess(upper);
			}
		}
		/*else
		{
			debugLine('FORMATFUNCANDLESS = UNDEFINED');
		}*/
	}
	else if (upper == null)
	{
		if (nRWSV)
		{
			if (typeof formatFunction !== 'undefined')
			{
				ret = formatFunction(lower);
			}
			else
			{
				ret = lower;
			}
		}
		else if (typeof formatFunctionAndMore !== 'undefined')
		{
			if (typeof formatFunction !== 'undefined')
			{
				ret = formatFunctionAndMore(formatFunction(lower));
			}
			else
			{
				ret = formatFunctionAndMore(lower);
			}
		}
		/*else
		{
			debugLine('FORMATFUNCANDMORE = UNDEFINED');
		}*/
	}
	//debugLine('FORMATRANGE: ret = ' + ret);
	return ret;
}

// object['multi.index.field']
function multiIndex(obj, multiIndex)
{
	var indices = multiIndex.split('.');
	var unwrap = obj;
	
	/*debugLine('multiIndex: obj = ' + obj + ', multiIndex = ' + multiIndex
		+ ', indices = [' + indices.toString() + ']');*/
	
	for (index in indices)
	{
		if (index != 'indexOf') // internet explorer...
		{
			unwrap = unwrap[indices[index]];
		}
	}
	return unwrap;
}

function formatYearAndLess(val)
{
	return 'pre ' + val;
}

function formatYearAndMore(val)
{
	return val + ' i posle';
}

function formatYearAll()
{
	return 'Sva godista';
}

function formatEnginePowerAndLess(val)
{
	return val + ' i manje';
}

function formatEnginePowerAndMore(val)
{
	return val + ' i vise';
}

function formatEnginePowerAll()
{
	return 'Sve snage motora';
}

function formatEngineVolumeAndLess(val)
{
	return val + ' i manje';
}

function formatEngineVolumeAndMore(val)
{
	return val + ' i vise';
}

function formatEngineVolumeAll()
{
	return 'Sve zapremine motora';
}

function formatRPMAndLess(val)
{
	return val + ' i manje';
}

function formatRPMAndMore(val)
{
	return val + ' i vise';
}

function formatRPMAll()
{
	return 'Sve'; // TODO
}

function formatVehicleCountText(vehicleCount)
{
	if (vehicleCount % 10 == 1 && Math.floor(vehicleCount / 10) % 10 != 1)
	{
		return 'vozilo';
	}
	/*else if (vehicleCount % 10 < 5 && vehicleCount % 10 > 0 && Math.floor(vehicleCount / 10) % 10 != 1)
	{
		return 'vozila';
	}*/
	else
	{
		return 'vozila';
	}
}

function formatCompanyCountText(companyCount)
{
	if (companyCount % 10 == 1 && Math.floor(companyCount / 10) % 10 != 1)
	{
		return 'firma';
	}
	else if (companyCount % 10 < 5 && companyCount % 10 > 1 && Math.floor(companyCount / 10) % 10 != 1)
	{
		return 'firme';
	}
	else
	{
		return 'firmi';
	}
}

function formatScoreCountText(scoreCount)
{
	/*if (scoreCount % 10 == 1 && Math.floor(scoreCount / 10) % 10 != 1)
	{
		return 'ocena';
	}
	else*/ if (scoreCount % 10 < 5 && scoreCount % 10 > 1 && Math.floor(scoreCount / 10) % 10 != 1)
	{
		return 'ocene';
	}
	else
	{
		return 'ocena';
	}
}

function formatDOWShort(dow)
{
	switch(dow)
	{
		case 0: return 'Pon'; break;
		case 1: return 'Uto'; break;
		case 2: return 'Sre'; break;
		case 3: return 'Čet'; break;
		case 4: return 'Pet'; break;
		case 5: return 'Sub'; break;
		case 6: return 'Ned'; break;
		default: return '';
	}
}


function getFileIcon(path)
{
	var ext = /\.([A-Za-z0-9]+)$/;
	ext = ext.exec(path);
	switch (ext[1].toLowerCase())
	{
		case 'pdf':
			return 'img/filetypes/pdf.gif';
			break;
		case 'txt':
			return 'img/filetypes/txt.gif';
			break;
		default:
			return 'img/filetypes/default.gif';
	}
}

function coverPassword(pass, coverChar)
{
	var ret = '';
	var coverChar = typeof coverChar === 'undefined' ? '*' : coverChar;
	
	if (typeof pass !== 'undefined')
	{
		for (var i = 0; i < pass.length; i++)
		{
			ret += coverChar;
		}
	}
	
	return ret;
}

function parseCurrency(from, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator, currency)
{
	var ret;
	ret = from.split(' ')[0];
	/*console.log('PARSECURRENCY: thousandssep = {' + thousandsSeparator
		+ '}, decimalMark = {' + decimalMark
		+ '}, currency = {' + currency + '}'
	);*/
	ret = ret.replace(thousandsSeparator, '');
	ret = ret.replace(decimalMark, '.');
	ret = parseInt(ret);
	if (isNaN(ret))
	{
		ret = '';
	}
	return ret;
}

//function formatDistance(dist, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
function parseDistance(from, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator)
{
	var ret;
	ret = from.split(' ')[0];
	/*console.log('PARSECURRENCY: thousandssep = {' + thousandsSeparator
		+ '}, decimalMark = {' + decimalMark
		+ '}, currency = {' + currency + '}'
	);*/
	ret = ret.replace(thousandsSeparator, '');
	ret = ret.replace(decimalMark, '.');
	ret = parseInt(ret);
	if (isNaN(ret))
	{
		ret = '';
	}
	return ret;
}
