export type Evidence = 'Emerging' | 'Moderate' | 'Strong';
export type Stack =
  | 'Gut Repair'
  | 'Microbiome'
  | 'Detox & Cellular'
  | 'Root Cause Protocol'
  | 'Anti-Inflammatory';

export type Supplement = {
  id: string;
  name: string;
  stack: Stack;
  purpose: string;
  why: string;
  dose: string;
  form: string;
  timing: string;
  evidence: Evidence;
  emoji: string;
};

export const SUPPLEMENTS: Supplement[] = [
  // Gut Repair
  {
    id: 'l-glutamine',
    name: 'L-Glutamine',
    stack: 'Gut Repair',
    purpose: 'Primary fuel for enterocytes (your gut lining cells).',
    why: 'Enterocytes prefer glutamine over glucose. Low glutamine = thinning villi and slower regeneration.',
    dose: '5 g, 1–2× daily',
    form: 'Free-form powder, dissolved in water',
    timing: 'Between meals, on an empty stomach',
    evidence: 'Moderate',
    emoji: '💧',
  },
  {
    id: 'zinc-carnosine',
    name: 'Zinc Carnosine',
    stack: 'Gut Repair',
    purpose: 'Stabilizes tight junction proteins (claudin/occludin).',
    why: 'Clinical trials show it reduces NSAID-induced intestinal permeability.',
    dose: '75 mg twice daily',
    form: 'Pepzin GI chelate is best-studied',
    timing: 'Between meals',
    evidence: 'Strong',
    emoji: '🔒',
  },
  {
    id: 'collagen',
    name: 'Collagen peptides',
    stack: 'Gut Repair',
    purpose: 'Supplies glycine & proline to rebuild mucosa.',
    why: 'A damaged gut is mostly torn collagen matrix — you need the raw materials.',
    dose: '10–20 g daily',
    form: 'Grass-fed bovine or marine peptides',
    timing: 'In morning coffee or smoothie',
    evidence: 'Moderate',
    emoji: '🧬',
  },
  {
    id: 'slippery-elm',
    name: 'Slippery Elm / Marshmallow Root',
    stack: 'Gut Repair',
    purpose: 'Demulcent — coats and soothes irritated gut lining.',
    why: 'Mucilage forms a protective gel layer, giving the epithelium rest.',
    dose: '1 tsp powder in water, 1–3× daily',
    form: 'Loose powder or tea',
    timing: '20 min before meals',
    evidence: 'Emerging',
    emoji: '🌿',
  },

  // Microbiome
  {
    id: 'lgg',
    name: 'Probiotic — L. rhamnosus GG',
    stack: 'Microbiome',
    purpose: 'Strengthens the mucus barrier, modulates immunity.',
    why: 'Most-studied probiotic strain; reduces leaky gut markers in children and adults.',
    dose: '10–20 billion CFU daily',
    form: 'Refrigerated, strain-specified capsule',
    timing: 'With food',
    evidence: 'Strong',
    emoji: '🦠',
  },
  {
    id: 'b-longum',
    name: 'Probiotic — B. longum',
    stack: 'Microbiome',
    purpose: 'Calms inflammation & gut-brain axis.',
    why: 'Bifidobacterium ferments fiber into butyrate, nurturing colonocytes.',
    dose: '5–10 billion CFU daily',
    form: 'Multi-strain blend with HN019 is ideal',
    timing: 'Evening with dinner',
    evidence: 'Moderate',
    emoji: '🦠',
  },
  {
    id: 's-boulardii',
    name: 'Saccharomyces boulardii',
    stack: 'Microbiome',
    purpose: 'Beneficial yeast — fights C. difficile and supports SIgA.',
    why: 'Transient; clears pathogens and increases secretory IgA at the gut lining.',
    dose: '5 billion CFU, 1–2× daily',
    form: 'Shelf-stable capsule',
    timing: 'With meals during flares / antibiotics',
    evidence: 'Strong',
    emoji: '🍄',
  },
  {
    id: 'prebiotic-inulin',
    name: 'Prebiotic fiber (inulin / PHGG)',
    stack: 'Microbiome',
    purpose: 'Feeds beneficial bacteria.',
    why: 'Short-chain fatty acid production (butyrate) heals the colon.',
    dose: '5 g working up to 10 g',
    form: 'Partially-hydrolyzed guar gum (PHGG) is low-FODMAP friendly',
    timing: 'Morning, with water',
    evidence: 'Moderate',
    emoji: '🌾',
  },

  // Detox & Cellular
  {
    id: 'brocelite',
    name: 'BrocElite (stabilized sulforaphane)',
    stack: 'Detox & Cellular',
    purpose: 'Activates NRF2 — master antioxidant switch.',
    why: 'Up-regulates 200+ cyto-protective genes, supports phase-II liver detox, calms systemic inflammation.',
    dose: '1 capsule (50 mg sulforaphane) daily',
    form: 'Stabilized glucoraphanin + myrosinase',
    timing: 'With breakfast fats',
    evidence: 'Strong',
    emoji: '🥦',
  },
  {
    id: 'magnesium',
    name: 'Magnesium glycinate / malate',
    stack: 'Detox & Cellular',
    purpose: 'Nervous system, sleep, anti-inflammatory cofactor.',
    why: '80% of North Americans are deficient; magnesium powers 300+ enzymes, including gut motility.',
    dose: '300–400 mg elemental daily',
    form: 'Glycinate for sleep, malate for energy',
    timing: 'Glycinate at bedtime, malate morning',
    evidence: 'Strong',
    emoji: '🌙',
  },
  {
    id: 'liposomal-c',
    name: 'Liposomal Vitamin C',
    stack: 'Detox & Cellular',
    purpose: 'Immune modulation, collagen synthesis, antioxidant.',
    why: 'Liposomal form dramatically increases intracellular uptake versus ascorbic acid.',
    dose: '1000 mg 1–2× daily',
    form: 'Phosphatidylcholine-encapsulated',
    timing: 'AM + midday, away from copper foods',
    evidence: 'Moderate',
    emoji: '🍊',
  },

  // RCP
  {
    id: 'whole-food-c',
    name: 'Whole-food Vitamin C (camu, acerola)',
    stack: 'Root Cause Protocol',
    purpose: 'Loads copper into ceruloplasmin.',
    why: 'Ascorbic acid is incomplete; whole-food C carries the full complex needed for mineral transport.',
    dose: '¼ tsp camu or 2 acerola daily',
    form: 'Powder or chewable',
    timing: 'Morning with food',
    evidence: 'Emerging',
    emoji: '🍒',
  },
  {
    id: 'beef-liver',
    name: 'Grass-fed beef liver (retinol)',
    stack: 'Root Cause Protocol',
    purpose: 'Supplies pre-formed vitamin A (retinol) for ceruloplasmin.',
    why: 'Retinol binds iron and supports copper metabolism — RCP cornerstone.',
    dose: '1 oz fresh or 3 capsules daily',
    form: 'Desiccated capsules or fresh',
    timing: 'With meals',
    evidence: 'Emerging',
    emoji: '🥩',
  },
  {
    id: 'mag-rbc',
    name: 'Magnesium (RCP protocol)',
    stack: 'Root Cause Protocol',
    purpose: 'Balance magnesium with copper & iron.',
    why: 'Magnesium is needed to activate ceruloplasmin — without it, iron accumulates in tissues.',
    dose: '5 mg / lb body weight',
    form: 'Bis-glycinate + topical oil',
    timing: 'Split AM / PM',
    evidence: 'Moderate',
    emoji: '⚡',
  },
  {
    id: 'copper-balance',
    name: 'Whole-food copper balance',
    stack: 'Root Cause Protocol',
    purpose: 'Oysters, liver, bee pollen — bio-available copper.',
    why: 'Copper is required to recycle iron safely. RCP avoids isolated synthetic copper.',
    dose: 'Food-first: oysters weekly, liver 1–2× / week',
    form: 'Whole food',
    timing: 'With zinc-rich meals',
    evidence: 'Emerging',
    emoji: '🪨',
  },

  // Anti-inflammatory
  {
    id: 'omega3',
    name: 'Omega-3 (EPA/DHA)',
    stack: 'Anti-Inflammatory',
    purpose: 'Resolves inflammation via SPMs.',
    why: 'North American omega-6 : omega-3 ratio is 20:1; restoring 4:1 quiets the gut.',
    dose: '2 g combined EPA/DHA daily',
    form: 'Triglyceride-form wild fish oil',
    timing: 'With fattiest meal',
    evidence: 'Strong',
    emoji: '🐟',
  },
  {
    id: 'quercetin',
    name: 'Quercetin',
    stack: 'Anti-Inflammatory',
    purpose: 'Mast-cell stabilizer; anti-histamine.',
    why: 'Helps if gluten exposure triggered histamine symptoms (flushing, headaches).',
    dose: '500 mg, 1–2× daily',
    form: 'With bromelain for absorption',
    timing: 'Empty stomach',
    evidence: 'Moderate',
    emoji: '🌺',
  },
  {
    id: 'curcumin',
    name: 'Liposomal Curcumin',
    stack: 'Anti-Inflammatory',
    purpose: 'Inhibits NF-κB inflammatory cascade.',
    why: 'Directly calms the gut immune response that gluten and leaky gut trigger.',
    dose: '400–800 mg daily',
    form: 'Liposomal or Meriva phytosome',
    timing: 'With fats',
    evidence: 'Strong',
    emoji: '🌼',
  },
];

export const STACK_ORDER: Stack[] = [
  'Gut Repair',
  'Microbiome',
  'Detox & Cellular',
  'Root Cause Protocol',
  'Anti-Inflammatory',
];

export const STACK_DESCRIPTION: Record<Stack, string> = {
  'Gut Repair': 'Raw materials and cofactors to physically rebuild the intestinal lining.',
  Microbiome: 'Restore a diverse, butyrate-producing ecosystem that trains your immune system.',
  'Detox & Cellular': 'Support liver pathways, mitochondria, and the NRF2 antioxidant response.',
  'Root Cause Protocol':
    'Morley Robbins\' framework: restore mineral metabolism (magnesium, bioavailable copper, whole-food C and retinol) so iron stops driving oxidative stress.',
  'Anti-Inflammatory': 'Tame the systemic fire so the gut has room to heal.',
};
