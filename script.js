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

  function renderChart(title) {
    const chartsContainer = document.getElementById("charts-container");
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

  function renderDivChart() {
    const chart = renderChart('div');
    renderDivBars(chart);
  }

  function renderSVGChart() {
    const chart = renderChart('svg');
    renderSVGBars(chart);
  }

  function renderCanvasChart() {
    const chart = renderChart('canvas');
    renderCanvasBars(chart);
  }

  renderDivChart();
  renderSVGChart();
  renderCanvasChart();
})();