<template>
  <div class="flower-slider"
       @mousemove="mouseMove"
  >
    <img :class="{invisible: !hintVisible}" src="../../../assets/arrow-right.svg" alt="">
    <LottieAnimation
        path="lottie/pullFlower.json"
        @AnimControl="setAnimcontroller"
        :loop="false"
        :auto-play="false"
    />
  </div>
</template>

<script>
import LottieAnimation from "@/components/lib/LottieAnimation";

export default {
  name: "FlowerSlider",
  data: () => ({
    dragging: false,
    flower: null,
    dataWidth: 0.75,
    dataMarginLeft: 0.11,
    hintVisible: true
  }),
  components: {
    LottieAnimation
  },
  props: {
    value: Number,
    locked: Boolean
  },
  mounted() {
    window.addEventListener('mouseup', this.mouseUp)
  },
  beforeDestroy() {
    window.removeEventListener('mouseup', this.mouseUp)
  },
  watch: {
    value () {
      this.hintVisible = false
    },
    locked (newVal) {
      if (newVal === true) {
        this.anim.play()
      }
    }
  },
  methods: {
    setAnimcontroller (anim) {
      this.anim = anim
      this.anim.goToAndStop(this.anim.getMarkerByKey('start').tm, true)
      this.flower = this.$el.querySelector('[transform="matrix(0.15000000596046448,0,0,0.15000000596046448,51.99999237060547,443.20001220703125)"]')
      this.flower.classList.add('flower-slider-handle')
      this.flower.addEventListener('mousedown', this.mouseDown)
    },
    updateValue: function (value) {
      this.$emit('input', value)
    },
    mouseDown (e) {
      if (!this.locked) {
        this.dragging = true
      }
    },
    mouseMove (e) {
      if (this.dragging) {
        const elWidth = this.$el.offsetWidth
        const absData = e.layerX - this.dataMarginLeft * elWidth
        let value = (absData / elWidth) * (1/this.dataWidth)
        if (value < 0) value = 0
        if (value > 1) value = 1
        this.updateValue(value)
        const startFrame = this.anim.getMarkerByKey('start').tm
        const endFrame = this.anim.getMarkerByKey('end').tm
        const framesNumber = endFrame - startFrame
        this.anim.goToAndStop(framesNumber * this.value + startFrame, true)
      }
    },
    mouseUp () {
      this.dragging = false
      if (this.value === 1) {
        this.anim.play()
      }
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss">
  //.flower-slider {
  //  transform: translateY(50%);
  //}
  .flower-slider-handle {
    cursor: pointer;
  }
  .flower-slider {
    display: flex;
    flex-direction: column;
    img{
      opacity: 1;
      transition: all ease-in-out 1s;
      width: 60px;
      margin-left: 40px;
      transform: translateY(120px);
      &.invisible {
        opacity:0;
      }
    }
  }
</style>
