# RowHeaderMatchCSV

RowHeaderMatchCSV is a class object to abstract the creation of BOM CSV formated data.

## Installation

With NPM:
```bash
npm i rowheadermatchcsv 
```

With YARN:
```bash
yarn add rowheadermatchcsv
```

## Usage

1. Import the class
```javascript
import RowHeaderMatchCSV from 'rowheadermatchcsv'
```

2. Create an instance of the class
```javascript
const csv = new RowHeaderMatchCSV()
```

3. Add column data
```javascript
csv.addColumn('col1', 'description');
csv.addColumn('col2', 'anotherdescription');
```

4. Add row data
```javascript
csv.addRow('row1', 'description');
csv.addRow('row2', 'anotherdescription');
```

5. Link rows to columns
```javascript
csv.linkRowToColumn('row1', 'col1', 'somevalue');
csv.linkRowToColumn('row1', 'col2', 'someothervalue');
csv.linkRowToColumn('row2', 'col1', 'adifferentvalue');
csv.linkRowToColumn('row2', 'col2', '');
```

6. Write the CSV to disk
```javascript
csv.writeCSV('./csv/', 'myfilename');
```

## Options

### maxRows

This is the maximum number of columns a file can have

### usage

```javascript
const csv = new RowHeaderMatchCSV({
    maxColumns: 25
})
```

## Reseting and reusing an instance

You can reset and reuse an instance of the RowHeaderMatchCSV class. This will clear all column and row data from the instance. However, you may not change any options you may have set when creating the instance.

```javascript
csv.reset();
```

## Other functions available

### columnCount

You can get the current number of columns using the ``columnCount`` function

```javascript
const numColumns = csv.columnCount();
```

### rowCount

You can get the current number of rows using the ``rowCount`` function

```javascript
const numRows = csv.rowCount();
```

### hasColumn

You can check if a column already exists using the ``hasColumn`` function

```javascript
const columnExists = csv.hasColumn({ id: 'col1' });
```

### hasRow

You can check if a row already exists using the ``hasRow`` function

```javascript
const rowExists = csv.hasRow({ id: 'row1' });
```

