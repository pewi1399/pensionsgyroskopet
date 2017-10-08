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

lon = 25000*12
fodar = 1965
pensionar = 65

#---------------------------------- parameters ---------------------------------
a <- coefs["(Intercept)"]
b_lon <-  coefs["arslon"] 
b_fodar <- coefs["fodar"]
b_pensionar  <-  coefs["pensionar"]
b_lon_pensionar <- coefs["arslon:pensionar"]
b_fodar_pensionar <-  coefs["fodar:pensionar"]
b_lon_fodar <- coefs["arslon:fodar"]
b_lon_fodar_pensionar <- coefs["arslon:fodar:pensionar"]
#-------------------------------------------------------------------------------

#------------------------------------ del 1 ------------------------------------
pred <- 
a + 
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
