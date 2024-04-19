import { useContext }  from 'react';
import { BookmarksContext } from '../providers/context';

const useBookmarks = () => {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }

  return context;
}

export default useBookmarks;