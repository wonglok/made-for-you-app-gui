# ThreeJS Text

```js
let THREE = await import('/lib/threejs-r112/build/three.module.js')

const makeFontGeo = ({ text, width }) => {
  return new Promise(async (resolve) => {
    var font = JSON.parse(env.getCode('lovelo').text)
    var geometry = new THREE.TextGeometry(text, {
      font: new THREE.Font(font),
      size: width,
      height: 0.1,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.11,
      bevelOffset: 0.001,
      bevelSegments: 3
    })
    resolve(geometry)
  })
}

const visibleHeightAtZDepth = (depth, camera) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z
  if (depth < cameraOffset) depth -= cameraOffset
  else depth += cameraOffset

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth)
}

const visibleWidthAtZDepth = (depth, camera) => {
  const height = visibleHeightAtZDepth(depth, camera)
  return height * camera.aspect
}

const makeText = async (api, text, envMap = undefined) => {
  let camera = api.camera

  let mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 1.0,
    envMap,
    transparent: true
  })
  // env.getSetting('text-color').stream((v) => {
  //   mat.color = new THREE.Color(v)
  // }, 'hex')

  mat.needsUpdate = true

  let item = new THREE.Mesh();
  item.material = mat;

  let prep = async () => {
    let width = visibleWidthAtZDepth(camera.position.z, camera)
    let height = visibleHeightAtZDepth(camera.position.z, camera)
    let min = Math.min(width, height)

    let fontGeo = await makeFontGeo({ text, width: min / text.length * 0.5 })
    item.geometry = fontGeo
    fontGeo.computeBoundingSphere()
    fontGeo.computeBoundingBox()
    item.position.x = -fontGeo.boundingSphere.radius
  }
  api.resize(prep)
  prep()

  return item
}

env.run = async (api) => {
  let camera = api.camera
  let width = visibleWidthAtZDepth(camera.position.z, camera)
  let height = visibleHeightAtZDepth(camera.position.z, camera)
  let canvsTex = env.getCode('canvas-texture')
  let canvasCube = await canvsTex.run(api, { color: 'tower-color' })

  api.scene.background = canvasCube

  let line1 = await makeText(api, `Happy Happy`, canvasCube)
  line1.position.y = height * 0.01 + 1.3
  api.scene.add(line1)

  let line2 = await makeText(api, `Chinese New Year`, canvasCube)
  line2.position.y = height * -0.013 - 1.3
  api.scene.add(line2)

  let light1 = new THREE.PointLight(0xffffff, 1.0, 1000)
  light1.position.set(0, line1.position.y * 0.5, 500);
  api.scene.add(light1)

  let light2 = new THREE.PointLight(0xffffff, 1.0, 1000)
  light2.position.set(0, line2.position.y * 0.5, 500);
  api.scene.add(light2)
}

```