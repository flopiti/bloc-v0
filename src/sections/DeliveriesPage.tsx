import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import Calendar from '../components/Calendar';
import CalendarDelivery from '../components/CalendarDelivery';
import DeliveryInfo from '../components/DeliveryInfo';
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
                    onClick={() => cart.nextDelivery && setSelectedDate(cart.nextDelivery)}
                />
            )}

            <Calendar 
                nextDelivery={cart?.nextDelivery}
                selectedDate={selectedDate ? dayjs(selectedDate) : undefined}
                onDateClick={handleDateClick}
                isEdit={cart?.nextDelivery ? false : true}
                showMessage={!cart?.nextDelivery}
            />

            {selectedDate && (
                <DeliveryInfo
                    selectedDate={selectedDate}
                    nextDelivery={cart?.nextDelivery}
                    confirmedItems={cart?.confirmedItems || []}
                    pendingItems={cart?.pendingItems || []}
                    goToPage={goToPage}
                />
            )}
        </>
    );
};

export default DeliveriesPage;