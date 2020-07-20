import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";

const beforeSSR = async ({ libraries, actions }) => {
  // Add image processor.
  libraries.html2react.processors.push(image);

  // Add the nameAndDescription handler.
  libraries.source.handlers.push({
    name: "nameAndDescription",
    priority: 10,
    pattern: "nameAndDescription",
    func: async ({ route, state, libraries }) => {
      // 1. Get response from api endpoint.
      const response = await libraries.source.api.get({
        endpoint: "/" // "/" is added after "/wp-json" so final url is "/wp-json/"
      });

      // 2. Extract relevant data from the response.
      const { name, description } = await response.json();

      // 3. Add it to the source.data object.
      state.source.data[route].name = name;
      state.source.data[route].description = description;
    }
  });

  // Fetch the wp-json endpoint.
  await actions.source.fetch("nameAndDescription");
};

const beforeCSR = ({ libraries }) => {
  // Add image processor.
  libraries.html2react.processors.push(image);
};

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      beforeSSR: beforeSSR,
      beforeCSR: beforeCSR
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image, iframe],
    },
  },
};

export default marsTheme;
