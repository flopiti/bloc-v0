import dayjs from 'dayjs';
import {  AnimatePresence } from 'framer-motion';
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
    const { setDeliveryDate, confirmCart } = useCart();
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
            setSelectedDate(date.toDate());
        }
    };

    const handleConfirmDelivery = () => isCartValid() ? confirmCart() : openDrawer();

    const handleEditDate = () => {
        setCanEditDate(true);
        setSelectedDate(null);
    };

    console.log(cart?.nextDelivery);
    console.log(canEditDate);


    return (
        <>
            {cart?.nextDelivery && (
                <CalendarDelivery
                    nextDelivery={cart.nextDelivery}
                    isConfirmed={cart.confirmed}
                    onConfirm={handleConfirmDelivery}
                    onClick={() => cart.nextDelivery && setSelectedDate(cart.nextDelivery)}
                />
            )}

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

            <AnimatePresence>
                {selectedDate && !canEditDate && (
                    <DeliveryInfo
                        setCanEditDate={handleEditDate}
                        selectedDate={selectedDate}
                        nextDelivery={cart?.nextDelivery}
                        confirmedItems={cart?.confirmedItems || []}
                        pendingItems={cart?.pendingItems || []}
                        goToPage={goToPage}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default DeliveriesPage;