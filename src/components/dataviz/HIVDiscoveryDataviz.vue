<template>
  <div class="seropositivityDataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
        <div
            class="tooltip"
            ref="tooltip"
            :class="{ visible: tooltipVisible }"
            :style="`transform: translate(${tooltipValues.x}px, ${tooltipValues.y}px)`"
        >
          <span>{{ tooltipValues.year }}</span>
          <span>
            {{ tooltipValues.key }}: {{ tooltipValues.value }}
          </span>
        </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "HIVDiscoveryDataviz",
  props: {
    // taille en pixel du composant
    height: { type: Number },
    width: { type: Number },
    viewMode: { type: Number},
    dataSource: { type: Array },
    userEstimation: Number,
  },
  data: () => ({
    svg: null,
    margin: { top: 20, right: 0, bottom: 0, left: 40 },
    bandSpacing: 30,
    tooltipVisible: false,
    tooltipValues: {
      x: 0,
      y: 0,
      year: 0,
      value: 0,
      key: 0
    }
  }),
  computed: {
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    series () {
      return d3.stack()
          .keys(this.dataSource.columns.slice(1))(this.dataSource)
    },
    area () {
      return d3.area().curve(d3.curveMonotoneX)
          .x(d => this.xScale(d.data.year))
          .y0(d => this.yScale(d[0]))
          .y1(d => this.yScale(d[1]))
    },
    colors () { return this.$globals.dataColors2 },
    color () {
      return d3.scaleOrdinal()
          .domain(this.dataSource.columns.slice(1))
          .range(this.colors)
    },
    xScale () {
      return d3.scaleLinear()
          .range([ 0, this.dataWidth ])
          .domain(d3.extent(this.dataSource, d => d.year))
    },
    yScale () {
      const vals = this.series.map(d => d3.max(d, d => d[1]))
      vals.push(this.userEstimation)
      return d3.scaleLinear()
          .domain([ 0, d3.max(vals)]).nice()
          .range([this.dataHeight, 0])
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
          .tickFormat(x => x.toString())
    },
    yAxis() {
      return d3.axisLeft(this.yScale)
          .tickSize(0)
          .tickFormat(x => x.toLocaleString("fr-FR"))
    },
    transition () {
      return d3.transition().duration(1000)
    },
    bisect () {
      return d3.bisector(d =>  d.year).center
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
    },
    userEstimation () {
      this.updateSvg()
    }
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$refs.svg).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.svg.append("g").attr('class', 'areas')
      this.svg.append("rect").attr('class', 'userEstimation')
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', 2)
          .attr('fill', '#000')
          .attr('width', this.dataWidth)
      this.initAxis()
      this.updateSvg()
      // this.initLegend()
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
      axis.selectAll("text")
          .style('font-size','.9rem')
          .style('font-weight','600')
      //     .style("fill", "#f00")
    },
    styleYAxis (axis) {
       axis.selectAll("text")
          .style('font-size','.9rem')
          .style('font-weight','600')

      //     .style("fill", "#f00")
    },
    updateTooltip (e, key, year, value) {
      this.tooltipVisible = true
      this.tooltipValues.key = this.keyToTooltipText(key)
      this.tooltipValues.year = year
      this.tooltipValues.value = value
      this.tooltipValues.x = e.layerX
      this.tooltipValues.y = e.layerY
    },
    updateSvg () {
      this.svg.select("g.areas")
          .selectAll("path")
          .data(this.series)
          .join(enter => enter.append('path')
                  // .transition().duration(1000)
                  .attr("fill", ({key}) => this.color(key))
                  .attr("d", this.area)
                  .on('mousemove', (e, d) => {
                    const x0 = this.xScale.invert(d3.pointer(e)[0]);
                    const i = this.bisect(this.dataSource, x0, 1);
                    const data = d[i].data
                    this.updateTooltip(e, d.key, data.year, data[d.key])
                  })
                  .on('mouseleave', () => {
                    this.tooltipVisible = false
                  }),
              update => update.call(update => update.transition().duration(1000).attr('d', this.area))
          )
      this.svg.select('rect.userEstimation').attr('y', this.yScale(this.userEstimation))
      this.updateAxis()
    },
    updateViewMode(viewMode) {
      this.$emit('update-view-mode', viewMode)
    },
    keyToTooltipText (key) {
      const matching = {
        total: "Nombre total de contaminations",
        men: "Hommes",
        women: "Femmes",
        hsh: "Hommes ayant des rapports sexuels avec des hommes",
        hetero: "Hétérosexuels",
        drug: "Usagers de drogues (injection intraveineuse)",
        other: "Autres modes de contamination"
      }
      return matching[key]
    }
  },
}
</script>

<style lang="scss">
.seropositivityDataviz {
  position: relative;
  .tooltip {
    pointer-events: none;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: $themeBlue3;
    color: #fff;
    padding: 10px;
    border-radius: 3px;
    opacity: 0;
    font-size: 1.1rem;
    transition: opacity .1s;
    &.visible {
      opacity: 1;
    }

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span:first-child {
      font-weight: bold;
      font-size: 1.1em;
      border-bottom: solid white .5px;
      padding: 0 10px 5px 0;
      margin-bottom: 6px;
    }
  }

  svg {
    overflow: visible;
    .tick{
      font-family: $paragraphFont;
      font-size: $paragraphSize;
      line{
        display:none;
      }
    }

    .axis {
      .tick {
        margin-top: 20px;
      }
    }
  }

  .axis-text {
    //fill: #f00;
    font-family: $titleFont;
    font-size: 1.1em;
  }
}
</style>
