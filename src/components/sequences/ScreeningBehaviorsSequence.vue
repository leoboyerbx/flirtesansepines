<template>
  <article
      class="screening-behaviors"
      v-on:wheel="onWheelChangeSlide"
      :class="[ currentState, arrivingClass ]"
      :style="{ display: displayStyle }"
  >
    <h1>Fréquence de dépistage par tranche d’âge</h1>
    <p>Même si les jeunes de 18 à 25 ans se font dépister plus souvent que le reste de la population, presque la moitié d’entre eux ne se sont jamais fait tester.</p>
    <ScreeningBehaviorsDataviz
      :dataSource="dataSource"
      :width="800"
      :height="400"
    />
  </article>
</template>

<script>
import { csv } from 'd3'
import ScreeningBehaviorsDataviz from "@/components/dataviz/ScreeningBehaviorsDataviz";
import sequence from "@/mixins/sequenceMixin";

export default {
  name: "ScreeningBehaviorsSequence",
  components: {ScreeningBehaviorsDataviz},
  mixins: [ sequence ],
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  data: () => ({
    dataSource: []
  }),
  created() {
    this.getDataSource()
  },
  methods: {
    async getDataSource () {
      const dataSource = await csv('datas/screeningBehaviors.csv', data => {
        data.never = parseFloat(data.never)
        data.over12Months = parseFloat(data.over12Months)
        data.in12Months = parseFloat(data.in12Months)
        return data
      })
      this.dataSource = dataSource
    },
    onWheelChangeSlideCustom (e) {
      if (e.deltaY > 0) {
        this.$emit('next-slide')
      } else if (e.deltaY < 0) {
        this.$emit('prev-slide', 2)
      }
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@/assets/scss/globals.scss';

.screening-behaviors {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $themeRed;
  margin: auto;
  padding: 5% 20%;
  transition: all $slideDurationEasing;

  &.future {
    opacity: 0;
  }
  &.arriving-forward {
    animation: fade-in $slideDurationEasing;
  }
  &.past {
    transform: translate3d(0, -100vh, 0);
  }
  &.arriving-backward {
    animation: arriving-from-top $slideDurationEasing;
  }


  h1 {
      font-family: $titleFont;
      font-size: 3.5em;
      margin: 0em 0 1em 0;
      color: white;
      max-width: 50%;
      text-align: left;
  }
  p {
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 30px;
    font-weight: bold;
  }

}
</style>
