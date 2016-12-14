plotz <- function(argument, unlocked = "x"){
 
  if(any(abs(argument)>1)){stop("all inputs must be in range -1 to 1.")}
  
  if(unlocked == "x"){
    
    x <- argument
    y <- cospi(x)
    z <- sinpi(x)
    
    points(x,x, col="yellow", pch = 4)
    points(x,y, col="yellow", pch = 3)
    points(x,z, col="yellow", pch = 2)
    
  } else if(unlocked == "y"){
    
    x <- acos(argument)/pi
    y <- argument
    z <- sinpi(x)
    
    points(x,x, col="red", pch = 4)
    points(x,y, col="red", pch = 3)
    points(x,z, col="red", pch = 2)
    
  } else{
    
    x <- asin(argument)/pi
    y <- cospi(x)
    z <- argument
    
    points(x,x, col="blue", pch = 4)
    points(x,y, col="blue", pch = 3)
    points(x,z, col="blue", pch = 2)
  }
  

  
}

series <- seq(-1,1,0.01)

plot(series,series) # svarta linjen är x
points(series,sinpi(series), col = "blue") # blåa linjen är sinus alltså z
points(series,cospi(series), col = "red") # röda linjen är cosinus alltså y

plotz(series) # ok
plotz(series, unlocked = "y")
plotz(series, unlocked = "z")