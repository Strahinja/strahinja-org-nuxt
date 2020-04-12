function AdListItem(number)
{
	this.absoluteId = undefined;
	this.checked = undefined;
	this.status = undefined;
	this.image = undefined;
	this.year = undefined;
	this.maker = undefined;
	this.model = undefined;
	this.promotion = undefined;
	this.dailyBudget = undefined;
	this.radius = undefined;
	this.regularViews = undefined;
	this.promoViews = undefined;
	this.milestones = [];
	this.viewsData = [];
	this.avgCompData = [];
	this.bestCompData = [];
	this.price = undefined;
	this.body = undefined;
	this.gear = undefined;
	this.fueltype = undefined;
	this.mileage = undefined;
	this.engine = undefined;
	this.field1 = undefined;
	this.aboveBelow = undefined;
	this.eval = undefined;
	this.evalDesc = undefined;
	this.empty = true;
}

AdListItem.prototype.assign = function(item)
{
	this.populate(item.absoluteId, item.checked, item.status, item.image, item.year, item.maker, item.model,
		item.promotion, item.dailyBudget, item.radius, item.regularViews, item.promoViews, item.milestones,
		item.viewsData, item.avgCompData, item.bestCompData, item.price, item.body, item.gear,
		item.fueltype, item.mileage, item.engine, item.field1, item.aboveBelow, item.eval, item.evalDesc);
}

AdListItem.prototype.populate = function(absoluteId, checked, status, image, year, maker, model, promotion,
	dailyBudget, radius, regularViews, promoViews, milestones, viewsData, avgCompData, bestCompData,
	price, body, gear, fueltype, mileage, engine, field1, aboveBelow,	eval, evalDesc)
{
	this.absoluteId = absoluteId;
	this.checked = checked;
	this.status = status;
	this.image = image;
	this.year = year;
	this.maker = maker;
	this.model = model;
	this.promotion = promotion;
	this.dailyBudget = dailyBudget;
	this.radius = radius;
	this.regularViews = regularViews;
	this.promoViews = promoViews;
	if (typeof this.milestones !== 'undefined')
	{
		delete this.milestones;
	}
	this.milestones = deepCopy(milestones);
	if (typeof this.viewsData !== 'undefined')
	{
		delete this.viewsData;
	}
	this.viewsData = deepCopy(viewsData);
	if (typeof this.avgCompData !== 'undefined')
	{
		delete this.avgCompData;
	}
	this.avgCompData = deepCopy(avgCompData);
	if (typeof this.bestCompData !== 'undefined')
	{
		delete this.bestCompData;
	}
	this.bestCompData = deepCopy(bestCompData);
	this.price = price;
	this.body = body;
	this.gear = gear;
	this.fueltype = fueltype;
	this.mileage = mileage;
	this.engine = engine;
	this.field1 = field1;
	this.aboveBelow = aboveBelow;
	this.eval = eval;
	this.evalDesc = evalDesc;
	this.empty = false;
}

AdListItem.prototype.depopulate = function()
{
	this.absoluteId = undefined;
	this.checked = undefined;
	this.status = undefined;
	this.image = undefined;
	this.year = undefined;
	this.maker = undefined;
	this.model = undefined;
	this.promotion = undefined;
	this.dailyBudget = undefined;
	this.radius = undefined;
	this.regularViews = undefined;
	this.promoViews = undefined;
	if (typeof this.milestones !== 'undefined')
	{
		delete this.milestones;
	}
	this.milestones = [];
	if (typeof this.viewsData !== 'undefined')
	{
		delete this.viewsData;
	}
	this.viewsData = [];
	if (typeof this.avgCompData !== 'undefined')
	{
		delete this.avgCompData;
	}
	this.avgCompData = [];
	if (typeof this.bestCompData !== 'undefined')
	{
		delete this.bestCompData;
	}
	this.bestCompData = [];
	this.price = undefined;
	this.body = undefined;
	this.gear = undefined;
	this.fueltype = undefined;
	this.mileage = undefined;
	this.engine = undefined;
	this.field1 = undefined;
	this.aboveBelow = undefined;
	this.eval = undefined;
	this.evalDesc = undefined;
	this.empty = true;
}

AdListItem.prototype.getName = function()
{
	return this.year + ' ' + this.maker + ' ' + this.model;
}

// Status
AdListItem.prototype.S_NONE = 0;
AdListItem.prototype.S_ACTIVE = 1;
AdListItem.prototype.S_INACTIVE = 2;

AdListItem.prototype.Status = [
	//AdListItem.prototype.S_NONE,
	AdListItem.prototype.S_ACTIVE,
	AdListItem.prototype.S_INACTIVE
];

AdListItem.prototype.statusText = [
	'',
	'Aktivan',
	'Neaktivan'
];
AdListItem.prototype.statusImages = [
	// S_NONE:
	'',
	// S_ACTIVE:
	'img/ad-status/s-active.png',
	// S_ACTIVE:
	'img/ad-status/s-inactive.png'
];
	
// Promotion
AdListItem.prototype.P_NONE = 0;
AdListItem.prototype.P_PAUSED = 1;
AdListItem.prototype.P_STARTED = 2;

AdListItem.prototype.Promotion = [
	//AdListItem.prototype.P_NONE,
	AdListItem.prototype.P_PAUSED,
	AdListItem.prototype.P_STARTED
];

AdListItem.prototype.promotionText = [
	'',
	'Pauzirana',
	'Pokrenuta'
];
AdListItem.prototype.promotionImages = [
	// P_NONE:
	'',
	// P_PAUSED:
	'img/ad-status/p-pause.png',
	// P_STARTED:
	'img/ad-status/p-play.png'
];

// Eval types
AdListItem.prototype.AB_NONE = 0;
AdListItem.prototype.AB_ABOVE = 1;
AdListItem.prototype.AB_BELOW = 2;
AdListItem.prototype.AB_NEARABOVE = 3;
AdListItem.prototype.AB_NEARBELOW = 4;

AdListItem.prototype.getTotalViews = function()
{
	return this.regularViews + this.promoViews;
}

AdListItem.prototype.getStatus = function()
{
	var ret = '';
	
	//console.log('item #: ' + this.absoluteId + '; status = ' + this.status + ' = ' + (this.status == self.P_PAUSED ? 'P_PAUSED' : 'P_STARTED'));
	switch (this.status)
	{
		case AdListItem.prototype.S_NONE:
			ret = '&nbsp;'
			break;
		case AdListItem.prototype.S_ACTIVE:
			ret = '<img src="'+ AdListItem.prototype.statusImages[this.status] + '" /> Aktivan';
			break;
		case AdListItem.prototype.S_INACTIVE:
			ret = '<img src="' + AdListItem.prototype.statusImages[this.status] + '" /> Neaktivan'
			break;
	}
	
	return ret;
}

AdListItem.prototype.getStatusIcon = function()
{
	var ret = '';
	
	//console.log('item #: ' + this.absoluteId + '; status = ' + this.status + ' = ' + (this.status == self.P_PAUSED ? 'P_PAUSED' : 'P_STARTED'));
	switch (this.status)
	{
		case this.S_NONE:
			ret = '<div class="list-symbol">&nbsp;</div>'
			break;
		case this.S_ACTIVE:
			ret = '<div class="list-symbol green">&#9679;</div>'
			break;
		case this.S_INACTIVE:
			ret = '<div class="list-symbol red">&#9679;</div>'
			break;
	}
	
	return ret;
}

AdListItem.prototype.getPromotionIcon = function()
{
	var ret = '';
	
	//console.log('item #: ' + this.absoluteId + '; status = ' + this.status + ' = ' + (this.status == self.P_PAUSED ? 'P_PAUSED' : 'P_STARTED'));
	switch (this.promotion)
	{
		case this.P_NONE:
			ret = '<div class="list-symbol">&nbsp;</div>'
			break;
		case this.P_PAUSED:
			ret = '<div class="list-symbol green">&#9654;</div>'
			break;
		case this.P_STARTED:
			ret = '<div class="list-symbol gray">&#8214;</div>'
			break;
	}
	
	return ret;
}

AdListItem.prototype.getEvalImage = function()
{
	var ret = '';
	switch (this.aboveBelow)
	{
		case this.AB_ABOVE:
			ret = '<div class="eval-icon above">U</div>';
			break;
		case this.AB_BELOW:
			ret = '<div class="eval-icon below">D</div>';
			break;
		case this.AB_NEARABOVE:
			ret = '<div class="eval-icon near-above">U</div>';
			break;
		case this.AB_NEARBELOW:
			ret = '<div class="eval-icon near-below">D</div>';
			break;
		default:
			break;
	}
	return ret;
}

function GarageListItem(number)
{
	this.absoluteId = undefined;
	this.year = {min: undefined, max: undefined};
	this.maker = undefined;
	this.model = undefined;
	this.images = [];
	this.thumbs = [];
	this.score = {};
	this.score.looks = undefined;
	this.score.comfort = undefined;
	this.score.expenses = undefined;
	this.score.performance = undefined;
	this.score.reliability = undefined;
	this.comment = undefined;
	this.likes = 0;
	this.ownership = this.O_NONE;
	this.empty = true;
}

GarageListItem.prototype.assign = function(item)
{
	this.populate(item.absoluteId, item.year, item.maker, item.model, item.images, item.thumbs,
		item.score, item.comment, item.likes, item.ownership);
}

GarageListItem.prototype.populate = function(absoluteId, year, maker, model, images, thumbs,
	score, comment, likes, ownership)
{
	this.absoluteId = absoluteId;
	this.year.min = year.min;
	this.year.max = year.max;
	this.maker = maker;
	this.model = model;
	if (typeof this.images !== 'undefined')
	{
		delete this.images;
	}
	this.images = deepCopy(images);
	if (typeof this.thumbs !== 'undefined')
	{
		delete this.thumbs;
	}
	this.thumbs = deepCopy(thumbs);
	this.score.looks = score.looks;
	this.score.comfort = score.comfort;
	this.score.expenses = score.expenses;
	this.score.performance = score.performance;
	this.score.reliability = score.reliability;
	this.comment = comment;
	this.likes = likes;
	this.ownership = ownership;
	this.empty = false;
}

GarageListItem.prototype.depopulate = function()
{
	this.absoluteId = undefined;
	this.year.min = undefined;
	this.year.max = undefined;
	this.maker = undefined;
	this.model = undefined;
	if (typeof this.images !== 'undefined')
	{
		delete this.images;
	}
	this.images = [];
	if (typeof this.thumbs !== 'undefined')
	{
		delete this.thumbs;
	}
	this.thumbs = [];
	this.score.looks = undefined;
	this.score.comfort = undefined;
	this.score.expenses = undefined;
	this.score.performance = undefined;
	this.score.reliability = undefined;
	this.comment = undefined;
	this.likes = 0;
	this.ownership = this.O_NONE;
	this.empty = true;
}

GarageListItem.prototype.getName = function()
{
	return this.maker + ' ' + this.model + ' (' + this.year.min + '-' + this.year.max + ')';
}

// Ownership
GarageListItem.prototype.O_NONE = 0;
GarageListItem.prototype.O_OWNER = 1;
GarageListItem.prototype.O_WISHLIST = 2;
GarageListItem.prototype.O_PREVOWNER = 3;

GarageListItem.prototype.getOwnershipIcon = function()
{
	var ret;
	switch (this.ownership)
	{
		case this.O_OWNER:
			ret = '<div class="icon">&#9881;</div>';
			break;
		case this.O_WISHLIST:
			ret = '<div class="icon">&hearts;</div>';
			break;
		case this.O_PREVOWNER:
			ret = '<div class="icon">&#128078;</div>';
			break;
		case this.O_NONE:
			ret = '<div class="icon">&nbsp;</div>';
			break;
	}
	return ret;
}

GarageListItem.prototype.getScoreTotal = function()
{
	var numScores = 5;
	
	return (this.score.looks + this.score.comfort + this.score.expenses
		+ this.score.performance + this.score.reliability) / numScores;
}

GarageListItem.prototype.getImagesHtml = function()
{
	var html = '';
	for (var image in this.images)
	{
		html += '<div>'
			+ '<img src="img/car/' + this.images[image] + '" id="p-'
				+ zeroes(this.absoluteId)
				+ '-'
				+ zeroes(parseInt(image)+1)
				+ '"  />'
			+ '</div>';
	}
	return html;
}

GarageListItem.prototype.getThumbsHtml = function()
{
	var html = '';
	for (var thumb in this.thumbs)
	{
		html += '<div>'
			+ '<img src="img/car/' + this.thumbs[thumb] + '" id="t-'
				+ zeroes(this.absoluteId)
				+ '-'
				+ zeroes(parseInt(thumb)+1)
				+ '"  />'
			+ '</div>';
	}
	return html;
}

function MenoglasaApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.leftListWidth = 820;
	this.bottomSpacing = 10; // spacing from the bottom of page to the bottom of lists

	this.graphMinX = 0; // graph units, *not* pixels!
	this.graphMaxX = 890;
	this.graphMinY = 0;
	this.graphMaxY = 200;
	this.plotMinX = 0; // graph units, *not* pixels!
	this.plotMaxX = 890;
	this.plotMinY = 30;
	this.plotMaxY = 160;
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
	
	this.plotLegendMargin = 10;
	this.plotLegendSize = 20;
	//this.plotLegendItemMargin = 40;
	this.plotLegendPositions = [0, 270, 600];
	this.plotLegendLabels = [
		'Moj oglas',
		'Prosečan konkurent',
		'Najbolji konkurent'
	];

	this.plotLegendFontSize = 26; // in pixels

	this.plotLegendColors = ['#5e6cfa', '#f8ca41', '#ff654d'];
	this.plotLegendFillColors = ['#e5effe', '#fdfdfd', '#f3f5f4'];
	this.plotLineStrokeWidths = [2, 2, 2];

	this.plotMilestoneStrokeWidth = 2;
	this.plotMilestoneFillColor = '#fff';
	this.milestoneSize = 30;
	this.milestonePixelSize = 15;
	this.milestoneRadius = 3;
	this.milestoneConnectorHeight = 15;
	this.plotMilestoneFontSize = 32; // in pixels
	this.plotMilestoneBottomMargin = 4.5;

	this.dataX = { min: 0, max: 100 }; // days
	this.dataY = { min: 0, max: 100 }; // views
	
	this.plotX = { min: this.plotMinX, max: this.plotMaxX };
	this.plotY = { min: this.plotMinY, max: this.plotMaxY };

	this.graphX = { min: this.graphMinX, max: this.graphMaxX };
	this.graphY = { min: this.graphMinY, max: this.graphMaxY };
	
	this.scaleX = { min: 0, max: 1 };
	this.scaleY = { min: 0, max: 1 };

	this.slimScrollShowSpeed = 0;
	this.slimScrollHideSpeed = 0;
	
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/

	this.initializedCarousels = [];

	this.aboveBelowClasses = [
		'',
		'above',
		'below',
		'near-above',
		'near-below'
	];

	// Karoserija
	this.K_LIMUZINA = 0;
	this.K_HECBEK = 1;
	this.K_KUPE = 2;
	this.K_KARAVAN = 3;
	this.K_KABRIOLET = 4;
	this.K_MINIVAN = 5;
	this.K_DZIP = 6;
	this.K_PICKUP = 7;

	this.bodyNames = [
		'Limuzina',
		'Hecbek',
		'Kupe',
		'Karavan',
		'Kabriolet',
		'Mini-van',
		'Dzip/SUV',
		'Pick-up'
	];

	// Gorivo
	this.G_BENZIN = 0;
	this.G_DIZEL = 1;
	this.G_BENZINGAS = 2;
	this.G_METAN = 3;
	this.G_ELEKPOGON = 4;
	this.G_HIBRPOGON = 5;

	this.fueltypeNames = [
		'Benzin',
		'Dizel',
		'Benzin + gas (TNG)',
		'Metan (CNG)',
		'Elektricni pogon',
		'Hibridni pogon'
	];

	this.filterAdsSelectedId = 0;
	this.filterAds = [
		{
			label: 'Svi oglasi',
			value: null
		},
		{
			label: 'Aktivni',
			value: AdListItem.prototype.S_ACTIVE
		},
		{
			label: 'Neaktivni',
			value: AdListItem.prototype.S_INACTIVE
		}
	];
}

MenoglasaApp.prototype.slideIn = function(pageName, activePage, callBack)
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

MenoglasaApp.prototype.initGraph = function(svg, id, obj, dotsInteractive, graphInteractive, overrideActiveLabel, self)
{
	//console.log('initGraph(' + svg + ', ' + _this + ', ' + id + ')');
	var self = typeof self === 'undefined' ? this : self;
	var dataX = self.dataX;
	var dataY = self.dataY;
	
	var graphX = self.graphX;
	var graphY = self.graphY;

	var plotX = self.plotX;
	var plotY = self.plotY;
	
	var scaleX = self.scaleX;
	var scaleY = self.scaleY;
	
	//var _dotsInteractive = typeof dotsInteractive === 'undefined' ? false : dotsInteractive;
	//var _graphInteractive = typeof graphInteractive === 'undefined' ? false : graphInteractive;

	/*console.log('GRAPH: x = ');
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
	}*/
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

	var dataToPlotX = function(x)
	{
		var ret = x * ((plotX.max - plotX.min) / (dataX.max - dataX.min))
			+ plotX.min;
		//console.log('dataToGraphX(' + x + ') = ' + ret);
		return ret;
	}
	var dataToPlotY = function(y)
	{
		var ret =
			plotY.min
			+ (plotY.max-plotY.min)
			- (y * ((plotY.max - plotY.min) / (dataY.max - dataY.min)))
			//+ plotY.min
			;
		//console.log('dataToGraphY(' + y + ') = ' + ret);
		return ret;
	}
	var plotToDataX = function(x)
	{
		var ret = (x - plotX.min) * ((dataX.max - dataX.min) / (plotX.max - plotX.min));
		//console.log('graphToDataX(' + x + ') = ' + ret);
		return ret;
	}
	var plotToDataY = function(y)
	{
		var ret = ((plotY.max - y) - plotY.min) * ((dataY.max - dataY.min) / (plotY.max - plotY.min));
		//console.log('graphToDataY(' + y + ') = ' + ret);
		return ret;
	}

	var g = svg.group({
		stroke: 'rgb(200,200,200)',
		'stroke-width': '1.0'
	});
	svg.line(g, self.plotX.min, self.plotY.max, self.plotX.max, self.plotY.max);
	svg.line(g, self.plotX.min, self.plotY.max, self.plotX.min, self.plotY.min);
	
	//var numLegendTexts = 3;
	//var legendWidth = (self.plotX.max - self.plotX.min) / numLegendTexts;
	
	svg.rect(g,
		self.plotX.min + self.plotLegendPositions[0],
		self.plotY.max + self.plotLegendMargin,
		self.plotLegendSize,
		self.plotLegendSize,
		{
			fill: self.plotLegendColors[0]
		}
	);
	var txt = svg.text(g,
		self.plotX.min + self.plotLegendPositions[0] + self.plotLegendSize + self.plotLegendMargin,
		self.plotY.max + self.plotLegendSize + self.plotLegendMargin,
		self.plotLegendLabels[0],
		{
			'font-size': self.plotLegendFontSize + 'px'
		}
	);

	svg.rect(g, 
		self.plotX.min + self.plotLegendPositions[1],
		self.plotY.max + self.plotLegendMargin,
		self.plotLegendSize,
		self.plotLegendSize,
		{
			fill: self.plotLegendColors[1]
		}
	);
	svg.text(g,
		self.plotX.min + self.plotLegendPositions[1] + self.plotLegendSize + self.plotLegendMargin,
		self.plotY.max + self.plotLegendSize + self.plotLegendMargin,
		self.plotLegendLabels[1],
		{
			'font-size': self.plotLegendFontSize + 'px'
		}
	);

	svg.rect(g,
		self.plotX.min + self.plotLegendPositions[2],
		self.plotY.max + self.plotLegendMargin,
		self.plotLegendSize,
		self.plotLegendSize,
		{
			fill: self.plotLegendColors[2]
		}
	);
	svg.text(g,
		self.plotX.min + self.plotLegendPositions[2] + self.plotLegendSize + self.plotLegendMargin,
		self.plotY.max + self.plotLegendSize + self.plotLegendMargin,
		self.plotLegendLabels[2],
		{
			'font-size': self.plotLegendFontSize + 'px'
		}
	);
	
	var graphPointList = [];
	var graphPointListFill;
	var i, j, x, y, k, n, found;

	for (i in obj.bestCompData)
	{
		x = dataToPlotX(obj.bestCompData[i][0]);
		y = dataToPlotY(obj.bestCompData[i][1]);
		graphPointList.push([x, y]);
	}
	delete graphPointListFill;
	graphPointListFill = deepCopy(graphPointList);
	graphPointListFill.push([
		dataToPlotX(dataX.max),
		dataToPlotY(dataY.min)
	]);
	svg.polyline(graphPointListFill, {
		fill: self.plotLegendFillColors[2],
		stroke: 'none'
	});

	for (i in obj.avgCompData)
	{
		x = dataToPlotX(obj.avgCompData[i][0]);
		y = dataToPlotY(obj.avgCompData[i][1]);
		graphPointList[i][0] = x;
		graphPointList[i][1] = y;
	}
	graphPointListFill = deepCopy(graphPointList);
	graphPointListFill.push([
		dataToPlotX(dataX.max),
		dataToPlotY(dataY.min)
	]);
	svg.polyline(graphPointListFill, {
		fill: self.plotLegendFillColors[1],
		stroke: 'none'
	});

	for (i in obj.viewsData)
	{
		x = dataToPlotX(obj.viewsData[i][0]);
		y = dataToPlotY(obj.viewsData[i][1]);
		graphPointList[i][0] = x;
		graphPointList[i][1] = y;
	}
	delete graphPointListFill;
	graphPointListFill = deepCopy(graphPointList);
	graphPointListFill.push([
		dataToPlotX(dataX.max),
		dataToPlotY(dataY.min)
	]);
	svg.polyline(graphPointListFill, {
		fill: self.plotLegendFillColors[0],
		stroke: 'none'
	});
	
	for (i in obj.avgCompData)
	{
		x = dataToPlotX(obj.avgCompData[i][0]);
		y = dataToPlotY(obj.avgCompData[i][1]);
		graphPointList[i][0] = x;
		graphPointList[i][1] = y;
	}
	svg.polyline(graphPointList, {
		fill: 'none',
		stroke: self.plotLegendColors[1],
		strokeWidth: self.plotLineStrokeWidths[1]
	});

	for (i in obj.bestCompData)
	{
		x = dataToPlotX(obj.bestCompData[i][0]);
		y = dataToPlotY(obj.bestCompData[i][1]);
		graphPointList[i][0] = x;
		graphPointList[i][1] = y;
	}
	svg.polyline(graphPointList, {
		fill: 'none',
		stroke: self.plotLegendColors[2],
		strokeWidth: self.plotLineStrokeWidths[2]
	});

	for (i in obj.viewsData)
	{
		x = dataToPlotX(obj.viewsData[i][0]);
		y = dataToPlotY(obj.viewsData[i][1]);
		graphPointList[i][0] = x;
		graphPointList[i][1] = y;
	}

	svg.polyline(graphPointList, {
		fill: 'none',
		stroke: self.plotLegendColors[0],
		strokeWidth: self.plotLineStrokeWidths[0]
	});

	for (i in obj.milestones)
	{
		x = obj.milestones[i];
		j = 0;
		found = false;
		while (!found && j < obj.viewsData.length-1)
		{
			if (x >= obj.viewsData[j][0] && x < obj.viewsData[j+1][0])
			{
				found = true;
			}
			else
			{
				j++;
			}
		}
		if (!found)
		{
			if (x < dataX.max)
			{
				k = (dataY.min - obj.viewsData[j][1])
					/
					(dataX.max - obj.viewsData[j][0])
					;
			}
		}
		else
		{
			k = (obj.viewsData[j+1][1] - obj.viewsData[j][1])
				/
				(obj.viewsData[j+1][0] - obj.viewsData[j][0])
				;
		}
		n = obj.viewsData[j][1] - k * obj.viewsData[j][0];
		
		var dY = k * obj.milestones[i] + n;
		
		x = dataToPlotX(obj.milestones[i]);
		y = dataToPlotY(dY);

		var milestone = svg.group({
			class: 'graph-milestone',
			id: id + '-milestone-' + zeroes(i)
		});
		
		svg.line(
			milestone,
			x,
			y - self.milestoneConnectorHeight,
			x,
			y,
			{
				fill: 'none',
				strokeWidth: self.plotMilestoneStrokeWidth,
				stroke: self.plotLegendColors[0]
			}
		);
		svg.rect(
			milestone,
			x - self.milestoneSize/2,
			y - self.milestoneSize - self.milestoneConnectorHeight,
			self.milestoneSize,
			self.milestoneSize,
			self.milestoneRadius,
			self.milestoneRadius,			
			{
				fill: self.plotMilestoneFillColor,
				strokeWidth: self.plotMilestoneStrokeWidth,
				stroke: self.plotLegendColors[0]
			}
		);
		svg.text(
			milestone,
			x,
			y - self.milestoneConnectorHeight - self.plotMilestoneBottomMargin,
			String.fromCharCode(parseInt('A'.charCodeAt(0)) + parseInt(i)),
			{
				textAnchor: 'middle',
				fill: self.plotLegendColors[0],
				'font-size': self.plotMilestoneFontSize + 'px'/*,
				strokeWidth: self.plotMilestoneStrokeWidth/2,
				stroke: self.plotLegendColors[0]*/
			}			
		);
		$('#' + id + '-milestone-' + zeroes(i))
			//.data('cx', x)
			//.data('cy', y)
			.off('mouseover').on('mouseover', {self: self, dY: dY}, function(evt) {
				var self = evt.data.self;
				var dY = evt.data.dY;
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				var _cls = $(this).prop('class');
				var markerId = '#' + $(this).prop('id');
				var x = $(markerId).position().left; //$(this).data('cx');
				var y = $(markerId).position().top; //$(this).data('cy');

				console.log('marker.mouseover: id = ' + markerId);

				//console.log('pos = [' + x + ', ' + y + ']');
				//_this.showGuides('#' + id, '.' + _cls);
				/*if ($('#graphHint').data('for') != $(this).prop('id'))
				{*/
					self.showHint(evt, id,
						markerId,
						$(this).prop('id'),
						'Moj oglas: ' + formatNumeric(dY) + '<br />'
						+ 'Prosecan konkurent: ' + 1000 + '<br />'
						+ 'Najbolji konkurent: ' + 2000,
						{
							x: x,
							y: y
						}
					);
				/*}*/
				self = null;
				return false;
		});
	}

	for (i in graphPointList)
	{
		delete graphPointList[i];
		graphPointList[i] = null;
	}
	delete graphPointList;
	graphPointList = null;
	for (i in graphPointListFill)
	{
		delete graphPointListFill[i];
		graphPointListFill[i] = null;
	}
	delete graphPointListFill;
	graphPointListFill = null;
	
	/*svg.text(80, 20, formatCurrency(dataY.max), {
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
		self.showHint(evt, '#' + id, '.active-dot',
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
	});*/
	
	self = null;
}

MenoglasaApp.prototype.showHint = function(event, graphid, markerid, hintFor, overrideHtml, overridePos, self)
{
	var self = typeof self == 'undefined' ? this : self;
	
	//console.log('showHint: graphid = ' + graphid + ', markerid = ' + markerid + ', hintfor = ' + hintFor);
	
	var dataFor = $('#graphHint').data('for');
	//console.log('datafor = ' + dataFor);
	if (typeof dataFor === 'undefined' || dataFor.length == 0)
	{
		dataFor = hintFor;
	}
	
	if ($('#graphHint').hasClass('active')
		&& dataFor == hintFor)
	{
		//console.log('returning because hasclass(active) and datafor == hintfor');
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
		
	/*console.log('BODY = ');
	console.log($('body'));
	console.log('GRAPHID = ');
	console.log($(graphid));
	console.log('MARKERID = ');
	console.log($(markerid));
	console.log('CX = ');
	console.log($(markerid).prop('cx'));
	console.log('CY = ');
	console.log($(markerid).prop('cy'));
	console.log('[CX] = ');
	console.log(parseFloat((typeof overridePos === 'undefined'
				? $(markerid).prop('cx').baseVal.valueInSpecifiedUnits
				: overridePos.x)));
	console.log('[CY] = ');
	console.log(parseFloat((typeof overridePos === 'undefined'
				? $(markerid).prop('cy').baseVal.valueInSpecifiedUnits
				: overridePos.y)));*/
	
	graphid = '#' + graphid;
	
	/*console.log('gbcr: ');
	console.log($(markerid)[0].getBoundingClientRect());*/
	
	var gbcr = $(markerid)[0].getBoundingClientRect();
	
	/*console.log(
		'parseFloat($(graphid).offset().left) = '
		+ parseFloat($(graphid).offset().left)
		+ ', parseFloat((typeof overridePos === \'undefined\''
		+ '? $(markerid).prop(\'cx\').baseVal.valueInSpecifiedUnits'
		+ ': overridePos.x)) = ' + parseFloat((typeof overridePos === 'undefined'
				? $(markerid).prop('cx').baseVal.valueInSpecifiedUnits
				: overridePos.x))
	);
	console.log(
		'parseFloat($(graphid).offset().top) = '
		+ parseFloat($(graphid).offset().top)
		+ ', parseFloat((typeof overridePos === \'undefined\''
		+ '? $(markerid).prop(\'cy\').baseVal.valueInSpecifiedUnits'
		+ ': overridePos.y)) = ' + parseFloat((typeof overridePos === 'undefined'
				? $(markerid).prop('cy').baseVal.valueInSpecifiedUnits
				: overridePos.y))
	);*/
	
	//console.log('addClass(active)');
	$('#graphHint').addClass('active');
	//console.log('after addClass(active)');
	$('#graphHint')
		.css({
			top:
				gbcr.top
				/*parseFloat($(graphid).offset().top)
				+ parseFloat((typeof overridePos === 'undefined'
					? $(markerid).prop('cy').baseVal.valueInSpecifiedUnits
					: overridePos.y))*/
				//event.pageY //- $('#intro').offset().top
				+ self.milestonePixelSize/2
				- $('#graphHint').outerHeight(true)/2 + 'px',
			left: 
				gbcr.left
				/*parseFloat($(graphid).offset().left)
				+ parseFloat((typeof overridePos === 'undefined'
					? $(markerid).prop('cx').baseVal.valueInSpecifiedUnits
					: overridePos.x))*/
				//event.pageX //- $('#intro').offset().left
				+ self.graphHintCalloutSize + self.graphHintAreaSize
				+ 'px',
			opacity: '0.0'
			//display: 'block'
		})
		.finish()
		.animate({ opacity: '1.0' }, self.graphHintAnimateDelay, function() {
			$('#graphHint').css({ opacity: '' }).addClass('active');;
		})
		.addClass('active');
	
	$('#graphHint').data('for', hintFor);
	gbcr = null;
	self = null;
}

MenoglasaApp.prototype.hideHint = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	//console.log('hideHint called');
	$('#graphHint')
		.css({ opacity: '1.0' })
		.animate({ opacity: '0.0' }, self.graphHintAnimateDelay, function() {
			$('#graphHint')
				.removeClass('active')
				.css({ opacity: '' });
		});
	self = null;
	/*var svg = $(graphid).svg('get');
	$(graphid).find('.hint').each(function() {
		svg.remove(this);
	});*/
}

MenoglasaApp.prototype.dataCreateLeftList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	
	if (typeof self.ads === 'undefined')
	{
		self.ads = [];
		
		var absoluteId = 0;
		
		var ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_INACTIVE,
			image: '2.jpg',
			year: 2011,
			maker: 'Opel',
			model: 'Corsa B',
			promotion: AdListItem.prototype.P_PAUSED,
			dailyBudget: 600,
			radius: 100,
			regularViews: 1000,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 14523,
			body: self.K_KABRIOLET,
			gear: 'Manuelni',
			fueltype: self.G_DIZEL,
			mileage: 120000,
			engine: 3900,
			field1: 'Odlican',
			aboveBelow: self.AB_ABOVE,
			eval: 2000,
			evalDesc: 'iznad ocekivane'
		});
		self.ads.push(ad);

		ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_ACTIVE,
			image: '3.jpg',
			year: 2010,
			maker: 'Audi',
			model: 'A3',
			promotion: AdListItem.prototype.P_STARTED,
			dailyBudget: 900,
			radius: 200,
			regularViews: 1500,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 6750,
			body: self.K_KUPE,
			gear: 'Manuelni',
			fueltype: self.G_BENZINGAS,
			mileage: 180000,
			engine: 1500,
			field1: 'Odlican',
			aboveBelow: self.AB_BELOW,
			eval: 1000,
			evalDesc: 'ispod ocekivane'
		});
		self.ads.push(ad);

		ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_ACTIVE,
			image: '4.jpg',
			year: 2009,
			maker: 'BMW',
			model: 'M3 0.2 lala',
			promotion: AdListItem.prototype.P_PAUSED,
			dailyBudget: 600,
			radius: 100,
			regularViews: 1000,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 5570,
			body: self.K_HECBEK,
			gear: 'Manuelni',
			fueltype: self.G_DIZEL,
			mileage: 50000,
			engine: 2900,
			field1: 'Odlican',
			aboveBelow: self.AB_NEARBELOW,
			eval: 150,
			evalDesc: 'ispod ocekivane'
		});
		self.ads.push(ad);

		ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_INACTIVE,
			image: '5.jpg',
			year: 2013,
			maker: 'Renault',
			model: 'Laguna 1.9dci',
			promotion: AdListItem.prototype.P_STARTED,
			dailyBudget: 600,
			radius: 100,
			regularViews: 1000,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 24800,
			body: self.K_HECBEK,
			gear: 'Manuelni',
			fueltype: self.G_BENZIN,
			mileage: 120000,
			engine: 1900,
			field1: 'Odlican',
			aboveBelow: self.AB_NEARABOVE,
			eval: 90,
			evalDesc: 'iznad ocekivane'
		});
		self.ads.push(ad);

		ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_INACTIVE,
			image: '6.jpg',
			year: 2001,
			maker: 'Porsche',
			model: '101',
			promotion: AdListItem.prototype.P_PAUSED,
			dailyBudget: 750,
			radius: 300,
			regularViews: 1000,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 4800,
			body: self.K_HECBEK,
			gear: 'Manuelni',
			fueltype: self.G_BENZIN,
			mileage: 320000,
			engine: 1200,
			field1: 'Zadovoljava',
			aboveBelow: self.AB_NEARABOVE,
			eval: 300,
			evalDesc: 'iznad ocekivane'
		});
		self.ads.push(ad);

		ad = new AdListItem();
		ad.assign({
			absoluteId: absoluteId++,
			status: AdListItem.prototype.S_INACTIVE,
			image: '7.jpg',
			year: 2011,
			maker: 'Renault',
			model: 'Laguna 1.9dci',
			promotion: AdListItem.prototype.P_PAUSED,
			dailyBudget: 600,
			radius: 100,
			regularViews: 1000,
			promoViews: 8000,
			milestones: [19, 37, 70],
			viewsData: [[0, 0], [20, 80], [35, 15], [70, 60], [100, 4]],
			avgCompData: [[0, 0], [21, 76], [40, 20], [77, 60], [100, 10]],
			bestCompData: [[0, 0], [19, 90], [40, 60], [71, 80], [100, 15]],
			price: 24800,
			body: self.K_HECBEK,
			gear: 'Manuelni',
			fueltype: self.G_BENZIN,
			mileage: 120000,
			engine: 1900,
			field1: 'Odlican',
			aboveBelow: self.AB_NEARBELOW,
			eval: 440,
			evalDesc: 'ispod ocekivane'
		});
		self.ads.push(ad);
	}
	
	self.filterTheAds(self);
	
	ret = self.displayedAds;
	
	self = null;
	return ret;
}

MenoglasaApp.prototype.filterTheAds = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	if (typeof self.displayedAds !== 'undefined')
	{
		delete self.displayedAds;
		self.displayedAds = [];
	}
	
	self.displayedAds = $.grep(self.ads, function(item) {
		if (self.filterAds[self.filterAdsSelectedId].value == null)
		{
			return true;
		}
		else
		{
			return item.status == self.filterAds[self.filterAdsSelectedId].value;
		}
	});
	self = null;
}

MenoglasaApp.prototype.dataCreateGarageList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret;
	
	if (typeof self.garage === 'undefined')
	{
		self.garage = [];
		
		var absoluteId = 0;
		
		//this.populate(item.absoluteId, item.year, item.maker, item.model, item.images, item.thumbs);
		var car = new GarageListItem();
		car.assign({
			absoluteId: absoluteId++,
			year: {min: 2008, max: 2012},
			maker: 'Opel',
			model: 'Corsa B',
			images: [
				'v1.jpg', 'v2.jpg', 'v3.jpg', 'v4.jpg', 'v5.jpg',
				'v6.jpg', 'v7.jpg', 'v8.jpg', 'v9.jpg', 'v10.jpg'
			],
			thumbs: [
				't1.jpg', 't2.jpg', 't3.jpg', 't4.jpg', 't5.jpg',
				't6.jpg', 't7.jpg', 't8.jpg', 't9.jpg', 't10.jpg'
			],
			score: {
				looks: 4,
				comfort: 3,
				expenses: 5,
				performance: 3,
				reliability: 5
			},
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			likes: 12,
			ownership: GarageListItem.prototype.O_OWNER
		});
		self.garage.push(car);

		car = new GarageListItem();
		car.assign({
			absoluteId: absoluteId++,
			year: {min: 2004, max: 2008},
			maker: 'Audi',
			model: 'A3',
			images: [
				'm-z72-001-sm.png', 'm-z72-002-sm.png', 'm-z72-003-sm.png'
			],
			thumbs: [
				'm-z72-001-sm.png', 'm-z72-002-sm.png', 'm-z72-003-sm.png'
			],
			score: {
				looks: 4,
				comfort: 3,
				expenses: 5,
				performance: 3,
				reliability: 5
			},
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
				+ ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			likes: 12,
			ownership: GarageListItem.prototype.O_PREVOWNER
		});
		self.garage.push(car);
	}
	
	ret = self.garage;
	
	self = null;
	return ret;
}

//ServicesApp.prototype.listItemLabelFunctionAdvanced = function( item, idx, self) {
MenoglasaApp.prototype.dataFormatLeftList = function(item, index, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var html = '<div class="advlist-item-header" data-id="' + item.absoluteId + '">'
		+ '<div class="col-1"><input type="checkbox" name="ad-checkbox-' + zeroes(item.absoluteId)
			+ '" value="yes" id="ad-checkbox-' + zeroes(item.absoluteId) + '"'
			+ (typeof item.checked !== 'undefined' && item.checked ? ' checked="checked"' : '') + ' />'
			+ '<label for="ad-checkbox-' + zeroes(item.absoluteId)
				+ '" class="inline"><span class="checkbox">&nbsp;</span>'
			+ '</label>'
		+ '</div>'
		+ '<div class="col-2 status-col">'
		
		+ '<div class="single-picture">'
		+ '<select class="styled-select status-select" name="status-' + zeroes(item.absoluteId) + '">';
		
	for (var status in AdListItem.prototype.Status)
	{
		status++;
		//if (status != AdListItem.prototype.S_NONE)
		{
			html += '<option value="' + status + '" data-image="'
					+ AdListItem.prototype.statusImages[status] + '"';
					
			if (item.status == status)
			{
				html += ' selected="selected"';
			}
					
			html += '>'
					+ AdListItem.prototype.statusText[status]
				+ '</option>';
		}
	}
		
	html += '</select>'
		+ '</div><!--single-picture-->'
		
		//+ item.getStatusIcon(self)
		+ '</div>'
		+ '<div class="col-3">' + item.getName() + '</div>'
		+ '<div class="col-4 promotion-col">'
		+ '<div class="single-picture">'
		+ '<select class="styled-select promotion-select" name="promotion-' + zeroes(item.absoluteId) + '">';
		
	for (var promotion in AdListItem.prototype.Promotion)
	{
		promotion++;
		//if (promotion != AdListItem.prototype.P_NONE)
		{
			html += '<option value="' + promotion + '" data-image="'
					+ AdListItem.prototype.promotionImages[promotion] + '"';
					
			if (item.promotion == promotion)
			{
				html += ' selected="selected"';
			}
					
			html += '>'
					+ AdListItem.prototype.promotionText[promotion]
				+ '</option>';
		}
	}
		
	html += '</select>'
		+ '</div><!--single-picture-->'
		+ '</div><!--promotion-col-->'
		//function formatCurrency(amount, addUnit, outputFraction, decimalPlaces, decimalMark, thousandsSeparator, currency)
		+ '<div class="col-5">' + formatCurrency(item.dailyBudget, true, false, 2, ',', '.', 'din') + '</div>'
		+ '<div class="col-6">' + formatDistance(item.radius) + '</div>'
		+ '<div class="col-7">' + item.regularViews + '</div>'
		+ '<div class="col-8">' + item.promoViews + '</div>'
		+ '<div class="col-9">' + item.getTotalViews() + '</div>'
		+ '<div class="col-10"><a href="#" class="btn gray close"><div class="button-icon">&nbsp;</div></a></div>'
		+ '</div><!--advlist-item-header-->'
		+ '<div class="advlist-item-subheader">'
		+ '<div class="col-1"><div class="advlist-item-subheader-column-title">Prikaz oglasa</div>'
		+ '<div class="pull-right"><a href="#">Izmeni</a></div></div>'
		+ '<div class="col-2"><div class="advlist-item-subheader-column-title">Dnevni broj pregleda</div>'
		+ '<div class="pull-right"><a href="#">Povecaj broj pregleda</a>'
			+ '<span class="moreinfo">'
			+ '<span class="moreinfo-desc">'
			+ 'Opis povecanja broja pregleda'
			+ '</span>'
			+ '?'
			+ '</span><!--moreinfo-->'
			+ '</div></div>'
		+ '</div><!--advlist-item-subheader-->'
		+ '<div class="advlist-item-body">'
		+ '<div class="megalist-car">'
		+ '<div class="car-left"><img src="img/car/' + item.image + '" class="car-image">'
		+ '<span>&nbsp;</span>'
		+ '</div>'
		+ '<div class="car-right">'
		+ '<div class="first-row">'
		+ '<div class="col-2"><span class="megalist-car-name">' + item.getName() + '</span></div>'
		+ '<div class="col-3"><span class="megalist-car-price">' + formatCurrency(item.price) + '</span></div>'
		+ '</div><!--first-row-->'
		+ '<div class="crashed-row"><div class="col-2"><span>&nbsp;</span></div></div><!--crashed-row-->'
		+ '<div class="third-row">'
		+ '<div class="col-2"><span>'
		+ self.bodyNames[item.body]
		+ ', '
		+ formatDistance(item.mileage)
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3 megalist-car-eval ' + self.aboveBelowClasses[item.aboveBelow] + '">&nbsp;<span>'
			+ formatCurrency(item.eval) + ' ' + item.getEvalImage(self) + '</span></div>'
		+ '</div><!--third-row-->'
		+ '<div class="fourth-row">'
		+ '<div class="col-2"><span>'
		+ self.fueltypeNames[item.fueltype]
		+ ', '
		+ formatVolume(item.engine)
		+ ', '
		+ item.gear
		+ '</span>&nbsp;</div>'
		+ '<div class="col-3"><span class="eval-desc">' + item.evalDesc + '</span></div>'
		+ '</div><!--fourth-row-->'
		+ '</div><!--car-right-->'
		+ '</div><!--megalist-car-->'
		+ '<div class="advlist-item-graph" id="graph-' + zeroes(item.absoluteId) + '">'		
		+ '</div><!--advlist-item-graph-->'
		+ '</div><!--advlist-item-body-->'
		;
	
	self = null;
	
	return html;	
}

MenoglasaApp.prototype.scoreBar = function(score, self)
{
	var self = typeof self === 'udnefined' ? this : self;
	var score = typeof score === 'undefined' ? 0 : score;
	
	//console.log('scoreBar: score = ' + score);
	
	var ret = '<span class="score-bar score-' + score + 'of5">'
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
		+ '</span><!--score-bar-->';
	self = null;
	return ret;
}

MenoglasaApp.prototype.dataFormatGarageList = function(item, index, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	//console.log('dataFormatGarageList: item = ');
	//console.log(item);
	
	var html = '<div class="advlist-item-header" data-id="' + item.absoluteId + '">'
		+ '<div class="col-1">'
		+ item.getOwnershipIcon()
		+ ' '
		+ item.getName()
		+ '</div><!--col-1-->'
		+ '<div class="col-2">'
		+ '<a href="#" class="btn gray close"><div class="button-icon">&nbsp;</div></a>'
		+ '</div><!--col-2-->'
		+ '</div><!--advlist-item-header-->'
		+ '<div class="advlist-item-body">'
		+ '<div class="col-1">'
		+ '<div id="garage-carousel-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel">'
		+ '<div id="garage-carousel-main-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-main">'
		+ item.getImagesHtml()
		+ '</div><!--garage-carousel-main-->'
		+ '<div class="garage-carousel-magnifier">'
		+ '&#128269;'
		+ '</div><!--garage-carousel-magnifier-->'
		+ '<div id="garage-carousel-prev-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-prev">'
		+ '</div><!--garage-carousel-prev-->'
		+ '<div id="garage-carousel-next-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-next">'
		+ '</div><!--garage-carousel-next-->'
		+ '</div><!--garage-carousel-->'
		+ '<div id="garage-carousel-thumbs-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-thumbs">'
		+ '<div id="garage-carousel-thumbs-main-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-thumbs-main">'
		+ item.getThumbsHtml()
		+ '</div><!--garage-carousel-thumbs-main-->'
		+ '<div id="garage-carousel-thumbs-prev-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-thumbs-prev">'
		+ '</div><!--garage-carousel-thumbs-prev-->'
		+ '<div id="garage-carousel-thumbs-next-' + zeroes(item.absoluteId) + '" '
			+ ' class="garage-carousel-thumbs-next">'
		+ '</div><!--garage-carousel-thumbs-next-->'
		+ '</div><!--garage-carousel-thumbs-->'
		+ '</div><!--col-1-->'
		+ '<div class="col-2">'
		+ '<div class="garage-list-score total">'
		+ '<div class="garage-list-score-text">'
		+ 'Opsta ocena '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.getScoreTotal(), self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '<div class="garage-list-score">'
		+ '<div class="garage-list-score-text">'
		+ 'Izgled '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.score.looks, self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '<div class="garage-list-score">'
		+ '<div class="garage-list-score-text">'
		+ 'Komfor '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.score.comfort, self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '<div class="garage-list-score">'
		+ '<div class="garage-list-score-text">'
		+ 'Troskovi '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.score.expenses, self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '<div class="garage-list-score">'
		+ '<div class="garage-list-score-text">'
		+ 'Performanse '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.score.performance, self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '<div class="garage-list-score">'
		+ '<div class="garage-list-score-text">'
		+ 'Pouzdanost '
		+ '</div><!--garage-list-score-text-->'
		+ '<div class="garage-list-score-bar">'
		+ self.scoreBar(item.score.reliability, self)
		+ '</div><!--garage-list-score-bar-->'
		+ '</div><!--garage-list-score-->'
		+ '</div><!--col-2-->'
		+ '<div class="col-3">'
		+ '<div class="garage-list-comment">'
		+ item.comment
		+ '</div><!--garage-list-comment-->'
		+ '<div class="garage-list-likes">'
		+ '<img src="img/thumbsup.png" /> '
		+ '<span class="garage-list-likes-number">'
		+ item.likes
		+ '</span><!--garage-list-likes-number-->'
		+ ' '
		+ '<span class="garage-list-likes-text">'
		+ 'ljudi smatra ovo korisnim'
		+ '</span><!--garage-list-likes-text-->'
		+ '</div><!--garage-list-comment-->'
		+ '</div><!--col-3-->'
		+ '</div><!--advlist-item-body-->'
		+ '<div class="advlist-item-footer">'
		+ '<div class="col-1">'
		+ '<a href="#" class="btn gray">Dodaj slike</a>'
		+ '<a href="#" class="btn gray">Dodaj ocenu</a>'
		+ '<a href="#" class="btn gray">Ukloni</a>'
		+ '<a href="#" class="btn gray">Prebaci</a>'
		+ '</div><!--col-1-->'
		+ '<div class="col-2">'
		+ '<a href="#" class="btn gray">Kupi!</a>'
		+ '</div><!--col-2-->'
		+ '</div><!--advlist-item-footer-->'
		;
	
	self = null;
	
	return html;	
}

MenoglasaApp.prototype.initCarousel = function(mainId, prevId, nextId,
	width, height, visible, crossFade, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (typeof self.initializedCarousels[mainId] === 'undefined'
		|| !self.initializedCarousels[mainId])
	{
		$(mainId).carouFredSel({
			width: null,
			height: height,
			items: {
				width: width,
				height: height,
				visible: visible,
				start: 0
			},
			auto: false,
			onCreate: function(data){
			},
			scroll: {
				fx: typeof crossFade === 'undefined' || !crossFade
					? 'scroll' : 'crossfade',
				onBefore: function(data) {
				}
			}
		}, {
			//debug: true
		});
		$(prevId).off('click').on('click', function() {
			$(mainId).trigger('prev', {items: 1});
		});
		$(nextId).off('click').on('click', function() {
			$(mainId).trigger('next', {items: 1});
		});
		self.initializedCarousels[mainId] = true;
	}
	
	self = null;
}

MenoglasaApp.prototype.onAfterDataFormatLeftList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	//console.log('onAfterDataFormatLeftList');
	
	for (ad in self.displayedAds)
	{
		var $li = $('#left-list li:has([data-id=' + self.displayedAds[ad].absoluteId + '])');

		if (typeof self.displayedAds[ad].open !== 'undefined' && self.displayedAds[ad].open)
		{
			$li.addClass('open');
		}

		if (self.displayedAds[ad].status === AdListItem.prototype.S_ACTIVE)
		{
			$li.addClass('status-active');
		}
		else if (self.displayedAds[ad].status === AdListItem.prototype.S_INACTIVE)
		{
			$li.addClass('status-inactive');
		}

		$li = null;
	}

	$('.advlist-item-graph').each(function() {
		var absoluteId = $(this).closest('li').find('.advlist-item-header').data('id');
		var id = $(this).prop('id');
		var svg = $(this).svg({
			settings: {
				viewBox:
					self.graphX.min
					+ ' '
					+ self.graphY.min
					+ ' '
					+ self.graphX.max
					+ ' '
					+ self.graphY.max,
				width: '100%',
				height: '100%'
			},
			onLoad: function(svg) {
				self.initGraph(svg, id, self.ads[absoluteId], true, false, self);
			}
		}).svg('get');

		$(svg.root()).on('mouseover', {self: self}, function(evt) {
			//console.log('svg.root.onMouseover');
			var self = evt.data.self;
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			self.hideHint();
			self = null;
			return false;
		});
		
		svg = null;
	});
	
	$('#left-list .styled-select').each(function() {
		initEAutoCustomDropdown($(this));
	});

	$('#left-list select.status-select').each(function() {
		var $msdd = $(this).msDropDown().data('dd');
		$msdd.off('change');
		$msdd.on('change', function(evt) {
			var $msdd = evt.data.msdd;
			var $list = $('#left-list').data('advlist');
			var self = evt.data.self;
			var selected = $msdd.selectedIndex + 1;
			var id = $(this).prop('name');
			id = parseInt(id.substring(id.length-3));
			
			self.ads[id].status = selected;
			self.filterTheAds(self);
			$list.refresh();
			
			$msdd = null;
			$list = null;
			self = null;
		}, {self: self, msdd: $msdd});
		$msdd = null;
	});
	$('#left-list select.promotion-select').each(function() {
		var $msdd = $(this).msDropDown().data('dd');
		$msdd.off('change');
		$msdd.on('change', function(evt) {
			var $msdd = evt.data.msdd;
			var $list = $('#left-list').data('advlist');
			var self = evt.data.self;
			var selected = $msdd.selectedIndex + 1;
			var id = $(this).prop('name');
			id = parseInt(id.substring(id.length-3));

			self.ads[id].promotion = selected;
			self.filterTheAds(self);
			$list.refresh();

			$msdd = null;
			$list = null;
			self = null;
		}, {self: self, msdd: $msdd});
		$msdd = null;
	});
	
	self = null;
}

MenoglasaApp.prototype.refreshAdsList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#left-list').data('advlist').refresh();
	
	self = null;
}

MenoglasaApp.prototype.refreshGarageList = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#garage-list').data('advlist').refresh();
	
	self = null;
}

MenoglasaApp.prototype.onClickLeftList = function(item, index, evt, target, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	if (/*$(target).hasClass('promotion-col')
		|| $(target).hasParent('.promotion-col')
		||*/ $(target)[0].tagName.toLowerCase() == 'select'
		|| !($(target).hasClass('advlist-item-header')
			|| $(target).hasParent('.advlist-item-header'))
		)
	{
		self = null;
		return true;
	}
	
	var $li = $(target);
	if ($li.prop('tagName').toLowerCase() != 'li')
	{
		$li = $li.closest('li');
	}
	
	//$li.closest('ul').find('li').not($li).removeClass('open');
	$li.toggleClass('open');
	/*for (ad in self.ads)
	{
		self.ads[ad].open = false;
	}*/
	self.ads[item.absoluteId].open = $li.hasClass('open');

	$li = null;
	self = null;
	
	return true;
}

MenoglasaApp.prototype.onClickGarageList = function(item, index, evt, target, self)
{
	var self = typeof self === 'undefined' ? this : self;

	if (/*$(target).hasClass('btn')
		||*/ $(target).hasParent('.advlist-item-body')
		|| $(target).hasParent('.advlist-item-footer')
		)
	{
		self = null;
		return true;
	}
	
	var $li = $(target);
	if ($li.prop('tagName').toLowerCase() != 'li')
	{
		$li = $li.closest('li');
	}
	
	//$li.closest('ul').find('li').not($li).removeClass('open');
	$li.toggleClass('open');
	/*for (car in self.garage)
	{
		self.garage[car].open = false;
	}*/
	self.garage[item.absoluteId].open = $li.hasClass('open');
	
	var id = zeroes(item.absoluteId);
	
	self.initCarousel(
		'#garage-carousel-main-' + id,
		'#garage-carousel-prev-' + id,
		'#garage-carousel-next-' + id,
		$('#garage-carousel-main-' + id).width(),
		$('#garage-carousel-main-' + id).height(),
		1, // visible items
		true, // crossfade
		self
	);
	self.initCarousel(
		'#garage-carousel-thumbs-main-' + id,
		'#garage-carousel-thumbs-prev-' + id,
		'#garage-carousel-thumbs-next-' + id,
		$('#garage-carousel-thumbs-main-' + id + ' > div').width(),
		$('#garage-carousel-thumbs-main-' + id).height(),
		4, // visible items
		false, // crossfade
		self
	);

	$('#garage-carousel-thumbs-main-' + id + ' img')
		.off('click')
		.on('click', {id: id}, function(evt){
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			var id = evt.data.id;
			var targetId = $(evt.target).attr('id').substring(6);
			$('#garage-carousel-main-' + id).trigger('slideTo',
				[
					$('#garage-carousel-main-' + id + ' img[id=p-'
						+ id
						+ '-'
						+ targetId + ']').parent(),
					0
				]
			);
			/*$('#garage-carousel-thumbs-main-' + id).trigger('slideTo',
				[
					$('#garage-carousel-thumbs-main-' + id + ' img[id=t-'
						+ id
						+ '-'
						+ targetId + ']').parent(),
					0
				]
			);*/
			return false;
		});

	$('#garage-carousel-next-' + id)
		//.off('click')
		.on('click', {id: id}, function(evt){
			var id = evt.data.id;
			$('#garage-carousel-main-' + id).trigger('next', {items: 1});
			var $current = $('#garage-carousel-main-' + id).triggerHandler('currentVisible').find('img');
			var targetId = $current.attr('id');
			targetId = targetId.substring(targetId.length-3);
			var $item = $('#garage-carousel-thumbs-main-' + id + ' img[id=t-' + id + '-' + targetId + ']');
			/*console.log('$item = ');
			console.log($item);
			console.log('$item.parent() = ');
			console.log($item.parent());*/
			$('#garage-carousel-thumbs-main-' + id).trigger(
				'slideTo',
				[$item.parent()],
				1
			);
			$current = null;
			$item = null;
			return false;
		});

	$('#garage-carousel-prev-' + id)
		//.off('click')
		.on('click', {id: id}, function(evt){
			var id = evt.data.id;
			$('#garage-carousel-main-' + id).trigger('prev', {items: 1});
			var $current = $('#garage-carousel-main-' + id).triggerHandler('currentVisible').find('img');
			var targetId = $current.attr('id');
			targetId = targetId.substring(targetId.length-3);
			var $item = $('#garage-carousel-thumbs-main-' + id + ' img[id=t-' + id + '-' + targetId + ']');
			$('#garage-carousel-thumbs-main-' + id).trigger(
				'slideTo',
				[$item.parent()],
				1
			);
			$current = null;
			$item = null;
			return false;
		});

	$li = null;
	self = null;
	
	return true;
}

MenoglasaApp.prototype.onMouseOverLeftList = function(item, index, event, target, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var $li = $(target);
	if ($li.prop('tagName').toLowerCase() != 'li')
	{
		$li = $li.closest('li');
	}
	
	$li.addClass('hovered');
	$li.find('.btn.close').addClass('hovered');
	
	$li = null;
	self = null;
}

MenoglasaApp.prototype.onMouseOutLeftList = function(item, index, event, target, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var $li = $(target);
	if ($li.prop('tagName').toLowerCase() != 'li')
	{
		$li = $li.closest('li');
	}
	
	$li.removeClass('hovered');
	$li.find('.btn.close').removeClass('hovered');
	
	$li = null;
	self = null;
}

MenoglasaApp.prototype.adjustListHeights = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	//console.log('adjustListHeights()');
	
	var bodyHeight = $('body').height();
	var gbcr = null;
	var listTop;
	
	if ($('#ad-page').hasClass('active'))
	{
		gbcr = $('#left-list')[0].getBoundingClientRect();
		listTop = gbcr.top;
		console.log(
			'1: bodyHeight = ' + bodyHeight
			+ ', listTop = ' + listTop
			+ ', self.bottomSpacing = ' + self.bottomSpacing
		);
		$('#left-list').css({
			height: bodyHeight - listTop - self.bottomSpacing + 'px'
		});
		$('#left-list').closest('.slimScrollDiv').css({
			height: bodyHeight - listTop - self.bottomSpacing + 'px'
		});
	}

	if (gbcr != null)
	{
		delete gbcr;
	}
	
	if ($('#garage-page').hasClass('active'))
	{
		gbcr = $('#garage-list')[0].getBoundingClientRect();
		listTop = gbcr.top;
		console.log(
			'2: bodyHeight = ' + bodyHeight
			+ ', listTop = ' + listTop
			+ ', self.bottomSpacing = ' + self.bottomSpacing
		);
		$('#garage-list').css({
			height: bodyHeight - listTop - self.bottomSpacing + 'px'
		});
		$('#garage-list').closest('.slimScrollDiv').css({
			height: bodyHeight - listTop - self.bottomSpacing + 'px'
		});
	}
	
	gbcr = null;
	self = null;
}

MenoglasaApp.prototype.openPopup = function(id, onBefore, self)
{
	var self = typeof self === 'undefined' ? this : self;

	if (typeof onBefore !== 'undefined')
	{
		onBefore(self);
	}
	
	$(id)
		.addClass('active')
		.prev().addClass('active');
		
	self = null;
}

MenoglasaApp.prototype.closePopup = function(id, self)
{
	var self = typeof self === 'undefined' ? this : self;

	$(id)
		.removeClass('active')
		.prev().removeClass('active');

	self = null;
}

MenoglasaApp.prototype.readInitialUserInfo = function()
{
	var ret = {
		email: 'pera@primer.com',
		password: '123123123',
		name: 'Petar',
		surname: 'Petrovic',
		city: 'Beograd',
		address: undefined,
		phone: [
			'011/1234-567'
		]
	};
	return ret;
}

MenoglasaApp.prototype.readUserInfo = function()
{
	var ret = {};
	var field;
	
	field = $('#settings-data-page-field-000-000').text();
	ret.email = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-000-001').text();
	ret.password = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-000').text();
	ret.name = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-001').text();
	ret.surname = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-002').text();
	ret.city = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-003').text();
	ret.address = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-004').text();
	ret.phone = [];
	ret.phone[0] = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	field = $('#settings-data-page-field-001-005').text();
	ret.phone[1] = field.length == 0 || field.substring(0, 'nije'.length) == 'nije' ? undefined : field;
	
	return ret;
}

MenoglasaApp.prototype.readPopup = function()
{
	var user = {};
	
	user.email = $('#settings-data-login-popup-email').val();
	user.password = $('#settings-data-login-popup-password').val();

	user.name = $('#settings-data-contact-popup-name').val();
	user.surname = $('#settings-data-contact-popup-surname').val();
	user.city = $('#settings-data-contact-popup-city').val();
	user.address = $('#settings-data-contact-popup-address').val();
	user.phone = [];
	user.phone[0] = $('#settings-data-contact-popup-phone-001').val();
	user.phone[1] = $('#settings-data-contact-popup-phone-002').val();
	
	user.email = user.email.length == 0 ? undefined : user.email;
	user.password = user.password.length == 0 ? undefined : user.password;
	
	user.name = user.name.length == 0 ? undefined : user.name;
	user.surname = user.surname.length == 0 ? undefined : user.surname;
	user.city = user.city.length == 0 ? undefined : user.city;
	user.address = user.address.length == 0 ? undefined : user.address;
	user.phone[0] = user.phone[0].length == 0 ? undefined : user.phone[0];
	user.phone[1] = user.phone[1].length == 0 ? undefined : user.phone[1];
	
	return user;
}

MenoglasaApp.prototype.updatePopup = function(user)
{
	$('#settings-data-login-popup-email').val(typeof user.email === 'undefined' ? '' : user.email);
	$('#settings-data-login-popup-password').val(typeof user.password === 'undefined' ? '' : user.password);

	$('#settings-data-contact-popup-name').val(typeof user.name === 'undefined' ? '' : user.name);
	$('#settings-data-contact-popup-surname').val(typeof user.surname === 'undefined' ? '' : user.surname);
	$('#settings-data-contact-popup-city').val(typeof user.city === 'undefined' ? '' : user.city);
	$('#settings-data-contact-popup-address').val(typeof user.address === 'undefined' ? '' : user.address);
	$('#settings-data-contact-popup-phone-001').val(typeof user.phone[0] === 'undefined' ? '' : user.phone[0]);
	$('#settings-data-contact-popup-phone-002').val(typeof user.phone[1] === 'undefined' ? '' : user.phone[1]);
}

MenoglasaApp.prototype.updateUserData = function(user)
{
	//var self = typeof self === 'undefined' ? this : self;
	
	$('#settings-data-page-field-000-000').text(typeof user.email === 'undefined' ? 'nije uneta' : user.email);
	$('#settings-data-page-field-000-001').text(typeof user.password === 'undefined' ? 'nije uneta' : coverPassword(user.password));
	$('#settings-data-page-field-001-000').text(typeof user.name === 'undefined' ? 'nije uneto' : user.name);
	$('#settings-data-page-field-001-001').text(typeof user.surname === 'undefined' ? 'nije uneto' : user.surname);
	$('#settings-data-page-field-001-002').text(typeof user.city === 'undefined' ? 'nije unet' : user.city);
	$('#settings-data-page-field-001-003').text(typeof user.address === 'undefined' ? 'nije uneta' : user.address);
	$('#settings-data-page-field-001-004').text(typeof user.phone[0] === 'undefined' ? 'nije unet' : user.phone[0]);
	$('#settings-data-page-field-001-005').text(typeof user.phone[1] === 'undefined' ? 'nije unet' : user.phone[1]);
	
	//self = null;
}

MenoglasaApp.prototype.init = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	var $notificationsPage = $('#settings-notifications-page');
	
	var sections = [
		'Eauto Market',
		'Eauto Usluge',
		'Eauto Prica'
	];
	var rows = [
		[
			'Neki od sacuvanih oglasa je izbrisan',
			'Nekom od sacuvanih oglasa je promenjena cena',
			'Mom oglasu istice promocija',
			'Moj oglas treba da se obnovi',
			'Savet eksperta za moj oglas'
		],
		[
			'Nova ocena neke od firmi koje sam sacuvao'
		],
		[
			'Komentar/preporuka mog posta',
			'Kom./prep. posta koji sam komentarisao/preporucio',
			'Nova privatna poruka',
			'Novi post o nekom od modela koje vozim',
			'Novi post o nekom od modela koje sam vozio',
			'Novi post o nekom od modela koje zelim'
		]
	];
	
	var html = '';
	for (var section in sections)
	{	
		var first = true;
		
		html += '<h2>' + sections[section] + '</h2>';
		
		if (typeof rows[section] !== 'undefined')
		{
			for (var row in rows[section])
			{
				html += '<div class="settings-row';
				if (first)
				{
					html += ' first'
					first = false;
				}
				html += '">'
					+ '<div class="settings-row-title">'
					+ rows[section][row]
					+ '<span class="moreinfo">'
					+ '<span class="moreinfo-desc">'
					+ 'Opis opcije broj ' + section + '-' + row
					+ '</span>'
					+ '?'
					+ '</span><!--moreinfo-->'
					+ '</div><!--settings-row-title-->'
					+ '<div class="settings-row-field">'
					+ '<input type="radio" name="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '" id="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-000" value="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-000">'
					+ '<label for="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-000"><span class="radio">&nbsp;</span>'
					+ '	Bez obavestenja'
					+ '</label>'
					+ '</div><!--settings-row-field-->'
					+ '<div class="settings-row-field">'
					+ '<input type="radio" checked="checked" name="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '" id="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-001" value="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-001">'
					+ '<label for="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-001"><span class="radio">&nbsp;</span>'
					+ '	Notifikacija'
					+ '</label>'
					+ '</div><!--settings-row-field-->'
					+ '<div class="settings-row-field">'
					+ '<input type="radio" name="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '" id="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-002" value="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-002">'
					+ '<label for="settings-notifications-'
						+ zeroes(section) + '-' + zeroes(row) + '-002"><span class="radio">&nbsp;</span>'
					+ '	Email'
					+ '</label>'
					+ '</div><!--settings-row-field-->'
					+ '</div><!--settings-row-->';
			}
		}
	}
	
	html += '<div class="settings-footer">'
		+ '<a href="#" class="btn blue">Sacuvaj</a> <a href="#" class="btn gray">Preporucena podesavanja</a>'
		+ '<span class="moreinfo">'
		+ '<span class="moreinfo-desc">'
		+ 'Opis prep. podesavanja'
		+ '</span>'
		+ '?'
		+ '</span><!--moreinfo-->'
		+ '</div><!--settings-footer-->';
	
	$notificationsPage.html(html);
	
	self.updateUserData(self.readInitialUserInfo());
	
	$notificationsPage = null;
	self = null;
}

MenoglasaApp.prototype.initLists = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#left-list').advlist({
		dataCreate: self.dataCreateLeftList,
		dataCreateParam: self,
		dataFormat: self.dataFormatLeftList,
		dataFormatParam: self,
		onAfterDataFormat: self.onAfterDataFormatLeftList,
		onAfterDataFormatParam: self,
		onClick: self.onClickLeftList,
		onClickParam: self,
		onMouseOver: self.onMouseOverLeftList,
		onMouseOverParam: self,
		onMouseOut: self.onMouseOutLeftList,
		onMouseOutParam: self,
		slimScrollShowSpeed: self.slimScrollShowSpeed,
		slimScrollHideSpeed: self.slimScrollHideSpeed,
		width: self.leftListWidth + 'px'
	});
	
	$('#garage-list').advlist({
		dataCreate: self.dataCreateGarageList,
		dataCreateParam: self,
		dataFormat: self.dataFormatGarageList,
		dataFormatParam: self,
		onAfterDataFormat: self.onAfterDataFormatGarageList,
		onAfterDataFormatParam: self,
		onClick: self.onClickGarageList,
		onClickParam: self,
		onMouseOver: self.onMouseOverGarageList,
		onMouseOverParam: self,
		onMouseOut: self.onMouseOutGarageList,
		onMouseOutParam: self,
		slimScrollShowSpeed: self.slimScrollShowSpeed,
		slimScrollHideSpeed: self.slimScrollHideSpeed,
		width: self.leftListWidth + 'px'
	});
	
	self = null;
}

MenoglasaApp.prototype.initInfoPopup = function(activate, self)
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

MenoglasaApp.prototype.initEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('.nav-tabs > li > a').off('click').on('click', {self: self}, function(evt) {
		var self = evt.data.self;
		evt.stopPropagation();
		$(this).closest('.nav-tabs').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		//$($(this).attr('href')).addClass('active');

		self.slideIn($(this).attr('href'),
			$(this).closest('.nav-tabs').next().children().filter('.tab-pane.active'),
			function() {
				self.adjustListHeights(self);
				self = null;
			}
		);
		return false;
	});
	
	/*$('#content-left').off('click', '.promotion-col').on('click', '.promotion-col', {self:self}, function(evt) {
		evt.stopImmediatePropagation();
		var self = evt.data.self;
		var id = parseInt($(this).closest('.advlist-item-header').data('id'));
		var $list = $(this).closest('.advlist').data('advlist');
		
		self.ads[id].status = self.ads[id].status == self.S_ACTIVE ? self.S_INACTIVE : self.S_ACTIVE;
		self.ads[id].promotion = self.ads[id].promotion == self.P_STARTED ? self.P_PAUSED : self.P_STARTED;
		
		$list.refresh();
		
		$list = null;
		self = null;
		//return false;
	});*/
	
	$('#filter-ads-active > li > a').off('click').on('click', {self: self}, function(evt) {
		var self = evt.data.self;
		var id = $(this).parent().data('filter-id');
		//evt.stopPropagation();
		$(this).closest('.dropdown-menu').parent().find('.dropdown-toggle').html(
			self.filterAds[id].label + ' <span class="caret"></span>');
		$(this).closest('.dropdown-menu').find('li').removeClass('checked');
		$(this).parent().addClass('checked');
		$(this).closest('.dropdown-menu').parent().removeClass('open');
		self.filterAdsSelectedId = id;
		self.filterTheAds(self);
		self.refreshAdsList(self);
		self = null;
		return false;
	});
	
	$('#content-left').off('click', '.advlist li [id^=ad-checkbox-]').on('click', '.advlist li [id^=ad-checkbox-]', {self: self}, function(evt) {
		evt.stopImmediatePropagation();
		var self = evt.data.self;
		var id = parseInt($(this).prop('id').substring('#ad-checkbox-'.length));
		
		self.ads[id].checked = $(this).is(':checked');
		//self.refreshAdsList();
		
		self = null;
	});
	
	if (typeof self.isOnResizeAssigned === 'undefined' || !self.isOnResizeAssigned)
	{
		$(window).on('resize', {self: self}, function(evt) {
			var self = evt.data.self;
			self.adjustListHeights(self);
			if ($('#info').hasClass('active'))
			{
				self.initInfoPopup(false, self);
			}
			self = null;
		});
		self.isOnResizeAssigned = true;
	}

	$('.advlist-item-graph').each(function() {
		var absoluteId = $(this).closest('li').find('.advlist-item-header').data('id');
		var id = $(this).prop('id');
		var svg = $(this).svg({
			settings: {
				viewBox:
					self.graphX.min
					+ ' '
					+ self.graphY.min
					+ ' '
					+ self.graphX.max
					+ ' '
					+ self.graphY.max,
				width: '100%',
				height: '100%'
			},
			onLoad: function(svg) {
				self.initGraph(svg, id, self.ads[absoluteId], true, false, self);
			}
		}).svg('get');

		$(svg.root()).on('mouseover', {self: self}, function(evt) {
			//console.log('svg.root.onMouseover');
			var self = evt.data.self;
			evt.stopPropagation();
			evt.stopImmediatePropagation();
			self.hideHint();
			self = null;
			return false;
		});
		
		svg = null;
	});
	
	$(document).on('click', '.garage-carousel-main img', {self: self}, function(evt) {	
		var self = evt.data.self;
		var id = $(evt.target).closest('.garage-carousel-main').prop('id');
		id = id.substring(id.length-3);
		self.initInfoPopup(true, self);
		
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
		$('#garage-carousel-main-' + id + ' img').each(function() {
			var id = $(this).prop('id');
			id = id.substring(id.length-3);
			values.push({
				i: parseInt(id),
				url: $(this).prop('src')
			});
		});
		$('#garage-carousel-thumbs-' + id + ' img').each(function() {
			var id = $(this).prop('id');
			id = id.substring(id.length-3);
			thvalues.push({
				i: parseInt(id),
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
		
		self = null;
		
		return false;
	});
	$('.garage-carousel-magnifier').off('click').on('click', function() {
		var $current = $(this).closest('.garage-carousel').find('.garage-carousel-main').triggerHandler('currentVisible').find('img');
		$current.trigger('click');
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
	
	$('.popup .close .btn').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $closeBtn = $(evt.target).hasClass('close') ? $(evt.target) : $(evt.target).closest('.close');
		this.closePopup('#' + $closeBtn.closest('.popup').prop('id'));
		$closeBtn = null;
		return false;
	}, self));
	$('.popup-background').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var $background = $(evt.target).hasClass('popup-background') ? $(evt.target) : $(evt.target).closest('.popup-background');
		$background.next().find('.close .btn').trigger('click');
		$background = null;
		return false;
	}, self));
	
	$('#settings-data-page-edit-link-000').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var user = this.readUserInfo();
		this.updatePopup(user);
		this.openPopup('#settings-data-login-popup');
		return false;
	}, self));
	$('#settings-data-page-edit-link-001').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var user = this.readUserInfo();
		this.updatePopup(user);
		this.openPopup('#settings-data-contact-popup');
		return false;
	}, self));

	$('#settings-data-login-save-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var user = this.readPopup();
		this.updateUserData(user);
		this.closePopup('#settings-data-login-popup');
		return false;
	}, self));
	$('#settings-data-contact-save-button').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		var user = this.readPopup();
		this.updateUserData(user);
		this.closePopup('#settings-data-contact-popup');
		return false;
	}, self));

	self = null;
}

$(document).ready(function(){
	var menoglasa = new MenoglasaApp();

	menoglasa.init();
	menoglasa.initLists();
	menoglasa.initEvents(menoglasa);
	menoglasa.adjustListHeights(menoglasa);
	
	//baza.initFilterEvents();
	
	$('p:not(.inactive) > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', false);
	});
	$('p.inactive > .ddOutOfVision > select').each(function() {
		$(this).data('dd').set('disabled', true);
	});
});
