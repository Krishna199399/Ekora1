import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Skincare3DBottle({
    activeCategory = 'skin',
    customLiquidColor = null,
    customLiquidViscosity = null,
    activePage = '#home'
}) {
    const canvasRef = useRef(null);
    
    // Store current props in a ref to let the high-frequency WebGL render loop
    // access them without tearing down and recreating the scene on every prop change.
    const propsRef = useRef({ activeCategory, customLiquidColor, customLiquidViscosity, activePage });
    
    useEffect(() => {
        propsRef.current = { activeCategory, customLiquidColor, customLiquidViscosity, activePage };
    }, [activeCategory, customLiquidColor, customLiquidViscosity, activePage]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let animationFrameId;

        // -----------------------------------------------------
        // 1. SETUP WEBGL CONTEXT
        // -----------------------------------------------------
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xF4F3F0, 0.015);

        const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.z = 12;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        // -----------------------------------------------------
        // 2. CONSTRUCT BOTTLE MESHES
        // -----------------------------------------------------
        const bottleGroup = new THREE.Group();

        // Standard physics glass
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.95,
            opacity: 1,
            transparent: true,
            roughness: 0.15,
            metalness: 0.0,
            ior: 1.52,
            thickness: 0.22,
            specularIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
        });

        // Dynamic formulation liquid
        const liquidMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFAF9F6,
            transmission: 0.5,
            opacity: 0.95,
            transparent: true,
            roughness: 0.2,
            ior: 1.33,
            thickness: 0.5
        });

        // 3D Glass Cylindrical Body
        const bodyGeom = new THREE.CylinderGeometry(1.4, 1.4, 3.8, 32);
        const glassBody = new THREE.Mesh(bodyGeom, glassMaterial);
        bottleGroup.add(glassBody);

        // 3D Glass Neck
        const neckGeom = new THREE.CylinderGeometry(0.7, 0.7, 0.6, 32);
        neckGeom.translate(0, 2.2, 0);
        const glassNeck = new THREE.Mesh(neckGeom, glassMaterial);
        bottleGroup.add(glassNeck);

        // Fluid volume (slightly smaller than body interior)
        const liqGeom = new THREE.CylinderGeometry(1.28, 1.28, 3.4, 32);
        liqGeom.translate(0, -0.1, 0);
        const liquidMesh = new THREE.Mesh(liqGeom, liquidMaterial);
        bottleGroup.add(liquidMesh);

        // Internal Glass Pipette dropper tube
        const pipMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.98,
            opacity: 1.0,
            transparent: true,
            roughness: 0.05,
            ior: 1.48
        });
        const pipGeom = new THREE.CylinderGeometry(0.1, 0.1, 3.5, 16);
        pipGeom.translate(0, 0.3, 0);
        const pipetteMesh = new THREE.Mesh(pipGeom, pipMaterial);
        bottleGroup.add(pipetteMesh);

        // Metallic collar cap
        const capMaterial = new THREE.MeshStandardMaterial({
            color: 0xC5A880,
            metalness: 0.9,
            roughness: 0.18
        });
        const capGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.65, 32);
        capGeom.translate(0, 2.7, 0);
        const capMesh = new THREE.Mesh(capGeom, capMaterial);
        bottleGroup.add(capMesh);

        // Matte rubber dropper bulb
        const bulbMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.05,
            roughness: 0.8
        });
        const bulbGeom = new THREE.CylinderGeometry(0.68, 0.55, 0.5, 32);
        bulbGeom.translate(0, 3.2, 0);
        const bulbMesh = new THREE.Mesh(bulbGeom, bulbMaterial);
        bottleGroup.add(bulbMesh);

        // Text label cylinder overlay
        const labelMaterial = new THREE.MeshStandardMaterial({
            color: 0xFBFBF9,
            roughness: 0.9,
            metalness: 0.0,
            side: THREE.DoubleSide
        });
        const labelGeom = new THREE.CylinderGeometry(1.42, 1.42, 1.8, 32, 1, true, 0, Math.PI * 1.55);
        labelGeom.translate(0, -0.3, 0);
        const labelMesh = new THREE.Mesh(labelGeom, labelMaterial);
        labelMesh.rotation.y = -Math.PI / 1.1; // align initially
        bottleGroup.add(labelMesh);

        scene.add(bottleGroup);

        // -----------------------------------------------------
        // 3. PHYSICAL LIGHTING
        // -----------------------------------------------------
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
        keyLight.position.set(-6, 8, 4);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xffecd6, 1.6);
        rimLight.position.set(6, -4, -6);
        scene.add(rimLight);

        const spotLight = new THREE.SpotLight(0xffffff, 0.8, 20, Math.PI / 6, 0.5, 1);
        spotLight.position.set(0, 2, 8);
        scene.add(spotLight);

        // -----------------------------------------------------
        // 4. MOUSE DRAG ROTATION INTERACTIVITY
        // -----------------------------------------------------
        let targetRotX = 0.08, targetRotY = 0.2;
        let targetScale = 1.0;
        let targetPosX = 0, targetPosY = -0.2;

        let currentRotX = 0, currentRotY = 0;
        let currentScale = 1.0;
        let currentPosX = 0, currentPosY = 0;

        let isDragging = false;
        let prevMouseX = 0, prevMouseY = 0;

        const onMouseDown = (e) => {
            isDragging = true;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        };

        const onMouseMove = (e) => {
            if (isDragging) {
                const deltaX = e.clientX - prevMouseX;
                const deltaY = e.clientY - prevMouseY;
                targetRotY += deltaX * 0.01;
                targetRotX += deltaY * 0.01;
                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
        };

        const onMouseUp = () => {
            isDragging = false;
        };

        canvas.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        // Touch support
        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                prevMouseX = e.touches[0].clientX;
                prevMouseY = e.touches[0].clientY;
            }
        };

        const onTouchMove = (e) => {
            if (isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - prevMouseX;
                const deltaY = e.touches[0].clientY - prevMouseY;
                targetRotY += deltaX * 0.01;
                targetRotX += deltaY * 0.01;
                prevMouseX = e.touches[0].clientX;
                prevMouseY = e.touches[0].clientY;
            }
        };

        canvas.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onMouseUp);

        // -----------------------------------------------------
        // 5. RESIZE & RESPONSIVENESS
        // -----------------------------------------------------
        const handleResize = () => {
            if (!canvas || !camera || !renderer) return;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Category configurations preset mapping
        const categoryDetails = {
            skin: { color: 0xFAF9F6, glass: 0xffffff, roughness: 0.15, transmission: 0.95 },
            hair: { color: 0xd9863c, glass: 0x8a5022, roughness: 0.02, transmission: 0.7 },
            body: { color: 0xc8e6c1, glass: 0x224c3a, roughness: 0.05, transmission: 0.65 },
            luxury: { color: 0xd4af37, glass: 0xffffff, roughness: 0.25, transmission: 0.8 },
            makeup: { color: 0xc94949, glass: 0xffffff, roughness: 0.01, transmission: 0.98 }
        };

        // Cache parameters to trigger transitions only on change
        let lastCategory = '';
        let lastLiquidColor = '';
        let lastLiquidViscosity = null;
        let lastPage = '';

        // -----------------------------------------------------
        // 6. MOTION TICKER LOOP
        // -----------------------------------------------------
        const tick = () => {
            const time = performance.now() * 0.001;

            // Slow idle spin
            targetRotY += 0.0015;

            // Retrieve latest props from dynamic ref
            const currentProps = propsRef.current;
            const isMobile = window.innerWidth < 1024;

            // 6.1 Dynamic Placeholder Positioning
            const activePlaceholder = document.querySelector('.page-view.active .bottle-placeholder');
            const viewport = document.getElementById('bottle-3d-viewport');
            
            if (viewport) {
                if (activePlaceholder) {
                    const rect = activePlaceholder.getBoundingClientRect();
                    
                    // Reposition fixed viewport overlay exactly on top of the DOM placeholder
                    viewport.style.left = `${rect.left}px`;
                    viewport.style.top = `${rect.top}px`;
                    viewport.style.width = `${rect.width}px`;
                    viewport.style.height = `${rect.height}px`;
                    viewport.style.opacity = '1';
                    viewport.style.pointerEvents = 'auto';
                    
                    // Trigger renderer resize if dimensions changed
                    const targetWidth = rect.width;
                    const targetHeight = rect.height;
                    if (Math.abs(canvas.clientWidth - targetWidth) > 2 ||
                        Math.abs(canvas.clientHeight - targetHeight) > 2) {
                        camera.aspect = targetWidth / targetHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(targetWidth, targetHeight);
                    }
                } else {
                    viewport.style.opacity = '0';
                    viewport.style.pointerEvents = 'none';
                    viewport.style.width = '0px';
                    viewport.style.height = '0px';
                }
            }

            // 6.2 Prop Update Trigger logic
            if (currentProps.activeCategory !== lastCategory || 
                currentProps.customLiquidColor !== lastLiquidColor ||
                currentProps.customLiquidViscosity !== lastLiquidViscosity) {
                
                lastCategory = currentProps.activeCategory;
                lastLiquidColor = currentProps.activeCategory === 'custom' ? currentProps.customLiquidColor : null;
                lastLiquidViscosity = currentProps.customLiquidViscosity;

                // Select visual parameters
                let targetLiqHex = 0xFAF9F6;
                let targetGlassHex = 0xffffff;
                let targetRough = 0.15;
                let targetTrans = 0.95;

                if (currentProps.activeCategory === 'custom' && currentProps.customLiquidColor) {
                    targetLiqHex = parseInt(currentProps.customLiquidColor.replace('#', '0x'));
                    targetGlassHex = 0xffffff;
                    targetRough = currentProps.customLiquidViscosity ? 0.05 + (currentProps.customLiquidViscosity / 2000) : 0.15;
                    targetTrans = 0.95;
                } else {
                    const preset = categoryDetails[currentProps.activeCategory] || categoryDetails.skin;
                    targetLiqHex = preset.color;
                    targetGlassHex = preset.glass;
                    targetRough = preset.roughness;
                    targetTrans = preset.transmission;
                }

                // Smoothly lerp colors in WebGL
                const destLiq = new THREE.Color(targetLiqHex);
                const destGlass = new THREE.Color(targetGlassHex);
                
                liquidMaterial.color.lerp(destLiq, 0.2);
                glassMaterial.color.lerp(destGlass, 0.2);
                
                glassMaterial.roughness = targetRough;
                glassMaterial.transmission = targetTrans;
                glassMaterial.needsUpdate = true;
                liquidMaterial.needsUpdate = true;

                // Style gold cap for luxury page
                if (currentProps.activeCategory === 'luxury') {
                    capMesh.material.color.lerp(new THREE.Color(0xeed282), 0.2);
                } else {
                    capMesh.material.color.lerp(new THREE.Color(0xC5A880), 0.2);
                }
            }

            // 6.3 Reposition bottle coordinates within its placeholder
            if (currentProps.activePage !== lastPage || isMobile) {
                lastPage = currentProps.activePage;

                if (isMobile) {
                    targetScale = 0.75;
                    targetPosX = 0;
                    targetPosY = -0.15;
                    targetRotX = 0.1;
                } else {
                    // Center the bottle in the placeholder
                    targetScale = 0.9;
                    targetPosX = 0.0;
                    targetPosY = -0.15;
                    targetRotX = 0.08;
                    targetRotY = 0.2;
                }
            }

            // 6.4 Smoothly interpolate transforms
            currentRotX += (targetRotX - currentRotX) * 0.06;
            currentRotY += (targetRotY - currentRotY) * 0.06;
            currentScale += (targetScale - currentScale) * 0.06;
            currentPosX += (targetPosX - currentPosX) * 0.06;
            currentPosY += (targetPosY - currentPosY) * 0.06;

            if (bottleGroup) {
                bottleGroup.rotation.x = currentRotX;
                bottleGroup.rotation.y = currentRotY;
                bottleGroup.scale.set(currentScale, currentScale, currentScale);
                bottleGroup.position.x = currentPosX;
                bottleGroup.position.y = currentPosY + Math.sin(time * 1.5) * 0.08; // float parallax
            }

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        };

        // Trigger initial sizing and loop
        handleResize();
        tick();

        // -----------------------------------------------------
        // 7. CLEANUP MEMORY ON UNMOUNT
        // -----------------------------------------------------
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onMouseUp);

            // Clean up WebGL resources
            bottleGroup.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });

            scene.clear();
            renderer.dispose();
        };
    }, []);

    return (
        <div id="bottle-3d-viewport">
            <canvas ref={canvasRef} id="bottle-canvas"></canvas>
            <div className="viewport-overlay-ui">
                <div className="bottle-label-indicator">
                    <span className="label-heading">EGC ENGINEERING</span>
                    <span className="label-sub" id="current-bottle-active">
                        {activeCategory === 'skin' && 'Niacinamide Skincare Serum'}
                        {activeCategory === 'hair' && 'Organic Rosemary Oil'}
                        {activeCategory === 'body' && 'Seaweed Hydration Serum'}
                        {activeCategory === 'luxury' && '24k Gold suspension'}
                        {activeCategory === 'makeup' && 'Jojoba Mineral Blush'}
                        {activeCategory === 'custom' && 'Bespoke R&D Compound'}
                    </span>
                    <span className="label-vol">30mL 1.01 fl. oz.</span>
                </div>
                <div className="interactive-rotation-hint">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 12a9 9 0 11-9-9c2.5 0 4.83 1.04 6.55 2.73M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Drag to rotate 3D bottle</span>
                </div>
            </div>
        </div>
    );
}
