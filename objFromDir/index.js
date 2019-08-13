const fs = require("fs");
const path = require("path")
const util = require("util")

fs.readdir("frontend/icons", (err, files) => {
    if (err) {
        return err;
    }
    const output = {}
    let fileName = "";
    files.forEach(file => {
        fileName = path.parse(file).name.replace(/-\w/g, m => {
            return m[1].toUpperCase();
        })
        // console.log(fileName, "frontend/icons/" + file)
        output[fileName] = {
            value: `frontend/icons/${file}`
        }
    })
    // const result = JSON.parse(JSON.stringify(output).replace(/'/g, '"').replace(/\\"/g, ''));
    console.log(output)
    fs.mkdir(".style-dictionary/properties/content/", {
        recursive: true
    }, err => {
        if (err) {
            console.log(err)
        }
    })

    fs.writeFileSync(".style-dictionary/properties/content/icon.js", `module.exports =  ${util.inspect(
        output)} `, err => {
        console.log(err)
    })
})