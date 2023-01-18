const timeFormatter = (date: string) => {
  const tempDate = new Date(date);
  const formattedDate = tempDate.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric'
  });

  return formattedDate;
};

export default timeFormatter;
