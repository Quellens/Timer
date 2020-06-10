var counter = 0,
    timeleft = 300,
    para1 = document.getElementById("para1"),
    timer = document.getElementById("timer"),
    minutenanzahl = parseURLParameter('min');
var sound = new Audio();
    sound.src = "audio/alert.mp3";

if (typeof minutenanzahl !== 'undefined')
    timeleft = minutenanzahl * 60 ;

function setup(){
  let id = setInterval(runterzaeler, 1000);

  function convertSeconds(x){
    var min = Math.floor(x/60), sec = x%60;
     if (min < 10) min = "0"+min;
    
     if (sec < 10) sec = "0"+sec;
      
     return min +':'+sec;    
  }
    
  function runterzaeler(){
    counter++;
    seconds = timeleft - counter;
    timer.innerHTML = convertSeconds(seconds) ;
  
    if (timer.innerHTML == "00:00"){
       sound.play();
       sound.loop = true;
        timer.innerHTML = "00:00";
        clearInterval(id);    
        var div = document.createElement("div");
        div.className = "alert";
        div.innerHTML = " Der Timer ist zuende. Möchtest du den Weckerton stoppen? <br> "        
        document.body.insertBefore(div,document.getElementById("ueberschrift"))
        var button1 = document.createElement("a");
        div.appendChild(button1);
        button1.innerHTML = "Ja <br>"
        button1.addEventListener("click",()=>{
           sound.pause();
           para1.innerHTML = "";
           div.remove();
        })
         var button2 = document.createElement("a");
        div.appendChild(button2);
        button2.innerHTML = "Nein"
        button2.addEventListener("click",()=>{
        para1.innerHTML   = "Du hast auf Abbrechen gedrückt. <br> Der Weckerton bleibt.";
        })
        
    }
  }
}  

document.getElementById("button").addEventListener("click",(e)=>{
    setup();
    e.target.remove();
})

function parseURLParameter(par){
  var fullURL = window.location.search.substring(1),
      par_arr = fullURL.split('&');
  for (var i = 0; i < par_arr.length; i++){
      var current = par_arr[i].split('=');
     if(current[0] == par) return current[1];
  } 
}
