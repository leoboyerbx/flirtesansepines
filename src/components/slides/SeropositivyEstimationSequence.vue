<template>
  <article class="seropositivity-estimation" :class="currentState">
    <div class="container">
        <h1>{{ msg }}</h1>
    </div>
  </article>
</template>

<script>
export default {
  name: 'IntroductionSequence',
    data: () => ({
        msg: "A votre avis, combien de cas de séropositivité ont été definis en 2019 en France ?"
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

.seropositivity-estimation {
    display:none;

    &.current {
        display: block;
    }

    width: 100vw;
    height: 100vh;
    background: rgb(92,144,182);
    background: radial-gradient(circle, rgba(92,144,182,1) 0%, rgba(3,25,65,1) 100%);

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
