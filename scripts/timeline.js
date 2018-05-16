(function main() {

  const BAR_HEIGHT = 30;
  const BAR_MARGIN = 2;
  const CHART_WIDTH = 800;
  const BAR_MIN = 20;
  const BAR_RANGE = 200;

  function generateColor() {
    const num = Math.random();
    if (num <= 0.2) {
      return '#efc94c';
    } else if (num <= 0.4) {
      return '#45b29d';
    } else if (num <= 0.6) {
      return '#e27a3f';
    } else if (num <= 0.8) {
      return '#334d5c';
    } else {
      return '#fff';
    }
  }

  function generateRow(rowNum) {
    const row = document.createElement('div');
    row.style = `position: absolute; top: ${rowNum * (BAR_MARGIN + BAR_HEIGHT)}px;`;
    for (let x = 0; x < CHART_WIDTH; x++) {
      let width = BAR_MIN + BAR_RANGE * Math.random();
      if (x + width > CHART_WIDTH) {
        width = CHART_WIDTH - x;
      }
      const bar = document.createElement('div');
      let style = `width: ${width}; height: ${BAR_HEIGHT};`
      style += `position: absolute;`;
      style += `left: ${x}px; background-color: ${generateColor()};`;
      bar.style = style;
      x += width;
      row.appendChild(bar);
    }
    return row;
  }

  const timelineContainer = document.getElementById("timeline-container");
  for (let row = 0; row < 10; row++) {
    const rowEl = generateRow(row);
    timelineContainer.appendChild(rowEl);
  }

})();