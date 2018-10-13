import React from 'react'
import glslCanvas from 'glslCanvas'
import PropTypes from 'prop-types'

// Takes a shader function as an input and renders it using glslCanvas
// The shader function gets passed the component props and should return a valid string to be processed by glslCanvas
export const createShaderCanvas = (shader) => {
  class ShaderCanvas extends React.Component {
    // glsl sandbox
    sandbox = null

    componentDidMount() {
      // 'id' is required
      const canvas = document.getElementById(this.props.id)

      this.sandbox = new glslCanvas(canvas)
      this.sandbox.load(shader(this.props))
    }

    componentDidUpdate() {
      // Refresh the shader
      this.sandbox.load(shader(this.props))
    }

    render() {
      const { id, width, height } = this.props

      return <canvas id={id} width={width} height={height} />
    }
  }

  ShaderCanvas.defaultProps = {
    width: 300,
    height: 300,
    id: 'sample-shader'
  }

  ShaderCanvas.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }

  return Canvas
}
