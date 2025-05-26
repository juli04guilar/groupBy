# groupjs_by

[![Publish](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml)

**`groupjs_by`** is a lightweight and flexible JavaScript library for grouping arrays of objects by a specific field and performing aggregated operations such as `sum`, `average`, `min`, `max`, and `distinct count`. The API supports method chaining for expressive and readable data transformations.

----------

## 📦 Installation

Install the package via [npm](https://www.npmjs.com/package/groupjs_by):

bash

CopyEdit

`npm install groupjs_by` 

----------

## ✨ Features

-   Group objects by a specific key
    
-   Aggregate with:
    
    -   `sum`
        
    -   `avg`
        
    -   `min`
        
    -   `max`
        
    -   `distinctCount`
        
-   Chain multiple operations
    
-   Filter groups with `where`
    
-   Access group metadata (`keys`, `firstGroup`, `lastGroup`)
    

----------

## 📘 Usage Example

js

CopyEdit

`const group = require('groupjs_by'); const data = [
  { category: 'mammals', name: 'lion', weight: 80 },
  { category: 'mammals', name: 'panther', weight: 100 },
  { category: 'reptiles', name: 'crocodile', weight: 100 },
]; const result = group
  .groupBy(data, 'category')
  .sum('totalWeight', 'weight')
  .avg('averageWeight', 'weight')
  .distinctCount('uniqueAnimals', 'name')
  .data; console.log(result);` 

### Output:

js

CopyEdit

`{ mammals: { items: [
      { category: 'mammals', name: 'lion', weight: 80 },
      { category: 'mammals', name: 'panther', weight: 100 }
    ], totalWeight: 180, averageWeight: '90.00', uniqueAnimals: 2 }, reptiles: { items: [
      { category: 'reptiles', name: 'crocodile', weight: 100 }
    ], totalWeight: 100, averageWeight: '100.00', uniqueAnimals: 1 }
}` 

----------

## 🧩 API Reference

### `groupBy(data, key)`

Initializes the grouping operation on the provided data using the specified key.

----------

### `.sum(alias, columnName)`

Computes the sum of a numeric field within each group.


| Parameter    | Type   | Description                      |
|--------------|--------|----------------------------------|
| `alias`      | string | Output field name for the result |
| `columnName` | string | Field to aggregate               |


----------

### `.avg(alias, columnName, decimals = 2)`


| Parameter    | Type   | Description                                |
|--------------|--------|--------------------------------------------|
| `alias`      | string | Output field name for the result           |
| `columnName` | string | Field to aggregate                         |
| `decimals`   | number | Number of decimal places (default: `2`)    |


----------

### `.min(alias, columnName)`

| Parameter    | Type   | Description                      |
|--------------|--------|----------------------------------|
| `alias`      | string | Output field name for the result |
| `columnName` | string | Field to evaluate                |

----------

### `.max(alias, columnName)`

Finds the maximum value in a field for each group.

| Parameter    | Type   | Description                      |
|--------------|--------|----------------------------------|
| `alias`      | string | Output field name for the result |
| `columnName` | string | Field to evaluate                |

----------

### `.distinctCount(alias, columnName)`

Counts the number of unique values in a field within each group.

| Parameter    | Type   | Description                      |
|--------------|--------|----------------------------------|
| `alias`      | string | Output field name for the result |
| `columnName` | string | Field to evaluate                |


----------

### `.where(predicate)`

Filters grouped data using a custom predicate function before applying aggregations.

| Parameter    | Type   | Description                      |
|--------------|--------|----------------------------------|
| `callback`   | function | custom predicate callback function |
        

js

CopyEdit

`group
  .groupBy(data, 'category')
  .where(item => item.weight > 90)
  .sum('heavyWeight', 'weight')
  .data;` 

----------

## 🔧 Utility Properties

### `.data`

Returns the final aggregated result as an object grouped by keys.

----------

### `.keys`

Returns an array of group keys.

js

CopyEdit

`group.groupBy(data, 'category').keys; // ➜ ['mammals', 'reptiles']` 

----------

### `.firstGroup`

Returns the items in the first group, based on the order of the original array.

js

CopyEdit

`group.groupBy(data, 'category').firstGroup;` 

----------

### `.lastGroup`

Returns the items in the last group, based on the order of the original array.

js

CopyEdit

`group.groupBy(data, 'category').lastGroup;` 

----------

## 📄 License

This project is licensed under the MIT License.  
Created by [@juli04guilar](https://github.com/juli04guilar)