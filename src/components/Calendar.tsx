import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { TbTruckDelivery } from 'react-icons/tb';
import { isPastOrToday, WEEK_DAYS, NEXT_FOUR_WEEKS } from '@/utils/dates';

interface CalendarProps {
    nextDelivery?: Date;
    onDateClick: (date: dayjs.Dayjs) => void;
}

const Calendar = ({ nextDelivery, onDateClick }: CalendarProps) => {
    const isNextDelivery = (date: dayjs.Dayjs) => {
        if (!nextDelivery) return false;
        return date.isSame(dayjs(nextDelivery), 'day');
    };

    const isTwoWeeksFromNextDelivery = (date: dayjs.Dayjs) => {
        if (!nextDelivery) return false;
        const twoWeeksFromNext = dayjs(nextDelivery).add(2, 'week');
        return date.isSame(twoWeeksFromNext, 'day');
    };

    return (
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
            {!nextDelivery && (
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
                            onClick={() => onDateClick(date)}
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
    );
};

export default Calendar; 