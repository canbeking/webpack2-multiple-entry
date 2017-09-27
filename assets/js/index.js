import {Slider} from "./slider.js"
var Cookies = require("js-cookie") 
$(function () {
    
    var left=parseInt($("#news").css("left"));
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

    $(document).on("mouseover", ".media-news-box .big-img, .media-news-box .img", function(){
        $(".img-text", this).stop(true).slideDown(500);
        $(".shadow", this).stop(true).slideDown(500);
    });
    $(document).on("mouseout", ".media-news-box .big-img, .media-news-box .img", function(){
        $(".img-text", this).stop(true).slideUp(500);
        $(".shadow", this).stop(true).slideUp(500);
    });

    $(".prev").click(function(){
        if(left<0){
            $("#news").animate({left:left+360},function ()
            {
                left=parseInt($("#news").css("left"));
            });
        }
    });
    $(".next").click(function(){
        if(left>-720){
            $("#news").animate({left:left-360},function () {
                left=parseInt($("#news").css("left"));
            });
        }
    });

    //查询产品分类
    $.ajax({
		url:'/categories/queryCatogeryIndex.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:'',
		success: function(msg){ //成功
			if(msg.code == "000000"){
				var html='';
				var data=msg.obj;
				for(var i=0;i<data.length;i++){
					html += '<li><h3><img src="'+data[i].icon.split('|')[2]+'">'+data[i].name+'</h3>';
					for(var j=0; j<data[i].keyValue.length;j++){
						html += '<a href="/pages/suppliers.html?cid='+data[i].keyValue[j].id+'&pcid='+data[i].id+'" title="'+data[i].keyValue[j].name+'">'+data[i].keyValue[j].name+'</a>';
					}
					html += '</li>';
				}
				$(".categorys ul.list").append(html);

				var $container = $('.categorys .list');
				$container.imagesLoaded(function() {
					$container.masonry({
						itemSelector: 'li'
					});
				});

			}else{
				//TODO:返回数据为空
			}
		},error: function(){ //失败
			//TODO:返回异常数据
		}
	});
    

    
    /*************************************************************************/
    //东方新闻
    var parm=new Object();
    parm.currentPage =0;
    $.ajax({
    	url:'/news/newsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:parm,
		success:function(data){
			if (data.code == '000000') {
				var obj = data.data;
				var html='';
				for(var i in obj){
					if(i%2 ==0){//
						html +='<div class="news-box">';
					}
		        	html += '<a href="/pages/newsDetail.html?Id='+obj[i].id+'" target="_blank" class="text-news">';
		        	var _date = obj[i].publishTime, _index = _date.indexOf(" ");
		        	if(_index > -1){
		        		_date = _date.substr(0, _index);
		        	}

		        	var time=new Date(_date);
		        	var Y = time.getFullYear(); 
		        	var D = (time.getDate() < 10 ? '0'+(time.getDate()) : time.getDate());
		        	var M = time.getMonth()+1;
		        	html += '<p class="time"><span>'+M+'.'+D+' </span><span>/</span>'+Y+'</p>';
					html += '<h3>'+obj[i].title+'</h3>';
					/*html += '<p class="news-text">'+obj[i].simpleDetail+'</p>';*/
					html += '</a>';
					if( !(i%2 ==0)){
						html +='</div>';
					}
				}
				$('#news').html(html);
			}
		},error: function(){
			//alert('error');
		}
    });
    
    //新闻图片点击列表(推荐新闻)
    var parm=new Object();
    parm.currentPage =0;
    parm.isRecommend =1;
    parm.pagesize =3;
    $.ajax({
    	url:'/news/newsList.do?t='+Math.random(),
		type:'post', //数据发送方式
		dataType:'json', //接受数据格式 (这里有很多,常用的有html,xml,js,json)
		data:parm,
		success:function(data){
			if (data.code == '000000') {
				var obj = data.data;
				var html='';
//				/pages/newsDetail.html?Id=671
				html+='<a href="/pages/newsDetail.html?Id=711"  target="_blank" class="big-img"><img src="/assets/images/index/265203.jpg" alt="CIFE-2017中国国际门窗幕墙博览会">';
				html+='<div class="shadow" style="display:none;">';
				html+='</div>';
				html+='<div class="img-text" style="display:none;">';
				html+='CIFE-2017中国国际门窗幕墙博览会';
				html+='</div>';
				html+='</a>';

				html+='<a href="/pages/newsDetail.html?Id=1160"  target="_blank" class="big-img">';
				html +='<img src="/assets/images/index/170609_1.jpg" alt="浙江工业大学工程设计集团与网盟电子商务有限公司签约圆满举行">';
				html+='<div class="shadow" style="display:none;">';
				html+='</div>';
				html+='<div class="img-text" style="display:none;">';
				html+= '浙江工业大学工程设计集团与网盟电子商务有限公司签约圆满举行';
				html+='</div>';
				html+='</a>';
					
				html+='<a href="/pages/newsDetail.html?Id=887" class="img" target="_blank"><img src="/assets/images/index/0224_2.jpg" alt="工信部:工业互联网发展路径正在制定...">';
				html+='<div class="shadow" style="display:none;">';
				html+='</div>';
				html+='<div class="img-text" style="display:none;">';
				html+= '工信部:工业互联网发展路径正在制定...';
				html+='</div>';
				html+='</a>';
				
				html+='<a href="/pages/newsDetail.html?id=1157" class="img" target="_blank">' +
					'<img src="/assets/images/index/170609_2.jpg" alt="2017“施工+互联网+建材厂商”论坛成功举办">';
				html+='<div class="shadow" style="display:none;">';
				html+='</div>';
				html+='<div class="img-text" style="display:none;">';
				html+= '2017“施工+互联网+建材厂商”论坛成功举办';
				html+='</div>';
				html+='</a>';
				
				html+='<a href="/pages/newsDetail.html?Id=1151" class="img" target="_blank"><img src="/assets/images/index/170609_3.jpg" alt="东方建材网携手联动优势 为交易安全保驾护航">';
				html+='<div class="shadow" style="display:none;">';
				html+='</div>';
				html+='<div class="img-text" style="display:none;">';
				html+= '东方建材网携手联动优势 为交易安全保驾护航';
				html+='</div>';
				html+='</a>';
				
				$('.media-news-box').html(html);
			}
		},error: function(){
			//alert('error');
		}
    });

/*判断是否入住*/
	$.ajax({
		url: "/user/currentLoginUser.do?t="+Math.random(),
		data: {},
		success : function (data) {
			if (data!=null && data!=undefined && data.code=='000000') {
				$.ajax({
					url: '/userinfo/getUserInfo.do',
					data: {Id: $.cookie('wm_user_id')},
					success: function (data) {
						console.log(data.obj.userType);
						if (data.obj.userType == 2) { //卖家
							$.ajax({
								url: '/userinfo/getEnterpriseInfo.do',  //获取当前用户信息
								data: {categery: 1}, // 1企业 0个人
								success: function (data) {
									if (data.code == '000000') {
										return;
									} else {
										if ($.cookie('hint') == 1) {
											$('#check').show(); //显示弹窗
											$('#zhe').show(); //显示遮罩层
											$('.check-center a').attr('href', '/pages/seller/index.html'); //a链接的跳转
										}

										/*影藏*/
										$('.indexNo').on('click', function () {
											$('#check').hide(); //影藏弹窗
											$('#zhe').hide(); //影藏遮罩层
										});

										$('#indexNo').on('click', function () {
											$.cookie('hint', '0', {expires: 7, path: '/'});
										});

										/*点击用户中心跳转*/
										$('#tiaozhuan').on('click', function () {
											window.location.href = '/pages/seller/index.html';
										});
									}
								}
							});
						}
						if (data.obj.userType == 3) { //第三方
							$.ajax({
								url: '/trdent/getMyDefaultTrdEnterpriseInfo.do',
								data: {},
								success: function (data) {
									console.log(1, data);
									if (data.code == '000000' && data.obj && data.obj.id > 0) {
										return;
									} else {
										if ($.cookie('hint') == 1) {
											$('#check').show(); //显示弹窗
											$('#zhe').show(); //显示遮罩层
											$('.check-center a').attr('href', '/pages/third/index.html'); //a链接的跳转
										}

										/*影藏*/
										$('.indexNo').on('click', function () {
											$('#check').hide(); //影藏弹窗
											$('#zhe').hide(); //影藏遮罩层
										});

										$('#indexNo').on('click', function () {
											$.cookie('hint', '0', {expires: 7, path: '/'});
										});

										/*点击用户中心跳转*/
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
		error: function (data) {
			console.log(2, data);
		}
	});

	/*去掉网盟天下的数据*/
	if (!!Cookies.get('jobNumber')) {
        Cookies.remove('jobNumber');
        Cookies.remove('wm_regionalManagerId');
	}

    $.dialog.errorTips("弹出窗口");
})

function autoNav(){
	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test
	(navigator.userAgent))){
		if(window.location.href.indexOf("?mobile")<0){
			try{
				if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
					window.location.href="http://m.eastjiancai.com";

				}else if(/iPad/i.test(navigator.userAgent)){
					window.location.href="http://m.eastjiancai.com";
				}
			}catch(e){

			}
		}
	}
}
