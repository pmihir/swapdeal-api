const elasticsearch = require("elasticsearch");
const esClient = new elasticsearch.Client({
    host: "3.129.137.210:9200",
    log: "error",
})

const productSearch = {};

productSearch.search = (index, body) => {
    return esClient.search({ index: index, body: body });
}

productSearch.searchByQuery = (queryString) => {
    let body = {
        size: 20,
        from: 0,
        query: {
            multi_match: {
                query: queryString,
                fields: ["name"],
                // minimum_should_match: 2,
                // fuzziness: 2
            },
        },
    };
    return productSearch.search("swapdealproduct", body).then((results) => {
        console.log(results);
        console.log(results.hits.total.value + " in " + results.took + "ms");
        if (results.hits.total.value > 0) {
            results.hits.hits.forEach((hit, index) =>
                console.log(
                    `\t${body.from + ++index} - ${hit._source.name} (score: ${
                    hit._score
                    })`
                )
            );
            return results.hits.hits;
        }
    })
}

module.exports = productSearch;