"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./test.module.css";

type CylinderConfig = {
  height: number;
  speed: number;
  x: number;
};

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

export default function CylinderScrollScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

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

    const cylinderMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x006cff,
      emissive: 0x003a96,
      emissiveIntensity: 0.55,
      metalness: 0,
      opacity: 0.58,
      roughness: 0.18,
      side: THREE.DoubleSide,
      transparent: true,
      transmission: 0.28,
      thickness: 0.65,
      depthWrite: false,
    });

    const rimMaterial = new THREE.LineBasicMaterial({
      color: 0xc6efff,
      transparent: true,
      opacity: 0.86,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4eb8ff,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const highlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xe6fbff,
      transparent: true,
      opacity: 0.58,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const cylinderGroups = CYLINDERS.map((config) => {
      const group = new THREE.Group();
      group.position.x = config.x;
      group.position.y = 0;
      group.position.z = Math.abs(config.x) * -0.05;

      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(RADIUS, RADIUS, config.height, SEGMENTS, 1, false),
        cylinderMaterial,
      );
      group.add(body);

      const glow = new THREE.Mesh(
        new THREE.CylinderGeometry(RADIUS * 1.12, RADIUS * 1.12, config.height, SEGMENTS, 1, false),
        glowMaterial,
      );
      group.add(glow);

      const frontHighlight = new THREE.Mesh(
        new THREE.BoxGeometry(RADIUS * 0.12, config.height * 0.94, 0.012),
        highlightMaterial,
      );
      frontHighlight.position.set(-RADIUS * 0.34, 0, RADIUS * 0.99);
      group.add(frontHighlight);

      const edgeGeometry = new THREE.EdgesGeometry(body.geometry, 18);
      const edges = new THREE.LineSegments(edgeGeometry, rimMaterial);
      group.add(edges);

      const ringGeometry = new THREE.TorusGeometry(RADIUS * 0.98, 0.012, 10, 72);
      const topRing = new THREE.Mesh(ringGeometry, highlightMaterial);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = config.height / 2;
      group.add(topRing);

      const bottomRing = topRing.clone();
      bottomRing.position.y = -config.height / 2;
      group.add(bottomRing);

      scene.add(group);

      return { group, speed: config.speed };
    });

    const baseScrollY = window.scrollY;
    let wheelOffset = 0;
    let animationFrame = 0;

    const draw = () => {
      const scrollSignal = window.scrollY - baseScrollY + wheelOffset;

      cylinderGroups.forEach(({ group, speed }, index) => {
        group.rotation.y = (scrollSignal / 100) * speed * (Math.PI / 180);
        group.rotation.x = THREE.MathUtils.degToRad(-4);
        group.rotation.z = THREE.MathUtils.degToRad(index < 6 ? -1.2 : index > 6 ? 1.2 : 0);
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(draw);
    };

    const handleWheel = (event: WheelEvent) => {
      wheelOffset += event.deltaY;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const keyDeltas: Record<string, number> = {
        ArrowDown: 64,
        ArrowUp: -64,
        End: 260,
        Home: -260,
        PageDown: 220,
        PageUp: -220,
        Space: 180,
      };

      wheelOffset += keyDeltas[event.code] ?? 0;
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);

      mount.removeChild(renderer.domElement);

      cylinderGroups.forEach(({ group }) => {
        group.traverse((object) => {
          if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
            object.geometry.dispose();
          }
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
    <main className={styles.page}>
      <section className={styles.scene} aria-label="Scroll-reactive translucent 3D cylinders">
        <div ref={mountRef} className={styles.canvasMount} />
      </section>
      <section className={styles.scrollSpace} aria-hidden="true" />
    </main>
  );
}
