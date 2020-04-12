function ResultsItem(options)
{
	var defaults = {
		sponsored: undefined,
		absoluteindex: undefined,
		images: [],
		thumbs: [],
		year: undefined,
		maker: undefined,
		model: undefined,
		price: undefined,
		seller: {
			type: undefined,
			company: undefined,
			address: {
				street: undefined,
				city: undefined,
				distance: undefined
			},
			phone: []
		},
		used: undefined,
		mileage: undefined,
		fueltype: undefined,
		gear: undefined,
		body: undefined,
		doors: undefined,
		seats: undefined,
		color: undefined,
		registration: undefined,
		notes: [],
		features: {
			volume: undefined,
			power: undefined,
			drive: undefined,
			spending: undefined,
			emissionclass: undefined
		},
		props: [],
		abovebelow: undefined,
		eval: undefined,
		evaldesc: undefined,
		equipment: {
			exterior: [],
			interior: [],
			drivingsafety: [],
			vehiclesafety: []
		},
		comment: undefined,
		crashed: undefined
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}

ResultsItem.prototype.destroy = function()
{
	delete this.images;
	this.images = null;
	delete this.thumbs;
	this.thumbs = null;
	delete this.seller.address;
	this.seller.address = null;
	delete this.seller.phone;
	this.seller.phone = null;
	delete this.seller;
	this.seller = null;
	delete this.notes;
	this.notes = null;
	delete this.features;
	this.features = null;
	delete this.props;
	this.props = null;
	delete this.equipment.exterior;
	this.equipment.exterior = null;
	delete this.equipment.interior;
	this.equipment.interior = null;
	delete this.equipment.drivingsafety;
	this.equipment.drivingsafety = null;
	delete this.equipment.vehiclesafety;
	this.equipment.vehiclesafety = null;
	delete this.equipment;
	this.equipment = null;
}

ResultsItem.prototype.evalImage = function(abovebelow)
{
	var ret;
	switch (abovebelow)
	{
		case ResultsItem.prototype.AB_ABOVE:
			ret = '<div class="eval-icon above">U</div>';
			//ret = '<img src="img/abovearrow.png" class="eval-arrow" />';
			break;
		case ResultsItem.prototype.AB_BELOW:
			ret = '<div class="eval-icon below">D</div>';
			//ret = '<img src="img/belowarrow.png" class="eval-arrow" />';
			break;
		case ResultsItem.prototype.AB_NEAR_ABOVE:
			ret = '<div class="eval-icon near-above">U</div>';
			break;
		case ResultsItem.prototype.AB_NEAR_BELOW:
			ret = '<div class="eval-icon near-below">D</div>';
			break;
		default:
			ret = '';//'<img src="img/nochangearrow.png" class="eval-arrow" />';
			break;
	}
	return ret;
}

ResultsItem.prototype.construct = function($listItem)
{
	$.extend(this, {
		sponsored: $listItem.find('.car-sponsored').length > 0,
		images: $listItem.data('images').split('/').toArray(),
		thumbs: $listItem.data('thumbs').split('/').toArray(),
		year: $listItem.find('.megalist-car-name-year').text(),
		maker: $listItem.find('.megalist-car-name-maker').text(),
		model: $listItem.find('.megalist-car-name-model').text(),
		//function parseCurrency(from, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator, currency)
		price: parseCurrency($listItem.find('.megalist-car-price').text(), true, false, 2, ',', '.', '€'),
/*
= '" data-seller-type="' + this.seller.type
			+ '" data-seller-company="' + this.seller.company
			+ '" data-seller-address-street="' + this.seller.address.street
			+ '" data-seller-address-city="' + this.seller.address.city
			+ '" data-seller-address-distance="' + this.seller.address.distance
			+ '" data-phone="';
*/
		seller: {
			type: $listItem.data('seller-type'),
			company: $listItem.data('seller-company'),
			address: {
				street: $listItem.data('seller-address-street'),
				city: $listItem.data('seller-address-city'),
				distance: $listItem.data('seller-address-distance')
			},
			phone: $listItem.data('seller-phone').split('@')
		},
		used: undefined,
		mileage: parseDistance($listItem.find('.megalist-car-mileage').text(), true, false, 2, ',', '.'),
		fueltype: $listItem.data('fueltype'),
		gear: $listItem.data('gear'),
		body: $listItem.data('body'),
		doors: $listItem.data('doors'),
		seats: $listItem.data('seats'),
		color: $listItem.data('color'),
		registration: $listItem.data('registration'),
		notes: $listItem.data('notes').split('@'),
/*
		html += '" data-features-volume="' + item.features.volume
			+ '" data-features-power="' + item.features.power
			+ '" data-features-drive="' + item.features.drive
			+ '" data-features-spending="' + item.features.spending
			+ '" data-features-emissionclass="' + item.features.emissionclass;
*/
		features: {
			volume: $listItem.data('features-volume'),
			power: $listItem.data('features-power'),
			drive: $listItem.data('features-drive'),
			spending: $listItem.data('features-spending'),
			emissionclass: $listItem.data('features-emissionclass')
		},
		props: [
			$listItem.find('.megalist-car-prop-000').text()
		],
		abovebelow: ResultsItem.prototype.parseEvalFromJquery($listItem.find('.megalist-car-eval')),
		eval: parseCurrency($listItem.find('.megalist-car-eval-amount').text(), true, false, 2, ',', '.', '€'),
		evaldesc: $listItem.find('.eval-desc').text(),
		equipment: {
			exterior: $listItem.data('equipment-exterior').split('@'),
			interior: $listItem.data('equipment-interior').split('@'),
			drivingsafety: $listItem.data('equipment-driving-safety').split('@'),
			vehiclesafety: $listItem.data('equipment-vehicle-safety').split('@')
		},
		comment: $listItem.data('comment'),
		crashed: undefined
	});
}

ResultsItem.prototype.saveToDom = function(selector)
{
	var $node = $(selector);
	
	var obj = this;
	var name = 'this', tempName;
	var stack = [];
	var nameStack = [];
	stack.push(obj);
	nameStack.push(name);
	while (stack.length > 0)
	{
		obj = stack.pop();
		name = nameStack.pop();
		for (var varName in obj)
		{
			tempName = name.length > 0 ? name + '-' + varName : varName;
			//console.log('name = {' + name + '}, varName = {' + varName + '}, tempname = {' + tempName + '}');
			//console.log('typeof obj[' + varName + '] = ' + typeof obj[varName]);
			if (varName.indexOf('_') == -1)
			{
				if (typeof obj[varName] == 'object')
				{
					stack.push(obj[varName]);
					nameStack.push(name + '-' + varName);
				}
				else if (typeof obj[varName] == 'array')
				{
					$node.data(tempName + '-array', $.toJson(obj[varName]));
				}
				else if (typeof obj[varName] == 'string' || typeof obj[varName] == 'number')
				{
					$node.data(tempName, obj[varName]);
				}
			}
		}
	}
	
	$node = null;
}

ResultsItem.prototype.loadFromJquery = function($object)
{
	var data = $object.data();
	for (var origVarName in data)
	{
		var crumb = '';
		varName = origVarName.replace(/[A-Z]/g, function(ch) {
			return '-' + ch.toLowerCase();
		});
		varName = varName.replace(/([0-9])+/g, '-$1');
		//console.log('CHECKING data[' + varName + ']');
		//console.log('varname... = ' + varName.toString().substring(0, 'this-'.length));
		if (varName.substring(0, 'this-'.length) == 'this-')
		{
			//console.log('HAS "this"');
			var crumbs = varName.split('-');
			var obj = this;
			var isArray = false;
			var i = 1;
			while (i < crumbs.length-1)
			{
				crumb = crumbs[i];
				obj = obj[crumb];
				if (crumb == 'array')
				{
					isArray = true;
				}
				i++;
			}
			crumb = crumbs[i];
			if (isArray)
			{
				obj[crumb] = $.evalJSON(data[origVarName]);
			}
			else
			{
				obj[crumb] = data[origVarName];
			}
		}
	}
	data = null;
}

ResultsItem.prototype.loadFromDom = function(selector)
{
	this.loadFromJquery($(selector));	
}

ResultsItem.prototype.toHtml = function(viewType, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var html, i;
	if (viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		var html = '<li class="megalist-car">'/* data-images="' + this.images.join('/')
			+ '" data-thumbs="' + this.thumbs.join('/')
			+ '" data-seller-type="' + this.seller.type
			+ '" data-seller-company="' + this.seller.company
			+ '" data-seller-address-street="' + this.seller.address.street
			+ '" data-seller-address-city="' + this.seller.address.city
			+ '" data-seller-address-distance="' + this.seller.address.distance
			+ '" data-seller-phone="' + this.seller.phone.join('@')
			+ '" data-notes="' + this.notes.join('@')
			+ '" data-features-volume="' + this.features.volume
			+ '" data-features-power="' + this.features.power
			+ '" data-features-drive="' + this.features.drive
			+ '" data-features-spending="' + this.features.spending
			+ '" data-features-emissionclass="' + this.features.emissionclass
			+ '" data-equipment-exterior="' + this.equipment.exterior.join('@')
			+ '" data-equipment-interior="' + this.equipment.interior.join('@')
			+ '" data-equipment-driving-safety="' + this.equipment.drivingsafety.join('@')
			+ '" data-equipment-vehicle-safety="' + this.equipment.vehiclesafety.join('@')
			+ '" data-fueltype="' + this.fueltype
			+ '" data-gear="' + this.gear
			+ '" data-body="' + this.body
			+ '" data-doors="' + this.doors
			+ '" data-seats="' + this.seats
			+ '" data-color="' + this.color
			+ '" data-comment="' + this.comment
			+ '">'*/
			//+ '<tbody>'
			+ '<div class="car-left">'
			+ '<span class="car-selected';
		if (self.itemInFavorites(this.absoluteindex))
		{
			/*console.log('listthisLabelFunctionAdvanced: idx = ' + idx + ', this.absoluteindex = ' + this.absoluteindex + ', contained in favorites');
			console.log('this = ');
			console.log(this);*/
			html += ' selected">Sačuvan'
		}
		else
		{
			html += '">&nbsp;';
		}
		html += '</span><img src="img/car/'
			+ this.thumbs[0] + '" class="car-image" />';
		if (this.shownSponsored)
		{
			html += '<span class="car-sponsored">Sponzorisan</span>';
		}
		else
		{
			html += '<span>&nbsp;</span>';
		}
		html += '</div>'
			+ '<div class="car-right">'
			+ '<div class="first-row">'
			+ '<div class="col-2"><span class="megalist-car-name"'
			+ '>'
				+ '<span class="megalist-car-name-year">' + this.year + '</span> '
				+ '<span class="megalist-car-name-maker">'+ this.maker + '</span> '
				+ '<span class="megalist-car-name-model">'+ this.model + '</span>'
			+ '</span></div>'
			+ '<div class="col-3"><span class="megalist-car-price">'
				+ formatCurrency(this.price, true, false, 2, ',', '.')
			+ '</span></div>'
			+ '</div><!--first-row-->'
			/*+ '<tr class="second-row">'
			+ '<td class="col-2" colspan="2"><span>'
			//+ this.seller.type + ', '
			//+ this.seller.address.city
			+ '</span></td>'
			+ '</tr>'*/
			+ '<div class="crashed-row">'
			+ '<div class="col-2">'
		if (this.crashed)
		{
			html += '<span class="car-crashed">Havarisan</span> ';
		}
		if (!this.crashed)
		{
			html += '<span>&nbsp;</span>';
		}
		html += '</div>'
			+ '</div><!--crashed-row-->'
			+ '<div class="third-row">'
			+ '<div class="col-2"><span class="megalist-car-prop-000">'
			+ this.props[0] + '</span>, <span class="megalist-car-mileage">'
			+ formatDistance(this.mileage, true, false, 2, ',', '.')
			+ '</span>&nbsp;</div>'
			+ '<div class="col-3 megalist-car-eval';
			switch (this.abovebelow)
			{
				case 1:
					html += ' above';
					break;
				case 2:
					html += ' below';
					break;
				case 3:
					html += ' near-above';
					break;
				case 4:
					html += ' near-below';
					break;
				default:
					break;
			}
		html += '">&nbsp;<span>'
			+ '<span class="megalist-car-eval-amount">'
			+ (this.abovebelow == 0 ? this.eval : formatCurrency(this.eval, true, false, 2, ',', '.'))
			+ '</span>'
			+ ' '
			+ this.evalImage(this.abovebelow)
			+ '</span></div>'
			+ '</div><!--third-row-->'
			+ '<div class="fourth-row">'
			+ '<div class="col-2"><span>'
			+ self.radioFilters.fueltype.values[this.fueltype] + ', '
			+ formatVolume(this.features.volume, true, false, 2, ',', '') + ', '
			+ this.gear
			+ '</span></div>'
			+ '<div class="col-3"><span class="eval-desc">'
			+ this.evaldesc
			+ '</span></div>'
			+ '</div><!--fourth-row-->'
			//+ '</tbody>'
			+ '</div><!--car-right-->'
			+ '</li><!--megalist-car-->';
			//+ '<div class="megalist-car-overlay">&nbsp;</div>';
	}
	else if (viewType == ResultsApp.prototype.SIMPLE_VIEW)
	{
		html = '<li class="megalist-car" data-images="';
		
		for (i = 0; i < this.images.length; i++)
		{
			html += this.images[i];
			if (i != this.images.length-1)
			{
				html += '/';
			}
		}

		html += '" data-thumbs="';
		
		for (i = 0; i < this.thumbs.length; i++)
		{
			html += this.thumbs[i];
			if (i != this.thumbs.length-1)
			{
				html += '/';
			}
		}

		html += '" data-seller-type="' + this.seller.type
			+ '" data-seller-company="' + this.seller.company
			+ '" data-seller-address-street="' + this.seller.address.street
			+ '" data-seller-address-city="' + this.seller.address.city
			+ '" data-seller-address-distance="' + this.seller.address.distance
			+ '" data-seller-phone="';

		for (i = 0; i < this.seller.phone.length; i++)
		{
			html += this.seller.phone[i];
			if (i != this.seller.phone.length-1)
			{
				html += '@';
			}
		}
		
		html += '">'
			//+ '<tbody>'
			+ '<div class="car-left">'
			+ '<span class="car-selected';
		if (self.favorites.indexOf(this.absoluteindex) != -1)
		{
			html += ' selected">Sačuvan'
		}
		else
		{
			html += '">&nbsp;';
		}
		html	+= '</span><img src="img/car/'
				+ this.thumbs[0] + '" class="car-image" />';
		if (this.shownSponsored)
		{
			html += '<span class="car-sponsored">Sponzorisan</span>';
		}
		else
		{
			html += '<span>&nbsp;</span>';
		}
		html += '</div>'
			+ '<div class="car-right">'
			+ '<div class="first-row">'
			+ '<div class="col-2"><span class="megalist-car-name"'
			+ '>'
				+ this.year + ' '
				+ this.maker + ' '
				+ this.model
			+ '</span></div>'
			+ '<div class="col-3"><span class="megalist-car-price">'
				+ formatCurrency(this.price, true, false, 2, ',', '.')
			+ '</span></div>'
			+ '</div><!--first-row-->'
			/*+ '<tr class="second-row">'
			+ '<td class="col-2" colspan="3"><span>'
			+ '</span></td>'
			+ '</tr>'*/
			+ '<div class="crashed-row">'
			+ '<div class="col-2">'
		if (this.crashed)
		{
			html += '<span class="car-crashed">Havarisan</span> ';
		}
		if (!this.crashed)
		{
			html += '<span>&nbsp;</span>';
		}
		html += '</div>'
			+ '</div><!--crashed-row-->'
			+ '<div class="third-row">'
			+ '<div class="col-2"><span class="megalist-car-prop-000">'
			+ this.props[0] + '</span>, <span class="megalist-car-mileage">'
			+ formatDistance(this.mileage, true, false, 2, ',', '.')
			+ '</span>&nbsp;</div>'
			+ '<div class="col-3">'
			+ this.seller.type
			+ '</div>'
			+ '<div class="col-4 megalist-car-eval';
			switch (this.abovebelow)
			{
				case 1:
					html += ' above';
					break;
				case 2:
					html += ' below';
					break;
				case 3:
					html += ' near-above';
					break;
				case 4:
					html += ' near-below';
					break;
				default:
					break;
			}
		html += '">&nbsp;<span>'
			+ '<span class="megalist-car-eval-amount">'
			+ (this.abovebelow == 0 ? this.eval : formatCurrency(this.eval, true, false, 2, ',', '.'))
			+ '</span>'
			+ ' '
			+ this.evalImage(this.abovebelow)
			+ '</span></div>'
			+ '</div><!--third-row-->'
			+ '<div class="fourth-row">'
			+ '<div class="col-2"><span>'
			+ self.radioFilters.fueltype.values[this.fueltype] + ', '
			+ formatVolume(this.features.volume, true, false, 2, ',', '') + ', '
			+ this.gear
			+ '</span></div>'
			+ '<div class="col-3">'
			+ this.seller.address.city
			+ '</div>'
			+ '<div class="col-4"><span class="eval-desc">'
			+ this.evaldesc
			+ '</span></div>'
			+ '</div><!--fourth-row-->'
			//+ '</tbody>'
			+ '</div><!--car-right-->'
			+ '</li><!--megalist-car-->';
			//+ '<div class="megalist-car-overlay">&nbsp;</div>';
	}
	self = null;
	return html;
}

/*function evalShortDesc(abovebelow)
{
	switch (abovebelow)
	{
		case 1:
			return 'visa';
			break;
		case 2:
			return 'niza';
			break;
		case 3:
			return 'procena';
			break;
		default:
			return '';
			break;
	}
}*/

function ResultsApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/

	this.debug = 0;
	this.simpleViewMaxPages = 5;
	this.listItemHeight = '7.5em';
	this.maxSponsored = 3;
	this.emailFormRevealSpeed = 300;
	this.filtersRevealSpeed = 300;
	this.switchViewAnimationDelay = 300;
	this.toggleFiltersDelay = 300;
	this.emailFormMessageLength = 9 * 20;
	this.favoritesDeleteAnimationDelay = 300;
	
	this.slimScrollShowSpeed = 0;
	this.slimScrollHideSpeed = 0;

	this.serverAvailableItems = 150; // how many items to simulate

	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.selectedItem = new ResultsItem();

	this.revealAnimationOn = false;
	this.addedItems = 0;
	this.scrolling = false;
	 
	this.viewType = ResultsApp.prototype.ADVANCED_VIEW; // 0 = Advanced, 1 = Simple
	this.activeTabIndex = 0;                   // 0 = Rezultati, 1 = Odabrani
	this.selectedIndex = -1;                   // Selected item in results list
	this.selectedFavoritesIndex = -1;          // Selected item in favorites list
	this.selectedDisplayedIndex = -1;          // Selected item in displayed part of results list
	this.selectedDisplayedFavoritesIndex = -1; // Selected item in displayed part of favorites list
	//this.selectedRelatedIndex = -1;            // Selected item in related items list
	this.displayedItemFromTab = -1;            // Which tab the currently selected item originates from
												// 0 = Results, 1 = Favorites, 2 = Related items list (exception)
	this.displayedItemDisplayedIndex = -1;		// Actual index of the selected item in the displayed part of results list
	this.displayedItemAbsoluteIndex = -1;		// Actual index of the selected item in the results list
												
												
												
	this.megaListTop = 0;
	this.megaListWidth = 0;
	this.advancedViewMegaListHeight = 0;
	this.simpleViewMegaListHeight = 0;
	this.simpleViewFooterMinTop = 0;
	this.advancedViewMegaListHeightAdjust = -10;
	
	this.rightDetailTitleHeight = 0;

	//this.leftSideMegalistWidth = '460px';
	this.ssWidth = [433, 678];
	this.megalistWidth = [427, 667];
	this.leftSideWidth = [567, 807];
	this.megalistLIWidth = [415, 655];

	this.filterToolbarHeightAdjust = 0;
	this.rightDetailHeightAdjust = [0, 0]; // + 10;
	this.rightDetailInnerHeightAdjust = [49, 49]; // + 10;
	this.rightSideHeightAdjust = 10;
	
	this.additionalFiltersHeight = 310;

	/*this.data = new Array();
	this.favorites = new Array();
	this.favoritesData = new Array();
	this.sortedData = new Array();
	this.sortedFavoritesData = new Array();
	this.prepagedData = new Array();
	this.prepagedFavoritesData = new Array();
	this.displayedData = new Array();
	this.displayedFavoritesData = new Array();*/
	//this.related = new Array();

	this.lastAccordionId = 'accordion-000';
	this.favoritesMegalistInitialized = 0;
	this.simpleViewResultsPageNumber = 0;
	this.simpleViewFavoritesPageNumber = 0;
	this.simpleViewResultsTabFirstShownPage = 0;
	this.simpleViewFavoritesTabFirstShownPage = 0;
	this.sortFunction = null;
	
	this.moreFiltersAnimating = false;
	this.rightDetailEmailAnimating = false;

	this.filterToolbarMouseOutSet = false;
	
	this.numSponsored = 0;

	this.preventShowingRightDetail = 1;
	this.preventShowingRightDetailOverride = false;

	this.emailFormPhonePlaceholder = {};
	this.emailFormPhonePlaceholder[ResultsApp.prototype.ADVANCED_VIEW] = 'Vas telefon (opc.)';
	this.emailFormPhonePlaceholder[ResultsApp.prototype.SIMPLE_VIEW] = 'Vas broj telefona (opciono)';

	this.dropdownClassIds = {};
	this.dropdownClassIds[ResultsApp.prototype.ADVANCED_VIEW] = {
		toggleClass: '.dropdown-toggle',
		groupClass: '.btn-group',
		menuClass: '.dropdown-menu'
	};
	this.dropdownClassIds[ResultsApp.prototype.SIMPLE_VIEW] = {
		toggleClass: '.dropdown-toggle',
		groupClass: '.btn-group',
		menuClass: '.dropdown-menu'
		/*toggleClass: '.accordion-toggle',
		groupClass: '.accordion-group',
		menuClass: '.btn-group-vertical'*/
	};
		
	// Filters
	this.rangeFilters = {
		year: {
			active: false,
			dynamic: true,
			lower: -1,
			upper: -1,
			lowest: -1,        // tracking actual data
			highest: -1,
			delta: 1           // interval will be broken into subintervals of this length; overridden by maxItems
		},
		mileage: {
			active: false,
			dynamic: false,
			upper: -1,
			lowest: -1,        // tracking actual data
			highest: -1,
			start: 50000,
			end: 200000,
			delta: 50000,       // interval will be broken into subintervals of this length; overridden by maxItems
			valueGenFunction: function(val) {
				return { high: val };
			}
		},
		price: {
			active: false,
			dynamic: true,
			upper: -1,
			lowest: -1,        // tracking actual data
			highest: -1,
			delta: 4000,        // interval will be broken into subintervals of this length; overridden by maxItems
			valueGenFunction: function(val) {
				return { high: val };
			}
		},
		'features.volume': {
			active: false,
			dynamic: false,
			upper: -1,
			lowest: -1,        // tracking actual data
			highest: -1,
			values: [
				{ high: 1150 },
				{ high: 1300 },
				{ high: 1600 },
				{ high: 1800 },
				{ high: 2000 },
				{ high: 2500 },
				{ high: 3000 }
			]
		},
		'seller.address.distance': {
			active: false,
			dynamic: false,
			upper: -1,
			lowest: -1,        // tracking actual data
			highest: -1,
			values: [
				{ high: 20 },
				{ high: 50 },
				{ high: 100 },
				{ high: 200 }
			]
		}
	};
	this.setFilters = {
		'seller.address.city': {
			menuId: '#filter-city-menu',
			values: [],
			activeValues: []
		}
	};
	this.radioFilters = {
		used: {
			dynamic: false,
			values: [
				'Nova',
				'Polovna'
			],
			activeValue: undefined
		},
		maker: {
			dynamic: true,
			values: [],
			activeValue: undefined
		},
		model: {
			dynamic: true,
			values: [],
			activeValue: undefined
		},
		body: {
			dynamic: false,
			values: [
				'Limuzina',
				'Hecbek',
				'Kupe',
				'Karavan',
				'Kabriolet',
				'Mini-van',
				'Dzip/SUV',
				'Pick-up'
			],
			activeValue: undefined
		},
		fueltype: {
			dynamic: false,
			values: [
				'Benzin',
				'Dizel',
				'Benzin + gas (TNG)',
				'Metan (CNG)',
				'Elektricni pogon',
				'Hibridni pogon'
			],
			activeValue: undefined
		}
	};

	this.numberOfActiveFilters = 0;

	this.menus = {
		'#filter-used-menu': {
			filterType: ResultsApp.prototype.FT_RADIO,
			filterName: 'used',
			title: 'Nova/polovna'
		},
		'#filter-brand-menu': {
			filterType: ResultsApp.prototype.FT_RADIO,
			filterName: 'maker',
			title: 'Marka'
		},
		'#filter-model-menu': {
			filterType: ResultsApp.prototype.FT_RADIO,
			filterName: 'model',
			title: 'Model'
		},
		'#filter-body-menu': {
			filterType: ResultsApp.prototype.FT_RADIO,
			filterName: 'body',
			title: 'Karoserija'
		},
		'#filter-year-menu': {
			filterType: ResultsApp.prototype.FT_RANGE,
			filterName: 'year',
			title: 'Godiste',
			maxItems: 3,		// maximum number of items allowed; overrides delta from filter
			formatFunctionAndLess: function(val) {
				return 'pre ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i posle';
			},
			formatFunctionAll: function() {
				return 'Sva godista';
			}
		},
		'#filter-price-menu': {
			filterType: ResultsApp.prototype.FT_RANGE,
			filterName: 'price',
			title: 'Cena',
			maxItems: 5,		// maximum number of items allowed; overrides delta from filter
			formatFunction: formatCurrency,
			formatFunctionAndLess: function(val) {
				return 'do ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i vise';
			},
			formatFunctionAll: function() {
				return 'Sve cene';
			}
		},
		'#filter-fuel-menu': {
			filterType: ResultsApp.prototype.FT_RADIO,
			filterName: 'fueltype',
			title: 'Gorivo'
		},
		'#filter-volume-menu': {
			filterType: ResultsApp.prototype.FT_RANGE,
			filterName: 'features.volume',
			title: 'Zapremina',
			formatFunction: formatVolume,
			formatFunctionAndLess: function(val) {
				return 'do ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i vise';
			},
			formatFunctionAll: function() {
				return 'Sve zapremine';
			}
		},
		'#filter-mileage-menu': {
			filterType: ResultsApp.prototype.FT_RANGE,
			filterName: 'mileage',
			title: 'Kilometraza',
			maxItems: 5,		// maximum number of items allowed; overrides delta from filter
			formatFunction: formatDistance,
			formatFunctionAndLess: function(val) {
				return 'do ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i vise';
			},
			formatFunctionAll: function() {
				return 'Sve kilometraze';
			}
		},
		'#filter-distance-menu': {
			filterType: ResultsApp.prototype.FT_RANGE,
			filterName: 'seller.address.distance',
			title: 'Udaljenost',
			formatFunction: formatDistance,
			formatFunctionAndLess: function(val) {
				return 'do ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i vise';
			},
			formatFunctionAll: function() {
				return 'Sve udaljenosti';
			}
		}
		/*'#filter-city-menu': {
			title: 'Lokacija'
		}*/
	};

}

// View types
ResultsApp.prototype.ADVANCED_VIEW = 0;
ResultsApp.prototype.SIMPLE_VIEW = 1;

// Filter types
ResultsApp.prototype.FT_RANGE = 0;
ResultsApp.prototype.FT_SET = 1;
ResultsApp.prototype.FT_RADIO = 2;

// Koriscena
ResultsItem.prototype.K_NOVA = 0;
ResultsItem.prototype.K_POLOVNA = 1;

// Karoserija
ResultsItem.prototype.K_LIMUZINA = 0;
ResultsItem.prototype.K_HECBEK = 1;
ResultsItem.prototype.K_KUPE = 2;
ResultsItem.prototype.K_KARAVAN = 3;
ResultsItem.prototype.K_KABRIOLET = 4;
ResultsItem.prototype.K_MINIVAN = 5;
ResultsItem.prototype.K_DZIP = 6;
ResultsItem.prototype.K_PICKUP = 7;

// Gorivo
ResultsItem.prototype.G_BENZIN = 0;
ResultsItem.prototype.G_DIZEL = 1;
ResultsItem.prototype.G_BENZINGAS = 2;
ResultsItem.prototype.G_METAN = 3;
ResultsItem.prototype.G_ELEKPOGON = 4;
ResultsItem.prototype.G_HIBRPOGON = 5;

// Above/below
ResultsItem.prototype.AB_NO_EVAL = 0;
ResultsItem.prototype.AB_ABOVE = 1;
ResultsItem.prototype.AB_BELOW = 2;
ResultsItem.prototype.AB_NEAR_ABOVE = 3;
ResultsItem.prototype.AB_NEAR_BELOW = 4;

ResultsApp.prototype.itemInFavorites = function(itemId)
{
	// TODO
	
	var found = false;
	var $lis = $('#left-list-favorites').find('li');
	var i = 0;
	
	while (!found && i < $lis.length)
	{
		var idx = $lis.eq(i).data('this-absoluteindex');
		//console.log('this abs idx = ' + idx);
		if (idx == itemId)
		{
			found = true;
		}
		i++;
	}
	
	$lis = null;
	return found;
}

ResultsApp.prototype.getLoadedResultsLength = function()
{
	return $('#left-list > ul > li').length;
}

ResultsApp.prototype.getAvailableResultsLength = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret = self.serverAvailableItems;
	self = null;
	return ret;
}

ResultsApp.prototype.getFavoritesLength = function()
{
	return $('#left-list-favorites > ul > li').length;
}

ResultsApp.prototype.setVehicleCountText = function(count)
{
	$('#result-count-text').html(count.toString() + ' ' + formatVehicleCountText(count));
}

ResultsApp.prototype.rightSideTabBarShouldBeFixed = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('rightSideTabBarShouldBeFixed: $(\'#right-detail-inner\')[0].scrollTop = '
		+ $('#right-detail-inner')[0].scrollTop
		+ ', bar.top = ' + $('#right-detail-inner + .slimScrollBar').css('top')
		+ ', self.rightDetailTitleHeight = ' + self.rightDetailTitleHeight
	);*/
	
	var ret =
		($('#right-detail-inner')[0].scrollTop > self.rightDetailTitleHeight + 1);
	
	self = null;
	return ret;
}

ResultsApp.prototype.barShouldBeFixed = function()
{
	//var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('********************* upperBarShouldBefixed:');
	console.log('$(\'#left-list\')[0].scrollTop = ' + $('#left-list')[0].scrollTop);
	console.log('$(\'#left-list-favorites\')[0].scrollTop = ' + $('#left-list-favorites')[0].scrollTop);
	console.log('$(\'#right-detail-inner\')[0].scrollTop = ' + $('#right-detail-inner')[0].scrollTop);
	console.log('$(\'#right-detail-title\').height() = ' + $('#right-detail-title').height());*/

	var ret =
		($('#left-list')[0].scrollTop > 0)
		|| ($('#left-list-favorites')[0].scrollTop > 0)
		|| ($('#filter-toolbar')[0].scrollTop > 0)
		|| ($('#right-detail-inner')[0].scrollTop > 0//$('#right-detail-title').height() + 1
	);


	//console.log('returning ' + ret);
	
	return ret;
		// For some reason, this method only works with the local variable;
		// when the result of an inline expression is returned, it is "undefined"?
		/*($('#left-list')[0].scrollTop > 0)
		|| ($('#left-list-favorites')[0].scrollTop > 0)
		|| ($('#right-detail-inner')[0].scrollTop > $('#right-detail-title').height() + 1);*/
}

ResultsApp.prototype.scrollRightSideBar = function(scrollTop, scrollingRight, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var scrollingRight = typeof scrollingRight === 'undefined' ? false : scrollingRight;
	
	//console.log('scrollRightSideBar: scrollingRight = ' + scrollingRight);
	if (scrollingRight)
	{
		//console.log('scrollRightSideBar: rightSideBarShouldBeFixed = ' + self.rightSideTabBarShouldBeFixed(self));
		if (!self.rightSideTabBarShouldBeFixed(self))
		{
			$('#right-detail-tabs-outer')
				.css({
					top: 2*$('#right-detail-tabs-outer').height()
						- scrollTop + 'px'
				});
		}
		else
		{
			$('#right-detail-tabs-outer')
				.css({
					top: ''
				});
		}
		/*if (self.barShouldBeFixed(self))
		{
			$('.favorite-link')
				.css({
					top: scrollTop + 'px'
				});
		}*/
	}
	self = null;
}

ResultsApp.prototype.setBarWidths = function(fixed, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var simpleViewRightSideActive = self.viewType == ResultsApp.prototype.SIMPLE_VIEW && $('#right-side').hasClass('active');
	var rightTabFixed = $('#right-detail-tabs-outer').hasClass('fixed');
	
	if (rightTabFixed)
	{
		if (self.viewType == ResultsApp.prototype.SIMPLE_VIEW)
		{
			$('#right-detail-title-outer')
				.css({
					width: $('#body-inner').width() - $('#right-side').position().left + 'px',
					left: '',
					'padding-left': ''
				});
			$('#right-detail-tabs-outer')
				.css({
					width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
					+ 'px',
					left: '-6px',
					'padding-left': $('#left-side').offset().left + 5 + 'px'
				});
		}
		else
		{
			$('#right-detail-title-outer')
				.css({
					width: $('#body-inner').width() - $('#right-side').position().left + 'px',
					left: '',
					'padding-left': ''
				});
			$('#right-detail-tabs-outer')
				.css({
					width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
					+ 'px',
					left: '',
					'padding-left': ''
				});
		}
	}
	else if (fixed)
	{
		if (self.viewType == ResultsApp.prototype.SIMPLE_VIEW)
		{
			$('#right-detail-title-outer')
				.css({
					width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
					+ 'px',
					left: '-5px',
					'padding-left': $('#left-side').offset().left + 5 + 'px'
				});
			$('#right-detail-tabs-outer')
				.css({
					width: '',
					left: '',
					'padding-left': ''
				});
		}
		else
		{
			$('#right-detail-title-outer')
				.css({
					width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
					+ 'px',
					left: '',
					'padding-left': ''
				});
			$('#right-detail-tabs-outer')
				.css({
					width: '',
					left: '',
					'padding-left': ''
				});
		}
		/*$('#right-detail-tabs-outer')
			.css({
				width: $('#body-inner').width() - $('#right-side').position().left + 'px'
			});*/
		$('#left-list-tabs-outer')
			.css({
				width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
				+ 'px',
				left: '-5px',
				'padding-left': $('#left-side').offset().left + 5 + 'px'
			});
		/*if (simpleViewRightSideActive)
		{
			$('#left-list-tabs-outer').addClass('hidden');
		}
		else
		{
			$('#left-list-tabs-outer').removeClass('hidden');
		}*/
	}
	else
	{
		if (self.viewType == ResultsApp.prototype.SIMPLE_VIEW)
		{
			$('#right-detail-title-outer')
				.css({
					width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
					+ 'px',
					left: '-5px',
					'padding-left': $('#left-side').offset().left + 5 + 'px'
				});
			$('#right-detail-tabs-outer')
				.css({
					top: '',
					width: '',
					left: '',
					'padding-left': ''
				});
		}
		else
		{
			$('#right-detail-title-outer')
				.css({
					width: '',
					left: '',
					'padding-left': ''
				});
			$('#right-detail-tabs-outer')
				.css({
					top: '',
					width: '',
					left: '',
					'padding-left': ''
				});
		}
		$('#left-list-tabs-outer')
			.css({
				width: $('#body-inner').width() //- $('#left-side').position().left - $('#left-side').width()
				+ 'px',
				left: '-5px',
				'padding-left': $('#left-side').offset().left + 5 + 'px'
			});
	}
	self = null;
}

ResultsApp.prototype.fixUpperBar = function(scrollTop, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('fixUpperBar(scrollTop = '+scrollTop
		+ ', self.rightSideTabBarShouldBeFixed(self) = ' + self.rightSideTabBarShouldBeFixed(self)
		+')'
	);*/

	if (self.viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		$('#left-list-tabs-outer')
			.addClass('fixed');
	}
	else
	{
		if ($('#right-side').hasClass('active'))
		{
			$('#left-list-tabs-outer')
				.removeClass('fixed')
				.addClass('hidden');
		}
		else
		{
			$('#left-list-tabs-outer')
				.removeClass('hidden')
				.addClass('fixed');
		}
	}

	if (self.rightSideTabBarShouldBeFixed(self))
	{
		$('#right-detail-title-outer')
			.removeClass('fixed')
			.addClass('hidden');
		$('#right-detail-inner-right')
		//$('.favorite-link')
			.addClass('hidden');
		$('#right-detail-tabs-outer')
			.addClass('fixed')
			/*.css({
				top: ''
			})*/;
	}
	else
	{
		$('#right-detail-title-outer')
			.addClass('fixed')
			.removeClass('hidden');
		$('#right-detail-inner-right')
		//$('.favorite-link')
			.removeClass('hidden');
		$('#right-detail-tabs-outer')
			.removeClass('fixed');
	}
	self.setBarWidths(true, self);
	self = null;
}

ResultsApp.prototype.unFixUpperBar = function(scrollTop, self)
{
	var self = typeof self === 'undefined' ? this : self;

	//console.log('unFixUpperBar(scrollTop = '+scrollTop+')');
	
	$('#left-list-tabs-outer')
		.removeClass('hidden')
		.removeClass('fixed');
	$('#right-detail-title-outer')
		.removeClass('fixed')
		.removeClass('hidden')
		.css({
			top: ''
		});
	$('#right-detail-inner-right')
	//$('.favorite-link')
		.removeClass('hidden')
		/*.css({
			top: ''
		})*/;
	$('#right-detail-tabs-outer')
		.removeClass('fixed');

	self.setBarWidths(false, self);
	self = null;
}

ResultsApp.prototype.setupRightDetailScroll = function(makeVisible, forceOverPanel, self)
{
	var self = typeof self === 'undefined' ? this : self;
	console.log('setupRightDetailScroll('+makeVisible+')');
	var detail;
	var forceOverPanel = typeof forceOverPanel !== 'undefined' ? forceOverPanel : false;
	
	if (makeVisible && !self.preventShowingRightDetailOverride)
	{
		$('#right-side')/*.css({
			visibility: 'visible'
		})*/.addClass('active');
		/*$('#right-detail').css({
			visibility: 'visible'
		}).addClass('active')*/;
	}
	
	var $element = null;
	var $otherelement = null;
	/*if (self.viewType == self.ADVANCED_VIEW)
	{*/
		/*$element = $('#right-detail-content');*/
		$element = $('#right-detail-inner');
		$otherelement = $('#right-side-inner');
	/*}
	else
	{
		$element = $('#right-side-inner');
		$otherelement = $('#right-detail-content');
	}*/
	var $scroll = $element.parent().hasClass('slimScrollDiv') ? $element.parent() : {};
	var $otherscroll = $otherelement.parent().hasClass('slimScrollDiv') ? $otherelement.parent() : {};
	if ($scroll.length > 0)
	{
		/*debugLine('scroll.length > 0 [id='
			+ $scroll.prop('id')
			+ ', class='
			+ $scroll.prop('class')
			+ '], unwrapping ' + $element.prop('id'));*/
		/*$element.slimScroll({
			scrollTo: 0,
			showSpeed: self.slimScrollShowSpeed,
			hideSpeed: self.slimScrollHideSpeed,
			hideBar: true
		});
		self.scrollRightSideBar(0, true);*/
		//self.unFixUpperBar(0);
		$element.unwrap();
		$element.siblings('[class^=slim]:not([class*=Div])').remove();
	}
	if ($otherscroll.length > 0)
	{
		/*debugLine('otherscroll.length > 0 [id='
			+ $otherscroll.prop('id')
			+ ', class='
			+ $otherscroll.prop('class')
			+ '], unwrapping ' + $otherelement.prop('id'));*/
		$otherelement.unwrap();
		$otherelement.siblings('[class^=slim]:not([class*=Div])').remove();
	}

	self.setupAdvancedViewHeights(forceOverPanel, self);

	//debugLine('calling slimScroll() on #' + $element.prop('id') + '.' + $element.prop('class'));
	$element.off('scroll');
	$element.slimScroll({
		//alwaysVisible: true,
		//scrollTo: '0px',
		height: $element.height() + 'px',
		overrideBarTop: '41px',
		showSpeed: self.slimScrollShowSpeed,
		hideSpeed: self.slimScrollHideSpeed,
		hideBar: true
		//overrideBarTop: '82px'
	});
	
	if (forceOverPanel)
	{
		$element.next().css('display', 'none');
	}
	
	//console.log('730: /////////////// scrollTop = ' + $element.scrollTop());

	//console.log('element.top = ' + $element.css('top'));

	self.setBarWidths(self.barShouldBeFixed(self), self);
	self.justifyRightSideTabs(self);
	self.scrollRightSideBar(0, true);
	//self.unFixUpperBar(0, self);
	//self.resetStickyTabs(self);
	
	//console.log('737: /////////////// scrollTop = ' + $element.scrollTop());
	
	$element.on('scroll', $.proxy(function(evt) {
		var $title = $('#right-detail-title');
		var $tabs = $('#right-detail-tabs-outer');

		//console.log('element.top = ' + $('#right-detail-inner + .slimScrollBar').css('top'));
		//console.log('\\\\\\\\\\\\\\\\ ScrollTop = ' + evt.target.scrollTop);
		
		this.scrollRightSideBar(evt.target.scrollTop, true);
		
		if (this.barShouldBeFixed())
		{
			this.fixUpperBar(evt.target.scrollTop);
		}
		else
		{
			this.unFixUpperBar(evt.target.scrollTop);
		}
	}, self));
	$element = null;
	$otherelement = null;
	$scroll = null;
	$otherscroll = null;
	self = null;
}

ResultsApp.prototype.justifyRightSideTabs = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var $ul = $('#right-detail-tabs');
	var numItems = $ul.children().length;
	var sidePadding = parseInt($ul.css('padding-left'));
	var width = $ul.outerWidth(true);
	var totalElementWidth = 2 * sidePadding;
	var gapWidth;
	
	//window.alert('numItems = ' + numItems);
	//window.alert('sidePadding = ' + sidePadding);
	//window.alert('width = ' + width);
	$ul.children().each(function() {
		totalElementWidth += $(this).width();
	});
	gapWidth = Math.floor((width - totalElementWidth) / (numItems-1));
	$ul.children().css('margin-right', gapWidth + 'px');
	$ul.find('li:last-child').css('margin-right', 0);
	$ul = null;
	self = null;
}

ResultsApp.prototype.simulateListClick = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('simulateListClick()');
	//var event = new Object;
	var selected = null;
	var selectedIndex = -1;
	if (self.displayedItemFromTab == 0)
	{
		selected = self.displayedData[self.selectedDisplayedIndex];
		selectedIndex = self.selectedDisplayedIndex;
		self.listChangeHandler(selected, selectedIndex, undefined);
	}
	else if (self.displayedItemFromTab == 1)
	{
		selected = self.displayedFavoritesData[self.selectedFavoritesIndex];
		selectedIndex = self.selectedDisplayedFavoritesIndex;
		self.listChangeHandler(selected, selectedIndex, undefined);
	}
	else if (self.displayedItemFromTab == 2)
	{
		//selected = window.related[window.selectedRelatedIndex];
		//selectedIndex = window.selectedRelatedIndex;
	}
	else
	{
		// Before any real user clicks - abort
		self = null;
		return;
	}
	self = null;
}

ResultsApp.prototype.dimFavoriteLink = function()
{
	$('.favorite-link')
		.addClass('dimmed blue')
		.removeClass('gray');
	$('.favorite-link').html('Sačuvaj');
}

ResultsApp.prototype.unDimFavoriteLink = function()
{
	$('.favorite-link')
		.removeClass('dimmed blue')
		.addClass('gray');
	$('.favorite-link').html('Ukloni iz sačuvanih');
}

ResultsApp.prototype.listToDetailTable = function(rowId, rowTitle, aList)
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
	$row = null;
}

ResultsApp.prototype.advancedViewShowRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.preventShowingRightDetailOverride) return;
	$('#right-side')
		.addClass('active');
	self = null;
}

ResultsApp.prototype.advancedViewHideRightSideDetail = function()
{
	$('#right-side')
		.removeClass('active');
}

ResultsItem.prototype.parseEvalFromJquery = function(obj)
{
	var ret = ResultsItem.prototype.AB_NO_EVAL;
	if (obj.hasClass('above'))
	{
		ret = ResultsItem.prototype.AB_ABOVE;
	}
	if (obj.hasClass('below'))
	{
		ret = ResultsItem.prototype.AB_BELOW;
	}
	if (obj.hasClass('near-above'))
	{
		ret = ResultsItem.prototype.AB_NEAR_ABOVE;
	}
	else if (obj.hasClass('near-below'))
	{
		ret = ResultsItem.prototype.AB_NEAR_BELOW;
	}
	return ret;
}

ResultsApp.prototype.simpleViewShowRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.preventShowingRightDetailOverride) return;
	$('#right-side')
		.addClass('active');
	self.calculateSimpleViewHeight(self);
	$('#left-list-tabs-outer').addClass('hidden');
	$('#right-detail-tabs-outer').css({
		top: ''
	});
	self = null;
}

ResultsApp.prototype.simpleViewHideRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#right-side')
		.removeClass('active');

	$('#left-list-tabs-outer').removeClass('hidden');
	
	if ($('#right-detail-title-outer').hasClass('fixed'))
	{
		$('#left-list-tabs-outer').addClass('fixed');
	}
	
	self = null;
}

ResultsApp.prototype.listChangeHandler = function( index, event, target, self ) { 
	var self = typeof self === 'undefined' ? this : self;
	
	var makeVisible = true;// (window.viewType == ADVANCED_VIEW);
	
	if (self.viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		self.advancedViewShowRightSideDetail(self);
	}
	
	if (!self.preventShowingRightDetailOverride
		&& //(!self.preventShowingRightDetail &&
		self.viewType == ResultsApp.prototype.SIMPLE_VIEW//)
		)
	{
		//window.alert('adding active in listchangeHandler!');
		//console.log('triggered showing');
		self.simpleViewShowRightSideDetail(self)
		//self.simpleViewPopulateRelated(self);
	}
	else if (self.preventShowingRightDetail)
	{
		//console.log('showing prevented! next one will fire');
		self.preventShowingRightDetail = 0;
	}
	else
	{
		//console.log('detail didnt show because view type = advanced');
	}

	var obj = new ResultsItem();
	obj.loadFromJquery(target);
	//obj.construct(target);

	self.displayedItemFromTab = self.activeTabIndex;

	//var newIndex = -1;

	// TODO
	if (self.displayedItemFromTab == 0)
	{
		/*var selectedItems = $.grep(self.displayedData, function(el, idx) {
			return el.absoluteindex == obj.absoluteindex;
		});
		self.displayedItemDisplayedIndex = self.displayedData.indexOf(selectedItems[0]);*/
		self.displayedItemAbsoluteIndex = obj.absoluteindex;
		
		self.selectedDisplayedIndex = index;

		self.selectedIndex = obj.absoluteindex;
		
		//newIndex = self.favorites.indexOf(self.selectedIndex);
	}
	else if (self.displayedItemFromTab == 1)
	{
		/*var selectedItems = $.grep(self.displayedFavoritesData, function(el, idx) {
			return el.absoluteindex == obj.absoluteindex;
		});
		self.displayedItemDisplayedIndex = self.displayedFavoritesData.indexOf(selectedItems[0]);*/
		self.displayedItemAbsoluteIndex = obj.absoluteindex;

		self.selectedDisplayedFavoritesIndex = index;

		self.selectedFavoritesIndex = obj.absoluteFavoritesIndex;

		//newIndex = self.selectedFavoritesIndex;
	}
	
	self.selectedItem.destroy();
	delete self.selectedItem;
	self.selectedItem = obj;

	if (!self.itemInFavorites(obj.absoluteindex))
	{
		self.dimFavoriteLink(self);
	}
	else
	{
		self.unDimFavoriteLink(self);
	}

	$('#right-detail-title .title').text(obj.year + ' ' + obj.maker + ' ' + obj.model);
	$('#right-detail-price').text(formatCurrency(obj.price, true, false, 2, ',', '.'));
	
	switch (obj.abovebelow)
	{
		case 1:
			$('#right-detail-eval-price,#right-detail-eval-arrow').removeClass('below near-above near-below').addClass('above');
			break;
		case 2:
			$('#right-detail-eval-price,#right-detail-eval-arrow').removeClass('above near-above near-below').addClass('below');
			break;
		case 3:
			$('#right-detail-eval-price,#right-detail-eval-arrow').removeClass('above below near-below').addClass('near-above');
			break;
		case 4:
			$('#right-detail-eval-price,#right-detail-eval-arrow').removeClass('above below near-above').addClass('near-below');
			break;
		default:
			$('#right-detail-eval-price,#right-detail-eval-arrow').removeClass('above below near-above near-below');
			break;
	}
	$('#right-detail-eval-price').html(obj.evalImage(obj.abovebelow) + ' '
		+ (obj.abovebelow == 0 ? obj.eval : formatCurrency(obj.eval, true, false, 2, ',', '.')));
	$('#right-detail-eval-desc').html(obj.evaldesc);
		
	$('.right-detail-main').trigger('slideTo', 0).trigger('finish');
	$('.right-detail-nav-thumbs').trigger('slideTo', 0).trigger('finish');
	$('.right-detail-main img').each(function(){
		$('.right-detail-main').trigger('removeItem', $(this));
	});
	$('.right-detail-nav-thumbs img').each(function(){
		$('.right-detail-nav-thumbs').trigger('removeItem', $(this));
	});
	for (var i = obj.images.length-1; i > -1; i--)
	{
		$('.right-detail-main').trigger('insertItem', [0, '<img src="img/car/'+obj.images[i]+'" id="p'+zeroes(i+1)+'"  />']);
		$('.right-detail-nav-thumbs').trigger('insertItem', [0, '<img src="img/car/'+obj.thumbs[i]+'" id="th'+zeroes(i+1)+'" />']);
	}
	$('.right-detail-main').trigger('slideTo', 0).trigger('finish');
	$('.right-detail-nav-thumbs').trigger('slideTo', 0).trigger('finish');
		
	$('#right-detail-general-year').html(obj.year);
	$('#right-detail-general-mileage').html(formatDistance(obj.mileage));
	$('#right-detail-general-fueltype').html(self.radioFilters.fueltype.values[obj.fueltype]);
	$('#right-detail-general-gear').html(obj.gear);
	$('#right-detail-general-body').html(self.radioFilters.body.values[obj.body]);
	$('#right-detail-general-doors').html(obj.doors);
	$('#right-detail-general-seats').html(obj.seats);
	$('#right-detail-general-color').html(obj.color);
	$('#right-detail-general-registration').html(obj.registration);
	
	notes = '<tr>'
		+ '<td class="right-detail-table-row-title">Napomene:</td>'
		+ '<td class="right-detail-table-row-data" id="right-detail-general-notes-000">'
		+ obj.notes[0] + '</td>';
	for (i = 1; i < obj.notes.length; i++)
	{
		notes += '<tr><td></td><td class="right-detail-table-row-data"'
			+ ' id="right-detail-general-notes-'
			+ zeroes(i)
			+ '">'
			+ obj.notes[i] + '</td></tr>';
	};
	var $tableBody = $('#right-detail-table-general').find('tbody');
	$('[id^=right-detail-general-notes]').each(function(){
		$(this).parent().remove();
	});
	$tableBody.append(notes);
	
	$('#right-detail-features-volume').text(formatVolume(obj.features.volume, true, false, 2, ',', ''));
	$('#right-detail-features-power').text(obj.features.power);
	$('#right-detail-features-drive').text(obj.features.drive);
	$('#right-detail-features-spending').text(obj.features.spending);
	$('#right-detail-features-emission-class').text(obj.features.emissionclass);
	
	$('#right-detail-seller-company').text(obj.seller.company);
	//$('#right-detail-seller-address-street').text(obj.seller.address.street);
	$('#right-detail-seller-address-city-distance').text(
		obj.seller.address.city + ', '
		+ formatDistance(obj.seller.address.distance)
	);
	
	
	self.listToDetailTable(
		'right-detail-seller-phone',
		'',//'<img src="img/icon-phone.png" />',
		obj.seller.phone,
		self
	);

	$('#right-detail-registration').text(obj.registration);
	
	self.listToDetailTable(
		'right-detail-equipment-exterior',
		'Spoljasnjost:',
		obj.equipment.exterior,
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-interior',
		'Unutrasnjost:',
		obj.equipment.interior,
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-driving-safety',
		'Bezbednost voznje:',
		obj.equipment.drivingsafety,
		self
	);
	self.listToDetailTable(
		'right-detail-equipment-vehicle-safety',
		'Sigurnost vozila:',
		obj.equipment.vehiclesafety,
		self
	);
	
	$('#right-detail-registration').text(obj.registration);

	self.debugLine('calling setupRightDetailScroll(' + makeVisible + ')');
	self.setupRightDetailScroll(makeVisible, self);

	$('#ad-tab').trigger('click', [function(){
		initCarousel();//makeVisible);
	}]);
	
	self.resetEmailForm(self.viewType != ResultsApp.prototype.SIMPLE_VIEW);
	
	self = null;
}

ResultsApp.prototype.debugLine = function(line, self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.debug)
	{
		$('#debug-text').append('<p>'+line+'</p>');
		$('#debug-text').scrollTop($('#debug-text').prop('scrollHeight'));
	}
	self = null;
}

$(function(){
	$('#debug-clear').on('click', function(){
		$('#debug-text').empty();
	});
});

ResultsApp.prototype.createFavoritesDataProvider = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	// apply filters
	delete self.prepagedFavoritesData;

	self.prepagedFavoritesData = [];
	self.filterFavoritesData(self);
	self.sortFavoritesData(self.sortFunction);

	self.displayedFavoritesData = self.sortedFavoritesData; // changed for sort

	//debugLine('createFavoritesData: length = ' + window.displayedFavoritesData.length);
	if (self.activeTabIndex == 1)
	{
		self.setVehicleCountText(self.prepagedFavoritesData.length// + self.maxSponsored
		);
	}

	var ret = self.displayedFavoritesData;
	
	self = null;
	
	// TODO: return the value and create possible leak?
	return ret;
}

ResultsApp.prototype.refreshResultList = function(self)
{
	// TODO: change DOM
	var self = typeof self === 'undefined' ? this : self;
	//$('#left-list').data('domlist').refresh();
	$('#left-list').parents('.slimScrollDiv').css({
		display: $('#left-list').css('display')
	});
	self = null;
}

ResultsApp.prototype.refreshFavoritesList = function(self)
{
	// TODO: change DOM
	var self = typeof self === 'undefined' ? this : self;
	//$('#left-list-favorites').data('domlist').refresh();
	$('#left-list-favorites').parents('.slimScrollDiv').css({
		display: $('#left-list-favorites').css('display')
	});
	self = null;
}

ResultsApp.prototype.favoritesDataOnChange = function(self)
{
	// TODO: refreshing = changing of DOM
	var self = typeof self === 'undefined' ? this : self;

	if (self.favorites.length > 0)
	{
		$('#button-clear-favorites').removeClass('disabled');
	}
	else
	{
		$('#button-clear-favorites').addClass('disabled');
	}
	
	$('#left-list-favorites').css({
		'top': 0
	});
	$('#left-list-favorites').find('ul').css({
		'top': 0
	});
	
	// Have to refresh all of them for consistency of labels in all lists
	self.refreshResultList(self);
	self.refreshFavoritesList(self);
	
	self = null;
}

ResultsApp.prototype.addToFavoritesDataOriginal = function(originalIndex, self)
{
	// TODO: only add HTML
	var self = typeof self === 'undefined' ? this : self;
	//console.log('addtoFavoritesDataOriginal('+originalIndex+')');
	/*selIdx = typeof window.selectedIndex !== 'undefined' ? window.selectedIndex : 'undefined';
	selFavIdx = typeof window.selectedFavoritesIndex !== 'undefined' ? window.selectedFavoritesIndex : 'undefined';
	selDiIdx = typeof window.selectedDisplayedIndex !== 'undefined' ? window.selectedDisplayedIndex : 'undefined';
	selDiFavIdx = typeof window.selectedDisplayedFavoritesIndex !== 'undefined' ? window.selectedDisplayedFavoritesIndex : 'undefined';
	debugLine('selIdx = '+selIdx
		+', selFavIdx = '+selFavIdx
		+', selDiIdx = '+selDiIdx
		+', selDiFavIdx = '+selDiFavIdx
	);*/
	self.createDataProvider(self);
	var data = self.displayedData;
	var newItem = $.grep(data, function(el, idx) { return el.absoluteindex == originalIndex; })[0];
	newItem.originalIndex = originalIndex;
	newItem.absoluteFavoritesIndex = self.favoritesData.length;
	//console.log('addToFavoritesDataOriginal: newItem = ' + self.carToString(newItem) + ' (originalIndex = ' + originalIndex + ')');
	self.favorites.push(originalIndex);
	self.favoritesData.push(newItem);
	self.favoritesDataOnChange(self);
	self = null;
}

ResultsApp.prototype.removeSelectedFromFavorites = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var found = false;
	var i = 0;
	var $lis = $('#left-list-favorites').find('li');
	var item = new ResultsItem();
	while (!found && i < $lis.length)
	{
		item.loadFromJquery($lis.eq(i));
		if (item.absoluteindex == self.selectedItem.absoluteindex)
		{
			found = true;
			if (self.activeTabIndex == 1)
			{
				self.tempParam = {
					i: i,
					$lis: $lis
				};
				$lis.eq(i).animate({
					height: 0,
					opacity: '0.0'
				}, self.favoritesDeleteAnimationDelay, $.proxy(function() {
					var $lis = this.tempParam.$lis;
					var i = this.tempParam.i;
					$lis.eq(i).css({
						height: '',
						opacity: ''
					});
					$lis.eq(i).remove();
					$lis = null;
					this.tempParam.$lis = null;
					this.tempParam = null;
				}, self));
			}
			else
			{
				$lis.eq(i).remove();
				$lis = null;
			}
		}
		i++;
	}
	
	item.destroy();
	item = null;
	self = null;
}

ResultsApp.prototype.removeFromFavoritesDataOriginal = function(originalIndex, self)
{
	// TODO: only remove DOM and animate
	
	var self = typeof self === 'undefined' ? this : self;
	//console.log('removeFromFavoritesDataOriginal('+originalIndex+')');
	//window.alert('favorites = '+favorites.toString()+', originalIndex = '+originalIndex);
	/*var item = $.grep(window.favorites, function(o){
		window.alert('comparing '+o+' to '+originalIndex
			+': '+(o == originalIndex));
		return o == originalIndex;
	});*/
	//window.alert('removeFromFavoritesDataOriginal('+originalIndex+'); item = ' + item.toString());
	
	var newIndex = self.favorites.indexOf(originalIndex);
	
	if (self.displayedItemFromTab == 1)
	{
		self.selectedFavoritesIndex = -1;
	}
	
	if (self.favoritesData.length == 1)
	{
		/*var ie = getInternetExplorerVersion();
		if (ie > 8)
		{*/
			delete self.favoritesData;
			delete self.favorites;
		/*}
		else
		{
			window.favoritesData = undefined;
			window.favorites = undefined;
		}*/
		self.favoritesData = new Array();
		self.favorites = new Array();
		/*window.favoritesData.length = 0;
		window.favorites.length = 0;*/
	}
	else
	{
		/*var ie = getInternetExplorerVersion();
		if (ie > 8)
		{*/
			delete self.favoritesData[newIndex];
			delete self.favorites[newIndex];
		/*}
		else
		{
			window.favoritesData[newIndex] = undefined;
			window.favorites[newIndex] = undefined;
		}*/
		self.favoritesData.splice(newIndex, 1);
		self.favorites.splice(newIndex, 1);
		for (i = 0; i < self.favoritesData.length; i++)
		{
			//debugLine('removeOriginal: setting item #'+i);
			self.favoritesData[i].absoluteFavoritesIndex = i;
		}
	}
	self.favoritesDataOnChange(self);
	
	self = null;
}

ResultsApp.prototype.removeFromFavoritesDataNew = function(newIndex, self)
{
	// TODO: only remove DOM (and animate)
	
	var self = typeof self === 'undefined' ? this : self;

	delete self.favoritesData[newIndex];
	delete self.favorites[newIndex];

	self.favoritesData.splice(newIndex, 1);
	self.favorites.splice(newIndex,1);
	for (var i = 0; i < self.favoritesData.length; i++)
	{
		//debugLine('removeNew: setting item #'+i);
		self.favoritesData[i].absoluteFavoritesIndex = i;
	}
	self.favoritesDataOnChange(self);
	self = null;
}

ResultsApp.prototype.carToString = function(car)
{
	return car.year + ' ' + car.maker + ' ' + car.model + ', ' + formatCurrency(car.price);
}

ResultsApp.prototype.addRandomItem = function(listId, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var html;
	var item = new ResultsItem({
		sponsored: false,
		absoluteindex: undefined,
		images: [
			'm-z72-001-sm.png',
			'm-z72-004-sm.png',
			'm-z72-005-sm.png',
			'm-z72-002-sm.png',
			'm-z72-003-sm.png'
		],
		thumbs: [
			'm-z72-001-sm.png',
			'm-z72-004-sm.png',
			'm-z72-005-sm.png',
			'm-z72-002-sm.png',
			'm-z72-003-sm.png'
		],
		year: 2005,
		maker: 'Renault',
		model: 'Laguna 1.9dci',
		price: 4200,
		seller: {
			type: 'Pravno lice',
			company: 'Verona motors d.o.o',
			address: {
				street: 'Dimitrija Tucovica 10/7',
				city: 'Beograd',
				distance: 0,
			},
			phone: [
				'011/2712-134',
				'062/222-132'
			]
		},
		used: ResultsItem.prototype.K_POLOVNA,
		mileage: 120000,
		fueltype: ResultsItem.prototype.G_BENZIN,
		gear: 'Manuelni',
		body: ResultsItem.prototype.K_KARAVAN,
		doors: 5,
		seats: 5,
		color: 'Metalik crna',
		registration: 'Registrovan do 20.2.2014.',
		notes: [
			'Servisna knjizica',
			'Prvi vlasnik',
			'Kupljen nov u Srbiji'
		],
		features: {
			volume: 1900,
			power: '10 kW (170 KS)',
			drive: 'Prednji',
			spending: '12 l/100km',
			emissionclass: 'Euro 4'
		},
		props: [
			'Hecbek',
			'85 000 km',
			'Odlican'
		],
		abovebelow: ResultsItem.prototype.AB_ABOVE,
		eval: 420,
		evaldesc: 'iznad ocekivane',
		equipment: {
			exterior: [
				'Aluminijumske felne',
				'Krovni prozor',
				'Vucna kuka'
			],
			interior: [
				'Automatska klima',
				'Elektronsko podesavanje sedista'
			],
			drivingsafety: [
				'ABS',
				'ESP',
				'Airbag za vozaca i suvozaca',
				'Svetla za maglu'
			],
			vehiclesafety: [
				'Kodiran kljuc'
			]
		},
		comment: 'Automobil je havarisan. Ostecen mu'
			+ ' je prednji trap automobil je havarisan. ostecen mu je',
		crashed: false
	});
	var rand = Math.floor((Math.random() * 10) % 10);
	
	switch (rand)
	{
		case 0:
			break;
			
		case 1:
			delete item.images;
			item.images = [
				'4.jpg',
				'm-z72-001-sm.png',
				'm-z72-003-sm.png',
				'm-z72-002-sm.png',
				'm-z72-005-sm.png',
				'm-z72-002-sm.png',
				'm-z72-001-sm.png'
			];
			delete item.thumbs;
			item.thumbs = deepCopy(item.images);
			item.year = 2007;
			item.maker = 'Audi';
			item.model = 'A5';
			item.price = 30000;
			item.used = ResultsItem.prototype.K_NOVA;
			item.mileage = 85000;
			item.fueltype = ResultsItem.prototype.G_DIZEL;
			item.doors = 2;
			item.features.volume = 2000;
			item.features.emissionclass = 'Euro 3';
			item.abovebelow = ResultsItem.prototype.AB_NEAR_BELOW;
			item.eval = 178;
			item.evaldesc = 'ispod ocekivane';
			break;
			
		case 2:
			delete item.images;
			item.images = [
				'5.jpg',
				'm-z72-002-sm.png',
				'm-z72-004-sm.png'
			];
			delete item.thumbs;
			item.thumbs = deepCopy(item.images);
			item.year = 2008;
			item.maker = 'Opel';
			item.model = 'Astra H1.7 cdti sw';
			item.price = 5500;
			item.mileage = 320000;
			item.fueltype = ResultsItem.prototype.G_BENZIN;
			item.props[1] = '85 000 km';
			item.features.volume = 1308;
			item.features.emissionclass = 'Euro 3';
			item.abovebelow = ResultsItem.prototype.AB_NEAR_ABOVE;
			item.eval = 256;
			break;
			
		case 3:
			delete item.images;
			item.images = ['6.jpg'];
			delete item.thumbs;
			item.thumbs = deepCopy(item.images);
			item.model = 'Astra GTC';
			item.price = 5947;
			item.abovebelow = ResultsItem.prototype.AB_NEAR_BELOW;
			item.eval = 115.43;
			item.evaldesc = 'ispod ocekivane';
			break;
			
		case 4:
			delete item.images;
			item.images = ['7.jpg'];
			delete item.thumbs;
			item.thumbs = deepCopy(item.images);
			item.maker = 'Audi';
			item.model = 'A8 L W12';
			item.price = 7633;
			item.abovebelow = ResultsItem.prototype.AB_NEAR_ABOVE;
			item.eval = 315.73;
			item.evaldesc = 'iznad ocekivane';
			break;
			
		case 5:
			delete item.images;
			item.images = [
				'm-z72-004-sm.png',
				'm-z72-005-sm.png',
				'm-z72-002-sm.png'
			];
			delete item.thumbs;
			item.thumbs = deepCopy(item.images);
			item.year = 2006;
			item.maker = 'BMW';
			item.model = 'M3 0.2 lala';
			item.price = 4670;
			item.seller.address.city = 'Cacak';
			item.seller.address.distance = 52;
			item.fueltype = ResultsItem.prototype.G_DIZEL;
			item.props[1] = '120 000 km';
			item.features.emissionclass = 'Euro 3';
			item.abovebelow = ResultsItem.prototype.AB_NO_EVAL;
			item.eval = '- - -';
			item.evaldesc = 'nema procene';
			item.crashed = true;
			break;
			
		case 6:
			delete item.images;
			item.images = [
				'2.jpg',
				'v2.jpg',
				'v3.jpg',
				'v4.jpg',
				'v5.jpg',
				'v6.jpg',
				'v7.jpg',
				'v8.jpg',
				'v9.jpg',
				'v10.jpg'
			];
			delete item.thumbs;
			item.thumbs = [
				'2.jpg',
				't2.jpg',
				't3.jpg',
				't4.jpg',
				't5.jpg',
				't6.jpg',
				't7.jpg',
				't8.jpg',
				't9.jpg',
				't10.jpg'
			];
			item.body = ResultsItem.prototype.K_KUPE;
			item.sponsored = true;
			item.maker = 'Opel';
			item.model = 'Corsa A';
			item.abovebelow = ResultsItem.prototype.AB_NEAR_BELOW;
			item.eval = 18.92;
			item.evaldesc = 'ispod ocekivane';
			break;
			
		case 7:
			delete item.images;
			item.images = [
				'3.jpg',
				'v2.jpg',
				'v3.jpg',
				'v4.jpg',
				'v5.jpg',
				'v6.jpg',
				'v7.jpg',
				'v8.jpg',
				'v9.jpg',
				'v10.jpg'
			];
			delete item.thumbs;
			item.thumbs = [
				'3.jpg',
				't2.jpg',
				't3.jpg',
				't4.jpg',
				't5.jpg',
				't6.jpg',
				't7.jpg',
				't8.jpg',
				't9.jpg',
				't10.jpg'
			];
			item.sponsored = true;
			item.maker = 'Opel';
			item.model = 'Corsa B';
			item.abovebelow = ResultsItem.prototype.AB_ABOVE;
			item.eval = 14212.34;
			item.evaldesc = 'iznad ocekivane';
			break;
		
		case 8:
			delete item.images;
			item.images = [
				'v1.jpg',
				'v2.jpg',
				'v3.jpg',
				'v4.jpg',
				'v5.jpg',
				'v6.jpg',
				'v7.jpg',
				'v8.jpg',
				'v9.jpg',
				'v10.jpg'
			];
			delete item.thumbs;
			item.thumbs = [
				't1.jpg',
				't2.jpg',
				't3.jpg',
				't4.jpg',
				't5.jpg',
				't6.jpg',
				't7.jpg',
				't8.jpg',
				't9.jpg',
				't10.jpg'
			];
			item.sponsored = true;
			item.maker = 'Opel';
			item.model = 'Tigra A';
			item.abovebelow = ResultsItem.prototype.AB_BELOW;
			item.eval = 35672.85;
			item.evaldesc = 'ispod ocekivane';
			break;
			
		case 9:
			item.sponsored = true;
			item.maker = 'Volvo';
			item.model = 'PV51';
			item.price = 12345;
			item.abovebelow = ResultsItem.prototype.AB_BELOW;
			item.eval = 345.52;
			item.evaldesc = 'ispod ocekivane';
			break;
		default:
			break;
	}
	
	//html = item.toHtml(self.viewType, self);
	item.absoluteindex = $(listId).find('li').length;
	self.addItemToList(listId, item, self);
	
	self = null;
	item = null;
}

ResultsApp.prototype.addItemToList = function(listId, item, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $list = $(listId);
	var list = $list.data('domlist');
		
	list.addItem(item.toHtml(self.viewType, self));
	
	item.saveToDom(listId + ' li:last-child');
	
	self = null;
	$list = null;
	list = null;
	return true;
	
	// TODO?
	
	var i = 0, found = false;
	var currentItem = new ResultsItem();
	
	while (!found && i < $list.find('ul > li').length)
	{
		currentItem.construct(list.getItem(i));
		console.log('calling compare on');
		console.log(currentItem);
		console.log('and');
		console.log(item);
		var comp = self.sortFunction(currentItem, item);
		console.log('... it returns ' + comp);
		if (comp >= 0)
		{
			if (i == 0)
			{
				$list.find('ul > li').eq(0).before(item.toHtml(self.viewType, self));
			}
			else
			{
				list.addItemAt(item.toHtml(self.viewType, self), i-1);
			}
			found = true;
			console.log('found suitable position at ' + i);
			console.log('ul after the addition:');
			$list.find('ul > li').each(function(){
				console.log($(this)[0]);
			});
		}
		else
		{
			console.log('position ' + i + ' is not suitable, searching on');
		}
		i++;
	}
	if (!found)
	{
		list.addItem(item.toHtml(self.viewType, self));
	}
	currentItem = null;
	$list = null;
	list = null;
	self = null;
}

ResultsApp.prototype.checkPopulateResultList = function(listId, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('checkPopulateTimeline: ul.height = '
		+ $('#timeline > ul').eq(0).height()
		+ ', window.height = ' + $(window).height()
		+ ', queueServerDataAvailable = ' + self.queueServerDataAvailable()
	);*/
	while ($(listId + ' > ul').eq(0).height() <= $(window).height()
		&& self.queueServerDataAvailable())
	{
		self.addRandomItem(listId, self);
		self.addedItems++;
	}
	
	self = null;
}

ResultsApp.prototype.createDataProvider = function(self) {

	return false; // TODO: not needed

	var self = typeof self === 'undefined' ? this : self;
	//console.log('createDataProvider()');
	var result = [];
	
	var absoluteindex = 0;
	
	if (self.data.length == 0)
	{
		car = new Object();
		//...
		result.push(car);

		car = new Object();
		//...
		result.push(car);

		car = new Object();
		//...
		result.push(car);
		
		car = deepCopy(car);
		//...
		car.crashed = 1;
		
		result.push(car);

		
		result.push(car);
		
		self.data = result;
	}
	
	var filter = null;
	for (carIndex in self.data)
	{
		if (carIndex != 'indexOf')	 // IE 7
		{
			var car = self.data[carIndex];
			//dbg = 'car #' + carIndex + ': ' + car.model;
			for (setFilterName in self.setFilters)
			{
				filter = self.setFilters[setFilterName];
				var value = multiIndex(car, setFilterName);
				/*dbg += '; filter ' + setFilterName + ' value: '
					+ value;*/
				if (filter.values.indexOf(value) == -1)
				{
					filter.values.push(value);
					filter.activeValues.push(filter.values.indexOf(value));
				}
				//debugLine('setFilters['+setFilterName+'] after one pass:');
				//debugLine('['+window.setFilters[setFilterName].values.toString() + ']');
			}
		}
		//debugLine(dbg);
	}

	if (typeof self.prepagedData !== 'undefined')
	{
		/*var ie = getInternetExplorerVersion();
		if (ie > 8)
		{*/
			delete self.prepagedData;
		/*}
		else
		{
			window.prepagedData = undefined;
		}*/
	}
	self.prepagedData = new Array();
	
	if (typeof self.sponsoredData !== 'undefined')
	{
		delete self.sponsoredData;
	}
	self.sponsoredData = new Array();
	
	self.filterData(self);

	self.sortSponsoredData(self.sortFunction);
	self.tempSpon = self.sortedSponsoredData.slice(0, self.maxSponsored);
	for (i in self.tempSpon)
	{
		self.tempSpon[i].shownSponsored = true;
	}
	self.tempData = self.prepagedData.concat(self.sortedSponsoredData.slice(self.maxSponsored));
	delete self.sortedSponsoredData;
	delete self.prepagedData;
	self.sortedSponsoredData = self.tempSpon;
	self.prepagedData = self.tempData;
	
	//debugLine('window.displayedData.length = ' + window.displayedData.length);

	//debugLine('createDataProvider: window.viewType = ' + window.viewType);
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		pageLength = self.simpleViewItemsPerPage(self);
		fromItem = self.simpleViewResultsPageNumber * pageLength;
		toItem = fromItem + pageLength;
		self.sortData(self.sortFunction); // changed for sort
		if (typeof self.displayedData !== 'undefined')
		{
			delete self.displayedData;
		}
		self.displayedData = self.sortedData.slice(fromItem, toItem); // changed for sort
		self.tempData = self.sortedSponsoredData.concat(self.displayedData);
		delete self.displayedData;
		self.displayedData = self.tempData;
		self.debugLine('createDataProvider: displayedData.length = ' + self.displayedData.length);
		self.debugLine('createDataProvider: fromItem = ' + fromItem);
		self.debugLine('createDataProvider: toItem = ' + toItem);
		//console.log(window.displayedData);
	}
	else
	{*/
		self.sortData(self.sortFunction);
		if (typeof self.displayedData !== 'undefined')
		{
			delete self.displayedData;
		}
		self.displayedData = self.sortedSponsoredData.concat(self.sortedData);
	/*}*/
	
	/*debugLine('createDataProvider: sortedData.length = ' + window.sortedData.length);
	debugLine('createDataProvider: displayedData.length = ' + window.displayedData.length);
	debugLine('createDataProvider: sortedFavoritesData.length = ' + window.sortedFavoritesData.length);*/

	if (self.activeTabIndex == 0)
	{
		self.setVehicleCountText(self.prepagedData.length + self.sponsoredData.length);
	}
	/*$('#results-tab').html('<!--i class="icon-star"--></i> Rezultati ('
		+self.prepagedData.length+')'
		+'<span class="tab-arrow-placeholder-wrapper"><span class="tab-arrow-placeholder">&nbsp;</span></span>'
		);*/
		
	return self.displayedData;
}

function mydump(arr,level) {
    var dumped_text = "";
    if(!level) level = 0;

    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "    ";

    if(typeof(arr) == 'object') {  
        for(var item in arr) {
            var value = arr[item];

            if(typeof(value) == 'object') { 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += mydump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { 
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}

ResultsApp.prototype.filterData = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//debugLine('window.filterPriceActive = ' + window.filterPriceActive);
	
	// TODO: only change classes (and animate)

	/*for (var i = 0; i < self.data.length; i++)
	{
		var okToAddGlobal = true;
		//debugLine('filterData: item #' + i);
		var dataField = null;
		var okToAdd = false;
		
		if (self.data[i].sponsored)
		{
			self.sponsoredData.push(self.data[i]);
			continue;
		}
		
		// Range filters
		for (filterName in self.rangeFilters)
		{
			var filter = self.rangeFilters[filterName];
			dataField = multiIndex(self.data[i], filterName);
			if (filter.lowest == -1 || dataField < filter.lowest)
			{
				filter.lowest = dataField;
			}
			if (dataField > filter.highest)
			{
				filter.highest = dataField;
			}
			if (filterName == 'volume')
			{
			}
			if (filter.active)
			{
				//debugLine('filterData: filter ' + filterName);
				var lower = filter.lower;
				var upper = filter.upper;
				okToAdd = false;
				
				//debugLine('dataField = ' + dataField);
				
				if (lower != -1 && upper != -1)
				{
					if (dataField >= lower && dataField < upper)
					{
						//debugLine('dataField ' + filterName + ' within range (' + lower + '-' + upper + ')');
						okToAdd = true;
					}
				}
				else if (lower != -1)
				{
					if (dataField >= lower)
					{
						//debugLine('dataField ' + filterName + ' bigger than lower (' + lower + ')');
						okToAdd = true;
					}
				}
				else if (upper != -1)
				{
					if (dataField < upper)
					{
						//debugLine('dataField ' + filterName + ' lower than upper (' + upper + ')');
						okToAdd = true;
					}
				}
				okToAddGlobal &= okToAdd;
				if (!okToAddGlobal)
				{
					break;
				}
			}
		}
		
		// Set filters
		for (filterName in self.setFilters)
		{
			//debugLine('processing filter "' + filterName + '"');
			var filter = self.setFilters[filterName];
			okToAdd = false;
			dataField = multiIndex(self.data[i], filterName);

			//debugLine('filter ' + filterName);
			//debugLine('[' + filter.values.toString() + '].indexOf(' + dataField + ') = ' + filter.values.indexOf(dataField));
			if (filter.activeValues.indexOf(filter.values.indexOf(dataField)) != -1)
			{
				okToAdd = true;
			}
			okToAddGlobal &= okToAdd;
			if (!okToAddGlobal)
			{
				break;
			}
		}

		//console.log('filterData: self.radioFilters on data: ');
		//console.log(self.data[i]);
		// Radio filters
		for (filterName in self.radioFilters)
		{
			var filter = self.radioFilters[filterName];
			okToAdd = false;
			dataField = multiIndex(self.data[i], filterName);
		
			if (filter.dynamic && filter.values.indexOf(dataField) == -1)
			{
				filter.values.push(dataField);
				filter.values.sort();
			}
			if (filter.dynamic)
			{
			}
			//debugLine('filter ' + filterName);
			
			if (typeof filter.activeValue === 'undefined'
				|| (filter.dynamic && filter.values[filter.activeValue] == dataField)
				|| (!filter.dynamic && filter.activeValue == dataField)
			)
			{
				okToAdd = true;
			}
			okToAddGlobal &= okToAdd;
			if (!okToAddGlobal)
			{
				break;
			}
		}
		
		if (okToAddGlobal)
		{
			self.prepagedData.push(deepCopy(self.data[i]));
		}
	}*/
	self = null;
}

ResultsApp.prototype.filterFavoritesData = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//debugLine('window.filterPriceActive = ' + window.filterPriceActive);
	
	// TODO: only change classes
	
	/*for (var i = 0; i < self.favoritesData.length; i++)
	{
		var okToAddGlobal = true;
		for (filterName in self.rangeFilters)
		{
			var filter = self.rangeFilters[filterName];
			if (filter.active)
			{
				var lower = filter.lower;
				var upper = filter.upper;
				var okToAdd = false;
				var dataField = self.favoritesData[i][filterName];
				
				if (lower != -1 && upper != -1)
				{
					if (dataField >= lower && dataField < upper)
					{
						//debugLine('price within range');
						okToAdd = true;
					}
				}
				else if (lower != -1)
				{
					if (dataField >= lower)
					{
						//debugLine('price bigger than lower');
						okToAdd = true;
					}
				}
				else if (upper != -1)
				{
					if (dataField < upper)
					{
						//debugLine('price lower than upper');
						okToAdd = true;
					}
				}
				okToAddGlobal &= okToAdd;
			}
		}
		
		// Set filters
		for (filterName in self.setFilters)
		{
			//debugLine('processing filter "' + filterName + '"');
			var filter = self.setFilters[filterName];
			okToAdd = false;
			dataField = multiIndex(self.favoritesData[i], filterName);
		
			//debugLine('filter ' + filterName);
			//debugLine('[' + filter.values.toString() + '].indexOf(' + dataField + ') = ' + filter.values.indexOf(dataField));
			if (filter.activeValues.indexOf(filter.values.indexOf(dataField)) != -1)
			{
				okToAdd = true;
			}
			okToAddGlobal &= okToAdd;
			if (!okToAddGlobal)
			{
				break;
			}
		}
		
		if (okToAddGlobal)
		{
			self.prepagedFavoritesData.push(deepCopy(self.favoritesData[i]));
		}
	}*/
	self = null;
}

function safeIndex(aVar, idx)
{
	if (typeof aVar !== 'undefined')
	{
		return aVar[idx];
	}
	else
	{
		return '(undefined)';
	}
}

ResultsApp.prototype.createPager = function(startingPage, self)
{
	var self = typeof self === 'undefined' ? this : self;

	$('#bottom-pager-inner').empty();
	
	append = '';
	append += '<ul>';
	append += '<li><a href="#" id="bottom-pager-first"><span class="caret-double-left">&nbsp;</span></a></li>';
	append += '<li><a href="#" id="bottom-pager-prev"><span class="caret-single-left">&nbsp;</span></a></li>';
	
	numPages = self.simpleViewNumPages(self);
	if (Math.floor(startingPage / self.simpleViewMaxPages) == Math.floor(numPages / self.simpleViewMaxPages))
	{
		maxPage = startingPage + (numPages % self.simpleViewMaxPages);
		restPages = self.simpleViewMaxPages - (numPages % self.simpleViewMaxPages);
	}
	else
	{
		maxPage = startingPage + self.simpleViewMaxPages;
		restPages = 0;
	}
	//debugLine('maxPage = ' + maxPage);
	
	for (page = startingPage; page < maxPage; page++)
	{
		//debugLine('page = '+page);
		append += '<li><a href="#" id="page-button-' + (page + 1) + '">' + (page + 1) + '</a></li>';
	}
	for (page = maxPage; page < maxPage + restPages; page++)
	{
		//debugLine('page = '+page);
		append += '<li><a href="#"><span class="caret-placeholder">&nbsp;</span></a></li>';
	}
	append += '<li><a href="#" id="bottom-pager-next"><span class="caret-single-right">&nbsp;</span></a></li>';
	append += '<li><a href="#" id="bottom-pager-last"><span class="caret-double-right">&nbsp;</span></a></li>';
	append += '</ul>';
	$('#bottom-pager-inner').append(append);
	
	$('#bottom-pager-inner a:not(:has(> [class^=caret]))').on('click', $.proxy(function(){
		//debugLine('not(has(caret)).onclick()');
		var num = parseInt($(this).text())-1;
		this.switchToPage(num);
	}, self));
	$('#bottom-pager-first').on('click', $.proxy(function(){
		//debugLine('#bottom-pager-first.onclick()');
		this.switchToFirst();
	}, self));
	$('#bottom-pager-prev').on('click', $.proxy(function(){
		//debugLine('#bottom-pager-prev.onclick()');
		this.switchToPrev();
	}, self));
	$('#bottom-pager-next').on('click', $.proxy(function(){
		//debugLine('#bottom-pager-next.onclick()');
		this.switchToNext();
	}, self));
	$('#bottom-pager-last').on('click', $.proxy(function(){
		//debugLine('#bottom-pager-last.onclick()');
		this.switchToLast();
	}, self));
	
	self = null;
}

ResultsApp.prototype.switchView = function(viewType, bRefresh, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('switchView('+viewType+')');
	
	refresh = typeof bRefresh !== 'undefined' ? bRefresh : false;

	if (!refresh && self.viewType == viewType)
	{
		//console.log('self.viewType == viewType, returning');
		return; // Do nothing
	}

	self.viewType = viewType;
	
	$('#view-type-buttons').find('a').removeClass('selected');
	
	if (viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		self.preventShowingRightDetailOverride = !$('#right-side').hasClass('active');
		// Advanced
		if (!refresh)
		{
			self.lastAccordionId = 'accordion-000';
			$('#view-type-button-advanced').addClass('selected');
			//$('#right-side').removeClass('simple');
			//$('#left-side').removeClass('simple');
			$('#top-ad').removeClass('simple');
			//$('#right-ad').removeClass('simple');
			$('#bottom-ad').removeClass('simple');
			$('#bottom-pager').removeClass('simple');

			self.initFilters(ResultsApp.prototype.ADVANCED_VIEW, self);
			
			$('#right-side').removeClass('simple');
			$('#right-ad').animate({ opacity: '0.0' }, self.switchViewAnimationDelay, $.proxy(function() {
				$('#right-ad')
					.removeClass('simple');
					//.css({ opacity: '1.0' })
				$.when(
					$('.third-row .col-3').animate({ opacity: '0.0' }, this.switchViewAnimationDelay),
					$('.fourth-row .col-3').animate({ opacity: '0.0' }, this.switchViewAnimationDelay)
				).done($.proxy(function() {
					$.when(
						$.proxy(function() {
							$('#left-side').removeClass('simple');
							//$('#left-list').data('domlist').setDataFormat(this.listItemLabelFunctionAdvanced);
							//$('#left-list-favorites').data('domlist').setDataFormat(this.listItemLabelFunctionAdvanced);
							this.refreshResultList();
							this.refreshFavoritesList();
							$('#left-side .slimScrollDiv')
								.css({ width: this.ssWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
							$('#left-side #megalists')
								.css({ width: this.ssWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
							$('#left-side .megalist')
								.css({ width: this.megalistWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
							$('#left-side .megalist ul')
								.css({ width: this.megalistWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
							$('#left-side .megalist li')
								.css({ width: this.megalistLIWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
							$('#left-side')
								.css({ width: this.leftSideWidth[ResultsApp.prototype.SIMPLE_VIEW] + 'px' });
						}, this) (),
						$('#left-side .slimScrollDiv')
							.animate({ width: this.ssWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
						$('#left-side #megalists')
							.animate({ width: this.ssWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
						$('#left-side .megalist')
							.animate({ width: this.megalistWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
						$('#left-side .megalist ul')
							.animate({ width: this.megalistWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
						$('#left-side .megalist li')
							.animate({ width: this.megalistLIWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
						$('#left-side')
							.animate({ width: this.leftSideWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay)
					).done($.proxy(function() {
						/*$('#right-side')
							.css({ opacity: '0.0'} );
						$('#right-side').animate({ opacity: '1.0' }, this.switchViewAnimationDelay);*/
						$('#main').removeClass('simple');
						
						this.megaListWidth = this.ssWidth[this.viewType];
						/*this.advancedViewMegaListHeight =
							$('body').height()
								- $('#left-list-tabs-outer').position().top
								//- $('#left-list-tabs-outer').height()
								+ this.advancedViewMegaListHeightAdjust;
						console.log('3072: setting this.advancedViewMegaListHeight to ' + this.advancedViewMegaListHeight
							+ ' ($(\'body\').height() = ' + $('body').height()
							+ ', $(\'#left-list-tabs-outer\').position().top = ' + $('#left-list-tabs-outer').position().top
							+ ', $(\'#left-list-tabs-outer\').height() = ' + $('#left-list-tabs-outer').height()
							+ ', this.advancedViewMegaListHeightAdjust = ' + this.advancedViewMegaListHeightAdjust
							+ ')'
						);*/

						this.setupAdvancedViewHeights(undefined);

						// Unless we save the height value here, it will be reset by the plugin!
						var listHeight = $('#left-list').height();
						var listWidth = this.megaListWidth;
						$('#left-list').data('domlist').setWidth(listWidth);
						$('#left-list-favorites').data('domlist').setWidth(listWidth);
						$('#left-list').data('domlist').setHeight(listHeight);
						$('#left-list-favorites').data('domlist').setHeight(listHeight);
						
						this.resetEmailForm(true);
						
						this.refreshResultList();
						this.refreshFavoritesList();
						
						$(window).trigger('resize');
					}, this));
				}, this));
			}, self));
		}
		
		//$('#footer-wrapper').removeClass('simple');
		
	}
	else
	{
		// Simple
		if (!refresh)
		{
			$('#view-type-button-simple').addClass('selected');
			self.lastAccordionId = 'accordion-000';
			//$('#view-type-button-advanced').addClass('selected');
			//$('#right-side').addClass('simple');
			//$('#left-side').addClass('simple');
			$('#main').addClass('simple');
			$('#top-ad').addClass('simple');
			//$('#right-ad').addClass('simple');
			$('#bottom-ad').addClass('simple');
			$('#bottom-pager').addClass('simple');

			self.initFilters(ResultsApp.prototype.SIMPLE_VIEW, self);

			/*$('#left-side .slimScrollDiv').css({
				width: '350px'
			});
			blargh();*/
			
			$('#right-side').addClass('animating');
			$('#left-side').addClass('animating');
			$('#right-side')
				.css({ opacity: '1.0' })
				.animate({ opacity: '0.0' }, self.switchViewAnimationDelay, $.proxy(function() {
				$('#right-side').removeClass('animating');
				this.advancedViewHideRightSideDetail(this);
				$('#right-side')
					.addClass('simple')
					.css({ opacity: '1.0' });
				$.when(
					$('#left-side .slimScrollDiv')
						.animate({ width: this.ssWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
					$('#left-side #megalists')
						.animate({ width: this.ssWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
					$('#left-side .megalist')
						.animate({ width: this.megalistWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
					$('#left-side .megalist ul')
						.animate({ width: this.megalistWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
					$('#left-side .megalist li')
						.animate({ width: this.megalistLIWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay),
					$('#left-side')
						.animate({ width: this.leftSideWidth[this.viewType] + 'px' }, this.switchViewAnimationDelay)
				).done($.proxy(function() {
					$('#right-ad')
						.css({ opacity: '0.0' })
						.addClass('simple')
						.animate({ opacity: '1.0' }, this.switchViewAnimationDelay);
		
					this.megaListWidth = $('#left-side').width();
					/*self.advancedViewMegaListHeight =
						$('body').height()
							//- $('#left-list-tabs-outer').position().top
							- $('#left-list-tabs-outer').height()
							+ self.advancedViewMegaListHeightAdjust;
					console.log('3162: setting self.advancedViewMegaListHeight to ' + self.advancedViewMegaListHeight
						+ ' ($(\'body\').height() = ' + $('body').height()
						+ ', $(\'#left-list-tabs-outer\').position().top = ' + $('#left-list-tabs-outer').position().top
						+ ', $(\'#left-list-tabs-outer\').height() = ' + $('#left-list-tabs-outer').height()
						+ ', self.advancedViewMegaListHeightAdjust = ' + self.advancedViewMegaListHeightAdjust
						+ ')'
					);*/
					
					this.setupAdvancedViewHeights(undefined);

					// Unless we save the height value here, it will be reset by the plugin!
					var listHeight = $('#left-list').height();
					var listWidth = this.megaListWidth;
					$('#left-list').data('domlist').setWidth(listWidth);
					$('#left-list-favorites').data('domlist').setWidth(listWidth);
					$('#left-list').data('domlist').setHeight(listHeight);
					$('#left-list-favorites').data('domlist').setHeight(listHeight);
					
					$('#left-side').addClass('simple');

					$.when(
						//$('.third-row .col-2').css({ opacity: '0.0' }),
						//$('.fourth-row .col-2').css({ opacity: '0.0' })
						$.proxy(function() {
							//$('#left-list').data('domlist').setDataFormat(this.listItemLabelFunctionSimple);
							//$('#left-list-favorites').data('domlist').setDataFormat(this.listItemLabelFunctionSimple);

							this.resetEmailForm(false);
							
							this.refreshResultList();
							this.refreshFavoritesList();
							
							$(window).trigger('resize');
						}, this) ()
					).done($.proxy(function() {
						$('.third-row .col-3').css({ opacity: '0.0' });
						$('.fourth-row .col-3').css({ opacity: '0.0' });
						$.when(
							$('.third-row .col-3').animate({ opacity: '1.0' }, this.switchViewAnimationDelay),
							$('.fourth-row .col-3').animate({ opacity: '1.0' }, this.switchViewAnimationDelay)
						).done(function() {
							$('#left-side').removeClass('animating');
							$('.third-row .col-3').css('opacity', '');
							$('.fourth-row .col-3').css('opacity', '');
						});
					}, this));
				}, this));
			}, self));
		}
	}
	
	if (self.viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		// Simulate list click
		if (self.selectedItemFromTab != -1)
		{
			if (self.selectedItemFromTab == 0)
			{
				$('#left-list').data('domlist').triggerOnClick(self.selectedDisplayedIndex);
			}
			else if (self.selectedItemFromTab == 1)
			{
				$('#left-list-favorites').data('domlist').triggerOnClick(self.selectedDisplayedFavoritesIndex);
			}
			self.setupRightDetailScroll(true, undefined, self);
			self.advancedViewShowRightSideDetail(self);
		}
		self.preventShowingRightDetailOverride = false;
	}
	self = null;
}

ResultsApp.prototype.setupAdvancedViewHeights = function(forceOverPanel, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('setupAdvancedViewHeights: self.advancedViewMegaListHeight = ' + self.advancedViewMegaListHeight);
	var forceOverPanel = typeof forceOverPanel !== 'undefined' ? forceOverPanel : false;
	var bottom = $('body').height();
	
	var mainHeight = self.advancedViewMegaListHeight
			+ $('#left-list-tabs-outer').height()
			+ 2
			;
	
	$('#main').css({
		'height': mainHeight + 'px',
		'min-height': mainHeight + 'px'
	});
	
	var ie = getInternetExplorerVersion();
	if (ie > -1 && ie < 8)
	{
		$('#right-side').css({
			'height': bottom - $('#main').position().top
				+ 'px',
			'min-height': bottom - $('#main').position().top
				+ 'px',
			'width': $('#main').width() * 55 / 100 + 'px',
			'min-width': $('#main').width() * 55 / 100 + 'px'
		});
		$('#right-detail').css({
			'top': $('#left-side').position().top + 'px',
			'width': $('#right-side').width() - 50 + 'px',
			'min-width': $('#right-side').width() - 50 + 'px',
			'height': bottom - $('#main').position().top - 20
				+ 'px',
			'min-height': bottom - $('#main').position().top - 20
				+ 'px'
		});
		$('#right-side-inner').css({
			'height': bottom - $('#main').position().top + 'px',
			'min-height': bottom - $('#main').position().top + 'px'
		});
		
		/*$('#right-detail-content').css({*/
		$('#right-detail-inner').css({
			'height': bottom //- $('#left-side').position().top
				- 250
				+ 'px',
			'min-height': bottom //- $('#left-side').position().top
				- 250
				+ 'px'
		});
	}
	else
	{
		
		//var menuHeight = $('#menubar').height()+2;
		/*console.log('setting right-side height to ' + (bottom - menuHeight + self.rightSideHeightAdjust)
			+ 'px. Why? Because bottom = ' + bottom + ', menuHeight = ' + menuHeight + ' and self.rightSideHeightAdjust = ' + self.rightSideHeightAdjust);
		console.log('**************** bottom = ' + bottom);*/
		$('#right-side').css({
			'height': mainHeight + 'px',
			'min-height': mainHeight + 'px',
			'width': '55%',
			'min-width': '55%'
		});
		$('#right-side-inner').css({
			'height': mainHeight + 'px',
			'min-height': mainHeight + 'px'
		});
		
		/*console.log('self.viewType = ' + self.viewType);
		console.log('adjust = ' + self.rightDetailHeightAdjust[self.viewType]);
		console.log('************************** SETTING right-detail to '
			+(bottom //- menuHeight
				- self.rightDetailHeightAdjust[self.viewType]//$('#right-detail').position().top
				)+ 'px'
		);*/
		$('#right-detail').css({
			'height': bottom //- menuHeight
				//+ 61
				- self.rightDetailHeightAdjust[self.viewType]//$('#right-detail').position().top
				+ 'px',
			'min-height': bottom //- menuHeight
				//+ 61
				- self.rightDetailHeightAdjust[self.viewType]//$('#right-detail').position().top
				+ 'px'
		});
	}

	var rightSideVisible = $('#right-side').css('display') != 'none'
		//&& $('#right-side').css('visibility') != 'hidden'
		&& !$('#right-side').hasClass('simple');
	var rightDetailTitleVisible = !$('#right-detail-title-outer').hasClass('hidden');
		
	//console.log('rightSideVisible = ' + rightSideVisible);
	if (rightSideVisible)
	{
		if (rightDetailTitleVisible)
		{
			self.rightDetailTitleHeight = $('#right-detail-title').height();
		}
		
		var $detail = $('#right-side .slimScrollDiv');
		if ($detail.length == 0)
		{
			/*$detail = $('#right-detail-content');*/
			$detail = $('#right-detail-inner');
		}
		var detailHeight = bottom
			- self.rightDetailHeightAdjust[self.viewType]
			//- $('#right-detail-tabs').position().top
			//- $('#right-detail-tabs').height()
			;
		$detail.css({
			'height': detailHeight
				+ 'px',
			'min-height': detailHeight
				+ 'px'
		});
		console.log('setting detailHeight to ' + detailHeight
			+ 'px. Why? Because bottom = ' + bottom
			+ ' (body.height = ' + $('body').height() + ', body.outerHeight = ' + $('body').outerHeight() + ') '
			+ ' and self.rightDetailHeightAdjust[self.viewType] = ' + self.rightDetailHeightAdjust[self.viewType]
			//+ ' and $(\'#right-detail-tabs\').position().top = ' + $('#right-detail-tabs').position().top
			//+ ' and $(\'#right-detail-tabs\').height() = ' + $('#right-detail-tabs').height()
		);
		/*$('#right-detail-content').css({*/
		$('#right-detail-inner').css({
			'height': detailHeight - self.rightDetailInnerHeightAdjust[self.viewType]
				+ 'px',
			'min-height': detailHeight - self.rightDetailInnerHeightAdjust[self.viewType]
				+ 'px'
		});
		
		/*console.log('detailHeight = ' + detailHeight
			+ ' (bottom = ' + bottom
			+ ', detail-tabs.top = ' + $('#right-detail-tabs').position().top
			+ ', detail-tabs.height = ' + $('#right-detail-tabs').height()
			+ ')'
		);*/
		
		$detail = null;
	}
	
	$('#left-side').css({
		'height': mainHeight + 'px',
		'min-height': mainHeight + 'px'
	});
	
	$('#megalists').css({
		'height': self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px'
	});
	
	var $elem = $('#left-list');
	/*.data('domlist');
	if (typeof $elem !== 'undefined')
	{
		$elem.setHeight(self.advancedViewMegaListHeight + 'px', forceOverPanel);
	}
	$elem = $('#left-list-favorites').data('domlist');
	if (typeof $elem !== 'undefined')
	{
		$elem.setHeight(self.advancedViewMegaListHeight + 'px', forceOverPanel);
	}*/
	$elem.css({
		height: self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px'
	});
	$elem = $('#left-list-favorites');
	$elem.css({
		height: self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px'
	});
	$elem = null;

	$('#megalists .slimScrollDiv:has(.megalist.active)').css({
		'height': self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px',
		'display': 'block'
	});
	$('#megalists .slimScrollDiv:not(:has(.megalist.active))').css({
		'display': 'none'
	});
	//self.debugLine('2796: SETTING #left-list.height() TO ' + self.advancedViewMegaListHeight);
	$('#filter-toolbar-outer').css({
		'height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			+ 'px',
		'min-height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			+ 'px'
	});
	$('#filter-toolbar-outer .slimScrollDiv').css({
		'height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			+ 'px',
		'min-height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			+ 'px'
	});
	$('#filter-toolbar').css({
		'height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			- self.filterToolbarHeightAdjust
			+ 'px',
		'min-height': self.advancedViewMegaListHeight
			//- $('#left-list-tabs-outer').height()
			- self.filterToolbarHeightAdjust
			+ 'px'
	});
	
	self = null;
}

ResultsApp.prototype.hardFooterTop = function()
{
	/*console.log('hardFooterTop() = $(\'body\').height() ['+$('body').height()
		+'] - $(\'#footer-wrapper\').outerHeight() ['+$('#footer-wrapper').outerHeight()
		+'] = '
		+($('body').height() - $('#footer-wrapper').outerHeight()));*/
	return $('body').height() - $('#footer-wrapper').outerHeight(true);
}

ResultsApp.prototype.setupSimpleViewHeights = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//self.debugLine('setupSimpleViewHeights()');
	//window.alert('window.simpleViewFooterMinTop='+window.simpleViewFooterMinTop);
	var $detail = $('#right-side > .slimScrollDiv');
	if ($detail.length == 0)
	{
		$detail = $('#right-side-inner');
	}

	/*self.debugLine('hardFooterTop() = ' + self.hardFooterTop()
		+ ', simpleviewfootermintop = ' + self.simpleViewFooterMinTop);*/
	if (self.hardFooterTop() < self.simpleViewFooterMinTop)
	{
		rightSideActive = $('#right-detail').hasClass('active')
			;
		megaListHeight = $('#right-ad').outerHeight(true);
		//self.debugLine('3006: megaListHeight = ' + megaListHeight);
		if (rightSideActive)
		{
			var viewportHeight = $('body').height()
					- $('#main').position().top;
			var longestPageHeight = 0;
			/*self.debugLine('2845: #ad-page.height() = ' + $('#ad-page').height());
			self.debugLine('$(\'#right-detail-general-notes-002\').text() = '
				+ $('#right-detail-general-notes-002').text());*/
			$('#right-detail-content').children().each(function(){
				self.debugLine('checking ' + $(this).prop('id') + ' height... it is '
					+ $(this).outerHeight(true));
				if ($(this).outerHeight(true) > longestPageHeight)
				{
					self.debugLine('setting longestPageHeight');
					longestPageHeight = $(this).outerHeight(true);
				}
			});
			var rightSideHeight = longestPageHeight;
			
			var mainHeight = self.simpleViewFooterMinTop
				- $('#main').offset().top;
			/*self.debugLine('setupSimpleViewHeights: mainHeight = ' + mainHeight
				+ ', window.simpleViewFooterMinTop = ' + self.simpleViewFooterMinTop
				+ ', longestPageHeight = ' + longestPageHeight);*/
			if (mainHeight > rightSideHeight)
			{
				rightSideHeight = mainHeight;
			}
			rightDetailContentHeight = mainHeight
				- $detail.position().top
			
			$('#main').css({
				'height': rightSideHeight + 'px',
				'min-height': rightSideHeight + 'px'
			});
			$('#right-side').css({
				'height': rightSideHeight + 'px',
				'min-height' : rightSideHeight + 'px',
				'width': $('#left-side').outerWidth(true) + 'px',
				'min-width': $('#left-side').outerWidth(true) + 'px'
			});
			$('#right-side-inner').css({
				'height': rightSideHeight + 'px',
				'min-height' : rightSideHeight + 'px'
			});
			$('#right-detail').css({
				'height': rightSideHeight + 'px',
				'min-height' : rightSideHeight + 'px'
			});
			$detail.css({
				'height': rightSideHeight + 'px',
				'min-height' : rightSideHeight + 'px'
			});
			$('#right-detail-content').css({
				'height': rightSideHeight + 'px',
				'min-height' : rightSideHeight + 'px'
			});
		}
		
		$('#left-side').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		$('#megalists .slimScrollDiv:has(.megalist.active)').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px',
			'display': 'block'
		});
		$('#megalists .slimScrollDiv:not(:has(.megalist.active))').css({
			'display': 'none'
		});
		//self.debugLine('2922: SETTING #left-list HEIGHT TO ' + megaListHeight);
		$('#filter-toolbar-outer').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		$('#filter-toolbar-outer .slimScrollDiv').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		$('#left-list').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		//self.debugLine('#left-list.height() NOW ' + $('#left-list').height());
		$('#left-list-favorites').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		
		$('#megalists').css({
			'height': megaListHeight + 'px',
			'min-height': megaListHeight + 'px'
		});
		
		$('#footer-wrapper').css({
			'top': self.simpleViewFooterMinTop + 'px',
			'bottom': 'auto'
		});
	}
	else
	{
		$('#left-side').css({
			'height': self.simpleViewMegaListHeight
				+ $('#bottom-pager').outerHeight(true)
				+ $('#left-list-tabs').outerHeight(true) + 'px',
			'min-height': self.simpleViewMegaListHeight
				+ $('#left-list-tabs').outerHeight(true) + 'px'
		});
		$('#megalists .slimScrollDiv:has(.megalist.active)').css({
			'height': self.simpleViewMegaListHeight + 'px',
			'min-height': self.simpleViewMegaListHeight + 'px',
			'display': 'block'
		});
		$('#megalists .slimScrollDiv:not(:has(.megalist.active))').css({
			'display': 'none'
		});
		//self.debugLine('2960: SETTING #left-list HEIGHT TO ' + self.simpleViewMegaListHeight);
		$('#filter-toolbar-outer').css({
			'height': self.simpleViewMegaListHeight + 'px',
			'min-height': self.simpleViewMegaListHeight + 'px'
		});
		$('#filter-toolbar-outer .slimScrollDiv').css({
			'height': self.simpleViewMegaListHeight + 'px',
			'min-height': self.simpleViewMegaListHeight + 'px'
		});
		$('#left-list').css({
			'height': self.simpleViewMegaListHeight + 'px',
			'min-height': self.simpleViewMegaListHeight + 'px'
		});
		$('#left-list-favorites').css({
			'height': self.simpleViewMegaListHeight + 'px',
			'min-height': self.simpleViewMegaListHeight + 'px'
		});
		$('#footer-wrapper').css({
			'top': 'auto',
			'bottom': 0
		});
	}
	
	//self.debugLine('2975: #ad-page.height() = ' + $('#ad-page').height());
	
	$detail = null;
	self = null;
}

ResultsApp.prototype.initializeFavoritesMegalist = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('initializeFavoritesMegalist()');
	if (self.viewType == ResultsApp.prototype.ADVANCED_VIEW)
	{
		$('#left-list-favorites')
			.off('scroll')
			.domlist({
				//dataCreate: self.createFavoritesDataProvider,
				//dataCreateParam: self,
				//dataFormat: self.listItemLabelFunctionAdvanced,
				//dataFormatParam: self,
				onClick: self.listChangeHandler,
				onClickParam: self,
				onMouseOver: function(listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-car-name').addClass('hovered');
					$li = null;
				},
				onMouseOverParam: self,
				onMouseOut: function(listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-car-name').removeClass('hovered');
					$li = null;
				},
				onMouseOutParam: self,
				slimScrollShowSpeed: self.slimScrollShowSpeed,
				slimScrollHideSpeed: self.slimScrollHideSpeed,
				width: self.ssWidth[self.viewType] + 'px',
				itemHeight: self.listItemHeight
			})
			.on('scroll', $.proxy(function(evt) {
				//console.log('visible items:');
				//console.log($('#left-list').data('advlist').getVisibleItems());
				this.scrollRightSideBar(evt.target.scrollTop);
				if (this.barShouldBeFixed())
				{
					this.fixUpperBar(evt.target.scrollTop);
				}
				else
				{
					this.unFixUpperBar(evt.target.scrollTop);
				}
			}, self));
	}
	else
	{
		$('#left-list-favorites')
			.off('scroll')
			.domlist({
				//dataCreate: self.createFavoritesDataProvider,
				//dataCreateParam: self,
				//dataFormat: self.listItemLabelFunctionSimple,
				//dataFormatParam: self,
				onClick: self.listChangeHandler,
				onClickParam: self,
				onMouseOver: function(listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-car-name').addClass('hovered');
					$li = null;
				},
				onMouseOverParam: self,
				onMouseOut: function(listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-car-name').removeClass('hovered');
					$li = null;
				},
				onMouseOutParam: self,
				slimScrollShowSpeed: self.slimScrollShowSpeed,
				slimScrollHideSpeed: self.slimScrollHideSpeed,
				width: self.ssWidth[self.viewType] + 'px',
				itemHeight: self.listItemHeight
			})
			.on('scroll', $.proxy(function(evt) {
				//console.log('visible items:');
				//console.log($('#left-list').data('advlist').getVisibleItems());
				this.scrollRightSideBar(evt.target.scrollTop);
				if (this.barShouldBeFixed())
				{
					this.fixUpperBar(evt.target.scrollTop);
				}
				else
				{
					this.unFixUpperBar(evt.target.scrollTop);
				}
			}, self));
	}
}

ResultsApp.prototype.calculateSimpleViewHeight = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	/*console.log('window.simpleViewMegaListHeight = hardFooterTop() [' + hardFooterTop() + ']'
		+ ' - $(\'#bottom-pager\').outerHeight(true) ['+$('#bottom-pager').outerHeight(true)+']'
		+ ' - $(\'#left-list-tabs\').position().top ['+$('#left-list-tabs').position().top+']'
		+ ' - $(\'#left-list-tabs\').height() ['+$('#left-list-tabs').height()+'] = '
		+ (hardFooterTop()
		- $('#bottom-pager').outerHeight(true)
		- $('#left-list-tabs').position().top
		- $('#left-list-tabs').height()));*/
	self.simpleViewMegaListHeight = //window.simpleViewFooterMinTop
		self.hardFooterTop()
		- $('#bottom-pager').outerHeight(true)
		- $('#left-list-tabs').position().top
		- $('#left-list-tabs').height();
	/*window.simpleViewMegaListHeight = hardFooterTop()
		- $('#bottom-pager').outerHeight(true)
		- $('#left-list-tabs').position().top
		- $('#left-list-tabs').height();*/
}

ResultsApp.prototype.simpleViewItemsPerPage = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	listItemHeight = parseInt($(7.5).toPx());/*$('#megalists li')//$('.megalistItem')
		.outerHeight(true);*/
	self.debugLine('3029: #left-list.height() = ' + $('#left-list').height());
	if (self.activeTabIndex == 0)
	{
		listHeight = $('#left-list').height();
	}
	else
	{
		listHeight = $('#left-list-favorites').height();
	}
	
	self.debugLine('simpleViewItemsPerPage: listHeight = ' + listHeight
		+ ', listItemHeight = ' + listItemHeight);
	if (listItemHeight != 0)
	{
		return Math.floor(listHeight / listItemHeight);
	}
	else
	{
		return 1;
	}
}

ResultsApp.prototype.simpleViewNumPages = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.activeTabIndex == 0)
	{
		list = self.prepagedData;
	}
	else
	{
		list = self.prepagedFavoritesData;
	}
	//debugLine('list.length = '+list.length);
	//debugLine('simpleViewItemsPerPage() = '+simpleViewItemsPerPage());
	return Math.ceil(list.length / self.simpleViewItemsPerPage());
}

ResultsApp.prototype.compareItemsByModel = function(i1, i2, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	console.log('compareItemsByModel()');
	/*console.log('compareItemsByModel: numSponsored = ' + self.numSponsored);
	if (self.numSponsored < self.maxSponsored && i1.sponsored && !i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return -1;
	}
	else if (self.numSponsored < self.maxSponsored && !i1.sponsored && i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return 1;
	}
	else*/
	ret = (i1.model > i2.model) ? 1 : (i1.model < i2.model ? -1 : 0);
	self = null;
	return ret;
}

ResultsApp.prototype.compareItemsByMaker = function(i1, i2, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	console.log('compareItemsByMaker()');
	/*console.log('compareItemsByMaker: numSponsored = ' + self.numSponsored);
	if (self.numSponsored < self.maxSponsored && i1.sponsored && !i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return -1;
	}
	else if (self.numSponsored < self.maxSponsored && !i1.sponsored && i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return 1;
	}
	else*/
	ret = (i1.maker > i2.maker) ? 1 : (i1.maker < i2.maker ? -1 : 0);
	self = null;
	return ret;
}

ResultsApp.prototype.compareItemsByPrice = function(i1, i2, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	console.log('compareItemsByPrice()');
	//console.log('compareItemsByPrice: numSponsored = ' + self.numSponsored);
	p1 = i1.price;
	p2 = i2.price;
	/*if (self.numSponsored < self.maxSponsored && i1.sponsored && !i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return -1;
	}
	else if (self.numSponsored < self.maxSponsored && !i1.sponsored && i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return 1;
	}
	else*/
	ret = (p1 < p2) ? 1 : (p1 > p2 ? -1 : 0);
	console.log('p1 = ' + p1 + ', p2 = ' + p2 + ', ret = ' + ret);
	console.log('typeof p1 = ' + typeof p1);
	console.log('typeof p2 = ' + typeof p2);
	self = null;
	return ret;
}

ResultsApp.prototype.compareItemsByEval = function(i1, i2, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	console.log('compareItemsByEval()');
	/*console.log('compareItemsByEval: numSponsored = ' + self.numSponsored);
	if (self.numSponsored < self.maxSponsored && i1.sponsored && !i2.sponsored)
	{			
		self.numSponsored = self.numSponsored + 1;
		return -1;
	}
	else if (self.numSponsored < self.maxSponsored && !i1.sponsored && i2.sponsored)
	{
		self.numSponsored = self.numSponsored + 1;
		return 1;
	}
	else*/
	{
		e1 = parseInt(i1.eval);
		if (i1.abovebelow == 2 || i1.abovebelow == 4)
		{
			e1 = -e1;
		}
		e2 = parseInt(i2.eval);
		if (i2.abovebelow == 2 || i2.abovebelow == 4)
		{
			e2 = -e2;
		}
		//debugLine('compareItemsByEval: e1 = '+e1+', e2 = '+e2+', result=');
			
		if (isNaN(e1) && !isNaN(e2))
		{
			//debugLine('1');
			ret = 1;
		}
		else if (!isNaN(e1) && isNaN(e2))
		{
			//debugLine('-1');
			ret = -1;
		}
		else if (isNaN(e1) && isNaN(e2))
		{
			//debugLine('0');
			ret = 0;
		}
		else
		{
			//debugLine(((e1 < e2) ? 1 : (e1 > e2 ? -1 : 0)));
			ret = (e1 < e2) ? 1 : (e1 > e2 ? -1 : 0);
		}
	}
	self = null;
	return ret;
}

ResultsApp.prototype.slideIn = function(pageName, activePageName, containerName, callBack, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//window.alert('slideIn: callBack = ' + (typeof callBack !== 'undefined' ? callBack.toString() : '(undefined)'));
	var $activePage = $(activePageName);
	$activePage.animate({
		'margin-left': '-20%',
		'opacity': '0.0'
	}, 200, $.proxy(function(){
		$(activePageName).removeClass('active');
		var $page = $(pageName);
		$page.addClass('active').css({//'margin-left': '20%',
			'margin-left': 0,
			'opacity': '0.0'
		});
		/*if (self.viewType == self.ADVANCED_VIEW)
		{*/
			this.setupAdvancedViewHeights();
		/*}
		else
		{
			self.setupSimpleViewHeights(self);
		}*/
		
		$page.animate({//'margin-left': 0,
			'opacity': '1.0'
		}, 50, $.proxy(function(){
			if (typeof callBack !== 'undefined')
			{
				callBack();
			}
		}, this));
		$page = null;
	}, self));
}

ResultsApp.prototype.noAnimationSlideIn = function(pageName, activePageName, containerName, callBack, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $activePage = $(activePageName);
	$activePage.removeClass('active');
	$(pageName).addClass('active').css({
		'margin-left': 0,
		'opacity': '1.0'
	});
	/*if (self.viewType == self.ADVANCED_VIEW)
	{*/
		self.setupAdvancedViewHeights(self);
	/*}
	else
	{
		self.setupSimpleViewHeights(self);
	}*/
	if (typeof callBack !== 'undefined')
	{
		callBack();
	}
}

ResultsApp.prototype.sortData = function(sortFn, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('sortData('+sortFn.toString()+')');
	//debugLine('sortData: window.data.length = ' + window.data.length);
	self.sortedData = deepCopy(self.prepagedData);
	self.sortedData.sort(function(a, b) {
		return sortFn(a, b, self);
	});
	//debugLine('sortData: sortedData.length = ' + window.sortedData.length);
}

ResultsApp.prototype.sortFavoritesData = function(sortFn, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('sortFavoritesData('+sortFn.toString()+')');
	self.sortedFavoritesData = deepCopy(self.prepagedFavoritesData);
	self.sortedFavoritesData.sort(function(a, b) {
		return sortFn(a, b, self);
	});
	//debugLine('sortData: sortedFavoritesData.length = ' + window.sortedFavoritesData.length);
}

ResultsApp.prototype.sortSponsoredData = function(sortFn, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('sortData('+sortFn.toString()+')');
	//debugLine('sortData: window.data.length = ' + window.data.length);
	self.sortedSponsoredData = deepCopy(self.sponsoredData);
	self.sortedSponsoredData.sort(function(a, b) {
		return sortFn(a, b, self);
	});
	//debugLine('sortData: sortedData.length = ' + window.sortedData.length);
}

// range parameter syntax: "l [lower_limit] u [upper_limit]" (no spaces)
ResultsApp.prototype.applyRangeFilter = function(filterName, range, self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.debugLine('applyRangeFilter(' + filterName + ', ' + range + ')');
	if (typeof range !== 'undefined')
	{
		if (range == '*')
		{
			self.rangeFilters[filterName].active = false;
		}
		else
		{
			var match = range.match(/l(\d+)/);
			var lower = (match != null ? parseInt(match[1]) : -1);
			match = range.match(/u(\d+)/);
			var upper = (match != null ? parseInt(match[1]) : -1);
			//debugLine('applyPriceFilter() recognized lower = ' + lower + ' and upper = ' + upper);
			
			self.rangeFilters[filterName].active = true;
			self.rangeFilters[filterName].lower = lower;
			self.rangeFilters[filterName].upper = upper;
		}
	}
	else
	{
		self.rangeFilters[filterName].active = false;
	}
	self.refreshResultList(self);
	self.refreshFavoritesList(self);
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.createPager(0, self);
	}*/
}

ResultsApp.prototype.applySetFilter = function(filterName, setValue, remove, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var values = self.setFilters[filterName].values;
	var activeValues = self.setFilters[filterName].activeValues;
	//debugLine('applySetFilter('+filterName+','+setValue+','+remove+')');
	self.debugLine('activeValues before: ['+activeValues.toString() + ']');
	self.debugLine('activeValues.indexOf(' + values.indexOf(setValue) + ') = '
		+ activeValues.indexOf(values.indexOf(setValue)));
	if (remove)
	{
		if (activeValues.indexOf(values.indexOf(setValue)) != -1)
		{
			activeValues.splice(activeValues.indexOf(values.indexOf(setValue)), 1);
		}
	}
	else
	{
		if (activeValues.indexOf(values.indexOf(setValue)) == -1)
		{
			activeValues.push(values.indexOf(setValue));
		}
	}
	self.debugLine('activeValues after: ['+activeValues.toString() + ']');
	self.refreshResultList(self);
	self.refreshFavoritesList(self);
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.createPager(0, self);
	}*/
}

ResultsApp.prototype.applyRadioFilter = function(filterName, value, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('applyRadioFilter(' + filterName + ', ' + value + ')');
	self.radioFilters[filterName].activeValue = value;
	self.refreshResultList(self);
	self.refreshFavoritesList(self);
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.createPager(0, self);
	}*/
}

ResultsApp.prototype.setMenuTitle = function(menuId, newTitle, self)
{
	var self = typeof self === 'undefined' ? this : self;
	/*debugLine('SETMENUTITLE: menuId = ' + menuId
		+ ', newTitle = ' + newTitle);*/
	var groupClass = self.dropdownClassIds[self.viewType].groupClass;
	var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
	var html = (typeof newTitle == 'undefined'
			? self.menus[menuId].title // clear to default
			: newTitle // set it
		)
		+ ' <span class="caret"></span>';
	$(menuId).parents(groupClass).find(toggleClass).html(html);
}

ResultsApp.prototype.assignRadioMenuEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	$('.filter-radio-menu li:has(.ok-mark):not(.filter-all)').off('click').on('click', function(){
		var groupClass = self.dropdownClassIds[self.viewType].groupClass;
		var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
		var menuClass = self.dropdownClassIds[self.viewType].menuClass;
		// if not active, activate; if active, deactivate; update parent accordingly
		var checked = ($(this).find('.ok-mark').hasClass('checked'));
		
		var filterName = $(this).parents('.filter-radio-menu').data('filter');
		var filterValue = parseInt($(this).data('filter'));
		
		if (checked)
		{
			$(this).parents(groupClass).find(toggleClass).removeClass('checked');
			$(this).removeClass('checked');
			$(this).parent().find('.ok-mark').removeClass('checked');
			$(this).parent().find('li.filter-all').addClass('checked');
			$(this).parent().find('li.filter-all .ok-mark').addClass('checked');
			self.applyRadioFilter($(this).parents('.filter-radio-menu').data('filter'), undefined, self); // remove it
			self.decreaseNumberOfActiveFilters(self);
			self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'), undefined, self);
		}
		else
		{
			var parentWasChecked = $(this).parents(groupClass).find('li:not(.filter-all) .ok-mark.checked').length > 0;
			//debugLine('parentWaschecked = ' + parentWasChecked);
			$(this).parent().find('li').removeClass('checked');
			$(this).parent().find('.ok-mark').removeClass('checked');
			//self.removeAllRangeSliders($(this).parents(groupClass), self);
			//$(this).parents(groupClass).find('.filter-input-lower,.filter-input-upper').removeClass('checked');
			$(this).addClass('checked');
			$(this).find('.ok-mark').addClass('checked');
			$(this).parents(groupClass).find(toggleClass).addClass('checked');
			self.applyRadioFilter(filterName, filterValue, self);
			if (!parentWasChecked)
			{
				self.increaseNumberOfActiveFilters(self);
			}
			var menu = self.menus['#' + $(this).parents(menuClass).prop('id')];
			if (typeof menu !== 'undefined')
			{
				self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'),
					self.radioFilters[filterName].values[filterValue],
					self
				);
			}
		}
	});
	
	$('.filter-radio-menu .filter-all').off('click').on('click', function(){
		var groupClass = self.dropdownClassIds[self.viewType].groupClass;
		var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
		var menuClass = self.dropdownClassIds[self.viewType].menuClass;
		var $checked = $(this).parents(groupClass).find('li:not(.filter-all) .ok-mark.checked');
		if ($checked.length > 0)
		{
			$checked.removeClass('checked');
			$(this).parents(groupClass).find('li').removeClass('checked');
			self.decreaseNumberOfActiveFilters(self);
			self.applyRadioFilter($(this).parents('.filter-radio-menu').data('filter'), undefined, self); // remove it
			$(this).parents(groupClass).find(toggleClass).removeClass('checked');
			$(this).addClass('checked');
			$(this).find('.ok-mark').addClass('checked');
		}
		//self.removeAllRangeSliders($(this).parents(groupClass), self);
		self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'), undefined, self);
	});
}

ResultsApp.prototype.assignRangeMenuEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	$('.filter-range-menu li:has(.ok-mark):not(.special-menu-item,.filter-all)').off('click').on('click', function(){
		//self.debugLine('toolbar clicked item #' + $(this).index());
		
		var groupClass = self.dropdownClassIds[self.viewType].groupClass;
		var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
		var menuClass = self.dropdownClassIds[self.viewType].menuClass;
		// if not active, activate; if active, deactivate; update parent accordingly
		var checked = ($(this).find('.ok-mark').hasClass('checked'));
		
		//
		//<span class="caret"></span>
		if (checked)
		{
			$(this).parents(groupClass).find(toggleClass).removeClass('checked');
			$(this).parent().find('li').removeClass('checked');
			$(this).parent().find('.ok-mark').removeClass('checked');
			$(this).parent().find('li.filter-all').addClass('checked');
			$(this).parent().find('li.filter-all .ok-mark').addClass('checked');
			self.applyRangeFilter($(this).parents('.filter-range-menu').data('filter'), undefined, self); // remove it
			self.decreaseNumberOfActiveFilters(self);
			self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'), undefined, self);
		}
		else
		{
			var parentWasChecked = $(this).parents(groupClass).find('li:not(.filter-all) .ok-mark.checked').length > 0;
			//debugLine('parentWaschecked = ' + parentWasChecked);
			$(this).parent().find('li').removeClass('checked');
			$(this).parent().find('.ok-mark').removeClass('checked');
			self.removeAllRangeSliders($(this).parents(groupClass), self);
			//$(this).parents(groupClass).find('.filter-input-lower,.filter-input-upper').removeClass('checked');
			$(this).addClass('checked');
			$(this).find('.ok-mark').addClass('checked');
			$(this).parents(groupClass).find(toggleClass).addClass('checked');
			self.applyRangeFilter($(this).parents('.filter-range-menu').data('filter'), $(this).data('filter'), undefined, self);
			if (!parentWasChecked)
			{
				self.increaseNumberOfActiveFilters(self);
			}
			var menu = self.menus['#' + $(this).parents(menuClass).prop('id')];
			if (typeof menu !== 'undefined')
			{
				/*debugLine('CALLING FORMATRANGE(formFunc = ' + (typeof menu.formatFunction !== 'undefined' ? menu.formatFunction.toString() : '(undefined)')
					+ ')'
				);*/
				self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'),
					formatRange(
						$(this).data('filter'),
						menu.formatFunction,
						menu.formatFunctionAndLess,
						menu.formatFunctionAndMore,
						menu.formatFunctionAll
					),
					self
				);
			}
		}
	});
	
	$('.filter-range-menu .filter-all').off('click').on('click', function(){
		var groupClass = self.dropdownClassIds[self.viewType].groupClass;
		var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
		var menuClass = self.dropdownClassIds[self.viewType].menuClass;
		var $checked = $(this).parents(groupClass).find('li:not(.filter-all) .ok-mark.checked');
		if ($checked.length > 0)
		{
			$checked.removeClass('checked');
			$(this).parents(groupClass).find('li').removeClass('checked');
			self.decreaseNumberOfActiveFilters(self);
			self.applyRangeFilter($(this).parents('.filter-range-menu').data('filter'), undefined, self); // remove it
			$(this).parents(groupClass).find(toggleClass).removeClass('checked');
			$(this).addClass('checked');
			$(this).find('.ok-mark').addClass('checked');
		}
		self.removeAllRangeSliders($(this).parents(groupClass), self);
		self.setMenuTitle('#' + $(this).parents(menuClass).prop('id'), undefined, self);
	});
}

ResultsApp.prototype.assignSetMenuEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	$('.filter-set-menu li:has(.ok-mark)').off('click').on('click', function(evt, forceCheckState){
		//debugLine('toolbar clicked item #' + $(this).index());
		var groupClass = self.dropdownClassIds[self.viewType].groupClass;
		var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
		var menuClass = self.dropdownClassIds[self.viewType].menuClass;
		
		var wasActiveBefore = $(this).parents(groupClass).find('.ok-mark:not(.checked)').length > 0;
		
		// if not active, activate; if active, deactivate; update parent accordingly
		
		
		//debugLine('forceCheckState = ' + (typeof forceCheckState !== 'undefined' ? forceCheckState : '(undefined)'));
		if (typeof forceCheckState !== 'undefined')
		{
			if (forceCheckState)
			{
				$(this).addClass('checked');
				$(this).find('.ok-mark').addClass('checked');
				self.applySetFilter($(this).parents('.filter-set-menu').data('filter'),
					$(this).data('filter'), false, self);
			}
			else
			{
				$(this).removeClass('checked');
				$(this).find('.ok-mark').removeClass('checked');
				self.applySetFilter($(this).parents('.filter-set-menu').data('filter'),
					$(this).data('filter'), true, self); // remove it
			}
		}
		else
		{
			/*$(this).parent().find('.ok-mark').each(function(){
				window.alert($(this).outerHTML());
			});*/
			//$(this).parent().find('.ok-mark').removeClass('checked');
			/*$(this).parent().find('.ok-mark').each(function(){
				window.alert($(this).outerHTML());
			});*/
			var checked = ($(this).find('.ok-mark').hasClass('checked'));
			if (checked)
			{
				$(this).removeClass('checked');
				$(this).find('.ok-mark').removeClass('checked');
				self.applySetFilter($(this).parents('.filter-set-menu').data('filter'),
					$(this).data('filter'), true, self); // remove it
			}
			else
			{
				$(this).addClass('checked');
				$(this).find('.ok-mark').addClass('checked');
				self.applySetFilter($(this).parents('.filter-set-menu').data('filter'),
					$(this).data('filter'), false, self);
			}
		}
		// Mark the parent if *any* of the items are unchecked
		if ($(this).parents(groupClass).find('.ok-mark:not(.checked)').length > 0)
		{
			$(this).parents(groupClass).find(toggleClass).addClass('checked');
			if (!wasActiveBefore)
			{
				self.increaseNumberOfActiveFilters(self);
			}
		}
		else
		{
			$(this).parents(groupClass).find(toggleClass).removeClass('checked');
			if (wasActiveBefore)
			{
				self.decreaseNumberOfActiveFilters(self);
			}
		}
	});
}

ResultsApp.prototype.initFilters = function(viewType, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('self = ' + self);
	var groupClass = self.dropdownClassIds[self.viewType].groupClass;
	var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
	var menuClass = self.dropdownClassIds[self.viewType].menuClass;
	//debugLine('initFiltersAdvanced()');
	for (setFilterName in self.setFilters)
	{
		filter = self.setFilters[setFilterName];
		var $menu = $(filter.menuId);
		
		$menu.empty();
		$menu.append('<li id="' + filter.menuId.substring(1) + '-check-all-link"><a href="#">Ukljuci sve</a></li>');
		$menu.append('<li id="' + filter.menuId.substring(1) + '-uncheck-all-link"><a href="#">Iskljuci sve</a></li>');
		$menu.append('<li class="divider"></li>');
		for (value in filter.values)
		{
			$menu.append('<li data-filter="' + filter.values[value]
				+ '" class="checked"><a href="#"><span class="ok-mark checked">&nbsp;</span> '
				+ filter.values[value] + '</a></li>');
		}
		$(filter.menuId + '-check-all-link').off('click').on('click', function(){
			$(this).parents(groupClass).find('li:has(.ok-mark)').trigger('click', true);
		});
		$(filter.menuId + '-uncheck-all-link').off('click').on('click', function(){
			$(this).parents(groupClass).find('li:has(.ok-mark)').trigger('click', false);
		});
		
		
		//<li><a href="#">Test 2</a></li>
	}

	self.assignRangeMenuEvents(self);
	self.assignSetMenuEvents(self);
}

ResultsApp.prototype.clearNumberOfActiveFilters = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.numberOfActiveFilters = 0;
	$('#button-clear-filters-global').addClass('disabled');
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.switchToPage(0, true, self);
	}*/
	//debugLine('clearFilters: ACTIVEFILTERS = ' + window.numberOfActiveFilters);
}

ResultsApp.prototype.decreaseNumberOfActiveFilters = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.numberOfActiveFilters > 0)
	{
		self.numberOfActiveFilters = self.numberOfActiveFilters - 1;
	}
	if (self.numberOfActiveFilters == 0)
	{
		$('#button-clear-filters-global').addClass('disabled');
	}
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.switchToPage(0, true, self);
	}*/
	//debugLine('decreaseFilters: ACTIVEFILTERS = ' + window.numberOfActiveFilters);
}

ResultsApp.prototype.increaseNumberOfActiveFilters = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.numberOfActiveFilters = self.numberOfActiveFilters + 1;
	$('#button-clear-filters-global').removeClass('disabled');
	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		self.switchToPage(0, true, self);
	}*/
	//debugLine('increaseFilters: ACTIVEFILTERS = ' + window.numberOfActiveFilters);
}

ResultsApp.prototype.updateSliderLabels = function(evt, data, thisRef, formattedRange, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var groupClass = self.dropdownClassIds[self.viewType].groupClass;
	var toggleClass = self.dropdownClassIds[self.viewType].toggleClass;
	var filterWasActive = $(thisRef).parents(groupClass).find(toggleClass).hasClass('checked');
	$(thisRef).parents(groupClass).find(toggleClass).addClass('checked');
	$(thisRef).parents(groupClass).find('li').removeClass('checked');
	$(thisRef).parents(groupClass).find('.ok-mark').removeClass('checked');
	$(thisRef).parent().find('.range-slider-label-text').text(formattedRange).end()
		.find('.ok-mark').addClass('checked').end()
		.find('li').addClass('checked');
	if (!filterWasActive)
	{
		//debugLine('FILTER WAS NOT ACTIVE');
		self.increaseNumberOfActiveFilters(self);
	}
}

ResultsApp.prototype.buildRadioMenu = function($ul, filter, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var menuId = $ul.prop('id');

	if (typeof filter.values !== 'undefined')
	{
		/*console.log('buildRadioMenu: filter = ');
		console.log(filter);
		console.log(', values = ');
		console.log(filter.values);*/
		for (var value in filter.values)
		{
			var html = '<li data-filter="'
				+ value
				+ '"><a href="#"><span class="ok-mark">&nbsp;</span> '
				+ filter.values[value]
				+ '</a></li>';
			$ul.append(html);
		}
	}
	self.assignRadioMenuEvents(self);
}

ResultsApp.prototype.buildRangeMenu = function($ul, filter, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var menuId = $ul.prop('id');
	self.debugLine('buildRangeMenu(' + menuId + ', #' + $ul.prop('id') + '.' + $ul.prop('class') + ', ' + filter.toString());
	// clear and rebuild everything between the two dividers
	var $dividers = $ul.find('.divider');
	//debugLine('$dividers.length = ' + $dividers.length);
	self.debugLine('filter.lowest = ' + filter.lowest);
	self.debugLine('filter.highest = ' + filter.highest);
	var delta = filter.delta;

	/*console.log('buildRangeMenu: menuId = ' + menuId + ', filter = ');
	console.log(filter);*/
	if ($dividers.length > 1)
	{
		if (!filter.dynamic)
		{
			var $item = $dividers.eq(0);
			
			if (typeof filter.values !== 'undefined')
			{
				for (var value in filter.values)
				{
					var range = rangeToString(filter.values[value].low, filter.values[value].high);
					/*console.log('html += ... menuId = ' + menuId
						+ ', filter = ');
					console.log(filter);
					console.log(', ul = ');
					console.log($ul);*/
					var html = '<li data-filter="'
						+ range
						+ '"><a href="#"><span class="ok-mark">&nbsp;</span> '
						+ formatRange(
							range,
							self.menus['#' + menuId].formatFunction,
							self.menus['#' + menuId].formatFunctionAndLess,
							self.menus['#' + menuId].formatFunctionAndMore,
							self.menus['#' + menuId].formatFunctionAll)
						+ '</a></li>';
					$item.after(html);
					$item = $item.next();
				}
			}
			else // typeof filter.values !== 'undefined'
			{
				/*console.log('start = ' + filter.start + ', end = ' + filter.end
					+ ', delta = ' + delta
				);*/
				var currentValue = filter.start;
				while (currentValue <= filter.end)
				{
					//console.log('currentValue = ' + currentValue);
					var value = filter.valueGenFunction(currentValue);
					var range = rangeToString(value.low, value.high);
					var html = '<li data-filter="'
						+ range
						+ '"><a href="#"><span class="ok-mark">&nbsp;</span> '
						+ formatRange(
							range,
							self.menus['#' + menuId].formatFunction,
							self.menus['#' + menuId].formatFunctionAndLess,
							self.menus['#' + menuId].formatFunctionAndMore,
							self.menus['#' + menuId].formatFunctionAll)
						+ '</a></li>';
					$item.after(html);
					$item = $item.next();
					currentValue += delta;
				}
			} // typeof filter.values !== 'undefined'
		}
		else // !filter.dynamic
		{
			var $items = $dividers.eq(0).nextUntil('.divider');
			//debugLine('$items.length = ' + $items.length);
			var menu = self.menus['#' + menuId];
			$items.remove();
			
			if (typeof menu.maxItems !== 'undefined')
			{
				// determine is current delta giving more items than maxItems
				self.debugLine('Math.floor(filter.highest-filter.lowest / filter.delta) = '
					+ (Math.floor((filter.highest-filter.lowest) / filter.delta)));
				if (Math.floor((filter.highest-filter.lowest) / filter.delta) > menu.maxItems)
				{
					filter.delta = Math.floor((filter.highest-filter.lowest) / menu.maxItems);
					self.debugLine('not ok, new delta = ' + filter.delta);
					delta = filter.delta;
				}
			}
			
			var currentRangeStart = filter.lowest;
			/*debugLine('current = ' + currentRangeStart
				+ ', highest = ' + filter.highest
			);*/
			var $item = $dividers.eq(0);
			while (currentRangeStart < filter.highest)
			{
				if (typeof filter.valueGenFunction !== 'undefined')
				{
					var value = filter.valueGenFunction(currentRangeStart + delta);
					var range = rangeToString(value.low, value.high);
				}
				else
				{
					var range = buildRange(
						currentRangeStart,
						filter.lowest,
						currentRangeStart + delta,
						filter.highest
					);
				}
				var html = '<li data-filter="'
					+ range
					+ '"><a href="#"><span class="ok-mark">&nbsp;</span> '
					+ formatRange(
						range,
						self.menus['#' + menuId].formatFunction,
						self.menus['#' + menuId].formatFunctionAndLess,
						self.menus['#' + menuId].formatFunctionAndMore,
						self.menus['#' + menuId].formatFunctionAll)
					+ '</a></li>';
				$item.after(html);
				$item = $item.next();
				//debugLine('current = ' + currentRangeStart);
				//debugLine('html = {' + html + '}');
				currentRangeStart += delta;
			} // while
		} // !filter.dynamic
		self.assignRangeMenuEvents(self);
	} // $dividers.length > 1
}

ResultsApp.prototype.buildRangeSlider = function($obj, self)
{
	var self = typeof self === 'undefined' ? this : self;
	html = '<div class="range-slider-label">'
		+ '<span class="ok-mark">&nbsp;</span><span class="range-slider-label-text">&nbsp;</span>'
		+ '</div>'
		+ '<div class="range-slider">'
		+ '</div><!--range-slider-->';
	$obj.empty().html(html);
	var filter = self.rangeFilters[
		$obj.parents(self.dropdownClassIds[self.viewType].groupClass).data('filter')
	];
	
	var delta = filter.delta;
	if (!filter.dynamic && typeof filter.values !== 'undefined')
	{
		delta = (filter.highest-filter.lowest) / filter.values.length;
	}
	
	$obj.find('.range-slider')
		.rangeSlider({
			arrows: false,
			bounds: {
				min: filter.lowest,
				max: filter.highest
			},
			defaultValues: {
				min: filter.lowest + delta,
				max: filter.highest - delta
			},
			step: 1,
			valueLabels: 'hide'
		})
		.on('valuesChanging', function(evt, data) {
			self.updateSliderLabels(evt, data, this);
		})
		.off('click').on('click', function(evt) {
			var values = $(this).rangeSlider('values');
			var data = {
				values: values
			};
			//debugLine('CLICK! ACTIVE FILTERS = ' + window.numberOfActiveFilters);
			var bounds = $(this).rangeSlider('bounds');
			var boundsLow = bounds.min;
			var boundsHigh = bounds.max;
			var range = buildRange(data.values.min, boundsLow, data.values.max, boundsHigh);
			var menuId = '#' + $(this).parents(self.dropdownClassIds[self.viewType].menuClass).prop('id');
			var menu = self.menus[menuId];
			var formattedRange = formatRange(
				range,
				menu.formatFunction,
				menu.formatFunctionAndLess,
				menu.formatFunctionAndMore,
				menu.formatFunctionAll
			);
			self.updateSliderLabels(evt, data, this, formattedRange);
			self.applyRangeFilter($(this).parents('.filter-range-menu').data('filter'),
				range, self);
			self.setMenuTitle(menuId, formattedRange, self);
			//debugLine('ACTIVE FILTERS AFTER = ' + window.numberOfActiveFilters);
		})
		.on('valuesChanged', function(evt, data) {
			var bounds = $(this).rangeSlider('bounds');
			var boundsLow = bounds.min;
			var boundsHigh = bounds.max;
			var range = buildRange(data.values.min, boundsLow, data.values.max, boundsHigh);
			var menuId = '#' + $(this).parents(self.dropdownClassIds[self.viewType].menuClass).prop('id');
			if (range == '*')
			{
				// turn off filter
				$(menuId).find('.filter-all').trigger('click');
			}
			else
			{
				var menu = self.menus[menuId];
				var formattedRange = formatRange(
					range,
					menu.formatFunction,
					menu.formatFunctionAndLess,
					menu.formatFunctionAndMore,
					menu.formatFunctionAll
				);
				self.updateSliderLabels(evt, data, this, formattedRange);
				self.applyRangeFilter($(this).parents('.filter-range-menu').data('filter'),
					range, self);
				self.setMenuTitle(menuId, formattedRange, self);
			}
		});
	$obj.parents('.special-menu-item').removeClass('closed');
}

ResultsApp.prototype.removeAllRangeSliders = function($parentObj, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $obj = $(document);
	if (typeof $parentObj !== 'undefined')
	{
		$obj = $parentObj;
	}
	$obj.find('.range-slider-wrapper')
		.empty()
		.html('<a href="#">Proizvoljno...</a>')
		.parents('.special-menu-item').addClass('closed');
}

ResultsApp.prototype.resetEmailForm = function(closeForm, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $tr = $('#right-detail-seller-email').parent();
	var $form = $('#right-detail-email-form');
	var $link = $('#right-detail-email-link');
	var $arrow = $('#right-detail-seller-email .arrow');
	
	if (typeof closeForm === 'undefined')
	{
		closeForm = false;
	}
	
	$('#right-detail-email-form-message').val('');
	$('#right-detail-email-form-email').val('');
	$('#right-detail-email-form-phone').val('');
	
	$('#right-detail-email-form-phone').attr('placeholder', self.emailFormPhonePlaceholder[self.viewType]);
	
	$('input[type="text"],textarea').togglePlaceholder();
	
	if (closeForm)
	{
		$tr.removeClass('active');
		$form.removeClass('active');
		$link.removeClass('up').addClass('down');
		$arrow.removeClass('up').addClass('down');
	}
}

ResultsApp.prototype.toggleFilters = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $filterToolbar = $('#filter-toolbar-outer');
	var $favoritesToolbar = $('#favorites-toolbar');
	var filterToolbarActive = $filterToolbar.hasClass('active');
	
	
	/*console.log('filterToolbar = ');
	console.log($filterToolbar);
	console.log('filterToolbar[0] = ');
	console.log($filterToolbar[0]);
	console.log('************** filterToolbarActive = ' + filterToolbarActive);*/
	
	if (filterToolbarActive)
	{
		$filterToolbar
			.css({ opacity: '1.0' })
			.animate({ opacity: '0.0' }, self.toggleFiltersDelay, function() {
				$filterToolbar
					.removeClass('active')
					.css('opacity', '');
				$favoritesToolbar
					.css({ opacity: '0.0' })
					.addClass('active')
					.animate({ opacity: '1.0' }, self.toggleFiltersDelay, function() {
						$favoritesToolbar.css('opacity', '');
					});
			});
	}
	else
	{
		$favoritesToolbar
			.css({ opacity: '1.0' })
			.animate({ opacity: '0.0' }, self.toggleFiltersDelay, function() {
				$favoritesToolbar
					.removeClass('active')
					.css('opacity', '');
				$filterToolbar
					.css({ opacity: '0.0' })
					.addClass('active')
					.animate({ opacity: '1.0' }, self.toggleFiltersDelay, function() {
						$filterToolbar.css('opacity', '');
					});
			});
	}
}

ResultsApp.prototype.resetStickyTabs = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	//ResultsApp.prototype.unFixUpperBar = function(self, scrollTop, fixTitle, scrollingRight)
	$('#right-detail-inner').slimScroll({ scrollTo: '0' });
	/*$('#right-detail-tabs')
		.css('top', '')
		.removeClass('fixed');*/
		
	//self.unFixUpperBar(self, 0, self.upperBarShouldBeFixed(self), true);
}

ResultsApp.prototype.initInfoPopup = function(activate, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $info = $('#info');
	var $infoBg = $('#info-background');
	var $infoPopup = $('#info-popup');
	var $content = $('#content');
	var $bodyInner = $('#body-inner');
	
	
	if (typeof activate !== 'undefined' && activate)
	{
		$info.addClass('active');
		$infoBg.addClass('active');
		$infoPopup.addClass('active');
	}
	
	$info.removeClass('fixed');
	$infoBg
		.removeClass('fixed')
		.css({
			height: ''
		});
	$infoPopup.removeClass('fixed');
	$content.removeClass('info-on');
	$bodyInner.removeClass('info-on');

	if ($infoBg.outerHeight() < $infoPopup.outerHeight())
	{
		$info.addClass('fixed');
		$infoBg
			.addClass('fixed')
			.css({
				height: $infoPopup.outerHeight() + 'px'
			});
		$infoPopup.addClass('fixed');
		$content.addClass('info-on');
		$bodyInner.addClass('info-on');
	}

	// cleaning up for garbage collector
	$infobg = null;
	$info = null;
	$content = null;
	$bodyInner = null;
	self = null;
}

ResultsApp.prototype.queueServerDataAvailable = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret = self.addedItems < self.serverAvailableItems;
	self = null;
	return ret;
}

ResultsApp.prototype.init = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.sortFunction = self.compareItemsByPrice;
	$('#sort-menu').find('li').removeClass('checked');
	$('#sort-menu').find('.ok-mark').removeClass('checked');
	$('#menu-item-sort-price').parent().addClass('checked');
	$('#menu-item-sort-price').find('.ok-mark').addClass('checked');
	
	var hadSimple = $('#right-side-additional').parent().hasClass('simple');
	var hadActive = $('#right-side-additional').parent().hasClass('active');
	$('#right-side-additional').parent().addClass('simple active');
	//var additionalHeightPx = parseInt($(32).toPx({scope: $('#right-side-additional')}));
	//var relatedListHeight = parseInt($(36).toPx({scope: $('#right-side-additional')}))
	//	//$('#right-side-additional-related-list').outerHeight(true)
	//;
	var imgHeight = 250; // produces 0 height in Chrome, hard-coded
						 //$('#right-side-additional > img').outerHeight(true);
	var titleHeight = $('#right-side-additional > h4').outerHeight(true);
	var moreLinkHeight = $('#right-side-additional-related-more-link').outerHeight(true);
	/*self.debugLine('simpleviewfootermintop = 2 * imgHeight ['
		+ imgHeight + '] + titleHeight ['
		+ titleHeight + '] + relatedListheight ['
		//+ relatedListHeight + '] + moreLinkHeight ['
		+ moreLinkHeight + ']');*/
	self.simpleViewFooterMinTop = 2 * imgHeight + titleHeight //+ relatedListHeight
		+ moreLinkHeight;
	/*console.log('imgHeight = ' + imgHeight + ', relHeight = ' + relatedListHeight
		+ ', moreLinkHeight = ' + moreLinkHeight
		+ ', minTop = ' + window.simpleViewFooterMinTop);*/
	if (!hadSimple)
	{
		$('#right-side-additional').parent().removeClass('simple');
	}
	if (!hadActive)
	{
		$('#right-side-additional').parent().removeClass('active');
	}
	
	self.megaListTop = 0;
	self.megaListWidth = $('#left-list').width();
	self.advancedViewMegaListHeight = //hardFooterTop()
		$('body').height()
			- $('#menubar').height()
			- $('#left-list-tabs-outer').height()
			+ self.advancedViewMegaListHeightAdjust;
	/*console.log('4842: setting self.advancedViewMegaListHeight to ' + self.advancedViewMegaListHeight
		+ ' ($(\'body\').height() = ' + $('body').height()
		+ ', $(\'#menubar\').height() = ' + $('#menubar').height()
		//+ ', $(\'#left-list-tabs-outer\').position().top = ' + $('#left-list-tabs-outer').position().top
		+ ', $(\'#left-list-tabs-outer\').height() = ' + $('#left-list-tabs-outer').height()
		+ ', self.advancedViewMegaListHeightAdjust = ' + self.advancedViewMegaListHeightAdjust
		+ ')'
	);*/
	self.calculateSimpleViewHeight(self);
	
	$('#results-tab').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		if ($target.parent().hasClass('active')) return;
		this.activeTabIndex = 0;
		$target.parent().parent().children().removeClass('active');
		$target.parent().addClass('active');
		this.slideIn('#left-list', '#megalists .megalist.active', '#megalists');
		this.toggleFilters();
		this.setVehicleCountText(this.getAvailableResultsLength());
			//this.prepagedData.length + this.sponsoredData.length);
		$target = null;
		return false;
	}, self));
	$('#favorites-tab').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		if ($target.parent().hasClass('active')) return;
		this.activeTabIndex = 1;
		$target.parent().parent().children().removeClass('active');
		$target.parent().addClass('active');
		this.slideIn('#left-list-favorites', '#megalists .megalist.active', '#megalists');
		this.initializeFavoritesMegalist();
		this.toggleFilters();
		this.setVehicleCountText(this.getFavoritesLength());
		$target = null;
		return false;
	}, self));
	
	self.setupAdvancedViewHeights(self);
	$('#view-type-button-advanced').addClass('selected');

	$('#left-list')
		.off('scroll')
		.domlist({
			//dataCreate: self.createDataProvider,
			//dataCreateParam: self,
			//dataFormat: self.listItemLabelFunctionAdvanced,
			//dataFormatParam: self,
			onClick: self.listChangeHandler,
			onClickParam: self,
			onMouseOver: function(listIndex, evt, target, self) {
				//console.log('onMouseOver fired! target = ');
				//console.log(target);
				target.find('.megalist-car-name').addClass('hovered');
			},
			onMouseOut: function(listIndex, evt, target, self) {
				//console.log('onMouseOut fired! target = ');
				//console.log(target);
				target.find('.megalist-car-name').removeClass('hovered');
			},
			slimScrollShowSpeed: self.slimScrollShowSpeed,
			slimScrollHideSpeed: self.slimScrollHideSpeed,
			width: self.ssWidth[self.viewType] + 'px',
			height: $('#left-list').height(),
			itemHeight: self.listItemHeight
		})
		.on('scroll', $.proxy(function(evt) {
			//console.log('visible items:');
			//console.log($('#left-list').data('advlist').getVisibleItems());
			this.scrollRightSideBar(evt.target.scrollTop);
			if (this.barShouldBeFixed())
			{
				this.fixUpperBar(evt.target.scrollTop);
			}
			else
			{
				this.unFixUpperBar(evt.target.scrollTop);
			}
		}, self));
	
	$('#left-list').slimScroll({
		alwaysVisible: true,
		height: $(window).height()
			- ($('#topmenu-wrapper').height()
				+ $('#nav-tabs').height()) + 'px'
	});

	$('#left-list').slimScroll().bind('slimscroll', $.proxy(function(evt, pos) {
		//console.log('received slimscroll event; pos = ' + pos);
		//if (!this.scrolling)
		{
			this.scrolling = true;
			if (//$(window).scrollTop() + $(window).height() >= $('#timeline > ul').eq(0).height()
				pos == 'bottom'
				&& this.queueServerDataAvailable())
			{
				/*var type = $('#nav-tabs > .active').data('type');
				console.log('data(type) = ' + type);
				if (typeof type !== 'undefined')
				{
					this.addSpecificItem(type, this.addedItems);
				}
				else
				{*/
				this.addRandomItem('#left-list');
				/*}*/
				this.addedItems++;
				this.setupAdvancedViewHeights();
				$('#left-list').slimScroll({scrollTo: $('#left-list > ul').height() + 'px'});
			}
			/*console.log(
				'pos = ' + pos
				+ ', addedItems = ' + this.addedItems
				+ ', serverAvailableItems = ' + this.serverAvailableItems
				+ ', queueServerDataAvailable = ' + this.queueServerDataAvailable()
			);*/
			this.scrolling = false;
		}
		/*else
		{
			console.log('scrolling == true, doing nothing');
		}*/
	}, self));
	
	self.setVehicleCountText(self.getAvailableResultsLength());
	
	self.resultsMegalistInitialized = 1;
	if (!self.favoritesMegalistInitialized)
	{
		self.initializeFavoritesMegalist();
		self.favoritesMegalistInitialized = 1;
	}
	
	self.setupRightDetailScroll(false, undefined, self);
	
	$(window).on('resize', $.proxy(function(){
		if ($('#info').hasClass('active'))
		{
			this.initInfoPopup(false);
		}
		
		this.megaListTop = 0;
		this.megaListWidth = $('#left-side').width();
		
		this.advancedViewMegaListHeight = //hardFooterTop()
			$('body').height()
				- $('#menubar').height()
				- $('#left-list-tabs-outer').height()
				+ this.advancedViewMegaListHeightAdjust;
		/*console.log('4959: setting this.advancedViewMegaListHeight to ' + this.advancedViewMegaListHeight
			+ ' ($(\'body\').height() = ' + $('body').height()
			+ ', $(\'#menubar\').height() = ' + $('#menubar').height()
			//+ ', $(\'#left-list-tabs-outer\').position().top = ' + $('#left-list-tabs-outer').position().top
			+ ', $(\'#left-list-tabs-outer\').height() = ' + $('#left-list-tabs-outer').height()
			+ ', this.advancedViewMegaListHeightAdjust = ' + this.advancedViewMegaListHeightAdjust
			+ ')'
		);*/
		this.setupAdvancedViewHeights();

		$('#left-list').data('domlist').setHeight($('#left-list').height());
		$('#left-list-favorites').data('domlist').setHeight($('#left-list-favorites').height());

		this.setupRightDetailScroll(false, undefined);
	}, self));
	
	$('.favorite-link').on('click', $.proxy(function(){
	
		// TODO: add the HTML directly, likely through toHtml()
	
		if (!this.itemInFavorites(this.selectedItem.absoluteindex))
		{
			this.addItemToList('#left-list-favorites', this.selectedItem);
			this.unDimFavoriteLink();
		}
		else
		{
			this.removeSelectedFromFavorites();
			this.dimFavoriteLink();
		}
	
		/*if ((self.favorites.indexOf(self.displayedItemAbsoluteIndex) == -1) && (self.displayedItemFromTab == 1))
		{
			self.addToFavoritesDataOriginal(self.displayedItemAbsoluteIndex, self);
			self.unDimFavoriteLink(self);
			self.selectedFavoritesIndex = self.favorites.indexOf(self.displayedItemAbsoluteIndex);
			$('#left-list-favorites').data('advlist').refresh();
		}
		else if ((self.selectedFavoritesIndex != -1) && (self.displayedItemFromTab == 1))
		{
			var favoritesIndex = self.selectedFavoritesIndex;
			
			if (self.selectedFavoritesIndex != -1)
			{
				self.removeFromFavoritesDataNew(favoritesIndex);
				self.dimFavoriteLink();
				self.selectedFavoritesIndex = -1;
			}
		}
		else if ((this.selectedIndex != -1) && (this.displayedItemFromTab == 0))
		{
			var newIndex = self.favorites.indexOf(
				self.selectedIndex
			);
			if (newIndex == -1)
			{
				self.addToFavoritesDataOriginal(self.selectedIndex, self);
				self.unDimFavoriteLink(self);
			}
			else
			{
				self.removeFromFavoritesDataOriginal(self.selectedIndex, self);
				self.dimFavoriteLink(self);
			}
		}*/
	}, self));
	
	$('#view-type-button-advanced').on('click', $.proxy(function(){
		this.switchView(ResultsApp.prototype.ADVANCED_VIEW, undefined);
	}, self));
	$('#view-type-button-simple').on('click', $.proxy(function(){
		this.switchView(ResultsApp.prototype.SIMPLE_VIEW, undefined);
	}, self));
	
	$('#menu-item-sort-maker').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		this.sortFunction = this.compareItemsByMaker;
		this.refreshResultList();
		this.refreshFavoritesList();
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po proizvodjacu')
			.parent().addClass('checked');
		$target.parent().addClass('checked');
		$target.find('.ok-mark').addClass('checked');
	}, self));
	$('#menu-item-sort-model').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		this.sortFunction = this.compareItemsByModel;
		this.refreshResultList();
		this.refreshFavoritesList();
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po modelu')
			.parent().addClass('checked');
		$target.parent().addClass('checked');
		$target.find('.ok-mark').addClass('checked');
	}, self));
	$('#menu-item-sort-price').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		this.sortFunction = this.compareItemsByPrice;
		this.refreshResultList();
		this.refreshFavoritesList();
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po ceni')
			.parent().addClass('checked');
		$target.parent().addClass('checked');
		$target.find('.ok-mark').addClass('checked');
		$target = null;
	}, self));
	$('#menu-item-sort-eval').on('click', $.proxy(function(evt){
		var $target = $(evt.target);
		this.sortFunction = this.compareItemsByEval;
		this.refreshResultList();
		this.refreshFavoritesList();
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po proceni')
			.parent().addClass('checked');
		$target.parent().addClass('checked');
		$target.find('.ok-mark').addClass('checked');
		$target = null;
	}, self));
	
	$('#button-clear-favorites').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		
		this.dimFavoriteLink();
		// TODO: clear all favorites
		
		/*delete this.displayedFavoritesData;
		delete this.favoritesData;
		delete this.favorites;
		this.displayedFavoritesData = [];
		this.favoritesData = [];
		this.favorites = [];
		
		this.dimFavoriteLink();
		this.refreshResultList();
		this.refreshFavoritesList();*/
		//self.refreshRelatedList(self);
		return false;
	}, self));
	
	$('#right-detail-tabs [id$=-tab]').off('click').on('click', $.proxy(function(event, callBack){
		var $target = $(event.target);
		if ($target.parent().hasClass('active'))
		{
			if (typeof callBack !== 'undefined')
			{
				callBack();
			}
			return;
		}
		$('#right-detail-tabs').children().removeClass('active');
		$target.parent().addClass('active');
		//self.resetStickyTabs(self);
		//$('#right-detail-inner').slimScroll({ scrollTo: 0 });
		this.scrollRightSideBar(0, true);
		var tabName = $target.prop('id').match(/(.+)-tab/)[1];
		this.slideIn('#'+tabName+'-page', '#right-detail-content > .active', '#right-detail-content', callBack);
		$target = null;
	}, self));
	
	$('#back-to-list-button').off('click').on('click', $.proxy(function(evt){
		if (this.viewType == ResultsApp.prototype.SIMPLE_VIEW)
		{
			this.simpleViewHideRightSideDetail();
		}
	}, self));
	
	self.checkPopulateResultList('#left-list', self);
	//self.checkPopulateResultList('#left-list-favorites', self);
	
	self.initFilters(ResultsApp.prototype.ADVANCED_VIEW, self);
	for (filterName in self.radioFilters)
	{
		//console.log('calling buildRadioMenu for filterName = ' + filterName);
		self.buildRadioMenu(
			$('#filter-toolbar div[data-filter="' + filterName + '"]')
				.find('ul' + self.dropdownClassIds[self.viewType].menuClass),
			self.radioFilters[filterName],
			self
		);
	}
	for (filterName in self.rangeFilters)
	{
		//console.log('calling buildRangeMenu for filterName = ' + filterName);
		self.buildRangeMenu(
			$('#filter-toolbar div[data-filter="' + filterName + '"]')
				.find('ul' + self.dropdownClassIds[self.viewType].menuClass),
			self.rangeFilters[filterName],
			self
		);
	}
	
	$('.special-menu-item').off('click').on('click', function(evt){
		evt.stopPropagation();
	});
	
	$('#button-clear-filters-global').off('click').on('click', $.proxy(function(){
		var groupClass = this.dropdownClassIds[this.viewType].groupClass;
		var toggleClass = this.dropdownClassIds[this.viewType].toggleClass;
		$('#filter-toolbar .checked').removeClass('checked');
		$('#filter-toolbar .filter-all').addClass('checked');
		$('#filter-toolbar .filter-all .ok-mark').addClass('checked');
		this.removeAllRangeSliders(undefined);
		for (filter in this.rangeFilters)
		{
			this.rangeFilters[filter].active = false;
		}
		for (filter in this.setFilters)
		{
			/*var ie = getInternetExplorerVersion();
			if (ie > 8)
			{*/
				delete this.setFilters[filter].activeValues;
			/*}
			else
			{
				window.setFilters[filter].activeValues = undefined;
			}*/
			this.setFilters[filter].activeValues = [];
			for (i = 0; i < this.setFilters[filter].values.length; i++)
			{
				this.setFilters[filter].activeValues.push(i);
			}
			$('#filter-toolbar .filter-set-menu[data-filter="' + filter + '"] li').addClass('checked');
			$('#filter-toolbar .filter-set-menu[data-filter="' + filter + '"] .ok-mark').addClass('checked');
		}
		for (filter in this.radioFilters)
		{
			this.radioFilters[filter].activeValue = undefined;
		}

		this.refreshResultList();
		this.refreshFavoritesList();
		this.clearNumberOfActiveFilters();
		var self = this;
		$('#filter-toolbar ' + this.dropdownClassIds[this.viewType].menuClass).each(
			function(idx, menu) {
				var id = $(menu).prop('id');
				if (id.length > 0)
				{
					self.setMenuTitle('#' + id, undefined, self);
				}
			}
		);
		self = null;
	}, self));

	$('.range-slider-wrapper').off('click').on('click', $.proxy(function(evt){
		var $target = $(evt.target)[0].hasClass('range-slider-wrapper') ? $(evt.target) : $(evt.target).closest('.range-slider-wrapper');
		if ($target.find('.range-slider').length > 0)
		{
			self.removeAllRangeSliders($target);
		}
		else
		{
			this.buildRangeSlider($target);
		}
		$target = null;
	}, self));
	
	$('.filter-range-menu').on('show', function(){
		var $rangeSlider = $(this).find('.range-slider');
		if ($rangeSlider.length > 0)
		{
			$rangeSlider.rangeSlider('resize');
		}
		$rangeSlider = null;
	});
	
	$(document).on('click', '.right-detail-main > img', $.proxy(function(evt) {
		this.initInfoPopup(true);
		
		imagePopup();
		$('.info-main').trigger('slideTo', 0).trigger('finish');
		$('.info-nav-thumbs').trigger('slideTo', 0).trigger('finish');
		$('.info-main img').each(function(){
			//var $target = $(evt.target)[0].nodeName.toLowerCase() == 'img' ? $(evt.target).closest('img') : $(evt.target);
			var $target = $(this);
			$('.info-main').trigger('removeItem', $target);
			$target = null;
		});
		$('.info-nav-thumbs img').each(function(){
			var $target = $(this);
			$('.info-nav-thumbs').trigger('removeItem', $target);
			$target = null;
		});
		var values = [];
		var thvalues = [];
		$('.right-detail-main img').each(function() {
			var $target = $(this);
			values.push({
				i: parseInt($target.prop('id').substring(1)),
				url: $target.prop('src')
			});
			$target = null;
		});
		$('.right-detail-nav-thumbs img').each(function() {
			var $target = $(this);
			thvalues.push({
				i: parseInt($target.prop('id').substring(2)),
				url: $target.prop('src')
			});
			$target = null;
		});
		values.sort(function (val1, val2) {
			return val1 < val2 ? -1 : (val1 != val2 ? 1 : 0);
		});
		thvalues.sort(function (val1, val2) {
			return val1 < val2 ? -1 : (val1 != val2 ? 1 : 0);
		});
		for (val in values)
		{
			$('.info-main').trigger('insertItem', [0, '<img src="'+values[val].url+'" id="p'+zeroes(values[val].i)+'"  />']);
		}
		for (val in thvalues)
		{
			$('.info-nav-thumbs').trigger('insertItem', [0, '<img src="'+thvalues[val].url+'" id="th'+zeroes(thvalues[val].i)+'" />']);
		}
		$('.info-main').trigger('slideTo', 0).trigger('finish');
		$('.info-nav-thumbs').trigger('slideTo', 0).trigger('finish');
		imagePopup();
	}, self));
	$('.right-detail-main-magnifier').off('click').on('click', function() {
		var $current = $('.right-detail-main').triggerHandler('currentVisible');
		$current.trigger('click');
		$current = null;
	});
	$('#info .close .btn').off('click').on('click', function() {
		$('#info').removeClass('active');
		$('#info-background').removeClass('active');
		$('#info-popup').removeClass('active');
		$('#content').removeClass('info-on');
		$('#body-inner').removeClass('info-on');
	});
	$('#info-background').off('click').on('click', function() {
		$('#info .close .btn').trigger('click');
	});
	//$('.slimScrollBar').css('border-radius', 'none');

	$('#right-detail-seller-email').off('mouseover').on('mouseover', function(evt) {
		evt.stopPropagation();
		$('#right-detail-email-link').addClass('hovered');
		return false;
	});
	$('#right-detail-seller-email').off('mouseout').on('mouseout', function(evt) {
		evt.stopPropagation();
		$('#right-detail-email-link').removeClass('hovered');
		return false;
	});
	$('#right-detail-seller-email').off('click').on('click', function(evt) {
		evt.stopPropagation();
		$('#right-detail-email-link').trigger('click');
		return false;
	});
	
	$('#right-detail-email-link').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $target = $('#right-detail-email-link');
		var $form = $('#right-detail-email-form');
		var $arrow = $('#right-detail-seller-email .arrow');
		var formActive = $form.hasClass('active');
		var formHeight;
		
		if (this.rightDetailEmailAnimating)
		{
			return false;
		}
		
		this.rightDetailEmailAnimating = true;
		$arrow.toggleClass('up down');
		if (formActive)
		{
			formHeight = $form.height();
			$form.animate({'height': '0'}, this.emailFormRevealSpeed, $.proxy(function() {
				var $target = $('#right-detail-email-link');
				var $form = $('#right-detail-email-form');
				$form
					.removeClass('active')
					.css('height', formHeight + 'px')
					;
				$target.parent().parent().removeClass('active');
				this.rightDetailEmailAnimating = false;
				$target = null;
				$form = null;
			}, this));
		}
		else
		{
			$form.addClass('active');
			formHeight = $form.height();
			$target.parent().parent().addClass('active');
			$form
				.css('height', '0')
				.animate({'height': formHeight + 'px'}, this.emailFormRevealSpeed, $.proxy(function() {
					var $target = $('#right-detail-email-link');
					var $form = $('#right-detail-email-form');
					this.rightDetailEmailAnimating = false;
					$target = null;
					$form = null;
				}, this));
		}
		$target = null;
		$form = null;
		return false;
	}, self));
	
	$('#more-filters-link').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $target = $('#more-filters-link');
		var $filters = $('#toolbar-additional-filters');
		var $filterToolbar = $('#filter-toolbar');
		var filtersActive = $filters.hasClass('active');
		var filtersHeight = this.additionalFiltersHeight;
		
		console.log('more-filters-link.onClick: animating = ' + this.moreFiltersAnimating);
		if (this.moreFiltersAnimating)
		{
			return false;
		}
		
		this.moreFiltersAnimating = true;
		$target
			.text(filtersActive ? 'Jos filtera' : 'Manje filtera')
			.next().toggleClass('up down');
		$target = null;
		
		if (filtersActive)
		{
			//filtersHeight = $filters.height();
			$filters
				.addClass('animating')
				.animate({
					height: '0',
					'min-height': '0'
				}, this.filtersRevealSpeed, $.proxy(function() {
				$filters
					.removeClass('active animating')
					.css('height', filtersHeight + 'px')
					.css('min-height', '')
					;
				$.when(
					$('#filter-toolbar')
						.slimScroll({ scrollTo: '0' })
				).done($.proxy(function() {
					//$filterToolbar.trigger('mouseover');
					$filterToolbar = null;
					this.moreFiltersAnimating = false;
					// garbage collector
					$filters = null;
				}, this));
			}, this));
		}
		else
		{
			//$filterToolbar.addClass('mouseover');
			$filters.addClass('active animating');
			//filtersHeight = $filters.height();
			$filters
				.css('height', '0')
				.css('min-height', '0');
			//blargh();
			$filters.animate({
				height: filtersHeight + 'px',
				'min-height': filtersHeight + 'px'
			}, this.filtersRevealSpeed, $.proxy(function() {
					$filters.removeClass('animating');
					$.when(
						$('#filter-toolbar')
							.slimScroll({
								scrollTo: $('#filter-toolbar').height() + 'px',
								forceOverPanel: true
							})
					).done($.proxy(function() {
						$filters.finish();
						this.moreFiltersAnimating = false;
						// garbage collector
						$filters = null;
						$filterToolbar = null;
					}, this));
				}, this));
		}
		return false;
	}, self));
	/*if (!self.filterToolbarMouseOutSet)
	{
		$('#filter-toolbar')
			.on('mouseout', function() {
				if (!self.moreFiltersAnimating)
				{
					$(this).removeClass('mouseover');
				}
			});
		self.filterToolbarMouseOutSet = true;
	}*/
	
	$('#filter-toolbar')
		.off('scroll')
		.slimScroll({
			width: '142px',
			showSpeed: self.slimScrollShowSpeed,
			hideSpeed: self.slimScrollHideSpeed,
			height: self.advancedViewMegaListHeight
				//- $('#left-list-tabs-outer').height()
				- self.filterToolbarHeightAdjust + 'px'
			//$('#filter-toolbar-outer').height() + 'px'
		})
		.on('scroll', $.proxy(function(evt) {
			if (this.barShouldBeFixed())
			{
				this.fixUpperBar(evt.target.scrollTop);
			}
			else
			{
				this.unFixUpperBar(evt.target.scrollTop);
			}
		}, self));
	
	/*$('#filter-toolbar').css({
		height: self.advancedViewMegaListHeight - self.filterToolbarHeightAdjust + 'px'
	});*/
	
	$('#right-detail-email-form-message-counter').html(self.emailFormMessageLength);
	
	$('#right-detail-email-form-message').simplyCountable({
		counter: '#right-detail-email-form-message-counter',
		maxCount: self.emailFormMessageLength
	});
	
	$('#right-detail-inner-right .btn.close').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if (this.viewType == ResultsApp.prototype.ADVANCED_VIEW)
		{
			this.advancedViewHideRightSideDetail();
		}
		else if (this.viewType == ResultsApp.prototype.SIMPLE_VIEW)
		{
			this.simpleViewHideRightSideDetail();
		}
		return false;
	}, self));
	
	self = null;
}

$(document).ready(function(){
	var results = new ResultsApp();
	results.init(results);
	results.switchView(ResultsApp.prototype.ADVANCED_VIEW, undefined, results);
});
