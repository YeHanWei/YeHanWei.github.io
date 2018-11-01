/**
 * @author 叶汉伟
 * 2018-11-01
 * @description 生成一个消息提示框
 * @param messageType 消息的类型，包括error、warning、success
 * @param messageText 消息内容（字符串），不宜过长
 */
function messageBox(messageType, messageText){
    var body = document.getElementsByTagName("body")[0];
    //样式
    var bgroundStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        background: "#CCCCCC",
        opacity: "0.3",
        filter: "alpha(opacity: 30)"
    };
    var boxStyle = {
        width: "300px",
        height: "100px",
        background: "#ABEDCC",
        margin: "-50px 0 0 -150px",
        border: "2px solid #ACBDAE",
        position: "absolute",
        left: "50%",
        top: "50%",
        opacity: "1",
        filter: "alpha(opacity: 100)"
    };
    var imgStyle = {
        width: "60px",
        height: "60px",
        display: "bloke",
        margin: "10px",
        position: "absolute"
    };
    var textBoxStyle = {
        height: "80%",
        width:"220px",
        margin: "0",
        padding:"auto",
        position: "absolute",
        left: "80px",
        display: "table"
    };
    var textStyle = {
        display: "table-cell",
        "vertical-align": "middle",
        "word-break": "break-all"
    };
    var buttonStyle = {
        clear: "both",
        width: "100%",
        height: "20%",
        background: "#987aec",
        position: "absolute",
        top: "80%"
    };

    //创建Dom节点
    var bground = document.createElement("div");
    var box = document.createElement("div");
    var img = document.createElement("img");
    var textBox = document.createElement("div");
    var text = document.createElement("p");
    var button = document.createElement("button");
    //添加样式
    setStyle(bground, bgroundStyle);
    setStyle(box, boxStyle);
    setStyle(img, imgStyle);
    setStyle(textBox, textBoxStyle);
    setStyle(text, textStyle);
    setStyle(button, buttonStyle);
    //设置属性
    switch (messageType) {
        case "error":
            img.setAttribute("src","./img/error.png");
            text.innerText = messageText;
            break;
        case "warning":
            img.setAttribute("src","./img/warning.png");
            text.innerText = messageText;
            break;
        default:
            img.setAttribute("src","./img/success.png");
            text.innerText = messageText;
            break;
    }
    button.innerText = "enter";
    //添加Dom节点到dom树中
    body.appendChild(bground);
    body.appendChild(box);
    box.appendChild(img);
    box.appendChild(textBox);
    textBox.appendChild(text);
    box.appendChild(button);
    //确认按钮事件，关闭消息提示框
    button.onclick = function(){
        body.removeChild(box);
        body.removeChild(bground);
    }
}
//样式设置函数
function setStyle(obj, styleJson){
    for(attr in styleJson){
            obj.style[attr] = styleJson[attr];
    }
}