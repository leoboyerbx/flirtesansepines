<template>
  <div class="condom-usage-dataviz-container">
    
    <svg id="condom-usage-dataviz" width="500" height="500">
    </svg>
    <div id="tooltip">
      <span class="arrow"></span>
      <span class="value">{{ tooltipValues.percentage }} %</span>
      <span class="desc">{{ tooltipValues.tooltip }}</span>
      <button class="read-more"> En savoir +</button>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'CondomUsageDataviz',
  data: () => ({
    svg: null,
    tooltipVisible: false,
    tooltipValues: {
      percentage: 0,
      tooltip: '',
      x: 0,
      y: 0
    }
  }),
  mounted() {
    this.generatePieChart();
  },
  computed: {
    colors () { return this.$globals.dataColors },
  },
  methods: {
     generatePieChart() {
       const data = [{name: 'Oui', value: 41.2, tooltip:"Des personnes interogées assurent utiliser le préservatif à chaque rapport sexuel"},{name: 'Non', value: 17.1, tooltip:"Des personnes interogées n'utilisent pas le préservatif pour leur rapport sexuel"}, {name: 'Ayant déjà eu des rapports non protégés', value: 41.7, tooltip:"Des personnes interogée n'utilisent pas sytèmatiquement le préservatif"}];

       const svg = d3.select('#condom-usage-dataviz'),
             width = svg.attr('width'),
             height = svg.attr('height');
        
        const radius = 200;

        const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);
      console.log(this.$globals.dataColors[0])
        const color = d3.scaleOrdinal(this.$globals.dataColors[0],this.$globals.dataColors[1],this.$globals.dataColors[2]);

        const csv = d3.scaleOrdinal(['datas/detailsCondomUsage.csv','datas/detailsNoCondomUsage.csv','']);
        const tooltip = d3.select("#condom-usage-dataviz").append("div")	
                .attr("class", "tooltip")				
                .style("opacity", 0);

        const pie = d3.pie().value(d => d.value);
      

        const path = d3.arc().outerRadius(radius).innerRadius(0);

        const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc').attr('csv', d => csv(d.data.value))
          .on("click",function(d) { 
              // The amount we need to rotate:
              var rotate = 45-(d.explicitOriginalTarget.__data__.startAngle + d.explicitOriginalTarget.__data__.endAngle)/2 / Math.PI * 180;              // Transition the pie chart
              g.transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + rotate + ")")
                .duration(1000);
              svg.transition()
                  .attr("transform",  "translate(" + -width*1.4 + "," +  height / 2 + ")")
                  .duration(1000);
          })
          .on('mouseover', (e, d) => {

            d3.select("#tooltip")
              .style("opacity", 1)
            this.tooltipValues = {
              percentage: (d.data.value),
              tooltip: (d.data.tooltip)
            }

          })

        pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));

        

  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.condom-usage-dataviz-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  #tooltip {
    background-color: white;
    max-width: 200px;
    display: flex;
    flex-direction:column;
    text-align: center;
    font-family: $titleFont;
    height: fit-content;
    position: relative;
    padding: 1.2rem;
    .value {
      color: $themeRed;
      font-size: 1.9rem;
      margin-bottom: 1rem;
    }

    .desc {
      color: black;
      font-size: 1.2rem;
      margin-bottom: 2.3rem;
    }

    button {
      background-color: $themeBlue2;
      color: #ffff;
      border-radius: 50px;
      padding: 15px 20px;
      font-family: $paragraphFont;
      font-size: 1.2rem;
      border:none;
    }

    .arrow {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 20px solid #FFFF;
      position: absolute;
      top: 43%;
      left: -30px;
      transform: rotate(90deg);
    }
      
  }
  #condom-usage-dataviz {
    .arc{
      text{
        text-anchor: middle;
      }
    }
  }
}




</style>
 