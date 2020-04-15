const width = 3000;
const height = 1000;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("width", width + 100)
  .attr("height", height + 60);
