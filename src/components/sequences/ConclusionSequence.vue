<template>
  <article class="conclusion" :class="currentState">
      <div class="header">
        <img src="../../assets/conclusionimg.svg" alt="abstract illustration">
      </div>
      <div class="responses">

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
          <p  v-if="userCondomUsage === 0">
            Comme tu l'auras compris, l'utilisation du préservatif est le seule moyen de se protéger contre le VIH, donc ne change rien !
          </p>
          <p v-else-if="userCondomUsage === 1">
            Tu n'utilises pas systématiquement le préservatif. N'oublies pas que c'est le seul moyen de te protéger du VIH ! 
          </p>
          <p v-else>
            N'oublies pas que le préservatif est le seul moyen de te protéger du VIH ! Nous te conseillons fortement de l'utiliser lorsque tes partenaires ne se font pas dépister.
          </p>
          <img src="../../assets/condom.svg" alt="hand with flower">
        </div>
      </div>
      <a target="_blank" href="https://www.ch-annecygenevois.fr/fr/article/le-centre-de-depistage-du-change">Pour plus d'infos sur le dépistage</a>  
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
    userCondomUsage () {
      return this.$store.state.condomUsage
    }

  },
  methods: {
    
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.conclusion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all $slideDurationEasing;
  overflow-y: scroll;
  scrollbar-width: none;

  top: 0;
  left: 0;
  width: 100%;
  background-color: $themeBlue3;
  font-family: $titleFont;

  .header {
    width: 100%;
    background-color: white;
    img {
      width: 100%;
    }
  }

  a {
    color: #ffff;
    background-color: $themeBlue2;
    border-radius: 50px;
    padding: 15px 40px;
    width: auto;
    margin: auto;
    text-decoration: none;
    font-family: $paragraphFont;
    font-size: 1.3rem;
  }

  &.current {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

.responses {

  h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: white;
      margin:auto;
      text-align: center;
      max-width: 60%;
      margin-top: 2.4rem;
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
