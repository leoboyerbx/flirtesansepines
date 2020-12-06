<template>
  <svg :width="width" :height="height"></svg>
</template>

<script>
// import d3 from 'd3'

export default {
  name: "ScreeningBehaviorsDataviz",
  props: {
    // taille en pixel du composant
    width: { type: Number },
    height: { type: Number },

    data: { type: Array },
  },
  data: () => ({
    margin: {top: 20, right: 40, bottom: 60, left: 50},
    keys: ["Jamais dépisté", "Dépisté il y a plus de 12 mois", "Dépisté dans les 12 derniers mois"],
    colors: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
    legendCellSize: 20,
    tooltipWidth: 210
  }),
  computed: {
    dataWidth: () => this.width - this.margin.left - this.margin.right,
    dataHeight: () => this.height - this.margin.top - this.margin.bottom
  }
}
</script>

<style scoped>

</style>
