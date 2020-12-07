<template>
  <article class="details-condom-usage" :class="currentState">
    <h1>Frein à l'usage du préservatif</h1>
    <DetailsCondomUsageDataviz
      :dataSource="dataSource"
      :width="800"
      :height="400"
    />
  </article>
</template>

<script>
import { csv } from 'd3'
import DetailsCondomUsageDataviz from "@/components/dataviz/DetailsCondomUsageDataviz";

export default {
  name: "DetailsCondomUsageSequence",
  components: {
      DetailsCondomUsageDataviz
    },
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  data: () => ({
    dataSource: []
  }),
  async created() {
    this.getDataSource()
  },
  methods: {
    async getDataSource () {
      const dataSource = await csv('datas/detailsCondomUsage.csv', data => {
        return data
      })
      this.dataSource = dataSource
      console.log(dataSource)
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@/assets/scss/globals.scss';

.details-condom-usage {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $backgroundColor;
  margin: auto;
  &.current {
    display: block;
  }

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
