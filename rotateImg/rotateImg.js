/**
 * 2d旋转图形
 * @param obj   旋转图形的父容器
 * @param size  旋转图形的大小
 * @param imgSrc    旋转图形的图像路径
 * @param direction 旋转图形的旋转方向，true为顺时针方向，false为逆时针方向
 */
function rotateImg2d(obj, size, imgSrc, direction = true) {
    var img = createRotateImg(obj, size, imgSrc);
    var d = 0;
    setInterval(function () {
        d=(d+1)%360;
        if(direction === true) {
            //顺时针
            setStyle(img, {"transform": "rotate(" + d + "deg)"});
        }
        else{
            //逆时针
            setStyle(img, {"transform": "rotate(" + (-d) + "deg)"});
        }
    },15);
}

/**
 * 3d旋转图形
 * @param obj   旋转图形的父容器
 * @param size  旋转图形的大小
 * @param imgSrc    旋转图形的图像路径
 * @param axis  旋转图形的旋转轴：“X”表示绕X轴旋转；“Y”表示绕Y轴旋转；“Z”表示绕Z轴旋转；
 */
function rotateImg3d(obj, size, imgSrc, axis="Y") {
    var img = createRotateImg(obj, size, imgSrc);
    var d = 0;
    setInterval(function () {
        d=(d+1)%360;
        setStyle(img, {"transform":"rotate"+axis+"("+d+"deg)"});
    },15);
}
//创建一个旋转图形
function createRotateImg(obj, size, imgSrc) {
    //样式
    var imgBoxStyle = {
        width: size+"px",
        height: size+"px",
        background: "#CCCCCC",
        border: "4px solid #CCCCCC",
        "border-radius": "50%"
    };
    var imgStyle = {
        width: size+"px",
        height: size+"px",
        display: "block",
        "border-radius": "50%",
        transform: "rotate(0deg)"
    };
    //创建新元素
    var imgBox = document.createElement("div");
    var img = document.createElement("img");
    //添加属性
    img.setAttribute("src", imgSrc);
    //添加样式
    setStyle(imgBox, imgBoxStyle);
    setStyle(img, imgStyle);
    //插入Dom节点
    obj.appendChild(imgBox);
    imgBox.appendChild(img);
    //返回用于运动的DOM节点（图形节点）
    return img;
}
//添加样式函数
function setStyle(obj, styleJson){
    for(var attr in styleJson){
        obj.style[attr] = styleJson[attr];
    }
}