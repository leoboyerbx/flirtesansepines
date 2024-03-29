<template>
  <article
      v-on:wheel="onWheelChangeSlide"
      class="seropositivity-data"
      :class="[ currentState, arrivingClass ]"
      :style="{ display: displayStyle }"
  >
    <h1>Nombre de cas séropositifs <br>en France</h1>
    <section class="diag">
      <HIVDiscoveryDataviz
        :width="900"
        :height="380"
        :data-source="currentDataSource"
        :user-estimation="userEstimation"
        :viewMode="viewMode"
        class="hiv-dataviz"
      />
      <div class="legend">
        <div class="legend-item" v-for="(col, index) in currentDataSource.legendColumns" :key="index">
          <div class="legend-square" :style="{ backgroundColor: getColor(col) }"></div>
          {{ currentDataSource.legendItem[index] }}
        </div>

        <div class="legend-item response">
          <div class="legend-line"></div>
          Votre réponse
        </div>
      </div>
    </section>
    <section class="diag-bottom">
      <div class="filters">
        <label for="all">Total<br>
          <input type="radio" id="all" name="detail" :value="0" v-model="viewMode">
          <span class="checkmark"></span>
        </label>
        <label for="man/woman">Par sexe<br>
          <input type="radio" id="man/woman" name="detail" :value="1" v-model="viewMode">
          <span class="checkmark"></span>

        </label>
        <label for="transmissionMode">Par mode de transmission
          <input type="radio" id="transmissionMode" name="detail" :value="2" v-model="viewMode">
          <span class="checkmark"></span>
        </label>
      </div>
    </section>
  </article>
</template>

<script>
import * as d3 from 'd3'
import {csv} from 'd3'
import HIVDiscoveryDataviz from "@/components/dataviz/HIVDiscoveryDataviz";
import sequence from "@/mixins/sequenceMixin";

export default {
  name: 'HIVDiscoverySequence',
  mixins: [sequence],
  components: {HIVDiscoveryDataviz},
  data: () => ({
    number:1000,
    dataSource: [],
    viewMode: 0,
    displayNextSlide: false,
    scrollFactor: 10,
    translateY: 0
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  created() {
    this.getDataSource()
  },
  methods: {
    async getDataSource () {
      this.dataSource = await csv('datas/hivDiscovery.csv', data => {
        data.total = +data.total
        data.men = +data.men
        data.women = +data.women
        data.hsh = +data.hsh
        data.hetero = +data.hetero
        data.drug = +data.drug
        data.other = +data.other
        return data
      })
    },
    updateViewMode(viewMode) {
      this.viewMode = viewMode;
    },
    getColor (key) {
      const index = this.dataSource.columns ? this.dataSource.columns.indexOf(key) - 1 : -1
      if (index > -1) {
        return this.$globals.dataColors2.getColorCode(index)
      }
    }
  },
  computed: {
    userEstimation () {
      return this.$store.state.hivEstimation
    },
    currentDataSource () {
      let cols = ['year', 'total']
      let colsLegend = ['Année', 'Total']
      let excludedCols = ['men', 'women', 'hsh', 'hetero', 'drug', 'other']
      switch (this.viewMode) {
        case 1:
          cols = ['year', 'men', 'women']
          excludedCols = ['total', 'hsh', 'hetero', 'drug', 'other']
          colsLegend = ['Année', 'Hommes', 'Femmes']
          break;
        case 2:
          cols = ['year', 'hsh', 'hetero', 'drug', 'other']
          excludedCols = ['total', 'men', 'women']
          colsLegend = ['Année', 'Hommes ayant des rapports sexuels avec des hommes', 'Hétérosexuels', 'Usagers de drogues (injection intraveineuse)', 'Autre']
      }
      const result = this.dataSource.map(d => {
        const res = {}
        cols.forEach(col => {
          res[col] = d[col]
        })
        excludedCols.forEach(col => {
          res[col] = 0
        })
        return res
      })
      result.columns = this.dataSource.columns || []
      result.legendColumns = cols.slice(1)
      result.legendItem = colsLegend.slice(1)
      return result
    },
    total: function () {
      return this.number
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.seropositivity-data {
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  transition: all $slideDurationEasing;
  margin: auto;
  padding: 4% 10%;
  &.future {
    transform: translate3d(0, 100vh, 0);
  }
  &.arriving-forward {
    animation: arriving-from-bottom $slideDurationEasing;
  }
  &.past {
    opacity: 0;
  }
  &.arriving-backward {
    animation: fade-in $slideDurationEasing $slideDuration both;
  }

  h1 {
    color: $themeRed;
    font-size: $titleSize;
    text-align: left;
    font-family: $titleFont;
  }
  .diag {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .legend {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      width: 200px;

      .legend-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 8px;
        font-size: 1.4rem;
        font-weight: bold;

        .legend-line {
          margin-top: 10px;
        }
        
        .legend-square {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .legend-line {
          width: 25px;
          height: 5px;
          margin-right: 10px;
          background-color: #000;
        }
      }
    }
  }

  .hiv-dataviz {
    display: flex;
    justify-content: center;
  }

  .diag-bottom {
    display: flex;
    justify-content: space-between;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  .filters {
    display: flex;
    justify-content: flex-start;
    max-width: 72%;
    margin: 60px 0;
    font-size:.9rem;
      font-weight:bold;

    label {
      position: relative;
      color: $themeBlue2;
      font-size: 1.5em;
      font-weight: bold;
      margin-right: 45px;
      
      cursor: pointer;

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
        top: 50%;
        left: -29px;
        height: 20px;
        width: 20px;
        background-color: #eee;
        border-radius: 50%;
        transform: translateY(-50%);

      }
    }


  }
}

</style>
