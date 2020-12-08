<template>
  <article class="conclusion" :class="currentState">
      <h1>C'est déjà la fin</h1>
      <img src="../../assets/cursor.svg">
      <p>{{ msg }}</p>
  </article>
</template>

<script>
export default {
  name: 'IntroductionSequence',
  data: () => ({
    msg: "Malgré les idées reçues, le VIH est toujours très présent en France et on en guérit pas ! Le seul moyen de bloquer sa progression est d’utiliser le préservatif et de se faire dépister."
  }),
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
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
