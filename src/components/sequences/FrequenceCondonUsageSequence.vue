<template>
  <article
      class="condom-usage-frequence scrolling-slide"
      v-on:wheel="onWheel"
      :class="[ currentState, arrivingClass ]"
      :style="{ display: displayStyle }"
  >
  <Condom
    v-model="condomChoice"
    @answer="onAnswer"
  />
  </article>
</template>

<script>
import Condom from "@/components/sequences/partials/Condom";
import sequence from "@/mixins/sequenceMixin";

export default {
  name: 'FrequenceCondonUsageSequence',
  components: {Condom},
  mixins: [ sequence ],
  data: () => ({
    viewMode: 0,
    displayNextSlide: false,
    scrollFactor: 10,
    translateY: 0,
    condomChoice: 0,
    answered: false
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  methods: {
    onWheel (e) {
      if (e.deltaY < 0) {
        this.$emit('prev-slide')
      } else if (e.deltaY > 0 && this.answered) {
        this.$emit('next-slide')
      }
    },
    onAnswer () {
      this.answered = true
      setTimeout(() => {
        this.$emit('next-slide')
      }, 200)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.condom-usage-frequence {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 4% 10% 0 10%;
  position: fixed;
  background: $themeBlue3;
  overflow: hidden;

  h1 {
    color: #fff;
    font-size: $titleSize;
    text-align: left;
    font-family: $titleFont;
  }
}

</style>
