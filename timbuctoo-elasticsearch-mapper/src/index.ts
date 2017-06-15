import * as elasticsearch from "elasticsearch";

const client = new elasticsearch.Client({
  hosts: [
    'http://elastic:changeme@localhost:9200/'
  ]
});

client.search({
  index: "hpp",
  body: {
       "query": {
        "range" : {
            "birthDate" : {
                "gte" : "1982-01-01",
                "lt" :  "1982-12-31"
            }
        }
    }
  }
}).then(function(response: any){
  console.log(JSON.stringify(response.hits.hits));
});