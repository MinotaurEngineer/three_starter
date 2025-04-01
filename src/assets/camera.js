import { camera, SCENE_VOLUME } from '../shell/global'

const { x,y,z } = SCENE_VOLUME

camera.position.set(0,10,150)
camera.lookAt(0, 0, 0)