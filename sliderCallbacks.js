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


var alpha = -113221862.219793
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
            var unlocked = 'sparande'//$('input[name=choice]:checked').val()
            var pensionar = Math.round(src.value());
            var lon =  Number($('input[name=inkomst_efter_skatt]').val())*12
            var fodar =  Number($('input[name=fodelsear]').val())

            var arbetstid = pensionar - 23
            window.time = arbetstid

           $('input[name=test_slider_pensionsalder]').val(Math.round(pensionar));

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


                var lon = lon + (z.value()*100/18)*12
                var behallning = 
                  alpha + 
                  lon * b_lon +
                  fodar * b_fodar +
                  pensionar * b_pensionar +
                  lon * pensionar * b_lon_pensionar+
                  fodar * pensionar * b_fodar_pensionar+
                  lon * fodar * b_lon_fodar +
                  lon * fodar * pensionar * b_lon_fodar_pensionar

                y.value(behallning/12);
               $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning/12))

            }

            redraw(income="f")
        }

//------------------------------------------------------------------------------

        function behallning(src,x,z)
        {
          // maxvärde nuvarande ink /12
          var unlocked = "sparande"
          var behallning = src.value()*12;
          var lon =  Number($('input[name=inkomst_efter_skatt]').val())*12
          var fodar =  Number($('input[name=fodelsear]').val())

          $('input[name=test_slider_pensionsinkomst]').val(Math.round(behallning/12))

          if(behallning > 500*1000)
          {
              var a = 0
              x.value(a);
              z.value(a);
          }
          else if ( unlocked ==  "sparande" )
          {

            //(z.value()*alpha + 67*y + 10*y) / (z.value() + y)
            // räkna ut tid utifrån z = Avgift och src = behallning

            var lon = lon + (z.value()*100/18)*12

            var pensionar = (behallning -  (alpha + 
                lon * b_lon +
                fodar * b_fodar +
                lon * fodar * b_lon_fodar))/
                (b_pensionar +
                   lon * b_lon_pensionar+
                   fodar * b_fodar_pensionar+
                   lon * fodar * b_lon_fodar_pensionar)

              x.value(pensionar);

            $('input[name=test_slider_pensionsalder]').val(Math.round(pensionar))

          }

          redraw(income="f")
        }

//------------------------------------------------------------------------------

        function sparande(src,x,y)
        {
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
          
          redraw(income="t")
        }
//------------------------------------------------------------------------------
