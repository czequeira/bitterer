# Bitterer  
**Lightweight IoC Container for TypeScript**  
*Inspired by Spring, optimized for modern TypeScript apps*

[![npm version](https://img.shields.io/npm/v/bitterer.svg)](https://www.npmjs.com/package/bitterer)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![Bundle Size](https://img.shields.io/bundlephobia/min/bitterer)](https://bundlephobia.com/package/bitterer)

``` bash
npm install bitterer reflect-metadata
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
npm install bitterer reflect-metadata
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
import { Bit } from 'bitterer';

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
import { Bit, Inject } from 'bitterer';

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
import { Bitter } from 'bitterer';

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
| `@PostConstruct()`| Execute method after bit is constructed           |
| `@PreDestroy()`| Execute method when shutdown is called           |

### Bitter Container
``` typescript
class Bitter {
  scan(): Promise<void>;    // Scans project for @Bit classes
  getBit<T>(name: string): T; // Retrieves a dependency
  register(components: any): void; // Manual registration
  shutdown(): void; // Destroy the singleton instance and call al @PreDestroy
}
```
## 🧩 Examples

### Basic Usage
``` typescript
// service.ts
import { Bit } from 'bitterer';

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
import { Bit, Inject } from 'bitterer';
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
import { Bitter } from 'bitterer';
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

### 🛠 Conditional Configuration in Bitterer  
Define alternative implementations based on environment or conditions.

#### 1. File Structure  
```
src/
├── tools/
│   ├── ProdTool.ts
│   ├── DevTool.ts
│   └── MockTool.ts
├── services/
│   └── WorkerService.ts
└── config.yml
```

#### 2. Bit Implementations  
``` typescript
// tools/ProdTool.ts
@Bit('prodTool')
export class ProdTool implements Tool {
  work() { console.log("Production mode active!"); }
}
```

``` typescript
// tools/DevTool.ts
@Bit('devTool')
export class DevTool implements Tool {
  work() { console.log("Development mode"); }
}
```

#### 3. YAML Configuration (config.yml)  

``` yaml
scan: true  # Auto-scan enabled
bits:
  tool:
    implementations:
      - name: prodTool
        when:
          allOf:
            env: production
            region: us-east
      - name: devTool
        when:
          anyOf:
            env: development
            debug: true
      - name: mockTool
```

#### 4. Service with Injection  

``` typescript
// services/WorkerService.ts
@Bit('workerService')
export class WorkerService {
  constructor(
    @Inject('tool') private tool: Tool
  ) {}

  run() {
    this.tool.work();
  }
}
```

#### 5. Simplified Initialization  

``` typescript
// main.ts
const bitter = new Bitter();
const context = {
  env: process.env.NODE_ENV,
  debug: true
};

const file = await readFile('./config.yml', 'utf8')
await bitter.importYaml(file, context);

const worker = bitter.getBit<WorkerService>('workerService');
worker.run();

```

#### 🧩 Behavior by Environment  
| Context                | Injected Tool | Output                  |  
|------------------------|---------------|-------------------------|  
| `env: production`      | `prodTool`    | "Production mode active!" |  
| `debug: true`          | `devTool`     | "Development mode"      |  
| Other cases            | `mockTool`    | (Default implementation) |  

#### ⚙️ Key Features  
- `scan: true`: Enables automatic class scanning when loading config  
- Type-safe resolution  
- No code changes needed to switch implementations  

## 🛣 Roadmap (Browser-First)

### Short-Term Plans
| Versión | Características          | Estado      |
|---------|--------------------------|-------------|
| 0.0.1   | basic IOC                | ✅ Done  |
|         | @Bit/@Inject             | ✅          |
|         | Scopes (Singleton & Prototype)| ✅     |
| 0.1.0   | Lifecycle                |  ✅         |
|         | - @PostConstruct         |   ✅        |
|         | - @PreDestroy            |   ✅        |
|         | Yaml configuration       |   ✅        |
| 0.2.0   | **Browser compatibility**    | 🔄 WIP      |
|         | **- Compatible IOC**         | 🔄          |
|         | - - getBit (BROWSER)      |  ✅         |
|         | - - scan (BROWSER)        | 🔄         |
|         | - - YAML (BROWSER)        | 🔄         |
|         | **- React Hooks**            | 🔄          |
|         | - - useBitter            |  ✅          |
|         | - - useBit            |  ✅         |
| 0.3.0   | Better documentation      | ⏳ Planed   |

### Browser-Specific Features (REACT + VITE)
``` typescript
import "reflect-metadata"
import { Bit } from "bitterer/browser";

@Bit('calcService')
export class CalcService {

  add(a: number, b: number) {
    return a + b
  }
}
```

``` typescript
import 'reflect-metadata'
import { CalcService } from './CalcService'
import { Bit, Inject } from 'bitterer/browser'

@Bit('service')
export class Service {
  constructor(
    @Inject('calcService') private calcService: CalcService
  ) {}

  sum(a: number, b: number) {
    return this.calcService.add(a, b)
  }
}
```

``` tsx
import { Service } from './Service'
import { useBit } from 'bitterer/browser'

function App() {
  const service = useBit<Service>('service')

  return (
    <button onClick={() => {
      console.log(service.sum(1, 2))
    }}>
      sum
    </button>
  )
}

export default App
```

### Long-Term Vision
- Web components integration
- Global state extensions
- DevTools extension
- Lazy loading nativo

## 🤝 Contributing
1. Fork the repository  
2. Install dependencies:
``` bash
npm install
```

## 📜 License
MIT © Carlos Alberto Zequeira Sánchez

## ❓ Getting Help
For bug reports and feature requests, please open an issue on GitHub.
