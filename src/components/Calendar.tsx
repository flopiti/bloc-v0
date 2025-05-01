import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { TbTruckDelivery } from 'react-icons/tb';
import { isPastOrToday, WEEK_DAYS, NEXT_FOUR_WEEKS, TODAY } from '@/utils/dates';
import { CALENDAR_MODE } from '@/enums/core';
import { DELIVERY_DAYS } from '@/constants/core';
import PulseContainer from './PulseContainer';

interface CalendarProps {
    nextDelivery?: Date;
    onDateClick?: (date: dayjs.Dayjs) => void;
    mode?: CALENDAR_MODE;
    selectedDate?: dayjs.Dayjs;
    isEdit?: boolean;
    message?: string;
}

const Calendar = ({ nextDelivery, onDateClick, mode = CALENDAR_MODE.FOUR_WEEKS, selectedDate, isEdit = false, message}: CalendarProps) => {
    const isNextDelivery = (date: dayjs.Dayjs) : boolean => {
        if (!nextDelivery) return false;
        return date.isSame(dayjs(nextDelivery), 'day');
    };

    const isTwoWeeksFromNextDelivery = (date: dayjs.Dayjs) : boolean => {
        if (!nextDelivery) return false;
        const twoWeeksFromNext = dayjs(nextDelivery).add(2, 'week');
        return date.isSame(twoWeeksFromNext, 'day');
    };

    const getDates = () : dayjs.Dayjs[] => {
        if (mode === CALENDAR_MODE.ONE_WEEK) {
            return Array.from({ length: 7 }, (_, i) => TODAY.add(i, 'day'));
        }
        return NEXT_FOUR_WEEKS.flat();
    };

    const getWeekDays = () : string[] => {
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
        <PulseContainer pulse={isEdit}>
            <div className="bg-white/5 rounded-xl p-4 relative">
                <div className="grid grid-cols-7 gap-2">
                    {weekDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="text-center">
                            <div className="text-white/60 text-xs mb-2">
                                {day}
                            </div>
                        </div>
                    ))}
                    {dates.map((date, index) => (
                        <div key={index} className="text-center">
                            <motion.button 
                                type="button"
                                onClick={() => onDateClick?.(date)}
                                className={`flex items-center justify-center rounded-full text-sm ${
                                    isNextDelivery(date) ? 'w-11 h-11 -m-1' : 'w-8 h-8'
                                } ${
                                    isPastOrToday(date) || (mode === CALENDAR_MODE.FOUR_WEEKS && !isDeliveryDay(date))
                                        ? 'text-white/30 cursor-not-allowed' 
                                        : 'text-white hover:bg-white/10'
                                } ${isEdit ? 'cursor-pointer' : 'cursor-default'}`}
                                style={{
                                    backgroundColor: isTwoWeeksFromNextDelivery(date) 
                                        ? 'rgba(30, 58, 138, 0.5)' 
                                        : selectedDate?.isSame(date, 'day') 
                                            ? 'rgba(255, 255, 255, 0.1)' 
                                            : 'transparent',
                                    border: selectedDate?.isSame(date, 'day') ? '2px solid white' : 'none'
                                }}
                                initial={false}
                                animate={{
                                    scale: selectedDate?.isSame(date, 'day') ? 1.1 : 1
                                }}
                                whileHover={isEdit ? {
                                    scale: 1.05,
                                    backgroundColor: isTwoWeeksFromNextDelivery(date)
                                        ? 'rgba(30, 58, 138, 0.7)'
                                        : 'rgba(255, 255, 255, 0.1)'
                                } : undefined}
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

                {message && (
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
                        {message}
                    </motion.div>
                )}

            </div>
        </PulseContainer>
    );
};

export default Calendar; 