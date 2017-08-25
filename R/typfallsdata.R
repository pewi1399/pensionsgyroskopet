library(dplyr)
n = 100
lonsteg = seq(180000, 1420000, by = 20000)
pensionsaldrar = 61:75
fodelsear = 1960:1995

data <- data.frame(
  fodar = rep(fodelsear, each = length(lonsteg)*length(pensionsaldrar)),
  arbetsstart = 21,
  pensionar = rep(pensionsaldrar,length(lonsteg)*length(fodelsear)),
  arslon = rep(lonsteg, length(fodelsear)*length(pensionsaldrar)),
  inflation = 0.02,
  realtillvaxt = 0.018,
  fondavkastning = 0.035,
  egenlon = 0,
  privatsparande = 0,
  tjanstepension = 5
  )

openxlsx::write.xlsx(data, "data/typfallsdata.xlsx")
