function Car()
{
	this.depopulate();
}

Car.prototype.assign = function(car)
{
	this.populate(
		car.sponsored, car.images, car.thumb,
		car.year, car.maker, car.model, car.price,
		car.seller.type, car.seller.company, car.seller.address.street, car.seller.address.city, car.seller.address.distance, car.seller.phone,
		car.used, car.mileage, car.fueltype, car.gear, car.body, car.doors, car.seats, car.color, car.registration, car.notes,
		car.features.volume, car.features.power, car.features.drive, car.features.spending,car.features.emissionclass,
		car.props,
		car.aboveBelow, car.eval, car.evalDesc,
		car.equipment.exterior, car.equipment.interior,
		car.equipment.drivingSafety, car.equipment.vehicleSafety,
		car.comment,
		car.crashed
	);
}

Car.prototype.populate = function(
		sponsored, images, thumb,
		year, maker, model, price,
		sellertype, company, street, city, distance, phone,
		used, mileage, fueltype, gear, body, doors, seats, color, registration, notes,
		volume, power, drive, spending, emissionclass,
		props,
		aboveBelow, eval, evalDesc,
		exterior, interior,
		drivingSafety, vehicleSafety,
		comment,
		crashed
	)
{
	this.depopulate();
	
	this.sponsored = sponsored;
	this.images = deepCopy(images);
	this.thumb = thumb;
	
	this.year = year;
	this.maker = maker;
	this.model = model;
	this.price = price;
	
	this.seller.type = sellertype;
	this.seller.company = company;
	this.seller.address.street = street;
	this.seller.address.city = city;
	this.seller.address.distance = distance;
	this.seller.phone = deepCopy(phone);
	
	this.used = used;
	this.mileage = mileage;
	this.fueltype = fueltype;
	this.gear = gear;
	this.body = body;
	this.doors = doors;
	this.seats = seats;
	this.color = color;
	this.registration = registration;
	this.notes = deepCopy(notes);

	this.features.volume = volume;
	this.features.power = power;
	this.features.drive = drive;
	this.features.spending = spending;
	this.features.emissionclass = emissionclass;
	
	this.props = deepCopy(props);
	
	this.aboveBelow = aboveBelow;
	this.eval = eval;
	this.evalDesc = evalDesc;
	
	this.equipment.exterior = deepCopy(exterior);
	this.equipment.interior = deepCopy(interior);

	this.equipment.drivingSafety = deepCopy(drivingSafety);
	this.equipment.vehicleSafety = deepCopy(vehicleSafety);
	this.comment = comment;
	this.crashed = crashed;
}

Car.prototype.depopulate = function()
{
	if (typeof this.seller !== 'undefined')
	{
		if (typeof this.seller.phone !== 'undefined'
			&& this.seller.phone.length > 0)
		{
			delete this.seller.phone;
		}
		if (typeof this.seller.address !== 'undefined')
		{
			delete this.seller.address;
		}
		delete this.seller;
	}
	if (typeof this.notes !== 'undefined'
		&& this.notes.length > 0)
	{
		delete this.notes;
	}
	if (typeof this.features !== 'undefined')
	{
		delete this.features;
	}
	if (typeof this.props !== 'undefined'
		&& this.props.length > 0)
	{
		delete this.props;
	}
	if (typeof this.equipment !== 'undefined')
	{
		if (typeof this.equipment.exterior !== 'undefined'
			&& this.equipment.exterior.length > 0)
		{
			delete this.equipment.exterior;
		}
		if (typeof this.equipment.interior !== 'undefined'
			&& this.equipment.interior.length > 0)
		{
			delete this.equipment.interior;
		}
		if (typeof this.equipment.drivingSafety !== 'undefined'
			&& this.equipment.drivingSafety.length > 0)
		{
			delete this.equipment.drivingSafety;
		}
		if (typeof this.equipment.vehicleSafety !== 'undefined'
			&& this.equipment.vehicleSafety.length > 0)
		{
			delete this.equipment.vehicleSafety;
		}
		delete this.equipment;
	}

	this.sponsored = undefined;
	this.images = undefined;
	this.thumb = undefined;
	
	this.year = undefined;
	this.maker = undefined;
	this.model = undefined;
	this.price = undefined;
	
	this.seller = {};
	this.seller.type = undefined;
	this.seller.company = undefined;
	this.seller.address = {};
	this.seller.address.street = undefined;
	this.seller.address.city = undefined;
	this.seller.address.distance = undefined;
	this.seller.phone = [];
	
	this.used = undefined;
	this.mileage = undefined;
	this.fueltype = undefined;
	this.gear = undefined;
	this.body = undefined;
	this.doors = undefined;
	this.seats = undefined;
	this.color = undefined;
	this.registration = undefined;
	this.notes = [];

	this.features = {};
	this.features.volume = undefined;
	this.features.power = undefined;
	this.features.drive = undefined;
	this.features.spending = undefined;
	this.features.emissionclass = undefined;
	
	this.props = [];
	
	this.aboveBelow = undefined;
	this.eval = undefined;
	this.evalDesc = undefined;
	
	this.equipment = {};
	this.equipment.exterior = [];
	this.equipment.interior = [];
	this.equipment.drivingSafety = [];
	this.equipment.vehicleSafety = [];
	this.comment = undefined;
	this.crashed = undefined;
}

function OglasApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.formHideAnimationDelay = 0;
	
	this.popupEvalAmount = 14500;
	
	this.imagesPopupMaxImages = 18;
	this.imagesPopupColumns = 6;
	this.imagesPopupHorizontalSlack = 10;
	this.imagesPopupVerticalSlack = 10;
	
	//this.driverTestYear = { min: 1950, max: 2013 };
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.imagesPopupImageWidth = 96 + 10;
	this.imagesPopupImageHeight = 71 + 10;
	this.eventsInitFirstTime = true;
	
	this.carData = new Car();
}

OglasApp.prototype.initCarData = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	self.carData.depopulate();
	self.carData.images = [];
	self.carData.images.push('img/car/v1.jpg');
	self.carData.images.push('img/car/v2.jpg');
	self.carData.images.push('img/car/v3.jpg');
	self.carData.images.push('img/car/v4.jpg');
	self.carData.images.push('img/car/v5.jpg');
	self.carData.images.push('img/car/v6.jpg');
	self.carData.images.push('img/car/v7.jpg');
	self.carData.images.push('img/car/v8.jpg');
	self.carData.images.push('img/car/v9.jpg');
	self.carData.images.push('img/car/v10.jpg');
}

OglasApp.prototype.openPopup = function(id, onBefore, self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	
	if (typeof onBefore !== 'undefined')
	{
		onBefore(self);
	}
	
	$(id)
		.addClass('active')
		.prev().addClass('active');
}

OglasApp.prototype.closePopup = function(id, self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	$(id)
		.removeClass('active')
		.prev().removeClass('active');
}

OglasApp.prototype.markFields = function(id, fieldList, message, wrapper)
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

OglasApp.prototype.unmarkFields = function(id, fieldList, indexList, wrapper)
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

OglasApp.prototype.addError = function(id, name, message)
{
	$(id + ' .error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

OglasApp.prototype.clearErrorDescriptions = function(id)
{
	console.log('clearErrorDescriptions()');
	$(id + ' .error-desc')
		.empty()
		.addClass('inactive');
}

OglasApp.prototype.populateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var html = '';
	var $elem;
	
	/*if (filterName == 'participation')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.creditData[filterName+'.display'] + '" selected="selected">'
			+ this.creditData[filterName+'.display'] + '</option>';
		for (part in this.creditData[filterName])
		{
			html += '<option value="' + filterParam.creditData[filterName][part] + '">'
				+ formatPercentage(filterParam.creditData[filterName][part]) + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'interestRate')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.creditData[filterName+'.display'] + '" selected="selected">'
			+ this.creditData[filterName+'.display'] + '</option>';
		for (interest in this.creditData[filterName])
		{
			html += '<option value="' + filterParam.creditData[filterName][interest] + '">'
				+ formatPercentage(filterParam.creditData[filterName][interest]) + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}
	else if (filterName == 'paymentPeriod')
	{
		$elem = $('select#' + filterId);
		html += '<option value="' + filterParam.creditData[filterName+'.display'] + '" selected="selected">'
			+ this.creditData[filterName+'.display'] + '</option>';
		for (period in this.creditData[filterName])
		{
			html += '<option value="' + filterParam.creditData[filterName][period] + '">'
				+ formatMonths(filterParam.creditData[filterName][period]) + '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		//$elem.msDropDown();
		initEAutoCustomDropdown($elem);
	}*/
}

OglasApp.prototype.depopulateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var html = '';
	var $elem;
	
	/*if (filterName == 'model'
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
	}*/
}

OglasApp.prototype.populateField = function(evt)
{
	var fieldName = evt.data.fieldName;
	var fieldId = evt.data.fieldId;
	var fieldParam = evt.data.fieldParam;
	var html = '';
	var $elem;
	
	if (fieldName == 'participation')
	{
		$elem = $('select#' + fieldId);
		html += '<option value="" selected="selected">'
			+ fieldParam.creditData[fieldName+'.display']
			+ '</option>';
		for (var part in fieldParam.creditData[fieldName])
		{
			html += '<option value="' + fieldParam.creditData[fieldName][part]
				+ '">' + formatPercentage(fieldParam.creditData[fieldName][part])
				+ '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
	else if (fieldName == 'interestRate')
	{
		$elem = $('select#' + fieldId);
		html += '<option value="" selected="selected">'
			+ fieldParam.creditData[fieldName+'.display']
			+ '</option>';
		for (var part in fieldParam.creditData[fieldName])
		{
			html += '<option value="' + fieldParam.creditData[fieldName][part]
				+ '">' + formatPercentage(fieldParam.creditData[fieldName][part])
				+ '</option>';
		}
		var dd = $elem.msDropDown().data('dd');
		dd.destroy();
		$elem.empty().html(html);
		initEAutoCustomDropdown($elem);
	}
}

OglasApp.prototype.initCreditData = function()
{
	this.creditData = {
		'participation': buildArray(1, 30, 1),
		'participation.display': 'Ucesce',
		'interestRate': buildArray(1, 10, 1),
		'interestRate.display': 'Kamata',
		'paymentPeriod': buildArray(6, 48, 6),
		'paymentPeriod.display': 'Rok otplate'
	};
}

OglasApp.prototype.createRightListItems = function(thisParam)
{
	var data = [];
	for (var i = 0; i < thisParam.rightListMaxEntries; i++)
	{
		var newItem = new RightListItem(i + 1);
		data.push(newItem);
	}
	return data;
}

OglasApp.prototype.getItem = function(index)
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

OglasApp.prototype.initRightList = function()
{
	$('#right-list').empty().advlist({
		dataCreate: this.createRightListItems,
		dataCreateParam: this,
		dataFormat: this.formatRightListItem,
		dataFormatParam: this,
		onClick: function(obj, index, target) {
			if ($(target).hasClass('click-area'))
			{
				$(target).parent().find('.details-car').trigger('click');
			}
		},
		onMouseOver: function(obj, index, target) {
			if ($(target).hasClass('click-area'))
			{
				$(target).parent().find('.details-car').addClass('hovered');
			}
		},
		onMouseOut: function(obj, index, target) {
			if ($(target).hasClass('click-area'))
			{
				$(target).parent().find('.details-car').removeClass('hovered');
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
}

OglasApp.prototype.compareItemsByPeriodicPaymentAmount = function(i1, i2)
{
	var p1 = i1.getPeriodicPaymentAmount(), p2 = i2.getPeriodicPaymentAmount();
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
	else return (p1 < p2 ? -1 : (p1 > p2 ? 1 : 0));
}

OglasApp.prototype.updateList = function()
{
	//console.log('updateList() called');
	
	// Sort
	var list = $('#right-list').data('advlist').getData();
	list.sort(this.compareItemsByPeriodicPaymentAmount);
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

OglasApp.prototype.removeItem = function(index)
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
				_this.updateRightListMinMaxItemAmount(data[i].getPeriodicPaymentAmount());
			}
		}
		_this.updateList();
		$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
	});
}

OglasApp.prototype.populatePopup = function(item)
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
	
	$('.popup .monthly-payment').text(formatCurrency(item.getPeriodicPaymentAmount()));
	$('.popup .total-base-amount').text(formatCurrency(item.creditAmount));
	$('.popup .total-interest').text(formatCurrency(item.getTotalInterest()));
	$('.popup .total').text(formatCurrency(item.getTotal()));
	
	/*$('.popup .insurance').text(formatCurrency(item.insurance));
	$('.popup .usagetax').text(formatCurrency(item.usagetax));
	$('.popup .tax').text(formatCurrency(item.tax));
	$('.popup .regsticker').text(formatCurrency(item.regsticker));
	$('.popup .checkup').text(formatCurrency(item.checkup));
	$('.popup .plates').text(formatCurrency(item.plates));
	$('.popup .license').text(formatCurrency(item.license));
	$('.popup .regcost').text(formatCurrency(item.getRegistrationCost()));*/
	
	/*$('.popup .green .text-inner-amount').text(formatCurrency(item.fuel));
	$('.popup .orange .text-inner-amount').text(formatCurrency(item.insurance));
	$('.popup .red .text-inner-amount').text(formatCurrency(item.maintenance));
	$('.popup .blue .text-inner-amount').text(formatCurrency(item.getFiveYear()));*/
}

OglasApp.prototype.initFields = function()
{
	var self = this;
	
	/*this.populateField({
		data: {
			fieldName: 'driverTestYear',
			fieldId: 'owner-drivertestyear',
			fieldParam: self
		}
	});*/
}

OglasApp.prototype.pricePopupUpdateDifference = function(evt, value, self)
{
	console.log('pricePopupUpdateDifference()');
	console.log('value = ' + value);
	if (typeof self === 'undefined')
	{
		self = this;
	}
	
	var price = self.popupPrice;
	if (typeof self.popupPrice === 'undefined')
	{
		price = 0;
	}
	var eval = self.popupEvalAmount;
	if (typeof self.popupEvalAmount === 'undefined')
	{
		eval = 0;
	}
	
	var diff = undefined;
	if (typeof self.popupPrice !== 'undefined'
		&& typeof self.popupEvalAmount !== 'undefined')
	{
		diff = price - eval;
	}
	
	$('#price-popup-eval-amount').html(formatCurrency(eval));
	$('#price-popup-eval-diff-image').html(self.evalImage(self.evalId(self.popupPrice, eval)));
	$('#price-popup-eval-diff-amount').html(typeof diff === 'undefined' ? '&nbsp;' : formatCurrency(diff));
	$('#price-popup-eval-diff-text').html(self.evalText(self.evalId(self.popupPrice, eval), 'vrednost nije uneta'));	
}

OglasApp.prototype.populateImagesPopup = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	
	var $imgdiv = $('#images-popup-images');
	var html = '';
	
	$imgdiv.css({
		width: (self.imagesPopupColumns * (2 // 2 borders
				+ self.imagesPopupImageWidth)
			+ self.imagesPopupHorizontalSlack) + 'px',
		height: (self.imagesPopupMaxImages / self.imagesPopupColumns * (2 // 2 borders
				+ self.imagesPopupImageHeight)
			+ self.imagesPopupVerticalSlack) + 'px'
	});
	
	$imgdiv.empty();
	var i;
	for (i = 0; i < self.carData.images.length; i++)
	{
		html += '<div class="images-popup-container" id="images-popup-place-'
			+ zeroes(i+1) + '">'
			+ '<img src="' + self.carData.images[i] + '" />'
			+ '<div class="image-remove-button btn gray"><i class="icon-remove"></i></div>'
			+ '</div>';
	}
	for (; i < self.imagesPopupMaxImages; i++)
	{
		html += '<div class="images-popup-container empty" id="images-popup-place-'
			+ zeroes(i+1) + '">'
			+ '<img src="img/camera.png" />'
			+ '</div>';
	}
	$imgdiv.html(html);
	$imgdiv.sortable({
		items: '.images-popup-container:not(.empty)',
		placeholder: 'images-popup-placeholder',
		tolerance: 'pointer'
	});
	
	$('.image-remove-button').off('click').on('click', function(evt) {
		evt.stopPropagation();
		var $container = $(this).parent();
		$container
			.addClass('empty')
			.find('img').attr('src', 'img/camera.png')
			;
		$(this).remove();
		$container = $container.detach();
		$('#images-popup-images').children().filter('.empty:first').before($container);
		return false;
	});
	/*$imgdiv.droppable({
		drop: function(evt, ui) {
			
		}
	});
	$imgdiv.find('.images-popup-placeholder').draggable();*/
}

OglasApp.prototype.buildSlider = function(id, min, current, max, onChanging, self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	$(id)
		.slider({
			min: min,
			max: max,
			value: typeof current === 'undefined' ? (max-min)/2 : current,
			step: 1,
			animate: true
		})
		.on('slidechange', function(evt, ui) {
			//console.log('slidechange: evt = ');
			//console.log(evt);
			//console.log('ui = ');
			//console.log(ui);
			if (typeof onChanging !== 'undefined')
			{
				onChanging(evt, ui.value, self);
			}
		})
		.on('slide', function(evt, ui) {
			//console.log('slide: evt = ');
			//console.log(evt);
			//console.log('ui = ');
			//console.log(ui);
			if (typeof onChanging !== 'undefined')
			{
				onChanging(evt, ui.value, self);
			}
		})
		/*.on('valuesChanging', function(evt, data) {
			console.log('valuesChanging: data = ');
			console.log(data);
			if (typeof onChanging !== 'undefined')
			{
				onChanging(evt, data, self);
			}
		})
		.off('click').on('click', function(evt) {
			var values = $(this).rangeSlider('values');
			var data = {
				values: values
			};
			console.log('click: data = ');
			console.log(data);
			if (typeof onChanging !== 'undefined')
			{
				onChanging(evt, data, self);
			}
		})
		.on('valuesChanged', function(evt, data) {
			console.log('valuesChanged: data = ');
			console.log(data);
			if (typeof onChanging !== 'undefined')
			{
				onChanging(evt, data, self);
			}
		});*/
}

OglasApp.prototype.updatePrice = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	var eval = undefined;
	if (typeof self.popupEvalAmount !== 'undefined')
	{
		eval = self.popupEvalAmount;
	}
	var diff = undefined;
	if (typeof self.popupPrice !== 'undefined'
		&& typeof self.popupEvalAmount !== 'undefined')
	{
		diff = self.popupPrice - self.popupEvalAmount;
	}
	
	self.carData.price = self.popupPrice;
	
	$('#right-detail-price').html((typeof self.popupPrice === 'undefined' || self.popupPrice.length == 0)
		? '' : formatCurrency(self.popupPrice, true, false, 2, ',', '&thinsp;'));
	
	$('#right-detail-eval-price-image').html(self.evalImage(self.evalId(self.popupPrice, eval)));
	$('#right-detail-eval-price-amount').html(typeof diff === 'undefined' ? '&nbsp;' : formatCurrency(diff));
	$('#right-detail-eval-desc').html(self.evalText(self.evalId(self.popupPrice, eval), 'vrednost nije uneta'));	
}

OglasApp.prototype.updateImageOrder = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	var $imgdiv = $('#images-popup-images');
	var $images = $imgdiv.children().filter(':not(.empty)');
	
	//console.log('updateImageOrder: $images = ');
	//console.log($images);
	
	if ($images.length == 0)
	{
		delete self.carData.images;
		self.carData.images = [];
		return;
	}

	var tempList = [];
	for (var i = 0; i < $images.length; i++)
	{
		//console.log('updateImageOrder: $images.eq(' + i + ') = ');
		//console.log($images.eq(i));
		var j = parseInt($images.eq(i).prop('id').substring('images-popup-place-'.length))-1;
		//console.log('updateImageOrder: j = ' + j);
		tempList.push(deepCopy(self.carData.images[j]));
	}
	//console.log('updateImageOrder: tempList = ');
	//console.log(tempList);
	delete self.carData.images;
	self.carData.images = deepCopy(tempList);
	delete tempList;
}

OglasApp.prototype.updatePaymentPopupText = function()
{
	//console.log('elems = ');
	//console.log($('[id^=payment-popup-option-]:checked'));
	//console.log('id = ');
	//console.log($('[id^=payment-popup-option-]:checked').prop('id'));
	var id = parseInt($('[id^=payment-popup-option-]:checked').prop('id')
		.substring('payment-popup-option-'.length));
	//console.log('updatePaymentPopupText: id = ' + id);
	var amount = 0;
	switch (id)
	{
		case 1:
			amount = 200;
			break;
		case 2:
			amount = 400;
			break;
		case 3:
			amount = 800;
			break;
		default:
			amount = 2000;
			break;
	}
	$('#payment-popup-amount').html(formatCurrency(amount, true, true, 2, ',', '&thinsp;', 'din'));
}

OglasApp.prototype.initEvents = function(self)
{
	//console.log('initEvents() called');
	if (typeof self === 'undefined')
	{
		self = this;
	}
	
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
	$('#button-add-credit')//.removeClass('disabled')
		.off('click').on('click', function(evt) {
		evt.stopPropagation();
		
		self.clearErrorDescriptions('#credits-page');
		
		var allDefined = true;
		
		//console.log('self.selectedTypeIndex = ' + self.selectedTypeIndex);
		if (typeof self.creditAmount === 'undefined'
			|| self.creditAmount == '')
		{
			self.markFields('#credits-page', [{
				id: '#filter-amount',
				name: 'amount'
			}]);
			allDefined = false;
		}
		if (typeof self.selectedParticipationIndex === 'undefined'
			|| self.selectedParticipationIndex == -1)
		{
			self.markFields('#credits-page', [{
				id: '#filter-participation',
				name: 'participation'
			}]);
			allDefined = false;
		}
		if (typeof self.selectedInterestRateIndex === 'undefined'
			|| self.selectedInterestRateIndex == -1)
		{
			self.markFields('#credits-page', [{
				id: '#filter-interest',
				name: 'interest'
			}]);
			allDefined = false;
		}
		if (typeof self.selectedPaymentPeriodIndex === 'undefined'
			|| self.selectedPaymentPeriodIndex == -1)
		{
			self.markFields('#credits-page', [{
				id: '#filter-paymentperiod',
				name: 'paymentperiod'
			}]);
			allDefined = false;
		}
		
		if (!allDefined)
		{
			self.addError('#credits-page', 'enter-fields', 'Unesite obavezna polja.');
			return false;
		}
		
		//creditAmount, participation, interestRate, paymentPeriod
		if (self.addItem(
			self.creditAmount,
			self.creditData['participation'][self.selectedParticipationIndex],
			self.creditData['interestRate'][self.selectedInterestRateIndex],
			self.creditData['paymentPeriod'][self.selectedPaymentPeriodIndex]
		))
		{
			// Reset all filters
			self.resetFilters();
		}
		return false;
	});
	
	$('.popup-background').off('click').on('click', function() {
		var $popup = $(this).siblings('.popup');
		console.log('backgroundClick: popup now = ');
		console.log($popup);
		$popup
			.prevAll('.popup-background').removeClass('active').end()
			.removeClass('active');
		$popup = $popup.siblings('.popup2');
		console.log('backgroundClick: after: popup now = ');
		console.log($popup);
		$popup.removeClass('active');
	});
	$('.popup .btn.close').off('click').on('click', function() {
		var $popup = $(this).parents('.popup');
		$popup
			.prev().removeClass('active').end()
			.removeClass('active');
		return false;
	});
	$('.popup2 .btn.close').off('click').on('click', function() {
		var $popup = $(this).parents('.popup2');
		$popup
			.prevAll('.popup-background').removeClass('active').end()
			.removeClass('active');
		return false;
	});
	
	$('#popup-next').off('click').on('click', function(evt) {
		evt.stopPropagation();
		var $popup = $(this).parents('.popup');
		var $bg = $popup.prevAll('.popup-background');
		$bg.removeClass('active');
		$bg.addClass('active');
		$popup.removeClass('active');
		$popup.siblings('.popup2').addClass('active');
		return false;
	});
	$('#popup-send').off('click').on('click', function(evt) {
		evt.stopPropagation();
		var $popup = $(this).parents('.popup2');
		var $bg = $popup.prevAll('.popup-background');
		$bg.removeClass('active');
		$popup.removeClass('active');
		return false;
	});
	
	if (self.eventsInitFirstTime)
	{
		/*var introHeight = $('#intro').height();
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
		}, closeClickHandler);*/
	}
	
	$('.close.btn').off('click').on('click', $.proxy(function(evt) {
		var $target = $(evt.target);
		console.log('.close.btn.click()');
		evt.stopPropagation();
		this.closePopup('#' + $target.parents('.popup').prop('id'));
		$target = null;
		return false;
	}, self));
	$('.popup-background').off('click').on('click', $.proxy(function(evt) {
		var $target = $(evt.target);
		console.log('.popup-background.click()');
		evt.stopPropagation();
		$target.next().find('.close.btn').trigger('click');
		console.log('next id = ' + $target.next().prop('id'));
		/*if ($(this).next().prop('id') == 'price-popup')
		{
			self.updatePrice();
		}*/
		$target = null;
		return false;
	}, self));
	$('#price-enter-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#price-popup', $.proxy(function(evt) {
			this.buildSlider('#price-popup-price-slider', 0, this.carData.price, 40000, $.proxy(function(evt, value) {
				//console.log('changing! value = ' + value);
				$('#price-popup-price')
					.val(value).change().blur()
					;
				//self.pricePopupUpdateDifference(evt, value, self);
			}, self));
			this.pricePopupUpdateDifference(evt, undefined);
		}, this));
		return false;
	}, self));
	$('#price-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		var $target = $('#price-popup-next-button');
		evt.stopPropagation();
		$target.parents('.popup').find('.close.btn').trigger('click');
		this.updatePrice();
		$target = null;
		return false;
	}, self));
	$('#right-detail-main-picture-add-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#images-popup', $.proxy(function(evt) {
			//self.pricePopupUpdateDifference(evt, undefined, self);
			this.populateImagesPopup();
		}, this));
		return false;
	}, self));
	$('#images-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('#images-popup-next-button').parents('.popup').find('.close.btn').trigger('click');
		this.updateImageOrder();
		return false;
	}, self));
	$('#props-enter-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#props-popup', function(evt) {
			//self.pricePopupUpdateDifference(evt, undefined, self);
		});
		return false;
	}, self));
	$('#props-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('#props-popup-next-button').parents('.popup').find('.close.btn').trigger('click');
		return false;
	}, self));
	$('#equipment-enter-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#equipment-popup', function(evt) {
			//self.pricePopupUpdateDifference(evt, undefined, self);
		});
		return false;
	}, self));
	$('#equipment-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('#equipment-popup-next-button').parents('.popup').find('.close.btn').trigger('click');
		return false;
	}, self));
	$('#comment-enter-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#comment-popup', function(evt) {
			//self.pricePopupUpdateDifference(evt, undefined, self);
		});
		return false;
	}, self));
	$('#comment-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('#comment-popup-next-button').parents('.popup').find('.close.btn').trigger('click');
		return false;
	}, self));
	$('#payment-popup-next-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('#payment-popup-next-button').parents('.popup').find('.close.btn').trigger('click');
		return false;
	}, self));
	
	$('#info-background').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		clearTimeout($.data(this, 'infoFadeTimeout'));
		this.fadeOutInfoWindow();
		return false;
	}, self));
	$('#info').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		clearTimeout($.data(this, 'infoFadeTimeout'));
		this.fadeOutInfoWindow();
		return false;
	}, self));
	
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
		
	/*$('#credits-tab').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#credits-tab').parent().addClass('active');
		self.slideIn('#credits-page', '.tab-content .tab-pane.active');
		return false;
	});
	$('#leasing-tab').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#leasing-tab').parent().addClass('active');
		self.slideIn('#leasing-page', '.tab-content .tab-pane.active');
		return false;
	});*/
	
	$('.nav-tabs > li > a').off('click').on('click', $.proxy(function(evt) {
		var $target = $(evt.target)[0].nodeName.toLowerCase() == 'a' ? $(evt.target) : $(evt.target).closest('a');
		evt.stopPropagation();
		$target.parent().siblings().removeClass('active');
		$target.parent().addClass('active');
		this.slideIn($target.attr('href'), '.tab-content .tab-pane.active');
		$target = null;
		return false;
	}, self));
	
	$('.nav-tabs li .click-area').off('click').on('click', $.proxy(function(evt) {
		var $target = $(evt.target).hasClass('click-area') ? $(evt.target) : $(evt.target).closest('.click-area');
		evt.stopPropagation();
		evt.stopImmediatePropagation();
		$target.parents('li').find('a').trigger('click');
		$target = null;
		return false;
	}, self));
	/*$('.circle').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$(this).parents('li').find('a').trigger('click');
		return false;
	});*/
	
	$('#btn-next-1').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-2').trigger('click');
		return false;
	});
	$('#btn-next-2').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-3').trigger('click');
		return false;
	});
	$('#btn-next-3').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-4').trigger('click');
		return false;
	});
	$('#btn-next-4').off('click').on('click', function(evt) {
		evt.stopPropagation();
		return false;
	});
	$('#link-prev-2').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-1').trigger('click');
		return false;
	});
	$('#link-prev-3').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-2').trigger('click');
		return false;
	});
	$('#link-prev-4').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#tab-3').trigger('click');
		return false;
	});
	$('#tab-2').on('click', $.proxy(function() {
		//initCarousel();
		this.customInitCarousel();
	}, self));
	$('#page-4-account-link').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		this.openPopup('#payment-popup', $.proxy(function() {
			$('input:radio[id^=payment-popup-option-]').off('change').on('change', $.proxy(function() {
				this.updatePaymentPopupText();
			}, this));
		}, this));
		return false;
	}, self));
	
	$('#price-popup-price')
	.data('filterFunction', formatCurrency)
	.data('variableName', 'popupPrice')
	.data('fieldName', 'popupPrice')
	.data('changeCallback', function(evt, self){
		console.log('changeCallback: self = ');
		console.log(self);
		self.pricePopupUpdateDifference(evt, $('#price-popup-price').val(), self);
	});
	
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
	$('.popup input[type="text"].formatted').each($.proxy(function(idx, elem){
		var $elem = $(elem);
		$elem
			.on('change', $.proxy(function(evt){	
				var $elem = $(elem);
				console.log('formatted change()');
				console.log('evt =');
				console.log(evt);
				this[$elem.data('variableName')] = $elem.val();
				/*self.unmarkFields('#leasing-page', [{
					id: '#' + $(this).prop('id'),
					name: $(this).data('fieldName')
				}], [0], '.wrapper');*/
				$elem.data('inputvalue', $elem.val());
				if (typeof $elem.data('changeCallback') !== 'undefined')
				{
					$elem.data('changeCallback')(evt, this);
				}
				$elem = null;
			}, this))
			.on('focusin', $.proxy(function(){
				var $elem = $(elem);
				$elem.val('');
				$elem.data('inputvalue', '');
				this[$elem.data('variableName')] = undefined;
				$elem = null;
			}, this))
			.on('focusout', $.proxy(function(){
				var $elem = $(elem);
				var fun = $elem.data('filterFunction');
				if ($elem.val().length > 0)
				{
					var val = $elem.data('inputvalue');
					this[$elem.data('variableName')] = val;
					$elem.val(fun(val, true, false, 2, '', ''));
				}
				else
				{
					$elem.data('inputvalue', '');
					this[$elem.data('variableName')] = undefined;
				}
				$elem = null;
			}, this));
	}, self));	
	self = null;
}

OglasApp.prototype.customInitCarousel = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	$('.right-detail-nav-thumbs').carouFredSel({
		onCreate: function(data){
			console.log('thumbs onCreate: data = ');
			console.log(data);
		},
		auto: false,
		//width: 384,
		//height: '54px',
		width: null,
		height: null,
		items: {
			width: 96,
			height: 71,
			visible: 4,
			start: 0
		}
	}, {
		debug: true
	});
	$('.right-detail-nav-thumbs img').unbind('click').on('click', function(){
		var id = $(this).attr('id');
		/*var newid = 'p' + $(this).attr('id').substring(2);
		console.log('navigating from ' + id + ' to ' + newid);*/
		$('.right-detail-main').trigger('slideTo',
			[
				$('.right-detail-main img[id=p'
					+ id.substring(2)+']').parent(),
				0
			]
		);
		/*$('.right-detail-nav-thumbs').trigger(
			'slideTo',
			[
				$('.right-detail-nav-thumbs img[id='
					+ id + ']'),
				-1
			]
		);*/
	});
	$('.right-detail-nav-next')
		.off('click').on('click', function(){
		console.log('nav next click');
		//$('.right-detail-main').trigger('next', {items: 1});
		$('.right-detail-nav-thumbs').trigger('next', {items: 1});
	});
	$('.right-detail-nav-prev')
		.off('click').on('click', function(){
		console.log('nav prev click');
		//$('.right-detail-main').trigger('prev', {items: 1});
		$('.right-detail-nav-thumbs').trigger('prev', {items: 1});
	});
	$('.right-detail-main').carouFredSel({
		width: null,
		height: 357,
		items: {
			width: 480,
			height: 357,
			visible: 1,
			start: 0
		},
		auto: false,
		//responsive: true,
		/*prev: ".right-detail-nav-prev",
		next: ".right-detail-nav-next",*/
		onCreate: function(data){
			console.log('main onCreate: data = ');
			console.log(data);
		},
		scroll: {
			onBefore: function(data) {
				//window.alert('scroll.onBefore()');
				console.log('onBefore()');
				console.log('data.items.visible = ');
				console.log(data.items.visible[0].children);
				console.log('id = ' + $(data.items.visible[0].children[0]).attr('id'));
				$('.right-detail-nav-thumbs').trigger(
					'slideTo',
					[
						(
							(data.items.visible[0].children.length > 0)
							?
								$('.right-detail-nav-thumbs img[id=th'
									+$(data.items.visible[0].children[0]).attr('id').substring(2)+']').parent()
							:
								$('.right-detail-nav-thumbs img[id=th'
									+$(data.items.visible[0]).attr('id').substring(2)+']').parent()
						),
						1
					]
				);
			}
		}
	}, {
		debug: true
	});
	$('.right-detail-main-prev').off('click').on('click', function() {
		console.log('main prev click');
		$('.right-detail-main').trigger('prev', {items: 1});
		//var $item = $('.right-detail-nav-thumbs img[id=th'
		//	+ $('.right-detail-main img').eq(0).attr('id').substring(1) + ']');
		//console.log('sliding prev to: ');
		//console.log($item);
		//$('.right-detail-nav-thumbs').trigger('slideTo', [$item, 'prev']);
	});
	$('.right-detail-main-next').off('click').on('click', function() {
		console.log('main next click');
		$('.right-detail-main').trigger('next', {items: 1});
		//var $item = $('.right-detail-nav-thumbs img[id=th'
		//	+ $('.right-detail-main img').eq(0).attr('id').substring(1) + ']');
		//console.log('sliding next to: ');
		//console.log($item);
		//$('.right-detail-nav-thumbs').trigger('slideTo', [$item, 'next']);
	});
}

OglasApp.prototype.resetFilters = function()
{
	this.creditAmount = '';
	$('#filter-amount').val('');
	this.selectedParticipationIndex = -1;
	$('#filter-participation').msDropDown().data('dd').set('selectedIndex', 0);
	this.selectedInterestRateIndex = -1;
	$('#filter-interest').msDropDown().data('dd').set('selectedIndex', 0);
	this.selectedPaymentPeriodIndex = -1;
	$('#filter-paymentperiod').msDropDown().data('dd').set('selectedIndex', 0);
}

OglasApp.prototype.initFilterEvents = function()
{
	//this.selectedTypeIndex = $('select#filter-type').msDropDown().data('dd').get('selectedIndex');
	var self = this;
	
	/*this.populateFilter({
	});*/

	this.populateFilter({
		data: {
			filterName: 'participation',
			filterId: 'filter-participation',
			filterParam: self
		}
	});
	this.populateFilter({
		data: {
			filterName: 'interestRate',
			filterId: 'filter-interest',
			filterParam: self
		}
	});
	this.populateFilter({
		data: {
			filterName: 'paymentPeriod',
			filterId: 'filter-paymentperiod',
			filterParam: self
		}
	});
	$('#filter-amount').off('change').on('change', function() {
		self.creditAmount = $(this).val();
		self.unmarkFields('#credits-page', [{
			id: '#filter-amount',
			name: 'amount'
		}], [0]);
	});
	$('#filter-participation').off('change').on('change', function() {
		self.selectedParticipationIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#credits-page', [{
			id: '#filter-participation',
			name: 'participation'
		}], [0]);
	});
	$('#filter-interest').off('change').on('change', function() {
		self.selectedInterestRateIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#credits-page', [{
			id: '#filter-interest',
			name: 'interest'
		}], [0]);
	});
	$('#filter-paymentperiod').off('change').on('change', function() {
		self.selectedPaymentPeriodIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#credits-page', [{
			id: '#filter-paymentperiod',
			name: 'paymentperiod'
		}], [0]);
	});
	
	/*this.populateFilter({
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
	$('#filter-degree').off('change').on('change', function() {
		self.selectedDegreeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#registration-page', [{
			id: '#filter-degree',
			name: 'degree'
		}], [0]);
	});

	$('#owner-type').off('change').on('change', function() {
		self.selectedOwnerTypeIndex = $(this).msDropDown().data('dd').get('selectedIndex')-1;
		self.unmarkFields('#kasko-page', [{
			id: '#owner-type',
			name: 'owner-type'
		}], [0], '.wrapper');
	});
	$('#owner-name').off('change').on('change', function() {
		self.ownerName = $(this).val();
		self.unmarkFields('#kasko-page', [{
			id: '#owner-name',
			name: 'owner-name'
		}], [0], '.wrapper');
	});	
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
	});*/

	$('#filter-amount')//.off('change')
	.data('filterFunction', formatCurrency)
	.data('variableName', 'creditAmount')
	.data('fieldName', 'amount');

	$('#user-sallary')
	.data('filterFunction', formatCurrency)
	.data('variableName', 'userSallary')
	.data('fieldName', 'userSallary');
	
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
	}
	/*$('#vehicle-type')//.off('change')
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
	});*/
	
	/*$('input[type="text"]').each(function(){
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
	});*/

	if (self.eventsInitFirstTime)
	{
		/*hideField('#owner-drivertestyear');
	
		hideField('#vehicle-body');
		hideField('#vehicle-doors');
		hideField('#vehicle-capacity');*/
	}
	self.eventsInitFirstTime = false;
}

OglasApp.prototype.initSubmodelCarousel = function()
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
			duration: 100,
			items: 1,
			onBefore: function() {
				$(this).addClass('moving');
			},
			onAfter: function() {
				var html = '';
				$(this).removeClass('moving')
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

OglasApp.prototype.slideIn = function(pageName, activePageName, callBack)
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

OglasApp.prototype.evalId = function(val1, val2)
{
	if (typeof val1 === 'undefined'
		|| typeof val2 === 'undefined')
	{
		return 0;
	}
	else
	{
		return val1 > val2 ? 1 : (val1 != val2 ? 2 : 3);
	}
}

OglasApp.prototype.evalClass = function(aboveBelow)
{
	switch (aboveBelow)
	{
		case 1:
			ret = 'above';
			break;
		case 2:
			ret = 'below';
			break;
		case 3:
			ret = 'equal';
			break;
		default:
			ret = '';//'<img src="img/nochangearrow.png" class="eval-arrow" />';
			break;
	}
	return ret;
}

OglasApp.prototype.evalImage = function(aboveBelow)
{
	switch (aboveBelow)
	{
		case 1:
			ret = '<img src="img/abovearrow.png" class="eval-arrow" />';
			break;
		case 2:
			ret = '<img src="img/belowarrow.png" class="eval-arrow" />';
			break;
		case 3:
			ret = '<img src="img/equalarrow.png" class="eval-arrow" />';
			break;
		default:
			ret = '';//'<img src="img/nochangearrow.png" class="eval-arrow" />';
			break;
	}
	return ret;
}

OglasApp.prototype.evalText = function(aboveBelow, defaultText)
{
	switch (aboveBelow)
	{
		case 1:
			ret = 'iznad ocekivane';
			break;
		case 2:
			ret = 'ispod ocekivane';
			break;
		case 3:
			ret = 'procena';
			break;
		default:
			if (typeof defaultText === 'undefined')
			{
				ret = 'nema procene';
			}
			else
			{
				ret = defaultText;
			}
			break;
	}
	return ret;
}

OglasApp.prototype.listToDetailTable = function(rowId, rowTitle, aList)
{
	var $row = $('#' + rowId);
	$row.empty();
	var $others = $('[id^=' + rowId + '-]:not([id*=-data-])');
	$others.remove();
	newHtml = '';
	if (rowTitle.length > 0)
	{
		newHtml += '<td class="right-detail-table-row-title" id="' + rowId + '">'
			+ rowTitle
			+ '</td>';
	}
	newHtml += '<td class="right-detail-table-row-data" id="' + rowId + '-data-000">'
		+ aList[0] + '</td>';
	$row.html(newHtml);
	newHtml = '';
	for (i = 1; i < aList.length; i++)
	{
		newHtml += '<tr id="' + rowId + '-' + zeroes(i) + '">';
		if (rowTitle.length > 0)
		{
			newHtml += '<td></td>';
		}
		newHtml += '<td class="right-detail-table-row-data" id="' + rowId + '-data-'
			+ zeroes(i) + '">' + aList[i] + '</td>'
			+ '</tr>';
	}
	$row.after(newHtml);
}

OglasApp.prototype.fillSampleData = function(self)
{
	if (typeof self === 'undefined')
	{
		self = this;
	}
	$('#right-detail-general-year').html(2008);
	$('#right-detail-general-mileage').html(formatDistance(125000));
	$('#right-detail-general-fueltype').html('Dizel');
	$('#right-detail-general-gear').html('Manuelni');
	$('#right-detail-general-body').html('Karavan');
	$('#right-detail-general-doors').html(5);
	$('#right-detail-general-seats').html(5);
	$('#right-detail-general-color').html('Metalik crna');
	$('#right-detail-general-registration').html('Registrovan do 20.2.2014.');
	$('#right-detail-general-notes').html('Servisna knjizica');
	
	$('#right-detail-features-volume').html(formatVolume(1900));
	$('#right-detail-features-power').html(formatPower(56));
	$('#right-detail-features-drive').html('Prednji');
	$('#right-detail-features-spending').html('12 l/100 km');
	$('#right-detail-features-emission-class').html('Euro 4');
	
	self.listToDetailTable(
		'right-detail-equipment-exterior',
		'Spoljasnjost:',
		[
		'Aluminijumske felne',
		'Krovni prozor',
		'Vucna kuka'
		],
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-interior',
		'Unutrasnjost:',
		[
		'Automatska klima',
		'Elektronsko podesavanje sedista'
		],
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-driving-safety',
		'Bezbednost voznje:',
		[
		'ABS',
		'ESP',
		'Airbag za vozaca i suvozaca',
		'Svetla za maglu'
		],
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-vehicle-safety',
		'Sigurnost vozila:',
		[
		'Kodiran kljuc',
		'Alarmni sistem',
		'Zeder'
		],
		self
	);
	
	self.updatePrice();
	
	$('#right-detail-seller-company').html('Verona Motors d.o.o.');
	$('#right-detail-seller-address-street').html('Dimitrija Tucovica 10/7');
	$('#right-detail-seller-address-city-distance').html('Beograd, 52 km');
	self.listToDetailTable(
		'right-detail-seller-phone',
		'',
		[
		'011/2712-134',
		'062/222-132'
		],
		self
	);
}

$(document).ready(function(){
	var oglas = new OglasApp();

	oglas.initCarData();
	oglas.initFields();

	$('.spaced-out input[type="text"].inline').each(function() {
		console.log('this.prev');
		console.log($(this).prev()[0]);
		console.log('this.prev.nodeName = ' + $(this).prev()[0].nodeName.toLowerCase());
		if ($(this).prev()[0].nodeName.toLowerCase() != 'label')
		{
			$(this)
				.wrap('<span class="wrapper">')
				.parent()
				.append('&nbsp;');
		}
		else
		{
			var $this = $(this);
			var $label = $this.prev();
			$label.detach();			
			$this
				.wrap('<span class="wrapper">')
				.parent()
				.append('&nbsp;');
			var $wrap = $this.parent();
			$wrap.prepend($label);
		}
	});
	$('.spaced-out .dd,.spaced-out input[type="checkbox"] + label.inline').each(function() {
		$(this)
			.wrap('<span class="wrapper">')
			.parent()
			.append('&nbsp;');
	});
	
	//oglas.initCreditData();
	oglas.initEvents();
	oglas.initFilterEvents();
	oglas.initRightList();
	oglas.customInitCarousel();
	oglas.initSubmodelCarousel();
	
	oglas.fillSampleData();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
});
