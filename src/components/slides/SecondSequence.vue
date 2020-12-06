<template>
  <div class="container">
    <p> {{ msg }} </p>
    <p> Test</p>
    <div id="diagram" width="600" height="500"></div>

  </div>
</template>
<script>
//import * as d3 from "d3"

export default {
  name: 'SecondSequence',
   data() {
    return {
      msg:" A votre avis quel graphique est le vrai ? ",
      height: 600,
      width: 600
    }
  },
  mounted() {
    //this.generateDiagram();
  },
  methods: {
    generateDiagram(){
        /*var svg = d3.select("#diagram"),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin;

        var xScale = d3.scaleLinear().range([0,width - 100])
            yScale = d3.scaleLinear().range ([height, 0]);

        var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

        d3.csv("datas/VIH.csv").then(data => {
          data.year = parseFloat(data.year)
          //data.value = parseFloat(data.value)

          xScale.domain(data.map(function(d) { return d.year; }));
          yScale.domain(data.map( function(d) { return d.value; }));

          g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

          g.append("g") .call(d3.axisLeft(yScale))





        })*/
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
