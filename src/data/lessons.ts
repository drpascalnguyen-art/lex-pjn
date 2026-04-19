export type Lesson = {
  id: string;
  title: string;
  body: string;
  tldr: string;
  emoji: string;
};

export const GUT_SCHOOL_LESSONS: Lesson[] = [
  {
    id: 'gut-brain',
    title: 'The Gut–Brain Axis',
    emoji: '🧠',
    tldr: '90% of your serotonin lives in your gut; your vagus nerve is the highway home.',
    body: `Your enteric nervous system holds over 500 million neurons. It talks to your brain constantly through the vagus nerve, which carries roughly 90% of its signals upward — from gut to brain, not the other way around. When gluten inflames the lining, the vagus carries an alarm signal that can show up as anxiety, brain fog, or a low mood before any tummy symptom appears. Healing the gut really does calm the mind.`,
  },
  {
    id: 'glyphosate',
    title: 'Glyphosate, Zonulin & Leaky Gut',
    emoji: '🧪',
    tldr: 'Roundup disrupts tight junctions by hijacking the same pathway gluten does.',
    body: `Glyphosate (the active ingredient in Roundup) is sprayed on North American wheat as a pre-harvest desiccant. Research from Dr. Alessio Fasano shows that both glyphosate and gliadin (a gluten fragment) stimulate zonulin release — the molecule that unlocks the tight junctions between enterocytes. The result is a double-hit: more permeability, more undigested peptides reaching the bloodstream, more autoimmune signaling. Organic, European, or sprouted wheat reduces glyphosate exposure, but celiacs should still avoid all gluten.`,
  },
  {
    id: 'na-wheat',
    title: 'Why North American Wheat Feels Worse',
    emoji: '🌾',
    tldr: 'Modern dwarf wheat + glyphosate desiccation = an inflammatory storm.',
    body: `Post-1960s hybridization produced "dwarf" wheat with far higher gluten content and novel protein structures the human gut had never encountered. Combine that with the North American practice of spraying glyphosate to speed harvest, plus industrial milling that strips the bran and germ, and you have a food nothing like the wheat our ancestors tolerated. Many North Americans digest heritage European, sprouted, or fermented wheat better — but celiacs still need complete avoidance.`,
  },
  {
    id: 'microbiome-immunity',
    title: 'Microbiome ↔ Immune System',
    emoji: '🛡️',
    tldr: '70% of your immune cells live in the gut lining — trained by microbes.',
    body: `Your gut-associated lymphoid tissue (GALT) is the largest immune organ in your body. Beneficial microbes teach T-regulatory cells how to distinguish friend from foe. When diversity drops — after antibiotics, stress, a gluten-heavy diet, or glyphosate — the immune system gets jumpy, often attacking your own tissues (autoimmunity). The fastest way back is fermented foods, polyphenols, and fiber diversity.`,
  },
  {
    id: 'testing',
    title: 'Testing for Gluten Sensitivity',
    emoji: '🧫',
    tldr: 'Go beyond the basic panel: Cyrex Array 3 and the Wheat Zoomer are the gold standards.',
    body: `Standard labs check tissue transglutaminase IgA (tTG-IgA) and total IgA. That catches classic celiac disease but misses most gluten sensitivity. Ask for:
• Cyrex Array 3 — screens for 10+ wheat peptides plus enzymes.
• Wheat Zoomer (Vibrant Wellness) — most detailed gluten reactivity panel.
• Zonulin — elevated suggests leaky gut is active.
• HLA-DQ2 / DQ8 — genetic celiac risk.
Stay ON gluten for 6+ weeks before blood testing; false negatives are common otherwise.`,
  },
  {
    id: 'organic-vs-conventional',
    title: 'Organic vs Conventional Wheat',
    emoji: '🌱',
    tldr: 'Organic wheat is still gluten — but vastly lower in glyphosate and synthetic residues.',
    body: `If you are non-celiac and only sensitive, fermented sourdough from organic ancient grains is the gentlest form of wheat. The long fermentation (24–48 h) breaks down up to 97% of gliadin. However, if you have a celiac diagnosis, no fermentation is enough. For everyone healing a leaky gut: removing all wheat for 3–6 months lets zonulin regulation reset.`,
  },
];

// What-Is-Gluten module sections
export const WHAT_IS_GLUTEN_SECTIONS = [
  {
    id: 'whatisgluten:definition',
    emoji: '🌾',
    title: 'What is gluten, really?',
    back: 'Gluten is a storage protein family (gliadin + glutenin) found in wheat, barley, rye, spelt, kamut, triticale and their hybrids. Gliadin is the especially problematic fragment for the gut.',
  },
  {
    id: 'whatisgluten:villi',
    emoji: '🔬',
    title: 'How it damages your villi',
    back: 'Gliadin fragments survive digestion and reach the gut lining. In celiac and sensitive guts they trigger the immune system to flatten villi — the tiny finger-like projections that absorb nutrients. Think of a lush shag carpet getting clear-cut to linoleum.',
  },
  {
    id: 'whatisgluten:conditions',
    emoji: '🧭',
    title: 'Celiac vs NCGS vs wheat allergy',
    back: 'Celiac disease = autoimmune villous atrophy (genetic, lifelong). Non-celiac gluten sensitivity (NCGS) = symptoms without villi damage but real immune activation. Wheat allergy = classic IgE allergy (hives, anaphylaxis).',
  },
  {
    id: 'whatisgluten:leaky',
    emoji: '🕳️',
    title: 'Leaky gut & zonulin',
    back: 'The gut lining is like a fine net. Gluten raises zonulin, which pops open the tight junctions between cells. Molecules that should stay in the gut leak into the bloodstream and provoke system-wide immune reactions.',
  },
  {
    id: 'whatisgluten:crisis',
    emoji: '🌎',
    title: 'The North American gut crisis',
    back: 'Ultra-processed food, rampant antibiotic use, chronic stress, low fiber, and glyphosate-sprayed wheat together collapse microbial diversity. Low diversity = weakened mucus layer = more permeability = more autoimmunity. The good news: each meal is a vote for a different ecosystem.',
  },
];
