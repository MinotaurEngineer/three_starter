import {
  RenderPass,
  CopyPass,
  ChromaticAberrationEffect,
  EffectPass,
  ToneMappingEffect,
  FXAAEffect,
  ToneMappingMode,
  SSAOEffect
} from 'postprocessing'

import { scene, camera, composer } from './global'

const input = new RenderPass(scene, camera)
composer.addPass(input)

const ca = new EffectPass(camera, new ChromaticAberrationEffect())
composer.addPass(ca)

const tone = new EffectPass(camera, new ToneMappingEffect({ mode: ToneMappingMode.AGX }))
composer.addPass(tone)

const fxaa = new FXAAEffect()
fxaa.samples = 8

const aa = new EffectPass(camera, fxaa)
composer.addPass(aa)


const copy = new CopyPass()
composer.addPass(copy)

/*
const tone = new EffectPass(camera, new ToneMappingEffect())
composer.addPass(tone)

const ssao = new EffectPass(camera, new SSAOEffect(camera))
composer.addPass(ssao)

const aa = new EffectPass(camera, new FXAAEffect())
composer.addPass(aa)

const copy = new CopyPass()
composer.addPass(copy)
*/