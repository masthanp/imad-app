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

//submit name


var submit = document.getElementById("submit_btn");

submit.onclick=function(){
    
  //create request object
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200){
              /*var counter =request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
              */
              //capture the list of name and store it as a list
              var names = request.responseText;
              names = JSON.parse(names);
              var list = "";
              for(var i=0 ; i<names.length;i++){
                  list += "<li>"+names[i] +"</li>";
              }
              var ul = document.getElementById("nameList");
              ul.innerHTML =list;
          }
      }
      
      //not done yet
    };
    
    var nameInput=document.getElementById("name");
    var name = nameInput.value;
 //make the request
 request.open('GET','http://pmahesh9491.imad.hasura-app.io/submit-name?name='+name, true);
 request.send(null);
};

var counter = document.getElementById("counter");

counter.onclick=function(){
    
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


var comment = document.getElementById("commentr");

comment.onclick=function(){
    
  //create request object
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200){
              var comment =request.responseText;
              var para = document.getElementById("comments");
             para.innerHTML = counter.toString();
          }
      }
      
      //not done yet
    };
    
 //make the request
 request.open('GET','http://pmahesh9491.imad.hasura-app.io/comments', true);
 request.send(null);
};
