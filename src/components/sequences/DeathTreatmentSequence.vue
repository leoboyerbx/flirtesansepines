<template>
  <article class="death-treatment scrolling-slide"
           v-on:wheel="onWheelChangeSlide"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
    <div class="wrapper">
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
        <p>Malgré les avancées scientifiques sur les différents traitements, le VIH tue encore    même si le nombre de morts diminue.
            <br>
            <br>
          Pour limiter l’avancée des symptômes liés au virus, il est important de se faire dépister au moindre doute.
        </p>
      </div>
      <div class="user-response" v-else>
        <h1>
          Détrompe-toi ! Il y a encore des personnes qui meurent du VIH en France.
        </h1>
        <p>Malgré les avancées scientifiques sur les différents traitements et ainsi la nette diminution du nombre de mort, le VIH tue encore.
            <br>
            <br>
            Pour limiter l’avancée des symptômes liés au virus, il est important de se faire dépister au moindre doute.</p>
      </div>
      <div class="legend">
        <div class="legend-item first">
          <div class="legend-square" :style="{ backgroundColor: $globals.dataColors.getColorCode(1) }"></div>
          <p>Nombre de personnes sous traitement</p>
        </div>
        <div class="legend-item second">
          <div class="legend-square" :style="{ backgroundColor: $globals.dataColors.getColorCode(3) }"></div>
          <p>Nombre de morts du VIH (avec intervalle de confiance)</p>
        </div>
      </div>
      <img src="../../assets/flower.svg" alt="">
    </div>
  </article>
</template>

<script>
import { json } from 'd3'
import DeathTreatmentDataviz from "@/components/dataviz/DeathTreatmentDataviz";
import sequence from "@/mixins/sequenceMixin";

export default {
  name: "DeathTreatmentSequence",
  components: {DeathTreatmentDataviz},
  mixins: [ sequence ],
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
      const treatmentApiData = await json("https://cors-proxy.lbxs.dev/https://ghoapi.azureedge.net/api/HIV_0000000009?$filter=SpatialDim eq 'FRA'")
      this.treatmentDataSource = treatmentApiData.value.map(data => {
        const year = data.TimeDim
        const value = +data.NumericValue
        return { year, value }
      })
    },
    async getDeathDataSource () {
      const deathsApiData = await json("https://cors-proxy.lbxs.dev/https://ghoapi.azureedge.net/api/HIV_0000000006?$filter=SpatialDim eq 'FRA'")
      this.deathDataSource = deathsApiData.value.map(data => {
        const parsedData = data.Value.replace(/</g, '').split(/\[|\]| |–/)

        const minValue = +parsedData[2]
        const maxValue = +parsedData[3]
        const value = data.NumericValue || (minValue + maxValue) / 2

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

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 5%;
  }

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
    font-weight: bold;
    color: $themeBlue3;

    .legend-item {
      display: flex;
      align-items: center;
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
        font-size: 1.2rem;
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
      color: $themeBlue3;

      h1 {
        font-family: $titleFont;
        font-size: 3.5em;
        text-align: left;
      }

      p {
        font-family: $paragraphFont;
        font-size: 1.3rem;
        font-weight: bold;
      }
  }



}
</style>
