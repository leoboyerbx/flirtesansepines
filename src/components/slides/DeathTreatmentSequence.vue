<template>
  <article class="death-treatment" :class="currentState">
    <h1>Mise en regard du traitement et de la mortalité du VIH</h1>
    <DeathTreatmentDataviz
      :width="800"
      :height="400"
    />
  </article>
</template>

<script>
import { csv } from 'd3'
import DeathTreatmentDataviz from "@/components/dataviz/DeathTreatmentDataviz";

export default {
  name: "DeathTreatmentSequence",
  components: {DeathTreatmentDataviz},
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@/assets/scss/globals.scss';

.death-treatment {
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
