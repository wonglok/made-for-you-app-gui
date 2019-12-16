import { AudioListener, Audio, AudioAnalyser, DataTexture, LuminanceFormat } from 'three'
/* eslint-disable */
export const setup = () => {
  var api = {}
  var fftSize = 1024 // up to 2048 with pow2
  var listener = new AudioListener()

  var analyser, texture = null, sound

  navigator.mediaDevices.getUserMedia( { audio: true, video: false } ).then((stream) => {
    sound = new Audio(listener)
    var context = listener.context;
    listener.setMasterVolume(0.);
    var source = context.createMediaStreamSource( stream );
    sound.setNodeSource( source );

    analyser = new AudioAnalyser(sound, fftSize)
    console.log(analyser.data)
    texture = new DataTexture(analyser.data, fftSize / 2.0, 1.0, LuminanceFormat)
  });

  api.pause = () => {
    sound.pause()
  }

  api.update = () => {
    if (analyser) {
      analyser.getFrequencyData()
      // analyser.getAverageFrequency()
    }
    if (texture) {
      texture.needsUpdate = true
    }

    return {
      data: analyser.data,
      texture
    }
  }
  return api
}

/*
var listener = new THREE.AudioListener();
camera.add( listener );

navigator.mediaDevices.getUserMedia( { sound: true, video: false } ).then( handleSuccess );

function handleSuccess( stream ) {

    var sound = new THREE.Audio( listener );
}
*/