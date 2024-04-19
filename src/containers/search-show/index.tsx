import { useShow } from '../../hooks';
import { SearchInput } from '../../components';


const SearchShow = () => {
  const {
    showsList,
    searchShow,
    updateSelectedShow } = useShow();

  return (
    <SearchInput
      onSearch={searchShow}
      onSelect={updateSelectedShow}
      results={showsList}
      label="Search a show"
      placeholder="Type a show" />
  );
};

export default SearchShow;
