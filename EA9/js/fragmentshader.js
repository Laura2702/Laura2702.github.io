//START EA9
const FRAGMENTSHADER = `
    precision highp float;

    uniform sampler2D uTexture;

    varying vec4 vColor;
    varying vec2 vTextureCoord;

    void main() {
        gl_FragColor = texture2D(uTexture, vTextureCoord); //* vColor;
    }
`;
//END EA9
