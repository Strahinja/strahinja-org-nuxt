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

function PgtvApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.rightListMaxEntries = 5;
	this.infoBoxDelay = 3000;
	this.carListChangeHideDelay = 200;
	this.carListChangeShowDelay = 700;
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.lastPopulatedItem = -1;
	this.eventsInitFirstTime = true;
}

PgtvApp.prototype.updateRightListMinMaxItemAmount = function(amount)
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

PgtvApp.prototype.formatRightListItem = function(item, index, thisParam)
{
	var html = '';
	var barWidth = 0;
	var percentage = 0;
	var minWidth = 260;
	var arrowWidth = 50;
	
	percentage = 0;
	minWidth = 260;
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
			//+ '<div class="right-list-item-image empty"><img src="img/pgtvcaritem.png" /></div>'
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
		//console.log('item.empty == false');
		/*console.log('maxItemamount = ' + thisParam.rightListMaxItemAmount);
		console.log(thisParam);*/
		var fiveYear = item.getFiveYear();
		if (thisParam.rightListMaxItemAmount != 0
			&& (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount != 0))
		{
			percentage = (fiveYear - thisParam.rightListMinItemAmount)
				/ (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount);
		}
		if (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount == 0)
		{
			percentage = 0; // minimalna duzina trake za prvu stavku (0 = 0%, 1 = 100%)
		}
		barWidth = minWidth + percentage * (maxWidth - minWidth);
		var fullBarWidth = barWidth + arrowWidth;
		/*console.log('minWidth = '
			+ minWidth
			+ ', maxWidth = '
			+ maxWidth
			+ ', percentage = '
			+ percentage
			+ ', maxw-minw = '
			+ (maxWidth - minWidth)
			+ ', barWidth = '
			+ barWidth
		);*/
		
		html += '<h3 class="right-list-item-title">'
			+ item.toString()
			+ '</h3>'
			/*+ '<div class="right-list-item-image"><img src="'
			+ item.imagePath
			+ '" /></div>'*/
			+ '<div class="right-list-item-text">5 godina = '
			+ formatCurrency(fiveYear)
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

PgtvApp.prototype.activateInfoWindow = function()
{
	$('#info-background').css({ opacity: '0.75' }).addClass('active');
	$('#info').css({ opacity: '1.0' }).addClass('active');
}

PgtvApp.prototype.deactivateInfoWindow = function()
{
	$('#info-background').removeClass('active');
	$('#info').removeClass('error active');
}

PgtvApp.prototype.fadeOutInfoWindow = function(app)
{
	$('#info-background').animate({ opacity: '0.0' }, 200);
	$('#info').animate({ opacity: '0.0' }, 200, function(){
		app.deactivateInfoWindow();
	});
}

PgtvApp.prototype.openInfoWindow = function(message)
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

PgtvApp.prototype.markFields = function(fieldList, message, wrapper)
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

PgtvApp.prototype.unmarkFields = function(fieldList, indexList, wrapper)
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

PgtvApp.prototype.addError = function(name, message)
{
	$('.error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

PgtvApp.prototype.clearErrorDescriptions = function()
{
	console.log('clearErrorDescriptions()');
	$('.error-desc')
		.empty()
		.addClass('inactive');
}

PgtvApp.prototype.addItem = function(maker, model, submodel, year, amount, imagePath,
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

PgtvApp.prototype.populateFilter = function(evt)
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

PgtvApp.prototype.depopulateFilter = function(evt)
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
			+ '<img src="img/pgtvcaritem.png" id="p000" />'
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

PgtvApp.prototype.initCarData = function()
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

PgtvApp.prototype.createRightListItems = function(thisParam)
{
	var data = [];
	for (var i = 0; i < thisParam.rightListMaxEntries; i++)
	{
		var newItem = new RightListItem(i + 1);
		data.push(newItem);
	}
	return data;
}

PgtvApp.prototype.getItem = function(index)
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

PgtvApp.prototype.initRightList = function(self)
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

PgtvApp.prototype.compareItemsByFiveYear = function(i1, i2)
{
	var f1 = i1.getFiveYear(), f2 = i2.getFiveYear();
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
	else return (f1 < f2 ? -1 : (f1 > f2 ? 1 : 0));
}

PgtvApp.prototype.updateList = function()
{
	//console.log('updateList() called');
	
	// Sort
	var list = $('#right-list').data('advlist').getData();
	list.sort(this.compareItemsByFiveYear);
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

PgtvApp.prototype.removeItem = function(index)
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
				_this.updateRightListMinMaxItemAmount(data[i].getFiveYear());
			}
		}
		_this.updateList();
		$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
	});
}

PgtvApp.prototype.populatePopup = function(item)
{
	console.log('populatePopup(): item = ');
	console.log(item);
	$('.popup-title h2').text(item.toString());
	$('.popup-title h3').text(
		formatHorsePower(item.engine.hp)
		+ ' @ '
		+ formatRange(rangeToString(item.engine.rpm, item.engine.rpmhi),
			formatRPM, formatRPMAndLess, formatRPMAndMore, formatRPMAll,
			true
		)
		+ ', '
		+ item.additional
	);
	$('.popup .fuel').text(formatCurrency(item.fuel));
	$('.popup .insurance').text(formatCurrency(item.insurance));
	$('.popup .maintenance').text(formatCurrency(item.maintenance));
	$('.popup .fiveyear').text(formatCurrency(item.getFiveYear()));
	$('.popup .expensepk').text(formatCurrency(item.expensepk, true, true, 2));
	$('.popup .green .text-inner-amount').text(formatCurrency(item.fuel));
	$('.popup .orange .text-inner-amount').text(formatCurrency(item.insurance));
	$('.popup .red .text-inner-amount').text(formatCurrency(item.maintenance));
	$('.popup .blue .text-inner-amount').text(formatCurrency(item.getFiveYear()));
}

PgtvApp.prototype.openDetails = function(target, self)
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

PgtvApp.prototype.initEvents = function(self)
{
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
	/*$('.details-car').off('click').on('click', function() {
		if ($(this).hasClass('disabled'))
		{
			return false;
		}
		$('.popup-background').addClass('active').css({ opacity: '0.7' });
		$('.popup').addClass('active');
		var item = self.getItem($(this).parent().index()); //$(this).data('car-index'));
		self.populatePopup(item);
		return false;
	});*/
	//console.log('setting button-add-car handler!');

	//var addCarButtonWasDisabled = $('#button-add-car').hasClass('disabled');
	$('#button-add-car')//.removeClass('disabled')
		.off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		//console.log('in button-add-car handler!');
		//var disabled = $(this).hasClass('disabled');
		//console.log('disabled = ' + disabled);
		//if (disabled) return false;
		//console.log('self.selectedSubmodelIndex = ' + self.selectedSubmodelIndex);

		var $target = $(evt.target).prop('id') == 'button-add-car' ? $(evt.target) : $(evt.target).closest('#button-add-car');
		var disabled = $target.hasClass('disabled');

		if (disabled)
		{
			$target = null;
			return false;
		}
		
		this.clearErrorDescriptions();
		
		var allDefined = true;
		
		if (typeof this.selectedBrandIndex === 'undefined'
			|| this.selectedBrandIndex == -1)
		{
			this.markFields([{
				id: '#filter-brand',
				name: 'brand'
			}]);
			allDefined = false;
			//self.openInfoWindow('Unesite marku i model.');
			//return false;
		}
		if (typeof this.selectedModelIndex === 'undefined'
			|| this.selectedModelIndex == -1)
		{
			this.markFields([{
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
		if (typeof this.selectedSubmodelIndex === 'undefined'
			|| this.selectedSubmodelIndex == -1)
		{
			this.markFields([{
				id: '#filter-submodel',
				name: 'submodel'
			}], undefined, '.submodel-wrapper');
			allDefined = false;
		}
		if (typeof this.selectedEngineIndex === 'undefined'
			|| this.selectedEngineIndex == -1)
		{
			this.markFields([{
				id: '#filter-engine',
				name: 'engine'
			}]);
			allDefined = false;
		}
		
		if (!allDefined)
		{
			this.addError('enter-fields', 'Unesite obavezna polja.');
			$target = null;
			return false;
		}
		
		//console.log('self.carData = ');
		//console.log(self.carData);
		if (this.addItem(
			this.carData['brand'][this.selectedBrandIndex],
			this.carData['model'][this.selectedBrandIndex][this.selectedModelIndex],
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].name,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].year,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].amount,
			'img/listcar-001.png',
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].fuel,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].insurance,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].maintenance,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].expensepk,
			'2.0T Premium Wagon 4-door',
			this.selectedYear,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].id,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedEngineIndex].engine
		))
		{
			// Reset all filters
			this.resetFilters();
		}
		$target = null;
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
	self.eventsInitFirstTime = false;
	self = null;
}

PgtvApp.prototype.resetFilters = function()
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

PgtvApp.prototype.initFilterEvents = function()
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
		console.log('getting year');
		self.selectedYear =  $(this).msDropDown().data('dd').get('value');
		console.log('year = ' + self.selectedYear);
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
			//this.introAnimatedOneTime = false;
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
						/*if (!this.introAnimatedOneTime)
						{*/
							$('#intro').finish().css('height', evt.data.introHeight + 'px')
							.animate({
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
								//this.introAnimatedOneTime = true;
								console.log('1923: this.introAnimating = ' + this.introAnimating);
								$closeButton = null;
							}, this));
						//}
					/*});*/
				}, this));
			//});
	}
	//console.log(evt.data);
	//$closeButton.on('click', evt.data, closeClickHandler);
	return false;
}
	
PgtvApp.prototype.initCarousel = function()
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
					$('#filter-engine').data('dd').set('selectedIndex', self.selectedSubmodelIndex);
					self.selectedEngineIndex = self.selectedSubmodelIndex;
					//$('#button-add-car').removeClass('disabled');
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
	/*$('#submodel-carousel > div').off('click').on('click', function(){
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
	});*/
}
	
$(document).ready(function(){
	var pgtv = new PgtvApp();
	pgtv.initCarData();
	pgtv.initEvents();
	pgtv.initFilterEvents();
	pgtv.initRightList();
	pgtv.initCarousel();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
	
	/*window.alert('introHeight = ' + introHeight
		+ ', leftSideHeight = ' + leftSideHeight
		+ ', heightDelta = ' + heightDelta
		+ ', headHeight = ' + headHeight);*/
	
	/*$('body').off('dblclick').on('dblclick', function(evt) {
		evt.stopPropagation();
		window.alert('dbl click');
		return false;
	});*/
});
