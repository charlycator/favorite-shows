import { useShow } from '../../hooks';
import {
  SearchShow,
  ShowEpisodesList,
  ShowDetail,
} from '../../containers';


function SearchShowView() {
  const { selectedShow } = useShow();

  return (
    <div className="grid grid-cols-1 place-items-center relative">
      <SearchShow />
      {selectedShow && (
        <div className="w-full z-0">
          <p className="text-3xl my-12">
            {selectedShow.title}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full">
            <ShowDetail />
            <ShowEpisodesList />
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchShowView;
