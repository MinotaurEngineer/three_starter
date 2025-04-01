import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { camera, canvas } from './global'

const controls = new OrbitControls(camera, canvas)

/*
controls.addEventListener('change', (event)=>{
  const { x, y, z } = controls.object.position
  console.log(
    Math.floor(x),
    Math.floor(y),
    Math.floor(z)
  )
})
*/