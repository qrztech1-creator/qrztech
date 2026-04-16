import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeJSHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Configuração da cena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Luzes - foco em luzes e sombras
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Luz direcional principal (laranja da marca)
    const directionalLight = new THREE.DirectionalLight(0xff6633, 1.2);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);

    // Luz pontual (azul da marca)
    const pointLight = new THREE.PointLight(0x003ba8, 0.8, 50);
    pointLight.position.set(-8, 5, -8);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);

    // Luz de preenchimento
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Plano para receber sombras
    const planeGeometry = new THREE.PlaneGeometry(40, 40);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Elementos simples para demonstrar luzes e sombras
    // Apenas algumas formas geométricas simples
    const geometries = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.CylinderGeometry(1, 1, 3, 32)
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0xff6633,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xff6633,
        emissiveIntensity: 0.1
      }),
      new THREE.MeshStandardMaterial({
        color: 0x003ba8,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x003ba8,
        emissiveIntensity: 0.1
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.6,
        roughness: 0.4
      })
    ];

    const meshes: THREE.Mesh[] = [];

    // Posicionar formas em posições estratégicas para destacar sombras
    for (let i = 0; i < 3; i++) {
      const mesh = new THREE.Mesh(geometries[i], materials[i]);

      // Posicionar em linha com espaçamento
      mesh.position.x = (i - 1) * 6;
      mesh.position.y = 0;
      mesh.position.z = 0;

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      meshes.push(mesh);
    }

    camera.position.z = 15;
    camera.position.y = 5;

    // Animações sutis apenas para luzes
    gsap.to(directionalLight.position, {
      duration: 20,
      x: -10,
      y: 8,
      z: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(pointLight.position, {
      duration: 15,
      x: 8,
      y: 3,
      z: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(pointLight, {
      duration: 8,
      intensity: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Rotação muito lenta das formas
    meshes.forEach((mesh, i) => {
      gsap.to(mesh.rotation, {
        duration: 30 + i * 10,
        y: Math.PI * 2,
        repeat: -1,
        ease: "none"
      });
    });

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      geometries.forEach(geo => geo.dispose());
      materials.forEach(mat => mat.dispose());
      planeGeometry.dispose();
      planeMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-qrz-dark/90 via-transparent to-qrz-blue/60"></div>
    </div>
  );
};

export default ThreeJSHero;