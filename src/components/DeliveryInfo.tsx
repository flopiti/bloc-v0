import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { FiShoppingCart, FiCalendar } from 'react-icons/fi';
import { DELIVERY_DAYS } from '@/constants/core';
import { PAGE } from '@/enums/core';
import useCart from '@/hooks/useCart';

interface DeliveryInfoProps {
    selectedDate: Date;
    nextDelivery?: Date;
    confirmedItems: any[];
    pendingItems: any[];
    goToPage: (page: PAGE) => void;
}

const DeliveryInfo = ({ selectedDate, nextDelivery, confirmedItems, pendingItems, goToPage }: DeliveryInfoProps) => {
    const { setDeliveryDate } = useCart();

    return (
        <motion.div
            id="delivery-info"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: 0,
                height: nextDelivery && dayjs(selectedDate).isSame(nextDelivery, 'day') ? 175 : 100
            }}
            transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                layout: {
                    duration: 0.3
                }
            }}
            className="mt-6 p-4 bg-white/5 rounded-xl"
        >
            <motion.div
                animate={{ 
                    color: DELIVERY_DAYS.includes(dayjs(selectedDate).format('dddd')) 
                        ? ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.6)']
                        : ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1]
                }}
                className="text-center font-medium"
            >
                {DELIVERY_DAYS.includes(dayjs(selectedDate).format('dddd')) 
                    ? (nextDelivery && dayjs(selectedDate).isSame(nextDelivery, 'day')
                        ? 'DELIVERY DAY'
                        : 'DELIVERY AVAILABLE')
                    : 'DELIVERY UNAVAILABLE'}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-2 text-center"
            >
                <div className="text-white/60 text-sm">
                    {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
                </div>
                {nextDelivery && dayjs(selectedDate).isSame(nextDelivery, 'day') && (
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4"
                        >
                            <div className="text-white/60 text-sm mb-2">
                                {confirmedItems.length + pendingItems.length} items in cart
                            </div>
                            <div className="flex gap-2">
                                <motion.button
                                    onClick={() => goToPage(PAGE.CART)}
                                    className="flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg px- py-2 transition-colors flex-1"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiShoppingCart className="w-5 h-5 text-secondary" />
                                    <span className="text-white font-medium">View Cart</span>
                                </motion.button>
                                <motion.button
                                    onClick={() => goToPage(PAGE.DELIVERIES)}
                                    className="flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/30 rounded-lg px-3 py-2 transition-colors flex-1"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FiCalendar className="w-5 h-5 text-secondary" />
                                    <span className="text-white font-medium">Change Date</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default DeliveryInfo; 