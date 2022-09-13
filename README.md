<img src="https://user-images.githubusercontent.com/93657779/188674370-55c45736-6884-4b52-8f27-3fb3d9c955c2.png" height="100" width="100">



# Appelsiner i haven
Brush-up kursus af p5 og programmering færdigheder i starten af et nyt år med Digital Teknik.

Pointen med dette spil er at tilpasse og videreudvikle denne skabelon for at gøre den anderledes, end den startede med at være.

<br />

[GitHub](https://github.com/mch-sg/catch)

[Afprøv spillet her (hvis zip index ikke virker)](https://mch-sg.github.io/catch/)


I dette spil skal du fange de forskellige frugter for at få point. Hvis du fanger nok point, kan du vinde spillet, men hvis du taber for mange point, taber du. I løbet af spillet kan du udføre quests, der giver spilleren bonuspoint. Det er op til spilleren at beslutte, om det er værd at udføre disse quests.

<br />

Jeg vil tilføje:
1. Quests (missioner), hvor man kan optjene flere point
2. Bomber, som der dræber spilleren
3. Startside, så spillet ikke starter med det samme
4. Retry knap
5. Lyde (sense-pleasure)
6. Frugt, der giver dig liv

Nu vil jeg uddybe min grund til, at jeg vil tilføje disse funktioner vha. MDA.

<br />
<br />

## Mit spil i MDA-funktion
Mekanik, Dynamik, Æstetik

Jeg vil vise fra brugeroplevelsen, altså fra Aesthetics til Mechanics.


### Æstetik
Med hensyn til æstetik (følelsesmæssig respons) vil jeg bygge videre på mit spil ...

**1. Challenge (obstacle)**

Som en førsteprioritering vil jeg gøre spillet til en udfordring (forhindringsbane), hvis jeg har tid til at udvide spillet, vil jeg yderligere tilføje sense-pleasure.

Jeg vil gerne tilføje bomber, der dræber spilleren helt. Hvis man ikke griber bomben, mister man ikke noget liv. Her kan du også gøre selve smagsvariablen bedre med hensyn til at vise, hvilke der giver specifikke punkter (måske i form af farve). Denne bombe vil gøre spillet sværere, og en større udfordring.

Jeg vil skabe quests, der får spilleren til at forsøge at fange visse frugter, og dermed skabe en større udfordring sammen med bomben.


**2. Sensation (sense-pleasure)**

Hvis jeg har tid, vil jeg skabe oplevelseslyde for spilleren, når man vinder en quest, når man får et point, og når man taber et point. Måske endda baggrundsmusik.

Derudover skal det visuelle skabe en oplevelse, så du oplever noget visuelt interessant at se på (i forhold til baggrund og hele spillet).

Jeg vil gerne tilføje en startskærm, hvilket ville gøre spillet mere visuelt tiltalende. Jeg ønsker også at gøre challenge til det primære mål, så bomberne og missionerne skal se bedre ud som en prioritet. Derfor ønsker jeg *ikke* at tilføje en baggrund i selve spillet, da det er svært at bruge en baggrund, der ikke trækker din opmærksomhed væk fra det primære mål, nemlig at være en udfordring.

Jeg vil gerne tilføje en mere interessant font til startmenuen samt retry knappen. Jeg tænker umiddelbart at gøre dette ved at indsætte teksten som et billede i stedet, da JavaScript ikke har de fonts, jeg vil bruge.

<br />

### Dynamics
Med hensyn til dynamik (spillerinput) vil jeg bygge videre på mit spil...

Spilleren skal være i stand til at forstå de forskellige frugter, og skal være i stand til at opnå de quests, der er lavet i mekanik. For eksempel kan der være en quest, hvor spilleren skal gribe 3 appelsiner i træk. Når spilleren har grebet 3 appelsiner, får du bonuspoint som belønning.

Spilleren bliver nødt til at få fat i de 3 appelsiner i træk, men spilleren kan stadig få fat i andre frugter uden at miste streaken. Spilleren kan ikke gå glip af en appelsin, mens han udfører questen, eller hele questen nulstilles.

Disse quests skal også komme op gradvist, man skal bare være i stand til at udføre 1 quest ad gangen.

Du bør ikke være i stand til at tabe, hvis du ikke opnår disse quests. Det er bare bonuspoint, hvis du ønsker det.

Du skal kunne dø af en bombe, hvis du griber den i kurven. 

Når du mister for mange frugter, skal du kunne tabe. Hvis du fanger nok frugter, skal du være i stand til at vinde. På disse skærme skal du være i stand til at prøve igen via. en knap.

<br />

### Mechanics
Med hensyn til mekanik (regler, grundlæggende komponenter, handling) vil jeg bygge videre på mit spil ...

Det skal være klart for spilleren, at visse frugter giver flere point end andre ved hjælp af farver.

Jeg vil oprette quests, så spilleren kan optjene bonuspoint, hvilket giver spilleren mere formål, og spillet bliver mere engagerende.


<br />
<br />

## Credits
- [Freesound](https://freesound.org/people/EVRetro/)
