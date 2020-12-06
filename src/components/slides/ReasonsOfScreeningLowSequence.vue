<template>
  <article class="reasons-screening-low" :class="currentState">
    <div class="container">
        <h1>{{ msg }}</h1>
        <p class="estimation-number" v-text="total"></p>
        <input class="slider" type="range" min="1000" max="10000" step="1000" v-model="number">
    </div>
  </article>
</template>

<script>
export default {
  name: 'IntroductionSequence',
  data: () => ({
      msg: "A votre avis, combien de cas de séropositivité ont été definis en 2019 en France ?",
      number:1000
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  computed: {
      total: function () {
      return this.number 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">



</style>
