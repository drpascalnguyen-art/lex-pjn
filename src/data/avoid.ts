export type AvoidCategory =
  | 'DEFINITELY_AVOID'
  | 'HIDDEN_SOURCE'
  | 'USUALLY_SAFE'
  | 'CERTIFIED_GF'
  | 'INFLAMMATORY'
  | 'FODMAP';

export type AvoidItem = {
  id: string;
  name: string;
  category: AvoidCategory;
  note: string;
};

export const AVOID_ITEMS: AvoidItem[] = [
  // Obvious wheat family
  { id: 'wheat', name: 'Wheat', category: 'DEFINITELY_AVOID', note: 'All varieties contain gluten.' },
  { id: 'barley', name: 'Barley', category: 'DEFINITELY_AVOID', note: 'Hides in malt, beer, soup bases.' },
  { id: 'rye', name: 'Rye', category: 'DEFINITELY_AVOID', note: 'Pumpernickel, rye bread, rye whiskey.' },
  { id: 'spelt', name: 'Spelt', category: 'DEFINITELY_AVOID', note: 'Ancient wheat variety — still gluten.' },
  { id: 'kamut', name: 'Kamut (Khorasan)', category: 'DEFINITELY_AVOID', note: 'Ancient wheat cultivar.' },
  { id: 'farro', name: 'Farro', category: 'DEFINITELY_AVOID', note: 'Emmer wheat — not gluten-free.' },
  { id: 'triticale', name: 'Triticale', category: 'DEFINITELY_AVOID', note: 'A rye/wheat hybrid.' },
  { id: 'semolina', name: 'Semolina', category: 'DEFINITELY_AVOID', note: 'Durum wheat — classic pasta flour.' },
  { id: 'bulgur', name: 'Bulgur', category: 'DEFINITELY_AVOID', note: 'Cracked wheat.' },
  { id: 'couscous', name: 'Couscous', category: 'DEFINITELY_AVOID', note: 'Tiny wheat pasta.' },
  { id: 'malt', name: 'Malt / Malt Flavoring', category: 'DEFINITELY_AVOID', note: 'Derived from barley — malt vinegar, cereals.' },
  { id: 'beer', name: 'Regular beer', category: 'DEFINITELY_AVOID', note: 'Brewed from barley. Look for certified GF brews.' },

  // Hidden sources
  { id: 'soy-sauce', name: 'Most soy sauces', category: 'HIDDEN_SOURCE', note: 'Traditional soy sauce is fermented with wheat. Use tamari.' },
  { id: 'deli-meats', name: 'Deli meats / sausages', category: 'HIDDEN_SOURCE', note: 'Fillers and binders often contain gluten.' },
  { id: 'salad-dressing', name: 'Salad dressings', category: 'HIDDEN_SOURCE', note: 'Thickeners and malt vinegar are common culprits.' },
  { id: 'soup-base', name: 'Soups & bouillon cubes', category: 'HIDDEN_SOURCE', note: 'Wheat-based thickeners everywhere.' },
  { id: 'fake-meat', name: 'Seitan / mock meats', category: 'HIDDEN_SOURCE', note: 'Seitan is pure wheat gluten.' },
  { id: 'licorice', name: 'Black licorice', category: 'HIDDEN_SOURCE', note: 'Uses wheat flour as a binder.' },
  { id: 'flavored-chips', name: 'Flavored chips / seasonings', category: 'HIDDEN_SOURCE', note: 'Maltodextrin from wheat, wheat starch, malt.' },
  { id: 'candy', name: 'Candies with wafers or cookie bits', category: 'HIDDEN_SOURCE', note: 'Kit-Kat, Twix, 100 Grand, many chocolates.' },
  { id: 'medications', name: 'Some medications & supplements', category: 'HIDDEN_SOURCE', note: 'Wheat starch fillers. Ask your pharmacist for GF forms.' },
  { id: 'lipbalm', name: 'Lip balms / cosmetics', category: 'HIDDEN_SOURCE', note: 'Wheat-derived vitamin E or emollients can reach the gut.' },
  { id: 'communion', name: 'Communion wafers', category: 'HIDDEN_SOURCE', note: 'Ask for low-gluten / GF alternatives.' },
  { id: 'playdough', name: 'Play-Doh (for parents)', category: 'HIDDEN_SOURCE', note: 'Wheat-based — matters for kids who touch their mouths.' },

  // Cross-contamination triggers (tag as hidden-source)
  { id: 'shared-fryer', name: 'Shared deep fryer', category: 'HIDDEN_SOURCE', note: 'Breaded items contaminate the oil — skip french fries in mixed kitchens.' },
  { id: 'shared-toaster', name: 'Shared toaster', category: 'HIDDEN_SOURCE', note: 'Crumbs linger. Buy a dedicated GF toaster or use toaster bags.' },
  { id: 'wooden-board', name: 'Wooden cutting boards', category: 'HIDDEN_SOURCE', note: 'Porous — keep GF-only boards and utensils.' },

  // Inflammatory oils & additives
  { id: 'canola', name: 'Canola oil', category: 'INFLAMMATORY', note: 'Industrial extraction, oxidized omega-6. Favor olive, avocado, ghee.' },
  { id: 'soybean-oil', name: 'Soybean oil', category: 'INFLAMMATORY', note: 'Pro-inflammatory in excess — hides in restaurant foods.' },
  { id: 'vegetable-oil', name: '"Vegetable" oil', category: 'INFLAMMATORY', note: 'Usually soy, canola or corn blend.' },
  { id: 'sunflower', name: 'High-linoleic sunflower oil', category: 'INFLAMMATORY', note: 'OK occasionally; avoid as a primary cooking oil.' },
  { id: 'carrageenan', name: 'Carrageenan', category: 'INFLAMMATORY', note: 'Linked to gut inflammation in susceptible people.' },
  { id: 'msg', name: 'MSG / autolyzed yeast', category: 'INFLAMMATORY', note: 'Excitotoxin for sensitive folks.' },
  { id: 'artificial-colors', name: 'Artificial colors (Red 40, Yellow 5)', category: 'INFLAMMATORY', note: 'Associated with gut dysbiosis and mood swings.' },

  // FODMAP
  { id: 'onion', name: 'Onion (raw)', category: 'FODMAP', note: 'High fructan — irritating to sensitive IBS/leaky gut.' },
  { id: 'garlic', name: 'Garlic (raw)', category: 'FODMAP', note: 'High fructan — try garlic-infused oil as a swap.' },
  { id: 'apple', name: 'Apple', category: 'FODMAP', note: 'High in fructose & sorbitol — gas and bloating trigger.' },
  { id: 'legumes', name: 'Legumes (large servings)', category: 'FODMAP', note: 'GOS-heavy — soak, sprout or pressure-cook to tolerate.' },

  // Certified GF & usually safe
  { id: 'gf-oats', name: 'Certified GF oats', category: 'CERTIFIED_GF', note: 'Regular oats get cross-contaminated during processing.' },
  { id: 'gf-flour-blend', name: 'Certified GF flour blend', category: 'CERTIFIED_GF', note: 'Look for the GFCO seal.' },
  { id: 'tamari', name: 'Tamari (GF soy sauce)', category: 'CERTIFIED_GF', note: 'Wheat-free umami savior.' },
  { id: 'rice', name: 'Rice (all colors)', category: 'USUALLY_SAFE', note: 'Naturally gluten-free. Rinse well.' },
  { id: 'quinoa', name: 'Quinoa', category: 'USUALLY_SAFE', note: 'Pseudo-grain — rinse to remove saponins.' },
  { id: 'buckwheat', name: 'Buckwheat', category: 'USUALLY_SAFE', note: 'Unrelated to wheat — gluten-free pseudo-grain.' },
];

export const CATEGORY_META: Record<AvoidCategory, { label: string; color: string; emoji: string }> = {
  DEFINITELY_AVOID: { label: 'Definitely avoid', color: 'bg-red-100 text-red-700', emoji: '🔴' },
  HIDDEN_SOURCE: { label: 'Hidden source', color: 'bg-amber-100 text-amber-700', emoji: '🟡' },
  USUALLY_SAFE: { label: 'Usually safe', color: 'bg-sage-200 text-sage-700', emoji: '🟢' },
  CERTIFIED_GF: { label: 'Certified GF', color: 'bg-sage-100 text-sage-700', emoji: '🟢' },
  INFLAMMATORY: { label: 'Inflammatory', color: 'bg-orange-100 text-orange-700', emoji: '🟠' },
  FODMAP: { label: 'High-FODMAP', color: 'bg-blush-100 text-blush-500', emoji: '🟣' },
};
