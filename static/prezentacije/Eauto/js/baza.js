function RightListItem(number)
{
	this.number = number;
	this.maker = undefined;
	this.model = undefined;
	this.submodel = undefined;
	this.year = { min: undefined, max: undefined };
	this.amount = undefined;
	this.imagePath = undefined;
	this.fuel = undefined;
	this.insurance = undefined;
	this.maintenance = undefined;
	this.expensepk = undefined;
	this.additional = undefined;
	this.selectedYear = undefined;
	this.id = undefined;
	this.engine = undefined;
	this.empty = true;
}

RightListItem.prototype.toString = function()
{
	if (!this.empty)
	{
		if (typeof this.selectedYear !== 'undefined')
		{
			return this.selectedYear + ' ' + this.maker + ' ' + this.submodel;
		}
		else
		{
			return formatRange(rangeToString(this.year.min, this.year.max)) + ' ' + this.maker + ' ' + this.submodel;
		}
	}
	else
	{
		return 'Vozilo ' + this.number;
	}
}

RightListItem.prototype.assign = function(item)
{
	this.populate(item.maker, item.model, item.submodel, item.year, item.amount, item.imagePath,
		item.fuel, item.insurance, item.maintenance, item.expensepk, item.additional, item.selectedYear,
		item.id, item.engine);
}

RightListItem.prototype.populate = function(maker, model, submodel, year, amount, imagePath,
	fuel, insurance, maintenance, expensepk, additional, selectedYear, id, engine)
{
	this.maker = maker;
	this.model = model;
	this.submodel = submodel;
	this.year = { min: year.min, max: year.max };
	this.amount = amount;
	this.imagePath = imagePath;
	this.fuel = fuel;
	this.insurance = insurance;
	this.maintenance = maintenance;
	this.expensepk = expensepk;
	this.additional = additional;
	this.selectedYear = selectedYear;
	this.id = id;
	this.engine = engine;
	this.empty = false;
}

RightListItem.prototype.depopulate = function()
{
	this.maker = undefined;
	this.model = undefined;
	this.submodel = undefined;
	this.year = { min: undefined, max: undefined };
	this.amount = undefined;
	this.imagePath = undefined;
	this.fuel = undefined;
	this.insurance = undefined;
	this.maintenance = undefined;
	this.expensepk = undefined;
	this.additional = undefined;
	this.selectedYear = undefined;
	this.id = undefined;
	this.engine = undefined;
	this.empty = true;
}

RightListItem.prototype.getFiveYear = function()
{
	var _fuel = 0;
	if (typeof this.fuel !== 'undefined')
	{
		_fuel = this.fuel;
	}
	var _insurance = 0;
	if (typeof this.insurance !== 'undefined')
	{
		_insurance = this.insurance;
	}
	var _maintenance = 0;
	if (typeof this.maintenance !== 'undefined')
	{
		_maintenance = this.maintenance;
	}
	return _fuel + _insurance + _maintenance;
}

/*RightListItem.prototype.setApp = function(app)
{
	this.app = app;
}*/

function BazaApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.introAnimDelay = 100;
	this.introCloseAnimDelay = 50;
	this.rightListMaxEntries = 5;
	this.infoBoxDelay = 3000;
	this.carListChangeHideDelay = 200;
	this.carListChangeShowDelay = 700;

	this.graphMinX = 100; // graph units, *not* pixels!
	this.graphMaxX = 500;
	this.graphMinY = 0;
	this.graphMaxY = 150;
	this.dotR = 4;
	this.selDotR = 4;
	this.numDots = 25;
	this.graphPadding = 5;
	this.graphLineColor = '#bbbbbb';
	this.graphCircleColor = '#f18d34';
	this.graphLabelHeight = 20;
	this.graphDotColor = '#c8c8c8';
	this.graphDotDelta = 30;

	this.graphHintCalloutSize = 20;
	this.graphHintHeight = 150;
	this.graphHintWidth = 250;
	this.graphHintAnimateDelay = 50;
	this.graphHintAreaSize = 10;
	
	this.dataX = { min: 0, max: 1 };
	this.dataY = { min: 0, max: 10000 };
	
	this.graphX = { min: this.graphMinX, max: this.graphMaxX };
	this.graphY = { min: this.graphMinY, max: this.graphMaxY };
	
	this.scaleX = { min: 0, max: 1 };
	this.scaleY = { min: 0, max: 1 };
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.initializedCarousels = {
		'2-1': false,
		'2-2': false
	};
	this.lastPopulatedItem = -1;
	this.eventsInitFirstTime = true;
}

BazaApp.prototype.updateRightListMinMaxItemAmount = function(amount)
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

BazaApp.prototype.markFields = function(fieldList, message, wrapper)
{
	var name = '';
	var _wrapper = 'p';
	if (typeof wrapper !== 'undefined')
	{
		//console.log('wrapper defined! setting to ' + wrapper);
		_wrapper = wrapper;
	}
	for (i in fieldList)
	{
		var field = fieldList[i];
		var $wrap;
		if ($(field.id).find('.caroufredsel_wrapper').length > 0)
		{
			console.log('item is a carousel!');
			$wrap = $(field.id);
		}
		else if (_wrapper != 'p' && $(field.id).hasParent('.ddOutOfVision'))
		{
			$wrap = $(field.id).closest('.ddOutOfVision').next();
		}
		else
		{
			$wrap = $(field.id).closest(_wrapper);
		}
		//console.log('wrap = ');
		//console.log($wrap);
		$wrap.addClass('error');
		name += field.name + '-';
	}
	name = name.substring(0, name.length-1);
	if (typeof message !== 'undefined')
	{
		this.addError(name, message);
	}
	/*var $errorDesc = $p.siblings('.error-desc');
	$errorDesc
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');*/
}

BazaApp.prototype.unmarkFields = function(fieldList, indexList, wrapper)
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
		if ($(field.id).find('.caroufredsel_wrapper').length > 0)
		{
			console.log('item is a carousel!');
			$wrap = $(field.id);
		}
		else if (_wrapper != 'p' && $(field.id).hasParent('.ddOutOfVision'))
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
	this.clearErrorDescriptions();
	
	/*$errorDesc.find('span.' + name).remove();
	if ($errorDesc.find('span').length == 0)//activeFields == 0)
	{
		$errorDesc.addClass('inactive');
	}*/
}

BazaApp.prototype.addError = function(name, message)
{
	$('.error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

BazaApp.prototype.clearErrorDescriptions = function()
{
	console.log('clearErrorDescriptions()');
	$('.error-desc')
		.empty()
		.addClass('inactive');
}

BazaApp.prototype.addItem = function(maker, model, submodel, year, amount, imagePath,
	fuel, insurance, maintenance, expensepk, additional, selectedYear, id, engine)
{
	/*console.log('this.lastPopulatedItem = ' + this.lastPopulatedItem);
	console.log('this.rightListMaxEntries-1 = ' + (this.rightListMaxEntries-1));*/
	var _this = this;

	var data = $('#right-list').data('advlist').getData();
	for (itemId in data)
	{
		/*console.log('addItem: engine = ');
		console.log(engine);
		console.log('addItem: data[itemId].engine = ');
		console.log(data[itemId].engine);*/
		if (!data[itemId].empty
			&& data[itemId].id.brand == id.brand
			&& data[itemId].id.model == id.model
			&& data[itemId].id.submodel == id.submodel
			&& (
				(typeof data[itemId].engine === 'undefined'
				&& typeof engine === 'undefined')
				||
				(
					(typeof data[itemId].engine !== 'undefined'
					&& typeof engine !== 'undefined'
					&& data[itemId].engine.hp == engine.hp
					&& data[itemId].engine.rpm == engine.rpm
					&& (
						(typeof engine.rpmhi === 'undefined'
						&& typeof data[itemId].engine.rpmhi === 'undefined')
						||
						(
							(typeof engine.rpmhi !== 'undefined'
							&& typeof data[itemId].engine.rpmhi !== 'undefined'
							&& data[itemId].engine.rpmhi == engine.rpmhi)
						)
						)
					)
				)
				)
			)
		{
			this.addError('car-already-entered', 'Automobil je vec unet.');
			//this.openInfoWindow('Automobil je vec unet.');
			return false;
		}
	}

	if (this.lastPopulatedItem == this.rightListMaxEntries-1)
	{
		//console.log('setting lastPopulatedItem to -1');
		this.addError('list-full', 'Mozete uneti najvise 5 automobila.');
		//this.openInfoWindow('Mozete uneti najvise 5 automobila.');
		return false;
	}
	
	var item = this.getItem(this.lastPopulatedItem + 1);
	/*console.log('this.lastPopulatedItem = ' + this.lastPopulatedItem);
	console.log(item);*/
	if (typeof item !== 'undefined')
	{
		/*console.log('Populating with '
			+ maker + ' ' + model + ' '
			+ year + ' ' + amount + ' '
			+ imagePath
			);
		console.log('Before:');
		console.log(item.toString());*/
		
		//console.log('this.carListChangeHideDelay = ' + this.carListChangeHideDelay);
		$('#right-list').animate({ opacity: '0.0' }, this.carListChangeHideDelay, function() {
			//console.log('item.populate before:');
			//console.log(item);
			item.populate(maker, model, submodel, year, amount, imagePath,
				fuel, insurance, maintenance, expensepk, additional, selectedYear, id, engine);
			//console.log('item.populate after:');
			//console.log(item);
			/*console.log('After:');
			console.log(item.toString());*/
			_this.updateRightListMinMaxItemAmount(item.getFiveYear());
			_this.lastPopulatedItem = _this.lastPopulatedItem + 1;
			_this.updateList();
			//console.log('_this.carListChangeShowDelay = ' + _this.carListChangeShowDelay);
			$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
		});
	}
	return true;
}

BazaApp.prototype.populateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var subfilter = evt.data.subfilter
	var html = '';
	var $elem;
	
	//console.log('populateFilter(name = ' + filterName + ', id = ' + filterId + ', param = ' + filterParam + ')');
	
	if (filterName == 'brand')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ this.carData[filterName+'.display'] + '</option>';
		for (brand in this.carData[filterName])
		{
			html += '<option value="' + filterParam.carData[filterName][brand] + '">'
				+ filterParam.carData[filterName][brand] + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'model')
	{
		$elem = $('select#' + filterId);
		brand = filterParam.selectedBrandIndex;
		//console.log('populateFilter: selectedBrandIndex = ' + brand);
		//console.log('models = ');
		//console.log(filterParam.carData[filterName][brand]);
		if (brand != -1)
		{
			html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
				+ filterParam.carData[filterName+'.display'] + '</option>';
			for (model in filterParam.carData[filterName][brand])
			{
				html += '<option value="' + filterParam.carData[filterName][brand][model] + '">'
					+ filterParam.carData[filterName][brand][model] + '</option>';
			}
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'submodel')
	{
		brand = filterParam.selectedBrandIndex;
		model = filterParam.selectedModelIndex;
		/*console.log('populateFilter(submodel)');
		console.log('populateFilter: selectedBrandIndex = ' + brand);
		console.log('populateFilter: selectedModelIndex = ' + model);*/
		/*html += '<div class="marginal">'
			+ 'Nema prethod-<br />nog modela'
			+ '</div>';*/
		var _model = filterParam.carData[filterName][brand][model];
		if (typeof subfilter !== 'undefined')
		{
			_model = subfilter(_model);
		}
		for (submodel in _model)
		{
			var car = _model[submodel];
			
			/*
			<div>
			<div class="name">
			</div><!--name-->
			<div class="yearrange">
			</div><!--yearrange-->
			<div class="divider">
			<div class="divider-inner">
			&nbsp;
			</div><!--divider-inner-->
			</div><!--divider-->
			<div class="image">
			<img src="img/car/m-z72-001-sm.png" id="p001" />
			</div><!--image-->
			<div class="index">
			</div><!--index-->
			</div>
			*/
			
			html += '<div>'
				+ '<div class="name">'
				+ car.name
				+ '</div><!--name-->'
				+ '<div class="yearrange">'
				+ '(' + formatRange(rangeToString(car.year.min, car.year.max)) + ')'
				+ '</div><!--yearrange-->'
				+ '<div class="divider">'
				+ '<div class="divider-inner">'
				+ '&nbsp;'
				+ '</div><!--divider-inner-->'
				+ '</div><!--divider-->'
				+ '<div class="image">'
				+ '<img src="img/car/' + car.image + '" id="p' + zeroes(submodel) + '" />'
				+ '</div><!--image-->'
				+ '<div class="index">'
				+ (parseInt(submodel) + 1) + '/' + _model.length
				+ '</div><!--index-->'
				+ '</div>';
		}
		/*html += '<div class="marginal">'
			+ 'Nema sledeceg<br />modela'
			+ '</div>';*/
		var $list = $('#' + filterId);
		$list.empty();
		if ($list.parents('.caroufredsel_wrapper').length > 0)
		{
			var $prev = $list.parent().prev();
			$prev.next().remove();
			$prev.after('<div id="' + filterId + '" class="unselectable" />');
			//window.alert('has caroufredsel parent!');
			//$('#' + filterId).unwrap();
			$list = $('#' + filterId);
		}
		$list.html(html);
		var $center = $list.children().eq(1);
		$('#submodel-carousel-selected').html($center.html());
		this.selectedSubmodelIndex = 0;
		filterParam.initCarousel();
	}
	else if (filterName == 'year')
	{
		$elem = $('select#' + filterId);
		var formatFunctionAndLess = evt.data.formatFunctionAndLess;
		var formatFunctionAndMore = evt.data.formatFunctionAndMore;
		var formatFunctionAll = evt.data.formatFunctionAll;
		
		// 1. find out min and max year
		// 2. construct a number of subranges within that range
		var minYear = -1;
		var maxYear = -1;
		brand = filterParam.selectedBrandIndex;
		model = filterParam.selectedModelIndex;
		var _model = filterParam.carData['submodel'][brand][model];
		
		for (submodel in _model)
		{
			if (minYear == -1 || _model[submodel].year.min < minYear)
			{
				minYear = _model[submodel].year.min;
			}
			if (maxYear == -1 || _model[submodel].year.max > maxYear)
			{
				maxYear = _model[submodel].year.max;
			}
		}

		html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
			+ filterParam.carData[filterName+'.display'] + '</option>';
		var years = buildArray(minYear, maxYear, 1);
		for (year in years)
		{
			html += '<option value="' + years[year] + '">'
				+ years[year] + '</option>';
		}
		
		/*var ranges = buildRangeArray(minYear, maxYear, 5);
		console.log('populateFilter: ranges = ');
		console.log(ranges);
		for (range in ranges)
		{
			console.log('populateFilter(year): range[' + ranges[range].low + ', ' + ranges[range].high + ']');
			var rangeString = rangeToString(ranges[range].low, ranges[range].high);
			html += '<option value="' + rangeString + '">'
				+ formatRange(rangeString,
					undefined,
					formatFunctionAndLess,
					formatFunctionAndMore,
					formatFunctionAll
				) + '</option>';
		}*/
		
		/*for (year in filterParam.carData[filterName])
		{
			html += '<option value="' + filterParam.carData[filterName][year] + '">'
				+ formatRange(filterParam.carData[filterName][year],
					undefined,
					formatFunctionAndLess,
					formatFunctionAndMore,
					formatFunctionAll
				) + '</option>';
		}*/
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'engine')
	{
		$elem = $('select#' + filterId);
		brand = filterParam.selectedBrandIndex;
		model = filterParam.selectedModelIndex;
		if (brand != -1 && model != -1)
		{
			/*html += '<option value="' + filterParam.carData[filterName+'.display'] + '" selected="selected">'
				+ filterParam.carData[filterName+'.display'] + '</option>';*/
			var _model = filterParam.carData['submodel'][brand][model];
			var selectedSet = false;
			for (submodel in _model)
			{
				var _submodel = _model[submodel];
				html += '<option value="'
					+ formatHorsePower(_submodel.engine.hp)
					+ '@';
					
				if (typeof _submodel.engine.rpmhi !== 'undefined')
				{
					html += formatRPM(_submodel.engine.rpm, false)
						+ 'h' + formatRPM(_submodel.engine.rpmhi);
				}
				else
				{
					html += formatRPM(_submodel.engine.rpm);
				}
				html += '"';
				if (!selectedSet)
				{
					html += ' selected="selected"';
					selectedSet = true;
				}
				html += '>'
					+ formatHorsePower(_submodel.engine.hp)
					+ ' @ ';
				if (typeof _submodel.engine.rpmhi !== 'undefined')
				{
					html += formatRPM(_submodel.engine.rpm, false)
						+ '-' + formatRPM(_submodel.engine.rpmhi);
				}
				else
				{
					html += formatRPM(_submodel.engine.rpm);
				}
				html += '</option>';
			}
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	
	/*var $p = $select.parent().parent();
	$select.detach().empty().html(html);
	$p.empty().append($select);
	console.log('calling (\'select#'+filterId+'\').msDropDown...');
	$('select#' + filterId).msDropDown({'animStyle': 'none'});
	console.log('... done');*/
}

BazaApp.prototype.depopulateFilter = function(evt)
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
	else if (filterName == 'submodel')
	{
		html += '<div>'
			+ '<div class="name">'
			+ 'Podmodel'
			+ '</div><!--name-->'
			+ '<div class="yearrange">'
			+ '&nbsp;'
			+ '</div><!--yearrange-->'
			+ '<div class="divider">'
			+ '<div class="divider-inner">'
			+ '&nbsp;'
			+ '</div><!--divider-inner-->'
			+ '</div><!--divider-->'
			+ '<div class="image empty">'
			+ '<img src="img/bazacaritem.png" id="p000" />'
			+ '</div><!--image-->'
			+ '<div class="index">'
			+ '&nbsp;'
			+ '</div><!--index-->'
			+ '</div>';
		var $list = $('#' + filterId);
		$list.empty();
		if ($list.parents('.caroufredsel_wrapper').length > 0)
		{
			var $prev = $list.parent().prev();
			$prev.next().remove();
			$prev.after('<div id="' + filterId + '" class="unselectable" />');
			//window.alert('has caroufredsel parent!');
			//$('#' + filterId).unwrap();
			$list = $('#' + filterId);
		}
		$list.html(html);
		var $center = $list.children().eq(1);
		$('#submodel-carousel-selected').html($center.html());
		this.selectedSubmodelIndex = 0;
		filterParam.initCarousel();
	}
}

BazaApp.prototype.initCarData = function()
{
	this.carData = {
		'brand': ['Audi', 'Mercedes Benz', 'Porsche'],
		'brand.display': 'Marka',
		'model': [
			['A4', 'A6', 'S4', 'S6'], // Audi
			['C200', 'C300', 'C350'], // Mercedes Benz
			['Boxster', 'Cayman', '911', 'Panamera', 'Cayenne'] // Porsche
		],
		'model.display': 'Model',
		'submodel': [
			[
				[{ name: 'A4', image: 'm-z72-001-sm.png',
					year: { min: 1997, max: 2006 },
					engine: { hp: 275, rpm: 7400 } }], // A4
				[{ name: 'A6', image: 'm-z72-002-sm.png',
					year: { min: 1996, max: 2005 },
					engine: { hp: 275, rpm: 7400 } }], // A6
				[{ name: 'S4', image: 'm-z72-003-sm.png',
					year: { min: 1999, max: 2003 },
					engine: { hp: 275, rpm: 7400 } }], // S4
				[{ name: 'S6', image: 'm-z72-004-sm.png',
					year: { min: 1992, max: 2009 },
					engine: { hp: 275, rpm: 7400 } }]  // S6
			], // Audi
			[
				[{ name: 'C200', image: 'm-z72-003-sm.png',
					year: { min: 2001, max: 2006 },
					engine: { hp: 275, rpm: 7400 } }], // C200
				[{ name: 'C300', image: 'm-z72-005-sm.png',
					year: { min: 2000, max: 2003 },
					engine: { hp: 275, rpm: 7400 } }], // C300
				[{ name: 'C350', image: 'm-z72-002-sm.png',
					year: { min: 1987, max: 2001 },
					engine: { hp: 275, rpm: 7400 } }]  // C350
			], // Mercedes Benz
			[
				[{ name: 'Boxster', image: 'm-z72-002-sm.png',
					year: { min: 2001, max: 2007 },
					engine: { hp: 265, rpm: 6700 } },
					{ name: 'Boxster S', image: 'm-z72-001-sm.png',
					year: { min: 2002, max: 2010 },
					engine: { hp: 315, rpm: 6700 } }], // Boxster
				[{ name: 'Cayman', image: 'm-z72-003-sm.png',
					year: { min: 2003, max: 2009 },
					engine: { hp: 275, rpm: 7400 } },
					{ name: 'Cayman S', image: 'm-z72-002-sm.png',
					year: { min: 2008, max: 2013 },
					engine: { hp: 325, rpm: 7400 } }], // Cayman
				[{ name: '911 Carrera', image: 'm-z72-005-sm.png',
					year: { min: 1998, max: 2005 },
					engine: { hp: 350, rpm: 7400 } },
					{ name: '911 Carrera S', image: 'm-z72-002-sm.png',
					year: { min: 2000, max: 2011 },
					engine: { hp: 400, rpm: 7400 } },
					{ name: '911 Carrera 4', image: 'm-z72-003-sm.png',
					year: { min: 2001, max: 2010 },
					engine: { hp: 350, rpm: 7400 } }], // 911
				[{ name: 'Panamera', image: 'm-z72-004-sm.png',
					year: { min: 2005, max: 2008 },
					engine: { hp: 310, rpm: 6200 } },
					{ name: 'Panamera 4', image: 'm-z72-003-sm.png',
					year: { min: 2000, max: 2012 },
					engine: { hp: 310, rpm: 6200 } }], // Panamera
				[{ name: 'Cayenne', image: 'm-z72-002-sm.png',
					year: { min: 2002, max: 2010 },
					engine: { hp: 300, rpm: 6300 } },
					{ name: 'Cayenne S', image: 'm-z72-001-sm.png',
					year: { min: 2003, max: 2008 },
					engine: { hp: 400, rpm: 6500 } },
					{ name: 'Cayenne Diesel', image: 'm-z72-005-sm.png',
					year: { min: 1995, max: 2002 },
					engine: { hp: 240, rpm: 3500, rpmhi: 4000 } },
					{ name: 'Cayenne GTS', image: 'm-z72-004-sm.png',
					year: { min: 2002, max: 2010 },
					engine: { hp: 420, rpm: 6500 } }]  // Cayenne
			]  // Porsche
		],
		'submodel.display': 'Podmodel',
		'year': [
			'u1980',
			'l1980u1985',
			'l1985u1990',
			'l1990u1995',
			'l1995u2000',
			'l2000u2005',
			'l2005u2010',
			'l2010'
		],
		'year.display': 'Godiste',
		'engine.display': 'Motor'
	};
	
	for (brand in this.carData['brand'])
	{
		for (model in this.carData['model'][brand])
		{
			for (submodel in this.carData['submodel'][brand][model])
			{
				this.carData['submodel'][brand][model][submodel].amount
					= Math.ceil(Math.random() * 30000 + 10000);
				this.carData['submodel'][brand][model][submodel].fuel
					= Math.ceil(Math.random() * 3000 + 1000);
				this.carData['submodel'][brand][model][submodel].insurance
					= Math.ceil(Math.random() * 3000 + 1000);
				this.carData['submodel'][brand][model][submodel].maintenance
					= Math.ceil(Math.random() * 3000 + 1000);
				this.carData['submodel'][brand][model][submodel].expensepk
					= Math.random();
				this.carData['submodel'][brand][model][submodel].id = {
					brand: brand,
					model: model,
					submodel: submodel
				};
			}
		}
	}
	//console.log(this.carData);
}

BazaApp.prototype.initEvents = function()
{
	var self = this;
	$('.remove-car').off('click').on('click', function(evt, app) {
		//console.log('.remove-car.click()');
		if ($(this).hasClass('disabled'))
		{
			return false;
		}
		var idx = $(this).parent().index(); // parseInt($(this).data('car-index'));
		self.removeItem(idx);
		return false;
	});
	$('.details-car').off('click').on('click', function() {
		if ($(this).hasClass('disabled'))
		{
			return false;
		}
		$('.popup-background').addClass('active').css({ opacity: '0.7' });
		$('.popup').addClass('active');
		var item = self.getItem($(this).parent().index()); //$(this).data('car-index'));
		self.populatePopup(item);
		return false;
	});
	//console.log('setting button-add-car handler!');

	//var addCarButtonWasDisabled = $('#button-add-car').hasClass('disabled');
	$('#button-add-car')//.removeClass('disabled')
		.off('click').on('click', function(evt) {
		evt.stopPropagation();
		//console.log('in button-add-car handler!');
		//var disabled = $(this).hasClass('disabled');
		//console.log('disabled = ' + disabled);
		//if (disabled) return false;
		//console.log('self.selectedSubmodelIndex = ' + self.selectedSubmodelIndex);
		
		self.clearErrorDescriptions();
		
		var allDefined = true;
		
		if (typeof self.selectedBrandIndex === 'undefined'
			|| self.selectedBrandIndex == -1)
		{
			self.markFields([{
				id: '#filter-brand',
				name: 'brand'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite marku i model.');
			//return false;
		}
		if (typeof self.selectedModelIndex === 'undefined'
			|| self.selectedModelIndex == -1)
		{
			self.markFields([{
				id: '#filter-model',
				name: 'model'
			}]);
			allDefined = false;
		}
		/*if (typeof self.selectedYearIndex === 'undefined'
			|| self.selectedYearIndex == -1)
		{
			self.markFields([{
				id: '#filter-year',
				name: 'year'
			}]);
			allDefined = false;
		}*/
		if (typeof self.selectedSubmodelIndex === 'undefined'
			|| self.selectedSubmodelIndex == -1)
		{
			self.markFields([{
				id: '#filter-submodel',
				name: 'submodel'
			}], undefined, '.submodel-wrapper');
			allDefined = false;
		}
		if (typeof self.selectedEngineIndex === 'undefined'
			|| self.selectedEngineIndex == -1)
		{
			self.markFields([{
				id: '#filter-engine',
				name: 'engine'
			}]);
			allDefined = false;
		}
		
		if (!allDefined)
		{
			self.addError('enter-fields', 'Unesite obavezna polja.');
			return false;
		}
		
		//console.log('self.carData = ');
		//console.log(self.carData);
		if (self.addItem(
			self.carData['brand'][self.selectedBrandIndex],
			self.carData['model'][self.selectedBrandIndex][self.selectedModelIndex],
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].name,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].year,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].amount,
			'img/listcar-001.png',
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].fuel,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].insurance,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].maintenance,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].expensepk,
			'2.0T Premium Wagon 4-door',
			self.selectedYear,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedSubmodelIndex].id,
			self.carData['submodel'][self.selectedBrandIndex][self.selectedModelIndex][self.selectedEngineIndex].engine
		))
		{
			// Reset all filters
			self.resetFilters();
		}
		return false;
	});
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
			animDelay: self.introAnimDelay,
			closeAnimDelay: self.introCloseAnimDelay,
			thisFun: self.closeClickHandler
		}, self.closeClickHandler);
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
	
	/*$('#intro h1')
		.off('mouseenter').on('mouseenter', function() {
			$('.close-button a').addClass('hovered');
		})
		.off('mouseleave').on('mouseleave', function() {
			$('.close-button a').removeClass('hovered');
		})
		.off('click').on('click', function() {
			$('.close-button a').trigger('click');
		});*/
		
	$('.accordion-toggle').on('click', function(evt) {
		var $icon = $(this).prev().find('.button-icon');
		var hasUp = $icon.hasClass('up');
		if (hasUp)
		{
			$icon.addClass('down').removeClass('up');
		}
		else
		{
			$icon.addClass('up').removeClass('down');
		}
	});
	$('.accordion-heading .btn').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$(this).parents('.accordion-heading').find('.accordion-toggle').trigger('click');
		return false;
	});
	
	$('.nav-tabs > li > a')
		.off('click')
		.on('click', function(evt) {
		evt.stopPropagation();
		$(this).closest('.nav-tabs').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		//$($(this).attr('href')).addClass('active');

		if ($(this).attr('href').substring(0, '#page-3-'.length) == '#page-3-') return false;

		self.slideIn($(this).attr('href'), $(this).closest('.nav-tabs').next().children().filter('.tab-pane.active'));
		return false;
	});
	$('#tab-3').on('click', function(evt) {
		//evt.stopPropagation();
		//window.alert('tab-3 click!');
		$('#graph001').each(function() {
			var id = $(this).prop('id');
			var svg = $(this).svg({
				settings: {
					viewBox: '0 0 500 200',
					width: '100%',
					height: '100%'
				},
				onLoad: function(svg) {
					self.initGraph(svg, self, id, true, false);
				}
			}).svg('get');

			$(svg.root()).on('mouseover', function(evt) {
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				self.hideHint();
				return false;
			});
		});
	});
	
	$('#tab-2').on('click', function() {
		if (!self.initializedCarousels['2-1'])
		{
			self.initCarousel(
				'#page-2-1-picture-main',
				'#page-2-1-picture-main-prev',
				'#page-2-1-picture-main-next',
				'#page-2-1-thumbs',
				undefined,
				undefined,
				'crossfade',
				undefined,
				self
			);
			self.initializedCarousels['2-1'] = true;
		}
	});
	$('#tab-2-1').on('click', function() {
		if (!self.initializedCarousels['2-1'])
		{
			self.initCarousel(
				'#page-2-1-picture-main',
				'#page-2-1-picture-main-prev',
				'#page-2-1-picture-main-next',
				'#page-2-1-thumbs',
				undefined,
				undefined,
				'crossfade',
				undefined,
				self
			);
			self.initializedCarousels['2-1'] = true;
		}
	});
	$('#tab-2-2').on('click', function() {
		if (!self.initializedCarousels['2-2'])
		{
			self.initCarousel(
				'#page-2-2-picture-main',
				'#page-2-2-picture-main-prev',
				'#page-2-2-picture-main-next',
				'#page-2-2-thumbs',
				undefined,
				undefined,
				'crossfade',
				function(data) {
				
					/*for (var i = 0; i < $('#page-2-2-thumbs').find('li').length; i++)
					{
						console.log('position of li #' + i + ': ');
						console.log($('#page-2-2-thumbs').find('li').eq(i).position());
					}*/
					
					var id = parseInt($(data.items.visible[0]).find('img').prop('id').substring(1))-1;
					var top = $('#page-2-2-thumbs').find('li').eq(id).position().top
					/*console.log('GOT ID: ' + id);
					console.log('SCROLLING TO: ' + top);*/
					$('#page-2-2-thumbs').slimScroll({
						scrollTo:
							$('#page-2-2-thumbs').scrollTop()
							+ $('#page-2-2-thumbs').find('img[id=th' + zeroes(id+1) + ']').parent().position().top
							+ 'px'
					});
					//$('#page-2-2-thumbs').scrollTop($('#page-2-2-thumbs').find('li').eq(id).position().top);
				},
				self
			);
			self.initCarousel(
				'#page-2-2-users-main',
				'#page-2-2-users-main-prev',
				'#page-2-2-users-main-next',
				undefined,
				230,
				50,
				'crossfade',
				function(data) {
					//console.log('received data: ');
					//console.log($(data.items.visible[0]).data('user-id'));
					this.loadUserPictures($(data.items.visible[0]).data('user-id'));
				},
				self
			);
			self.initializedCarousels['2-2'] = true;
		}
	});
	
	$(document).off('click', '#page-2-1-thumbs img').on('click', '#page-2-1-thumbs img', function() {
		var id = parseInt($(this).prop('id').substring(2));
		//console.log('SCROLL 1: id = ' + id);
		$('#page-2-1-picture-main').trigger('slideTo',
			[$('#page-2-1-picture-main img[id=p' + zeroes(id) + ']').parent(),0]
		);
	});
	$(document).off('click', '#page-2-2-thumbs img').on('click', '#page-2-2-thumbs img', function() {
		var id = parseInt($(this).prop('id').substring(2));
		//console.log('SCROLL 2: id = ' + id);
		$('#page-2-2-picture-main').trigger('slideTo',
			[$('#page-2-2-picture-main img[id=p' + zeroes(id) + ']').parent(),0]
		);
	});
	
	self.eventsInitFirstTime = false;
}

BazaApp.prototype.loadUserPictures = function(userId)//, self)
{
	//var self = typeof self === 'undefined' ? this : self;
	var $carou = $('#page-2-2-picture-main');
	var $thumbs = $('#page-2-2-thumbs');
	var numItems = $carou.find('div').length;
	var i, id = parseInt(userId);
	var serverData = [
		[
			'm-z72-002-sm.png',
			'm-z72-001-sm.png',
			'm-z72-003-sm.png',
			'm-z72-004-sm.png'
		],
		[
			'v5.jpg',
			'v2.jpg',
			'v3.jpg',
			'v4.jpg',
			'v8.jpg',
			'v7.jpg',
			'v1.jpg',
			'v5.jpg',
			'v2.jpg',
			'v3.jpg',
			'v4.jpg',
			'v8.jpg',
			'v7.jpg',
			'v1.jpg'
		]
	];
	var serverDataThumbs = [
		[
			'm-z72-002-sm.png',
			'm-z72-001-sm.png',
			'm-z72-003-sm.png',
			'm-z72-004-sm.png'
		],
		[
			't5.jpg',
			't2.jpg',
			't3.jpg',
			't4.jpg',
			't8.jpg',
			't7.jpg',
			't1.jpg',
			't5.jpg',
			't2.jpg',
			't3.jpg',
			't4.jpg',
			't8.jpg',
			't7.jpg',
			't1.jpg'
		]
	];
	
	//console.log('loadUserPictures(' + userId + ')');

	$carou.css('opacity', '1.0');
	$carou.animate({ opacity: '0.0' }, function() {
		for (i = 0; i < numItems; i++)
		{
			//console.log('removing item');
			//console.log($carou.find('li:first-child'));
			$carou.trigger('removeItem', $carou.find('img[id=p' + zeroes(i) + ']').parent());
			//$carou.find('li').eq(0).remove();
		}
		
		for (i = serverData[id].length-1; i != -1; i--)
		{
			var html = '<div><img src="img/car/' + serverData[id][i] + '" id="p' + zeroes(i+1) + '"  /></div>'
			$carou.trigger('insertItem', [0, html]);
			//$carou.find('ul').append(html);
			//console.log('added item ' + html);
		}
		
		$carou.animate({ opacity: '1.0' }, function() {
			$carou.css('opacity', '');
			$carou = null;
		});
	});

	$thumbs.css('opacity', '1.0');
	$thumbs.animate({ opacity: '0.0' }, function() {
		for (i = 0; i < numItems; i++)
		{
			//console.log('removing item');
			//console.log($thumbs.find('li:first-child'));
			//$carou.trigger('removeItem', $carou.find('li:first-child'));
			$thumbs.find('li').eq(0).remove();
		}
		
		for (i = 0; i < serverData[id].length; i++)
		{
			var html = '<li><img src="img/car/' + serverDataThumbs[id][i] + '" id="th' + zeroes(i+1) + '"  /></li>'
			//$carou.trigger('insertItem', [0, html]);
			$thumbs.find('ul').append(html);
			//console.log('added item ' + html);
		}
		
		$thumbs.animate({ opacity: '1.0' }, function() {
			$thumbs.css('opacity', '');
			$thumbs = null;
		});
	});
}

BazaApp.prototype.slideIn = function(pageName, activePage, callBack)
{
	var $activePage = activePage.eq(0); //$(activePageName);
	$activePage.animate({
		'margin-left': '-20px',
		'opacity': '0.0'
	}, 200, function(){
		$activePage.removeClass('active');
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

BazaApp.prototype.resetFilters = function()
{
	this.selectedBrandIndex = -1;
	this.populateFilter({
		data: {
			filterName: 'brand',
			filterId: 'filter-brand',
			filterParam: this
		}
	});
	$('#filter-brand').trigger('change');
}

BazaApp.prototype.initFilterEvents = function()
{
	this.selectedBrandIndex = $('select#filter-brand').msDropDown().data('dd').get('selectedIndex')-1;
	var self = this;
	
	this.populateFilter({
		data: {
			filterName: 'brand',
			filterId: 'filter-brand',
			filterParam: self
		}
	});
	
	$('#filter-brand').off('change').on('change', function() {
		self.selectedBrandIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		if (self.selectedBrandIndex == -1)
		{
			$('#filter-model').parents('p').addClass('inactive');
			$('#filter-model').data('dd').set('disabled', true);
			self.depopulateFilter({
				data: {
					filterName: 'model',
					filterId: 'filter-model',
					filterParam: self
				}
			});
			self.selectedModelIndex = -1;
		}
		else
		{
			//console.log('selectedIndex = ' + self.selectedIndex);
			self.populateFilter({
				data: {
					filterName: 'model',
					filterId: 'filter-model',
					filterParam: self
				}
			});
			$('#filter-model').parents('p').removeClass('inactive');
			$('#filter-model').data('dd').set('disabled', false);
			self.unmarkFields([{
				id: '#filter-brand',
				name: 'brand'
			}], [0]);
		}
		$('#filter-year').parents('p').addClass('inactive');
		$('#filter-year').data('dd').set('disabled', true);
		self.depopulateFilter({
			data: {
				filterName: 'year',
				filterId: 'filter-year',
				filterParam: self
			}
		});
		self.selectedYearIndex = -1;
		self.selectedYear = undefined;
		$('#filter-submodel').addClass('inactive');
		self.depopulateFilter({
			data: {
				filterName: 'submodel',
				filterId: 'submodel-carousel',
				filterParam: self
			}
		});
		self.selectedSubmodelIndex = -1;
		$('#filter-engine').parents('p').addClass('inactive');
		$('#filter-engine').data('dd').set('disabled', true);
		self.depopulateFilter({
			data: {
				filterName: 'engine',
				filterId: 'filter-engine',
				filterParam: self
			}
		});
		self.selectedEngineIndex = -1;
	});

	$('#filter-model').off('change').on('change', function() {
		self.selectedModelIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		//console.log('#filter-model.change before: selectedEngineIndex = ' + self.selectedEngineIndex);
		if (self.selectedModelIndex == -1)
		{
			$('#filter-year').parents('p').addClass('inactive');
			$('#filter-year').data('dd').set('disabled', true);
			self.depopulateFilter({
				data: {
					filterName: 'year',
					filterId: 'filter-year',
					filterParam: self
				}
			});
			self.selectedYearIndex = -1;
			self.selectedYear = undefined;

			$('#filter-submodel').addClass('inactive');
			self.depopulateFilter({
				data: {
					filterName: 'submodel',
					filterId: 'submodel-carousel',
					filterParam: self
				}
			});
			self.selectedSubmodelIndex = -1;
			$('#filter-engine').parents('p').addClass('inactive');
			$('#filter-engine').data('dd').set('disabled', true);
			self.depopulateFilter({
				data: {
					filterName: 'engine',
					filterId: 'filter-engine',
					filterParam: self
				}
			});
			self.selectedEngineIndex = -1;
			//$('#button-add-car').addClass('disabled');
		}
		else
		{
			self.populateFilter({
				data: {
					filterName: 'year',
					filterId: 'filter-year',
					filterParam: self,
					formatFunctionAndLess: function(val) {
						return 'pre ' + val;
					},
					formatFunctionAndMore: function(val) {
						return val + ' i posle';
					},
					formatFunctionAll: function() {
						return 'Sva godista';
					}
				}
			});
			$('#filter-year').parents('p').removeClass('inactive');
			$('#filter-year').data('dd').set('disabled', false);
			self.populateFilter({
				data: {
					filterName: 'submodel',
					filterId: 'submodel-carousel',
					filterParam: self
				}
			});
			$('#filter-submodel').removeClass('inactive');
			//self.initCarousel();
			self.populateFilter({
				data: {
					filterName: 'engine',
					filterId: 'filter-engine',
					filterParam: self
				}
			});
			$('#filter-engine').parents('p').removeClass('inactive');
			$('#filter-engine').data('dd').set('disabled', false);
			$('#filter-engine').data('dd').set('selectedIndex',
				self.selectedSubmodelIndex);
			self.selectedEngineIndex = self.selectedSubmodelIndex;
			self.unmarkFields([{
				id: '#filter-model',
				name: 'model'
			}], [0]);
			self.unmarkFields([{
				id: '#filter-submodel',
				name: 'submodel'
			}], [0]);
			self.unmarkFields([{
				id: '#filter-engine',
				name: 'engine'
			}], [0]);
			//$('#button-add-car').removeClass('disabled');
		}
		//$('#button-add-car').addClass('disabled');
		//console.log('#filter-model.change after: selectedEngineIndex = ' + self.selectedEngineIndex);
	});

	$('#filter-year').off('change').on('change', function() {
		self.selectedYearIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		//console.log('getting year');
		self.selectedYear =  $(this).msDropDown().data('dd').get('value');
		//console.log('year = ' + self.selectedYear);
		self.unmarkFields([{
			id: '#filter-year',
			name: 'year'
		}], [0]);
	});
	
	$('#filter-engine').off('change').on('change', function() {
		self.selectedEngineIndex = $(this).msDropDown().data('dd').get('selectedIndex');
		/*if (self.selectedEngineIndex == -1)
		{
			$('#button-add-car').addClass('disabled');
		}
		else
		{
			$('#button-add-car').removeClass('disabled');
		}*/
	});
	
	$('#submodel-carousel-prev').off('dblclick')
		.on('dblclick', function(evt) {
			evt.stopPropagation();
			return false;
		});
}

BazaApp.prototype.closeClickHandler = function(evt){
	//console.log('closeClickHandler: evt = ');
	//console.log(evt);
	evt.stopPropagation();
	$(this).off('click');
	var closed = $('#intro').hasClass('closed');
	var $this = $(this);
	if (closed)
	{
		//$this.animate({ opacity: '0.0' }, 200, function() {
			$this.addClass('animating');
			$('#intro').removeClass('closed');
			$this
				//.find('.close-link-text').text('Zatvori').end()
				.find('.arrow').addClass('up').removeClass('down');
			$('#intro').stop().animate({
				height: evt.data.introHeight + 'px'
			}, evt.data.animDelay, 'linear', function() {
				$('#intro .left-side').stop().animate({
					height: evt.data.leftSideHeight + 'px'
				}, evt.data.animDelay, 'linear');
				$('.intro-inner').animate({
					'padding-top': '2em'
				}, evt.data.animDelay);
				$('#intro h1').stop().animate({
					'font-size': '190%',
					'margin-top': '10px',
					'padding-bottom': '1em'
				}, evt.data.animDelay);
				$('#intro p,#intro .canvas,#intro img').stop().animate({ opacity: '1.0' }, evt.data.animDelay);
				//$('#intro .left-side').animate({ height: introHeight + 'px' }, 200, function() {
					$this.removeClass('animating');
					$this.find('.button-icon').removeClass('down').addClass('up');
					//$this.animate({ opacity: '1.0' }, 200);
					//$this.find('.arrow').animate({ opacity: '1.0' }, 200);
				//});
			});
		//});
	}
	else // open
	{
		$this
			//.find('.close-link-text').text('Otvori').end()
			.find('.arrow').addClass('down').removeClass('up');
			//.animate({ opacity: '0.0' }, 200, function() {
				$this.addClass('animating');
				$('#intro p,#intro .canvas,#intro img').stop().animate({
					opacity: '0.0'
				}, evt.data.animDelay, function(){
					$('.intro-inner').stop().animate({
						'padding-top': '0'//'0.7em'
					}, evt.data.animDelay, function() {
						$('#intro h1').stop().animate({
							'font-size': '160%',
							'margin-top': 0,
							'padding-bottom': 0
						}, evt.data.animDelay);
					//$('#intro .left-side').animate({ height: $('#intro h1').outerHeight(true) + 'px' }, 200);
					
						$('#intro .left-side').stop().animate({
							height: '20px',//evt.data.headHeight + 'px',
							'padding-bottom': '0'//'0.5em'							
						}, evt.data.closeAnimDelay, 'linear');
						$('#intro').stop().animate({
							height: '50px',//evt.data.headHeight + 'px',
							'padding-bottom': '0'//'0.5em'							
						}, evt.data.animDelay, 'linear', function() {
							$this.removeClass('animating');
							//$this.animate({ opacity: '1.0' }, 200);
							//$this.find('.arrow').animate({ opacity: '1.0' }, 200);
							$('#intro').addClass('closed');
							$this.find('.button-icon').removeClass('up').addClass('down');
						});
					});
				});
			//});
	}
	//console.log(evt.data);
	$(this).on('click', evt.data, evt.data.thisFun);
	return false;
}
	
BazaApp.prototype.initGraph = function(svg, _this, id, dotsInteractive, graphInteractive, overrideActiveLabel)
{
	//console.log('initGraph(' + svg + ', ' + _this + ', ' + id + ')');
	var dataX = _this.dataX;
	var dataY = _this.dataY;
	
	var graphX = _this.graphX;
	var graphY = _this.graphY;
	
	var scaleX = _this.scaleX;
	var scaleY = _this.scaleY;
	
	var _dotsInteractive = typeof dotsInteractive === 'undefined' ? false : dotsInteractive;
	var _graphInteractive = typeof graphInteractive === 'undefined' ? false : graphInteractive;

	console.log('GRAPH: x = ');
	console.log(graphX);
	console.log('y = ');
	console.log(graphY);
	console.log('DATA: x = ');
	console.log(dataX);
	console.log('y = ');
	console.log(dataY);
	console.log('SCALE: x = ');
	console.log(scaleX);
	console.log('y = ');
	console.log(scaleY);

	var myFun = function(x)
	{
		return dataY.min + (5000 * Math.sqrt(x));
	}
	var dataToGraphX = function(x)
	{
		var ret = x * ((graphX.max - graphX.min) / (dataX.max - dataX.min))
			+ graphX.min;
		//console.log('dataToGraphX(' + x + ') = ' + ret);
		return ret;
	}
	var dataToGraphY = function(y)
	{
		var ret = graphY.max - (y * ((graphY.max - graphY.min) / (dataY.max - dataY.min))
			+ graphY.min);
		//console.log('dataToGraphY(' + y + ') = ' + ret);
		return ret;
	}
	var graphToDataX = function(x)
	{
		var ret = (x - graphX.min) * ((dataX.max - dataX.min) / (graphX.max - graphX.min));
		//console.log('graphToDataX(' + x + ') = ' + ret);
		return ret;
	}
	var graphToDataY = function(y)
	{
		var ret = ((graphY.max - y) - graphY.min) * ((dataY.max - dataY.min) / (graphY.max - graphY.min));
		//console.log('graphToDataY(' + y + ') = ' + ret);
		return ret;
	}

	var g = svg.group({
		stroke: 'rgb(200,200,200)',
		'stroke-width': '1.0'
	});
	svg.line(g, 100, 150, 500, 150);
	svg.line(g, 100, 150, 100, 0);
	svg.text(80, 20, formatCurrency(dataY.max), {
		//stroke: this.graphDotColor,
		'font-size': '100%',
		fill: this.graphDotColor,
		textAnchor: 'end'
	});
	svg.text(80, 150, formatCurrency(dataY.min), {
		//stroke: 'none',
		'font-size': '100%',
		fill: this.graphDotColor,
		textAnchor: 'end'
	});
	svg.text(500, 170, '10', {
		//stroke: 'none',
		'font-size': '100%',
		fill: this.graphDotColor,
		textAnchor: 'end'
	});
	svg.text(100, 170, '0', {
		//stroke: 'none',
		'font-size': '100%',
		fill: this.graphDotColor,
		textAnchor: 'start'
	});

	/*console.log('graphX.min = '
		+ graphX.min
		+ ', graphY.min = '
		+ graphY.min
		+ ', graphY.max = '
		+ graphY.max
		+ ', graphX.max = '
		+ graphX.max
		+ ', graphY.max - graphY.min = '
		+ (graphY.max-graphY.min)
	);*/

	var newplot = svg.plot.noDraw()
		.area(
			/*provoz.graphMinX/xScaleMax * (xScaleMax / provoz.graphMaxX),
			provoz.graphMinY/yScaleMax * (yScaleMax / provoz.graphMaxY),
			(provoz.graphMaxX-provoz.graphMinX)/xScaleMax
				* (xScaleMax / provoz.graphMaxX),
			(provoz.graphMaxY-provoz.graphMinY)/yScaleMax
				* (yScaleMax / provoz.graphMaxY)*/
				
			graphX.min,
			graphY.min,
			graphX.max,//-graphX.min,
			graphY.max-graphY.min
			)
		.equalXY(false)
		.xAxis.scale(scaleX.min, scaleX.max).line('transparent', 0).end()
		.yAxis.scale(scaleY.min, scaleY.max).line('transparent', 0).end()
		.addFunction('fun', function(x) {
			return myFun(x) / (dataY.max - dataY.min);
		}, '#f18d34', 1)
		.functions(0).range(dataX.min, dataX.max).end()
		.legend.show(false).end()
		.status(function(arg) {
			//console.log('onstatus, arg = {' + arg + '}');
			if (arg.length > 0)
			{
				$(svg.root()).find('path').attr('stroke-width', 2);
			}
			else
			{
				$(svg.root()).find('path').attr('stroke-width', 1);
			}
		})
		.redraw();
		
	var plotMouseOverArea = svg.group({ class: 'plot-mouseover-area' });
	var offsetNum = 0;
	var $plot = $('.svg-plot', svg.root()).eq(0);
	
	var clone = svg.clone(plotMouseOverArea, $plot);
	//console.log($('#' + id + ' .plot-mouseover-area path', svg.root()));
	$('.plot-mouseover-area path', svg.root()).attr({
		'stroke-width': 10,
		stroke: 'transparent'
	});
	/*console.log('newplot: area = ' + newplot.area());
	console.log('newplot: xaxis.scale = ');
	console.log(newplot.xAxis.scale());*/

	$(svg.root())
		.find('.svg-plot .background').remove().end()
		//.find('.svg-plot clippath').remove().end()
		.find('.svg-plot .xAxis').remove().end()
		.find('.svg-plot .xAxisLabels').remove().end()
		.find('.svg-plot .yAxis').remove().end()
		.find('.svg-plot .yAxisLabels').remove().end()
		.find('.svg-plot text').remove().end();

	for (var i = 0; i < this.numDots; i++)
	{
		var minX = this.graphMinX;
		var maxX = this.graphMaxX;
		var minY = this.graphMinY;
		var maxY = this.graphMaxY;
		var dotR = this.dotR;
		var selDotR = this.selDotR;
		var graphPadding = this.graphPadding;
		
		var dy = Math.random() * this.graphDotDelta - this.graphDotDelta/2;
		var x = //minX+dotR+graphPadding + Math.random() * (maxX-dotR-graphPadding-minX-dotR-graphPadding);
			dataX.min + Math.random() * (dataX.max - dataX.min);
		if (dataToGraphX(x) - 2 * this.dotR < graphX.min)
		{
			x = 1;
		}
		var y = //minY+dotR+graphPadding + Math.random() * (maxY-dotR-graphPadding-minY-dotR-graphPadding);
			dataToGraphY(myFun(x)) + dy;
		if (y > graphY.max - this.dotR)
		{
			y = graphY.max - 2 * this.dotR;
		}
		/*console.log('initGraph: point [' + x + ', ' + y + ']');
		console.log('myFun(' + x + ') = ' + myFun(x));
		console.log('dy = ' + dy);*/		
		x = dataToGraphX(x);
		
		var cls = 'circ' + zeroes(i);
		var saveX = x;
		var saveY = y;
		//console.log('circle at [' + x + ', ' + y + ']');
		var circ = svg.circle(x, y, dotR, {
			class: cls,
			fill: this.graphDotColor,
			stroke: this.graphDotColor
		});
		if (_dotsInteractive)
		{
			//console.log('setting mouseover for ' + '#' + id + ' .' + cls);
			$('#' + id + ' .' + cls)
				.data('cx', x)
				.data('cy', y)
				.off('mouseover').on('mouseover', function(evt) {
				//console.log('cls.mouseover: cls = ' + cls + ', class = ' + $(this).attr('class'));
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				var _cls = $(this).attr('class');
				var x = $(this).data('cx');
				var y = $(this).data('cy');
				//console.log('pos = [' + x + ', ' + y + ']');
				//_this.showGuides('#' + id, '.' + _cls);
				_this.showHint(evt, '#' + id, '.' + _cls,
					'datadot' + _cls,
					'Godiste: 2005<br />'
					+ 'Kilometraza: ' + formatDistance(120000) + '<br />'
					+ 'Stanje vozila: ' + formatNumeric(graphToDataX(x) * 10, false, true, 1) + '<br />'
					+ 'Procena vredn.: ' + formatCurrency(graphToDataY(y)),
					{
						x: x,
						y: y
					}
				);
				return false;
			});
		}
	}
	
	//console.log($('.plot-hide-area path', svg.root()));
	if (_graphInteractive)
	{
		$('.plot-mouseover-area path', svg.root()).each(function(idx){
			//console.log('setting ' + idx);
			//console.log($(this).index());
			//$(this).parent().removeAttr('clip-path').prev().remove();
			$(this).off('mouseover').on('mouseover', function(evt) {
				//console.log('mouse over ' + idx);
				//console.log($(this).prop('id'));
				//console.log($(this).index());
				//console.log('.plotHideArea.mouseover');
				//console.log(evt);
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				_this.showHint(evt, '#' + id, '.active-dot',
					'plot',
					'Opis grafika, koji<br />sadrzi vise redova teksta',
					{
						x: evt.offsetX,
						y: dataToGraphY(myFun(graphToDataX(evt.offsetX + _this.graphHintCalloutSize)))
							//+ _this.graphHintCalloutSize/2
							//+ _this.graphHintAreaSize
							
					}
				);
				return false;
			});
		});
	}

	//console.log('==========DOT BEGIN==========');
	var x = 3.56;
	var y = myFun(x/10);
	var gX = dataToGraphX(x/10);
	var gY = dataToGraphY(y);
	//console.log('==========DOT END==========');
	/*console.log('initGraph: x = ' + x
		+ ', y = ' + y
		+ ', gX = ' + gX
		+ ', gY = ' + gY
	);*/
	
	var dot = svg.circle(gX, gY, selDotR, {
		fill: '#f18d34',
		stroke: '#f18d34',
		class: 'active-dot'
	});
	
	var ret = _this.showGuides('#' + id, '.active-dot', {
		dataToGraphX: dataToGraphX,
		dataToGraphY: dataToGraphY,
		graphToDataX: graphToDataX,
		graphToDataY: graphToDataY
	});
	$dot = $('#' + id + ' .active-dot');
	$dot.data('cx', gX.toString()).data('cy', gY.toString());
	$(ret.guides, svg.root()).off('mouseover').on('mouseover', function(evt) {
		//console.log('.guides.mouseover');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		return false;
	});
	$(ret.hintArea, svg.root()).off('mouseover').on('mouseover', function(evt) {
		//console.log('.hintArea.mouseover');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		var x = $dot.data('cx');
		var y = $dot.data('cy');
		//console.log('data() returns: [x=' + x + ', y=' + y + ']');
		_this.showHint(evt, '#' + id, '.active-dot',
			'dot',
			//'[' + x + ',' + y + ']<br />'+
			(typeof overrideActiveLabel !== 'undefined'
				? overrideActiveLabel
				: 'Godiste: 2005<br />'
				+ 'Kilometraza: ' + formatDistance(120000) + '<br />'
				+ 'Stanje vozila: ' + formatNumeric(graphToDataX(x) * 10, false, true, 1) + '<br />'
				+ 'Procena vredn.: ' + formatCurrency(graphToDataY(y))),
			{
				x: x,
				y: y
			}
		);
		return false;
	});
}

// returns: guides, hint area
BazaApp.prototype.showGuides = function(graphid, dotid, conversionFunctions)
{
	var svg = $(graphid).svg('get');
	var x = parseFloat($(dotid, svg.root()).attr('cx'));
	var y = parseFloat($(dotid, svg.root()).attr('cy'));
	var $dot = $(dotid);
	var self = this;
	var graphToDataX = conversionFunctions.graphToDataX;
	var graphToDataY = conversionFunctions.graphToDataY;
	var dataToGraphX = conversionFunctions.dataToGraphX;
	var dataToGraphY = conversionFunctions.dataToGraphY;
	//console.log('showGuides(' + graphid + ', ' + dotid + ')');
	var guides = svg.group({
		class: 'guides',
		'stroke-width': '0.5'
	});
	svg.line(guides, self.graphMinX, y, x, y, {
		class: 'guide',
		stroke: self.graphLineColor
	});
	svg.line(guides, x, self.graphMaxY, x, y, {
		class: 'guide',
		stroke: self.graphLineColor
	});
	//svg.clone(guides, $dot);
	var hintArea = svg.group(guides, {
		class: 'hint-area'
	});
	var circ = svg.circle(hintArea, x, y, self.graphHintAreaSize, {
		class: 'hide-area',
		fill: 'transparent',
		stroke: 'transparent'
	});
	svg.circle(hintArea, x, y, self.dotR + 2, {
		fill: '#fff',
		stroke: self.graphCircleColor
	});
	/*$(circ, svg.root()).on('mouseout', function() {
		//self.hideGuides(graphid);
		self.hideHint(graphid);
	});*/
	svg.circle(hintArea, x, y, self.dotR, {
		fill: self.graphCircleColor
	});
	
	svg.rect(guides,
		0, y - this.graphLabelHeight/2,
		this.graphX.min - this.graphLabelHeight / 2,
		this.graphLabelHeight,
		{
			fill: '#5e6cfa'
		}
		);
	svg.polygon(guides,
		[[this.graphX.min - this.graphLabelHeight / 2,
			y - this.graphLabelHeight/2],
		 [this.graphX.min,
			y],
		 [this.graphX.min - this.graphLabelHeight / 2,
			y + this.graphLabelHeight/2]],
		{
			fill: '#5e6cfa'
		}
	);
	/*console.log('(this.dataY.max-this.dataY.min)/(this.graphY.max - this.graphY.min) = '
		+ (this.dataY.max-this.dataY.min)
		+ ' / '
		+ (this.graphY.max - this.graphY.min)
		+ ' = '
		+ (this.dataY.max-this.dataY.min)/(this.graphY.max - this.graphY.min)
	);
	console.log('this.graphY.max - (y - this.graphY.min) = '
		+ (this.graphY.max - (y - this.graphY.min))
	);*/
	/*if (graphid == '#graph001')
	{
		svg.text(guides, this.graphLabelHeight/4, y + this.graphLabelHeight/4,
			'Procena vredn.',
			{
				'font-size': '80%',
				fill: '#fff'
			}
		);
	}
	else
	{*/
		svg.text(guides, this.graphLabelHeight/4, y + this.graphLabelHeight/4,
			formatCurrency(graphToDataY(y)),
			{
				fill: '#fff'
			}
		);
	/*}*/
	// "patch"
	svg.line(guides,
		this.graphX.min - this.graphLabelHeight / 2,
		y - this.graphLabelHeight/2 + 2,
		this.graphX.min - this.graphLabelHeight / 2,
		y + this.graphLabelHeight/2 - 2,
		{
			strokeWidth: 3,
			stroke: '#5e6cfa'
		}
	);

	var graphLabelWidth = this.graphMinX - this.graphLabelHeight / 2;
	svg.rect(guides,
		x - graphLabelWidth - this.graphLabelHeight/2, this.graphY.max - this.graphLabelHeight/2,
		graphLabelWidth,
		this.graphLabelHeight,
		{
			fill: '#5e6cfa'
		}
		);
	svg.polygon(guides,
		[[x - this.graphLabelHeight / 2,
			this.graphY.max - this.graphLabelHeight/2],
		 [x, this.graphY.max],
		 [x - this.graphLabelHeight / 2,
			this.graphY.max + this.graphLabelHeight/2]],
		{
			fill: '#5e6cfa'
		}
	);
	/*console.log('val = '
		+ (((x - this.graphX.min)
				* (
					(this.dataX.max-this.dataX.min)/(this.graphX.max - this.graphX.min)
				)
			//- this.dataY.min
			))
	);*/
	/*if (graphid == '#graph001')
	{
		svg.text(guides, x - graphLabelWidth - this.graphLabelHeight/4, this.graphY.max + this.graphLabelHeight/4,
			'Stanje vozila',
			{
				'font-size': '80%',
				fill: '#fff'
			}
		);
	}
	else
	{*/
		svg.text(guides, x - graphLabelWidth - this.graphLabelHeight/4, this.graphY.max + this.graphLabelHeight/4,
			formatNumeric(10 * graphToDataX(x),
				false,
				true,
				1
			),
			{
				fill: '#fff'
			}
		);
	/*}*/
	// "patch"
	svg.line(guides,
		x - this.graphLabelHeight / 2,
		this.graphY.max - this.graphLabelHeight/2 + 2,
		x - this.graphLabelHeight / 2,
		this.graphY.max + this.graphLabelHeight/2 - 2,
		{
			strokeWidth: 3,
			stroke: '#5e6cfa'
		}
	);
	/*svg.polygon(guides,
		[[60, 60], [70, 70], [60, 80]],
		{
			fill: 'red'
		}
	);*/
	return { guides: guides, hintArea: hintArea };
}

BazaApp.prototype.hideGuides = function(graphid)
{
	//console.log('hideGuides(' + graphid + ')');
	var svg = $(graphid).svg('get');
	$(graphid).find('.guides').each(function() {
		svg.remove(this);
	});
}

BazaApp.prototype.showHint = function(event, graphid, dotid, hintFor, overrideHtml, overridePos)
{
	var self = this;
	
	var dataFor = $('#graphHint').data('for');
	if (typeof dataFor === 'undefined' || dataFor.length == 0)
	{
		dataFor = hintFor;
	}
	
	if ($('#graphHint').hasClass('active')
		&& dataFor == hintFor)
	{
		return;
	}

	/*console.log('showHint: cx = ');
	console.log($(dotid).prop('cx').baseVal.valueInSpecifiedUnits);
	console.log('          cy = ');
	console.log($(dotid).prop('cy').baseVal.valueInSpecifiedUnits);*/
	if (typeof overrideHtml !== 'undefined')
	{
		$('#graphHint .hint-text').html(overrideHtml);
	}
		
	$('#graphHint').css({
		top:
			$(graphid).offset().top
			+ parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cy').baseVal.valueInSpecifiedUnits
				: overridePos.y))
			//event.pageY //- $('#intro').offset().top
			- $('#graphHint').outerHeight(true)/2 + 'px',
		left: 
			$(graphid).offset().left
			+ parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cx').baseVal.valueInSpecifiedUnits
				: overridePos.x))
			//event.pageX //- $('#intro').offset().left
			+ this.graphHintCalloutSize + this.graphHintAreaSize
			+ 'px',
		opacity: '0.0',
		display: 'block'
	}).animate({ opacity: '1.0' }, this.graphHintAnimateDelay, function() {
		$(this).css({ display: '' }).addClass('active');
	});
	
	$('#graphHint').data('for', hintFor);
}

BazaApp.prototype.hideHint = function()
{
	$('#graphHint').animate({ opacity: '0.0' }, this.graphHintAnimateDelay, function() {
		$(this).removeClass('active').css({ opacity: '1.0' });
	});
	/*var svg = $(graphid).svg('get');
	$(graphid).find('.hint').each(function() {
		svg.remove(this);
	});*/
}

BazaApp.prototype.hoverPlot = function(svg, plot)
{
	svg.change(plot, { 'stroke-width': 2 });
}

BazaApp.prototype.unhoverPlot = function(svg, plot)
{
	svg.change(plot, { 'stroke-width': 1 });
}

BazaApp.prototype.initCarousel = function(mainId, prevId, nextId, thumbsId, mainWidth, mainHeight, fx,
	callBack, self)
{
	var data = {
		callBack: typeof callBack === 'undefined' ? function() {} : callBack,
		self: typeof self === 'undefined' ? this : self
	};

	if (typeof mainWidth === 'undefined')
	{
		//mainWidth = 547;
		//mainWidth = 538;
		mainWidth = 577;
	}
	if (typeof mainHeight === 'undefined')
	{
		//mainHeight = 407;
		//mainHeight = 410;
		mainHeight = 440;
	}
	
	if (typeof thumbsId !== 'undefined')
	{
		$(thumbsId).slimScroll({
			//height: '100px'
		});
		$(thumbsId).closest('.slimScrollDiv').prop('id', thumbsId.substring(1) + '-ss');
	}
	
	$(mainId).carouFredSel({
		width: null,
		height: mainHeight,
		items: {
			width: mainWidth,
			height: mainHeight,
			visible: 1,
			start: 0
		},
		auto: false,
		onCreate: function(data){
		},
		scroll: {
			fx: fx,
			onBefore: $.proxy(function(args) {
				//console.log('calling onBefore callback; args = ');
				//console.log(args);
				$.proxy(this.callBack, this.self)(args);
			}, data)
		}
	}, {
		debug: true
	});
	$(prevId).off('click').on('click', function() {
		$(mainId).trigger('prev', {items: 1});
	});
	$(nextId).off('click').on('click', function() {
		$(mainId).trigger('next', {items: 1});
	});
	
	//data.self = null;
	//data.callBack = null;
	data = null;
}

$(document).ready(function(){
	var baza = new BazaApp();
	baza.initCarData();
	baza.initEvents();
	//baza.initFilterEvents();
	//baza.initRightList();
	//baza.initCarousel();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
});
