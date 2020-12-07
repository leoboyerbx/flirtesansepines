<template>
  <div class="seropositivityDataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
<!--    <div-->
<!--        class="tooltip"-->
<!--        ref="tooltip"-->
<!--        :class="{ visible: tooltipVisible }"-->
<!--        :style="`transform: translate(${tooltipValues.x}px, ${tooltipValues.y}px)`"-->
<!--    >-->
<!--      {{ tooltipKey }}: {{ tooltipValues.percentage }}%-->
<!--    </div>-->
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "SeropositivityDatavizOld",
  props: {
    // taille en pixel du composant
    width: { type: Number },
    height: { type: Number },

    dataSource: { type: Array },
  },
  data: () => ({
    svg: null,
    margin: {top: 20, right: 200, bottom: 60, left: 100},
    bandSpacing: 30,
    tooltipVisible: false
  }),
  computed: {
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    colors () { return this.$globals.dataColors },
    xScale () {
      return d3.scaleBand()
          .domain(this.dataSource.map(d => d.year))
          .range([0, this.dataWidth])
          .padding(0.2)
    },
    yScale () {
      return d3.scaleLinear()
          .range([this.dataHeight, 0])
          .domain([0, d3.max(this.dataSource, d => d.value)])
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
    }
  },
  mounted() {
      this.initSvg();
  },
  watch: {
    dataSource: {
      deep: true,
      handler() {
        this.updateSvg()
      }
    }
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$refs.svg).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.initAxis()
      this.updateSvg()
    },
    initAxis () {
      const axis = this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.dataHeight + ")")
          .call(this.xAxis)
      this.styleXAxis(axis)
    },
    updateAxis () {
      const axis = this.svg.selectAll('g.x.axis').call(this.xAxis)
      this.styleXAxis(axis)
    },
    styleXAxis (axis) {
      // axis.selectAll("text")
      //     .style("fill", "#f00")
    },
    updateSvg () {
      this.svg.selectAll('rect')
        .data(this.dataSource)
        .join('rect')
        .style('fill', this.$globals.dataColors[1])
        .attr('x', d => this.xScale(d.year))
        .attr('width', this.xScale.bandwidth())
        .attr("y", d =>  this.yScale(d.value))
        .attr("height", d => this.dataHeight - this.yScale(d.value))

      this.updateAxis()
    },
  }
}
</script>

<style lang="scss">
.seropositivityDataviz {
  position: relative;
  .tooltip {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00000088;
    color: #fff;
    padding: 10px;
    border-radius: 3px;
    opacity: 0;
    transition: all .05s;
    &.visible {
      opacity: 1;
    }
  }
  .axis-text {
    //fill: #f00;
    font-family: $titleFont;
    font-size: 1.1em;
  }
}
</style>
