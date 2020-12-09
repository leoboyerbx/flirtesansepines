<template>
  <article class="conclusion" :class="currentState">
      <h1>Penses-tu que l'on meurt encore du VIH?</h1>
        <div @click="booleanUser = true">
            <p> Oui</p>
        </div>
        <div @click="booleanUser = false">
            <p>Non</p>
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

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $backgroundColor;
  font-family: $titleFont;



    h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: white;
      margin:auto;
      color: $themeBlue3;
      text-align: center;
      max-width: 60%;
    }

  


  
}





</style>
