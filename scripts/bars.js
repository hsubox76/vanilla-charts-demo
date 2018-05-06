(function main() {

  const BAR_HEIGHT = 30;
  const BAR_MARGIN = 2;
  const CHART_WIDTH = 400;

  const barsData = [
    { name: 'earth', value: 50, color: '#efc94c' },
    { name: 'wind', value: 70, color: '#45b29d' },
    { name: 'fire', value: 90, color: '#e27a3f' },
    { name: 'water', value: 30, color: '#334d5c' },
  ];

  const chartsContainer = document.getElementById("charts-container");

  // Render bars for the bar chart using divs
  function renderDivBars(chartEl) {
    const barsContainer = document.createElement('div');
    barsContainer.style = "position: relative";
    chartEl.appendChild(barsContainer);
  
    barsData.forEach((barData, index) => {
      const bar = document.createElement('div');
      let style = `position: absolute;`;
      style += `width: ${CHART_WIDTH * barData.value / 100}; height: ${BAR_HEIGHT}px;`;
      style += `top: ${index * (BAR_HEIGHT + BAR_MARGIN)};`;
      style += `background-color: ${barData.color};`;
      bar.style = style;
      barsContainer.appendChild(bar);
    });
  }

  // Render bars for the bar chart using SVG
  function renderSVGBars(chartEl) {
    const barsContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    barsContainer.setAttribute("width", 400);
    barsContainer.setAttribute("height", 140);
    chartEl.appendChild(barsContainer);
  
    barsData.forEach((barData, index) => {
      const bar = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      bar.setAttribute('width', CHART_WIDTH * barData.value / 100);
      bar.setAttribute('height', BAR_HEIGHT);
      bar.setAttribute('x', 0);
      bar.setAttribute('y', index * (BAR_HEIGHT + BAR_MARGIN));
      bar.setAttribute('fill', barData.color);
      barsContainer.appendChild(bar);
    });
  }

  // Render bars for the bar chart using Canvas
  function renderCanvasBars(chartEl) {
    const barsContainer = document.createElement("canvas");
    barsContainer.setAttribute("width", 400);
    barsContainer.setAttribute("height", 140);
    chartEl.appendChild(barsContainer);

    const ctx = barsContainer.getContext('2d');
  
    barsData.forEach((barData, index) => {
      ctx.fillStyle = barData.color;
      ctx.fillRect(0, index * (BAR_HEIGHT + BAR_MARGIN), CHART_WIDTH * barData.value / 100, BAR_HEIGHT);
    });
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
  
    const labelsContainer = document.createElement('div');
    labelsContainer.className = "bar-labels";
    chartEl.appendChild(labelsContainer);
  
    barsData.forEach((barData, index) => {
      const label = document.createElement('div');
      label.className = "bar-label";
      label.textContent = barData.name;
      label.style = `height: ${BAR_HEIGHT + BAR_MARGIN}px`;
      labelsContainer.appendChild(label);
    });

    return chartEl;
  }

  // Render an entire chart including div bars
  function renderDivChart() {
    const divChart = document.getElementById('div-chart');
    if (divChart) {
      divChart.parentNode.removeChild(divChart);
    }
    const chart = renderChart('div');
    chart.setAttribute('id', 'div-chart');
    renderDivBars(chart);
  }

  // Render an entire chart including SVG bars
  function renderSVGChart() {
    const svgChart = document.getElementById('svg-chart');
    if (svgChart) {
      svgChart.parentNode.removeChild(svgChart);
    }
    const chart = renderChart('svg');
    chart.setAttribute('id', 'svg-chart');
    renderSVGBars(chart);
  }

  // Render an entire chart including canvas bars
  function renderCanvasChart() {
    const canvasChart = document.getElementById('canvas-chart');
    if (canvasChart) {
      canvasChart.parentNode.removeChild(canvasChart);
    }
    const chart = renderChart('canvas');
    chart.setAttribute('id', 'canvas-chart');
    renderCanvasBars(chart);
  }

  // "More earth" button
  const moreButton = document.createElement("button");
  moreButton.textContent = "more earth";
  moreButton.onclick = e => {
    barsData[0].value += 10;
    renderDivChart();
    renderSVGChart();
    renderCanvasChart();
  }
  chartsContainer.appendChild(moreButton);

  // Initial render of all 3 charts
  renderDivChart();
  renderSVGChart();
  renderCanvasChart();
})();