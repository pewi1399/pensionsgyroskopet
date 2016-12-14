# powerberäkning
# https://cran.r-project.org/web/packages/powerMediation/powerMediation.pdf

# grupp med hög osmolaritet n = , varav NEC = :
# grupp med låg osmolaritet n = , varav NEC = :

n1 =  42
n2 = 177

p1 = 0.02
p2 = 0.10
  
  
power_calc <- function(p1, p2){
  
  sample_sizes <- 1:300 
  
  pwr <- sapply(sample_sizes, function(x){power.prop.test(p1 = p1, p2 = p2, n = x)$power})
  
  group <- paste0(p1, " vs ", p2)
  
  out <- data.frame(sample_sizes ,group ,pwr)
  
  return(out)
}

d1 <- power_calc(0.02, 0.10)
d2 <- power_calc(0.05, 0.10)
d3 <- power_calc(0.05, 0.15)
d4 <- power_calc(0.02, 0.15)

#create df
dat0 <- rbind(d1,d2,d3,d4)

library(ggplot2)
ggplot(dat0)+
  aes(x = sample_sizes, y = pwr, group = group, col = group)+
  geom_line()+
  theme_bw()+
  scale_y_continuous(breaks = seq(0,1,0.1))+
  scale_x_continuous(breaks = seq(0,300,25))
  