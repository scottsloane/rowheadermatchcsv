import { writeFileSync, existsSync, mkdirSync } from "fs";

export default class RowHeaderMatchCSV {
    constructor(options) {
        this.columns = {};
        this.rows = {};
        if (options) {
            if (options.maxColumns) {
                this.maxColumns = options.maxColumns;
            }
        }
    }

    reset() {
        this.columns = {};
        this.rows = {};
    }

    columnCount() {
        return Object.keys(this.columns).length;
    }

    rowCount() {
        return Object.keys(this.rows).length;
    }

    hasRow(row) {
        return this.rows[row.id] !== undefined;
    }

    hasColumn(column) {
        return this.columns[column.id] !== undefined;
    }

    addRow(name, subheader) {
        if(!name || !subheader) {
            throw new Error(`Name and subheader are required`);
        }
        const id = `${name}::${subheader}`;
        if(this.rows[id]) {
            if(this.rows[id].subheader !== subheader) {
                throw new Error(`Row ${id} already exists with subheader ${this.rows[id].subheader} but trying to add with subheader ${subheader}`);
            }
            return id;
        }
        this.rows[id] = { name, subheader, columns: {} };
        return id;
    }

    linkRowToColumn(row, column, data) {
        this.rows[row].columns[column] = data;
    }

    addColumn(id, subheader) {
        if(this.columns[id]) {
            return;
        }
        this.columns[id] = subheader;
    }

    // If maxModels is set, break the csv into multiple files
    writeCSV(path, filename) {
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }

        const maxColumns = this.maxColumns || this.columnCount();

        let i = 0;
        while (i * maxColumns < this.columnCount()) {
            const columns = Object.keys(this.columns).slice(i * maxColumns, (i + 1) * maxColumns);
            const subheaders = Object.values(this.columns).slice(i * maxColumns, (i + 1) * maxColumns);


            let csv = '"","",' +
                columns.map(x => `"${x.replace(/"/g, '""')}"`).join(',') +
                '\n"","",' +
                subheaders.map(x => `"${x.replace(/"/g, '""')}"`).join(',') +
                '\n';

            let rows = [];
            for (let [id, row] of Object.entries(this.rows)) {
                for (let column of columns) {
                    if (row.columns[column]) {
                        rows.push({ id, ...row });
                        break;
                    }
                }
            }

            for (let row of rows) {
                let line = `"${row.name.replace(/"/g, '""')}","${row.subheader.replace(/"/g, '""')}",`
                    + columns.map(x => `"${row.columns[x] || ''}"`).join(',');
                csv += `${line}\n`;
            }

            writeFileSync(`${path}${filename}-${i}.csv`, csv);
            i++;
        }
    }

}