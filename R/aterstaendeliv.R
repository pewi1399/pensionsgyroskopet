library(jsonlite)
load("data/aterst_livslangd_65.rdata")

writeLines(paste0("var life_expectancy = ", toJSON(aterst_livslangd_65)), "data/life_expectancy.js")

 