import { AnimatePresence, motion } from 'framer-motion'
import Home from '@/sections/Home';
import Drawer from '@/sections/Drawer';
import useCart from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import { DrawerButton } from '@/components/DrawerButton';
import DeliveriesPage from '@/sections/DeliveriesPage';
import { PAGE } from '@/enums/core';
import CartPage from '@/sections/CartPage';
import PageLayout from '@/components/PageLayout';
import ProductsPage from '@/sections/ProductsPage';
import { useNavigationStore } from '@/stores/navigationStore';
import { PageConfig } from '@/types/ui';

const PAGES: PageConfig[] = [
  { page: PAGE.HOME, title: "Home", component: <Home /> },
  { page: PAGE.DELIVERIES, title: "Deliveries", component: <DeliveriesPage />, rightElementText: "Biweekly" },
  { page: PAGE.CART, title: "Cart", component: <CartPage /> },
  { page: PAGE.PRODUCTS, title: "Products", component: <ProductsPage /> }
];

const App = () => {
  const { isDrawerOpen, currentView } = useNavigationStore();
  useCart();
  useProducts();

  const currentPage = PAGES.find(page => page.page === currentView);
  const isHome = currentView === PAGE.HOME;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ x: isHome ? -390 : 390 }}
          animate={{ x: 0 }}
          exit={{ x: isHome ? -390 : 390 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isHome ? (
            <Home />
          ) : currentPage && (
            <PageLayout 
              title={currentPage.title}
              rightElementText={currentPage.rightElementText}
            >
              {currentPage.component}
            </PageLayout>
          )}
        </motion.div>
      </AnimatePresence>

      {!isDrawerOpen && <DrawerButton />}
      <Drawer />
    </div>
  )
}

export default App;
