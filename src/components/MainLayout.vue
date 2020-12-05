<template>
  <section ref="slides" class="slides">
    <SecondSequence/>
    <SevenSequence/>
    <SampleSlide />
  </section>
</template>

<script>
import SampleSlide from "@/components/slides/SampleSlide";
import SecondSequence from "@/components/slides/SecondSequence";
import SevenSequence from "@/components/slides/SevenSequence";
export default {
  name: 'MainLayout',
  components: {
    SampleSlide,
    SecondSequence,
    SevenSequence
  },
  data: () => ({
    currentSlide: 0
  }),
  created () {
    window.addEventListener('keydown', this.keyUp)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.keyUp)
  },
  computed: {
    numberOfSlides () {
      return this.$refs.slides.querySelectorAll('.slide').length
    }
  },
  methods: {
    stateOfSlide (slide) {
      if (slide < this.currentSlide) {
        return 'past'
      }
      if (slide === this.currentSlide) {
        return 'current'
      }
      if (slide > this.currentSlide) {
        return 'future'
      }
    },
    prevSlide () {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    nextSlide () {
      if (this.currentSlide + 1 < this.numberOfSlides) {
        this.currentSlide++
      }
    },
    keyUp (e) {
      if (e.key === 'ArrowRight') {
        this.nextSlide()
      }
      if (e.key === 'ArrowLeft') {
        this.prevSlide()
      }
    }
  }
}
</script>


<style scoped lang="scss">

</style>
