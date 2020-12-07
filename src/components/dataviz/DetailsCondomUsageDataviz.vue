<template>
  <div class="DetailsCondomUsageDataviz">
    <svg id="detail-condom-usage-dataviz"  :width="width" :height="height" ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "DetailsCondomUsageDataviz",
  props: {
    // taille en pixel du composant
    width: { type: Number },
    height: { type: Number },
    dataSource: { type: Array }
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
      return d3.scaleLinear()
          .range([0, this.dataWidth])
          .domain([0, d3.max(this.dataSource, d => d.value)])
    },
    yScale () {
      return d3.scaleBand()
          .range([0, this.dataHeight])
          .domain(this.dataSource.map(d => d.reason))
          .padding(0.2)
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
    },
    yAxis() {
      return d3.axisLeft(this.yScale)
    },
    transition () {
      this.svg.transition().duration(750)
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
      const xAxis = this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.dataHeight + ")")
          .call(this.xAxis)
      this.styleXAxis(xAxis)
      const yAxis = this.svg.append("g")
          .attr("class", "y axis")
          .call(this.yAxis)
      this.styleYAxis(yAxis)
    },
    updateAxis () {
      const xAxis = this.svg.selectAll('g.x.axis').transition(this.transition).call(this.xAxis)
      this.styleXAxis(xAxis)
      const yAxis = this.svg.selectAll('g.y.axis').call(this.yAxis)
      this.styleYAxis(yAxis)
    },
    styleXAxis (axis) {
      // axis.selectAll("text")
      //     .style("fill", "#f00")
    },
    styleYAxis (axis) {
      // axis.selectAll("text")
      //     .style("fill", "#f00")
    },
    updateSvg () {
      this.svg.selectAll('rect')
        .data(this.dataSource)
        .join(
          enter => enter.append('rect').style('fill', this.$globals.dataColors[1])
            .attr('x', 0 )
            .attr('width', d => this.xScale(d.value))
            .attr("y", d =>  this.yScale(d.reason))
            .attr("height", this.yScale.bandwidth()),
          update => update
            .call(update => update.transition(this.transition)
              .attr('width', d => this.xScale(d.value)))
        )
        
      this.updateAxis()
    },
  }
}
</script>

<style lang="scss">
.DetailsCondomUsageDataviz {
  position: relative;
  display:flex;
  .axis-text {
    //fill: #f00;
    font-family: $titleFont;
    font-size: 1.1em;
  }

  svg{
    margin:auto;
  }
}
</style>
