import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import Calendar from './Calendar';
import CalendarDelivery from './CalendarDelivery';

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