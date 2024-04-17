export type TOMDBResponseField = {
  Response: "True" | "False"
}

export type TOMDBShow = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string
}

export type TOMDBShowsList = TOMDBResponseField & {
  Search: TOMDBShow[],
  totalResults: string,
}

export type TOMDBEpisode = TOMDBResponseField & {
  Title: string,
  Released: string,
  Episode: string,
  imdbRating: string,
  imdbID: string
}

export type TOMDBSeason = TOMDBResponseField & {
  Title: string,
  Season: string,
  totalSeasons: string,
  Episodes: TOMDBEpisode[]
}

export type TOMDBSuccessQueryResult = TOMDBResponseField & {
  Title: string,
  Year: string,
  Rated: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Director: string,
  Writer: string,
  Actors: string,
  Plot: string,
  Language: string,
  Country: string,
  Awards: string,
  Poster: string,
  Ratings?: [
    {
      Source: string,
      Value: string
    }
  ],
  Metascore: string,
  imdbRating: string,
  imdbVotes: string,
  imdbID: string,
  Type: string,
  totalSeasons: string,
}

export type TOMDBError = TOMDBResponseField & {
  Error: string
}

export type TShow = {
  name: string,
  sessions: number,
  imageUrl?: string,
}

export type TShowSession = {
  showsNumber: number,
}

export type TShowEpisode = {
  name: string,
  imageUrl: string,
  description: string,
  duration: string,
}
