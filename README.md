
[npm package](https://www.npmjs.com/package/groupjs_by)

# groupjs_by 🚀

[![Publish](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml)

**groupjs_by** is a lightweight JavaScript utility for grouping arrays of objects by a specific attribute. It supports powerful aggregation methods such as `sum`, `average`, `min`, `max`, and `distinctCount`, with full support for method chaining.

---

## 📦 Installation

Install using your preferred package manager:

```bash
npm install groupjs_by
```

---

## 🚀 Usage

### 🔢 sum(alias, columnName)

Aggregates the sum of values in the specified column.

| Parameter   | Type   | Description                                |
|------------|--------|--------------------------------------------|
| `alias`    | string | Alias for the aggregation result           |
| `columnName` | string | Column name to perform the summation on    |

**Example:**

```js
const data = [
  { category: 'mammals', name: 'lion', weight: 80 },
  { category: 'mammals', name: 'panther', weight: 100 },
  { category: 'reptiles', name: 'crocodile', weight: 100 }
];

const group = require('groupjs_by');
const result = group
  .groupBy(data, 'category')
  .sum('totalWeight', 'weight')
  .data;

// Result:
{
  mammals: {
    items: [...],
    totalWeight: 180
  },
  reptiles: {
    items: [...],
    totalWeight: 100
  }
}
```

---

### 📉 min(alias, columnName)

Finds the minimum value in the specified column.

| Parameter   | Type   | Description                              |
|------------|--------|------------------------------------------|
| `alias`    | string | Alias for the minimum value              |
| `columnName` | string | Column name to evaluate for minimum value |

---

### 📈 max(alias, columnName)

Finds the maximum value in the specified column.

| Parameter   | Type   | Description                              |
|------------|--------|------------------------------------------|
| `alias`    | string | Alias for the maximum value              |
| `columnName` | string | Column name to evaluate for maximum value |

---

### 📊 avg(alias, columnName, decimals)

Calculates the average of a column, formatted to a specific number of decimals.

| Parameter   | Type   | Description                                                    |
|------------|--------|----------------------------------------------------------------|
| `alias`    | string | Alias for the average value                                    |
| `columnName` | string | Column name to evaluate for average                           |
| `decimals` | number | Optional: Number of decimal places (default: 2)                |

---

### 🔢 distinctCount(alias, columnName)

Counts distinct values in a specified column.

| Parameter   | Type   | Description                              |
|------------|--------|------------------------------------------|
| `alias`    | string | Alias for the distinct count             |
| `columnName` | string | Column name to evaluate for uniqueness   |

---

## 🔗 Chaining Operations

You can chain multiple operations in a single expression:

```js
const result = group
  .groupBy(data, 'category')
  .distinctCount('uniqueAnimals', 'name')
  .avg('avgWeight', 'weight')
  .sum('totalWeight', 'weight')
  .data;
```

---

## 🗝️ Utility Methods

### `keys`

Returns an array of all group keys:

```js
group.groupBy(data, 'category').keys;
// ['mammals', 'reptiles']
```

### `firstGroup`

Returns the first grouped data based on original order:

```js
group.groupBy(data, 'category').firstGroup;
```

### `lastGroup`

Returns the last grouped data based on original order:

```js
group.groupBy(data, 'category').lastGroup;
```

---

## 📚 License

MIT

---

For more information and updates, check out the [npm package page](https://www.npmjs.com/package/groupjs_by).
