<template>
  <article v-on:wheel="onWheelChangeSlide"
           class="condom-usage scrolling-slide"
           :class="[ currentState, arrivingClass ]"
           :style="{ display: displayStyle }"
  >
        <h1>Utilisation du préservatif</h1>

        <p class="return-to-global-sequence" :class="{visible: detailsDisplay}" v-on:click="detailsDisplay = false">RETOUR</p>

        <CondomUsageDataviz
          :dataSource="globalCondomUsageDataSource"
          :width="500"
          :height="500"
          @detail-index-change="updateDetailsIndex"
          @detail-display="detailsDisplay = true"
          :detailsDisplay="detailsDisplay"

         />
        <DetailsCondomUsageDataviz
          :dataSource="currentDetailsDataSource"
          :detailsDisplay="detailsDisplay"
          :width="700"
          :height="400"
        />

  </article>
</template>

<script>
import { csv, json } from 'd3';
import CondomUsageDataviz from "@/components/dataviz/CondomUsageDataviz";
import DetailsCondomUsageDataviz from "@/components/dataviz/DetailsCondomUsageDataviz";
import sequence from "@/mixins/sequenceMixin";

function dataParseInt (d) {
  d.value = +d.value
  return d
}

export default {
  name: 'CondomUsageSequence',
  mixins: [ sequence ],
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  components: {
    CondomUsageDataviz,
    DetailsCondomUsageDataviz
  },
  data: () => ({
    globalCondomUsageDataSource: [],
    condomUsageDataSource: [],
    noCondomUsageDataSource: [],
    sometimesNoCondomUsageDataSource: [],
    currentDetailsIndex: 0,
    detailsDisplay: false,
    details: false
  }),
  async created() {
    this.getDataSource()
  },
  computed: {
    currentDetailsDataSource () {
      if (!this.detailsDisplay) return []
      let data = this.sometimesNoCondomUsageDataSource
      switch (this.currentDetailsIndex) {
        case 1:
          data = this.condomUsageDataSource
          break;
        case 2:
          data = this.noCondomUsageDataSource
          break
      }
      return data
    },

  },
  methods: {
    async getDataSource () {
      this.condomUsageDataSource = await csv('datas/detailsCondomUsage.csv', dataParseInt)
      this.condomUsageDataSource.detailMessage ="Raisons avancées pour l'utilisation du préservatif"
      this.condomUsageDataSource.colorPie = this.$globals.dataColors3[1]
      this.noCondomUsageDataSource = await csv('datas/detailsNoCondomUsage.csv', dataParseInt)
      this.noCondomUsageDataSource.detailMessage ="Raisons avancées pour ne pas utiliser de préservatif"
      this.noCondomUsageDataSource.colorPie = this.$globals.dataColors3[2]
      this.sometimesNoCondomUsageDataSource = await csv('datas/detailsSometimesNoCondomUsage.csv', dataParseInt)
      this.sometimesNoCondomUsageDataSource.detailMessage ="Raisons avancées pour avoir manqué occasionnellement l'usage du préservatif"
      this.sometimesNoCondomUsageDataSource.colorPie = this.$globals.dataColors3[0]
      this.globalCondomUsageDataSource = await json('datas/condomUsage.json')
    },
    updateDetailsIndex (index) {
      this.currentDetailsIndex = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.condom-usage {

  h1 {
      font-family: $titleFont;
      font-size: 3.5em;
      margin: 1rem 0;
      color: #ffff;
      text-align: left;
      width: 100%;
      margin-bottom:0;
  }
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  margin: auto;
  padding: 2% 10%;
  background: $themeRed;
  position: fixed;

  .return-to-global-sequence {
    opacity: 0;
    transition: all .3s;
    cursor: pointer;
    color: #fff;
    font-size: 1.3rem;
    margin-top:15px;

    &.visible {
      opacity:1;
    }


  }


}

</style>
