import * as elasticsearch from "elasticsearch";
// import { TestDataFetcher } from "./datafetcher/testdatafetcher";
import { PersonDataFetcher } from "./datafetcher/persondatafetcher";
import { ElasticSearchUpdater } from "./elasticsearchupdater";
import * as edtf from "edtf";

const client = new elasticsearch.Client({
  hosts: [
    'http://elastic:changeme@localhost:9200/'
  ]
});

const dataFetcher = new PersonDataFetcher();
const indexName: string = "hpp";

const updater = new ElasticSearchUpdater(dataFetcher, client, indexName);

updater.update("person")
.then(undefined, e => console.log(e))
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
