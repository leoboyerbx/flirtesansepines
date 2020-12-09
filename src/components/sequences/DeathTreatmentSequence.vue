<template>
  <article class="death-treatment" :class="currentState">
    <DeathTreatmentDataviz
      :width="900"
      :height="500"
      :treatment-data-source="treatmentDataSource"
      :death-data-source="deathDataSource"
    />
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
      console.log('death data received')
    }
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
  background-color: $backgroundColor;
  margin: auto;

  h1 {
      font-family: $titleFont;
      font-size: 3.5em;
      margin: 1.5em auto;
      color: $themeBlue3;
      text-align: center;
      max-width: 60%;
  }

}
</style>
