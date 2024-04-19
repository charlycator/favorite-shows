import { createContext } from 'react';

import {
  TSeason,
  TShow,
  TShowsList,
} from '../../lib/types.ts';

type Props = {
  error?: string,
  showsList?: TShowsList,
  selectedShow?: TShow,
  selectedSeason?: TSeason,
  updateSelectedSeason: (showId: string, season: number) => void,
  updateSelectedShow: (show?: TShow) => void,
  getSeasonDetails: (showId: string, seasonNumber: number) => void,
  getShowDetails: (showId: string) => void,
  searchShow: (query: string) => void,
}

const ShowContext = createContext<Props | undefined>(undefined);

export default ShowContext;