<template>
  <section class="hiv-estimation">
    <p class="question">À votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?</p>
    <div class="number">{{ displayNumber }}</div>
    <div class="confirm"><button @click="onConfirm">Valider</button></div>
    <FlowerSlider class="flower-slider" v-model="number" />
  </section>
</template>

<script>
import FlowerSlider from "@/components/sequences/partials/FlowerSlider";

export default {
  name: "HIVEstimation",
  components: {FlowerSlider},
  data: () => ({
    number: 0,
    tweenedNumber: 0,
    tweenDuration: 300
  }),
  computed: {
    displayNumber () {
      let res = '' + Math.round(this.number * 10000);
      while (res.length < 5) {
        res = '0' + res;
      }
      return res;
    }
  },
  watch: {
    number (newVal) {
      this.$store.commit('updateEstimaton', newVal * 10000)
    }
  },
  methods: {
    onConfirm () {
      this.$emit('confirm')
    }
    // onChange () {
    //   this.tween((this.number * 10000).toFixed, 0)
    // },
    // tween(start, end) {
    //   let frameHandler
    //   // Handles updating the tween on each frame.
    //   const animate = function (currentTime) {
    //     TWEEN.update(currentTime)
    //     frameHandler = requestAnimationFrame(animate)
    //   }
    //   const number = { val: start }
    //   const tween = new TWEEN.Tween(number)
    //       .to({ val: end }, this.tweenDuration)
    //       // Be careful to not to do too much here! It will slow down the app.
    //       .onUpdate(() => {
    //         this.number = number.val.toFixed(0) * 10000
    //       })
    //       .onComplete(() => {
    //         // Make sure to clean up after ourselves.
    //         cancelAnimationFrame(frameHandler)
    //       })
    //       // This actually starts the tween.
    //       .start()
    //   frameHandler = requestAnimationFrame(animate)
    // }
  }
}
</script>

<style scoped lang="scss">
.hiv-estimation {
  position: relative;
  height: 80vh;
  width: 100%;
  .question {
    color: $themeBlue3;
    font-family: $titleFont;
    font-size: 3.5rem;
    width: 100%;
    text-align: center;
    padding: 0 20%;
    margin: 0;
  }
  .number {
    padding: 0 10%;
    font-weight: bold;
    color: $themeRed;
    font-size: 20rem;
    text-align: right;
    line-height: 20rem;
    //line-height: 23rem;
  }
  .confirm {
    display: flex;
    padding: 0 10%;
    justify-content: flex-end;
    button {
      background-color: $themeBlue2;
      border: none;
      padding: .5em 1.5em;
      border-radius: 100px;
      color: #fff;
      font-size: 1.8rem;
      cursor: pointer;
      font-family: $paragraphFont;
      font-weight: bold;
    }
  }
  .flower-slider {
    position: absolute;
    width: 40%;
    bottom: 0;
    left: 0;
  }
}
</style>
