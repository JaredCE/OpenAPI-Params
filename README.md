# QueryParams

A JavaScript class for building query strings with various serialization styles based on the OpenAPI 3.0 specification.

## Installation

```bash
npm install query-params
```

## Usage

```javascript
const QueryParams = require("./QueryParams");

const params = new QueryParams();
params.append("color", "blue");
params.append("size", "large");

console.log(params.toString()); // color=blue&size=large
```

## API

### Constructor

```javascript
const params = new QueryParams();
```

Creates a new empty QueryParams instance.

### Methods

#### `append(name, value, options)`

Appends a parameter with the specified serialization style.

**Parameters:**

- `name` (string) - Parameter name
- `value` (any) - Parameter value (string, array, object, or undefined)
- `options` (object) - Optional configuration
  - `style` (string) - Serialization style (default: `'form'`)
  - `explode` (boolean) - Whether to explode the parameter (default: `true`)

**Example:**

```javascript
params.append("color", ["blue", "black", "brown"], {
  style: "form",
  explode: true,
});
```

#### `get(name)`

Returns the value of the first parameter with the given name.

**Parameters:**

- `name` (string) - Parameter name

**Returns:** The parameter value, or `undefined` if not found

**Example:**

```javascript
params.append("color", "blue");
params.get("color"); // 'blue'
```

#### `getAll(name)`

Returns an array of all values for parameters with the given name.

**Parameters:**

- `name` (string) - Parameter name

**Returns:** Array of parameter values

**Example:**

```javascript
params.append("color", "blue");
params.append("color", "red");
params.getAll("color"); // ['blue', 'red']
```

#### `toString()`

Serializes all parameters to a query string based on their individual styles.

**Returns:** String representation of all parameters

**Example:**

```javascript
params.toString(); // 'color=blue&size=large'
```

## Serialization Styles

QueryParams supports seven serialization styles as defined by OpenAPI 3.0:

### 1. Matrix Style

Prefixes parameters with semicolons (`;`).

```javascript
// String
params.append("color", "blue", { style: "matrix", explode: false });
// ;color=blue

// Array (explode: false)
params.append("color", ["blue", "black", "brown"], {
  style: "matrix",
  explode: false,
});
// ;color=blue,black,brown

// Array (explode: true)
params.append("color", ["blue", "black", "brown"], {
  style: "matrix",
  explode: true,
});
// ;color=blue;color=black;color=brown

// Object (explode: false)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "matrix", explode: false },
);
// ;color=R,100,G,200,B,150

// Object (explode: true)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "matrix", explode: true },
);
// ;R=100;G=200;B=150
```

### 2. Label Style

Prefixes parameters with dots (`.`).

```javascript
// String
params.append("color", "blue", { style: "label", explode: false });
// .blue

// Array (explode: false)
params.append("color", ["blue", "black", "brown"], {
  style: "label",
  explode: false,
});
// .blue,black,brown

// Array (explode: true)
params.append("color", ["blue", "black", "brown"], {
  style: "label",
  explode: true,
});
// .blue.black.brown

// Object (explode: false)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "label", explode: false },
);
// .R,100,G,200,B,150

// Object (explode: true)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "label", explode: true },
);
// .R=100.G=200.B=150
```

### 3. Simple Style

No prefix, comma-separated values.

```javascript
// String
params.append("color", "blue", { style: "simple", explode: false });
// blue

// Array
params.append("color", ["blue", "black", "brown"], {
  style: "simple",
  explode: false,
});
// blue,black,brown

// Object (explode: false)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "simple", explode: false },
);
// R,100,G,200,B,150

// Object (explode: true)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "simple", explode: true },
);
// R=100,G=200,B=150
```

### 4. Form Style (Default)

Standard query string format with `key=value` pairs.

```javascript
// String
params.append("color", "blue", { style: "form", explode: true });
// color=blue

// Array (explode: false)
params.append("color", ["blue", "black", "brown"], {
  style: "form",
  explode: false,
});
// color=blue,black,brown

// Array (explode: true)
params.append("color", ["blue", "black", "brown"], {
  style: "form",
  explode: true,
});
// color=blue&color=black&color=brown

// Object (explode: false)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "form", explode: false },
);
// color=R,100,G,200,B,150

// Object (explode: true)
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "form", explode: true },
);
// R=100&G=200&B=150
```

### 5. Space Delimited Style

Values separated by spaces (URL-encoded as `%20`). **Only applies to arrays and objects with `explode: false`.**

```javascript
// Array
params.append("color", ["blue", "black", "brown"], {
  style: "spaceDelimited",
  explode: false,
});
// color=blue%20black%20brown

// Object
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "spaceDelimited", explode: false },
);
// color=R%20100%20G%20200%20B%20150
```

### 6. Pipe Delimited Style

Values separated by pipes (URL-encoded as `%7C`). **Only applies to arrays and objects with `explode: false`.**

```javascript
// Array
params.append("color", ["blue", "black", "brown"], {
  style: "pipeDelimited",
  explode: false,
});
// color=blue%7Cblack%7Cbrown

// Object
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "pipeDelimited", explode: false },
);
// color=R%7C100%7CG%7C200%7CB%7C150
```

### 7. Deep Object Style

Uses bracket notation for nested objects. **Only applies to objects with `explode: true`.**

```javascript
// Object
params.append(
  "color",
  { R: 100, G: 200, B: 150 },
  { style: "deepObject", explode: true },
);
// color%5BR%5D=100&color%5BG%5D=200&color%5BB%5D=150
// (decoded: color[R]=100&color[G]=200&color[B]=150)
```

## Style Applicability Matrix

| Style          | Explode    | String | Array | Object |
| -------------- | ---------- | ------ | ----- | ------ |
| matrix         | false/true | ✓      | ✓     | ✓      |
| label          | false/true | ✓      | ✓     | ✓      |
| simple         | false/true | ✓      | ✓     | ✓      |
| form           | false/true | ✓      | ✓     | ✓      |
| spaceDelimited | false      | ✗      | ✓     | ✓      |
| pipeDelimited  | false      | ✗      | ✓     | ✓      |
| deepObject     | true       | ✗      | ✗     | ✓      |

## Error Handling

The class will throw errors for invalid style/value combinations:

```javascript
// Error: spaceDelimited style is not applicable to strings
params.append("color", "blue", { style: "spaceDelimited" });

// Error: spaceDelimited style with explode=true is not applicable
params.append("color", ["blue", "red"], {
  style: "spaceDelimited",
  explode: true,
});

// Error: deepObject style only applies to objects
params.append("color", ["blue", "red"], { style: "deepObject" });

// Error: deepObject style requires explode=true
params.append("color", { R: 100 }, { style: "deepObject", explode: false });
```

## Complex Examples

### Mixed Styles

```javascript
const params = new QueryParams();
params.append("id", "5", { style: "simple" });
params.append("color", ["blue", "black"], { style: "form", explode: true });
params.append(
  "coordinates",
  { x: 100, y: 200 },
  { style: "deepObject", explode: true },
);

console.log(params.toString());
// 5color=blue&color=black&coordinates%5Bx%5D=100&coordinates%5By%5D=200
```

### Path Parameters

```javascript
const params = new QueryParams();
params.append("userId", "123", { style: "simple" });
params.append("format", "json", { style: "label" });

const path = `/users/${params.toString()}`;
// /users/123.json
```

### Matrix Parameters

```javascript
const params = new QueryParams();
params.append("page", "1", { style: "matrix" });
params.append("limit", "20", { style: "matrix" });
params.append("sort", ["name", "date"], { style: "matrix", explode: true });

console.log(params.toString());
// ;page=1;limit=20;sort=name;sort=date
```

## Testing

Run the test suite:

```bash
npm test
```

## License

MIT

## References

- [OpenAPI 3.0 Specification - Parameter Serialization](https://swagger.io/docs/specification/serialization/)
- [RFC 6570 - URI Template](https://tools.ietf.org/html/rfc6570)
