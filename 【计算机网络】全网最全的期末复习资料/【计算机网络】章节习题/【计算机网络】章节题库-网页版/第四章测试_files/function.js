
//$等同于document.getElementById();
function $Doc() {
    var elements = new Array();
    for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
    }
    return elements;
}

//$T等同于document.getElementsByTagName();
function $T(tagStr){
    if(tagStr != null){
        var elements = new Array();
        elements = document.getElementsByTagName(tagStr);
        return elements;
    }
    return false;
}

//$N等同于document.getElementsByName();
function $N(nameStr){
    if(nameStr != null){
        var elements = new Array();
        elements = document.getElementsByName(nameStr);
        return elements;
    }
    return false;
}

/*字符串操作
 *1.去除字符串中的所有空格*/
String.prototype.trim = function(){
    var space = new RegExp(" ","g");
    var newStr = this.replace(space,"");
    return newStr;
}

//2.判断字符串是否为数字
String.prototype.isNum = function (){
        return (!isNaN(this));
}

//3.判断字符串是否为浮点数
String.prototype.isFloat = function (){
        if(!(isNotaNumber(this))) return false;
        return (!isNaN(parseFloat(this))) ? true : false;
}

//4.判断字符串是否为有效的Email地址
String.prototype.isEmail = function (){
        return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this));
}

String.prototype.isHttp = function (){
        return(new RegExp(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/).test(this));
}

/*--------输入框的相关操作--------------------------------------------
 *  inputObj对象，主要功能用于构造input.type=text(输入框)对象;
 *  调用方法:
 *   var obj = new inputObj('Id')
 *   参数说明:
 *    id: input输入框的id值;
 *    注意：参数要加上双引号或单引号;
 *    判断为空：obj.isNull,返回T或F;
 *
----------------------------------------------------*/
function inputObj(objId){
    this.idStr = objId;
    var obj = $Doc(this.idStr);
    this.value = function (){return $Doc(this.idStr).value;}
    this.proto = obj;
    //this.seeProto = function(){for(x in this.proto) alert( x + "-" + this.proto[x]);}
    this.isNull = function(){
        if(this.value()=="" || (this.value().trim().length < 1))
            return true;
        return false;
    }
}
/*----------------------------------------------------
 *  checkBox方法，主要功能用于全选;
 *  调用方法:
 *   <body onload=checkBox('name','Id')>
 *   参数说明:
 *    name: 要全选对象的name值;
 *    id: 点击复选框实现全选对象的功能的id值;
 *    注意：参数要加上双引号或单引号;
 *
 *    实例：
 *		<body onload="checkBox('check','box')">
 *		<INPUT TYPE="checkbox" NAME="check"><br/>
 *		<INPUT TYPE="checkbox" NAME="check"><br/>
 *		<INPUT TYPE="checkbox" NAME="check"><br/>
 *		<br />
 *		<input type="checkbox" id="box"><br />
----------------------------------------------------*/
function checkBox(name,id){
    var boxArray = $N(name);
    var checkObj = $Doc(id);
    var statu = new status();
    checkObj.onclick = function (){
      for(var i = 0; i < boxArray.length; i++)
         boxArray[i].checked = this.checked;
    }

    for(var i = 0; i < boxArray.length; i++){
        boxArray[i].onclick = function (){
         if (this.checked) {
             if(statu.state()) checkObj.checked = true;
            }else{
             checkObj.checked = false;
            }
        }
    }

    function status(){
        this.state = function (){
             for(var i = 0; i < boxArray.length; i++){
                 if (!(boxArray[i].checked)){
                    return false;
                 }
             }
             return true;
        }
    }
}

/*----------------------------------------------------
 *  isChk（）方法，主要功能用于判断是否选择了复选框;
 *  调用方法:
 *   isChk(chkName)
 *   参数说明:
 *    chkName: 复选框的name值;
 *    若选择了复选择则返回True，反之返回False;
 *    注意：参数要加上双引号或单引号;
 *
----------------------------------------------------*/
function isChk(chkName){
    var chkObj = $N(chkName);
    for(var i = 0; i < chkObj.length; i++){
        if( chkObj[i].checked ) return true;
    }
    return false;
}

/*-----检查是否选择了下拉菜单------------
 *  isSelect（）方法，主要功能用于检查是否选择了下拉菜单的选项;
 *  调用方法:
 *   isSelect(selectId)
 *   参数说明:
 *    selectId: 下拉菜单的Id值;
 *    若选择了则返回True，反之返回False;
 *    注意：参数要加上双引号或单引号;
---------------------------------------*/
function isSelect(selectId){
    var obj = $Doc(selectId);
    if(obj.options[0].selected == true) return false;
	return true;
}

/*-----返回下拉菜单中选中的值------------
 *  $SelectValue（）方法，主要功能用于返回指定下拉菜单中选中项的value;
 *  调用方法:
 *   $SelectValue(str,state)
 *   如果按下拉菜单的Name名：则方法如：$SelectValue('selectName');
 *   如果按下拉菜单的Id名：则方法如：$SelectValue('selectId',id);
 *   参数说明:
 *    str: 可以是下拉菜单的Id或name;
 *    state:用来告诉函数所传的是Id还是Name;一个标识的作用;
 *    返回下拉菜单当前选项的value;
 *    注意：参数str要加上双引号或单引号;
---------------------------------------*/
function $SelectValue(str,state){
    if (state != null)
    {
        var sObj = $Doc(str);
    }else{
        var sObj = $N(str)[0];
    }
    //alert(sObj.options[sObj.options.selectedIndex].value);
    return sObj.options[sObj.options.selectedIndex].value;
}

//关闭窗口
function winclose(){
    window.close();
}

/*打开新窗口，等同于window.open()方法
   例：windowopen(‘../***.do’)
----------------------------------*/
function windowopen( url, winName){
			width = 1024;
			height = 768;
			xposition=0; yposition=0;
            if(winName == null) winName = "";
            if ((parseInt(navigator.appVersion) >= 4 ))
			{
				xposition = (screen.width - width) / 2;
				yposition = (screen.height - height) / 2;
			}
			theproperty= "width=" + width +","
				+ "height="+height+","
				+ "location=0,"
				+ "menubar=0,"
				+ "resizable=1,"
				+ "scrollbars=1,"
				+ "status=0,"
				+ "titlebar=0,"
				+ "toolbar=0,"
				+ "hotkeys=0,"
				+ "screenx=" + xposition + ","
				+ "screeny=" + yposition + "," /
				+ "left=" + xposition + ","
		try{
				window.open( url,winName,theproperty );
			}catch(e){
				alert("打开窗口失败！");
		}
}

//
/*控制弹出窗口大小，等同于window.open()方法
   例：windowopen(‘../***.do’，width , height)
----------------------------------*/
function windowopen( url, width , height){
			if(width == null) width = 1024;
			if(height == null) height = 768;
			xposition=0; yposition=0;
            if ((parseInt(navigator.appVersion) >= 4 ))
			{
				xposition = (screen.width - width) / 2;
				yposition = (screen.height - height) / 2;
			}
			theproperty= "width=" + width +","
				+ "height="+height+","
				+ "location=0,"
				+ "menubar=0,"
				+ "resizable=1,"
				+ "scrollbars=1,"
				+ "status=0,"
				+ "titlebar=0,"
				+ "toolbar=0,"
				+ "hotkeys=0,"
				+ "screenx=" + xposition + ","
				+ "screeny=" + yposition + "," /
				+ "left=" + xposition + ","
		try{
				window.open( url,'new',theproperty );
			}catch(e){
				alert("打开窗口失败！");
		}
}

//地址转向
function gotoURL(urlStr){
    document.location.href = urlStr;
}

function viewphoto(mypic,imgfile) {
    if (imgfile.value){
        mypic.src=imgfile.value;
        mypic.style.display="";
        mypic.border=1;
    }
}
//用按钮来实现全选
function checkAll(name){
    var boxArray = $N(name);
    for(var i = 0; i < boxArray.length; i++)
         boxArray[i].checked = true;
 }
//用按钮来实现取消全选
function checkNone(name){
    var boxArray = $N(name);
    for(var i = 0; i < boxArray.length; i++)
         boxArray[i].checked = false;
 }

//
function allSelect(nameStr){
    var sObj =  $N(nameStr)[0];
    for(var i = 0;i < sObj.length;i++)
        sObj[i].selected = true;
}
//
function calSelect(nameStr){
    var sObj =  $N(nameStr)[0];
    for(var i = 0;i < sObj.length;i++)
        sObj[i].selected = false;
}

function del(promptStr){
    if(promptStr == null || promptStr == "") promptStr = "Are you delete?";
    if(confirm(promptStr)){
        return true;
    }else{
        return false;
    }
}




function isEmpty(str){
	if(str.length==0){
		return true
	}else if(jsTrim(str).length==0){
		return true;
	}
	return false;
}
//=============================================
//Trim left spaces
//=============================================
function jsLTrim(str){
	var rtnStr = "";
	for (var i=0; i<str.length; i++){
		if (str.charAt(i)!=" ")	{
			rtnStr=str.substr(i);
			break;
		}
	}
	return rtnStr;
}

//==========================================
// Trim right spaces
//==========================================
function jsRTrim(str){
	var rtnStr = "";
	for (var i=str.length-1;i>=0;i--){
		if (str.charAt(i)!=" ")	{
			rtnStr=str.substring(0,i+1);
			break;
		}
	}
	return rtnStr;
}

//==========================================
//Purpose: Trim both left and right spaces
//==========================================
function jsTrim(str){
	return(jsLTrim(jsRTrim(str)));
}

function goBack(){
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){ // IE
        if(history.length > 0){
            window.history.go( -1 );
        }else{
            window.opener=null;window.close();
        }
    }else{ //非IE浏览器
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0){

            if(window.history.length > 1){
                window.history.go( -1 );
            }else{
                window.opener=null;window.close();
            }
        }else{ //未知的浏览器
            window.history.go( -1 );
        }
    }
}