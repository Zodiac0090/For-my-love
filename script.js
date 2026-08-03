document.addEventListener("DOMContentLoaded", () => {


/* =========================
   MUSIQUE
========================= */

const music = document.getElementById("music");

document.addEventListener("click", () => {

    if(music && music.paused){

        music.play().catch(()=>{});

    }

},{once:true});





/* =========================
   OUVERTURE DU CADEAU
========================= */


const startButton =
document.getElementById("startButton");

const welcome =
document.getElementById("welcome");

const book =
document.getElementById("book");


startButton.addEventListener("click",()=>{


welcome.style.opacity="0";


setTimeout(()=>{

welcome.classList.add("hidden");

book.classList.remove("hidden");

},800);



createFirework();



});







/* =========================
   CHANGEMENT DES PAGES
========================= */


const pages =
document.querySelectorAll(".page");


const nextButtons =
document.querySelectorAll(".next");


let currentPage=0;



nextButtons.forEach(button=>{


button.addEventListener("click",()=>{


pages[currentPage]
.classList.remove("active");



currentPage++;



if(currentPage < pages.length){


pages[currentPage]
.classList.add("active");


startTyping(currentPage);


}



createFirework();



});


});





/* Retour */

const restart =
document.getElementById("restart");


if(restart){


restart.onclick=()=>{


pages.forEach(page=>{

page.classList.remove("active");

});


currentPage=0;


pages[0].classList.add("active");


};


}










/* =========================
   JAUGE D'AMOUR
========================= */


const slider =
document.getElementById("loveSlider");


const loveValue =
document.getElementById("loveValue");


const emoji =
document.getElementById("emoji");



slider.addEventListener("input",()=>{


let value =
Number(slider.value);



if(value>=1000){

loveValue.innerHTML="∞ %";

}

else{

loveValue.innerHTML=value+" %";

}




if(value<100){

emoji.innerHTML="😡";

}

else if(value<300){

emoji.innerHTML="😐";

}

else if(value<500){

emoji.innerHTML="🙂";

}

else if(value<700){

emoji.innerHTML="😊";

}

else if(value<900){

emoji.innerHTML="😍";

}

else{

emoji.innerHTML="🥰❤️";

}



});









/* =========================
   LETTRES D'AMOUR
========================= */


const letters=[


`
Myra ❤️

Aujourd'hui est un jour très spécial,
car c'est le jour où une personne incroyable
est née.

Je voulais créer quelque chose qui te ressemble :
beau, doux et rempli d'amour.

Chaque fleur, chaque cœur et chaque animation
est là pour te rappeler une chose :

Tu es importante.

Je veux que tu saches que peu importe
ce qui arrivera dans la vie,
je serai toujours là pour toi.

Dans les moments heureux,
dans les moments difficiles,
dans les jours où tu auras besoin de quelqu'un.

Tu pourras toujours compter sur moi.

Joyeux anniversaire Myra ❤️
`,


`
Myra,

Certaines personnes arrivent dans notre vie
et rendent les choses simplement plus belles.

Tu fais partie de ces personnes.

Ton sourire peut changer une journée,
ta présence peut rendre un moment spécial.

Je souhaite que cet anniversaire t'apporte
autant de bonheur que tu en apportes autour de toi.

N'oublie jamais ta valeur.

Je serai toujours là pour t'encourager,
te soutenir et croire en toi.

❤️
`,


`
Aujourd'hui je ne célèbre pas seulement
ton anniversaire.

Je célèbre aussi la chance
d'avoir une personne comme toi.

J'espère que tu réaliseras toujours
à quel point tu es unique.

Même quand tu doutes,
même quand tu rencontres des difficultés,
rappelle-toi que quelqu'un croit en toi.

Je serai toujours là pour toi,
peu importe les circonstances.

Joyeux anniversaire 🌸
`,


`
Myra,

Si je pouvais mettre tous mes sentiments
dans une seule phrase,
je dirais simplement :

Merci d'exister.

Merci pour les sourires,
les souvenirs,
les petits moments qui deviennent grands.

Je veux continuer à voir ton bonheur,
à te voir sourire,
et à être présent quand tu as besoin.

Tu comptes énormément.

❤️ Zodiac
`,


`
La dernière lettre...

Myra,

Ce cadeau est une petite preuve
de tout l'amour et de toute l'attention
que je voulais te donner pour ton anniversaire.

Les fleurs vont tomber,
les feux d'artifice vont disparaître,
mais une chose restera :

Je serai toujours là pour toi.

Aujourd'hui,
demain,
et dans tous les jours à venir.

Joyeux anniversaire Myra ❤️

— Zodiac
`

];





function startTyping(pageNumber){


let index =
pageNumber-2;



if(index<0 || index>=letters.length)
return;



const target =
document.getElementById(
"typing"+(index+1)
);



if(!target)
return;



target.textContent="";


let text =
letters[index];


let i=0;



function write(){


if(i<text.length){


target.textContent += text[i];

i++;


setTimeout(write,25);


}


}



write();



}









/* =========================
   COEURS QUI TOMBENT
========================= */


function createHeart(){


const heart =
document.createElement("div");


heart.className="heart";


heart.innerHTML="❤️";


heart.style.left =
Math.random()*100+"vw";


heart.style.fontSize =
15+Math.random()*35+"px";


heart.style.animationDuration =
5+Math.random()*8+"s";



document
.getElementById("hearts")
.appendChild(heart);



setTimeout(()=>{

heart.remove();

},15000);


}


setInterval(createHeart,300);









/* =========================
   DAHLIAS QUI TOMBENT
========================= */


function createDahlia(){


const flower =
document.createElement("div");


flower.className="dahlia";


flower.style.left =
Math.random()*100+"vw";


let size =
40+Math.random()*60;


flower.style.width=size+"px";

flower.style.height=size+"px";



flower.style.animationDuration =
8+Math.random()*10+"s";



document
.getElementById("flowers")
.appendChild(flower);



setTimeout(()=>{

flower.remove();

},18000);



}



setInterval(createDahlia,500);









/* =========================
   FEUX D'ARTIFICE
========================= */


const canvas =
document.getElementById("fireworks");


const ctx =
canvas.getContext("2d");



canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;



window.onresize=()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

};




let particles=[];




function createFirework(){


let x =
Math.random()*canvas.width;


let y =
Math.random()*canvas.height/2;



for(let i=0;i<60;i++){


particles.push({


x:x,

y:y,

vx:(Math.random()-.5)*8,

vy:(Math.random()-.5)*8,

life:100


});


}


}





function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach((p,i)=>{


p.x+=p.vx;

p.y+=p.vy;

p.life--;



ctx.beginPath();

ctx.arc(
p.x,
p.y,
3,
0,
Math.PI*2
);


ctx.fillStyle="white";

ctx.fill();



if(p.life<=0){

particles.splice(i,1);

}



});



requestAnimationFrame(animate);


}



animate();



});
