<template>
  <div class="death-treatment-dataviz">
    <svg :width="width" :height="height" ref="svg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'DeathTreatmentDataviz',
  props: {
    width: { type: Number },
    height: { type: Number },

    treatmentDataSource: { type: Array },
  },
  data: () => ({
    svg: null,
    margin: {top: 20, right: 200, bottom: 60, left: 100},
    bandSpacing: 30,
    tooltipVisible: false
  }),
  watch: {
    treatmentDataSource: {
      // deep: true,
      handler() {
        this.updateSvg()
      }
    }
  },
  computed: {
    dataWidth () {
      return this.width - this.margin.left - this.margin.right
    },
    dataHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    colors () { return this.$globals.dataColors },
    xScale () {
      return d3.scaleLinear()
          .domain(d3.extent(this.treatmentDataSource, d => d.year))
          .range([0, this.dataWidth])
    },
    treatmentYScale () {
      return d3.scaleLinear()
          .range([this.dataHeight, 0])
          .domain([0, d3.max(this.treatmentDataSource, d => d.value)])
    },
    xAxis() {
      return d3.axisBottom(this.xScale)
          .tickFormat(x => x.toString())
    }
  },
  mounted() {
    this.initSvg();
  },
  methods: {
    initSvg() {
      this.svg = d3.select(this.$refs.svg).attr("id", "svg")
          .append("g")
          .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      this.initAxis()
      this.updateSvg()
    },
    initAxis () {
      const axis = this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.dataHeight + ")")
          .call(this.xAxis)
      this.styleXAxis(axis)
    },
    updateAxis () {
      const axis = this.svg.selectAll('g.x.axis').call(this.xAxis)
      this.styleXAxis(axis)
    },
    styleXAxis (axis) {
      // axis.selectAll("text")
      //     .style("fill", "#f00")
    },
    updateSvg () {
      console.log(this.treatmentDataSource)
      // this.svg.selectAll('rect')
      //     .data(this.treatmentDataSource)
      //     .join('rect')
      //     .style('fill', this.$globals.dataColors[1])
      //     .attr('x', d => this.xScale(d.year))
      //     .attr('width', 10)
      //     .attr("y", d =>  this.treatmentYScale(d.value))
      //     .attr("height", d => this.dataHeight - this.treatmentYScale(d.value))

      this.svg.append("path")
          .datum(this.treatmentDataSource)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x((d) => this.xScale(d.year))
              .y((d) => this.treatmentYScale(d.value))
          )

      this.updateAxis()
    },
    generateLineChart (){

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
.death-treatment-dataviz {

}

</style>
