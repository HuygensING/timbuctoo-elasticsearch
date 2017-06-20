import { Data, DataFetcher, DataItem } from "./datafetcher/datafetcher";
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
    }).then(async (response) => {
      const data = await this.dataFetcher.fetchData();
      await this.mappingCreator.createMapping(data.data.items, collection);
      let retVal;
      for (const item of data.data["timdata_NDE_HPP_viafList"].items) {
        // let body = this.documentToIndex(item);
        try {
          await this.elasticsearchClient.index({
            index: this.indexName,
            type: collection,
            body: item
          });
        } catch (e) {
          console.log(e, JSON.stringify(item, undefined, 2));
        }
      }
    });
  }
  private documentToIndex(data: DataItem): {} {
    let body = {}

    if (data.hasOwnProperty("uri")) {
      body["uri"] = data["uri"];
    }

    
    const uniqueProperties = uniqueScalarPropertyNames(data.owl_sameAs_inverse);
    // console.log("unique properties: ", uniqueProperties);
    uniqueProperties.forEach(prop => {
      body[prop] = [];
    })

    data.owl_sameAs_inverse.items.forEach(item => {
      for (let property in item) {
        if (item.hasOwnProperty(property) && item[property] != null && body.hasOwnProperty(property)) {
          body[property].push(item[property].value);
        }
      }
    });


    return body;
  }
}
