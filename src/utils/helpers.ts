const capitalCase = (sentence: string): string => {
  return sentence
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export { capitalCase };
