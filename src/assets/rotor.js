import { degToRad } from 'three/src/math/MathUtils.js'
import { objLoader, SCENE, state } from '../shell/global'
import { defaultMaterial } from './materials'
import gsap from 'gsap'

objLoader.load('./models/rotor.obj', model => {
  model = model.children[0]
  model.material = defaultMaterial

  model.name = 'OBJ_ROTOR'

  model.position.y = 10
  model.scale.set(0.08, 0.08, 0.08)
  model.rotation.set(degToRad(-15), degToRad(15), 0)

  model.castShadow = true
  model.receiveShadow = true

  SCENE.add(model)

  state.addEventListener('intersects:update', ({data}) => {
    if(data.some(({object:{name}})=>name === 'OBJ_ROTOR')){
      gsap.fromTo(
        model.rotation, {
          y: degToRad(15),
          z: 0
        },
        {
          duration: 1,
          y: degToRad(375),
          z: degToRad(360)
        }
      )
    }
  })
})
