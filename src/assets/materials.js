import { LinearSRGBColorSpace, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, WireframeGeometry } from 'three'
import { texLoader } from '../shell/global'

export const darkMaterial = new MeshStandardMaterial({
  color: 0x282828
})

export const defaultMaterial = new MeshStandardMaterial()

defaultMaterial.dithering = true
darkMaterial.dithering = true

export const blackMarble = new MeshStandardMaterial({color: 0x282828})


texLoader.load('./textures/marble_0007_color_1k.jpg', image => {
  image.repeat.set(4,4)
  image.wrapS = RepeatWrapping
  image.wrapT = RepeatWrapping
  image.colorSpace = LinearSRGBColorSpace
  blackMarble.map = image
})


texLoader.load('./textures/marble_0007_roughness_1k.jpg', image => {
  image.repeat.set(4,4)
  image.wrapS = RepeatWrapping
  image.wrapT = RepeatWrapping
  blackMarble.roughnessMap = image
})

