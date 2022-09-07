/*
 * Dette script definerer klassen Frugt
*/

class Frugt {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, bredde, dybde, xspeed, yspeed, farve, smag, navn, nLiv) {
        this.nLiv = nLiv;
        this.navn = navn
        this.smag = smag;  // hvor mange point frugten skal give
        this.x = x;     // x-position
        this.y = y;     // y-position
        this.bred = bredde; 
        this.dyb = dybde;
        this.xspeed = xspeed;
        if (yspeed < - sqrt((y-15)*2*grav)) { this.yspeed = - sqrt((y-15)*2*grav); } else { this.yspeed = yspeed;} // Opnår højden
        this.col = farve;
        this.tid = random(20, 200); // Bestemmer, hvor langt tid den venter, inden den skydes afsted
    }   
    
    /* Tegner frugten. Her kan evt. sættes et billede ind i stedet
     */
    tegn = function() {
        if (this.tid < 25) { // hvor lang tid de er der
            fill(this.col);
            ellipse(this.x, this.y, this.bred, this.dyb);
            noStroke();
            //image(frugtBillede, this.x, this.y);
        }
    }

    /*
        flyt()  flytter frugten
    */
    flyt = function() {
        //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
        this.tid -= 1;
        if (this.tid <= 0) {
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.yspeed += grav;
        }

        // Hvis man misser frugten, man skal gribe i questen, bliver quest resultatet genstartet
        if (frugter[tilfaeldig].x > width || frugter[tilfaeldig].y > height) {
            questR = 0; 
            // Spil lyd
            miss.play();
            // Jeg logger her hvilken frugt, der er tabt
            console.log("frugten " + frugter[tilfaeldig].navn + " er tabt");
        }

        if (this.x > width || this.y > height) {
            missed += this.smag;
            missed += this.nLiv;
            miss.play();
            // frugter[i].smag fjerner smagen fra liv (se: frugt.js class Frugt (smag))
            liv -= this.smag;
            liv -= this.nLiv;
            if (liv < 1) {
                spilIgang = false;
            }
            this.shootNew();
        }


        if (score >= 100) {
            vundet = true;
        } if (missed >= 50) {
            tabt = true;
        }
    } 

    shootNew = function() {
        //Her skal vi sørge for at frugten skydes afsted igen 
        let newY = random(50, 100); // random(480, 560)
        let newYSpeed = - sqrt((newY-15)*2*grav);
        this.x = random(50, 500);
        this.y = 25;
        this.xspeed = 0;
        this.yspeed = 0;
        this.tid = random(20, 200); // Bestemmer, hvor hurtigt den skal spawne en ny frugt´
    }

    clickNew = function() {
        //Her skal vi sørge for at frugten skydes afsted igen 
        let newY = random(480, 560);
        let newYSpeed = - sqrt((newY-15)*grav);
        this.x = mouseX; // 20
        this.y = mouseY; // newY
        this.xspeed = random(5) ;
        this.yspeed = newYSpeed ;
        this.tid = 0;
    }

    mousemove = function(event) {
        console.log("pageX: ",event.pageX, 
        "pageY: ", event.pageY, 
        "clientX: ", event.clientX, 
        "clientY:", event.clientY)
    }
    

} 

