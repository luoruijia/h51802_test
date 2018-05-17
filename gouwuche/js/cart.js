$(function(){
	//配置cookie
	$.cookie.json = true;
	
	var _products = $.cookie("products") || [];
	if(_products.length ===0)
	return;
	
	var html = template("cart_template",{products:_products});
	
	$(".tab_cart tbody").html(html);
	
		/*删除购物车商品：事件委派*/
	
	$(".tab_cart").on("click",".del",function(){
		var row = $(this).parents("tr");
		var _id = row.data("id");
		var index = exist(id_,_products);
		_products.splice(index,1);
		$.cookie("products",_products,{expires:7,path:"/"});
		
		row.remove();
		//计算合计
		calcTotalPrice();
	});
	
	/*修改商品数量  +-*/
	
	$(".tab_cart").on("click",".minus,.add",function(){
		var row = $(this).parents("tr");
		var _id = row.data("id");
		var index = exist(_id,_products);
		
		//使用变量暂存index索引处的商品对象
		var prod = _products[index];
		
		if($(this).is(".add"))
			prod.amount++;
		else{
			if(prod.amount <=1)
				return;
				prod.amount--;
		}
		
		//修改cookie
		$cookie("products",_products,{expires:7,path:"/"});
		
		//显示修改后的数量与小计
		row.find(".amount").val(prod.amount);
		row.find(".sub").text((prod.price*prod.amount).toFixed(2));
		
		//计算合计
		calcTotalPrice();
	});
	
	
	  /*修改商品数量     输入  */
	$(".tab_cart").on("blur",".amount",function(){
		var row = $(this).parents("tr");
		
		var _id = row.data("id");
		
		var index = exist(_id,_products);
		
		//商品
		var prod = _products[index];
		
		//获取输入值
		var inputAmount = $(this).val();
		//判断输入格式
		if(!/^[1-9]\d*$/.test(inputAmount)) {
			$(this).val(prod.amount);
			return;
		}
		
		//将商品的数量属性值修改为当前输入值
		prod.amount = inputAmount;
		
		$.cookie("products",_products,{expires:7,path:"/"});
		//保存cookie
		row.find(".sub").text((prod.price * prod.amount).toFixed(2));
		
		//计算合计
		calcTotalPrice();
		
	});
	
	/*全选，部分选中*/
	
	$(".ck_all").click(function(){
		
		//获取当前"全选"复选框选中状态
		var status = $(this).prop("checked");
		//设置商品行前复选框状态与全选状态一致
		$(".ck_prod").prop("checked",status);
		
		//计算合计
		calcTotalPrice()
	});
	$(".ck_prod").click(function(){
		//判断已经勾选的商品行前复选框个数与——products数组长度是否一致，确定是否全选
		var b = $(".ck_prod:checked").length === _products.length;
		$(".ck_all").prop("checked",b);
		//计算合计
		calcTotalPrice();
	});
	
	
	//判断指定id的商品在数组中的下标
	function exist(id,products){
		for (var i =0,len = products.length;i<len;i++){
			if(products[i].id == id){
				return i;
			}
		}
		return -1;
	}
	
	//计算总合计
	function calcTotalPrice(){
		var total = 0;
		//遍历jQuery对象中的每个DOM元素
		$(".ck_prod:checked").each(function(index,element){
			total += Number($(this).parents("tr").find(".sub").text())
		});
	
	//显示合计金额
	$(".total_pay").text(total.toFixed(2));
	}
	
});
