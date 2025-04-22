import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import Calendar from './Calendar';
import CalendarDelivery from './CalendarDelivery';

interface DeliveriesPageProps {
    openDrawer: () => void;
    goHome: () => void;
}

const DeliveriesPage = ({openDrawer, goHome}:DeliveriesPageProps) => {
    const { cart, isCartValid } = useCartStore();
    const { setDeliveryDate, confirmCart } = useCart();

    const handleDateClick = (date: dayjs.Dayjs) => {
        setDeliveryDate(date.toDate());
    };

    const handleConfirmDelivery = () => isCartValid() ? confirmCart() : openDrawer();

    return (
        <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => goHome()}
                        className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
                    >
                        <IoArrowBack className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">Deliveries</h1>
                </div>
                <span className="px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm">
                    Biweekly
                </span>
            </div>

            {cart?.nextDelivery && (
                <CalendarDelivery
                    nextDelivery={cart.nextDelivery}
                    isConfirmed={cart.confirmed}
                    onConfirm={handleConfirmDelivery}
                />
            )}

            <Calendar 
                nextDelivery={cart?.nextDelivery}
                onDateClick={handleDateClick}
            />

            {!cart?.nextDelivery  && (
                <motion.div
                    animate={{ 
                        color: ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.6)']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1]
                    }}
                    className="mt-4 text-center"
                >
                    Please select the date of your first biweekly delivery
                </motion.div>
            )}
        </div>
    );
};

export default DeliveriesPage;