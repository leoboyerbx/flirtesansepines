<template>
  <article
      v-on:wheel="onWheelChangeSlide"
      class="screening-late scrolling-slide"
      :class="[ currentState, arrivingClass ]"
      :style="{ display: displayStyle }"
  >
    <h1>Sur 100 personnes séropositives...</h1>
    <p>* Plus le dépistage est précoce, plus la prise en charge est facilitée. Il est donc important de se faire dépister régulièrement.</p>
    <ScreeningLateDataviz
        :height="300"
      />
  </article>
</template>

<script>
import ScreeningLateDataviz from "@/components/dataviz/ScreeningLateDataviz";
import sequence from "@/mixins/sequenceMixin";

export default {
  name: 'ScreeningLateSequence',
  components: {ScreeningLateDataviz},
  mixins: [ sequence ],
  data: () => ({
    viewMode: 0,
    displayNextSlide: false,
    scrollFactor: 10,
    translateY: 0
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.screening-late {
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  transition: all $slideDurationEasing;
  margin: 0;
  padding: 2% 10%;

  h1 {
    color: $themeBlue3;
    font-size: $titleSize;
    text-align: left;
    font-family: $titleFont;
    margin: .4em 0;
  }
  p {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
}

</style>
