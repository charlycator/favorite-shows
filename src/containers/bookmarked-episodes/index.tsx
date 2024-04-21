import { useBookmarks } from '../../hooks';
import { TEpisode } from '../../lib/types.ts';


const BookmarkedEpisodes = () => {
  const { bookmarkedEpisodes, removeBookmarkedEpisode } = useBookmarks();

  if (!bookmarkedEpisodes || Object.keys(bookmarkedEpisodes).length === 0) return null;

  const ShowEpisodesList = ({ episodes }: {episodes: TEpisode[]}) => (
    <div className="overflow-x-auto mt-6">
      <table className="table">
        <tbody>
        {episodes.map((episode, index) => (
          <tr key={`episode-${episode.number}-${episode.id}`}>
            <td className="text-right">
              <div className="flex flex-col items-start gap-3">
                <div className="text-sm opacity-50">{`S${episode.season} - Ep. ${index + 1} (${episode.released})`}</div>
                <div className="font-bold">{episode.title}</div>
              </div>
            </td>
            <td className="text-right">
              <div className="rating gap-1">
                <input
                  onClick={() => removeBookmarkedEpisode(episode)}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-600" />
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {Object.keys(bookmarkedEpisodes).map((showId: string) => (
        <div key={`show-${showId}`}>
          <p className="text-3xl my-12">
            {bookmarkedEpisodes[showId][0].showName}
          </p>
          <ShowEpisodesList episodes={bookmarkedEpisodes[showId]} />
        </div>
      ))}
    </div>
  )
};

export default BookmarkedEpisodes;