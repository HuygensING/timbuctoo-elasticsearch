import { Data, DataFetcher } from "./datafetcher";
import * as fetch from "node-fetch";


export class PersonDataFetcher implements DataFetcher {
  async fetchData(cursor?: string): Promise<Data> {
    const val = await fetch("http://localhost:8080/v5/DUMMY/hpp3demo/graphql", {
      headers: {
        Accept: "application/json"
      },
      method: "POST",
      body: this.getBody(cursor),
    });
    return await val.json();
  }

  private getBody(cursor?: string): string {
    if (cursor != null) {
      return `{
        timdata_NDE_HPP_viafList(count: 2000, cursor: "${cursor}") {
          nextCursor
          items {
            uri
            owl_sameAs_inverse(count: 20000) {
              items {
                ... on  timdata_NDE_HPP_hoogleraren_uva {
                schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
                ... on timdata_NDE_HPP_Delftse_hoogleraren { 
                  schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }`
    } else {
      return `{
        timdata_NDE_HPP_viafList(count: 2000) {
          nextCursor
          items {
            uri
            owl_sameAs_inverse(count: 20000) {
              items {
                ... on  timdata_NDE_HPP_hoogleraren_uva {
                schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
                ... on timdata_NDE_HPP_Delftse_hoogleraren { 
                  schema_givenName { value type }
                  schema_familyName { value type }
                  tim_dataSetName {
                    value
                    type
                  }
                  tim_postposition { value type }
                  schema_birthDate { value type }
                  schema_deathDate { value type }
                  schema_birthPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                  schema_deathPlace {
                    schema_name {
                      value
                      type
                    }
                  }
                }
              }
            }
          }
        }
      }`
    }
  }
}