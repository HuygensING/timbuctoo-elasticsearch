import * as elasticsearch from "elasticsearch";
import {TestDataFetcher} from "./datafetcher/testdatafetcher";
import {ElasticSearchUpdater} from "./elasticsearchupdater";

const client = new elasticsearch.Client({
  hosts: [
    'http://elastic:changeme@localhost:9200/'
  ]
});

const dataFetcher = new TestDataFetcher();
const indexName:string = "hpp";

const updater = new ElasticSearchUpdater(dataFetcher, client, indexName);

updater.update("person")
// .then(response => 
//   client.indices.delete({
//     index: indexName
//   })
// );


// client.search({
//   index: "hpp",
//   body: {
//        "query": {
//         "range" : {
//             "birthDate" : {
//                 "gte" : "1982-01-01",
//                 "lt" :  "1982-12-31"
//             }
//         }
//     }
//   }
// }).then(function(response: any){
//   console.log(JSON.stringify(response.hits.hits));
// });
