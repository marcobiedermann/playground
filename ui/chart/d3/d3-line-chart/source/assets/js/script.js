import LineChart    from './d3-line-chart';
import generateData from './generate-data';

const lineChart = new LineChart('.js-line-chart');

lineChart.render(generateData(12));

document.querySelector('.js-line-chart-update').addEventListener('click', () => lineChart.update(generateData(12)));
