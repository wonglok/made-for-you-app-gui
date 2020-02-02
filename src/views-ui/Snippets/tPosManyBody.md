Many body gpgpu flow field

```js

#include <common>

varying vec3 v_tt;

void main() {
  gl_FragColor = vec4(
    0.25 + abs(v_tt.x),
    0.25 + abs(v_tt.y),
    0.25 + abs(v_tt.z),
    0.2
  );
}
```


```js

#include <common>
uniform highp sampler2D tPosition;

varying vec3 v_tt;

void main (void) {
  vec4 tt = texture2D(tPosition, position.xy);

  tt = tt * 2.0 - 1.0;

  v_tt = normalize(tt.xyz);

  tt.xyz *= 4.0;

  vec4 mvPosition = modelViewMatrix * tt;
  vec4 outputPos = projectionMatrix * mvPosition;

  gl_Position = outputPos;
  gl_PointSize = 1.0;
}

```

```js

let THREE = {
  ...await import('/lib/threejs-r112/build/three.module.js'),
  ...await import('/lib/threejs-r112/examples/jsm/misc/GPUComputationRenderer.js')
}

env.run = async (api) => {
  var WIDTH = 512
  var renderer = api.renderer;
  var gpuCompute = new THREE.GPUComputationRenderer(WIDTH, WIDTH, renderer)
  //---------

  let makeVectorField = () => {
    // pos IDX
    var vectorField = gpuCompute.createTexture()
    var slot = vectorField.image.data
    var p = 0
    var oneThirdDimension = Math.pow(WIDTH * WIDTH, 1 / 3.0);

    for (var k = 0; k < oneThirdDimension; k++) {
      for (var j = 0; j < oneThirdDimension; j++) {
        for (var i = 0; i < oneThirdDimension; i++) {
          let id = p / 4
          slot[p + 0] = i / oneThirdDimension
          slot[p + 1] = j / oneThirdDimension
          slot[p + 2] = k / oneThirdDimension
          slot[p + 3] = 1
          p += 4
        }
      }
    }

    return vectorField
  }


  let makePositionTexture = () => {
    // pos IDX
    var positionData = gpuCompute.createTexture()
    var slot = positionData.image.data
    var p = 0
    var oneThirdDimension = Math.pow(WIDTH * WIDTH, 1 / 3.0);

    for (var k = 0; k < oneThirdDimension; k++) {
      for (var j = 0; j < oneThirdDimension; j++) {
        for (var i = 0; i < oneThirdDimension; i++) {
          let id = p / 4
          slot[p + 0] = i / oneThirdDimension
          slot[p + 1] = j / oneThirdDimension
          slot[p + 2] = k / oneThirdDimension
          slot[p + 3] = 1
          p += 4
        }
      }
    }

    return positionData
  }

  let vectorFieldTexture = makeVectorField();
  let positionTexture = makePositionTexture();
  let positionOriginalTexture = makePositionTexture();

  let tPositionCode = env.getCode('tPosition').text;
  var positionVariable = gpuCompute.addVariable('tPosition', tPositionCode, positionTexture)
  positionVariable.material.uniforms.tOriginalPosition = { value: positionOriginalTexture };
  positionVariable.material.uniforms.tVector = { value: vectorFieldTexture }
  positionVariable.material.uniforms.time = { value: 0 }

  gpuCompute.setVariableDependencies(positionVariable, [positionVariable])

  var error = gpuCompute.init()
  if (error !== null) {
    console.error(error)
  }

  //------

  let getUVInfoForDisplayPosition = () => {
    let newArr = []
    var na = 0
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < WIDTH; i++) {
        newArr[na + 0] = i / WIDTH
        newArr[na + 1] = j / WIDTH
        newArr[na + 2] = 0
        na += 3
      }
    }
    return newArr
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(getUVInfoForDisplayPosition(), 3));

  var uniforms = {
    time: { value: 0 },
    tPosition: { value: null }
  }
  let displayVert = env.getCode('displayV').text
  let displayFrag = env.getCode('displayF').text
  var material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms,
    defines: {
      resolution: `vec2(${renderer.domElement.width.toFixed(1)}, ${renderer.domElement.height.toFixed(1)})`
    },
    vertexShader: displayVert,
    fragmentShader: displayFrag,
    side: THREE.DoubleSide
  })

  var mesh = new THREE.Points(geo, material)
  api.scene.add(mesh)

  api.loop(() => {
    let time = window.performance.now() * 0.001
    // stateVar.material.uniforms.time.value = time
    positionVariable.material.uniforms.time.value = time
    // velVar.material.uniforms.time.value = time

    uniforms.tPosition.value = gpuCompute.getCurrentRenderTarget(positionVariable).texture
    uniforms.time.value = time
    gpuCompute.compute();
  })

  //------

  let mouse = new THREE.Vector3();
  let on = {
    onTouchStart (ev) {
      ev.preventDefault()
    },
    onTouchMove (ev) {
      ev.preventDefault()
      const touch = ev.targetTouches[0]
      mouse.x = ((touch.clientX / window.innerWidth) - 0.5) * 2
      mouse.y = ((1 - touch.clientY / window.innerHeight) - 0.5) * 2
    },
    onMouseMove (ev) {
      mouse.x = ((ev.clientX / window.innerWidth) - 0.5) * 2
      mouse.y = ((1 - ev.clientY / window.innerHeight) - 0.5) * 2
    }
  }

  api.renderer.domElement.addEventListener('mousemove', on.onMouseMove, { passive: false })
  api.renderer.domElement.addEventListener('touchstart', on.onTouchStart, { passive: false })
  api.renderer.domElement.addEventListener('touchmove', on.onTouchMove, { passive: false })
};





```

```javascript

#include <common>
precision highp float;
precision highp sampler2D;

uniform float time;
uniform sampler2D tOriginalPosition;
uniform sampler2D tVector;

vec2 getUV (vec3 newPos) {
  float d2 = resolution.x;
  float d3 = ceil(pow(resolution.x * resolution.y, 1.0 / 3.0));

  float xID = newPos.x * d3;
  float yID = newPos.y * d3;
  float zID = newPos.z * d3;

  float iii = xID
            + yID * d3
            + zID * d3 * d3;

  float U = mod(iii, d2) / d2;
  float V = floor(iii / d2) / d2;

  return vec2(U, V);
}

void main (void) {
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 newCell = gl_FragCoord.xy;
  vec2 uv = newCell * cellSize;

  vec4 currentPosition = texture2D(tPosition, uv);
  vec4 origPos = texture2D(tOriginalPosition, uv);

  vec4 newPos = currentPosition.xyzw;

  for (float zz = -3.0; zz < 3.0; zz++) {
    for (float yy = -3.0; yy < 3.0; yy++) {
      for (float xx = -3.0; xx < 3.0; xx++) {
        vec3 offset = vec3(xx, yy, zz);
        vec2 uv1 = getUV(currentPosition.xyz + offset);
        vec4 speed = texture2D(tVector, uv1);
        vec4 vecPos = texture2D(tOriginalPosition, uv1);
        newPos.xyz += speed.xyz * (1.0 / pow(12.0, 3.0) / 60.0) * length(currentPosition.xyz - vecPos.xyz);
      }
    }
  }

  float maxUnit = 1.0;
  bool reset = false;
  if (newPos.x > maxUnit) {
    reset = true;
  }
  if (newPos.y > maxUnit) {
    reset = true;
  }
  if (newPos.z > maxUnit) {
    reset = true;
  }
  if (newPos.x < -maxUnit) {
    reset = true;
  }
  if (newPos.y < -maxUnit) {
    reset = true;
  }
  if (newPos.z < -maxUnit) {
    reset = true;
  }

  if (reset) {
    newPos.xyzw = vec4(origPos.xyz, 1.0);
  }

  gl_FragColor = vec4(newPos.xyz, 1.0);
}