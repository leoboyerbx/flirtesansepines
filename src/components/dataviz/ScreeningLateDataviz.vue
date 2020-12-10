<template>
  <div class="screening-late-dataviz">
      <svg class="screennig-late-dataviz"
        :height="height"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        ref="svg"
        >

        <rect v-for="(data, index) in chartData"
            :key="index"
            :height="100"
            :width="data.widthValue"
            :x="data.x"
            :fill="data.color"
            @mouseover="legendDisplayed = index"
            @mouseout="legendDisplayed = null"
        >
        </rect>

        
      </svg>
      <div class="tooltip">
          <div class="tooltip-item"
          v-for="(data, index) in chartData"
            :key="index"
            :style="{ left: data.x + data.widthValue/6+'%' }"
            :class="{ visible: legendDisplayed === index }"
        >
            <span class="border" :style="{ backgroundColor: data.color}"></span>
            <div>
                <p class="percent">{{ data.value }} personnes</p>
                <p class="info">{{ data.comment }}</p>
            </div>
          </div>
      </div>

      <div class="legend">
          <div class="legend-item"
          v-for="(data, index) in chartData"
            :key="index"
            :style="{ left: data.x + data.widthValue/6+'%' }"
            :class="{ visible: legendDisplayed === index }"
        >
            <span class="identifier" :style="{ backgroundColor: data.color}"></span>
            <p class="percent">{{ data.delay }} *</p>
          </div>
      </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: 'ScreeningLateDataviz',
  props: {
    width: Number,
    height: Number,
  },
  data: () => ({
    svg: null,
    g: null,
    radius: 200,
    tooltipVisible: false,
    details: false,
    dataSource: [],
    key: '',
    barsSpacing: 2,
    legendDisplayed: null
  }),
  mounted() {
    this.generateTimeChart();
  },
  computed: {
      chartData () {
          let accumulator = 0
        const barsSpacingRatio = this.barsSpacing / this.dataSource.length
          return this.dataSource.map(data => {
              data.x = accumulator
              accumulator += data.value + barsSpacingRatio
              data.widthValue = data.value - this.barsSpacing - barsSpacingRatio
              return data
          })
      },
     colors () { return this.$globals.dataColors },
  },
  methods: {
    setLegendDisplayed (index) {
        this.legendDisplayed = index
    },
    mouseOut () {
        this.setLegendDisplayed = null
    },
     generateTimeChart () {
         d3.csv("datas/screeningLate.csv",
         (d,i) => {
             d.value = +d.value
             d.color = this.colors[i]
             return d
         }).then((data)  => {
            this.dataSource = data;
         })


     }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.screening-late-dataviz {
  width: 100%;
  svg {
      width: 100%;
      text {
          font-family: Font;
          font-size: 0.7rem;
          width: 100%;
      }
  }

  .tooltip {
      position: relative;
      margin-top: -5px;
      height: 200px;

      .tooltip-item {
        position:absolute;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 300px;
        transition: all .3s;
        opacity: 0;
        &.visible {
            opacity: 1;
        }
          .border {
              height: 100px;
              width: 2%;
          }
          div {
              width: 90%;   
          }

            .percent {
                font-family: $titleFont;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }

            .info {
                font-family: $paragraphFont;
                font-size: 1.2rem;
                margin-top:0;
            }
      }
  }

  .legend {
      display: flex;
      .legend-item{
          display: flex;
         margin-right: 30px;
         align-items: center;
         font-size: 1.4rem;
          span {
              width: 25px;
              height: 25px;
              margin-right: 10px;
          }
      }


  }
}




</style>
 