import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { WhatIsGluten } from './pages/WhatIsGluten';
import { WhatToAvoid } from './pages/WhatToAvoid';
import { WhatToEat } from './pages/WhatToEat';
import { FoodScanner } from './pages/FoodScanner';
import { Supplements } from './pages/Supplements';
import { MealJournal } from './pages/MealJournal';
import { GutSchool } from './pages/GutSchool';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/what-is-gluten" element={<WhatIsGluten />} />
        <Route path="/avoid" element={<WhatToAvoid />} />
        <Route path="/eat" element={<WhatToEat />} />
        <Route path="/scanner" element={<FoodScanner />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/journal" element={<MealJournal />} />
        <Route path="/school" element={<GutSchool />} />
      </Route>
    </Routes>
  );
}
