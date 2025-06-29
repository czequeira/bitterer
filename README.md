# Bitter  
**Lightweight IoC Container for TypeScript**  
*Inspired by Spring, optimized for modern TypeScript apps*

[![npm version](https://img.shields.io/npm/v/bitter.svg)](https://www.npmjs.com/package/bitter)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Bundle Size](https://img.shields.io/bundlephobia/min/bitter)](https://bundlephobia.com/package/bitter)

``` bash
npm install bitter reflect-metadata
```

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Examples](#-examples)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features
✔ **Dependency Injection** with `@Bit` and `@Inject`  
✔ **Automatic Scanning** of components  
✔ **Dual Scope**: Singleton & Prototype  
✔ **TypeScript First** design  

## 🛠 Installation
1. Install package:
``` bash
npm install bitter reflect-metadata
```
2. Enable decorators in `tsconfig.json`:
``` json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 🚀 Quick Start
### 1. Define a Service
``` typescript
// math.service.ts
import { Bit } from 'bitter';

@Bit()
export class MathService {
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### 2. Inject Dependencies
``` typescript
// calculator.service.ts
import { Bit, Inject } from 'bitter';

@Bit()
export class Calculator {
  constructor(
    @Inject('mathService') private math: MathService
  ) {}

  sum(a: number, b: number): number {
    return this.math.add(a, b);
  }
}
```

### 3. Bootstrap Application
``` typescript
// main.ts
import { Bitter } from 'bitter';

async function main() {
  const container = new Bitter();
  await container.scan();
  
  const calc = container.getBit<Calculator>('calculator');
  console.log(calc.sum(2, 3)); // Output: 5
}

main();
```

## 📚 API Documentation
### Core Decorators
| Decorator  | Description                          |
|------------|--------------------------------------|
| `@Bit()`   | Registers class as injectable component |
| `@Inject()`| Injects dependency by name           |

### Bitter Container
``` typescript
class Bitter {
  scan(): Promise<void>;    // Scans project for @Bit classes
  getBit<T>(name: string): T; // Retrieves a dependency
  register(components: any): void; // Manual registration
}
```
## 🧩 Examples

### Basic Usage
``` typescript
// service.ts
import { Bit } from 'bitter';

@Bit()
export class DataService {
  fetchData() {
    return { message: "Hello from Bitter!" };
  }
}
```

### Dependency Injection
``` typescript
// controller.ts
import { Bit, Inject } from 'bitter';
import { DataService } from './service';

@Bit()
export class AppController {
  constructor(
    @Inject('dataService') private service: DataService
  ) {}

  getData() {
    return this.service.fetchData();
  }
}
```

### Application Bootstrap
``` typescript
// main.ts
import { Bitter } from 'bitter';
import './controller'; // Import files to register decorators

async function startApp() {
  const container = new Bitter();
  await container.scan(); // Auto-discovers all @Bit classes
  
  const controller = container.getBit<AppController>('appController');
  console.log(controller.getData()); // { message: "Hello from Bitter!" }
}

startApp();
```

### Advanced: Manual Registration
``` typescript
// config.ts
const container = new Bitter();

container.register({
  'customService': {
    class: class CustomService {
      greet() { return "Manual registration!" }
    },
    scope: 'singleton'
  }
});

const service = container.getBit<any>('customService');
console.log(service.greet()); // "Manual registration!"
```

### Scopes Demonstration
``` typescript
@Bit({ scope: 'prototype' })
export class PrototypeService {
  id = Math.random();
}

const instance1 = container.getBit<PrototypeService>('prototypeService');
const instance2 = container.getBit<PrototypeService>('prototypeService');

console.log(instance1.id === instance2.id); // false - different instances
```

Note: Remember to configure your tsconfig.json with:
``` json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## 🛣 Roadmap (Browser-First)

### Current Version
| Versión | Características          | Estado      |
|---------|--------------------------|-------------|
| 0.0.1   | DI Básico  | ✅ Lanzada   |
|         | @Bit/@Inject             | ✅           |
|         | Scopes (Singleton & Prototype)      | ✅           |

### Short-Term Plans
| Versión | Características                     | Estado       |
|---------|-------------------------------------|--------------|
| 0.1.0   | Ciclo de Vida                       | 🔄 En Desarrollo |
|         | - @PostConstruct                    |              |
|         | - @PreDestroy                       |              |
| 0.2.0   | Perfiles de Entorno                 | ⏳ Planeado   |
|         | - dev/prod/testing                  |              |
|         | - Build optimizado                  |              |

### Browser-Specific Features
``` typescript
// Ejemplo futuro de uso
@Bit()
class UIComponent {
  @Inject('config') private config;

  @PostConstruct()
  init() {
    console.log('Montado en DOM');
  }
}
```

### Long-Term Vision
- Integración con Web Components
- Soporte para estado global
- DevTools extension
- Lazy loading nativo

## 🤝 Contributing
1. Fork the repository  
2. Install dependencies:
``` bash
npm install
```

## 📜 License
MIT © [Your Name]

## ❓ Getting Help
For bug reports and feature requests, please open an issue on GitHub.