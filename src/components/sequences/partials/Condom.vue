<template>
  <article class="animated-condom">
    <svg
    @mousemove="mouseMove"
    ref="svg"
     width="286" height="865" viewBox="0 0 286 865" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 164.5C30 102.92 79.9203 53 141.5 53C203.08 53 253 102.92 253 164.5V865H30V164.5Z" fill="#C8DEFB"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M168 25C168 11.1929 156.807 0 143 0C129.193 0 118 11.1929 118 25V34.5581C64.8663 45.8281 25 93.0083 25 149.5V176H260V149.5C260 93.3633 220.633 46.4214 168 34.7744V25Z" fill="#B62220"/>
        <rect x="25" y="176" width="235" :height="y - 180" fill="#B62220"/>
        <rect @mousedown="mouseDown"
               :y="y - 15" width="286" height="30" rx="15" fill="#B62220"
              />
    </svg>
  </article>
</template>

<script>
import * as d3 from 'd3'
import {csv} from 'd3'



export default {
  name: 'Condom',
  components: {},
  data: () => {
      const initialY = 200
      return {
        dragging: false,
        initialY: initialY,
        lastY: 600,
        y: initialY,
        progress: 0,
        rectangleHeight: 0
    }
  },
  props: {
  },
  mounted () {
      window.addEventListener('mouseup', this.mouseUp.bind(this))
  },
  beforeDestroy () {
      window.removeEventListener('mouseup', this.mouseUp.bind(this))
  },
  methods: {
    mouseDown (e) {
      this.dragging = true
    },
    mouseMove (e) {
        if(this.dragging) {
            const y = (e.clientY - e.currentTarget.getBoundingClientRect().top)
            this.progress = (y - this.initialY) / this.slideHeight
            if (this.progress >= 0 && this.progress <= 1) {
                this.y = y
            }
        } 
    },
    mouseUp () {
      this.dragging = false
    }
  },
  computed: {
    slideHeight () {
        return this.lastY - this.initialY
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.animated-condom {
    
}

</style>
