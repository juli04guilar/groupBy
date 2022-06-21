# GroupByJs

GroupBy is a Node library for grouping array of objects into the same category, it support sum, avg, max, min , countDistinct

## Installation

Use the package manager to install groupjs_by.


## Usage

```node
const group = require('groupjs_by');


# returns 'grouped' objects by columnName
`const data = [{ id: 1, category : 'fruits', name : 'apple', price: 10 }, 
{ id:2, category: 'fruits', name: 'grapes', price : 30 }, 
{ id:3, category: vegetables, name: 'avocado', price : 15 } ],`
// passing an array of objects with a columnName category
groups.group(data,'category')

# returns 'sum' of price column for each category
group.GroupBy(data,'category').sum('totalSum','price')

# returns 'avg' price for each category, it support a third argument as number of decimals formatted by default its 2 
group.GroupBy(data,'category').avg('totalAvg','price')

# returns 'max'  price  for each category 
group.GroupBy(data,'category').max('maxPrice','price')

# returns 'min'  price for each category 
group.GroupBy(data,'category').min('maxPrice','price')

# countDistinct
# returns 'count' of distinct prices
group.GroupBy(data,'category').min('distinctPrices','price')

# Chaining 
groupjs_by support chaining operations
group.GroupBy(data,'category').avg('totalAvg','price').sum('totalPrice','price').min('minPrice','price');


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)