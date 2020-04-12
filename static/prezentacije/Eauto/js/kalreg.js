function RightListItem(number)
{
	this.number = number;
	this.type = undefined;
	this.year = undefined;
	this.power = undefined;
	this.volume = undefined;
	this.engineType = undefined;
	this.municipality = undefined;
	this.insurance = undefined;
	this.usagetax = undefined;
	this.tax = undefined;
	this.regsticker = undefined;
	this.checkup = undefined;
	this.plates = undefined;
	this.license = undefined;
	this.id = undefined;
	this.empty = true;
}

RightListItem.prototype.toString = function()
{
	if (!this.empty)
	{
		return this.year + '. god, ' + formatPower(this.power) + ', ' + formatVolume(this.volume);
		//return this.year + ' ' + this.maker + ' ' + this.submodel;
	}
	else
	{
		return 'Vozilo ' + this.number;
	}
}

RightListItem.prototype.assign = function(item)
{
	this.populate(item.type, item.year, item.power, item.volume,
				item.engineType, item.municipality, item.insurance, item.usagetax, item.tax,
				item.regsticker, item.checkup, item.plates, item.license, item.id);
}

RightListItem.prototype.populate = function(type, year, power, volume,
				engineType, municipality, insurance, usagetax, tax, regsticker,
				checkup, plates, license, id)
{
	this.type = type;
	this.year = year;
	this.power = power;
	this.volume = volume;
	this.engineType = engineType;
	this.municipality = municipality;
	this.insurance = insurance;
	this.usagetax = usagetax;
	this.tax = tax;
	this.regsticker = regsticker;
	this.checkup = checkup;
	this.plates = plates;
	this.license = license;
	this.id = id;
	this.empty = false;
}

RightListItem.prototype.depopulate = function()
{
	this.type = undefined;
	this.year = undefined;
	this.power = undefined;
	this.volume = undefined;
	this.engineType = undefined;
	this.municipality = undefined;
	this.insurance = undefined;
	this.usagetax = undefined;
	this.tax = undefined;
	this.regsticker = undefined;
	this.checkup = undefined;
	this.plates = undefined;
	this.license = undefined;
	this.id = undefined;
	this.empty = true;
}

RightListItem.prototype.getRegistrationCost = function()
{
	var _insurance = 0;
	if (typeof this.insurance !== 'undefined')
	{
		_insurance = this.insurance;
	}
	var _usagetax = 0;
	if (typeof this.usagetax !== 'undefined')
	{
		_usagetax = this.usagetax;
	}
	var _tax = 0;
	if (typeof this.tax !== 'undefined')
	{
		_tax = this.tax;
	}
	var _regsticker = 0;
	if (typeof this.regsticker !== 'undefined')
	{
		_regsticker = this.regsticker;
	}
	var _checkup = 0;
	if (typeof this.checkup !== 'undefined')
	{
		_checkup = this.checkup;
	}
	var _plates = 0;
	if (typeof this.plates !== 'undefined')
	{
		_plates= this.plates;
	}
	var _license = 0;
	if (typeof this.license !== 'undefined')
	{
		_license = this.license;
	}
	return _insurance + _usagetax + _tax + _regsticker + _checkup + _plates + _license;
}

/*RightListItem.prototype.setApp = function(app)
{
	this.app = app;
}*/

function KalregApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.rightListMaxEntries = 5;
	this.infoBoxDelay = 3000;
	this.carListChangeHideDelay = 200;
	this.carListChangeShowDelay = 700;
	
	this.formHideAnimationDelay = 0;
	this.driverTestYear = { min: 1950, max: 2013 };
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.lastPopulatedItem = -1;
	this.eventsInitFirstTime = true;
}

KalregApp.prototype.updateRightListMinMaxItemAmount = function(amount)
{
	/*console.log('urlmma: before: this.rightListMinItemAmount = '
		+ this.rightListMinItemAmount
		+ ', this.rightListMaxItemAmount = '
		+ this.rightListMaxItemAmount
		+ ', amount = '
		+ amount
	);*/
	if (typeof this.rightListMinItemAmount === 'undefined'
		|| amount < this.rightListMinItemAmount)
	{
		this.rightListMinItemAmount = amount;
	}
	if (typeof this.rightListMaxItemAmount === 'undefined'
		|| amount > this.rightListMaxItemAmount)
	{
		this.rightListMaxItemAmount = amount;
	}
	/*console.log('urlmma: after: this.rightListMinItemAmount = '
		+ this.rightListMinItemAmount
		+ ', this.rightListMaxItemAmount = '
		+ this.rightListMaxItemAmount);*/
}

KalregApp.prototype.formatRightListItem = function(item, index, thisParam)
{
	var html = '';
	var barWidth = 0;
	var percentage = 0;	
	var minWidth = 260;
	var arrowWidth = 50;
	
	maxWidth = $('#right-list').width() - 70
										//- 100
										//- 135
							            // ^ buttons
										- arrowWidth;
	//console.log('minWidth = ' + minWidth);
	//console.log('maxWidth = ' + maxWidth);
	//console.log('formatRightListItem: ');
	//console.log(item);
	if (item.empty == true)
	{
		//console.log('item.empty == true');
		barWidth = maxWidth;
		html += '<h3 class="right-list-item-title empty">&nbsp;</h3>'
			//+ '<div class="right-list-item-image empty"><img src="img/kalregemptyitem.png" /></div>'
			+ '<div class="right-list-item-text empty">'
			+ item.toString()
			+ '</div>'
			+ '<div class="right-list-item-bar empty" style="width: '
			+ barWidth
			+ 'px; min-width: '
			+ barWidth
			+ 'px">&nbsp;</div>'
			+ '<div class="right-list-item-arrow empty">&#59238;</div>'
			/*+ '<a href="#" class="details-car btn disabled"><i class="icon-share"></i></a>'
			+ '<a href="#" class="remove-car btn disabled"><i class="icon-remove"></i></a>'*/
			;
	}
	else
	{
		var regCost = item.getRegistrationCost();
		if (thisParam.rightListMaxItemAmount != 0
			&& (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount != 0))
		{
			percentage = (regCost - thisParam.rightListMinItemAmount)
				/ (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount);
		}
		if (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount == 0)
		{
			percentage = 0; // minimalna duzina trake za prvu stavku (0 = 0%, 1 = 100%)
		}
		barWidth = minWidth + percentage * (maxWidth - minWidth);
		var fullBarWidth = barWidth + arrowWidth;
		
		html += '<h3 class="right-list-item-title">'
			+ item.toString()
			+ '</h3>'
			/*+ '<div class="right-list-item-image"><img src="'
			+ thisParam.carData['type'][item.id.type].imagePath
			+ '" /></div>'*/
			+ '<div class="right-list-item-text">Registracija = '
			+ formatCurrency(regCost, undefined, 'DIN')
			+ '</div>'
			+ '<div class="right-list-item-bar" style="width: '
			+ barWidth
			+ 'px; min-width: '
			+ barWidth
			+ 'px">&nbsp;</div>'
			+ '<div class="right-list-item-arrow">&#59238;</div>'
			/*+ '<a href="#" data-car-index="'
			+ (item.number-1)
			+ '" class="details-car btn gray"><i class="icon-share"></i></a>'*/
			+ '<a href="#" data-car-index="'
			+ (item.number-1)
			//+ '" class="remove-car btn gray"><i class="icon-remove"></i></a>'
			+ '" class="remove-car btn gray"><span class="remove-icon">&#10060;</span></a>'
			+ '<div class="click-area" style="width: ' + fullBarWidth + 'px; min-width: ' + fullBarWidth + 'px">&nbsp;</div>'
			;
	}
	//console.log(html);
	return html;
}

KalregApp.prototype.activateInfoWindow = function()
{
	$('#info-background').css({ opacity: '0.75' }).addClass('active');
	$('#info').css({ opacity: '1.0' }).addClass('active');
}

KalregApp.prototype.deactivateInfoWindow = function()
{
	$('#info-background').removeClass('active');
	$('#info').removeClass('error active');
}

KalregApp.prototype.fadeOutInfoWindow = function(app)
{
	$('#info-background').animate({ opacity: '0.0' }, 200);
	$('#info').animate({ opacity: '0.0' }, 200, function(){
		app.deactivateInfoWindow();
	});
}

KalregApp.prototype.openInfoWindow = function(message)
{
	var _this = this;
	clearTimeout($.data(this, 'infoFadeTimeout'));
	this.activateInfoWindow();
	$('#info')
		.css({ opacity: '1.0' })
		.find('#info-text')
			.html(message)
			.end()
		.addClass('error active');
	$.data(this, 'infoFadeTimeout', setTimeout(
		function() { _this.fadeOutInfoWindow(_this) },
		this.infoBoxDelay)
	);
}

KalregApp.prototype.markFields = function(id, fieldList, message, wrapper)
{
	var name = '';
	var _wrapper = 'p';
	if (typeof wrapper !== 'undefined')
	{
		_wrapper = wrapper;
	}
	for (i in fieldList)
	{
		var field = fieldList[i];
		var $wrap;
		if (_wrapper != 'p' && $(field.id).hasParent('.ddOutOfVision'))
		{
			$wrap = $(field.id).closest('.ddOutOfVision').next();
		}
		else
		{
			$wrap = $(field.id).closest(_wrapper);
		}
		console.log('markFields: wrap = ');
		console.log($wrap);
		$wrap.addClass('error');
		name += field.name + '-';
	}
	name = name.substring(0, name.length-1);
	if (typeof message !== 'undefined')
	{
		this.addError(id, name, message);
	}
	/*var $errorDesc = $p.siblings('.error-desc');
	$errorDesc
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');*/
}

KalregApp.prototype.unmarkFields = function(id, fieldList, indexList, wrapper)
{
	var name = '';
	var index = 0;
	var activeFields = 0;
	var _wrapper = 'p';
	if (typeof wrapper !== 'undefined')
	{
		_wrapper = wrapper;
	}
	for (i in fieldList)
	{
		var field = fieldList[i];
		var $wrap;
		if (_wrapper != 'p' && $(field.id).hasParent('.ddOutOfVision'))
		{
			$wrap = $(field.id).closest('.ddOutOfVision').next();
		}
		else
		{
			$wrap = $(field.id).closest(_wrapper);
		}
		if (indexList.indexOf(index) != -1)
		{
			$wrap.removeClass('error');
		}
		if ($wrap.hasClass('error'))
		{
			activeFields = activeFields + 1;
		}
		name += field.name + '-';
		index = index + 1;
	}
	name = name.substring(0, name.length-1);
	var $errorDesc = $wrap.siblings('.error-desc');
	console.log('calling clearErrorDescriptions');
	this.clearErrorDescriptions(id);
	
	/*$errorDesc.find('span.' + name).remove();
	if ($errorDesc.find('span').length == 0)//activeFields == 0)
	{
		$errorDesc.addClass('inactive');
	}*/
}

KalregApp.prototype.addError = function(id, name, message)
{
	$(id + ' .error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

KalregApp.prototype.clearErrorDescriptions = function(id)
{
	console.log('clearErrorDescriptions()');
	$(id + ' .error-desc')
		.empty()
		.addClass('inactive');
}

KalregApp.prototype.addItem = function(type, year, power, volume,
	engineType, municipality, insurance, usagetax, tax, regsticker, checkup, plates, license, id)
{
	/*console.log('this.lastPopulatedItem = ' + this.lastPopulatedItem);
	console.log('this.rightListMaxEntries-1 = ' + (this.rightListMaxEntries-1));*/
	var _this = this;
	
	var data = $('#right-list').data('advlist').getData();
	for (itemId in data)
	{
		console.log('comparing data[' + itemId + ']:');
		console.log(data[itemId]);
		console.log('to id:');
		console.log(id);
		if (!data[itemId].empty
			&& data[itemId].id.type == id.type
			&& data[itemId].id.year == id.year
			&& data[itemId].power == power
			&& data[itemId].volume == volume
			&& ((typeof data[itemId].id.engineType === 'undefined'
				&& typeof id.engineType === 'undefined')
				|| (
					typeof data[itemId].id.engineType !== 'undefined'
					&& typeof id.engineType !== 'undefined'
					&& data[itemId].id.engineType == engineType
					)
				)
			&& data[itemId].id.municipality == id.municipality
			//&& ((typeof data[itemId].degree === 'undefined'
			//	&& typeof degree === 'undefined')
			//	|| (typeof data[itemId].degree !== 'undefined'
			//		&& typeof degree !== 'undefined'
			//		&& data[itemId].degree == degree))
			)
		{
			this.addError('#registration-page', 'car-already-entered', 'Automobil je vec unet.');
			//this.openInfoWindow('Automobil je vec unet.');
			return false;
		}
	}
	
	if (this.lastPopulatedItem == this.rightListMaxEntries-1)
	{
		this.addError('#registration-page', 'list-full', 'Mozete uneti najvise 5 automobila.');
		//this.openInfoWindow('Mozete uneti najvise 5 automobila.');
		return false;
	}
	
	var item = this.getItem(this.lastPopulatedItem + 1);
	if (typeof item !== 'undefined')
	{
		$('#right-list').animate({ opacity: '0.0' }, this.carListChangeHideDelay, function() {
			item.populate(type, year, power, volume,
				engineType, municipality, insurance, usagetax, tax, regsticker, checkup, plates, license, id);
			_this.updateRightListMinMaxItemAmount(item.getRegistrationCost());
			_this.lastPopulatedItem = _this.lastPopulatedItem + 1;
			_this.updateList();
			$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
		});
	}
	return true;
}

KalregApp.prototype.populateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var html = '';
	var $elem;
	
	console.log('populateFilter(name = ' + filterName + ', id = ' + filterId + ', param = ' + filterParam + ')');
	
	if (filterName == 'type')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ this.carData[filterName+'.display'] + '</option>';
		for (type in this.carData[filterName])
		{
			html += '<option value="' + filterParam.carData[filterName][type].name + '" data-image="'
				+ filterParam.carData[filterName][type].optionImagePath + '"></option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'year')
	{
		$elem = $('select#' + filterId);
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (year in filterParam.carData[filterName])
		{
			var _year = filterParam.carData[filterName][year];
			//var range = rangeToString(_year.low, _year.high);
			html += '<option value="' + _year + '">' + _year + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'engineType')
	{
		$elem = $('select#' + filterId);
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (engineType in filterParam.carData[filterName])
		{
			var _engineType = filterParam.carData[filterName][engineType];
			//var range = rangeToString(_year.low, _year.high);
			html += '<option value="' + _engineType + '">' + _engineType + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'municipality')
	{
		$elem = $('select#' + filterId);
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (municipality in filterParam.carData[filterName])
		{
			var _municipality = filterParam.carData[filterName][municipality];
			//var range = rangeToString(_year.low, _year.high);
			html += '<option value="' + _municipality + '">' + _municipality + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	/*else if (filterName == 'power')
	{
		$elem = $('select#' + filterId);
		var formatFunction = evt.data.formatFunction;
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (power in filterParam.carData[filterName])
		{
			var _power = filterParam.carData[filterName][power];
			//var range = rangeToString(_power.low, _power.high);
			html += '<option value="' + _power + '">' + _power + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'volume')
	{
		$elem = $('select#' + filterId);
		var formatFunction = evt.data.formatFunction;
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (volume in filterParam.carData[filterName])
		{
			var _volume = filterParam.carData[filterName][volume];
			//var range = rangeToString(_volume.low, _volume.high);
			html += '<option value="' + _volume + '">' + _volume + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'degree')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		for (degree in filterParam.carData[filterName])
		{
			var _degree = filterParam.carData[filterName][degree];
			html += '<option value="deg' + degree + '">'
				+ _degree
				+ '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}*/
	
	/*var $p = $select.parent().parent();
	$select.detach().empty().html(html);
	$p.empty().append($select);
	console.log('calling (\'select#'+filterId+'\').msDropDown...');
	$('select#' + filterId).msDropDown({'animStyle': 'none'});
	console.log('... done');*/
}

KalregApp.prototype.depopulateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var html = '';
	var $elem;
	
	if (filterName == 'model'
		|| filterName == 'year'
		|| filterName == 'engine')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
}

KalregApp.prototype.populateField = function(evt)
{
	var fieldName = evt.data.fieldName;
	var fieldId = evt.data.fieldId;
	var fieldParam = evt.data.fieldParam;
	var html = '';
	var $elem;
	
	if (fieldName == 'driverTestYear')
	{
		$elem = $('select#' + fieldId);
		//console.log('carData = ');
		//console.log(fieldParam.carData);
		html += '<option value="' + fieldParam.carData[fieldName+'.display'] + '" selected="selected">'
			+ fieldParam.carData[fieldName+'.display'] + '</option>';
		for (var year = fieldParam.driverTestYear.min; year < fieldParam.driverTestYear.max; year++)
		{
			html += '<option value="' + year + '">' + year + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
}

/*KalReg.prototype.rangeToString = function(varLow, boundLow, varHigh, boundHigh)
{
	var range = '';
	if (varLow != boundLow)
	{
		range += 'l' + varLow;
	}
	if (varHigh < boundHigh)
	{
		range += 'u' + varHigh;
	}
	if (range.length == 0)
	{
		range = '*';
	}
	return range;
}*/

KalregApp.prototype.initCarData = function()
{
	// mandatory:
	// 1. type
	// 2. year
	// 3. power
	// 4. volume
	// ==========
	// optional:
	// 5. degree
	this.carData = {
		'type': [{
			name: 'car',
			imagePath: 'img/kalregcaritem.png',
			optionImagePath: 'img/car.png'
		}],
		'type.display': 'Vrsta vozila',
		'year': buildArray(1980, 2012, 1),
		'year.display': 'Godiste',
		'engineType': [
			'Tip motora 1',
			'Tip motora 2',
			'Tip motora 3',
			'Tip motora 4'
		],
		'engineType.display': 'Tip motora',
		'municipality': [
			'Opstina 1',
			'Opstina 2',
			'Opstina 3',
			'Opstina 4'
		],
		'municipality.display': 'Opstina',
		'driverTestYear.display': 'Godina polaganja voznje',
		/*'power': buildArray(200, 450, 50),
		'power.display': 'Snaga motora',
		'volume': buildArray(10000, 50000, 1000),
		'volume.display': 'Zapremina motora',
		'degree': [
			'Stepen 1',
			'Stepen 2',
			'Stepen 3',
			'Stepen 4'
		],
		'degree.display': 'Premijski stepen',*/
		'values': []
	};
	
	for (type in this.carData['type'])
	{
		this.carData['values'][type] = [];
		for (year in this.carData['year'])
		{
			this.carData['values'][type][year] = [];
			/*for (engineType in this.carData['engineType'])
			{
				this.carData['values'][type][year][engineType] = [];*/
				for (municipality in this.carData['municipality'])
				{
					this.carData['values'][type][year]//[engineType]
					[municipality] = [];
			/*for (power in this.carData['power'])
			{
				this.carData['values'][type][year][power] = [];
				for (volume in this.carData['volume'])
				{*/
					this.carData['values'][type][year]//[engineType]
					[municipality] = {};//[power][volume] = {};
					var car = this.carData['values'][type][year]//[engineType]
					[municipality];
					car.insurance = Math.ceil(Math.random() * 3000 + 1000);
					car.usagetax = Math.ceil(Math.random() * 3000 + 1000);
					car.tax = Math.ceil(Math.random() * 3000 + 1000);
					car.regsticker = Math.ceil(Math.random() * 3000 + 1000);
					car.checkup = Math.ceil(Math.random() * 3000 + 1000);
					car.plates = Math.ceil(Math.random() * 3000 + 1000);
					car.license = Math.ceil(Math.random() * 3000 + 1000);
					car.id = {
						type: type,
						year: year,/*,
						power: power,
						volume: volume*/
						//engineType: engineType,
						municipality: municipality
					};
				/*}
			}*/
				}
			//}
		}
	}
	//console.log(this.carData);
}

KalregApp.prototype.createRightListItems = function(thisParam)
{
	var data = [];
	for (var i = 0; i < thisParam.rightListMaxEntries; i++)
	{
		var newItem = new RightListItem(i + 1);
		data.push(newItem);
	}
	return data;
}

KalregApp.prototype.getItem = function(index)
{
	var data = $('#right-list').data('advlist').getData();
	/*console.log('getItem(): data = ');
	console.log(data);
	console.log('index = ' + index + ', data[index] = ' + data[index]);*/
	if (typeof data[index] === 'undefined')
	{
		return undefined;
	}
	else
	{
		return data[index];
	}
}

KalregApp.prototype.initRightList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	$('#right-list').empty().advlist({
		dataCreate: this.createRightListItems,
		dataCreateParam: this,
		dataFormat: this.formatRightListItem,
		dataFormatParam: this,
		//function(obj, listIndex, event, target, param) {},
		onClick: function(obj, index, evt, target, self) {
			console.log('onClick: target = ');
			console.log(target);
			console.log(', param = ');
			console.log(self);
			if ($(target).hasClass('click-area'))
			{
				self.openDetails(target, self);
				//$(target).parent().find('.details-car').trigger('click');
			}
		},
		onClickParam: self,
			//function(obj, listIndex, event, target, param) {},
		onMouseOver: function(obj, index, event, target) {
			if ($(target).hasClass('click-area'))
			{
				//$(target).parent().find('.details-car').addClass('hovered');
				$(target).parent().find('.right-list-item-bar').addClass('hovered');
				$(target).parent().find('.right-list-item-arrow').addClass('hovered');
			}
		},
		onMouseOut: function(obj, index, event, target) {
			if ($(target).hasClass('click-area'))
			{
				//$(target).parent().find('.details-car').removeClass('hovered');
				$(target).parent().find('.right-list-item-bar').removeClass('hovered');
				$(target).parent().find('.right-list-item-arrow').removeClass('hovered');
			}
		},
		height: '600px'
	});
	/*this.addItem('Audi', 'A5', 2007, 0, 'img/listcar-001.png',
		3500, 1700, 2100, 0.15, '2.0T Premium Wagon 4-door');
	this.addItem('Opel', 'Astra H1.7 cdti sw', 2008, 20000, 'img/listcar-001.png',
		3700, 2400, 2000, 0.28, '2.0T Premium Wagon 4-door');
	this.addItem('BMW', 'M3 0.2 lala', 2006, 30000, 'img/listcar-001.png',
		2800, 1100, 2200, 0.07, '2.0T Premium Wagon 4-door');
	this.updateList();*/
	self = null;
}

KalregApp.prototype.compareItemsByRegistrationCost = function(i1, i2)
{
	var r1 = i1.getRegistrationCost(), r2 = i2.getRegistrationCost();
	if (i1.empty && !i2.empty)
	{
		return 1;
	}
	else if (!i1.empty && i2.empty)
	{
		return -1;
	}
	else if (i1.empty && i2.empty)
	{
		var n1 = parseInt(i1.toString().substring(7)),
			n2 = parseInt(i2.toString().substring(7));
		return n1 < n2 ? -1 : (n1 > n2 ? 1 : 0);
	}
	else return (r1 < r2 ? -1 : (r1 > r2 ? 1 : 0));
}

KalregApp.prototype.updateList = function()
{
	//console.log('updateList() called');
	
	// Sort
	var list = $('#right-list').data('advlist').getData();
	list.sort(this.compareItemsByRegistrationCost);
	var i = list.length-1;
	var found = false;
	while (!found && i > -1)
	{
		if (!list[i].empty)
		{
			this.lastPopulatedItem = i;
			found = true;
		}
		i = i - 1;
	}
	if (i == -1 && !found)
	{
		this.lastPopulatedItem = -1;
	}
	//console.log('updateList: this.lastPopulatedItem = ' + this.lastPopulatedItem);
	$('#right-list').data('advlist').redraw();
	this.initEvents();
}

KalregApp.prototype.removeItem = function(index)
{
	//console.log('removeItem(' + index + ') called');
	var data = $('#right-list').data('advlist').getData();
	var item;
	var _this = this;
	$('#right-list').animate({ opacity: '0.0' }, this.carListChangeHideDelay, function() {
		if (typeof data[index] !== 'undefined')
		{
			for (i = index; i < data.length-1; i++)
			{
				if (data[i+1].empty)
				{
					data[i].depopulate();
				}
				else
				{
					data[i].assign(data[i+1]);
				}
			}
			data[data.length-1].depopulate();
		}
		_this.rightListMinItemAmount = undefined;
		_this.rightListMaxItemAmount = undefined;
		for (i = 0; i < data.length-1; i++)
		{
			if (!data[i].empty)
			{
				_this.updateRightListMinMaxItemAmount(data[i].getRegistrationCost());
			}
		}
		_this.updateList();
		$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
	});
}

KalregApp.prototype.populatePopup = function(item)
{
	/*this.type = undefined;
	this.year = undefined;
	this.power = undefined;
	this.volume = undefined;
	this.degree = undefined;
	this.insurance = undefined;
	this.usagetax = undefined;
	this.tax = undefined;
	this.regsticker = undefined;
	this.checkup = undefined;
	this.plates = undefined;
	this.license = undefined;*/

	$('.popup-title h2').text(item.toString());
	$('.popup-title h3').text('');
	$('.popup .insurance').text(formatCurrency(item.insurance));
	$('.popup .usagetax').text(formatCurrency(item.usagetax));
	$('.popup .tax').text(formatCurrency(item.tax));
	$('.popup .regsticker').text(formatCurrency(item.regsticker));
	$('.popup .checkup').text(formatCurrency(item.checkup));
	$('.popup .plates').text(formatCurrency(item.plates));
	$('.popup .license').text(formatCurrency(item.license));
	$('.popup .regcost').text(formatCurrency(item.getRegistrationCost()));
	
	/*$('.popup .green .text-inner-amount').text(formatCurrency(item.fuel));
	$('.popup .orange .text-inner-amount').text(formatCurrency(item.insurance));
	$('.popup .red .text-inner-amount').text(formatCurrency(item.maintenance));
	$('.popup .blue .text-inner-amount').text(formatCurrency(item.getFiveYear()));*/
}

KalregApp.prototype.initFields = function()
{
	var self = this;
	//console.log('initFields: this = ');
	//console.log(self);
	
	this.populateField({
		data: {
			fieldName: 'driverTestYear',
			fieldId: 'owner-drivertestyear',
			fieldParam: self
		}
	});
}

KalregApp.prototype.openDetails = function(target, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $target = $(target)[0].nodeName.toLowerCase() == 'li' ? $(target) : $(target).closest('li');

	$('.popup-background').addClass('active').css({ opacity: '0.7' });
	$('.popup').addClass('active');
	var item = self.getItem($target.index()); //$(this).data('car-index'));
	self.populatePopup(item);
	
	item = null;
	self = null;
	$target = null;
}

KalregApp.prototype.initEvents = function(self)
{
	//console.log('initEvents() called');
	var self = typeof self === 'undefined' ? this : self;
	
	$('.remove-car').off('click').on('click', $.proxy(function(evt) {
		//console.log('.remove-car.click()');
		var $target = $(evt.target).hasClass('remove-car') ? $(evt.target) : $(evt.target).closest('.remove-car');
		if (!$target.hasClass('disabled'))
		{
			var idx = $target.parent().index(); // parseInt($(this).data('car-index'));
			this.removeItem(idx);
		}
		$target = null;
		return false;
	}, self));
	/*$('.details-car').off('click').on('click', $.proxy(function(evt) {
		var $target = $(evt.target).hasClass('details-car') ? $(evt.target) : $(evt.target).closest('.details-car');
		if (!$target.hasClass('disabled'))
		{
			$('.popup-background').addClass('active').css({ opacity: '0.7' });
			$('.popup').addClass('active');
			var item = this.getItem($target.parent().index()); //$(this).data('car-index'));
			this.populatePopup(item);
			item = null;
		}
		$target = null;
		return false;
	}, self));*/
	//console.log('setting button-add-car handler!');

	//var addCarButtonWasDisabled = $('#button-add-car').hasClass('disabled');
	$('#button-add-car')//.removeClass('disabled')
		.off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $target = $(evt.target).prop('id') == 'button-add-car' ? $(evt.target) : $(evt.target).closest('#button-add-car');
		//console.log('in button-add-car handler!');
		var disabled = $target.hasClass('disabled');
		//console.log('disabled = ' + disabled);
		if (disabled)
		{
			$target = null;
			return false;
		}
		
		this.clearErrorDescriptions('#registration-page');
		
		// mandatory:
		// 1. type
		// 2. year
		// 3. power
		// 4. volume
		// ==========
		// optional:
		// 5. degree
		
		var allDefined = true;
		
		//console.log('self.selectedTypeIndex = ' + self.selectedTypeIndex);
		if (typeof this.selectedTypeIndex === 'undefined'
			|| this.selectedTypeIndex == -1)
		{
			this.markFields('#registration-page', [{
				id: '#filter-type',
				name: 'type'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite tip vozila.');
			//return false;
		}
		if (typeof this.selectedYearIndex === 'undefined'
			|| this.selectedYearIndex == -1)
		{
			this.markFields('#registration-page', [{
				id: '#filter-year',
				name: 'year'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite godiste.');
			//return false;
		}
		if (typeof this.enginePower === 'undefined'
			|| this.enginePower == '')
		{
			this.markFields('#registration-page', [{
				id: '#filter-power',
				name: 'power'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite snagu motora.');
			//return false;
		}
		if (typeof this.engineVolume === 'undefined'
			|| this.engineVolume == '')
		{
			this.markFields('#registration-page', [{
				id: '#filter-volume',
				name: 'volume'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite zapreminu motora.');
			//return false;
		}
		/*if (typeof self.selectedEngineTypeIndex === 'undefined'
			|| self.selectedEngineTypeIndex == -1)
		{
			self.markFields([{
				id: '#filter-enginetype',
				name: 'enginetype'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite tip motora.');
			//return false;
		}*/
		if (typeof this.selectedMunicipalityIndex === 'undefined'
			|| this.selectedMunicipalityIndex == -1)
		{
			this.markFields('#registration-page', [{
				id: '#filter-municipality',
				name: 'municipality'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite opstinu.');
			//return false;
		}
		/*else if (typeof self.selectedPowerIndex === 'undefined'
			|| self.selectedPowerIndex == -1)
		{
			self.openInfoWindow('Unesite snagu motora.');
			return false;
		}
		else if (typeof self.selectedVolumeIndex === 'undefined'
			|| self.selectedVolumeIndex == -1)
		{
			self.openInfoWindow('Unesite zapreminu motora.');
			return false;
		}
		if (typeof self.selectedDegreeIndex !== 'undefined'
			&& self.selectedDegreeIndex != -1)
		{
			degree = self.carData['degree'][self.selectedDegreeIndex];
		}*/
		
		if (!allDefined)
		{
			this.addError('#registration-page', 'enter-fields', 'Unesite obavezna polja.');
			$target = null;
			return false;
		}
		
		var val = this.carData['values']
				[this.selectedTypeIndex]
				[this.selectedYearIndex]
				//[self.selectedEngineTypeIndex]
				[this.selectedMunicipalityIndex]
				/*[self.selectedPowerIndex]
				[self.selectedVolumeIndex];*/
				;
		var id = {};
		for (prop in val.id)
		{
			id[prop] = val.id[prop];
		}
		id.typeIndex = this.selectedTypeIndex;
		id.yearIndex = this.selectedYearIndex;
		id.enginePower = this.enginePower;
		id.engineVolume = this.engineVolume;
		if (this.selectedEngineTypeIndex == -1)
		{
			id.engineType = undefined;
		}
		else
		{
			id.engineType = this.selectedEngineTypeIndex;
		}
		id.municipalityIndex = this.selectedMunicipalityIndex;
		if (this.addItem(
			this.carData['type'][this.selectedTypeIndex],
			this.carData['year'][this.selectedYearIndex],
			this.enginePower,//self.carData['power'][self.selectedPowerIndex],
			this.engineVolume,//self.carData['volume'][self.selectedVolumeIndex],
			(typeof this.selectedEngineTypeIndex !== 'undefined'
				? this.carData['engineType'][this.selectedEngineTypeIndex]
				: undefined),
			this.carData['municipality'][this.selectedMunicipalityIndex],
			val.insurance,
			val.usagetax,
			val.tax,
			val.regsticker,
			val.checkup,
			val.plates,
			val.license,
			id
		))
		{
			// Reset all filters
			this.resetFilters();
		}
		$target = null;
		return false;
	}, self));
	$('#button-submit')
		.off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		
		this.clearErrorDescriptions('#kasko-page');
		
		var allDefined = true;
		
		if (typeof this.selectedOwnerTypeIndex === 'undefined'
			|| this.selectedOwnerTypeIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#owner-type',
				name: 'owner-type'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.ownerName === 'undefined'
			|| this.ownerName.length == 0)
		{
			this.markFields('#kasko-page', [{
				id: '#owner-name',
				name: 'owner-name'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.selectedOwnerCityIndex === 'undefined'
			|| this.selectedOwnerCityIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#owner-city',
				name: 'owner-city'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.ownerEmail === 'undefined'
			|| this.ownerEmail.length == 0)
		{
			this.markFields('#kasko-page', [{
				id: '#owner-email',
				name: 'owner-email'
			}], undefined, '.wrapper');
			allDefined = false;
		}

		if (typeof this.selectedVehicleTypeIndex === 'undefined'
			|| this.selectedVehicleTypeIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-type',
				name: 'vehicle-type'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.selectedVehicleBrandIndex === 'undefined'
			|| this.selectedVehicleBrandIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-brand',
				name: 'vehicle-brand'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.selectedVehicleModelIndex === 'undefined'
			|| this.selectedVehicleModelIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-model',
				name: 'vehicle-model'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.selectedVehicleYearIndex === 'undefined'
			|| this.selectedVehicleYearIndex == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-year',
				name: 'vehicle-year'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.vehiclePower === 'undefined'
			|| this.vehiclePower == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-power',
				name: 'vehicle-power'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.vehicleVolume === 'undefined'
			|| this.vehicleVolume == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-volume',
				name: 'vehicle-volume'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		/*if (typeof this.vehicleRegDate === 'undefined'
			|| this.vehicleRegDate == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-regdate',
				name: 'vehicle-regdate'
			}], undefined, '.wrapper');
			allDefined = false;
		}
		if (typeof this.vehicleRegistration === 'undefined'
			|| this.vehicleRegistration == -1)
		{
			this.markFields('#kasko-page', [{
				id: '#vehicle-registration',
				name: 'vehicle-registration'
			}], undefined, '.wrapper');
			allDefined = false;
		}*/
		
		if (!allDefined)
		{
			this.addError('#kasko-page', 'enter-fields', 'Unesite obavezna polja.');
			return false;
		}
		
		var val = this.carData['values']
				[this.selectedTypeIndex]
				[this.selectedYearIndex]
				//[this.selectedEngineTypeIndex]
				[this.selectedMunicipalityIndex]
				/*[this.selectedPowerIndex]
				[this.selectedVolumeIndex];*/
				;
		var id = {};
		for (prop in val.id)
		{
			id[prop] = val.id[prop];
		}
		id.typeIndex = this.selectedTypeIndex;
		id.yearIndex = this.selectedYearIndex;
		id.enginePower = this.enginePower;
		id.engineVolume = this.engineVolume;
		if (this.selectedEngineTypeIndex == -1)
		{
			id.engineType = undefined;
		}
		else
		{
			id.engineType = this.selectedEngineTypeIndex;
		}
		id.municipalityIndex = this.selectedMunicipalityIndex;
		if (this.addItem(
			this.carData['type'][this.selectedTypeIndex],
			this.carData['year'][this.selectedYearIndex],
			this.enginePower,//this.carData['power'][this.selectedPowerIndex],
			this.engineVolume,//this.carData['volume'][this.selectedVolumeIndex],
			(typeof this.selectedEngineTypeIndex !== 'undefined'
				? this.carData['engineType'][this.selectedEngineTypeIndex]
				: undefined),
			this.carData['municipality'][this.selectedMunicipalityIndex],
			val.insurance,
			val.usagetax,
			val.tax,
			val.regsticker,
			val.checkup,
			val.plates,
			val.license,
			id
		))
		{
			// Reset all filters
			this.resetFilters();
		}
		return false;
	}, self));
	/*if (addCarButtonWasDisabled)
	{
		$('#button-add-car').addClass('disabled');
	}*/
	
	$('.popup-background').off('click').on('click', function() {
		$(this).next().find('.btn.close').trigger('click');
	});
	$('.popup .btn.close').off('click').on('click', function() {
		var $popup = $(this).parents('.popup');
		
		$popup
			.prev().removeClass('active').end()
			.removeClass('active');
		return false;
	});
	
	if (self.eventsInitFirstTime)
	{
		var introHeight = $('#intro').height();
		var leftSideHeight = $('#intro .left-side').height();
		var heightDelta = introHeight - leftSideHeight;
		var headHeight = $('#intro h1').height();
	
		$('.close-button a').off('click').on('click', {
			introHeight: introHeight,
			leftSideHeight: leftSideHeight,
			heightDelta: heightDelta,
			headHeight: headHeight,
			animDelay: 100,
			closeAnimDelay: 50
		}, $.proxy(closeClickHandler, self));
	}
	
	$('#info-background').off('click').on('click', function(evt) {
		evt.stopPropagation();
		clearTimeout($.data(self, 'infoFadeTimeout'));
		self.fadeOutInfoWindow(self);
		return false;
	});
	$('#info').off('click').on('click', function(evt) {
		evt.stopPropagation();
		clearTimeout($.data(self, 'infoFadeTimeout'));
		self.fadeOutInfoWindow(self);
		return false;
	});
	
	$('body').on('click', function() {
		if ($('#info').hasClass('active'))
		{
			$('#info').trigger('click');
		}
	});
	
	$('#intro .left-side h1')
		.off('mouseenter').on('mouseenter', function() {
			$('.close-button a').addClass('hovered');
		})
		.off('mouseleave').on('mouseleave', function() {
			$('.close-button a').removeClass('hovered');
		})
		.off('click').on('click', function() {
			$('.close-button a').trigger('click');
		});
		
	$('#registration-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#registration-tab').parent().addClass('active');
		this.slideIn('#registration-page', '.tab-content .tab-pane.active');
		return false;
	}, self));
	$('#kasko-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#kasko-tab').parent().addClass('active');
		this.slideIn('#kasko-page', '.tab-content .tab-pane.active');
		return false;
	}, self));
	self = null;
}

KalregApp.prototype.resetFilters = function()
{
	this.selectedTypeIndex = 0;
	$('#filter-type').msDropDown().data('dd').set('SelectedIndex', 0);
	this.populateFilter({
		data: {
			filterName: 'year',
			filterId: 'filter-year',
			filterParam: this
		}
	});
	this.selectedYearIndex = -1;
	$('#filter-power').val('');
	this.enginePower = '';
	$('#filter-volume').val('');
	this.engineVolume = '';
	this.populateFilter({
		data: {
			filterName: 'engineType',
			filterId: 'filter-enginetype',
			filterParam: this
		}
	});
	this.selectedEngineTypeIndex = -1;
	this.populateFilter({
		data: {
			filterName: 'municipality',
			filterId: 'filter-municipality',
			filterParam: this
		}
	});
	this.selectedMunicipalityIndex = -1;
}

KalregApp.prototype.initFilterEvents = function()
{
	this.selectedTypeIndex = $('select#filter-type').msDropDown().data('dd').get('selectedIndex');
	var self = this;
	
	/*this.populateFilter({
		data: {
			filterName: 'type',
			filterId: 'filter-type',
			filterParam: self
		}
	});*/
	this.populateFilter({
		data: {
			filterName: 'year',
			filterId: 'filter-year',
			filterParam: self,
			formatFunctionAndLess: formatYearAndLess,
			formatFunctionAndMore: formatYearAndMore,
			formatFunctionAll: formatYearAll
		}
	});
	this.populateFilter({
		data: {
			filterName: 'engineType',
			filterId: 'filter-enginetype',
			filterParam: self
		}
	});
	this.populateFilter({
		data: {
			filterName: 'municipality',
			filterId: 'filter-municipality',
			filterParam: self
		}
	});
	/*this.populateFilter({
		data: {
			filterName: 'power',
			filterId: 'filter-power',
			filterParam: self,
			formatFunction: formatHorsePower,
			formatFunctionAndLess: formatEnginePowerAndLess,
			formatFunctionAndMore: formatEnginePowerAndMore,
			formatFunctionAll: formatEnginePowerAll
		}
	});
	this.populateFilter({
		data: {
			filterName: 'volume',
			filterId: 'filter-volume',
			filterParam: self,
			formatFunction: formatVolume,
			formatFunctionAndLess: formatEngineVolumeAndLess,
			formatFunctionAndMore: formatEngineVolumeAndMore,
			formatFunctionAll: formatEngineVolumeAll
		}
	});
	this.populateFilter({
		data: {
			filterName: 'degree',
			filterId: 'filter-degree',
			filterParam: self
		}
	});*/
	
	$('#filter-type').off('change').on('change', function() {
		self.selectedTypeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-type',
			name: 'type'
		}], [0]);
	});
	$('#filter-year').off('change').on('change', function() {
		self.selectedYearIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-year',
			name: 'year'
		}], [0]);
	});
	$('#filter-enginetype').off('change').on('change', function() {
		self.selectedEngineTypeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-enginetype',
			name: 'enginetype'
		}], [0]);
	});
	$('#filter-municipality').off('change').on('change', function() {
		self.selectedMunicipalityIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-municipality',
			name: 'municipality'
		}], [0]);
	});
	/*$('#filter-power').off('change').on('change', function() {
		self.selectedPowerIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
	});
	$('#filter-volume').off('change').on('change', function() {
		self.selectedVolumeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
	});*/
	$('#filter-degree').off('change').on('change', function() {
		self.selectedDegreeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-degree',
			name: 'degree'
		}], [0]);
	});

	$('#owner-type').off('change').on('change', $.proxy(function(evt) {
		var $target = $('#owner-type');
		this.selectedOwnerTypeIndex = $target.msDropDown().data('dd').get('selectedIndex')-1;
		this.unmarkFields('#kasko-page', [{
			id: '#owner-type',
			name: 'owner-type'
		}], [0], '.wrapper');
		$target = null;
	}, self));
	$('#owner-name').off('change').on('change', $.proxy(function(evt) {
		var $target = $('#owner-name');
		this.ownerName = $target.val();
		this.unmarkFields('#kasko-page', [{
			id: '#owner-name',
			name: 'owner-name'
		}], [0], '.wrapper');
		$target = null;
	}, self));	
	$('#owner-city').off('change').on('change', function() {
		self.selectedOwnerCityIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#owner-city',
			name: 'owner-city'
		}], [0], '.wrapper');
	});
	$('#owner-email').off('change').on('change', function() {
		self.ownerEmail = $(this).val();
		self.unmarkFields('#kasko-page', [{
			id: '#owner-email',
			name: 'owner-email'
		}], [0], '.wrapper');
	});
	$('#owner-phone').off('change').on('change', function() {
		self.ownerPhone = $(this).val();
		self.unmarkFields('#kasko-page', [{
			id: '#owner-phone',
			name: 'owner-phone'
		}], [0], '.wrapper');
	});
	$('#vehicle-type').off('change').on('change', function() {
		self.selectedVehicleTypeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-type',
			name: 'vehicle-type'
		}], [0], '.wrapper');
	});
	$('#vehicle-brand').off('change').on('change', function() {
		self.selectedVehicleBrandIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-brand',
			name: 'vehicle-brand'
		}], [0], '.wrapper');
	});
	$('#vehicle-model').off('change').on('change', function() {
		self.selectedVehicleModelIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-model',
			name: 'vehicle-model'
		}], [0], '.wrapper');
	});
	$('#vehicle-year').off('change').on('change', function() {
		self.selectedVehicleYearIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-year',
			name: 'vehicle-year'
		}], [0], '.wrapper');
	});
	$('#vehicle-regdate').off('change').on('change', function() {
		self.vehicleRegDate = $(this).val();
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-regdate',
			name: 'vehicle-regdate'
		}], [0], '.wrapper');
	});
	$('#vehicle-registration').off('change').on('change', function() {
		self.vehicleRegistration = $(this).val();
		self.unmarkFields('#kasko-page', [{
			id: '#vehicle-registration',
			name: 'vehicle-registration'
		}], [0], '.wrapper');
	});

	$('#filter-power')//.off('change')
	.data('filterFunction', formatPower)
	.data('variableName', 'enginePower')
	.data('fieldName', 'power');
	
	$('#filter-volume')//.off('change')
	.data('filterFunction', formatVolume)
	.data('variableName', 'engineVolume')
	.data('fieldName', 'volume');

	$('#vehicle-power')//.off('change')
	.data('filterFunction', formatPower)
	.data('variableName', 'vehiclePower')
	.data('fieldName', 'vehicle-power');

	$('#vehicle-volume')//.off('change')
	.data('filterFunction', formatVolume)
	.data('variableName', 'vehicleVolume')
	.data('fieldName', 'vehicle-volume');
	function hideField(field)
	{
		var $field = $(field);
		var $wrapper = $field.closest('span.wrapper');
		//console.log('hideField(' + field + '): field.hasParent() = ');
		//console.log($field.hasParent('.ddOutOfVision'));
		if ($field.hasParent('.ddOutOfVision'))
		{
			$wrapper = $field.parent().next();
			$field = $wrapper.find('.dd');
		}
		//console.log('wrapper = ');
		//console.log($wrapper);
		//console.log('hiding field:');
		//console.log($field);
		if (!$wrapper.hasClass('hidden'))
		{
			$field.css({
				opacity: '1.0'
			}).animate({
				'opacity': '0.0'
			}, self.formHideAnimationDelay, function() {
				$wrapper.addClass('hidden');
			});
		}
	}
	function showField(field)
	{
		var $field = $(field);
		var $wrapper = $field.closest('span.wrapper');
		//console.log('showField(' + field + '): field.hasParent() = ');
		//console.log($field.hasParent('.ddOutOfVision'));
		if ($field.hasParent('.ddOutOfVision'))
		{
			$wrapper = $field.parent().next();
			$field = $wrapper.find('.dd');
		}
		//console.log('wrapper = ');
		//console.log($wrapper);
		//console.log('showing field:');
		//console.log($field);
		if ($wrapper.hasClass('hidden'))
		{
			$field.css({
				opacity: '0.0',
			});
			$wrapper.removeClass('hidden');
			$field.animate({
				'opacity': '1.0'
			}, self.formHideAnimationDelay);
		}
		if ($field.hasParent('.ddOutOfVision'))
		{
			initEAutoCustomDropdown($field);
		}
		$field = null;
	}
	$('#vehicle-type')//.off('change')
	.on('change', function() {
		var passengerOption = 1;
		var freightOption = 2;
		
		switch ($(this).msDropDown().data('dd').get('selectedIndex'))
		{
			case 0:
				hideField('#vehicle-body');
				hideField('#vehicle-doors');
				hideField('#vehicle-capacity');
				break;
			case passengerOption:
				showField('#vehicle-body');
				showField('#vehicle-doors');
				hideField('#vehicle-capacity');
				break;
			case freightOption:
				hideField('#vehicle-body');
				hideField('#vehicle-doors');
				showField('#vehicle-capacity');
				break;
		}
	});
	$('#owner-type').on('change', function() {
		var individualOption = 1;
		var entityOption = 2;
		
		switch ($(this).msDropDown().data('dd').get('selectedIndex'))
		{
			case 1:
				showField('#owner-drivertestyear');
				break;
			case 2:
			default:
				hideField('#owner-drivertestyear');
				break;
		}
	});
	
	$('input[type="text"]').each(function(){
		$(this)
			.on('keypress', function(evt) {
				//console.log('keypress fired!');
				//console.log(evt);
				// 48-57 cifre
				if (evt.keyCode >= 48 && evt.keyCode <= 57)
				{
					return true;
				}
				else if (evt.keyCode == 13)
				{
					console.log('keycode == 13!');
					$(this).blur();
					return true;
				}
				else
				{
					evt.stopPropagation();
					evt.preventDefault();
					return false;
				}
			})
		;
	});
	$('#registration-page input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				console.log('change: evt = ');
				console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				self.unmarkFields('#registration-page', [{
					id: '#' + $(this).prop('id'),
					name: $(this).data('fieldName')
				}], [0]);
				$(this).data('inputvalue', $(this).val());
			})
			.on('focusin', function(){
				$(this).val('');
				$(this).data('inputvalue', '');
				self[$(this).data('variableName')] = undefined;
			})
			.on('focusout', function(){
				var fun = $(this).data('filterFunction');
				if ($(this).val().length > 0)
				{
					var val = $(this).data('inputvalue');
					self[$(this).data('variableName')] = val;
					$(this).val(fun(val, true, false, 2, '', ''));
				}
				else
				{
					$(this).data('inputvalue', '');
					self[$(this).data('variableName')] = undefined;
				}
			})
		;
	});
	$('#kasko-page input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				//console.log('change: evt = ');
				//console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				self.unmarkFields('#kasko-page', [{
					id: '#' + $(this).prop('id'),
					name: $(this).data('fieldName')
				}], [0], '.wrapper');
				$(this).data('inputvalue', $(this).val());
			})
			.on('focusin', function(){
				$(this).val('');
				$(this).data('inputvalue', '');
				self[$(this).data('variableName')] = undefined;
			})
			.on('focusout', function(){
				var fun = $(this).data('filterFunction');
				if ($(this).val().length > 0)
				{
					var val = $(this).data('inputvalue');
					self[$(this).data('variableName')] = val;
					$(this).val(fun(val, true, false, 2, '', ''));
				}
				else
				{
					$(this).data('inputvalue', '');
					self[$(this).data('variableName')] = undefined;
				}
			})
		;
	});

	if (self.eventsInitFirstTime)
	{
		hideField('#owner-drivertestyear');
	
		hideField('#vehicle-body');
		hideField('#vehicle-doors');
		hideField('#vehicle-capacity');
	}
	self.eventsInitFirstTime = false;
}

function closeClickHandler(evt){
	var $closeButton = $(evt.target).hasClass('close-button') ? $(evt.target) : $(evt.target).closest('.close-button');
	evt.stopPropagation();
	//$closeButton.off('click');
	var closed = $('#intro').hasClass('closed');

	if (this.introAnimating)
	{
		console.log('1849: this.introAnimating = ' + this.introAnimating);
		$closeButton = null;
		return false;
	}

	if (closed)
	{
		//$this.animate({ opacity: '0.0' }, 200, function() {
			$('#intro').removeClass('closed');
			this.introAnimating = true;
			console.log('1859: this.introAnimating = ' + this.introAnimating);
			$closeButton
				//.find('.close-link-text').text('Zatvori').end()
				.find('.button-icon').addClass('up').removeClass('down');
			$('#intro').finish().animate({
				height: evt.data.introHeight + 'px'
			}, evt.data.animDelay, 'linear', $.proxy(function() {
				/*$('#intro .left-side').finish().animate({
					height: evt.data.leftSideHeight + 'px'
				}, evt.data.animDelay, 'linear');*/
				/*$('.intro-inner').animate({
					'padding-top': '2em'
				}, evt.data.animDelay);*/
				/*$('#intro h1').finish().animate({
					'font-size': '190%',
					'margin-top': '10px',
					'padding-bottom': '1em'
				}, evt.data.animDelay);*/
				$('#intro p,#intro .canvas').finish().animate({ opacity: '1.0' }, evt.data.animDelay);
				//$('#intro .left-side').animate({ height: introHeight + 'px' }, 200, function() {
					$closeButton.find('.button-icon').removeClass('down').addClass('up');
					//$this.animate({ opacity: '1.0' }, 200);
					//$this.find('.arrow').animate({ opacity: '1.0' }, 200);
				//});
					this.introAnimating = false;
					console.log('1884: this.introAnimating = ' + this.introAnimating);
					$closeButton = null;
			}, this));
		//});
	}
	else
	{
		$closeButton
			.find('.close-link-text').text('Otvori').end()
			.find('.button-icon').addClass('down').removeClass('up');
		this.introAnimating = true;
		console.log('1895: this.introAnimating = ' + this.introAnimating);
			//.animate({ opacity: '0.0' }, 200, function() {
				$('#intro p,#intro .canvas').finish().animate({
					opacity: '0.0'
				}, evt.data.animDelay, $.proxy(function(){
					/*$('.intro-inner').finish().animate({
						'padding-top': '0.7em'
					}, evt.data.animDelay, function() {*/
						/*$('#intro h1').finish().animate({
							'font-size': '160%',
							'margin-top': 0,
							'padding-top': 0
						}, evt.data.animDelay);*/
					//$('#intro .left-side').animate({ height: $('#intro h1').outerHeight(true) + 'px' }, 200);
					
						/*$('#intro .left-side').finish().animate({
							height: evt.data.headHeight + 'px',
							'padding-bottom': '0.5em'							
						}, evt.data.closeAnimDelay, 'linear');*/
						$('#intro').finish().animate({
							height: evt.data.headHeight + 'px',
							'padding-bottom': '0.5em'							
						}, evt.data.animDelay, 'linear', $.proxy(function() {
							//$this.animate({ opacity: '1.0' }, 200);
							//$this.find('.arrow').animate({ opacity: '1.0' }, 200);
							$('#intro').addClass('closed');
							if ($closeButton != null)
							{
								$closeButton.find('.button-icon').removeClass('up').addClass('down');
							}
							this.introAnimating = false;
							console.log('1923: this.introAnimating = ' + this.introAnimating);
							$closeButton = null;
						}, this));
					/*});*/
				}, this));
			//});
	}
	//console.log(evt.data);
	//$closeButton.on('click', evt.data, closeClickHandler);
	return false;
}
	
KalregApp.prototype.initCarousel = function()
{
	var self = this;
	/*	CarouFredSel: a circular, responsive jQuery carousel.
		Configuration created by the "Configuration Robot"
		at caroufredsel.dev7studios.com
	*/
	//console.log('initializing carousel...');
	$("#submodel-carousel").carouFredSel({
		circular: false,
		infinite: false,
		responsive: false,
		items: 1,
		width: '188px',
		height: '100px',
		start: 0,
		scroll: {
			/*fx: 'uncover',*/
			duration: 100,
			items: 1,
			onBefore: function() {
				$(this).addClass('moving');
			},
			onAfter: function() {
				var html = '';
				$(this).removeClass('moving')
					/*
					.children()
					.removeClass('left center right')
					.eq(0).addClass('left').end()
					.eq(1).addClass('center').end()
					.eq(2).addClass('right')*/;
				var $center = $(this).children().eq(0);
				var hasImg = $center.find('img').length > 0;
				if (hasImg)
				{
					$('#submodel-carousel-selected').html($center.html());
					//console.log('$center.find(img).prop(id) = ' + $center.find('img').prop('id').substring(1));
					self.selectedSubmodelIndex = parseInt($center.find('img').prop('id').substring(1));
					$('#filter-engine').data('dd').set('selectedIndex', self.selectedSubmodelIndex+1);
					$('#button-add-car').removeClass('disabled');
				}
				/*$(this)
					.children().removeClass('active')
					.eq(1).addClass('active');
				*/
			}
		},
		auto: false,
		prev: {
			button: "#submodel-carousel-prev",
			key: "left"
		},
		next: {
			button: "#submodel-carousel-next",
			key: "right"
		}
	});
	//console.log('done with init, triggering slideTo...');
	$("#submodel-carousel").trigger('slideTo', [ $('#submodel-carousel').children().eq(0) ]);
	//console.log('done with slideTo');
	/*$('#submodel-carousel-selected').off('click').on('click', function() {
		window.alert('selected.div.click!');
	});*/
	$('#submodel-carousel > div').off('click').on('click', function(){
		var hasImg = $(this).find('img').length > 0;
		if (hasImg)
		{
			var id = parseInt($(this).find('img').prop('id').substring(1));
			var nextId = 'p' + zeroes(id+1);
			var $nextImg = $('#submodel-carousel #' + nextId);
			if ($nextImg.length > 0)
			{
				var $nextElem = $nextImg.parent().parent();
				$('#submodel-carousel').trigger('slideTo', $nextElem);
			}
			else
			{
				$('#submodel-carousel').trigger('slideTo',
					$('#submodel-carousel #p000').parent().parent());
			}
		}
	});
}

KalregApp.prototype.slideIn = function(pageName, activePageName, callBack)
{
	var $activePage = $(activePageName);
	$activePage.animate({
		'margin-left': '-20px',
		'opacity': '0.0'
	}, 200, function(){
		$(this).removeClass('active');
		$(pageName).addClass('active').css({//'margin-left': '20%',
			'margin-left': 0,
			'opacity': '0.0'
		});
		$(pageName).animate({//'margin-left': 0,
			'opacity': '1.0'
		}, 50, function(){
			if (typeof callBack !== 'undefined')
			{
				callBack();
			}
		});
	});
}
	
$(document).ready(function(){
	var kalreg = new KalregApp();

	kalreg.initCarData();
	kalreg.initFields();

	$('.spaced-out .dd,.spaced-out input[type="text"],'
		+ '.spaced-out input[type="checkbox"] + label.inline').each(function() {
			$(this)
				.wrap('<span class="wrapper">')
				.parent()
				.append('&nbsp;');
	});
	
	kalreg.initEvents();
	kalreg.initFilterEvents();
	kalreg.initRightList();
	//kalreg.initCarousel();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
});
