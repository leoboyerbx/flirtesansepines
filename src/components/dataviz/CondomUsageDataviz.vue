<template>
  <div class="condom-usage-dataviz-container" >
    <svg class="condom-usage-dataviz" :width="width" :height="height" :class="{ details: detailsDisplay }">
    </svg>
    <div class="tooltip" :class="{ visible: tooltipVisible }">
      <span class="arrow"></span>
      <span class="value">{{ tooltipValues.percentage }} %</span>
      <span class="desc">{{ tooltipValues.tooltip }}</span>
      <button class="read-more" @click="learnMore"> En savoir +</button>
    </div>
    <div class="legend" :class="{ details: detailsDisplay }">
      <div class="legend-item" v-for="(data, index) in dataSource" :key="index" >
        <div class="legend-square" :style="{ backgroundColor: $globals.dataColors3.getColorCode(index) }"></div>
        <p>{{data.name}}</p>
      </div>
      <div class="legend-item" >
        <div class="legend-line"></div>
        <p>Votre réponse</p>
      </div>
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
    height: Number,
    detailsDisplay : Boolean,
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
      rotateAngle: 0
    },
    currentPie:0
  }),
  mounted() {
    this.generatePieChart();
  },
  computed: {
    color () {
      return d3.scaleOrdinal(this.$globals.dataColors3)
    },
    pie () {
      return d3.pie().value(d => d.value).sort(null)
    },
    path () {
      return d3.arc().outerRadius(this.radius).innerRadius(0)
    },
    userCondomUsage () {
      return this.$store.state.condomUsage
    }
  },
  watch: {
    dataSource: {
      deep: true,
      handler () {
        this.updatePieChart()
      }
    },
    userCondomUsage (newVal) {
      console.log(newVal)
      this.svg.selectAll('.chart-sector')
        .attr('stroke', 'none')
      this.svg.select('.chart-' + newVal)
        .attr('stroke', this.$globals.dataColors3[3])
        .attr('stroke-width', '2')
    }
  },
  methods: {
     generatePieChart() {

       this.svg = d3.select('.condom-usage-dataviz'),

        this.g = this.svg.append('g').attr('transform', `translate(${this.width/2}, ${this.height/2})`);
        this.updatePieChart()
    },
    rotateChart () {
      this.g.transition()
                .attr("transform",  "translate(" + this.width / 2 + "," + this.height / 2 + ") rotate(" + this.tooltipValues.rotateAngle + ")")
                .duration(1000);
    },
    updatePieChart () {
        const pies = this.g.selectAll('.arc')
          .data(this.pie(this.dataSource))
          .enter().append('g')
          .attr('class', 'arc')
          .on("click", (e, d) => {
              this.rotateChart()
              this.$emit('detail-index-change', d.index)
              this.$emit('detail-display')
          })
          .on('mouseover', (e, d) => {
            this.currentPie =  d.index;
            this.tooltipVisible = true;
            this.tooltipValues = {
              percentage: (d.data.value),
              tooltip: (d.data.tooltip),
              rotateAngle: 45-(e.explicitOriginalTarget.__data__.startAngle + e.explicitOriginalTarget.__data__.endAngle)/2 / Math.PI * 180
            }
          })
        pies.append('path')
        .attr('class',d => 'chart-sector chart-' + d.index)
        .attr('d', this.path)
        .attr('fill', d => this.color(d.data.value))
        .attr('stroke', d => d.index === this.$store.state.condomUsage ? this.$globals.dataColors3[3] : 'none')
        .attr('stroke-width', '2')
    },
    getColor (key) {
      const index = this.dataSource.columns ? this.dataSource.columns.indexOf(key) - 1 : -1
      if (index > -1) {
        return this.getColorCode(index)
      }
    },
    learnMore () {
      this.rotateChart()
      this.$emit('detail-display')
      this.$emit('detail-index-change', this.currentPie)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.condom-usage-dataviz-container {

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .legend {
    display: flex;
    flex-direction:column;
    width: 100%;
    color: #fff;
    font-family: $paragraphFont;
    font-size: 0.8rem;
    transition: all .3s .6s;
    &.details {
      transition: all .3s;
      opacity: 0;
      pointer-events: none;
    }
    .legend-item {
      display: flex;
      align-items: center;
      font-size: $paragraphSize;
      margin: 5px 0;
      p {
        margin:0;
      }
      .legend-square {
        width: 30px;
        height: 30px;
        margin-right:10px;
      }
      .legend-line {
        width: 30px;
        height: 5px;
        margin-right:10px;
        background-color: $themeBlue3;
      }
    }
  }
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
      transform: translate(-80%, 55%) scale(1.7);
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
