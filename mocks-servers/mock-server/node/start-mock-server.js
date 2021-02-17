const mockserver = require('mockserver-node');

const path = require("path");
const glob = require("glob");

const defFiles = glob.sync(
    path.resolve(__dirname, './expectations') + '/**/[!_]*.js',
    {
        nodir: true,
    },
);

console.log(defFiles);
function loadModulesExpectations() {
    defFiles.forEach((file) => {
        const fileWithoutExtension = file.replace(".js", "");
        const expectationsModule = require(fileWithoutExtension);
        expectationsModule.loadExpectations();
    })
}

mockserver.start_mockserver({
    serverPort: 1080,
    trace: true,
    tls: false
}).then(() => {
    loadModulesExpectations();
});
