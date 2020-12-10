<template>
  <div class="death-treatment-dataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'DeathTreatmentDataviz',
  props: {
    width: { type: Number },
    height: { type: Number },
    treatmentDataSource: { type: Array },
    deathDataSource: { type: Array },
  },
  data: () => ({
      svg: null,
      margin: {top: 20, right: 100, bottom: 60, left: 60},
      bandSpacing: 30,
      tooltipVisible: false,
      deathDataScaleCompressionRatio: 2
  }),
  watch: {
    treatmentDataSource: {
      // deep: true,
      handler() {
        this.updateSvg()
      }
    },
    deathDataSource: {
      // deep: true,
      handler() {
        this.updateSvg()
      }
    }
  },
  computed: {
    deathColor () {
      return this.$globals.dataColors[3]
    },
    treatmentColor () {
      return this.$globals.dataColors[1]
    },
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    colors () { return this.$globals.dataColors },
    xScale () {
      return d3.scaleLinear()
          .domain(d3.extent(this.treatmentDataSource, d => d.year))
          .range([0, this.dataWidth])
    },
    treatmentYScale () {
      return d3.scaleLinear()
          .range([this.dataHeight, 0])
          .domain([0, d3.max(this.treatmentDataSource, d => d.value)])
    },
    deathYScale () {
      return d3.scaleLinear()
          .range([this.dataHeight, 0])
          .domain([0, d3.max(this.deathDataSource, d => d.maxValue) * this.deathDataScaleCompressionRatio])
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
          .tickFormat(x => x.toString())
          .tickSize(0)
    },
    treatmentYAxis() {
      return d3.axisLeft(this.treatmentYScale)
          .tickFormat(x => x.toLocaleString("fr-FR"))
          .tickSize(0)

    },
    deathYAxis() {
      return d3.axisRight(this.deathYScale)
           .tickFormat(x => x.toLocaleString("fr-FR"))
           .tickSize(0)
    },
    confidenceIntervalArea () {
      return d3.area().curve(d3.curveMonotoneX)
          .x(d => this.xScale(d.year))
          .y0(d => this.deathYScale(d.minValue))
          .y1(d => this.deathYScale(d.maxValue))
    }
  },
  mounted() {
    this.initSvg();
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$refs.svg).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.confidenceInterval = this.svg.append("path")
          .attr("fill", this.deathColor + '44')
      this.treatmentCurve = this.svg.append("path")
          .attr("fill", "none")
          .attr("stroke", this.treatmentColor)
          .attr("stroke-width", 1.5)
      this.deathCurve = this.svg.append("path")
          .attr("fill", "none")
          .attr("stroke", this.deathColor)
          .attr("stroke-width", 1.5)
      this.initAxis()
      this.updateSvg()
    },
    initAxis () {
      this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.dataHeight + ")")
          .call(this.xAxis)
          .call(this.styleXAxis)
      this.svg.append("g")
          .attr("class", "y treatment axis")
          .call(this.treatmentYAxis)
          .call(this.styleTreatmentYAxis)
      this.svg.append("g")
          .attr("class", "y death axis")
          .attr("transform", "translate(" + this.dataWidth + ", 0)")
          .call(this.deathYAxis)
          .call(this.styleDeathYAxis)
    },
    updateAxis () {
      this.svg.selectAll('g.x.axis')
          .call(this.xAxis)
          .call(this.styleXAxis)
      this.svg.selectAll('g.y.treatment.axis')
          .call(this.treatmentYAxis)
          .call(this.styleTreatmentYAxis)
      this.svg.selectAll('g.y.death.axis')
          .call(this.deathYAxis)
          .call(this.styleDeathYAxis)
    },
    styleXAxis (axis) {
      axis.selectAll("text")
          .style('font-size','.9rem')
          .style('font-weight','600')
          .style('transform','translateY(10px)')
      axis.selectAll('.tick line')
          .style('display','none')
      return axis
    },
    styleTreatmentYAxis (axis) {
      axis.selectAll('.tick line')
          .style('display','none')
      axis.selectAll("text")
          .style("fill", this.treatmentColor)
          .style('font-size','.9rem')
          .style('font-weight','500')
          .style('transform','translateX(-7px)')

      return axis
    },
    styleDeathYAxis (axis) {
      axis.selectAll("text")
          .style("fill", this.deathColor)
          .attr('x', '9px')
          .style('font-size','.9rem')
          .style('font-weight','500')

      axis.selectAll('.tick line')
          .attr('x2', '6px')
          .style('display','none')
      return axis
    },
    updateSvg () {
      this.confidenceInterval
          .datum(this.deathDataSource)
      .attr('d', d3.area().curve(d3.curveMonotoneX)
          .x(d => this.xScale(d.year))
          .y0(d => this.deathYScale(d.minValue))
          .y1(d => this.deathYScale(d.maxValue)))
      this.deathCurve
          .datum(this.deathDataSource)
          .attr("d", d3.line().curve(d3.curveBasis)
              .x((d) => this.xScale(d.year))
              .y((d) => this.deathYScale(d.value))
          )
      this.treatmentCurve
          .datum(this.treatmentDataSource)
          .attr("d", d3.line().curve(d3.curveBasis)
              .x((d) => this.xScale(d.year))
              .y((d) => this.treatmentYScale(d.value))
          )
      this.updateAxis()
    }
}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.death-treatment-dataviz {
  

  .axis {
        
        .tick {
          font-size: 1rem;

          line {
            display:none;
          }
        }
  }
}
</style>