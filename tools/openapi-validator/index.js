const glob = require("glob");
const path = require("path");
const SwaggerParser = require("@apidevtools/swagger-parser");

const defFilesPath = path.resolve(__dirname, "..", "..", "defs");
const defFiles = glob.sync(path.resolve(defFilesPath) + '/**/*.yaml', { nodir: true });
function validateDefinitions(defFiles) {
    defFiles.forEach(async (definitionFile) => {
        try {
            console.log('Validating: ' + definitionFile);
            await SwaggerParser.validate(definitionFile);
        } catch (error) {
            console.log(error);
        }
    })
}

validateDefinitions(defFiles);
