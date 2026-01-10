"use strict";

/**
 * QueryParams - A class for building query strings with various serialization styles
 * Implements OpenAPI 3.0 parameter serialization
 */
class QueryParams {
  constructor() {
    this.params = [];
  }

  /**
   * Append a parameter with specified style and explode options
   * @param {string} name - Parameter name
   * @param {*} value - Parameter value (string, array, object, or undefined)
   * @param {Object} options - Style options
   * @param {string} options.style - Serialization style
   * @param {boolean} options.explode - Whether to explode the parameter
   */
  append(name, value, options = {}) {
    const style = options.style || "form";
    const explode = options.explode !== undefined ? options.explode : true;

    this.validateStyleApplicability(style, value, explode);
    this.params.push({ name, value, style, explode });
  }

  /**
   * Get a parameter by name
   * @param {string} name - Parameter name
   * @returns {*} The parameter value, or undefined if not found
   */
  get(name) {
    const param = this.params.find((p) => p.name === name);
    return param ? param.value : undefined;
  }

  /**
   * Get all parameters with a given name
   * @param {string} name - Parameter name
   * @returns {Array} Array of parameter values
   */
  getAll(name) {
    return this.params.filter((p) => p.name === name).map((p) => p.value);
  }

  /**
   * Validate that the style is applicable to the value type
   */
  validateStyleApplicability(style, value, explode) {
    const valueType = this.getValueType(value);

    if (style === "spaceDelimited" || style === "pipeDelimited") {
      if (valueType === "string") {
        throw new Error(`${style} style is not applicable to strings`);
      }
      if (explode === true) {
        throw new Error(`${style} style with explode=true is not applicable`);
      }
    }

    if (style === "deepObject") {
      if (valueType !== "object") {
        throw new Error("deepObject style only applies to objects");
      }
      if (explode === false) {
        throw new Error("deepObject style requires explode=true");
      }
    }
  }

  /**
   * Get the type of value
   */
  getValueType(value) {
    if (value === undefined) return "undefined";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object" && value !== null) return "object";
    return "string";
  }

  /**
   * Convert parameters to string based on their styles
   */
  toString() {
    if (this.params.length === 0) return "";

    // Group parameters by style to determine separators
    const serialized = this.params.map((param) => this.serializeParam(param));

    // For form style, join with &
    // For other styles, concatenate directly
    const needsSeparators = this.params.every((p) => p.style === "form");

    if (needsSeparators) {
      return serialized.join("&");
    }

    return serialized.join("");
  }

  /**
   * Serialize a single parameter based on its style
   */
  serializeParam({ name, value, style, explode }) {
    const valueType = this.getValueType(value);

    switch (style) {
      case "matrix":
        return this.serializeMatrix(name, value, valueType, explode);
      case "label":
        return this.serializeLabel(name, value, valueType, explode);
      case "simple":
        return this.serializeSimple(name, value, valueType, explode);
      case "form":
        return this.serializeForm(name, value, valueType, explode);
      case "spaceDelimited":
        return this.serializeSpaceDelimited(name, value, valueType);
      case "pipeDelimited":
        return this.serializePipeDelimited(name, value, valueType);
      case "deepObject":
        return this.serializeDeepObject(name, value);
      default:
        throw new Error(`Unknown style: ${style}`);
    }
  }

  /**
   * Matrix style serialization
   */
  serializeMatrix(name, value, valueType, explode) {
    if (valueType === "undefined") {
      return `;${name}`;
    }

    if (valueType === "string") {
      return `;${name}=${value}`;
    }

    if (valueType === "array") {
      if (explode) {
        return value.map((v) => `;${name}=${v}`).join("");
      }
      return `;${name}=${value.join(",")}`;
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      if (explode) {
        return pairs.map(([k, v]) => `;${k}=${v}`).join("");
      }
      return `;${name}=${pairs.map(([k, v]) => `${k},${v}`).join(",")}`;
    }
  }

  /**
   * Label style serialization
   */
  serializeLabel(name, value, valueType, explode) {
    if (valueType === "undefined") {
      return ".";
    }

    if (valueType === "string") {
      return `.${value}`;
    }

    if (valueType === "array") {
      if (explode) {
        return `.${value.join(".")}`;
      }
      return `.${value.join(",")}`;
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      if (explode) {
        return `.${pairs.map(([k, v]) => `${k}=${v}`).join(".")}`;
      }
      return `.${pairs.map(([k, v]) => `${k},${v}`).join(",")}`;
    }
  }

  /**
   * Simple style serialization
   */
  serializeSimple(name, value, valueType, explode) {
    if (valueType === "undefined") {
      return "";
    }

    if (valueType === "string") {
      return value;
    }

    if (valueType === "array") {
      return value.join(",");
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      if (explode) {
        return pairs.map(([k, v]) => `${k}=${v}`).join(",");
      }
      return pairs.map(([k, v]) => `${k},${v}`).join(",");
    }
  }

  /**
   * Form style serialization
   */
  serializeForm(name, value, valueType, explode) {
    if (valueType === "undefined") {
      return `${name}=`;
    }

    if (valueType === "string") {
      return `${name}=${value}`;
    }

    if (valueType === "array") {
      if (value.length === 0) {
        return `${name}=`;
      }
      if (explode) {
        return value.map((v) => `${name}=${v}`).join("&");
      }
      return `${name}=${value.join(",")}`;
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      if (pairs.length === 0) {
        return `${name}=`;
      }
      if (explode) {
        return pairs.map(([k, v]) => `${k}=${v}`).join("&");
      }
      return `${name}=${pairs.map(([k, v]) => `${k},${v}`).join(",")}`;
    }
  }

  /**
   * Space delimited style serialization
   */
  serializeSpaceDelimited(name, value, valueType) {
    if (valueType === "array") {
      return `${name}=${value.join(" ").replace(/ /g, "%20")}`;
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      const joined = pairs.map(([k, v]) => `${k} ${v}`).join(" ");
      return `${name}=${joined.replace(/ /g, "%20")}`;
    }
  }

  /**
   * Pipe delimited style serialization
   */
  serializePipeDelimited(name, value, valueType) {
    if (valueType === "array") {
      return `${name}=${value.join("|").replace(/\|/g, "%7C")}`;
    }

    if (valueType === "object") {
      const pairs = Object.entries(value);
      const joined = pairs.map(([k, v]) => `${k}|${v}`).join("|");
      return `${name}=${joined.replace(/\|/g, "%7C")}`;
    }
  }

  /**
   * Deep object style serialization
   */
  serializeDeepObject(name, value) {
    const pairs = Object.entries(value);
    return pairs.map(([k, v]) => `${name}%5B${k}%5D=${v}`).join("&");
  }
}

module.exports = QueryParams;
