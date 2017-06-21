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

//--------------------------- sliderfunctions ----------------------------------

        function pension(src, y, z)
        {
          // maxvärde 67 år
          // minvärde 55 år
           // var unlocked = $('input[name=choice]:checked').val()
            var unlocked = "sparande"
            var pensionsar = Math.round(src.value());
            var arbetstid = pensionsar - 23
            window.time = arbetstid

          $('input[name=test_slider_pensionsalder]').val(Math.round(pensionsar))

            if(pensionsar <61){
              delningsar = 61
            }else if(pensionsar >110){
              delningsar = 110
            }else{
              delningsar = pensionsar
            }
            window.Delningstal = delningstal["X"+ delningsar]

            if(pensionsar > 75)
            {
                var a = 0
                y.value(a);
                z.value(a);
            }
            else if ( unlocked ==  "sparande" )
            {
                var x =  src.value()///100;


                //z.value()*(x - alpha) / (67 - x + 10)
                // räkna ut behållning via z = Avgift och src = pensionsar
                var behallning = (((z.value()*12) * Math.exp((ranta*arbetstid))*(Math.exp((-ranta*arbetstid)) - 1)) * mu)/-ranta/Delningstal/12

                y.value(behallning);
                $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning))

            }
            else if ( unlocked ==  "behallning" )
            {
                var x =  src.value()///100;


                //y.value()*(67 - x +10)/(x - alpha)
                // räkna ut avgift via y = utbetalning och src = pensionsar
                var avgift = ((y.value()*12*Delningstal*-ranta)/mu/(Math.exp((ranta*arbetstid))*(Math.exp((-ranta*arbetstid)) - 1)))/12;

                z.value(avgift);
                $('input[name=test_slider_sparande]').val(Math.round(avgift))

                                //z.value()*(x - alpha) / (67 - x + 10)
                // räkna ut behållning via z = Avgift och src = pensionsar
                var behallning = (((z.value()*12) * Math.exp((ranta*arbetstid))*(Math.exp((-ranta*arbetstid)) - 1)) * mu)/-ranta/Delningstal/12

                y.value(behallning);
                $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning))





            }
            redraw(income="f")
        }

//------------------------------------------------------------------------------

        function behallning(src,x,z)
        {
          // maxvärde nuvarande ink /12
          //var unlocked = $('input[name=choice]:checked').val()
          var unlocked = "sparande"
          var behallning = src.value();

          $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning))

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

            $('input[name=test_slider_pensionsalder]').val(Math.round(pensionsalder));

          }
          else if ( unlocked ==  "pensionar" )
          {
              var y =  behallning///100;

              //y*(67 - x.value() +10)/(x.value() - alpha)
              // räkna ut avgift utifrån x = pensionar och src = behallning
              var avgift =  ((behallning*12*Delningstal*-ranta)/mu/(Math.exp((ranta*(x.value()-23)))*(Math.exp((-ranta*(x.value()-23))) - 1)))/12;


              z.value(avgift);
              $('input[name=test_slider_sparande]').val(Math.round(avgift));

          }
          redraw(income="f")
        }

//------------------------------------------------------------------------------

        function sparande(src,x,y)
        {
          //var unlocked = $('input[name=choice]:checked').val()
          var unlocked = "sparande"
          var sparande = src.value()*12;

          $('input[name=test_slider_sparande]').val(Math.round(sparande/12))
          $("input[name='sparande_final_valfritt']").val(Math.round(sparande/12))

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
              $('input[name=test_slider_pensionsalder]').val(Math.round(pensionsalder));

          }
          else if ( unlocked ==  "pensionar" )
          {
              var z =  sparande///100;

              //z * (x.value() - alpha) / (67 - x.value() + 10)
              // räkna ut behallning utifrån x = pensionar och src = sparande
              var behallning = ((sparande*Math.exp((ranta*(x.value()-23)))*(Math.exp((-ranta*(x.value()-23))) - 1)) * mu)/-ranta/Delningstal/12;


              y.value(behallning);
              $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning));
          }
          redraw(income="t")
        }
//------------------------------------------------------------------------------
