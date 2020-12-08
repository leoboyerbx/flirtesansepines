<template>
  <article class="seropositivity-data" :class="currentState" @click="tmpClick">
    <HIVDiscoveryDataviz
      :width="800"
      :height="600"
      :data-source="currentDataSource"
      :user-estimation="userEstimation"
    />
  </article>
</template>

<script>
import * as d3 from 'd3'
import {csv} from 'd3'
import HIVDiscoveryDataviz from "@/components/dataviz/HIVDiscoveryDataviz";

export default {
  name: 'HIVDiscoverySequence',
  components: {HIVDiscoveryDataviz},
  data: () => ({
    msg: "A votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?",
    number:1000,
    dataSource: [],
    viewMode: 1,
    userEstimation: 4000
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
    tmpClick () {
      this.dataSource[0].value = 10000
    }
  },
  computed: {
    currentDataSource () {
      let cols = ['year', 'total']
      let excludedCols = ['men', 'women', 'hsh', 'hetero', 'drug', 'other']
      switch (this.viewMode) {
        case 1:
          cols = ['year', 'men', 'women']
          excludedCols = ['total', 'hsh', 'hetero', 'drug', 'other']
          break;
        case 2:
          cols = ['year', 'hsh', 'hetero', 'drug', 'other']
          excludedCols = ['total', 'men', 'women']
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
      return result
    },
    total: function () {
      return this.number
    }
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
  transition: all .5s;
  opacity:0;
  visibility: hidden;
  transition-delay: .5s;

  &.current {
    display: flex;
    position: fixed;
    opacity:1;
    visibility: visible;
  }
}

</style>
