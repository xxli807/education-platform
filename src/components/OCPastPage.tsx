import { ocPast } from '../data/ocPastContent';
import OCSection from './OCSection';

/** "OC Past Papers" card: the older official NSW OC Sample Test. */
function OCPastPage() {
  return <OCSection collection={ocPast} />;
}

export default OCPastPage;
