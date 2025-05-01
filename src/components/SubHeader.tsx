interface SubHeaderProps {
  text: string;
}

const SubHeader = ({ text }: SubHeaderProps) => {
  return (
    <h2 className="text-white/80 text-sm font-medium tracking-wider mb-4">
      {text}
    </h2>
  );
};

export default SubHeader; 