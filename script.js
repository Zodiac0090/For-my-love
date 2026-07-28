document.addEventListener("DOMContentLoaded", () => {


/* ==========================
   MUSIQUE
========================== */

const music = document.getElementById("music");

document.body.addEventListener("click", () => {

    if(music.paused){
        music.play().catch(()=>{});
    }

}, {once:true});



/* ==========================
   OUVERTURE DU CADEAU
========================== */

const startButton = document.getElementById("startButton");
const welcome = document.getElementById("welcome");
const book = document.getElementById("book");


startButton.addEventListener("click",()=>{

    welcome.style.opacity="0";

    setTimeout(()=>{

        welcome.classList.add("hidden");
        book.classList.remove("hidden");

    },800);

    createFireworks();

});



/* ==========================
   SYSTEME DE PAGES
========================== */


const pages=document.querySelectorAll(".page");
const nextButtons=document.querySelectorAll(".next");

let currentPage=0;


nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{


        pages[currentPage].classList.remove("active");

        currentPage++;


        if(currentPage < pages.length){

            pages[currentPage].classList.add("active");

            startTyping(currentPage);

        }


        createFireworks();


    });

});



/* Retour */

const restart=document.getElementById("restart");

if(restart){

restart.addEventListener("click",()=>{

    currentPage=0;

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    pages[0].classList.add("active");

});

}



/* ==========================
   JAUGE D'AMOUR
========================== */


const slider=document.getElementById("loveSlider");
const value=document.getElementById("loveValue");
const emoji=document.getElementById("emoji");


slider.addEventListener("input",()=>{


let percent=Number(slider.value);


if(percent>=1000){

    value.textContent="∞ %";

}

else{

    value.textContent=percent+" %";

}



if(percent<100){

    emoji.textContent="😡";

}

else if(percent<300){

    emoji.textContent="😐";

}

else if(percent<500){

    emoji.textContent="🙂";

}

else if(percent<700){

    emoji.textContent="😊";

}

else if(percent<900){

    emoji.textContent="😍";

}

else{

    emoji.textContent="🥰❤️";

}



});





/* ==========================
   LETTRES D'AMOUR
========================== */


const letters=[


`
Myra,

Aujourd'hui est un jour différent des autres,
parce qu'il célèbre l'existence d'une personne
qui apporte tellement de lumière autour d'elle.

Je veux que tu saches que derrière chaque mot
de ce site il y a une pensée pour toi.

Ton sourire, ta présence et ta façon d'être
rendent les moments beaucoup plus beaux.

Je serai toujours là pour toi,
dans les moments heureux comme dans les moments difficiles.
Tu pourras toujours compter sur moi.

Joyeux anniversaire ❤️
`,


`
Myra,

Il y a des personnes que l'on rencontre
et qui changent simplement quelque chose en nous.

Tu es devenue une personne importante dans ma vie.

Je veux être celui qui te rappelle
à quel point tu es précieuse.

Même quand les choses ne seront pas faciles,
je resterai à tes côtés.

Je veux partager les rires,
les souvenirs,
les petits moments simples
qui deviennent les plus beaux.

Je serai toujours là pour toi ❤️
`,


`
Mon amour,

Aujourd'hui je célèbre ton anniversaire,
mais surtout je célèbre la chance
d'avoir une personne comme toi dans ma vie.

J'espère que cette journée sera remplie
de bonheur, de sourires et de beaux souvenirs.

N'oublie jamais que tu mérites
tout ce qu'il y a de plus beau.

Je serai toujours là,
peu importe le temps,
peu importe la distance.

❤️ Zodiac
`,


`
Myra,

Si un jour tu doutes de toi,
j'espère que tu te rappelleras
que quelqu'un croit énormément en toi.

Tu es une personne unique.

Ne change jamais pour devenir quelqu'un d'autre.

Reste la personne incroyable que tu es.

Je serai toujours présent
pour t'encourager,
te soutenir,
et avancer avec toi.

Joyeux anniversaire 🌸
`,


`
La dernière lettre...

Myra,

Merci d'exister.

Merci pour tous les moments,
tous les sourires,
toutes les émotions.

Ce cadeau est petit comparé
à ce que tu représentes.

Mais chaque animation,
chaque fleur,
chaque cœur représente
une pensée pour toi.

Je te promets une chose :

Je serai toujours là pour toi.

Aujourd'hui,
demain,
et tous les jours qui suivront.

Joyeux anniversaire ❤️

— Zodiac
`

];



function startTyping(pageNumber){


let letterNumber=pageNumber-2;


if(letterNumber>=0 && letterNumber<letters.length){


let target=document.getElementById(
"typing"+(letterNumber+1)
);


if(!target)return;


target.textContent="";


let text=letters[letterNumber];

let index=0;



function write(){

if(index<text.length){

target.textContent+=text[index];

index++;

setTimeout(write,25);

}

}


write();


}



}





/* ==========================
   COEURS QUI TOMBENT
========================== */


function createHeart(){


const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";


heart.style.left=Math.random()*100+"vw";

heart.style.animationDuration=
(5+Math.random()*8)+"s";


heart.style.fontSize=
(15+Math.random()*35)+"px";


document.getElementById("hearts")
.appendChild(heart);



setTimeout(()=>{

heart.remove();

},12000);



}


setInterval(createHeart,250);






/* ==========================
   DAHLIAS
========================== */


function createFlower(){


const flower=document.createElement("div");

flower.className="dahlia";


flower.style.left=Math.random()*100+"vw";

flower.style.animationDuration=
(8+Math.random()*10)+"s";


flower.style.width=
(40+Math.random()*60)+"px";


flower.style.height=
flower.style.width;


document.getElementById("flowers")
.appendChild(flower);



setTimeout(()=>{

flower.remove();

},18000);



}


setInterval(createFlower,700);






/* ==========================
   FEUX D'ARTIFICE
========================== */


const canvas=
document.getElementById("fireworks");

const ctx=
canvas.getContext("2d");


canvas.width=innerWidth;
canvas.height=innerHeight;


window.addEventListener("resize",()=>{

canvas.width=innerWidth;
canvas.height=innerHeight;

});



let particles=[];


function createFireworks(){


let x=Math.random()*canvas.width;

let y=Math.random()*canvas.height/2;


for(let i=0;i<50;i++){


particles.push({

x:x,

y:y,

speedX:(Math.random()-0.5)*8,

speedY:(Math.random()-0.5)*8,

life:100

});


}



}



function animateFireworks(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach((p,index)=>{


p.x+=p.speedX;

p.y+=p.speedY;

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

particles.splice(index,1);

}


});


requestAnimationFrame(animateFireworks);


}


animateFireworks();



});
