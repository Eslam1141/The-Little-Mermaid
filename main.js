var start = document.getElementById("div3");
var page10 = document.getElementById("page10");
var page20 = document.getElementById("page20");
var page30 = document.getElementById("page30");




start.addEventListener("click",button1,true);
function button1 (){
   document.body.style.backgroundImage = "url('pkh.png')";
   start.style.display="none";
   page10.style.display="inline-block";
   page20.style.display="inline-block";
   page30.style.display="inline-block";
}
