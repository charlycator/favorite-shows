import { useState } from 'react';
import {
  useBookmarks,
  useShow,
} from '../../hooks';

const ShowEpisodesList = () => {
  const [ season, setSeason ] = useState<number>(1);
  const { selectedShow, updateSelectedSeason, selectedSeason } = useShow();
  const { bookmarkEpisode, removeBookmarkedEpisode, isEpisodeBookmarked } = useBookmarks();

  // @ts-ignore
  const updateSeason = ({ target }) => {
    setSeason(target.value);
    selectedShow && updateSelectedSeason(selectedShow.id, target.value);
  };

  const EpisodesList = () => (
    <div className="overflow-x-auto mt-6">
      <table className="table">
        <tbody>
          {selectedSeason?.episodes && selectedSeason?.episodes.map((episode, index) => (
            <tr key={`episode-${episode.number}-${episode.id}`}>
              <td className="text-right">
                <div className="flex flex-col items-start gap-3">
                  <div className="text-sm opacity-50">{`Ep. ${index + 1} (${episode.released})`}</div>
                  <div className="font-bold">{episode.title}</div>
                </div>
              </td>
              <td className="text-right">
                <div className="rating gap-1">
                  <input
                    onClick={() => isEpisodeBookmarked(episode)
                      ? removeBookmarkedEpisode(episode)
                      : bookmarkEpisode(episode, selectedShow!.title!)}
                    type="radio"
                    name="rating-2"
                    className={`mask mask-star-2 ${isEpisodeBookmarked(episode) ? 'bg-orange-600':'bg-orange-100'}`} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const SeasonSelector = () => (
    <label className="form-control w-full">
      <select
        className="select select-bordered"
        value={season}
        onChange={updateSeason}>
          {selectedShow?.seasons &&
            Array.from(
              Array(selectedShow?.seasons),
              (_, index) => (
                <option
                  value={(index + 1).toString()}
                  key={`season-${index + 1}`}>
                  {`Season ${index + 1}`}
                </option>
              ))
          }
        </select>
    </label>
  );

  return (
    <div>
      <SeasonSelector />
      <EpisodesList />
    </div>
  );
};

export default ShowEpisodesList;
