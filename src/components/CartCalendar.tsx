import { Cart } from "@/types/core";
import { useMemo } from "react";

interface CartCalendarProps {               
    cart: Cart;
}

const CartCalendar = ({ cart }: CartCalendarProps) => {
    const today = useMemo(() => new Date().getDay(), []);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="flex py-4 gap-4 justify-center">
            {weekDays.map((day, index) => (
                <div
                    key={index}
                    className={`
                        w-8 h-8 flex items-center justify-center
                        border border-gray-200 rounded
                        shadow-sm
                        text-white
                        ${index === today ? 'border-b-2 border-b-blue-500' : ''}
                    `}
                >
                    {day}
                </div>
            ))}
        </div>
    )
}

export default CartCalendar;    