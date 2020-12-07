<template>
  <svg id="condom-usage-dataviz" width="500" height="500">
    
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'CondomUsageDataviz',
  
  data: () => ({
    
  }),
  mounted() {
    this.generatePieChart();
  },
  methods: {
     generatePieChart() {
       const data = [{name: 'Oui', value: 41.2},{name: 'Non', value: 17.1}, {name: 'Ayant déjà eu des rapports non protégés', value: 41.7}];

       const svg = d3.select('#condom-usage-dataviz'),
             width = svg.attr('width'),
             height = svg.attr('height');
        
        const radius = 200;

        const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

        const color = d3.scaleOrdinal(['red','blue','green']);

        const pie = d3.pie().value(d => d.value);

        const path = d3.arc().outerRadius(radius).innerRadius(0);
        const label =d3.arc().outerRadius(radius).innerRadius(radius - 150);

        const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class','arc')
          .on("click",function(d) { 
              // The amount we need to rotate:
              var rotate = 45-(d.explicitOriginalTarget.__data__.startAngle + d.explicitOriginalTarget.__data__.endAngle)/2 / Math.PI * 180;
              // Transition the pie chart
              g.transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + rotate + ")")
                .duration(1000);
              svg.transition()
                  .attr("transform",  "translate(" + -width*1.4 + "," + height / 2 + ")")
                  .duration(1000);

          });

        pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));
        pies.append('text')
            .text(d => d.data.name)
            .attr('transform', d => `translate(${label.centroid(d)})`)
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#condom-usage-dataviz {
  .arc{
    text{
      text-anchor: middle;
    }
  }
}

</style>
 