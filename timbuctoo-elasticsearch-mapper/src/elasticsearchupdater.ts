import { Data, DataFetcher } from "./datafetcher/datafetcher";
import { Client } from "elasticsearch";
export class ElasticSearchUpdater {
  private dataFetcher: DataFetcher;
  private elasticsearchClient: Client;
  private indexName: string = "hpp";

  constructor(dataFetcher: DataFetcher, elasticsearchClient: Client, indexName: string) {
    this.dataFetcher = dataFetcher;
    this.elasticsearchClient = elasticsearchClient;
    this.indexName = indexName;
  }

  public update(collection: string): PromiseLike<void> {
    return this.elasticsearchClient.indices.exists({ index: this.indexName }).then(response => {
      if (response === false) {
        this.elasticsearchClient.indices.create({
          index: this.indexName,
        })
      }
    }).then(response =>
      this.elasticsearchClient.indices.putMapping({
        index: this.indexName,
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
      })
      ).then(response => {
        const data = this.dataFetcher.fetchData().data.items;

        data.forEach(item => {
          const birthDates = item.owl_sameAs.items.map(sameAs => sameAs.birthDate);
          const birthPlaces = item.owl_sameAs.items.map(sameAs => sameAs.birthPlace);
          const names = item.owl_sameAs.items.map(sameAs => sameAs.name);
          const sources = [].concat(item.owl_sameAs.items.map(sameAs => sameAs.source));

          this.elasticsearchClient.index({
            index: this.indexName,
            type: "person",
            body: {
              uri: item.uri,
              birthDate: birthDates,
              name: names,
              birthPlace: birthPlaces,
              source: sources
            }
          });
        });
      });
  }
}
