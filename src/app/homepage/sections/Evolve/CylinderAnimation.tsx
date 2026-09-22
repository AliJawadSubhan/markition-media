"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type CylinderConfig = { height: number; speed: number; x: number };

const CYLINDERS: CylinderConfig[] = [
  { x: -3.9, height: 3.7, speed: 12 },
  { x: -3.25, height: 3.25, speed: 11 },
  { x: -2.6, height: 2.78, speed: 10 },
  { x: -1.95, height: 2.32, speed: 9 },
  { x: -1.3, height: 1.92, speed: 8 },
  { x: -0.65, height: 1.58, speed: 7 },
  { x: 0, height: 1.32, speed: 6 },
  { x: 0.65, height: 1.58, speed: 5 },
  { x: 1.3, height: 1.92, speed: 4 },
  { x: 1.95, height: 2.32, speed: 3.5 },
  { x: 2.6, height: 2.78, speed: 3 },
  { x: 3.25, height: 3.25, speed: 2.5 },
  { x: 3.9, height: 3.7, speed: 2 },
];

const RADIUS = 0.15;
const SEGMENTS = 64;

export default function CylinderAnimation() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.42, 7.15);
    camera.lookAt(0, 0.02, 0);

    scene.add(new THREE.AmbientLight(0x73bfff, 1.15));
    const frontLight = new THREE.PointLight(0xb8e7ff, 12, 10);
    frontLight.position.set(-2.2, 2.4, 3.2);
    scene.add(frontLight);
    const rimLight = new THREE.PointLight(0x1678ff, 8, 10);
    rimLight.position.set(3.2, 1.8, 2.6);
    scene.add(rimLight);

    const cylinderMaterial = new THREE.MeshStandardMaterial({
      color: 0x006cff,
      emissive: 0x003a96,
      emissiveIntensity: 0.55,
      metalness: 0.1,
      roughness: 0.18,
      opacity: 0.58,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const rimMaterial = new THREE.LineBasicMaterial({ color: 0xc6efff, transparent: true, opacity: 0.86 });
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x4eb8ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });
    const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xe6fbff, transparent: true, opacity: 0.58, side: THREE.DoubleSide, depthWrite: false });

    const cylinderGroups = CYLINDERS.map((config) => {
      const group = new THREE.Group();
      group.position.x = config.x;
      group.position.z = Math.abs(config.x) * -0.05;

      const body = new THREE.Mesh(new THREE.CylinderGeometry(RADIUS, RADIUS, config.height, SEGMENTS, 1, false), cylinderMaterial);
      group.add(body);
      group.add(new THREE.Mesh(new THREE.CylinderGeometry(RADIUS * 1.12, RADIUS * 1.12, config.height, SEGMENTS, 1, false), glowMaterial));

      const highlight = new THREE.Mesh(new THREE.BoxGeometry(RADIUS * 0.12, config.height * 0.94, 0.012), highlightMaterial);
      highlight.position.set(-RADIUS * 0.34, 0, RADIUS * 0.99);
      group.add(highlight);

      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry, 18), rimMaterial));

      const ringGeo = new THREE.TorusGeometry(RADIUS * 0.98, 0.012, 10, 72);
      const topRing = new THREE.Mesh(ringGeo, highlightMaterial);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = config.height / 2;
      group.add(topRing);
      const bottomRing = topRing.clone();
      bottomRing.position.y = -config.height / 2;
      group.add(bottomRing);

      scene.add(group);
      return { group, speed: config.speed };
    });

    let animationFrame = 0;

    const draw = () => {
      // Drive animation from page scroll relative to this element's position
      const sectionTop = mount.getBoundingClientRect().top + window.scrollY;
      const scrollSignal = Math.max(0, window.scrollY - sectionTop + window.innerHeight * 0.5);

      cylinderGroups.forEach(({ group, speed }, index) => {
        group.rotation.y = (scrollSignal / 100) * speed * (Math.PI / 180);
        group.rotation.x = THREE.MathUtils.degToRad(-4);
        group.rotation.z = THREE.MathUtils.degToRad(index < 6 ? -1.2 : index > 6 ? 1.2 : 0);
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
      mount.removeChild(renderer.domElement);
      cylinderGroups.forEach(({ group }) => {
        group.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments) obj.geometry.dispose();
        });
      });
      cylinderMaterial.dispose();
      rimMaterial.dispose();
      glowMaterial.dispose();
      highlightMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "clamp(300px, 38vw, 520px)",
        pointerEvents: "none",
      }}
    />
  );
}
