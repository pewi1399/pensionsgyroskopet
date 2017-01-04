function slider2(d1,d2, type)
{
    var margin = {top: 33, left: 20, right: 30, bottom: 33},
        width  = 600 - margin.left - margin.right,
        height = 120  - margin.top  - margin.bottom,
        brush  = d3.brushX(),
        handle, slider,
        h  = 0,
        hue    = function(d){h = d;},
        cback  = function(d){},
        rescale  = function(d){};

    var x = d3.scaleLinear()
        .domain([d1,d2])
        .range ([0,width])
        .clamp(true);

    function chart(el)
    {
//http://www.rajvansia.com/scatterplotbrush-d3-v4.html
        //brush.extent([[0, 0], [width, height]])
        //     .on("brush", brushed);

  var svg = el//.attr("width",  width  + margin.left + margin.right)
      //.attr("height", height + 10)
      //.classed("svg-container1", true)
      //.append("svg")
      //.attr("width", width + margin.left + margin.right)
      //.attr("height", height + margin.top + margin.bottom)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox","0 5 " + (width + 50)  + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)
      //.append("g")//.attr("transform","translate(" + 0 + "," + 0 + ")");

        /*
        svg.append("g")
           .attr("class","x axis")
           .attr("transform", "translate(0,"+height/2+")")
           .call(d3.axisBottom(x).tickSize(0).tickPadding(12));
*/


  var slider = svg.append("g")
       .attr("class", "slider")
       .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

   slider.append("line")
       .attr("class", "track")
       .attr("stroke", "#ddd")
       .attr("x1", x.range()[0])
       .attr("x2", x.range()[1])
     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
       .attr("class", "track-inset")
     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
       .attr("class", "track-overlay")
       .call(d3.drag()
           .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() {

            h = x.invert(d3.mouse(this)[0])
            hue(h);
              cback();

          }));

   slider.insert("g", ".track-overlay")
       .attr("class", "ticks")
       .attr("transform", "translate(0," + 18 + ")")
     .selectAll(".tickmarks")
     .data(x.ticks(10))
     .enter().append("text")
       .attr("class","tickmarks")
       .attr("x", x)
       .attr("text-anchor", "middle")
       .text(function(d) { return d; });

   var handle = slider.insert("circle", ".track-overlay")
       .attr("class", "handle")
       .attr("r", 9);

    if(type == "income"){

      slider
      .attr("transform", "translate(" + (margin.left)+ "," + height / 3.5 + ")");

      slider.selectAll(".income")
      .data([1]).enter()
      .append("line")
          .attr("class", "income")
          .attr("stroke", "MediumSeaGreen")
          .attr("stroke-width", "8px")
          .attr("stroke-linecap", "round")
          .attr("x1", x(0))
          .attr("x2", x(d2-5000))
          .attr("transform", "translate(0," + 28 + ")")

      slider.selectAll(".incometext")
      .data([1]).enter()
      .append("text")
      .attr("class", "incometext")
      .attr("x", x(d2-5000))
      .attr("transform", "translate(0," + 30 + ")")
      .text("*placeholder*")



      /*
        .data([1]).enter()
        .append("rect")
        .attr("class", "income")
        .attr("fill", "MediumSeaGreen")
        .attr("x", x(0))
        //.attr("rx", 2)
        //.attr("ry", 2)
        //.attr("y", height/1.1)
        .attr("width", x(5000))
        .attr("height", 6)
        .attr("transform", "translate(" + margin.left + "," + height / 2 + ")")
        */
    }


   slider.transition() // Gratuitous intro!
       .duration(750)
       .tween("hue", function() {
         var i = d3.interpolate(0, 70);
         //return function(t) { hue(t); };
       });

      function brushed(){

      h = x.invert(d3.mouse(this)[0])
      hue(h);
      cback();
      }


     hue = function(h) {
       handle.attr("cx", x(h));
       console.log(h)
       //svg.style("background-color", d3.hsl(h, 0.8, 0.8));
      }

      rescale = function(limit){
        var x = d3.scaleLinear()
            .domain([d1,limit])
            .range ([0,width])
            .clamp(true);

        ticks = slider.selectAll(".ticks").selectAll(".tickmarks").data(x.ticks(10))

        ticks.exit().remove()

        ticks.attr("x", x).text(function(d) { return d; });

        ticks.enter()
        .append("text")
        .attr("class","tickmarks")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });


        return x;
      }

    }


    chart.margin   = function(_) { if (!arguments.length) return margin;  margin = _; return chart; };
    chart.callback = function(_) { if (!arguments.length) return cback;    cback = _; return chart; };
    chart.value    = function(_) { if (!arguments.length) return h; hue(_); h = _; return chart; };
    chart.x    = function(_) { if (!arguments.length) return x;
      x = rescale(_); return chart;
      };

    return chart;
}
