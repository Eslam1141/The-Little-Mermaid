var levelflag=document.body.getAttribute("level"); //the flag represent the level
var moving=false; // flag using in moving in mouse event
var score; // my score when reach 100 the level is done
 // check the level 1 is done
var objImage= null; // the object of my (main fish)
var smallFishs=null; //the array of smallFishes
var bigFish=null; //the shark element
 var lives =3 ;
 var scoreDiv = document.getElementById("score");
var getLives = document.getElementById("lives");

//////////////////////////timers//////////////////////////////////////////////////////////////
var countdown;
var countdownNumber;

function countdownInit() {
    countdownNumber = 60;
    countdownTrigger();
}

function countdownTrigger() {
    if(countdownNumber > 0) {
        countdownNumber--;
        document.getElementById('countdownText').innerHTML = "Time " + countdownNumber;
        if(countdownNumber > 0) {
            countdown = setTimeout('countdownTrigger()', 1000);
        }
    }
}

function countdownClear() {
    clearTimeout(countdown);
}

/////////////////////////Them Song////////////////////////////////////////////////////////

var finalLevelSong = document.getElementById("finalLevel");
var secLevelSong = document.getElementById("secLevel");
var LevelOneSong = document.getElementById("LevelOne");
var deadSound = document.getElementById("youDead");


var fishPool=document.getElementById("fish_Pool"); //div act as a pool
document.addEventListener("mousedown", initialClick, false);//listener to detect the moving of mouse (move of me)






function createSmallFish(posx , posy , id , s )
 {
    f=document.createElement("img");
    f.src=s;
    f.width=80;
    f.height=80;
    f.setAttribute("class","eatingFish")
    f.id=id;
    f.style.position = 'absolute';
    f.style.left=posy+'px';
    f.style.top= posx+'px';



}
var creatInerval=function () {
    createSmallFish(Math.floor(Math.random() * 500), 500,0,"move.gif" );
    fishPool.appendChild(f);

}
var creatPoisonInerval=function ()
 {
    if(levelflag == 3 )
    {
      finalLevelSong.play();

      createSmallFish(Math.floor(Math.random() * 200), 500 ,1,"pos.gif");
    fishPool.appendChild(f);

    // countdownClear();
  }
}
var intervalfun=function ()
 {
    for(var i=0;i<smallFishs.length;i++)
    {
        pos=window.innerHeight-parseInt(smallFishs[i].style.left);
       //console.log(pos)
        if(pos >= -300 && pos <= 500)
        {
            if(i%2 == 0)

            {
              //  smallFishs[i].style.transform="rotate(180deg)";
                smallFishs[i].style.left = parseInt(smallFishs[i].style.left) + 10 + 'px';}
            else { (pos > 0)

                smallFishs[i].style.left = parseInt(smallFishs[i].style.left) - 10 + 'px';}
        }
        else
        {
            smallFishs[i].remove();
        }
    }
}
var CreateShark=function ()
{
    fishPool.appendChild(item);
    bigFish=document.getElementById("bigFish");
}
var MovingSharkInterval=function ()
{
    bpos=window.innerHeight-parseInt(bigFish.style.left);
    if(bpos > -600) {
        if (bigFish != null) {
            bigFish.style.left = parseInt(bigFish.style.left) + 7 + 'px';
        }
    }
    else
     {
      clearInterval(sharkInterval);
      clearInterval(CreatBigestFishinterval);
      bigFish.remove();
    }
}

//---------------the Interval For Moving And Creating Small And Poisone And Shark Element
//--------------the function called wher created the intervals

var Movinginterval = setInterval(intervalfun,100)
var CreatNewFishinterval = setInterval(creatInerval,1000)
var CreatPosFishinterval = setInterval(creatPoisonInerval,2000)
var CreatBigestFishinterval = setInterval(CreateShark,1000)
var sharkInterval = setInterval(MovingSharkInterval,100)



//function contain the logic of the game
function getPosition(el)
 {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { x: rect.top + scrollTop, y: rect.left + scrollLeft }

}//the position of any element in document
function checkTime()
{
    if(levelflag==3 || levelflag ==2)
    {
   //   secLevelSong.play();
           countdownInit();

        setTimeout(function () {
            if(score==200)
            {
              // alert("Level 2 Completed");
                window.location.href = "level3.html";
            }
            else
             {
               // countdownClear();
               window.location.href = "GameOvar.html";}

        }, 60000);
    }
} //check setimeOut in level 2
function checkPos()
 {
    //me eating the small fishes
    var MyPos=getPosition(objImage);
    for(var i=0; i<smallFishs.length;i++)
     {
       var z=50;
        var fishPos=getPosition(smallFishs[i]);
        if ((Math.abs(fishPos.x - MyPos.x) < z) && (Math.abs(fishPos.y - MyPos.y) < z ))
        {
            if(levelflag == 1 || levelflag == 2)
            {

              score += 10;
              scoreDiv.innerHTML = score;


               smallFishs[i].remove();
             }
             if( levelflag == 3)
             {
                 if(smallFishs[i].id ==1)
                 {
//                   countdownInit();

                     if (lives <= 1)
                        {

                           objImage.remove();
                           window.location.href = "GameOvar.html";
                       }
                     else
                           {
                             lives -- ;
                             getLives.innerHTML ="Lives "+lives;

                            smallFishs[i].remove();
                          }
                  }
                 else
                    {
                     score += 10;
                     scoreDiv.innerHTML = score;
                     smallFishs[i].remove();
                    }
             }
        }

    }

    var bigFishPos=getPosition(bigFish);

    //shark eating me and small fishes

    if((Math.abs(bigFishPos.x - MyPos.x) < 90) && (Math.abs(bigFishPos.y - MyPos.y) < 90 ))
    {
         if (lives <= 1)
         {
          objImage.remove();
          window.location.href = "GameOvar.html";
         }
       else
       {
         lives --;
         getLives.innerHTML ="Lives "+lives;
         }

    }
    for(var i=0; i<smallFishs.length;i++) {
        var fishPos=getPosition(smallFishs[i]);
        if ((Math.abs(bigFishPos.x - fishPos.x) < 100) && (Math.abs(bigFishPos.y - fishPos.y) < 100 )) {

            smallFishs[i].remove();
        }
    }
} //check the collabse and the eating
function init()
{
    var modal = document.getElementById('myModal');
// Get the button that opens the modal
    var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
// When the user clicks on <span> (x), close the modal
    span.onclick = function()
     {
        modal.style.display = "none";
     }
     getLives.innerHTML ="Lives "+lives;

    checkTime();
    score=0;
    objImage=document.getElementById("image1");
    objImage.style.position='absolute';
    objImage.style.left='0px';
    objImage.style.top='0px';
    smallFishs=document.getElementsByClassName("eatingFish");
    item=document.createElement("img");
    item.height=150;
    item.id="bigFish";
    item.style.position = 'absolute';
    item.src="sharkk.gif";
    item.width=300;
    item.style.left=0;
    item.style.top= 300+'px';

} //function called when windows load
function move(e)
{

    var newX = e.clientX - 10;
    var newY = e.clientY - 10;

    objImage.style.left = newX + "px";
    objImage.style.top = newY + "px";

    if(score == 200)
    {
        if(levelflag == 1)
        {
         //   alert("Level 1 Completed Congratulation");

          window.location.href = "level2.html";
          cong.style.display="block";

        }
        if(levelflag == 2)
        {
         //  alert("Level 2 Completed Congratulation");
          window.location.href = "level3.html";
        }
        if (levelflag == 3)
        {

         //  alert("Level 3 Completed Congratulation");
          window.location.href = "Main.html";

        }

    }
    checkPos();

} //function move the  mouse (mouse is me)
function initialClick(e) {

    if(moving){
        document.removeEventListener("mousemove", move);
        moving = !moving;
        return;
    }

    moving = !moving;
    image = this;
    document.addEventListener("mousemove", move, false);


} //function used in move the mouse(mouse is me)

window.onload=init;
