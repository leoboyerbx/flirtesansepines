<template>
  <article
      :style="{transform: transformProprety }"
      v-on:wheel="onWheel"
      class="screening-late"
      :class="currentState"
  >
    <h1>Sur 100 personnes séropositives...</h1>
    <ScreeningLateDataviz
        :height="300"
      />
  </article>
</template>

<script>
import * as d3 from 'd3'
import {csv} from 'd3'

import ScreeningLateDataviz from "@/components/dataviz/ScreeningLateDataviz";


export default {
  name: 'ScreeningLateSequence',
  components: {ScreeningLateDataviz},
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
  methods: {
    onWheel (e) {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      const scrollLimit = this.$el.offsetHeight - vh

      const canGoUp = e.deltaY < 0 && this.translateY < 0
      const canGoDown = e.deltaY > 0 && this.translateY > -scrollLimit
      console.log(e.deltaY)
      console.log(this.translateY)
      if (canGoUp || canGoDown) {
        this.translateY -= e.deltaY * this.scrollFactor
      } else if (e.deltaY > 0 && this.translateY <= -scrollLimit && !this.displayNextSlide) {
        this.$emit('next-slide');
        //document.getElementById('zoomable').getElementsByClassName('.checkmark');
        this.displayNextSlide = true;
      }
    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.screening-late {
    top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  transition: all .5s;
  opacity:0;
  visibility: hidden;
  transition-delay: .5s;
  margin: auto;
  padding: 4% 10%;

  &.current {
    position: fixed;
    opacity:1;
    visibility: visible;
  }

  h1 {
    color: $themeBlue3;
    font-size: $titleSize;
    text-align: left;
    font-family: $titleFont;
  }
}

</style>
