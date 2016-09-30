'use strict';

//禁止被选中
$("#cuter").on("selectstart",function(){
	   return false;
})

//鼠标按下
$("#cuter").on("mousedown",function(e){
	   e = e || window.event;
     var x = e.layerX || e.offsetX,
         y = e.layerY || e.offsetY,
         cuter = this;

     x = x-document.body.scrollLeft;
     y = y-document.body.scrollTop;
    
    //虚线框移动
     document.onmousemove = function(e){
           e = e || window.event;
           var leftx = e.clientX-x,topy = e.clientY-y;
           //限制移动范围
           if(leftx <= 450 && leftx >= 49)
              cuter.style.left = leftx+"px";
           if(topy >= 20 && topy <= 251)
              cuter.style.top = topy+"px";
                cutPhoto();
     };

     //停止移动（松开鼠标）
     document.onmouseup = function(){
      
          document.onmousemove = null;
     };
})

cutPhoto();

//图片裁剪（canavas裁剪）
function cutPhoto(){
	try{
    var canvas_cut,  
      left = $('#cuter').offset().left-$('#container').offset().left,  
      top =  $('#cuter').offset().top -$('#container').offset().top,  
      img=document.getElementById("ima");  
           
    canvas_cut = document.createElement('canvas');  
    canvas_cut.width = 100;  
    canvas_cut.height = 100;  
    var ctx = canvas_cut.getContext('2d');
    ctx.drawImage(img, left, top, 100, 100, 0, 0, 100, 100);  
    $("#viewimg").attr("src",canvas_cut.toDataURL("image/png"));
  }catch (e) {
    $("#preview").text("请在服务器环境下运行");
  }
}

$("#save_bu").click(function(){
  alert("上传成功");
  window.open($("#viewimg").attr("src"));
})