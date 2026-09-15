import { useContext } from 'react';
import { PeopleContext } from './PeopleProvider';

export function usePeople() {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }
  return context;
}
