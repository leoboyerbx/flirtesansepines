<template>
  <article class="seropositivity-estimation" :class="currentState">
    <div class="container">
      <h1>{{ msg }}</h1>
      <p class="estimation-number">{{ number }}</p>
      <input class="slider" type="range" min="1000" max="10000" step="1000" v-model="number">
    </div>
  </article>
</template>

<script>
export default {
  name: 'SeropositivityEstimationSequence',
  data: () => ({
    msg: "A votre avis, combien de cas de séropositivité ont été découverts en 2019 en France ?",
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

.seropositivity-estimation {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: $backgroundColor;

  &.current {
    display: block;
  }

  .container{
    max-width: 80%;
    margin:auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 0;
    h1 {
      font-family: $titleFont;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      color: white;
      margin:0;
      color: $themeBlue3;
      text-align: center;
    }


    img {
      width: 30px;
    }

    .estimation-number {
      border:none;
      outline:none;
      font-family:$paragraphFont;
      font-size: 200px;
      color: white;
      font-weight: 700;
      display: flex;
      margin: auto;
    }

    .slider {

      max-width: 50%;
      margin: auto !important;
      -webkit-appearance: none;
      margin: 10px 0;
      width: 100%;

      &:hover, &:focus {
        outline:none;
      }

      &::-moz-range-thumb {
        width: 160px;
        height: 160px;
        border: 0;
        background: url('../../assets/cursor.svg');
        cursor: pointer;
      }

      &::-moz-range-track {
        width: 100%;
        cursor: pointer;
        //box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
        background: url('../../assets/track.svg');
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        height: 40px;
        border-radius: 25px;
        border: 0px solid #000101;
      }
    }
  }





}

</style>
