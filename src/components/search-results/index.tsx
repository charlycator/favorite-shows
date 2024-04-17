import { useEffect, useState } from 'react';
import { ISearchResults } from '../../lib/interfaces.ts';


const SearchResults = ({
  onSelect,
  results,
}: ISearchResults ) => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(results);
  }, [results]);

  const Result = ({ label }: {label: string}) => (
    <li
      onClick={() => onSelect?.(label)}
      className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
        {label}
    </li>
  );

  return (
    <ul className="bg-white border border-gray-100 w-full mt-2">
      {
            list.map((item: string) => (<Result label={item} />))
      }
    </ul>
  )
}

export default SearchResults;