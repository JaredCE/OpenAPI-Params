"use strict";

const expect = require("chai").expect;

// Assuming your class will be called QueryParams
const QueryParams = require("../../src/QueryParams");

describe("QueryParams", function () {
  describe("constructor", function () {
    it("should create an empty instance", function () {
      const params = new QueryParams();
      expect(params).to.be.instanceOf(QueryParams);
    });
  });

  describe("append()", function () {
    it("should append a parameter with default style", function () {
      const params = new QueryParams();
      params.append("color", "blue");
      expect(params.toString()).to.equal("color=blue");
    });

    it("should append multiple parameters", function () {
      const params = new QueryParams();
      params.append("color", "blue");
      params.append("size", "large");
      expect(params.toString()).to.include("color=blue");
      expect(params.toString()).to.include("size=large");
    });
  });

  describe("matrix style", function () {
    describe("undefined value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "matrix", explode: false });
        expect(params.toString()).to.equal(";color");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "matrix", explode: true });
        expect(params.toString()).to.equal(";color");
      });
    });

    describe("string value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "matrix", explode: false });
        expect(params.toString()).to.equal(";color=blue");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "matrix", explode: true });
        expect(params.toString()).to.equal(";color=blue");
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "matrix",
          explode: false,
        });
        expect(params.toString()).to.equal(";color=blue,black,brown");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "matrix",
          explode: true,
        });
        expect(params.toString()).to.equal(
          ";color=blue;color=black;color=brown",
        );
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "matrix", explode: false },
        );
        expect(params.toString()).to.equal(";color=R,100,G,200,B,150");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "matrix", explode: true },
        );
        expect(params.toString()).to.equal(";R=100;G=200;B=150");
      });
    });
  });

  describe("label style", function () {
    describe("undefined value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "label", explode: false });
        expect(params.toString()).to.equal(".");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "label", explode: true });
        expect(params.toString()).to.equal(".");
      });
    });

    describe("string value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "label", explode: false });
        expect(params.toString()).to.equal(".blue");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "label", explode: true });
        expect(params.toString()).to.equal(".blue");
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "label",
          explode: false,
        });
        expect(params.toString()).to.equal(".blue,black,brown");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "label",
          explode: true,
        });
        expect(params.toString()).to.equal(".blue.black.brown");
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "label", explode: false },
        );
        expect(params.toString()).to.equal(".R,100,G,200,B,150");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "label", explode: true },
        );
        expect(params.toString()).to.equal(".R=100.G=200.B=150");
      });
    });
  });

  describe("simple style", function () {
    describe("undefined value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "simple", explode: false });
        expect(params.toString()).to.equal("");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "simple", explode: true });
        expect(params.toString()).to.equal("");
      });
    });

    describe("string value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "simple", explode: false });
        expect(params.toString()).to.equal("blue");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "simple", explode: true });
        expect(params.toString()).to.equal("blue");
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "simple",
          explode: false,
        });
        expect(params.toString()).to.equal("blue,black,brown");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "simple",
          explode: true,
        });
        expect(params.toString()).to.equal("blue,black,brown");
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "simple", explode: false },
        );
        expect(params.toString()).to.equal("R,100,G,200,B,150");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "simple", explode: true },
        );
        expect(params.toString()).to.equal("R=100,G=200,B=150");
      });
    });
  });

  describe("form style", function () {
    describe("undefined value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "form", explode: false });
        expect(params.toString()).to.equal("color=");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", undefined, { style: "form", explode: true });
        expect(params.toString()).to.equal("color=");
      });
    });

    describe("string value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "form", explode: false });
        expect(params.toString()).to.equal("color=blue");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", "blue", { style: "form", explode: true });
        expect(params.toString()).to.equal("color=blue");
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "form",
          explode: false,
        });
        expect(params.toString()).to.equal("color=blue,black,brown");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "form",
          explode: true,
        });
        expect(params.toString()).to.equal(
          "color=blue&color=black&color=brown",
        );
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "form", explode: false },
        );
        expect(params.toString()).to.equal("color=R,100,G,200,B,150");
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "form", explode: true },
        );
        expect(params.toString()).to.equal("R=100&G=200&B=150");
      });
    });
  });

  describe("spaceDelimited style", function () {
    describe("string value", function () {
      it("should throw error (not applicable to strings)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", "blue", { style: "spaceDelimited" }),
        ).to.throw();
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "spaceDelimited",
          explode: false,
        });
        expect(params.toString()).to.equal("color=blue%20black%20brown");
      });

      it("should throw error with explode=true (not applicable)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", ["blue", "black", "brown"], {
            style: "spaceDelimited",
            explode: true,
          }),
        ).to.throw();
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "spaceDelimited", explode: false },
        );
        expect(params.toString()).to.equal("color=R%20100%20G%20200%20B%20150");
      });

      it("should throw error with explode=true (not applicable)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append(
            "color",
            { R: 100, G: 200, B: 150 },
            { style: "spaceDelimited", explode: true },
          ),
        ).to.throw();
      });
    });
  });

  describe("pipeDelimited style", function () {
    describe("string value", function () {
      it("should throw error (not applicable to strings)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", "blue", { style: "pipeDelimited" }),
        ).to.throw();
      });
    });

    describe("array value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append("color", ["blue", "black", "brown"], {
          style: "pipeDelimited",
          explode: false,
        });
        expect(params.toString()).to.equal("color=blue%7Cblack%7Cbrown");
      });

      it("should throw error with explode=true (not applicable)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", ["blue", "black", "brown"], {
            style: "pipeDelimited",
            explode: true,
          }),
        ).to.throw();
      });
    });

    describe("object value", function () {
      it("should serialize with explode=false", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "pipeDelimited", explode: false },
        );
        expect(params.toString()).to.equal("color=R%7C100%7CG%7C200%7CB%7C150");
      });

      it("should throw error with explode=true (not applicable)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append(
            "color",
            { R: 100, G: 200, B: 150 },
            { style: "pipeDelimited", explode: true },
          ),
        ).to.throw();
      });
    });
  });

  describe("deepObject style", function () {
    describe("string value", function () {
      it("should throw error (not applicable to strings)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", "blue", { style: "deepObject" }),
        ).to.throw();
      });
    });

    describe("array value", function () {
      it("should throw error (not applicable to arrays)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append("color", ["blue", "black", "brown"], {
            style: "deepObject",
          }),
        ).to.throw();
      });
    });

    describe("object value", function () {
      it("should throw error with explode=false (not applicable)", function () {
        const params = new QueryParams();
        expect(() =>
          params.append(
            "color",
            { R: 100, G: 200, B: 150 },
            { style: "deepObject", explode: false },
          ),
        ).to.throw();
      });

      it("should serialize with explode=true", function () {
        const params = new QueryParams();
        params.append(
          "color",
          { R: 100, G: 200, B: 150 },
          { style: "deepObject", explode: true },
        );
        expect(params.toString()).to.equal(
          "color%5BR%5D=100&color%5BG%5D=200&color%5BB%5D=150",
        );
      });
    });
  });

  describe("multiple parameters", function () {
    it("should handle multiple form style parameters", function () {
      const params = new QueryParams();
      params.append("color", "blue", { style: "form", explode: true });
      params.append("size", "large", { style: "form", explode: true });
      expect(params.toString()).to.equal("color=blue&size=large");
    });

    it("should handle mixed style parameters", function () {
      const params = new QueryParams();
      params.append("id", "5", { style: "simple" });
      params.append("color", ["blue", "black"], {
        style: "form",
        explode: true,
      });
      const result = params.toString();
      expect(result).to.include("5");
      expect(result).to.include("color=blue&color=black");
    });
  });

  describe("edge cases", function () {
    it("should handle empty array", function () {
      const params = new QueryParams();
      params.append("color", [], { style: "form", explode: false });
      expect(params.toString()).to.equal("color=");
    });

    it("should handle empty object", function () {
      const params = new QueryParams();
      params.append("color", {}, { style: "form", explode: false });
      expect(params.toString()).to.equal("color=");
    });

    it("should default to form style with explode=true when options not specified", function () {
      const params = new QueryParams();
      params.append("color", "blue");
      expect(params.toString()).to.equal("color=blue");
    });
  });
});
