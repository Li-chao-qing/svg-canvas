//var obj=new shape();
//obj.line();
//obj.rect();
function  shape(canvas,canvas1,cobj,xpobj,selectobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.xpobj=xpobj;
    this.selectobj=selectobj;
    this.cobj=cobj;
    this.bgcolor="#000";
    this.bordercolor='#000';

    this.type='stroke';
    this.shapes='line';
    this.linewidth=1;
    this.history=[];
    this.width=canvas1.width;
    this.height=canvas1.height;
    this.flag=true;

}

shape.prototype={
    init:function(){
        this.xpobj.css('display','none');
        this.selectobj.css('display','none');
        if(this.temp){
            this.history.push(this.cobj.getImageData(0,0,this.width,this.height));
            this.temp=null;
        }
        this.cobj.fillStyle=this.bgcolor;
        this.cobj.strokeStyle=this.bordercolor;
        this.cobj.lineWidth=this.linewidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        //that.init();
        that.cobj.beginPath()
        that.cobj.moveTo(x,y)
        that.cobj.lineTo(x1,y1)
        that.cobj.stroke()
        that.cobj.closePath()

    },
    rect:function(x,y,x1,y1){
        var that=this;
        //that.init();
        that.cobj.beginPath()
        that.cobj.rect(x,y,x1-x,y1-y)

        that.cobj.closePath()
        that.cobj[that.type]();
    },
    circle:function(x,y,x1,y1){
        var that =this;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        //that.init();
        that.cobj.beginPath();
        that.cobj.arc(x,y,r,0,Math.PI*2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },

    five:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/2;
        this.cobj.beginPath();
        this.cobj.moveTo(x+r,y);
        for(var i=0;i<10;i++){
            if(i%2==0){
                this.cobj.lineTo(x+Math.cos(36*i*Math.PI/180)*r,y+Math.sin(36*i*Math.PI/180)*r)
            }else{
                this.cobj.lineTo(x+Math.cos(36*i*Math.PI/180)*r1,y+Math.sin(36*i*Math.PI/180)*r1)

            }
        }
        this.cobj.closePath();
        this.cobj[this.type]();


    },
    pen:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.init();
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.canvas.onmousemove=function(e){

                var endx= e.offsetX
                var endy= e.offsetY;
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();

            }
            that.canvas.onmouseup=function(e){
                that.cobj.closePath();
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;

            }
        }

    }
    ,
    draw:function(){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            that.init();
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.history.length>0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX
                var endy= e.offsetY;

                that[that.shapes](startx,starty,endx,endy);
            }
            that.canvas.onmouseup=function(e){
                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
              that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;

            }
        }
    },
    xp:function(xpobj,w,h) {
        var that = this;
        //that.init();
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            xpobj.css({
                //display:"block",
                width:w,
                height:h
            })
            var ox= e.offsetX;
            var oy= e.offsetY;
            var lefts=ox-w/2;
            var tops=oy-h/2;
            if(lefts<0){
                lefts=0;
            }
            if(lefts>that.width-w){
                lefts=that.width-w;
            }
            if(tops<0){
                tops=0;
            }
            if(tops>that.height-h){
                tops=that.height-h;
            }
            xpobj.css({
                left:lefts,
                top:tops
            })
        }

        that.canvas.onmousedown = function () {
            //that.init();
            that.canvas.onmousemove = function (e) {

                var ox = e.offsetX;
                var oy = e.offsetY;
                var lefts = ox - w / 2;
                var tops = oy - h / 2;
                if (lefts < 0) {
                    lefts = 0;
                }
                if (lefts > that.width - w) {
                    lefts = that.width - w;
                }
                if (tops < 0) {
                    tops = 0;
                }
                if (tops > that.height - h) {
                    tops = that.height - h;
                }
                xpobj.css({
                    left: lefts,
                    top: tops,
                   display: "block"
                })
                that.cobj.clearRect(lefts, tops, w, h);
            }
            that.canvas.onmouseup=function() {
                xpobj.css("display", "none");
                that.history.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
                that.xp(xpobj,w,h);
            }
        }
    },
    select:function(selectobj){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var w, h,minx,miny;
            that.init();
            that.canvas.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                 minx=Math.min(startx,endx);
               miny=Math.min(starty,endy);
                w=Math.abs(endx-startx);
                h=Math.abs(endy-starty);
                selectobj.css({
                    left:minx,top:miny,
                    width:w,
                    height:h,
                    display:'block'
                });

            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);

                that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
                that.cobj.putImageData(that.temp,minx,miny)
                that.drag(minx,miny,w,h,selectobj);


            }
            //document.onkeydown=function(e){
            //    if(e.keyCode==8){
            //        that.flag=false;
            //
            //        that.cobj.clearRect(minx,miny,w,h);
            //        that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            //        that.temp=that.cobj.getImageData(minx,miny,w,h);
            //        //that.history.push(that.cobj.getImageData(0,0,that.width,that.height));
            //        that.cobj.putImageData(that.temp,minx,miny)
            //    }
            //    console.log(e.keyCode);
            //}
        }
    },
    drag: function(x,y,w,h,selectobj) {
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;

            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor='move';
            }else{
                that.canvas.style.cursor='default';

            }
        }
        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor='move';
            }else{
                that.canvas.style.cursor='default';
                return;
            }
            that.canvas.onmousemove=function(e){
                //if(!that.flag){
                //    that.cobj.clearRect(x,y,w,h);
                //}else {
                    that.cobj.clearRect(0, 0, that.width, that.height);
                    //if(that.flag){
                    if (that.history.length !== 0) {
                        that.cobj.putImageData(that.history[that.history.length - 1], 0, 0);
                    }
                    //}
                //}
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                selectobj.css({
                    left:lefts,
                    top:tops
                })
                if(lefts<0){
                    lefts=0;
                }
                if(tops<0){
                    tops=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }
                if(tops>that.height-h){
                    tops=that.height-h;
                }
                selectobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops)

            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.drag(x,y,w,h,selectobj);

            }
            //document.onkeydown=function(e){
            //
            //    if(e.keyCode==8){
            //        that.flag=false;
            //        that.cobj.clearRect(x,y,w,h);
            //    }
            //    console.log(e.keyCode);
            //}
        }
    }


}