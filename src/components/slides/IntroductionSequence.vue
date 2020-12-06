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
        title: "Flirt sans épines"
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
    width: 100vw;
    height: 100vh;
    background: rgb(92,144,182);
    background: radial-gradient(circle, rgba(92,144,182,1) 0%, rgba(3,25,65,1) 100%);

    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        max-width: 80%;

        img {
            height: 50%;
        }
    }
}





</style>
