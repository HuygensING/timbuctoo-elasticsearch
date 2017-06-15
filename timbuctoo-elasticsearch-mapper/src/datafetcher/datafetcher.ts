export interface DataFetcher {
  fetchData(): Data;
}

export interface Data {
  "data": {
    "items":[
      {
        "uri": string,
        "owl_sameAs": {
          "items": [
            {
              [key:string]: string
            }
          ]
        }
      }
    ]
  }
}