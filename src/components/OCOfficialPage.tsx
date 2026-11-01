import { ocOfficial } from '../data/ocContent';
import OCSection from './OCSection';

/** "OC" card: the official NSW practice tests (2026 entry). */
function OCOfficialPage() {
  return <OCSection collection={ocOfficial} />;
}

export default OCOfficialPage;
