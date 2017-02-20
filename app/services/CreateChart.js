function CreateChart() {

  this.appendToDom = function(dataset) {
    var lows = [];
    var highs = [];

    for (var i = 0; i < dataset.length; i++) {
      lows.push(dataset[i][0]);
      highs.push(dataset[i][1]);
    }

    var date = new Date,
        day = date.getDay();

    var dayNames = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

    if (day != 0) {
      for (var i = 0; i < day; i++) {
      dayNames.push(dayNames.splice(0, 1).toString());
      }
    }

    var width = 550,
        height = 400,
        margins = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 25
      };

    var header = d3.select('chart').append('h1')
      .html('<span class="highs">Highs</span> and <span class="lows">Lows</span> for the Week');

    var chart = d3.select('chart').append('svg')
          .attr('width', width)
          .attr('height', height)

    var xScale = d3.scaleBand()
      .domain(dayNames)
      .range([ 0, width]);

    var indexScale = d3.scaleBand()
      .domain(d3.range(0, dataset.length))
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain([d3.min(lows) - 10, d3.max(highs)])
      .range([height, 0])

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    var	yHighsRange = d3.scaleLinear().range([height, 0]).domain(0, d3.max(highs));
    var	yLowsRange = d3.scaleLinear().range([height, 0]).domain(0, d3.max(lows));

    chart.append('g')
          .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
          .attr('class', 'axis')
          .call(xAxis);

    chart.append('g')
          .attr("transform", "translate(" + (margins.left) + ",0)")
          .attr('class', 'axis')
          .call(yAxis)

    var line = d3.line()
        .x(function(d,i) { return indexScale(i) + indexScale.bandwidth() / 2; })
        .y(function(d) { return yScale(d) });

    chart.append('svg:path')
      .attr('d', line(lows))
      .attr('stroke', '#2745ff')
      .attr('stroke-width', 2)
      .attr('class', 'low-line')
      .attr('fill', 'none');

    chart.append('svg:path')
        .attr('d', line(highs))
        .attr('stroke', '#fb386b')
        .attr('stroke-width', 2)
        .attr('class', 'high-line')
        .attr('fill', 'none');

    var tooltip = function(dataset) {
      info = ''
      for (var i = 0; i < dataset.length; i++) {
        info += `<p>${dayNames[i]}: Low: ${Math.round(dataset[i][0])} | High: ${Math.round(dataset[i][1])} | Conditions: ${dataset[i][2]}</p>`
      }
      return info
    }

    var tip = d3.select('chart').append('div')
      .html(tooltip(dataset));

  }
}

angular
  .module('app')
  .service('CreateChart', CreateChart)
