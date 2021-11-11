const dayOfWeek = num => new Date(num * 1000).toLocaleDateString("en", {weekday: "long"});
const timeOfDay = label => new Date(label).toLocaleTimeString('en-US');
const dayOfMonth = dateText => new Date(dateText).toLocaleDateString('en-us', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const capitalizeFirstLetterOfWords = string => string.replace(/\b\w/g, l => l.toUpperCase())

const celsiusToFahr = temp => {
  return ((temp * (9/5)) + 32).toFixed(2)
}

export { dayOfWeek, timeOfDay, dayOfMonth, capitalizeFirstLetter, capitalizeFirstLetterOfWords, celsiusToFahr }