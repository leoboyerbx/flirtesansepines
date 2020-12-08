<template>
  <article class="condom-usage" :class="currentState">
        <CondomUsageDataviz 
          :dataSource="globalCondomUsageDataSource"
          :width="500"
          :height="500"
          :detailsDisplay="detailsDisplay"
          @detail-index-change="updateDetailsIndex"
          @detail-display="displayDetails"
         />
        <DetailsCondomUsageDataviz
          :dataSource="currentDetailsDataSource"
          :width="800"
          :height="400"
        />
  </article>
</template>

<script>
import { csv, json } from 'd3';
import CondomUsageDataviz from "@/components/dataviz/CondomUsageDataviz";
import DetailsCondomUsageDataviz from "@/components/dataviz/DetailsCondomUsageDataviz";

function dataParseInt (d) {
  d.value = +d.value
  return d
}

export default {
  name: 'CondomUsageSequence',
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  components: {
    CondomUsageDataviz,
    DetailsCondomUsageDataviz
  },
  data: () => ({
    globalCondomUsageDataSource: [],
    condomUsageDataSource: [],
    noCondomUsageDataSource: [],
    sometimesNoCondomUsageDataSource: [],
    currentDetailsIndex: 0,
    detailsDisplay: false
  }),
  async created() {
    this.getDataSource()
  },
  computed: {
    currentDetailsDataSource () {
      let data = this.sometimesNoCondomUsageDataSource
      switch (this.currentDetailsIndex) {
        case 1:
          data = this.condomUsageDataSource
          break;
        case 2:
          data = this.noCondomUsageDataSource
          break
      }
      return data
    }
  },
  methods: {
    async getDataSource () {
      this.condomUsageDataSource = await csv('datas/detailsCondomUsage.csv', dataParseInt)
      this.noCondomUsageDataSource = await csv('datas/detailsNoCondomUsage.csv', dataParseInt)
      this.sometimesNoCondomUsageDataSource = await csv('datas/detailsSometimesNoCondomUsage.csv', dataParseInt)
      this.globalCondomUsageDataSource = await json('datas/condomUsage.json')
    },
    updateDetailsIndex (index) {
      this.currentDetailsIndex = index
    },
    displayDetails() {
      this.detailsDisplay = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.condom-usage {
  background-color:$themeRed;
  width: 100vw;
  height: 100vh;
  padding: 3% 0;
  display:none;
  top: 0;
  left: 0;
  &.current {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    align-items: center;
  }


}

</style>
