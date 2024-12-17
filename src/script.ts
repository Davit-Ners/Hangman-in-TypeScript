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

// Fonctions

function placerLettres(): void {
    for (let lettre of alphabet) {
        const btnLettre = document.createElement('button');
        btnLettre.setAttribute('id', lettre);
        btnLettre.textContent = lettre;
        zoneEcriture.append(btnLettre);
    }
}

function getMot(): string {
    return 'comme';
}

placerLettres();