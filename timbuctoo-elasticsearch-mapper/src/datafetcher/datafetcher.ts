export interface DataFetcher {
  fetchData(cursor?: string): Promise<Data>;
}

export interface DataItem {
  "uri": string,
  "owl_sameAs_inverse": {
    "items": [
      {
        "schema_givenName": {value: string, type: "http://www.w3.org/2001/XMLSchema#string"} | null
        "schema_familyName": {value: string, type: "http://www.w3.org/2001/XMLSchema#string"} | null
        "tim_postposition": {value: string, type: "http://www.w3.org/2001/XMLSchema#string"} | null
        "tim_dataSetName": {value: string, type: "http://www.w3.org/2001/XMLSchema#string"}
        "schema_deathDate": {value: string, type: "https://www.loc.gov/standards/datetime/pre-submission.html"}
        "schema_birthDate": {value: string, type: "https://www.loc.gov/standards/datetime/pre-submission.html"}
        "schema_birthPlace": {
          schema_name: {value: string, type?: string}
        }
        "schema_deathPlace": {
          schema_name: {value: string, type?: string}
        }
      }
    ]
  }
}

export interface Data {
  "data": {
    [key: string]: {
      "nextCursor": string
      "items":DataItem[]
    }
  }
}