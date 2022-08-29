/*
Først laver vi nogle variable til at lave nogle frugter:
 - objekter som vi vil skyde afsted og fange i en turban
*/

// Frugterne
let appelsin;
let lime;
let tomat;
let frugter; // Array til alle frugter



// Turbanen
let turban;
let turbanBillede;

// Øvrige
let tid = 150;
let score = 0;
let missed = 0;
let liv = 100; // 8
let spilIgang = true;   //flag
let vundet = false;
let tabt = false;
const col = [220,110,0]; // farven på gameOver teksten
const grav = 0.1; // tyngdekraften

function preload() {
    turbanBillede = loadImage('assets/basket.png');
}

/* 
 * 
 */
function setup() {  // kører kun en gang, når programmet startes
    createCanvas(750, 600);

    textAlign(CENTER, CENTER);

    //newspeed = yspeed;
    //x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(35, 500, 70, 50, 5); // 670, 100
    // parametrene til Frugt-konstruktøren er (x, y, bredde, dybde, xspeed, yspeed, farve)
    appelsin = new Frugt(random(50, 500), 25, 40, 40, 0, 0, [220,110,0], 1); // 30, 550
    lime = new Frugt(random(50, 500), 25, 20, 30, 0, 0, [110,220,0], 2); // 30, 530
    tomat = new Frugt(random(50, 500), 25, 40, 30, 0, 0, [220,0,0], 3); // 30, 510
    frugter = [appelsin, lime, tomat];

}

function draw() {
    background(240);
    
    if (spilIgang) {
        flytFrugter(); // flyt alle frugterne
        flytTurban();  // flyt turbanen
        checkScore(); // tjek om hver frugt er blevet grebet
        display(); // vis alle frugterne og turbanen
    }
    else {  // så er Game Over det der skal vises
        fill(col);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 50);
        
    }

    if(vundet) { 
        spilIgang = false;
        background(240);
        fill(col);
        textSize(46);
        text("Du har vundet!",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 55);
        textSize(20);
        text("MISS: "+missed, width/2, height/2 + - 65);
        winsong.play();
        song.stop();
    }

    if(tabt) {
        spilIgang = false;
        background(247);
        fill(col);
        textSize(46);
        text("Din taber!",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 55);
        textSize(20);
        text("MISS: "+missed, width/2, height/2 + - 65);
        song.stop();
    }
}

function display() {
    fill(0);
    textSize(12);
    text("Score: "+ score, width-80, 30);
    text("Liv: " + liv, width-160, 30);
    text("Miss: " + missed, width-240, 30);
    
    //Her skal vi sørge for at frugterne bliver vist, hvis de skal vises
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
            console.log("Frugt " + i + ": " + dist(frugter[i].x, frugter[i], turban.x, turban.y))
            if (turban.grebet(frugter[i])) {
                // frugter[i].smag tilføjer pointene (smag) til scoren (se: frugt.js class Frugt (smag))
                score += frugter[i].smag;
                frugter[i].shootNew(); 
            }
        }
    }
}


function keyPressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}




// lav en ny frugt
// tiløj til frugt array
function mouseClicked(event) {

    console.log(event);

    frugter[0].clickNew(); 
    return;

    /*
    for (let i = 0; i < frugter.length; i++) {
                frugter[2].clickNew(); 
                return;

    }  */
  } 

  mouseClicked();



/*
OPGAVER
 Opgave 1 - Lige nu er der tre frugter i arrayet - lav programmet om, sådan at når man 
            klikker på skærmen med musen, så spawnes der en ny frugt, der hvor man klikker,
            med tilfældig x- og y-hastighed. For at lægge den ind i frugter-arrayet skal man
            bruge   frugter.push(foo)  hvor foo er det objekt, man vil føje til. 
            Se gerne i "p5 Reference" hvordan, hvis ikke I kan huske det:   
            https://p5js.org/reference/

 Opgave 2 - Lav programmet om så frugterne starter i toppen af skærmen og falder ned derfra, gerne
            stadigvæk med en lille bue på

 Opgave 3 - Lav programmet om så frugterne kan give forskellige pointværdier til score

 Opgave 4 - Lav programmet om så nogle af frugterne kan give ekstra liv

 Opgave 5 - Lav programmet om så der er en liste af frugttyper, der kan dannes. Her kan det være
            relevant at bruge javascript objektnotation. Led på nettet efter hvordan det gøres, hvis 
            ikke I kan huske det

 Opgave 6 - Lav programmet om så frugter, der ikke gribes, går ud af spillet. Det betyder at I skal 
            fjerne dem fra frugter-arrayet. Det gøres med kommandoen frugter.splice() - se på nettet 
            hvordan, hvis ikke I kan huske det. Sørg for, at der dog altid er mindst een frugt i arrayet.
            Overvej hvilken konsekvens dette vil have for dynamikken (D) i spillet?       

 Opgave 7 - Lav programmet om så der spilles en lyd, når en frugt gribes, og en anden lyd, når en
            frugt misses. Knyt eventuelt forskellige lyde til forskellige frugttyper.

 Opgave 8 - Lav programmet om så der kan være to turbaner på skærmen med to forskellige spillere.
            Den ene bruger piltasterne, som nu - den anden skal brge WASD til at styre turbanen med.

 


*/
