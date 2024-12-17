//  Recuperation des elements du DOM

const inputLettre: HTMLInputElement = document.getElementById('input-lettre') as HTMLInputElement;
const btnValidation: HTMLButtonElement = document.getElementById('btn-validation') as HTMLButtonElement;
const zoneMotCache: HTMLParagraphElement = document.getElementById('mot-a-trouver') as HTMLParagraphElement;
const pendu: HTMLDivElement = document.getElementById('pendu') as HTMLDivElement;
const zoneEcriture: HTMLDivElement = document.getElementById('zone-ecriture') as HTMLDivElement;
const chanceRestantesP: HTMLParagraphElement = document.getElementById('chances') as HTMLParagraphElement;
const img: HTMLImageElement = document.getElementById('img') as HTMLImageElement;
const victoire: HTMLImageElement = document.getElementById('victoire') as HTMLImageElement;

// Let et Const

const alphabet: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// Mots
const mots: string[] = [
    "avion",
    "ordinateur",
    "maison",
    "voiture",
    "chat",
    "chien",
    "ordinateur",
    "fenetre",
    "foret",
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
    "legende",
    "magie",
    "sort",
    "etoile",
    "nuage",
    "drapeau",
    "paysage",
    "montagne",
    "cascade",
    "riviere",
    "ciel",
    "pluie",
    "neige",
    "tempete",
    "volcan",
    "ile",
    "ocean",
    "bateau",
    "chateau",
    "espace"
];


let chance: number;
let motCache: string;
let tabMot: string[];
let tabCache: string[];

// Fonctions

function placerLettres(): void {
    victoire.style.display = 'none';
    zoneEcriture.innerHTML = '';
    chance = 6;
    img.src = `../img/etape${chance}.png`;
    chanceRestantesP.textContent = `${chance.toString()} chances restantes`;
    motCache = getMot();
    tabMot = motCache.split('');
    tabCache = getTirets();
    zoneMotCache.textContent = tabCache.join(' ');

    for (let lettre of alphabet) {
        const btnLettre = document.createElement('button');
        btnLettre.setAttribute('id', lettre);
        btnLettre.textContent = lettre;
        zoneEcriture.append(btnLettre);
        btnLettre.addEventListener('click', function () { game(btnLettre) });
    }
}

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

// Fonction principale du jeu
function game(btn: HTMLButtonElement): void {
    let lettre: string = btn.textContent!;
    if (tabMot.includes(lettre)) {
        let found = 0;
        while (tabMot.indexOf(lettre) != -1) {
            console.log(found);
            const index = motCache.indexOf(lettre, found);
            found = index;
            tabCache[index] = lettre;
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
        zoneEcriture.innerHTML = '';
        zoneMotCache.textContent = `Perdu ! Le mot caché était "${motCache}"`;
        const btnRelancer: HTMLButtonElement = document.createElement('button');
        btnRelancer.textContent = 'Click ici pour relancer une partie !';
        zoneEcriture.innerHTML = '';
        zoneEcriture.append(btnRelancer);
        btnRelancer.addEventListener('click', function () { placerLettres() });
    }
    if (tabMot.length == 0) {
        victoire.style.display = 'block';
        const btnRelancer: HTMLButtonElement = document.createElement('button');
        btnRelancer.textContent = 'Click ici pour relancer une partie !';
        zoneEcriture.innerHTML = '';
        zoneEcriture.append(btnRelancer);
        btnRelancer.addEventListener('click', function () { placerLettres() });
    }
}

placerLettres();