import BarnsleyFern from './barnsley-fern';

// https://en.wikipedia.org/wiki/Barnsley_fern
const rules = [
  {
    a: 0.85,
    b: 0.04,
    c: -0.04,
    d: 0.85,
    tx: 0,
    ty: 1.6,
    weight: 0.65,
  },
  {
    a: -0.15,
    b: 0.28,
    c: 0.26,
    d: 0.24,
    tx: 0,
    ty: 0.44,
    weight: 0.07,
  },
  {
    a: 0.2,
    b: -0.26,
    c: 0.23,
    d: 0.22,
    tx: 0,
    ty: 1.6,
    weight: 0.07,
  },
  {
    a: 0,
    b: 0,
    c: 0,
    d: 0.16,
    tx: 0,
    ty: 0,
    weight: 0.21,
  },
];

new BarnsleyFern('.canvas', {
  rules,
});
