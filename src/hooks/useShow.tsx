import { useContext }  from 'react';
import { ShowContext } from '../providers/context';

const useShow = () => {
  const context = useContext(ShowContext);

  if (!context) {
    throw new Error('useShow must be used within a ShowProvider');
  }

  return context;
}

export default useShow;