var PATH = '/pages';
var DefaultPic = '/assets/img/defaultPic.png';
var ShowModel = 'grid'; //产品默认显示大图模式
$(function () {
     //弹出在线咨询窗口及右下角回到顶部工具条
     /*var _goTopHTML = '<div class="service-popup">\
            <ul>\
                <li class="feedback" onmouseover="NTKF.im_openInPageChat(\'kf_9368_1470123148773\')">在线咨询</li>\
                <li class="call">拨我电话\
                    <div class="pop">\
                        <span class="text">客服电话 400-006-5216</span>\
                        <span class="text">投诉电话 18167132093</span>\
                        <span class="text">投诉电话 0571-87139553</span>\
                        <span class="close"></span>\
                    </div>\
                </li>\
                <li class="wechat">加我微信\
                    <div class="pop">\
                        <img src="/assets/images/wechat-app.png" />\
                        <span class="close"></span>\
                    </div>\
                </li>\
            </ul>\
            <span class="close"></span>\
        </div>\*/
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
    if($('#side-toolbar').length == 0){
        $('body').append(_goTopHTML);//.append('<script type="text/javascript" src="https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9368" charset="utf-8"></script>');
        var script = document.createElement('script');
        script.setAttribute('src', 'http://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9368');
        document.body.appendChild(script);
    }

    //客服弹出窗口
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

    //右下角返回顶部工具条
    $(window).on('scroll', function () {
        var st = $(document).scrollTop();
        if (st > 0) {
            $('#side-toolbar .go-top').stop().css({ "visibility": "visible" }).animate({ 'opacity': 1 }, 300);
        } else {
            $('#side-toolbar .go-top').stop().animate({ 'opacity': 0 }, 300, function () {
                $(this).css({ "visibility": "hidden" })
            });
        }
    });
    $('#side-toolbar .go-top').on('click', function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500);
    });
     $('#side-toolbar .feedback, .hotspot .call').on('mouseover', function () {
        NTKF.im_openInPageChat('kf_9368_1470123148773')
    });

    //加载footer内容
  $("#footer").load("./pages/template/footer.html",function(responseText,textStatus){});

  //加载注册登录等页面header头部内容
  $("#simple-header").load("./pages/template/simple-header.html",function(responseText,textStatus){});

/////////////////////////////////////
});


//首页产品等页面header头部内容
if($("#header").length > 0){
    $.ajax({
        type: "get",
        url: "./pages/template/header.html",
        dataType: "html",
        async: false,
        success: function (data) {
            $("#header").html(data);
            getLoginUser();

            //模拟下拉选择框
            $('.select > .selected').click(function(e){
                e.stopPropagation();
                var _this = $(this);
                _this.next().addClass('up');
                _this.siblings('.select-menu').slideDown(300);
            });

            $(document).click(function(){
                $('.select > b.arrow').removeClass('up');
                $('.select-menu').slideUp(300);
            });

            $('.select > .select-menu > li').click(function(e){
                var _this = $(this);
                _this.parents('.select').find('.selected').text(_this.text()).addClass(_this.attr('class'));
            });
            //搜索下拉框
            $('.search .select > .select-menu > li').click(function(e){
                var _this = $(this);
                var _val = _this.attr('data-id');
                $('.search span.selected').attr('data-selected', _val);
            });

            //语言选择下拉框
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
                if(val==1)
                {
                    $("#searchBox").attr("placeholder", "输入商品名称");
                }
                if(val==2)
                {
                    $("#searchBox").attr("placeholder", "输入供应商名称");
                }
                if(val==3)
                {
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
                if ($.trim(keyWords) == ""){
                    $('#searchBox').focus();
                }
                return false;
            });

        }
    });
}


function getLoginUser(){
    var _cart = $(".top-nav .cart");
    var result = false;
    $.ajax({
        type:"GET",
        url:"/user/currentLoginUser.do?t="+Math.random(),
        dataType:"json",
        cache:false,
        async:false,
        contentType : "application/json; charset=utf-8",
        success: function (data) {
            if (data!=null && data!=undefined && data.code=='000000') {

                sessionStorage.setItem("uid", data.obj.id);
                sessionStorage.setItem("uname", data.obj.userName);
                sessionStorage.setItem("uphoto", data.obj.photo);
                sessionStorage.setItem("utype", data.obj.userType);

                var userNameObj = $(".top-nav .logged .user-name");
                var userNameStr='';
                if (data.obj.userName!=null && data.obj.userName!=''){
                    userNameStr = data.obj.userName;
                }else if(data.obj.realName!=null && data.obj.realName!=''){
                    userNameStr = data.obj.realName;
                }else if (data.obj.cellPhone!=null && data.obj.cellPhone!=''){
                    userNameStr = data.obj.cellPhone;
                }
                userNameObj.text(userNameStr==null?'':userNameStr);
                userNameObj.attr('data-id', data.obj.id);
                userNameObj.attr('data-type', data.obj.userType);
                _cart.hide();
                var userType = data.obj.userType, _href = "#";
                if(userType == 0){
                    _href = "/pages/selectIdentity.html";
                }else if(userType == 1){
                    _cart.show().find('b').text(data.obj.productCarCount);
                    _href = "/pages/buyer/index.html";
                }else if(userType == 2){
                    _href = "/pages/seller/index.html";
                    
                    $(document).on('click', 'a.purchase-now', function(){
                        $(this).attr('href', 'javascript:;')
                        $.dialog.alert('您是供应商，不能采购！');
                    });

                }else if(userType == 3){
                    _href = "/pages/third/index.html";

                    $(document).on('click', 'a.purchase-now', function(){
                        $(this).attr('href', 'javascript:;')
                        $.dialog.alert('您是配套服务商，不能采购！');
                    })
                }
                userNameObj.attr('href', _href);
                $('.top-nav .logged').show();
                $('.top-nav .not-logged').hide();
                result = true;
                $("#nologininquiry,#nologinpurchase").hide();
                $("#loginedinquiry,#loginedpurchase").show();
            }else {
                sessionStorage.removeItem("uid");
                sessionStorage.removeItem("uname");
                sessionStorage.removeItem("uphoto");
                sessionStorage.removeItem("utype");

                $.cookie('login_redirect', location.href, { path: "/"});//登录后跳转地址
                _cart.find('a').attr("href", "/pages/login.html?to=redirect");
                $('.top-nav .logged').hide();
                $('.top-nav .not-logged').show();
                result = false;
                $("#nologininquiry,#nologinpurchase").show();
                $("#loginedinquiry,#loginedpurchase").hide();
            }
        },
        error: function(){
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
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++  
    }  
    return paramValue == "" && (paramValue = null), paramValue  
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}


function logout() {
    $.removeCookie('wm_user_id', { path: '/' });
    $.removeCookie('EnterpriseId', { path: '/' });
    $.removeCookie('UserId', { path: '/' });
    $.removeCookie('hint', {path: '/'});
    $.removeCookie('UserName', { path: '/'});
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("uname");
    sessionStorage.removeItem("uphoto");
    sessionStorage.removeItem("utype");
    $.post("/user/logout.do", function(){
        location.reload();
    });
}

function verifyFigure2(obj){
    var val = obj.val();
    var reg = /^-?\d+\.?\d{0,2}$/;
    if(!reg.test(val)) {
        return false;
    }else {
        return true;
    }
}
function verifyMinCount(input, min, def){
    var _val = input.val();
    var _reg = /^-?\d+\.?\d{0,2}$/;
    var _bool = true;
    if(!_reg.test(_val)){
        $.dialog.alert('采购数量必须是数字');
        if(def){
            input.val(def);
        }else{
            input.val(min);
        }
        _bool = false;
    }else{
        if(parseInt(_val) < parseInt(min)){
            $.dialog.alert('采购数量必须大于起批量'+min);
            input.val(min);
            _bool = false;
        }
    }
    if(input.val() == min){
        input.siblings('.decrease').attr('disabled','disabled');
    }
    return _bool;
}

//小能
var _uId = $('a.user-name').attr('data-id');
var _uName = $('a.user-name').text();
window.NTKF_PARAM = {
    siteid: "kf_9368",                  //企业ID，为固定值，必填
    settingid: "kf_9368_1470123148773", //接待组ID，为固定值，必填
    uid: _uId ? _uId : "",                      //用户ID，未登录可以为空，但不能给null，uid赋予的值显示到小能客户端上
    uname: _uName ? _uName : "",            //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
    isvip: "0",                          //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
    userlevel: "1",                     //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
    erpparam: "abc"                      //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
}
