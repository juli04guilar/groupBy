function getKeys(object) {
  return Object.keys(object);
}

function getItems(data, key) {
  if (data[key] && data[key].items) {
    return data[key].items;
  }
}

function isValidArray(array) {
  return Array.isArray(array) && array.length > 0;
}
function isPresentinAllColumns(columnName, array) {
  return array.every((item) => item[columnName]);
}
function map(data, action, alias) {
  for (let key of getKeys(data)) {
    const items = getItems(data, key);
    data[key] = {
      ...data[key],
      [alias]: action(items),
    };
  }
  return data;
}
function throwIfNotValid(alias, columnName) {
  if (!alias || !columnName) {
    throw Error(
      `Please make sure you are passing the correct arguments, "alias" and "columnName" are required`
    );
  }
}
function Group(array = [], column) {
  if (!isValidArray(array)) {
    throw Error("array parameter is not a valid array");
  }
  if (!column) {
    throw Error(
      "You must provide a column name that should exist in all objects"
    );
  }
  if (!isPresentinAllColumns(column, array)) {
    throw Error(`${column} must be present in all objects`);
  }
  const reduceFn = reduceGroup(column);
  let data = array.reduce(reduceFn, {});
  return {
    data,
    sum: function (alias, columnName) {
      throwIfNotValid(alias, columnName);
      map(
        data,
        (items) => {
          const totalByColum = sumByColumn(columnName);
          const total = items.reduce(totalByColum, 0);
          return total;
        },
        alias
      );
      return this;
    },
    min: function (alias, columnName) {
      throwIfNotValid(alias, columnName);
      map(
        data,
        (items) => Math.min(...items.map((item) => item[columnName])),
        alias
      );
      return this;
    },
    max: function (alias, columnName) {
      throwIfNotValid(alias, columnName);
      map(
        data,
        (items) => Math.max(...items.map((item) => item[columnName])),
        alias
      );
      return this;
    },
    avg: function (alias, columnName, decimals = 2) {
      throwIfNotValid(alias, columnName);
      map(
        data,
        (items) => {
          const totalByColum = sumByColumn(columnName);
          const total = items.reduce(totalByColum, 0);
          return (total / items.length).toFixed(decimals);
        },
        alias
      );
      return this;
    },
    distinctCount: function (alias, columnName) {
      throwIfNotValid(alias, columnName);
      map(data, (items) => countDiffentElements(items, columnName), alias);
      return this;
    },
    keys: (function (data) {
      return Object.keys(data);
    })(data),
    firstGroup: (function (data) {
      return data[Object.keys(data)[0]].items;
    })(data),
    lastGroup: (function (data) {
      const size = Object.keys(data).length - 1;
      return data[Object.keys(data)[size]].items;
    })(data),
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
