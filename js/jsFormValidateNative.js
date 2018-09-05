var valiCheckForm =function(eles){
	for(var i=0;i<eles.length;i++){
		listenerChange(eles[i],eles);
	}
}

var valiFormSubmit =function(eles,cb){
	var flag =true ;
	for(var i=0;i<eles.length;i++){
		vali(eles[i],eles);
	}
	var inputError = document.querySelectorAll('.input-error');
	var visInpErr = visibleEles(inputError);
	if(visInpErr.length){
		flag =false;
		visInpErr[0].focus();
	}
	if(flag&&cb&&cb()){
		cb();
	}
}

function listenerChange(ele,eles){
	ele.addEventListener('keyup',function(){
		vali(ele,eles);
	});
	ele.addEventListener('change',function(){
		vali(ele,eles);
	});
}
function vali(ele,eles){
	var flag =true;
	var defaultData = {
		"errorClass":'input-error',
		"successClass":'input-success',		
	}
	var _emptyTxt = ele.getAttribute('data-empty')||'',
		_errorTxt = ele.getAttribute('data-error')||'',
		_pattern = eval( ele.getAttribute('data-pattern')),
		_value = ele.value.trim(),
		_relaTxt = ele.getAttribute('data-relatext'),
		_relation = ele.getAttribute('data-relation')||'';

	var nextEle = ele.nextSibling,
		eleParent,
		delTipsele,
		tipsElement;
	while(nextEle){ 
        if(nextEle.nodeType===1){ 
            break;
        } 
        nextEle = nextEle.nextSibling; 
    } 

	if(nextEle&&hasClass(nextEle,'validate-message')){
		tipsElement =nextEle;
	}else{
		tipsElement = document.createElement("p");
		tipsElement.setAttribute("class","validate-message");
	}
	if(_value == '' && _emptyTxt != ''){
		tipsElement.innerHTML = _emptyTxt;
		insertAfter(tipsElement, ele);
		addClass(ele, defaultData['errorClass']);
		removeClass(ele,defaultData['successClass']);
	}
	else if(_pattern){
		if(!_pattern.test(_value)){
			tipsElement.innerHTML = _errorTxt;
			insertAfter(tipsElement, ele);
			addClass(ele, defaultData['errorClass']);
			removeClass(ele,defaultData['successClass']);
		}else{
			removeClass(ele, defaultData['errorClass']);
			addClass(ele,defaultData['successClass']);
			removeNext(ele);
		}	
	}
	else if(!_pattern && _value!=""){
		removeClass(ele, defaultData['errorClass']);
		addClass(ele,defaultData['successClass']);
		removeNext(ele);
	}
	if(_relation &&_relation == 'end'){
		for(var i =0;i<eles.length;i++){
			if(eles[i].getAttribute('data-relation') == 'start'){
				var start = eles[i];
				if(ele.value.trim() != start.value.trim() && start.value.trim()){
					tipsElement.innerHTML = _relaTxt;
					insertAfter(tipsElement, ele);
					addClass(ele, defaultData['errorClass']);
					removeClass(ele,defaultData['successClass']);
				}else{
					if(start.value.trim()){
						removeClass(start, defaultData['errorClass']);
						addClass(start,defaultData['successClass']);
						removeNext(start);
					}
				}
				break;
			}
		}
	}
	else if(_relation == 'start'){
		for(var i =0;i<eles.length;i++){
			if(eles[i].getAttribute('data-relation') == 'end'){
				var end = eles[i];
				if(ele.value.trim() != end.value.trim() && end.value.trim()){
					tipsElement.innerHTML = _relaTxt;
					insertAfter(tipsElement, ele);
					addClass(ele, defaultData['errorClass']);
					removeClass(ele,defaultData['successClass']);
				}else{
					if(end.value.trim()){
						removeClass(end, defaultData['errorClass']);
						addClass(end,defaultData['successClass']);
						removeNext(end);
					}
				}
				break;
			}
		}
	}
}

//移除validate-message
function removeNext(ele){
	var eleParent = ele.parentNode; 
	var delTipsele =ele.nextSibling;  //判断是否有相应元素
	while(delTipsele){ 
        if(delTipsele.nodeType===1){ 
            break;
        } 
        delTipsele = delTipsele.nextSibling; 
    } 
	if(delTipsele&&hasClass(delTipsele,'validate-message')){
		eleParent.removeChild(delTipsele);  
	}
}

//jquery after
function insertAfter( newElement, targetElement ){ // newElement是要追加的元素 targetElement 是指定元素的位置
	var parent = targetElement.parentNode; // 找到指定元素的父节点
	if( parent.lastChild == targetElement ){ // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
		parent.appendChild( newElement, targetElement );
	}else{
		parent.insertBefore( newElement, targetElement.nextSibling );  //insertBefor js原生是有的
	};
}; 

//选取可见元素
function visibleEles(eles){
	var myEles =[];
	for(var i=0;i<eles.length;i++){
		if(eles[i].offsetWidth <= 0 || eles[i].offsetHeight <= 0){
			continue;
		}
		myEles.push(eles[i]);
	}
	return myEles;
}

//判断是否有某个classname
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

//添加某个classname
function addClass(obj, cls) {
    if (!hasClass(obj, cls)){
    	obj.className += " " + cls;
    }    	
}

//移除某个classname
 function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
