import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { TbTruckDelivery } from 'react-icons/tb';

interface CalendarDeliveryProps {
    nextDelivery: Date;
    isConfirmed: boolean;
    onConfirm: () => void;
    onClick?: () => void;
}

const CalendarDelivery = ({ nextDelivery, isConfirmed, onConfirm, onClick }: CalendarDeliveryProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
                opacity: 0,
                transition: {
                    duration: 0.2,
                    ease: "easeOut"
                }
            }}
            transition={{ 
                duration: 0.2,
                ease: "easeOut"
            }}
            className={`mb-6 p-4 bg-white/5 rounded-xl flex flex-col gap-3 ${!isConfirmed ? 'cursor-pointer hover:bg-white/10' : ''}`}
            onClick={onClick}
        >
            <motion.div 
                className="flex items-center gap-3"
            >
                <TbTruckDelivery className="w-7 h-7 mx-1 text-white" strokeWidth={1.5}/>
                <div>
                    <div className="text-white/60 text-sm">Next Delivery</div>
                    <div className="text-white font-medium">
                        {dayjs(nextDelivery).format('dddd, MMMM D, YYYY')}
                    </div>
                </div>
            </motion.div>
            <AnimatePresence mode="wait">
                {!isConfirmed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ 
                            opacity: 0, 
                            height: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeOut"
                            }
                        }}
                        transition={{ 
                            duration: 0.2,
                            ease: "easeOut"
                        }}
                    >
                        <motion.button
                            onClick={onConfirm}
                            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Confirm Delivery
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CalendarDelivery; 