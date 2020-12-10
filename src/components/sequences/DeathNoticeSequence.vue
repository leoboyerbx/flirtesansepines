<template>
  <article class="question scrolling-slide"
           v-on:wheel="onWheel"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
    <div class="wrapper">
      <h1>Penses-tu que l'on meurt encore du VIH?</h1>
      <div class="estimation-animation-container">
        <div
            :class="{
          faded: answered && booleanUser === false,
          emphasis: answered && booleanUser === true
        }"
            @click="makeChoice(true)">
            <p> Oui</p>
        </div>
        <img class="animation" src="../../assets/handwithflower.svg">
        <div
            :class="{
          faded: answered && booleanUser === true,
          emphasis: answered && booleanUser === false
        }"
            @click="makeChoice(false)">
            <p>Non</p>
<!--            <a href="#" @click.prevent="onConfirm">Valider</a>-->
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
    booleanUser:true,
    answered: false
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    },
  },
  watch: {
    booleanUser (newVal) {
    }
  },
  computed: {


  },
  methods: {
    makeChoice (bool) {
      if (!this.answered) {
        this.booleanUser = bool
        this.$store.commit('updateDeathUserData', bool)
        this.answered = true
        setTimeout(() => {
          this.$emit('next-slide')
        }, 200)
      }
    },
    onWheel (e) {
      if (e.deltaY < 0) {
        this.$emit('prev-slide')
      } else if (e.deltaY > 0 && this.answered) {
        this.$emit('next-slide')
      }
    }
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

  background-color: #fff;
  font-family: $titleFont;
  transition: all $slideDurationEasing;


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
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      text-align: center;
      justify-content: center;
      width: 30%;
      transition: all .3s;
      position:relative;
      p {
        margin-top: -70px;
        font-size: 3rem;
        text-transform: uppercase;
        transition: all .3s;
      }
      &.faded {
        opacity: .3;
        transform: scale(.8);
      }
      &.emphasis {
        p {
          transform: scale(1.3);
        }
      }
      a {
        position:absolute;
        bottom: 30px;
        left: 40%;
        color: $themeBlue3;
        border-bottom: 1px solid $themeBlue3;
        padding: .1em 0em;
        font-size: 1.8rem;
        cursor: pointer;
        font-family: $paragraphFont;
        font-weight: bold;
        text-decoration: none;
        background: transparent;
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
      text-align: center;
      max-width: 60%;
    }
}
</style>
