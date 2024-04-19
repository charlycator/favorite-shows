import axios from 'axios';

import {
  LS_BOOKMARKS_KEY,
  OMDB_API_URL,
} from './constants.ts';
import {
  TBookmarkedEpisodes,
  TEpisode,
  TSeason,
  TShowsList,
  TShow,
} from './types.ts';


export const isEpisodeBookmarked = (episode: TEpisode): boolean => {
  const showEpisodesList = localStorage.getItem(LS_BOOKMARKS_KEY);

  if (!showEpisodesList) return false;

  const showEpisodes: TEpisode[] = JSON.parse(showEpisodesList)[episode.showId!];

  if (!showEpisodes) return false;

  return !!showEpisodes.find((ep: TEpisode) => ep.id === episode.id)
}

export const getBoomarkedEpisodes = (): TBookmarkedEpisodes => {
  return JSON.parse(localStorage.getItem(LS_BOOKMARKS_KEY) || '{}');
}

export const bookmarkEpisode = (episode: TEpisode, showName: string): TBookmarkedEpisodes => {
  const showEpisodes = JSON.parse(localStorage.getItem(LS_BOOKMARKS_KEY) || '{}');
  const episodesList: TEpisode[] = showEpisodes[episode.showId!] || [];

  showEpisodes[episode.showId!] = episodesList.concat(Object.assign(episode, {showName}));
  localStorage.setItem(LS_BOOKMARKS_KEY, JSON.stringify(showEpisodes));

  return showEpisodes;
}

export const removeEpisode = (episode: TEpisode): TBookmarkedEpisodes | undefined => {
  const showEpisodes = JSON.parse(localStorage.getItem(LS_BOOKMARKS_KEY) || '{}');

  if (!showEpisodes) return undefined;

  const episodesList: TEpisode[] = showEpisodes[episode.showId!];

  if (!showEpisodes) return undefined;

  const updatedList = episodesList.filter((ep: TEpisode) => ep.id !== episode.id);

  if (updatedList.length === 0) delete showEpisodes[episode.showId!];
  else showEpisodes[episode.showId!] = updatedList;

  localStorage.setItem(LS_BOOKMARKS_KEY, JSON.stringify(showEpisodes));

  return showEpisodes;
}

export const removeStorage = () => {
  localStorage.clear();
}

export const querySeasonInfo = async (showId: string, seasonNumber: number, showName?: string): Promise<TSeason> => {
  const response = await axios.get(OMDB_API_URL, {
    params: {
      i: showId,
      Season: seasonNumber,
      type: 'series',
      apikey: import.meta.env.VITE_OMDB_API_KEY
    }
  });

  if (response.data.Error) throw new Error (response.data.Error);

  return {
    number: response.data.Season,
    totalSeasons: response.data.totalSeasons,
    episodesNumber: response.data.Episodes.length - 1,
    episodes: response.data.Episodes.map((episode: { imdbID: any; Title: any; Released: any; }) => ({
      id: episode.imdbID,
      title: episode.Title,
      released: episode.Released,
      season: response.data.Season,
      showId,
      showName,
    })),
  }
}

export const querySpecificShow = async (showId: string): Promise<TShow> => {
  const response = await axios.get(OMDB_API_URL, {
    params: {
      i: showId,
      type: 'series',
      apikey: import.meta.env.VITE_OMDB_API_KEY
    }
  });

  if (response.data.Error) throw new Error (response.data.Error);

  return {
    id: response.data.imdbID,
    title: response.data.Title,
    seasons: +response.data.totalSeasons,
    imageUrl: response.data.Poster,
    released: response.data.Released,
    plot: response.data.Plot,
  };
}

export const searchShow = async (query: string): Promise<TShowsList> => {
  const url = OMDB_API_URL + `?s=*${query}*&type=series&apikey=${import.meta.env.VITE_OMDB_API_KEY}`;
  const response = await axios.get(url);

  if (response.data.Error) throw new Error (response.data.Error);

  return response.data.Search.map((show: { imdbID: any; Title: any; }) => ({
    id: show.imdbID,
    title: show.Title,
  }));
}
