import { ocExtra } from '../data/ocExtraContent';
import OCSection from './OCSection';

/** "OC Extra Practice" card: original OC-style sets (not official papers). */
function OCExtraPage() {
  return <OCSection collection={ocExtra} />;
}

export default OCExtraPage;
