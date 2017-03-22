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

// income svg needs to be alittle bit bigger since it contains two sliders
if(type == "income"){
  var svg = el
    .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox","0 5 " + (width + 50)  + " " + (height+50))
      //class to make it responsive
      .classed("svg-content-responsive", true)
}else{
  var svg = el
    .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox","0 5 " + (width + 50)  + " " + height)
      //class to make it responsive
      .classed("svg-content-responsive", true)
}


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
           .on("start.interrupt", function() { slider.interrupt();})
          .on("start drag", function() {

            h = x.invert(d3.mouse(this)[0])
            hue(h);
            cback();

            // update tooltip
          //  div.html(Math.round(h) + "<br/>")
          //  .transition()
          //    .duration(200)
          //    .style("opacity", .9)
          //    .style("left", (d3.event.x + $(window).width()/12*3.5) + "px")
          //    .style("top",  + "px")
//
            text
            .attr("x", x(h))
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .attr("font", "sans-serif")
            .attr("font-size",  "10px")
            .attr("opacity", 1)
            .text(Math.round(h))
            .transition()
            .duration(3000)
            .attr("opacity", 0)
              //.style("top", (d3.event.pageY - 28) + "px");
              //.transition()
              //.duration(500)
              //.style("opacity", 0);

          })
          //.on("end drag", function() {
          //  text.attr("opacity", 0)
          //})
          /*.on("end drag", function() {

            // update tooltip
            div.transition()
              .duration(200)
              .style("opacity", 0)
              //.transition()
              //.duration(500)
              //.style("opacity", 0);

          })*/
        );

    if(type == "alder"){
      var tickmarks = [55,57,59,61,63,65,67,69,71,73,75]

    } else {
      var tickmarks  = x.ticks(10)

    }

   slider.insert("g", ".track-overlay")
       .attr("class", "ticks")
       .attr("transform", "translate(0," + 18 + ")")
     .selectAll(".tickmarks")
     .data(tickmarks)
     .enter().append("text")
       .attr("class","tickmarks")
       .attr("x", x)
       .attr("text-anchor", "middle")
       .text(function(d) { return d; });

   var handle = slider.insert("circle", ".track-overlay")
       .attr("class", "handle")
       .attr("r", 9);

  var text = slider.selectAll(".exacttext")
      .data([1]).enter()
      .append("text")
      .attr("class", "exacttext")
      .attr("x", x)
      .text("")

//var tooltrigger = slider


    slider.on("mouseover", function(d) {

// sätt texter för tooltip
      if(type == "alder"){
        var texten = "Här kan du ändra den ålder du vill gå i pension för att se hur det påverkar storleken på ditt månatliga pensionssparande och storleken på din månatliga pensionsutbetalning (före skatt)."
      } else if (type == "utbet"){
        var texten = "Här kan du ändra det belopp du önskar få ut i pension och se hur det påverkar dels din pensionsålder och dels ditt sparande per månad."
      } else {
        var texten = "Här kan du ändra ditt pensionssparande och se hur det påverkar din pensionsutbetalning och din pensionsålder."+
        "Den gröna stapeln visar hur din inkomst att leva på idag (före skatt) påverkas när du sparar mer eller mindre till din pension  (Detta reglage kan du endast ändra genom de andra tre reglagen)"
      }


       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(texten)
         .style("top", (d3.event.pageY-100) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

    if(type == "income"){

      slider
      .attr("transform", "translate(" + (margin.left)+ "," + height /2.2 + ")");
      //.attr("transform", "translate(" + (margin.left)+ "," + height / 3.5 + ")");

      slider.selectAll(".income")
      .data([1]).enter()
      .append("line")
          .attr("class", "income")
          .attr("stroke", "MediumSeaGreen")
          .attr("stroke-width", "8px")
          .attr("stroke-linecap", "round")
          .attr("x1", x(0))
          .attr("x2", x(d2))
          .attr("transform", "translate(0," + 50 + ")")

      slider.selectAll(".incometext")
      .data([1]).enter()
      .append("text")
      .attr("class", "incometext")
      .attr("text-anchor", "middle")
      .attr("x", x.range()[1]/2) // place text in middle of plot
      .attr("transform", "translate(0," + 36 + ")")
      .text("Bruttoinkomst idag")

    }

      function brushed(){

      h = x.invert(d3.mouse(this)[0])
      hue(h);
      cback();
      }


     hue = function(h) {
       handle.attr("cx", x(h));
       console.log(h)
       //svg.style("background-color", d3.hsl(h, 0.8, 0.8));


       //.on("mouseover", function(d) {
          /* div.transition()
             .duration(200)
             .style("opacity", .9);
           div.html(Math.round(h) + "<br/>") */
             //.style("left", (d3.event.pageX) + "px")
             //.style("top", (d3.event.pageY - 28) + "px");
          // })
         //.on("mouseout", function(d) {
           //div.transition()
             //.duration(500)
             //.style("opacity", 0);
           //});
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
