// http://www.machinedlearnings.com/2011/07/fast-approximate-lambert-w.html
// https://github.com/protobi/lambertw
// http://math.stackexchange.com/questions/463055/approximation-to-the-lambert-w-function
// http://math.stackexchange.com/questions/119114/lambert-w-product-log-function

//pensionsequation

// P pensionsnivå
// endogen faktor

// A = avgift
Avgift = 16092

// r = ränta
ranta = 0.017

// t = antal år
tid = 40

// mu = arvsvinster
mu = 1

// D delningstal
Delningstal = 14.53

P1 = (Avgift*Math.exp((ranta*tid))*(Math.exp((-ranta*tid)) - 1))*mu

P2 = -ranta

P3 = P1/P2

P4 = P3/Delningstal

lhs = (P3*Delningstal*tid)
rhs = Avgift * Math.exp(ranta*tid) * (Math.exp(-ranta*tid) -1)/(-ranta)
