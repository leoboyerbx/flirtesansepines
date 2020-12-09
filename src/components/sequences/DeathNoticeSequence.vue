<template>
  <article class="conclusion" :class="currentState">
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
  </article>
</template>

<script>
export default {
  name: 'DeathNoticeSequence',
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

.conclusion {
  display:none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 0 6em;
  &.current {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  font-family: $titleFont;

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
