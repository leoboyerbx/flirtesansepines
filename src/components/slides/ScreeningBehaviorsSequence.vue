<template>
  <article class="screening-behaviors" :class="currentState">
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

export default {
  name: "ScreeningBehaviorsSequence",
  components: {ScreeningBehaviorsDataviz},
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  data: () => ({
    dataSource: []
  }),
  async created() {
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
    }
  }
}
</script>

<style scoped lang="scss">
//@import '@/assets/scss/globals.scss';

.screening-behaviors {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $backgroundColor;
  &.current {
    display: block;
  }

}
</style>
