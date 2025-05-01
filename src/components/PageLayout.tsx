import { IoArrowBack } from 'react-icons/io5';
import { PAGE } from '@/enums/core';
import { useNavigationStore } from '@/stores/navigationStore';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
    rightElementText?: string;
}

const PageLayout = ({ title, children, rightElementText }: PageLayoutProps) => {
    const { goToPage } = useNavigationStore();

    return (
        <div className="p-6 w-full pt-safe">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => goToPage(PAGE.HOME)}
                        className="p-2 hover:bg-secondary/20 rounded-full transition-colors z-10"
                        style={{
                            WebkitTapHighlightColor: 'transparent',
                            touchAction: 'manipulation'
                        }}
                    >
                        <IoArrowBack className="w-6 h-6 text-white" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                </div>
                {rightElementText && (
                    <span className="px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm">
                        {rightElementText}
                    </span>
                )}
            </div>
            {children}
        </div>
    );
};

export default PageLayout; 