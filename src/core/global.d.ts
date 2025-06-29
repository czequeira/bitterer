export {}; // Esto convierte el archivo en módulo

declare global {
  var __BITTER__: import("./Bitter").Bitter | undefined;
}
