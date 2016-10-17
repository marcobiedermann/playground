import BarChart     from './d3-bar-chart';
import generateData from './generate-data';

const barChart = new BarChart('.js-bar-chart');

barChart.render(generateData(24));

document.querySelector('.js-bar-chart-update').addEventListener('click', () => barChart.update(generateData(24)));
