/**
 * 轮播图
 * @param {Object} obj 轮播图所在的父容器
 * @param {Number} size	轮播图的大小（轮播图为正方形）
 * @param {Array} arr 图片数组
 * @param {Number} second 自动播放间隔（秒）
 */
function play(obj,size,arr,second){
	create_Nodes(obj,size,arr);
	
	var oPlayBox = getByClass(obj, 'play_Box')[0];
	var big_img = getByClass(oPlayBox,"big_img")[0];
	var small_img = getByClass(oPlayBox, "small_img")[0];
	var bigImg = big_img.getElementsByTagName("li");
	var smallImg = small_img.getElementsByTagName("li");
	var index = 0;
	var len = bigImg.length;
	var cur = 0;
	var prev =0;
		
	ImgAct();
		
	for(var i=0;i<len;i++){
		(function(i){
			smallImg[i].onclick = function(){
				prev = cur;
				cur = i;
				ImgAct();
			}
		})(i);
	}
	
	autoPlay();
	
	function ImgAct(){
		clearInterval(obj.timer);
		getStyle(bigImg[cur], "z-index", ++index);
		if(cur===0){
			move(small_img,{"left":0});
		}
		else if(cur===len-1){
			move(small_img, {"left": Math.floor(-(cur-2)*((size-5)/3))});
		}
		else{
			move(small_img, {"left": Math.floor(-(cur-1)*((size-5)/3))});
		}
		move(smallImg[prev],{opacity:100});
		move(smallImg[cur],{opacity:60});
		move(bigImg[prev],{opacity:0});
		move(bigImg[cur],{opacity:100});
		autoPlay();
	}
	
	function autoPlay(){
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			prev = cur;
			if(++cur>=len){
				cur=0;
			}
			ImgAct();
		},1000*second);
	}
}

function getByClass(oParent, sClass){
	return oParent.getElementsByClassName(sClass);
}

function create_Nodes(obj,size,arr){
	var x = size;
	var y = x;
	
	var playBoxStyle = {
		width: x+"px", 
		height: y+"px",
		margin: "auto",
		background: "#CCCCCC"

	};
	
	var bigImgBoxStyle = {
		width: x+"px", 
		height: 3*y/4+"px",
		"list-style": "none",
		margin: 0,
		padding: 0,
		position: "relative",
		left: 0,
		top: 0
	};
	
	var bigImgStyle = {
		"list-style": "none", 
		display: "inline",
		"font-size": 0,
		position: "absolute",
		left: 0,
		top: 0,
		opacity: 0,
		filter: "alpha(opacity: 0)"
	};
	
	var bImgStyle = {
		width: x+"px",
		height: 3*y/4+"px",
		display: "block",
		"z-index": 0,
	};
	
	var smallImgBoxStyle={
		width: x-1+"px", 
		height: y/4+"px",
		overflow: "hidden"
	};
	
	var smallImgListStyle={
		width: Math.ceil(arr.length*(x-5)/3)+"px",
		height: y/4+"px",
		"list-style": "none",
		margin: 0,
		padding: "0 0 0 5px",
		position: "relative",
		left: "auto",
	};
	
	var smallImgStyle = {
		"list-style": "none",
		float: "left",
		display: "inline",
		"padding-right": "5px",
		"padding-top": "5px",
		"padding-bottom": "5px",
		"font-size": "0"
	};
	
	var sImgStyle = {
		width: Math.floor(x-4*5)/3+"px",
		height: (y/4-2*5)+"px",
		display: "block"
	};
	
	var oPlayBox = document.createElement("div");
	setStyle(oPlayBox, playBoxStyle);
	oPlayBox.setAttribute("class","play_Box");
	obj.appendChild(oPlayBox);
	
	var bigImgBox = document.createElement("ul");
	setStyle(bigImgBox, bigImgBoxStyle);
	bigImgBox.setAttribute("class","big_img");
	oPlayBox.appendChild(bigImgBox);
	
	var bigImg = null;
	var bImg = null;
	for(let i=0;i<arr.length;i++){
		bigImg = document.createElement("li");
		setStyle(bigImg, bigImgStyle);
		bigImgBox.appendChild(bigImg);
		bImg = document.createElement("img");
		setStyle(bImg, bImgStyle);
		bImg.setAttribute("src", arr[i]);
		bigImg.appendChild(bImg);
	}
	
	var smallImgBox = document.createElement("div");
	setStyle(smallImgBox, smallImgBoxStyle);
	smallImgBox.setAttribute("class", "small_box");
	oPlayBox.appendChild(smallImgBox);
	
	var smallImgList = document.createElement("ul");
	setStyle(smallImgList, smallImgListStyle);
	smallImgList.setAttribute("class", "small_img");
	smallImgBox.appendChild(smallImgList);
	
	var smallImg = null;
	var sImg = null;
	for(let i=0;i<arr.length;i++){
		smallImg = document.createElement("li");
		setStyle(smallImg, smallImgStyle);
		smallImgList.appendChild(smallImg);
		sImg = document.createElement("img");
		setStyle(sImg, sImgStyle);
		sImg.setAttribute("src", arr[i]);
		smallImg.appendChild(sImg);
	}
}

function getStyle(obj, name, value)
{
	if(arguments.length === 2){
		if(obj.currentStyle){
			//兼容IE
			return obj.currentStyle[name];
		}
		else{
			//兼容谷歌、火狐
			return getComputedStyle(obj, false)[name];
		}
	}
	if(arguments.length === 3){
		//修改样式
		obj.style[name]=value;
	}
};

function setStyle(obj, styleJson){
	for(attr in styleJson){
		obj.style[attr] = styleJson[attr];
	}
}

function move(obj, Json, fn)
{	
	clearInterval(obj.timer);	//清除定时器
	obj.timer = setInterval(function(){
		var stop = true;
		for(attr in Json){
			var cur = 0;
			if(attr == 'opacity'){	//处理透明度
				cur = Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else{	//处理非透明度
				cur = parseInt(getStyle(obj, attr));
			}
			var speed = (Json[attr]-cur)/6;	//渐变速度
			speed = speed>0?Math.ceil(speed):Math.floor(speed);//讲速度转换为整数
			if(cur != Json[attr]){	//在每一帧运动中，只要有一个样式没达到目标值，则表示运动没完成
				stop = false;		//将运动标记为没完成
			}
			if(attr == 'opacity'){
				obj.style.opacity = (cur + speed)/100;
				obj.style.filter = 'alpha(opacity:'+(cur + speed)+')';
			}
			else{
					obj.style[attr] = cur + speed + 'px';
			}
			
		}
		if(stop == true){	//运动已完成，关闭定时器
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	}, 30);
}
