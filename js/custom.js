var width = window.innerWidth,
	height = window.innerHeight;

autosize(document.querySelectorAll('textarea'));

$(function() {

	$('body').ihavecookies(optionsCookies);

	if( (device.mobile() || device.tablet()) && device.ios() ) {
		var tempCSS = $('a').css('-webkit-tap-highlight-color');
		$('main, .main-inner').css('cursor', 'pointer')
				 .css('-webkit-tap-highlight-color', 'rgba(0, 0, 0, 0)');
		$('a').css('-webkit-tap-highlight-color', tempCSS);
	}
	lazyLoading();

	$(".ripple").on("click", function(event) {
		var _this = $(this),
			offset = $(this).offset(),
			positionX = (event.pageX - offset.left),
			positionY = (event.pageY - offset.top);
		_this.append("<div class='ripple-effect'>");
		_this.find(".ripple-effect").css({
		   left: positionX,
		   top: positionY
		}).animate({
			opacity: 0,
		  }, 1500, function() {
		   $(this).remove();
		});
	});

	$('.open_popup').popup({
		transition: 'all 0.4s',
		color: '#000000',
		opacity: 0.8
	});
	

	
	formingHrefTel();
	headerFixed();
	headerSearch();
	headerLang();
	headerNav();

	carousels();
	tabsAndAccordions();

	inputChange();
	phoneMask();
	forms();

	contentTable();

	footerReveal();

	$(window).on("resize", function() {
		headerFixed();
	});

	if($("#countdown").length) {
		initializeClock("countdown", $("#countdown").attr("data-dedline"));
	}

});

if(detectIE()) {
	var body = document.querySelector("body");
	body.classList.add("overflow-hidden")
	body.innerHTML = '<div class="ie-browser"><div class="ie-browser-tr"><div class="ie-browser-td">Unfortunately, the browser Internet Explorer you use is outdated and cannot display the site normally. <br> Please open the site in another browser</div></div></div>';
}

var containerEl = document.getElementById('projects-container');
if(containerEl !== null) {
	var mixer = mixitup(containerEl, {
		selectors: {
			target: '.project-col'
		},
		animation: {
			duration: 300
		}
	});
}

var optionsCookies = {
	title: 'Cookies',
	message: 'We use cookies to understand how you use our site, to personalize content and to improve your experience. By continuing to use our site, you accept our use of cookies and revised.',
	delay: 600,
	expires: 30,
	onAccept: function () {
		var myPreferences = $.fn.ihavecookies.cookie();
	},
	moreInfoLabel: '',
	uncheckBoxes: true,
	advancedBtnLabel: '',
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function formingHrefTel() {

	var linkAll = $('.formingHrefTel'),
		joinNumbToStringTel = 'tel:';

	$.each(linkAll, function () {
		var _this = $(this),
			linkValue = _this.text(),
			arrayString = linkValue.split("");

		for (var i = 0; i < arrayString.length; i++) {
			var thisNunb = isNumber(arrayString[i]);
			if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
				joinNumbToStringTel += arrayString[i];
			}
		}

		_this.attr("href", function () {
			return joinNumbToStringTel;
		});
		joinNumbToStringTel = 'tel:'

	});

}

function headerFixed() {

	var header = $(".header"),
		headerFixed = header.find(".header-fixed"),
		headerFixedTop = headerFixed.offset().top;

	header.css("height", "auto");
	headerFixed.removeClass("fixed");

	var headerHeight = header.outerHeight();

	header.css("height", headerHeight);

	$(window).on("load scroll", function() {
		var st = $(this).scrollTop();
		if (st >= headerFixedTop) {
			headerFixed.addClass("fixed");
		} else {
			headerFixed.removeClass("fixed");
		}
	});

}

function headerSearch() {

	$(".header-search-ico-search").on("click", function () {
		$(this).closest(".header-search").addClass("open");
	});
	$(".header-search-ico-close").on("click", function () {
		$(this).closest(".header-search").removeClass("open");
	});

	$(document).mouseup(function (e) {
		var container = $(".header-search");
		if ($(e.target).closest(".header-search").length) return;
		 container.removeClass("open");
		 e.stopPropagation();
	});

}

function headerLang() {

	$(".header-lang-current").on("click", function() {
		$(this).parent().toggleClass("open");
	});

	$(".header-lang-list a").on("click", function() {

		var _this = $(this),
			lang = _this.attr("data-lang"),
			container = _this.closest(".header-lang"),
			current = container.find(".header-lang-current");

		container.removeClass("open");
		current.children().text(lang);
		current.attr("data-title", lang);

	});

	$(document).mouseup(function (e) {
		var container = $(".header-lang");
		if ($(e.target).closest(".header-lang").length) return;
		 container.removeClass("open");
		 e.stopPropagation();
	});

}

function headerNav() {

	$("body").append('<div class="mf-bg"></div>');

	$(".header-navbar-btn").on("click", function() {
		$(this).parent().toggleClass("open");
	});
	$(document).mouseup(function (e) {
		var container = $(".header-navbar");
		if ($(e.target).closest(".header-navbar").length) return;
		 container.removeClass("open");
		 e.stopPropagation();
	});


	$(".main-mnu-btn").on("click", function() {
		var _body = $("body"),
			offsetTop = $(".header-fixed").offset().top;
		
		$(this).toggleClass("active");

		_body.toggleClass("mob-main-mnu-open").scrollTop(offsetTop);
		
		if(_body.hasClass("mob-main-mnu-open")) {
			$(".mf-bg").addClass("visible");
		} else {
			$(".mf-bg").removeClass("visible");
		}
	});


	$(".mmm-btn").on("click", function() {

		var _this = $(this),
			item = _this.parent(),
			content = item.find(".mob-main-submnu");

		item.toggleClass("open");
		content.slideToggle();

	});

	$(document).mouseup(function (e) {
		if ($(e.target).closest(".mob-main-mnu, .main-mnu-btn").length) return;
		$("body").removeClass("mob-main-mnu-open");
		$(".main-mnu-btn").removeClass("active");
		$(".mf-bg").removeClass("visible");
		e.stopPropagation();
	});

}

function inputChange() {

  var input = $(".form-field-input");

  $(".form-field").each(function() {

    var _this = $(this),
    	val = _this.find(".form-field-input").val();

    if (val === "") {
      _this.removeClass("focus");
    } else {
      _this.addClass("focus");
	}
	
  });

  input
    .on("focus", function() {

      var _this = $(this),
        wrappInput = _this.parent();

	  wrappInput.addClass("focus");
	  
    })
    .on("keyup change", function() {

      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if (val === "" && !_this.is(":focus")) {
        wrappInput.removeClass("focus");
      } else {
        wrappInput.addClass("focus");
	  }
	  
    })
    .on("blur", function() {

      var _this = $(this),
        val = _this.val(),
        wrappInput = _this.parent();

      if(val === "") {
		wrappInput.removeClass("focus"); 
	  }
	});
	
}

function phoneMask() {
	
	var listCountries = $.masksSort($.masksLoad("data/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
	
	var maskOpts = {
		inputmask: {
			definitions: {
				'#': {
					validator: "[0-9]",
					cardinality: 1
				}
			},
			showMaskOnHover: false,
            autoUnmask: true,
            clearMaskOnLostFocus: true
		},
		match: /[0-9]/,
		replace: '#',
		listKey: "mask",
	};

	$('.mask-phone').inputmasks($.extend(true, {}, maskOpts, {
		list: listCountries
	}));

}

function forms() {

	var ajaxurl = "/mail.php";

	$.validator.addMethod("customemail", function (value, element) {
		return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
	},
		"The email is not a valid email."
	);
	
	$(".сallback_popup_form").validate({
      rules: {
        NameCallBack: {
		  required: true,
		  minlength: 2
        },
        PhoneCallBack: {
		  required: true
        }
      },
      messages: {
        NameCallBack: {
          required: "The name field is required.",
		},
		PhoneCallBack: {
          required: "The phone field is required.",
        }
      },
      submitHandler: function(form) {
		var th = $(form),
			popup = th.closest(".popup_style"),
			close = popup.find(".popup_close");
		close.click();

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});
	

	$(".contact-form").validate({
      rules: {
        ContactName: {
		  required: true,
		  minlength: 2
        },
        ContactPhone: {
		  required: true
		},
		ContactEmail: {
			required: true,
			email: true,
			customemail: true
		},
      },
      messages: {
        ContactName: {
          required: "The name field is required.",
		},
		ContactPhone: {
          required: "The phone field is required.",
		},
		ContactEmail: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		},
      },
      submitHandler: function(form) {
		var th = $(form);

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});
	
	$(".footer-subscribe").validate({
		rules: {
		  ContactEmail: {
			  required: true,
			  email: true,
			  customemail: true
		  },
		},
		messages: {
		  ContactEmail: {
			  required: "The email field is required.",
			  email: "The email field is required.",
			  customemail: "The email is not a valid email."
		  },
		},
		submitHandler: function(form) {
		  var th = $(form);
  
		  //customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
		  customAlert("Successfully sent!", 4000, "success");
  
		  setTimeout(function() {
			  th.trigger("reset");
			  $(".form-field").removeClass("focus");
		  }, 1000);
  
		}
	});

	$(".login-form").validate({
		rules: {
		  LoginName: {
			required: true
		  },
		  loginPassword: {
			required: true,
			minlength : 6
		  }
		},
		messages: {
		  LoginName: {
			required: "The login field is required.",
		  },
		  loginPassword: {
			required: "The password field is required.",
		  }
		},
		submitHandler: function(form) {
		  var th = $(form);
  
		  //customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
		  customAlert("Successfully sent!", 4000, "success");
  
		  setTimeout(function() {
			  th.trigger("reset");
			  $(".form-field").removeClass("focus");
		  }, 1000);
  
		}
	});

	$(".order-form").validate({
      rules: {
        orderName: {
		  required: true,
		  minlength: 2
        },
        orderPhone: {
		  required: true
		}
      },
      messages: {
        orderName: {
          required: "The name field is required.",
		},
		orderPhone: {
          required: "The phone field is required.",
		}
      },
      submitHandler: function(form) {
		var th = $(form);

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: th.serialize()
		}).done(function() {
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		});

      }
	});

	$(".subscribe-bg-form").validate({
		rules: {
		  subscribeBgEmail: {
			required: true,
			email: true,
			customemail: true
		}
		},
		messages: {
		  subscribeBgEmail: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		}
		},
		submitHandler: function(form) {
		var th = $(form);

		//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
		customAlert("Successfully sent!", 4000, "success");

		setTimeout(function() {
			th.trigger("reset");
			$(".form-field").removeClass("focus");
		}, 1000);
		}
	});

	$(".mailchimp-form").validate({
		rules: {
		  mailchimpEmail: {
			required: true,
			email: true,
			customemail: true
		}
		},
		messages: {
		  mailchimpEmail: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		}
		},
		submitHandler: function(form) {
		var th = $(form);

		//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
		customAlert("Successfully sent!", 4000, "success");

		setTimeout(function() {
			th.trigger("reset");
			$(".form-field").removeClass("focus");
		}, 1000);
		}
	});

	$(".cm-form").validate({
		rules: {
		  cmEmail: {
			required: true,
			email: true,
			customemail: true
		}
		},
		messages: {
		  cmEmail: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		}
		},
		submitHandler: function(form) {
		var th = $(form);

		//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
		customAlert("Successfully sent!", 4000, "success");

		setTimeout(function() {
			th.trigger("reset");
			$(".form-field").removeClass("focus");
		}, 1000);
		}
	});

	$(".comming-soon-form").validate({
		rules: {
		  commingSoonEmail: {
			required: true,
			email: true,
			customemail: true
		}
		},
		messages: {
		  commingSoonEmail: {
			required: "The email field is required.",
			email: "The email field is required.",
			customemail: "The email is not a valid email."
		}
		},
		submitHandler: function(form) {
			var th = $(form);

			//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		}
	});

	$(".comments-form").validate({
		rules: {
			CommentsName: {
				required: true,
				minlength: 2
			},
			CommentsEmail: {
				required: true,
				email: true,
				customemail: true
			},
			CommentsMessage: {
				required: true,
				minlength: 15
			},
		},
		messages: {
			CommentsName: {
				required: "The name field is required."
			},
			CommentsEmail: {
				required: "The email field is required.",
				email: "The email field is required.",
				customemail: "The email is not a valid email."
			},
			CommentsMessage: {
				required: "The message field is required."
			}
		},
		submitHandler: function(form) {
			var th = $(form);

			//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		}
	});

	$(".subscribe-blog-form").validate({
		rules: {
			CommentsEmail: {
				required: true,
				email: true,
				customemail: true
			}
		},
		messages: {
			CommentsEmail: {
				required: "The email field is required.",
				email: "The email field is required.",
				customemail: "The email is not a valid email."
			}
		},
		submitHandler: function(form) {
			var th = $(form);

			//customAlert(text, duration, alertInfo) info = "success" || "danger" || "warning" || "default"
			customAlert("Successfully sent!", 4000, "success");

			setTimeout(function() {
				th.trigger("reset");
				$(".form-field").removeClass("focus");
			}, 1000);
		}
	});

}

function carousels() {

	var anim;

	$(".main-sub-mnu-slider").owlCarousel({
		items: 1,
		loop: true,
		margin: 0,
		nav: true,
		navText: ['<i class="i">chevron_left</i>', '<i class="i">chevron_right</i>'],
		mouseDrag: false,
		autoplay: false,
		dots: false,
		onTranslated: function() {
			lazyLoading();
		}
	});
	
	var mainSlider = $(".main-banner-slider");
	mainSlider.owlCarousel({
		animateIn: "fadeIn",
		items: 1,
		loop: true,
		margin: 0,
		nav: false,
		navText: [],
		mouseDrag: false,
		autoplay: false,
		dots: true,
		onTranslated: function() {
			lazyLoading();
		}
	});

	$(".reviews-carusel").owlCarousel({
		items: 3,
		loop: true,
		margin: 30,
		nav: false,
		navText: [],
		dots: true,
		responsive : {
			0 : {
				items: 1
			},
			768 : {
				items: 2
			},
			992 : {
				items: 3
			}
		},
		onTranslated: function() {
			lazyLoading();
		}
	});

	$(".reviews-slider").owlCarousel({
		items: 1,
		loop: true,
		margin: 0,
		nav: false,
		navText: [],
		dots: true,
		onTranslated: function() {
			lazyLoading();
		}
	});

	var brandsCarusel = $(".brands-carusel");
	brandsCarusel.owlCarousel({
		items: 4,
		loop: true,
		margin: 30,
		nav: false,
		navText: [],
		dots: true,
		responsive : {
			0 : {
				items: 2
			},
			768 : {
				items: 3
			},
			992 : {
				items: 4
			}
		},
		onTranslated: function() {
			lazyLoading();
		}
	});

}

function footerReveal() {

	var footer = $(".footer"),
        content = $(".main-inner"),
        win = $(window);

	win.on('load resize', function() {

		if (footer.outerHeight() <= win.outerHeight() && footer.offset().top >= win.outerHeight()) {

			footer.css({
				'z-index' : -10,
				position : 'fixed',
				bottom : 0
			});
			content.css({
			'margin-bottom' : footer.outerHeight()
			});
		  
		} else {
	
			footer.css({
				'z-index' : 0,
				position : 'relative',
				bottom : 0
			});
			content.css({
			'margin-bottom' : '0'
			});
	
		}

	});
	
}

function lazyLoading() {
	$('.lazy').Lazy({
		effect: 'fadeIn'
	});
}

function customAlert(text, duration, alertInfo) {

	var alerts = $(".alerts"),
		body = $("body");
		alertClass = "",
		alertIco = "info";

	if(!alerts.length) {
		body.append('<div class="alerts"></div>');
	}
	$(".alert").remove();

	if( alertInfo === "success" ) {
		alertClass = "alert-success";
		alertIco = "check";
	} else if ( alertInfo === "danger" ) {
		alertClass = "alert-danger";
		alertIco = "error";
	} else if ( alertInfo === "warning" ) {
		alertClass = "alert-warning";
		alertIco = "warning";
	} else if (alertInfo == "default") {
		alertClass = "alert-default",
		alertIco = "info";
	}

	if ( !$("." + alertClass + "").length ) {

		$(".alerts").append('<div class="alert '+ alertClass +'" data-duration-hide="'+ duration +'"> <div class="alert-close"><i class="i">close</i></div> <div class="alert-ico"> <i class="i md-22">'+ alertIco +'</i> </div> <div class="alert-text">'+ text +'</div> </div>');

		setTimeout(function() {
		$("." + alertClass + "").remove();
		}, duration);

	}

	$(document).on("click", ".alert-close", function() {

		$(this).closest(".alert").remove();

	});

}

function contentTable() {
	var contentTable = $(".content");
	if(contentTable.length) {
		
		$.each(contentTable.find("table"), function() {
			$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
		});
		
	}
}

function tabsAndAccordions() {

	$(".tabs-nav li").on("click", function() {

		var _this = $(this),
			index = _this.index(),
			tabs = _this.closest(".tabs"),
			items = tabs.find(".tabs-item");

		if (!_this.hasClass("active")) {

			items
				.eq(index)
				.add(_this)
				.addClass("active")
				.siblings()
				.removeClass("active");

		}

	});

	$(".accordion-trigger").on("click", function(e) {
    e.preventDefault();

    var _this = $(this),
		item = _this.closest(".accordion-item"),
		container = _this.closest(".accordion"),
		list = _this.closest(".accordion-list"),
		items = container.find(".accordion-item"),
		content = item.find(".accordion-content"),
		otherContents = container.find(".accordion-content"),
		duration = 300;

    if (!item.hasClass("active")) {
		items.removeClass("active");
		item.addClass("active");
		otherContents.stop(true, true).slideUp(duration);
		content.stop(true, true).slideDown(duration);
    } else {
		content.stop(true, true).slideUp(duration);
		item.removeClass("active");
    }
  });

}

function initMap() {
    var geocoder, map,
        mapInfo = $('#map_address'),
        markerUrl = mapInfo.data("marker"),
        address = mapInfo.val();
    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            styles: [ { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#e9e9e9" }, { "lightness": 17 } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 20 } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" }, { "lightness": 17 } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 18 } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#ffffff" }, { "lightness": 16 } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" }, { "lightness": 21 } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#dedede" }, { "lightness": 21 } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 } ] }, { "elementType": "labels.text.fill", "stylers": [ { "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#f2f2f2" }, { "lightness": 19 } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#fefefe" }, { "lightness": 20 } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 } ] } ],
            navigationControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        map.setCenter(results[0].geometry.location);

                        var infowindow = new google.maps.InfoWindow({
                            content: '<b>' + address + '</b>',
                            size: new google.maps.Size(150, 50)
                        });

                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            title: address,
                            icon: {
                              url: markerUrl,
                              scaledSize: new google.maps.Size(47, 71)
                            }
                        });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker);
                        });

                    } else {
                        console.log("+++");
                    }
                } else {
                  console.log("Status: " + status);
                    
                }
            });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      document.getElementById("countdown").className = "hidden";
      document.getElementById("deadline-message").className = "visible";
      clearInterval(timeinterval);
      return true;
    }

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function detectIE() {
	var ua = window.navigator.userAgent;
  
	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
	  // IE 10 or older => return version number
	  return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}
  
	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
	  // IE 11 => return version number
	  var rv = ua.indexOf('rv:');
	  return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}
  
	// other browser
	return false;
}
