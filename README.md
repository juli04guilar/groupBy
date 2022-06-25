# groupjs_by  🚀

[![Publish](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/juli04guilar/groupBy/actions/workflows/publish.yml)



groupjs_by is a javascript library for grouping array of objects using attribute name , it support basic operations such as sum, avg, max, min and countDistinct. it support chaning more than one operation.

## Installation

Use the package manager to install groupjs_by.

## Usage

# sum(alias,columnName)

| type   | Parameters | description                                   |
| ------ | ---------- | --------------------------------------------- |
| string | alias      | alias for the agreggation sum                 |
| string | columnName | name of the column to perform the aggregation |

## example using data :

```
const data = [
  { category: 'mammals', name: 'lion', weight: 80 },
  { category: 'mammals', name : 'panter', weight: 100 },
  { category : 'reptiles', name : 'cocodrile', weight: 100}
]
```

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.sum('animalsWeight','weight')
.data;

// will return
{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ],
        animalsWeight: 180
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        animalsWeight: 100
    }
}
```

# min(alias,columnName)

| Operation | Parameters | description                             |
| --------- | ---------- | --------------------------------------- |
| string    | alias      | alias for the agreggation min           |
| string    | columnName | name of the column to get the min value |

## example :

```
const group = require('groupjs_by');
group.groupBy(data,'category')
.min('minWeight','weight')
.data;

// will return

{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ]
        minWeight: 80
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        minWeight: 100
    }
}
```

# max(alias,ColumnName)

| Operation | Parameters | description                             |
| --------- | ---------- | --------------------------------------- |
| string    | alias      | alias for the agreggation max           |
| string    | columnName | name of the column to get the max value |

## example :

```
const group = require('groupjs_by');
group.groupBy(data,'category')
.max('maxWeight','weight')
.data;

// will return

{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ]
        maxWeight: 100
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        maxWeight: 100
    }
}
```

# avg(alias,columnName,decimals)

| Operation | Parameters | description                                                        |
| --------- | ---------- | ------------------------------------------------------------------ |
| string    | alias      | alias for the agreggation avg                                      |
| string    | columnName | name of the column to get to perform the avg                       |
| int       | decimals   | The number of decimals to format the float avg value, by default 2 |

## example :

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.avg('avgWeight','weight').data;

// will return

{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ]
        avgWeight: '90.00'
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        avgWeight: '100.00'
    }
}
```

# distinctCount(alias,columnName)

| Operation | Parameters | description                                   |
| --------- | ---------- | --------------------------------------------- |
| string    | alias      | alias for the agreggation distinctCount       |
| string    | columnName | name of the column to get to perform counting |

## example :

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.distinctCount('distinctAnimals','name')
.data

// will return

{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ]
        distinctAnimals: 2
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        distinctAnimals: 1
    }
}
```

# Chaining Operations

Chaining operations are supported , it´s possible to chain more than one operation

## example :

```
const group = require('groupjs_by');
const chainedResult =
group
.groupBy(data,'category')
.distinctCount('distinctAnimals','name')
.avg('avgWeight','weight')
.sum('animalsWeight','weight').data

// will return
{
    mammals:{
        items :  [
            { category: 'mammals', name: 'lion', weight: 80 },
            { category: 'mammals', name : 'panter', weight: 100 }
        ]
        distinctAnimals: 2,
        avgWeight: '90.00',
        animalsWeight: 180
    },
    reptiles: {
        items : [
            { category : 'reptiles', name : cocodrile, weight: 100}
        ],
        distinctAnimals: 1,
        avgWeight: '100.00',
        animalsWeight: 100
    }
}
```

# keys

To retrieve the list of keys of which the object is grouped

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.keys

// will return an array of keys of grouped data.
 ex:
 ['mammals','reptiles']
```

# firstGroup

Returns the first group of aggregate data , the order its determinaded by the order of data was provided.

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.firstGroup

will return

 ex:
 [
     { category: 'mammals', name: 'lion', weight: 80 },
     { category: 'mammals', name : 'panter', weight: 100 }
 ]
```

# lastGroup

Returns the last group of aggregate data , the order its determinaded by the order of data was provided.

```
const group = require('groupjs_by');
group
.groupBy(data,'category')
.lastGroup

will return

 ex:
 [
     { category : 'reptiles', name : cocodrile, weight: 100}
 ]
```
