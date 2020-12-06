<template>
  <svg class="screeningBehaviourDataviz" :width="width" :height="height"></svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "ScreeningBehaviorsDataviz",
  props: {
    // taille en pixel du composant
    width: { type: Number },
    height: { type: Number },

    dataSource: { type: Array },
  },
  data: () => ({
    svg: null,
    margin: {top: 20, right: 40, bottom: 60, left: 100},
    keys: ['age', "never", "over12Months", "in12Months"],
    colors: ["#f7fcf0", "#e0f3db", "#ccebc5"],
    legendCellSize: 20,
    tooltipWidth: 210,
    bandSpacing: 30
  }),
  computed: {
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    }
  },
  mounted() {
    this.initSvg();
  },
  updated() {
    this.renderSvg()
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$el).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.renderSvg();
    },
    renderSvg () {
      const data = this.dataSource
      const stack = d3.stack()
        .keys(this.keys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone)

      const series = stack(this.dataSource)

      const y = d3.scaleBand()
          .domain(data.map(d => d.age))
          .range([0, this.dataHeight])

      const x = d3.scaleLinear()
          .domain([0, d3.max(series[series.length - 1], d => d[1])])
          .range([this.dataWidth, 0]);

      const yAxisGenerator = d3.axisLeft(y)
      const yAxis = this.svg.append("g")
          .attr("class", "y axis")
          .call(yAxisGenerator)

      yAxis.selectAll("text")
          .style("text-anchor", "end")
          .attr('class', 'axis-text')
      yAxis.selectAll(".domain, line").remove()
          // .attr("y", -this.bandSpacing/2)
          // .attr("dy", - this.bandSpacing / 2 + 'px')


      const groups = this.svg.selectAll("g.groupe")
          .data(series)
          .enter()
          .append("g")
          .style("fill", (d, i) => this.colors[i - 1]);

      // let rect =
      groups.selectAll("rect")
          .data(d => d)
          .enter()
          .append("rect")
          .attr("y", (d ,i) => {
            return (i * y.bandwidth()) + this.bandSpacing / 2
          })
          .attr("height", y.bandwidth() - this.bandSpacing)
          .attr("x", d => x(d[1]))
          .attr("width", d => (this.dataWidth - x(d[1] - d[0])))
    }
  }
}
</script>

<style lang="scss">
  .screeningBehaviourDataviz {
    .axis-text {
      //fill: #f00;
      font-size: 1.1em;
    }
  }
</style>
