const width = 800,
  height = 500,
  inPadding = 75;
outPadding = 25;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("width", width + inPadding + outPadding)
  .attr("height", height + inPadding + outPadding);

const tooltip = d3.select(".visHolder").append("div").attr("id", "tooltip");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((dataset) => {
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset.data, (d) => d[1])])
      .range([0, height]);

    const toDate = dataset.data.map((d) => new Date(d[0]));

    svgContainer
      .append("text")
      .text("Gross Domestic Product")
      .attr("transform", "rotate(90 100 80)")
      .attr("x", 100)
      .attr("y", 80)
      .style("font-weight", "lighter")
      .style("font-size", "20px");

    const xScale = d3
      .scaleTime()
      .domain([d3.min(toDate), d3.max(toDate)])
      .range([0, width]);

    const barWidth = (width - toDate.length * 0.5) / toDate.length;

    svgContainer
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d, i) => d[0])
      .attr("data-gdp", (d, i) => d[1])
      .attr("x", (d, i) => xScale(toDate[i]) + inPadding)
      .attr("y", (d, i) => height + outPadding - yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d, i) => yScale(d[1]))
      .on("mouseover", (d, i) => {
        tooltip
          .html(d[0] + "<br>" + " $" + d[1] + " Billion")
          .attr("data-date", d[0])
          .style("left", barWidth * i + i * 0.5 + 200 + "px")
          .style("top", height - 100 + "px")
          .style("opacity", 0.7);
      })
      .on("mouseout", (d, i) => {
        tooltip.style("opacity", 0);
      });

    const yAxisScale = d3.axisLeft(
      d3
        .scaleLinear()
        .domain([0, d3.max(dataset.data, (d) => d[1])])
        .range([height, 0])
    );

    const xAxisScale = d3.axisBottom(xScale);

    svgContainer
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + inPadding + ", " + outPadding + ")")
      .call(yAxisScale);

    svgContainer
      .append("g")
      .attr("id", "x-axis")
      .attr(
        "transform",
        "translate(" + inPadding + ", " + (outPadding + height) + ")"
      )
      .call(xAxisScale);
  });
