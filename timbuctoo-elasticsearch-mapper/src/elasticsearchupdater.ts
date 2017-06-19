import { Data, DataFetcher } from "./datafetcher/datafetcher";
import { Client } from "elasticsearch";
import { MappingCreator } from "./elasticsearch/mappingcreator";
import { uniqueScalarPropertyNames } from "./propertyhelper"

export class ElasticSearchUpdater {
  private mappingCreator: MappingCreator;
  private dataFetcher: DataFetcher;
  private elasticsearchClient: Client;
  private indexName: string = "hpp";

  constructor(dataFetcher: DataFetcher, elasticsearchClient: Client, indexName: string) {
    this.dataFetcher = dataFetcher;
    this.elasticsearchClient = elasticsearchClient;
    this.indexName = indexName;
    this.mappingCreator = new MappingCreator(elasticsearchClient, indexName);
  }

  public update(collection: string): PromiseLike<void> {
    return this.elasticsearchClient.indices.exists({ index: this.indexName }).then(response => {
      if (response === false) {
        return this.elasticsearchClient.indices.create({
          index: this.indexName,
        })
      }
    }).then(response => {
      const data = this.dataFetcher.fetchData().data.items;
      return this.mappingCreator.createMapping(data, collection).then(response => {
        data.forEach(item => {
          let body = this.documentToIndex(item);

          this.elasticsearchClient.index({
            index: this.indexName,
            type: collection,
            body: body
          });
        });
      });
    });
  }
  private documentToIndex(data: {}): {} {
    let body = {}

    if (data.hasOwnProperty("owl_sameAs")) {
      if (data.hasOwnProperty("uri")) {
        body["uri"] = data["uri"];
      }
      const uniqueProperties = uniqueScalarPropertyNames(data["owl_sameAs"]);

      uniqueProperties.forEach(prop => {
        body[prop] = data["owl_sameAs"].items.map(sameAs => sameAs[prop]);
      });
    }
    else {
      const uniqueProperties = uniqueScalarPropertyNames(data);

      uniqueProperties.forEach(prop => {
        body[prop] = data[prop];
      });
    }
    return body;
  }
}
