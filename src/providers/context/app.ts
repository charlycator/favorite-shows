import { createContext } from 'react';

import {
  TOMDBShowsList,
  TOMDBSeason,
  TOMDBShow,
} from '../../lib/types.ts';

type Props = {
  showsList?: TOMDBShowsList,
  seasonInfo?: TOMDBSeason,
  selectedSeason?: string,
  selectedShow?: TOMDBShow,
  updateSelectedSeason: (season: string) => void,
  error?: string,
  querySeasonInfo: (showId: string, seasonNumber: string) => void,
  searchShow: (query: string) => void,
  queryShow: (showId: string) => void,
}

const AppContext = createContext<Props | undefined>(undefined);

export default AppContext;