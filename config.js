const caseFormat = require("change-case");

const StyleDictionary = require("style-dictionary").extend({
  source: ["properties/index.js"],
  platforms: {
    js: {
      transforms: ["attribute/cti", "name/cti/camel", "name/ti/camel", "name/pascal", "color/hex"],
      buildPath: "../frontend/views/.tokens/",
      files: [
        {
          destination: "index.js",
          format: "javascript/es6"
        }
      ]
    }
  }
});

// Icon
StyleDictionary.registerTransform({
  name: "name/pascal",
  type: "name",
  matcher: function(prop) {
    return prop.attributes.category === "icon";
  },
  transformer: function(prop) {
    // console.log(prop)
    return caseFormat.pascalCase(prop.attributes.type + "_" + prop.attributes.category);
  }
});

// button
StyleDictionary.registerTransform({
  name: "name/ti/camel",
  type: "name",
  matcher: function(prop) {
    return prop.attributes.category === "size" && prop.attributes.type === "button";
  },
  transformer: function(prop) {
    // console.log(prop);
    // const [, ...name] = prop.path.join("_");
    return caseFormat.camelCase(
      prop.attributes.type + "_" + prop.attributes.item + "_" + prop.attributes.subitem
    );
  }
});

StyleDictionary.buildAllPlatforms();
