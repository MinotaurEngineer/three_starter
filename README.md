# Three Starter

A lightweight Three.js starter project for creating interactive 3D scenes with post-processing effects and GitHub Pages hosting.

This project sets up a basic Three.js environment with a scene, lighting, a display case, and an interactive 3D model (`rotor.obj`). It includes post-processing effects like chromatic aberration, tone mapping, and FXAA, all rendered using the `postprocessing` library. The scene is interactive—clicking the rotor triggers an animation.

Live demo: [THREE_STARTER](https://minotaurengineer.github.io/three_starter/)

## Features
- **Three.js Scene**: Configured with a camera, renderer, and scene volume (500x300x300).
- **Lighting**: Spotlights, hemisphere light, and rectangular area light with shadows.
- **Post-Processing**: Chromatic aberration, tone mapping (AGX mode), and FXAA anti-aliasing.
- **Interactivity**: Raycasting for click detection, animating the rotor model using GSAP.
- **Loaders**: Supports OBJ models, textures, fonts, HDR, and GLTF files.
- **Responsive**: Adapts to window resizing with debounced event handling.
- **Assets**: Includes a sample `rotor.obj` model in the `models/` folder.