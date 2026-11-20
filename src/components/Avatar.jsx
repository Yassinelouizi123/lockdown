import sara from '../assets/avatars/sara.svg';
import lina from '../assets/avatars/lina.svg';
import omar from '../assets/avatars/omar.svg';
import nour from '../assets/avatars/nour.svg';

const MAP = { sara, lina, omar, nour };

export default function Avatar({ name, size = 48, className = '' }) {
  return <img src={MAP[name]} width={size} height={size} alt="" className={`shrink-0 rounded-full border-2 border-ink bg-white ${className}`} />;
}
