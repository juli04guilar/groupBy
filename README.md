# GroupByJs

GroupBy is a Node library for grouping array of objects using value of columnName passed as a parameter , it support sum, avg, max, min , countDistinct as well chaining operations

## Installation

Use the package manager to install groupjs_by.


## Usage

# sum(alias,columnName)
type | Parameters | description
--- | --- | --- 
string | alias  | alias for the agreggation sum 
string | columnName   | name of the column to perform the aggregation 
    
## example : 
`const list =  [ { category: 'animal', name: 'lion', weight: 80 }, { category: 'animal', name : 'panter', weight: 100  } ]
`
```
const group = require('groupjs_by');
console.log(group.GroupBy(data,'category').sum('animalWeight','weight').data);
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        animalWeight: 180
    }
}
```
# min(alias,columnName)
Operation | Parameters | description 
--- | --- | --- 
string | alias  | alias for the agreggation sum 
string | columnName   | name of the column to get the min value
    
## example : 
`const list =  [ { category: 'animal', name: 'lion', weight: 80 }, { category: 'animal', name : 'panter', weight: 100  } ]
`
```
const group = require('groupjs_by');
console.log(group.GroupBy(data,'category').min('minWeight','weight').data);
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        minWeight: 80
    }
}
```
# max(alias,ColumnName)
Operation | Parameters | description 
--- | --- | --- 
string | alias  | alias for the agreggation sum 
string | columnName   | name of the column to get the max value 
    
## example : 
`const list =  [ { category: 'animal', name: 'lion', weight: 80 }, { category: 'animal', name : 'panter', weight: 100  } ]
`
```
const group = require('groupjs_by');
console.log(group.GroupBy(data,'category').max('maxWeight','weight').data);
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        maxWeight: 100
    }
}
```
# avg(alias,columnName,decimals)
Operation | Parameters | description 
--- | --- | --- 
string | alias  | alias for the agreggation sum 
string | columnName   | name of the column to get to perform the avg
int | decimals   | The number of decimals to format the float avg value, by default 2
    
## example : 
`const list =  [ { category: 'animal', name: 'lion', weight: 80 }, { category: 'animal', name : 'panter', weight: 100  } ]
`
```
const group = require('groupjs_by');
console.log(group.GroupBy(data,'category').avg('avgWeight','weight').data);
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        avgWeight: '90.00'
    }
}
```
# distinctCount(alias,columnName)
Operation | Parameters | description 
--- | --- | --- 
string | alias  | alias for the agreggation sum 
string | columnName   | name of the column to get to perform counting

    
## example : 
`const list =  [ { category: 'animal', name: 'lion', weight: 80 }, { category: 'animal', name : 'panter', weight: 100  } ]
`
```
const group = require('groupjs_by');
console.log(group.GroupBy(data,'category').distinctCount('distinctAnimals','name').data);
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        distinctAnimals: 2
    }
}
```
# Chaining Operations
Chaining operations are supported , it´s possible to chain more than one operation
## example : 
```
const group = require('groupjs_by');
const chainedResult = group.GroupBy(data,'category').distinctCount('distinctAnimals','name').avg('avgWeight','weight').sum('animalWeight','weight').data

console.log(chainedResult.data)
// will print out
{
    animal:{
        items :  [ 
            { category: 'animal', name: 'lion', weight: 80 },
            { category: 'animal', name : 'panter', weight: 100 }
        ]
        distinctAnimals: 2,
        avgWeight: '90.00',
        animalWeight: 180
    }
}
```
