<template>
  <div class="container">
    <p> {{ msg }}</p>
    <div id="diagram"></div>
    <div class="cursor"></div>
  </div>
</template>

<script>
// import * as d3 from "d3"

export default {
  name: 'SecondSequence',
   data() {
    return {
      msg:" A votre avis quel graphique est le vrai ? ",
      height: 600,
      width: 600,
      vihSeropositivy: [
        {year: "2010", value: 6629},
        {year: "2014", value: 6559},
        {year: "2018", value: 6155}
      ]
    }
  },
  mounted() {
    this.generateDiagram();
  },
  methods: {
    generateDiagram(){

        //  var svg = d3.select("#diagram"),
        // margin = 200,
        // width = svg.attr("width") - margin,
        // height = svg.attr("height") - margin;
        // //
        // // var xScale = d3.scaleBand().range ([0, width]).padding(0.4),
        // //     yScale = d3.scaleLinear().range ([height, 0]);
        // //
        // // var g = svg.append("g")
        // //           .attr("transform", "translate(" + 100 + "," + 100 + ")");
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
