function getKeys(object) {
  return Object.keys(object);
}

function getItems(data, key) {
  if (data[key] && data[key].items) {
    return data[key].items;
  }
  return [];
}

function isValidArray(array){
    return Array.isArray(array) && array.length > 0
}
function isPresentinAllColumns(columnName, array){
    return array.every(item=>item[columnName])
}

function Group(array = [], column) {
  if(!isValidArray(array)){
    throw Error('array parameter is not a valid array');
  }
  if(!column){
    throw Error('You must provide a column name that should exist in all objects')
  }
  if(!isPresentinAllColumns(column,array)){
    throw Error(`${column} must be present in all objects`)
  }
  const reduceFn = reduceGroup(column);
  const data = array.reduce(reduceFn, {});
  return {
    data,
    sum: function (alias, columnName) {
      for (let key of getKeys(data)) {
        const array = getItems(data, key);
        const totalByColum = sumByColumn(columnName);
        const total = array.reduce(totalByColum, 0);
        data[key] = {
          ...data[key],
          [alias]: total,
        };
      }
      return this;
    },
    min: function (alias, columnName) {
      for (let key of getKeys(data)) {
        const array = getItems(data, key);
        const min = Math.min(...array.map((item) => item[columnName]));
        data[key] = {
          ...data[key],
          [alias]: min,
        };
      }
      return this;
    },
    max: function (alias, columnName) {
      for (let key of getKeys(data)) {
        const array = getItems(data, key);
        const max = Math.max(...array.map((item) => item[columnName]));
        data[key] = {
          ...data[key],
          [alias]: max,
        };
      }
      return this;
    },
    avg: function (alias, columnName, decimals = 2) {
      for (let key of getKeys(data)) {
        const array = getItems(data, key);
        const totalByColum = sumByColumn(columnName);
        const total = array.reduce(totalByColum, 0);
        const avg = total / array.length;
        data[key] = {
          ...data[key],
          [alias]: avg.toFixed(decimals),
        };
      }
      return this;
    },
    distinctCount: function (alias, columnName) {
      for (let key of getKeys(data)) {
        const array = getItems(data,key);
        const total = countDiffentElements(array, columnName);
        data[key] = {
          ...data[key],
          [alias]: total,
        };
      }
      return this;
    },
  };
}
function countDiffentElements(array, columnName) {
  return array.reduce((result, item) => {
    const value = item[columnName];
    if (!result.includes(value)) {
      result.push(value);
    }
    return result;
  }, []).length;
}
function sumByColumn(column) {
  return function (result, item) {
    return +result + +item[column];
  };
}

function reduceGroup(column) {
  return function (result, item) {
    const value = item[column];
    if (!result[value]) {
      result[value] = { items: [] };
    }
    result[value].items.push(item);
    return result;
  };
}
module.exports = Group;