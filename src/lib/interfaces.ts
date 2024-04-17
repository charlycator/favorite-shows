export interface ISearchInput {
  isRequired?: boolean
  label?: string,
  placeholder?: string,
}

export interface ISearchResults {
  onSelect: (val: string) => void,
  results: string[],
}