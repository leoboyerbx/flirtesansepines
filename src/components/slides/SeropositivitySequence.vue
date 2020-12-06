<template>
  <article class="seropositivity-data" :class="currentState" @click="tmpClick">
    <SeropositivityDataviz
      :width="600"
      :height="300"
      :data-source="dataSource"
    />
  </article>
</template>

<script>
import SeropositivityDataviz from "@/components/dataviz/SeropositivityDataviz";
import * as d3 from 'd3'
import {csv} from "d3";

function randomLetters() {
  return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
      .slice(0, Math.floor(6 + Math.random() * 20))
      .sort();
}

export default {
  name: 'SeropositivitySequence',
  components: {SeropositivityDataviz},
  data: () => ({
    msg: "A votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?",
    number:1000,
    dataSource: null
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
      // const dataSource = await csv('datas/screeningBehaviors.csv', data => {
      //   data.never = parseFloat(data.never)
      //   data.over12Months = parseFloat(data.over12Months)
      //   data.in12Months = parseFloat(data.in12Months)
      //   return data
      // })
      this.dataSource = await randomLetters()
    },
    tmpClick () {
      this.getDataSource()
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

  &.current {
    display: block;
  }
}

</style>
