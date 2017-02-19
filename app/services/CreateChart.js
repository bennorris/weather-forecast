function CreateChart() {


  this.appendToDom = function(dataset) {
    var lows = [];
    var highs = [];

    for (var i = 0; i < dataset.length; i++) {
      lows.push(dataset[i][0]);
      highs.push(dataset[i][1]);
    }

    var width = 550,
        height = 450,
        barWidth = 50,
        barOffset = 5;

    var yScale = d3.scaleLinear()
          .domain([0, d3.max(lows)])
          .range([0, height]);

    var xScale = d3.scaleBand()
          .domain(d3.range(0, dataset.length))
          .range([0, width])

    var colors = d3.scaleLinear()
          .domain([0, dataset.length])
          .range(['#FFB832', '#C61C6F'])

    var tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0)

    var weatherChart = d3.select('#weatherChart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .style('background', 'slategray')
      .selectAll('rect').data(dataset)
      .enter().append('rect')
        .style('fill', function(d,i) {
          return colors(i);
        })
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .attr('x', function(d,i){
            return xScale(i);
        })
        .attr('y', height)

        .on('mouseover', function(d) {
          tooltip.transition()
            .style('opacity', .9)

          tooltip.html(`Low: ${d[0]}. High: ${d[1]}. Conditions: ${d[2]}.` )
              .style('left', (d3.event.pageX) + 'px')
              .style('top', (d3.event.pageY) + 'px')
          d3.select(this)
            .style('opacity', .5)
        })

        .on('mouseout', function(d) {
          d3.select(this)
            .style('opacity', 1)
        })

    weatherChart.transition()
      .attr('height', function(d){
          return yScale(d[0]);
      })
      .attr('y', function(d){
          return height - (yScale(d[0]));
      })
      .delay(function(d,i) {
        return i * 50;
      })

    var vGuideScale = d3.scaleLinear()
        .domain([0, d3.max(highs)])
        .range([height, 0]);


    var vAxis = d3.axisLeft()
        .scale(vGuideScale)
        .ticks(dataset.length)



    var vGuide = d3.select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate(35, 10)')
        vGuide.selectAll('path')
          .style({ fill: 'none', stroke: '#000'})

    var hAxis = d3.axisBottom()
        .scale(xScale)

    var hGuide = d3.select('svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate(0, ' + (height - 30) + ')')
  }
}

angular
  .module('app')
  .service('CreateChart', CreateChart)
