export default values => {
  if (!Object.values(values).some(value => value === undefined)) {
    let year = '';
    year = values.slice(0, 4);
    let month = '';
    month = values.slice(5, 7);
    let day = '';
    day = values.slice(8, 10);
    return [day, month, year].join('/');
  }

  return undefined;
};
