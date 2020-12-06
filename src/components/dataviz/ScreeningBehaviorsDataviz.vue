<template>
  <div class="screeningBehaviourDataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
    <div
        class="tooltip"
        ref="tooltip"
        :class="{ visible: tooltipVisible }"
        :style="`transform: translate(${tooltipValues.x}px, ${tooltipValues.y}px)`"
    >
      {{ tooltipKey }}: {{ tooltipValues.percentage }}%
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _throttle from 'lodash.throttle'

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
    margin: {top: 20, right: 200, bottom: 60, left: 100},
    keys: ['age', "never", "over12Months", "in12Months"],
    bandSpacing: 30,
    tooltipVisible: false,
    tooltipValues: {
      percentage: 0,
      key: '',
      x: 0,
      y: 0
    }
  }),
  computed: {
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    scaleBands () {
      const data = this.dataSource
      const series = this.series
      return{
        x: d3.scaleLinear()
            .domain([0, d3.max(series[series.length - 1], d => d[1])])
            .range([this.dataWidth, 0]),
        y: d3.scaleBand()
            .domain(data.map(d => d.age))
            .range([0, this.dataHeight])
      }
    },
    series () {
      const stack = d3.stack()
          .keys(this.keys)
          .order(d3.stackOrderNone)
          .offset(d3.stackOffsetNone)

      return stack(this.dataSource)
    },
    colors () { return this.$globals.dataColors },
    tooltipKey () {
      switch (this.tooltipValues.key){
        case 'never':
          return 'Jamais'
        case 'in12Months':
          return "Dans les 12 derniers mois"
        case 'over12Months':
          return 'Il y a plus de 12 mois'
      }
      return ''
    }
  },
  mounted() {
      this.initSvg();
  },
  watch: {
    dataSource () {
      this.renderSvg()
    }
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$refs.svg).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.tooltip = d3.select(this.$refs.tooltip)
      this.renderSvg()
    },
    generateAxis () {
      const {x, y} = this.scaleBands

      const yAxisGenerator = d3.axisLeft(y)
      const yAxis = this.svg.append("g")
          .attr("class", "y axis")
          .call(yAxisGenerator)

      yAxis.selectAll("text")
          .style("text-anchor", "end")
          .attr('class', 'axis-text')
      yAxis.selectAll(".domain, line").remove()
    },

    renderSvg () {
      console.log('rendering svg')
      const {x, y} = this.scaleBands
      const series= this.series
      const groups = this.svg.selectAll("g.groupe")
          .data(series)
          .enter().append('g')
          .style("fill", (d, i) => this.colors[i - 1])
          // .exit().remove()

      // let rect =


      groups.selectAll("rect")
          .data(d => {
            d.forEach(child => {
              child.key = d.key
            })
            return d
          })
          .enter().append('rect')
          .attr("y", (d ,i) => {
            return (i * y.bandwidth()) + this.bandSpacing / 2
          })
          .attr("height", y.bandwidth() - this.bandSpacing)
          .attr("x", d => x(d[1]))
          .attr("width", d => (this.dataWidth - x(d[1] - d[0])))
          .on('mouseover', () => {
            this.tooltipVisible = true
          })
          .on('mousemove',  _throttle((e, d) => {
            this.tooltipValues = {
              percentage: (d[1] - d[0]),
              key: d.key,
              x: e.pageX,
              y: e.pageY
            }
          }, 50))
          .on('mouseleave', () => {
            this.tooltipVisible = false
          })
        this.generateAxis()
    },
  }
}
</script>

<style lang="scss">
.screeningBehaviourDataviz {
  position: relative;
  display:flex;
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

  svg{
    margin:auto;
  }
}
</style>
