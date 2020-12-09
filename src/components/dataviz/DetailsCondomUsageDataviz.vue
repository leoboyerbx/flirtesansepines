<template>
  <div class="detailsCondomUsageDataviz" :class="{ detailsDisplay }">
    <h1>Raisons avancées</h1>
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
    dataSource: { type: Array },
    detailsDisplay: { type: Boolean }
  },
  data: () => ({
    svg: null,
    margin: {top: 20, right: 20, bottom: 60, left: 250},
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
      return this.svg.transition().duration(750)
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
      const xAxis = this.svg.selectAll('g.x.axis').transition().duration(750).call(this.xAxis)
      this.styleXAxis(xAxis)
      const yAxis = this.svg.selectAll('g.y.axis').call(this.yAxis)
      this.styleYAxis(yAxis)
    },
    styleXAxis (axis) {
    },
    styleYAxis (axis) {
      console.log(axis.selectAll('.tick'));
      const yNodeAxis = axis.selectAll('g.tick text');
      yNodeAxis.attr("transform", "translate(-20, -12)")
      this.wrap(yNodeAxis, 200)
      //axis.selectAll('.tick')._groups[0].call(this.wrap, 40)
    },
    updateSvg () {
      this.svg.selectAll('rect')
        .data(this.dataSource)
        .join(
          enter => enter.append('rect').style('fill', this.$globals.dataColors[0])
            .attr('x', 0 )
            .attr('width', d => this.xScale(d.value))
            .attr("y", d =>  this.yScale(d.reason))
            .attr("height", this.yScale.bandwidth()),
          update => update
            .call(update => update.transition().duration(750)
              .attr('width', d => this.xScale(d.value)))
        )
      this.updateAxis()
    },
    wrap(text, width) {
      text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            console.log(text)
        // eslint-disable-next-line no-cond-assign
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }
}}
</script>

<style lang="scss">
.detailsCondomUsageDataviz {
  position: absolute;
  left: 35%;
  top: 20%;
  opacity: 0;
  visibility: hidden;
  transition: all ease-in-out 0.2s;

  h1 {
      font-family: $paragraphFont;
      font-size: 1rem;
      text-transform: uppercase;
      margin: 0.5rem 0;
      color: #ffff;
      text-align: left;
      width: 100%;
  }

  &.detailsDisplay {
    opacity:1;
    width: auto;
    visibility: visible;
    transition-delay: 1.4s;

    svg {
      width: auto;
    }
  }
  .axis-text {
    //fill: #f00;
    font-family: $titleFont;
    font-size: 1.1em;
  }

  svg{
    margin:auto;
    width: 0;

    .axis {

        tspan {
          font-family: $paragraphFont;
          font-size: 0.8rem;
        }
        line {
          display:none;
        }
        text{
          color: white;
          font-size: 1rem;
        }
        &.y {
          .domain {
            display:none;
          }
        }

        &.x {
          .domain {
            color: white;
            height: 2px;
            display: none;
          }
        }
      }
  }
}
</style>
