import BarChart from './d3-bar-chart';
import generateData from './generate-data';

const barChart = new BarChart('.js-bar-chart', {}, generateData(24));

barChart.render();

document.querySelector('.js-bar-chart-update').addEventListener('click', () => barChart.update(generateData(24)));
