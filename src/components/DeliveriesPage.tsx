import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import { TbTruckDelivery } from 'react-icons/tb';
import Calendar from './Calendar';

interface DeliveriesPageProps {
    openDrawer: () => void;
}

const DeliveriesPage = ({openDrawer}:DeliveriesPageProps) => {
    const { cart, isCartValid } = useCartStore();
    const { setDeliveryDate, confirmCart } = useCart();

    const handleDateClick = (date: dayjs.Dayjs) => {
        setDeliveryDate(date.toDate());
    };

    const handleConfirmDelivery = () => isCartValid() ? confirmCart() : openDrawer();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Deliveries</h1>
                <span className="px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm">
                    Biweekly
                </span>
            </div>

            {cart?.nextDelivery && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                    className="mb-6 p-4 bg-white/5 rounded-xl flex flex-col gap-3"
                >
                    <div className="flex items-center gap-3">
                        <TbTruckDelivery className="w-6 h-6 text-blue-500" />
                        <div>
                            <div className="text-white/60 text-sm">Next Delivery</div>
                            <div className="text-white font-medium">
                                {dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')}
                            </div>
                        </div>
                    </div>
                    {!cart.confirmed && (
                        <motion.button
                            onClick={handleConfirmDelivery}
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Confirm Delivery
                        </motion.button>
                    )}
                </motion.div>
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