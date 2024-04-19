export type TShow = {
  id: string,
  title: string,
  seasons?: number,
  imageUrl?: string,
  released?: string,
  plot?: string,
}

export type TShowsList = TShow[];

export type TSeason= {
  number: number,
  totalSeasons: number,
  episodesNumber: number,
  episodes: TEpisode[],
}

export type TEpisode = {
  showName?: string,
  showId?: string,
  season?: number,
  id: string,
  title: string,
  released: string,
  number: number,
}

export type TBookmarkedEpisodes = Record<string, TEpisode[]>; // showId, episodes
