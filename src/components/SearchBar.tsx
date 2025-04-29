import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-white/10 px-4 py-3 rounded-lg outline-none transition-all duration-200
                 focus:border-b-2 focus:border-white/50 focus:rounded-none focus:rounded-t-lg
                 placeholder:text-white/50"
      />
      <Search 
        className="absolute right-4 bottom-3.5 text-white/50 w-5 h-5" 
        strokeWidth={1.5}
      />
    </div>
  );
};

export default SearchBar; 