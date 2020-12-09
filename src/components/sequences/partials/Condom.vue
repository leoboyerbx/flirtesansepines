<template>
  <article class="animated-condom">

    <div class="steps">
      <div :style="{top:step1Y}">
        <p>Non</p>
        <span></span>
      </div>
      <div :style="{top:step2Y}">
        <p>Parfois</p>
        <span></span>
      </div>
      <div :style="{top:step3Y}">
        <p>Toujours</p>
        <span></span>
      </div>
    </div>
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
    
    <div class="desc">
      <h1>Fais glisser le préservatif</h1>
      <p>Lors d'un rapport sexuel, utilises-tu systématiquement le préservatif? Ou es-tu radicalement contre?</p>
    </div>

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
        lastY: 700,
        y: initialY,
        progress: 0,
        rectangleHeight: 0,
        legendOffset:0
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
    },
    step1Y () {
      return (this.initialY + this.legendOffset)+'px';
    },
    step2Y () {
      return (this.initialY + this.slideHeight)+'px';
    },
    step3Y () {
      return (this.initialY + this.lastY)/2+'px';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.animated-condom {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    justify-content: space-between;
    width: 100%;
    .steps {
      position:relative;
      width: auto;
      align-items:flex-end;
      display: flex;
      flex-direction: column;
      width: 25%;
      div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        span{
            width: 20px;
            height: 3px;
            background-color: white;
            margin-left:70px;
        }

        p {
          font-family: $titleFont;
          color: white;
          font-size: 3rem;
        }
      }
    }
    .desc {
      width: 25%;
      h1 {
        color:white;
        font-family: $titleFont;
        font-size:1.6rem;
      }
      p {
        color: white;
        font-size: 1rem;
      }
    }

    svg {
      width: 18%;
    }
}

</style>
