import { Data, DataFetcher } from "./datafetcher/datafetcher";
import { Client } from "elasticsearch";
export class ElasticSearchUpdater {
  private dataFetcher: DataFetcher;
  private elasticsearchClient: Client;

  constructor(dataFetcher: DataFetcher, elasticsearchClient: Client) {
    this.dataFetcher = dataFetcher;
    this.elasticsearchClient = elasticsearchClient;
  }

  public update(collection: string): void {
    this.elasticsearchClient.indices.exists({index: "tstest"}).then(respone => {
      this.elasticsearchClient.indices.create({
        index:"tstest",

      })});
  
    this.elasticsearchClient.indices.putMapping({
      index: "tstest",
      type: "person",
      body: {
        "properties": {
          "birthDate": {
            "type": "date"
          },
          "name": {
            "type": "text"
          },
          "birthplace": {
            "type": "text"
          },
          "source": {
            "type": "text"
          },
          "uri": {
            "type": "text"
          }
        }
      }
    });

    const data = this.dataFetcher.fetchData().data.items;
    data.forEach(item => {
      console.log(item.uri);
    });
  }
}