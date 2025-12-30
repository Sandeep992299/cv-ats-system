exports.calculateATS = (text) => {
  let score = 0;
  const issues = [];

  // Section checks (40%)
  if (/experience/i.test(text)) score += 15;
  else issues.push("Missing Experience section");

  if (/education/i.test(text)) score += 15;
  else issues.push("Missing Education section");

  if (/skills/i.test(text)) score += 10;
  else issues.push("Missing Skills section");

  // Keyword density (40%)
  const keywords = ["JavaScript", "React", "Node", "SQL", "AWS", "Docker"];
  const hits = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase())).length;
  score += Math.min(hits * 7, 40);

  // Formatting safety (20%)
  if (!/table|image|graphic/i.test(text)) score += 20;
  else issues.push("Complex formatting detected");

  return {
    atsScore: score,
    issues,
    status: score >= 70 ? "PASS" : "FAIL"
  };
};
