/*
 *
 *	Developer: Lukasz Czerwinski
 *   ===============================================================
 *   2015 Lukasz Czerwinski for Understandable.co
 *   ===============================================================
 *	Template Functions | JQUERY 1.11+ & UI
 *
 */
;
(function ($) { 




	/* MENU */
	var menu = {
		//Declare basic elements
		//Icon to open
		icon: $('.drop_menu'),
		//Ul to overflow
		ul: $('#mmenu').clone(),
		//List items
		li: '',
		//Social media
		sMedia: $('.footer').find('.ft_media').clone(),
		logo: $('.logo').clone(),
		//Create the overflow
		overflow: $('body').append('<div class="overflow"><div class="m-logo"></div><a class="close"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="icon-close-empty"><use xlink:href="images/icons.svg#icon-close-empty"></use></svg></a><div class="bg-close"></div><div class="social"></div></div>').find('.overflow'),
		//Close icon
		close: $('.overflow .close, .bg-close'),
		/* FUNCTIONS FOR THE MENU*/
		initMenu: function () {
			var click;
			//Push the UL to the overflow
			menu.ul.appendTo(menu.overflow);
			//Redefine the UL
			menu.ul = menu.overflow.find('ul:first');
			//Define the LI
			menu.li = menu.ul.find('ul').parent();
			//Add the arrows
			menu.li.find('a:first').append('<i class="fa fa-caret-down"></i>');
			//Add social buttons
			menu.overflow.find('.social').append(menu.sMedia);
			//Add logo
			menu.overflow.find('.m-logo').append(menu.logo);
			//Click the menu icon
			menu.icon.on('click', function (e) {
				e.preventDefault();
				//Hide the menu icon
				menu.icon.fadeOut(450);
				$('header .logo').fadeOut(450);
				grid.gBtn.fadeOut(450);
				//Show overflow
				menu.overflow.fadeIn(660, 'easeOutExpo');
			});
			//Slide down
			menu.li.on('click', '>a', function (e) {
				e.preventDefault();
				click = $(this).parent();
				//Close another
				menu.li.not(click).find('>ul').stop(true).slideUp(250);
				//Slide the submenu
				click.find('>ul').stop(true).slideToggle(260); 
			});
			//Close the fullscreen menu
			menu.close.on('click', function (e) {
				e.preventDefault();
				//Close submenus
				menu.li.find('>ul').stop(true).slideUp(250);
				//Close the overflow
				menu.overflow.fadeOut(150);
				//Show the menu icon
				menu.icon.fadeIn(450);
				$('header .logo').fadeIn(450);

				if (!$('.active-slide').hasClass('main-slide')) {
					grid.gBtn.fadeIn(450);
				}
			});
		}
	};
	/* SLIDER */
	var Slider = {
		//Declare basic elements
		//Image of backgrounds
		bgImg: $('.main-slide > div'),
		//Array with sizes of each images
		bgImgSize: [],
		//Pagination DIV for hide/show
		pagination: $('#fsvs-pagination'),
		/* FUNCTIONS FOR THE SLIDER */
		initSlider: function () { 
			//Run the background check
			Slider.bgCheck();
			if ($.fn.fsvs) {
				//Init the FSVS
				var sliderl = $.fn.fsvs({
					speed: 900,
					selector: '> .slide',
					scrollabelArea: 'scrollable',
					detectHash: false,    
					beforeSlide: function (index) {
						//Check last slide
						Slider.lastSlide(index);
						//Hide the filters
						if ($('.filter').is(':visible')) {
							$('.filter').fadeOut();
						} 
					},
					afterSlide: function (index) { 
							//Refresh the background check
							Slider.bgCheck();
						if (index === $('.slide').length - 1) {
							//Stop slider on last slde
							sliderl.canSlideUp = function () {
								return false;
							}
						}
					},
					mouseDragEvents: false
				});
			} 
		},
		//background checker - trick
		bgCheck: function () {
			BackgroundCheck.refresh(); 
			//Refresh colors for other elements 
			if ($('.bg-checker').hasClass('background--light')) {
				//Toggle classes for the header and pagination
				$('.header, #fsvs-pagination, .main-slide h1').toggleClass('background--light', true);
			} else {
				//Toggle classes for the header and pagination
				$('.header, #fsvs-pagination, .main-slide h1').toggleClass('background--light', false);
			}
		},
		//Events for last slide
		lastSlide: function (index) {
			//Check the last slide
			if (index == $('.slide').length - 1) {
				$('.bg-checker').hide();
				//Add white class to the header
				if (!grid.header.hasClass('white')) {
					grid.header.addClass('white');
						$('.col-xs-4.logo img').attr('src','images/cleverbirds2.png');
						$('.drop_menu').addClass('blacked');
					//Show the grid button
					grid.gBtn.fadeIn(150);
				}
				//Hide the pagination
				$('#fsvs-pagination').fadeOut(100);
				//Change header color
				if (!grid.header.hasClass('background--light')) {
					grid.header.addClass('background--light');
				}
			} else {
				$('.bg-checker').show();
				//Remove white class to the header
				if (grid.header.hasClass('white')) {
					grid.header.removeClass('white');
					//Hide the grid button
					grid.gBtn.fadeOut(150);
				}
				//Show the pagination
				$('#fsvs-pagination').fadeIn(100);
			}
		},
		//Background cover
		bgCover: function () {
			var imgSize, imgres;
			//ala-Each function
			for (var i = 0; i < Slider.bgImg.length; i++) {
				//Scale the image
				imgSize = Slider.scale(Slider.bgImgSize[i][1], Slider.bgImgSize[i][0]);
				//Set the new size
				imgres = Slider.bgImg.eq(i).css({
					backgroundSize: imgSize[1] + 'px ' + imgSize[0] + 'px'
				});
			}
		}, 
		//Browser size
		//Sometimes we need updated the sizes
		browserSize: function () {
			var arraySize = new Array();
			//Height
			arraySize[0] = document.documentElement.clientHeight;
			//width 
			arraySize[1] = document.documentElement.clientWidth;
			return arraySize;
		},
	};
	/* MASONRY GRID */
	var grid = {
		//Declare basic elements 
		//Masonry Grid
		masonry: $('.masonry'),
		//Content Grid
		masonryCnt: $('#masonry'),
		//Items of the grid
		items: $('#masonry .item'),
		//Main slide to check visibility
		mainSlide: $('top_shop_book'),
		//Header
		header: $('.header'),
		//Grid button to show the filter
		gBtn: $('.grid_menu, .grid_menu svg'),
		//Filter panel
		filterPanel: $('.filter'),
		/* FUNCTIONS FOR THE MASONRY GRID */
		init: function () {
			if (grid.masonryCnt.length > 0) {
				//Rebuild the items
				// grid.rebuildItem();
				grid.filterPanel.prependTo('body');
				//loadedImages
				grid.masonryCnt.imagesLoaded(function () {
						//Init the masonry Grid
						grid.masonryCnt = grid.masonryCnt.isotope({
							layoutMode: 'masonry',
							masonry: {
								itemSelector: '.item',
								gutter: 40
							}
						});
					})
					//Hover effect 	
					.find('.item').on('mouseenter', function () {
						$(this).find('*').not('img').stop(true).animate({
							opacity: 1.0
						}, 550, 'easeOutBack');
					}).on('mouseleave', function () {
						$(this).find('*').not('img').stop(true).animate({
							opacity: 0.0
						}, 250);
					});
				var $this, opacity, filterValue;
				//Click the grid button
				grid.gBtn.on('click', 'svg', function (e) {
					e.preventDefault();
					$(this).parent().toggleClass('active');
					grid.animatePanel(opacity);
				});
				//Leave the filter Panel
				grid.filterPanel.on('mouseleave', function () {
					if (grid.gBtn.is('.active')) {
						grid.gBtn.toggleClass('active', false);
						grid.animatePanel();
					}
				});
				grid.filterPanel.find('a:first').toggleClass('active', true);
				//Filtering
				grid.filterPanel.find('li').on('click', 'a', function (e) {
					e.preventDefault();
					$this = $(this);
					filterValue = $this.attr('data-filter');
					if (!$this.is('.active')) {
						$this.parents('ul').find('.active').toggleClass('active', false);
						$this.toggleClass('active', true);
						grid.masonryCnt.isotope({
							filter: filterValue
						});
					}
				});
			}
			grid.rwd();
		},
		//Rebuild items
		rebuildItem: function () {
			//ala-each fn
			for (var i = 0; i < grid.items.length; i++) {
				grid.items.eq(i).append('<a href="' + grid.items.eq(i).find('a:first').attr('href') + '" class="general"></a>');
			}
		},
		animatePanel: function () {
			//FadeIn or fadeOut 
			grid.filterPanel.fadeToggle(360);
		},
		//Responsive
		rwd: function () {
			grid.filterFixed();
			$(window).on('resize', function () {
				grid.filterFixed();
			});
		},
		filterFixed: function () {
			var mWidth = grid.masonryCnt.outerWidth() + 20;
			//Check browser size to change the Filter Classes
			if (Slider.browserSize()[1] < 1190) {
				grid.filterPanel.toggleClass('fixed', true);
			} else {
				grid.filterPanel.toggleClass('fixed', false);
			}
			//Update the filter sizes
			grid.filterPanel.css({
				width: mWidth,
				left: Slider.browserSize()[1] / 2 - mWidth / 2
			});
		}
	};
	var bgChecking = {
		init: function (bg) { 
		var checkers = bgChecking.checker() != '.bg-checker';
			BackgroundCheck.init({
				targets: bgChecking.checker(), 
				images: bg,
				threshold: (checkers) ? 90 : 50,
				minOverlap: (checkers) ? 20 : 40
			});
			//Scroll support
			if (checkers) {
				$(window).on('scroll', function () {
					BackgroundCheck.refresh();
				})
			}
		},
		checker: function () {
			if ($('.bg-checker').length) {
				return '.bg-checker';
			} else if ($('.bg-checker-normal').length) {
				return '.bg-checker-normal';
			}
		}
	};
	var lightbox = {
		images: $('.portfolio_main_box img'),
		venoboxInit: function() {
			//Check content
			if(lightbox.images.length) {
				//Declare basic elements
				var $thisImg;
				//Rebuild structure
				for(var i=0; i<lightbox.images.length; i++) {
					$thisImg = lightbox.images.eq(i);
					//Add link for the image
					$thisImg.wrap('<a href="'+$thisImg.attr('src')+'" class="venobox"></a>');
				}
				//Init the VENOBOX
				$('.venobox').venobox();
			}
		},
	};
	/* ACCORDION FOR MADE*/
	var madeAccordion = {
		//Main accordion
		accordion: $('.accordion').toggleClass('unactive', true),
		//Panel heading 
		heading: $('.accordion .panel-heading'),
		//Start FN
		init: function(){
			var $this, $body, $thisAccordion; 
			//Toggle  click
			madeAccordion.heading.off().on('click', function(e){
				//Stop default
				e.preventDefault();
				$this = $(this);
				$thisAccordion = $this.parents('.accordion');
				$body = $thisAccordion.find('.panel-body');
				//Toggle slide
				madeAccordion.toggleSlide($body, $thisAccordion);
			});
		},
		//Toggle slide
		toggleSlide: function(body, accordion){
			//Slide it
//			body.slideToggle(250, 'easeInOutQuint');
			//Change classes
			accordion.toggleClass('active', 'unactive');
		}
	};
	/* global BackgroundCheck:false */ 
		function convertImageToDataURI(img) {
		  var canvas = document.createElement('canvas');
		  canvas.width = img.width;
		  canvas.height = img.height;

		  var ctx = canvas.getContext('2d');
		  ctx.drawImage(img, 0, 0);

		  return canvas.toDataURL('image/png');
		} 
	document.addEventListener('DOMContentLoaded', function () {
		  var img = new Image();
		  img.setAttribute('crossorigin', '');

		  var background = document.querySelector('.bg');
		  var dataSrc = background.getAttribute('data-src');

		  img.onload = function () {
			var data = convertImageToDataURI(img);
			background.style.backgroundImage = 'url(' + data + ')';
			//Init the BACKGROUND CHECK
			bgChecking.init(background);
		  }
		  img.src = dataSrc;
		//Init the SLIDER
		Slider.initSlider();
		//Init the Full Screen MENU
		menu.initMenu();
		//Init the GRID
		grid.init();
		//Init the LightBox
		lightbox.venoboxInit();
		//Init the accordion
		madeAccordion.init();
		//Init the MAPS
		if (typeof initMap == 'function') {
			initMap();
		}
		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
		if ($.fn.parallax) {
			$('#intro').parallax("50%", 0.1);
		}		
	}); 
})(jQuery); //The end