

/**
 * @name awful random
 */

import LPF from 'opendsp/Korg35LPF';

var lpf = LPF();
var lpfb = LPF();

export function dsp(t){
  var bass = noise('bass', t, 1);
  var treb = noise('treb', t, 0.5);

  lpf
    .cut(100)
    .res(2.3)
    .sat(1.1);

  lpfb
    .cut(500)
    .res(8)
    .sat(5);

  bass = lpf.run(bass) * 100;
  treb = lpfb.run(treb);
  
  var out = bass + treb;

  return out;
}

var noises = {};

function noise(name, t, freq) {
  noises[name] = noises[name] || {noise: 0, lastUpdate: 0};
  if (t - noises[name].lastUpdate > freq) {
    noises[name].lastUpdate = t;  
    noises[name].noise = (Math.random() * 2) - 1;
  }
  return noises[name].noise;
}
