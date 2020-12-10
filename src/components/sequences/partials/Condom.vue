<template>
  <article class="animated-condom"
           :class="{ disabled }">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 616.26 865"
        @mousemove="mouseMove"
    >
      <g id="Calque_2" data-name="Calque 2">
        <g id="Calque_1-2" data-name="Calque 1">
          <line class="cls-1" x1="227.76" y1="233" x2="293.76" y2="233" />
          <line class="cls-1" x1="227.76" y1="445" x2="293.76" y2="445" />
          <line class="cls-1" x1="227.76" y1="657" x2="293.76" y2="657" />
          <path class="cls-2" d="M360.26,164.5a111.5,111.5,0,0,1,223,0V865h-223Z" />
          <path class="cls-3"
                d="M498.26,25.34a25,25,0,1,0-50,0V35c-53.13,11.43-93,59.24-93,116.49v26.86h235V151.51c0-56.89-39.37-104.46-92-116.27Z" />
          <rect class="cls-4"
                x="355.26"
                y="176"
                width="235"
                :height="y - 150"
                :class="{ transition }"
          />
          <path class="cls-4 handler"
                :style="{ transform: 'translate(0, ' + y + 'px)' }"
                @mousedown="mouseDown"
                d="M345.26,0h256a15,15,0,0,1,15,15h0a15,15,0,0,1-15,15h-256a15,15,0,0,1-15-15h0A15,15,0,0,1,345.26,0Z"
                :class="{ transition }"
          />
          <text class="cls-5" transform="translate(88.82 241.9)">Jamais</text>
          <text class="cls-5" transform="translate(0 451.4)">Majoritairement</text>
          <text class="cls-5" transform="translate(106.56 664.17)">Toujours</text></g>
      </g>
    </svg>

    <div class="desc">
      <div>
        <h1>Fais glisser le préservatif</h1>
        <p>Lors de tes rapports sexuels, à quelle fréquence utilises-tu le préservatif ?</p>
      </div>
      <a href="#" @click.prevent="onConfirm" :class="{ visible: showButton }">Valider</a>

    </div>

  </article>
</template>

<script>

function closest (array, needle) {
 return array.reduce((a, b) => {
    return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
  });
}

export default {
  name: 'Condom',
  components: {},
  data: () => {
      const initialY = 230
      return {
        dragging: false,
        initialY: initialY,
        lastY: 660,
        svgHeight: 865,
        progress: 0,
        rectangleHeight: 0,
        yOffset: 0,
        transition: false,
        disabled: false,
        showButton: true
    }
  },
  props: {
    value: Number
  },
  watch: {
    value (newVal) {
      this.enableTransition()
      this.progress = newVal / 2
    }
  },
  mounted () {
      window.addEventListener('mouseup', this.mouseUp.bind(this))
  },
  beforeDestroy () {
      window.removeEventListener('mouseup', this.mouseUp.bind(this))
  },
  methods: {

    mouseDown () {
      if (!this.disabled) {
        this.dragging = true
      }
    },
    updateValue: function (value) {
      this.$emit('input', value)
      this.$store.commit('updateUserCondomUsage', value)
    },
    mouseMove (e) {
        if(this.dragging) {
          const rect = e.currentTarget.getBoundingClientRect()
          const y = e.clientY - rect.top
          const svgY = (this.svgHeight * y) / rect.height
          let progress = (svgY - this.initialY) / this.slideHeight
          if (progress > 1.2) {
            progress = 1.2
          }
          if (progress < -0.1) {
            progress = -0.1
          }
          this.progress = progress
        }
    },
    mouseUp () {
      this.dragging = false
      this.snapToVal()
    },
    snapToVal () {
      this.enableTransition()
      this.progress = closest([0, 0.5, 1], this.progress)

      this.updateValue(this.progress * 2)
    },
    enableTransition () {
      this.transition = true
      setTimeout(() => {
        this.transition = false
      }, 400)
    },
    onConfirm () {
      this.disabled = true
      this.showButton = false
      this.$emit('answer')
    }
  },
  computed: {
    y () {
      return this.initialY + this.progress * this.slideHeight - 15
    },
    slideHeight () {
        return this.lastY - this.initialY
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.transition {
  transition: all .2s;
}

.animated-condom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    &:not(.disabled) .handler {
      cursor: grab;
    }

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
      width: 35%;
      padding-right: 3%;
      align-items: flex-start;

      p {
        font-weight: bold;
      }

      a {
        color: white;
        border-bottom: 1px solid white;
        padding: .1em 0em;
        font-size: 1.8rem;
        cursor: pointer;
        font-family: $paragraphFont;
        font-weight: bold;
        text-decoration: none;
        background: transparent;
        opacity: 0;
        transition: all .3s;

        &.visible {
          opacity: 1;
        }
      }
      div {
        margin-bottom: 3rem;
        h1 {
        color:white;
        font-family: $titleFont;
        font-size:2rem;
        }
        p {
          color: white;
          font-size: 1.5rem;
        }
      }

      display: flex;
      flex-direction: column;
      button {
        color: #ffff;
        background-color: $themeBlue2;
        border-radius: 50px;
        padding: 15px 40px;
        width: auto;
        text-decoration: none;
        font-family: $paragraphFont;
        font-size: 1.3rem;
        border:none;
      }
    }

    svg {
      width: 50%;
    }
}


.cls-1 {
  fill: none;
  stroke: #fff;
  stroke-width: 4px;
}

.cls-2 {
  fill: #c8defb;
}

.cls-3,
.cls-4 {
  fill: #b62220;
}

.cls-3 {
  fill-rule: evenodd;
}

.cls-5 {
  font-size: 34.32px;
  fill: #fff;
  font-family: Soria-Soria, Soria;
}

.cls-6 {
  letter-spacing: -0.17em;
}

.cls-7 {
  letter-spacing: -0.02em;
}

.cls-8 {
  letter-spacing: -0.03em;
}

.cls-9 {
  letter-spacing: -0.02em;
}

.cls-10 {
  letter-spacing: -0.02em;
}

.cls-11 {
  letter-spacing: 0em;
}

.cls-12 {
  letter-spacing: -0.02em;
}

.cls-13 {
  letter-spacing: -0.03em;
}

.cls-14 {
  letter-spacing: 0em;
}

.cls-15 {
  letter-spacing: -0.09em;
}

</style>
