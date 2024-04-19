import {
  TShow,
  TShowsList,
} from './types.ts';

export interface ISearchInput {
  isRequired?: boolean
  label?: string,
  placeholder?: string,
  results?: TShowsList,
  onSearch: (val: string) => void,
  onSelect: (show: TShow) => void,
}
