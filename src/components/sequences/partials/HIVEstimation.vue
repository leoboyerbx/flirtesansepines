<template>
  <section class="hiv-estimation">
    <p class="question">À votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?</p>
    <div class="number">{{ displayNumber }}</div>
  </section>
</template>

<script>

export default {
  name: "HIVEstimation",
  data: () => ({
    number: 0
  }),
  computed: {
    displayNumber () {
      let res = '' + this.number;
      while (res.length < 5) {
        res = '0' + res;
      }
      return res;
    }
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
    padding: 0 10px;
    font-weight: bold;
    color: $themeRed;
    font-size: 20rem;
    text-align: right;
    line-height: 20rem;
  }
}
</style>
