function ServicesApp()
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
	this.switchViewMapAnimationDelay = 150;
	this.toggleFiltersDelay = 300;
	this.emailFormMessageLength = 9 * 20;
	
	this.defaultLeftMapZoom = 8;
	this.defaultDetailsMapZoom = 13;

	this.mapsEnabled = true;

	this.slimScrollShowSpeed = 0;
	this.slimScrollHideSpeed = 0;
	
	this.markerFallingDistance = 100;
	this.markerFallingSpeed = 800;
	
	this.mapCanvasPadding = 10;

	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.noScoreText = 'nije ocenjen';
	 
	// Filter types
	this.FT_RANGE = 0;
	this.FT_SET = 1;
	this.FT_RADIO = 2;

	// Koriscena
	this.K_NOVA = 0;
	this.K_POLOVNA = 1;
	
	// Karoserija
	this.K_LIMUZINA = 0;
	this.K_HECBEK = 1;
	this.K_KUPE = 2;
	this.K_KARAVAN = 3;
	this.K_KABRIOLET = 4;
	this.K_MINIVAN = 5;
	this.K_DZIP = 6;
	this.K_PICKUP = 7;

	// Gorivo
	this.G_BENZIN = 0;
	this.G_DIZEL = 1;
	this.G_BENZINGAS = 2;
	this.G_METAN = 3;
	this.G_ELEKPOGON = 4;
	this.G_HIBRPOGON = 5;

	this.viewType = ServicesApp.prototype.ADVANCED_VIEW;        // 0 = Advanced, 1 = Simple
	this.activeTabIndex = ServicesApp.prototype.RESULTS_TAB;
	this.selectedIndex = -1;                   // Selected item in results list
	this.selectedFavoritesIndex = -1;          // Selected item in favorites list
	this.selectedDisplayedIndex = -1;          // Selected item in displayed part of results list
	this.selectedDisplayedFavoritesIndex = -1; // Selected item in displayed part of favorites list
	//this.selectedRelatedIndex = -1;            // Selected item in related items list
	this.displayedItemFromTab = -1;            // Which tab the currently selected item originates from
												// 0 = Results, 1 = Favorites, 2 = Related items list (exception)
	this.displayedItemDisplayedIndex = -1;		// Actual index of the selected item in the displayed part of results list
	this.displayedItemAbsoluteIndex = -1;		// Actual index of the selected item in the results list
												
												

	this.leftMapMarkers = [];
	this.leftFavoritesMapMarkers = [];
	this.detailsMapMarkers = [];
	this.detailsFavoritesMapMarkers = [];
												
	this.megaListTop = 0;
	this.megaListWidth = 0;
	this.advancedViewMegaListHeight = 0;
	this.simpleViewMegaListHeight = 0;
	this.simpleViewFooterMinTop = 0;
	this.advancedViewMegaListHeightAdjust = -10;
	
	this.rightDetailTitleHeight = 0;

	//this.leftSideMegalistWidth = '460px';
	this.ssWidth = [433, 678, 433];
	this.megalistWidth = [427, 667, 427];
	this.leftSideWidth = [567, 807, 567];
	this.megalistLIWidth = [415, 655, 415];

	this.filterToolbarHeightAdjust = 0;
	this.rightDetailHeightAdjust = [0, 0]; // + 10;
	this.rightDetailInnerHeightAdjust = [51, 51]; // + 10;
	//this.rightDetailHeightAdjust = [17, 17, 17];// + 10;
	this.rightSideHeightAdjust = 10;
	
	this.additionalFiltersHeight = 310;
	
	this.data = [];
	this.favorites = [];
	this.favoritesData = [];
	this.sortedData = [];
	this.sortedFavoritesData = [];
	this.prepagedData = [];
	this.prepagedFavoritesData = [];
	this.displayedData = [];
	this.displayedFavoritesData = [];
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
	this.emailFormPhonePlaceholder[this.ADVANCED_VIEW] = 'Vas telefon (opc.)';
	this.emailFormPhonePlaceholder[this.SIMPLE_VIEW] = 'Vas broj telefona (opciono)';
	this.emailFormPhonePlaceholder[this.MAP_VIEW] = 'Vas telefon (opc.)';

	this.dropdownClassIds = {};
	this.dropdownClassIds[this.ADVANCED_VIEW] = {
		toggleClass: '.dropdown-toggle',
		groupClass: '.btn-group',
		menuClass: '.dropdown-menu'
	};
	this.dropdownClassIds[this.SIMPLE_VIEW] = {
		toggleClass: '.dropdown-toggle',
		groupClass: '.btn-group',
		menuClass: '.dropdown-menu'
		/*toggleClass: '.accordion-toggle',
		groupClass: '.accordion-group',
		menuClass: '.btn-group-vertical'*/
	};
	this.dropdownClassIds[this.MAP_VIEW] = {
		toggleClass: '.dropdown-toggle',
		groupClass: '.btn-group',
		menuClass: '.dropdown-menu'
	};
		
	// Filters
	this.rangeFilters = {
		/*year: {
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
		},*/
		score: {
			active: false,
			dynamic: true,
			upper: -1,
			lowest: 0,
			highest: 5,
			delta: 1,
			valueGenFunction: function(val) {
				return { high: val };
			},
			evalFunction: function(company, self) {
				var self = typeof self === 'undefined' ? this : self;
				var ret = self.getAverageScore(company.scores);
				self = null;
				return ret;
			}
		},
		distance: {
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
		/*'seller.address.city': {
			menuId: '#filter-city-menu',
			values: [],
			activeValues: []
		}*/
	};
	this.radioFilters = {
		/*used: {
			dynamic: false,
			values: [
				'Nova',
				'Polovna'
			],
			activeValue: undefined
		},*/
		maker: {
			dynamic: true,
			values: [],
			activeValue: undefined
		},
		type: {
			dynamic: true,
			values: [],
			activeValue: undefined
		},
		subtype: {
			dynamic: true,
			values: [],
			activeValue: undefined
		}
		/*model: {
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
		}*/
	};

	this.numberOfActiveFilters = 0;

	this.menus = {
		'#filter-company-type-menu': {
			filterType: this.FT_RADIO,
			filterName: 'type',
			title: 'Delatnost'
		},
		'#filter-company-subtype-menu': {
			filterType: this.FT_RADIO,
			filterName: 'subtype',
			title: 'Poddelatnost'
		},
		'#filter-brand-menu': {
			filterType: this.FT_RADIO,
			filterName: 'maker',
			title: 'Marka'
		},
		'#filter-score-menu': {
			filterType: this.FT_RANGE,
			filterName: 'score',
			title: 'Ocena',
			formatFunctionAndLess: function(val) {
				return 'do ' + val;
			},
			formatFunctionAndMore: function(val) {
				return val + ' i vise';
			},
			formatFunctionAll: function() {
				return 'Sve ocene';
			}
		},
		'#filter-distance-menu': {
			filterType: this.FT_RANGE,
			filterName: 'distance',
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

// Views
ServicesApp.prototype.ADVANCED_VIEW = 0;
ServicesApp.prototype.SIMPLE_VIEW = 1;

// Lists
ServicesApp.prototype.RESULTS_LIST = 0;
ServicesApp.prototype.FAVORITES_LIST = 1;
ServicesApp.prototype.Lists = [
	ServicesApp.prototype.RESULTS_LIST,
	ServicesApp.prototype.FAVORITES_LIST
];

// Tabs
ServicesApp.prototype.RESULTS_TAB = 0;
ServicesApp.prototype.FAVORITES_TAB = 1;
ServicesApp.prototype.Tabs = [
	ServicesApp.prototype.RESULTS_TAB,
	ServicesApp.prototype.FAVORITES_TAB
];

ServicesApp.prototype.evalImage = function(aboveBelow)
{
	var ret = '';
	switch (aboveBelow)
	{
		case 1:
			ret = '<div class="eval-icon above">U</div>';
			//ret = '<img src="img/abovearrow.png" class="eval-arrow" />';
			break;
		case 2:
			ret = '<div class="eval-icon below">D</div>';
			//ret = '<img src="img/belowarrow.png" class="eval-arrow" />';
			break;
		case 3:
			ret = '<div class="eval-icon near-above">U</div>';
			break;
		case 4:
			ret = '<div class="eval-icon near-below">D</div>';
			break;
		default:
			ret = '';//'<img src="img/nochangearrow.png" class="eval-arrow" />';
			break;
	}
	return ret;
}

ServicesApp.prototype.getAverageScore = function(scores)
{
	var sum = 0;
	var numScores = 0;
	
	if (typeof scores.quality !== 'undefined')
	{ 
		sum += scores.quality;
		numScores++;
	}
	if (typeof scores.pricing !== 'undefined')
	{ 
		sum += scores.pricing;
		numScores++;
	}
	if (typeof scores.speed !== 'undefined')
	{ 
		sum += scores.speed;
		numScores++;
	}
	if (typeof scores.politeness !== 'undefined')
	{ 
		sum += scores.politeness;
		numScores++;
	}
	if (numScores > 0)
	{
		return sum / numScores;
	}
	else
	{
		return 0;
	}
}

ServicesApp.prototype.setCompanyCountText = function(count)
{
	$('#result-count-text').html(count.toString() + ' ' + formatCompanyCountText(count));
}

ServicesApp.prototype.rightSideTabBarShouldBeFixed = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('rightSideTabBarShouldBeFixed: $(\'#right-detail-inner\')[0].scrollTop = '
		+ $('#right-detail-inner')[0].scrollTop
		+ ', self.rightDetailTitleHeight = ' + self.rightDetailTitleHeight
	);*/
	
	var ret =
		($('#right-detail-inner')[0].scrollTop > self.rightDetailTitleHeight + 1);
		
	return ret;
}

ServicesApp.prototype.barShouldBeFixed = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
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

ServicesApp.prototype.scrollRightSideBar = function(scrollTop, scrollingRight, self)
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
}

ServicesApp.prototype.setBarWidths = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var simpleViewRightSideActive = self.viewType == self.SIMPLE_VIEW && $('#right-side').hasClass('active');
	var fixed = self.barShouldBeFixed(self);
	var rightTabFixed = $('#right-detail-tabs-outer').hasClass('fixed');
	
	if (rightTabFixed)
	{
		if (self.viewType == self.SIMPLE_VIEW)
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
		if (self.viewType == self.SIMPLE_VIEW)
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
		if (self.viewType == self.SIMPLE_VIEW)
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
}

ServicesApp.prototype.fixUpperBar = function(scrollTop, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*console.log('fixUpperBar(scrollTop = '+scrollTop
		+ ', self.rightSideTabBarShouldBeFixed(self) = ' + self.rightSideTabBarShouldBeFixed(self)
		+')'
	);*/

	if (self.viewType == ServicesApp.prototype.ADVANCED_VIEW)
	{
		$('#left-list-tabs-outer')
			.addClass('fixed');
	}
	else
	{
		if ($('#right-side').hasClass('active'))
		{
			$('#left-list-tabs-outer')
				.addClass('fixed')
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
	self.setBarWidths(self);
}

ServicesApp.prototype.unFixUpperBar = function(scrollTop, self)
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

	self.setBarWidths(self);
}

ServicesApp.prototype.setupRightDetailScroll = function(makeVisible, forceOverPanel, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//debugLine('setupRightDetailScroll('+makeVisible+')');
	var detail;
	var forceOverPanel = typeof forceOverPanel !== 'undefined' ? forceOverPanel : false;
	
	if (makeVisible && !self.preventShowingRightDetailOverride)
	{
		$('#right-side')/*.css({
			visibility: 'visible'
		})*/.addClass('active');
		/*$('#right-detail').css({
			visibility: 'visible'
		}).addClass('active');*/
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
		})*/;
		$('#right-detail-tabs-outer')
			.removeClass('fixed')
			.css({ top: '' });
		//self.scrollRightSideBar(0, true);
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
	//console.log('calling slimScroll() on \'#' + $element.prop('id') + '.' + $element.prop('class') + '\'');
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

	self.setBarWidths(//self.barShouldBeFixed(self),
		self);
	self.justifyRightSideTabs(self);
	self.scrollRightSideBar(0, true);
	//self.unFixUpperBar(0, self);
	//self.resetStickyTabs(self);
	
	//console.log('737: /////////////// scrollTop = ' + $element.scrollTop());
	
	$element.on('scroll', $.proxy(function(evt) {
		var $title = $('#right-detail-title');
		var $tabs = $('#right-detail-tabs-outer');

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
}

ServicesApp.prototype.justifyRightSideTabs = function(self)
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
}

ServicesApp.prototype.simulateListClick = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('simulateListClick()');
	//var event = new Object;
	var selected = null;
	var selectedIndex = -1;
	if (self.displayedItemFromTab == ServicesApp.prototype.RESULTS_TAB)
	{
		selected = self.displayedData[self.selectedDisplayedIndex];
		selectedIndex = self.selectedDisplayedIndex;
		self.listChangeHandler(selected, selectedIndex, undefined);
	}
	else if (self.displayedItemFromTab == ServicesApp.prototype.FAVORITES_TAB)
	{
		selected = self.displayedFavoritesData[self.selectedFavoritesIndex];
		selectedIndex = self.selectedDisplayedFavoritesIndex;
		self.listChangeHandler(selected, selectedIndex, undefined);
	}
	/*else if (self.displayedItemFromTab == 2)
	{
		//selected = window.related[window.selectedRelatedIndex];
		//selectedIndex = window.selectedRelatedIndex;
	}*/
	else
	{
		// Before any real user clicks - abort
		return;
	}
}

ServicesApp.prototype.dimFavoriteLink = function()
{
	$('.favorite-link')
		.addClass('dimmed blue')
		.removeClass('gray');
	$('.favorite-link').html('Sačuvaj');
}

ServicesApp.prototype.unDimFavoriteLink = function()
{
	$('.favorite-link')
		.removeClass('dimmed blue')
		.addClass('gray');
	$('.favorite-link').html('Ukloni iz sačuvanih');
}

ServicesApp.prototype.listToDetailTable = function(rowId, rowTitle, aList, callBack)
{
	var $row = $('#' + rowId);
	$row.empty();
	var $others = $('[id^=' + rowId + '-]:not([id*=-data-])');
	$others.remove();
	
	//function(obj, rowId, rowIdSuffix) {
	
	if (typeof callBack !== 'undefined')
	{
		$row.html(callBack(aList[0], rowId));
		newHtml = '';
		for (i = 1; i < aList.length; i++)
		{
			newHtml += callBack(aList[i], rowId, '-' + zeroes(i));
		}
		$row.after(newHtml);
	}
	else
	{
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
	
	// garbage collector
	$row = null;
	$others = null;
}

ServicesApp.prototype.advancedViewShowRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.preventShowingRightDetailOverride) return;
	$('#right-side')
		/*.css({
			'visibility': 'visible'
		})*/
		.addClass('active');
	/*$('#right-detail')
		.css({
			'visibility': 'visible'
		})
		.addClass('active');*/
	self = null;
}

ServicesApp.prototype.advancedViewHideRightSideDetail = function()
{
	$('#right-side')
		/*.css({
			'visibility': 'hidden'
		})*/
		.removeClass('active');
	/*$('#right-detail')
		.css({
			'visibility': 'hidden'
		})
		.removeClass('active');*/
}

ServicesApp.prototype.simpleViewShowRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.preventShowingRightDetailOverride) return;
	$('#right-side')/*.css({
		visibility: 'visible'
	})*/.addClass('active');
	/*$('#right-detail').css({
		visibility: 'visible'
	}).addClass('active');*/
	self.calculateSimpleViewHeight(self);
	console.log('simpleViewShowRightSideDetail: $(\'#filter-toolbar\').scrollTop() = ' + $('#filter-toolbar').scrollTop()
		+ ', $(\'#left-list\').scrollTop() = ' + $('#left-list').scrollTop()
		+ ', $(\'#left-list-favorites\').scrollTop() = ' + $('#left-list-favorites').scrollTop()
	);
	if ($('#filter-toolbar').scrollTop() == 0
		&& $('#left-list').scrollTop() == 0
		&& $('#left-list-favorites').scrollTop() == 0
		)
	{
		self.unFixUpperBar(0);
	}
	$('#right-detail-tabs-outer').css({ top: '' });
	$('#left-list-tabs-outer').addClass('hidden');
	
	var $map = $('#main-map');
	$('#right-side').prepend($map.detach());
	$('#right-detail-tabs-outer').css({
		top: ''
	});
	$map = null;

	self = null;
}

ServicesApp.prototype.simpleViewHideRightSideDetail = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#right-side')/*.css({
		visibility: 'hidden'
	})*/.removeClass('active');
	/*$('#right-detail').css({
		visibility: 'hidden'
	}).removeClass('active');*/
	
	/*
	// Reset main height to left side height
	var mainHeight =
		$('#left-list-tabs').outerHeight(true)
		+ $('#megalists').outerHeight(true)
		//+ $('#bottom-pager').outerHeight(true)
		//+ $('#bottom-ad').outerHeight(true)
		;
	$('#main').css({
		'height': mainHeight + 'px',
		'min-height': mainHeight + 'px'
	});
	$('#left-side').css({
		'height': mainHeight + 'px',
		'min-height': mainHeight + 'px'
	});
	
	//self.setBarWidths(self, self.barShouldBeFixed(self));
	*/
	$('#left-list-tabs-outer').removeClass('hidden');
	self.setBarWidths(self);
	
	if ($('#right-detail-title-outer').hasClass('fixed'))
	{
		$('#left-list-tabs-outer').addClass('fixed');
	}
	
	var $map = $('#main-map');
	$('#right-side').after($map.detach());
	$map = null;
	
	self = null;
}

ServicesApp.prototype.listChangeHandler = function( obj, index, event, target, self ) { 
	var self = typeof self === 'undefined' ? this : self;
	
	var makeVisible = true;// (window.viewType == ADVANCED_VIEW);
	
	//console.log('@@@@@@@@@@@@@@@@@@@@@@@ LIST CHANGE HANDLER @@@@@@@@@@@@@@@@@@@@@@');
	
	if (target !== null
		&& ($(target).hasClass('partner-link')
		|| $(target).hasParent('.partner-link')))
	{
		//self.partnerLinkClicked = false;
		self = null;
		return;
	}
	
	if (self.viewType == ServicesApp.prototype.ADVANCED_VIEW //|| self.viewType == ServicesApp.prototype.MAP_VIEW
	)
	{
		self.advancedViewShowRightSideDetail(self);
	}
	
	if (!self.preventShowingRightDetailOverride
		&& //(!self.preventShowingRightDetail &&
		self.viewType == self.SIMPLE_VIEW//)
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

	self.displayedItemFromTab = self.activeTabIndex;
	/*if (typeof event.srcElement !== 'undefined'
		&& event.srcElement.hasParent('#right-side-additional-related-list').length > 0)*/
	/*if (typeof target !== 'undefined'
		&& $(target).parents('#right-side-additional-related-list').length > 0)
	{
		self.displayedItemFromTab = 2;
	}*/
	var newIndex = -1;
	//console.log(event.srcElement.hasParent('#right-side-additional-related-list'));
	/*console.log('window.displayedItemFromTab = ' + window.displayedItemFromTab + ', obj = ');
	console.log(obj);*/
	if (self.displayedItemFromTab == ServicesApp.prototype.RESULTS_TAB)
	{
		var selectedItems = $.grep(self.displayedData, function(el, idx) {
			return el.absoluteIndex == obj.absoluteIndex;
		});
		self.displayedItemDisplayedIndex = self.displayedData.indexOf(selectedItems[0]);
		self.displayedItemAbsoluteIndex = obj.absoluteIndex;
		
		//window.selectedDisplayedIndex = event.selectedIndex;
		self.selectedDisplayedIndex = index;
		//debugLine('event.selectedIndex = '+event.selectedIndex);
		//debugLine('window.displayedData[selIdx].absoluteIndex = ' + window.displayedData[event.selectedIndex].absoluteIndex.toString());
		//window.selectedIndex = window.displayedData[event.selectedIndex].absoluteIndex;
		self.selectedIndex = obj.absoluteIndex;
		//debugLine('window.selectedIndex = '+window.selectedIndex);
		newIndex = self.favorites.indexOf(self.selectedIndex);
	}
	else if (self.displayedItemFromTab == ServicesApp.prototype.FAVORITES_TAB)
	{
		var selectedItems = $.grep(self.displayedFavoritesData, function(el, idx) {
			return el.absoluteIndex == obj.absoluteIndex;
		});
		self.displayedItemDisplayedIndex = self.displayedFavoritesData.indexOf(selectedItems[0]);
		self.displayedItemAbsoluteIndex = obj.absoluteIndex;
		//debugLine('event.selectedIndex = '+event.selectedIndex);
		//debugLine('window.displayedFavoritesData = ' + window.displayedFavoritesData.toString());
		/*selIdx = typeof window.selectedIndex !== 'undefined' ? window.selectedIndex : 'undefined';
		selFavIdx = typeof window.selectedFavoritesIndex !== 'undefined' ? window.selectedFavoritesIndex : 'undefined';
		selDiIdx = typeof window.selectedDisplayedIndex !== 'undefined' ? window.selectedDisplayedIndex : 'undefined';
		selDiFavIdx = typeof window.selectedDisplayedFavoritesIndex !== 'undefined' ? window.selectedDisplayedFavoritesIndex : 'undefined';
		debugLine('selIdx = '+selIdx
			+', selFavIdx = '+selFavIdx
			+', selDiIdx = '+selDiIdx
			+', selDiFavIdx = '+selDiFavIdx
		);*/
		//window.selectedDisplayedFavoritesIndex = event.selectedIndex;
		self.selectedDisplayedFavoritesIndex = index;
		//window.selectedFavoritesIndex = window.displayedFavoritesData[event.selectedIndex].absoluteFavoritesIndex;
		self.selectedFavoritesIndex = obj.absoluteFavoritesIndex;
		//window.selectedFavoritesIndex = window.displayedFavoritesData[event.selectedIndex].absoluteFavoritesindex;
		newIndex = self.selectedFavoritesIndex;
	}
	/*else if (self.displayedItemFromTab == 2)
	{
		//window.selectedRelatedIndex = event.selectedIndex;
		//self.selectedRelatedIndex = index;
		//newIndex = window.favorites.indexOf(window.related[window.selectedRelatedIndex].originalIndex);
		newIndex = self.favorites.indexOf(self.related[self.selectedRelatedIndex].originalIndex);
		//console.log('fromtab = 2, selRel = '+window.selectedRelatedIndex + ', newIndex = ' + newIndex);
	}*/
	/*selIdx = typeof window.selectedIndex !== 'undefined' ? window.selectedIndex : 'undefined';
	selFavIdx = typeof window.selectedFavoritesIndex !== 'undefined' ? window.selectedFavoritesIndex : 'undefined';
	selDiIdx = typeof window.selectedDisplayedIndex !== 'undefined' ? window.selectedDisplayedIndex : 'undefined';
	selDiFavIdx = typeof window.selectedDisplayedFavoritesIndex !== 'undefined' ? window.selectedDisplayedFavoritesIndex : 'undefined';
	debugLine('selIdx = '+selIdx
		+', selFavIdx = '+selFavIdx
		+', selDiIdx = '+selDiIdx
		+', selDiFavIdx = '+selDiFavIdx
	);*/
	
	if (newIndex == -1)
	{
		self.dimFavoriteLink(self);
	}
	else
	{
		self.unDimFavoriteLink(self);
	}

	if (target == null
		|| $(target).hasParent('#left-list')
		|| $(target).hasParent('#left-list-favorites'))
	{
		self.selectedMarkerListId = 0;
		self.selectedMarkerId = 0;
	}
	else 
	{
		var listId = $(target).data('marker-list-id');
		if (typeof listId !== 'undefined')
		{
			self.selectedMarkerListId = listId;
		}
		var markerId = $(target).data('marker-id');
		if (typeof markerId !== 'undefined')
		{
			self.selectedMarkerId = markerId;
		}
	}

	self.selectedBranch = typeof self.selectedMarkerId === 'undefined' ? 0 : self.selectedMarkerId;

	$('#right-detail-title .title').text(obj.branches[self.selectedBranch].name);
	
	$('#right-detail-company-city').text(obj.branches[self.selectedBranch].city);
	$('#right-detail-company-address').text(obj.branches[self.selectedBranch].address);
	self.listToDetailTable(
		'right-detail-company-phone',
		'',
		obj.phones
	);
	self.listToDetailTable(
		'right-detail-company-worktimes',
		'',
		obj.branches[self.selectedBranch].worktimes,
		function(worktime, rowId, rowIdSuffix) {
			var day = formatDOWShort(worktime.startDay);
			var time = '';
			if (typeof worktime.endDay !== 'undefined')
			{
				day += ' - ' + formatDOWShort(worktime.endDay);
			}
			if (typeof worktime.startTime !== 'undefined')
			{
				time += worktime.startTime;
				if (typeof worktime.endTime !== 'undefined')
				{
					time += ' - ' + worktime.endTime;
				}
			}
			else
			{
				time += 'Ne radi';
			}
			if (typeof rowIdSuffix !== 'undefined')
			{
				return '<tr id="' + rowId + rowIdSuffix + '">'
					+ '<td class="right-detail-table-row-data">' + day + '</td>'
					+ '<td class="right-detail-table-row-data">' + time + '</td>'
					+ '</tr>';
			}
			else
			{
				return '<td class="right-detail-table-row-data">' + day + '</td>'
					+ '<td class="right-detail-table-row-data">' + time + '</td>';
			}
		}
	);
	
	$('#right-detail-score-total .score-bar')
		.removeClass('score-0of5 score-1of5 score-2of5 score-3of5 score-4of5 score-5of5')
		.addClass('score-' + (obj.scores.number > 0 ? Math.round(self.getAverageScore(obj.scores)) : 0) + 'of5');
	$('#right-detail-score-quality .score-bar')
		.removeClass('score-0of5 score-1of5 score-2of5 score-3of5 score-4of5 score-5of5');
	$('#right-detail-score-pricing .score-bar')
		.removeClass('score-0of5 score-1of5 score-2of5 score-3of5 score-4of5 score-5of5');
	$('#right-detail-score-speed .score-bar')
		.removeClass('score-0of5 score-1of5 score-2of5 score-3of5 score-4of5 score-5of5');
	$('#right-detail-score-politeness .score-bar')
		.removeClass('score-0of5 score-1of5 score-2of5 score-3of5 score-4of5 score-5of5');
	if (obj.scores.number > 0)
	{
		$('#right-detail-score-quality .score-bar')
			.addClass('score-' + obj.scores.quality + 'of5');
		$('#right-detail-score-pricing .score-bar')
			.addClass('score-' + obj.scores.pricing + 'of5');
		$('#right-detail-score-speed .score-bar')
			.addClass('score-' + obj.scores.speed + 'of5');
		$('#right-detail-score-politeness .score-bar')
			.addClass('score-' + obj.scores.politeness + 'of5');
	}
	
	$('#right-detail-company-about').text(obj.about);
	
	self.listToDetailTable(
		'right-detail-company-document',
		'',
		obj.files,
		function(file, rowId, rowIdSuffix) {
			var fileHtml = '<a href="/docs/' + file.path + '"><img src="' + getFileIcon(file.path) + '" class="file-icon" /> '
				+ file.title
				+ '</a>'
			if (typeof rowIdSuffix !== 'undefined')
			{
				return '<tr id="' + rowId + rowIdSuffix + '">'
					+ '<td class="right-detail-table-row-data">' + fileHtml + '</td>'
					+ '</tr>';
			}
			else
			{
				return '<td class="right-detail-table-row-data">' + fileHtml + '</td>';
			}
		}
	);

	$('#right-detail-company-type').text(obj.branches[self.selectedBranch].type);
	$('#right-detail-company-subtype').text(obj.branches[self.selectedBranch].subtype);
	
	if (obj.partner)
	{
		$('#right-detail-partner').addClass('active');
	}
	else
	{
		$('#right-detail-partner').removeClass('active');
	}

	self.debugLine('calling setupRightDetailScroll(' + makeVisible + ')');
	self.setupRightDetailScroll(makeVisible, true, self);

	$('#details-tab').trigger('click', [function(){
		if (self.mapsEnabled)
		{
			if (typeof self.detailsMap === 'undefined')
			{
				self.detailsMap = initMap('#right-detail-main-map-canvas', self.defaultDetailsMapZoom, 44.821299, 20.454226);
			}
			if (self.activeTabIndex == ServicesApp.prototype.RESULTS_TAB)
			{
				self.showDetailsMapMarkers();
			}
			else
			{
				self.showDetailsFavoritesMapMarkers();
			}
		}
	}]);
	
	self.resetEmailForm(self.viewType != self.SIMPLE_VIEW);
	
	// cleanup
	self = null;
	
	// we are returning true to allow onClick events for child elements
	return true;
}

ServicesApp.prototype.debugLine = function(line, self)
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

ServicesApp.prototype.createFavoritesDataProvider = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('createFavoritesDataProvider()');
	//var result = new Array();
	/*if (window.favoritesData.length == 0)
	{
		for (i = 0; i < window.favorites.length; i++)
		{
			var newItem = deepCopy(window.data[window.favorites[i]]);
			newItem.originalIndex = i;
			newItem.index = window.favoritesData.length;
			window.favoritesData.push(newItem);
		}
	}*/
	
	// apply filters
	//debugLine('window.filterPriceActive = ' + window.filterPriceActive);
	/*var ie = getInternetExplorerVersion();
	if (ie > 8)
	{*/
		delete self.prepagedFavoritesData;
	/*}
	else
	{
		window.prepagedFavoritesData = undefined;
	}*/
	self.prepagedFavoritesData = new Array();
	
	self.filterFavoritesData(self);

	self.sortFavoritesData(self.sortFunction);

	/*if (self.viewType == self.SIMPLE_VIEW)
	{
		pageLength = self.simpleViewItemsPerPage(self);
		fromItem = self.simpleViewFavoritesPageNumber * pageLength;
		toItem = fromItem + pageLength;
		self.displayedFavoritesData = self.sortedFavoritesData.slice(fromItem, toItem); // changed for sort
	}
	else
	{*/
		self.displayedFavoritesData = self.sortedFavoritesData; // changed for sort
	/*}*/
	
	//debugLine('createFavoritesData: length = ' + window.displayedFavoritesData.length);
	
	var ret = self.displayedFavoritesData;
	self = null;
	return ret;
}

ServicesApp.prototype.onAfterFavoritesDataCreate = function(self)
{
	var self = typeof self === 'undefined' ? this : self;

	if (self.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
	{
		self.setCompanyCountText(self.prepagedFavoritesData.length //+ self.sponsoredData.length
		);
	}

	self.hideLeftMapMarkers(self);
	self.hideDetailsMapMarkers(self);
	self.hideLeftFavoritesMapMarkers(self);
	self.hideDetailsFavoritesMapMarkers(self);

	// Create map markers	
	if (self.mapsEnabled)
	{
		self.createFavoritesMapMarkers(self);
	}
	
	if (self.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
	{
		self.showLeftFavoritesMapMarkers(self);
		self.showDetailsFavoritesMapMarkers(self);
	}
	else
	{
		self.showLeftMapMarkers(self);
		self.showDetailsMapMarkers(self);
	}
	
	self = null;
}

ServicesApp.prototype.refreshResultList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('calling left-list.refresh()');
	$('#left-list').data('advlist').refresh();
	$('#left-list').parents('.slimScrollDiv').css({
		display: $('#left-list').css('display')
	});
	self = null;
}

ServicesApp.prototype.refreshFavoritesList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (this.favoritesMegalistInitialized)
	{
		$('#left-list-favorites').data('advlist').refresh();
		$('#left-list-favorites').parents('.slimScrollDiv').css({
			display: $('#left-list-favorites').css('display')
		});
	}
	self = null;
}

ServicesApp.prototype.favoritesDataOnChange = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('favoritesDataOnChange()');
	
	/*window.sortedFavoritesData.forEach(function(item){
		debugLine('favoritesDataOnChange: sorted: absFidx='+item.absoluteFavoritesIndex+', absidx='+item.absoluteIndex);
	});*/
	
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
		/*'width': window.megaListWidth + 'px',
		'height': window.megaListHeight+ 'px'*/
	});
	$('#left-list-favorites').find('ul').css({
		'top': 0
	});
	
	// Have to refresh all of them for consistency of labels in all lists
	// - Check if this is needed -SR, 2013-10-17
	self.refreshFavoritesList(self);
	self.refreshResultList(self);
	
	//self.onAfterFavoritesDataCreate(self);
	
	/*$('#left-list-favorites').megalist('setDataProvider', createFavoritesDataProvider() );*/
	/*if (typeof $('#right-side-additional-related-list').data('advlist') !== 'undefined')
	{
		self.refreshRelatedList(self);
	}*/
	
	// Moved to createFavoritesDataProvider
	/*$('#favorites-tab').html('<!--i class="icon-star"--></i> Odabrani ('
		+window.displayedFavoritesData.length+')'
		+'<span class="tab-arrow-placeholder-wrapper"><span class="tab-arrow-placeholder">&nbsp;</span></span>'
		);*/
	//$('#right-side-additional-related-list').megalist('setDataProvider', createRelatedDataProvider() );
	
	/*debugLine('window.viewType = ' + window.viewType
		+ ', window.displayedItemFromTab = ' + window.displayedItemFromTab
		+ ', window.favorites.length = ' + window.favorites.length
	);*/
	self = null;
}

ServicesApp.prototype.addToFavoritesDataOriginal = function(originalIndex, self)
{
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
	
	// not needed
	//self.createDataProvider(self);
	
	var data = self.displayedData;
	var newItem = $.grep(data, function(el, idx) { return el.absoluteIndex == originalIndex; })[0];
	newItem.originalIndex = originalIndex;
	newItem.absoluteFavoritesIndex = self.favoritesData.length;
	//console.log('addToFavoritesDataOriginal: newItem = ' + self.carToString(newItem) + ' (originalIndex = ' + originalIndex + ')');
	self.favorites.push(originalIndex);
	self.favoritesData.push(newItem);
	self.favoritesDataOnChange(self);
	self = null;
}

ServicesApp.prototype.removeFromFavoritesDataOriginal = function(originalIndex, self)
{
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
	
	if (self.displayedItemFromTab == ServicesApp.prototype.FAVORITES_TAB)
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

ServicesApp.prototype.removeFromFavoritesDataNew = function(newIndex, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('removeFromFavoritesDataNew('+newIndex+')');
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
	self.favorites.splice(newIndex,1);
	for (i = 0; i < self.favoritesData.length; i++)
	{
		//debugLine('removeNew: setting item #'+i);
		self.favoritesData[i].absoluteFavoritesIndex = i;
	}
	self.favoritesDataOnChange(self);
	self = null;
}

ServicesApp.prototype.carToString = function(car)
{
	return car.year + ' ' + car.maker + ' ' + car.model + ', ' + formatCurrency(car.price);
}

ServicesApp.prototype.createDataProvider = function(self) {
	var self = typeof self === 'undefined' ? this : self;
	//console.log('createDataProvider()');
	var result = [];
	
	var absoluteIndex = 0;
	
	if (self.data.length == 0)
	{
		var company = {};
		
		company.sponsored = false;
		company.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		company.image = 'co-001.png';
		company.thumb = 'co-001.png';
		company.maker = 'Lada';
		company.phones = [];
		company.phones.push('011/2712-190');
		company.scores = {};
		company.scores.quality = 4;
		company.scores.pricing = 3;
		company.scores.speed = 5;
		company.scores.politeness = 3;
		company.scores.number = 2;
		company.sponsored = true;
		
		company.about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			+ ' Aliquam vestibulum auctor faucibus. Fusce hendrerit a ipsum et sodales.'
			+ ' Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis suscipit urna,'
			+ ' vel tincidunt turpis lorem nec lacus. Morbi quis est nec tortor pharetra'
			+ ' tincidunt. Pellentesque luctus risus quis nulla elementum interdum. Cras'
			+ ' bibendum mattis justo, a egestas nunc condimentum sit amet. Aliquam erat'
			+ ' volutpat.';
			
		delete company.branches;
		company.branches = [];
		
		branch = {};
		branch.lat = 44.821299;
		branch.lng = 20.454226;
		branch.name = 'Lada Auto';
		branch.city = 'Beograd';
		branch.distance = 12;
		branch.address = 'Bul. Kralja Aleksandra 158';
		branch.type = 'Auto pranje';
		branch.subtype = 'Poddelatnost 1';

		branch.worktimes = [];
		
		var worktime = {};
		worktime.startDay = 0;
		worktime.endDay = 4;
		worktime.startTime = '8:00';
		worktime.endTime = '20:00';
		branch.worktimes.push(worktime);
		
		worktime = {};
		worktime.startDay = 5;
		worktime.startTime = '8:00';
		worktime.endTime = '18:00';
		branch.worktimes.push(worktime);
		
		worktime = {};
		worktime.startDay = 6;
		branch.worktimes.push(worktime);

		company.branches.push(branch);

		branch = {};
		branch.lat = 44.821299;
		branch.lng = 20.474226;
		branch.name = 'Lada Auto';
		branch.city = 'Beograd';
		branch.distance = 15;
		branch.address = 'Bul. Kralja Aleksandra 153';
		branch.type = 'Delatnost 3';
		branch.subtype = 'Poddelatnost 2';
		branch.worktimes = deepCopy(company.branches[0].worktimes);
		company.branches.push(branch);
			
		branch = {};
		branch.lat = 44.828299;
		branch.lng = 20.454226;
		branch.name = 'Lada Auto';
		branch.city = 'Beograd';
		branch.distance = 18;
		branch.address = 'Bul. Kralja Aleksandra 151';
		branch.type = 'Delatnost 2';
		branch.subtype = 'Poddelatnost 1';
		branch.worktimes = deepCopy(company.branches[0].worktimes);
		company.branches.push(branch);
			
		company.files = [];
		
		var file = {};
		file.title = 'Cenovnik';
		file.path = 'cenovnik-001.pdf';
		company.files.push(file);
		
		result.push(company);
		
		//======================================================
		company = deepCopy(company);
		company.absoluteIndex = absoluteIndex;
		absoluteIndex++;
		company.image = 'co-002.png';
		company.thumb = 'co-002.png';
		company.maker = 'BMW';
		delete company.scores;
		company.scores = {};
		company.scores.number = 0;
		company.partner = true;

		for (branch in company.branches)
		{
			delete company.branches[branch].worktimes;
		}
		delete company.branches;
		company.branches = [];

		branch = {};
		branch.lat = 44.921299;
		branch.lng = 20.354226;
		branch.name = 'Autospeed';
		branch.city = 'Pristina';
		branch.distance = 200;
		branch.address = 'Cara Lazara 158';
		branch.type = 'Delatnost 2';
		branch.subtype = 'Poddelatnost 2';

		branch.worktimes = deepCopy(result[0].branches[0].worktimes);
		
		company.branches.push(branch);

		result.push(company);

		//======================================================
		company = deepCopy(company);
		company.absoluteIndex = absoluteIndex;
		absoluteIndex++;
		company.image = 'co-003.png';
		company.thumb = 'co-003.png';
		
		company.files[0].title = 'Cenovnik_firma';
		company.files[0].path = 'cenovnik-firma-001.doc';
		company.partner = false;

		for (branch in company.branches)
		{
			delete company.branches[branch].worktimes;
		}
		delete company.branches;
		company.branches = [];
		
		branch = {};
		branch.lat = 44.721299;
		branch.lng = 20.354226;
		branch.name = 'KIM Auto Delovi';
		branch.city = 'Pristina';
		branch.distance = 250;
		branch.address = 'Cara Lazara 158';
		branch.type = 'Delatnost 3';
		branch.subtype = 'Poddelatnost 1';

		branch.worktimes = [];
		
		worktime = {};
		worktime.startDay = 0;
		worktime.startTime = '8:00';
		worktime.endTime = '15:00';
		branch.worktimes.push(worktime);

		worktime = {};
		worktime.startDay = 1;
		worktime.endDay = 3;
		worktime.startTime = '9:00';
		worktime.endTime = '19:00';
		branch.worktimes.push(worktime);

		worktime = {};
		worktime.startDay = 4;
		worktime.startTime = '7:00';
		worktime.endTime = '16:30';
		branch.worktimes.push(worktime);

		worktime = {};
		worktime.startDay = 5;
		worktime.endDay = 6;
		branch.worktimes.push(worktime);

		company.branches.push(branch);

		branch = {};
		branch.lat = 44.731299;
		branch.lng = 20.374226;
		branch.name = 'KIM Auto Delovi';
		branch.city = 'Pristina';
		branch.distance = 240;
		branch.address = 'Cara Lazara 152';
		branch.type = 'Delatnost 3';
		branch.subtype = 'Poddelatnost 2';
		branch.worktimes = deepCopy(company.branches[0].worktimes);
		company.branches.push(branch);

		file = {};
		file.title = 'O nama';
		file.path = 'onama.txt'
		
		company.files.push(file);
		delete company.phones;
		company.phones = [];
		company.phones.push('063/1234-567');
		company.phones.push('064/7891-234');
		company.phones.push('065/9876-543');
		
		delete company.scores;
		company.scores = {};
		company.scores.quality = 3;
		company.scores.pricing = 2;
		company.scores.speed = 2;
		company.scores.politeness = 2;
		company.scores.number = 5;
		result.push(company);
		
		for (i = 0; i < 5; i++)
		{
			var company1 = deepCopy(result[0]);
			var company2 = deepCopy(result[1]);
			var company3 = deepCopy(result[2]);
			company1.sponsored = false;
			company1.partner = false;
			company1.absoluteIndex = absoluteIndex;
			for (branch in company1.branches)
			{
				company1.branches[branch].lat = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*3)/10) + 44.821299;
				company1.branches[branch].lng = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*3)/10) + 20.454226;
			}
			absoluteIndex++;
			company2.sponsored = false;
			company2.partner = false;
			company2.absoluteIndex = absoluteIndex;
			for (branch in company2.branches)
			{
				company2.branches[branch].lat = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*3)/10) + 44.821299;
				company2.branches[branch].lng = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*3)/10) + 20.454226;
			}
			absoluteIndex++;
			company3.sponsored = false;
			company3.partner = false;
			company3.absoluteIndex = absoluteIndex;
			for (branch in company3.branches)
			{
				company3.branches[branch].lat = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*4)/10) + 44.821299;
				company3.branches[branch].lng = (1 + (-1) * Math.round(Math.random())) * (0.1 + Math.floor(Math.random()*4)/10) + 20.454226;
			}
			absoluteIndex++;
			result.push(company1);
			result.push(company2);
			result.push(company3);
		}
		
		/*car = new Object();
		car.sponsored = false;
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.images = new Array();
		car.images[0] = 'm-z72-001-sm.png';
		car.images[1] = 'm-z72-004-sm.png';
		car.images[2] = 'm-z72-005-sm.png';
		car.images[3] = 'm-z72-002-sm.png';
		car.images[4] = 'm-z72-003-sm.png';
		car.thumbs = deepCopy(car.images);
		//car.thumb = 'm-z72-001-sm.png';
		
		car.year = 2005;
		car.maker = 'Renault';
		car.model = 'Laguna 1.9dci';
		car.price = 4200;
		
		car.seller = new Object();
		car.seller.type = 'Pravno lice';
		car.seller.company = 'Verona motors d.o.o';
		car.seller.address = new Object();
		car.seller.address.street = 'Dimitrija Tucovica 10/7';
		car.seller.address.city = 'Beograd';
		car.seller.address.distance = 0;
		car.seller.phone = new Array();
		car.seller.phone.push('011/2712-134');
		car.seller.phone.push('062/222-132');
		
		car.used = self.K_POLOVNA;
		car.mileage = 120000;
		car.fueltype = self.G_BENZIN;
		car.gear = 'Manuelni';
		car.body = self.K_KARAVAN;
		car.doors = 5;
		car.seats = 5;
		car.color = 'Metalik crna';
		car.registration = 'Registrovan do 20.2.2014.';
		car.notes = new Array();
		car.notes.push('Servisna knjizica');
		car.notes.push('Prvi vlasnik');
		car.notes.push('Kupljen nov u Srbiji');

		car.features = new Object();
		car.features.volume = 1900;
		car.features.power = '10 kW (170 KS)';
		car.features.drive = 'Prednji';
		car.features.spending = '12 l/100km';
		car.features.emissionclass = 'Euro 4';
		
		car.props = new Array();
		car.props[0] = 'Hecbek';
		car.props[1] = '85 000 km';
		car.props[2] = 'Odlican';
		
		car.aboveBelow = 1;
		car.eval = 420;
		car.evalDesc = 'iznad ocekivane';
		
		car.equipment = new Object();
		
		car.equipment.exterior = new Array();
		car.equipment.exterior.push('Aluminijumske felne');
		car.equipment.exterior.push('Krovni prozor');
		car.equipment.exterior.push('Vucna kuka');

		car.equipment.interior = new Array();
		car.equipment.interior.push('Automatska klima');
		car.equipment.interior.push('Elektronsko podesavanje sedista');

		car.equipment.drivingSafety = new Array();
		car.equipment.drivingSafety.push('ABS');
		car.equipment.drivingSafety.push('ESP');
		car.equipment.drivingSafety.push('Airbag za vozaca i suvozaca');
		car.equipment.drivingSafety.push('Svetla za maglu');

		car.equipment.vehicleSafety = new Array();
		car.equipment.vehicleSafety.push('Kodiran kljuc');
		
		
		car.comment = 'Automobil je havarisan. Ostecen mu'
			+ ' je prednji trap automobil je havarisan. ostecen mu je';
		car.crashed = 0;
		
		result.push(car);

		car = new Object();
		car.sponsored = false;
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.images = new Array();
		car.images[0] = '4.jpg';//'m-z72-002-sm.png';
		car.images[1] = 'm-z72-001-sm.png';
		car.images[2] = 'm-z72-003-sm.png';
		car.images[3] = 'm-z72-002-sm.png';
		car.images[4] = 'm-z72-005-sm.png';
		car.images[5] = 'm-z72-002-sm.png';
		car.images[6] = 'm-z72-001-sm.png';
		car.thumbs = deepCopy(car.images);
		//car.thumb = 'm-z72-002-sm.png';
		
		car.year = 2007;
		car.maker = 'Audi';
		car.model = 'A5';
		car.price = 30000;
		
		car.seller = new Object();
		car.seller.type = 'Pravno lice';
		car.seller.company = 'Verona motors d.o.o';
		car.seller.address = new Object();
		car.seller.address.street = 'Dimitrija Tucovica 10/7';
		car.seller.address.city = 'Beograd';
		car.seller.address.distance = 0;
		car.seller.phone = new Array();
		car.seller.phone.push('011/2712-134');
		car.seller.phone.push('062/222-132');

		car.used = self.K_NOVA;
		car.mileage = 85000;
		car.fueltype = self.G_DIZEL;
		car.gear = 'Manuelni';
		car.body = self.K_KARAVAN;
		car.doors = 2;
		car.seats = 5;
		car.color = 'Metalik crna';
		car.registration = 'Registrovan do 20.2.2014.';
		car.notes = new Array();
		car.notes.push('Servisna knjizica');
		car.notes.push('Prvi vlasnik');
		car.notes.push('Kupljen nov u Srbiji');

		car.props = new Array();
		car.props[0] = 'Hecbek';
		car.props[1] = '85 000 km';
		car.props[2] = 'Odlican';
		
		car.features = new Object();
		car.features.volume = 2000;
		car.features.power = '10 kW (170 KS)';
		car.features.drive = 'Prednji';
		car.features.spending = '12 l/100km';
		car.features.emissionclass = 'Euro 3';
		
		car.aboveBelow = 4;
		car.eval = 178;
		car.evalDesc = 'ispod ocekivane';
		
		car.equipment = new Object();
		
		car.equipment.exterior = new Array();
		car.equipment.exterior.push('Aluminijumske felne');
		car.equipment.exterior.push('Krovni prozor');
		car.equipment.exterior.push('Vucna kuka');

		car.equipment.interior = new Array();
		car.equipment.interior.push('Automatska klima');
		car.equipment.interior.push('Elektronsko podesavanje sedista');

		car.equipment.drivingSafety = new Array();
		car.equipment.drivingSafety.push('ABS');
		car.equipment.drivingSafety.push('ESP');
		car.equipment.drivingSafety.push('Airbag za vozaca i suvozaca');
		car.equipment.drivingSafety.push('Svetla za maglu');

		car.equipment.vehicleSafety = new Array();
		car.equipment.vehicleSafety.push('Kodiran kljuc');

		car.comment = 'Automobil je havarisan. Ostecen mu'
			+ ' je prednji trap automobil je havarisan. ostecen mu je';
		car.crashed = 0;
		
		result.push(car);

		car = new Object();
		car.sponsored = false;
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.images = new Array();
		car.images[0] = '5.jpg';//'m-z72-003-sm.png';
		car.images[1] = 'm-z72-002-sm.png';
		car.images[2] = 'm-z72-004-sm.png';
		car.thumbs = deepCopy(car.images);
		//car.thumb = 'm-z72-003-sm.png';

		car.year = 2008;
		car.maker = 'Opel';
		car.model = 'Astra H1.7 cdti sw';
		car.price = 5500;

		car.seller = new Object();
		car.seller.type = 'Pravno lice';
		car.seller.company = 'Verona motors d.o.o';
		car.seller.address = new Object();
		car.seller.address.street = 'Dimitrija Tucovica 10/7';
		car.seller.address.city = 'Beograd';
		car.seller.address.distance = 0;
		car.seller.phone = new Array();
		car.seller.phone.push('011/2712-134');
		car.seller.phone.push('062/222-132');
		
		car.used = self.K_POLOVNA;
		car.mileage = 320000;
		car.fueltype = self.G_DIZEL;
		car.gear = 'Manuelni';
		car.body = self.K_KARAVAN;
		car.doors = 5;
		car.seats = 5;
		car.color = 'Metalik crna';
		car.registration = 'Registrovan do 20.2.2014.';
		car.notes = new Array();
		car.notes.push('Servisna knjizica');
		car.notes.push('Prvi vlasnik');
		car.notes.push('Kupljen nov u Srbiji');

		car.props = new Array();
		car.props[0] = 'Hecbek';
		car.props[1] = '320 000 km';
		car.props[2] = 'Odlican';
		
		car.features = new Object();
		car.features.volume = 1308;
		car.features.power = '10 kW (170 KS)';
		car.features.drive = 'Prednji';
		car.features.spending = '12 l/100km';
		car.features.emissionclass = 'Euro 3';

		
		car.aboveBelow = 3;
		car.eval = 256;
		car.evalDesc = 'iznad ocekivane';
		
		car.equipment = new Object();
		
		car.equipment.exterior = new Array();
		car.equipment.exterior.push('Aluminijumske felne');
		car.equipment.exterior.push('Krovni prozor');
		car.equipment.exterior.push('Vucna kuka');

		car.equipment.interior = new Array();
		car.equipment.interior.push('Automatska klima');
		car.equipment.interior.push('Elektronsko podesavanje sedista');

		car.equipment.drivingSafety = new Array();
		car.equipment.drivingSafety.push('ABS');
		car.equipment.drivingSafety.push('ESP');
		car.equipment.drivingSafety.push('Airbag za vozaca i suvozaca');
		car.equipment.drivingSafety.push('Svetla za maglu');

		car.equipment.vehicleSafety = new Array();
		car.equipment.vehicleSafety.push('Kodiran kljuc');

		car.comment = 'Automobil je havarisan. Ostecen mu'
			+ ' je prednji trap automobil je havarisan. ostecen mu je';
		car.crashed = 0;
		
		result.push(car);
		
		car = deepCopy(car);
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.model = 'Astra GTC';
		car.price = 5947;
		car.aboveBelow = 4;
		car.eval = 115.43;
		car.evalDesc = 'ispod ocekivane';
		delete car.images;
		car.images = [];
		car.images.push('6.jpg');
		delete car.thumbs;
		car.thumbs = deepCopy(car.images);
		result.push(car);


		car = deepCopy(car);
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.maker = 'Audi';
		car.model = 'A8 L W12';
		car.price = 7633;
		car.aboveBelow = 3;
		car.eval = 315.73;
		car.evalDesc = 'iznad ocekivane';
		delete car.images;
		car.images = [];
		car.images.push('7.jpg');
		delete car.thumbs;
		car.thumbs = deepCopy(car.images);
		result.push(car);

		car = new Object();
		car.sponsored = false;
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		car.images = new Array();
		car.images[0] = 'm-z72-004-sm.png';
		car.images[1] = 'm-z72-005-sm.png';
		car.images[2] = 'm-z72-002-sm.png';
		car.thumbs = deepCopy(car.images);
		//car.thumb = 'm-z72-004-sm.png';

		car.year = 2006;
		car.maker = 'BMW';
		car.model = 'M3 0.2 lala';
		car.price = 4670;
		
		car.seller = new Object();
		car.seller.type = 'Pravno lice';
		car.seller.company = 'Verona motors d.o.o';
		car.seller.address = new Object();
		car.seller.address.street = 'Dimitrija Tucovica 10/7';
		car.seller.address.city = 'Cacak';
		car.seller.address.distance = 52;
		car.seller.phone = new Array();
		car.seller.phone.push('011/2712-134');
		car.seller.phone.push('062/222-132');
		
		car.used = self.K_POLOVNA;
		car.mileage = 120000;
		car.fueltype = self.G_DIZEL;
		car.gear = 'Manuelni';
		car.body = self.K_KARAVAN;
		car.doors = 5;
		car.seats = 5;
		car.color = 'Metalik crna';
		car.registration = 'Registrovan do 20.2.2014.';
		car.notes = new Array();
		car.notes.push('Servisna knjizica');
		car.notes.push('Prvi vlasnik');
		car.notes.push('Kupljen nov u Srbiji');

		car.props = new Array();
		car.props[0] = 'Hecbek';
		car.props[1] = '120 000 km';
		car.props[2] = 'Odlican';
		
		car.features = new Object();
		car.features.volume = 1900;
		car.features.power = '10 kW (170 KS)';
		car.features.drive = 'Prednji';
		car.features.spending = '12 l/100km';
		car.features.emissionclass = 'Euro 3';

		
		car.aboveBelow = 0;
		car.eval = '- - -';
		car.evalDesc = 'nema procene';
		
		car.equipment = new Object();
		
		car.equipment.exterior = new Array();
		car.equipment.exterior.push('Aluminijumske felne');
		car.equipment.exterior.push('Krovni prozor');
		car.equipment.exterior.push('Vucna kuka');

		car.equipment.interior = new Array();
		car.equipment.interior.push('Automatska klima');
		car.equipment.interior.push('Elektronsko podesavanje sedista');

		car.equipment.drivingSafety = new Array();
		car.equipment.drivingSafety.push('ABS');
		car.equipment.drivingSafety.push('ESP');
		car.equipment.drivingSafety.push('Airbag za vozaca i suvozaca');
		car.equipment.drivingSafety.push('Svetla za maglu');

		car.equipment.vehicleSafety = new Array();
		car.equipment.vehicleSafety.push('Kodiran kljuc');

		car.comment = 'Automobil je havarisan. Ostecen mu'
			+ ' je prednji trap automobil je havarisan. ostecen mu je';
		car.crashed = 1;
		
		result.push(car);

		for (i = 0; i < 31; i++)
		{
			car = deepCopy(car);
			car.crashed = 0;
			car.absoluteIndex = absoluteIndex;
			absoluteIndex = absoluteIndex + 1;
			result.push(car);
		}
		
		car = deepCopy(car);
		car.body = self.K_KUPE;
		car.sponsored = true;
		car.maker = 'Opel';
		car.model = 'Corsa A';
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;

		car.aboveBelow = 4;
		car.eval = 18.92;
		car.evalDesc = 'ispod ocekivane';

		delete car.images;
		car.images = [];
		car.images.push('2.jpg');
		car.images.push('v2.jpg');
		car.images.push('v3.jpg');
		car.images.push('v4.jpg');
		car.images.push('v5.jpg');
		car.images.push('v6.jpg');
		car.images.push('v7.jpg');
		car.images.push('v8.jpg');
		car.images.push('v9.jpg');
		car.images.push('v10.jpg');
		delete car.thumbs;
		car.thumbs = [];
		car.thumbs.push('2.jpg');
		car.thumbs.push('t2.jpg');
		car.thumbs.push('t3.jpg');
		car.thumbs.push('t4.jpg');
		car.thumbs.push('t5.jpg');
		car.thumbs.push('t6.jpg');
		car.thumbs.push('t7.jpg');
		car.thumbs.push('t8.jpg');
		car.thumbs.push('t9.jpg');
		car.thumbs.push('t10.jpg');
		result.push(car);

		car = deepCopy(car);
		car.images[0] = '3.jpg';
		car.thumbs[0] = '3.jpg';
		car.sponsored = true;
		car.maker = 'Opel';
		car.model = 'Corsa B';

		car.aboveBelow = 1;
		car.eval = 14212.34;
		car.evalDesc = 'iznad ocekivane';

		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		result.push(car);

		car = deepCopy(car);
		car.images[0] = 'v1.jpg';
		car.thumbs[0] = 't1.jpg';
		car.sponsored = true;
		car.maker = 'Opel';
		car.model = 'Tigra A';

		car.aboveBelow = 2;
		car.eval = 35672.85;
		car.evalDesc = 'ispod ocekivane';

		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		result.push(car);

		car = deepCopy(car);
		car.sponsored = true;
		car.maker = 'Volvo';
		car.model = 'PV51';
		car.price = 12345;
		
		car.aboveBelow = 2;
		car.eval = 345.52;
		car.evalDesc = 'ispod ocekivane';
		
		car.absoluteIndex = absoluteIndex;
		absoluteIndex = absoluteIndex + 1;
		result.push(car);*/
		
		self.data = result;
	}
	
	var filter = null;
	for (coIndex in self.data)
	{
		if (coIndex != 'indexOf')	 // IE 7
		{
			var co = self.data[coIndex];
			//dbg = 'car #' + carIndex + ': ' + car.model;
			for (setFilterName in self.setFilters)
			{
				filter = self.setFilters[setFilterName];
				var value = multiIndex(co, setFilterName);
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
			delete self.prepagedData;
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

	self.sortData(self.sortFunction);
	if (typeof self.displayedData !== 'undefined')
	{
		delete self.displayedData;
	}
	self.displayedData = self.sortedSponsoredData.concat(self.sortedData);
	
	//self.displayedData = self.data;
	
	var ret = self.displayedData;	
	self = null;	
	return ret;
}

ServicesApp.prototype.onAfterDataCreate = function(self)
{
	var self = typeof self === 'undefined' ? this : self;

	if (self.activeTabIndex == ServicesApp.prototype.RESULTS_TAB)
	{
		self.setCompanyCountText(self.displayedData.length);
	}
	
	self.hideLeftMapMarkers(self);
	self.hideDetailsMapMarkers(self);
	self.hideLeftFavoritesMapMarkers(self);
	self.hideDetailsFavoritesMapMarkers(self);

	// Create map markers	
	if (self.mapsEnabled)
	{
		self.createMapMarkers(self);
	}
	
	if (self.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
	{
		self.showLeftFavoritesMapMarkers(self);
		self.showDetailsFavoritesMapMarkers(self);
	}
	else
	{
		self.showLeftMapMarkers(self);
		self.showDetailsMapMarkers(self);
	}

	self = null;
}

ServicesApp.prototype.getLocationNumber = function(item, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*if (item.locations.length == 0)
	{
		self = null;
		return 0;
	}*/
	
	var ret = 0;
	
	for (var index in self.displayedData)
	{
		//if (self.displayedData[index].locations.length > 0)
		{
			ret++;
		}
		if (self.displayedData[index].absoluteIndex == item.absoluteIndex)
		{
			break;
		}
	}
	
	self = null;
	return ret;
}

ServicesApp.prototype.getFavoritesLocationNumber = function(item, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	/*if (item.locations.length == 0)
	{
		self = null;
		return 0;
	}*/
	
	var ret = 0;
	
	for (var index in self.displayedFavoritesData)
	{
		//if (self.displayedData[index].locations.length > 0)
		{
			ret++;
		}
		if (self.displayedFavoritesData[index].absoluteIndex == item.absoluteIndex)
		{
			break;
		}
	}
	
	self = null;
	return ret;
}

ServicesApp.prototype.createMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var companyNumber = 1;
	var leftMapInitialized = typeof self.leftMap !== 'undefined';
	
	// if already initialized, just update the marker numbers
	
	if (leftMapInitialized)
	{
		for (var markerListIndex in self.leftMapMarkers)
		{
			var markerListLeft = self.leftMapMarkers[markerListIndex];
			// hide elements prior to deletion
			for (var markerIndex in markerListLeft.markers)
			{
				markerListLeft.markers[markerIndex].setVisible(false);
			}
			delete markerListLeft.markers;
			markerListLeft = null;
		}
		delete self.leftMapMarkers;
		self.leftMapMarkers = [];
	}
	for (var markerListIndex in self.detailsMapMarkers)
	{
		var markerListDetails = self.detailsMapMarkers[markerListIndex];
		// hide elements prior to deletion
		for (var markerIndex in markerListDetails.markers)
		{
			markerListDetails.markers[markerIndex].setVisible(false);
		}
		delete markerListDetails.markers;
		markerListDetails = null;
	}
	delete self.detailsMapMarkers;
	self.detailsMapMarkers = [];
	
	for (var index in self.displayedData)
	{
		//if (self.displayedData[index].locations.length > 0)
		{
			var newMarkerListLeft = null;
			if (leftMapInitialized)
			{
				newMarkerListLeft = {
					markers: [],
					dataAbsoluteIndex: self.displayedData[index].absoluteIndex,
					companyNumber: companyNumber
				};
			}
			var newMarkerListDetails = {
				markers: [],
				dataAbsoluteIndex: self.displayedData[index].absoluteIndex,
				companyNumber: companyNumber
			};
			
			for (var branch = 0; branch < self.displayedData[index].branches.length; branch++)
			{
				var lat = self.displayedData[index].branches[branch].lat;
				var lng = self.displayedData[index].branches[branch].lng;
				var marker = new RichMarker({
					parentList: ServicesApp.prototype.RESULTS_LIST,
					map: self.detailsMap,
					position: new google.maps.LatLng(lat, lng),
					draggable: false,
					flat: true,
					anchor: RichMarkerPosition.MIDDLE,
					content: '<div class="map-marker" data-marker-list-id="'
						+ self.detailsMapMarkers.length
						+ '" data-marker-id="'
						+ newMarkerListDetails.markers.length
						+ '" data-marker-absolute-id="'
						+ newMarkerListDetails.dataAbsoluteIndex
						+ '">' + companyNumber + '</div>',
					markerListId: self.detailsMapMarkers.length,
					markerId: newMarkerListDetails.markers.length,
					absoluteId: newMarkerListDetails.dataAbsoluteIndex,
					visible: false,
					name: self.displayedData[index].branches[branch].name,
					address: self.displayedData[index].branches[branch].address
				});
				google.maps.event.addListener(marker, 'click', function(evt) {
					//console.log('markerOnClick[normal,details]: this = ');
					//console.log(this);
					if (this.parentList == ServicesApp.prototype.RESULTS_LIST)
					{
						this.map.infoWindow.close();
						this.map.infoWindow.setContent(
							'<div><a href="#" class="location-link" data-marker-list-id="'
							+ this.markerListId
							+ '" data-marker-id="'
							+ this.markerId
							+ '" data-marker-absolute-id="'
							+ this.absoluteId
							+ '">'
							+ this.name
							+ '</a>'
							+ '</div><div>'
							+ this.address
							+ '</div>'
						);
						this.map.infoWindow.setPosition(this.position);
						this.map.infoWindow.open(this.map, this);
					}
				});
				newMarkerListDetails.markers.push(marker);
				if (leftMapInitialized)
				{
					marker = new RichMarker({
						parentList: ServicesApp.prototype.RESULTS_LIST,
						map: self.leftMap,
						position: new google.maps.LatLng(lat, lng),
						draggable: false,
						flat: true,
						anchor: RichMarkerPosition.MIDDLE,
						content: '<div class="map-marker" data-marker-list-id="'
							+ self.leftMapMarkers.length
							+ '" data-marker-id="'
							+ newMarkerListLeft.markers.length
							+ '" data-marker-absolute-id="'
							+ newMarkerListLeft.dataAbsoluteIndex
							+ '">' + companyNumber + '</div>',
						markerListId: self.leftMapMarkers.length,
						markerId: newMarkerListLeft.markers.length,
						absoluteId: newMarkerListLeft.dataAbsoluteIndex,
						name: self.displayedData[index].branches[branch].name,
						address: self.displayedData[index].branches[branch].address,
						visible: false
					})
					google.maps.event.addListener(marker, 'click', function(evt) {
						//console.log('markerOnClick[normal,left]: this = ');
						//console.log(this);
						if (this.parentList == ServicesApp.prototype.RESULTS_LIST)
						{
							this.map.infoWindow.close();
							this.map.infoWindow.setContent(
								'<div><a href="#" class="location-link" data-marker-list-id="'
								+ this.markerListId
								+ '" data-marker-id="'
								+ this.markerId
								+ '" data-marker-absolute-id="'
								+ this.absoluteId
								+ '">'
								+ this.name
								+ '</a>'
								+ '</div><div>'
								+ this.address
								+ '</div>'
							);
							this.map.infoWindow.setPosition(this.position);
							this.map.infoWindow.open(this.map, this);
						}
					});
					newMarkerListLeft.markers.push(marker);
				}
				marker = null;
			}
			if (leftMapInitialized)
			{
				self.leftMapMarkers.push(newMarkerListLeft);
				newMarkerListLeft = null;
			}
			self.detailsMapMarkers.push(newMarkerListDetails);
			companyNumber++;
			newMarkerListDetails = null;
		}
	}
	
	/*console.log('createMapMarkers: markers after creation:');
	console.log(self.leftMapMarkers);
	console.log(self.detailsMapMarkers);*/
	
	self = null;
}

ServicesApp.prototype.createFavoritesMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var companyNumber = 1;
	var leftMapInitialized = typeof self.leftMap !== 'undefined';
	
	// if already initialized, just update the marker numbers
	
	if (leftMapInitialized)
	{
		for (var markerListIndex in self.leftFavoritesMapMarkers)
		{
			var markerListLeft = self.leftFavoritesMapMarkers[markerListIndex];
			// hide elements prior to deletion
			for (var markerIndex in markerListLeft.markers)
			{
				markerListLeft.markers[markerIndex].setVisible(false);
			}
			delete markerListLeft.markers;
			markerListLeft = null;
		}
		delete self.leftFavoritesMapMarkers;
		self.leftFavoritesMapMarkers = [];
	}
	for (var markerListIndex in self.detailsFavoritesMapMarkers)
	{
		var markerListDetails = self.detailsFavoritesMapMarkers[markerListIndex];
		// hide elements prior to deletion
		for (var markerIndex in markerListDetails.markers)
		{
			markerListDetails.markers[markerIndex].setVisible(false);
		}
		delete markerListDetails.markers;
		markerListDetails = null;
	}
	delete self.detailsFavoritesMapMarkers;
	self.detailsFavoritesMapMarkers = [];
	
	for (var index in self.displayedFavoritesData)
	{
		//if (self.displayedData[index].locations.length > 0)
		{
			var newMarkerListLeft = null;
			if (leftMapInitialized)
			{
				newMarkerListLeft = {
					markers: [],
					dataAbsoluteIndex: self.displayedFavoritesData[index].absoluteIndex, // TODO
					companyNumber: companyNumber
				};
			}
			var newMarkerListDetails = {
				markers: [],
				dataAbsoluteIndex: self.displayedFavoritesData[index].absoluteIndex, // TODO
				companyNumber: companyNumber
			};
			
			for (var branch = 0; branch < self.displayedFavoritesData[index].branches.length; branch++)
			{
				var lat = self.displayedFavoritesData[index].branches[branch].lat;
				var lng = self.displayedFavoritesData[index].branches[branch].lng;
				var marker = new RichMarker({
					parentList:	ServicesApp.prototype.FAVORITES_LIST,
					map: self.detailsMap,
					position: new google.maps.LatLng(lat, lng),
					draggable: false,
					flat: true,
					anchor: RichMarkerPosition.MIDDLE,
					content: '<div class="map-marker-favorites" data-marker-list-id="'
						+ self.detailsFavoritesMapMarkers.length
						+ '" data-marker-id="'
						+ newMarkerListDetails.markers.length
						+ '" data-marker-absolute-id="'
						+ newMarkerListDetails.dataAbsoluteIndex
						+ '">' + companyNumber + '</div>',
					markerListId: self.detailsFavoritesMapMarkers.length,
					markerId: newMarkerListDetails.markers.length,
					absoluteId: newMarkerListDetails.dataAbsoluteIndex,
					visible: false,
					name: self.displayedFavoritesData[index].branches[branch].name,
					address: self.displayedFavoritesData[index].branches[branch].address
				});
				google.maps.event.addListener(marker, 'click', function(evt) {
					//console.log('markerOnClick[favorites,details]: this = ');
					//console.log(this);
					if (this.parentList == ServicesApp.prototype.FAVORITES_LIST)
					{
						this.map.infoWindow.close();
						this.map.infoWindow.setContent(
							'<div><a href="#" class="location-link-favorites" data-marker-list-id="'
							+ this.markerListId
							+ '" data-marker-id="'
							+ this.markerId
							+ '" data-marker-absolute-id="'
							+ this.absoluteId
							+ '">'
							+ this.name
							+ '</a>'
							+ '</div><div>'
							+ this.address
							+ '</div>'
						);
						this.map.infoWindow.setPosition(this.position);
						this.map.infoWindow.open(this.map, this);
					}
				});
				newMarkerListDetails.markers.push(marker);
				if (leftMapInitialized)
				{
					marker = new RichMarker({
						parentList: ServicesApp.prototype.FAVORITES_LIST,
						map: self.leftMap,
						position: new google.maps.LatLng(lat, lng),
						draggable: false,
						flat: true,
						anchor: RichMarkerPosition.MIDDLE,
						content: '<div class="map-marker-favorites" data-marker-list-id="'
							+ self.leftFavoritesMapMarkers.length
							+ '" data-marker-id="'
							+ newMarkerListLeft.markers.length
							+ '" data-marker-absolute-id="'
							+ newMarkerListLeft.dataAbsoluteIndex
							+ '">' + companyNumber + '</div>',
						markerListId: self.leftFavoritesMapMarkers.length,
						markerId: newMarkerListLeft.markers.length,
						absoluteId: newMarkerListLeft.dataAbsoluteIndex,
						name: self.displayedFavoritesData[index].branches[branch].name,
						address: self.displayedFavoritesData[index].branches[branch].address,
						visible: false
					})
					google.maps.event.addListener(marker, 'click', function(evt) {
						//console.log('markerOnClick[favorites,left]: this = ');
						//console.log(this);
						if (this.parentList == ServicesApp.prototype.FAVORITES_LIST)
						{
							this.map.infoWindow.close();
							this.map.infoWindow.setContent(
								'<div><a href="#" class="location-link-favorites" data-marker-list-id="'
								+ this.markerListId
								+ '" data-marker-id="'
								+ this.markerId
								+ '" data-marker-absolute-id="'
								+ this.absoluteId
								+ '">'
								+ this.name
								+ '</a>'
								+ '</div><div>'
								+ this.address
								+ '</div>'
							);
							this.map.infoWindow.setPosition(this.position);
							this.map.infoWindow.open(this.map, this);
						}
					});
					newMarkerListLeft.markers.push(marker);
				}
				marker = null;
			}
			if (leftMapInitialized)
			{
				self.leftFavoritesMapMarkers.push(newMarkerListLeft);
				newMarkerListLeft = null;
			}
			self.detailsFavoritesMapMarkers.push(newMarkerListDetails);
			companyNumber++;
			newMarkerListDetails = null;
		}
	}
	
	/*console.log('createMapMarkers: markers after creation:');
	console.log(self.leftMapMarkers);
	console.log(self.detailsMapMarkers);*/
	
	self = null;
}

ServicesApp.prototype.showLeftMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof $('#left-list').data('advlist') === 'undefined')
	{
		var absIndex = self.displayedItemAbsoluteIndex;
		
		for (var markerListIndex in self.leftMapMarkers)
		{
			var markerList = self.leftMapMarkers[markerListIndex];
			
			for (var marker in markerList.markers)
			{
				markerList.markers[marker].setMap(self.leftMap);
				
				// show all markers
				markerList.markers[marker].setVisible(true);
			}
			
			markerList = null;
		}
	}
	else
	{
		self.showDisplayedMarkers($('#left-list').data('advlist').getVisibleItems(),
			self.displayedData,
			self
		);
	}

	self = null;
}

ServicesApp.prototype.showLeftFavoritesMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (self.favoritesMegalistInitialized)
	/*{
		var absIndex = self.displayedItemAbsoluteIndex;
		
		for (var markerListIndex in self.leftFavoritesMapMarkers)
		{
			var markerList = self.leftFavoritesMapMarkers[markerListIndex];
			
			for (var marker in markerList.markers)
			{
				markerList.markers[marker].setMap(self.leftMap);
				
				// show all markers
				markerList.markers[marker].setVisible(true);
			}
			
			markerList = null;
		}
	}
	else*/
	{
		self.showDisplayedFavoritesMarkers($('#left-list-favorites').data('advlist').getVisibleItems(),
			self.displayedFavoritesData,
			self
		);
	}

	self = null;
}

ServicesApp.prototype.centerMarkerLeft = function(markerListIndex, markerIndex, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var markerList = self.leftMapMarkers[markerListIndex];
	
	if (markerList.markers.length > 0)
	{
		self.leftMap.setCenter(markerList.markers[markerIndex].position);
		self.leftMap.setZoom(self.defaultLeftMapZoom);
	}
	markerList = null;
	self = null;
}

ServicesApp.prototype.centerMarkerDetails = function(markerListIndex, markerIndex, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var markerList = self.detailsMapMarkers[markerListIndex];
	var markerIndex = typeof markerIndex === 'undefined' ? 0 : markerIndex;
	
	if (markerList.markers.length > 0)
	{
		self.detailsMap.setCenter(markerList.markers[markerIndex].position);
		self.detailsMap.setZoom(self.defaultDetailsMapZoom);
	}
	markerList = null;
	self = null;
}

ServicesApp.prototype.centerFavoritesMarkerDetails = function(markerListIndex, markerIndex, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var markerList = self.detailsFavoritesMapMarkers[markerListIndex];
	var markerIndex = typeof markerIndex === 'undefined' ? 0 : markerIndex;
	
	if (markerList.markers.length > 0)
	{
		self.detailsMap.setCenter(markerList.markers[markerIndex].position);
		self.detailsMap.setZoom(self.defaultDetailsMapZoom);
	}
	markerList = null;
	self = null;
}

ServicesApp.prototype.showDetailsMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var absIndex = self.displayedItemAbsoluteIndex;
	
	for (var markerListIndex in self.detailsMapMarkers)
	{
		var markerList = self.detailsMapMarkers[markerListIndex];
		
		if (markerList.dataAbsoluteIndex == absIndex && markerList.markers.length > 0)
		{
			self.centerMarkerDetails(markerListIndex, self.selectedMarkerId, self);
		}
		
		if (typeof self.detailsMap !== 'undefined' && typeof self.detailsMap.infoWindow !== 'undefined')
		{
			self.detailsMap.infoWindow.close();
		}
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.detailsMap);
			// only show the markers for the selected item
			if (markerList.dataAbsoluteIndex == absIndex)
			{
				/*console.log('showDetailsMapMarkers: markerList.dataAbsoluteIndex [' + markerList.dataAbsoluteIndex
					+ '] == absIndex [' + absIndex + '], showing marker ' + marker);*/
				markerList.markers[marker].setVisible(true);
				//markerList.markers[marker].infoWindow.close();
			}
			else
			{
				/*console.log('showDetailsMapMarkers: markerList.dataAbsoluteIndex [' + markerList.dataAbsoluteIndex
					+ '] != absIndex [' + absIndex + '], hiding marker ' + marker);*/
				markerList.markers[marker].setVisible(false);
				//markerList.markers[marker].infoWindow.close();
			}
		}
		
		markerList = null;
	}
	
	self = null;
}

ServicesApp.prototype.showDetailsFavoritesMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var absIndex = self.displayedItemAbsoluteIndex;
	
	for (var markerListIndex in self.detailsFavoritesMapMarkers)
	{
		var markerList = self.detailsFavoritesMapMarkers[markerListIndex];
		
		if (markerList.dataAbsoluteIndex == absIndex && markerList.markers.length > 0)
		{
			self.centerFavoritesMarkerDetails(markerListIndex, self.selectedMarkerId, self);
		}
		
		if (typeof self.detailsMap !== 'undefined' && typeof self.detailsMap.infoWindow !== 'undefined')
		{
			self.detailsMap.infoWindow.close();
		}
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.detailsMap);
			// only show the markers for the selected item
			if (markerList.dataAbsoluteIndex == absIndex)
			{
				/*console.log('showDetailsMapMarkers: markerList.dataAbsoluteIndex [' + markerList.dataAbsoluteIndex
					+ '] == absIndex [' + absIndex + '], showing marker ' + marker);*/
				markerList.markers[marker].setVisible(true);
				//markerList.markers[marker].infoWindow.close();
			}
			else
			{
				/*console.log('showDetailsMapMarkers: markerList.dataAbsoluteIndex [' + markerList.dataAbsoluteIndex
					+ '] != absIndex [' + absIndex + '], hiding marker ' + marker);*/
				markerList.markers[marker].setVisible(false);
				//markerList.markers[marker].infoWindow.close();
			}
		}
		
		markerList = null;
	}
	
	self = null;
}

ServicesApp.prototype.hideLeftMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof self.leftMap !== 'undefined' && typeof self.leftMap.infoWindow !== 'undefined')
	{
		self.leftMap.infoWindow.close();
	}
	for (var markerListIndex in self.leftMapMarkers)
	{
		var markerList = self.leftMapMarkers[markerListIndex];
		
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.leftMap);
			markerList.markers[marker].setVisible(false);
			//markerList.markers[marker].infoWindow.close();
		}
		markerList = null;
	}
	
	self = null;
}

ServicesApp.prototype.hideLeftFavoritesMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof self.leftMap !== 'undefined' && typeof self.leftMap.infoWindow !== 'undefined')
	{
		self.leftMap.infoWindow.close();
	}
	for (var markerListIndex in self.leftFavoritesMapMarkers)
	{
		var markerList = self.leftFavoritesMapMarkers[markerListIndex];
		
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.leftMap);
			markerList.markers[marker].setVisible(false);
			//markerList.markers[marker].infoWindow.close();
		}
		markerList = null;
	}
	
	self = null;
}

ServicesApp.prototype.hideDetailsMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof self.detailsMap !== 'undefined' && typeof self.detailsMap.infoWindow !== 'undefined')
	{
		self.detailsMap.infoWindow.close();
	}
	for (var markerListIndex in self.detailsMapMarkers)
	{
		var markerList = self.detailsMapMarkers[markerListIndex];
		
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.detailsMap);
			markerList.markers[marker].setVisible(false);
			//markerList.markers[marker].infoWindow.close();
		}
		markerList = null;
	}
	
	self = null;
}

ServicesApp.prototype.hideDetailsFavoritesMapMarkers = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof self.detailsMap !== 'undefined' && typeof self.detailsMap.infoWindow !== 'undefined')
	{
		self.detailsMap.infoWindow.close();
	}
	for (var markerListIndex in self.detailsFavoritesMapMarkers)
	{
		var markerList = self.detailsFavoritesMapMarkers[markerListIndex];
		
		for (var marker in markerList.markers)
		{
			markerList.markers[marker].setMap(self.detailsMap);
			markerList.markers[marker].setVisible(false);
			//markerList.markers[marker].infoWindow.close();
		}
		markerList = null;
	}
	
	self = null;
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

ServicesApp.prototype.filterData = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//debugLine('window.filterPriceActive = ' + window.filterPriceActive);

	for (var i = 0; i < self.data.length; i++)
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
			if (typeof filter.evalFunction !== 'undefined')
			{
				dataField = filter.evalFunction(self.data[i], self);
			}
			else
			{
				dataField = multiIndex(self.data[i], filterName);
			}
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
				/*console.log('volume, dataField = ' + dataField
					+ ', filter.lowest = ' + filter.lowest
					+ ', filter.highest = ' + filter.highest
					+ ', filter.lower = ' + filter.lower
					+ ', filter.higher = ' + filter.higher
				);*/
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
			/*for (val in filter.values)
			{
				console.log(val);
			}
			console.log('=');*/
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
			/*if (filterName == 'body')
			{
			console.log('processing filter "' + filterName + '" = ');
			console.log(self.radioFilters[filterName]);
			console.log('on object (((((((((((((((' + self.carToString(self.data[i]) + '))))))))))))))))))))))');
			}*/
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
				/*console.log('filter ' + filterName + ' values: ');
				console.log(filter.values);
				console.log('active value = ' + filter.activeValue);*/
			}
			//debugLine('filter ' + filterName);
			/*for (val in filter.values)
			{
				console.log(val);
			}
			console.log('=');*/
			//console.log('[' + filter.values.toString() + '].indexOf(' + dataField + ') = ' + filter.values.indexOf(dataField));
			/*console.log('radioFilter ' + filterName + ', filter.activeValue = ' + filter.activeValue
				+ ', dataField = ' + dataField
			);*/
			
			if (typeof filter.activeValue === 'undefined'
				|| (filter.dynamic && filter.values[filter.activeValue] == dataField)
				|| (!filter.dynamic && filter.activeValue == dataField)
			)
			{
				/*if (filterName == 'body')
				{
				console.log('filter ' + filterName + ': okToAdd "' + dataField
					+ '", because: typeof filter.activeValue === \'undefined\' = ' + (typeof filter.activeValue === 'undefined')
					+ ', filter.dynamic = ' + filter.dynamic + ', filter.values[' + filter.activeValue + '] = ' + filter.values[filter.activeValue]
					+ ', dataField = ' + dataField
				);
				}*/
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
	}
	self = null;
}

ServicesApp.prototype.filterFavoritesData = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//debugLine('window.filterPriceActive = ' + window.filterPriceActive);
	
	for (var i = 0; i < self.favoritesData.length; i++)
	{
		var okToAddGlobal = true;
		/*for (filterName in self.rangeFilters)
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
		}*/
		
		if (okToAddGlobal)
		{
			self.prepagedFavoritesData.push(deepCopy(self.favoritesData[i]));
		}
	}
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

ServicesApp.prototype.listItemLabelFunctionAdvanced = function( item, idx, self) {
	var self = typeof self === 'undefined' ? this : self;
	
	var selectedBranch = 0;
	
	ret = '<div class="megalist-co">'
		//+ '<tbody>'
		+ '<div class="co-left">'
		+ '<span class="co-selected';
	if (self.favorites.indexOf(item.absoluteIndex) != -1)
	{
		ret += ' selected">Sačuvan'
	}
	else
	{
		ret += '">&nbsp;';
	}
	ret	+= '</span><img src="img/company/'
			+ item.thumb + '" class="co-image" />';
	if (item.shownSponsored)
	{
		ret += '<span class="co-sponsored">Sponzorisan</span>';
	}
	else
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '<div class="co-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-co-name"'
		+ '>'
			+ item.branches[selectedBranch].name
		+ '</span></div>'
		+ '<div class="col-3"><span class="megalist-co-score">'
		+ '<span class="score">'
		+ '<span class="score-bar score-' + (item.scores.number > 0 ? Math.round(self.getAverageScore(item.scores)) : 0) + 'of5">'
		+ '<span class="score-segment score-segment-1">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-2">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-3">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-4">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-5">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '</span><!--score-bar-->'
		+ '</span><!--score-->'
			+ (item.scores.number > 0
				? (item.scores.number + ' ' + formatScoreCountText(item.scores.number))
				: self.noScoreText)
		+ '</span></div>'
		+ '</div><!--first-row-->'
		/*+ '<tr class="second-row">'
		+ '<td class="col-2" colspan="2"><span>'
		//+ item.seller.type + ', '
		//+ item.seller.address.city
		+ '</span></td>'
		+ '</tr>'*/
		+ '<div class="partner-row">'
		+ '<div class="col-2">'
	if (item.partner)
	{
		ret += '<span class="co-partner">'
			+ '<a href="#" class="partner-link">'
			+ '<img src="img/partner.png" />'
			+ '</a>'
			+ '</span> ';
	}
	if (!item.partner)
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '</div><!--partner-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].city
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3 megalist-co-distance">'
		+ formatDistance(item.branches[selectedBranch].distance);
	//if (item.locations.length > 0)
	{
		ret += '<div class="map-marker">'
			+ self.getLocationNumber(item)
			+ '</div>';
	}
	ret	+= '</div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].address
		+ '</span></div>'
		+ '<div class="col-3"><span class="eval-desc">'
		+ '</span></div>'
		+ '</div><!--fourth-row-->'
		//+ '</tbody>'
		+ '</div><!--co-right-->'
		+ '</div><!--megalist-co-->'
		+ '<div class="megalist-co-overlay">&nbsp;</div>';
		
	self = null;
	return ret;
}

ServicesApp.prototype.listItemLabelFunctionFavoritesAdvanced = function(item, idx, self) {
	var self = typeof self === 'undefined' ? this : self;
	
	var selectedBranch = 0;
	
	ret = '<div class="megalist-co">'
		//+ '<tbody>'
		+ '<div class="co-left">'
		+ '<span class="co-selected';
	if (self.favorites.indexOf(item.absoluteIndex) != -1)
	{
		ret += ' selected">Sačuvan'
	}
	else
	{
		ret += '">&nbsp;';
	}
	ret	+= '</span><img src="img/company/'
			+ item.thumb + '" class="co-image" />';
	if (item.shownSponsored)
	{
		ret += '<span class="co-sponsored">Sponzorisan</span>';
	}
	else
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '<div class="co-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-co-name"'
		+ '>'
			+ item.branches[selectedBranch].name
		+ '</span></div>'
		+ '<div class="col-3"><span class="megalist-co-score">'
		+ '<span class="score">'
		+ '<span class="score-bar score-' + (item.scores.number > 0 ? Math.round(self.getAverageScore(item.scores)) : 0) + 'of5">'
		+ '<span class="score-segment score-segment-1">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-2">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-3">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-4">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-5">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '</span><!--score-bar-->'
		+ '</span><!--score-->'
			+ (item.scores.number > 0
				? (item.scores.number + ' ' + formatScoreCountText(item.scores.number))
				: self.noScoreText)
		+ '</span></div>'
		+ '</div><!--first-row-->'
		/*+ '<tr class="second-row">'
		+ '<td class="col-2" colspan="2"><span>'
		//+ item.seller.type + ', '
		//+ item.seller.address.city
		+ '</span></td>'
		+ '</tr>'*/
		+ '<div class="partner-row">'
		+ '<div class="col-2">'
	if (item.partner)
	{
		ret += '<span class="co-partner">'
			+ '<a href="#" class="partner-link">'
			+ '<img src="img/partner.png" />'
			+ '</a>'
			+ '</span> ';
	}
	if (!item.partner)
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '</div><!--partner-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].city
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3 megalist-co-distance">'
		+ formatDistance(item.branches[selectedBranch].distance);
	//if (item.locations.length > 0)
	{
		ret += '<div class="map-marker-favorites">'
			+ self.getFavoritesLocationNumber(item)
			+ '</div>';
	}
	ret	+= '</div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].address
		+ '</span></div>'
		+ '<div class="col-3"><span class="eval-desc">'
		+ '</span></div>'
		+ '</div><!--fourth-row-->'
		//+ '</tbody>'
		+ '</div><!--co-right-->'
		+ '</div><!--megalist-co-->'
		+ '<div class="megalist-co-overlay">&nbsp;</div>';
		
	self = null;
	return ret;
}

ServicesApp.prototype.listItemLabelFunctionSimple = function( item, idx, self ) {
	var self = typeof self === 'undefined' ? this : self;
	var selectedBranch = 0;
	
	ret = '<div class="megalist-co">'
		//+ '<tbody>'
		+ '<div class="co-left">'
		+ '<span class="co-selected';
	if (self.favorites.indexOf(item.absoluteIndex) != -1)
	{
		ret += ' selected">Sačuvan'
	}
	else
	{
		ret += '">&nbsp;';
	}
	ret	+= '</span><img src="img/company/'
			+ item.thumb + '" class="co-image" />';
	if (item.shownSponsored)
	{
		ret += '<span class="co-sponsored">Sponzorisan</span>';
	}
	else
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '<div class="co-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-co-name"'
		+ '>'
			+ item.branches[selectedBranch].name
		+ '</span></div>'
		+ '<div class="col-3"><span class="megalist-co-score">'
		+ '<span class="score">'
		+ '<span class="score-bar score-' + (item.scores.number > 0 ? Math.round(self.getAverageScore(item.scores)) : 0) + 'of5">'
		+ '<span class="score-segment score-segment-1">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-2">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-3">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-4">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-5">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '</span><!--score-bar-->'
		+ '</span><!--score-->'
			+ (item.scores.number > 0
				? (item.scores.number + ' ' + formatScoreCountText(item.scores.number))
				: self.noScoreText)
		+ '</span></div>'
		+ '</div><!--first-row-->'
		/*+ '<tr class="second-row">'
		+ '<td class="col-2" colspan="2"><span>'
		//+ item.seller.type + ', '
		//+ item.seller.address.city
		+ '</span></td>'
		+ '</tr>'*/
		+ '<div class="partner-row">'
		+ '<div class="col-2">'
	if (item.partner)
	{
		ret += '<span class="co-partner">'
			+ '<a href="#" class="partner-link">'
			+ '<img src="img/partner.png" />'
			+ '</a>'
			+ '</span> ';
	}
	if (!item.partner)
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '</div><!--partner-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].city
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3 megalist-co-distance">'
		+ formatDistance(item.branches[selectedBranch].distance);
	//if (item.locations.length > 0)
	{
		ret += '<div class="map-marker">'
			+ self.getLocationNumber(item)
			+ '</div>';
	}
	ret	+= '</div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].address
		+ '</span></div>'
		+ '<div class="col-3"><span class="eval-desc">'
		+ '</span></div>'
		+ '</div><!--fourth-row-->'
		//+ '</tbody>'
		+ '</div><!--co-right-->'
		+ '</div><!--megalist-co-->'
		+ '<div class="megalist-co-overlay">&nbsp;</div>';
		
	self = null;
	return ret;
	/*var self = typeof self === 'undefined' ? this : self;
	ret = '<div class="megalist-car">'
		//+ '<tbody>'
		+ '<div class="car-left">'
		+ '<span class="car-selected';
	if (self.favorites.indexOf(item.absoluteIndex) != -1)
	{
		ret += ' selected">Sačuvan'
	}
	else
	{
		ret += '">&nbsp;';
	}
	ret	+= '</span><img src="img/car/'
			+ item.thumbs[0] + '" class="car-image" />';
	if (item.shownSponsored)
	{
		ret += '<span class="car-sponsored">Sponzorisan</span>';
	}
	else
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '<div class="car-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-co-name"'
		+ '>'
			+ item.year + ' '
			+ item.maker + ' '
			+ item.model
		+ '</span></div>'
		+ '<div class="col-3"><span class="megalist-car-price">'
			+ formatCurrency(item.price, true, false, 2, ',', '.')
		+ '</span></div>'
		+ '</div><!--first-row-->'
		+ '<div class="crashed-row">'
		+ '<div class="col-2">'
	if (item.crashed)
	{
		ret += '<span class="car-crashed">Havarisan</span> ';
	}
	if (!item.crashed)
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '</div><!--crashed-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ item.props[0] + ', '
		+ formatDistance(item.mileage, true, false, 2, ',', '.')
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3">'
		+ item.seller.type
		+ '</div>'
		+ '<div class="col-4 megalist-car-eval';
		switch (item.aboveBelow)
		{
			case 1:
				ret += ' above';
				break;
			case 2:
				ret += ' below';
				break;
			case 3:
				ret += ' near-above';
				break;
			case 4:
				ret += ' near-below';
				break;
			default:
				break;
		}
	ret	+= '">&nbsp;<span>'
		+ (item.aboveBelow == 0 ? item.eval : formatCurrency(item.eval, true, false, 2, ',', '.'))
		+ ' '
		+ self.evalImage(item.aboveBelow)
		+ '</span></div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ self.radioFilters.fueltype.values[item.fueltype] + ', '
		+ formatVolume(item.features.volume, true, false, 2, ',', '') + ', '
		+ item.gear
		+ '</span></div>'
		+ '<div class="col-3">'
		+ item.seller.address.city
		+ '</div>'
		+ '<div class="col-4"><span class="eval-desc">'
		+ item.evalDesc
		+ '</span></div>'
		+ '</div><!--fourth-row-->'
		//+ '</tbody>'
		+ '</div><!--car-right-->'
		+ '</div><!--megalist-car-->'
		+ '<div class="megalist-car-overlay">&nbsp;</div>';
	return ret;*/
}

ServicesApp.prototype.listItemLabelFunctionFavoritesSimple = function( item, idx, self ) {
	var self = typeof self === 'undefined' ? this : self;
	var selectedBranch = 0;
	
	ret = '<div class="megalist-co">'
		//+ '<tbody>'
		+ '<div class="co-left">'
		+ '<span class="co-selected';
	if (self.favorites.indexOf(item.absoluteIndex) != -1)
	{
		ret += ' selected">Sačuvan'
	}
	else
	{
		ret += '">&nbsp;';
	}
	ret	+= '</span><img src="img/company/'
			+ item.thumb + '" class="co-image" />';
	if (item.shownSponsored)
	{
		ret += '<span class="co-sponsored">Sponzorisan</span>';
	}
	else
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '<div class="co-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-co-name"'
		+ '>'
			+ item.branches[selectedBranch].name
		+ '</span></div>'
		+ '<div class="col-3"><span class="megalist-co-score">'
		+ '<span class="score">'
		+ '<span class="score-bar score-' + (item.scores.number > 0 ? Math.round(self.getAverageScore(item.scores)) : 0) + 'of5">'
		+ '<span class="score-segment score-segment-1">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-2">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-3">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-4">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '<span class="score-segment score-segment-5">'
		+ '&nbsp;'
		+ '</span><!--score-segment-->'
		+ '</span><!--score-bar-->'
		+ '</span><!--score-->'
			+ (item.scores.number > 0
				? (item.scores.number + ' ' + formatScoreCountText(item.scores.number))
				: self.noScoreText)
		+ '</span></div>'
		+ '</div><!--first-row-->'
		/*+ '<tr class="second-row">'
		+ '<td class="col-2" colspan="2"><span>'
		//+ item.seller.type + ', '
		//+ item.seller.address.city
		+ '</span></td>'
		+ '</tr>'*/
		+ '<div class="partner-row">'
		+ '<div class="col-2">'
	if (item.partner)
	{
		ret += '<span class="co-partner">'
			+ '<a href="#" class="partner-link">'
			+ '<img src="img/partner.png" />'
			+ '</a>'
			+ '</span> ';
	}
	if (!item.partner)
	{
		ret += '<span>&nbsp;</span>';
	}
	ret += '</div>'
		+ '</div><!--partner-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].city
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3 megalist-co-distance">'
		+ formatDistance(item.branches[selectedBranch].distance);
	//if (item.locations.length > 0)
	{
		ret += '<div class="map-marker-favorites">'
			+ self.getFavoritesLocationNumber(item)
			+ '</div>';
	}
	ret	+= '</div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ item.branches[selectedBranch].address
		+ '</span></div>'
		+ '<div class="col-3"><span class="eval-desc">'
		+ '</span></div>'
		+ '</div><!--fourth-row-->'
		//+ '</tbody>'
		+ '</div><!--co-right-->'
		+ '</div><!--megalist-co-->'
		+ '<div class="megalist-co-overlay">&nbsp;</div>';
		
	self = null;
	return ret;
}

function evalShortDesc(aboveBelow)
{
	switch (aboveBelow)
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
}

ServicesApp.prototype.switchView = function(viewType, bRefresh, self)
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
	
	if (viewType == ServicesApp.prototype.ADVANCED_VIEW)
	{
		self.preventShowingRightDetailOverride = !$('#right-side').hasClass('active');
		// Advanced
		if (!refresh)
		{
			var wasSimple = $('#main').hasClass('simple');
			//var wasMap = $('#main').hasClass('map');
			self.lastAccordionId = 'accordion-000';
			$('#view-type-button-advanced').addClass('selected');
			//$('#right-side').removeClass('simple');
			//$('#left-side').removeClass('simple');
			$('#top-ad').removeClass('simple');
			//$('#right-ad').removeClass('simple');
			$('#bottom-ad').removeClass('simple');
			$('#bottom-pager').removeClass('simple');

			self.initFilters(ServicesApp.prototype.ADVANCED_VIEW, self);
			
			$('#right-side').removeClass('simple');
			$.when(
				$('#main-map').animate({ opacity: '0.0' }, self.switchViewAnimationDelay),
				$('#right-ad').animate({ opacity: '0.0' }, self.switchViewAnimationDelay)
			).done($.proxy(function() {
				$('#right-ad')
					.removeClass('simple');
					//.css({ opacity: '1.0' })
				$.when(
					$('.third-row .col-3').animate({ opacity: '0.0' }, this.switchViewAnimationDelay),
					$('.fourth-row .col-3').animate({ opacity: '0.0' }, this.switchViewAnimationDelay)
				).done($.proxy(function() {
					$.when(
						$.proxy(function() {
							if (wasSimple)
							{
								$('#left-side').removeClass('simple');
								$('#left-list').data('advlist').setDataFormat(this.listItemLabelFunctionAdvanced);
								if (this.favoritesMegalistInitialized)
								{
									$('#left-list-favorites').data('advlist').setDataFormat(this.listItemLabelFunctionFavoritesAdvanced);
								}
								this.refreshResultList(this);
								this.refreshFavoritesList(this);
								$('#left-side .slimScrollDiv')
									.css({ width: this.ssWidth[this.SIMPLE_VIEW] + 'px' });
								$('#left-side #megalists')
									.css({ width: this.ssWidth[this.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist')
									.css({ width: this.megalistWidth[this.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist ul')
									.css({ width: this.megalistWidth[this.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist li')
									.css({ width: this.megalistLIWidth[this.SIMPLE_VIEW] + 'px' });
								$('#left-side')
									.css({ width: this.leftSideWidth[this.SIMPLE_VIEW] + 'px' });
							}
						}, this) (),
						/*function() {
							if (wasMap)
							{
								$('#left-map')
									.css({ opacity: '1.0' })
									.animate({ opacity: '0.0' }, this.switchViewMapAnimationDelay);
								$('#megalists')
									.css({ opacity: '0.0' })
									.animate({ opacity: '1.0' }, this.switchViewMapAnimationDelay);
							}
						} (),*/
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
						$('#main').removeClass('simple map');
						
						this.megaListWidth = this.ssWidth[this.viewType];
						/*this.advancedViewMegaListHeight =
							$('body').height()
								- $('#left-list-tabs').position().top
								- $('#left-list-tabs').height()
								+ this.advancedViewMegaListHeightAdjust;
						*/

						this.setupAdvancedViewHeights(undefined, this);

						// Unless we save the height value here, it will be reset by the plugin!
						var listHeight = $('#left-list').height();
						var listWidth = this.megaListWidth;
						$('#left-list').data('advlist').setWidth(listWidth);
						$('#left-list').data('advlist').setHeight(listHeight);
						if (this.favoritesMegalistInitialized)
						{
							$('#left-list-favorites').data('advlist').setWidth(listWidth);
							$('#left-list-favorites').data('advlist').setHeight(listHeight);
						}
						
						this.resetEmailForm(true);
						this.scrollRightSideBar(0, true);
						
						this.refreshResultList(this);
						this.refreshFavoritesList(this);

						var $map = $('#main-map');
						$map.css('opacity', '');
						$('#right-side').prepend($map.detach());
						$map = null;
						
						$(window).trigger('resize');
					}, this));
				}, this));
			}, self));
		}
		
		//$('#footer-wrapper').removeClass('simple');
		
	}
	else if (viewType == self.SIMPLE_VIEW)
	{
		// Simple
		if (!refresh)
		{
			//var wasMap = $('#main').hasClass('map');
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

			self.initFilters(self.SIMPLE_VIEW, self);

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
					/*function() {
						if (wasMap)
						{
							$('#left-map')
								.css({ opacity: '1.0' })
								.animate({ opacity: '0.0' }, self.switchViewMapAnimationDelay);
							$('#megalists')
								.css({ opacity: '0.0' })
								.animate({ opacity: '1.0' }, self.switchViewMapAnimationDelay);
						}
					} (),*/
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
					$('#main-map')
						.css({ opacity: '0.0' })
						.animate({ opacity: '1.0' }, this.switchViewAnimationDelay);
		
					this.megaListWidth = $('#left-side').width();
					/*this.advancedViewMegaListHeight =
						$('body').height()
							- $('#left-list-tabs').position().top
							- $('#left-list-tabs').height()
							+ this.advancedViewMegaListHeightAdjust;
					*/
					
					this.setupAdvancedViewHeights(undefined, this);

					// Unless we save the height value here, it will be reset by the plugin!
					var listHeight = $('#left-list').height();
					var listWidth = this.megaListWidth;
					$('#left-list').data('advlist').setWidth(listWidth);
					$('#left-list').data('advlist').setHeight(listHeight);
					if (this.favoritesMegalistInitialized)
					{
						$('#left-list-favorites').data('advlist').setWidth(listWidth);
						$('#left-list-favorites').data('advlist').setHeight(listHeight);
					}
					
					$('#left-side').addClass('simple');
					$('#main').removeClass('map');

					$.when(
						//$('.third-row .col-2').css({ opacity: '0.0' }),
						//$('.fourth-row .col-2').css({ opacity: '0.0' })
						$.proxy(function() {
							$('#left-list').data('advlist').setDataFormat(this.listItemLabelFunctionSimple);
							if (this.favoritesMegalistInitialized)
							{
								$('#left-list-favorites').data('advlist').setDataFormat(this.listItemLabelFunctionFavoritesSimple);
							}

							this.resetEmailForm(false);
							this.scrollRightSideBar(0, true);
							
							this.refreshResultList(this);
							this.refreshFavoritesList(this);
							
							$(window).trigger('resize');
						}, this) ()
					).done($.proxy(function() {
						$('.third-row .col-3').css({ opacity: '0.0' });
						$('.fourth-row .col-3').css({ opacity: '0.0' });
						$.when(
							$('.third-row .col-3').animate({ opacity: '1.0' }, this.switchViewAnimationDelay),
							$('.fourth-row .col-3').animate({ opacity: '1.0' }, this.switchViewAnimationDelay)
						).done($.proxy(function() {
							$('#left-side').removeClass('animating');
							$('.third-row .col-3').css('opacity', '');
							$('.fourth-row .col-3').css('opacity', '');
							
							var $map = $('#main-map');
							$map.css('opacity', '');
							$('#right-side').after($map.detach());
							$map = null;
						}, this));
					}, this));
				}, this));
				//self = null;
			}, self));
		}
	}
	/*else if (viewType == self.MAP_VIEW)
	{
		// Map
		self.preventShowingRightDetailOverride = !$('#right-side').hasClass('active');
		if (!refresh)
		{
			var wasSimple = $('#main').hasClass('simple');
			var wasMap = $('#main').hasClass('map');
			self.lastAccordionId = 'accordion-000';
			$('#view-type-button-map').addClass('selected');
			//$('#right-side').removeClass('simple');
			//$('#left-side').removeClass('simple');
			$('#top-ad').removeClass('simple');
			//$('#right-ad').removeClass('simple');
			$('#bottom-ad').removeClass('simple');
			$('#bottom-pager').removeClass('simple');

			self.initFilters(self.MAP_VIEW, self);
			
			$('#right-side').removeClass('simple');
			$('#right-ad').animate({ opacity: '0.0' }, self.switchViewAnimationDelay, function() {
				$('#right-ad')
					.removeClass('simple');
					//.css({ opacity: '1.0' })
				$.when(
					$('.third-row .col-3').animate({ opacity: '0.0' }, self.switchViewAnimationDelay),
					$('.fourth-row .col-3').animate({ opacity: '0.0' }, self.switchViewAnimationDelay)
				).done(function() {
					$.when(
						function() {
							if (typeof self.leftMap === 'undefined')
							{
								self.leftMap = initMap('#left-map-canvas', self.defaultLeftMapZoom, 44.821299, 20.454226);
							}
							$('#left-map')
								.css({ opacity: '0.0' })
								.animate({ opacity: '1.0' }, self.switchViewMapAnimationDelay);
							$('#megalists')
								.css({ opacity: '1.0' })
								.animate({ opacity: '0.0' }, self.switchViewMapAnimationDelay);
							if (wasSimple)
							{
								$('#left-side').removeClass('simple');
								$('#left-list').data('advlist').setDataFormat(self.listItemLabelFunctionAdvanced);
								$('#left-list-favorites').data('advlist').setDataFormat(self.listItemLabelFunctionAdvanced);
								//self.refreshResultList(self);
								//self.refreshFavoritesList(self);
								$('#left-side .slimScrollDiv')
									.css({ width: self.ssWidth[self.SIMPLE_VIEW] + 'px' });
								$('#left-side #megalists')
									.css({ width: self.ssWidth[self.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist')
									.css({ width: self.megalistWidth[self.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist ul')
									.css({ width: self.megalistWidth[self.SIMPLE_VIEW] + 'px' });
								$('#left-side .megalist li')
									.css({ width: self.megalistLIWidth[self.SIMPLE_VIEW] + 'px' });
								$('#left-side')
									.css({ width: self.leftSideWidth[self.SIMPLE_VIEW] + 'px' });
							}
						} (),
						$('#left-side .slimScrollDiv')
							.animate({ width: self.ssWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay),
						$('#left-side #megalists')
							.animate({ width: self.ssWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay),
						$('#left-side .megalist')
							.animate({ width: self.megalistWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay),
						$('#left-side .megalist ul')
							.animate({ width: self.megalistWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay),
						$('#left-side .megalist li')
							.animate({ width: self.megalistLIWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay),
						$('#left-side')
							.animate({ width: self.leftSideWidth[self.viewType] + 'px' }, self.switchViewAnimationDelay)
					).done(function() {
						$('#main')
							.removeClass('simple')
							.addClass('map');
						
						self.megaListWidth = self.ssWidth[self.viewType];

						self.setupAdvancedViewHeights(undefined, self);

						// Unless we save the height value here, it will be reset by the plugin!
						var listHeight = $('#left-list').height();
						var listWidth = self.megaListWidth;
						$('#left-list').data('advlist').setWidth(listWidth);
						$('#left-list-favorites').data('advlist').setWidth(listWidth);
						$('#left-list').data('advlist').setHeight(listHeight);
						$('#left-list-favorites').data('advlist').setHeight(listHeight);
						
						self.resetEmailForm(true);
						self.scrollRightSideBar(0, true);
						
						self.refreshResultList(self);
						self.refreshFavoritesList(self);
						
						$(window).trigger('resize');
						$('#left-map').css({
							'height': self.advancedViewMegaListHeight + 'px',
							'min-height': self.advancedViewMegaListHeight + 'px'
						});
						google.maps.event.trigger(self.leftMap,'resize');
						if (self.leftMapMarkers.length > 0 && self.leftMapMarkers[0].markers.length > 0)
						{
							self.centerMarkerLeft(0, 0, self);
						}
					});
				});
			});
		}
	}*/
	
	if (self.viewType == ServicesApp.prototype.ADVANCED_VIEW //|| self.viewType == self.MAP_VIEW
		)
	{
		// Simulate list click
		if (self.selectedItemFromTab != -1)
		{
			if (self.selectedItemFromTab == 0)
			{
				$('#left-list').data('advlist').triggerOnClick(self.selectedDisplayedIndex);
			}
			else if (self.selectedItemFromTab == 1)
			{
				if (this.favoritesMegalistInitialized)
				{
					$('#left-list-favorites').data('advlist').triggerOnClick(self.selectedDisplayedFavoritesIndex);
				}
			}
			self.setupRightDetailScroll(true, undefined, self);
			self.advancedViewShowRightSideDetail(self);
		}
		self.preventShowingRightDetailOverride = false;
	}
	//self = null;
}

ServicesApp.prototype.setupAdvancedViewHeights = function(forceOverPanel, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('setupAdvancedViewHeights()');
	var forceOverPanel = typeof forceOverPanel !== 'undefined' ? forceOverPanel : false;
	var bottom = $('body').height();
	
	var mainHeight = self.advancedViewMegaListHeight
			+ $('#left-list-tabs-outer').height();
	
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
		/*console.log('setting detailHeight to ' + detailHeight
			+ 'px. Why? Because bottom = ' + bottom
			+ ' (body.height = ' + $('body').height() + ', body.outerHeight = ' + $('body').outerHeight() + ') '
			+ ' and self.rightDetailHeightAdjust[self.viewType] = ' + self.rightDetailHeightAdjust[self.viewType]
			//+ ' and $(\'#right-detail-tabs\').position().top = ' + $('#right-detail-tabs').position().top
			//+ ' and $(\'#right-detail-tabs\').height() = ' + $('#right-detail-tabs').height()
		);*/
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
	
	$('#main-map-canvas').css({
		'height': self.advancedViewMegaListHeight - self.mapCanvasPadding + 'px',
		'min-height': self.advancedViewMegaListHeight - self.mapCanvasPadding + 'px'
	});
	
	$('#megalists').css({
		'height': self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px'
	});
	
	var $elem = $('#left-list').data('advlist');
	if (typeof $elem !== 'undefined')
	{
		$elem.setHeight(self.advancedViewMegaListHeight + 'px', forceOverPanel);
	}
	$elem = $('#left-list-favorites').data('advlist');
	if (typeof $elem !== 'undefined')
	{
		$elem.setHeight(self.advancedViewMegaListHeight + 'px', forceOverPanel);
	}
	$elem = null;

	$('#megalists .slimScrollDiv:has(.megalist.active)').css({
		'height': self.advancedViewMegaListHeight + 'px',
		'min-height': self.advancedViewMegaListHeight + 'px',
		'display': 'block'
	});
	$('#megalists .slimScrollDiv:not(:has(.megalist.active))').css({
		'display': 'none'
	});
	self.debugLine('2796: SETTING #left-list.height() TO ' + self.advancedViewMegaListHeight);
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
}

ServicesApp.prototype.hardFooterTop = function()
{
	/*console.log('hardFooterTop() = $(\'body\').height() ['+$('body').height()
		+'] - $(\'#footer-wrapper\').outerHeight() ['+$('#footer-wrapper').outerHeight()
		+'] = '
		+($('body').height() - $('#footer-wrapper').outerHeight()));*/
	return $('body').height() - $('#footer-wrapper').outerHeight(true);
}

ServicesApp.prototype.setupSimpleViewHeights = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.debugLine('setupSimpleViewHeights()');
	//window.alert('window.simpleViewFooterMinTop='+window.simpleViewFooterMinTop);
	var $detail = $('#right-side > .slimScrollDiv');
	if ($detail.length == 0)
	{
		$detail = $('#right-side-inner');
	}

	self.debugLine('hardFooterTop() = ' + self.hardFooterTop()
		+ ', simpleviewfootermintop = ' + self.simpleViewFooterMinTop);
	if (self.hardFooterTop() < self.simpleViewFooterMinTop)
	{
		rightSideActive = $('#right-detail').hasClass('active')
			;
		megaListHeight = $('#right-ad').outerHeight(true);
		self.debugLine('3006: megaListHeight = ' + megaListHeight);
		if (rightSideActive)
		{
			var viewportHeight = $('body').height()
					- $('#main').position().top;
			var longestPageHeight = 0;
			self.debugLine('2845: #ad-page.height() = ' + $('#ad-page').height());
			self.debugLine('$(\'#right-detail-general-notes-002\').text() = '
				+ $('#right-detail-general-notes-002').text());
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
			self.debugLine('setupSimpleViewHeights: mainHeight = ' + mainHeight
				+ ', window.simpleViewFooterMinTop = ' + self.simpleViewFooterMinTop
				+ ', longestPageHeight = ' + longestPageHeight);
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
		self.debugLine('2922: SETTING #left-list HEIGHT TO ' + megaListHeight);
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
		self.debugLine('#left-list.height() NOW ' + $('#left-list').height());
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
		self.debugLine('2960: SETTING #left-list HEIGHT TO ' + self.simpleViewMegaListHeight);
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
	self.debugLine('2975: #ad-page.height() = ' + $('#ad-page').height());
}

ServicesApp.prototype.initializeFavoritesMegalist = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('initializeFavoritesMegalist()');
	// TODO: Da li je ovo ispitivanje neophodno?
	if (self.viewType == ServicesApp.prototype.ADVANCED_VIEW)
	{
		$('#left-list-favorites')
			.off('scroll')
			.advlist({
				dataCreate: self.createFavoritesDataProvider,
				dataCreateParam: self,
				dataFormat: self.listItemLabelFunctionFavoritesAdvanced,
				dataFormatParam: self,
				onAfterDataCreate: self.onAfterFavoritesDataCreate,
				onAfterDataCreateParam: self,
				onClick: self.listChangeHandler,
				onClickParam: self,
				onMouseOver: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').addClass('hovered');
					$('#main-map').find('.map-marker-favorites').removeClass('hovered');
					$('#main-map').find('.map-marker-favorites[data-marker-absolute-id='
						+ obj.absoluteIndex
						+ ']').addClass('hovered');
					$li = null;
				},
				onMouseOut: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').removeClass('hovered');
					$('#main-map').find('.map-marker-favorites').removeClass('hovered');
					$li = null;
				},
				slimScrollShowSpeed: self.slimScrollShowSpeed,
				slimScrollHideSpeed: self.slimScrollHideSpeed,
				width: self.ssWidth[self.viewType] + 'px',
				itemHeight: self.listItemHeight
			})
			.on('scroll', $.proxy(function(evt) {
				if (this.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
				{
					this.showDisplayedFavoritesMarkers($('#left-list-favorites').data('advlist').getVisibleItems(),
						this.displayedFavoritesData,
						this
					);
				}
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
			.advlist({
				dataCreate: self.createFavoritesDataProvider,
				dataCreateParam: self,
				dataFormat: self.listItemLabelFunctionFavoritesSimple,
				dataFormatParam: self,
				onAfterDataCreate: self.onAfterFavoritesDataCreate,
				onAfterDataCreateParam: self,
				onClick: self.listChangeHandler,
				onClickParam: self,
				onMouseOver: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').addClass('hovered');
					$('#main-map').find('.map-marker-favorites').removeClass('hovered');
					$('#main-map').find('.map-marker-favorites[data-marker-absolute-id='
						+ obj.absoluteIndex
						+ ']').addClass('hovered');
					$li = null;
				},
				onMouseOut: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').removeClass('hovered');
					$('#main-map').find('.map-marker-favorites').removeClass('hovered');
					$li = null;
				},
				slimScrollShowSpeed: self.slimScrollShowSpeed,
				slimScrollHideSpeed: self.slimScrollHideSpeed,
				width: self.ssWidth[self.viewType] + 'px',
				itemHeight: self.listItemHeight
			})
			.on('scroll', $.proxy(function(evt) {
				if (this.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
				{
					this.showDisplayedFavoritesMarkers($('#left-list-favorites').data('advlist').getVisibleItems(),
						this.displayedFavoritesData,
						this
					);
				}
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
	self.favoritesMegalistInitialized = true;
	self = null;
}

ServicesApp.prototype.calculateSimpleViewHeight = function(self)
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

ServicesApp.prototype.simpleViewItemsPerPage = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	listItemHeight = parseInt($(7.5).toPx());/*$('#megalists li')//$('.megalistItem')
		.outerHeight(true);*/
	self.debugLine('3029: #left-list.height() = ' + $('#left-list').height());
	if (self.activeTabIndex == ServicesApp.prototype.RESULTS_TAB)
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

ServicesApp.prototype.simpleViewNumPages = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (self.activeTabIndex == ServicesApp.prototype.RESULTS_TAB)
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

ServicesApp.prototype.compareItemsByName = function(i1, i2, self)
{
	//var self = typeof self === 'undefined' ? this : self;
	return (i1.name > i2.name) ? 1 : (i1.name < i2.name ? -1 : 0);
}

ServicesApp.prototype.compareItemsByScore = function(i1, i2, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var s1 = self.getAverageScore(i1.scores);
	var s2 = self.getAverageScore(i2.scores);
	self = null;
	return (s1 < s2) ? 1 : (s1 > s2 ? -1 : 0);
}

ServicesApp.prototype.compareItemsByDistance = function(i1, i2, self)
{
	//var self = typeof self === 'undefined' ? this : self;
	return (i1.distance > i2.distance) ? 1 : (i1.distance < i2.distance ? -1 : 0);
}

ServicesApp.prototype.slideIn = function(pageName, activePageName, containerName, callBack, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//window.alert('slideIn: callBack = ' + (typeof callBack !== 'undefined' ? callBack.toString() : '(undefined)'));
	var $activePage = $(activePageName);
	$activePage.animate({
		'margin-left': '-20%',
		'opacity': '0.0'
	}, 200, function(){
		$(this).removeClass('active');
		$(pageName).addClass('active').css({//'margin-left': '20%',
			'margin-left': 0,
			'opacity': '0.0'
		});
		/*if (self.viewType == self.ADVANCED_VIEW)
		{*/
			self.setupAdvancedViewHeights(self);
		/*}
		else
		{
			self.setupSimpleViewHeights(self);
		}*/
		
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

ServicesApp.prototype.noAnimationSlideIn = function(pageName, activePageName, containerName, callBack, self)
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

ServicesApp.prototype.sortData = function(sortFn, self)
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

ServicesApp.prototype.sortFavoritesData = function(sortFn, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('sortFavoritesData('+sortFn.toString()+')');
	self.sortedFavoritesData = deepCopy(self.prepagedFavoritesData);
	self.sortedFavoritesData.sort(function(a, b) {
		return sortFn(a, b, self);
	});
	//debugLine('sortData: sortedFavoritesData.length = ' + window.sortedFavoritesData.length);
}

ServicesApp.prototype.sortSponsoredData = function(sortFn, self)
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
ServicesApp.prototype.applyRangeFilter = function(filterName, range, self)
{
	var self = typeof self === 'undefined' ? this : self;
	//self.debugLine('applyRangeFilter(' + filterName + ', ' + range + ')');
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

ServicesApp.prototype.applySetFilter = function(filterName, setValue, remove, self)
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

ServicesApp.prototype.applyRadioFilter = function(filterName, value, self)
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

ServicesApp.prototype.setMenuTitle = function(menuId, newTitle, self)
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

ServicesApp.prototype.assignRadioMenuEvents = function(self)
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

ServicesApp.prototype.assignRangeMenuEvents = function(self)
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

ServicesApp.prototype.assignSetMenuEvents = function(self)
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

ServicesApp.prototype.initFilters = function(viewType, self)
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

ServicesApp.prototype.clearNumberOfActiveFilters = function(self)
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

ServicesApp.prototype.decreaseNumberOfActiveFilters = function(self)
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

ServicesApp.prototype.increaseNumberOfActiveFilters = function(self)
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

ServicesApp.prototype.updateSliderLabels = function(evt, data, thisRef, formattedRange, self)
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

ServicesApp.prototype.buildRadioMenu = function($ul, filter, self)
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

ServicesApp.prototype.buildRangeMenu = function($ul, filter, self)
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

ServicesApp.prototype.buildRangeSlider = function($obj, self)
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

ServicesApp.prototype.removeAllRangeSliders = function($parentObj, self)
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

ServicesApp.prototype.resetEmailForm = function(closeForm, self)
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

ServicesApp.prototype.toggleFilters = function(self)
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

ServicesApp.prototype.showDisplayedMarkers = function(visibleItemsDisplayedIds, data, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var visibleItemsDisplayedIds = visibleItemsDisplayedIds;
	var markerList, marker, id;
	var visibleItemsAbsoluteIds = [];
	
	/*console.log('/==================================\\');
	console.log('onScroll: visibleItemsDisplayedIds = ');
	console.log(visibleItemsDisplayedIds);*/

	for (id in visibleItemsDisplayedIds)
	{
		var displayedId = visibleItemsDisplayedIds[id];
		/*console.log('displayedData[' + displayedId + '] = ');
		console.log(data[displayedId]);*/
		visibleItemsAbsoluteIds.push(data[displayedId].absoluteIndex);
	}
	
	/*console.log('displayedItems:');
	console.log(self.displayedData);
	console.log('onScroll: visibleItemsAbsoluteIds = ');
	console.log(visibleItemsAbsoluteIds);
	console.log('\\===================================/');*/
	
	for (markerListId in self.leftMapMarkers)
	{
		if (visibleItemsAbsoluteIds.indexOf(
			self.leftMapMarkers[markerListId].dataAbsoluteIndex
		) != -1)
		{
			for (marker in self.leftMapMarkers[markerListId].markers)
			{
				var wasVisible = self.leftMapMarkers[markerListId].markers[marker].visible;
				if (!wasVisible)
				{
					self.leftMapMarkers[markerListId].markers[marker]
						.setVisible(true);
					$('#main-map').find('.map-marker[data-marker-list-id=' + markerListId
						+ '][data-marker-id=' + marker + ']')
						.each($.proxy(function(index, elem){
							var gbcr = $(elem)//.parent().parent()
								[0].getBoundingClientRect();
							var top = gbcr.top;
							/*console.log('animating marker with index = ' + index);
							console.log($(elem));
							console.log('its top is: ' + top);*/
							$(elem).css({
								opacity: '0.0',
								'margin-top': '-' + top + 'px'
							})
							.finish()
							.animate({
								opacity: '1.0',
								'margin-top': 0
							}, this.markerFallingSpeed, function() {
								$(elem).css({
									opacity: '',
									'margin-top': ''
								});
							});
						}, self));
				}
				/*self.leftMapMarkers[markerListId].markers[marker]
					.setAnimation(google.maps.Animation.DROP);*/
			}
		}
		else
		{
			for (marker in self.leftMapMarkers[markerListId].markers)
			{
				self.leftMapMarkers[markerListId].markers[marker]
					.setVisible(false);
				/*self.leftMapMarkers[markerListId].markers[marker]
					.setAnimation(null);*/
			}
		}
	}
	visibleItemsAbsoluteIds = null;
	visibleItemsDisplayedIds = null;
	self = null;
}

ServicesApp.prototype.showDisplayedFavoritesMarkers = function(visibleItemsDisplayedIds, data, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var visibleItemsDisplayedIds = visibleItemsDisplayedIds;
	var markerList, marker, id;
	var visibleItemsAbsoluteIds = [];
	
	/*console.log('/==================================\\');
	console.log('onScroll: visibleItemsDisplayedIds = ');
	console.log(visibleItemsDisplayedIds);*/

	for (id in visibleItemsDisplayedIds)
	{
		var displayedId = visibleItemsDisplayedIds[id];
		/*console.log('displayedData[' + displayedId + '] = ');
		console.log(data[displayedId]);*/
		visibleItemsAbsoluteIds.push(data[displayedId].absoluteIndex);
	}
	
	/*console.log('displayedItems:');
	console.log(self.displayedData);
	console.log('onScroll: visibleItemsAbsoluteIds = ');
	console.log(visibleItemsAbsoluteIds);
	console.log('\\===================================/');*/
	
	for (markerListId in self.leftFavoritesMapMarkers)
	{
		if (visibleItemsAbsoluteIds.indexOf(
			self.leftFavoritesMapMarkers[markerListId].dataAbsoluteIndex
		) != -1)
		{
			for (marker in self.leftFavoritesMapMarkers[markerListId].markers)
			{
				var wasVisible = self.leftFavoritesMapMarkers[markerListId].markers[marker].visible;
				if (!wasVisible)
				{
					self.leftFavoritesMapMarkers[markerListId].markers[marker]
						.setVisible(true);
					$('#main-map').find('.map-marker-favorites[data-marker-list-id=' + markerListId
						+ '][data-marker-id=' + marker + ']')
						.each($.proxy(function(index, elem){
							var gbcr = $(elem)//.parent().parent()
								[0].getBoundingClientRect();
							var top = gbcr.top;
							/*console.log('animating marker with index = ' + index);
							console.log($(elem));
							console.log('its top is: ' + top);*/
							$(elem).css({
								opacity: '0.0',
								'margin-top': '-' + top + 'px'
							})
							.finish()
							.animate({
								opacity: '1.0',
								'margin-top': 0
							}, this.markerFallingSpeed, function() {
								$(elem).css({
									opacity: '',
									'margin-top': ''
								});
							});
						}, self));
				}
				/*self.leftMapMarkers[markerListId].markers[marker]
					.setAnimation(google.maps.Animation.DROP);*/
			}
		}
		else
		{
			for (marker in self.leftFavoritesMapMarkers[markerListId].markers)
			{
				self.leftFavoritesMapMarkers[markerListId].markers[marker]
					.setVisible(false);
				/*self.leftMapMarkers[markerListId].markers[marker]
					.setAnimation(null);*/
			}
		}
	}
	visibleItemsAbsoluteIds = null;
	visibleItemsDisplayedIds = null;
	self = null;
}

ServicesApp.prototype.resetStickyTabs = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	//ServicesApp.prototype.unFixUpperBar = function(self, scrollTop, fixTitle, scrollingRight)
	$('#right-detail-inner').slimScroll({ scrollTo: '0' });
	/*$('#right-detail-tabs')
		.css('top', '')
		.removeClass('fixed');*/
		
	//self.unFixUpperBar(self, 0, self.upperBarShouldBeFixed(self), true);
}

ServicesApp.prototype.initInfoPopup = function(activate, self)
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

ServicesApp.prototype.init = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	self.sortFunction = self.compareItemsByName;
	$('#sort-menu').find('li').removeClass('checked');
	$('#sort-menu').find('.ok-mark').removeClass('checked');
	$('#menu-item-sort-name').parent().addClass('checked');
	$('#menu-item-sort-name').find('.ok-mark').addClass('checked');
	
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
	self.calculateSimpleViewHeight(self);
	
	$('#results-tab').on('click', $.proxy(function(){
		var $tab = $('#results-tab');
		if ($tab.parent().hasClass('active')) return;
		this.activeTabIndex = ServicesApp.prototype.RESULTS_TAB;
		$tab.parent().parent().children().removeClass('active');
		$tab.parent().addClass('active');
		this.slideIn('#left-list', '#megalists .slimScrollDiv > .active', '#megalists');
		this.toggleFilters();
		this.hideLeftFavoritesMapMarkers();
		this.hideDetailsFavoritesMapMarkers();
		this.showLeftMapMarkers();
		this.showDetailsMapMarkers();
		this.setCompanyCountText(this.prepagedData.length + this.sponsoredData.length);
		$tab = null;
		return false;
	}, self));
	$('#favorites-tab').on('click', $.proxy(function(){
		var $tab = $('#favorites-tab');
		if ($tab.parent().hasClass('active')) return;
		this.activeTabIndex = ServicesApp.prototype.FAVORITES_TAB;
		$tab.parent().parent().children().removeClass('active');
		$tab.parent().addClass('active');
		this.slideIn('#left-list-favorites', '#megalists .slimScrollDiv > .active', '#megalists');
		this.toggleFilters();
		this.hideLeftMapMarkers();
		this.hideDetailsMapMarkers();
		this.showLeftFavoritesMapMarkers();
		this.showDetailsFavoritesMapMarkers();
		this.setCompanyCountText(this.prepagedFavoritesData.length);
		$tab = null;
		return false;
	}, self));
	
	/*if (self.viewType == self.ADVANCED_VIEW)
	{*/
		self.setupAdvancedViewHeights(self);
	/*}
	else
	{
		self.setupSimpleViewHeights(self);
	}*/
	$('#view-type-button-advanced').addClass('selected');

	/*if (self.viewType == self.ADVANCED_VIEW)
	{*/
		$('#left-list')
			.off('scroll')
			.advlist({
				dataCreate: self.createDataProvider,
				dataCreateParam: self,
				dataFormat: self.listItemLabelFunctionAdvanced,
				dataFormatParam: self,
				onAfterDataCreate: self.onAfterDataCreate,
				onAfterDataCreateParam: self,
				onClick: self.listChangeHandler,
				onClickParam: self,
				onMouseOver: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').addClass('hovered');
					$('#main-map').find('.map-marker').removeClass('hovered');
					$('#main-map').find('.map-marker[data-marker-absolute-id='
						+ obj.absoluteIndex
						+ ']').addClass('hovered');
					$li = null;
				},
				onMouseOut: function(obj, listIndex, evt, target, self) {
					var $li = $(target);
					if ($li.prop('tagName').toLowerCase() != 'li')
					{
						$li = $li.closest('li');
					}
					$li.find('.megalist-co-name').removeClass('hovered');
					$('#main-map').find('.map-marker').removeClass('hovered');
					$li = null;
				},
				slimScrollShowSpeed: self.slimScrollShowSpeed,
				slimScrollHideSpeed: self.slimScrollHideSpeed,
				width: self.ssWidth[self.viewType] + 'px',
				height: $('#left-list').height(),
				itemHeight: self.listItemHeight
			})
			.on('scroll', $.proxy(function(evt) {
				if (this.activeTabIndex == ServicesApp.prototype.RESULTS_TAB)
				{
					// TODO: Queue it up and set up a delay instead?
					this.showDisplayedMarkers($('#left-list').data('advlist').getVisibleItems(),
						this.displayedData,
						this
					);
				}
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
	/*}
	else
	{
		$('#left-list').advlist({
			dataCreate: self.createDataProvider,
			dataCreateParam: self,
			dataFormat: self.listItemLabelFunctionSimple,
			dataFormatParam: self,
			onClick: self.listChangeHandler,
			onClickParam: self,
			width: self.leftSideMegalistWidth,
			height: $('#left-list').height(),
			itemHeight: self.listItemHeight
		});
	}*/
	
	self.resultsMegalistInitialized = true;
	if (!self.favoritesMegalistInitialized)
	{
		self.initializeFavoritesMegalist();
	}
	
	self.setupRightDetailScroll(false, undefined, self);
	
	$(window).on('resize', $.proxy(function(evt){
		if ($('#info').hasClass('active'))
		{
			this.initInfoPopup(false, this);
		}
		this.megaListTop = 0;
		this.megaListWidth = $('#left-side').width();
		
		/*if (this.viewType == this.ADVANCED_VIEW)
		{*/
			this.advancedViewMegaListHeight = //hardFooterTop()
				$('body').height()
					- $('#menubar').height()
					- $('#left-list-tabs-outer').height()
					+ this.advancedViewMegaListHeightAdjust;
			this.setupAdvancedViewHeights();
		/*}
		else
		{
			this.calculateSimpleViewHeight(this);
			
			// TODO
			this.refreshResultList(this);
			this.refreshFavoritesList(this);
			this.refreshRelatedList(this);
			this.setupSimpleViewHeights(this);
		}*/
		$('#left-list').data('advlist').setHeight($('#left-list').height());
		if (this.favoritesMegalistInitialized)
		{
			$('#left-list-favorites').data('advlist').setHeight($('#left-list-favorites').height());
		}
		/*if (typeof $('#right-side-additional-related-list').data('advlist') !== 'undefined')
		{
			$('#right-side-additional-related-list').css({
				'height': $('#right-side-additional-related-list').data('advlist').getHeight(),
				'min-height': $('#right-side-additional-related-list').data('advlist').getHeight()
			});
			$('#right-side-additional-related-list').parents('.slimScrollDiv').css({
				'height': $('#right-side-additional-related-list').data('advlist').getHeight(),
				'min-height': $('#right-side-additional-related-list').data('advlist').getHeight()
			});
		}*/
		//$('#right-side-additional-related-list').data('advlist').setHeight($('#right-side-additional-related-list').height());

		//if (window.viewType == ADVANCED_VIEW)
		//{
			this.setupRightDetailScroll(false, undefined);
		//}
		if (this.activeTabIndex == ServicesApp.prototype.FAVORITES_TAB)
		{
			this.showLeftFavoritesMapMarkers();
			this.showDetailsFavoritesMapMarkers();
		}
		else
		{
			this.showLeftMapMarkers();
			this.showDetailsMapMarkers();
		}
	}, self));
	
	$('.favorite-link').on('click', $.proxy(function(){
		/*console.log('********************** self.displayedItemFromTab = ' + self.displayedItemFromTab
			+ ', self.selectedFavoritesIndex = ' + self.selectedFavoritesIndex
			+ ', self.selectedIndex = ' + self.selectedIndex
			+ ', self.displayedItemDisplayedIndex = ' + self.displayedItemDisplayedIndex
			+ ', self.displayedItemAbsoluteIndex = ' + self.displayedItemAbsoluteIndex
			+ ', self.favorites.indexOf(self.displayedItemDisplayedIndex) = ' + self.favorites.indexOf(self.displayedItemDisplayedIndex)
			+ ', self.favorites = ' + mydump(self.favorites)
		);
		console.log('data[selectedIndex] = ');
		console.log(self.carToString(self.data[self.selectedIndex]));
		console.log('displayedData[selectedIndex] = ');
		console.log(self.carToString(self.displayedData[self.selectedIndex]));
		console.log('displayedData = ');
		console.log(self.displayedData);
		console.log('data = ');
		console.log(self.data);
		console.log('sortedData = ');
		console.log(self.sortedData);*/
			
		if ((this.favorites.indexOf(this.displayedItemAbsoluteIndex) == -1)
			&& (this.displayedItemFromTab == ServicesApp.prototype.FAVORITES_TAB))
		{
			/*console.log('self.favorites.indexOf(self.displayedItemAbsoluteIndex) = '
				+ self.favorites.indexOf(self.displayedItemAbsoluteIndex)
				+ ', self.displayedItemFromTab = ' + self.displayedItemFromTab);*/
			//window.alert('self.displayedItemDisplayedIndex = ' + self.displayedItemDisplayedIndex);
			this.addToFavoritesDataOriginal(this.displayedItemAbsoluteIndex, this);
			this.unDimFavoriteLink(this);
			this.selectedFavoritesIndex = this.favorites.indexOf(this.displayedItemAbsoluteIndex);
			if (this.favoritesMegalistInitialized)
			{
				$('#left-list-favorites').data('advlist').refresh();
			}
		}
		else if ((this.selectedFavoritesIndex != -1)
			&& (this.displayedItemFromTab == ServicesApp.prototype.FAVORITES_TAB))
		{
			/*console.log('self.selectedFavoritesIndex = ' + self.selectedFavoritesIndex
				+ ', self.displayedItemFromTab = ' + self.displayedItemFromTab);*/
			var favoritesIndex = this.selectedFavoritesIndex;
			
			if (this.selectedFavoritesIndex != -1)
			{
				this.removeFromFavoritesDataNew(favoritesIndex);
				this.dimFavoriteLink();
				this.selectedFavoritesIndex = -1;
			}
		}
		else if ((this.selectedIndex != -1)
			&& (this.displayedItemFromTab == ServicesApp.prototype.RESULTS_TAB))
		{
			var newIndex = this.favorites.indexOf(
				this.selectedIndex
			);
			if (newIndex == -1)
			{
				this.addToFavoritesDataOriginal(this.selectedIndex, this);
				this.unDimFavoriteLink(this);
			}
			else
			{
				this.removeFromFavoritesDataOriginal(this.selectedIndex, this);
				this.dimFavoriteLink(this);
			}
		}
		
		this.refreshResultList(this);
		this.refreshFavoritesList(this);
		//self.refreshRelatedList(self);
	}, self));
	
	$('#view-type-button-advanced').on('click', $.proxy(function(){
		this.switchView(ServicesApp.prototype.ADVANCED_VIEW, undefined, this);
	}, self));
	$('#view-type-button-simple').on('click', $.proxy(function(){
		this.switchView(this.SIMPLE_VIEW, undefined, this);
	}, self));
	$('#view-type-button-map').on('click', $.proxy(function(){
		this.switchView(this.MAP_VIEW, undefined, this);
	}, self));
	
	$('#menu-item-sort-name').on('click', $.proxy(function(){
		var $item = $('#menu-item-sort-name');
		this.sortFunction = this.compareItemsByName;
		this.refreshResultList(this);
		this.refreshFavoritesList(this);
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po nazivu')
			.parent().addClass('checked');
		$item.parent().addClass('checked');
		$item.find('.ok-mark').addClass('checked');
		$item = null;
	}, self));
	$('#menu-item-sort-score').on('click', $.proxy(function(){
		var $item = $('#menu-item-sort-score');
		this.sortFunction = this.compareItemsByScore;
		this.refreshResultList(this);
		this.refreshFavoritesList(this);
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po oceni')
			.parent().addClass('checked');
		$item.parent().addClass('checked');
		$item.find('.ok-mark').addClass('checked');
		$item = null;
	}, self));
	$('#menu-item-sort-distance').on('click', $.proxy(function(){
		var $item = $('#menu-item-sort-distance');
		this.sortFunction = this.compareItemsByDistance;
		this.refreshResultList(this);
		this.refreshFavoritesList(this);
		$('#sort-menu').find('li').removeClass('checked');
		$('#sort-menu').find('.ok-mark').removeClass('checked');
		$('#sort-menu-title')
			.text('Sortirano po udaljenosti')
			.parent().addClass('checked');
		$item.parent().addClass('checked');
		$item.find('.ok-mark').addClass('checked');
		$item = null;
	}, self));
	
	$('#button-clear-favorites').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		delete this.displayedFavoritesData;
		delete this.favoritesData;
		delete this.favorites;
		this.displayedFavoritesData = [];
		this.favoritesData = [];
		this.favorites = [];
		
		this.dimFavoriteLink(this);
		this.refreshFavoritesList(this); // order is important here!
		this.refreshResultList(this);
		//this.refreshRelatedList(this);
		return false;
	}, self));
	
	$('#right-detail-tabs [id$=-tab]').off('click').on('click', $.proxy(function(event, callBack){
		var id = $(event.target).prop('id');
		var $tab = typeof id === 'undefined' || id.substring(id.length-4) != '-tab'
			? $(event.target).closest('[id$=-tab]') : $(event.target);
			//$('#right-detail-tabs [id$=-tab]');
		if ($tab.parent().hasClass('active'))
		{
			if (typeof callBack !== 'undefined')
			{
				callBack();
			}
			return;
		}
		$('#right-detail-tabs').children().removeClass('active');
		$tab.parent().addClass('active');
		//this.resetStickyTabs(this);
		//$('#right-detail-inner').slimScroll({ scrollTo: 0 });
		this.scrollRightSideBar(0, true);
		var tabName = $tab.prop('id').match(/(.+)-tab/)[1];
		this.slideIn('#'+tabName+'-page', '#right-detail-content > .active', '#right-detail-content', callBack);
		$tab = null;
	}, self));
	
	$('#back-to-list-button').off('click').on('click', $.proxy(function(){
		if (this.viewType == this.SIMPLE_VIEW)
		{
			this.simpleViewHideRightSideDetail(this);
		}
	}, self));
	
	self.initFilters(ServicesApp.prototype.ADVANCED_VIEW, self);
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
	
	/*$('.special-menu-item').off('click').on('click', $.proxy(function(evt){
		evt.stopPropagation();
	}, self));*/
	
	$('#button-clear-filters-global').off('click').on('click', $.proxy(function(){
		var groupClass = this.dropdownClassIds[this.viewType].groupClass;
		var toggleClass = this.dropdownClassIds[this.viewType].toggleClass;
		$('#filter-toolbar .checked').removeClass('checked');
		$('#filter-toolbar .filter-all').addClass('checked');
		$('#filter-toolbar .filter-all .ok-mark').addClass('checked');
		this.removeAllRangeSliders(undefined, this);
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

		this.refreshResultList(this);
		this.refreshFavoritesList(this);
		this.clearNumberOfActiveFilters(this);
		$('#filter-toolbar ' + this.dropdownClassIds[this.viewType].menuClass).each(
			function(idx, menu) {
				var id = $(menu).prop('id');
				if (id.length > 0)
				{
					this.setMenuTitle('#' + 	id, undefined, this);
				}
			}
		);
	}, self));

	$('.range-slider-wrapper').off('click').on('click', $.proxy(function(evt){
		var $target = $(evt.target).hasClass('range-slider-wrapper')
			? $(evt.target) : $(evt.target).closest('.range-slider-wrapper');
		if ($target.find('.range-slider').length > 0)
		{
			this.removeAllRangeSliders($target, this);
		}
		else
		{
			this.buildRangeSlider($target, this);
		}
		$target = null;
	}, self));
	
	$('.filter-range-menu').on('show', function(){
		var $rangeSlider = $(this).find('.range-slider');
		if ($rangeSlider.length > 0)
		{
			$rangeSlider.rangeSlider('resize');
		}
	});
	
	/*$(document).on('click', '.right-detail-main > img', function() {
		$('#info-background').addClass('active');
		$('#info').addClass('active');
		imagePopup();
		$('.info-main').trigger('slideTo', 0).trigger('finish');
		$('.info-nav-thumbs').trigger('slideTo', 0).trigger('finish');
		$('.info-main img').each(function(){
			$('.info-main').trigger('removeItem', $(this));
		});
		$('.info-nav-thumbs img').each(function(){
			$('.info-nav-thumbs').trigger('removeItem', $(this));
		});
		var values = [];
		var thvalues = [];
		$('.right-detail-main img').each(function() {
			values.push({
				i: parseInt($(this).prop('id').substring(1)),
				url: $(this).prop('src')
			});
		});
		$('.right-detail-nav-thumbs img').each(function() {
			thvalues.push({
				i: parseInt($(this).prop('id').substring(2)),
				url: $(this).prop('src')
			});
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
	});
	$('.right-detail-main-magnifier').off('click').on('click', function() {
		var $current = $('.right-detail-main').triggerHandler('currentVisible');
		$current.trigger('click');
	});*/
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
		var $link = $('#right-detail-email-link');
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
				var $link = $('#right-detail-email-link');
				var $form = $('#right-detail-email-form');
				$form
					.removeClass('active')
					.css('height', formHeight + 'px')
					;
				$link.parent().parent().removeClass('active');
				this.rightDetailEmailAnimating = false;
				$link = null;
				$form = null;
			}, this));
		}
		else
		{
			$form.addClass('active');
			formHeight = $form.height();
			$link.parent().parent().addClass('active');
			$form
				.css('height', '0')
				.animate({'height': formHeight + 'px'}, this.emailFormRevealSpeed, $.proxy(function() {
					this.rightDetailEmailAnimating = false;
				}, this))
				;
		}
		$link = null;
		$form = null;
		$arrow = null;
		return false;
	}, self));
	
	$('#more-filters-link').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $link = $('#more-filters-link');
		var $filters = $('#toolbar-additional-filters');
		var $filterToolbar = $('#filter-toolbar');
		var filtersActive = $filters.hasClass('active');
		var filtersHeight = this.additionalFiltersHeight;
		
		if (this.moreFiltersAnimating)
		{
			return false;
		}
		
		this.moreFiltersAnimating = true;
		$link
			.text(filtersActive ? 'Jos filtera' : 'Manje filtera')
			.next().toggleClass('up down');
		
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
						$filters.stop();
						this.moreFiltersAnimating = false;
						// garbage collector
						$filters = null;
						$filterToolbar = null;
					}, this));
				}, this))
				;
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

	$('#right-detail-inner-right .btn.close').off('click').on('click', {self: self}, function(evt) {
		var self = evt.data.self;
		evt.stopPropagation();
		if (self.viewType == ServicesApp.prototype.ADVANCED_VIEW)
		{
			self.advancedViewHideRightSideDetail(self);
		}
		else if (self.viewType == self.SIMPLE_VIEW)
		{
			self.simpleViewHideRightSideDetail(self);
		}
		self = null;
		return false;
	});
	
	$(document).off('click', '.partner-link').on('click', '.partner-link', function(evt) {
		self.initInfoPopup(true, self);
		evt.stopImmediatePropagation();
		return false;
	});
	$('#megalists').off('click', 'li .partner-link').on('click', 'li .partner-link', function(evt) {
		self.initInfoPopup(true, self);
		evt.stopImmediatePropagation();
		return false;
	});
	
	$(document).off('click', '#main-map-canvas .map-marker').on('click', '#main-map-canvas .map-marker',
		$.proxy(function(evt) {
		var $marker = $(evt.target).hasClass('map-marker')
			? $(evt.target) : $(evt.target).closest('.map-marker');
		var listId = $marker.data('marker-list-id');
		var markerId = $marker.data('marker-id');
		var index = $marker.data('marker-absolute-id');
		//console.log('@@@@@@@@@@@@@@ CLICKED MARKER: listId = ' + listId + ', markerId = ' + markerId + ', index = ' + index);
		var obj = $.grep(this.displayedData, function(obj) {
			return obj.absoluteIndex == index;
		})[0];
		this.selectedMarkerListId = listId;
		this.selectedMarkerId = markerId;

		//this.listChangeHandler(obj, index, evt, this, this);

		google.maps.event.trigger(
			this.leftMapMarkers[listId].markers[markerId],
			'click'
		);

		$marker = null;
		obj = null;
	}, self));

	$(document).off('click', '#main-map-canvas .map-marker-favorites').on('click', '#main-map-canvas .map-marker-favorites',
		$.proxy(function(evt) {
		var $marker = $(evt.target).hasClass('map-marker-favorites')
			? $(evt.target) : $(evt.target).closest('.map-marker-favorites');
		var listId = $marker.data('marker-list-id');
		var markerId = $marker.data('marker-id');
		var index = $marker.data('marker-absolute-id');
		//console.log('@@@@@@@@@@@@@@ CLICKED FAVORITES MARKER: listId = ' + listId + ', markerId = ' + markerId + ', index = ' + index);
		var obj = $.grep(this.displayedFavoritesData, function(obj) {
			return obj.absoluteIndex == index;
		})[0];
		this.selectedMarkerListId = listId;
		this.selectedMarkerId = markerId;

		//this.listChangeHandler(obj, index, evt, this, this);

		google.maps.event.trigger(
			this.leftFavoritesMapMarkers[listId].markers[markerId],
			'click'
		);

		$marker = null;
		obj = null;
	}, self));
	
	$(document).off('click', '.location-link').on('click', '.location-link', {self: self}, function(evt) {
		var self = evt.data.self;
		var listId = $(this).data('marker-list-id');
		var markerId = $(this).data('marker-id');
		var index = $(this).data('marker-absolute-id');
		var obj = $.grep(self.displayedData, function(obj) {
			return obj.absoluteIndex == index;
		})[0];

		evt.stopPropagation();

		//self.clickedMarkerSourceList = ServicesApp.prototype.RESULTS_LIST;
		self.selectedMarkerListId = listId;
		self.selectedMarkerId = markerId;
		self.listChangeHandler(obj, index, evt, this, self);
		self.centerMarkerDetails(listId, markerId, self);
		google.maps.event.trigger(
			self.detailsMapMarkers[listId].markers[markerId],
			'click'
		);
		
		obj = null;
		self = null;
		return false;
	});

	$(document).off('click', '.location-link-favorites').on('click', '.location-link-favorites', {self: self}, function(evt) {
		var self = evt.data.self;
		var listId = $(this).data('marker-list-id');
		var markerId = $(this).data('marker-id');
		var index = $(this).data('marker-absolute-id');
		var obj = $.grep(self.displayedFavoritesData, function(obj) {
			return obj.absoluteIndex == index;
		})[0];

		evt.stopPropagation();

		//self.clickedMarkerSourceList = ServicesApp.prototype.FAVORITES_LIST;
		self.selectedMarkerListId = listId;
		self.selectedMarkerId = markerId;
		self.listChangeHandler(obj, index, evt, this, self);
		self.centerFavoritesMarkerDetails(listId, markerId, self);
		google.maps.event.trigger(
			self.detailsFavoritesMapMarkers[listId].markers[markerId],
			'click'
		);
		
		obj = null;
		self = null;
		return false;
	});
	
	if (typeof self.leftMap === 'undefined')
	{
		self.leftMap = initMap('#main-map-canvas', self.defaultLeftMapZoom, 44.821299, 20.454226);
		// Create map markers	
		if (self.mapsEnabled)
		{
			self.createMapMarkers();
		}
		
		self.showLeftMapMarkers();
	}
}

$(document).ready(function(){
	var services = new ServicesApp();
	services.init(services);
	services.switchView(ServicesApp.prototype.ADVANCED_VIEW, undefined, services);
	/*console.log('==================WINDOW.DATA==============');
	console.log(window.data);
	console.log('==================/WINDOW.DATA==============');*/
});
