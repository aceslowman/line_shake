import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";

import Polyline from "./sceneSubjects/Polyline";

let template, debug, capturer, controls, lines;

const setup = () => {
  template = new asStandardTemplate({
    camera: {
      zoom: 1,
      ortho: false,
      orbitControls: true
    }
  });

  lines = new Polyline(template.scene,template.eventBus,template.gui);
  lines.setPoints([
    new THREE.Vector3(-1,0,0),
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(1,0,0)
  ]);

  template.addSubject(lines);

  debug = new asDebug(template, {
    stats: true,
    grid: false
  });

  capturer = new asCapture(template, {
    verbose: false,
    display: true,
    framerate: 100,
    format: 'png',
    workersPath: 'js/utils/'
  });
}

const render = () => {
  requestAnimationFrame(render);

  debug.stats.begin();
  template.update();
  debug.stats.end();

  capturer.capture( template.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    template.onWindowResize.bind(template),
    false
  );
}

setup();
bindEventListeners();
render();
