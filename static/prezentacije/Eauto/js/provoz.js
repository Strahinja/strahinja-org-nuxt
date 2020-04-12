function RightListItem(number)
{
	this.number = number;
	this.maker = undefined;
	this.model = undefined;
	this.submodel = undefined;
	this.year = { min: undefined, max: undefined };
	this.amount = undefined;
	this.imagePath = undefined;
/*- Maksimalna cena
- Minimalna cena
- Najveca kilometraza
- Najmanja kilometraza
- Eauto procena
- Pouzdanost procene*/
	this.priceMin = undefined;
	this.priceMax = undefined;
	this.mileageMin = undefined;
	this.mileageMax = undefined;
	this.mileage = undefined;
	this.evalAmount = undefined;
	this.evalAccuracy = undefined;
	this.additional = undefined;
	this.selectedYear = undefined;
	this.id = undefined;
	this.engine = undefined;
	this.empty = true;
}

RightListItem.prototype.getEvalAmount = function()
{
	return this.evalAmount;
}

RightListItem.prototype.getEvalAccuracy = function()
{
	return this.evalAccuracy;
}

RightListItem.prototype.toString = function()
{
	if (!this.empty)
	{
		if (typeof this.selectedYear == 'undefined')
		{
			return formatRange(rangeToString(this.year.min, this.year.max))
				+ ' ' + this.maker + ' ' + this.submodel
				//+ ', ' + formatHorsePower(this.engine.hp) + ' @ ' + formatRPM(this.engine.rpm)
				+ ', ' + formatDistance(this.mileage);
		}
		else
		{
			return this.selectedYear + ' ' + this.maker + ' ' + this.submodel
				//+ ', ' + formatHorsePower(this.engine.hp) + ' @ ' + formatRPM(this.engine.rpm)
				+ ', ' + formatDistance(this.mileage);
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
		item.priceMin, item.priceMax, item.mileageMin, item.mileageMax, item.mileage, item.evalAmount, item.evalAccuracy,
		item.additional, item.selectedYear, item.id, item.engine);
}

RightListItem.prototype.populate = function(maker, model, submodel, year, amount, imagePath,
	priceMin, priceMax, mileageMin, mileageMax, mileage, evalAmount, evalAccuracy, additional, selectedYear, id, engine)
{
	this.maker = maker;
	this.model = model;
	this.submodel = submodel;
	this.year = { min: year.min, max: year.max };
	this.amount = amount;
	this.imagePath = imagePath;
	this.priceMin = priceMin;
	this.priceMax = priceMax;
	this.mileageMin = mileageMin;
	this.mileageMax = mileageMax;
	this.mileage = mileage;
	this.evalAmount = evalAmount;
	this.evalAccuracy = evalAccuracy;
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
	this.priceMin = undefined;
	this.priceMax = undefined;
	this.mileageMin = undefined;
	this.mileageMax = undefined;
	this.mileage = undefined;
	this.evalAmount = undefined;
	this.evalAccuracy = undefined;
	this.additional = undefined;
	this.selectedYear = undefined;
	this.id = undefined;
	this.engine = undefined;
	this.empty = true;
}

function ProvozApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
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

	this.lastPopulatedItem = -1;
	this.eventsInitFirstTime = true;
}

ProvozApp.prototype.updateRightListMinMaxItemAmount = function(amount)
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

ProvozApp.prototype.formatRightListItem = function(item, index, thisParam)
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
			//+ '<div class="right-list-item-image empty"><img src="img/provozcaritem.png" /></div>'
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
		var evalAmount = item.getEvalAmount();
		if (thisParam.rightListMaxItemAmount != 0
			&& (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount != 0))
		{
			percentage = (evalAmount - thisParam.rightListMinItemAmount)
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
			+ '<div class="right-list-item-text">Eauto procena = '
			+ formatCurrency(evalAmount)
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

ProvozApp.prototype.activateInfoWindow = function()
{
	$('#info-background').css({ opacity: '0.75' }).addClass('active');
	$('#info').css({ opacity: '1.0' }).addClass('active');
}

ProvozApp.prototype.deactivateInfoWindow = function()
{
	$('#info-background').removeClass('active');
	$('#info').removeClass('error active');
}

ProvozApp.prototype.fadeOutInfoWindow = function(app)
{
	$('#info-background').animate({ opacity: '0.0' }, 200);
	$('#info').animate({ opacity: '0.0' }, 200, function(){
		app.deactivateInfoWindow();
	});
}

ProvozApp.prototype.openInfoWindow = function(message)
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

ProvozApp.prototype.markFields = function(fieldList, message, wrapper)
{
	var name = '';
	var _wrapper = 'p';
	if (typeof wrapper !== 'undefined')
	{
		console.log('wrapper defined! setting to ' + wrapper);
		_wrapper = wrapper;
	}
	for (i in fieldList)
	{
		var field = fieldList[i];
		var $p = $(field.id).closest('p');
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
		$wrap.addClass('error');
		$p.addClass('error');
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

ProvozApp.prototype.unmarkFields = function(fieldList, indexList, wrapper)
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

ProvozApp.prototype.enableInputField = function(id)
{
	$(id).removeAttr('disabled');
}

ProvozApp.prototype.disableInputField = function(id)
{
	$(id).attr('disabled', 'disabled');
	$(id).val('');
}

ProvozApp.prototype.addError = function(name, message)
{
	$('.error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

ProvozApp.prototype.clearErrorDescriptions = function()
{
	console.log('clearErrorDescriptions()');
	$('.error-desc')
		.empty()
		.addClass('inactive');
}

ProvozApp.prototype.addItem = function(maker, model, submodel, year, amount, imagePath,
	priceMin, priceMax, mileageMin, mileageMax, mileage, evalAmount, evalAccuracy, additional, selectedYear, id, engine)
{
	/*console.log('addItem('
		+ maker + ', '
		+ model + ', '
		+ submodel + ', '
		+ year + ', '
		+ amount + ', '
		+ imagePath + ', '
		+ priceMin + ', '
		+ priceMax + ', '
		+ mileageMin + ', '
		+ mileageMax + ', '
		+ evalAmount + ', '
		+ evalAccuracy + ', '
		+ id + ')'
	);*/
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
			/*console.log('item.populate before:');
			console.log(item);*/
			item.populate(maker, model, submodel, year, amount, imagePath,
				priceMin, priceMax, mileageMin, mileageMax, mileage, evalAmount, evalAccuracy, additional,
				selectedYear, id, engine);
			/*console.log('item.populate after:');
			console.log(item);*/
			/*console.log('After:');
			console.log(item.toString());*/
			_this.updateRightListMinMaxItemAmount(item.getEvalAmount());
			_this.lastPopulatedItem = _this.lastPopulatedItem + 1;
			_this.updateList();
			//console.log('_this.carListChangeShowDelay = ' + _this.carListChangeShowDelay);
			$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
		});
	}
	return true;
}

ProvozApp.prototype.populateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
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
		for (submodel in filterParam.carData[filterName][brand][model])
		{
			var car = filterParam.carData[filterName][brand][model][submodel];
			/*console.log('populateFilter(\'submodel\'): car = ');
			console.log(car);*/
			
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
				+ (parseInt(submodel) + 1) + '/' + filterParam.carData[filterName][brand][model].length
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

ProvozApp.prototype.depopulateFilter = function(evt)
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
			+ '<img src="img/provozcaritem.png" id="p000" />'
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

ProvozApp.prototype.initCarData = function()
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
				var _submodel = this.carData['submodel'][brand][model][submodel];
				var prev = (_submodel.priceMax = Math.ceil(Math.random() * 30000 + 10000));
				_submodel.priceMin = Math.ceil(Math.random() * (prev-10000) + 10000);
				prev = (_submodel.mileageMax = Math.ceil(Math.random() * 300000));
				_submodel.mileageMin = Math.ceil(Math.random() * prev);
				_submodel.evalAmount = Math.ceil(Math.random() * 30000 + 10000);
				_submodel.evalAccuracy = (Math.random() * (1-0.6) + 0.6) * 100;
				_submodel.id = {
					brand: brand,
					model: model,
					submodel: submodel
				};
				//console.log('initCarData: _submodel = ');
				//console.log(_submodel);
			}
		}
	}
	//console.log(this.carData);
}

ProvozApp.prototype.createRightListItems = function(thisParam)
{
	var data = [];
	for (var i = 0; i < thisParam.rightListMaxEntries; i++)
	{
		var newItem = new RightListItem(i + 1);
		data.push(newItem);
	}
	return data;
}

ProvozApp.prototype.getItem = function(index)
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

ProvozApp.prototype.initRightList = function(self)
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

ProvozApp.prototype.compareItemsByEvalAmount = function(i1, i2)
{
	var a1 = i1.getEvalAmount(), a2 = i2.getEvalAmount();
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
	else return (a1 < a2 ? -1 : (a1 > a2 ? 1 : 0));
}

ProvozApp.prototype.updateList = function()
{
	//console.log('updateList() called');
	
	// Sort
	var list = $('#right-list').data('advlist').getData();
	list.sort(this.compareItemsByEvalAmount);
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

ProvozApp.prototype.removeItem = function(index)
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
				_this.updateRightListMinMaxItemAmount(data[i].getEvalAmount());
			}
		}
		_this.updateList();
		$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
	});
}

ProvozApp.prototype.populatePopup = function(item)
{
	//console.log('populatePopup: item = ');
	//console.log(item);
	
	var self = this;
	
	$('.popup .graph').each(function() {
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
			//console.log('root.mouseover: evt.target = ');
			//console.log(evt.target);
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			//var $target = $(evt.target);
			//if (!($target.hasClass('hint-area') || $target.hasParent('.hint-area')))
			{
				//self.hideGuides('#' + id);
				self.hideHint();
			}
			return false;
		});
	});

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
	
	$('.popup .pricemax').text(formatCurrency(item.priceMax));
	$('.popup .pricemin').text(formatCurrency(item.priceMin));
	$('.popup .mileagemax').text(formatDistance(item.mileageMax));
	$('.popup .mileagemin').text(formatDistance(item.mileageMin));
	$('.popup .evalamount').text(formatCurrency(item.getEvalAmount()));
	$('.popup .evalaccuracy').text(formatPercentage(item.getEvalAccuracy()));
}

ProvozApp.prototype.openDetails = function(target, self)
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

ProvozApp.prototype.initEvents = function(self)
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
	$('#button-add-car').removeClass('disabled')
		.off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		//console.log('in button-add-car handler!');
		//var disabled = $(this).hasClass('disabled');
		//console.log('disabled = ' + disabled);
		//if (disabled) return false;
		//console.log('this.selectedSubmodelIndex = ' + this.selectedSubmodelIndex);

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
			//this.openInfoWindow('Unesite marku i model.');
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
		if (typeof this.selectedYearIndex === 'undefined'
			|| this.selectedYearIndex == -1)
		{
			this.markFields([{
				id: '#filter-year',
				name: 'year'
			}]);
			allDefined = false;
		}
		if (typeof this.selectedSubmodelIndex === 'undefined'
			|| this.selectedSubmodelIndex == -1)
		{
			this.markFields([{
				id: '#filter-submodel',
				name: 'submodel'
			}]);
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
		if (typeof this.mileage === 'undefined'
			|| this.mileage == '')
		{
			this.markFields([{
				id: '#filter-mileage',
				name: 'mileage'
			}]);
			allDefined = false;
		}
		
		if (!allDefined)
		{
			this.addError('enter-fields', 'Unesite obavezna polja.');
			$target = null;
			return false;
		}

		//console.log('#button-add-car.click: submodel = ');
		//console.log(this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex]);
		if (this.addItem(
			this.carData['brand'][this.selectedBrandIndex],
			this.carData['model'][this.selectedBrandIndex][this.selectedModelIndex],
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].name,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].year,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].amount,
			'img/listcar-001.png',
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].priceMin,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].priceMax,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].mileageMin,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].mileageMax,
			this.mileage,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].evalAmount,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].evalAccuracy,
			'2.0T Premium Wagon 4-door',
			this.selectedYear,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedSubmodelIndex].id,
			this.carData['submodel'][this.selectedBrandIndex][this.selectedModelIndex][this.selectedEngineIndex].engine
		))
		{
			// Reset all fields
			this.resetFilters();
		}
		
		$target = null;
		return false;
	}, self));
	/*if (addCarButtonWasDisabled)
	{
		$('#button-add-car').addClass('disabled');
	}*/
	
	if (self.eventsInitFirstTime)
	{
		var introHeight = $('#intro').height();
		var leftSideHeight = $('#intro .left-side').height();
		var heightDelta = introHeight - leftSideHeight;
		var headHeight = $('#intro h1').height();
		
		/*window.alert('introHeight = ' + introHeight
			+ ', leftSideHeight = ' + leftSideHeight
			+ ', heightDelta = ' + heightDelta
			+ ', headHeight = ' + headHeight);*/
		
		$('.close-button a').off('click').on('click', {
			introHeight: introHeight,
			leftSideHeight: leftSideHeight,
			heightDelta: heightDelta,
			headHeight: headHeight,
			animDelay: 100,
			closeAnimDelay: 50
		}, $.proxy(closeClickHandler, self));
	}

	self.eventsInitFirstTime = false;
	
	self = null;
}

ProvozApp.prototype.resetFilters = function()
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

ProvozApp.prototype.initFilterEvents = function()
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
		
		self.disableInputField('#filter-mileage');
		
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
		self.mileage = undefined;
	});

	$('#filter-model').off('change').on('change', function() {
		self.selectedModelIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;

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
			self.disableInputField('#filter-mileage');
			self.mileage = undefined;
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
			self.enableInputField('#filter-mileage');
		}
		//$('#button-add-car').addClass('disabled');
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
		
	$('#filter-mileage')//.off('change')
	.data('filterFunction', formatDistance)
	.data('variableName', 'mileage')
	.data('fieldName', 'mileage');
	
	$('input[type="text"]').each(function(){
		$(this)
			.on('keypress', function(evt) {
				//console.log('keyup fired!');
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
	$('input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				console.log('change: evt = ');
				console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				self.unmarkFields([{
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
	
ProvozApp.prototype.initCarousel = function()
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
	$("#submodel-carousel").trigger('slideTo', [ $('#submodel-carousel').children().eq(0) ]);
}
	
ProvozApp.prototype.initGraph = function(svg, _this, id, dotsInteractive, graphInteractive, overrideActiveLabel)
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
	/*var graphToDataY = function(y)
	{
		return y/10 * ((this.graphY.max - this.graphY.min) / (this.dataY.max - this.dataY.min))
			+ this.graphY.min;
	}*/

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
	
	/*xScaleMax = 5;
	yScaleMax = xScaleMax / (
		(this.graphMaxX-this.graphMinX)
		/ (this.graphMaxY-this.graphMinY)
	);*/
	
	//console.log('drawing plot: graphX = [' + graphX.min + ', ' + graphX.max + ']');
	//console.log('drawing plot: graphY = [' + graphY.min + ', ' + graphY.max + ']');

	//====================================================================================
	/*var offsetId = id + 'offset';
	var offset = svg.filter(plotHideArea, offsetId, '-10%', '-10%', '120%', '120%');
	var offsetNum = 0;
	svg.filters.offset(offset, 'offsetOut' + zeroes(offsetNum), 'SourceGraphic', 0, -5);
	svg.filters.blend(offset, 'blendOut' + zeroes(offsetNum), 'offsetOut' + zeroes(offsetNum), 'SourceGraphic');
	for (dy = -4; dy < 5; dy++)
	{
		offsetNum = offsetNum + 1;
		svg.filters.offset(offset, 'offsetOut' + zeroes(offsetNum), 'blendOut' + zeroes(offsetNum - 1), 0, dy);
		svg.filters.blend(offset, 'blendOut' + zeroes(offsetNum), 'offsetOut' + zeroes(offsetNum), 'SourceGraphic');
	}
	var clone = svg.clone(plotHideArea, $plot);
	$('#' + offsetId + ' + svg path', svg.root()).attr({
			filter: 'url(#' + offsetId + ')',
			stroke: '#00f',
			id: id + 'clone'
	});*/
	//====================================================================================
	
	/*for (dy = -5; dy < 5; dy++)
	{
		var offsetId = 'offset' + zeroes(offsetNum);
		var offset = svg.filter(plotHideArea, offsetId, '-10%', '-10%', '120%', '120%');
		svg.filters.offset(offset, 'offsetOut', 'SourceGraphic', 0, dy);
		//svg.filters.blend(offset, 'blendOut', 'offsetOut', 'SourceGraphic');
		var clone = svg.clone(plotHideArea, $plot);
		$('#' + offsetId + ' + svg path', svg.root()).attr({
			filter: 'url(#' + offsetId + ')',
			stroke: '#00f',
			id: id + 'clone' + zeroes(offsetNum)
		});
		offsetNum = offsetNum + 1;
	}*/
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

	/*$(newplot, svg.root()).off('mouseover').on('mouseover', function(evt) {
		console.log('plot.mouseover');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		provoz.hoverPlot(svg, newplot);
		return false;
	});
	$(newplot, svg.root()).off('mouseout').on('mouseout', function(evt) {
		console.log('plot.mouseout');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		provoz.unhoverPlot(svg, newplot);
		return false;
	});*/
	
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
	
	/*$(dot, svg.root()).off('mouseover').on('mouseover', function(evt) {
		//console.log('dot.mouseover');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		//_this.showGuides('#' + id, '.active-dot');
		console.log(evt);
		_this.showHint(evt, '#' + id, '.active-dot');
		return false;
	});*/
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
		/*_this.showHint(evt, '#' + id, '.active-dot',
			'dot',
			'Opis tacke, koji moze da<br />sadrzi vise redova teksta...'
		);*/
		return false;
	});
}

// returns: guides, hint area
ProvozApp.prototype.showGuides = function(graphid, dotid, conversionFunctions)
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
	if (graphid == '#graph001')
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
	{
		svg.text(guides, this.graphLabelHeight/4, y + this.graphLabelHeight/4,
			formatCurrency(graphToDataY(y)),
			{
				fill: '#fff'
			}
		);
	}
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
	if (graphid == '#graph001')
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
	{
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
	}
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

ProvozApp.prototype.hideGuides = function(graphid)
{
	//console.log('hideGuides(' + graphid + ')');
	var svg = $(graphid).svg('get');
	$(graphid).find('.guides').each(function() {
		svg.remove(this);
	});
}

ProvozApp.prototype.showHint = function(event, graphid, dotid, hintFor, overrideHtml, overridePos)
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
	
	/*if (typeof overridePos !== 'undefined')
	{
		console.log('showHint: overridePos seems to be [' + overridePos.x + ', ' + overridePos.y + ']');
	}
	
	console.log('showHint: setting top to ' + $(graphid).offset().top
		+ ' + ' + parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cy').baseVal.valueInSpecifiedUnits
				: overridePos.y))
		+ ' - ' + $('#graphHint').outerHeight(true)/2 + 'px = '
		+ ($(graphid).offset().top
			+ parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cy').baseVal.valueInSpecifiedUnits
				: overridePos.y))
			//event.pageY //- $('#intro').offset().top
			- $('#graphHint').outerHeight(true)/2) + 'px');
	console.log('showHint: setting left to ' + $(graphid).offset().left
		+ ' + ' + parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cx').baseVal.valueInSpecifiedUnits
				: overridePos.x))
		+ ' + ' + this.graphHintCalloutSize + ' + ' + this.graphHintAreaSize + 'px = '
		+ ($(graphid).offset().left
			+ parseFloat((typeof overridePos === 'undefined'
				? $(dotid).prop('cx').baseVal.valueInSpecifiedUnits
				: overridePos.x))
			//event.pageX //- $('#intro').offset().left
			+ this.graphHintCalloutSize + this.graphHintAreaSize)
			+ 'px');
	*/
	
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
	
	/*$('#graphHint').off('mouseover').on('mouseover', function(evt) {
		console.log('#graphHint.mouseover');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		self.hideHint(graphid);
		return false;
	});*/
	
	$('#graphHint').data('for', hintFor);
}

ProvozApp.prototype.hideHint = function()
{
	$('#graphHint').animate({ opacity: '0.0' }, this.graphHintAnimateDelay, function() {
		$(this).removeClass('active').css({ opacity: '1.0' });
	});
	/*var svg = $(graphid).svg('get');
	$(graphid).find('.hint').each(function() {
		svg.remove(this);
	});*/
}

ProvozApp.prototype.hoverPlot = function(svg, plot)
{
	svg.change(plot, { 'stroke-width': 2 });
}

ProvozApp.prototype.unhoverPlot = function(svg, plot)
{
	svg.change(plot, { 'stroke-width': 1 });
}

$(document).ready(function(){
	var provoz = new ProvozApp();
	provoz.initCarData();
	provoz.initEvents();
	provoz.initFilterEvents();
	provoz.initRightList();
	provoz.initCarousel();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
	
	$('.popup-background').off('click').on('click', function() {
		$(this).next().find('.btn.close').trigger('click');
	});
	$('.popup .btn.close').off('click').on('click', function() {
		var $popup = $(this).parents('.popup');
		
		$popup
			.prev().removeClass('active').end()
			.removeClass('active');
			
		provoz.hideHint();
		return false;
	});
	
	
	$('#info-background').off('click').on('click', function(evt) {
		evt.stopPropagation();
		clearTimeout($.data(self, 'infoFadeTimeout'));
		self.fadeOutInfoWindow(provoz);
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
		
	$('#graph001').each(function() {
		var id = $(this).prop('id');
		var svg = $(this).svg({
			settings: {
				viewBox: '0 0 500 200',
				width: '100%',
				height: '100%'
			},
			onLoad: function(svg) {
				provoz.initGraph(svg, provoz, id, false, true,
					'Opis tacke, koji<br /> moze da ima vise redova teksta...');
			}
		}).svg('get');

		$(svg.root()).on('mouseover', function(evt) {
			//console.log('root.mouseover: evt.target = ');
			//console.log(evt.target);
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			//var $target = $(evt.target);
			//if (!($target.hasClass('hint-area') || $target.hasParent('.hint-area')))
			{
				//self.hideGuides('#' + id);
				provoz.hideHint();
			}
			return false;
		});
	});

	/*$('body').off('dblclick').on('dblclick', function(evt) {
		evt.stopPropagation();
		window.alert('dbl click');
		return false;
	});*/
});
