function RightListItem(number)
{
	this.number = number;
	this.creditAmount = undefined;
	this.participation = undefined;
	this.interestRate = undefined;
	this.paymentPeriod = undefined;
	this.empty = true;
}

RightListItem.prototype.toString = function()
{
	if (!this.empty)
	{
		return formatCurrency(this.creditAmount) + ', ucesce ' + formatPercentage(this.participation)
			+ ', kamata ' + formatPercentage(this.interestRate) + ', ' + formatMonths(this.paymentPeriod);
	}
	else
	{
		return 'Vozilo ' + this.number;
	}
}

RightListItem.prototype.assign = function(item)
{
	this.populate(item.creditAmount, item.participation, item.interestRate, item.paymentPeriod);
}

RightListItem.prototype.populate = function(creditAmount, participation, interestRate, paymentPeriod)
{
	this.creditAmount = creditAmount;
	this.participation = participation;
	this.interestRate = interestRate;
	this.paymentPeriod = paymentPeriod;
	this.empty = false;
}

RightListItem.prototype.depopulate = function()
{
	this.creditAmount = undefined;
	this.participation = undefined;
	this.interestRate = undefined;
	this.paymentPeriod = undefined;
	this.empty = true;
}

RightListItem.prototype.getPeriodicPaymentAmount = function()
{
	var P = this.creditAmount;
	var i = this.interestRate/100;
	var n = this.paymentPeriod;
	if (i == 0)
	{
		return P/n;
	}
	else
	{
		console.log('getPeriodicPaymentAmount: P = ' + P
			+ ', i = ' + i
			+ ', n = ' + n);
		return Math.abs(
			P * (i * Math.pow((1 + i), n)/(Math.pow((1 + i), n) - 1))
				- (P * i)/(1-Math.pow((1 + i), -n))
				- P * (i + i/(Math.pow((1 + i), n) - 1))
		);
	}
}

RightListItem.prototype.getTotalInterest = function()
{
	return Math.abs(this.creditAmount - this.getPeriodicPaymentAmount() * this.paymentPeriod);
}

RightListItem.prototype.getTotal = function()
{
	return parseFloat(this.creditAmount) + parseFloat(this.getTotalInterest());
}

/*RightListItem.prototype.setApp = function(app)
{
	this.app = app;
}*/

function KredeksApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.rightListMaxEntries = 5;
	this.infoBoxDelay = 3000;
	this.carListChangeHideDelay = 200;
	this.carListChangeShowDelay = 700;
	
	this.formHideAnimationDelay = 0;
	//this.driverTestYear = { min: 1950, max: 2013 };
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.lastPopulatedItem = -1;
	this.eventsInitFirstTime = true;
}

KredeksApp.prototype.updateRightListMinMaxItemAmount = function(amount)
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

KredeksApp.prototype.formatRightListItem = function(item, index, thisParam)
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
			//+ '<div class="right-list-item-image empty"><img src="img/kredeksemptyitem.png" /></div>'
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
		var periodicPayment = item.getPeriodicPaymentAmount();
		if (thisParam.rightListMaxItemAmount != 0
			&& (thisParam.rightListMaxItemAmount - thisParam.rightListMinItemAmount != 0))
		{
			percentage = (periodicPayment - thisParam.rightListMinItemAmount)
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
			+ 'img/kredekscaritem.png'
			//+ thisParam.creditData['type'][item.id.type].imagePath
			+ '" /></div>'*/
			+ '<div class="right-list-item-text">Mesecna rata = '
			+ formatCurrency(periodicPayment)
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

KredeksApp.prototype.activateInfoWindow = function()
{
	$('#info-background').css({ opacity: '0.75' }).addClass('active');
	$('#info').css({ opacity: '1.0' }).addClass('active');
}

KredeksApp.prototype.deactivateInfoWindow = function()
{
	$('#info-background').removeClass('active');
	$('#info').removeClass('error active');
}

KredeksApp.prototype.fadeOutInfoWindow = function(app)
{
	$('#info-background').animate({ opacity: '0.0' }, 200);
	$('#info').animate({ opacity: '0.0' }, 200, function(){
		app.deactivateInfoWindow();
	});
}

KredeksApp.prototype.openInfoWindow = function(message)
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

KredeksApp.prototype.markFields = function(id, fieldList, message, wrapper)
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

KredeksApp.prototype.unmarkFields = function(id, fieldList, indexList, wrapper)
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

KredeksApp.prototype.addError = function(id, name, message)
{
	$(id + ' .error-desc')
		.removeClass('inactive')
		.append('<span class="' + name + '">* '
			+ message
			+ '</span>');
}

KredeksApp.prototype.clearErrorDescriptions = function(id)
{
	console.log('clearErrorDescriptions()');
	$(id + ' .error-desc')
		.empty()
		.addClass('inactive');
}

KredeksApp.prototype.addItem = function(creditAmount, participation, interestRate, paymentPeriod)
{
	console.log('addItem: creditAmount = ' + creditAmount
		+ ', participation = ' + participation
		+ ', interestRate = ' + interestRate
		+ ', paymentPeriod = ' + paymentPeriod
	);
	/*console.log('this.lastPopulatedItem = ' + this.lastPopulatedItem);
	console.log('this.rightListMaxEntries-1 = ' + (this.rightListMaxEntries-1));*/
	var _this = this;
	
	var data = $('#right-list').data('advlist').getData();
	for (itemId in data)
	{
		console.log('comparing data[' + itemId + ']:');
		console.log(data[itemId]);
		//console.log('to id:');
		//console.log(id);
		if (!data[itemId].empty
			&& data[itemId].creditAmount == creditAmount
			&& data[itemId].participation == participation
			&& data[itemId].interestRate == interestRate
			&& data[itemId].paymentPeriod == paymentPeriod
			)
		{
			this.addError('#credits-page', 'credit-already-entered', 'Kredit je vec unet.');
			return false;
		}
	}
	
	if (this.lastPopulatedItem == this.rightListMaxEntries-1)
	{
		this.addError('#credits-page', 'list-full', 'Mozete uneti najvise 5 kredita.');
		return false;
	}
	
	var item = this.getItem(this.lastPopulatedItem + 1);
	if (typeof item !== 'undefined')
	{
		$('#right-list').animate({ opacity: '0.0' }, this.carListChangeHideDelay, function() {
			item.populate(creditAmount, participation, interestRate, paymentPeriod);
			_this.updateRightListMinMaxItemAmount(item.getPeriodicPaymentAmount());
			_this.lastPopulatedItem = _this.lastPopulatedItem + 1;
			_this.updateList();
			$(this).animate({ opacity: '1.0' }, _this.carListChangeShowDelay);
		});
	}
	return true;
}

KredeksApp.prototype.populateFilter = function(evt)
{
	var filterName = evt.data.filterName;
	var filterId = evt.data.filterId;
	var filterParam = evt.data.filterParam;
	var html = '';
	var $elem;
	
	if (filterName == 'participation')
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
	}
}

KredeksApp.prototype.depopulateFilter = function(evt)
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

KredeksApp.prototype.populateField = function(evt)
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

KredeksApp.prototype.initCreditData = function()
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

KredeksApp.prototype.createRightListItems = function(thisParam)
{
	var data = [];
	for (var i = 0; i < thisParam.rightListMaxEntries; i++)
	{
		var newItem = new RightListItem(i + 1);
		data.push(newItem);
	}
	return data;
}

KredeksApp.prototype.getItem = function(index)
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

KredeksApp.prototype.initRightList = function(self)
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

KredeksApp.prototype.compareItemsByPeriodicPaymentAmount = function(i1, i2)
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

KredeksApp.prototype.updateList = function()
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

KredeksApp.prototype.removeItem = function(index)
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

KredeksApp.prototype.populatePopup = function(item)
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

KredeksApp.prototype.initFields = function()
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

KredeksApp.prototype.openDetails = function(target, self)
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

KredeksApp.prototype.initEvents = function(self)
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
	$('#button-add-credit')//.removeClass('disabled')
		.off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();

		var $target = $(evt.target).prop('id') == 'button-add-car' ? $(evt.target) : $(evt.target).closest('#button-add-car');
		var disabled = $target.hasClass('disabled');

		if (disabled)
		{
			$target = null;
			return false;
		}
		
		this.clearErrorDescriptions('#credits-page');
		
		var allDefined = true;
		
		//console.log('this.selectedTypeIndex = ' + this.selectedTypeIndex);
		if (typeof this.creditAmount === 'undefined'
			|| this.creditAmount == '')
		{
			this.markFields('#credits-page', [{
				id: '#filter-amount',
				name: 'amount'
			}]);
			allDefined = false;
		}
		if (typeof this.selectedParticipationIndex === 'undefined'
			|| this.selectedParticipationIndex == -1)
		{
			this.markFields('#credits-page', [{
				id: '#filter-participation',
				name: 'participation'
			}]);
			allDefined = false;
		}
		if (typeof this.selectedInterestRateIndex === 'undefined'
			|| this.selectedInterestRateIndex == -1)
		{
			this.markFields('#credits-page', [{
				id: '#filter-interest',
				name: 'interest'
			}]);
			allDefined = false;
		}
		if (typeof this.selectedPaymentPeriodIndex === 'undefined'
			|| this.selectedPaymentPeriodIndex == -1)
		{
			this.markFields('#credits-page', [{
				id: '#filter-paymentperiod',
				name: 'paymentperiod'
			}]);
			allDefined = false;
		}
		
		if (!allDefined)
		{
			this.addError('#credits-page', 'enter-fields', 'Unesite obavezna polja.');
			return false;
		}
		
		//creditAmount, participation, interestRate, paymentPeriod
		if (this.addItem(
			this.creditAmount,
			this.creditData['participation'][this.selectedParticipationIndex],
			this.creditData['interestRate'][this.selectedInterestRateIndex],
			this.creditData['paymentPeriod'][this.selectedPaymentPeriodIndex]
		))
		{
			// Reset all filters
			this.resetFilters();
		}
		$target = null;
		return false;
	}, self));
	
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
		
	$('#credits-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#credits-tab').parent().addClass('active');
		this.slideIn('#credits-page', '.tab-content .tab-pane.active');
		return false;
	}, self));
	$('#leasing-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		$('.nav-tabs > li').removeClass('active');
		$('#leasing-tab').parent().addClass('active');
		this.slideIn('#leasing-page', '.tab-content .tab-pane.active');
		return false;
	}, self));
	self = null;
}

KredeksApp.prototype.resetFilters = function()
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

KredeksApp.prototype.initFilterEvents = function()
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
	$('#credits-page input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				//console.log('change: evt = ');
				//console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				self.unmarkFields('#credits-page', [{
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
	$('#leasing-page input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				//console.log('change: evt = ');
				//console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				self.unmarkFields('#leasing-page', [{
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
	$('.popup2 input[type="text"].formatted').each(function(){
		$(this)
			//.off('change')
			.on('change', function(evt){
				//console.log('change: evt = ');
				//console.log(evt);
				self[$(this).data('variableName')] = $(this).val();
				/*self.unmarkFields('#leasing-page', [{
					id: '#' + $(this).prop('id'),
					name: $(this).data('fieldName')
				}], [0], '.wrapper');*/
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
		/*hideField('#owner-drivertestyear');
	
		hideField('#vehicle-body');
		hideField('#vehicle-doors');
		hideField('#vehicle-capacity');*/
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
	
KredeksApp.prototype.initCarousel = function()
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

KredeksApp.prototype.slideIn = function(pageName, activePageName, callBack)
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
	var kredeks = new KredeksApp();

	kredeks.initFields();

	$('.spaced-out .dd,.spaced-out input[type="text"].inline,'
		+ '.spaced-out input[type="checkbox"] + label.inline').each(function() {
			$(this)
				.wrap('<span class="wrapper">')
				.parent()
				.append('&nbsp;');
	});
	
	kredeks.initCreditData();
	kredeks.initEvents();
	kredeks.initFilterEvents();
	kredeks.initRightList();
	//kredeks.initCarousel();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
});
