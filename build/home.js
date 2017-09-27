webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _sliderJs = __webpack_require__(10);

var Slider = _sliderJs.Slider;

var Cookies = __webpack_require__(11);
$(function () {

	var left = parseInt($("#news").css("left"));
	var bannerSlider = new Slider($('#banner_tabs'), {
		time: 5000,
		delay: 400,
		event: 'hover',
		auto: true,
		mode: 'fade',
		controller: $('#bannerCtrl'),
		activeControllerCls: 'active'
	});
	var timer;
	$('#banner_tabs .flex-prev').click(function () {
		bannerSlider.prev();
	});
	$('#banner_tabs .flex-next').click(function () {
		bannerSlider.next();
	});

	$(document).on("mouseover", ".media-news-box .big-img, .media-news-box .img", function () {
		$(".img-text", this).stop(true).slideDown(500);
		$(".shadow", this).stop(true).slideDown(500);
	});
	$(document).on("mouseout", ".media-news-box .big-img, .media-news-box .img", function () {
		$(".img-text", this).stop(true).slideUp(500);
		$(".shadow", this).stop(true).slideUp(500);
	});

	$(".prev").click(function () {
		if (left < 0) {
			$("#news").animate({ left: left + 360 }, function () {
				left = parseInt($("#news").css("left"));
			});
		}
	});
	$(".next").click(function () {
		if (left > -720) {
			$("#news").animate({ left: left - 360 }, function () {
				left = parseInt($("#news").css("left"));
			});
		}
	});

	$.ajax({
		url: '/categories/queryCatogeryIndex.do?t=' + Math.random(),
		type: 'post',
		dataType: 'json',
		data: '',
		success: function success(msg) {
			if (msg.code == "000000") {
				var html = '';
				var data = msg.obj;
				for (var i = 0; i < data.length; i++) {
					html += '<li><h3><img src="' + data[i].icon.split('|')[2] + '">' + data[i].name + '</h3>';
					for (var j = 0; j < data[i].keyValue.length; j++) {
						html += '<a href="/pages/suppliers.html?cid=' + data[i].keyValue[j].id + '&pcid=' + data[i].id + '" title="' + data[i].keyValue[j].name + '">' + data[i].keyValue[j].name + '</a>';
					}
					html += '</li>';
				}
				$(".categorys ul.list").append(html);

				var $container = $('.categorys .list');
				$container.imagesLoaded(function () {
					$container.masonry({
						itemSelector: 'li'
					});
				});
			} else {}
		}, error: function error() {}
	});

	var parm = new Object();
	parm.currentPage = 0;
	$.ajax({
		url: '/news/newsList.do?t=' + Math.random(),
		type: 'post',
		dataType: 'json',
		data: parm,
		success: function success(data) {
			if (data.code == '000000') {
				var obj = data.data;
				var html = '';
				for (var i in obj) {
					if (i % 2 == 0) {
						html += '<div class="news-box">';
					}
					html += '<a href="/pages/newsDetail.html?Id=' + obj[i].id + '" target="_blank" class="text-news">';
					var _date = obj[i].publishTime,
					    _index = _date.indexOf(" ");
					if (_index > -1) {
						_date = _date.substr(0, _index);
					}

					var time = new Date(_date);
					var Y = time.getFullYear();
					var D = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
					var M = time.getMonth() + 1;
					html += '<p class="time"><span>' + M + '.' + D + ' </span><span>/</span>' + Y + '</p>';
					html += '<h3>' + obj[i].title + '</h3>';

					html += '</a>';
					if (!(i % 2 == 0)) {
						html += '</div>';
					}
				}
				$('#news').html(html);
			}
		}, error: function error() {}
	});

	var parm = new Object();
	parm.currentPage = 0;
	parm.isRecommend = 1;
	parm.pagesize = 3;
	$.ajax({
		url: '/news/newsList.do?t=' + Math.random(),
		type: 'post',
		dataType: 'json',
		data: parm,
		success: function success(data) {
			if (data.code == '000000') {
				var obj = data.data;
				var html = '';

				html += '<a href="/pages/newsDetail.html?Id=711"  target="_blank" class="big-img"><img src="/assets/images/index/265203.jpg" alt="CIFE-2017中国国际门窗幕墙博览会">';
				html += '<div class="shadow" style="display:none;">';
				html += '</div>';
				html += '<div class="img-text" style="display:none;">';
				html += 'CIFE-2017中国国际门窗幕墙博览会';
				html += '</div>';
				html += '</a>';

				html += '<a href="/pages/newsDetail.html?Id=1160"  target="_blank" class="big-img">';
				html += '<img src="/assets/images/index/170609_1.jpg" alt="浙江工业大学工程设计集团与网盟电子商务有限公司签约圆满举行">';
				html += '<div class="shadow" style="display:none;">';
				html += '</div>';
				html += '<div class="img-text" style="display:none;">';
				html += '浙江工业大学工程设计集团与网盟电子商务有限公司签约圆满举行';
				html += '</div>';
				html += '</a>';

				html += '<a href="/pages/newsDetail.html?Id=887" class="img" target="_blank"><img src="/assets/images/index/0224_2.jpg" alt="工信部:工业互联网发展路径正在制定...">';
				html += '<div class="shadow" style="display:none;">';
				html += '</div>';
				html += '<div class="img-text" style="display:none;">';
				html += '工信部:工业互联网发展路径正在制定...';
				html += '</div>';
				html += '</a>';

				html += '<a href="/pages/newsDetail.html?id=1157" class="img" target="_blank">' + '<img src="/assets/images/index/170609_2.jpg" alt="2017“施工+互联网+建材厂商”论坛成功举办">';
				html += '<div class="shadow" style="display:none;">';
				html += '</div>';
				html += '<div class="img-text" style="display:none;">';
				html += '2017“施工+互联网+建材厂商”论坛成功举办';
				html += '</div>';
				html += '</a>';

				html += '<a href="/pages/newsDetail.html?Id=1151" class="img" target="_blank"><img src="/assets/images/index/170609_3.jpg" alt="东方建材网携手联动优势 为交易安全保驾护航">';
				html += '<div class="shadow" style="display:none;">';
				html += '</div>';
				html += '<div class="img-text" style="display:none;">';
				html += '东方建材网携手联动优势 为交易安全保驾护航';
				html += '</div>';
				html += '</a>';

				$('.media-news-box').html(html);
			}
		}, error: function error() {}
	});

	$.ajax({
		url: "/user/currentLoginUser.do?t=" + Math.random(),
		data: {},
		success: function success(data) {
			if (data != null && data != undefined && data.code == '000000') {
				$.ajax({
					url: '/userinfo/getUserInfo.do',
					data: { Id: $.cookie('wm_user_id') },
					success: function success(data) {
						console.log(data.obj.userType);
						if (data.obj.userType == 2) {
							$.ajax({
								url: '/userinfo/getEnterpriseInfo.do',
								data: { categery: 1 },
								success: function success(data) {
									if (data.code == '000000') {
										return;
									} else {
										if ($.cookie('hint') == 1) {
											$('#check').show();
											$('#zhe').show();
											$('.check-center a').attr('href', '/pages/seller/index.html');
										}

										$('.indexNo').on('click', function () {
											$('#check').hide();
											$('#zhe').hide();
										});

										$('#indexNo').on('click', function () {
											$.cookie('hint', '0', { expires: 7, path: '/' });
										});

										$('#tiaozhuan').on('click', function () {
											window.location.href = '/pages/seller/index.html';
										});
									}
								}
							});
						}
						if (data.obj.userType == 3) {
							$.ajax({
								url: '/trdent/getMyDefaultTrdEnterpriseInfo.do',
								data: {},
								success: function success(data) {
									console.log(1, data);
									if (data.code == '000000' && data.obj && data.obj.id > 0) {
										return;
									} else {
										if ($.cookie('hint') == 1) {
											$('#check').show();
											$('#zhe').show();
											$('.check-center a').attr('href', '/pages/third/index.html');
										}

										$('.indexNo').on('click', function () {
											$('#check').hide();
											$('#zhe').hide();
										});

										$('#indexNo').on('click', function () {
											$.cookie('hint', '0', { expires: 7, path: '/' });
										});

										$('#tiaozhuan').on('click', function () {
											window.location.href = '/pages/third/index.html';
										});
									}
								}
							});
						}
					}
				});
			}
		},
		error: function error(data) {
			console.log(2, data);
		}
	});

	if (!!Cookies.get('jobNumber')) {
		Cookies.remove('jobNumber');
		Cookies.remove('wm_regionalManagerId');
	}

	$.dialog.errorTips("弹出窗口");
});

function autoNav() {
	if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)) {
		if (window.location.href.indexOf("?mobile") < 0) {
			try {
				if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
					window.location.href = "http://m.eastjiancai.com";
				} else if (/iPad/i.test(navigator.userAgent)) {
					window.location.href = "http://m.eastjiancai.com";
				}
			} catch (e) {}
		}
	}
}

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(4);
__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(3);
__webpack_require__(6);

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

function Slider(container, options) {

    if (!container) return;

    var options = options || {},
        currentIndex = 0,
        cls = options.activeControllerCls,
        delay = options.delay,
        isAuto = options.auto,
        controller = options.controller,
        event = options.event,
        interval,
        slidesWrapper = container.children().first(),
        slides = slidesWrapper.children(),
        length = slides.length,
        childWidth = container.width(),
        totalWidth = childWidth * slides.length;

    function init() {
        var controlItem = controller.children();

        mode();

        event == 'hover' ? controlItem.mouseover(function () {
            stop();
            var index = $(this).index();

            play(index, options.mode);
        }).mouseout(function () {
            isAuto && autoPlay();
        }) : controlItem.click(function () {
            stop();
            var index = $(this).index();

            play(index, options.mode);
            isAuto && autoPlay();
        });

        isAuto && autoPlay();
    }

    function mode() {
        var wrapper = container.children().first();

        options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css({
            'position': 'absolute',
            'left': 0,
            'top': 0
        }).first().siblings().hide();
    }

    function autoPlay() {
        interval = setInterval(function () {
            triggerPlay(currentIndex);
        }, options.time);
    }

    function triggerPlay(cIndex) {
        var index;

        cIndex == length - 1 ? index = 0 : index = cIndex + 1;
        play(index, options.mode);
    }

    function play(index, mode) {
        slidesWrapper.stop(true, true);
        slides.stop(true, true);

        mode == 'slide' ? function () {
            if (index > currentIndex) {
                slidesWrapper.animate({
                    left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                }, delay);
            } else if (index < currentIndex) {
                slidesWrapper.animate({
                    left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                }, delay);
            } else {
                return;
            }
        }() : function () {
            if (slidesWrapper.children(':visible').index() == index) return;
            slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
        }();

        try {
            controller.children('.' + cls).removeClass(cls);
            controller.children().eq(index).addClass(cls);
        } catch (e) {}

        currentIndex = index;

        options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
    }

    function stop() {
        clearInterval(interval);
    }

    function _prev() {
        stop();

        currentIndex == 0 ? triggerPlay(length - 2) : triggerPlay(currentIndex - 2);

        isAuto && autoPlay();
    }

    function _next() {
        stop();

        currentIndex == length - 1 ? triggerPlay(-1) : triggerPlay(currentIndex);

        isAuto && autoPlay();
    }

    init();

    return {
        prev: function prev() {
            _prev();
        },
        next: function next() {
            _next();
        }
    };
}exports.Slider = Slider;
;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (( false ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			if (!key) {
				result = {};
			}

			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});

/***/ })
],[8]);