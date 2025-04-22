import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import useCart from '@/hooks/useCart';
import { TbTruckDelivery } from 'react-icons/tb';
import { isPastOrToday, WEEK_DAYS, NEXT_FOUR_WEEKS } from '@/utils/dates';

const DeliveriesPage = () => {
    const { cart } = useCartStore();
    const { setDeliveryDate } = useCart();


    const handleDateClick = (date: dayjs.Dayjs) => {
        setDeliveryDate(date.toDate());
    };

    const isNextDelivery = (date: dayjs.Dayjs) => {
        if (!cart?.nextDelivery) return false;
        return date.isSame(dayjs(cart.nextDelivery), 'day');
    };

    const isTwoWeeksFromNextDelivery = (date: dayjs.Dayjs) => {
        if (!cart?.nextDelivery) return false;
        const twoWeeksFromNext = dayjs(cart.nextDelivery).add(2, 'week');
        return date.isSame(twoWeeksFromNext, 'day');
    };

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
                    className="mb-6 p-4 bg-white/5 rounded-xl flex items-center gap-3"
                >
                    <TbTruckDelivery className="w-6 h-6 text-blue-500" />
                    <div>
                        <div className="text-white/60 text-sm">Next Delivery</div>
                        <div className="text-white font-medium">
                            {dayjs(cart.nextDelivery).format('dddd, MMMM D, YYYY')}
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div 
                layout
                transition={{ 
                    layout: { 
                        duration: 0.3,
                        ease: "easeOut"
                    }
                }}
                className="bg-white/5 rounded-xl p-4 relative"
            >
                {!cart?.nextDelivery && (
                    <motion.div
                        className="absolute inset-0 border-2 border-secondary rounded-xl pointer-events-none"
                        animate={{
                            borderColor: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.1)'],
                            borderWidth: ['2px', '3px', '4px', '3px', '2px']
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1]
                        }}
                    />
                )}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {WEEK_DAYS.map((day, dayIndex) => (
                        <div key={dayIndex} className="text-center">
                            <div className="text-white/60 text-xs">
                                {day}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {NEXT_FOUR_WEEKS.flat().map((date, index) => (
                        <div key={index} className="text-center">
                            <button 
                                type="button"
                                disabled={isPastOrToday(date)}
                                onClick={() => handleDateClick(date)}
                                className={`flex items-center justify-center rounded-full text-sm cursor-pointer transition-all ${
                                    isNextDelivery(date) ? 'w-11 h-11 -m-1' : 'w-8 h-8'
                                } ${
                                    isPastOrToday(date) 
                                        ? 'text-white/30 cursor-not-allowed' 
                                        : 'text-white hover:bg-white/10'
                                } ${
                                    isNextDelivery(date)
                                        ? 'border-2 border-blue-500'
                                        : isTwoWeeksFromNextDelivery(date)
                                        ? 'bg-blue-500/20'
                                        : ''
                                }`}
                            >
                                {isNextDelivery(date) ? (
                                    <motion.div
                                        animate={{
                                            y: [0.5, -0.2, 0.5]
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <TbTruckDelivery className="w-8 h-8" strokeWidth={0.75} />
                                    </motion.div>
                                ) : (
                                    date.date()
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>

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