<template>
  <article class="conclusion" :class="currentState">
      <h1>Vos réponses</h1>
      <div class="user-responses">
        <div class="seropositivity-estimation">
          <p>Selon toi, {{userEstimationFirst}} personnes ont été détectées séropositives en 2019.</p>
          <img src="../../assets/flower.svg" alt="flower">
        </div>
        <div class="death-estimation">
          <p v-if="userEstimationDeath">
            Contrairement à un bon nombre de personne, tu est conscient(e) que l'on meurt encore du VIH en France.
          </p>
          <p v-else>
            N'oublies pas que malgré les progrès de les médecine, le VIH fait des victimes chaque année. 
          </p>
          <img src="../../assets/handwithflower.svg" alt="hand with flower">

        </div>
        <div class="condom-usage">
          <img src="../../assets/condom.svg" alt="hand with flower">
        </div>
      </div>      
  </article>
</template>

<script>
export default {
  name: 'ConclusionSequence',
  data: () => ({
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    },
  },
  computed: {
    userEstimationFirst () {
      return this.$store.state.hivEstimation
    },
    userEstimationDeath () {
      return this.$store.state.deathEstimation
    },
    /*userEstimationThird () {
      return this.$store.state.hivEstimation
    }*/

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

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $themeBlue3;
  font-family: $titleFont;


  &.current {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


  .user-responses {
    display: flex;
    width: 90%;
    margin: auto;
    justify-content: space-between;
    
    div {
      margin: 1%;
      padding: 4.5% 4.5% 0 4.5%;
      flex:1;
      background-color: $themeBlue4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
      font-size: 1.5rem;
      }

      img {
        max-height: 160px;
        min-height: 160px;
        width: auto;
        margin-top: 60px;
      }
    }


  }
  



    h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: white;
      margin:auto;
      text-align: center;
      max-width: 60%;
    }

    img {
      width: 30%;
      margin: 0 auto;
    }

    p {
      margin: auto;
      text-align: center;
      font-size: 2rem;

    }


  
}





</style>
