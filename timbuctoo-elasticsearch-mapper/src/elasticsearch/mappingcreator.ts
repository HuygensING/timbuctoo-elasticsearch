import { Client } from "elasticsearch";
import { uniqueScalarPropertyNames } from "../propertyhelper";

export class MappingCreator {
  private indexName: string;
  private elasticsearchClient: Client;
  constructor(elasticsearchClient: Client, indexName: string) {
    this.elasticsearchClient = elasticsearchClient;
    this.indexName = indexName
  }

  public createMapping(data: {}, typeName: string): PromiseLike<void> {
    const properties = {};
    
    uniqueScalarPropertyNames(data).forEach(prop => {
      properties[prop] = {
        type: "text"
      }
    });

    return this.elasticsearchClient.indices.putMapping({
      index: this.indexName,
      type: typeName,
      body: {
        properties: properties
      }
    });

    // return this.elasticsearchClient.indices.putMapping({
    //   index: this.indexName,
    //   type: typeName,
    //   body: {
    //     "properties": {
    //       "birthDate": {
    //         "type": "date"
    //       },
    //       "name": {
    //         "type": "text"
    //       },
    //       "birthplace": {
    //         "type": "text"
    //       },
    //       "source": {
    //         "type": "text"
    //       },
    //       "uri": {
    //         "type": "text"
    //       }
    //     }
    //   }
    // });
  }
}