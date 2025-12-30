exports.extractBasicInfo = (text) => ({
  name: (text.match(/^([A-Z][a-z]+\s[A-Z][a-z]+)/m) || [""])[0],
  email: (text.match(/[a-zA-Z0-9._%+-]+@[a-z.-]+\.[a-z]{2,}/) || [""])[0],
  phone: (text.match(/(\+?\d{10,15})/) || [""])[0]
});
