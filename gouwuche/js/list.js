$(function(){
	$.ajax({
		type : "get",
		url : "../mock/list.json",
		dataType : "json",
		success : function(responseData){
			responseData.res_body.list.forEach(function(product){
				$(".template").clone()
				              .removeClass("template").addClass("buy")
				              .css({display:"inline-block"})
				              .appendTo(".box")
				              .children(".img").attr("src",product.img)
				              .next(".desc").text(product.desc)
				              .next().text(product.price)
				              .next().text(product.id);
				              
			});
		}
	});
});

$(function(){
	$(".box").on("click",".add",function(e){
		var box = $(this).parent();
		
		var currentProduct = {
			id : box.children(".id").text(),
			price : box.children(".price").text(),
			desc : box.children(".desc").text(),
			img : box.children(".img").attr("src"),
			amount : 1
		};
		$.cookie.json = true;
		
		var products = $.cookie("products") || [];
		var index = exist(currentProduct.id, products);
		if(index !== -1){
			products[index].amount++;
		}else{
			products.push(currentProduct);
		}
		$.cookie("products",products,{expires:7,path:"/"});
		
		var flyer = $(`<img src="${currentProduct.img}">`),
		
			offset = $(".cart").offset();
			flyer.fly({
				start : {
					left : e.pageX,
					top : e.pageY
				},
				end : {
					left : offset.left,
					top: offset.top,
					width:0,
					height:0
				}
			});
		});
		function exist(id,products){
			for(var i = 0, len = products.length; i < len; i++){
				if(products[i].id == id){
					return i;
				}
			}
		return -1;	
	}
});
