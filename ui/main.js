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

var button =document.getElementById("counter");

button.onclick=function(){
    
  //create request object
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200){
              var counter =request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
          }
      }
      
      //not done yet
    };
    
 //make the request
 request.open('GET','http://pmahesh9491.imad.hasura-app.io/counter', true);
 request.send(null);
};

//submit name

var nameInput=document.getElementById("name");
var name = nameInput.value;
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
  //make request to server and sends a name
  //capture the list of name and store it as a list
};
