import { writeFileSync, existsSync, mkdirSync } from "fs";

export default class RowHeaderMatchCSV {
    constructor(options) {
        this.columns = {};
        this.rows = {};
        if (options) {
            if (options.minModels) {
                this.minModels = options.minModels;
            }
            if (options.maxModels) {
                this.maxModels = options.maxModels;
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

    hasColumn(id, subheader) {
        return this.columns[column.id] !== undefined;
    }

    addRow(id, subheader) {
        this.rows[id] = { subheader, columns: {} };
    }

    linkRowToColumn(row, column, data) {
        this.rows[row].columns[column] = data;
    }

    addColumn(id, subheader) {
        this.columns[id] = subheader;
    }

    // If maxModels is set, break the csv into multiple files
    writeCSV(path, filename) {
        if(!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }

        const maxModels = this.maxModels || this.rowCount();

        for(let i = 0; i < this.rowCount(); i += maxModels) {
            let csv = '"","",' +
                Object.keys(this.columns).map(x => `"${x.replace(/"/g, '""')}"`) +
            '\n"","",' +
            Object.values(this.columns).map(x => `"${x.replace(/"/g, '""')}"`).join(',') +
            '\n';
        for (let key of Object.keys(this.rows)) {
            let row = this.rows[key];

            let line = `"${key.replace(/"/g, '""')}","${row.subheader.replace(/"/g, '""')}"`
                + Object.keys(this.columns).map(x => `"${row.columns[x] || ''}"`).join(',');
            csv += `${line}\n`;
            }
            writeFileSync(`${path}${filename}-${i}.csv`, csv);
        }
    }

}