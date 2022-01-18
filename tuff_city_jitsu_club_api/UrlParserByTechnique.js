let fs = require('fs');
fs.readFile(__dirname + '/parse for URLs.log', function (err, data) {
    let doc = data.toString();
    let parseNewLines = doc.split(/\r?\n/);
    console.log(parseNewLines);
    let search = /youtube*?\"/g;
    let urlMatches = parseNewLines.filter((each) => each.includes("youtube")).filter((each) => each.includes("summary"));

    // Now have two options: either regex the urls and corresponding technique summaries out, or just write them to a file to manually extract

    // let truncatedUrls = urls.map((each) => each.replace("\"", ""));

    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value) === index;
    // }

    // let uniqueUrls = truncatedUrls.filter(onlyUnique)
    // if (err) {
    //     throw err;
    // }
    console.log(urlMatches)

    // Here we write the results to a file, split into new lines for easy human reading:
    fs.writeFile('Restore these videos to their techniques', urlMatches.toString().replace(/}},/g, "}}, \n, \n"), err => {
        if (err) {
            console.error(err)
            return
        }
    })
});