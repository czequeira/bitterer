export {}; // Esto convierte el archivo en módulo

declare global {
  var __BITTER_IOC__: import("./BitterIoc").BitterIoc | undefined;
}
