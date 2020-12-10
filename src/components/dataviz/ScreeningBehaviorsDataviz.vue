<template>
  <div class="screeningBehaviourDataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
    <div
        class="tooltip"
        ref="tooltip"
        :class="{ visible: tooltipVisible }"
        :style="`transform: translate(${tooltipValues.x}px, ${tooltipValues.y}px)`"
    >
      {{ tooltipKey }}: <strong>{{ tooltipValues.percentage }}%</strong>
    </div>
    <div class="legend">
          <div class="legend-item"
          v-for="(data, key) in legendValue"
            :key="key">
            <span class="identifier"
                :style="{ backgroundColor: $globals.dataColors.getColorCode(key) }"></span>
            <p class="legend-name">{{ data }}</p>
          </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _throttle from 'lodash.throttle'

export default {
  name: "ScreeningBehaviorsDataviz",
  props: {
    width: { type: Number },
    height: { type: Number },

    dataSource: { type: Array },
  },
  data: () => ({
    svg: null,
    margin: {top: 0, right: 10, bottom: 30, left: 110},
    keys: ['age', "never", "over12Months", "in12Months"],
    bandSpacing: 30,
    tooltipVisible: false,
    tooltipValues: {
      percentage: 0,
      key: '',
      x: 0,
      y: 0
    },
    legendValue: ['Jamais', 'Dans les 12 derniers mois', 'Il y a plus de 12 mois' ]
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
      const { x, y } = this.scaleBands

      const yAxisGenerator = d3.axisLeft(y)
      const yAxis = this.svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(-30,0)")
          .call(yAxisGenerator)


      yAxis.selectAll("text")
          .style("text-anchor", "end")
          .attr('class', 'axis-text')
      yAxis.selectAll(".domain, line").remove()
    },

    renderSvg () {
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
            const pointer = d3.pointer(e, this.svg.node().parentNode.parentNode)
            this.tooltipValues = {
              percentage: (d[1] - d[0]),
              key: d.key,
              x: pointer[0],
              y: pointer[1]
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
  display: flex;
  flex-direction: column;
  .tooltip {
    pointer-events: none;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: $themeBlue3;
    color: #fff;
    padding: 10px;
    font-size: 1rem;
    border-radius: 3px;
    opacity: 0;
    transition: all .05s;
    &.visible {
      opacity: 1;
    }
  }

  .legend {
    display:flex;
    .legend-item {
      display:flex;
      align-items: center;
      margin-right: 16px;
      .legend-name {
        font-size: 1.4rem;
        margin:0;
        color: white;
      }
      span {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
  }

  .axis-text {
    //fill: #f00;
    font-family: $paragraphFont;
    font-size: 1rem;
    color: white;
  }

  svg{
    margin:auto;
  }
}
</style>
