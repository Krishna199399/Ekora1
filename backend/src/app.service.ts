import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private savedFormulations: any[] = [];
  private contactSubmissions: any[] = [];
  private careerApplications: any[] = [];

  getHello(): string {
    return 'EGC Ekora Global Consulting API Gateway. Scientific Purity & Mechanical Precision.';
  }

  analyzeFormulation(mix: {
    niacinamide: number;
    retinol: number;
    vitc: number;
    hyaluronic: number;
    herbal: number;
  }) {
    const { niacinamide, retinol, vitc, hyaluronic, herbal } = mix;
    this.logger.log(`Analyzing formulation mix: ${JSON.stringify(mix)}`);

    let score = 95;
    let status = 'Highly Bio-Available';
    let stabilityPct = 99.2;
    let verdict = 'Excellent Synergy Rating';
    let color = '#FAF9F6'; // Default White Pearl
    let viscosityVal = 0.5; // Default serum viscosity
    let notes = 'This recipe establishes a highly cohesive dermal hydration grid. Safe for high-frequency daily routines.';

    // Rule 1: Retinol + Vitamin C chemical conflict (acidic instability)
    if (retinol > 0 && vitc > 0) {
      score = 38;
      status = 'Chemical Conflict (Acidic Instability)';
      stabilityPct = 62.4;
      verdict = 'Chemical Conflict Detected';
      color = '#F3E5AB'; // Distressed milky yellow
      notes = 'WARNING: Retinol requires a pH of 5.5–6.0, whereas L-Ascorbic Acid (Vitamin C) requires a highly acidic pH (<3.5). Compounding them in a single emulsion triggers rapid oxidation of Retinol and degrades both actives.';
    }
    // Rule 2: High Retinol skin irritation risk
    else if (retinol > 1.8) {
      score = 65;
      status = 'Potential Dermal Irritation Risk';
      stabilityPct = 92.1;
      verdict = 'Dermal Sensitivity Advisory';
      color = '#FBE7C6'; // Soft orange/gold
      notes = 'ADVISORY: High Retinol concentrations (>1.8%) demand soothing buffers. Consider increasing soothing extracts (herbal/soothing) or adding bisabolol to prevent peeling and erythema.';
    }
    // Rule 3: High Vitamin C stability risk
    else if (vitc > 10) {
      score = 78;
      status = 'Susceptible to Rapid Oxidation';
      stabilityPct = 81.5;
      verdict = 'Oxidative Protection Required';
      color = '#FCEFC2'; // Citrus gold
      notes = 'ADVISORY: L-Ascorbic Acid concentrations above 10% require specialized oxygen-free vacuum compounding and airless UV-shielded packaging to prevent rapid color shifts to amber.';
    }
    // Rule 4: Hyaluronic Acid hydration grid
    else if (hyaluronic >= 2.0 && niacinamide >= 3.0) {
      score = 98;
      status = 'Synergistic Dermal Plumping Grid';
      stabilityPct = 99.8;
      verdict = 'Outstanding Complex Synergy';
      color = '#E8F1F5'; // Crystalline dewy blue-white
      notes = 'EXCELLENT: The combination of Niacinamide (Vitamin B3) and multi-weight Hyaluronic Acid reinforces the lipid barrier while locking in deep moisture. Ideal for barrier repair lines.';
    }
    // Rule 5: Pure Herbal/Soothing Base
    else if (herbal > 6.0) {
      score = 92;
      status = 'Phyto-Active Calming Infusion';
      stabilityPct = 97.4;
      verdict = 'Calming Formulation';
      color = '#D1EBD0'; // Soft botanical green
      notes = 'GOOD: High botanical fraction. Employs certified organic soothing extracts. Ensure appropriate broad-spectrum natural preservation system (e.g., geogard/potassium sorbate) to prevent microbial counts.';
    }

    // Dynamic Viscosity calculation based on Hyaluronic Acid & Herbal extracts
    // Hyaluronic acid acts as a powerful thickener. Soothing extracts also add viscosity.
    const calculatedViscosityCps = Math.round(150 + (hyaluronic * 220) + (herbal * 35) + (niacinamide * 10));
    viscosityVal = 0.2 + (calculatedViscosityCps / 2000);
    if (viscosityVal > 1.5) viscosityVal = 1.5; // Cap WebGL roughness factor

    // Adjust color overrides when no severe conflict exists to match active ingredients
    if (score >= 60) {
      if (herbal > 4.0) {
        color = '#D1EBD0'; // botanical green
      } else if (retinol > 1.2) {
        color = '#FAF0D7'; // warm retinol yellow
      } else if (vitc > 5.0) {
        color = '#FCEFC2'; // champagne citrus gold
      } else if (hyaluronic > 3.0) {
        color = '#EAF2F8'; // crystalline dewy blue
      } else if (niacinamide > 5.0) {
        color = '#FAF9F6'; // premium pearl white
      }
    }

    return {
      score,
      verdict,
      status,
      stability: `${stabilityPct.toFixed(1)}% (Pre-Validated)`,
      viscosity: `${calculatedViscosityCps} cPs (${calculatedViscosityCps > 1000 ? 'Thick Emulsion' : calculatedViscosityCps > 400 ? 'Rich Gel' : 'Liquid Serum'})`,
      notes,
      color,
      viscosityValue: parseFloat(viscosityVal.toFixed(3)),
    };
  }

  saveFormulation(mix: any) {
    const record = {
      id: `FORM-${Date.now()}`,
      mix,
      timestamp: new Date().toISOString(),
    };
    this.savedFormulations.push(record);
    this.logger.log(`Formulation recipe saved: ${JSON.stringify(record)}`);
    return { success: true, id: record.id };
  }

  submitContact(payload: any) {
    const record = {
      id: `CONT-${Date.now()}`,
      ...payload,
      timestamp: new Date().toISOString(),
    };
    this.contactSubmissions.push(record);
    this.logger.log(`Luxury Consulting Brief recorded: ${JSON.stringify(record)}`);
    return { success: true, id: record.id };
  }

  applyCareer(payload: any) {
    const record = {
      id: `CAND-${Date.now()}`,
      ...payload,
      timestamp: new Date().toISOString(),
    };
    this.careerApplications.push(record);
    this.logger.log(`Career Candidate Registered: ${JSON.stringify(record)}`);
    return { success: true, id: record.id };
  }

  evaluateCompliance(origin: string, dest: string) {
    this.logger.log(`Evaluating export compliance from ${origin} to ${dest}`);

    const complianceMap: Record<string, string[]> = {
      'india_usa': [
        'Complete MoCRA (Modernization of Cosmetics Regulation Act) listing on FDA portal.',
        'Establish an authorized US agent for adverse event logging.',
        'Compile an Electronic Product Safety Dossier including stability data.',
        'Conduct microbiological plate testing to comply with USP <61> and <62>.',
        'Verify labeling matches FDA cosmetic formatting (declare allergens, net content in oz/g).',
      ],
      'india_eu': [
        'Submit full dossier to the European Commission Cosmetic Product Notification Portal (CPNP).',
        'Appoint a legally responsible person (RP) residing within the EU borders.',
        'Generate a comprehensive Product Information File (PIF) signed by a certified EU toxicologist.',
        'Conduct mandatory stability, compatibility, and preservative efficacy (challenge) testing.',
        'Review formulations against Annex II (banned substances) and Annex III (restricted substances).',
      ],
      'india_me': [
        'Submit registration via ESMA (Emirates Authority for Standardization and Metrology) or Saudi FDA (SFDA).',
        'Acquire formal Halal Compliance Certification for raw material extracts.',
        'Secure Certificate of Free Sale (CFS) from the Indian Licensing Authority (CDSCO).',
        'Authenticate commercial invoice and COA via the importing country\'s consulate.',
      ],
      'europe_usa': [
        'FDA MoCRA facility registration & product listing filings.',
        'Validate compliance of color additives against US FDA approved lists.',
        'Declare US-specific warning statements on outer packaging sleeves.',
      ],
      'europe_eu': [
        'Standard intra-EU transport alignment. Verify RP updates and PIF accessibility.',
        'Ensure packaging materials comply with strict European microplastics regulations.',
      ],
      'europe_in': [
        'File for CDSCO registration certificate (Form COS-1) via the SUGAM portal.',
        'Establish an authorized Indian representative to manage customs clearing.',
        'Validate that all products are 100% cruelty-free (animal-testing ban compliance).',
        'Print Indian importer details, Max Retail Price (MRP), and import license number on label.',
      ],
    };

    const key = `${origin.toLowerCase()}_${dest.toLowerCase()}`;
    const requirements = complianceMap[key] || [
      'Acquire regional drug licensing registrations.',
      'Ensure standard SDS (Safety Data Sheet) and COA (Certificate of Analysis) are compiled.',
      'Verify standard packaging units comply with destination ports and labeling requirements.',
      'Establish a local importer of record or regulatory agent in the destination market.',
    ];

    return {
      origin,
      destination: dest,
      requirements,
    };
  }

  getBlogInsights() {
    return [
      {
        id: 1,
        title: 'The Ascent of Bio-Fermented Active Lipids in Skincare',
        category: 'INGREDIENT RESEARCH',
        date: 'MAY 20, 2026',
        summary: 'How sustainable fermentation technologies are replacing heavy synthetic chemical oils, offering deep epidermal absorption.',
        content: 'Natural oils are fantastic, but standard mechanical squeezing leaves long-chain fatty acids that sit on top of the skin. Bio-fermentation breaks down these lipids, allowing them to penetrate deep into the dermal matrix without causing comedogenic clogging. In this paper, we explore our patented bio-fermentation process...',
      },
      {
        id: 2,
        title: 'Designing Cleanrooms to Pass ISO 22716 GMP Audits',
        category: 'PLANT SETUP',
        date: 'APRIL 14, 2026',
        summary: 'Critical HVAC zoning planning, differential pressure calculations, and anti-static flooring layouts.',
        content: 'Good Manufacturing Practices require more than just cleanliness; they demand a physical environment engineered to prevent cross-contamination. This guide walks through the air-handling systems, double-door airlocks, pressure cascades, and epoxy floor details required to secure ISO class 7 cleanroom clearance on the first audit.',
      },
    ];
  }
}

