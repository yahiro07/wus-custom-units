module.exports = {
  webpackConfig: require("./node_modules/react-scripts/config/webpack.config"),
  components: "src/components/**/[A-Z]*.{js,jsx,ts,tsx}",
  theme: {
    color: {
      link: "#40522D",
      linkHover: "oliveDrab",
      sidebarBackground: "#B2FF5A"
    },
    fontFamily: {
      base: ' "Roboto Mono", monospace'
    }
  },
  styles: {
    StyleGuide: {
      root: {
        "text-rendering": "optimizeLegibility",
        "-moz-osx-font-smoothing": "grayscale",
        "-webkit-font-smoothing": "antialiased"
      },
      content: {},
      logo: {
        border: "none",
        paddingBottom: 0
      }
    },
    Logo: {
      logo: {
        color: "#40522D",
        fontSize: 20
      }
    },
    ComponentsList: {
      list: {
        "& ul": {
          paddingLeft: 0
        }
      },
      item: {
        "& a": {
          color: ["#40522D", "!important"],
          fontWeight: [500, "!important"],
          cursor: ["pointer", "!important"],
          "&:hover": {
            textDecoration: "underline",
            color: ["#40522D", "!important"]
          }
        }
      },
      heading: {
        fontSize: ["18px", "!important"],
        fontWeight: [600, "!important"],
        color: ["#40522D", "!important"]
      }
    },
    Pathline: {
      copyButton: {
        border: 0
      }
    },
    Playground: {
      preview: {
        padding: 0
      }
    },
    PlaygroundError: {
      root: {
        margin: 0
      }
    }
  },
  usageMode: "expand"
};
