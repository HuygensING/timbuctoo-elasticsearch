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

    // uniqueScalarPropertyNames(data).forEach(prop => {
    //   properties[prop] = {
    //     type: "text"
    //   }
    // });

    // return this.elasticsearchClient.indices.putMapping({
    //   index: this.indexName,
    //   type: typeName,
    //   body: {
    //     properties: properties
    //   }
    // });

    return this.elasticsearchClient.indices.putMapping({
      index: this.indexName,
      type: typeName,
      body: {
        "properties": {
          "owl_sameAs_inverse.items.schema_birthDate.value": {
            "type": "date"
          },
          "owl_sameAs_inverse.items.schema_deathDate.value": {
            "type": "date"
          },
          "owl_sameAs_inverse.items.schema_givenName.value": {
            "type": "text"
          },
          "owl_sameAs_inverse.items.tim_postposition.value": {
            "type": "text"
          },
          "owl_sameAs_inverse.items.schema_familyName.value": {
            "type": "text"
          },
          "owl_sameAs_inverse.items.schema_birthPlace": {
            "type": "object",
            "properties": {
              "schema_name.value": {
                "type": "text",
                "fields" : {          
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              }
            }
          },
          "owl_sameAs_inverse.items.schema_deathPlace": {
            "type": "object",
            "properties": {
              "schema_name.value": {
                "type": "text",
                "fields" : {          
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              } 
            }
          },
          "owl_sameAs_inverse.items.tim_dataSetName.value": {
            "type": "text",
            "fields" : {          
              "raw" : {
                "type" : "string",
                "index" : "not_analyzed"
              }
            }
          },
          "uri": {
            "type": "text"
          }
        }
      }
    });
  }
}