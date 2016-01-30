$(function(){
    var box=$('.box');
    var copy=$('.copy');
    var canvas=$('canvas');
    var cobj=canvas[0].getContext('2d');
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    });
    $('.hasson').hover(function(){
        $(this).find('.son').finish()
        $(this).find('.son').slideDown(200)
    },function(){
        $(this).find('.son').finish()
        $(this).find('.son').slideUp(200)
    });

    ///功能
    var obj= new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    //var obj=new shape(copy[0],canvas[0],cobj);
    //obj.shapes='line';
    //obj.bordercolor='red';
    //obj.draw();
    //obj.shapes='five';
    ////obj.bordercolor='blue';
    ////obj.linewidth=5;
    ////obj.type='fill';
    ////obj.type='five';
    ////this.bgcolor="#000";
    ////this.bordercolor='#000';
    ////
    ////this.type='stroke';
    ////this.shapes='line';
    ////this.linewidth=1;
    //obj.draw();
  //  画图的类型
  //$('.hasson:eq(1)').find('.son li').click(function(){
  //    obj.shapes=$(this).attr('data-role');
  //    obj.draw();
  //});


    //
    $(".shapes li").click(function(){
        if($(this).attr('data-role')!='pen'){
            obj.shapes=$(this).attr('data-role');
            obj.draw();
        }else{
            obj.pen();
        }
    })
    //类型
    $(".type li").click(function(){
            obj.type=$(this).attr('data-role');
            obj.draw();

    })
        //
    //
    $(".bgcolor input").change(function(){
        obj.bgcolor=$(this).val();
        obj.draw();


    })


    $(".linecolor input").change(function(){
        obj.bordercolor=$(this).val();
        obj.draw();




    })
    //

    $(".linewidth li").click(function(){
        obj.linewidth=$(this).attr('data-role');
        obj.draw();
        //alert( obj.linewidth)//obj.draw();

    });
//    橡皮
    $(".xpsize li").click(function(){
        var w=$(this).attr('data-role');
        var h=$(this).attr('data-role');


      obj.xp($('.xp'),w,h);

    })
    ///
    $('.file li').click(function(){
        var index=$(this).index('.file li');
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm('是否要保存');
                if(yes){
                    location.href=(canvas[0].toDataURL().replace('data:image/png','data:stream/octet'));
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert('不能后退');
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        } else if(index==2){
            if(obj.history.length==0){
                console.log(canvas[0].toDataURL())
                alert('没有可以保存的');
                return;
            }
            location.href=canvas[0].toDataURL()
        }


    });

//
    $('.select').click(function(){
        //$('.selectarea').css({display:'block'});
        obj.select($('.selectarea'));
    });

});