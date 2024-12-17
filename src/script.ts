//  Recuperation des elements du DOM

const inputLettre: HTMLInputElement = document.getElementById('input-lettre') as HTMLInputElement;
const btnValidation: HTMLButtonElement = document.getElementById('btn-validation') as HTMLButtonElement;
const zoneMotCache: HTMLParagraphElement = document.getElementById('mot-a-trouver') as HTMLParagraphElement;
const pendu: HTMLDivElement = document.getElementById('pendu') as HTMLDivElement;
const zoneEcriture: HTMLDivElement = document.getElementById('zone-ecriture') as HTMLDivElement;
const chanceRestantesP: HTMLParagraphElement = document.getElementById('chances') as HTMLParagraphElement;

// Let et Const

const alphabet: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

let chance = 6;
chanceRestantesP.textContent = chance.toString();
const motCache = getMot();
const tabMot = motCache.split('');
const tabCache = getTirets();

// Fonctions

function placerLettres(): void {
    for (let lettre of alphabet) {
        const btnLettre = document.createElement('button');
        btnLettre.setAttribute('id', lettre);
        btnLettre.textContent = lettre;
        zoneEcriture.append(btnLettre);
        btnLettre.addEventListener('click', function () { game(btnLettre) });
    }
}

function getMot(): string {
    return 'comme';
}

function getTirets() : string[] {
    const tableau : string[] = [];
    for (let lettre of tabMot) {
        tableau.push('_');
    }
    return tableau;
}

function game(btn: HTMLButtonElement): void {
    let lettre: string = btn.textContent!;
    if (tabMot.includes(lettre)) {
        while (tabMot.indexOf(lettre) != -1) {
            tabMot.splice(tabMot.indexOf(lettre), 1);
            console.log(tabMot);
        }
        btn.removeEventListener('click', function () {game(btn)});
        btn.remove();
    }
    else {
        chance--;
        chanceRestantesP.textContent = chance.toString();
        btn.removeEventListener('click', function () {game(btn)});
        btn.remove();
    }
}

placerLettres();
zoneMotCache.textContent = getTirets().join(' ');