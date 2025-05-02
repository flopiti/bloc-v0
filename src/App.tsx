import { AnimatePresence, motion } from 'framer-motion'
import Home from '@/sections/Home';
import Drawer from '@/sections/Drawer';
import useCart from '@/hooks/useCart';
import useProducts from '@/hooks/useProducts';
import { DrawerButton } from '@/components/DrawerButton';
import { PAGE } from '@/enums/core';
import PageLayout from '@/components/PageLayout';
import { useNavigationStore } from '@/stores/navigationStore';
import { slideAnimation } from '@/utils/animations';
import { PAGES, PageConfig } from '@/constants/core';

const App = () => {

  const { isDrawerOpen, currentView } = useNavigationStore();

  useCart();
  useProducts();

  const currentPage = PAGES.find((page: PageConfig) => page.page === currentView);
  const isHome = currentView === PAGE.HOME;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          {...slideAnimation(isHome)}
        >
          {isHome ? (
            <Home />
          ) : 
          currentPage && (
            <PageLayout 
              title={currentPage.title}
              rightElementText={currentPage.rightElementText}
            >
              {currentPage.component()}
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
