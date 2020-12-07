<template>
  <article class="condom-usage" :class="currentState">
        <CondomUsageDataviz  />
        <DetailsCondomUsageDataviz
          :dataSource="dataSource"
          :width="800"
          :height="400"
        />
  </article>
</template>

<script>
import { csv } from 'd3';
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
    dataSource: [],
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
