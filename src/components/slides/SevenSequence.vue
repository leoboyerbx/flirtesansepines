<template>
  <article id="seven_sequence_container" :class="currentState">
    <div id="chart"></div>
  </article>
</template>

<script>
import * as d3 from 'd3';
export default {
  watch: {
  },
  name: 'SevenSequence',
  props: {
    currentState: {
      type: String,
      default: 'future'
    }
  },
  mounted() {
    this.generateLineChart();
  },
  methods: {
    generateLineChart(){

      const margin = {top: 20, right: 30, bottom: 30, left: 60},
            width = 500,
            height = 400 - margin.top - margin.bottom;

      const x = d3.scaleLinear()
          .range([0, width]);

      const y = d3.scaleLinear()
          .range([height, 0]);
      

      const line = d3.line()
          .x(d => x(d.year))
          .y(d => y(d.value));

       const line_2 = d3.line()
          .x(d => x(d.year))
          .y(d => y(d.number));

      const svg = d3.select("#chart").append("svg")
        .attr("id", "svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //var map = {};
      d3.csv("datas/VIH.csv").then(function(data) {
          // Conversion des données du fichier, parsing des dates et '+' pour expliciter une valeur numérique.
          data.forEach(function(d) {
              d.year = parseFloat(d.year);
              d.value = parseFloat(d.value);
              //map[d.year] = d; // sauvegarde sous forme de hashmap de nos données.
              //console.log(map)
          });
    

          x.domain(d3.extent(data, d => d.year));
          y.domain(d3.extent(data, d => d.value));

          console.log(x.domain(d3.extent(data, d => d.year)));
          console.log(y)

          // Ajout de l'axe X
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));
          
          // Ajout de l'axe Y et du texte associé pour la légende
          svg.append("g")
              .call(d3.axisLeft(y))

          
          // Ajout de la grille horizontale (pour l'axe Y donc). Pour chaque tiret (ticks), on ajoute une ligne qui va 
          // de la gauche à la droite du graphique et qui se situe à la bonne hauteur.
          svg.selectAll("y axis").data(y.ticks(10)).enter()
              .append("line")
              .attr("class", "horizontalGrid")
              .attr("x1", 0)
              .attr("x2", width)
              .attr("y1", d => y(d))
              .attr("y2", d => y(d));
          
          // Ajout d'un path calculé par la fonction line à partir des données de notre fichier.
          svg.append("path")
              .datum(data)
              .style("fill", "none")
              .style("stroke", "#3498db")
              .attr("class", "line")
              .attr("d", line);
     });

      d3.csv("datas/VIH_test.csv").then(function(data) {

          x.domain(d3.extent(data, d => d.year));
          y.domain(d3.extent(data, d => d.number));

          // Ajout d'un path calculé par la fonction line à partir des données de notre fichier.
          svg.append("path")
              .datum(data)
              .style("fill", "none")
              .style("stroke", "#3498db")
              .attr("class", "line")
              .attr("d", line_2);
      });
    }

}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#seven_sequence_container{
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  
  &.current {
    display: block;
  }
}

</style>
