//function plot()
//{
    var margin = {top: 40, left: 60, right: 30, bottom: 30},
        width  = 600 - margin.left - margin.right,
        height = 300  - margin.top  - margin.bottom,
        //brush  = d3.svg.brush(),
        handle, slider,
        value  = 0,
        upd    = function(d){value = d;},
        cback  = function(d){};

    var x = d3.scaleLinear()
        .domain([55,67])
        .range ([0,width])
        .clamp(true);

    var y = d3.scaleLinear()
        .domain([0,100000])
        .range ([height,0])
        .clamp(true);


    var svg = d3.select("#x4")
              .append("svg")
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox","0 0 " + (width + margin.left + margin.right)  + " " + (height + margin.top + margin.bottom))
              .classed("svg-content-responsive", true)


    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

    var g = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

        g.append("g")
           .attr("class","x Paxis")
           .attr("transform", "translate(0,"+height+")")
           .call(d3.axisBottom(x).tickSize(5).tickPadding(12));

       g.append("g")
          .attr("class","y Paxis")
          .attr("transform", "translate(0,"+0+")")
          .call(d3.axisLeft(y).tickSize(5).tickPadding(4));

    var savings_line = d3.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.kr); });


    var savings_data = [{"year":55,"kr":20000},{"year":67,"kr":20000}]

    var line1 = g.append("path")
        .attr("class", "line")
        .attr("id", "line2")
        .attr("d", savings_line(savings_data))
        .style("stroke", "Orange");

    var behallning_line = d3.line()
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.kr); });


    var behallning_data = [{"year":55,"kr":20000},{"year":67,"kr":50000}]

    var line2 = g.append("path")
        .attr("class", "line")
        .attr("id", "line1")
        .attr("d", savings_line(behallning_data))
        .style("stroke", "OrangeRed");


    var legend = g.selectAll(".legendpoint")
        .data([1,2]).enter()
        .append("circle")
        .attr("class", "legendpoint")
        .attr("fill", function(d,i){
          if(i == 1){
            return "Orange";
          } else{
            return "OrangeRed";
          }
        })
        .attr("r", 5)
        .attr("cx", x(55.3))
        .attr("cy", function(d,i){ return y(95000-i*6000); })

    var legendtext = g.selectAll(".legendtext")
        .data([1,2]).enter()
        .append("text")
        .attr("class", "legendtext")
        .text(function(d,i){
          if(i == 1){
            return "Sparande";
          } else{
            return "Pensionsbehållning";
          }
        })
        .attr("x", x(55.3 + 0.15))
        .attr("y", function(d,i){ return y(95000-i*6000 - 2000); })




function redraw(income){
  var behallning55 = s3.value() * (55 - alpha) / (67 - 55 + 10),
  behallning67 = s3.value() * (67 - alpha) / (67 - 67 + 10)
  var new_behallning = [{"year":55,"kr": behallning55},{"year":67,"kr":behallning67}]

  d3.select("#line1")
    //.transition()
    .attr("d", savings_line(new_behallning))

  var new_savings = [{"year":55,"kr": s3.value()},{"year":67,"kr":s3.value()}]

  d3.select("#line2")
    //.transition()
    .attr("d", savings_line(new_savings));

    //if(income=="t"){

    //regen old scale
    xx = d3.scaleLinear()
       .domain([0, beta])
       .range ([0,550])
       .clamp(true);

    d3.selectAll(".income")
      .attr("x2", xx(beta - s3.value()))

    d3.selectAll(".incometext")
      .attr("x", xx(beta - s3.value()))
  //};
}

//}
