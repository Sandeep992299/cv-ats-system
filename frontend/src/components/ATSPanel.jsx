import { checkATS } from "../api";

export default function ATSPanel({ setATS }) {
  return <button onClick={async () => setATS((await checkATS()).data)}>
    Run ATS Scan
  </button>;
}
