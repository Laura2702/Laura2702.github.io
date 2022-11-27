//START EA6
const FRAGMENT_SHADER_SOURCE = `
  precision highp float;

  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;
//END EA6
