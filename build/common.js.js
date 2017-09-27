/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js?r=" + "da7df25b1a664bcecf4c" + "";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var PATH = '/pages';
var DefaultPic = '/assets/img/defaultPic.png';
var ShowModel = 'grid';
$(function () {
    var _goTopHTML = '<div class="side-toolbar" id="side-toolbar">\
            <ul><li class="feedback"><i>客服</i></li>\
                <li class="call">\
                    <i>电话</i>\
                    <div class="pop">\
                        <span>客服电话 400-006-5216</span><span>投诉电话 18167132093</span><span>投诉电话 0571-87139553</span>\
                    </div>\
                </li>\
                <li class="wechat"><i>APP</i><div class="pop"><img src="/assets/images/wechat-app.png" /></div></li>\
                <li class="go-top"><i>顶部</i></li></ul>\
            </div>';
    if ($('#side-toolbar').length == 0) {
        $('body').append(_goTopHTML);
        var script = document.createElement('script');
        script.setAttribute('src', 'http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9368');
        document.body.appendChild(script);
    }

    var win_w = $(window).width();
    var win_h = $(window).height();
    var s_pop = $('.service-popup');
    s_pop.css({ 'left': (win_w - s_pop.outerWidth()) / 2, 'top': (win_h - s_pop.outerHeight()) / 2 });

    $('.service-popup > .close').on('click', function () {
        $(this).parent().hide();
    });
    $('.service-popup .pop > .close').on('click', function () {
        $(this).parent().parent().removeClass('active');
    });
    $('.service-popup > ul > li').on('mouseover', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $(window).on('scroll', function () {
        var st = $(document).scrollTop();
        if (st > 0) {
            $('#side-toolbar .go-top').stop().css({ "visibility": "visible" }).animate({ 'opacity': 1 }, 300);
        } else {
            $('#side-toolbar .go-top').stop().animate({ 'opacity': 0 }, 300, function () {
                $(this).css({ "visibility": "hidden" });
            });
        }
    });
    $('#side-toolbar .go-top').on('click', function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500);
    });
    $('#side-toolbar .feedback, .hotspot .call').on('mouseover', function () {
        NTKF.im_openInPageChat('kf_9368_1470123148773');
    });

    $("#footer").load("./pages/template/footer.html", function (responseText, textStatus) {});

    $("#simple-header").load("./pages/template/simple-header.html", function (responseText, textStatus) {});
});

if ($("#header").length > 0) {
    $.ajax({
        type: "get",
        url: "./pages/template/header.html",
        dataType: "html",
        async: false,
        success: function success(data) {
            $("#header").html(data);
            getLoginUser();

            $('.select > .selected').click(function (e) {
                e.stopPropagation();
                var _this = $(this);
                _this.next().addClass('up');
                _this.siblings('.select-menu').slideDown(300);
            });

            $(document).click(function () {
                $('.select > b.arrow').removeClass('up');
                $('.select-menu').slideUp(300);
            });

            $('.select > .select-menu > li').click(function (e) {
                var _this = $(this);
                _this.parents('.select').find('.selected').text(_this.text()).addClass(_this.attr('class'));
            });

            $('.search .select > .select-menu > li').click(function (e) {
                var _this = $(this);
                var _val = _this.attr('data-id');
                $('.search span.selected').attr('data-selected', _val);
            });

            $('.select.language > .select-menu > li').click(function (e) {
                var _this = $(this);
                if (_this.hasClass('en')) {
                    location.href = '/pages/en/index.html';
                } else if (_this.hasClass('cn')) {
                    location.href = '/index.html';
                }
            });

            $(document).on('click', '.select-menu > li', function () {
                var val = $(this).attr("data-id");
                if (val == 1) {
                    $("#searchBox").attr("placeholder", "输入商品名称");
                }
                if (val == 2) {
                    $("#searchBox").attr("placeholder", "输入供应商名称");
                }
                if (val == 3) {
                    $("#searchBox").attr("placeholder", "输入品牌名称");
                }
            });

            $('#searchBtn').click(function () {
                var keyWords = $('#searchBox').val();
                var fileType = $('.search span.selected').attr('data-selected');
                if (fileType == 1) {
                    if ($.trim(keyWords) != "") {
                        location.href = "/pages/products.html?type=1&queryKey=" + encodeURI(keyWords);
                    }
                }
                if (fileType == 2) {
                    if ($.trim(keyWords) != "") {
                        location.href = "/pages/suppliers.html?queryKey=" + encodeURI(keyWords);
                    }
                }
                if (fileType == 3) {
                    if ($.trim(keyWords) != "") {
                        location.href = "/pages/products.html?type=3&queryKey=" + encodeURI(keyWords);
                    }
                }
                if ($.trim(keyWords) == "") {
                    $('#searchBox').focus();
                }
                return false;
            });
        }
    });
}

function getLoginUser() {
    var _cart = $(".top-nav .cart");
    var result = false;
    $.ajax({
        type: "GET",
        url: "/user/currentLoginUser.do?t=" + Math.random(),
        dataType: "json",
        cache: false,
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function success(data) {
            if (data != null && data != undefined && data.code == '000000') {

                sessionStorage.setItem("uid", data.obj.id);
                sessionStorage.setItem("uname", data.obj.userName);
                sessionStorage.setItem("uphoto", data.obj.photo);
                sessionStorage.setItem("utype", data.obj.userType);

                var userNameObj = $(".top-nav .logged .user-name");
                var userNameStr = '';
                if (data.obj.userName != null && data.obj.userName != '') {
                    userNameStr = data.obj.userName;
                } else if (data.obj.realName != null && data.obj.realName != '') {
                    userNameStr = data.obj.realName;
                } else if (data.obj.cellPhone != null && data.obj.cellPhone != '') {
                    userNameStr = data.obj.cellPhone;
                }
                userNameObj.text(userNameStr == null ? '' : userNameStr);
                userNameObj.attr('data-id', data.obj.id);
                userNameObj.attr('data-type', data.obj.userType);
                _cart.hide();
                var userType = data.obj.userType,
                    _href = "#";
                if (userType == 0) {
                    _href = "/pages/selectIdentity.html";
                } else if (userType == 1) {
                    _cart.show().find('b').text(data.obj.productCarCount);
                    _href = "/pages/buyer/index.html";
                } else if (userType == 2) {
                    _href = "/pages/seller/index.html";

                    $(document).on('click', 'a.purchase-now', function () {
                        $(this).attr('href', 'javascript:;');
                        $.dialog.alert('您是供应商，不能采购！');
                    });
                } else if (userType == 3) {
                    _href = "/pages/third/index.html";

                    $(document).on('click', 'a.purchase-now', function () {
                        $(this).attr('href', 'javascript:;');
                        $.dialog.alert('您是配套服务商，不能采购！');
                    });
                }
                userNameObj.attr('href', _href);
                $('.top-nav .logged').show();
                $('.top-nav .not-logged').hide();
                result = true;
                $("#nologininquiry,#nologinpurchase").hide();
                $("#loginedinquiry,#loginedpurchase").show();
            } else {
                sessionStorage.removeItem("uid");
                sessionStorage.removeItem("uname");
                sessionStorage.removeItem("uphoto");
                sessionStorage.removeItem("utype");

                $.cookie('login_redirect', location.href, { path: "/" });
                _cart.find('a').attr("href", "/pages/login.html?to=redirect");
                $('.top-nav .logged').hide();
                $('.top-nav .not-logged').show();
                result = false;
                $("#nologininquiry,#nologinpurchase").show();
                $("#loginedinquiry,#loginedpurchase").hide();
            }
        },
        error: function error() {
            $('.top-nav .logged').hide();
            $('.top-nav .not-logged').show();
            result = false;
        }
    });
    return result;
}

function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) {
            arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++;
        }
    }
    return paramValue == "" && (paramValue = null), paramValue;
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);return null;
}

function logout() {
    $.removeCookie('wm_user_id', { path: '/' });
    $.removeCookie('EnterpriseId', { path: '/' });
    $.removeCookie('UserId', { path: '/' });
    $.removeCookie('hint', { path: '/' });
    $.removeCookie('UserName', { path: '/' });
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("uname");
    sessionStorage.removeItem("uphoto");
    sessionStorage.removeItem("utype");
    $.post("/user/logout.do", function () {
        location.reload();
    });
}

function verifyFigure2(obj) {
    var val = obj.val();
    var reg = /^-?\d+\.?\d{0,2}$/;
    if (!reg.test(val)) {
        return false;
    } else {
        return true;
    }
}
function verifyMinCount(input, min, def) {
    var _val = input.val();
    var _reg = /^-?\d+\.?\d{0,2}$/;
    var _bool = true;
    if (!_reg.test(_val)) {
        $.dialog.alert('采购数量必须是数字');
        if (def) {
            input.val(def);
        } else {
            input.val(min);
        }
        _bool = false;
    } else {
        if (parseInt(_val) < parseInt(min)) {
            $.dialog.alert('采购数量必须大于起批量' + min);
            input.val(min);
            _bool = false;
        }
    }
    if (input.val() == min) {
        input.siblings('.decrease').attr('disabled', 'disabled');
    }
    return _bool;
}

var _uId = $('a.user-name').attr('data-id');
var _uName = $('a.user-name').text();
window.NTKF_PARAM = {
    siteid: "kf_9368",
    settingid: "kf_9368_1470123148773",
    uid: _uId ? _uId : "",
    uname: _uName ? _uName : "",
    isvip: "0",
    userlevel: "1",
    erpparam: "abc" };

/***/ })
/******/ ]);