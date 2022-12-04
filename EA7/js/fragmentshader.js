//START EA7
const FRAGMENTSHADER = `
    precision highp float;

    float distant  = 0.4;
    float close = 0.001;
    varying vec4 vColor;

    float LinearizeDepth(float depth)
    {
        float z = depth * 2.0 - 1.0;
        return (2.0 * close * distant) / (distant + close - z * (distant - close));
    }

    void main() {
        float depth = LinearizeDepth(gl_FragCoord.z) / distant;

        gl_FragColor = vec4(vec3(depth), 1.0);
    }
`;
//END EA7
