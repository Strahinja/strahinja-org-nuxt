function TimelineItem(options)
{
	var defaults = {
		author: {
			name: undefined,
			image: undefined
		},
		relatedAd: {
			maker: undefined,
			model: undefined,
			year: {
				min: undefined,
				max: undefined
			}
		},
		timestamp: undefined,
		likes: undefined
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}

TimelineItem.prototype.toHtml = function()
{
	return '<li></li>';
}

TimelineItem.prototype.formatRelated = function()
{
	return this.relatedAd.maker + ' ' + this.relatedAd.model
		+ ' (' + this.relatedAd.year.min + '-' + this.relatedAd.year.max + ')';
}

TimelineItem.prototype.formatTimestamp = function()
{
	// TODO
	return 'pre 15 minuta';
}

function TimelineCommentItem(options)
{
	TimelineItem.call(this, options);
	
	var defaults = {
		comment: undefined
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}
TimelineCommentItem.prototype = new TimelineItem();

TimelineCommentItem.prototype.toHtml = function()
{
	var html = '<li class="timeline-item" data-type="question">'
		+ '<div class="timeline-item-icon">'
		+ '?'
		+ '</div><!--timeline-icon-->'
		+ '<div class="timeline-item-header">'
		+ '<div class="timeline-item-header-picture">'
		+ '<img src="img/user/' + this.author.image + '" />'
		+ '</div><!--timeline-item-header-picture-->'
		+ '<div class="timeline-item-header-text">'
		+ '<a href="#">' + this.author.name + '</a> je <span class="action-posted">postavio</span> '
		+ 'pitanje u vezi sa'
		+ '<div class="timeline-item-header-subject">'
		+ '<a href="#">' + this.formatRelated() + '</a>'
		+ '</div><!--timeline-item-header-subject-->'
		+ '</div><!--timeline-item-header-text-->'
		+ '</div><!--timeline-item-header-->'
		+ '<div class="timeline-item-body">'
		+ this.comment
		+ '</div><!--timeline-item-body-->'
		+ '<div class="timeline-item-footer">'
		+ '<span class="timeline-item-footer-timestamp">'
		+ this.formatTimestamp()
		+ '</span><!--timeline-item-footer-timestamp-->'
		+ '<a href="#" class="timeline-item-footer-like-link"><img src="img/thumbsup.png" /></a>'
		+ '<span class="timeline-item-footer-likes">'
		+ this.likes
		+ '</span>'
		+ '</div>'
		+ '</li>';
	return html;
}

function TimelineGalleryItem(options)
{
	TimelineItem.call(this, options);
	
	var defaults = {
		images: []
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}
TimelineGalleryItem.prototype = new TimelineItem();

TimelineGalleryItem.prototype.toHtml = function()
{
	var html = '<li class="timeline-item" data-type="gallery">'
		+ '<div class="timeline-item-icon">'
		+ '&#128247;'
		+ '</div><!--timeline-icon-->'
		+ '<div class="timeline-item-header">'
		+ '<div class="timeline-item-header-picture">'
		+ '<img src="img/user/' + this.author.image + '" />'
		+ '</div><!--timeline-item-header-picture-->'
		+ '<div class="timeline-item-header-text">'
		+ '<a href="#">' + this.author.name + '</a> je <span class="action-posted">postavio</span> '
		+ 'nove slike za'
		+ '<div class="timeline-item-header-subject">'
		+ '<a href="#">' + this.formatRelated() + '</a>'
		+ '</div><!--timeline-item-header-subject-->'
		+ '</div><!--timeline-item-header-text-->'
		+ '</div><!--timeline-item-header-->'
		+ '<div class="timeline-item-body">';
	
	for (var image = 0; image < Math.min(3, this.images.length); image++)
	{
		html += '<div class="timeline-item-gallery-image"><img src="img/car/' + this.images[image] + '" /></div>';
	}
	
	html += '<div class="timeline-item-body-clear"></div>'
		+ '</div><!--timeline-item-body-->'
		+ '<div class="timeline-item-footer">'
		+ '<span class="timeline-item-footer-timestamp">'
		+ this.formatTimestamp()
		+ '</span><!--timeline-item-footer-timestamp-->'
		+ '<a href="#" class="timeline-item-footer-like-link"><img src="img/thumbsup.png" /></a>'
		+ '<span class="timeline-item-footer-likes">'
		+ this.likes
		+ '</span>'
		+ '</div>'
		+ '</li>';
	return html;
}

function TimelineAdItem(options)
{
	TimelineItem.call(this, options);
	
	var defaults = {
		ad: {
			subject: undefined,
			image: undefined,
			title: undefined,
			url: undefined,
			description: undefined,
		}
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}
TimelineAdItem.prototype = new TimelineItem();

TimelineAdItem.prototype.toHtml = function()
{
	var html = '<li class="timeline-item" data-type="ad">'
		+ '<div class="timeline-item-icon">'
		+ '&euro;'
		+ '</div><!--timeline-icon-->'
		+ '<div class="timeline-item-header">'
		+ '<div class="timeline-item-header-picture">'
		+ '<img src="img/user/' + this.author.image + '" />'
		+ '</div><!--timeline-item-header-picture-->'
		+ '<div class="timeline-item-header-text">'
		+ '<a href="#">' + this.author.name + '</a> oglasava ' + this.ad.subject
		+ '<div class="timeline-item-header-subject">'
		+ '<a href="#">' + this.formatRelated() + '</a>'
		+ '</div><!--timeline-item-header-subject-->'
		+ '</div><!--timeline-item-header-text-->'
		+ '</div><!--timeline-item-header-->'
		+ '<div class="timeline-item-body">'
		+ '<div class="timeline-item-ad-picture">'
		+ '<img src="img/timeline/' + this.ad.image + '" />'
		+ '</div><!--timeline-item-ad-picture-->'
		+ '<div class="timeline-item-ad-description">'
		+ '<div class="timeline-item-ad-description-title">'
		+ this.ad.title
		+ '</div><!--timeline-item-ad-description-title-->'
		+ '<div class="timeline-item-ad-description-body">'
		+ this.ad.description
		+ '</div><!--timeline-item-ad-description-body-->'
		+ '</div><!--timeline-item-ad-description-->'
		+ '<div class="timeline-item-body-clear"></div>'
		+ '</div><!--timeline-item-body-->'
		+ '<div class="timeline-item-footer">'
		+ '<span class="timeline-item-footer-timestamp">'
		+ this.formatTimestamp()
		+ '</span><!--timeline-item-footer-timestamp-->'
		+ '<a href="#" class="timeline-item-footer-like-link"><img src="img/thumbsup.png" /></a>'
		+ '<span class="timeline-item-footer-likes">'
		+ this.likes
		+ '</span>'
		+ '</div>'
		+ '</li>';
	return html;
}

function TimelineScoreItem(options)
{
	TimelineItem.call(this, options);
	
	var defaults = {
		score: {
			looks: undefined,
			comfort: undefined,
			expenses: undefined,
			performance: undefined,
			reliability: undefined
		}
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}
TimelineScoreItem.prototype = new TimelineItem();

TimelineScoreItem.prototype.getTotalScore = function()
{
	var numScoreCategories = 5;
	
	return (this.score.looks + this.score.comfort + this.score.expenses
		+ this.score.performance + this.score.reliability) / numScoreCategories;
}


TimelineScoreItem.prototype.scoreBar = function(score)
{
	var score = typeof score === 'undefined' ? 0 : score;
	
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
	return ret;
}

TimelineScoreItem.prototype.toHtml = function()
{
	var html = '<li class="timeline-item" data-type="score">'
		+ '<div class="timeline-item-icon">'
		+ '&#9998;'
		+ '</div><!--timeline-icon-->'
		+ '<div class="timeline-item-header">'
		+ '<div class="timeline-item-header-picture">'
		+ '<img src="img/user/' + this.author.image + '" />'
		+ '</div><!--timeline-item-header-picture-->'
		+ '<div class="timeline-item-header-text">'
		+ '<a href="#">' + this.author.name + '</a> je <span class="action-posted">ocenio</span> '
		+ '<div class="timeline-item-header-subject">'
		+ '<a href="#">' + this.formatRelated() + '</a>'
		+ '</div><!--timeline-item-header-subject-->'
		+ '</div><!--timeline-item-header-text-->'
		+ '</div><!--timeline-item-header-->'
		+ '<div class="timeline-item-body">'
		
		+ '<div class="timeline-item-score-score">'
		
		+ '<div class="timeline-item-score-row total">'
		+ '<div class="timeline-item-score-text">'
		+ 'Opsta ocena'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.getTotalScore())
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'

		+ '<div class="timeline-item-score-row">'
		+ '<div class="timeline-item-score-text">'
		+ 'Izgled'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.score.looks)
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'

		+ '<div class="timeline-item-score-row">'
		+ '<div class="timeline-item-score-text">'
		+ 'Komfor'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.score.comfort)
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'

		+ '<div class="timeline-item-score-row">'
		+ '<div class="timeline-item-score-text">'
		+ 'Troskovi'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.score.expenses)
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'

		+ '<div class="timeline-item-score-row">'
		+ '<div class="timeline-item-score-text">'
		+ 'Performanse'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.score.performance)
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'

		+ '<div class="timeline-item-score-row">'
		+ '<div class="timeline-item-score-text">'
		+ 'Pouzdanost'
		+ '</div><!--timeline-item-score-text-->'
		+ '<div class="timeline-item-score-bar">'
		+ this.scoreBar(this.score.reliability)
		+ '</div><!--timeline-item-score-bar-->'
		+ '</div><!--timeline-item-score-row-->'
		
		+ '</div><!--timeline-item-score-score-->'
		
		+ '<div class="timeline-item-score-comment">'
		+ this.comment
		+ '</div><!--timeline-item-score-comment-->'

		+ '<div class="timeline-item-body-clear"></div>'
		
		+ '</div><!--timeline-item-body-->'
		+ '<div class="timeline-item-footer">'
		+ '<span class="timeline-item-footer-timestamp">'
		+ this.formatTimestamp()
		+ '</span><!--timeline-item-footer-timestamp-->'
		+ '<a href="#" class="timeline-item-footer-like-link"><img src="img/thumbsup.png" /></a>'
		+ '<span class="timeline-item-footer-likes">'
		+ this.likes
		+ '</span><!--timeline-item-footer-likes-->'
		+ '</div><!--timeline-item-footer-->'
		+ '</li>';
	return html;
}

function TimelineComment(options)
{
	var defaults = {
		author: {
			name: undefined,
			image: undefined
		},
		comment: undefined,
		timestamp: undefined,
		likes: undefined
	};
	
	$.extend(this, defaults, options);
	
	defaults = null;
}

TimelineComment.prototype.formatTimestamp = function()
{
	// TODO
	return 'pre 15 minuta';
}

TimelineComment.prototype.toHtml = function()
{
	var html = '<li class="timeline-comment">'
		+ '<div class="timeline-comment-header">'
		+ '<div class="timeline-comment-header-picture">'
		+ '<img src="img/user/' + this.author.image + '" />'
		+ '</div><!--timeline-comment-header-picture-->'
		+ '<div class="timeline-comment-header-text">'
		+ '<span class="timeline-comment-header-text-author">'
		+ '<a href="#">' + this.author.name + '</a>'
		+ '</span><!--timeline-comment-header-text-author-->'
		+ this.comment
		+ '</div><!--timeline-comment-header-text-->'
		+ '</div><!--timeline-comment-header-->'
		+ '<div class="timeline-comment-footer">'
		+ '<span class="timeline-comment-footer-timestamp">'
		+ this.formatTimestamp()
		+ '</span><!--timeline-comment-footer-timestamp-->'
		+ '<a href="#" class="timeline-comment-footer-like-link"><img src="img/thumbsup.png" /></a>'
		+ '<span class="timeline-comment-footer-likes">'
		+ this.likes
		+ '</span><!--timeline-comment-footer-likes-->'
		+ '</div><!--timeline-comment-footer-->'
		+ '</li>';
		
	return html;
}

function TimelineApp()
{
	/***********************************
	 *             SETTINGS            *
	 ***********************************/
	this.slimScrollShowSpeed = 300;
	this.slimScrollHideSpeed = 300;
	this.timelineShowDuration = 600;
	this.timelineHideDuration = 600;
	this.serverAvailableItems = 50; // how many items to simulate
	/***********************************
	 *            END SETTINGS         *
	 ***********************************/
	 
	this.revealAnimationOn = false;
	this.addedItems = 0;
	this.scrolling = false;
}

TimelineApp.prototype.randomCommentsHtml = function(userImageUrl, itemNo, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var comment;
	var numComments = Math.floor(Math.random() * 100) % 10;
	var i = 0;
	var html;

	if (numComments > 2)
	{
		html = '<div class="timeline-comments-reveal-link-wrapper">'
			+ '<a href="#" class="timeline-comments-reveal-link">'
			+ numComments
			+ ' komentara'
			+ '</a><span class="arrow down">&nbsp;</span>'
			+ '</div><!--timeline-comments-reveal-link-wrapper-->'
			+ '<ul class="timeline-comments">';
		for (; i < 2; i++)
		{
			var rand = Math.floor((Math.random() * 10) % 3);
			switch (rand)
			{
				case 0:
					comment = new TimelineComment({
						author: {
							name: 'Petar Petrovic',
							image: 'user-001.png'
						},
						comment: 'Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
						+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.',
						likes: 17
					});
					break;
				case 1:
					comment = new TimelineComment({
						author: {
							name: 'Marko Markovic',
							image: 'user-000.png'
						},
						comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
						+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
						+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.',
						likes: 5
					});
					break;
				case 2:
					comment = new TimelineComment({
						author: {
							name: 'Marko Markovic',
							image: 'user-000.png'
						},
						comment: 'Ipsum turpis suscipit urna, vel tincidunt turpis lorem nec lacus.',
						likes: 25
					});
					break;
			}
			html += comment.toHtml();
		}
		html += '<li class="timeline-comments-post">'
			+ '<img src="img/user/' + userImageUrl + '" />'
			+ '<input type="text" placeholder="Ostavi komentar..." class="formatted" id="timeline-comments-post-'
				+ zeroes(itemNo) + '"></input>'
			+ '<div class="timeline-comments-post-clear"></div>'
			+ '</li>';
		html += '</ul><!--timeline-comments-->'
			+ '<ul class="timeline-comments-additional">';
	}
	else
	{
		html = '<ul class="timeline-comments">';
	}

	for (; i < numComments; i++)
	{
		var rand = Math.floor((Math.random() * 10) % 3);
		switch (rand)
		{
			case 0:
				comment = new TimelineComment({
					author: {
						name: 'Petar Petrovic',
						image: 'user-001.png'
					},
					comment: 'Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
					+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.',
					likes: 17
				});
				break;
			case 1:
				comment = new TimelineComment({
					author: {
						name: 'Marko Markovic',
						image: 'user-000.png'
					},
					comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
					+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
					+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.',
					likes: 5
				});
				break;
			case 2:
				comment = new TimelineComment({
					author: {
						name: 'Marko Markovic',
						image: 'user-000.png'
					},
					comment: 'Ipsum turpis suscipit urna, vel tincidunt turpis lorem nec lacus.',
					likes: 25
				});
				break;
		}
		html += comment.toHtml();
	}

	if (numComments > 2)
	{
		html += '</ul><!--timeline-comments-additional-->';
	}
	else
	{
		html += '<li class="timeline-comments-post">'
			+ '<img src="img/user/' + userImageUrl + '" />'
			+ '<input type="text" placeholder="Ostavi komentar..." class="formatted" id="timeline-comments-post-'
				+ zeroes(itemNo) + '"></input>'
			+ '<div class="timeline-comments-post-clear"></div>'
			+ '</li>';
		html += '</ul><!--timeline-comments-->';
	}
	
	
	self = null;
	comment = null;
	
	return html;
}

TimelineApp.prototype.addRandomItem = function(itemNo, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $list = $('#timeline').data('domlist');
	var item;

	var rand = Math.floor((Math.random() * 10) % 4);
	switch (rand)
	{
		case 0:
			item = new TimelineCommentItem({
				author: {
					name: 'Marko Markovic',
					image: 'user-000.png'
				},
				relatedAd: {
					maker: 'Audi',
					model: 'A3 Hecbek',
					year: {
						min: 2003,
						max: 2008
					}
				},
				likes: 15,
				comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
					+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
					+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.'
			});
			break;
		case 1:
			item = new TimelineGalleryItem({
				author: {
					name: 'Marko Markovic',
					image: 'user-000.png'
				},
				relatedAd: {
					maker: 'Audi',
					model: 'A3 Hecbek',
					year: {
						min: 2003,
						max: 2008
					}
				},
				likes: 8,
				images: [
					'v1.jpg',
					'v2.jpg',
					'v3.jpg',
					'v4.jpg',
					'v5.jpg'
				]
			});
			break;
		case 2:
			item = new TimelineScoreItem({
				author: {
					name: 'Petar Petrovic',
					image: 'user-001.png'
				},
				relatedAd: {
					maker: 'Audi',
					model: 'A3 Hecbek',
					year: {
						min: 2003,
						max: 2008
					}
				},
				likes: 5,
				score: {
					looks: 4,
					comfort: 3,
					expenses: 5,
					performance: 3,
					reliability: 5
				},
				comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
					+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
					+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.'
			});
			break;
		case 3: 
			item = new TimelineAdItem({
				author: {
					name: 'KIM Auto Perionica',
					image: 'co-003.png'
				},
				relatedAd: {
					maker: 'Audi',
					model: 'A3 Hecbek',
					year: {
						min: 2003,
						max: 2008
					}
				},
				likes: 32,
				ad: {
					subject: 'novi popust',
					image: 'timeline-ad-000.png',
					title: 'Popust na voskiranje 20%',
					url: '#',
					description: 'Najkvalitetnije voskiranje u gradu od sada po super ceni! '
						+ 'Dodjite i uverite se u kvalitet nasih preparata i rada!'
				}
			});
			break;
		default:
	}

	var html = item.toHtml();
	
	html = html.substring(0,html.length-'</li>'.length) + self.randomCommentsHtml('user-002.png', itemNo) + '</li>';

	$list.addItem(html);
	
	$('input[type="text"],textarea').togglePlaceholder();
	
	self = null;
	$list = null;
	item = null;
}

TimelineApp.prototype.addSpecificItem = function(itemType, itemNo, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var $list = $('#timeline').data('domlist');
	var item;

	if (itemType.toLowerCase() == 'question')
	{
		item = new TimelineCommentItem({
			author: {
				name: 'Marko Markovic',
				image: 'user-000.png'
			},
			relatedAd: {
				maker: 'Audi',
				model: 'A3 Hecbek',
				year: {
					min: 2003,
					max: 2008
				}
			},
			likes: 15,
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
				+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
				+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.'
		});
	}
	else if (itemType.toLowerCase() == 'gallery')
	{
		item = new TimelineGalleryItem({
			author: {
				name: 'Marko Markovic',
				image: 'user-000.png'
			},
			relatedAd: {
				maker: 'Audi',
				model: 'A3 Hecbek',
				year: {
					min: 2003,
					max: 2008
				}
			},
			likes: 8,
			images: [
				'v1.jpg',
				'v2.jpg',
				'v3.jpg',
				'v4.jpg',
				'v5.jpg'
			]
		});
	}
	else if (itemType.toLowerCase() == 'score')
	{
		item = new TimelineScoreItem({
			author: {
				name: 'Petar Petrovic',
				image: 'user-001.png'
			},
			relatedAd: {
				maker: 'Audi',
				model: 'A3 Hecbek',
				year: {
					min: 2003,
					max: 2008
				}
			},
			likes: 5,
			score: {
				looks: 4,
				comfort: 3,
				expenses: 5,
				performance: 3,
				reliability: 5
			},
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum auctor faucibus.'
				+ 'Fusce hendrerit a ipsum et sodales. Proin accumsan, ipsum vel dignissim lobortis, ipsum turpis'
				+ 'suscipit urna, vel tincidunt turpis lorem nec lacus.'
		});
	}
	else if (itemType.toLowerCase() == 'ad')
	{
		item = new TimelineAdItem({
			author: {
				name: 'KIM Auto Perionica',
				image: 'co-003.png'
			},
			relatedAd: {
				maker: 'Audi',
				model: 'A3 Hecbek',
				year: {
					min: 2003,
					max: 2008
				}
			},
			likes: 32,
			ad: {
				subject: 'novi popust',
				image: 'timeline-ad-000.png',
				title: 'Popust na voskiranje 20%',
				url: '#',
				description: 'Najkvalitetnije voskiranje u gradu od sada po super ceni! '
					+ 'Dodjite i uverite se u kvalitet nasih preparata i rada!'
			}
		});
	}

	var html = item.toHtml();
	
	html = html.substring(0,html.length-'</li>'.length) + self.randomCommentsHtml('user-002.png', itemNo) + '</li>';

	$list.addItem(html);
	
	$('input[type="text"],textarea').togglePlaceholder();
	
	self = null;
	$list = null;
	item = null;
}

TimelineApp.prototype.init = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#timeline').domlist({
		slimScrollShowSpeed: self.slimScrollShowSpeed,
		slimScrollHideSpeed: self.slimScrollHideSpeed,
		width: '600px',
		height: '600px'
	});

	self.checkPopulateTimeline(undefined, self);
	
	$('#timeline').slimScroll({
		alwaysVisible: true,
		height: $(window).height()
			- ($('#topmenu-wrapper').height()
				+ $('#nav-tabs').height()) + 'px'
	});
	
	self = null;
}

TimelineApp.prototype.resizeTimelineScroll = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	$('#timeline').css({
		height: $(window).height()
			- ($('#topmenu-wrapper').height()
				+ $('#nav-tabs').height()) + 'px'
	});
	$('#timeline').closest('.slimScrollDiv').css({
		height: $(window).height()
			- ($('#topmenu-wrapper').height()
				+ $('#nav-tabs').height()) + 'px'
	});
	
	self = null;
}

TimelineApp.prototype.checkPopulateTimeline = function(itemType, self)
{
	var self = typeof self === 'undefined' ? this : self;
	
	console.log('checkPopulateTimeline: ul.height = '
		+ $('#timeline > ul').eq(0).height()
		+ ', window.height = ' + $(window).height()
		+ ', queueServerDataAvailable = ' + self.queueServerDataAvailable()
	);
	while ($('#timeline > ul').eq(0).height() <= $(window).height()
		&& self.queueServerDataAvailable())
	{
		if (typeof itemType === 'undefined')
		{
			self.addRandomItem(self.addedItems, self);
		}
		else
		{
			self.addSpecificItem(itemType, self.addedItems, self);
		}
		self.addedItems++;
	}
	
	self = null;
}

TimelineApp.prototype.showAllTypes = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var showDuration = self.timelineShowDuration;
	$('#timeline li.timeline-item').each(function() {
		if ($(this).hasClass('hidden'))
		{
			var height = $(this).data('height');
			$(this).removeClass('hidden');
			$(this).addClass('animating');
			//console.log('showType[each index=' + $(this).index() + '] showing, height = ' + height);
			$(this).css({ opacity: '0.0', height: 0 });
			$(this).animate({
				height: '' + height + 'px',
				//'min-height': height + 'px',
				opacity: '1.0'
			}, showDuration, function() {
				$(this).css({
					height: '',
					//'min-height': '',
					opacity: ''
				});
				$(this).removeClass('animating');
			});
		}
	});
	self = null;
}

TimelineApp.prototype.showType = function(type, callBack, self)
{
	var self = typeof self === 'undefined' ? this : self;
	var showDuration = self.timelineShowDuration;
	var hideDuration = self.timelineHideDuration;
	
	$('#timeline li.timeline-item').each(function() {
		if ($(this).data('type') == type
			&& $(this).hasClass('hidden'))
		{
			var height = $(this).data('height');
			$(this).removeClass('hidden');
			$(this).addClass('animating');
			//console.log('showType[each index=' + $(this).index() + '] showing, height = ' + height);
			$(this).css({ opacity: '0.0', height: 0 });
			$(this).animate({
				height: '' + height + 'px',
				//'min-height': height + 'px',
				opacity: '1.0'
			}, showDuration, function() {
				$(this).css({
					height: '',
					//'min-height': '',
					opacity: ''
				});
				$(this).removeClass('animating');
				if (typeof callBack !== 'undefined')
				{
					callBack();
				}
				self = null;
			});
		}
		if ($(this).data('type') != type
			&& !$(this).hasClass('hidden'))
		{
			var height = $(this).height();
			//console.log('showType[each index=' + $(this).index() + '] hiding, height = ' + height);
			$(this).css({ opacity: '1.0' });
			$(this).animate({
				height: 0,
				//'min-height': 0,
				opacity: '0.0'
			}, hideDuration, function() {
				$(this).data('height', height);
				$(this).css({
					height: '',
					//'min-height': '',
					opacity: ''
				});
				$(this).addClass('hidden');
				if (typeof callBack !== 'undefined')
				{
					callBack();
				}
				self = null;
			});
		}
	});
}

TimelineApp.prototype.initEvents = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var showDuration = self.timelineShowDuration;
	var hideDuration = self.timelineHideDuration;
	
	/*$('.tab-content > .slimScrollDiv')
		.off('mouseover')
		.on('mouseover', function(evt) {
			evt.stopPropagation();
			if (!$(evt.target).hasClass('#timeline'))
			{
				$('#timeline').trigger('mouseover');
			}
			return false;
		});*/
	
	$('#all-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if ($('.animating').length == 0)
		{
			$('#nav-tabs').find('li').removeClass('active');
			$('#all-tab').parent().addClass('active');
			$('#timeline').slimScroll({ scrollTo: 0, alwaysVisible: true});
			this.showAllTypes();
		}
		return false;
	}, self));
	$('#questions-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if ($('.animating').length == 0)
		{
			var type = 'question';
			$('#nav-tabs').find('li').removeClass('active');
			$('#questions-tab').parent().addClass('active');
			$('#timeline').slimScroll({ scrollTo: 0, alwaysVisible: true});
			this.showType(type, $.proxy(function() {
				this.checkPopulateTimeline(type);
			}, this));
		}
		return false;
	}, self));
	$('#gallery-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if ($('.animating').length == 0)
		{
			var type = 'gallery';
			$('#nav-tabs').find('li').removeClass('active');
			$('#gallery-tab').parent().addClass('active');
			$('#timeline').slimScroll({ scrollTo: 0, alwaysVisible: true});
			this.showType(type, $.proxy(function() {
				this.checkPopulateTimeline(type);
			}, this));
		}
		return false;
	}, self));
	$('#scores-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if ($('.animating').length == 0)
		{
			var type = 'score';
			$('#nav-tabs').find('li').removeClass('active');
			$('#scores-tab').parent().addClass('active');
			$('#timeline').slimScroll({ scrollTo: 0, alwaysVisible: true});
			this.showType(type, $.proxy(function() {
				this.checkPopulateTimeline(type);
			}, this));
		}
		return false;
	}, self));
	$('#discounts-tab').off('click').on('click', $.proxy(function(evt) {
		evt.stopPropagation();
		if ($('.animating').length == 0)
		{
			var type = 'ad';
			$('#nav-tabs').find('li').removeClass('active');
			$('#discounts-tab').parent().addClass('active');
			$('#timeline').slimScroll({ scrollTo: 0, alwaysVisible: true});
			this.showType(type, $.proxy(function() {
				this.checkPopulateTimeline(type);
			}, this));
		}
		return false;
	}, self));
	
	$(document)
		.off('click', '.timeline-comments-reveal-link')
		.on('click', '.timeline-comments-reveal-link', {self: self}, function(evt) {
			evt.stopImmediatePropagation();
			var $comments = $(this).closest('.timeline-item').find('.timeline-comments');
			var $additional = $(this).closest('.timeline-item').find('.timeline-comments-additional');
			var $arrow = $(this).closest('.timeline-comments-reveal-link-wrapper').find('.arrow');
			var $postSection;
			var self = evt.data.self;
			
			if (!self.revealAnimationOn)
			{
				$postSection = $(this).closest('.timeline-item').find('.timeline-comments-post').detach();
				if (!$additional.hasClass('active'))
				{
					var height = $additional.height();
					var wasAtBottom = $('#timeline').scrollTop() >= $('#timeline > ul').height() - $('#timeline').height();
					console.log('scrollTop = ' + $('#timeline').scrollTop()
						+ ', ul.height = ' + $('#timeline > ul').height()
						+ ', height = ' + $('#timeline').height()
						+ ', wasAtBottom = ' + wasAtBottom
					);
					
					self.revealAnimationOn = true;
					$additional.append($postSection);
					$comments.addClass('additional-open');
					$arrow.removeClass('down').addClass('up');
					$additional.addClass('pre-show');
					$additional.css({
						height: 0,
						opacity: '0.0'
					});
					$additional.animate({
						height: height + 'px',
						opacity: '1.0'
					}, showDuration, function() {
						$(this).removeClass('pre-show');
						$(this).addClass('active');
						$(this).css({
							height: '',
							opacity: ''
						});
						if (wasAtBottom)
						{
							$('#timeline').slimScroll({scrollTo: $('#timeline > ul').height() + 'px'});
						}
						self.revealAnimationOn = false;
						self = null;
					});
				}
				else
				{
					self.revealAnimationOn = true;
					$comments.removeClass('additional-open');
					$comments.append($postSection);
					$arrow.addClass('down').removeClass('up');
					$additional.animate({
						height: 0,
						opacity: '0.0'
					}, hideDuration, function() {
						$(this).removeClass('active');
						$(this).css({
							height: '',
							opacity: ''
						});
						self.revealAnimationOn = false;
						self = null;
					});
				}
			}
			else
			{
				self = null;
			}
			
			$arrow = null;
			$comments = null;
			$additional = null;
			$postSection = null;
			return false;
		});
	
	$('#timeline').slimScroll().bind('scroll', $.proxy(function(evt, pos) {
		console.log('received scroll event; scrollTop = ' + $('#timeline').scrollTop());
		if ($('#timeline').scrollTop() == 0)
		{
			$('#nav-tabs-wrapper').removeClass('fixed');
		}
		else
		{
			$('#nav-tabs-wrapper').addClass('fixed');
		}
	}, self));

	$('#timeline').slimScroll().bind('slimscroll', $.proxy(function(evt, pos) {
		console.log('received slimscroll event; pos = ' + pos);
		//if (!this.scrolling)
		{
			this.scrolling = true;
			if (//$(window).scrollTop() + $(window).height() >= $('#timeline > ul').eq(0).height()
				pos == 'bottom'
				&& this.queueServerDataAvailable())
			{
				var type = $('#nav-tabs > .active').data('type');
				console.log('data(type) = ' + type);
				if (typeof type !== 'undefined')
				{
					this.addSpecificItem(type, this.addedItems);
				}
				else
				{
					this.addRandomItem(this.addedItems);
				}
				this.addedItems++;
				$('#timeline').slimScroll({scrollTo: $('#timeline > ul').height() + 'px'});
			}
			console.log(
				'pos = ' + pos
				+ ', addedItems = ' + this.addedItems
				+ ', serverAvailableItems = ' + this.serverAvailableItems
				+ ', queueServerDataAvailable = ' + this.queueServerDataAvailable()
			);
			this.scrolling = false;
		}
		/*else
		{
			console.log('scrolling == true, doing nothing');
		}*/
	}, self));
	
	$(window).on('resize', $.proxy(function() {
		this.resizeTimelineScroll();
	}, self));
	
	self = null;
}

TimelineApp.prototype.queueServerDataAvailable = function(self)
{
	var self = typeof self === 'undefined' ? this : self;
	var ret = self.addedItems < self.serverAvailableItems;
	self = null;
	return ret;
}



$(document).ready(function(){
	var timeline = new TimelineApp();
	
	timeline.init(timeline);
	timeline.initEvents(timeline);
});
