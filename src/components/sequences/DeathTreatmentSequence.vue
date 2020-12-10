<template>
  <article class="death-treatment" :class="currentState">
    <DeathTreatmentDataviz
      :width="900"
      :height="500"
      :treatment-data-source="treatmentDataSource"
      :death-data-source="deathDataSource"
    />
    <div class="user-response" v-if="userEstimationFirst">
      <h1>
        Effectivement, il est encore possible de mourir du VIH en France
      </h1>
      <p>Malgré les avancées scientifiques sur les différents traitements et ainsi la nette diminution du nombre de mort, le VIH tue encore. Pour limiter l’avancée des symptômes liés au virus, il est important de se faire dépister au moindre doute.</p>
    </div>
    <div class="user-response" v-else>
      <h1>
        Détrompe-toi ! Il est encore possible de mourir du VIH en France
      </h1>
      <p>Malgré les avancées scientifiques sur les différents traitements et ainsi la nette diminution du nombre de mort, le VIH tue encore. Pour limiter l’avancée des symptômes liés au virus, il est important de se faire dépister au moindre doute.</p>
    </div>
    <div class="legend" :class="{ details: detailsDisplay }">
      <div class="legend-item first">
        <div class="legend-square" :style="{ backgroundColor: $globals.dataColors.getColorCode(index) }"></div>
        <p>Nombre de personnes sous-traitement</p>
      </div>
      <div class="legend-item second">
        <div class="legend-square" :style="{ backgroundColor: $globals.dataColors.getColorCode(index) }"></div>
        <p>Nombre de mort</p>
      </div>
    </div>
    <img src="../../assets/flower.svg" alt="">
  </article>
</template>

<script>
import { json } from 'd3'
import DeathTreatmentDataviz from "@/components/dataviz/DeathTreatmentDataviz";

export default {
  name: "DeathTreatmentSequence",
  components: {DeathTreatmentDataviz},
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  data: () => ({
    treatmentDataSource: [],
    deathDataSource: [],
  }),
  created () {
    this.getTreatmentDataSource()
    this.getDeathDataSource()
  },
  methods: {
    async getTreatmentDataSource () {
      const treatmentApiData = await json("https://cors-anywhere.herokuapp.com/https://ghoapi.azureedge.net/api/HIV_0000000009?$filter=SpatialDim eq 'FRA'")
      // console.log('data source: ')
      this.treatmentDataSource = treatmentApiData.value.map(data => {
        const year = data.TimeDim
        const value = +data.NumericValue
        return { year, value }
      })
      console.log('trat data received')
    },
    async getDeathDataSource () {
      const deathsApiData = await json("https://cors-anywhere.herokuapp.com/https://ghoapi.azureedge.net/api/HIV_0000000006?$filter=SpatialDim eq 'FRA'")
      // console.log('data source: ')
      this.deathDataSource = deathsApiData.value.map(data => {
        const parsedData = data.Value.replace(/</g, '').split(/\[|\]| |–/)

        const minValue = +parsedData[2]
        const maxValue = +parsedData[3]
        const value = data.NumericValue || (minValue + maxValue) / 2
        console.log(value)

        const year = data.TimeDim
        return {
          year,
          value,
          minValue,
          maxValue
        }
      })
    }
  },
  computed: {
    userEstimationFirst () {
      return this.$store.state.deathEstimation
    },
  }
}
</script>

<style scoped lang="scss">
.death-treatment {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5%;

  img {
    position: fixed;
    bottom:0;
    width: 100px;
    right: 80px;
  }

  .legend {
    display: flex;
    flex-direction:column;
    width: 100%;
    font-family: $paragraphFont;
    font-size: 0.8rem;
    .legend-item {
      display: flex;
      align-items: center;
      font-size: $paragraphSize;
      margin: 5px 0;
      &.first {
        .legend-square{
          background-color: rgb(92, 144, 182);
        }
      }
      &.second {
        .legend-square{
          background-color: rgb(255,0,0);
        }
      }
      p {
        margin:0;
      }
      .legend-square {
        width: 30px;
        height: 30px;
        margin-right:10px;
      }
    }
  }

  .user-response {
        width: 30%;
      h1 {
      font-family: $titleFont;
      font-size: 3.5em;
      color: $themeBlue3;
      text-align: left;
    }

    p {
      font-family: $paragraphFont;
      font-size: 1.2rem;
    }
  }

  

}
</style>
