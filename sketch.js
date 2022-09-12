/*
Først laver vi nogle variable til at lave nogle frugter:
 - objekter som vi vil skyde afsted og fange i en turban
*/

// Definerer frugterne
let appelsin;
let granataeble;
let tomat;
let blabaer;
let bombe;
let frugter; // Array til alle frugterne

// Random p5 function, mellem 2 værdier for quests catch random
function mellem(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Turbanen
let turban;
let turbanBillede;

// Teksten i startmenuen
let startImg;
let startHead;
let startEnter;
let startImg2;
let provIgen;


// Quest array til display (forskellige quests)
let quest = [" appelsiner i streg. ", " granatæbler i streg. ", " tomater i streg. ", " blåbær i streg. "];
// Quest resultatet
let questR = 0; 
// Quests definerer de forskellige værdier (hvor mange man skal gribe) og (hvilken frugt) sammen med det specifikke array quest
let quests = [
    {fruit: "appelsin", catch: mellem(2,5), Pts: 10}, // catch: 3
    {fruit: "granatæblr", catch: mellem(3,6), Pts: 20}, // catch: 6
    {fruit: "tomat", catch: mellem(6,9), Pts: 30}, // catch: 9
    {fruit: "blåbær", catch: mellem(3,9), Pts: 0, Liv: 10}, // catch: 9
];

// Variablen der giver spilleren en random quest fra quests arrayet (forbindes også med quest arrayet)
let tilfaeldig = Math.floor(Math.random() * quest.length); 

// En funktion, der laver en random quest på kaldet nyRandom()
function tilfaeldig2() { // const tilfaeldig2 = () => {
    return Math.floor(Math.random() * quest.length);
}

// Funktion der laver en ny random quest, når spilleren har gjort den forrige
function nyRandom() {
    tilfaeldig2();
    console.log(tilfaeldig2());
    tilfaeldig = tilfaeldig2();
}

// Tjekker, om mine værdier passer med de værdier, der er i quests arrayet
console.log(quest[tilfaeldig]);
console.log(tilfaeldig);
console.log(tilfaeldig2());

console.log("q l: " + quest.length);
console.log("qs l: " + quests.length);


// Øvrige
let tid = 150;
let score = 0;
let missed = 0;
let liv = 50; // 8
let spilIgang = false;   //flag
let vundet = false;
let tabt = false;
const col = [255,99,71]; // farven på gameOver teksten
const grav = 0.12; // tyngdekraften // 0.1

let menu = true;


// Preloader alle mine billeder
function preload() {
    turbanBillede = loadImage('assets/basket.png');
    startImg = loadImage('assets/startside.png'); 
    startImg2 = loadImage('assets/startside2.png'); 
    startHead = loadImage('assets/startside-t1.png');
    startEnter = loadImage('assets/startside-t2.png');
    provIgen = loadImage('assets/provigen-t.png');
}


/* 
 * 
 */
function setup() {  // kører kun en gang, når programmet startes
    createCanvas(850, 650); // 750, 600

    textAlign(CENTER, CENTER);


    /*
    LYD LAVES FREMADRETTET
    */

    // Her laves lydene til spillet. Variablen song er baggrundsmusikken.
    song = createAudio('assets/intro-music.wav');
    song.volume(0.5); 

    // Her laves vinderlyden.
    winsong = createAudio('assets/i-win.wav');
    winsong.volume(0.3);

    // Her laves taberlyden.
    losesong = createAudio('assets/i-lose.wav');
    losesong.volume(0.3);

    // Her laves lyden, når turbaen griber en frugt
    grib = createAudio('assets/i-catch.wav');
    grib.volume(0.5);

    // Her laves lyden, når turbaen misser en frugt
    miss = createAudio('assets/i-miss.wav');
    miss.volume(0.5); 


    /*
    FRUGTER LAVES FREMADRETTET
    */

    //newspeed = yspeed;
    //x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(50, 425, 100, 100, 5); // 670, 100
    // parametrene til Frugt-konstruktøren er (x, y, bredde, dybde, xspeed, yspeed, farve, smag, navn, nLiv)
    appelsin = new Frugt(random(25, 650), 25, 40, 40, 0, 0, [247,192,21], 1, "appelsin", 0);
    granataeble = new Frugt(random(25, 650), 25, 37, 40, 0, 0, [255, 187, 180], 2, "granatæble", 0);
    tomat = new Frugt(random(25, 650), 25, 40, 35, 0, 0, [255,99,71], 3, "tomat", 0); 
    blabaer = new Frugt(random(25, 650), 25, 25, 20, 0, 0, [79,134,247], 0, "blåbær", 1);
    
    bombe = new Frugt(random(25, 650), 25, 30, 30, 0, 0, [60,60,60], 0, "bombe", 0); 
    
    // Arrayet frugter kalder de forskellige
    frugter = [appelsin, granataeble, tomat, blabaer, bombe];

}


function draw() { 
   background(245); // Tegner baggrunden // 245

    if (spilIgang) {
        flytFrugter(); // flyt alle frugterne
        flytTurban();  // flyt turbanen
        checkScore(); // tjek om hver frugt er blevet grebet
        display(); // vis alle frugterne og turbanen
    }

    // Menuen laves inden spillet er i gang
    if(menu) {
        background(startImg); // Tegner baggrundensbilledet af menuen
        // Følgende tegner "billedet" som er h1 teksten
        // "Appelsiner I Haven" ved startmenuen
        image(startHead, width/2 - 310 + random(-1,1),height/2 - 50 + random(1),600,95);
        // Følgende tegner "billedet" som er start teksten
        // "START SPILLET (ENTER)" ved startmenuen
        image(startEnter, width/2 - 135,height/2 + 90,263,19);
    }  

    // Hvis spilleren har vundet, skal SpilIgang være false, 
    // og baggrundsskærmen skal køre, samt teksten.
    if(vundet) { 
        spilIgang = false;
        background(245); fill(col);
        textSize(65); textFont('Arial');
        text("Du har vundet!",width/2 + random(-0.5,0.5), height/2 + random(1)); 
        textSize(18);
        text("Score: "+score+"ㅤㅤ Miss: "+missed, width/2, height/2 - 70);
        // Her tegnes "billedet", som er prøv igen teksten
        // De sidste variabler (226, 19) er størrelsen af billedet
        image(provIgen, width/2 - 115,height/2 + 70, 226, 19);

        // Her skal vi sørge for at lyden afspilles
        winsong.play();
        song.stop();
    } 

    // Hvis spilleren har tabt, skal SpilIgang være false, og baggrundsskærmen skal køre, samt teksten.
    if(tabt) {
        spilIgang = false;
        background(245); fill(col);
        textSize(65); textFont('Arial');
        text("Din taber!",width/2 + random(-0.5,0.5), height/2 + random(1)); 
        textSize(18);
        text("Score: "+score+"ㅤㅤ Miss: "+missed, width/2, height/2 - 70);
        // Her tegnes "billedet", som er prøv igen teksten
        // De sidste variabler (226, 19) er størrelsen af billedet
        image(provIgen, width/2 - 115,height/2 + 70, 226, 19);

        // Her skal vi sørge for at lyden afspilles
        losesong.play();
        song.stop();
    }

}


// Funktionen, der definerer at man skal trykke enter for at starte spillet, og der genstarter spillet til de normale værdier
function keyPressed() {
    if (spilIgang == false) {
        if (keyCode === 13) { // 87 = W // 32 = SPACE // 13 = ENTER
            clear();
            vundet = false; tabt = false; menu = false;
            losesong.stop(); winsong.stop();

            tid = 150; score = 0; missed = 0; liv = 50; 

            nyRandom();
            setup();

            spilIgang = true;
            song.play();
        }
    }

    
}


// Display følgende tekst / frugter 
function display() {
    fill(0);
    textSize(14); // 12
    text("Score: "+ score, width-80, 40);
    text("Liv: " + liv, width-160, 40); 
    text("Miss: " + missed, width-240, 40); 
    // Her vises mine quests i spillet
    if (quests[tilfaeldig].Pts >= 1) {
    text("Quest: " + "Grib " + quests[tilfaeldig].catch + quest[tilfaeldig] + questR + "/" + quests[tilfaeldig].catch + " (" + quests[tilfaeldig].Pts + " pts.)", width-170, 600); // width-160, 550
    }
    if (quests[tilfaeldig].Liv >= 1) {
        text("Quest: " + "Grib " + quests[tilfaeldig].catch + quest[tilfaeldig] + questR + "/" + quests[tilfaeldig].catch + " (" + quests[tilfaeldig].Liv + " liv)", width-170, 600); // width-640, 30 // width/5, 30
    }
    
    // Her skal vi sørge for at frugterne bliver vist, hvis de skal vises
    for (let i = 0; i < frugter.length; i++) {
        frugter[i].tegn();
    }    

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn(); 
}



function flytTurban() {
    // Denne funktion kalder bare videre til Kurv-klassen
    turban.flytKurv();
}
    
function flytFrugter() {
    //Her skal vi sørge for at frugterne bevæger sig, hvis de er startet
    for (let i = 0; i < frugter.length; i++) {
        frugter[i].flyt();
    }

}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    for (let i = 0; i < frugter.length; i++) {
        
        if (frugter[i].yspeed > 0) {

            // frugten defineret ved quests er den samme som frugten, der kastes
            quests[tilfaeldig].fruit = frugter[tilfaeldig];


            // Tjek frugter i og tilfaeldig
            if(frugter[i] === frugter[tilfaeldig]) {
                console.log("frugter i = frugter tilfaeldig");
            } 

            // Hvis den har grebet en frugt, skal den tjekke følgende
            if (turban.grebet(frugter[i])) {
                // Hvis frugten, der grebes, er den frugt, der er i questen, så skal quest resultatet gå op
                if (turban.grebet(quests[tilfaeldig].fruit)) {  // turban.grebet(frugter[tilfaeldig])
                    // quest resultat bliver højere
                    questR++; 
                    // Jeg logger her, hvilken frugt der er blevet grebet, og hvilken frugt der er i questen
                    console.log("frugt grebet: " + frugter[i].navn);
                    console.log("frugt questen: " + frugter[tilfaeldig].navn);
                } else {
                    // Hvis frugten ikke er den samme som i questen, så skal quest resultatet genstartes
                //    questR = 0; 
                    // Jeg logger her hvilken frugt, der er grebet (miss1), og hvilken frugt, der er i questen (miss2)
                    console.log("miss grebet: " + frugter[i].navn);
                    console.log("miss questen: " + frugter[tilfaeldig].navn )
                }
            } 

            // Hvis quest resultatet er det samme som antal gribet, skal man få belønningen og dernæst resette
            if(questR === quests[tilfaeldig].catch) {
                if(quests[tilfaeldig].catch >= 1) {
                    // Belønning gives til scoren
                    score += quests[tilfaeldig].Pts;
                    // Spil lyd
                    winsong.play();
                } if (quests[tilfaeldig].Liv >= 1) {
                    // Belønning gives til scoren
                    liv += quests[tilfaeldig].Liv;
                    // Spil lyd
                    winsong.play();
                }
                // quest resultat genstartes til ny quest
                questR = 0;
                // når quest er klaret, skal en ny quest afspilles. Herved function nyRandom.
                nyRandom(); 

            }

            // Spilleren har tabt, hvis personen greber bomben (frugt 4)
            if(turban.grebet(frugter[4])) {
                tabt = true;
            }

            //  Hvis turban har grebet en frugt (efter at tjekke quests), så skal scoren op.
            if (turban.grebet(frugter[i])) { 
                // frugter[i].smag tilføjer pointene (smag) til scoren (se: frugt.js class Frugt (smag))
                score += frugter[i].smag;
                liv += frugter[i].nLiv;

                // Her skydes en ny frugt afsted
                frugter[i].shootNew(); 
            }
        }
        
    }

}


/*
Definerer hvor mange point man skal få ud fra 
hvor mange frugter man skal gribe i QUESTS
*/

// Appelsiner (2,5)
if(quests[0].catch >= 4) { 
    quests[0].Pts = 8;
} else if(quests[0].catch <= 2) {
    quests[0].Pts = 2;
} else {
    quests[0].Pts = 5;
}

// Limes (3,6)
if(quests[1].catch >= 5) { 
    quests[1].Pts = 13;
} else if(quests[1].catch <= 3) {
    quests[1].Pts = 7;
} else {
    quests[1].Pts = 10;
}

// Tomater (6,9)
if(quests[2].catch > 8) { 
    quests[2].Pts = 25;
} else if(quests[2].catch <= 7) {
    quests[2].Pts = 15;
} else { // 8 
    quests[2].Pts = 20;
}

// Blåbær (3,9)
if(quests[3].catch > 6) { 
    quests[3].Liv = 10;
} else {
    quests[3].Liv = 5;
}



// når musen holdes nede, skal nr. 0 i arrayet
// frugter afspille funktionen clickNew fra frugt.js
function mouseClicked() {

    frugter[tilfaeldig].clickNew(); 
    return;
  }  

