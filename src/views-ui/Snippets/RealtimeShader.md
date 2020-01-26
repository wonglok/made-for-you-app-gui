# main.js

```js
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

```

# item-msall-box.js

```js
let THREE = await import('/lib/threejs-r112/build/three.module.js')
env.run = async (api) => {
  var geometry = new THREE.BoxBufferGeometry(8, 8, 8, 5, 5, 5);
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  var cube = new THREE.Mesh(geometry, material);
  api.scene.add(cube);

  api.loop(() => {
    cube.rotation.x += 0.01;
  	cube.rotation.y += 0.01;
  });
};
```

# basic-v.glsl

```js
uniform float time;
void main (void) {
  vec3 nPos = position;
  nPos = nPos * shape / 100.0;
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
