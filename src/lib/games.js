import { Detective, HandSwipeRight, Key, Lightning, Siren } from '@phosphor-icons/react';

export const ORDER = ['crack', 'swipe', 'osint', 'breach', 'quiz'];
export const META = {
  crack:  { icon: Key,        mins: 5, color: '#b6a8ff' },
  swipe:  { icon: HandSwipeRight,    mins: 3, color: '#c8ff00' },
  osint:  { icon: Detective,  mins: 4, color: '#ff9ec7' },
  breach: { icon: Siren,      mins: 4, color: '#ffc15e' },
  quiz:   { icon: Lightning,  mins: 3, color: '#7be7ff' }
};
export const starsOf = p => p >= 90 ? 3 : p >= 60 ? 2 : p >= 30 ? 1 : 0;
