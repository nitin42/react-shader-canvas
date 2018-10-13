# react-shader-canvas

> A small utility to render shaders using React

[![NPM](https://img.shields.io/npm/v/react-shader-canvas.svg)](https://www.npmjs.com/package/react-shader-canvas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-shader-canvas
```

## Usage

```jsx
import React, { Component } from 'react'

import { createShaderCanvas } from 'react-shader-canvas';

const shader = (props) => `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  
  float expStep( float x, float k, float n ){
    return exp( -k*pow(x,n) );
  }
  
  void main() {
    vec2 point = gl_FragCoord.xy / u_resolution.xy;
    float px = 1.0 / u_resolution.y;
    vec2 cp = vec2(cos(u_time),sin(u_time)) * 0.618 + 0.620;
  
    float l = expStep(point.x, ${props.timeSync ? 'cp.x * u_time' : 'cp.x'}, ${props.timeSync ? 'cp.y * u_time' : 'cp.y'});
    
    vec3 color = vec3(smoothstep(l, l+px, point.y), sin(u_time), cos(cp.y) * 0.5);
      
    gl_FragColor = vec4(color, 1.0);
  }
`

const ShaderComponent = createShaderCanvas(shader)

class App extends Component {
  state = {
    timeSync: false
  }

  updateState = (e) => this.setState(state => ({ timeSync: !state.timeSync }))

  render () {
    return (
      <div onClick={this.updateState}>
        <ShaderComponent id="exponential-step-curve" timeSync={this.state.timeSync} />
      </div>
    )
  }
}
```

## Related

* [shaping-functions](https://github.com/nitin42/shaping-functions) uses `react-shader-canvas` to render the shaping functions and curves.

## API

### `createShaderCanvas`

`(shader: (props) => string) => ReactComponent`

A function that takes a shader as an input and returns a React component which renders the shader on the canvas. The shader function gets passed the component props.

#### Component props

* `id` (Required) - `id` of the canvas element. This is required to render the canvas

* `height` (Optional) - height of the canvas.

* `width` (Optional) - width of the canvas.

* `style` (Optional) - canvas style.

## License

MIT © [nitin42](https://github.com/nitin42)
