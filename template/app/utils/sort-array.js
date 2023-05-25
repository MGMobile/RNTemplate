export const sortWeigth = arr => {
  for(var i = arr.length - 1; i >= 0; i--) {
    for(var j = 1; j <= i; j++) {
      if (arr[j - 1].ordre > arr[j].ordre) {
        var temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};