import axios from 'axios';

import { OMDB_API_URL } from './constants.ts';
import {
  TOMDBSeason, TOMDBShow,
  TOMDBShowsList
} from './types.ts';



/* export const bookmarkEpisode = (episodeId: string) => {

}

export const removeEpisode = (episodeId: string) => {

} */

export const querySeasonInfo = async (showId: string, seasonNumber: string): Promise<TOMDBSeason> => {
  const response = await axios.put(OMDB_API_URL, {
    params: {
      i: showId,
      Season: seasonNumber,
      type: 'series',
      apikey: import.meta.env.OMDB_API_KEY
    }
  });

  if (response.data.Error) throw new Error (response.data.Error);

  return response.data;
}

export const querySpecificShow = async (showId: string): Promise<TOMDBShow> => {
  const response = await axios.put(OMDB_API_URL, {
    params: {
      i: showId,
      type: 'series',
      apikey: import.meta.env.OMDB_API_KEY
    }
  });

  if (response.data.Error) throw new Error (response.data.Error);

  return response.data;
}

export const searchShow = async (query: string): Promise<TOMDBShowsList> => {
  const response = await axios.put(OMDB_API_URL, {
    params: {
      s: `*${query}*`,
      type: 'series',
      apikey: import.meta.env.OMDB_API_KEY
    }
  });

  if (response.data.Error) throw new Error (response.data.Error);

  return response.data;
}