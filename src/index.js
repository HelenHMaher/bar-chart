const width = 800,
  height = 500,
  padding = 100;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("width", width + padding)
  .attr("height", height + padding);

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((dataset) => {
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset.data, (d) => d[1])])
      .range([0, height]);
    const barWidth = (width - dataset.data.length / 2) / dataset.data.length;
    svgContainer
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (barWidth + 0.5) + padding)
      .attr("y", (d, i) => height - yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d, i) => yScale(d[1]));
  });
