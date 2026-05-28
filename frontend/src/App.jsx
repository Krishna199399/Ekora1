import React, { useState, useEffect, useRef } from 'react';
import HorizonXAnimation from './components/HorizonXAnimation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import heroBannerImg from './assets/hero banner.png';
import cosmeticRdLabImg from './assets/cosmetic_rd_lab.png';
import skincareFactoryImg from './assets/skincare_factory.png';
import founderPortraitImg from './assets/founder_portrait.png';
import botanicalIngredientsImg from './assets/botanical_ingredients.png';
import blogSkincareScienceImg from './assets/blog_skincare_science.png';
import portfolioEssenceHaircareImg from './assets/portfolio_essence_haircare.png';
import blogComplianceInsightsImg from './assets/blog_compliance_insights.png';
import catalogFeaturedSerumImg from './assets/catalog_featured_serum.png';
import logoBlackImg from './assets/logo_black.png';
import logoBlueImg from './assets/logo_blue.png';
import logoWhiteImg from './assets/logo_white.png';
const catalogCategories = {
    skincare: {
        title: "Skincare & Dermatology",
        description: "Clinical acne face washes, multi-weight hyaluronic acid serums, moisturizers, sunscreens, face masks, and balancing toners.",
        actives: ["Hyaluronic Acid", "Niacinamide", "Retinol"],
        naturalIndex: "96.5%",
        purity: "99.8%",
        lead: "Our clinical-grade skincare formulas utilize bio-fermented active compounds and multi-weight acids for targeted epidermal delivery."
    },
    haircare: {
        title: "Hair & Scalp Systems",
        description: "Sulfate-free keratin shampoos, nourishing macadamia conditioners, rosemary herbal hair growth oils, frizz-control hair serums, and repair hair masks.",
        actives: ["Rosemary Extract", "Biotin", "Keratin"],
        naturalIndex: "99.1%",
        purity: "99.5%",
        lead: "Engineered using oil infusion extraction of organic Rosemary, Biotin, and Keratin chains to strengthen follicles and restore lipid balance."
    },
    bodycare: {
        title: "Premium Body Care",
        description: "Restorative body lotions, whipped shea body butters, hydrating shower gels, exfoliating body scrubs.",
        actives: ["Shea Butter", "Niacinamide", "Algae Extract"],
        naturalIndex: "97.8%",
        purity: "99.2%",
        lead: "Micro-algae extracts and Seaweed enzymes blended inside clean oil-in-water emulsions to deliver long-lasting hydration."
    },
    lipcare: {
        title: "Lip Care Products",
        description: "Peptide lip balms, gold-infused lip oils, plumping glosses, and moisturizing lip masks.",
        actives: ["Palmitoyl Tripeptide", "Coconut Oil", "Shea Butter"],
        naturalIndex: "98.5%",
        purity: "99.9%",
        lead: "Ultra-hydrating formulas featuring custom peptide complexes and cold-pressed botanical oils for instant skin barrier support."
    },
    grooming: {
        title: "Men's Grooming Products",
        description: "Beard oils, charcoal face scrubs, soothing post-shave balms, and styling pomades.",
        actives: ["Charcoal", "Witch Hazel", "Argan Oil"],
        naturalIndex: "95.0%",
        purity: "99.0%",
        lead: "Dermatologically-approved grooming solutions engineered with quick-absorbing lipids and cooling botanicals."
    },
    babycare: {
        title: "Baby Care Products",
        description: "Tear-free shampoos, soothing diaper rash creams, and ultra-gentle massage oils.",
        actives: ["Calendula", "Chamomile", "Zinc Oxide"],
        naturalIndex: "99.8%",
        purity: "100%",
        lead: "Hypoallergenic formulas free of synthetic fragrances, sulfates, and parabens, designed for extremely sensitive baby skin."
    },
    ayurvedic: {
        title: "Ayurvedic, Herbal & Organic",
        description: "GMP-certified Ayurvedic proprietary oils, neem skin clearing range, organic rose waters, and herbal anti-aging elixirs.",
        actives: ["Neem Extract", "Turmeric Co2", "Gotu Kola"],
        naturalIndex: "100%",
        purity: "99.9%",
        lead: "Bridging ancient Vedic recipes with modern chromatography to isolate active phyto-compounds in bio-compatible carriers."
    },
    wellness: {
        title: "Wellness & Functional Beauty",
        description: "Stress-relief bath salts, muscle rub salves, and aromatherapy essential oil roll-ons.",
        actives: ["Epsom Salt", "Menthol", "Lavender Oil"],
        naturalIndex: "99.5%",
        purity: "99.8%",
        lead: "Holistic self-care products designed with therapeutic-grade essential oils to enhance physiological and mental wellness."
    },
    luxury: {
        title: "Luxury & Premium Cosmetics",
        description: "Gold-infused face oils, peptide essences, diamond-dust illuminating lotions, and luxury anti-aging cremes.",
        actives: ["24K Gold", "Copper Peptides", "Squalane"],
        naturalIndex: "94.2%",
        purity: "99.9%",
        lead: "Haute-couture cosmetics using suspended 24K gold flakes and high-purity active complexes for instant cell renewal."
    },
    makeup: {
        title: "Color Cosmetics / Makeup",
        description: "Mineral powder foundations, hydrating lipsticks, waterproof mascaras, and liquid highlighters.",
        actives: ["Iron Oxides", "Jojoba Esters", "Vitamin E"],
        naturalIndex: "93.5%",
        purity: "99.0%",
        lead: "Highly saturated mineral pigments encapsulated in organic protective shields to prevent skin irritation."
    },
    fragrance: {
        title: "Fragrance & Perfume Products",
        description: "Fine perfumery eaux de parfum, clean fragrance mists, and essential oil roll-ons.",
        actives: ["Grasse Essential Oils", "Organic Ethanol"],
        naturalIndex: "91.0%",
        purity: "99.9%",
        lead: "Masterfully curated fragrance pyramids featuring top-grade natural absolutes sourced from Grasse and Milan."
    },
    nailcare: {
        title: "Nail Care & Nail Polish",
        description: "Breathable nail polishes, nourishing cuticle oils, and strengthening nail treatments.",
        actives: ["Keratin", "Vitamin E", "Sweet Almond Oil"],
        naturalIndex: "85.0%",
        purity: "98.5%",
        lead: "Cruelty-free, 10-free nail formulations that offer long-lasting pigmentation without toxic solvents."
    },
    cosmeceutical: {
        title: "Cosmeceutical Products",
        description: "Salicylic acid peels, stable retinol treatments, and Vitamin C hyperpigmentation serums.",
        actives: ["Salicylic Acid", "Vitamin C", "Retinol"],
        naturalIndex: "90.0%",
        purity: "99.9%",
        lead: "High-efficacy, medical-grade treatments specifically formulated for clinical dermatological networks."
    },
    vegan: {
        title: "Vegan & Clean Label",
        description: "Plant-derived collagen boosters, sulfate-free cleansers, and organic fruit acid serums.",
        actives: ["Plant Collagen", "Bakuchiol", "Fruit AHA"],
        naturalIndex: "99.9%",
        purity: "99.7%",
        lead: "Ecocert and COSMOS compliant products utilizing purely plant-based replacements for animal-derived ingredients."
    },
    spaprofessional: {
        title: "Spa & Salon Professional",
        description: "Massage massage creams, chemical peeling kits, professional hair serums, and bulk wrap clays.",
        actives: ["Kaolin Clay", "Hyaluronic Acid", "Argan Oil"],
        naturalIndex: "96.0%",
        purity: "99.5%",
        lead: "Concentrated bulk formulas designed for professional aesthetic applications and salon treatments."
    }
};

const servicePillars = [
    {
        id: 'pillar-rd',
        title: 'R&D & Formulation Laboratory',
        icon: '🔬',
        services: ['tab-rd', 'tab-stability', 'tab-ingredient', 'tab-innovative']
    },
    {
        id: 'pillar-engineering',
        title: 'Industrial Engineering & Setup',
        icon: '🏗️',
        services: ['tab-factory', 'tab-turnkey', 'tab-mfg', 'tab-scaleup']
    },
    {
        id: 'pillar-regulatory',
        title: 'Regulatory & Quality Audits',
        icon: '📋',
        services: ['tab-regulatory', 'tab-export']
    },
    {
        id: 'pillar-business',
        title: 'Brand, DPR & Business Advisory',
        icon: '💼',
        services: ['tab-privatelabel', 'tab-dpr', 'tab-recruitment', 'tab-packaging', 'tab-gtm']
    }
];

const servicesData = {
    'tab-rd': {
        id: 'tab-rd',
        title: 'Cosmetic Research & Product Development',
        pillar: 'pillar-rd',
        description: 'Our laboratory represents the gold standard in cosmetic compounding, combining phytomedicinal science and advanced peptide technology for skin, hair, body, and premium color cosmetics.',
        checklist: [
            'Bespoke formulation development for skin, hair, body, and color cosmetics',
            'Custom prototype bench batches shipped for touch-feel calibration',
            'Biochemical synergy analysis for optimal ingredient bio-availability',
            'Re-formulating legacy products to match modern clean beauty standards'
        ],
        metricVal: '2,400+',
        metricLbl: 'Stable Formulas Logged',
        image: cosmeticRdLabImg
    },
    'tab-stability': {
        id: 'tab-stability',
        title: 'Stability Testing & Shelf-Life Support',
        pillar: 'pillar-rd',
        description: 'Rigorous stability evaluations, compatibility reviews, and shelf-life monitoring under controlled climate conditions to ensure formulation integrity.',
        checklist: [
            'Accelerated stability testing under high heat and humidity cycles',
            'Container-product compatibility testing (preventing migration & cracking)',
            'Real-time shelf-life evaluations and degradation mapping',
            'pH, viscosity, and sensory parameter drift tracking'
        ],
        metricVal: '100%',
        metricLbl: 'Stability Verification',
        image: blogSkincareScienceImg
    },
    'tab-ingredient': {
        id: 'tab-ingredient',
        title: 'Ingredient Sourcing',
        pillar: 'pillar-rd',
        description: 'Connecting brands with premium, standardized botanical extracts, active peptides, and natural organic raw compounds from certified global supply chains.',
        checklist: [
            'Procurement of dermatologically validated active ingredients',
            'Sourcing certified organic, vegan, and sustainable herbal extracts',
            'Vetting raw material suppliers for purity and quality certification',
            'Negotiating competitive raw material pricing through global contracts'
        ],
        metricVal: '99.8%',
        metricLbl: 'Raw Material Purity',
        image: botanicalIngredientsImg
    },
    'tab-innovative': {
        id: 'tab-innovative',
        title: 'Innovative Productivity Developments',
        pillar: 'pillar-rd',
        description: 'Pioneering next-generation productivity frameworks that fuse advanced biotechnology, AI-assisted formulation intelligence, and lean laboratory workflows to accelerate product-to-market timelines and maximize output efficiency across every stage of the R&D lifecycle.',
        checklist: [
            'AI-driven formulation screening to predict optimal ingredient synergies 10× faster',
            'High-throughput automated batch testing systems for rapid prototype iteration',
            'Lean R&D workflow redesign to eliminate bottlenecks and reduce development cycles',
            'Digital twin laboratory modelling for virtual stress-testing before physical trials',
            'Cross-functional innovation sprints bridging formulation science with market demand',
            'KPI dashboards and real-time R&D analytics for continuous performance benchmarking'
        ],
        metricVal: '10×',
        metricLbl: 'Faster Development Cycles',
        image: cosmeticRdLabImg
    },
    'tab-factory': {
        id: 'tab-factory',
        title: 'Plant Setup & Factory Planning',
        pillar: 'pillar-engineering',
        description: 'Strategic layout design, HEPA HVAC cleanroom plans, and process pipe engineering for high-output, certified cosmetic production plants.',
        checklist: [
            'Factory floorplan layout design matching WHO-GMP guidelines',
            'ISO Class 7 and Class 8 cleanroom design with contamination control',
            'Utility planning including purified water systems and clean steam lines',
            'Optimized workflow routing to prevent cross-contamination'
        ],
        metricVal: 'ISO 7',
        metricLbl: 'Cleanroom Design Spec',
        image: skincareFactoryImg
    },
    'tab-turnkey': {
        id: 'tab-turnkey',
        title: 'Turnkey Cosmetic Project Solutions',
        pillar: 'pillar-engineering',
        description: 'End-to-end execution of Greenfield manufacturing installations, municipal approvals, and commercial trial batches overseen by project engineers.',
        checklist: [
            'Complete project oversight from site selection to commercial validation',
            'Coordination with architects, construction teams, and machinery vendors',
            'Supervising equipment installation and pipeline pressure testing',
            'Compounding initial trial batches on commercial scale reactors'
        ],
        metricVal: '100%',
        metricLbl: 'Hassle-Free Execution',
        image: portfolioEssenceHaircareImg
    },
    'tab-mfg': {
        id: 'tab-mfg',
        title: 'Cosmetic Manufacturing Consulting',
        pillar: 'pillar-engineering',
        description: 'Optimizing production workflows, upgrading vacuum mixing machinery, and establishing rigorous GMP quality control protocols.',
        checklist: [
            'Optimizing batch mixing workflows and reducing cycle times',
            'Procurement auditing of vacuum emulsifiers and filling lines',
            'GMP, ISO 22716, and CDSCO audit readiness assessments',
            'Drafting Standard Operating Procedures (SOPs) for plant floor staff'
        ],
        metricVal: 'GMP',
        metricLbl: 'Auditable Design Code',
        image: skincareFactoryImg
    },
    'tab-scaleup': {
        id: 'tab-scaleup',
        title: 'Scale-Up & Commercialization Support',
        pillar: 'pillar-engineering',
        description: 'Successfully scaling formulations from 1-liter laboratory beakers to high-yield 2,000-liter commercial reactors with zero loss of texture or active stability.',
        checklist: [
            'Compounding intermediate pilot batches (50L to 100L)',
            'Designing heating/cooling profiles and rotor-stator shear rates',
            'Validating full commercial batch uniformity and active dispersion',
            'Optimizing formulas to minimize product adhesion inside mixing tanks'
        ],
        metricVal: '2,000L',
        metricLbl: 'Max Reactor Scaling',
        image: catalogFeaturedSerumImg
    },
    'tab-regulatory': {
        id: 'tab-regulatory',
        title: 'Regulatory & Compliance Support',
        pillar: 'pillar-regulatory',
        description: 'Comprehensive dossier compilation and registration filings with US FDA, European Union CPNP, India BIS, and other global regulatory boards.',
        checklist: [
            'FDA registration and MoCRA listing support',
            'EU CPNP notifications and Responsible Person (RP) coordination',
            'CDSCO manufacturing and import licensing documentation',
            'Product Information File (PIF) authoring and safety assessments'
        ],
        metricVal: '15+',
        metricLbl: 'Global Markets Covered',
        image: blogComplianceInsightsImg
    },
    'tab-export': {
        id: 'tab-export',
        title: 'Export Documentation Support',
        pillar: 'pillar-regulatory',
        description: 'Preparing customs clearance files, shipping safety logs, and compliant international labels for border crossings.',
        checklist: [
            'Compiling Certificate of Free Sale (CFS) and Certificates of Analysis (COA)',
            'Generating MSDS/SDS sheets matching destination country systems',
            'Reviewing international package labeling and multi-language disclosures',
            'Handling customs clearance inquiries and compliance verification files'
        ],
        metricVal: '100%',
        metricLbl: 'Export Customs Clearances',
        image: blogComplianceInsightsImg
    },
    'tab-privatelabel': {
        id: 'tab-privatelabel',
        title: 'Private Label & Contract Manufacturing Support',
        pillar: 'pillar-business',
        description: 'Vetting and partnering your cosmetic brand with the ideal contract manufacturer (OEM/ODM) to ensure price optimization and superior quality control.',
        checklist: [
            'Identifying third-party manufacturers that match quality profiles',
            'Auditing OEM/ODM facilities for GMP compliance and capacities',
            'Negotiating production cost-of-goods (COGS) and minimum order quantities',
            'Overseeing quality assurance during the initial commercial runs'
        ],
        metricVal: '30+',
        metricLbl: 'OEM/ODM Plants Vetted',
        image: founderPortraitImg
    },
    'tab-dpr': {
        id: 'tab-dpr',
        title: 'Cosmetic DPR & Business Consulting',
        pillar: 'pillar-business',
        description: 'Drafting Detailed Project Reports (DPR) detailing bankable financial projections, CapEx/OpEx models, and feasibility studies.',
        checklist: [
            'Drafting Detailed Project Reports (DPR) for bank financing',
            'Formulating CapEx models for land, machinery, and utilities',
            'Calculating OpEx forecasts, payback periods, and ROI timelines',
            'Conducting regional market feasibility and competitor studies'
        ],
        metricVal: '100+',
        metricLbl: 'DPRs Successfully Compiled',
        image: catalogFeaturedSerumImg
    },
    'tab-recruitment': {
        id: 'tab-recruitment',
        title: 'Technical Recruitment & Team Building Support',
        pillar: 'pillar-business',
        description: 'Sourcing, screening, and interviewing key scientific personnel, plant managers, and certified laboratory chemists.',
        checklist: [
            'Hiring senior cosmetic chemists and formulation scientists',
            'Sourcing plant operators, batch mixers, and cleanroom leads',
            'Conducting rigorous technical competency interviews',
            'Setting up standard operating training programs for hired teams'
        ],
        metricVal: '150+',
        metricLbl: 'Specialists Recruited',
        image: founderPortraitImg
    },
    'tab-packaging': {
        id: 'tab-packaging',
        title: 'Packaging Development & Sourcing',
        pillar: 'pillar-business',
        description: 'Aesthetics meet sustainability. Sourcing airless pumps, luxury glass jars, and certified post-consumer recycled (PCR) containers.',
        checklist: [
            'Custom packaging design coordination and shape selection',
            'Sourcing luxury airless pumps, jars, tubes, and droppers',
            'Eco-friendly PCR (Post-Consumer Recycled) packaging alternatives',
            'Vetting supplier factory testing data for leakage and compatibility'
        ],
        metricVal: 'Eco-Premium',
        metricLbl: 'Design Standards',
        image: catalogFeaturedSerumImg
    },
    'tab-gtm': {
        id: 'tab-gtm',
        title: 'Branding & Go-To-Market Consulting',
        pillar: 'pillar-business',
        description: 'Creating high-impact market entry strategies, brand positioning guidelines, and online ecommerce launch schedules.',
        checklist: [
            'Defining brand identity, luxury positioning, and messaging grids',
            'Developing launch-day campaigns and initial inventory volumes',
            'Conducting market entry audits and target audience testing',
            'Providing ecommerce strategy and distribution channel optimization'
        ],
        metricVal: '50+',
        metricLbl: 'Brands Launched',
        image: catalogFeaturedSerumImg
    }
};

export default function App() {
    // Blog category filter state
    const [blogCategory, setBlogCategory] = useState('ALL');
    const blogCategories = ['ALL', 'INGREDIENT RESEARCH', 'PLANT SETUP', 'REGULATORY', 'MARKET INSIGHTS', 'PACKAGING TRENDS', 'GLOBAL BEAUTY'];

    const allBlogPosts = [
        { img: 'botanical', date: 'MAY 20, 2026', cat: 'INGREDIENT RESEARCH', title: 'The Ascent of Bio-Fermented Active Lipids in Skincare', desc: 'How sustainable fermentation technologies are replacing heavy synthetic chemical oils, offering deep epidermal absorption.' },
        { img: 'skincare', date: 'APRIL 14, 2026', cat: 'PLANT SETUP', title: 'Designing Cleanrooms to Pass ISO 22716 GMP Audits', desc: 'Critical HVAC zoning planning, differential pressure calculations, and anti-static flooring layouts.' },
        { img: 'compliance', date: 'MARCH 02, 2026', cat: 'REGULATORY', title: 'Unlocking FDA MoCRA: Core Adjustments for Cosmetic Exporters', desc: 'An in-depth regulatory guide explaining facility listing requirements, adverse event tracking, and ingredient safety clearances.' },
        { img: 'haircare', date: 'FEBRUARY 18, 2026', cat: 'MARKET INSIGHTS', title: 'Scaling D2C Brand Margins and Funding Key Cost Structures', desc: 'Key cost structures, contract manufacturing choices, and packaging compromises to maintain healthy margins for high-growth beauty brands.' },
        { img: 'factory', date: 'JANUARY 25, 2026', cat: 'PACKAGING TRENDS', title: 'Glass vs. Biodegradable Bamboo Cosmetic Structures', desc: 'Analyzing durability, chemical compatibility, and consumer eco-perceptions in primary cosmetic packaging selection.' },
        { img: 'rd', date: 'DECEMBER 10, 2025', cat: 'GLOBAL BEAUTY', title: 'Ayurvedic Formulations in EU/US Markets', desc: 'Bridging phytochemistry with clinical registration to successfully export proprietary herbal blends to western markets.' },
    ];

    // ---------------------------------------------------------
    // 1. STATE CONFIGURATIONS & ROUTING
    // ---------------------------------------------------------
    const [activePage, setActivePage] = useState('#home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Product category selector
    const [activeCategory, setActiveCategory] = useState('skin');
    const [activeCatalogCat, setActiveCatalogCat] = useState('skincare');

    // Interactive view state details
    const [srvTab, setSrvTab] = useState('tab-rd');
    const [activePillar, setActivePillar] = useState('pillar-rd');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    const srvTabsList = [
        'tab-rd', 'tab-mfg', 'tab-factory', 'tab-turnkey', 'tab-privatelabel',
        'tab-regulatory', 'tab-dpr', 'tab-recruitment', 'tab-packaging',
        'tab-ingredient', 'tab-gtm', 'tab-scaleup', 'tab-stability', 'tab-export', 'tab-innovative'
    ];

    const serviceToPillarMap = {
        'tab-rd': 'pillar-rd',
        'tab-stability': 'pillar-rd',
        'tab-ingredient': 'pillar-rd',
        'tab-innovative': 'pillar-rd',
        'tab-factory': 'pillar-engineering',
        'tab-turnkey': 'pillar-engineering',
        'tab-mfg': 'pillar-engineering',
        'tab-scaleup': 'pillar-engineering',
        'tab-regulatory': 'pillar-regulatory',
        'tab-export': 'pillar-regulatory',
        'tab-privatelabel': 'pillar-business',
        'tab-dpr': 'pillar-business',
        'tab-recruitment': 'pillar-business',
        'tab-packaging': 'pillar-business',
        'tab-gtm': 'pillar-business'
    };

    useEffect(() => {
        const matchingPillar = serviceToPillarMap[srvTab];
        if (matchingPillar) {
            setActivePillar(matchingPillar);
        }
    }, [srvTab]);

    const handleTabClick = (tabId, event) => {
        if (event) event.preventDefault();
        setSrvTab(tabId);
    };

    const handlePillarClick = (pillarId) => {
        setActivePillar(pillarId);
        // Auto-select first service of the pillar
        if (pillarId === 'pillar-rd') setSrvTab('tab-rd');
        else if (pillarId === 'pillar-engineering') setSrvTab('tab-factory');
        else if (pillarId === 'pillar-regulatory') setSrvTab('tab-regulatory');
        else if (pillarId === 'pillar-business') setSrvTab('tab-privatelabel');
    };

    const [blueprintCap, setBlueprintCap] = useState('boutique');
    const [testimonialIdx, setTestimonialIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Dynamic calculators & Forms
    const [evalOrigin, setEvalOrigin] = useState('india');
    const [evalDest, setEvalDest] = useState('usa');
    const [evalResults, setEvalResults] = useState(null);
    const [careersModal, setCareersModal] = useState(false);
    const [careersJob, setCareersJob] = useState('');
    const [careersSuccess, setCareersSuccess] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);

    // Formulation Lab dynamic states (defaults)
    const [formMix, setFormMix] = useState({
        niacinamide: 2.0,
        retinol: 0.0,
        vitc: 0.0,
        hyaluronic: 1.5,
        herbal: 5.0
    });
    const [synergyReport, setSynergyReport] = useState({
        score: 95,
        verdict: 'Excellent Synergy Rating',
        status: 'Highly Bio-Available',
        stability: '99.2% (Pre-Validated)',
        viscosity: '450 cPs (Liquid Serum)',
        notes: 'This recipe establishes a highly cohesive dermal hydration grid. Safe for high-frequency daily routines.'
    });

    // Custom Luxury Cursor position tracker
    const [cursorHovering, setCursorHovering] = useState(false);

    // Global Lenis smooth scroll setup
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        window.lenis = lenis;

        return () => {
            lenis.destroy();
            gsap.ticker.remove(raf);
            window.lenis = null;
        };
    }, []);

    // Trigger ScrollTrigger refresh after active page finishes transition
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1100);
        return () => clearTimeout(timer);
    }, [activePage]);

    // ---------------------------------------------------------
    // 2. LUXURY CURSOR & HEADER ANIMATION HOOKS
    // ---------------------------------------------------------
    useEffect(() => {
        // Header scrolled trigger
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Resize trigger
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Magnetic snaps listener to pull elements & custom cursor
    useEffect(() => {
        const selectAllMagnetic = () => document.querySelectorAll('.nav-link, .btn-luxury-header, .srv-pillar-btn, .srv-list-item, .btn-luxury, .menu-toggle-btn, [data-magnetic]');
        
        const handleMagneticMove = (e) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull the actual HTML element towards the cursor (magnetic pull)
            gsap.to(el, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.3,
                overwrite: "auto",
                ease: "power2.out"
            });
        };
        
        const handleMagneticLeave = (e) => {
            const el = e.currentTarget;
            // Snappy spring-back layout restore
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                overwrite: "auto",
                ease: "elastic.out(1.1, 0.4)"
            });
        };

        const setupMagneticListeners = () => {
            const elements = selectAllMagnetic();
            elements.forEach(el => {
                el.addEventListener('mousemove', handleMagneticMove);
                el.addEventListener('mouseleave', handleMagneticLeave);
            });
        };

        setupMagneticListeners();
        const timer = setTimeout(setupMagneticListeners, 1000);

        return () => {
            clearTimeout(timer);
            const elements = selectAllMagnetic();
            elements.forEach(el => {
                el.removeEventListener('mousemove', handleMagneticMove);
                el.removeEventListener('mouseleave', handleMagneticLeave);
            });
        };
    }, [activePage]);

    // ---------------------------------------------------------
    // 3. SPA ROUTING ENGINE (CURTAIN PANEL ANIMATION)
    // ---------------------------------------------------------
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash || '#home';
            setIsTransitioning(true);

            setTimeout(() => {
                setActivePage(hash);
                window.scrollTo({ top: 0, behavior: 'instant' });
                window.lenis?.scrollTo(0, { immediate: true });
                setMenuOpen(false);
            }, 500); // Wipe midway

            setTimeout(() => {
                setIsTransitioning(false);
            }, 1000);
        };

        window.addEventListener('hashchange', handleHashChange);
        // Trigger on load if hash is present
        if (window.location.hash) {
            handleHashChange();
        }

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Interactive services autoplay controller and scroll bindings removed for direct tab control

    // Helper to toggle logo and page resets
    const handleLogoClick = (e) => {
        if (window.location.hash === '#home' || window.location.hash === '') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Helper to map links highlighting and sways
    const triggerCursorState = (state) => {
        setCursorHovering(state);
    };

    // ---------------------------------------------------------
    // 4. NESTJS BACKEND API INTEGRATIONS
    // ---------------------------------------------------------
    
    // 4.1 Formulation Compound mixer evaluator
    const handleSliderChange = (ingredient, value) => {
        const updatedMix = { ...formMix, [ingredient]: value };
        setFormMix(updatedMix);

        // Shift active category to custom visual parameters
        setActiveCategory('custom');

        // Post formula weights to NestJS REST service
        fetch('http://localhost:3000/api/formulations/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMix)
        })
        .then(res => res.json())
        .then(data => {
            // Update biochemical metrics
            setSynergyReport({
                score: data.score,
                verdict: data.verdict,
                status: data.status,
                stability: data.stability,
                viscosity: data.viscosity,
                notes: data.notes
            });
            // Update WebGL color state
            setCustomLiquidColor(data.color);
            setCustomLiquidViscosity(data.viscosityValue);
        })
        .catch(err => {
            console.warn("NestJS API fallback applied.", err);
            // Fallback chemical calculations local logic
            let synergy = 95;
            let verdict = 'Excellent Synergy Rating';
            let color = '#FAF9F6'; // Default White Pearl
            
            if (updatedMix.retinol > 0 && updatedMix.vitc > 0) {
                synergy = 40;
                verdict = 'Chemical Conflict Detected';
                color = '#f8dc96';
            } else if (updatedMix.retinol > 1.5 && updatedMix.herbal < 3.0) {
                synergy = 68;
                verdict = 'Skin Irritation Risk';
                color = '#fcefc2';
            } else if (updatedMix.herbal > 0) {
                color = '#d1ebd0'; // Light Green base
            }
            
            setSynergyReport(prev => ({
                ...prev,
                score: synergy,
                verdict: verdict,
                status: synergy < 50 ? 'Acidic Conflict' : 'Highly Bio-Available'
            }));
            setCustomLiquidColor(color);
        });
    };

    // 4.2 Contact Consult submissions
    const handleContactSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: e.target['c-name'].value,
            email: e.target['c-email'].value,
            company: e.target['c-company'].value,
            interest: e.target['c-interest'].value,
            message: e.target['c-message'].value
        };

        fetch('http://localhost:3000/api/contacts/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setContactSuccess(true);
            }
        })
        .catch(() => {
            // Local fallback success
            setContactSuccess(true);
        });
    };

    // 4.3 Careers CV submissions
    const handleCareersSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: e.target['job-name'].value,
            email: e.target['job-email'].value,
            jobTitle: careersJob
        };

        fetch('http://localhost:3000/api/careers/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setCareersSuccess(true);
                setTimeout(() => {
                    setCareersModal(false);
                    setCareersSuccess(false);
                }, 3000);
            }
        })
        .catch(() => {
            setCareersSuccess(true);
            setTimeout(() => {
                setCareersModal(false);
                setCareersSuccess(false);
            }, 3000);
        });
    };

    // 4.4 Global compliance calculator checks
    const runComplianceCheck = () => {
        fetch(`http://localhost:3000/api/compliance/eval?origin=${evalOrigin}&dest=${evalDest}`)
        .then(res => res.json())
        .then(data => {
            setEvalResults(data.requirements);
        })
        .catch(() => {
            // Fallback requirements list based on destination
            if (evalDest === 'usa') {
                setEvalResults([
                    "Acquire regional FDA drug licensing registrations & MoCRA listings",
                    "Ensure SDS safety certificates and toxicological reports are compiled",
                    "Verify standard packaging units comply with US FDA labelling guidelines"
                ]);
            } else if (evalDest === 'eu') {
                setEvalResults([
                    "Register formulations on the European Union CPNP portal",
                    "Appoint an EU Responsible Person (RP) to hold the Product Information File (PIF)",
                    "Provide toxicological safety assessments signed by an EU-certified safety assessor"
                ]);
            } else if (evalDest === 'me') {
                setEvalResults([
                    "Obtain Saudi Food and Drug Authority (SFDA) e-Cosmetic clearance",
                    "Secure Halal certifications for animal-derived raw active ingredients",
                    "Provide Certificate of Free Sale (CFS) from the country of origin"
                ]);
            } else if (evalDest === 'in') {
                setEvalResults([
                    "Acquire CDSCO manufacturer/import registration license",
                    "Verify that packaging lists BIS compliance standards (IS 6608)",
                    "Verify heavy metal testing records and microbiological clearance indices"
                ]);
            } else if (evalDest === 'africa') {
                setEvalResults([
                    "Acquire regional drug licensing registrations (e.g., KEBS for Kenya, NAFDAC for Nigeria)",
                    "Secure Certificate of Conformity (CoC) via pre-export verification of conformity (PVoC)",
                    "Ensure SDS safety certificates are compiled",
                    "Verify standard packaging units comply with destination ports"
                ]);
            } else {
                setEvalResults([
                    "Acquire regional drug licensing registrations",
                    "Ensure SDS safety certificates are compiled",
                    "Verify standard packaging units comply with destination ports"
                ]);
            }
        });
    };

    // ---------------------------------------------------------
    // 5. TESTIMONIAL CYCLER
    // ---------------------------------------------------------
    const testimonials = [
        {
            text: "EGC Ekora Global Consulting revolutionized our product launch timeline. Their formulation chemists solved a stability issue in our SPF moisturizer that three other chemical labs failed to resolve. Absolute professionals.",
            name: "Sophia Sterling",
            meta: "Founder, Sterling Organics (D2C Skincare)"
        },
        {
            text: "We contracted EGC Ekora Global Consulting to design our automated skincare manufacturing plant in Mumbai. They guided us through the equipment procurement, BIS registration, and cleanroom HVAC setup. The plant passed GMP audit on the first try.",
            name: "Vikram Malhotra",
            meta: "Director of Manufacturing, Dermatech India"
        }
    ];

    // Scroll reveal observer loop inside React
    useEffect(() => {
        const elements = document.querySelectorAll('.section-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, { threshold: 0.12 });

        elements.forEach(el => {
            el.classList.add('reveal-prepare');
            observer.observe(el);
        });

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, [activePage]);

    return (
        <div className={cursorHovering ? 'hovering' : ''}>

            {/* Category 9: Luxury Ambient Mesh Backgrounds & Noise Texture */}
            <div className="luxury-noise-overlay"></div>
            <div className="luxury-ambient-bg">
                <div className="mesh-gradient-1"></div>
                <div className="mesh-gradient-2"></div>
                <div className="mesh-gradient-3"></div>
            </div>

            {/* SPA Curtain Wiping Screen Overlay */}
            <div className={`page-transition-overlay ${isTransitioning ? 'animating' : ''}`}>
                <div className="transition-bar"></div>
                <div className="transition-bar"></div>
                <div className="transition-bar"></div>
            </div>

            {/* Premium Header Nav Bar */}
            <header className={`luxury-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <a href="#home" className="brand-logo" onClick={handleLogoClick}
                       onMouseEnter={() => triggerCursorState(true)}
                       onMouseLeave={() => triggerCursorState(false)}>
                        <img src={logoBlackImg} alt="EGC Ekora Global Consulting Logo" className="header-logo-img" />
                    </a>
                    
                    <nav className="desktop-nav">
                        <a href="#about" className="nav-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>About</a>
                        <a href="#services" className="nav-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Services</a>
                        <a href="#products" className="nav-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Product Expertise</a>
                        <a href="#innovation" className="nav-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>R&D Lab</a>
                        <a href="#portfolio" className="nav-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Portfolio</a>
                        <a href="#contact" className="nav-link btn-luxury-header" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Get Consultation</a>
                    </nav>

                    <button className="menu-toggle-btn" 
                            onClick={() => setMenuOpen(!menuOpen)}
                            onMouseEnter={() => triggerCursorState(true)} 
                            onMouseLeave={() => triggerCursorState(false)}>
                        <span className="menu-text">{menuOpen ? 'CLOSE' : 'INDEX'}</span>
                        <div className="menu-hamburger">
                            <span className="bar" style={{ transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : '' }}></span>
                            <span className="bar" style={{ transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : '', width: menuOpen ? '100%' : '' }}></span>
                        </div>
                    </button>
                </div>
            </header>

            {/* Fullscreen Multi-Page Navigation Drawer */}
            <div className={`navigation-drawer ${menuOpen ? 'open' : ''}`}>
                <div className="drawer-bg-glow"></div>
                <div className="drawer-container">
                    <div className="drawer-left">
                        <div className="drawer-brand-snapshot">
                            <img src={logoWhiteImg} alt="EGC Ekora Global Consulting Logo" className="drawer-logo-img" />
                            <h4 style={{ color: 'var(--color-gold)', letterSpacing: '0.15em', fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '10px' }}>EGC EKORA GLOBAL CONSULTING</h4>
                            <p>Pioneering scientific excellence and haute-couture formulation design for global cosmetics.</p>
                        </div>
                        <div className="drawer-quick-stats">
                            <div className="stat-item">
                                <span class="stat-num">350+</span>
                                <span class="stat-lbl">Formulations Launched</span>
                            </div>
                            <div className="stat-item">
                                <span class="stat-num">40+</span>
                                <span class="stat-lbl">Turnkey Plants Built</span>
                            </div>
                        </div>
                    </div>
                    <div className="drawer-right">
                        <span className="drawer-section-label">DIRECTORY</span>
                        <nav className="drawer-nav">
                            <ul>
                                <li><a href="#home" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">01</span> Home</a></li>
                                <li><a href="#about" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">02</span> About Us</a></li>
                                <li><a href="#services" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">03</span> Services</a></li>
                                <li><a href="#products" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">04</span> Product Expertise</a></li>
                                <li><a href="#industries" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">05</span> Industries We Serve</a></li>
                                <li><a href="#global" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">06</span> Global Markets</a></li>
                                <li><a href="#portfolio" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">07</span> Projects & Portfolio</a></li>
                                <li><a href="#innovation" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">08</span> R&D Innovation</a></li>
                                <li><a href="#certifications" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">09</span> Compliance & Certs</a></li>
                                <li><a href="#blog" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">10</span> Insights / Blog</a></li>
                                <li><a href="#careers" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">11</span> Careers</a></li>
                                <li><a href="#faq" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">12</span> FAQ</a></li>
                                <li><a href="#contact" className="drawer-link" onClick={() => setMenuOpen(false)} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}><span className="num">13</span> Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>



            {/* Dynamic Pages viewport container */}
            <div id="content-container">

                {/* ========================================== */}
                {/* VIEW: HOME PAGE                            */}
                {/* ========================================== */}
                <section id="view-home" className={`page-view ${activePage === '#home' ? 'active animate-in' : ''}`}>
                    
                    {/* SECTION 1: Hero Banner */}
                    <div className="hero-banner section-reveal">
                        <img src={heroBannerImg} alt="Premium cosmetic products in a laboratory setting" className="hero-bg-image" />
                        <div className="hero-bg-overlay"></div>
                        <div className="hero-text-lock">
                            <span className="hero-eyebrow">THE SCIENCE OF LUXURY BEAUTY</span>
                            <h1 className="hero-title font-playfair hero-title-animated">
                                <span className="hero-line" style={{ animationDelay: '0.1s' }}>Engineering</span>
                                <br />
                                <span className="hero-line title-italic italic text-gold" style={{ animationDelay: '0.35s' }}>Excellence</span>
                                <br />
                                <span className="hero-line" style={{ animationDelay: '0.6s' }}>In Every Drop</span>
                            </h1>
                            <p className="hero-lead font-poppins" style={{ animationDelay: '0.85s' }}>
                                We design award-winning cosmetic formulations, plan state-of-the-art automated production factories, and guide high-growth D2C brands from concept to global distribution.
                            </p>
                            <div className="hero-cta-group" style={{ animationDelay: '1.1s' }}>
                                <a href="#services" className="btn-primary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Explore Services</a>
                                <a href="#innovation" className="btn-secondary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Enter R&D Lab</a>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: About Snapshots */}
                    <div className="company-snapshot section-reveal section-padding">
                        <div className="grid-2col">
                            <div className="snapshot-left">
                                <span className="section-label">EGC AT A GLANCE</span>
                                <h2 className="section-title font-playfair">Pioneering cosmetic technology & factory architecture.</h2>
                                <p className="snapshot-story">Founded by cosmetic scientists and cleanroom engineering pioneers, EGC Ekora Global Consulting bridges the gap between boutique chemical breakthroughs and high-volume, GMP-compliant robotic manufacturing. We don't just formulate cosmetics; we engineer the futures of beauty empires.</p>
                            </div>
                            <div className="snapshot-right">
                                <div className="luxury-quote">
                                    <span className="quote-mark">“</span>
                                    <p className="quote-text font-playfair italic">"A cosmetic product is the perfect harmony of biochemical precision, aesthetic luxury, and logistical scalability."</p>
                                    <span className="quote-author">— Dr. Elizabeth Vance, Founder & Chief Chemist</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Services grid teasers */}
                    <div className="services-overview section-padding theme-dark">
                        <div className="section-header-centered">
                            <span className="section-label text-gold">OUR CAPABILITIES</span>
                            <h2 className="section-title font-playfair text-white">Full-Scale Cosmetic Advisory</h2>
                            <p className="section-subtitle">We manage your product lifecycle from laboratory test tubes to fully optimized high-output packaging lines.</p>
                        </div>

                        <div className="services-grid-main">
                            <div className="service-teaser-card section-reveal">
                                <div className="card-num">01</div>
                                <h3>Cosmetic R&D & Formulation</h3>
                                <p>Bespoke formulation development with complete compatibility, stability, and accelerated shelf-life studies.</p>
                                <a href="#services" className="card-link" onClick={() => setSrvTab('tab-rd')} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Read Scope &rarr;</a>
                            </div>
                            <div className="service-teaser-card section-reveal">
                                <div className="card-num">02</div>
                                <h3>Plant Setup & Factory Planning</h3>
                                <p>Cleanroom planning, ISO/GMP floor-plan zoning, robotic machinery selection, and HVAC utility calculations.</p>
                                <a href="#services" className="card-link" onClick={() => setSrvTab('tab-factory')} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Read Scope &rarr;</a>
                            </div>
                            <div className="service-teaser-card section-reveal">
                                <div className="card-num">03</div>
                                <h3>Turnkey Project Solutions</h3>
                                <p>Complete project oversight from greenfield factory construction to standard operating procedure (SOP) validations.</p>
                                <a href="#services" className="card-link" onClick={() => setSrvTab('tab-turnkey')} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Read Scope &rarr;</a>
                            </div>
                            <div className="service-teaser-card section-reveal">
                                <div className="card-num">04</div>
                                <h3>Regulatory, BIS & FDA Compliance</h3>
                                <p>Comprehensive regulatory strategy, dossier filings, safety assessments, and product licensing clearances.</p>
                                <a href="#services" className="card-link" onClick={() => setSrvTab('tab-regulatory')} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Read Scope &rarr;</a>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 4: Product showcase */}
                    <div className="product-showcase section-padding">
                        <div className="grid-2col align-center">
                            <div className="showcase-content">
                                <span className="section-label">PRODUCT EXPERTISE</span>
                                <h2 className="section-title font-playfair">Formulation Mastery Across Categories</h2>
                                <p>Our formulation laboratory has engineered thousands of proprietary formulations. Click on a category to interactively load the product profile in our 3D Visualizer.</p>
                                
                                <div className="product-interactive-selector">
                                    <button className={`prod-selector-btn ${activeCategory === 'skin' ? 'active' : ''}`}
                                            onClick={() => setActiveCategory('skin')}
                                            onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Skincare</button>
                                    <button className={`prod-selector-btn ${activeCategory === 'hair' ? 'active' : ''}`}
                                            onClick={() => setActiveCategory('hair')}
                                            onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Haircare</button>
                                    <button className={`prod-selector-btn ${activeCategory === 'body' ? 'active' : ''}`}
                                            onClick={() => setActiveCategory('body')}
                                            onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Bodycare</button>
                                    <button className={`prod-selector-btn ${activeCategory === 'luxury' ? 'active' : ''}`}
                                            onClick={() => setActiveCategory('luxury')}
                                            onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Luxury & Premium</button>
                                    <button className={`prod-selector-btn ${activeCategory === 'makeup' ? 'active' : ''}`}
                                            onClick={() => setActiveCategory('makeup')}
                                            onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Color Cosmetics</button>
                                </div>
                                <a href="#products" className="btn-text-arrow" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>View Complete Product Catalog &rarr;</a>
                            </div>
                            <div className="showcase-visual-reference">
                                <div className="interactive-instruction-card" style={{ background: 'var(--color-gray-light)', padding: '30px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <span className="card-title" style={{ marginBottom: '10px' }}>Formulation Specs</span>
                                    <div className="metric-row" style={{ fontSize: '12px', marginBottom: '8px' }}>
                                        <span>Active Purity:</span>
                                        <strong>{activeCategory === 'luxury' ? '99.9%' : '99.8%'}</strong>
                                    </div>
                                    <div className="metric-row" style={{ fontSize: '12px', marginBottom: '8px' }}>
                                        <span>Natural Index:</span>
                                        <strong>{activeCategory === 'hair' ? '99.1%' : '96.5%'}</strong>
                                    </div>
                                    <p id="category-description-mock" style={{ fontSize: '11.5px', marginTop: '10px', lineHeight: '1.5' }}>
                                        {activeCategory === 'skin' && 'Our clinical-grade skincare formulas utilize bio-fermented active compounds and multi-weight acids.'}
                                        {activeCategory === 'hair' && 'Engineered using oil infusion extraction of organic Rosemary, Biotin, and Keratin chains.'}
                                        {activeCategory === 'body' && 'Micro-algae extracts and Seaweed enzymes blended inside clean oil-in-water emulsions.'}
                                        {activeCategory === 'luxury' && 'Suspended 24-Karat Gold flakes inside crystalline peptide essences. Radiance treatments.'}
                                        {activeCategory === 'makeup' && 'Highly saturated mineral color grids encapsulated in organic jojoba oil shields.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Industries We Serve */}
                    <div className="industries-serve section-padding theme-dark-cool">
                        <div className="section-header-centered">
                            <span className="section-label text-gold">INDUSTRIES WE SERVE</span>
                            <h2 className="section-title font-playfair text-white">Empowering Global Beauty Operators</h2>
                        </div>
                        <div className="industries-marquee-container">
                            <div className="marquee-track">
                                <div className="marquee-item"><span>D2C Beauty Brands</span></div>
                                <div className="marquee-item"><span>Dermatology Groups</span></div>
                                <div className="marquee-item"><span>Wellness & Ayurveda Brands</span></div>
                                <div className="marquee-item"><span>Spa & Salon Chains</span></div>
                                <div className="marquee-item"><span>Ecommerce Brands</span></div>
                                <div className="marquee-item"><span>Pharmaceutical Conglomerates</span></div>
                                <div className="marquee-item"><span>Luxury Retail Chains</span></div>
                                {/* Duplicated set for seamless looping */}
                                <div className="marquee-item"><span>D2C Beauty Brands</span></div>
                                <div className="marquee-item"><span>Dermatology Groups</span></div>
                                <div className="marquee-item"><span>Wellness & Ayurveda Brands</span></div>
                                <div className="marquee-item"><span>Spa & Salon Chains</span></div>
                                <div className="marquee-item"><span>Ecommerce Brands</span></div>
                                <div className="marquee-item"><span>Pharmaceutical Conglomerates</span></div>
                                <div className="marquee-item"><span>Luxury Retail Chains</span></div>
                            </div>
                        </div>
                        <div className="read-more-center">
                            <a href="#industries" className="btn-secondary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Explore Industry Solutions</a>
                        </div>
                    </div>

                    {/* SECTION 6: Global Presence */}
                    <div className="global-presence section-padding">
                        <div className="grid-2col align-center">
                            <div className="map-illustration">
                                <svg className="map-vector" viewBox="0 0 1000 500" fill="none">
                                    {/* Continents */}
                                    <g fill="#E5E3DF" opacity="0.6">
                                        {/* North America */}
                                        <path d="M 80,100 C 90,80 120,60 160,60 C 180,60 210,50 250,55 C 270,58 310,65 330,85 C 340,95 320,130 300,155 C 290,170 280,180 270,210 C 265,225 255,250 245,260 C 235,270 220,240 225,220 C 228,210 235,190 220,180 C 200,165 180,165 150,175 C 130,180 120,170 110,150 C 100,135 75,120 80,100 Z" />
                                        {/* Greenland */}
                                        <path d="M 310,35 C 330,30 365,30 375,40 C 385,50 380,70 360,75 C 345,78 320,70 310,55 C 305,48 305,38 310,35 Z" />
                                        {/* South America */}
                                        <path d="M 245,260 C 255,265 270,270 280,290 C 295,320 315,350 320,380 C 322,410 300,450 290,480 C 285,490 278,490 275,480 C 265,430 245,370 235,340 C 225,310 215,290 225,275 C 230,265 240,258 245,260 Z" />
                                        {/* Africa */}
                                        <path d="M 450,210 C 470,200 500,195 530,200 C 560,205 580,225 595,250 C 605,270 600,300 585,330 C 570,360 550,390 535,420 C 525,435 515,435 510,420 C 500,390 475,340 460,310 C 450,290 440,270 440,250 C 440,230 440,215 450,210 Z" />
                                        {/* Europe & Asia */}
                                        <path d="M 410,160 C 410,140 420,120 435,115 C 450,110 465,115 480,110 C 495,105 510,120 520,135 C 540,115 570,100 620,95 C 670,90 730,95 780,95 C 830,95 870,105 890,125 C 910,145 915,175 895,205 C 875,235 850,260 835,280 C 820,300 805,310 790,295 C 780,285 785,270 770,260 C 755,250 740,255 725,255 C 710,255 695,245 680,255 C 665,265 650,275 635,260 C 620,245 600,250 585,240 C 570,230 550,235 535,225 C 520,215 515,200 520,135 Z" />
                                        {/* India */}
                                        <path d="M 635,260 C 640,275 645,290 655,305 C 665,320 670,320 675,305 C 680,290 682,275 680,255 Z" />
                                        {/* Australia */}
                                        <path d="M 780,340 C 800,335 830,340 850,355 C 865,370 870,390 855,415 C 840,435 810,440 790,430 C 770,420 765,395 765,370 C 765,355 770,345 780,340 Z" />
                                        {/* Great Britain */}
                                        <path d="M 405,100 C 410,95 418,100 415,110 C 412,120 405,115 405,100 Z" />
                                        {/* Japan */}
                                        <path d="M 905,150 C 910,145 915,160 912,175 C 908,190 900,185 905,150 Z" />
                                    </g>

                                    {/* Connecting lines */}
                                    <g stroke="#C5A880" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.8">
                                        <path d="M 500 200 C 400 150, 300 120, 200 140" />
                                        <path d="M 500 200 C 420 250, 340 300, 280 340" />
                                        <path d="M 500 200 C 560 240, 620 280, 660 300" />
                                        <path d="M 500 200 C 620 180, 720 180, 820 200" />
                                        <path d="M 500 200 C 640 280, 740 340, 810 400" />
                                    </g>

                                    {/* Hub locator points with pulsing effect */}
                                    <circle cx="500" cy="200" r="8" fill="#111" />
                                    <circle cx="500" cy="200" r="14" fill="none" stroke="#C5A880" strokeWidth="1" className="pulse-circle" />

                                    {/* Client distribution pins */}
                                    <circle cx="200" cy="140" r="5" fill="#C5A880" />
                                    <circle cx="280" cy="340" r="5" fill="#C5A880" />
                                    <circle cx="660" cy="300" r="5" fill="#C5A880" />
                                    <circle cx="820" cy="200" r="5" fill="#C5A880" />
                                    <circle cx="810" cy="400" r="5" fill="#C5A880" />

                                    {/* Regional Labels */}
                                    <g fontSize="10" fontFamily="Inter, sans-serif" fill="#1A1A1A" fontWeight="500" letterSpacing="0.05em">
                                        <text x="200" y="125" textAnchor="middle">FDA (North America)</text>
                                        <text x="500" y="175" textAnchor="middle" fontWeight="bold">CPNP (Europe Hub)</text>
                                        <text x="660" y="322" textAnchor="middle">{"CDSCO & BIS (India)"}</text>
                                        <text x="820" y="220" textAnchor="middle">APAC Markets</text>
                                        <text x="280" y="362" textAnchor="middle">LATAM Registration</text>
                                    </g>
                                </svg>
                            </div>
                            <div className="presence-content">
                                <span className="section-label">GLOBAL DISTRIBUTION</span>
                                <h2 className="section-title font-playfair">Global Regulatory Compliance</h2>
                                <p>Expanding your brand internationally requires navigating dense regulatory environments. EGC Ekora Global Consulting provides comprehensive product registration dossiers for seamless entry into major global markets.</p>
                                <ul className="luxury-list">
                                    <li><strong>North America:</strong> FDA Modernization Act (MoCRA) compliance.</li>
                                    <li><strong>Europe:</strong> Cosmetic Product Notification Portal (CPNP) documentation.</li>
                                    <li><strong>India:</strong> CDSCO & BIS registrations.</li>
                                </ul>
                                <a href="#global" className="btn-text-arrow" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Explore Global Markets &rarr;</a>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 7: Formulation Lab Teaser */}
                    <div className="innovation-sandbox-teaser section-padding theme-dark">
                        <div className="grid-2col align-center">
                            <div className="sandbox-teaser-left">
                                <span className="section-label text-gold">R&D INNOVATION</span>
                                <h2 className="section-title font-playfair text-white">Interactive Formulation Lab</h2>
                                <p>Welcome to our scientific playground. Customize active ingredients in real time to compound custom target formulas, analyze biochemical synergy, and watch the 3D serum bottle adapt to your recipe.</p>
                                <a href="#innovation" className="btn-primary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Launch Formulation Simulator</a>
                            </div>
                            <div className="sandbox-interactive-preview" style={{ width: '100%' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
                                    <div className="lab-widget-card" style={{ margin: 0, maxWidth: 'none', width: 'auto' }}>
                                        <span className="widget-header">Ingredients Mixer</span>
                                        <div className="ingredient-mixing-sliders">
                                            <div className="slider-control">
                                                <label>Retinol: <span>{formMix.retinol}%</span></label>
                                                <input type="range" className="ing-slider" min="0" max="2.5" step="0.1" value={formMix.retinol}
                                                       onChange={(e) => handleSliderChange('retinol', parseFloat(e.target.value))} />
                                            </div>
                                            <div className="slider-control">
                                                <label>Hyaluronic Acid: <span>{formMix.hyaluronic}%</span></label>
                                                <input type="range" className="ing-slider" min="0.5" max="5.0" step="0.1" value={formMix.hyaluronic}
                                                       onChange={(e) => handleSliderChange('hyaluronic', parseFloat(e.target.value))} />
                                            </div>
                                            <div className="slider-control">
                                                <label>Niacinamide: <span>{formMix.niacinamide}%</span></label>
                                                <input type="range" className="ing-slider" min="0.0" max="10.0" step="0.5" value={formMix.niacinamide}
                                                       onChange={(e) => handleSliderChange('niacinamide', parseFloat(e.target.value))} />
                                            </div>
                                        </div>
                                        <div className="synergy-status">
                                            <span>Synergy Index:</span>
                                            <strong className="text-gold">{synergyReport.score}%</strong>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 8: Why Choose Us */}
                    <div className="why-choose-us section-padding">
                        <div className="section-header-centered">
                            <span className="section-label">EGC DISTINCTIVES</span>
                            <h2 className="section-title font-playfair">Why Leading Cosmetic Brands Partner with EGC</h2>
                        </div>
                        <div className="grid-3col">
                            <div className="value-block">
                                <span className="val-num font-playfair">01 /</span>
                                <h3>Scientific Purity</h3>
                                <p>We work exclusively with certified raw material suppliers, incorporating patented green-chemistry actives and sustainable organic carriers.</p>
                            </div>
                            <div className="value-block">
                                <span class="val-num font-playfair">02 /</span>
                                <h3>Robotic Engineering</h3>
                                <p>Our plant setups prioritize cleanroom robotic packaging, closed-vacuum homogenizing vessels, and complete batch automation to reduce human error.</p>
                            </div>
                            <div className="value-block">
                                <span class="val-num font-playfair">03 /</span>
                                <h3>Turnkey Deliverables</h3>
                                <p>We don't hand over a stack of documents. We stand by you during test-batch validation, equipment trials, and official compliance audits.</p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 9: Blueprint Factory planning */}
                    <div className="plant-expertise-blueprint section-padding theme-dark-cool">
                        <div className="grid-2col align-center">
                            <div className="blueprint-content">
                                <span className="section-label text-gold">FACTORY SETUP PLANNING</span>
                                <h2 className="section-title font-playfair text-white">State-of-the-Art Factory Blueprinting</h2>
                                <p>Designing a cosmetic manufacturing facility requires critical compliance zoning to pass GMP and ISO certifications. We plan layouts that maximize space efficiency, optimize material flow, and establish pristine cleanroom air handling.</p>
                                
                                <div className="interactive-blueprint-selector">
                                    <div className={`blueprint-option ${blueprintCap === 'boutique' ? 'active' : ''}`}
                                         onClick={() => setBlueprintCap('boutique')}
                                         onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>
                                        <h4>Boutique R&D Plant</h4>
                                        <p>Capacity: 5k - 10k bottles/day. Optimized for small batches.</p>
                                    </div>
                                    <div className={`blueprint-option ${blueprintCap === 'industrial' ? 'active' : ''}`}
                                         onClick={() => setBlueprintCap('industrial')}
                                         onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>
                                        <h4>Global Industrial Plant</h4>
                                        <p>Capacity: 50k - 100k bottles/day. Full robotic automation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="blueprint-visual">
                                <div className="blueprint-canvas-wrapper">
                                    <span className="blueprint-header-tag">ISO CLASS 7 CLEANROOM BLUEPRINT</span>
                                    <div className="blueprint-schematic-grid">
                                        {blueprintCap === 'boutique' ? (
                                            <>
                                                <div className="blueprint-room zoning-weighing"><span>Weighing Bay</span></div>
                                                <div className="blueprint-room zoning-mixing"><span>Mixing Tank</span></div>
                                                <div className="blueprint-room zoning-filling"><span>Filling Station</span></div>
                                                <div className="blueprint-room zoning-qa"><span>QA Bench</span></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="blueprint-room zoning-weighing" style={{ gridRow: 'span 2' }}><span>Robotic Weighing Hub</span></div>
                                                <div className="blueprint-room zoning-mixing"><span>2000L Homogenizer</span></div>
                                                <div className="blueprint-room zoning-filling"><span>Robotic Capping Station</span></div>
                                                <div className="blueprint-room zoning-qa"><span>Chromatography Unit</span></div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 9: Manufacturing & Plant Expertise */}
                    <div className="mfg-expertise-section section-padding">
                        <div className="section-header-centered">
                            <span className="section-label">MANUFACTURING EXPERTISE</span>
                            <h2 className="section-title font-playfair">State-of-the-Art Plant Engineering</h2>
                            <p className="section-subtitle">We design, commission, and validate cosmetic factories built to international GMP and ISO standards — from boutique R&D units to large-scale industrial lines.</p>
                        </div>
                        <div className="mfg-stats-bar">
                            <div className="mfg-stat">
                                <span className="mfg-stat-num font-playfair">40+</span>
                                <span className="mfg-stat-lbl">Turnkey Plants Commissioned</span>
                            </div>
                            <div className="mfg-stat">
                                <span className="mfg-stat-num font-playfair">ISO 7</span>
                                <span className="mfg-stat-lbl">Cleanroom Class Designs</span>
                            </div>
                            <div className="mfg-stat">
                                <span className="mfg-stat-num font-playfair">2,000L</span>
                                <span className="mfg-stat-lbl">Max Commercial Reactor Scale</span>
                            </div>
                            <div className="mfg-stat">
                                <span className="mfg-stat-num font-playfair">100%</span>
                                <span className="mfg-stat-lbl">First-Pass GMP Audit Success</span>
                            </div>
                        </div>
                        <div className="mfg-capability-grid">
                            <div className="mfg-cap-card section-reveal">
                                <div className="mfg-cap-icon">🏗️</div>
                                <h4>Factory Layout Design</h4>
                                <p>WHO-GMP compliant floor-plan zoning, cleanroom air-flow calculations, and material flow routing to prevent cross-contamination.</p>
                            </div>
                            <div className="mfg-cap-card section-reveal">
                                <div className="mfg-cap-icon">⚙️</div>
                                <h4>Equipment Selection</h4>
                                <p>Vacuum homogenizers, high-speed filling lines, capping machines, and robotic inspection systems — sourced from verified global vendors.</p>
                            </div>
                            <div className="mfg-cap-card section-reveal">
                                <div className="mfg-cap-icon">🔬</div>
                                <h4>Utility & Clean Room Planning</h4>
                                <p>Purified water (PW) systems, clean steam lines, HEPA air handling units, and environmental monitoring for ISO Class 7 & 8 cleanrooms.</p>
                            </div>
                            <div className="mfg-cap-card section-reveal">
                                <div className="mfg-cap-icon">📋</div>
                                <h4>Production Line Validation</h4>
                                <p>IQ/OQ/PQ validation protocols, SOP documentation, batch record templates, and GMP audit readiness assessments.</p>
                            </div>
                        </div>
                        <div className="read-more-center">
                            <a href="#services" className="btn-secondary" onClick={() => setSrvTab('tab-factory')} onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>View Plant Setup Services →</a>
                        </div>
                    </div>

                    {/* SECTION 10: Client Testimonials */}
                    <div className="testimonials section-padding">
                        <div className="section-header-centered">
                            <span className="section-label">PARTNER VOICES</span>
                            <h2 className="section-title font-playfair">Success Stories in Beauty Science</h2>
                        </div>
                        <div className="testimonial-slider-container">
                            <div className="testimonial-slide active">
                                <p className="testimonial-text font-playfair">"{testimonials[testimonialIdx].text}"</p>
                                <div className="testimonial-profile">
                                    <div className={`avatar-mock ${testimonialIdx === 0 ? 'avatar-rose' : 'avatar-charcoal'}`}></div>
                                    <div className="profile-details">
                                        <span className="profile-name">{testimonials[testimonialIdx].name}</span>
                                        <span className="profile-meta">{testimonials[testimonialIdx].meta}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slider-controls">
                            <button className="slider-btn" onClick={() => setTestimonialIdx(testimonialIdx === 0 ? 1 : 0)}>&larr;</button>
                            <button className="slider-btn" onClick={() => setTestimonialIdx(testimonialIdx === 1 ? 0 : 1)}>&rarr;</button>
                        </div>
                    </div>

                    {/* SECTION 11: Certs Marquee */}
                    <div className="certifications-marquee">
                        <div className="cert-marquee-inner">
                            <span>ISO 22716 GMP Certified</span>
                            <span className="dot">&bull;</span>
                            <span>FDA Registered Facility Designs</span>
                            <span class="dot">&bull;</span>
                            <span>CDSCO Licensed Plants</span>
                            <span class="dot">&bull;</span>
                            <span>Cruelty-Free (PETA) Formulations</span>
                            <span class="dot">&bull;</span>
                            <span>BIS Standard Formulations</span>
                        </div>
                    </div>

                    {/* SECTION 12: CTA Quick Connect */}
                    <div className="contact-quick-cta section-padding theme-dark">
                        <div className="grid-2col align-center">
                            <div className="cta-text">
                                <h2 className="font-playfair text-white">Begin Your Formulation & Manufacturing Blueprint Today</h2>
                                <p>Book a strategic session with our chemical engineers and factory planners. We'll map out your project cost estimations, ingredient requirements, and custom launch milestones.</p>
                            </div>
                            <div className="cta-actions">
                                <a href="#contact" className="btn-primary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Schedule Advisory Call</a>
                            </div>
                        </div>
                    </div>

                </section>

                {/* ========================================== */}
                {/* VIEW: ABOUT US                             */}
                {/* ========================================== */}
                <section id="view-about" className={`page-view ${activePage === '#about' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">ESTABLISHED 2014</span>
                        <h1 className="subpage-title font-playfair">About Ekora Global Consulting</h1>
                    </div>
                    
                    <div className="section-padding">
                        <div className="grid-2col">
                            <div>
                                <h3>Company Overview</h3>
                                <p className="lead-p">Ekora Global Consulting (EGC) was founded to revolutionize cosmetic product launch lifecycles. We combine top-tier pharmaceutical-grade chemical research with automated robotics and industrial cleanroom layout design.</p>
                                <p>We maintain an advanced laboratory dedicated to ingredient research, green-chemistry surfactant design, and premium anti-aging skincare technologies. Today, EGC serves as the key technical partner for major skincare conglomerates, emerging D2C brands, and dermatological clinical networks across five continents.</p>
                            </div>
                            <div className="mission-vision-box">
                                <div className="box-inner">
                                    <h4>Our Vision</h4>
                                    <p>To lead the global harmonization of cosmetic products, bringing safety, purity, and carbon-neutral green chemistry to modern skincare compounding.</p>
                                    
                                    <h4>Our Mission</h4>
                                    <p>To empower beauty entrepreneurs by providing complete engineering blueprints, scientific compliance clearance, and certified formulation development.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="founders-message grid-2col align-center">
                            <div className="founder-img-container">
                                <div className="founder-img-mock" style={{ backgroundImage: `url(${founderPortraitImg})`, backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat' }}></div>
                                <span className="founder-caption">Dr. Elizabeth Vance, Founder & Chief Chemist</span>
                            </div>
                            <div className="founder-text">
                                <span className="section-label">FOUNDER'S MESSAGE</span>
                                <h2 className="font-playfair">Pioneering Safe & Sustainable Beauty Science</h2>
                                <p>“When we launched our first laboratory room, the cosmetics industry was heavily reliant on basic petroleum-derived oils and unstable chemical stabilizers. We set out to prove that plant-derived, bio-fermented lipids and clean green emulsifiers could perform equally well, if not better, while preserving our environment.</p>
                                <p>Today, our engineering team manages complete factory project executions, while our R&D chemists integrate deep AI trend analysis and functional beauty research. We look forward to creating your next groundbreaking beauty line.”</p>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="core-values">
                            <h3 className="section-title text-center font-playfair">Our Core Architectural Values</h3>
                            <div className="grid-4col">
                                <div className="value-card">
                                    <span className="val-num font-playfair">01</span>
                                    <h4>Purity & Safety</h4>
                                    <p>Every raw ingredient undergoes complete HPLC chemical purity screening and microbiological clearance.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">02</span>
                                    <h4>Engineering Precision</h4>
                                    <p>We design factories to minimize waste, utilizing predictive automation, and clean solar-thermal power loops.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">03</span>
                                    <h4>Regulatory Integrity</h4>
                                    <p>We guarantee 100% transparency in safety compliance, export regulatory filings, and labeling disclosures.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">04</span>
                                    <h4>Bespoke Excellence</h4>
                                    <p>Every brand has its own fingerprint. We design customized product lines reflecting your brand narrative.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="about-expertise">
                            <h3 className="section-title text-center font-playfair">Our Specialized Expertise</h3>
                            <p className="text-center section-subtitle">Merging clinical chemistry with luxury brand narratives.</p>
                            <div className="grid-2col" style={{ gap: '30px', marginTop: '40px' }}>
                                <div className="expertise-block">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Cosmetic Chemistry & Emulsion Science</h4>
                                    <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>Our formulation scientists specialize in advanced oil-in-water and water-in-oil emulsions, lipid nanoparticles, and liquid crystal structures that optimize the delivery of active compounds deep into the skin.</p>
                                </div>
                                <div className="expertise-block">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Phyto-Medicinal Extractions</h4>
                                    <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>We bridge ancient Ayurvedic knowledge with modern chromatography. Our lab conducts molecular fractionation of active botanicals, preserving their biological efficacy in clean, stable carriers.</p>
                                </div>
                                <div className="expertise-block">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Peptide Synthesis & Cell Research</h4>
                                    <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>From bio-identical copper peptides to customized anti-aging amino grids, we synthesize compounds targeting collagen synthesis and cell renewal, validated by third-party clinical dermatologists.</p>
                                </div>
                                <div className="expertise-block">
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Regulatory Navigation</h4>
                                    <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary)', lineHeight: '1.7' }}>We guide your brand through the dense global regulatory landscape, preparing dossiers for FDA MoCRA, EU CPNP notifications, Saudi Arabia SFDA, and Bureau of Indian Standards (BIS) certifications.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="about-infrastructure">
                            <div className="grid-2col align-center">
                                <div className="infrastructure-text">
                                    <span className="section-label">INFRASTRUCTURE & CAPABILITIES</span>
                                    <h2 className="font-playfair">State-of-the-Art Formulation Facilities</h2>
                                    <p style={{ marginBottom: '25px', fontSize: '14.5px', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>Our facilities are engineered to match international standards of pharmaceutical precision, bridging the gap between small-scale bench compounding and large-scale industrial runs.</p>
                                    <ul className="luxury-list">
                                        <li><strong>Analytical R&D Lab:</strong> Equipped with HPLC, UV-Vis spectrophotometers, viscometers, and stability chambers.</li>
                                        <li><strong>GMP Cleanrooms:</strong> ISO Class 7 and Class 8 cleanrooms with automated pressure cascades and HEPA filtration.</li>
                                        <li><strong>High-Capacity Homogenizers:</strong> Vacuum-sealed mixing vessels from 5L pilot systems to 2000L commercial production reactors.</li>
                                    </ul>
                                </div>
                                <div className="infrastructure-image-mock" style={{ minHeight: '350px', backgroundColor: 'var(--color-gray-light)', borderRadius: '4px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '35px', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.01)' }}>
                                    <div className="stat-highlight" style={{ fontSize: '56px', fontWeight: '700', color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>ISO 7</div>
                                    <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-obsidian)', fontWeight: '600', marginTop: '10px' }}>Cleanroom Class Certification</span>
                                    <p className="text-center" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '15px', lineHeight: '1.7' }}>Our cleanrooms are continually monitored for airborne particulate count and micro-humidity balance to assure pristine batch quality.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="about-global-network">
                            <h3 className="section-title text-center font-playfair">Global Support Network</h3>
                            <p className="text-center section-subtitle">Connecting formulation science and logistics across five continents.</p>
                            <div className="grid-4col" style={{ gap: '20px', marginTop: '40px' }}>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-obsidian)', marginBottom: '5px' }}>BKC Mumbai, India</h5>
                                    <span className="network-role" style={{ display: 'block', fontSize: '11px', color: 'var(--color-gold)', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '12px' }}>Headquarters & R&D Hub</span>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Principal formulation compounding, plant design, and client coordination offices.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-obsidian)', marginBottom: '5px' }}>New Jersey, USA</h5>
                                    <span className="network-role" style={{ display: 'block', fontSize: '11px', color: 'var(--color-gold)', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '12px' }}>Regulatory & Quality Hub</span>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>FDA MoCRA compliance filings, US agent representation, and North American distribution advisory.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-obsidian)', marginBottom: '5px' }}>Milan & Grasse, EU</h5>
                                    <span className="network-role" style={{ display: 'block', fontSize: '11px', color: 'var(--color-gold)', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '12px' }}>Packaging & Sourcing Hub</span>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Partnering with premium European glass blowers, custom pump designers, and perfume compounders.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--color-obsidian)', marginBottom: '5px' }}>Nairobi, Kenya</h5>
                                    <span className="network-role" style={{ display: 'block', fontSize: '11px', color: 'var(--color-gold)', fontWeight: '600', letterSpacing: '0.05em', marginBottom: '12px' }}>Emerging Markets Hub</span>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Consulting on regional product registration, export documentation, and formulation adaptation.</p>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        <div className="about-why-choose" style={{ paddingBottom: '20px' }}>
                            <h3 className="section-title text-center font-playfair">Why Partner With EGC?</h3>
                            <p className="text-center section-subtitle">Establishing new standards of reliability in cosmetic engineering.</p>
                            <div className="grid-3col" style={{ gap: '30px', marginTop: '40px' }}>
                                <div className="value-block">
                                    <span className="val-num font-playfair">01 /</span>
                                    <h3>Zero-Failure Validation</h3>
                                    <p>Every product formulation is subjected to extreme thermal stresses and container compatibility checks to guarantee a flawless shelf life.</p>
                                </div>
                                <div className="value-block">
                                    <span className="val-num font-playfair">02 /</span>
                                    <h3>Turnkey Engineering</h3>
                                    <p>From architectural drafts and cleanroom validation to raw ingredient supply chains and equipment procurement, we own the complexity.</p>
                                </div>
                                <div className="value-block">
                                    <span className="val-num font-playfair">03 /</span>
                                    <h3>Sustainable & Clean Ethos</h3>
                                    <p>We formulate strictly with bio-degradable surfactants, skin-friendly preservation systems, and support carbon-neutral factory setups.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: SERVICES                             */}
                {/* ========================================== */}
                <section id="view-services" className={`page-view ${activePage === '#services' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">OUR CAPABILITIES</span>
                        <h1 className="subpage-title font-playfair" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.15em' }}>
                            <span className="srv-title-left">Consulting</span>
                            <span className="srv-title-center text-gold">&amp;</span>
                            <span className="srv-title-right">Turnkey Solutions</span>
                        </h1>
                        <div className="srv-title-line" style={{ transform: 'scaleX(1)', opacity: 1 }}></div>
                    </div>

                    <div className="srv-dashboard-container">
                        {/* 1. Pillar Selection Tabs */}
                        <div className="srv-pillars-tabs">
                            {servicePillars.map((p) => (
                                <button
                                    key={p.id}
                                    className={`srv-pillar-btn ${activePillar === p.id ? 'active' : ''}`}
                                    onClick={() => handlePillarClick(p.id)}
                                >
                                    <span className="srv-pillar-icon">{p.icon}</span>
                                    <span className="srv-pillar-title">{p.title}</span>
                                    <span className="srv-pillar-underline"></span>
                                </button>
                            ))}
                        </div>

                        {/* 2. Desktop Dashboard Layout */}
                        <div className="srv-desktop-layout">
                            {/* Left Column: Interactive Service List */}
                            <div className="srv-list-col">
                                {servicePillars.find(p => p.id === activePillar)?.services.map((serviceId, index) => {
                                    const service = servicesData[serviceId];
                                    return (
                                        <button
                                            key={serviceId}
                                            className={`srv-list-item ${srvTab === serviceId ? 'active' : ''}`}
                                            onClick={(e) => handleTabClick(serviceId, e)}
                                        >
                                            <span className="srv-item-num">{(index + 1).toString().padStart(2, '0')}</span>
                                            <span className="srv-item-title">{service.title}</span>
                                            <span className="srv-item-arrow">&rarr;</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Column: Selected Service Details Card */}
                            <div className="srv-details-col">
                                {servicesData[srvTab] && (
                                    <div className="srv-details-card glassmorphic shadow-premium">
                                        <div className="srv-details-img-wrap">
                                            <img
                                                src={servicesData[srvTab].image}
                                                alt={servicesData[srvTab].title}
                                                className="srv-details-img"
                                            />
                                            <div className="srv-details-stat-box">
                                                <span className="srv-stat-num">{servicesData[srvTab].metricVal}</span>
                                                <span className="srv-stat-lbl">{servicesData[srvTab].metricLbl}</span>
                                            </div>
                                        </div>
                                        <div className="srv-details-info">
                                            <span className="srv-details-badge">
                                                {servicePillars.find(p => p.id === servicesData[srvTab].pillar)?.title}
                                            </span>
                                            <h3>{servicesData[srvTab].title}</h3>
                                            <p className="srv-details-desc">{servicesData[srvTab].description}</p>
                                            
                                            <h4 className="srv-details-sub-header">Scope of Services:</h4>
                                            <ul className="srv-details-checklist">
                                                {servicesData[srvTab].checklist.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>

                                            <div className="srv-details-cta">
                                                <a href="#contact" className="btn-primary" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>
                                                    Get Consultation
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Mobile/Tablet Layout (Accordion Stack) */}
                        <div className="srv-mobile-layout">
                            {servicePillars.map((pillar) => (
                                <div key={pillar.id} className="srv-mobile-pillar-group">
                                    <h3 className="srv-mobile-pillar-heading">
                                        {pillar.icon} {pillar.title}
                                    </h3>
                                    <div className="srv-mobile-accordion-stack">
                                        {pillar.services.map((serviceId) => {
                                            const service = servicesData[serviceId];
                                            const isOpen = srvTab === serviceId;
                                            return (
                                                <div
                                                    key={serviceId}
                                                    className={`srv-mobile-accordion-item ${isOpen ? 'open' : ''}`}
                                                >
                                                    <button
                                                        className="srv-mobile-accordion-header"
                                                        onClick={() => setSrvTab(isOpen ? '' : serviceId)}
                                                    >
                                                        <span className="srv-accordion-title">{service.title}</span>
                                                        <span className="srv-accordion-icon">{isOpen ? '−' : '+'}</span>
                                                    </button>
                                                    
                                                    {isOpen && (
                                                        <div className="srv-mobile-accordion-content">
                                                            <div className="srv-accordion-img-wrap">
                                                                <img src={service.image} alt={service.title} className="srv-accordion-img" />
                                                                <div className="srv-accordion-stat">
                                                                    <strong>{service.metricVal}</strong>: {service.metricLbl}
                                                                </div>
                                                            </div>
                                                            <p className="srv-accordion-desc">{service.description}</p>
                                                            <ul className="srv-accordion-checklist">
                                                                {service.checklist.map((item, idx) => (
                                                                    <li key={idx}>{item}</li>
                                                                ))}
                                                            </ul>
                                                            <div className="srv-accordion-cta">
                                                                <a href="#contact" className="btn-primary">
                                                                    Get Consultation
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HORIZON X — Axis-Split Scroll Animation */}
                    <HorizonXAnimation isActive={activePage === '#services'} />

                </section>

                {/* ========================================== */}
                {/* VIEW: PRODUCT EXPERTISE                     */}
                {/* ========================================== */}
                <section id="view-products" className={`page-view ${activePage === '#products' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">FORMULATION CATALOGUE</span>
                        <h1 className="subpage-title font-playfair">Product Capabilities</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col">
                            <div className="catalog-categories-list">
                                {Object.keys(catalogCategories).map((key) => {
                                    const cat = catalogCategories[key];
                                    return (
                                        <div 
                                            key={key} 
                                            className={`catalog-cat-block ${activeCatalogCat === key ? 'active' : ''}`}
                                            onClick={() => setActiveCatalogCat(key)}
                                        >
                                            <h3>{cat.title}</h3>
                                            <p>{cat.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="catalog-featured-showcase">
                                <div className="featured-catalog-card">
                                    <span className="card-eyebrow">FEATURED HIGHLIGHT</span>
                                    <h4>{catalogCategories[activeCatalogCat]?.title}</h4>
                                    <p>{catalogCategories[activeCatalogCat]?.lead}</p>
                                    <div className="fluid-properties-indicator">
                                        <span className="prop-tag">Purity: {catalogCategories[activeCatalogCat]?.purity}</span>
                                        <span className="prop-tag">Natural: {catalogCategories[activeCatalogCat]?.naturalIndex}</span>
                                        {catalogCategories[activeCatalogCat]?.actives.map((act, i) => (
                                            <span key={i} className="prop-tag">{act}</span>
                                        ))}
                                    </div>
                                    <div className="catalog-img-container">
                                        <div className="catalog-img-mock" style={{ backgroundImage: `url(${catalogFeaturedSerumImg})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '260px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: INDUSTRIES WE SERVE                  */}
                {/* ========================================== */}
                <section id="view-industries" className={`page-view ${activePage === '#industries' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">OUR PARTNER SEGMENTS</span>
                        <h1 class="subpage-title font-playfair">Industries We Serve</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-4col" style={{ gap: '30px' }}>
                            <div className="industry-detail-card">
                                <h3>D2C & Startup Beauty Brands</h3>
                                <p>We provide rapid prototyping, flexible small-batch scaling, custom ingredient stories, and packaging coordination to help you launch within months.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Dermatology Networks</h3>
                                <p>Clinical-grade, pH-balanced cosmeceuticals with high active concentrations (Niacinamide, Retinol, Salicylic Acid) verified by lab chromatography.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Pharmaceutical Companies</h3>
                                <p>We build production facilities matching Schedule M GMP guidelines, featuring absolute sterile cleanrooms and automatic process data logging.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Wellness & Ayurveda Brands</h3>
                                <p>Authentic herbal and organic proprietary formulations utilizing standardized phyto-actives, cold-pressed oils, and traditional extraction methods matching global standards.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Spa & Salon Chains</h3>
                                <p>High-performance professional facial kits, salon-grade hair systems, therapeutic body wraps, and custom spa collections designed for targeted aesthetic results.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Ecommerce Beauty Brands</h3>
                                <p>Optimized formulation and turnkey production solutions designed for rapid market entry, high margins, and seamless supply chain integration.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Retail Chains</h3>
                                <p>Compliant, high-volume manufacturing solutions for cosmetic lines, offering cost-efficient bulk production, standard packaging options, and consistent shelf stability.</p>
                            </div>
                            <div className="industry-detail-card">
                                <h3>Hotel Amenities Brands</h3>
                                <p>Luxury guest wellness collections, including premium miniature hair care, gentle skin cleansers, and custom-scented body lotions, utilizing sustainable materials.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: GLOBAL MARKETS                       */}
                {/* ========================================== */}
                <section id="view-global" className={`page-view ${activePage === '#global' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">WORLDWIDE EXPORTS</span>
                        <h1 className="subpage-title font-playfair">Global Markets & Standards</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col">
                            <div>
                                <h3>Export Compliance & Advisory</h3>
                                <p className="lead-p">Exporting cosmetics requires careful planning. We provide regulatory consulting and packaging redesigns to meet various international laws.</p>
                                <p>Our export consulting services assist in acquiring necessary certificates such as Free Sale Certificates, Certificate of Analysis (COA), Safety Data Sheets (SDS/MSDS), BSE-free declarations, and international labeling clearance.</p>
                            </div>
                            <div className="export-calculator-container">
                                <div className="luxury-card shadow-premium">
                                    <h3>Export Compliance Evaluator</h3>
                                    <p>Select your manufacturing target and destination region to check regulatory requirements instantly.</p>
                                    
                                    <div className="form-group">
                                        <label>Manufacturing Origin:</label>
                                        <select className="luxury-input" value={evalOrigin} onChange={(e) => setEvalOrigin(e.target.value)}>
                                            <option value="india">India</option>
                                            <option value="europe">Europe</option>
                                            <option value="asia">Southeast Asia</option>
                                            <option value="africa">Africa</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Destination Market:</label>
                                        <select className="luxury-input" value={evalDest} onChange={(e) => setEvalDest(e.target.value)}>
                                            <option value="usa">United States (FDA)</option>
                                            <option value="eu">European Union (CPNP)</option>
                                            <option value="me">Middle East (SFDA)</option>
                                            <option value="in">India (CDSCO)</option>
                                            <option value="africa">Africa (KEBS/NAFDAC)</option>
                                        </select>
                                    </div>
                                    <button type="button" className="btn-primary w-100" onClick={runComplianceCheck}>Evaluate Compliance Checklist</button>
                                    
                                    {evalResults && (
                                        <div className="eval-results">
                                            <h4>Requirements Detected:</h4>
                                            <ul className="luxury-list">
                                                {evalResults.map((r, i) => <li key={i}>{r}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />

                        {/* Region Cards */}
                        <div className="global-regions-section">
                            <h3 className="section-title text-center font-playfair" style={{ marginBottom: '15px' }}>Markets We Operate In</h3>
                            <p className="text-center section-subtitle" style={{ marginBottom: '50px' }}>Regulatory guidance, product registration, and compliance filing for six major global regions.</p>
                            <div className="global-regions-grid">
                                <div className="region-card">
                                    <div className="region-flag">🇮🇳</div>
                                    <h4>India</h4>
                                    <span className="region-authority">CDSCO &amp; BIS</span>
                                    <p>Manufacturing licence, import permits, BIS IS 6608 labelling compliance, and Schedule M GMP plant validation.</p>
                                    <ul className="region-checklist">
                                        <li>CDSCO Manufacturing Licence</li>
                                        <li>BIS Label Compliance (IS 6608)</li>
                                        <li>Heavy Metal Testing</li>
                                        <li>Microbiological Clearance</li>
                                    </ul>
                                </div>
                                <div className="region-card">
                                    <div className="region-flag">🇸🇦</div>
                                    <h4>Middle East</h4>
                                    <span className="region-authority">SFDA &amp; GCC</span>
                                    <p>Saudi SFDA e-Cosmetic clearance, Halal certification for animal-derived actives, and GCC unified labelling standards.</p>
                                    <ul className="region-checklist">
                                        <li>Saudi SFDA e-Cosmetic Approval</li>
                                        <li>Halal Ingredient Certification</li>
                                        <li>Certificate of Free Sale (CFS)</li>
                                        <li>Arabic Language Label Compliance</li>
                                    </ul>
                                </div>
                                <div className="region-card">
                                    <div className="region-flag">🌏</div>
                                    <h4>Southeast Asia</h4>
                                    <span className="region-authority">ASEAN Cosmetics</span>
                                    <p>ASEAN Cosmetic Directive compliance, product notification filings for Singapore, Malaysia, Indonesia, Thailand, and Vietnam.</p>
                                    <ul className="region-checklist">
                                        <li>ASEAN Cosmetic Directive</li>
                                        <li>Product Notification Filing</li>
                                        <li>Safety Assessment Report</li>
                                        <li>Country-Specific Label Requirements</li>
                                    </ul>
                                </div>
                                <div className="region-card">
                                    <div className="region-flag">🇪🇺</div>
                                    <h4>Europe</h4>
                                    <span className="region-authority">EU CPNP</span>
                                    <p>EU Regulation 1223/2009 compliance, CPNP notification portal filing, and EU Responsible Person (RP) coordination.</p>
                                    <ul className="region-checklist">
                                        <li>EU CPNP Notification</li>
                                        <li>Responsible Person (RP) Assignment</li>
                                        <li>Product Information File (PIF)</li>
                                        <li>Toxicological Safety Assessment</li>
                                    </ul>
                                </div>
                                <div className="region-card">
                                    <div className="region-flag">🇺🇸</div>
                                    <h4>North America</h4>
                                    <span className="region-authority">US FDA MoCRA</span>
                                    <p>FDA Modernization of Cosmetics Regulation Act (MoCRA) compliance, facility registration, product listings, and SDS documentation.</p>
                                    <ul className="region-checklist">
                                        <li>FDA Facility Registration</li>
                                        <li>MoCRA Product Listing</li>
                                        <li>Adverse Event Tracking Setup</li>
                                        <li>US-Compliant Label Review</li>
                                    </ul>
                                </div>
                                <div className="region-card">
                                    <div className="region-flag">🌍</div>
                                    <h4>Africa</h4>
                                    <span className="region-authority">KEBS &amp; NAFDAC</span>
                                    <p>Country-specific registration with KEBS (Kenya), NAFDAC (Nigeria), SABS (South Africa), and Certificate of Conformity (CoC) filing.</p>
                                    <ul className="region-checklist">
                                        <li>Regional Drug Licensing</li>
                                        <li>Certificate of Conformity (CoC)</li>
                                        <li>Pre-Export Verification (PVoC)</li>
                                        <li>SDS Safety Certificates</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />
                        
                        <div className="global-services-section">
                            <h3 className="section-title text-center font-playfair" style={{ marginBottom: '40px' }}>Our Global Consulting Services</h3>
                            <div className="grid-4col" style={{ gap: '20px' }}>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>International Product Development</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Adapting product formulations to meet the specific climate, skin types, sensory preferences, and cultural standards of target global regions.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Export Consulting</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Providing guidance on customs documentation, duties, Free Sale Certificates, product licensing, and international shipping protocols.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>Global Sourcing &amp; Supply Chain</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Acquiring premium active ingredients, rare botanicals, and high-quality packaging materials from trusted global networks.</p>
                                </div>
                                <div className="network-card" style={{ padding: '25px', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-white)' }}>
                                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--color-obsidian)', marginBottom: '10px' }}>International Compliance Support</h4>
                                    <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>Filing cosmetic product registration dossiers with global entities like US FDA (MoCRA), EU CPNP, Saudi SFDA, and CDSCO.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: PROJECTS / PORTFOLIO                 */}
                {/* ========================================== */}
                <section id="view-portfolio" className={`page-view ${activePage === '#portfolio' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">CASE STUDY ARCHIVES</span>
                        <h1 className="subpage-title font-playfair">Projects & Turnkey Portfolio</h1>
                    </div>

                    <div className="section-padding">
                        <div className="portfolio-grid-main">
                            <div className="portfolio-item-card">
                                <div className="port-img-mock img-p1" style={{ backgroundImage: `url(${skincareFactoryImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '240px', backgroundColor: 'transparent' }}></div>
                                <div className="port-info">
                                    <span className="port-cat">FACTORY BUILD / DERMATECH</span>
                                    <h3>DermaTech High-Speed Skincare Plant</h3>
                                    <p>Location: Ahmedabad, India. Custom cleanroom layout, commissioning of high-speed filling lines, and official BIS licensing. Completed in 14 months.</p>
                                    <span className="port-metric">Capacity: 40k bottles/day</span>
                                </div>
                            </div>
                            <div className="portfolio-item-card">
                                <div className="port-img-mock img-p2" style={{ backgroundImage: `url(${cosmeticRdLabImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '240px', backgroundColor: 'transparent' }}></div>
                                <div className="port-info">
                                    <span className="port-cat">FORMULATION R&D / STERLING</span>
                                    <h3>Botanical Anti-Aging Skincare Line</h3>
                                    <p>Developed five premium organic formulations incorporating bio-fermented lipids, rose extracts, and multi-weight natural moisture boosters.</p>
                                    <span className="port-metric">Natural Origin Index: 98.4%</span>
                                </div>
                            </div>
                            <div className="portfolio-item-card">
                                <div className="port-img-mock img-p3" style={{ backgroundImage: `url(${portfolioEssenceHaircareImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '240px', backgroundColor: 'transparent' }}></div>
                                <div className="port-info">
                                    <span className="port-cat">BRAND TURNKEY / ESSENCE</span>
                                    <h3>Essence Organic Haircare Turnkey Launch</h3>
                                    <p>End-to-end execution. Handled supplier sourcing for customized luxury bottles, formulation chemistry, FDA licensing, and final plant setup setup.</p>
                                    <span className="port-metric">Time-to-Market: 8 Months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: R&D INNOVATION LAB                  */}
                {/* ========================================== */}
                <section id="view-innovation" className={`page-view ${activePage === '#innovation' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">BIO-CHEMICAL DESIGN</span>
                        <h1 className="subpage-title font-playfair">R&D Lab & Innovation Hub</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col">
                            <div className="lab-dashboard-left">
                                <h3>Interactive Formulation Simulator</h3>
                                <p className="lead-p">Welcome to our chemical simulation room. Drag the sliders to add biochemically active compounds to your formulation recipe. View active compound interactions, compatibility ratings, and target benefits in real time.</p>
                                
                                <div className="simulator-panel shadow-premium">
                                    <div className="compounding-slider-group">
                                        <div className="slider-field">
                                            <div className="field-label-row">
                                                <span>Niacinamide:</span>
                                                <strong>{formMix.niacinamide}%</strong>
                                            </div>
                                            <input type="range" className="simulator-slider" min="0" max="10" step="0.5" value={formMix.niacinamide}
                                                   onChange={(e) => handleSliderChange('niacinamide', parseFloat(e.target.value))} />
                                        </div>
                                        <div className="slider-field">
                                            <div className="field-label-row">
                                                <span>Retinol:</span>
                                                <strong>{formMix.retinol}%</strong>
                                            </div>
                                            <input type="range" className="simulator-slider" min="0" max="2.5" step="0.1" value={formMix.retinol}
                                                   onChange={(e) => handleSliderChange('retinol', parseFloat(e.target.value))} />
                                        </div>
                                        <div className="slider-field">
                                            <div className="field-label-row">
                                                <span>Vitamin C:</span>
                                                <strong>{formMix.vitc}%</strong>
                                            </div>
                                            <input type="range" className="simulator-slider" min="0" max="15" step="0.5" value={formMix.vitc}
                                                   onChange={(e) => handleSliderChange('vitc', parseFloat(e.target.value))} />
                                        </div>
                                        <div className="slider-field">
                                            <div className="field-label-row">
                                                <span>Hyaluronic Acid:</span>
                                                <strong>{formMix.hyaluronic}%</strong>
                                            </div>
                                            <input type="range" className="simulator-slider" min="0.5" max="5.0" step="0.1" value={formMix.hyaluronic}
                                                   onChange={(e) => handleSliderChange('hyaluronic', parseFloat(e.target.value))} />
                                        </div>
                                        <div className="slider-field">
                                            <div className="field-label-row">
                                                <span>Soothing extracts:</span>
                                                <strong>{formMix.herbal}%</strong>
                                            </div>
                                            <input type="range" className="simulator-slider" min="0" max="10" step="0.5" value={formMix.herbal}
                                                   onChange={(e) => handleSliderChange('herbal', parseFloat(e.target.value))} />
                                        </div>
                                    </div>
                                    
                                    <div className="compatibility-meter">
                                        <span>Formula Synergy Rating:</span>
                                        <div className="meter-bar-container">
                                            <div className="meter-bar-fill" style={{ width: `${synergyReport.score}%` }}></div>
                                        </div>
                                        <span className="text-gold" style={{ color: synergyReport.score < 50 ? '#d95d5d' : '' }}>{synergyReport.verdict}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lab-dashboard-right" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

                                <div className="chemical-report-card" style={{ margin: 0 }}>
                                    <h4>Dynamic Biochemical Report</h4>
                                    <hr className="fine-divider" />
                                    <div className="report-metric-row">
                                        <span>Synergy Status:</span>
                                        <strong>{synergyReport.status}</strong>
                                    </div>
                                    <div className="report-metric-row">
                                        <span>Stability Index:</span>
                                        <strong>{synergyReport.stability}</strong>
                                    </div>
                                    <div className="report-metric-row">
                                        <span>Active Viscosity:</span>
                                        <strong>{synergyReport.viscosity}</strong>
                                    </div>
                                    <hr className="fine-divider" />
                                    <h5>Formulator Notes:</h5>
                                    <p id="report-notes">{synergyReport.notes}</p>
                                    
                                    <button type="button" className="btn-primary w-100" onClick={() => alert("Laboratory compounding sample scheduled. Our chemistry leads will synthesize a 30mL benchmark vial.")}>Request Laboratory Batch Sample</button>
                                </div>
                            </div>
                        </div>

                        <hr className="luxury-divider" />
                        
                        <div className="innovation-pillars">
                            <h3 className="section-title text-center font-playfair">Pillars of Cosmetic R&D</h3>
                            <p className="text-center section-subtitle" style={{ marginBottom: '40px' }}>Bridging basic bioscience research with consumer product excellence.</p>
                            <div className="grid-5col" style={{ gap: '20px' }}>
                                <div className="value-card">
                                    <span className="val-num font-playfair">01</span>
                                    <h4>Advanced Ingredient Research</h4>
                                    <p>Screening novel bio-active compounds, lipid carriers, and peptide complexes for target skin and scalp applications.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">02</span>
                                    <h4>Sustainable Cosmetic Innovation</h4>
                                    <p>Pioneering cold-process compounding methods, biodegradable surfactant packages, and eco-friendly preservation systems.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">03</span>
                                    <h4>Functional Dermal/Beauty Research</h4>
                                    <p>Developing skin barrier repair products, microbiome-balancing emulsions, and targeted delivery mechanisms.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">04</span>
                                    <h4>Clean Beauty Technology</h4>
                                    <p>Creating clean, synthetic-free suspensions and mineral color grids that maintain high stability and premium textures.</p>
                                </div>
                                <div className="value-card">
                                    <span className="val-num font-playfair">05</span>
                                    <h4>AI-Based Cosmetic Trends</h4>
                                    <p>Using predictive models to assess raw material compatibility, stability indices, and emerging product trends.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: CERTIFICATIONS                       */}
                {/* ========================================== */}
                <section id="view-certifications" className={`page-view ${activePage === '#certifications' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">STANDARDS & CERTIFICATES</span>
                        <h1 className="subpage-title font-playfair">Compliance & Quality Control</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col align-center">
                            <div>
                                <h3>GMP & Quality Assured Plant Operations</h3>
                                <p className="lead-p">Quality control is not an afterthought in cosmetic engineering; it is the structural spine. We plan and build facilities to easily clear global regulatory standards.</p>
                                <p>Our laboratory designs incorporate chemical testing benches, microbiological isolation chambers, and HPLC analysis tools to verify raw material purity before mixing begins.</p>
                            </div>
                            <div className="certs-visual-grid">
                                <div className="cert-card">
                                    <h4>Good Manufacturing Practices</h4>
                                    <p>ISO 22716 certified operations. Custom cleanroom floor layouts and pressure cascades to prevent contamination.</p>
                                </div>
                                <div className="cert-card">
                                    <h4>ISO Standards</h4>
                                    <p>ISO 9001 quality management and ISO 14001 environmental safety compliance structures.</p>
                                </div>
                                <div className="cert-card">
                                    <h4>FDA Support</h4>
                                    <p>Complete safety dossiers, facility registrations, and product listings ready for US MoCRA compliance.</p>
                                </div>
                                <div className="cert-card">
                                    <h4>BIS Compliance</h4>
                                    <p>Ensuring raw active ingredient profiles and finished cosmetics comply with Bureau of Indian Standards (IS 6608).</p>
                                </div>
                                <div className="cert-card">
                                    <h4>Export Documentation</h4>
                                    <p>Preparing Certificates of Analysis (COA), Safety Data Sheets (SDS/MSDS), and Free Sale Certificates for customs clearing.</p>
                                </div>
                                <div className="cert-card">
                                    <h4>Product Safety Standards</h4>
                                    <p>Strict heavy metal checks, raw material microbiological screenings, and third-party dermatologist clinical trials.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: BLOG / INSIGHTS                      */}
                {/* ========================================== */}
                <section id="view-blog" className={`page-view ${activePage === '#blog' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">EGC JOURNAL</span>
                        <h1 className="subpage-title font-playfair">Insights & Industry Trends</h1>
                    </div>

                    <div className="section-padding">
                        {/* Blog Category Filter */}
                        <div className="blog-filter-bar">
                            {blogCategories.map(cat => (
                                <button
                                    key={cat}
                                    className={`blog-filter-btn ${blogCategory === cat ? 'active' : ''}`}
                                    onClick={() => setBlogCategory(cat)}
                                    onMouseEnter={() => triggerCursorState(true)}
                                    onMouseLeave={() => triggerCursorState(false)}
                                >{cat}</button>
                            ))}
                        </div>
                        <div className="blog-grid-main">
                            {allBlogPosts
                                .filter(p => blogCategory === 'ALL' || p.cat === blogCategory)
                                .map((post, i) => {
                                    const imgMap = {
                                        botanical: botanicalIngredientsImg,
                                        skincare: blogSkincareScienceImg,
                                        compliance: blogComplianceInsightsImg,
                                        haircare: portfolioEssenceHaircareImg,
                                        factory: skincareFactoryImg,
                                        rd: cosmeticRdLabImg
                                    };
                                    return (
                                        <article key={i} className="blog-post-card">
                                            <div className="post-img-mock" style={{ backgroundImage: `url(${imgMap[post.img]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: 'transparent' }}></div>
                                            <div className="post-meta"><span>{post.date}</span> &bull; <span>{post.cat}</span></div>
                                            <h3>{post.title}</h3>
                                            <p>{post.desc}</p>
                                        </article>
                                    );
                                })
                            }
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: CAREERS                              */}
                {/* ========================================== */}
                <section id="view-careers" className={`page-view ${activePage === '#careers' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">JOIN EKORA GLOBAL CONSULTING</span>
                        <h1 className="subpage-title font-playfair">Careers in Beauty Science</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col">
                            <div>
                                <h3>Work with Global Pioneers</h3>
                                <p className="lead-p">At EGC Ekora Global Consulting, we combine the analytical rigor of pharmaceutical laboratories with the craftsmanship of luxury skincare branding. We seek ambitious thinkers, formulation chemists, and mechanical plant planners.</p>
                            </div>
                            <div className="open-positions-list">
                                <h4>Current Open Positions</h4>
                                <div className="position-item">
                                    <h5>Lead Formulation Chemist</h5>
                                    <span className="job-meta">R&D Lab, Mumbai &bull; Full-Time</span>
                                    <button className="btn-secondary" onClick={() => { setCareersJob('Lead Formulation Chemist'); setCareersModal(true); }}>Apply Now</button>
                                </div>
                                <div className="position-item">
                                    <h5>Cleanroom HVAC Layout Engineer</h5>
                                    <span className="job-meta">Engineering, Ahmedabad &bull; Full-Time</span>
                                    <button className="btn-secondary" onClick={() => { setCareersJob('Cleanroom HVAC Layout Engineer'); setCareersModal(true); }}>Apply Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {careersModal && (
                        <div className="careers-modal">
                            <div className="modal-content shadow-premium">
                                <button className="close-modal-btn" onClick={() => setCareersModal(false)}>&times;</button>
                                <h3>Application Form</h3>
                                <h4 className="text-gold">{careersJob}</h4>
                                {careersSuccess ? (
                                    <p className="text-gold">Application submitted successfully! Our recruiters will touch base shortly.</p>
                                ) : (
                                    <form onSubmit={handleCareersSubmit}>
                                        <div className="form-group">
                                            <label>Full Name:</label>
                                            <input type="text" id="job-name" className="luxury-input" placeholder="Your full name" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address:</label>
                                            <input type="email" id="job-email" className="luxury-input" placeholder="Your email" required />
                                        </div>
                                        <button type="submit" className="btn-primary w-100">Submit Application</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                {/* ========================================== */}
                {/* VIEW: FAQ                                  */}
                {/* ========================================== */}
                <section id="view-faq" className={`page-view ${activePage === '#faq' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">COMMON QUERIES</span>
                        <h1 className="subpage-title font-playfair">Frequently Asked Questions</h1>
                    </div>

                    <div className="section-padding">
                        <div className="faq-container-narrow">
                            <div className="faq-item">
                                <h3 className="faq-question">What is the typical timeline for custom cosmetic formula development?</h3>
                                <div className="faq-answer-active" style={{ fontSize: '14.5px', color: 'var(--color-text-secondary)', padding: '15px 0' }}>
                                    Typically, laboratory bench prototype development takes 4 to 6 weeks. Following client prototype validation, we initiate standard 3-month accelerated stability testing. In total, complete formulation development takes around 4 months.
                                </div>
                            </div>
                            <div className="faq-item">
                                <h3 className="faq-question">Do you assist in packaging sourcing and supplier identification?</h3>
                                <div className="faq-answer-active" style={{ fontSize: '14.5px', color: 'var(--color-text-secondary)', padding: '15px 0' }}>
                                    Yes. We have a robust global supplier network for custom luxury glass containers, sustainable wood-derived closures, airless pumps, and cardboard box printers. We manage full packaging coordination, compatibility trials, and leak assessments.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================== */}
                {/* VIEW: CONTACT                              */}
                {/* ========================================== */}
                <section id="view-contact" className={`page-view ${activePage === '#contact' ? 'active animate-in' : ''}`}>
                    <div className="subpage-header">
                        <span className="subpage-eyebrow">GET IN TOUCH</span>
                        <h1 className="subpage-title font-playfair">Connect with Our Engineers</h1>
                    </div>

                    <div className="section-padding">
                        <div className="grid-2col">
                            <div className="contact-info-panel" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div>
                                    <h3>Schedule an Advisory Consultation</h3>
                                    <p className="lead-p">Whether you are an established brand scaling up or a cosmetic startup beginning your journey, our chemists and plant layouts engineers are ready to assist.</p>
                                    
                                    <div className="contact-methods">
                                        <div className="method-item">
                                            <strong>Headquarters Office:</strong>
                                            <span>EGC Ekora Global Consulting, BKC, Bandra Kurla Complex, Mumbai, MH 400051, India.</span>
                                        </div>
                                        <div className="method-item">
                                            <strong>Communications:</strong>
                                            <span>Email: contact@ekoraglobal.com</span>
                                            <span>Phone: +91 22 5557 8890</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <a href="https://wa.me/912255578890" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.022 14.12 1 11.512 1c-5.436 0-9.86 4.37-9.864 9.8.001 2.02.533 3.996 1.542 5.739l-.99 3.613 3.731-.968.226.134z"/>
                                            </svg>
                                            Instant WhatsApp Chat
                                        </a>
                                    </div>
                                    <div className="social-links-row" style={{ marginTop: '25px' }}>
                                        <span className="social-label" style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: '600', marginRight: '15px', display: 'inline-block' }}>FOLLOW US:</span>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-gold-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>LinkedIn</a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-gold-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Instagram</a>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-gold-link" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Twitter/X</a>
                                    </div>
                                </div>
                                <div className="luxury-maps-mock">
                                    <div className="maps-overlay-info">
                                        <h4>EGC EKORA GLOBAL CONSULTING HEADQUARTERS</h4>
                                        <p>BKC Mumbai, India</p>
                                    </div>
                                    <div className="maps-canvas-grid">
                                        <svg className="maps-vector-graphic" viewBox="0 0 400 250">
                                            <rect width="400" height="250" fill="#f7f6f4" />
                                            <rect x="20" y="20" width="80" height="40" fill="#ededed" rx="2" />
                                            <rect x="120" y="20" width="100" height="40" fill="#ededed" rx="2" />
                                            <rect x="240" y="20" width="140" height="40" fill="#ededed" rx="2" />
                                            <rect x="20" y="80" width="120" height="80" fill="#ededed" rx="2" />
                                            <rect x="260" y="80" width="120" height="80" fill="#ededed" rx="2" />
                                            <rect x="20" y="180" width="180" height="50" fill="#ededed" rx="2" />
                                            <rect x="220" y="180" width="160" height="50" fill="#ededed" rx="2" />
                                            
                                            <path d="M0,70 L400,70" stroke="rgba(197,168,128,0.25)" strokeWidth="8" fill="none" />
                                            <path d="M0,170 L400,170" stroke="rgba(197,168,128,0.25)" strokeWidth="8" fill="none" />
                                            <path d="M230,0 L230,250" stroke="rgba(197,168,128,0.25)" strokeWidth="8" fill="none" />
                                            <path d="M110,0 L110,250" stroke="rgba(197,168,128,0.15)" strokeWidth="6" fill="none" />
                                            
                                            <g transform="translate(230, 110)">
                                                <circle cx="0" cy="0" r="18" fill="rgba(197, 168, 128, 0.25)" className="ping-circle" />
                                                <circle cx="0" cy="0" r="6" fill="var(--color-gold)" className="pulse-pin" />
                                                <path d="M0,0 L-6,-15 C-8,-19 8,-19 6,-15 Z" fill="var(--color-gold)" />
                                                <circle cx="0" cy="-12" r="2.5" fill="#fff" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-form-panel">
                                <div className="luxury-card shadow-premium">
                                    <h3>Project Brief Consultation</h3>
                                    {contactSuccess ? (
                                        <div className="form-success-message">
                                            <h4>Request Submitted Successfully</h4>
                                            <p>Thank you for connecting with EGC Ekora Global Consulting. A technical consulting lead will review your formulation parameters or plant layout parameters and contact you within 24 business hours.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleContactSubmit}>
                                            <div className="form-group">
                                                <label>Full Name *</label>
                                                <input type="text" id="c-name" className="luxury-input" placeholder="Sophia Sterling" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address *</label>
                                                <input type="email" id="c-email" className="luxury-input" placeholder="sophia@brand.com" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Company / Brand Name</label>
                                                <input type="text" id="c-company" className="luxury-input" placeholder="Sterling Cosmetics" />
                                            </div>
                                            <div className="form-group">
                                                <label>Area of Interest *</label>
                                                <select id="c-interest" className="luxury-input" required>
                                                    <option value="formulation">Cosmetic Formulation & R&D</option>
                                                    <option value="factory">Plant Setup & Factory Planning</option>
                                                    <option value="turnkey">Turnkey Project Solution</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Brief Project Description *</label>
                                                <textarea id="c-message" className="luxury-input" rows="4" placeholder="Briefly describe your cosmetic product range..." required></textarea>
                                            </div>
                                            <button type="submit" className="btn-primary w-100">Request Technical Advisory</button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Floating WhatsApp Button */}
                <a href="https://wa.me/912255578890" target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.022 14.12 1 11.512 1c-5.436 0-9.86 4.37-9.864 9.8.001 2.02.533 3.996 1.542 5.739l-.99 3.613 3.731-.968.226.134z"/>
                    </svg>
                    <span className="whatsapp-float-label">WhatsApp</span>
                </a>

                {/* Luxury Footer */}
                <footer className="luxury-footer">
                    <div className="footer-top">
                        <div className="footer-brand-info">
                            <img src={logoWhiteImg} alt="EGC Ekora Global Consulting Logo" className="footer-logo-img" />
                            <p className="footer-desc">Crafting state-of-the-art beauty solutions through biochemical science, robotic manufacturing operations, and global regulatory clarity.</p>
                            <div className="footer-socials">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>LinkedIn</a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Instagram</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>Twitter/X</a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" onMouseEnter={() => triggerCursorState(true)} onMouseLeave={() => triggerCursorState(false)}>YouTube</a>
                            </div>
                        </div>
                        <div className="footer-links-grid">
                            <div className="footer-col">
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="#services" onClick={() => setSrvTab('tab-rd')}>R&D &amp; Formulation</a></li>
                                    <li><a href="#services" onClick={() => setSrvTab('tab-factory')}>Plant Setup &amp; Design</a></li>
                                    <li><a href="#services" onClick={() => setSrvTab('tab-regulatory')}>Regulatory &amp; Compliance</a></li>
                                    <li><a href="#services" onClick={() => setSrvTab('tab-dpr')}>DPR &amp; Business Advisory</a></li>
                                    <li><a href="#services" onClick={() => setSrvTab('tab-gtm')}>Branding &amp; Go-To-Market</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Company</h4>
                                <ul>
                                    <li><a href="#about">About EGC</a></li>
                                    <li><a href="#portfolio">Projects &amp; Portfolio</a></li>
                                    <li><a href="#innovation">R&amp;D Innovation Lab</a></li>
                                    <li><a href="#certifications">Certifications</a></li>
                                    <li><a href="#careers">Careers</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Resources</h4>
                                <ul>
                                    <li><a href="#blog">Insights &amp; Blog</a></li>
                                    <li><a href="#faq">FAQ</a></li>
                                    <li><a href="#industries">Industries We Serve</a></li>
                                    <li><a href="#global">Global Markets</a></li>
                                    <li><a href="#contact">Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="footer-col">
                                <h4>Contact</h4>
                                <ul>
                                    <li><a href="mailto:contact@ekoraglobal.com">contact@ekoraglobal.com</a></li>
                                    <li><a href="tel:+912255578890">+91 22 5557 8890</a></li>
                                    <li><a href="https://wa.me/912255578890" target="_blank" rel="noopener noreferrer">WhatsApp Chat</a></li>
                                    <li style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12.5px', lineHeight: '1.6', cursor: 'default' }}>BKC, Bandra Kurla Complex,<br/>Mumbai, MH 400051, India</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="copyright">&copy; 2026 EGC Ekora Global Consulting. All Rights Reserved.</p>
                        <div className="footer-legal-links">
                            <a href="#home">Privacy Policy</a>
                            <a href="#home">Terms &amp; Conditions</a>
                            <a href="#home">Cookie Policy</a>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
