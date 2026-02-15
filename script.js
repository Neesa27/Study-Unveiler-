


/////////////

// <![CDATA[
var speed=40; // lower number for faster
var flakes=33; // number of flakes falling at a time
var untidy=8; // how often do you want the flakes tidied up (high number is less often)
var sizes=36; // maximum size of flakes in pixels
var colour='#f7f7f7'; // colour of the snowflakes

/****************************\
*Winter Snow Flakes Effect #3*

\****************************/

var boddie;
var dx=new Array();
var xp=new Array();
var yp=new Array();
var am=new Array();
var dy=new Array();
var le=new Array();
var fs=new Array();
var flaky=new Array();
var swide=480;
var shigh=320;
var sleft=0;
var starty=0;
var offset=0;
var tidying=0;
var deeex=0;
var has_focus=true;
var snowflakes=new Array(8727, 10016, 10033, 10035, 10036, 10037, 10038, 10042, 10043, 10044, 10045, 10046, 10051, 10052, 10053, 10054, 10055, 10056, 10057, 10058, 10059);
var ie_version=(navigator.appVersion.indexOf("MSIE")!=-1)?parseFloat(navigator.appVersion.split("MSIE")[1]):false;
var plow=document.createElement("img");


function addLoadEvent(funky) {
  var oldonload=window.onload;
  if (typeof(oldonload)!='function') window.onload=funky;
  else window.onload=function() {
    if (oldonload) oldonload();
    funky();
  }
}

addLoadEvent(december_21);

function december_21() { if (document.getElementById) {
  var i;
  if (ie_version) {
    document.onfocusin=function(){has_focus=true;};
    document.onfocusout=function(){has_focus=false;sleft=0;};
  } 
  else {
    window.onfocus=function(){has_focus=true;};
    window.onblur=function(){has_focus=false;sleft=0;};
  }
  window.onscroll=set_scroll;
  window.onresize=set_width;
  document.onmousemove=mouse;
  boddie=document.createElement("div");
  boddie.style.position="fixed";
  boddie.style.bottom="0px";
  boddie.style.left="0px";
  boddie.style.width="100%";
  boddie.style.overflow="hidden";
  boddie.style.backgroundColor="transparent";
  boddie.style.pointerEvents="none";
  boddie.style.zIndex="0";
  document.body.insertBefore(boddie, document.body.firstChild); 
  set_width();
  plow.style.position="absolute";
  plow.style.overflow="hidden";
  plow.style.zIndex=9999;
  plow.style.bottom="0px";
  plow.style.left="-144px";
  boddie.appendChild(plow);
  for (i=0; i<flakes; i++) freeze_ice(Math.random()*shigh*3/4);
  offset=0;
  setInterval("winter_flakes()", speed);
}}

function freeze_ice(whyp) {
  starty++;
  offset++;
  var f, t;
  start_fall(starty, whyp);
  f=document.createElement("div");
  t=document.createTextNode(String.fromCharCode(snowflakes[starty%snowflakes.length]));
  f.appendChild(t);
  t=f.style;
  t.color=colour;
  if (ie_version && ie_version<10) t.filter="glow(color="+colour+",strength=1)";
  else if (ie_version) t.boxShadow="0px 0px 2x 2px "+colour;
  else t.textShadow=colour+' 0px 0px 2px';
  t.font=fs[starty]+"px sans-serif";
  t.position="absolute";
  t.zIndex=1000+starty;
  t.top=yp[starty]+"px";
  t.left=xp[starty]+"px";
  t.lineHeight=fs[starty]+"px";
  flaky[starty]=f;
  boddie.appendChild(f);
}
  
function start_fall(i, whyp) {
  fs[i]=Math.floor(sizes*(.25+.75*Math.random()));
  dx[i]=Math.random();
  am[i]=8+Math.random()*sizes*.75;
  dy[i]=1+Math.random()*2;
  xp[i]=Math.random()*(swide-fs[i]);
  yp[i]=whyp-fs[i];
  le[i]='falling';
}

function set_width() {
  var sw, sh;
  if (typeof(window.innerWidth)=='number' && window.innerWidth) {
    sw=window.innerWidth;
    sh=window.innerHeight;
  }
  else if (document.compatMode=="CSS1Compat" && document.documentElement && document.documentElement.clientWidth) {
    sw=document.documentElement.clientWidth;
    sh=document.documentElement.clientHeight; 
  }
  else {
    sw=document.body.clientWidth;
	sh=document.body.clientHeight;
  }
  if (sw && sh && has_focus) {
    swide=sw;
    shigh=sh;
  }
  boddie.style.height=shigh+"px";
}

function winter_flakes() {
  var i;
  var c=0;
  for (i=0; i<starty; i++) {
    if (flaky[i] && le[i]!='tidying') {
		if (yp[i]>shigh || xp[i]>swide || xp[i]<-fs[i]) {
		  if (offset>0) offset--;
		  boddie.removeChild(flaky[i]);
		  flaky[i]=false;
		}
		else if (yp[i]+offset/flakes<shigh-0.7*fs[i]) {
		  yp[i]+=dy[i];
		  dx[i]+=0.02+Math.random()/20;
		  xp[i]+=deeex;
		  flaky[i].style.top=yp[i]+"px";
		  flaky[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
		}
		else if (le[i]=='falling') le[i]='landed';
	}
	if (flaky[i] && le[i]=='falling') c++;
  }
  if (c<flakes) freeze_ice(0);
  if (offset>untidy*flakes && !tidying && Math.random()<.05) tidy_flakes();
}

function tidy_flakes() {
  var i;
  tidying=true;
  for (i=swide; i>=-146; i-=2) setTimeout('plough('+i+')', speed*(swide-i));
  setTimeout('tidying=false; offset=0;', speed*(swide-i));
}

function plough(x) {
  var i, p;
  plow.style.left=x+"px";
  for (i=0; i<starty; i++) {
    if (flaky[i] && le[i]!='falling') {
	  p=xp[i]+fs[i]+am[i]*Math.sin(dx[i])-dy[i];
	  if (p<0) {
	    boddie.removeChild(flaky[i]);
		flaky[i]=false;
	  }
	  else if (p>x && p<x+3.5) {
	    le[i]='tidying';
	    xp[i]-=2;
	    if (Math.random()<.1) {
		  yp[i]--;
		  flaky[i].style.top=yp[i]+"px";
	    }
	    flaky[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
	  }
	  else if (p>x+144 && yp[i]<shigh-0.7*fs[i]) {
  	    yp[i]+=dy[i];
		dx[i]+=0.02+Math.random()/10;
		flaky[i].style.top=yp[i]+"px";
		flaky[i].style.left=(xp[i]+am[i]*Math.sin(dx[i]))+"px";
	  }
	}
  }
}

function set_scroll() {
  if (typeof(self.pageXOffset)=='number' && self.pageXoffset) sleft=self.pageXOffset;
  else if (document.body && document.body.scrollLeft) sleft=document.body.scrollLeft;
  else if (document.documentElement && document.documentElement.scrollLeft) sleft=document.documentElement.scrollLeft;
  else sleft=0;
}

function mouse(e) {
  var x;
  if (e) x=e.pageX;
  else {
	x=event.x;
    set_scroll();
    x+=sleft;
  }
  deeex=has_focus?Math.floor(-1+3*(x-sleft)/swide):0;
}
// ]]>

//////////////////////////////////////////////////


// declaring variables for scores  and counts
var sqr3Score = 0;
var retpracScore = 0;
var spacepracScore = 0;
var pq4rScore = 0;
var feyntechScore = 0;
var leitsysScore = 0;
var colconoScore = 0;
var mindmaScore = 0;
var exerScore = 0;
var bedScore = 0;

var questionCount = 0;
//variable for result
var result = document.getElementById("result");

//variable for questions
var q1a1 = document.getElementById("q1a1");
var q1a2 = document.getElementById("q1a2");

var q2a1 = document.getElementById("q2a1");
var q2a2 = document.getElementById("q2a2");
var q2a3 = document.getElementById("q2a3");
var q2a4 = document.getElementById("q2a4");
var q2a5 = document.getElementById("q2a5");
var q2a6 = document.getElementById("q2a6");
var q2a7 = document.getElementById("q2a7");
var q2a8 = document.getElementById("q2a8");
var q2a9 = document.getElementById("q2a9");
var q2a10 = document.getElementById("q2a10");
var q2a11 = document.getElementById("q2a11");
var q2a12 = document.getElementById("q2a12");
var q2a13 = document.getElementById("q2a13");
var q2a14 = document.getElementById("q2a14");
var q2a15 = document.getElementById("q2a15");
var q2a16 = document.getElementById("q2a16");

var q3a1 = document.getElementById("q3a1");
var q3a2 = document.getElementById("q3a2");

var q4a1 = document.getElementById("q4a1");
var q4a2 = document.getElementById("q4a2");
 
var q5a1 = document.getElementById("q5a1");
var q5a2 = document.getElementById("q5a2");

var q6a1 = document.getElementById("q6a1");
var q6a2 = document.getElementById("q6a2");

var q7a1 = document.getElementById("q7a1");
var q7a2 = document.getElementById("q7a2");

var q8a1 = document.getElementById("q8a1");
var q8a2 = document.getElementById("q8a2");

var q9a1 = document.getElementById("q9a1");
var q9a2 = document.getElementById("q9a2");

var q10a1 = document.getElementById("q10a1");
var q10a2 = document.getElementById("q10a2");


var restart = document.getElementById("restart")

document.getElementById("q1a1").addEventListener("click", function(){
  document.getElementById("q1a1").disabled = true;
  document.getElementById("q1a2").disabled = true;
});

document.getElementById("q1a2").addEventListener("click", function(){
  document.getElementById("q1a2").disabled = true;
  document.getElementById("q1a1").disabled = true;
});


document.getElementById("q2a1").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true;  
});


document.getElementById("q2a2").addEventListener("click", function(){
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true;  

});

document.getElementById("q2a3").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a4").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a5").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a6").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a7").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a8").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a9").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a10").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a11").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a12").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a13").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a14").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a15").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q2a16").addEventListener("click", function(){
  document.getElementById("q2a1").disabled = true;
  document.getElementById("q2a2").disabled = true;
  document.getElementById("q2a3").disabled = true;
  document.getElementById("q2a4").disabled = true;
  document.getElementById("q2a5").disabled = true;
  document.getElementById("q2a6").disabled = true;
  document.getElementById("q2a7").disabled = true;
  document.getElementById("q2a8").disabled = true;
  document.getElementById("q2a9").disabled = true;
  document.getElementById("q2a10").disabled = true;
  document.getElementById("q2a11").disabled = true;
  document.getElementById("q2a12").disabled = true;
  document.getElementById("q2a13").disabled = true;
  document.getElementById("q2a14").disabled = true;
  document.getElementById("q2a15").disabled = true;
  document.getElementById("q2a16").disabled = true; 
});

document.getElementById("q3a1").addEventListener("click", function(){
  document.getElementById("q3a1").disabled = true;
  document.getElementById("q3a2").disabled = true;
});

document.getElementById("q3a2").addEventListener("click", function(){
  document.getElementById("q3a2").disabled = true;
  document.getElementById("q3a1").disabled = true;
});

document.getElementById("q4a1").addEventListener("click", function(){
  document.getElementById("q4a1").disabled = true;
  document.getElementById("q4a2").disabled = true;
});

document.getElementById("q4a2").addEventListener("click", function(){
  document.getElementById("q4a2").disabled = true;
  document.getElementById("q4a1").disabled = true;
});

document.getElementById("q5a1").addEventListener("click", function(){
  document.getElementById("q5a1").disabled = true;
  document.getElementById("q5a2").disabled = true;
});

document.getElementById("q5a2").addEventListener("click", function(){
  document.getElementById("q5a2").disabled = true;
  document.getElementById("q5a1").disabled = true;
});

document.getElementById("q6a1").addEventListener("click", function(){
  document.getElementById("q6a1").disabled = true;
  document.getElementById("q6a2").disabled = true;
});

document.getElementById("q6a2").addEventListener("click", function(){
  document.getElementById("q6a2").disabled = true;
  document.getElementById("q6a1").disabled = true;
});

document.getElementById("q7a1").addEventListener("click", function(){
  document.getElementById("q7a1").disabled = true;
  document.getElementById("q7a2").disabled = true;
});

document.getElementById("q7a2").addEventListener("click", function(){
  document.getElementById("q7a2").disabled = true;
  document.getElementById("q7a1").disabled = true;
});

document.getElementById("q8a1").addEventListener("click", function(){
  document.getElementById("q8a1").disabled = true;
  document.getElementById("q8a2").disabled = true;
});

document.getElementById("q8a2").addEventListener("click", function(){
  document.getElementById("q8a2").disabled = true;
  document.getElementById("q8a1").disabled = true;
});

document.getElementById("q9a1").addEventListener("click", function(){
  document.getElementById("q9a1").disabled = true;
  document.getElementById("q9a2").disabled = true;
});

document.getElementById("q9a2").addEventListener("click", function(){
  document.getElementById("q9a2").disabled = true;
  document.getElementById("q9a1").disabled = true;
});

document.getElementById("q10a1").addEventListener("click", function(){
  document.getElementById("q10a1").disabled = true;
  document.getElementById("q10a2").disabled = true;
});

document.getElementById("q10a2").addEventListener("click", function(){
  document.getElementById("q10a2").disabled = true;
  document.getElementById("q10a1").disabled = true;
});


q1a1.addEventListener("click", () => {
    sqr3();
    retprac();
    leitsys();
    spaceprac();
    checkQuizEnd();
});
q1a2.addEventListener("click", () => {
    pq4r();
    feyntech();
    mindma();
    colcono();
    checkQuizEnd();
});

q2a1.addEventListener("click", () => {
    mindma();
    pq4r();
    sqr3();
    checkQuizEnd();
});
q2a2.addEventListener("click", () => {
    pq4r()
    checkQuizEnd();
});
q2a3.addEventListener("click", () => {
    bed();
    mindma();
    checkQuizEnd();
});
q2a4.addEventListener("click", () => {
    bed();
    feyntech();
    sqr3();
    pq4r();
    checkQuizEnd();
});
q2a5.addEventListener("click", () => {
    leitsys();
    spaceprac();
    retprac();
    sqr3();
    checkQuizEnd();
});
q2a6.addEventListener("click", () => {
    retprac();
    checkQuizEnd();

});
q2a7.addEventListener("click", () => {
    bed();
    spaceprac();
    checkQuizEnd();
});
q2a8.addEventListener("click", () => {
    colcono();
    checkQuizEnd();
});
q2a9.addEventListener("click", () => {
    retprac();
    checkQuizEnd();
});
q2a10.addEventListener("click", () => {
    feyntech();
    mindma();
    checkQuizEnd();
});
q2a11.addEventListener("click", () => {
    feyntech();
    colcono();
    checkQuizEnd();
});
q2a12.addEventListener("click", () => {
    spaceprac();
    checkQuizEnd();
});
q2a13.addEventListener("click", () => {
    leitsys();
    checkQuizEnd();
});
q2a14.addEventListener("click", () => {
    exer();
    checkQuizEnd();
});
q2a15.addEventListener("click", () => {
    mindma();
    checkQuizEnd();
});
q2a16.addEventListener("click", () => {
    colcono();
    checkQuizEnd();

});


q3a1.addEventListener("click", () => {
    feyntech();
    colcono();
    retprac();
    exer();
    checkQuizEnd();
});
q3a2.addEventListener("click", () => {
    pq4r();
    sqr3();
    bed();
    mindma();
    checkQuizEnd();
});

q4a1.addEventListener("click", () => {
    leitsys();
    spaceprac();
    retprac();
    checkQuizEnd();
});
q4a2.addEventListener("click", () => {
    feyntech();
    pq4r();
    retprac();
    checkQuizEnd();
});

q5a1.addEventListener("click", () => {
    feyntech();
    mindma();
    checkQuizEnd();
});
q5a2.addEventListener("click", () => {
    colcono();
    mindma();
    checkQuizEnd();
});

q6a1.addEventListener("click", () => {
    exer();
    mindma();
    retprac();
    checkQuizEnd();
});
q6a2.addEventListener("click", () => {
    spaceprac();
    bed();
    pq4r();
    checkQuizEnd();
});

q7a1.addEventListener("click", () => {
    exer();
    spaceprac();
    checkQuizEnd();
});
q7a2.addEventListener("click", () => {
    retprac();
    bed();
    pq4r();
    checkQuizEnd();
});

q8a1.addEventListener("click", () => {
    colcono();
    mindma();
    checkQuizEnd();
});
q8a2.addEventListener("click", () => {
    spaceprac();
    retprac();
    spaceprac();
    checkQuizEnd();
});

q9a1.addEventListener("click", () => {
    leitsys();
    spaceprac();
    checkQuizEnd();
});
q9a2.addEventListener("click", () => {
    colcono();
    pq4r();
    checkQuizEnd();
});

q10a1.addEventListener("click", () => {
    feyntech();
    bed();
    retprac();
    checkQuizEnd();
});
q10a2.addEventListener("click", () => {
    sqr3();
    spaceprac();
    checkQuizEnd();
});

restart.addEventListener("click", restartQuiz);

function sqr3() {
  sqr3Score += 1


  console.log( "sqr3Score = " + sqr3Score);
}

function retprac() {
  retpracScore += 1


  console.log( "retpracScore = " + retpracScore);

}

function spaceprac() {
  spacepracScore += 1


  console.log( "spacepracScore = " + spacepracScore);

}

function pq4r() {
  pq4rScore += 1


  console.log( "pq4rScore = " + pq4rScore);

}

function feyntech() {
  feyntechScore += 1


  console.log( "feyntechScore = " + feyntechScore);


}

function leitsys() {
  leitsysScore += 1


  console.log("leitsysScore = " + leitsysScore);


} 

function colcono() {
  colconoScore += 1


  console.log("colconoScore = " + colconoScore);

}

function mindma() {
  mindmaScore += 1


  console.log( "mindmaScore = " + mindmaScore);


}

function exer() {
  exerScore += 1


  console.log( "exerScore = " + exerScore);

}

function bed() {
  bedScore += 1


  console.log( "bedScore = " + bedScore);


}

function checkQuizEnd(){
  questionCount++;

  if(questionCount === 10){
    updateResult();
  }
}

function updateResult(){

  let scores = {
    "SQR3": sqr3Score,
    "Retrieval Practice": retpracScore,
    "Spaced Practice": spacepracScore,
    "PQ4R": pq4rScore,
    "Feynman Technique": feyntechScore,
    "Leitner System": leitsysScore,
    "Color Coding": colconoScore,
    "Mind Mapping": mindmaScore,
    "Exercise": exerScore,
    "Sleep": bedScore
  };

  let best = Object.keys(scores).reduce((a,b)=> scores[a] > scores[b] ? a : b);

  result.innerHTML = "Your best study method is: " + best;
}

function restartQuiz(){
  result.innerHTML = "Your result is..."
  sqr3Score = 0
  retpracScore = 0
  spacepracScore = 0
  pq4rScore = 0
  feyntechScore = 0
  leitsysScore = 0
  colconoScore = 0
  mindmaScore = 0
  exerScore = 0
  bedScore = 0
  questionCount = 0
  document.querySelectorAll("button").forEach(btn => btn.disabled = false);
}

