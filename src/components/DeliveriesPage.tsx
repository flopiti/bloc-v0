import { useMemo } from 'react';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const DeliveriesPage = () => {
    const today = useMemo(() => dayjs(), []);
    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, i) => {
            return dayjs().day(i).format('ddd');
        });
    }, []);

    const nextFourWeeks = useMemo(() => {
        const weeks = [];
        for (let i = 0; i < 4; i++) {
            const weekStart = today.add(i, 'week').startOf('week');
            const weekDays = Array.from({ length: 7 }, (_, j) => {
                return weekStart.add(j, 'day');
            });
            weeks.push(weekDays);
        }
        return weeks;
    }, [today]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white">Deliveries</h1>
                <span className="px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm">
                    Biweekly
                </span>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-4"
            >
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
                    {nextFourWeeks.flat().map((date, index) => (
                        <div key={index} className="text-center">
                            <div className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm">
                                {date.date()}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default DeliveriesPage;