import { Data, DataFetcher, DataItem } from "./datafetcher/datafetcher";
import { Client } from "elasticsearch";
import { MappingCreator } from "./elasticsearch/mappingcreator";
import { uniqueScalarPropertyNames } from "./propertyhelper"
import * as edtf from "edtf";

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
        for (const owl of item.owl_sameAs_inverse.items) {
          if (owl.schema_birthDate != null && owl.schema_birthDate.value != null) {
            owl.schema_birthDate.value = this.convertEdtfToDateArray(owl.schema_birthDate);
          }
          if (owl.schema_deathDate != null && owl.schema_deathDate.value != null) {
            owl.schema_deathDate.value = this.convertEdtfToDateArray(owl.schema_deathDate);
          }
        }

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

  private convertEdtfToDateArray(date: { type: "https://www.loc.gov/standards/datetime/pre-submission.html", "value": string }): string | null {
    const edtfDate = edtf(date.value);

    try {
      const start = new Date(edtfDate.min).toISOString();
      const end = new Date(edtfDate.max).toISOString();
      return new Array<string>(start, end)[0];
    } catch (e) {
      console.log("value not supported: ", date.value);
      console.log("min: ", edtfDate.min);
      console.log("max: ", edtfDate.max);
      return null
    }

  }
}
