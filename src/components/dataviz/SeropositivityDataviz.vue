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
import _throttle from 'lodash.throttle'

export default {
  name: "SeropositivityDataviz",
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
    colors () { return this.$globals.dataColors }
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
    },
    renderSvg () {
      console.log('hey')
      this.svg.selectAll("text")
          .data(this.dataSource)
          .join("text")
          .attr("x", (d, i) => i * 16)
          .text(d => d);
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
