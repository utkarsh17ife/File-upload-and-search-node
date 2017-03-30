const fs = require('fs');
const readline = require('readline');

let found = [];

const obj = {};

var proc = function(search, fname, cb) {
    if (fname !== null) {
        found = [];
        const rl = readline.createInterface({
            input: fs.createReadStream(fname)
        });

        rl.on('line', (line) => {
            let fnd = 0;
            search.forEach((value) => {
                let chk = line.lastIndexOf(value);
                if (chk === -1) {} else {
                    if (fnd === 0) {
                        found.push(line);
                        fnd = 1;
                    }
                }
            })
        });
        rl.on('close', () => {
            cb(found);
        });
    } else {
        return 'not a valid path';
    }
};

module.exports = proc;