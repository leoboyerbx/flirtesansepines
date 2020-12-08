<template>
  <div class="condom-usage-dataviz-container">
    <h1>Utilisation du préservatif</h1>
    <svg class="condom-usage-dataviz" :width="width" :height="height" :class="{ details }">
    </svg>
    <div class="tooltip" :class="{ visible: tooltipVisible }">
      <span class="arrow"></span>
      <span class="value">{{ tooltipValues.percentage }} %</span>
      <span class="desc">{{ tooltipValues.tooltip }}</span>
      <button class="read-more"> En savoir +</button>
    </div>
    <div class="legend">
      <span></span>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'CondomUsageDataviz',
  props: {
    dataSource: { 
      type: Array,
      required: true,
    },
    width: Number,
    height: Number

  },
  data: () => ({
    svg: null,
    g: null,
    radius: 200,
    tooltipVisible: false,
    details: false,
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
    color () {
      return d3.scaleOrdinal(this.$globals.dataColors)
    },
    pie () {
      return d3.pie().value(d => d.value)
    },
    path () {
      return d3.arc().outerRadius(this.radius).innerRadius(0)
    }
  },
  watch: {
    dataSource: {
      deep: true,
      handler () {
        this.updatePieChart()
      }
    }
  },
  methods: {
     generatePieChart() {

       this.svg = d3.select('.condom-usage-dataviz'),

        this.g = this.svg.append('g').attr('transform', `translate(${this.width/2}, ${this.height/2})`);
        this.updatePieChart()
    },
    updatePieChart () {
        const pies = this.g.selectAll('.arc')
          .data(this.pie(this.dataSource))
          .enter().append('g')
          .attr('class', 'arc')
          .on("click", d => { 
              // The amount we need to rotate:
              const rotate = 45-(d.explicitOriginalTarget.__data__.startAngle + d.explicitOriginalTarget.__data__.endAngle)/2 / Math.PI * 180;              // Transition the pie chart
              this.g.transition()
                .attr("transform",  "translate(" + this.width / 2 + "," + this.height / 2 + ") rotate(" + rotate + ")")
                .duration(1000);
              this.details = true
          })
          .on('mouseover', (e, d) => {
            this.tooltipVisible = true;
            this.tooltipValues = {
              percentage: (d.data.value),
              tooltip: (d.data.tooltip)
            }

          })

        pies.append('path').attr('d', this.path).attr('fill', d => this.color(d.data.value));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.condom-usage-dataviz-container {
  h1 {
      font-family: $titleFont;
      font-size: 3.5em;
      margin: 1rem 0;
      color: #ffff;
      text-align: center;
      width: 100%;
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color:$themeRed;
  width: 100vw;
  height: 100vh;
  padding: 3% 0;
  .tooltip {
    background-color: white;
    width: 300px;
    display: flex;
    flex-direction:column;
    text-align: center;
    font-family: $titleFont;
    height: fit-content;
    position: relative;
    padding: 1.2rem;
    margin-left: 6%;
    opacity: 0;
    transition: all ease-in-out 0.3s;
    pointer-events: none;
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
      cursor: pointer;
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
  .condom-usage-dataviz {
    cursor: pointer;
    transition: all 1s;
    &.details {
      transform: translate(-50%, 50%);
    }
    g {
      width: 100%;
      height: 100%;
    }
    .arc{
      text{
        text-anchor: middle;
      }
    }
    &:not(.details) + .tooltip.visible {
      opacity: 1;
      pointer-events: all;
    }
  }
}




</style>
 