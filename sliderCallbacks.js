// ----------------------------- constants -------------------------------------
var alpha = 25.3
var beta = 600000.3
var IBB = 61500
// r = ränta
ranta = 0.017
// mu = arvsvinster
mu = 1
// D delningstal
Delningstal = delningstal.X65


var a = -113221862.219793
var b_lon = 444.395597171495
var b_fodar = 57422.8552482823 
var b_pensionar = 2081369.38215545 
var b_lon_pensionar = -8.23367405408878 
var b_fodar_pensionar = -1055.75823031998 
var b_lon_fodar = -0.227976205379907
var b_lon_fodar_pensionar = 0.00422301483112778



//--------------------------- sliderfunctions ----------------------------------

        function pension(src, y, z)
        {
          // maxvärde 67 år
          // minvärde 55 år
            var unlocked = $('input[name=choice]:checked').val()
            var pensionar = Math.round(src.value());
            var arbetstid = pensionar - 23
            window.time = arbetstid

          $('input[name=pensionartext]').val(Math.round(pensionar))

            if(pensionar <61){
              delningsar = 61
            }else if(pensionar >110){
              delningsar = 110
            }else{
              delningsar = pensionar
            }
            //window.Delningstal = delningstal["X"+ delningsar]

            if(pensionar > 75)
            {
                var a = 0
                y.value(a);
                z.value(a);
            }
            else if ( unlocked ==  "sparande" )
            {


                var lon = z.value()
                var behallning = 
                  a + 
                  lon * b_lon +
                  fodar * b_fodar +
                  pensionar * b_pensionar +
                  lon * pensionar * b_lon_pensionar+
                  fodar * pensionar * b_fodar_pensionar+
                  lon * fodar * b_lon_fodar +
                  lon * fodar * pensionar * b_lon_fodar_pensionar

                y.value(behallning);
                $('input[name=behallningtext]').val(Math.round(behallning))

            }
            else if ( unlocked ==  "behallning" )
            {

                // räkna ut avgift via y = utbetalning och src = pensionsar
                var behallning = y.value()

                var lon =(
                          pred -
                            (
                              a + 
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

                z.value(lon);
                $('input[name=sparandetext]').val(Math.round(lon))

                                //z.value()*(x - alpha) / (67 - x + 10)
                // räkna ut behållning via z = Avgift och src = pensionsar
                var behallning = 
                  a + 
                  lon * b_lon +
                  fodar * b_fodar +
                  pensionar * b_pensionar +
                  lon * pensionar * b_lon_pensionar+
                  fodar * pensionar * b_fodar_pensionar+
                  lon * fodar * b_lon_fodar +
                  lon * fodar * pensionar * b_lon_fodar_pensionar

                y.value(behallning);
                $('input[name=behallningtext]').val(Math.round(behallning))





            }
            redraw(income="f")
        }

//------------------------------------------------------------------------------

        function behallning(src,x,z)
        {
          // maxvärde nuvarande ink /12
          var unlocked = $('input[name=choice]:checked').val()
          var behallning = src.value();

          $('input[name=behallningtext]').val(Math.round(behallning))

          if(behallning > 500*1000)
          {
              var a = 0
              x.value(a);
              z.value(a);
          }
          else if ( unlocked ==  "sparande" )
          {
              var y =  behallning///100;

            //(z.value()*alpha + 67*y + 10*y) / (z.value() + y)
            // räkna ut tid utifrån z = Avgift och src = behallning
            var pensionsalder =  23 + Math.log((behallning*12*Delningstal*ranta)/((z.value()*12)+mu)+1)/ranta;

              x.value(pensionsalder);

            $('input[name=pensionartext]').val(Math.round(pensionsalder));

          }
          else if ( unlocked ==  "pensionar" )
          {
              var y =  behallning///100;

              //y*(67 - x.value() +10)/(x.value() - alpha)
              // räkna ut avgift utifrån x = pensionar och src = behallning
              var avgift =  ((behallning*12*Delningstal*-ranta)/mu/(Math.exp((ranta*(x.value()-23)))*(Math.exp((-ranta*(x.value()-23))) - 1)))/12;


              z.value(avgift);
              $('input[name=sparandetext]').val(Math.round(avgift));

          }
          redraw(income="f")
        }

//------------------------------------------------------------------------------

        function sparande(src,x,y)
        {
          var unlocked = $('input[name=choice]:checked').val()
          var sparande = src.value()*12;

          $('input[name=sparandetext]').val(Math.round(sparande/12))

          if(sparande > 50*10000)
          {
              var a = 0
              x.value(a);
              y.value(a);
          }
          else if ( unlocked ==  "behallning" )
          {
              var z =  sparande;//100;

              //(z * alpha + 67*y.value() + 10*y.value()) / (z + y.value())
              // räkna ut tid utifrån y = utbetalning och src = sparande
              var pensionsalder = 23 + Math.log((y.value()*12*Delningstal*ranta)/(sparande+mu)+1)/ranta;

              x.value(pensionsalder);
              $('input[name=pensionartext]').val(Math.round(pensionsalder));

          }
          else if ( unlocked ==  "pensionar" )
          {
              var z =  sparande///100;

              //z * (x.value() - alpha) / (67 - x.value() + 10)
              // räkna ut behallning utifrån x = pensionar och src = sparande
              var behallning = ((sparande*Math.exp((ranta*(x.value()-23)))*(Math.exp((-ranta*(x.value()-23))) - 1)) * mu)/-ranta/Delningstal/12;


              y.value(behallning);
              $('input[name=behallningtext]').val(Math.round(behallning));
          }
          redraw(income="t")
        }
//------------------------------------------------------------------------------
