exports.matchesSearchQuery = (key, searchQuery) => {
  searchQuery = searchQuery.toLowerCase();
  key = key.toLowerCase();

  // Creare una mappa delle occorrenze dei caratteri in 'key'
  const charMap = {};
  for (let char of key) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  // Controllare se ogni carattere in 'searchQuery' è presente in 'key'
  for (let char of searchQuery) {
    if (!charMap[char]) {
      return false;
    }
    charMap[char]--;
  }

  return true;
};

exports.createSubDicts = (data) => {
  const resultArray = [];

  Object.keys(data).forEach((key) => {
    const firstLetter = key.charAt(0).toUpperCase();
    let group = resultArray.find((item) => item.letter === firstLetter);

    if (!group) {
      group = { letter: firstLetter, items: [] };
      resultArray.push(group);
    }

    group.items.push({ key, value: data[key] });
  });

  return resultArray;
};
