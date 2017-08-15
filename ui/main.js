//submit username and password
var submit = document.getElementById("submit_btn");
submit.onclick=function(){
  //create request object
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE)  {
          //take some action
          if(request.status === 200){
            alert("logged in successfully");
          }else if(request.status === 403){
              alert("username/password is incorrect");
          }else if(request.status === 500){
              alert("something went wrong on the server")
          }
      }
      //not done yet
    };
    
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    console.log(username);
    console.log(password);
 //make the request
 request.open('POST','http://pmahesh9491.imad.hasura-app.io/submit-name?name='+name, true);
 request.setRequestHeader('Content-Type','application/json');
 request.send(JSON.stringify({username: username, password: password}));
};
