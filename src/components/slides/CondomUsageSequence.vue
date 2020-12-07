<template>
  <article class="condom-usage" :class="currentState">
        <CondomUsageDataviz  />
  </article>
</template>

<script>
import * as d3 from 'd3';
import CondomUsageDataviz from "@/components/dataviz/CondomUsageDataviz";
export default {
  name: 'CondomUsageSequence',
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  
  components: {
    CondomUsageDataviz
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.condom-usage {
  display:none;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background-color: $backgroundColor;
  

  &.current {
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    align-items: center;  
  }


}

</style>
