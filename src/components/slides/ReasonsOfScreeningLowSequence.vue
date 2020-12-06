<template>
  <article class="reasons-screening-low" :class="currentState">
    <h1>{{ title }}</h1>
    <div class="interaction-container">
        <div 
            @mouseover="badKnowledge = true"
            @mouseleave="badKnowledge = false"
            class="badknowledge-area">
            <p>Manque de connaissance</p>
        </div>
        <img src="../../assets/rose.svg">
        <div 
            @mouseover="sexualExclusivity = true"
            @mouseleave="sexualExclusivity = false"
            class="sexualexclusivity-area">
            <p>Exclusivité sexuelle</p>
        </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ReasonsOfScreeningLowSequence',
  data: () => ({
    title: "Selon toi, pourquoi sommes-nous si peu à nous faire dépister?",
    badKnowledge: false,
    sexualExclusivity:false
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

.reasons-screening-low {
    display:none;
    background-color: $backgroundColor;
    position:fixed;
    width:100vw;
    height: 100vh;

    &.current {
        display: block;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    h1 {
      font-family: $titleFont;
      font-size: 50px;
      color: white;
      margin:0;
      color: $themeBlue3;
      text-align: center;
      max-width: 60%;
      margin: auto;
    }

    

    .interaction-container {
        display: flex;
        justify-content: space-between;
        align-items: stretch;

        div {
            width: 35%;
            p {
              font-family: $titleFont;
              color: $themeBlue3;
              text-align: center;
              margin: 5rem auto auto auto;
              font-size: 2rem;
              max-width: 60%;
            }
        }

        img {
            width: 18%
        }

        
    }


}
    

</style>
