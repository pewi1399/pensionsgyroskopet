rm(list = ls())

require(forecast)
require(ggplot2)
require(dplyr)
library(caret)

# bygg prognos 
dat <- openxlsx::read.xlsx("data/typfallsdata_med_simulering.xlsx")
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

lon = 9999*12
fodar = 1976
pensionar = 69

#---------------------------------- parameters ---------------------------------
alpha <- coefs["(Intercept)"]
b_lon <-  coefs["arslon"] 
b_fodar <- coefs["fodar"]
b_pensionar  <-  coefs["pensionar"]
b_lon_pensionar <- coefs["arslon:pensionar"]
b_fodar_pensionar <-  coefs["fodar:pensionar"]
b_lon_fodar <- coefs["arslon:fodar"]
b_lon_fodar_pensionar <- coefs["arslon:fodar:pensionar"]

# test
alpha = -22797340.0545776
b_lon = 24.2116069556377
b_fodar = 11394.1880519317
b_pensionar = 478346.349925474
b_lon_pensionar = -0.672919275782119
b_fodar_pensionar = -239.7697
b_lon_fodar = -0.0129248006725873
b_lon_fodar_pensionar = 0.000354919013935786

alpha +
  lon * b_lon +
  fodar * b_fodar +
  pensionar * b_pensionar +
  lon * pensionar * b_lon_pensionar+
  fodar * pensionar * b_fodar_pensionar+
  lon * fodar * b_lon_fodar +
  lon * fodar * pensionar * b_lon_fodar_pensionar


#-------------------------------------------------------------------------------

#------------------------------------ del 1 ------------------------------------
pred <- 
alpha + 
lon * b_lon +
fodar * b_fodar +
pensionar * b_pensionar +
lon * pensionar * b_lon_pensionar+
fodar * pensionar * b_fodar_pensionar+
lon * fodar * b_lon_fodar +
lon * fodar * pensionar * b_lon_fodar_pensionar


alpha +
  lon * b_lon +
  fodar * b_fodar +
  pensionar * b_pensionar +
  lon * pensionar * b_lon_pensionar+
  fodar * pensionar * b_fodar_pensionar+
  lon * fodar * b_lon_fodar +
  lon * fodar * pensionar * b_lon_fodar_pensionar

pred/12
#-------------------------------------------------------------------------------

#------------------------------------ del 2 lön  -------------------------------
lon 
(
  pred -
    (a + 
  fodar * b_fodar +
  pensionar * b_pensionar +
  fodar * pensionar * b_fodar_pensionar
  )
)/
(
  b_lon + 
  pensionar * b_lon_pensionar+  
  fodar * b_lon_fodar + 
  fodar * pensionar * b_lon_fodar_pensionar
  )
#-------------------------------------------------------------------------------

#----------------------------- del 3 pensionsar  -------------------------------
pensionar

(pred -  (a + 
  lon * b_lon +
  fodar * b_fodar +
  lon * fodar * b_lon_fodar))/
  (b_pensionar +
     lon * b_lon_pensionar+
     fodar * b_fodar_pensionar+
     lon * fodar * b_lon_fodar_pensionar)
#-------------------------------------------------------------------------------
# 
# 
# tst <-
# dat %>% 
#   filter(fodar == 1975 & pensionar == 63)
# 
# 
# # testa additiv modell
# model2 <- gam(log(Bruttopension) ~ ti(arslon) + 
#               ti(fodar) + 
#               ti(pensionar)+
#               ti(arslon, pensionar) + 
#               ti(arslon, pensionar, fodar) + 
#               arslon + 
#               fodar + 
#               pensionar, 
#             data = dat)
# 
# p2 <- predict(model2)
# 
# plot(p2, log(dat$Bruttopension), col = "purple")
# plot(model2)
