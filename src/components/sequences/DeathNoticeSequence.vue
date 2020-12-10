<template>
  <article class="question"
           v-on:wheel="onWheelChangeSlide"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
    <div class="wrapper">
      <h1>Penses-tu que l'on meurt encore du VIH?</h1>
      <div class="estimation-animation-container">
        <div @click="booleanUser = true">
            <p> Oui</p>
        </div>
        <img class="animation" src="../../assets/handwithflower.svg">
        <div @click="booleanUser = false">
            <p>Non</p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import sequence from "@/mixins/sequenceMixin";

export default {
  name: 'DeathNoticeSequence',
  mixins: [ sequence ],
  data: () => ({
    booleanUser:true
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    },
  },
  watch: {
    booleanUser (newVal) {
      this.$store.commit('updateDeathUserData', newVal)
    }
  },
  computed: {


  },
  methods: {
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.question {
  position: fixed;
  padding: 0 6em;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: $backgroundColor;
  font-family: $titleFont;
  transition: all $slideDurationEasing;

  &.future {
    transform: translate3d(0, 100vh, 0);
  }
  &.arriving-forward {
    animation: arriving-from-bottom $slideDurationEasing;
  }
  &.past {
    opacity: 0;
  }
  &.arriving-backward {
    animation: fade-in $slideDurationEasing;
  }

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
}
  .estimation-animation-container {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    div:not(.animation) {
      display: flex;
      height: 100%;
      align-items: center;
      text-align: center;
      justify-content: center;
      font-size: 1.8rem;
      width: 30%;
      text-transform: uppercase;
      p {
        margin-top: -70px;
      }
    }

    .animation {
      width: 35%
    }
  }

    h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: $themeBlue3;
      margin:auto;
      color: $themeBlue3;
      text-align: center;
      max-width: 60%;
    }
}
</style>
