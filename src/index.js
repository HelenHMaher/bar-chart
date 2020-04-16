const width = 800,
  height = 500,
  inPadding = 75;
outPadding = 25;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("width", width + inPadding + outPadding)
  .attr("height", height + inPadding + outPadding);

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

    console.log(toDate);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(toDate), d3.max(toDate)])
      .range([0, width]);

    const barWidth = (width - toDate.length * 0.5) / toDate.length;

    const barElement = svgContainer
      .selectAll("rect")
      .data(dataset.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d, i) => dataset.data[i][0])
      .attr("data-gdp", (d, i) => dataset.data[i][1])
      .attr("x", (d, i) => xScale(toDate[i]) + inPadding)
      .attr("y", (d, i) => height + outPadding - yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d, i) => yScale(d[1]))
      .append("title")
      .attr("id", "tooltip")
      .html((d) => dataset.data[0] + " $" + dataset.data[1] + " Billion");

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
