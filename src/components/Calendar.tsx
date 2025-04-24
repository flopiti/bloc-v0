import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { TbTruckDelivery } from 'react-icons/tb';
import { isPastOrToday, WEEK_DAYS, NEXT_FOUR_WEEKS, TODAY } from '@/utils/dates';
import { CALENDAR_MODE } from '@/enums/core';
import { DELIVERY_DAYS } from '@/sections/DeliveriesPage';


interface CalendarProps {
    nextDelivery?: Date;
    onDateClick? : (date: dayjs.Dayjs) => void;
    mode?: CALENDAR_MODE;
    selectedDate?: dayjs.Dayjs;
}

const Calendar = ({ nextDelivery, onDateClick, mode = CALENDAR_MODE.FOUR_WEEKS, selectedDate }: CalendarProps) => {
    const isNextDelivery = (date: dayjs.Dayjs) => {
        if (!nextDelivery) return false;
        return date.isSame(dayjs(nextDelivery), 'day');
    };

    const isTwoWeeksFromNextDelivery = (date: dayjs.Dayjs) => {
        if (!nextDelivery) return false;
        const twoWeeksFromNext = dayjs(nextDelivery).add(2, 'week');
        return date.isSame(twoWeeksFromNext, 'day');
    };

    const getDates = () => {
        if (mode === CALENDAR_MODE.ONE_WEEK) {
            return Array.from({ length: 7 }, (_, i) => TODAY.add(i, 'day'));
        }
        return NEXT_FOUR_WEEKS.flat();
    };

    const getWeekDays = () => {
        if (mode === CALENDAR_MODE.ONE_WEEK) {
            return Array.from({ length: 7 }, (_, i) => TODAY.add(i, 'day').format('ddd'));
        }
        return WEEK_DAYS;
    };
    const isDeliveryDay = (date: dayjs.Dayjs) => {
        return DELIVERY_DAYS.includes(date.format('dddd'));
    };
    const dates = getDates();
    const weekDays = getWeekDays();

    return (
        <motion.div 
            className="bg-white/5 rounded-xl p-4 relative"
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
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
                {weekDays.map((day, dayIndex) => (
                    <div key={dayIndex} className="text-center">
                        <div className="text-white/60 text-xs">
                            {day}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
                {dates.map((date, index) => (
                    <div key={index} className="text-center">
                        <motion.button 
                            type="button"
                            disabled={isPastOrToday(date)}
                            onClick={() => onDateClick?.(date)}
                            className={`flex items-center justify-center rounded-full text-sm cursor-pointer relative ${
                                isNextDelivery(date) ? 'w-11 h-11 -m-1' : 'w-8 h-8'
                            } ${
                                isPastOrToday(date) || (mode === CALENDAR_MODE.FOUR_WEEKS && !isDeliveryDay(date))
                                    ? 'text-white/30 cursor-not-allowed' 
                                    : 'text-white hover:bg-white/10'
                            } ${isTwoWeeksFromNextDelivery(date) ? 'bg-blue-900/50' : ''}`}
                            initial={false}
                            animate={{
                                scale: selectedDate?.isSame(date, 'day') ? 1.1 : 1,
                                backgroundColor: isTwoWeeksFromNextDelivery(date) 
                                    ? 'rgba(30, 58, 138, 0.5)' 
                                    : selectedDate?.isSame(date, 'day') 
                                        ? 'rgba(255, 255, 255, 0.1)' 
                                        : 'transparent',
                                border: selectedDate?.isSame(date, 'day') ? '2px solid white' : 'none'
                            }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: isTwoWeeksFromNextDelivery(date)
                                    ? 'rgba(30, 58, 138, 0.7)'
                                    : 'rgba(255, 255, 255, 0.1)'
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
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
                        </motion.button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Calendar; 