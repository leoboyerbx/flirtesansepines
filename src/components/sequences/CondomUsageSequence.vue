<template>
  <article v-on:wheel="onWheel" 
           class="condom-usage" 
           :class="currentState">
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
        <p class="return-to-global-sequence" :class="{visible: detailsDisplay}" v-on:click="detailsDisplay = false">RETOUR</p>

  </article>
</template>

<script>
import { csv, json } from 'd3';
import CondomUsageDataviz from "@/components/dataviz/CondomUsageDataviz";
import DetailsCondomUsageDataviz from "@/components/dataviz/DetailsCondomUsageDataviz";

function dataParseInt (d) {
  d.value = +d.value
  return d
}

export default {
  name: 'CondomUsageSequence',
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
    onWheel (e) {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
      const scrollLimit = this.$el.offsetHeight - vh

      const canGoUp = e.deltaY < 0 && this.translateY < 0
      const canGoDown = e.deltaY > 0 && this.translateY > -scrollLimit
      console.log(e.deltaY)
      console.log(this.translateY)
      if (canGoUp || canGoDown) {
        this.translateY -= e.deltaY * this.scrollFactor
      } else if (e.deltaY > 0 && this.translateY <= -scrollLimit && !this.displayNextSlide) {
        this.$emit('next-slide');
        //document.getElementById('zoomable').getElementsByClassName('.checkmark');
        this.displayNextSlide = true;
      }
    },
    async getDataSource () {
      this.condomUsageDataSource = await csv('datas/detailsCondomUsage.csv', dataParseInt)
      this.noCondomUsageDataSource = await csv('datas/detailsNoCondomUsage.csv', dataParseInt)
      this.sometimesNoCondomUsageDataSource = await csv('datas/detailsSometimesNoCondomUsage.csv', dataParseInt)
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
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  transition: all .5s;
  opacity:0;
  visibility: hidden;
  transition-delay: .5s;
  margin: auto;
  padding: 4% 10%;
  background: $themeRed;
  position: relative;

  &.current {
    position: fixed;
    opacity:1;
    visibility: visible;
  }

  .return-to-global-sequence {
    position: absolute;
    top:0;
  }


}

</style>
