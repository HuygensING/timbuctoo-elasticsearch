import { Data, DataFetcher } from "./datafetcher";

export class TestDataFetcher implements DataFetcher {

  public fetchData(): Data {
    return {
      "data": {
        "items": [
          {
            "uri": "http://viaf.org/2",
            "owl_sameAs": {
              "items": [
                {
                  "name": "jauco",
                  "birthplace": "moordrecht",
                  "birthDate": "1982-11-12",
                  "source": "dataSet1"
                },
                {
                  "name": "jacco",
                  "birthplace": "moordrecht",
                  "birthDate": "1982-11-12",
                  "source": "dataSet2"
                }
              ]
            }
          },
          {
            "uri": "http://viaf.org/3",
            "owl_sameAs": {
              "items": [
                {
                  "name": "martijn",
                  "birthplace": "Rotterdam",
                  "birthDate": "1986-01-03",
                  "source": "dataSet3"
                },
                {
                  "name": "Martyn",
                  "birthplace": "Hillegom",
                  "birthDate": "1982-01-03",
                  "source": "dataSet2"
                }
              ]
            }
          }
        ]
      }
    }
  }
}