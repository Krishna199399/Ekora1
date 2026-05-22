/* =============================================================
 * AURA COSMETIC ENGINEERING — DYNAMIC SPA ENGINE & 3D BOTTLE RENDERER
 * ============================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------------------
    // 1. CUSTOM LUXURY CURSOR TRACKING
    // ---------------------------------------------------------
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor interpolation loop
    function updateCursor() {
        // Fast follower for lead dot
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Slow elastic follower for outer champagne ring
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover state attachments
    const hoverElements = document.querySelectorAll("a, button, select, input, .blueprint-option, .acc-trigger, .faq-question, .prod-selector-btn");
    hoverElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("hovering");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("hovering");
        });
    });


    // ---------------------------------------------------------
    // 2. LUXURY CURTAIN WIPE & SINGLE PAGE ROUTER
    // ---------------------------------------------------------
    const views = document.querySelectorAll(".page-view");
    const transitionOverlay = document.querySelector(".page-transition-overlay");
    const drawer = document.querySelector(".navigation-drawer");
    const menuBtn = document.querySelector(".menu-toggle-btn");
    const header = document.querySelector(".luxury-header");

    // Hamburger Index Button toggle
    menuBtn.addEventListener("click", () => {
        const isOpen = drawer.classList.contains("open");
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        drawer.classList.add("open");
        menuBtn.classList.add("menu-open");
        document.body.style.overflow = "hidden"; // Lock scroll
    }

    function closeMenu() {
        drawer.classList.remove("open");
        menuBtn.classList.remove("menu-open");
        document.body.style.overflow = ""; // Unlock scroll
    }

    // Hash SPA router
    function navigateToHash() {
        let hash = window.location.hash || "#home";
        
        // Map clean navigation names
        let targetId = "view-home";
        if (hash === "#about") targetId = "view-about";
        if (hash === "#services") targetId = "view-services";
        if (hash === "#products") targetId = "view-products";
        if (hash === "#industries") targetId = "view-industries";
        if (hash === "#global") targetId = "view-global";
        if (hash === "#portfolio") targetId = "view-portfolio";
        if (hash === "#innovation") targetId = "view-innovation";
        if (hash === "#certifications") targetId = "view-certifications";
        if (hash === "#blog") targetId = "view-blog";
        if (hash === "#careers") targetId = "view-careers";
        if (hash === "#faq") targetId = "view-faq";
        if (hash === "#contact") targetId = "view-contact";

        const targetView = document.getElementById(targetId);
        if (!targetView) return;

        // Trigger curtain overlay wipe
        transitionOverlay.classList.add("animating");

        setTimeout(() => {
            // Hide all active views
            views.forEach(v => {
                v.classList.remove("active", "animate-in");
            });

            // Activate new view
            targetView.classList.add("active");

            // Scroll contents to absolute top
            window.scrollTo({ top: 0, behavior: "instant" });

            // Adapt 3D bottle behavior based on sub-page
            adjustBottleForPage(hash);

            closeMenu();
        }, 500); // Wipe halfway duration

        setTimeout(() => {
            // Remove curtain overlay and slide in page contents
            transitionOverlay.classList.remove("animating");
            targetView.classList.add("animate-in");
            
            // Re-trigger scroll entry reveals
            triggerScrollObserver();
        }, 1000);
    }

    window.addEventListener("hashchange", navigateToHash);

    // Initial load route trigger
    if (window.location.hash) {
        navigateToHash();
    } else {
        // Default home view animate-in
        const homeView = document.getElementById("view-home");
        if (homeView) {
            homeView.classList.add("animate-in");
        }
    }

    // Click trigger on brand logo to clear hash
    document.getElementById("logo-trigger").addEventListener("click", (e) => {
        if (window.location.hash === "#home" || window.location.hash === "") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // Dynamic drawer page links trigger
    const drawerLinks = document.querySelectorAll(".drawer-link, .nav-link, .btn-luxury-header, .footer-col ul a");
    drawerLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                closeMenu();
            }
        });
    });

    // Scrolled header compression
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


    // ---------------------------------------------------------
    // 3. HIGH-FIDELITY PROCEDURAL 3D BOTTLE ENGINE (THREE.JS)
    // ---------------------------------------------------------
    const canvas = document.getElementById("bottle-canvas");
    let scene, camera, renderer, bottleGroup;
    let glassMaterial, liquidMaterial, liquidMesh, labelMesh, capMesh, bulbMesh, pipetteMesh;

    let targetRotX = 0, targetRotY = 0;
    let targetScale = 1.0;
    let targetPosX = 0, targetPosY = 0;

    let currentRotX = 0, currentRotY = 0;
    let currentScale = 1.0;
    let currentPosX = 0, currentPosY = 0;

    let isMobile = window.innerWidth < 1024;

    function init3DScene() {
        if (!canvas) return;

        // Initialize WebGL Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0xF4F3F0, 0.015);

        // Perspective Camera Setup
        camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
        camera.position.z = 12;

        // Renderer with High Dynamic Range & Physical Light support
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;

        // CREATE BOTTLE GROUP
        bottleGroup = new THREE.Group();

        // 1. Transparent Glass Body Material
        glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 0.95,     // Highly transparent glass
            opacity: 1,
            transparent: true,
            roughness: 0.15,        // Elegant soft-matte/frosted glass
            metalness: 0.0,
            ior: 1.52,              // Optical refractive index of standard flint glass
            thickness: 0.22,        // Thickness of glass body walls
            specularIntensity: 1.0,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
        });

        // 2. Skincare Fluid/Liquid Material
        liquidMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xFAF9F6,        // Creamy pearl by default
            transmission: 0.5,      // Translucent compound fluid
            opacity: 0.95,
            transparent: true,
            roughness: 0.2,
            ior: 1.33,              // Water refractive index
            thickness: 0.5
        });

        // Glass Body Mesh
        const bodyGeom = new THREE.CylinderGeometry(1.4, 1.4, 3.8, 32);
        const glassBody = new THREE.Mesh(bodyGeom, glassMaterial);
        bottleGroup.add(glassBody);

        // Glass Neck
        const neckGeom = new THREE.CylinderGeometry(0.7, 0.7, 0.6, 32);
        neckGeom.translate(0, 2.2, 0);
        const glassNeck = new THREE.Mesh(neckGeom, glassMaterial);
        bottleGroup.add(glassNeck);

        // Liquid Volume inside (slightly smaller than interior wall)
        const liqGeom = new THREE.CylinderGeometry(1.28, 1.28, 3.4, 32);
        liqGeom.translate(0, -0.1, 0);
        liquidMesh = new THREE.Mesh(liqGeom, liquidMaterial);
        bottleGroup.add(liquidMesh);

        // Internal Glass Pipette tube
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
        pipetteMesh = new THREE.Mesh(pipGeom, pipMaterial);
        bottleGroup.add(pipetteMesh);

        // 3. Luxurious Cap Collar Material (Gold Infused)
        const capMaterial = new THREE.MeshStandardMaterial({
            color: 0xC5A880,        // Muted luxury champagne gold
            metalness: 0.9,
            roughness: 0.18
        });
        const capGeom = new THREE.CylinderGeometry(0.75, 0.75, 0.65, 32);
        capGeom.translate(0, 2.7, 0);
        capMesh = new THREE.Mesh(capGeom, capMaterial);
        bottleGroup.add(capMesh);

        // 4. Rubber bulb on top (Obsidian Black)
        const bulbMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,        // Fine matte obsidian rubber
            metalness: 0.05,
            roughness: 0.8
        });
        const bulbGeom = new THREE.CylinderGeometry(0.68, 0.55, 0.5, 32);
        bulbGeom.translate(0, 3.2, 0);
        bulbMesh = new THREE.Mesh(bulbGeom, bulbMaterial);
        bottleGroup.add(bulbMesh);

        // 5. C-Shaped Premium Paper Label
        const labelMaterial = new THREE.MeshStandardMaterial({
            color: 0xFBFBF9,
            roughness: 0.9,
            metalness: 0.0,
            side: THREE.DoubleSide
        });
        // C-shape cylinder (partial angle wrap)
        const labelGeom = new THREE.CylinderGeometry(1.42, 1.42, 1.8, 32, 1, true, 0, Math.PI * 1.55);
        labelGeom.translate(0, -0.3, 0);
        labelMesh = new THREE.Mesh(labelGeom, labelMaterial);
        labelMesh.rotation.y = -Math.PI / 1.1; // Face toward camera initially
        bottleGroup.add(labelMesh);

        scene.add(bottleGroup);

        // BOTTLE LIGHTING (PHYSICAL SYSTEM)
        // Soft Ambient fill
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
        scene.add(ambientLight);

        // Key Light (Left studio panel)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
        keyLight.position.set(-6, 8, 4);
        scene.add(keyLight);

        // Rim Light (Golden Backlight for glass highlights)
        const rimLight = new THREE.DirectionalLight(0xffecd6, 1.6);
        rimLight.position.set(6, -4, -6);
        scene.add(rimLight);

        // Highlight spotlight directly on label
        const spotLight = new THREE.SpotLight(0xffffff, 0.8, 20, Math.PI / 6, 0.5, 1);
        spotLight.position.set(0, 2, 8);
        scene.add(spotLight);

        // Responsive positioning adjustments
        adjustViewportScale();

        // 3D Scene Interactive Drag-to-Rotate Setup
        let isDragging = false;
        let prevMouseX = 0, prevMouseY = 0;

        canvas.addEventListener("mousedown", (e) => {
            isDragging = true;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
        });

        canvas.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const deltaX = e.clientX - prevMouseX;
                const deltaY = e.clientY - prevMouseY;
                
                targetRotY += deltaX * 0.01;
                targetRotX += deltaY * 0.01;

                prevMouseX = e.clientX;
                prevMouseY = e.clientY;
            }
        });

        // Touch drag support
        canvas.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                prevMouseX = e.touches[0].clientX;
                prevMouseY = e.touches[0].clientY;
            }
        });

        window.addEventListener("touchend", () => {
            isDragging = false;
        });

        canvas.addEventListener("touchmove", (e) => {
            if (isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - prevMouseX;
                const deltaY = e.touches[0].clientY - prevMouseY;

                targetRotY += deltaX * 0.01;
                targetRotX += deltaY * 0.01;

                prevMouseX = e.touches[0].clientX;
                prevMouseY = e.touches[0].clientY;
            }
        });

        // Start render ticker
        tick();
    }

    // Dynamic scale scaling for mobile overlays
    function adjustViewportScale() {
        isMobile = window.innerWidth < 1024;
        if (isMobile) {
            targetScale = 0.8;
            targetPosX = 0;
            targetPosY = -0.5;

            // Reset scroll-driven animations on mobile layout
            const srvTitleLeft = document.querySelector(".srv-title-left");
            const srvTitleCenter = document.querySelector(".srv-title-center");
            const srvTitleRight = document.querySelector(".srv-title-right");
            const srvTitleLine = document.querySelector(".srv-title-line");
            if (srvTitleLeft) {
                srvTitleLeft.style.transform = "";
                srvTitleLeft.style.opacity = "";
            }
            if (srvTitleCenter) {
                srvTitleCenter.style.transform = "";
                srvTitleCenter.style.opacity = "";
            }
            if (srvTitleRight) {
                srvTitleRight.style.transform = "";
                srvTitleRight.style.opacity = "";
            }
            if (srvTitleLine) {
                srvTitleLine.style.transform = "";
                srvTitleLine.style.opacity = "";
            }

            const srvTrack = document.getElementById("srv-slider-track");
            if (srvTrack) {
                srvTrack.style.transform = "";
            }
        } else {
            targetScale = 1.0;
            targetPosX = 0.0;
            targetPosY = -0.2;
        }

        if (camera && renderer) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
    }

    window.addEventListener("resize", adjustViewportScale);

    // Dynamic rotation, scale and positions adjustment based on loaded SPA pages
    function adjustBottleForPage(hash) {
        if (isMobile) {
            targetScale = 0.7;
            targetPosX = 0;
            targetPosY = -0.3;
            targetRotX = 0.1;
            targetRotY = 0.0;
            return;
        }

        switch (hash) {
            case "#about":
                // Large centerpiece back-tilt
                targetScale = 1.25;
                targetPosX = 0.6;
                targetPosY = -0.5;
                targetRotX = 0.2;
                targetRotY = -0.6;
                break;
            case "#services":
                // Shifted right, detailed formula highlight
                targetScale = 1.0;
                targetPosX = 0.8;
                targetPosY = -0.1;
                targetRotX = 0.1;
                targetRotY = 0.8;
                break;
            case "#products":
                // Floating high, active front label angle
                targetScale = 1.05;
                targetPosX = -0.2;
                targetPosY = -0.2;
                targetRotX = 0.05;
                targetRotY = -0.1;
                break;
            case "#innovation":
                // Central laboratory testing tilt
                targetScale = 1.15;
                targetPosX = 0.4;
                targetPosY = -0.1;
                targetRotX = 0.35;
                targetRotY = 0.5;
                break;
            case "#portfolio":
                // Small technical blueprint angle
                targetScale = 0.85;
                targetPosX = 0.7;
                targetPosY = -0.4;
                targetRotX = 0.15;
                targetRotY = -1.2;
                break;
            case "#contact":
                // Muted corner position
                targetScale = 0.8;
                targetPosX = -0.4;
                targetPosY = -0.6;
                targetRotX = 0.0;
                targetRotY = 0.0;
                break;
            default:
                // Standard default hero layout
                targetScale = 1.0;
                targetPosX = 0.0;
                targetPosY = -0.2;
                targetRotX = 0.08;
                targetRotY = 0.2;
                break;
        }
    }

    // Animation Loop
    function tick() {
        const time = performance.now() * 0.001;

        // Auto slow idle rotation
        targetRotY += 0.0015;

        // Inertia tracking mouse influence when NOT dragging
        // Map mouse -1 to +1 range to subtle camera sway
        const mouseNormX = (mouseX / window.innerWidth) * 2 - 1;
        const mouseNormY = (mouseY / window.innerHeight) * 2 - 1;

        const dynamicRotX = targetRotX + (mouseNormY * 0.08);
        const dynamicRotY = targetRotY + (mouseNormX * 0.08);

        // Smoothly interpolate position, scale, and rotations
        currentRotX += (dynamicRotX - currentRotX) * 0.06;
        currentRotY += (dynamicRotY - currentRotY) * 0.06;
        currentScale += (targetScale - currentScale) * 0.06;
        currentPosX += (targetPosX - currentPosX) * 0.06;
        currentPosY += (targetPosY - currentPosY) * 0.06;

        // Apply transformations
        if (bottleGroup) {
            bottleGroup.rotation.x = currentRotX;
            bottleGroup.rotation.y = currentRotY;
            bottleGroup.scale.set(currentScale, currentScale, currentScale);
            
            // Soft parallax floating loop
            bottleGroup.position.x = currentPosX;
            bottleGroup.position.y = currentPosY + Math.sin(time * 1.5) * 0.08;
        }

        // Render scene
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }

    // Initialize the WebGL engine
    init3DScene();


    // ---------------------------------------------------------
    // SERVICES TAB SLIDER ANIMATION
    // ---------------------------------------------------------
    const srvButtons = document.querySelectorAll(".srv-tab-btn");
    const srvTrack = document.getElementById("srv-slider-track");
    const srvPanes = document.querySelectorAll(".srv-slider-track .srv-tab-pane");
    const srvTabsList = ['tab-rd', 'tab-factory', 'tab-turnkey', 'tab-regulatory'];
    const srvScrollTrack = document.querySelector(".srv-scroll-track");
    const viewServices = document.getElementById("view-services");
    const srvTitleLeft = document.querySelector(".srv-title-left");
    const srvTitleCenter = document.querySelector(".srv-title-center");
    const srvTitleRight = document.querySelector(".srv-title-right");
    const srvTitleLine = document.querySelector(".srv-title-line");

    let lastActiveIndex = 0;

    // Window scroll event listener for desktop scroll-driven tabs
    window.addEventListener("scroll", () => {
        if (!viewServices || !srvScrollTrack || !srvTrack) return;
        
        // Only run scroll-driven horizontal effect on desktop (>= 1024px) and when services view is active
        if (window.innerWidth >= 1024 && viewServices.classList.contains("active")) {
            const rect = srvScrollTrack.getBoundingClientRect();
            const startOffset = 90;
            const viewportHeight = window.innerHeight;
            const trackHeight = rect.height;
            const stickyHeight = viewportHeight - startOffset;
            const scrollableRange = trackHeight - stickyHeight;
            const currentScrollOffset = startOffset - rect.top;
            
            let progress = 0;
            if (scrollableRange > 0) {
                progress = Math.max(0, Math.min(1, currentScrollOffset / scrollableRange));
            }
            
            // Translate the track horizontally (max translate is 75% for 4 panels)
            srvTrack.style.transform = `translate3d(-${progress * 75}%, 0, 0)`;

            // Translate/Rotate/Scale split services title
            if (srvTitleLeft) {
                srvTitleLeft.style.transform = `translate3d(${progress * -35}%, 0, 0)`;
                srvTitleLeft.style.opacity = `${1 - progress * 0.3}`;
            }
            if (srvTitleCenter) {
                srvTitleCenter.style.transform = `rotate(${progress * 180}deg)`;
                srvTitleCenter.style.opacity = `${1 - progress * 0.3}`;
            }
            if (srvTitleRight) {
                srvTitleRight.style.transform = `translate3d(${progress * 35}%, 0, 0)`;
                srvTitleRight.style.opacity = `${1 - progress * 0.3}`;
            }
            if (srvTitleLine) {
                srvTitleLine.style.transform = `scaleX(${progress})`;
                srvTitleLine.style.opacity = `${progress}`;
            }
            
            // Determine active panel based on visual midpoint thresholds
            let activeIndex = 0;
            if (progress < 0.1667) {
                activeIndex = 0;
            } else if (progress < 0.5) {
                activeIndex = 1;
            } else if (progress < 0.8333) {
                activeIndex = 2;
            } else {
                activeIndex = 3;
            }
            
            // Update active states if the index changed
            if (activeIndex !== lastActiveIndex) {
                lastActiveIndex = activeIndex;
                
                srvButtons.forEach((b, idx) => {
                    if (idx === activeIndex) {
                        b.classList.add("active");
                        b.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    } else {
                        b.classList.remove("active");
                    }
                });
                
                srvPanes.forEach((p, idx) => {
                    if (idx === activeIndex) {
                        p.classList.add("active");
                    } else {
                        p.classList.remove("active");
                    }
                });
            }
        } else {
            // Reset styles for mobile/inactive views
            if (srvTitleLeft) {
                srvTitleLeft.style.transform = "";
                srvTitleLeft.style.opacity = "";
            }
            if (srvTitleCenter) {
                srvTitleCenter.style.transform = "";
                srvTitleCenter.style.opacity = "";
            }
            if (srvTitleRight) {
                srvTitleRight.style.transform = "";
                srvTitleRight.style.opacity = "";
            }
            if (srvTitleLine) {
                srvTitleLine.style.transform = "";
                srvTitleLine.style.opacity = "";
            }
        }
    });

    srvButtons.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            if (window.innerWidth >= 1024 && srvScrollTrack) {
                const rect = srvScrollTrack.getBoundingClientRect();
                const trackTop = rect.top + window.scrollY;
                const startOffset = 90;
                const trackHeight = rect.height;
                const viewportHeight = window.innerHeight;
                const stickyHeight = viewportHeight - startOffset;
                const scrollableRange = trackHeight - stickyHeight;
                
                const targetProgress = index / 3;
                const targetScrollY = (trackTop - startOffset) + (targetProgress * scrollableRange);
                
                window.scrollTo({
                    top: targetScrollY,
                    behavior: "smooth"
                });
            } else {
                // Fallback for mobile (< 1024px)
                // Remove active class from all buttons and panes
                srvButtons.forEach(b => b.classList.remove("active"));
                srvPanes.forEach(p => p.classList.remove("active"));

                // Add active class to current button and pane
                btn.classList.add("active");
                if (srvPanes[index]) {
                    srvPanes[index].classList.add("active");
                }

                // Slide track
                if (srvTrack) {
                    srvTrack.style.transform = `translate3d(-${index * 25}%, 0, 0)`;
                }

                // Smooth scroll tab button into view center
                btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        });
    });


    // ---------------------------------------------------------
    // 4. PRODUCT SELECTOR SWITCHER
    // ---------------------------------------------------------
    const prodButtons = document.querySelectorAll(".prod-selector-btn");
    const indicatorName = document.getElementById("current-bottle-active");
    
    // Technical detail mock variables
    const purityVal = document.getElementById("active-purity-val");
    const originVal = document.getElementById("natural-origin-val");
    const descMock = document.getElementById("category-description-mock");

    const categoryDetails = {
        skin: {
            purity: "99.8%",
            origin: "96.5%",
            desc: "Our clinical-grade skincare formulas utilize bio-fermented active compounds and multi-weight acids for deep epidermal cell rejuvenation.",
            color: 0xFAF9F6,     // Creamy pearl white
            glassColor: 0xffffff,
            roughness: 0.15,
            transmission: 0.95
        },
        hair: {
            purity: "98.2%",
            origin: "99.1%",
            desc: "Engineered using oil infusion extraction of organic Rosemary, Biotin, and Keratin chains to reactivate sleeping hair follicles.",
            color: 0xd9863c,     // Rich amber oil
            glassColor: 0x8a5022, // Amber glass
            roughness: 0.02,     // Glossy
            transmission: 0.7
        },
        body: {
            purity: "97.5%",
            origin: "98.8%",
            desc: "Micro-algae extracts and Seaweed enzymes blended inside clean oil-in-water emulsions for maximum cellular skin barrier protection.",
            color: 0xc8e6c1,     // Soft translucent green
            glassColor: 0x224c3a, // Deep green glass
            roughness: 0.05,     // Glossy
            transmission: 0.65
        },
        luxury: {
            purity: "99.9%",
            origin: "95.0%",
            desc: "Suspended 24-Karat Gold flakes inside crystalline peptide essences. Creates an instantaneous luminous refraction pattern upon skin contact.",
            color: 0xd4af37,     // Glowing Translucent Gold
            glassColor: 0xffffff, // White Frosted
            roughness: 0.25,     // Heavy Frosted
            transmission: 0.8
        },
        makeup: {
            purity: "99.2%",
            origin: "92.4%",
            desc: "Highly saturated natural mineral color grids encapsulated in organic jojoba oil shields for feather-light finish with 12h hold.",
            color: 0xc94949,     // Deep crimson cosmetic fluid
            glassColor: 0xffffff, // Glass clear
            roughness: 0.01,     // Clean glossy
            transmission: 0.98
        }
    };

    prodButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            prodButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const cat = btn.getAttribute("data-category");
            const data = categoryDetails[cat];
            const label = btn.getAttribute("data-label");

            // Update DOM Info cards
            indicatorName.textContent = label;
            purityVal.textContent = data.purity;
            originVal.textContent = data.origin;
            descMock.textContent = data.desc;

            // ANIMATE 3D BOTTLE MATERIALS IN REAL TIME
            if (glassMaterial && liquidMaterial && capMesh) {
                // Smooth transition helper
                animateColorTransition(liquidMaterial.color, data.color);
                animateColorTransition(glassMaterial.color, data.glassColor);
                
                glassMaterial.roughness = data.roughness;
                glassMaterial.transmission = data.transmission;
                glassMaterial.needsUpdate = true;
                liquidMaterial.needsUpdate = true;

                // Adjust cap collar metal color as well
                if (cat === "luxury") {
                    animateColorTransition(capMesh.material.color, 0xeed282); // Pure bright gold
                } else {
                    animateColorTransition(capMesh.material.color, 0xC5A880); // Muted luxury gold
                }
            }
        });
    });

    // Interpolate color values inside ThreeJS meshes
    function animateColorTransition(targetColorObject, targetHex) {
        const dest = new THREE.Color(targetHex);
        let progress = 0;

        function step() {
            progress += 0.08;
            targetColorObject.lerp(dest, 0.15);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                targetColorObject.copy(dest);
            }
        }
        step();
    }


    // ---------------------------------------------------------
    // 5. R&D LAB DYNAMIC MIXER SIMULATOR
    // ---------------------------------------------------------
    const labSliders = document.querySelectorAll(".ing-slider, .simulator-slider");
    const synergyFill = document.getElementById("synergy-meter-fill");
    const synergyVerdict = document.getElementById("synergy-verdict");
    const reportSynergy = document.getElementById("report-synergy");
    const reportStability = document.getElementById("report-stability");
    const reportViscosity = document.getElementById("report-viscosity");
    const reportNotes = document.getElementById("report-notes");

    // Tracks slider ingredient percentages
    let formulaState = {
        niacinamide: 2.0,
        retinol: 0.0,
        vitc: 0.0,
        hyaluronic: 1.5,
        herbal: 5.0,
        gold: 0.2 // from hero preview widget
    };

    labSliders.forEach(slider => {
        slider.addEventListener("input", (e) => {
            const ing = slider.getAttribute("data-ing") || slider.getAttribute("data-target");
            const val = parseFloat(slider.value);
            
            // Update labels
            const labelSpan = document.getElementById(`val-${ing}`) || document.getElementById(`lbl-${ing}`) || document.getElementById(`lbl-${ing}-sim`);
            if (labelSpan) {
                labelSpan.textContent = `${val.toFixed(1)}%`;
            }

            // Save state
            formulaState[ing] = val;

            // Recompute synergy results
            recalculateSynergy();
        });
    });

    function recalculateSynergy() {
        const r = formulaState.retinol;
        const c = formulaState.vitc;
        const n = formulaState.niacinamide;
        const h = formulaState.hyaluronic;

        let synergyScore = 100;
        let verdict = "Excellent Synergy Rating";
        let status = "Highly Bio-Available";
        let stability = "99.2% (Pre-Validated)";
        let viscosity = 450;
        let notes = "This recipe establishes a highly cohesive dermal hydration grid. Safe for high-frequency daily routines.";

        // CHEMICAL LOGIC RULES:
        // 1. Combining Retinol and Vitamin C directly causes stability conflicts (needs separate encapsulation)
        if (r > 0 && c > 0) {
            synergyScore = 45 - (r * 10) - (c * 5);
            verdict = "Chemical Conflict Detected";
            status = "Acidic Imbalance / Irritation Risk";
            stability = "Encapsulation Required (Unstable)";
            notes = "WARNING: Direct blending of Ascorbic Acid (Vitamin C) and Retinol (Vitamin A) triggers rapid acidic oxidation. We recommend creating dual-chamber serums or modifying one active compound to an encapsulated slow-release derivative.";
        } 
        // 2. High Retinol levels require strong calming bases
        else if (r > 1.5 && formulaState.herbal < 3) {
            synergyScore = 70;
            verdict = "Skin Irritation Risk";
            status = "Mild Epidermal Peeling Profile";
            stability = "95.6% (Stable)";
            notes = "Retinol concentration is above 1.5%. To avoid customer skin purging or redness, we strongly recommend increasing the Organic Soothing herbal extract base to at least 6.0%.";
        }
        // 3. High Vitamin C needs high Hyaluronic lock
        else if (c > 8.0 && h < 2.0) {
            synergyScore = 80;
            verdict = "Optimizable Formulation";
            status = "Epidermal Dryness Risk";
            stability = "98.1% (Stable)";
            notes = "High Vitamin C dosage (above 8%) is highly effective for brightening, but can dry the skin layer. Consider scaling Hyaluronic Acid to 2.5% to create a moisture-locking matrix.";
        }

        // Calculate viscosity based on moisture load
        viscosity = 100 + (h * 200) + (formulaState.herbal * 30);

        // Update UI
        if (synergyFill) synergyFill.style.width = `${Math.max(10, synergyScore)}%`;
        if (synergyVerdict) {
            synergyVerdict.textContent = verdict;
            if (synergyScore < 50) {
                synergyVerdict.className = "text-danger";
                synergyVerdict.style.color = "#d95d5d";
            } else {
                synergyVerdict.className = "text-gold";
                synergyVerdict.style.color = "";
            }
        }

        if (reportSynergy) reportSynergy.textContent = status;
        if (reportStability) reportStability.textContent = stability;
        if (reportViscosity) reportViscosity.textContent = `${viscosity} cPs (${viscosity > 800 ? "Thick Gel" : "Fluid Serum"})`;
        if (reportNotes) reportNotes.textContent = notes;

        // DYNAMICALLY COLOR LIQUID BASED ON ACTIVE MIXTURE
        if (liquidMaterial) {
            // Mix color calculation based on ingredients
            let mixColor = new THREE.Color(0xFAF9F6); // Pearl base
            
            if (r > 0) {
                // Retinol adds a warm yellow tone
                mixColor.lerp(new THREE.Color(0xfcf2c2), r * 0.3);
            }
            if (c > 0) {
                // Vitamin C adds amber essence
                mixColor.lerp(new THREE.Color(0xfadc96), c * 0.05);
            }
            if (formulaState.herbal > 0) {
                // Herbal bases add a fine green tint
                mixColor.lerp(new THREE.Color(0xd1ebd0), formulaState.herbal * 0.04);
            }

            animateColorTransition(liquidMaterial.color, mixColor.getHex());
            liquidMaterial.roughness = 0.05 + (viscosity / 2000);
            liquidMaterial.needsUpdate = true;
        }
    }


    // ---------------------------------------------------------
    // 6. DYNAMIC BLUEPRINT PLANNER INTERACTIVES
    // ---------------------------------------------------------
    const blueprintOptions = document.querySelectorAll(".blueprint-option");
    const blueprintGrid = document.getElementById("blueprint-schematic");

    const layouts = {
        boutique: `
            <div class="blueprint-room zoning-weighing">
                <span>Raw Material Dispensing Room</span>
            </div>
            <div class="blueprint-room zoning-mixing">
                <span>Vacuum Homogenizing Bay</span>
            </div>
            <div class="blueprint-room zoning-filling">
                <span>Semi-Automated Filling Line</span>
            </div>
            <div class="blueprint-room zoning-qa">
                <span>QA Validation Lab</span>
            </div>
        `,
        industrial: `
            <div class="blueprint-room zoning-weighing" style="grid-row: span 2;">
                <span>Automated Robotic Raw Weighing Center (HEPA H14 Air Flow)</span>
            </div>
            <div class="blueprint-room zoning-mixing">
                <span>Double-Jacket Closed Homogenizers (2000L Capacity)</span>
            </div>
            <div class="blueprint-room zoning-filling">
                <span>Tri-Lane Robotic Capping & Filling Stations (120 bpm)</span>
            </div>
            <div class="blueprint-room zoning-qa">
                <span>Advanced Chromatography & Microbiology Unit</span>
            </div>
            <div class="blueprint-room" style="grid-column: span 2;">
                <span>Automated Clean-In-Place (CIP) Sterile Tank Farm</span>
            </div>
        `
    };

    blueprintOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            blueprintOptions.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");

            const cap = opt.getAttribute("data-capacity");
            blueprintGrid.innerHTML = layouts[cap];

            // Re-bind cursor listeners to newly drawn room cards
            const rooms = blueprintGrid.querySelectorAll(".blueprint-room");
            rooms.forEach(r => {
                r.addEventListener("mouseenter", () => document.body.classList.add("hovering"));
                r.addEventListener("mouseleave", () => document.body.classList.remove("hovering"));
            });
        });
    });


    // ---------------------------------------------------------
    // 7. COMPLIANCE EXPORT CALCULATOR
    // ---------------------------------------------------------
    const btnEval = document.getElementById("btn-run-eval");
    const resultsBox = document.getElementById("eval-results-box");
    const requirementsList = document.getElementById("eval-requirements-list");

    const marketChecklists = {
        "india-usa": [
            "Acquire FDA Facility Registration under MoCRA guidelines",
            "Prepare Cosmetic Product Listing dossiers",
            "Submit absolute safety validation certificates matching FDA regulations",
            "Restructure labeling fonts & ingredient lists to match US standard units"
        ],
        "india-eu": [
            "Designate an official European Responsible Person liaison",
            "Compile comprehensive Cosmetic Product Safety Report (CPSR) dossiers",
            "Submit notification inside the Cosmetic Product Notification Portal (CPNP)",
            "Perform animal-testing ban validations (Mandatory EU clearance)"
        ],
        "india-me": [
            "Register product with the Saudi Food and Drug Authority (SFDA)",
            "Acquire certificate of conformity (CoC) matching Gulf standards (GSO)",
            "Verify Attar & fragrance formulations comply with strict local chemical tolerances",
            "Incorporate bilingual Arabic labeling formatting"
        ],
        "india-in": [
            "CDSCO Manufacturing License application dossiers",
            "Submit formulations safety checklists matching BIS (Bureau of Indian Standards)",
            "Verify organic water system complies with standard pure water loops",
            "Acquire Schedule M GMP facility clearance certificates"
        ]
    };

    if (btnEval) {
        btnEval.addEventListener("click", () => {
            const origin = document.getElementById("eval-origin").value;
            const dest = document.getElementById("eval-destination").value;
            const key = `${origin}-${dest}`;

            // Get checklist or fallback
            const list = marketChecklists[key] || [
                "Verify local trade clearance documents",
                "Ensure standard COA & SDS documentation are available",
                "Review labeling requirements of the target port authority"
            ];

            // Render
            requirementsList.innerHTML = list.map(item => `<li>${item}</li>`).join("");
            resultsBox.style.display = "block";
        });
    }


    // ---------------------------------------------------------
    // 8. TESTIMONIALS EXPANDABLE CAROUSEL SLIDER
    // ---------------------------------------------------------
    const slides = document.querySelectorAll(".testimonial-slide");
    const btnPrev = document.querySelector(".prev-slide");
    const btnNext = document.querySelector(".next-slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });

        btnNext.addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });
    }


    // ---------------------------------------------------------
    // 9. FAQ ACCORDIONS (EXPANDABLE PANELS)
    // ---------------------------------------------------------
    const faqQuestions = document.querySelectorAll(".faq-question, .acc-trigger");

    faqQuestions.forEach(q => {
        q.addEventListener("click", () => {
            const parent = q.parentElement;
            const isOpen = parent.classList.contains("active") || parent.style.borderBottomColor === "rgb(197, 168, 128)";
            
            // Get target panel
            const panel = parent.querySelector(".faq-answer, .acc-content");
            if (!panel) return;

            if (isOpen || parent.classList.contains("active")) {
                parent.classList.remove("active");
                panel.style.maxHeight = null;
            } else {
                // Close other accordions in the same viewport first
                const siblings = parent.parentElement.children;
                for (let sibling of siblings) {
                    sibling.classList.remove("active");
                    const sibPanel = sibling.querySelector(".faq-answer, .acc-content");
                    if (sibPanel) sibPanel.style.maxHeight = null;
                }

                parent.classList.add("active");
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });


    // ---------------------------------------------------------
    // 10. CAREERS JOB SUBMISSION DRAWER MODAL
    // ---------------------------------------------------------
    const btnApplies = document.querySelectorAll(".btn-apply-job");
    const jobModal = document.getElementById("job-apply-modal");
    const btnCloseModal = document.getElementById("btn-close-job-modal");
    const applyTitle = document.getElementById("apply-job-title");
    const jobForm = document.getElementById("job-form");

    btnApplies.forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement;
            const title = parent.querySelector("h5").textContent;
            applyTitle.textContent = title;
            jobModal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });

    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => {
            jobModal.style.display = "none";
            document.body.style.overflow = "";
        });
    }

    if (jobForm) {
        jobForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Technical application logged. Our recruitment chemistry team will evaluate your CV parameters within 48h.");
            jobModal.style.display = "none";
            document.body.style.overflow = "";
            jobForm.reset();
        });
    }


    // ---------------------------------------------------------
    // 11. CONTACT MAIN FORM REALISTIC ADVISORY SUCCESS TIMELINE
    // ---------------------------------------------------------
    const contactForm = document.getElementById("contact-main-form");
    const formSuccess = document.getElementById("form-success");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            contactForm.style.display = "none";
            formSuccess.style.display = "block";
        });
    }


    // ---------------------------------------------------------
    // 12. HIGH-PERFORMANCE INTERSECTION SCROLL ENTRY ANIMATIONS
    // ---------------------------------------------------------
    let revealObserver;

    function triggerScrollObserver() {
        // Clear existing observers to avoid duplication
        if (revealObserver) {
            revealObserver.disconnect();
        }

        const revealElements = document.querySelectorAll(".section-reveal, .value-block, .service-teaser-card, .portfolio-item-card, .blog-post-card");

        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                    // Unobserve to run animation only once
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,  // Trigger when 12% is visible
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => {
            el.classList.add("reveal-prepare");
            revealObserver.observe(el);
        });
    }

    // Attach basic reveal styling dynamically to CSS via script to preserve non-JS fallback layouts
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .reveal-prepare {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1), transform 1.0s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered delay helpers */
        .service-teaser-card:nth-child(2) { transition-delay: 0.15s; }
        .service-teaser-card:nth-child(3) { transition-delay: 0.3s; }
        .service-teaser-card:nth-child(4) { transition-delay: 0.45s; }

        .value-block:nth-child(2) { transition-delay: 0.15s; }
        .value-block:nth-child(3) { transition-delay: 0.3s; }

        .blog-post-card:nth-child(2) { transition-delay: 0.15s; }
        .blog-post-card:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(styleSheet);

    // Run first layout observation
    triggerScrollObserver();

});
