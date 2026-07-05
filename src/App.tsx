import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AppLayout } from './components/layout/AppLayout';
import { ThemeProvider } from './components/ThemeProvider';
import { SplashScreen } from './components/SplashScreen';
import { Home } from './screens/Home';
import { Catalog } from './screens/Catalog';
import { ProductDetail } from './screens/ProductDetail';
import { Checkout } from './screens/Checkout';
import { Profile } from './screens/Profile';
import { Orders } from './screens/Orders';
import { Support } from './screens/Support';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}
