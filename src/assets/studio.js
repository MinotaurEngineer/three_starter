import { BoxGeometry, HemisphereLight, Mesh, PlaneGeometry, RectAreaLight, SpotLight, SpotLightHelper } from 'three'
import { SCENE, SCENE_VOLUME, LIGHTS } from '../shell/global'

import { blackMarble, darkMaterial } from './materials'
import { degToRad } from 'three/src/math/MathUtils.js'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'

const { x, y, z } = SCENE_VOLUME

/* [BACKDROP] --------------------------------------------------------------- */

const backdrop = new Mesh(new PlaneGeometry(x, y), blackMarble)

backdrop.position.z = z * -0.5

/* [FLOOR] ------------------------------------------------------------------ */

const floor = new Mesh(new PlaneGeometry(x, z), darkMaterial)

floor.rotation.x = degToRad(-90)
floor.position.y = y * -0.5

/* [DISPLAYCASE] ------------------------------------------------------------ */
const displayCase = new Mesh(new BoxGeometry(30, y * 0.5, 30), darkMaterial)
displayCase.position.y = y * -0.25 - 10

displayCase.receiveShadow = true

SCENE.add(backdrop, floor, displayCase)


/* [LIGHTS] ----------------------------------------------------------------- */

/* [SPOT - FRONT] ---------------------------------------------------------- */
const spotN = new SpotLight(0xffffff, 1, y * 2, degToRad(7.5), 1, 0)
spotN.castShadow = true

spotN.position.set(0, y * 0.66, z * .66)

const spotNHelper = new SpotLightHelper(spotN)

//LIGHTS.add(spotNHelper)

LIGHTS.add(spotN)

/* [SPOT - BACK] ---------------------------------------------------------- */
const spotS = new SpotLight(0xffffff, 1, y * 2, degToRad(7.5), 1, 0)
spotS.castShadow = true

spotS.position.set(0, y * 0.66, z * -.66)

const spotSHelper = new SpotLightHelper(spotS)

//LIGHTS.add(spotSHelper)

LIGHTS.add(spotS)

/* [HEMI] ------------------------------------------------------------------ */
const hemi = new HemisphereLight(0xffefef, 0x001122, 1)
hemi.position.set(0, y, 0)

LIGHTS.add(hemi)

/* [FILL] ------------------------------------------------------------------- */
const fill = new RectAreaLight(0xefefff, 1, x * 0.15, x*0.15)

fill.position.set(0, y * 0.5, 0)
fill.lookAt(0, 0, 0)

LIGHTS.add(fill)

const fillHelper = new RectAreaLightHelper(fill)
LIGHTS.add(fillHelper)
