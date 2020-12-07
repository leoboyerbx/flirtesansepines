<template>
  <article class="seropositivity-data" :class="currentState" @click="tmpClick">
   
  </article>
</template>

<script>
//import SeropositivityDataviz from "@/components/dataviz/SeropositivityDataviz";
import * as d3 from 'd3'
import {csv} from 'd3'

function randomLetters() {
  return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
      .slice(0, Math.floor(6 + Math.random() * 20))
      .sort();
}

export default {
  name: 'SeropositivitySequence',
  components: {},
  data: () => ({
    msg: "A votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?",
    number:1000,
    dataSource: []
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
      this.dataSource = await csv('datas/VIH.csv', data => {
        data.value = +data.value
        return data
      })
    },
    tmpClick () {
      this.dataSource[0].value = 10000
    }
  },
  computed: {
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
