function slider(d1,d2)
{
    var margin = {top: 40, left: 40, right: 30, bottom: 5},
        width  = 600 - margin.left - margin.right,
        height = 100  - margin.top  - margin.bottom,
        brush  = d3.brushX(),
        handle, slider,
        value  = 0,
        upd    = function(d){value = d;},
        cback  = function(d){};

    var x = d3.scaleLinear()
        .domain([d1,d2])
        .range ([0,width])
        .clamp(true);

    function chart(el)
    {
//http://www.rajvansia.com/scatterplotbrush-d3-v4.html
        brush.extent([[0, 0], [width, height]])
             .on("brush", brushed);

        var svg = el.attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)
            .append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
           .attr("class","x axis")
           .attr("transform", "translate(0,"+height/2+")")
           .call(d3.axisBottom(x).tickSize(0).tickPadding(12));

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
        upd = function(v)
        {
            brush.selection([v,v]);
            value = brush.selection()[0];
            handle.attr("cx",x(value));
        }
    }

    chart.margin   = function(_) { if (!arguments.length) return margin;  margin = _; return chart; };
    chart.callback = function(_) { if (!arguments.length) return cback;    cback = _; return chart; };
    chart.value    = function(_) { if (!arguments.length) return value;       upd(_); return chart; };

    return chart;
}
