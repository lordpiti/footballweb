class Helpers {
  static groupBy(array, property) {
    const hash = {};
    const props = property.split('.');

    for (let i = 0; i < array.length; i++) {
        const key = props.reduce(function(acc, prop) {
            return acc && acc[prop];
        }, array[i]);
        if (!hash[key]) {
          hash[key] = [];
        }
        hash[key].push(array[i]);
    }
    return hash;
  }


  static removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}
}

export default Helpers;


