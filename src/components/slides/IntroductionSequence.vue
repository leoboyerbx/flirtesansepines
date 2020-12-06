<template>
  <article class="experience-introduction" :class="currentState">
    <div class="container">
      <img src="../../assets/rose.svg">
      <h1>{{ title }}</h1>
    </div>
  </article>
</template>

<script>
export default {
  name: 'IntroductionSequence',
  data: () => ({
    title: "Flirte sans épines"
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

.experience-introduction {
  display:none;
  &.current {
    display: block;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(92,144,182);
  background: radial-gradient(circle, rgba(92,144,182,1) 0%, rgba(3,25,65,1) 100%);
  font-family: $titleFont;

  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    max-width: 75%;
    min-height: 100%;
    margin: auto;

    h1 {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 70px;
    }

    img {
      width: 30%;
    }


  }
}





</style>
