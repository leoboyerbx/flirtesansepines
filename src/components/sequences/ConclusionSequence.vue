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
      <h1>Pour résumer :</h1>
      <div class="user-responses">
        <div class="seropositivity-estimation">
          <p>Selon toi, <span>{{userEstimationFirst}}</span> personnes ont été détectées séropositives en 2018.</p>
          <img src="../../assets/flower.svg" alt="flower">
        </div>
        <div class="death-estimation">
          <p v-if="userEstimationDeath">
            Contrairement à un bon nombre de personnes, tu es conscient(e) que l'on meurt encore du VIH en France.
          </p>
          <p v-else>
            N'oublie pas que malgré les progrès de la médecine, le VIH fait des victimes chaque année.
          </p>
          <img src="../../assets/handwithflower.svg" alt="hand with flower">

        </div>
        <div class="condom-usage">
          <p  v-if="userCondomUsage === 2">
            Comme tu l'as compris, l'utilisation du préservatif est le seul moyen de se protéger contre le VIH, ne change rien !
          </p>
          <p v-else-if="userCondomUsage === 1">
            Tu n'utilises pas systématiquement le préservatif. N'oublie pas que c'est le seul moyen de te protéger du VIH !
          </p>
          <p v-else>
            N'oublie pas que le préservatif est le seul moyen de te protéger du VIH ! Nous te conseillons fortement de l'utiliser lorsque tes partenaires ne se sont pas faits dépister.
          </p>
          <img src="../../assets/condom.svg" alt="hand with flower">
        </div>
        <span class="button">
          <a target="_blank" href="https://www.sida-info-service.org/categorie/vihsida/depistage-vih/?gclid=CjwKCAiAq8f-BRBtEiwAGr3DgfxR5nOsfQRJ9JhSCYQ8dp0z5lz_znD5G4TEe-jLoDFMDqYqx0vdmRoCr78QAvD_BwE">Pour plus d'infos sur le dépistage</a>
        </span>
      </div>
    </div>

    <footer>
      <div>
        <p class="produced-by"> Travail étudiant réalisé par : Romain Critot, Sarah Blaisa, Léo Boyer, Maëva Reynaud</p>
        <a target="_blank" href="https://docs.google.com/spreadsheets/d/1YKJx8cLYmyNs-wn2jJhnB1kJ_5zeaT2GN0aq2a79KI4/edit?usp=sharing">Sources</a>
      </div>
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
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }


  footer {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2% 5%;
    margin-top: 100px;

    a {
        border-bottom: 1px solid $themeBlue3;
        padding: .1em 0em;
        cursor: pointer;
        text-decoration: none;
        background: transparent;
        color: $themeBlue3;
        font-weight: bold;
      }

    .produced-by {
        font-family: $paragraphFont;
        font-size: 1.2rem;
        color: $themeBlue3;
        font-weight: bold;
    }

    div {
      flex:1;
      &.logos {
        display: flex;
        justify-content: flex-end;
        img {
          margin-left: 30px;
          width: 80px;
          display: flex;
          height: 100%;
          object-fit: contain;
        }
      }
    }

  }

  background-color: $themeBlue3;

  .header {
    width: 100%;
    background-color: white;
    padding-top: 60px;
    display: flex;
    img {
      width: 100%;
    }
  }

  a {
    color: #ffff;
    background-color: $themeBlue2;
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
      font-weight: bold;

      .seropositivity-estimation {

        span {
          color: $themeRed;
          font-weight: 600;
        }

      }
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
