var five=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]

var cfive=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
var drawimg=document.getElementById("five");
var context=drawimg.getContext("2d");
var R=14;
var who="";
var hand="";
var onname=$(".user").attr("on")

var bark = new Image();   
bark.src = "five.jpg";   
 
bark.onload = function () {   
   context.drawImage(bark, 0, 0); 
}

function draw(con,head,x,y){
   con.beginPath();
   if(head=="frist"){
        var gradient=con.createRadialGradient(x*33.33+18,y*33.33+17.5,1, x*33.33+18,y*33.33+17.5,28);
     	gradient.addColorStop(0,"#555");    
      	gradient.addColorStop(1,"black"); 
      	context.fillStyle = gradient;    
        con.arc(x*33.33+18,y*33.33+17.5,R,0,Math.PI*2,true)
        con.fill();
   }
   if(head=="last"){
   	 	var gradient=con.createRadialGradient(x*33.33+18,y*33.33+17.5,5, x*33.33+18,y*33.33+17.5,50);
     	gradient.addColorStop(0,"#fff");    
      	gradient.addColorStop(1,"black"); 
      	context.fillStyle = gradient;    
        con.arc(x*33.33+18,y*33.33+17.5,R,0,Math.PI*2,true)
        con.fill();
   }
}

function updata(five,con){
	for(var x=0;x<15;x++){
		for(var y=0;y<15;y++){
			if(five[x][y]==1){
				draw(con,"last",x,y)
			}
			if(five[x][y]==2){
				draw(con,"frist",x,y)
			}
		}
	}
}

function come(){
  $.post("/come",
    {},function(data,status){
      if(data.frist==""){
        $(".frist").attr("on","no")
      }
      else{
        $(".frist").attr("on","yes")
      }
      if(data.last==""){
        $(".last").attr("on","no")
      }
      else{
        $(".last").attr("on","yes")
      }
    },"json"
  )  
}
$(document).ready(function(){
  $.post("/igo",{five:five},function(data,status){
  })
  come();
  var ready=setInterval("ready()",5000);
})

function ready(){
    $.post("/ready",{},function(data,status){
        var key=(data.type)%2
        if(hand=="frist"){
          if(key==0){
            $.post("/odown",
               {   
                },function(data,status){
                    for(var x=0;x<15;x++){
                    var gg="five["+x+"][]"
                    five[x]=data[gg]
                    }
                  updata(five,context)
              })
            who="me"
            $(".mes").text("该你了")
          }
        }
        if(hand=="last"){
          if(key==1){
            $.post("/odown",
               {   
                },function(data,status){
                    for(var x=0;x<15;x++){
                    var gg="five["+x+"][]"
                    five[x]=data[gg]
                    }
                  updata(five,context)
              })
            who="me";
            $(".mes").text("该你了")
          }
        }

        if(data.win=="frist"){
            $.post("/resetting",
            {hand:hand},
            function(data,status){})
            alert("黑棋获胜 刷新浏览器继续");
        }

        if(data.win=="last"){
          $.post("/resetting",
            {hand:hand},
            function(data,status){})
            alert("白棋获胜 刷新浏览器继续");
        }
    })
}

$(document).ready(function(){
    drawimg.onclick=function(ev){
    	if(who=="me"){
        $(".mes").text("该对面了");
        var oEvent=ev||event;
        var cx=oEvent.clientX;
        var cy=oEvent.clientY;
        var x=Math.round((cx-135-18)/33.33);
        var y=Math.round((cy-50-17.5)/33.33);
        if((hand=="frist")&&five[x][y]==0){
            five[x][y]=2;
            $.post("/down",
            {   
              five:five
            },function(data,status){
                for(var x=0;x<15;x++){
                  var gg="five["+x+"][]"
                  five[x]=data[gg]
              }
              updata(five,context)
        });
        who="you";

        }
        if(hand=="last"&&five[x][y]==0){
            five[x][y]=1;
            $.post("/down",
            {   
              five:five
            },function(data,status){
                for(var x=0;x<15;x++){
                  var gg="five["+x+"][]"
                  five[x]=data[gg]
              }
              updata(five,context)
        });
        who="you";
        }
        // updata(five,context);
        
        win(hand);
    }
    if(who==""){
      alert("请选择座位");
    }
}})

// 选择座位
$(document).ready(function(){
  $(".frist").click(function(){
     come();
     var $this=$(this)
     if($this.attr("on")=="no"){
       $.post("/frist",
       {
          name:onname
       },function(data,status){
        if(data.fil=="change"){
          $(".last").attr("on","no");
          $this.attr("on","yes");
          hand="frist";
          alert("换座位成功,请等待另一位玩家")
        }
        if(data.fil=="no"){
          $this.attr("on","yes");
          hand="frist";
          alert("请等待另一位玩家")
        }
        if(data.fil=="go"){
          $this.attr("on","yes");
          alert("您的对手是"+data.name);
          who="me";
          hand="frist";
          }
       },"json")
     }
     else{
      alert('有人占了')
     }
  })

  $(".last").click(function(){
    come();
  var $this=$(this); 
    if($this.attr("on")=="no"){
       $.post("/last",
       {
          name:onname
       },function(data,status){
        if(data.fil=="change"){
          $this.attr("on","yes");
          $(".frist").attr("on","no");
          hand="last";
          alert("换座位成功，请等待另一位玩家")
        }
        if(data.fil=="no"){
          $this.attr("on","yes");
           hand="last";
          alert("请等待另一位玩家")
        }
        if(data.fil=="go"){
          $this.attr("on","yes");
          alert("您的对手是"+data.name);
          who="you"
          hand="last";
        }
       },"json")
     }
     else{
      alert('有人占了')
     }
  })
  })

function windo(){
  $.post("/win",
    {
      name:onname
    },function(data,status){
    })
}

function win(hand){
  var key;
  if(hand=="frist"){
     key=2
  }
   if(hand=="last"){
     key=1
  }
	p:for(var x=0;x<15;x++){
		for(var y=0;y<15;y++){
			var z=1
			if(((x+z)<15)&&((x+z)>-1)&&((y+z)<15)&&((y+z)>-1)){
              if(key==five[x+z][y+z]){
                	z++;
                	if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                        if(key==five[x+z][y+z]){
                	        z++;
                	        if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                if(key==five[x+z][y+z]){
                	               z++;
                	               if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x+z][y+z]){
                	                        z++;
                                 if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x+z][y+z]){
                                         windo();
                                         console.log(1)
                                         break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x-z)<15&&(x-z)>=0&&(y-z)<15&&(y-z)>=0){
                if(key==five[x-z][y-z]){
                	z++;
                	if((x-z)<15&&(x-z)>=0&&(y-z)<15&&(y-z)>=0){
                        if(key==five[x-z][y-z]){
                	        z++;
                	        if((x-z)<15&&(x-z)>=0&&(y-z)<15&&(y-z)>=0){
                                if(key==five[x-z][y-z]){
                	               z++;
                	               if((x-z)<15&&(x-z)>=0&&(y-z)<15&&(y-z)>=0){
                                       if(key==five[x-z][y-z]){
                	                        z++;
                                 if((x-z)<15&&(x-z)>=0&&(y-z)<15&&(y-z)>=0){
                                       if(key==five[x-z][y-z]){
                                        console.log(2)
                                          windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x-z)<15&&(x-z)>=0&&(y+z)<15&&(y+z)>=0){
                if(key==five[x-z][y+z]){
                	z++;
                	if((x-z)<15&&(x-z)>=0&&(y+z)<15&&(y+z)>=0){
                        if(key==five[x-z][y+z]){
                	        z++;
                	        if((x-z)<15&&(x-z)>=0&&(y+z)<15&&(y+z)>=0){
                                if(key==five[x-z][y+z]){
                	               z++;
                	               if((x-z)<15&&(x-z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x-z][y+z]){
                	                                z++;
                                 if((x-z)<15&&(x-z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x-z][y+z]){
                                        console.log(3)
                                           windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
		    if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                if(key==five[x+z][y-z]){
                	z++;
                	if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                        if(key==five[x+z][y-z]){
                	        z++;
                	        if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                if(key==five[x+z][y-z]){
                	               z++;
                	               if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x+z][y-z]){
                	                             z++;
                                 if((x+z)<15&&(x+z)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x+z][y-z]){
                                        console.log(4)
                                         windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x+z)<15&&(x+z)>=0&&(y)<15&&(y)>=0){
                if(key==five[x+z][y]){
                	z++;
                	if((x+z)<15&&(x+z)>=0&&(y)<15&&(y)>=0){
                        if(key==five[x+z][y]){
                	        z++;
                	        if((x+z)<15&&(x+z)>=0&&(y)<15&&(y)>=0){
                                if(key==five[x+z][y]){
                	               z++;
                	               if((x+z)<15&&(x+z)>=0&&(y)<15&&(y)>=0){
                                       if(key==five[x+z][y]){
                	                      z++;
                                 if((x+z)<15&&(x+z)>=0&&(y)<15&&(y)>=0){
                                       if(key==five[x+z][y]){
                                        console.log(5)
                                         windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x)<15&&(x)>=0&&(y+z)<15&&(y+z)>=0){
                if(key==five[x][y+z]){
                	z++;
                	if((x)<15&&(x)>=0&&(y+z)<15&&(y+z)>=0){
                        if(key==five[x][y+z]){
                	        z++;
                	        if((x)<15&&(x)>=0&&(y+z)<15&&(y+z)>=0){
                                if(key==five[x][y+z]){
                	               z++;
                	               if((x)<15&&(x)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x][y+z]){
                	                       z++;
                                 if((x)<15&&(x)>=0&&(y+z)<15&&(y+z)>=0){
                                       if(key==five[x][y+z]){
                                        console.log(6)
                                          windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x-z)<15&&(x-z)>=0&&(y)<15&&(y)>=0){
                if(key==five[x-z][y]){
                	z++;
                	if((x-z)<15&&(x-z)>=0&&(y)<15&&(y)>=0){
                        if(key==five[x-z][y]){
                	        z++;
                	        if((x-z)<15&&(x-z)>=0&&(y)<15&&(y)>=0){
                                if(key==five[x-z][y]){
                	               z++;
                	               if((x-z)<15&&(x-z)>=0&&(y)<15&&(y)>=0){
                                       if(key==five[x-z][y]){
                	                                z++;
                                 if((x-z)<15&&(x-z)>=0&&(y)<15&&(y)>=0){
                                       if(key==five[x-z][y]){
                                         console.log(7)

                                        windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
      z=1;
			if((x)<15&&(x)>=0&&(y-z)<15&&(y-z)>=0){
                if(key==five[x][y-z]){
                	z++;
                	if((x)<15&&(x)>=0&&(y-z)<15&&(y-z)>=0){
                        if(key==five[x][y-z]){
                	        z++;
                	        if((x)<15&&(x)>=0&&(y-z)<15&&(y-z)>=0){
                                if(key==five[x][y-z]){
                	               z++;
                	               if((x)<15&&(x)>=0&&(y-z)<15&&(y-z)>=0){
                                       if(key==five[x][y-z]){
                	                                 z++;
                                 if((x)<15&&(x)>=0&&(y-z)<15&&(y-z)>=0){
                                       if(key==five[x][y-z]){
                                         console.log(8)
                                        windo();
                                          break p;
                              }
                    }
                 					    }
								    }
               				    }
						    }
              		    }
				    }
                }
			}
		}
	}
}

window.onbeforeunload = onbeforeunload_handler;  
function onbeforeunload_handler(){  
    var warning="确认退出?";  
    $.post("/end",
    {
       name:onname
    },function(data,status){},"json")      
    return warning;  
}  
  

$(document).ready(function(){
  var on=$(".user").attr("on");
  if(on!=""){
    $(".game").show()
  }
  if(!window.onbeforeunload){
       alert("请使用高版本浏览器");
       window.load('http://www.baidu.com/')
  }
})