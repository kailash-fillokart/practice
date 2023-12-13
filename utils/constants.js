export function capitalizeWords(text) {
  if (typeof text === 'undefined' || text === null) {
    return '';
  }
  var words = text.split(' ');
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  var capitalizedText = capitalizedWords.join(' ');
  return capitalizedText;
}
