import d3 from "d3";
window.d3 = d3;

const functionPlot = require("function-plot");

const root = document.querySelector("#root");

const easeOutSpring = (t, b, c, d) => {
  const SP_zeta = 0.93;
  const SP_omega0 = 6.74;
  const SP_omegaD = 17.391;
  const SP_A = 0.54;
  const SP_B = -0.27;
  const SP_scale = -0.013513;
  const SP_cutoffY = 0.20236;
  const SP_cutoffX = 0.91216;
  const SP_scaleY = 0.26756;
  const x = t / d;
  const Q = 1 - Math.cos((x * Math.PI) / 2);
  const W = (x - SP_cutoffX) / SP_cutoffX;
  const Z =
    Math.exp(-SP_zeta * SP_omega0 * W) *
    (SP_A * Math.cos(SP_omegaD * W) + SP_B * Math.sin(SP_omegaD * W));
  const xx = Q < SP_cutoffY ? Q / SP_scaleY : 1 - Z * SP_scale;
  return t <= 0 ? b : t >= 1 ? c : xx * c + b;
};

const easeInExpoBias = (t, b, c, d) => {
  const bias = 0.3;
  return t <= 0
    ? b
    : t >= 1
    ? c
    : c * Math.pow(2, 10 * (bias + ((1 - bias) * t) / d - 1)) + b - c * 0.001;
};

const easeOutSingleBounce = (t, b, c, d) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  const val = b + c * (-3.7475 * tc * ts + 2.0475 * ts * ts + 2.7 * tc);
  return t <= 0 ? b : t >= 1 ? c : val > 1 ? 2 - val : val;
};

const easeOutTinyBack = (t, b, c, d) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  const val = b + c * (-3.1975 * tc * ts + 3.0975 * ts * ts + 1.1 * tc);
  return t <= 0 ? b : t >= 1 ? c : val;
};

functionPlot({
  target: root,
  xAxis: { domain: [-0.1, 1.1] },
  yAxis: { domain: [-0.2, 1.2] },
  data: [
    {
      graphType: "polyline",
      fn: scope => easeOutSpring(scope.x, 0, 1, 1)
    },
    {
      graphType: "polyline",
      fn: scope => easeInExpoBias(scope.x, 0, 1, 1)
    },
    {
      graphType: "polyline",
      fn: scope => easeOutSingleBounce(scope.x, 0, 1, 1)
    },
    {
      graphType: "polyline",
      fn: scope => easeOutTinyBack(scope.x, 0, 1, 1)
    }
  ]
});
