import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

const Organization3DBackground = () => {
  const containerRef = useRef();
  const location = useLocation();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const ribbonRef = useRef();

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
    },
    vertexShader: `
      varying vec3 vEC;
      uniform float time;

      float iqhash(float n) {
        return fract(sin(n) * 43758.5453);
      }

      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(mix(mix(iqhash(n), iqhash(n + 1.0), f.x),
                   mix(iqhash(n + 57.0), iqhash(n + 58.0), f.x), f.y),
                   mix(mix(iqhash(n + 113.0), iqhash(n + 114.0), f.x),
                   mix(iqhash(n + 170.0), iqhash(n + 171.0), f.x), f.y), f.z);
      }

      float xmb_noise2(vec3 x) {
        return cos(x.z * 4.0) * cos(x.z + time / 10.0 + x.x);
      }

      void main() {
        vec4 pos = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec3 v = vec3(pos.x, 0.0, pos.y);
        vec3 v2 = v;
        vec3 v3 = v;

        v.y = xmb_noise2(v2) / 8.0;

        v3.x -= time / 5.0;
        v3.x /= 4.0;

        v3.z -= time / 10.0;
        v3.y -= time / 100.0;

        v.z -= noise(v3 * 7.0) / 15.0;
        v.y -= noise(v3 * 7.0) / 15.0 + cos(v.x * 2.0 - time / 2.0) / 5.0 - 0.3;

        vEC = v;
        gl_Position = vec4(v, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vEC;

      void main()
      {
         const vec3 up = vec3(0.0, 0.0, 1.0);
         vec3 x = dFdx(vEC);
         vec3 y = dFdy(vEC);
         vec3 normal = normalize(cross(x, y));
         float c = 1.0 - dot(normal, up);
         c = (1.0 - cos(c * c)) / 3.0;
         gl_FragColor = vec4(1.0, 1.0, 1.0, c * 1.5);
      }
    `,
    extensions: {
      derivatives: true,
    },
    side: THREE.DoubleSide,
    transparent: true,
    depthTest: false,
  }), []);

  useEffect(() => {
    console.log("Current path:", location.pathname);
    // if (location.pathname !== '/org') return;  // Commented out for testing

    console.log("Initializing 3D background");
    let animationFrameId;
    const container = containerRef.current;

    const init = () => {
      if (!sceneRef.current) {
        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        cameraRef.current.position.z = 2;

        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current.setClearColor(0xff66c4, 1);
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        
        ribbonRef.current = new THREE.Mesh(
          new THREE.PlaneGeometry(1, 1, 16, 16),
          shaderMaterial
        );

        sceneRef.current.add(ribbonRef.current);
        container.appendChild(rendererRef.current.domElement);
      }
    };

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      rendererRef.current.setSize(innerWidth, innerHeight);
      cameraRef.current.aspect = innerWidth / innerHeight;
      cameraRef.current.updateProjectionMatrix();
      ribbonRef.current.scale.set(cameraRef.current.aspect * 1.55, 0.75, 1);
    };

    const animate = () => {
      shaderMaterial.uniforms.time.value += 0.01;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      console.log("Cleaning up 3D background");
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
    };
  }, [location.pathname, shaderMaterial]);

  // if (location.pathname !== '/org') {
  //   return null;
  // }

  console.log("Rendering 3D background container");
  return <div id="container" ref={containerRef} style={containerStyle} />;
};

const containerStyle = {
  position: 'fixed',
  width: '100%',
  height: '100vh',
  left: '0',
  top: '0',
  background: 'linear-gradient(to bottom, #ff66c4, #FFFFFF)',
  zIndex: -1,
  pointerEvents: 'none',
};

export default React.memo(Organization3DBackground);