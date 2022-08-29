/*
 * Dette script definerer klassen Frugt
*/

class Frugt {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, bredde, dybde, xspeed, yspeed, farve, smag) {
        this.smag = smag;  // hvor mange point skal denne frugt give? Fast værdi: 1
        this.x = x;     // x-position
        this.y = y;     // y-position
        this.bred = bredde; 
        this.dyb = dybde;
        this.xspeed = xspeed;
        if (yspeed < - sqrt((y-15)*2*grav)) {
            this.yspeed = - sqrt((y-15)*2*grav);
        } else {
            this.yspeed = yspeed;
        }
        this.col = farve;
        this.tid = random(400); //tidsforsinkelsen før frugten vises og afskydes
    }   
    
    /* Tegner frugten. Her kan evt. sættes et billede ind i stedet
     */
    tegn = function() {
        if (this.tid < 100) {
            fill(this.col);
            ellipse(this.x, this.y, this.bred, this.dyb);
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
        if (this.x > width || this.y > height) {
            missed += 1;
            // frugter[i].smag fjerner smagen fra liv (se: frugt.js class Frugt (smag))
            liv -= this.smag;
            if (liv < 1) {
                spilIgang = false;
            }
            this.shootNew();
        }
    }

    shootNew = function() {
        //Her skal vi sørge for at frugten skydes afsted igen 
        let newY = random(50, 100); // random(480, 560)
        let newYSpeed = - sqrt((newY-15)*2*grav);
        this.x = 30;
        this.y = newY;
        this.xspeed = random(4) ;
        this.yspeed = 0 ;
        this.tid = random(400);
    }

    clickNew = function() {
        //Her skal vi sørge for at frugten skydes afsted igen 
        let newY = random(480, 560);
        let newYSpeed = - sqrt((newY-15)*2*grav);
        this.x = mouseX; // 20
        this.y = mouseY; // newY
        this.xspeed = random(4) ;
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
