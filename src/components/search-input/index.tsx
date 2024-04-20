import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ISearchInput } from '../../lib/interfaces.ts';
import { SearchIcon } from '../../components/icons';
import {
  TShow,
  TShowsList,
} from "@/lib/types.ts";


const SearchInput = ({
  isRequired = true,
  label = 'Search',
  placeholder = '',
  results,
  onSearch,
  onSelect,
}: ISearchInput) => {
  const [list, setList] =
    useState<TShowsList | undefined>(undefined);
  const searchInputRef = useRef<any>('');
  const [showResults, setShowResults] =
    useState<boolean>(false);

  const debounced = useDebouncedCallback(
    (value: string) => {
      if (!value) setShowResults(false);
      onSearch(value);
    },
    300 // delay in ms
  );

  const onSelectResult = (show: TShow) => {
    setShowResults(false);
    searchInputRef.current.value = '';
    onSelect?.(show);
  }

  useEffect(() => {
    setList(results);
    setShowResults(!!results?.length);
  }, [results]);

  return (
    <>
      {/* The input field */}
      <form className="w-full mx-auto">
        <label
          htmlFor="search-input"
          className="sr-only">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            ref={searchInputRef}
            onChange={(e) => debounced(e.target.value)}
            type="search"
            id="search-input"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            required={isRequired} />
        </div>
      </form>

      {/* The pop-up with the results */}
      {showResults && (
        <ul className="bg-white border border-gray-100 w-full absolute z-50 top-[54px]">
        {
          list?.map((show: TShow) => (
            <li
              key={`$show-${show.id}`}
              onClick={() => onSelectResult(show)}
              className="pl-8 pr-2 py-3 text-black border-b-1 border-indigo-100 relative cursor-pointer hover:bg-indigo-200 hover:text-gray-900">
              {show.title}
            </li>
          ))
        }
      </ul>
      )}
    </>
  )
}

export default SearchInput;
