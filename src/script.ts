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

// Fonctions

// Fonction pour placer les boutons avec les lettres
function placerLettres(): void {
    victoire.style.display = 'none';
    gameOver.style.display = 'none';
    gameOver.style.animation = '';
    zoneEcriture.innerHTML = '';
    chance = 6;
    img.src = `../img/etape${chance}.png`;
    chanceRestantesP.textContent = `${chance.toString()} chances restantes`;
    scoreAffile.textContent = `Vous avez pour l'instant un total de ${score} victoires d'affilés`;
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
        btnLettre.addEventListener('click', function () { game(btnLettre) });
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
    btnRelancer.addEventListener('click', function () { placerLettres() });
}

// Fonction lors d'une défaite
function loose(): void {
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
    score++;
    victoire.style.display = 'block';
    relancerPartie();
}


// Fonction principale du jeu
function game(btn: HTMLButtonElement): void {
    let lettre: string = btn.textContent!;
    if (tabMot.includes(lettre)) {
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
        btn.removeEventListener('click', function () { game(btn) });
        btn.remove();
        zoneMotCache.textContent = tabCache.join(' ');
    }
    else {
        chance--;
        chanceRestantesP.textContent = `${chance.toString()} chances restantes`;
        btn.removeEventListener('click', function () { game(btn) });
        btn.remove();
        img.src = `../img/etape${chance}.png`;
    }
    if (chance == 0) {
        loose();
    }
    else if (tabMot.length == 0) {
        win();
    }
}

placerLettres();