<template>
  <article class="conclusion scrolling-slide"
           @wheel="onWheel"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
    <div class="header">
      <img src="../../assets/conclusionimg.svg" alt="abstract illustration">
    </div>
    <div class="responses">
      <h1>Tes réponses</h1>
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
            N'oublie pas que malgré les progrès de les médecine, le VIH fait des victimes chaque année.
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
        <span class="button">
          <a target="_blank" href="https://www.ch-annecygenevois.fr/fr/article/le-centre-de-depistage-du-change">Pour plus d'infos sur le dépistage</a>
        </span>

      </div>
    </div>

    <footer>
      <p class="produced-by">Produit par : Romain Critot, Sarah Blaisa, Léo Boyer & Maëva Reynaud</p>
      <div class="logos">
        <img src="../../assets/gobelins.png" alt="">
        <img src="../../assets/logo_campus.png" alt="">
      </div>
    </footer>

  </article>
</template>

<script>
import sequence from "@/mixins/sequenceMixin";

export default {
  name: 'ConclusionSequence',
  mixins: [ sequence ],
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
    onWheel (e) {
      if (e.deltaY < 0 && this.$el.scrollTop <= 0) {
        this.$emit('prev-slide')
      }
    }
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
  height: 100vh;
  transition: all $slideDurationEasing;
  overflow-y: scroll;
  //scrollbar-width: none;

  footer {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2% 5%;
    margin-top: 100px;

    .produced-by {
        font-family: $paragraphFont;
        font-size: 1.2rem;
    }

    div {
      flex:1;
      &.logos {
        display: flex;
        justify-content: flex-end;
        img {
          margin-left: 30px;
          width: 80px;
        }
      }
    }
    
  }

  background-color: $themeBlue3;
  font-family: $titleFont;

  .header {
    width: 100%;
    background-color: white;
    display: flex;
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
    margin-top: -2px;
    background: $themeBlue3;

     img {
      width: 30%;
      margin: 0 auto;
    }

    h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: white;
      margin: auto;
      padding: 30px 0;
      text-align: center;
      max-width: 60%;
    }
    .user-responses {
      display: flex;
      flex-wrap: wrap;
      width: 90%;
      margin: auto;
      justify-content: space-between;
      
      .button {
        width: 100%;
        text-align: center;
        margin-top: 60px;
        a {
          color: white;
          border-bottom: 1px solid white;
          padding: .1em 0em;
          font-size: 1.8rem;
          cursor: pointer;
          font-family: $paragraphFont;
          font-weight: bold;
          text-decoration: none;
          background: transparent;
          border-radius:0;
        }
      }

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
          margin: auto;
          text-align: center;
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


 

  



}





</style>
