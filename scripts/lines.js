(function main() {

  const CHART_WIDTH = 400;
  const CHART_HEIGHT = 140;
  const COLOR = "#e27a3f";

  let lineData = [
    [0, 4],
    [1, 10],
    [2, 8],
    [3, 12],
    [4, 5],
    [5, 7]
  ];

  const chartsContainer = document.getElementById("charts-container");

  function scaleData (data) {
    const xMax = data[data.length - 1][0];
    const yMax = data.reduce((max, cur) => Math.max(cur[1], max), 0);
    return data.map(point => [
      point[0] * CHART_WIDTH / xMax,
      CHART_HEIGHT - point[1] * CHART_HEIGHT / yMax
    ]);
  }

  // Render bars for the bar chart using SVG
  function renderSVGLines(chartEl) {
    const svgRootEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgRootEl.setAttribute("width", CHART_WIDTH);
    svgRootEl.setAttribute("height", CHART_HEIGHT);
    chartEl.appendChild(svgRootEl);

    const scaledData = scaleData(lineData);
    pathString = `M${scaledData[0][0]},${scaledData[0][1]}`;
    for (let i = 1; i < scaledData.length; i++) {
      pathString += `L${scaledData[i][0]},${scaledData[i][1]}`
    }

    const line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    line.setAttribute('d', pathString);
    line.setAttribute('stroke', COLOR);
    line.setAttribute('stroke-width', 3);
    line.setAttribute('fill', 'none');
    svgRootEl.appendChild(line);
  }

  // Render bars for the bar chart using Canvas
  function renderCanvasLines(chartEl) {
    const canvasRootEl = document.createElement("canvas");
    canvasRootEl.setAttribute("width", 400);
    canvasRootEl.setAttribute("height", CHART_HEIGHT);
    chartEl.appendChild(canvasRootEl);

    const ctx = canvasRootEl.getContext('2d');
    const scaledData = scaleData(lineData);

    ctx.strokeStyle = COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(scaledData[0][0], scaledData[0][1]);
    for (let i = 1; i < scaledData.length; i++) {
      ctx.lineTo(scaledData[i][0], scaledData[i][1]);
    }
    ctx.stroke();
  }

  // Render everything in a chart except the bars
  function renderChart(title) {
    const chartEl = document.createElement('div');
    chartEl.className = "chart-container";
    chartEl.style = "height: 140px;";
    chartsContainer.appendChild(chartEl);
    
    const chartTitle = document.createElement('div');
    chartTitle.className = "chart-title";
    chartTitle.textContent = title;
    chartEl.appendChild(chartTitle);

    return chartEl;
  }

  // Render an entire chart including SVG lines
  function renderSVGChart() {
    const svgChart = document.getElementById('svg-chart');
    if (svgChart) {
      svgChart.parentNode.removeChild(svgChart);
    }
    const chart = renderChart('svg');
    chart.setAttribute('id', 'svg-chart');
    renderSVGLines(chart);
  }

  // Render an entire chart including canvas lines
  function renderCanvasChart() {
    const canvasChart = document.getElementById('canvas-chart');
    if (canvasChart) {
      canvasChart.parentNode.removeChild(canvasChart);
    }
    const chart = renderChart('canvas');
    chart.setAttribute('id', 'canvas-chart');
    renderCanvasLines(chart);
  }

  // "New random data" button
  const moreButton = document.createElement("button");
  moreButton.textContent = "New random data";
  moreButton.onclick = e => {
    lineData = lineData.map(point => [point[0], point[1] + Math.random() * 5 - 2.5])
    renderSVGChart();
    renderCanvasChart();
  };
  chartsContainer.appendChild(moreButton);

  // Initial render of all 2 charts
  renderSVGChart();
  renderCanvasChart();
})();