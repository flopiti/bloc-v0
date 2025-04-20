import { Cart } from "@/types/core";
import { useMemo } from "react";

interface CartCalendarProps {               
    cart: Cart;
}

const CartCalendar = ({ cart }: CartCalendarProps) => {
    const today = useMemo(() => new Date().getDay(), []);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    console.log(cart.nextDelivery);

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-white">Next Delivery</h1>
            <div className="flex pt-4 pb-4 justify-between">
                {weekDays.map((day, index) => (
                    <div
                        key={index}
                        className={`
                            w-8 h-8 flex items-center justify-center
                            border border-gray-200 rounded
                            text-white
                            ${index === today ? 'border-3 border-white font-bold' : ''}
                        `}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CartCalendar;    