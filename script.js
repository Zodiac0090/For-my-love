/* ==========================================================
   SCRIPT.JS — PARTIE 1/10
   INITIALISATION + RÉCUPÉRATION DES ÉLÉMENTS
========================================================== */


"use strict";


/* ==========================
   ÉLÉMENTS PRINCIPAUX
========================== */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");


/* ==========================
   ÉCRANS
========================== */

const screens = {

    welcome:
        document.getElementById("welcome"),

    letter:
        document.getElementById("letterSection"),

    gift:
        document.getElementById("giftSection"),

    love:
        document.getElementById("loveSection"),

    result:
        document.getElementById("resultSection"),

    memories:
        document.getElementById("memoriesSection"),

    special:
        document.getElementById("specialSection"),

    finalMessage:
        document.getElementById("finalMessageSection"),

    end:
        document.getElementById("endSection")

};


/* ==========================
   ÉTAT DE L'EXPÉRIENCE
========================== */

const state = {

    currentScreen: "welcome",

    musicPlaying: false,

    letterOpened: false,

    giftOpened: false,

    loveValue: 0

};


/* ==========================
   UTILITAIRE
========================== */

function getElement(id) {

    return document.getElementById(id);

}


/* ==========================
   VÉRIFICATION
========================== */

console.log(
    "❤️ Surprise Myra — script chargé"
);/* ==========================================================
   SCRIPT.JS — PARTIE 2/10
   NAVIGATION ENTRE LES ÉCRANS
========================================================== */


/* ==========================
   CHANGER D'ÉCRAN
========================== */

function showScreen(screenName) {

    const target = screens[screenName];

    if (!target) {
        console.warn(
            "Écran introuvable :",
            screenName
        );

        return;
    }


    /* Retirer l'écran actif */

    Object.values(screens).forEach(screen => {

        if (screen) {
            screen.classList.remove("active");
        }

    });


    /* Afficher le nouvel écran */

    target.classList.add("active");


    /* Mettre à jour l'état */

    state.currentScreen = screenName;


    /* Revenir doucement en haut */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Petite animation GSAP si disponible */

    if (typeof gsap !== "undefined") {

        gsap.fromTo(
            target.querySelector(".card"),
            {
                opacity: 0,
                y: 20,
                scale: 0.98
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
            }
        );

    }

}


/* ==========================
   DÉMARRER LA SURPRISE
========================== */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            showScreen("letter");

        }
    );

}


/* ==========================
   BOUTONS DE NAVIGATION
========================== */

const nextToGift =
    getElement("nextToGift");

const nextToLove =
    getElement("nextToLove");

const loveContinue =
    getElement("loveContinue");

const nextToMemories =
    getElement("nextToMemories");

const nextToFinalMessage =
    getElement("nextToFinalMessage");

const nextToLetter =
    getElement("nextToLetter");

const nextToEnd =
    getElement("nextToEnd");


/* ==========================
   LETTRE → CADEAU
========================== */

if (nextToGift) {

    nextToGift.addEventListener(
        "click",
        () => {

            if (!state.letterOpened) {
                return;
            }

            showScreen("gift");

        }
    );

}


/* ==========================
   CADEAU → JAUGE
========================== */

if (nextToLove) {

    nextToLove.addEventListener(
        "click",
        () => {

            if (!state.giftOpened) {
                return;
            }

            showScreen("love");

        }
    );

}


/* ==========================
   JAUGE → RÉSULTAT
========================== */

if (loveContinue) {

    loveContinue.addEventListener(
        "click",
        () => {

            if (state.loveValue < 2000) {
                return;
            }

            showScreen("result");

        }
    );

}


/* ==========================
   RÉSULTAT → SOUVENIRS
========================== */

if (nextToMemories) {

    nextToMemories.addEventListener(
        "click",
        () => {

            showScreen("memories");

        }
    );

}


/* ==========================
   SOUVENIRS → MESSAGE SPÉCIAL
========================== */

if (nextToFinalMessage) {

    nextToFinalMessage.addEventListener(
        "click",
        () => {

            showScreen("special");

        }
    );

}


/* ==========================
   MESSAGE SPÉCIAL → DERNIER MESSAGE
========================== */

if (nextToLetter) {

    nextToLetter.addEventListener(
        "click",
        () => {

            showScreen("finalMessage");

        }
    );

}


/* ==========================
   DERNIER MESSAGE → FIN
========================== */

if (nextToEnd) {

    nextToEnd.addEventListener(
        "click",
        () => {

            showScreen("end");

        }
    );

}/* ==========================================================
   SCRIPT.JS — PARTIE 3/10
   MUSIQUE MP4 🎵
========================================================== */


/* ==========================
   DÉMARRER LA MUSIQUE
========================== */

function startMusic() {

    if (!music) {
        console.warn("MP4 audio introuvable.");
        return;
    }


    music.volume = 0.35;


    const playPromise = music.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                state.musicPlaying = true;

                updateMusicButton();

            })
            .catch(error => {

                console.warn(
                    "La lecture de la musique a été bloquée :",
                    error
                );

                state.musicPlaying = false;

                updateMusicButton();

            });

    }

}


/* ==========================
   ARRÊTER LA MUSIQUE
========================== */

function pauseMusic() {

    if (!music) return;


    music.pause();

    state.musicPlaying = false;

    updateMusicButton();

}


/* ==========================
   BOUTON MUSIQUE
========================== */

function updateMusicButton() {

    if (!musicButton) return;


    if (state.musicPlaying) {

        musicButton.textContent =
            "🔊 Musique";

    } else {

        musicButton.textContent =
            "🔇 Musique";

    }

}


/* ==========================
   BOUTON ON / OFF
========================== */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        () => {

            if (!music) return;


            if (music.paused) {

                startMusic();

            } else {

                pauseMusic();

            }

        }
    );

}


/* ==========================
   MUSIQUE AU PREMIER CLIC
========================== */

/*
   Les navigateurs bloquent généralement
   l'autoplay avec du son.

   Le clic sur "Commencer la surprise"
   est donc notre autorisation utilisateur.
*/

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            startMusic();

        },
        { once: true }
    );

}


/* ==========================
   VOLUME DE DÉPART
========================== */

if (music) {

    music.volume = 0.35;

}


/* ==========================
   ÉTAT INITIAL DU BOUTON
========================== */

updateMusicButton();/* ==========================================================
   SCRIPT.JS — PARTIE 4/10
   OUVERTURE DE LA LETTRE 💌
========================================================== */


/* ==========================
   ÉLÉMENTS
========================== */

const envelope =
    getElement("envelope");

const letterContent =
    getElement("letterContent");

const letterHint =
    getElement("letterHint");

const openLetterButton =
    getElement("openLetterButton");


/* ==========================
   OUVRIR LA LETTRE
========================== */

function openLetter() {

    if (state.letterOpened) {
        return;
    }


    state.letterOpened = true;


    /* Afficher le contenu */

    if (letterContent) {

        letterContent.classList.add("open");

    }


    /* Modifier l'indication */

    if (letterHint) {

        letterHint.textContent =
            "La lettre est ouverte ❤️";

    }


    /* Modifier le bouton */

    if (openLetterButton) {

        openLetterButton.textContent =
            "Lettre ouverte 💌";

        openLetterButton.disabled = true;

    }


    /* Petite animation de l'enveloppe */

    if (
        envelope &&
        typeof gsap !== "undefined"
    ) {

        gsap.timeline()

            .to(envelope, {
                scale: 1.15,
                rotation: -5,
                duration: 0.2,
                ease: "power2.out"
            })

            .to(envelope, {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "back.out(1.7)"
            });

    }


    /* Autoriser le bouton suivant */

    if (nextToGift) {

        nextToGift.classList.add("ready");

    }

}


/* ==========================
   CLIC SUR L'ENVELOPPE
========================== */

if (envelope) {

    envelope.addEventListener(
        "click",
        openLetter
    );

}


/* ==========================
   CLIC SUR LE BOUTON
========================== */

if (openLetterButton) {

    openLetterButton.addEventListener(
        "click",
        openLetter
    );

}/* ==========================================================
   SCRIPT.JS — PARTIE 5/10
   OUVERTURE DU CADEAU 🎁
========================================================== */


/* ==========================
   ÉLÉMENTS
========================== */

const giftButton =
    getElement("giftButton");

const giftContent =
    getElement("giftContent");

const giftHint =
    getElement("giftHint");


/* ==========================
   OUVRIR LE CADEAU
========================== */

function openGift() {

    if (state.giftOpened) {
        return;
    }


    state.giftOpened = true;


    /* Afficher le contenu */

    if (giftContent) {

        giftContent.classList.add("open");

    }


    /* Modifier le texte */

    if (giftHint) {

        giftHint.textContent =
            "Surprise découverte ! 💖";

    }


    /* Modifier le bouton */

    if (giftButton) {

        giftButton.textContent =
            "🎁 Ouvert !";

        giftButton.disabled = true;

    }


    /* Animation du cadeau */

    if (
        giftButton &&
        typeof gsap !== "undefined"
    ) {

        gsap.timeline()

            .to(giftButton, {
                scale: 1.18,
                rotation: -5,
                duration: 0.2,
                ease: "power2.out"
            })

            .to(giftButton, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });


        if (giftContent) {

            gsap.fromTo(
                giftContent,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.15,
                    ease: "back.out(1.4)"
                }
            );

        }

    }


    /* Autoriser le bouton suivant */

    if (nextToLove) {

        nextToLove.classList.add("ready");

    }

}


/* ==========================
   CLIC SUR LE CADEAU
========================== */

if (giftButton) {

    giftButton.addEventListener(
        "click",
        openGift
    );

}/* ==========================================================
   SCRIPT.JS — PARTIE 6/10
   JAUGE D'AMOUR ❤️
========================================================== */


/* ==========================
   ÉLÉMENTS
========================== */

const loveSlider =
    getElement("loveSlider");

const loveProgress =
    getElement("loveProgress");

const loveValue =
    getElement("loveValue");

const loveEmoji =
    getElement("loveEmoji");

const loveMessage =
    getElement("loveMessage");


/* ==========================
   OBTENIR L'ÉMOJI
========================== */

function getLoveEmoji(value) {

    if (value < 250) {
        return "😠";
    }

    if (value < 500) {
        return "😐";
    }

    if (value < 750) {
        return "🙂";
    }

    if (value < 1000) {
        return "😊";
    }

    if (value < 1250) {
        return "🥰";
    }

    if (value < 1500) {
        return "😍";
    }

    if (value < 1750) {
        return "💖";
    }

    return "💘";

}


/* ==========================
   OBTENIR LE MESSAGE
========================== */

function getLoveMessage(value) {

    if (value < 250) {
        return "Pour l'instant, c'est encore timide... 👀";
    }

    if (value < 500) {
        return "Ça commence doucement... 🌸";
    }

    if (value < 750) {
        return "On avance dans la bonne direction ! ✨";
    }

    if (value < 1000) {
        return "Ça devient sérieux là... ❤️";
    }

    if (value < 1250) {
        return "On dépasse déjà les 1000 % ! 🥰";
    }

    if (value < 1500) {
        return "Le niveau commence à devenir énorme ! 😍";
    }

    if (value < 1750) {
        return "Presque impossible à mesurer ! 💖";
    }

    if (value < 2000) {
        return "Encore un petit effort... 💘";
    }

    return "2000 % ! La jauge a atteint sa limite ! 💕";

}


/* ==========================
   METTRE À JOUR LA JAUGE
========================== */

function updateLove(value) {

    const numericValue =
        Number(value);


    state.loveValue =
        Math.max(
            0,
            Math.min(2000, numericValue)
        );


    const percentage =
        (state.loveValue / 2000) * 100;


    /* Valeur */

    if (loveValue) {

        loveValue.textContent =
            `${state.loveValue}%`;

    }


    /* Barre */

    if (loveProgress) {

        loveProgress.style.width =
            `${percentage}%`;

    }


    /* Emoji */

    if (loveEmoji) {

        loveEmoji.textContent =
            getLoveEmoji(state.loveValue);

    }


    /* Message */

    if (loveMessage) {

        loveMessage.textContent =
            getLoveMessage(state.loveValue);

    }


    /* Petite animation */

    if (
        loveEmoji &&
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            loveEmoji,
            {
                scale: 0.9
            },
            {
                scale: 1,
                duration: 0.25,
                ease: "back.out(2)"
            }
        );

    }


    /* Autoriser la suite uniquement à 2000 % */

    if (loveContinue) {

        if (state.loveValue >= 2000) {

            loveContinue.classList.add("ready");

        } else {

            loveContinue.classList.remove("ready");

        }

    }

}


/* ==========================
   SLIDER
========================== */

if (loveSlider) {

    loveSlider.addEventListener(
        "input",
        (event) => {

            updateLove(
                event.target.value
            );

        }
    );

}


/* ==========================
   VALEUR INITIALE
========================== */

updateLove(0);/* ==========================================================
   SCRIPT.JS — PARTIE 7/10
   ANIMATIONS DES SOUVENIRS 📸
========================================================== */


/* ==========================
   CARTES SOUVENIRS
========================== */

const memoryCards =
    document.querySelectorAll(".memoryCard");


/* ==========================
   ANIMER LES CARTES
========================== */

function animateMemories() {

    if (!memoryCards.length) {
        return;
    }


    if (typeof gsap === "undefined") {
        return;
    }


    gsap.fromTo(
        memoryCards,
        {
            opacity: 0,
            y: 30,
            scale: 0.96
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out"
        }
    );

}


/* ==========================
   ANIMATION DU MESSAGE
========================== */

const specialSection =
    getElement("specialSection");

const namesAnimation =
    getElement("namesAnimation");


function animateSpecialMessage() {

    if (
        !namesAnimation ||
        typeof gsap === "undefined"
    ) {
        return;
    }


    const children =
        namesAnimation.children;


    gsap.fromTo(
        children,
        {
            opacity: 0,
            y: 25,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }
    );

}


/* ==========================
   DÉTECTER LE CHANGEMENT
   D'ÉCRAN
========================== */

const originalShowScreen =
    showScreen;


showScreen = function(screenName) {

    originalShowScreen(screenName);


    /* Souvenirs */

    if (screenName === "memories") {

        setTimeout(
            animateMemories,
            100
        );

    }


    /* Message spécial */

    if (screenName === "special") {

        setTimeout(
            animateSpecialMessage,
            100
        );

    }

};/* ==========================================================
   SCRIPT.JS — PARTIE 8/10
   DÉCORATIONS FLOTTANTES ✨
========================================================== */


/* ==========================
   CONTENEURS
========================== */

const starsContainer =
    getElement("stars");

const heartsContainer =
    getElement("hearts");

const flowersContainer =
    getElement("flowers");


/* ==========================
   CRÉER UNE ÉTOILE
========================== */

function createStar() {

    if (!starsContainer) {
        return;
    }


    const star =
        document.createElement("span");

    star.className = "star";


    star.style.left =
        `${Math.random() * 100}%`;

    star.style.top =
        `${Math.random() * 100}%`;

    star.style.opacity =
        `${0.2 + Math.random() * 0.6}`;


    const size =
        1 + Math.random() * 3;

    star.style.width =
        `${size}px`;

    star.style.height =
        `${size}px`;


    starsContainer.appendChild(star);


    if (typeof gsap !== "undefined") {

        gsap.to(star, {

            opacity: 0.15,

            duration:
                1.5 + Math.random() * 2,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut",

            delay:
                Math.random() * 2

        });

    }

}


/* ==========================
   CRÉER PLUSIEURS ÉTOILES
========================== */

function createStars(count = 45) {

    for (let i = 0; i < count; i++) {

        createStar();

    }

}


/* ==========================
   ÉLÉMENTS FLOTTANTS
========================== */

function createFloatingElement(
    container,
    className,
    symbols
) {

    if (!container) {
        return;
    }


    const element =
        document.createElement("span");


    element.className =
        className;


    element.textContent =
        symbols[
            Math.floor(
                Math.random() * symbols.length
            )
        ];


    element.style.left =
        `${Math.random() * 100}%`;


    element.style.fontSize =
        `${14 + Math.random() * 18}px`;


    container.appendChild(element);


    if (typeof gsap !== "undefined") {

        const duration =
            7 + Math.random() * 7;


        gsap.fromTo(

            element,

            {
                y: 0,
                x: 0,
                rotation: 0,
                opacity: 0
            },

            {
                y:
                    -(window.innerHeight + 120),

                x:
                    (Math.random() - 0.5) * 140,

                rotation:
                    (Math.random() - 0.5) * 100,

                opacity: 0.5,

                duration,

                ease: "none",

                onComplete: () => {

                    element.remove();

                }

            }

        );

    }

}


/* ==========================
   BOUCLE DES CŒURS
========================== */

function startFloatingHearts() {

    setInterval(() => {

        createFloatingElement(
            heartsContainer,
            "floatingHeart",
            ["❤️", "💕", "💗", "💖"]
        );

    }, 1800);

}


/* ==========================
   BOUCLE DES FLEURS
========================== */

function startFloatingFlowers() {

    setInterval(() => {

        createFloatingElement(
            flowersContainer,
            "floatingFlower",
            ["🌸", "🌷", "🌺", "🌼"]
        );

    }, 2600);

}


/* ==========================
   INITIALISATION
========================== */

createStars(45);

startFloatingHearts();

startFloatingFlowers();/* ==========================================================
   SCRIPT.JS — PARTIE 9/10
   ANIMATIONS FINALES + RECOMMENCER ✨
========================================================== */


/* ==========================
   ANIMATION DU DERNIER MESSAGE
========================== */

const finalMessageSection =
    getElement("finalMessageSection");

const finalCard =
    finalMessageSection
        ? finalMessageSection.querySelector(".card")
        : null;


function animateFinalMessage() {

    if (
        !finalCard ||
        typeof gsap === "undefined"
    ) {
        return;
    }


    gsap.fromTo(
        finalCard,
        {
            opacity: 0,
            y: 30,
            scale: 0.97
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
        }
    );

}


/* ==========================
   ANIMATION DE LA FIN
========================== */

const endSection =
    getElement("endSection");

const endingCard =
    endSection
        ? endSection.querySelector(".card")
        : null;


function animateEnding() {

    if (
        !endingCard ||
        typeof gsap === "undefined"
    ) {
        return;
    }


    gsap.fromTo(
        endingCard,
        {
            opacity: 0,
            y: 35,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.3)"
        }
    );


    const endingIcon =
        getElement("endingIcon");


    if (endingIcon) {

        gsap.fromTo(
            endingIcon,
            {
                scale: 0.7,
                rotation: -10
            },
            {
                scale: 1,
                rotation: 0,
                duration: 0.8,
                delay: 0.15,
                ease: "back.out(1.7)"
            }
        );

    }

}


/* ==========================
   REPRENDRE LA SURPRISE
========================== */

function restartSurprise() {

    /* Réinitialiser l'état */

    state.currentScreen =
        "welcome";

    state.musicPlaying =
        false;

    state.letterOpened =
        false;

    state.giftOpened =
        false;

    state.loveValue =
        0;


    /* Réinitialiser la lettre */

    if (letterContent) {

        letterContent.classList.remove("open");

    }


    if (letterHint) {

        letterHint.textContent =
            "Clique sur l'enveloppe pour l'ouvrir...";

    }


    if (openLetterButton) {

        openLetterButton.textContent =
            "Ouvrir la lettre 💌";

        openLetterButton.disabled =
            false;

    }


    /* Réinitialiser le cadeau */

    if (giftContent) {

        giftContent.classList.remove("open");

    }


    if (giftHint) {

        giftHint.textContent =
            "Clique sur le cadeau pour découvrir ce qu'il cache ✨";

    }


    if (giftButton) {

        giftButton.textContent =
            "🎁";

        giftButton.disabled =
            false;

    }


    /* Réinitialiser les boutons */

    if (nextToGift) {
        nextToGift.classList.remove("ready");
    }

    if (nextToLove) {
        nextToLove.classList.remove("ready");
    }

    if (loveContinue) {
        loveContinue.classList.remove("ready");
    }


    /* Réinitialiser la jauge */

    if (loveSlider) {

        loveSlider.value =
            "0";

    }


    updateLove(0);


    /* Arrêter la musique */

    if (music) {

        music.pause();

        music.currentTime =
            0;

    }


    updateMusicButton();


    /* Retour à l'accueil */

    showScreen("welcome");

}


/* ==========================
   BOUTON RECOMMENCER
========================== */

if (restartButton) {

    restartButton.addEventListener(
        "click",
        restartSurprise
    );

}


/* ==========================
   AJOUTER LES ANIMATIONS
   À showScreen
========================== */

const previousShowScreen =
    showScreen;


showScreen = function(screenName) {

    previousShowScreen(screenName);


    if (screenName === "finalMessage") {

        setTimeout(
            animateFinalMessage,
            100
        );

    }


    if (screenName === "end") {

        setTimeout(
            animateEnding,
            100
        );

    }

};/* ==========================================================
   SCRIPT.JS — PARTIE 10/10
   INITIALISATION FINALE + SÉCURITÉ
========================================================== */


/* ==========================
   ÉCRAN DE DÉPART
========================== */

function initializeApp() {

    /* Afficher uniquement l'accueil */

    Object.values(screens).forEach(screen => {

        if (screen) {
            screen.classList.remove("active");
        }

    });


    if (screens.welcome) {

        screens.welcome.classList.add("active");

    }


    /* État initial */

    state.currentScreen =
        "welcome";

    state.letterOpened =
        false;

    state.giftOpened =
        false;

    state.loveValue =
        0;


    /* Jauge à zéro */

    if (loveSlider) {

        loveSlider.value = "0";

    }

    updateLove(0);


    /* Boutons verrouillés */

    if (nextToGift) {
        nextToGift.classList.remove("ready");
    }

    if (nextToLove) {
        nextToLove.classList.remove("ready");
    }

    if (loveContinue) {
        loveContinue.classList.remove("ready");
    }


    /* Musique arrêtée au chargement */

    if (music) {

        music.pause();

        music.currentTime = 0;

        music.volume = 0.35;

    }


    state.musicPlaying =
        false;


    updateMusicButton();


    console.log(
        "✨ Surprise initialisée avec succès !"
    );

}


/* ==========================
   ÉVITER LES ERREURS
   SI UN ÉLÉMENT MANQUE
========================== */

window.addEventListener(
    "error",
    (event) => {

        console.warn(
            "Une petite erreur JavaScript est survenue :",
            event.message
        );

    }
);


/* ==========================
   DÉMARRAGE
========================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();

}
