import { createContext } from 'react';

import {
  TBookmarkedEpisodes,
  TEpisode,
} from '../../lib/types.ts';

type Props = {
  bookmarkedEpisodes?: TBookmarkedEpisodes,
  bookmarkEpisode: (episode: TEpisode, showName: string) => void,
  isEpisodeBookmarked: (episode: TEpisode) => boolean,
  removeBookmarkedEpisode: (episode: TEpisode) => void,
  clearBookmarks: () => void,
}

const BookmarksContext = createContext<Props | undefined>(undefined);

export default BookmarksContext;