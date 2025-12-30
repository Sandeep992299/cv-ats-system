exports.matchJD = (cvText, jdText) => {
  const jdWords = [...new Set(jdText.match(/\b[A-Za-z]+\b/g))];
  const matched = jdWords.filter(w =>
    cvText.toLowerCase().includes(w.toLowerCase())
  );

  return {
    matchPercentage: Math.round((matched.length / jdWords.length) * 100),
    matchedSkills: matched.slice(0, 15),
    missingSkills: jdWords.filter(w => !matched.includes(w)).slice(0, 15)
  };
};
