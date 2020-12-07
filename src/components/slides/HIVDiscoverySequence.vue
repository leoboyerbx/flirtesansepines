<template>
  <article class="seropositivity-data" :class="currentState" @click="tmpClick">
    <HIVDiscoveryDataviz
      :width="800"
      :height="400"
      :data-source="currentDataSource"
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
    viewMode: 1
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
      if (this.viewMode === 1) {
        return this.dataSource.map(d => {
          const {year, men, women} = d
          return {year, men, women}
        })
      }
      if (this.viewMode === 2) {
        return this.dataSource.map(d => {
          const {year, hsh, hetero, drug, other} = d
          return {year, hsh, hetero, drug, other}
        })
      }
      return this.dataSource.map(d => {
        const { year, total } = d
        return { year, total }
      })
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
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: $backgroundColor;
  justify-content: center;
  align-items: center;

  &.current {
    display: flex;
  }
}

</style>
