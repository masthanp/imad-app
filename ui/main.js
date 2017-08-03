/*console.log('Loaded!');
var element=document.getElementById("main-text");
element.innerHTML = "new value ";

//move the image
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft +"px";
}

img.onclick = function(){
    var interval = setInterval(moveRight,50);
};*/
var counter = 0;
var button =document.getElementById("counter");
button.onclick=function(){
  //make arequest to the end point  
  
  //capture the response and store it in a variable
  
  //render the response in the current span
  counter =counter + 1 ;
  var span = document.getElementById("count");
  span.innerHTML = counter.toString();
};