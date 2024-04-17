import { FC } from 'react';
import { ISearchInput } from '../../lib/interfaces.ts';
import { SearchIcon } from '../../components/icons';


const SearchInput: FC<ISearchInput> = ({
  isRequired = true,
  label = 'Search',
  placeholder = '',
}) => {
  return (
    <form className="max-w-md mx-auto">
      <label
        htmlFor="search-input"
        className="mb-2 text-sm font-medium text-gray-900 sr-only bg-red-600">
          {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          id="search-input"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          required={isRequired} />
      </div>
    </form>
  )
}

export default SearchInput;

