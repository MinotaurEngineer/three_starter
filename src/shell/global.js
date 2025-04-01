import {
  Raycaster,
  Vector2,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  LoadingManager,
  TextureLoader,
  HalfFloatType,
  Group,
  Vector3,
  EventDispatcher,
  PCFSoftShadowMap
} from 'three'

import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { FontLoader, GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js'

import { EffectComposer } from 'postprocessing'

/* [GLOBALS] ---------------------------------------------------------------- */

export const SCENE_VOLUME = new Vector3(500, 300, 300)

export const canvas = document.getElementById('canvas')

export const portal = document.getElementById('portal')

export const raycaster = new Raycaster()

export const pointer = new Vector2(0, 0)

export const renderer = new WebGLRenderer({
  canvas,
  antialias: false,
  stencil: false,
  depth: false
})

// renderer config
// intensity in candela
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap

export const scene = new Scene()

export const camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
)

export const composer = new EffectComposer(renderer, {
  frameBufferType: HalfFloatType
})

export const state = new EventDispatcher()

/* [GROUPS] ----------------------------------------------------------------- */
export const SCENE = new Group()
export const LIGHTS = new Group()

scene.add(SCENE, LIGHTS)

/* [LOADERS] ---------------------------------------------------------------- */

export const loadingManager = new LoadingManager()

export const fontLoader = new FontLoader(loadingManager)
export const objLoader = new OBJLoader(loadingManager)
export const hdrLoader = new RGBELoader(loadingManager)
export const texLoader = new TextureLoader(loadingManager)
export const gltfLoader = new GLTFLoader(loadingManager)

/* [UTILS] ------------------------------------------------------------------ */
export function debounce(f, w) {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => f.apply(context, args), w)
  }
}

/* -------------------------------------------------------- [EVENT LISTENERS] */

/* [INTERACTIONS] ----------------------------------------------------------- */

/* [WINDOW] ----------------------------------------------------------------- */
window.addEventListener(
  'load',
  () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)

    renderer.setAnimationLoop(() => {
      // renderer.render(scene, camera)
      composer.render()
    })

    portal.dataset.hasWindow = true
  },
  { passive: true, once: true }
)

window.addEventListener(
  'resize',
  debounce(() => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  }, 100),
  { passive: true }
)

window.addEventListener(
  'click',
  ({ clientX, clientY }) => {
    pointer.x = (clientX / window.innerWidth) * 2 - 1
    pointer.y = ((clientY / window.innerHeight) * 2 - 1) * -1

    raycaster.setFromCamera(pointer, camera)

    state.dispatchEvent({
      type: 'intersects:update',
      data: raycaster.intersectObjects(scene.children)
    })
  },
  { passive: true }
)

/* [LOADER] ----------------------------------------------------------------- */
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
  portal.dataset.hasAssets = false
}

loadingManager.onLoad = function () {
  portal.dataset.hasAssets = true
}

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(
    'Loading file: ' +
      url +
      '.\nLoaded ' +
      itemsLoaded +
      ' of ' +
      itemsTotal +
      ' files.'
  )
}

loadingManager.onError = function (url) {
  console.log('There was an error loading ' + url)
  portal.dataset.hasAssets = false
  portal.dataset.hasError = true
}
