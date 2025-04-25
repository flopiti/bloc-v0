import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import Calendar from '../components/Calendar';
import CalendarDelivery from '../components/CalendarDelivery';
import { useState } from 'react';
import { DELIVERY_DAYS } from '@/constants/core';

interface DeliveriesPageProps {
    openDrawer: () => void;
}

const DeliveriesPage = ({openDrawer}:DeliveriesPageProps) => {
    const { cart, isCartValid } = useCartStore();
    const { setDeliveryDate, confirmCart } = useCart();
    const [selectedDate,setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (date: dayjs.Dayjs) => {
        const isToday = date.isSame(dayjs(cart?.nextDelivery), 'day');
        const isDeliveryDay = DELIVERY_DAYS.includes(date.format('dddd'));
        const doesCartHaveDelivery = cart?.nextDelivery;

        //For now we only set dates when you have no date
        if(!isToday && isDeliveryDay && !doesCartHaveDelivery) {
            setDeliveryDate(date.toDate());
        }
        else setSelectedDate(date.toDate());
    };

    const handleConfirmDelivery = () => isCartValid() ? confirmCart() : openDrawer();

    return (
        <>
            {cart?.nextDelivery && (
                <CalendarDelivery
                    nextDelivery={cart.nextDelivery}
                    isConfirmed={cart.confirmed}
                    onConfirm={handleConfirmDelivery}
                />
            )}

            <Calendar 
                nextDelivery={cart?.nextDelivery}
                selectedDate={selectedDate ? dayjs(selectedDate) : undefined}
                onDateClick={handleDateClick}
            />
            {
                !cart?.nextDelivery  && (
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
                )
            }
            {selectedDate && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                    className="mt-4 p-4 bg-white/5 rounded-xl"
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
                            ? 'DELIVERY DAY'
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
                        {cart?.nextDelivery && dayjs(selectedDate).isSame(cart.nextDelivery, 'day') && (
                            <div className="text-secondary text-sm mt-1">
                                Your next delivery
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default DeliveriesPage;