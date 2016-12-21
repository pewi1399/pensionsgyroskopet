function slider2(d1,d2)
{
    var margin = {top: 40, left: 20, right: 30, bottom: 5},
        width  = 600 - margin.left - margin.right,
        height = 100  - margin.top  - margin.bottom,
        brush  = d3.brushX(),
        handle, slider,
        h  = 0,
        hue    = function(d){h = d;},
        cback  = function(d){};

    var x = d3.scaleLinear()
        .domain([d1,d2])
        .range ([0,width])
        .clamp(true);

    function chart(el)
    {
//http://www.rajvansia.com/scatterplotbrush-d3-v4.html
        //brush.extent([[0, 0], [width, height]])
        //     .on("brush", brushed);

  var svg = el.attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
      .append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

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
       .attr("stroke", "dodgerblue")
       .attr("x1", x.range()[0])
       .attr("x2", x.range()[1])
     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
       .attr("class", "track-inset")
     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
       .attr("class", "track-overlay")
       .call(d3.drag()
           .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() {

            hue(x.invert(d3.event.x));

          }));

   slider.insert("g", ".track-overlay")
       .attr("class", "ticks")
       .attr("transform", "translate(0," + 18 + ")")
     .selectAll("text")
     .data(x.ticks(10))
     .enter().append("text")
       .attr("x", x)
       .attr("text-anchor", "middle")
       .text(function(d) { return d + "°"; });

   var handle = slider.insert("circle", ".track-overlay")
       .attr("class", "handle")
       .attr("r", 9);

   slider.transition() // Gratuitous intro!
       .duration(750)
       .tween("hue", function() {
         var i = d3.interpolate(0, 70);
         //return function(t) { hue(t); };
       });


   hue = function(h) {
     handle.attr("cx", x(h));
     console.log(h)
     //svg.style("background-color", d3.hsl(h, 0.8, 0.8));
   }

   /*

        slider = svg.append("g")
            .attr("class","slider")
            .call(brush);

        slider.selectAll(".extent,.resize").remove();
        slider.select(".background").attr("height",height)

        handle = slider.append("circle")
            .attr("class","handle")
            .attr("transform", "translate(0,"+height/2+")")
            .attr("cx",x(value))
            .attr("r",9);

        function brushed()
        {


            if (d3.event) value = x.invert(d3.mouse(this)[0]);
            upd(value);
            cback();
        }
        */
        /*
        upd = function(v)
        {
            //brush.selection([v,v]);
            //value = brush.selection()[0];
            handle.attr("cx",x(v));
        }
        */
    }

    //function hues(h) {
      //console.log(h);
      //handle.attr("cx", x(h));
      //svg.style("background-color", d3.hsl(h, 0.8, 0.8));
    //}





    chart.margin   = function(_) { if (!arguments.length) return margin;  margin = _; return chart; };
    chart.callback = function(_) { if (!arguments.length) return cback;    cback = _; return chart; };
    chart.value    = function(_) { if (!arguments.length) return h;

       hue(_); return chart;
     };

    return chart;
}
