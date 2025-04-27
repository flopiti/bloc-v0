import { IoArrowBack } from 'react-icons/io5';

interface PageLayoutProps {
    title: string;
    goHome: () => void;
    children: React.ReactNode;
    rightElement?: React.ReactNode;
}

const PageLayout = ({ title, goHome, children, rightElement }: PageLayoutProps) => {
    return (
        <div className="p-6 w-full pt-safe">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => goHome()}
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
                {rightElement}
            </div>
            {children}
        </div>
    );
};

export default PageLayout; 