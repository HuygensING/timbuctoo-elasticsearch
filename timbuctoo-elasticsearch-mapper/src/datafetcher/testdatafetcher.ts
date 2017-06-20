import { Data, DataFetcher } from "./datafetcher";

export class TestDataFetcher implements DataFetcher {

  public fetchData(): Promise<Data> {
    const val: Data = {
      "data": {
        "timdata_NDE_HPP_viafList": {
          "items": [
            {
              "uri": "http://viaf.org/viaf/110384864",
              "owl_sameAs_inverse": {
                "items": [
                  {
                    "schema_givenName": null,
                    "schema_familyName": {
                      "type": "http://www.w3.org/2001/XMLSchema#string",
                      "value": "Schermerhorn"
                    },
                    "tim_dataSetName": {
                      "type": "http://www.w3.org/2001/XMLSchema#string",
                      "value": "Delftse hoogleraren"
                    },
                    "tim_postposition": null,
                    "schema_deathDate": {
                      "type": "https://www.loc.gov/standards/datetime/pre-submission.html",
                      "value": "1977-03-10"
                    },
                    "schema_birthDate": {
                      "type": "https://www.loc.gov/standards/datetime/pre-submission.html",
                      "value": "1927"
                    },
                    "schema_birthPlace": {
                      "schema_name": {
                        "type": "http://www.w3.org/2001/XMLSchema#string",
                        "value": "Akersloot"
                      }
                    },
                    "schema_deathPlace": {
                      "schema_name": {
                        "type": "http://www.w3.org/2001/XMLSchema#string",
                        "value": "Haarlem"
                      }
                    }
                  }
                ]
              }
            }, {
              "uri": "http://viaf.org/viaf/110498163",
              "owl_sameAs_inverse": {
                "items": [
                  {
                    "schema_givenName": null,
                    "schema_familyName": {
                      "type": "http://www.w3.org/2001/XMLSchema#string",
                      "value": "Vreugdenhil"
                    },
                    "tim_dataSetName": {
                      "type": "http://www.w3.org/2001/XMLSchema#string",
                      "value": "Delftse hoogleraren"
                    },
                    "tim_postposition": null,
                    "schema_deathDate": null,
                    "schema_birthDate": null,
                    "schema_birthPlace": null,
                    "schema_deathPlace": null
                  }
                ]
              }
            }
          ]
        }
      }
    };
    return Promise.resolve(val);
  }
}