<template>
  <div id="seven_sequence_container">
    <h1>test</h1>
    <div id="chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  watch: {
  },
  name: 'SevenSequence',
  props: {
    msg: String
  },
  mounted() {
    this.generateLineChart();
  },
  methods: {
    generateLineChart(){

      const margin = {top: 20, right: 30, bottom: 30, left: 60},
            width = 500,
            height = 400 - margin.top - margin.bottom;

      //console.log("test")

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
    
          // Contrairement au tutoriel Bar Chart, plutôt que de prendre un range entre 0 et le max on demande 
          // directement à D3JS de nous donner le min et le max avec la fonction 'd3.extent', pour la date comme 
          // pour le cours de fermeture (close).
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
              /*.append("text")
                  .attr("fill", "#f1F1F1")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", "0.71em")
                  .style("text-anchor", "end")
                  .text("Pts");*/
          
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
          // Conversion des données du fichier, parsing des dates et '+' pour expliciter une valeur numérique.
         
    
          // Contrairement au tutoriel Bar Chart, plutôt que de prendre un range entre 0 et le max on demande 
          // directement à D3JS de nous donner le min et le max avec la fonction 'd3.extent', pour la date comme 
          // pour le cours de fermeture (close).
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
  width: 100vw;
  height: 100vh;
}

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
