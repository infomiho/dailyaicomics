import { extendTheme } from "@chakra-ui/react";

import "@fontsource/libre-baskerville/700.css";
import "@fontsource/source-sans-pro/400.css";
import "@fontsource/source-sans-pro/700.css";

export const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        fontFamily: "body",
        color: "gray.800",
        lineHeight: "tall",
        bg: "brand.50",
      },
    },
  },
  fonts: {
    heading: `'Libre Baskerville', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "700",
      },
    },
  },
  colors: {
    // brand rgb: 123, 51, 52
    // hex: #7B3334
    brand: {
      50: "#faf7f7",
      100: "#e9ddde",
      200: "#d7c0c1",
      300: "#c09e9e",
      400: "#b38a8b",
      500: "#a27071",
      600: "#94595a",
      700: "#844041",
      800: "#773132",
      900: "#562424",
    },
  },
});
