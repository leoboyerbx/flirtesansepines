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
    <div class="filters">
      <label for="all">Tout<br>
        <input v-on:click="updateViewMode(0)" type="radio" id="all" name="detail" value="0">
        <span class="checkmark"></span>
      </label>
      <label for="man/woman">Classement par sexe<br>
        <input v-on:click="updateViewMode(1)" type="radio" id="man/woman" name="detail" value="1">
        <span class="checkmark"></span>

      </label>
      <label for="transmissionMode">Classement par mode de transmission
        <input v-on:click="updateViewMode(2)" type="radio" id="transmissionMode" name="detail" value="2">
        <span class="checkmark"></span>
      </label>
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
    userEstimation: Number
  },
  data: () => ({
    svg: null,
    margin: { top: 20, right: 20, bottom: 60, left: 40 },
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
      return d3.stack()
          .keys(this.dataSource.columns.slice(1))(this.dataSource)
    },
    area () {
      return d3.area()
          .x(d => this.xScale(d.data.year))
          .y0(d => this.yScale(d[0]))
          .y1(d => this.yScale(d[1]))
    },
    colors () { return this.$globals.dataColors },
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
      return d3.scaleLinear()
          .domain([0, d3.max(this.series, d => d3.max(d, d => d[1]))]).nice()
          .range([this.dataHeight, 0])
    },
    xAxis() {
      return d3.axisBottom(this.xScale).ticks(this.dataWidth / 80).tickSizeOuter(0)
    },
    yAxis() {
      return d3.axisLeft(this.yScale).tickSize(-this.dataWidth)
    },
    transition () {
      return d3.transition().duration(1000)
    },
    bisect () {
      return d3.bisector(d =>  d.year).left
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
          .attr('height', 3)
          .attr('fill', '#f00')
          .attr('width', this.dataWidth)
      this.initAxis()
      this.updateSvg()
      this.initLegend()
    },
    initLegend () {
      // add legend
      var legend = this.svg.append("g")
      .attr("class", "legend")
      //.attr("x", 500)
      //.attr("y", 50)
      .attr("height", 100)
      .attr("width", 100)
      .attr('transform', 'translate(-70,80)');

      console.log(this.viewMode)

      var legendItem =	[ ["Hommes", "#031941"],
                ["Femmes", "#5C90B6"] ];
      var legendRect = legend.selectAll('rect').data(legendItem);

      console.log(this.width)
      legendRect.enter()
          .append("rect")
          .attr("y", this.height - 105)
          .attr("width", 30)
          .attr("height", 30)
          .attr("x", (d, i) => {
            return this.width - 70 - (i * 80);
          })
          .style("fill", function(d) {
              return d[1];
          });

      var legendText = legend.selectAll('text').data(legendItem);

      legendText.enter()
            .append("text")
            .attr("y", this.height - 88)
            .attr("x", (d, i) => {
              return this.width - 20 - (i *100);
            })
            .text(function(d){
              return d[0];
            })
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
      // console.log(this.area([
      //     [0, 0]
      this.svg.select("g.areas")
          .selectAll("path")
          .data(this.series)
          .join(enter => enter.append('path')
                  // .transition().duration(1000)
                  .attr("fill", ({key}) => this.color(key))
                  .attr("d", this.area)
                  .on('mousemove', (e) => {
                    const x0 = this.xScale.invert(d3.pointer(e)[0]);
                    var i = this.bisect(this.dataSource, x0, 1);
                  }),
              update => update.call(update => update.transition().duration(1000).attr('d', this.area))
          )
      this.svg.select('rect.userEstimation').attr('y', this.yScale(this.userEstimation))

      // .attr('transform', 'scale(1, 0)')
      // .transition().duration(1000)
      // .attr('transform', 'scale(1, 1)')
      // .attrTween('d', () => {
      //   const interpolator = d3.interpolateArray(startData, this.dataSource);3
      //   return t => {
      //     return this.area(interpolator(t));
      //   }
      // })
      // .append("title")
      // .text(({key}) => key)

      this.updateAxis()
    },
    updateViewMode(viewMode) {
      this.$emit('update-view-mode', viewMode)
    }
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

  svg {
    overflow: visible;
    .tick{
      font-family: $paragraphFont;
      font-size: $paragraphSize;
      line{
        display:none;
      }
    }
  }

  .filters {
    display: flex;
    justify-content: space-around;
    max-width: 72%;
    margin: 60px 0;

    label {
      position: relative;
      color: $themeBlue2;
      font-size: 1.3em;
      font-weight: 500;

      &:hover input ~ .checkmark {
        background-color: #ccc;
      }

      input {

        &:checked ~ .checkmark {
          background-color: $themeBlue2;

          &:after {
            display:block;
          }
        }
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      .checkmark {
        border: 1px solid $themeBlue2;

        &:after {
              content: "";
              position: absolute;
              display: none;
              top: 2px;
              left: 2px;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: $themeBlue2;
              border:2px solid white;
          }

            position: absolute;
            top: -1px;
            left: -29px;
            height: 20px;
            width: 20px;
            background-color: #eee;
            border-radius: 50%;

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
