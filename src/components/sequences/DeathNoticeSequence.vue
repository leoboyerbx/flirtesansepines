<template>
  <article class="question scrolling-slide"
           v-on:wheel="onWheel"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
    <div class="wrapper">
      <h1>Selon toi, peut-on encore mourir du VIH en France&nbsp;?</h1>
      <div class="estimation-animation-container">
        <div
            :class="{
          faded: answered && booleanUser === false,
          emphasis: answered && booleanUser === true
        }"
            @click="makeChoice(true)"
            @mouseover="hoverYes"
            @mouseleave="mouseOut"
        >
            <p> Oui</p>
        </div>
<!--        <img class="animation" src="../../assets/handwithflower.svg">-->
        <LottieAnimation
            class="animation"
            path="lottie/yesnoflower.json"
            :auto-play="false"
            :loop="false"
            @AnimControl="setAnimController"
            ref="lottie"
        />

        <div
            :class="{
          faded: answered && booleanUser === true,
          emphasis: answered && booleanUser === false
        }"
            @click="makeChoice(false)"
            @mouseenter="hoverNo"
            @mouseleave="mouseOut"
        >
            <p>Non</p>
<!--            <a href="#" @click.prevent="onConfirm">Valider</a>-->
        </div>
      </div>
    </div>

  </article>
</template>

<script>
import sequence from "@/mixins/sequenceMixin";
import LottieAnimation from "@/components/lib/LottieAnimation";
import gsap from 'gsap'

export default {
  name: 'DeathNoticeSequence',
  mixins: [ sequence ],
  components: { LottieAnimation },
  data: () => ({
    booleanUser:true,
    answered: false,
    frame: 0,
    tweenedFrame: 0,
    animationDurationBase: 5
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    },
  },
  watch: {
    frame: function(newValue, oldValue) {
      const animationAmount = ((newValue - oldValue) / this.anim.totalFrames)
      gsap.to(this.$data, { duration: 2.5, ease: "power1.inOut", tweenedFrame: newValue });
    },
    animatedFrame (newValue) {
      this.anim.goToAndStop(newValue, true)
    }
  },
  computed: {
    animatedFrame: function() {
      return this.tweenedFrame.toFixed(2);
    },
    deathMarker () {
      return this.anim.getMarkerByKey('death')
    },
    middleMarker () {
      return this.anim.getMarkerByKey('middle')
    },
    aliveMarker () {
      return this.anim.getMarkerByKey('alive')
    }
  },
  methods: {
    makeChoice (bool) {
      if (!this.answered) {
        this.booleanUser = bool
        this.$store.commit('updateDeathUserData', bool)
        this.answered = true
        setTimeout(() => {
          this.$emit('next-slide', false)
        }, 200)
      }
    },
    onWheel (e) {
      if (e.deltaY < 0) {
        this.$emit('prev-slide')
      } else if (e.deltaY > 0 && this.answered) {
        this.$emit('next-slide')
      }
    },
    setAnimController (anim) {
      this.anim = anim
      this.anim.goToAndStop(this.middleMarker.tm, true)
      this.frame = this.middleMarker.tm
    },
    hoverNo () {
      if (!this.answered) {
        this.frame = this.aliveMarker.tm
      }
    },
    hoverYes () {
      if (!this.answered) {
        this.frame = this.deathMarker.tm
      }
    },
    mouseOut () {
      if (!this.answered) {
        this.frame = this.middleMarker.tm
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
