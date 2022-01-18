let fs = require('fs');
fs.readFile(__dirname + '/parse for URLs.log', function (err, data) {
    doc = data.toString();
    let search = /www.*?\"/g;
    let urls = doc.match(search).filter((each) => each !== "www.youtube.com");
    truncatedUrls = urls.map((each) => each.replace("\"", ""));

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    let uniqueUrls = truncatedUrls.filter(onlyUnique)
    // if (err) {
    //     throw err;
    // }
    console.log(uniqueUrls)
    console.log(uniqueUrls.length)
});