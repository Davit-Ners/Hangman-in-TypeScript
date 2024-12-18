// (function() {
//  Recuperation des elements du DOM

const inputLettre: HTMLInputElement = document.getElementById('input-lettre') as HTMLInputElement;
const btnValidation: HTMLButtonElement = document.getElementById('btn-validation') as HTMLButtonElement;
const zoneMotCache: HTMLParagraphElement = document.getElementById('mot-a-trouver') as HTMLParagraphElement;
const pendu: HTMLDivElement = document.getElementById('pendu') as HTMLDivElement;
const zoneEcriture: HTMLDivElement = document.getElementById('zone-ecriture') as HTMLDivElement;
const chanceRestantesP: HTMLParagraphElement = document.getElementById('chances') as HTMLParagraphElement;
const img: HTMLImageElement = document.getElementById('img') as HTMLImageElement;
const victoire: HTMLImageElement = document.getElementById('victoire') as HTMLImageElement;
const scoreAffile: HTMLParagraphElement = document.getElementById('score-affile') as HTMLParagraphElement;
const gameOver: HTMLImageElement = document.getElementById('game-over') as HTMLImageElement;
const timer: HTMLParagraphElement = document.getElementById('timer') as HTMLParagraphElement;
const oneShot: HTMLInputElement = document.getElementById('one-shot') as HTMLInputElement;
const btnOneShot: HTMLButtonElement = document.getElementById('btn-one-shot') as HTMLButtonElement;
const plus5: HTMLDivElement = document.getElementById('p5') as HTMLDivElement;
const moins5: HTMLDivElement = document.getElementById('m5') as HTMLDivElement;

// Let et Const

const alphabet: string[] = getAlphabet();

const mots: string[] = [
    "avion",
    "ordinateur",
    "maison",
    "voiture",
    "chat",
    "chien",
    "ordinateur",
    "fenêtre",
    "forêt",
    "plage",
    "soleil",
    "lune",
    "arbre",
    "montagne",
    "mer",
    "papillon",
    "fleur",
    "vache",
    "cheval",
    "pomme",
    "banane",
    "orange",
    "cerise",
    "fraise",
    "reine",
    "roi",
    "princesse",
    "pirate",
    "aventure",
    "histoire",
    "légende",
    "magie",
    "sort",
    "étoile",
    "nuage",
    "drapeau",
    "paysage",
    "montagne",
    "cascade",
    "rivière",
    "ciel",
    "pluie",
    "neige",
    "tempête",
    "volcan",
    "île",
    "océan",
    "bateau",
    "château",
    "espace"
];

let chance: number;
let motCache: string;
let tabMot: string[];
let tabCache: string[];
let score: number = 0;
let motDouble: string;
let chrono: number = -1;
let secondesRestantes: number = 30;

// Fonctions

// Fonction pour reset les paramètres
function resetDom(): void {
    victoire.style.display = 'none';
    gameOver.style.display = 'none';
    gameOver.style.animation = '';
    zoneEcriture.innerHTML = '';
    timer.textContent = `00:${String(secondesRestantes)}`;
    timer.style.color = 'black';
    chance = 6;
    img.src = `../img/etape${chance}.png`;
    chanceRestantesP.textContent = `${chance.toString()} chances restantes`;
    scoreAffile.textContent = `Vous avez pour l'instant un total de ${score} victoires d'affilés`;
    oneShot.value = '';
}

// Fonction pour placer les boutons avec les lettres
function start(): void {
    secondesRestantes = 30;
    resetDom();

    motCache = getMot();
    motDouble = motCache.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    tabMot = motDouble.split('');
    tabCache = getTirets();
    zoneMotCache.textContent = tabCache.join(' ');

    for (let lettre of alphabet) {
        const btnLettre = document.createElement('button');
        btnLettre.setAttribute('id', lettre);
        btnLettre.textContent = lettre;
        btnLettre.className = 'bttn';
        zoneEcriture.append(btnLettre);
        btnLettre.addEventListener('click', game);
    }

    btnOneShot.addEventListener('click', oneShotFunc)
}

// Fonction pour le one shot
function oneShotFunc(ev: Event): void {
    const btn = ev.target as HTMLButtonElement;

    if (oneShot.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') == motCache.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
        btn.removeEventListener('click', oneShotFunc);
        win();
    }
    else {
        btn.removeEventListener('click', oneShotFunc);
        loose();
    }
}

// Fonction pour avoir un tableau des lettres de l'alphabet
function getAlphabet(): string[] {
    let tabLettres: string[] = [];
    for (let i = 65; i <= 90; i++) {
        tabLettres.push(String.fromCharCode(i + 32));
    }
    return tabLettres;
}

// Fonction pour tirer aléatoirement un mot
function getMot(): string {
    return mots[Math.floor(Math.random() * mots.length)];
}

// Fonction pour avoir un tableau de tirets pour le mot caché a afficher
function getTirets(): string[] {
    const tableau: string[] = [];
    for (let lettre of tabMot) {
        tableau.push('_');
    }
    return tableau;
}

// Fonction pour relancer la partie
function relancerPartie(): void {
    const btnRelancer: HTMLButtonElement = document.createElement('button');
    btnRelancer.textContent = 'Click ici pour relancer une partie !';
    zoneEcriture.innerHTML = '';
    zoneEcriture.append(btnRelancer);
    btnRelancer.addEventListener('click', function () { start() });
}

// Fonction lors d'une défaite
function loose(): void {
    clearInterval(chrono);
    chrono = -1;
    gameOver.style.display = 'block';
    gameOver.style.animation = 'app 2s ease';
    if (score > 0) {
        score = 0;
        scoreAffile.textContent = `Haha ! Vous retombez à ${score} victoires d'affilés`;
    }
    score = 0;
    zoneEcriture.innerHTML = '';
    zoneMotCache.textContent = `Perdu ! Le mot caché était "${motCache}"`;
    relancerPartie();
}

// Fonction lors d'une victoire
function win(): void {
    clearInterval(chrono);
    chrono = -1;
    score++;
    victoire.style.display = 'block';
    relancerPartie();
}

// Fonction pour checker si la lettre cliquée fait parti du mot caché
function checkSiBonneLettre(lettre: string): void {
    let found = 0;
    while (tabMot.indexOf(lettre) != -1) {
        console.log(found);
        const index = motDouble.indexOf(lettre, found);
        found = index;
        tabCache[index] = motCache[index];
        tabMot.splice(tabMot.indexOf(lettre), 1);
        console.log(tabMot);
        found++;
    }
}

// Fonction pour gerer le timer
function setTimer(): void {
    let secondesEcoules: number = 0;
    let go: number = Date.now();

    chrono = window.setInterval(function () {
        secondesEcoules = Math.floor(Date.now() / 1000 - go / 1000);
        timer.textContent = `00:${String(secondesRestantes - secondesEcoules).padStart(2, '0')}`;
        if (secondesRestantes - secondesEcoules > 10) {
            timer.style.color = 'black';
        }
        else if (secondesRestantes - secondesEcoules < 10) {
            timer.style.color = 'red';
        }
        if (secondesRestantes - secondesEcoules <= 0) {
            timer.textContent = `00:00`;
            clearInterval(chrono);
            loose();
        }
    }, 1);
}

// Fonction +5
function p5(): void {
    secondesRestantes += 5;
    plus5.style.visibility = 'inherit';
    plus5.style.animation = 'appPointV 1s ease';
    setTimeout(function () {
        plus5.style.visibility = 'hidden';
        plus5.style.animation = '';
    }, 500);
}

// Fonction -5
function m5(): void {
    secondesRestantes -= 5;
    moins5.style.visibility = 'inherit';
    moins5.style.animation = 'appPointR 1s ease';
    setTimeout(function () {
        moins5.style.visibility = 'hidden';
        moins5.style.animation = '';
    }, 500);
}

// Fonction principale du jeu
function game(ev: Event): void {

    const btn = ev.target as HTMLButtonElement;

    if (chrono == -1) {
        setTimer();
    }
    let lettre: string = btn.textContent!;
    if (tabMot.includes(lettre)) {
        checkSiBonneLettre(lettre);
        btn.removeEventListener('click', game);
        btn.disabled = true;
        zoneMotCache.textContent = tabCache.join(' ');
        p5();
    }
    else {
        chance--;
        chanceRestantesP.textContent = `${chance.toString()} chances restantes`;
        btn.removeEventListener('click', game);
        btn.disabled = true;
        img.src = `../img/etape${chance}.png`;
        m5();
    }
    if (chance == 0) {
        loose();
    }
    else if (tabMot.length == 0) {
        win();
    }
}

start();
// })();