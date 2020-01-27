# main.js

```js

let THREE = await import('/lib/threejs-r112/build/three.module.js')
env.run = async (api) => {
  var renderer = new THREE.WebGLRenderer({
    // antialias: true,
    // alpha: true
  });

  api.resize(() => {
    let dpi = window.devicePixelRatio || 2.0;
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(dpi);
  });

  api.mounter.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.z = 18;

  let core = {
    ...api,
    scene,
    camera,
    renderer
  }

  var geometry = new THREE.BoxBufferGeometry(8, 8, 8, 5, 5, 5);
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  api.loop(() => {
    cube.rotation.x += 0.01;
  	cube.rotation.y += 0.01;
  });

  api.loop(() => {
  	core.renderer.render(scene, camera);
  });

};

```