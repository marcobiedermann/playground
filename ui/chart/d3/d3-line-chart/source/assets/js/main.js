import D3LineChart from './d3-line-chart';
import generateData from './generate-data';

const lineChart = new D3LineChart('.js-d3-line-chart');

lineChart.render(generateData(12));

document.querySelector('.js-d3-line-chart-update').addEventListener('click', () => lineChart.update(generateData(12)));
