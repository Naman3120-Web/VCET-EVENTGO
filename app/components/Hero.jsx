"use client";

import React, { useRef, useEffect } from "react";
import styles from "./Hero.module.css";
import Button from "./Button"; // Import the new Button component

// This hook contains the full, original WebGL logic for the animated background.
const useShaderBackground = (canvasRef) => {
  const animationFrameRef = useRef();
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    class WebGLRenderer {
      constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2", { antialias: true });
        if (!this.gl) {
          console.error("WebGL2 not supported");
          return;
        }
        this.program = null;
        this.shaderSource = defaultShaderSource;
        this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
        this.time = 0;
      }

      compile(shader, source) {
        const gl = this.gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(
            "Shader compilation error:",
            gl.getShaderInfoLog(shader)
          );
        }
      }

      setup() {
        const gl = this.gl;
        const vs = gl.createShader(gl.VERTEX_SHADER);
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        this.compile(vs, `#version 300 es
          precision highp float;
          in vec4 position;
          void main() { gl_Position = position; }`);
        this.compile(fs, this.shaderSource);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(this.program));
        }
      }

      init() {
        const gl = this.gl;
        const program = this.program;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(this.vertices),
          gl.STATIC_DRAW
        );
        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        program.resolution = gl.getUniformLocation(program, "resolution");
        program.time = gl.getUniformLocation(program, "time");
      }

      render(now = 0) {
        const gl = this.gl;
        const program = this.program;
        if (!program) return;
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height);
        gl.uniform1f(program.time, now * 1e-3);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    rendererRef.current = new WebGLRenderer(canvas);
    rendererRef.current.setup();
    rendererRef.current.init();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (rendererRef.current && rendererRef.current.gl) {
        rendererRef.current.gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    
    const loop = (now) => {
      if (rendererRef.current) {
        rendererRef.current.render(now);
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    resize();
    loop(0);
    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasRef]);
};

// Shader source code
const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;

#define FC gl_FragCoord.xy
#define T time
#define R resolution

float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  float a = rnd(i), b = rnd(i + vec2(1, 0)), c = rnd(i + vec2(0, 1)), d = rnd(i + 1.);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float t = .0, a = 1.;
  mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2. * m;
    a *= .5;
  }
  return t;
}

float clouds(vec2 p) {
	float d = 1., t = .0;
	for (float i = .0; i < 3.; i++) {
		float a = d * fbm(i * 10. + p.x * .2 + .2 * (1. + i) * p.y + d + i * i + p);
		t = mix(t, d, a);
		d = a;
		p *= 2. / (i + 1.);
	}
	return t;
}

void main(void) {
	vec2 uv = (FC - .5 * R) / min(R.x, R.y);
  vec2 st = uv * vec2(2, 1);
	vec3 col = vec3(0);

	float bg = clouds(vec2(st.x + T * .5, -st.y));
	
  uv *= 1. - .3 * (sin(T * .2) * .5 + .5);

	for (float i = 1.; i < 12.; i++) {
		uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .5 + .1 * uv.x);
		vec2 p = uv;
		float d = length(p);
    
		col += .00125 / d * (cos(sin(i) * vec3(0.1, 0.8, 1.0)) + 1.);
		
    float b = noise(i + p + bg * 1.731);
		col += .002 * b / length(max(p, vec2(b * p.x * .02, p.y)));
		
    col = mix(col, vec3(bg * .05, bg * .1, bg * .25), d);
	}

	O = vec4(col, 1.0);
}`;


// The main Hero Component
const Hero = ({ headline, subtitle, buttons }) => {
  const canvasRef = useRef(null);
  useShaderBackground(canvasRef);

  return (
    <div className={styles.heroContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.contentWrapper}>
        <div className={styles.headlineContainer}>
          <h1 className={`${styles.headline} ${styles.headline1}`}>
            {headline.line1}
          </h1>
          <h1 className={`${styles.headline} ${styles.headline2}`}>
            {headline.line2}
          </h1>
        </div>
        <p className={styles.subtitle}>{subtitle}</p>
        {buttons && (
          <div className={styles.buttonContainer}>
            {buttons.primary && (
              <Button // Use the new Button component
                text={buttons.primary.text}
                onClick={buttons.primary.onClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

