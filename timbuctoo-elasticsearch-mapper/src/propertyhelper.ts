export function uniqueScalarPropertyNames(data: {}): string[] {
  let properties = new Array<string>();

  Object.keys(data).forEach(key => {
    let prop = data[key];
    if (isScalarProperty(prop) || typeof prop !== 'object') {
      properties.push(key);
    }
    else if (Array.isArray(prop)) {
      properties = concat(properties, getPropertiesOfArray(key, prop));
    }
    else if (typeof prop === 'object') {
      properties = concat(properties, uniqueScalarPropertyNames(prop));
    }
  });

  return getUnique(properties);
}

function concat(target: string[], source: string[]): string[] {
  source.forEach(prop => target.push(prop));

  return target;
}

function getPropertiesOfArray(key: string, data: any[]): string[] {
  let properties = new Array<string>();
  data.forEach(item => {
    if (Array.isArray(item)) {
     properties = concat(properties, getPropertiesOfArray(null, item));
    } else if (typeof item === 'object') {
      properties = concat(properties, uniqueScalarPropertyNames(item));
    } else if (key != null) {
      console.log("is value in array");
      properties.push(key);
    }
  });
  return properties;
}

export function getUnique(array: string[]): string[] {
  var uniqueProperties = new Array<string>();
  array.forEach(item => {
    if (uniqueProperties.indexOf(item) === -1) {
      uniqueProperties.push(item);
    }
  });
  return uniqueProperties;
}

function isScalarProperty(data: {}): data is ScalarProperty {
  const propertyNames = Object.getOwnPropertyNames(data);
  if (propertyNames.length > 2) {
    return false;
  } else if (propertyNames.length === 2) {
    return propertyNames.indexOf("value") > -1 && propertyNames.indexOf("type") > -1;
  } else {
    return propertyNames.indexOf("value") > -1;
  }
}

interface ScalarProperty {
  value: any;
  type?: string;
}