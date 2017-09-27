$(function() {

var _queryKey = getUrlParam('queryKey');
if(_queryKey)$("#searchBox").val(_queryKey);
    var _queryType = getUrlParam('type');
    //breadcrumb
    var _breadHtml = '<li><a href="/">首页</a></li><li>搜索 “'+_queryKey+'” 商品</li>';
    if(_queryType == 3){
        $('.select-menu > li:eq(2)').click();
        _breadHtml = '<li><a href="/">首页</a></li><li>搜索 “'+_queryKey+'” 品牌</li>';
    }
    $('.breadcrumb > ul').html(_breadHtml);

//默认查询产品
queryProvince();
queryBrands();
queryProducts();

$('.option .more').click(function () {
    if ($(this).hasClass('fold')) {
        $(this).removeClass('fold').html('<b></b>更多');
        $(this).parent().siblings().addClass('unfold');
        $(this).parent().siblings().find('.list').css({'height':'78px'});
    } else {
        $(this).addClass('fold').html('<b></b>收起');
        $(this).parent().siblings().removeClass('unfold');
        $(this).parent().siblings().find('.list').css({'height':'auto'});
    }
});

//顶部上一页/下一页按钮
$(document).on('click', '.pagin .icon_lr .prev:not(.disabled)', function(){
  var _index = $('#pagination .m-pagination-page li.active').index();
  var _prve = parseInt(_index) - 1;
  $('#pagination .m-pagination-page li:eq('+_prve+') a').click();
});

$(document).on('click', '.pagin .icon_lr .next:not(.disabled)', function(){
  var _index = $('#pagination .m-pagination-page li.active').index();
  var _next = parseInt(_index) + 1;
  $('#pagination .m-pagination-page li:eq('+_next+') a').click();
});

///////////////////////////////////
});

/**
 * 查询产地
 * @param	brandids {Strings}	品牌id，多个用逗号,隔开
 * @param provinceid {Strings} 省份id
 */
function queryProvince(brandids, provinceid){
    var _queryKey = getUrlParam('queryKey');
    var _queryType = getUrlParam('type');

    // 查询产地
    var _pData = {queryKey:_queryKey, type:_queryType};
    if(brandids){
        _pData.brandIds = brandids;
    }
    $.ajax({
        url:'/product/getProvinceNameList.do?t='+Math.random(),
        type:'post', // 数据发送方式
        dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
        data:_pData,
        success: function(msg){ // 成功
            if(msg.code<20000){
                $('#prop-chandi').html('');
                var obj = msg.obj;
                var html ='<li class="all"><a data-id="" class="active">不限</a></li>';
                for(var i=0; i< obj.length; i++){
                    if(obj[i] != null){
                        html += '<li><a  data-id="'+obj[i].provinceId+'">'+obj[i].provinceName+'</a></li>';
                    }
                }
                $('#prop-chandi').html(html);

                $('.place-attr .values').each(function () {
                    var h = $(this).find('.fold').height();
                    if(h>40){
                        $(this).css({'min-height':'78px'});
                        $(this).find('ul.list').css({'height':'78px'})
                    }
                    if (h > 80) {
                        $(this).find('.option').show();
                        $(this).find('.fold').addClass('unfold');
                    } else {
                        $(this).find('.option').hide();
                    }
                });

                if(brandids){
                    $('#prop-chandi > li > a').removeClass('active');
                    $('#prop-chandi > li > a[data-id='+provinceid+']').addClass('active');
                }
            }else{
                $('#prop-chandi').html('<li class="all"><a data-id="" class="active">不限</a></li>');
//						alert(msg.value);
            }
        },error: function(){ // 失败
            // TODO:返回异常数据
        }
    });

    ////////////////////////
}


/**
 * 查询品牌
 * @param	provinceid {String}	省份id
 * @param brandids 已选中的品牌id，多个用逗号,隔开
 */
function queryBrands(provinceid, brandids){
    var _queryKey = getUrlParam('queryKey');
    var _queryType = getUrlParam('type');
    var _bData = {queryKey:_queryKey, type:_queryType, currentPage:1, pagesize:50}
    if(provinceid){
        _bData.provinceId = provinceid;
    }
	// 查询品牌
		$.ajax({
				url:'/brands/queryBrandsListNew.do?t='+Math.random(),
				type:'post', // 数据发送方式
				dataType:'json', // 接受数据格式 (这里有很多,常用的有html,xml,js,json)
				data:_bData,
				success: function(data){ // 成功
					if(data.pageCode == '000000'){
						var obj = data.data;
						var html ='';
						for(var i=0;i<obj.length;i++){
							html += '<li><a data-id="'+ obj[i].id +'">'+ obj[i].name +'</a></li>';
						}
						$('#attrs_brandlist').html(html);

                        if(provinceid != undefined){
                            var _selectedIds = brandids.split(',');
                            var _allIds = [], _ids = $('#attrs_brandlist > li > a');
                            _ids.each(function(){
                                _allIds.push($(this).attr('data-id'));
                            })
                            for(var i=0; i<_selectedIds.length; i++){
                                var flag = false;
                                for(var j=0; j<_allIds.length; j++){
                                    if(_selectedIds[i] == _allIds[j]){
                                        flag = true;
                                    }
                                }
                                if(!flag) $('#product-list .selected .values > a[data-id='+_selectedIds[i]+']').remove();
                                if(flag) $('#attrs_brandlist > li > a[data-id='+_selectedIds[i]+']').addClass('active');
                            }
                        }


                    $('.brand-attr .values').each(function () {
                        var h = $(this).find('.fold').height();
                        if(h>40){
                            $(this).css({'min-height':'78px'});
                            $(this).find('ul.list').css({'height':'78px'})
                        }
                        if (h > 80) {
                            $(this).find('.option').show();
                            $(this).find('.fold').addClass('unfold');
                        } else {
                            $(this).find('.option').hide();
                        }
                    });

					}else{
						$('#attrs_brandlist').html('');
					}
				},error: function(){ // 失败
					// TODO:返回异常数据
				}
			});

   ////////////////////////
  }

  //价格区间确定
  $('#pricerange .submit').click(function(){
      queryProducts();
  });

//切换产地
$(document).on('click', '#prop-chandi > li > a', function(){
    $(this).addClass('active').parent().siblings().find('.active').removeClass('active');
    var _id = $(this).attr('data-id');
    var _brandids = [], _selectedIds = $('#select-attr .selected .values > a');
    _selectedIds.each(function(){
        _brandids.push($(this).attr('data-id'));
    })
    queryBrands(_id, _brandids.join());
    $('#start-mass').val('');
    queryProducts();
})

//提交起批量搜索
$(document).on('click', '#mass-btn', function(){
    queryProducts();
})

//点击品牌搜索
$(document).on('click', '#attrs_brandlist > li > a', function(){
    var _this = $(this);
    if(_this.hasClass('active')) return;
    _this.addClass('active');
    var _str = '<a data-query="brandId" data-id="'+_this.attr("data-id")+'"><span>'+_this.text()+'</span><i>×</i></a>';
    $('#select-attr .selected').show().find('.values').append(_str);
    $('#start-mass').val('');
    var _brandids = [], _selectedIds = $('#select-attr .selected .values > a');
    _selectedIds.each(function(){
        _brandids.push($(this).attr('data-id'));
    })
    queryProvince(_brandids.join(), $('#prop-chandi > li > a.active').attr('data-id'));
    queryProducts();
})

//清除已选择品牌
$(document).on('click', '#select-attr .selected .values a', function(){
    var _this = $(this), _id = _this.attr('data-id');
    $('#attrs_brandlist a[data-id='+_id+']').removeClass('active');
    if(_this.siblings().length == 0) _this.parents('.selected').hide();
    _this.remove();
    var _brandids = [], _selectedIds = $('#select-attr .selected .values > a');
    _selectedIds.each(function(){
        _brandids.push($(this).attr('data-id'));
    })
    queryProvince(_brandids.join(), $('#prop-chandi > li > a.active').attr('data-id'));
    queryProducts();
});

/*
* 查询产品列表，参数delname:需要删除的查询条件，用于清除已选中的条件
*/
function queryProducts(delname){

   if($("#pagination").pagination()){
      $("#pagination").pagination('destroy');
   }

   var query={};
    query.queryKey= $("#searchBox").val();
    query.type= getUrlParam('type') ? getUrlParam('type') : $('.search span.selected').attr('data-selected');
    query.provinceId = $('#prop-chandi .active').attr('data-id');
    query.startMass = $('#start-mass').val();
    var _selectedBrand = $('#select-attr .selected .values a'), _brands = [];
    _selectedBrand.each(function(){
        _brands.push($(this).attr('data-id'));
    })
    query.brandIds = _brands.join();
    var brid = getParam("brid");
    if(null != brid && brid != ''){
      query.brandId=brid;
    }

    var addrname = getUrlParam("addrname");
    if(null != addrname){
      query.BirthArea=addrname;
    }


  if(!!delname){
    delete query[delname];
    if(delname == 'BirthArea'){
      $('#select-attr .place-attr').show();
    }
    if(delname == 'brandId'){
      $('#select-attr .brand-attr').show();
    }

    var _selected = $('#select-attr .selected .value a');
    if(_selected.length == 0){
      $('#select-attr .selected').hide();
    }
  }

  $("#pagination").pagination({
      pageSize: 20,
      showJump: true,
      async: false,
      remote: {
          url: "/product/queryProductListNew.do?t="+Math.random(),
          params: query,    //自定义请求参数
          beforeSend: function(XMLHttpRequest){
             $('.products .list').addClass('loading');
          },
          success: function (data, pageIndex) {
              var obj = data.data;
              var html='';
              if(obj){
                  for(var i=0; i<obj.length; i++){
                      var pic = '';
                      if(obj[i].picts != null){
                          if(obj[i].picts.indexOf('|') != -1){
                              pic = obj[i].picts.split('|')[0];//多张图片
                          }else{
                              pic = obj[i].picts;
                          }
                          if(pic.charAt(pic.length - 1)=="/"){
                              pic=pic+"1.png";
                          }
                      }

                      var _location = obj[i].birthArea ? obj[i].birthArea : "";
                      html += '<li>';
                      html += '<div class="list-img"><a href="'+PATH + "/productDetail.html?pid="+obj[i].productId+'"><img src="' + (null != pic ? pic: '')+'"></a>';
                      html += ' <div class="list-info">';
                      html += '<a class="name" href="'+PATH + "/productDetail.html?pid="+obj[i].productId+'" title="'+obj[i].name+'">'+obj[i].name+'</a>';
                      html += '<span class="brand">品牌：<em>'+(obj[i].brandName ? obj[i].brandName : "")+'</em></span>';
                      html += '<span class="location">'+(obj[i].birthArea ? obj[i].birthArea : "")+'</span>';
                      html += '<span class="model">型号：'+(obj[i].model ? obj[i].model : "")+'</span>';
                      html += '<span class="sku">规格：'+(obj[i].sku ? obj[i].sku : "")+'</span>';
                      html += '<span class="mass">起批量：<em>'+(obj[i].startMass ? obj[i].startMass : "")+''+(obj[i].unit ? obj[i].unit : "")+'</em></span>';
                      html += '</div>';
                      html +='</li>';
                  }
              }
              $('.products > .list').removeClass('loading');

              $('.pagin .page-number i:eq(0)').text(data.currentPage);
              $('.pagin .page-number i:eq(1)').text(data.totalPage);
              
              if(data.currentPage == 1){
                $('.pagin .icon_lr .prev').addClass('disabled');
              }else{
                $('.pagin .icon_lr .prev').removeClass('disabled');
              }

              if(data.currentPage == data.totalPage){
                 $('.pagin .icon_lr .next').addClass('disabled');
              }else{
                 $('.pagin .icon_lr .next').removeClass('disabled');
              }

              $('.products .list > ul').html(html);
              $('.options .count em').text(data.totalNum);
              $('.products .list').removeClass('loading');

              if(data.totalNum == 0){
                  $('.body .no-data').show();
                  $('.breadcrumb').hide();
                  $('#product-list').hide();
              }
          },
          complete:function(){
             $('.products .list').removeClass('loading');
          },
          pageIndexName: 'currentPage', 
          pageSizeName: 'pagesize', 
          totalName:'totalNum'
      }
  });
}