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

  await Promise.all([
    env.getCode('item-box').run(core)
  ]);

  api.loop(() => {
  	core.renderer.render(scene, camera);
  });

};
```

# item-box.js

```js
let THREE = await import('/lib/threejs-r112/build/three.module.js')
env.run = async (api) => {
  var geometry = new THREE.BoxBufferGeometry(8, 8, 8, 8, 8, 8);
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  var item = new THREE.Line(geometry, material);

  let uniforms = {
    time: { value: 0 }
  }
  let setupMaterial = () => {
    let vertexShader = env.getCode('basic-v').text
    let fragmentShader = env.getCode('basic-f').text
    let material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader
    });

    material.needsUpdate = true
    item.material = material
  }

  env.getCode('basic-v').stream(setupMaterial)
  env.getCode('basic-f').stream(setupMaterial)

  api.scene.add(item);

  api.loop(() => {
    uniforms.time.value = window.performance.now() * 0.001
    item.rotation.x += 0.01;
  	item.rotation.y += 0.01;
  });
};
```

# basic-v.glsl

```js
uniform float time;
void main (void) {
  vec3 nPos = position;
  nPos = nPos;
  vec3 fun = vec3(
    sin(time * 10.0 + 1.0 * position.x),
    cos(time * 10.0 + 1.0 * position.y),
    sin(time * 10.0 + 1.0 * position.z)
  );
  nPos += normal * fun;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(nPos.xyz, 1.0);
  gl_PointSize = 2.0;
}
```

# basic-f.glsl

```js
uniform float time;
void main (void) {
  vec3 fun = vec3(
    sin(time),
    cos(time),
    sin(time)
  );
  fun = abs(fun);
  gl_FragColor = vec4(fun, 1.0);
}
```
