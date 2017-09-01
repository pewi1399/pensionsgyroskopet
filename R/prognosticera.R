rm(list = ls())

require(forecast)
require(ggplot2)
require(dplyr)
library(caret)

# bygg prognos 
dat <- openxlsx::read.xlsx("data/typfallsdata_med_simulering.xlsx", sheet = 2)
names(dat)

# Önskad pseudomodell
# Bruttopension ~ Årslön + födelseår + går i pension vid ålder
model1 <- glm(Bruttopension~ arslon + 
                fodar + 
                pensionar+ 
                arslon^2 + 
                fodar^2 + 
                pensionar^2 +
                pensionar*arslon +
                pensionar*fodar*arslon,
              data = dat)

p1 <- predict(model1)

plot(p1, dat$Bruttopension, col = "peachpuff")
plot(model1)

coefs <- coef(model1)

lon = 28000*12
fodar = 1935
pensionar = 65
#------------------------------------ del 1 ------------------------------------
pred <- 
coefs["(Intercept)"] + 
lon * coefs["arslon"] +
fodar * coefs["fodar"] +
pensionar * coefs["pensionar"] +
lon * pensionar * coefs["arslon:pensionar"] +
fodar * pensionar * coefs["fodar:pensionar"] +
lon * fodar * coefs["arslon:fodar"] +
lon * fodar * pensionar *coefs["arslon:fodar:pensionar"]

pred/12
#-------------------------------------------------------------------------------

#------------------------------------ del 2 lön  -------------------------------
lon 
(
  pred -
    (coefs["(Intercept)"] + 
  fodar * coefs["fodar"] +
  pensionar * coefs["pensionar"] +
  fodar * pensionar * coefs["fodar:pensionar"]
  )
)/
(
  coefs["arslon"] + 
  pensionar * coefs["arslon:pensionar"] +  
  fodar * coefs["arslon:fodar"] + 
  fodar * pensionar *coefs["arslon:fodar:pensionar"]
  )
#-------------------------------------------------------------------------------

#----------------------------- del 3 pensionsar  -------------------------------
pensionar

(pred -  (coefs["(Intercept)"] + 
  lon * coefs["arslon"] +
  fodar * coefs["fodar"] +
  lon * fodar * coefs["arslon:fodar"]))/
  (coefs["pensionar"] +
     lon * coefs["arslon:pensionar"] +
     fodar * coefs["fodar:pensionar"] +
     lon * fodar * coefs["arslon:fodar:pensionar"])
#-------------------------------------------------------------------------------


tst <-
dat %>% 
  filter(fodar == 1975 & pensionar == 63)


# testa additiv modell
model2 <- gam(log(Bruttopension) ~ ti(arslon) + 
              ti(fodar) + 
              ti(pensionar)+
              ti(arslon, pensionar) + 
              ti(arslon, pensionar, fodar) + 
              arslon + 
              fodar + 
              pensionar, 
            data = dat)

p2 <- predict(model2)

plot(p2, log(dat$Bruttopension), col = "purple")
plot(model2)


summary(model2)



Xp <- predict(model2, type="lpmatrix")


## see also examples in ?gam.models (e.g. 'by' variables, 
## random effects and tricks for large binary datasets)

library(mgcv)
set.seed(2) ## simulate some data... 
dat <- gamSim(1,n=400,dist="normal",scale=2)
b <- gam(y~s(x0)+s(x1)+s(x2)+s(x3),data=dat)
summary(b)
plot(b,pages=1,residuals=TRUE)  ## show partial residuals
plot(b,pages=1,seWithMean=TRUE) ## `with intercept' CIs
## run some basic model checks, including checking
## smoothing basis dimensions...
gam.check(b)

## same fit in two parts .....
G <- gam(y~s(x0)+s(x1)+s(x2)+s(x3),fit=FALSE,data=dat)
b <- gam(G=G)
print(b)

## 2 part fit enabling manipulation of smoothing parameters...
G <- gam(y~s(x0)+s(x1)+s(x2)+s(x3),fit=FALSE,data=dat,sp=b$sp)
G$lsp0 <- log(b$sp*10) ## provide log of required sp vec
gam(G=G) ## it's smoother

## change the smoothness selection method to REML
b0 <- gam(y~s(x0)+s(x1)+s(x2)+s(x3),data=dat,method="REML")
## use alternative plotting scheme, and way intervals include
## smoothing parameter uncertainty...
plot(b0,pages=1,scheme=1,unconditional=TRUE) 

## Would a smooth interaction of x0 and x1 be better?
## Use tensor product smooth of x0 and x1, basis 
## dimension 49 (see ?te for details, also ?t2).
bt <- gam(y~te(x0,x1,k=7)+s(x2)+s(x3),data=dat,
          method="REML")
plot(bt,pages=1) 
plot(bt,pages=1,scheme=2) ## alternative visualization
AIC(b0,bt) ## interaction worse than additive
