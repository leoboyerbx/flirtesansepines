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
  name: "HIVDiscoveryDataviz",
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
    series () {
      const stack = d3.stack()
          .keys(this.keys)
          .order(d3.stackOrderNone)
          .offset(d3.stackOffsetNone)

      return stack(this.dataSource)
    },
    colors () { return this.$globals.dataColors },
    xScale () {
      return  d3.scaleLinear()
          .domain(d3.extent(this.dataSource, function(d) { return d.year; }))
          .range([ 0, this.dataWidth ])
    },
    yScale () {
      return d3.scaleLinear()
          .range([this.dataHeight, 0])
          .domain([0, d3.max(this.dataSource, d => d.value)])
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
    },
    yAxis() {
      return d3.axisLeft(this.yScale)
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
      this.svg.append("g")
          .attr("class", "y axis")
          .call(this.yAxis)
    },
    updateAxis () {
      const xAxis = this.svg.selectAll('g.x.axis').call(this.xAxis)
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
      const sumStat = d3.group(this.dataSource, d => d.year)
      const groups = Object.keys(this.dataSource[0] || [])
      const index = groups.indexOf('year');
      if (index > -1) {
        groups.splice(index, 1);
      }

      const stackedData = d3.stack()
          .keys(groups)
          .value(function(d, key){
            return d[1][0][key]
          })(sumStat)

      const color = d3.scaleOrdinal()
          .domain(groups)
          .range(this.$globals.dataColors)

      this.svg.selectAll("path")
          .data(stackedData)
          .join("path")
          .style("fill", d => { const name = groups[d.key-1] ;  console.log(name); return color(name); })
          .attr("d", d3.area()
              .x((d, i) => {
                console.log(d.data[0])
                return this.xScale(d.data.key)
    })
              .y0(d => this.yScale(d[0]))
              .y1(d => this.yScale(d[1]))
          )
      // this.svg.selectAll('rect')
      //   .data(this.dataSource)
      //   .join('rect')
      //   .style('fill', this.$globals.dataColors[1])
      //   .attr('x', d => this.xScale(d.year))
      //   .attr('width', this.xScale.bandwidth())
      //   .attr("y", d =>  this.yScale(d.value))
      //   .attr("height", d => this.dataHeight - this.yScale(d.value))

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
