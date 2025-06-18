# Synapse Storage

>  **🇷🇺 Русский** | [🇺🇸 English](../../README.md) | [🏠 Журнал изменений](../../CHANGELOG.md)

Набор инструментов для управления состоянием + API-клиент

[![npm version](https://badge.fury.io/js/synapse-storage.svg)](https://badge.fury.io/js/synapse-storage)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/synapse-storage)](https://bundlephobia.com/package/synapse-storage)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![RxJS Version](https://img.shields.io/badge/RxJS-%5E7.8.2-red?logo=reactivex)](https://rxjs.dev/)

## ✨ Ключевые особенности

- 🚀 **Не зависит от фреймворка** - Вы можете использовать Synapse в контексте любого фреймворка или независимо от него
- 💾 **Разнообразные адаптеры хранилищ** - Memory, LocalStorage, IndexedDB
- 🧮 **Различный способ получения данных** - Computed values with memoization
    - Возможность создания вычисляемых селекторов в стиле Redux
    - Возможность прямой подписки на конкретное свойство в хранилище
    - Возможность подписки на реактивное состояние
- 🌐 **Создание API клиентов** - HTTP клиент с возможностью кэширования (Похож на RTK Query)
- ⚛️ **React** - Несколько удобных хуков для React
- ⚡ **RxJS** - Возможность создания эффектов в стиле Redux-Observable
- ⚙️ **Поддержка кастомных middleware** - Возможность расширения функционала хранилища с помощью кастомных middlewares
- 🔌 **Поддержка кастомных плагинов** - Возможность расширения функционала хранилища с помощью кастомных middlewares

---
## Автор

**Владислав** — Senior Frontend Developer (React, TypeScript)


> ### 🔎 Нахожусь в поиске новых карьерных возможностей!
>
> [GitHub](https://github.com/Vlad92msk/) | [LinkedIn](https://www.linkedin.com/in/vlad-firsov/)


---
_PS: Пока не рекоммендую использовать в production т.к разработкой занимаюсь в свободное время.
Библиотека в целом работает, но дать гарантии смогу после полной интеграции ее в свой пет-проект Социальная сеть.
Но произойдет это не раньше смены моего текущего места работы и страны проживания_
---

## 📦 Установка

```bash
npm install synapse-storage
```

```bash
# Для реактивных возможностей
npm install rxjs

# Для React интеграции  
npm install react react-dom

# Все сразу для полного функционала
npm install synapse-storage rxjs react react-dom
```

## Требования

### Зависимости

| Модуль | Описание    | Зависимости |
|--------|-------------|-------------|
| `synapse-storage/core` | base        | -           |
| `synapse-storage/react` | React       | React 18+   |
| `synapse-storage/reactive` | RxJS        | RxJS 7.8.2+ |
| `synapse-storage/api` | HTTP client | -           |
| `synapse-storage/utils` | Utils       | -           |

> **💡 Совет:** Импортируйте только нужные модули для оптимального размера бандла

### tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022", 
    "moduleResolution": "bundler"
  }
}
```
---

## 📚 Документация

- [📖 Главная](./README.md)
- [🚀 Базовое использование](./basic-usage.md)
- [🧮 Вычисляемые селекторы в стиле Redux](./redux-selectors.md)
- [⚙️ Middlewares](./middlewares.md)
- [🌐 API-клиент](./api-client.md)
- ⚡ Реактивный подход
  - [⚡ Создание Диспетчера](./create-dispatcher.md)
  - [⚡ Создание Эффектов](./create-effects.md)
  - [⚡ Создание Модуля эффектов](./create-effects-module.md)
- [🛠️ Утилита createSynapse](./create-synapse.md)
- [🔌 Создание пользовательских плагинов](./custom-plugins.md)
- [⚙️ Создание пользовательских middlewares](./custom-middlewares.md)
- [📋 Дополнительное](./additional.md)
---

## 🎯 Примеры

- [GitHub](https://github.com/Vlad92msk/synapse-examples)
- [YouTube](https://www.youtube.com/channel/UCGENI_i4qmBkPp98P2HvvGw)

---

## Модульное использование

Не нужно всё? Импортируйте только то, что используете:

| Сценарий использования | Импорт | Размер | Сравнение |
|----------------------|--|----|-----------|
| **Базовое состояние** | `synapse-storage/core` | ~42KB | vs Redux: 45KB |
| **+ HTTP клиент** | `+ /api` | +13KB | vs React Query: 39KB |
| **+ Реактивность** | `+ /reactive` | +8KB | vs Redux-Observable: 25KB |
| **+ React хуки** | `+ /react` | +5KB | vs кастомные хуки |
| **Полный комплект** | все модули | ~171KB | vs 109KB стек + кастом |

> **🎯 Результат:** Аналогичная или лучшая производительность с единым API и поддержкой TypeScript из коробки

```typescript
// 📦 Минимальный проект - только хранилище
import { MemoryStorage } from 'synapse-storage/core'        // 42KB

// 📦 + Добавить HTTP клиент по необходимости  
import { ApiClient } from 'synapse-storage/api'             // +13KB

// 📦 + Добавить реактивные эффекты когда понадобятся
import { createDispatcher } from 'synapse-storage/reactive' // +8KB

// 📦 + Добавить React хуки для UI
import { useSelector } from 'synapse-storage/react'         // +5KB
```

### 🔧 Или создайте свою реализацию

```typescript
// Используйте core + свои решения
import { IStorage } from 'synapse-storage/core'

// Реализуйте свой HTTP клиент
class MyApiClient { /* ваша логика */ }

// Реализуйте свой SelectorModule
class MySelectorModule { /* ваша логика */ }

// Реализуйте свои React хуки  
const useMyCustomHook = () => { /* ваша логика */ }
```
Вы можете взять за основу хранилище из synapse-storage и (если необходимо):
- Реализовать свой модуль вычисляемых селекторов
- Реализовать свою реактивность

### 🎨 Преимущества конструкторного подхода

- 🚀 Быстрый старт - начните с core, добавляйте модули по мере роста проекта
- 📦 Оптимальный бандл - не платите за неиспользуемую функциональность
- 🔄 Гибкость - замените любой модуль своей реализацией
- 🛠️ Совместимость - модули работают независимо, но интегрируются идеально
- 📈 Масштабируемость - от простого стейта до полноценной архитектуры
---
