const path = require("path");
const glob = require("glob");

const defFiles = glob.sync(
    path.resolve(__dirname, './defs') + '/**/[!_]*.js',
    {
        nodir: true,
    },
);

let data = {};

defFiles.forEach(filePath => {
    const apiDef = require(filePath);
    const url = path.basename(filePath).split('.').slice(0, -1).join('.'); // remove extension from path
    data[url] = apiDef;
});

module.exports = () => {
    return data;
};
