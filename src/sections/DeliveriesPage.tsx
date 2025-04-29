import dayjs from 'dayjs';
import {  AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import Calendar from '@/components/Calendar';
import CalendarDelivery from '@/components/CalendarDelivery';
import DeliveryInfo from '@/components/DeliveryInfo';
import { useState } from 'react';
import { DELIVERY_DAYS } from '@/constants/core';
import { PAGE } from '@/enums/core';

interface DeliveriesPageProps {
    openDrawer: () => void;
    goToPage: (page: PAGE) => void;
}

const DeliveriesPage = ({openDrawer, goToPage}:DeliveriesPageProps) => {
    const { cart, isCartValid } = useCartStore();
    const { setDeliveryDate, confirmCart, cancelDelivery } = useCart();
    const [selectedDate,setSelectedDate] = useState<Date | null>(null);
    const [canEditDate, setCanEditDate] = useState(false);
    
    const handleDateClick = (date: dayjs.Dayjs) => {
        const isToday = date.isSame(dayjs(), 'day');
        const isDeliveryDay = DELIVERY_DAYS.includes(date.format('dddd'));
        const doesCartHaveDelivery = cart?.nextDelivery;

        const isEditMode = canEditDate || !doesCartHaveDelivery;
        //For now we only set dates when you have no date
        if(!isToday && isDeliveryDay && isEditMode) {
            setDeliveryDate(date.toDate());
            setCanEditDate(false);
        }
        else if(!isEditMode) {
            setSelectedDate(selectedDate?.getTime() === date.toDate().getTime() ? null : date.toDate());
        }
    };

    const handleConfirmDelivery = () => isCartValid() ? confirmCart() : openDrawer();

    const handleEditDate = () => {
        setCanEditDate(true);
        setSelectedDate(null);
    };

    const handleCancelDelivery = () => {
        cancelDelivery();
        setCanEditDate(false);
        setSelectedDate(null);
    };

    return (
        <div className="flex flex-col">
            <motion.div
                animate={{ 
                    height: cart?.nextDelivery ? "auto" : 0,
                    transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }
                }}
            >
                <AnimatePresence mode="wait">
                    {cart?.nextDelivery && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ 
                                opacity: 0,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                }
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                        >
                            <CalendarDelivery
                                nextDelivery={cart.nextDelivery}
                                isConfirmed={cart.confirmed}
                                onConfirm={handleConfirmDelivery}
                                onClick={() => cart.nextDelivery && setSelectedDate(cart.nextDelivery)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div 
                className="flex flex-col gap-4"
                animate={{ 
                    y: cart?.nextDelivery ? 0 : 10,
                    transition: {
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                    }
                }}
            >
                <div>
                    <motion.h2 
                        className="text-white/80 text-sm font-medium tracking-wider mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        >
                        Delivery Calendar
                    </motion.h2>
                    <Calendar 
                        nextDelivery={cart?.nextDelivery}
                        selectedDate={selectedDate ? dayjs(selectedDate) : undefined}
                        onDateClick={handleDateClick}
                        isEdit={canEditDate || !cart?.nextDelivery}
                        message={
                            !cart?.nextDelivery ? 'Please select the date of your first biweekly delivery' 
                            : canEditDate ? 'Select a date for the delivery' 
                            : undefined
                        }
                    />
                </div>
                <AnimatePresence mode="wait">
                    {canEditDate && cart?.nextDelivery && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ 
                                opacity: 0,
                                y: -10,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                }
                            }}
                            transition={{
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            className="w-full flex justify-center"
                        >
                            <button
                                onClick={handleCancelDelivery}
                                className="py-2 px-4 text-red-600/90 border-2 border-red-600/85 rounded-md transition-colors"
                            >
                                Cancel Delivery
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedDate && !canEditDate && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ 
                            opacity: 0,
                            y: 20,
                            transition: {
                                duration: 0.3,
                                ease: [0.4, 0, 0.2, 1]
                            }
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                    >
                        <DeliveryInfo
                            setCanEditDate={handleEditDate}
                            selectedDate={selectedDate}
                            nextDelivery={cart?.nextDelivery}
                            confirmedItems={cart?.confirmedItems || []}
                            pendingItems={cart?.pendingItems || []}
                            goToPage={goToPage}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DeliveriesPage;