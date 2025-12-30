import { matchJD } from "../api";
import { useState } from "react";

export default function JDMatcher({ setResult }) {
  const [jd, setJD] = useState("");

  return (
    <>
      <textarea onChange={e => setJD(e.target.value)} />
      <button onClick={async () => setResult((await matchJD(jd)).data)}>
        Match Job Description
      </button>
    </>
  );
}
