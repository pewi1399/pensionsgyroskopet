// http://www.machinedlearnings.com/2011/07/fast-approximate-lambert-w.html
// https://github.com/protobi/lambertw
// http://math.stackexchange.com/questions/463055/approximation-to-the-lambert-w-function
// http://math.stackexchange.com/questions/119114/lambert-w-product-log-function

//pensionsequation

// P pensionsnivå
// endogen faktor

// A = avgift
Avgift = 5550

// r = ränta
ranta = 0.017

// t = antal år
tid = 42

// mu = arvsvinster
mu = 1

// D delningstal
Delningstal = 16.24

P1 = (Avgift*Math.exp((ranta*tid))*(Math.exp((-ranta*tid)) - 1))*mu

P2 = -ranta

P3 = P1/P2

//utbetalning per månad
P4 = P3/Delningstal/12
//----------------------------- tommys modell ----------------------------------

// Solve for P
P_org = ((Avgift*Math.exp((ranta*tid))*(Math.exp((-ranta*tid)) - 1)) * mu)/-ranta/Delningstal/12
//------------------------------------------------------------------------------

// Solve for A
A_org = (P_org*12*Delningstal*-ranta)/mu/(Math.exp((ranta*tid))*(Math.exp((-ranta*tid)) - 1))

// wolfram A = (P*12*D*-R)/M/((e^(R*T))*(e^((-R*T)) - 1)) solve for P
//------------------------------------------------------------------------------
T_org = Math.log((P4*12*Delningstal*ranta)/(Avgift+mu)+1)/ranta

// solve for T (suck!)
/*
FÖRKLARANDE POPUPTEXTER
Vid tickboxarna till vänster:  Markera denna ruta för att låsa det värde du valt och endast övriga reglage påverkas när du ändrar värdena i ett reglage.
Vid respektive reglage:
Önskad ålder: Här kan du ändra den ålder du vill gå i pension för att se hur det påverkar pensionsutbetalning respektive sparande per månad.
Pensionsutbetalning: Här kan du ändra det belopp du önskar få ut i pension och se hur det påverkar pensionsålder respektive sparande per månad.
Sparande: Här kan du ändra ditt sparande och se hur det påverkar pensionsutbetalning respektive pensionsålder.
Gröna stapeln: Här kan du se hur din inkomst att leva på idag (före skatt) påverkas när du sparar mer eller mindre till din pension  (Detta reglage kan du endast ändra genom de andra tre reglagen)

RÖDA VARNINGSTEXTER:
Gröna stapeln: Inkomst idag. Observera att du valt att spara mindre än de 18,5% som du/din arbetsgivare sparar idag enligt det pensionssystem som gäller idag. Detta val är möjligt i denna snurra om du vill visa att du vill ha mer pengar att leva för idag än du har och kan tänka dig en lägre pension än den du  skulle få enligt dagens pensionssystem.
Gränserna i åldersreglaget: Observera att du valt en pensionsutbetalning som innebär att du måste arbeta längre än 75 år som vi satt som gräns i denna snurra.
Observera att du valt en pensionsutbetalning som innebär att du skulle gå i pension innan du är 55 år som vi satt som åldersgräns i denna snurra.

*/
