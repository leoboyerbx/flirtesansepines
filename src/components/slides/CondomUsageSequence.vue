<template>
  <article class="condom-usage" :class="currentState">
        <CondomUsageDataviz 
          :dataSource="condomUsageDataSource"
          :width="500"
          :height="500"
         />
        <DetailsCondomUsageDataviz
          :dataSource="condomUsageDetailsDataSource"
          :width="800"
          :height="400"
        />
  </article>
</template>

<script>
import { csv, json } from 'd3';
import CondomUsageDataviz from "@/components/dataviz/CondomUsageDataviz";
import DetailsCondomUsageDataviz from "@/components/dataviz/DetailsCondomUsageDataviz";
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
    condomUsageDetailsDataSource: [],
    condomUsageDataSource: [],
  }),
  async created() {
    this.getDataSource()
  },
  methods: {
    async getDataSource () {
      this.condomUsageDetailsDataSource = await csv('datas/detailsCondomUsage.csv')
      this.condomUsageDataSource = await json('datas/condomUsage.json')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.condom-usage {
  display:none;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: $backgroundColor;

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
