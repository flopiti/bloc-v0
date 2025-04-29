import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="w-full bg-white/10 px-4 py-3 rounded-lg outline-none transition-all duration-200
                 focus:border-b-2 focus:border-white/50 focus:rounded-none focus:rounded-t-lg
                 placeholder:text-white/50 text-white"
      />
      <MdSearch 
        className="absolute right-4 bottom-3.5 text-white/50 w-5 h-5" 
      />
    </div>
  );
};

export default SearchBar; 