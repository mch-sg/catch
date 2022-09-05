/*
 * Dette script definerer klassen Kurv
*/

class Kurv {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, bredde, dybde, speed) {
        this.x = x;
        this.y = y;
        this.bred = bredde;
        this.dyb = dybde;
        this.speed = speed;
        this.col = [250,230,150];
    }   
    
    /* Tegner kurven. Her kan evt. sættes et billede ind i stedet
     */
    tegn = function() {
     //   fill(this.col);
      //  rect(this.x, this.y, this.bred, this.dyb);
        image(turbanBillede, this.x, this.y);
        noStroke();
    }

    flytKurv = function() {
        // flyt turbanen
        if (keyIsDown(UP_ARROW)) {
            this.moveY(-this.speed);
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.moveY(this.speed);
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.moveX(-this.speed);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.moveX(this.speed);
        } 
    }

    /* Flytter kurvens position
     */
    moveX = function(flyt) {
        this.x += flyt;
        if (this.x < 0) {this.x = 0;};
        if (this.x > width-this.bred) {this.x = width - this.bred;};
    }

    moveY = function(flyt) {
        this.y += flyt;
        if (this.y < 0) {this.y = 0;};
        if (this.y > height-this.dyb) {this.y = height - this.dyb;};
    }

    /* Tjekker om bolden/appelsinen er grebet ved at se om den rammer
     * "rent" ned gennem kurvens overkant. Parametrene er hhv. boldens
     * midtpunkts koordinater og boldens radius
     */
    grebet = function(frugt) {
        if ((frugt.y < this.y+7 && frugt.y > this.y-7) && frugt.x > this.x/*+frugt.bredde/2*/ && frugt.x < this.x+this.bred/*-frugt.bredde/2*/) {
            // Her spilles lyden, når turbaen griber en frugt
            grib.play();
            return true;
        }
        else {
            return false;
        }
    }

} 
