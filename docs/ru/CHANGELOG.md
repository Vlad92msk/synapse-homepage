# Журнал изменений


## [3.0.16] - 2025-07-18

### 🚨 Критические изменения

- createSynapseCtx: Удален параметр contextProps из функции contextSynapse
  - Используйте actions внутри компонентов для установки начального состояния
  - Упрощенная сигнатура обертки компонента

### 🐛 Исправлено

- Логика удаления в хранилище: Исправлена валидация плагинов в операциях удаления
- Инвалидация кэша: Исправлена инвалидация кэша для некэшируемых API эндпоинтов
- Утечки памяти: Улучшена очистка в утилитах awaiter и провайдерах контекста

### 📖 Примеры использования

```tsx
// Фреймворк-независимое использование
import { createSynapseAwaiter } from 'synapse-storage/core'

const awaiter = createSynapseAwaiter(userMediaSynapse)
awaiter.onReady(store => console.log('Готов!', store))
const store = await awaiter.waitForReady()

// Использование в React
import { awaitSynapse } from 'synapse-storage/react'

const userMediaReady = awaitSynapse(userMediaSynapse, {
  loadingComponent: <Spinner />,
  errorComponent: (error) => <ErrorBoundary error={error} />
})

const MediaComponent = userMediaReady.withSynapseReady(() => {
  // Здесь Synapse гарантированно готов
  return <div>Контент</div>
})

// Упрощенный контекст (без contextProps)
const userMediaCtx = createSynapseCtx(userMediaSynapse, {
  loadingComponent: <div>Загрузка...</div>
})

const Component = userMediaCtx.contextSynapse(() => {
  const actions = userMediaCtx.useSynapseActions()

  useEffect(() => {
    // Устанавливаем начальное состояние через actions вместо contextProps
    actions.moduleEnter({ selectedType: 'image' })
  }, [])

  return <div>Готово!</div>
})
```

---

## [3.0.14] - 2025-06-26

### 🐛 Исправлено

- Логгер Middleware: Исправлена проблема с некорректным отображением логов в диспетчере

---
---
## [3.0.13] - 2025-06-08

### ✨ Добавлено

- Улучшенная система наблюдателей* Добавлена опция startWithCurrentValue в createWatcher() для управления отправкой начального значения
  - Управление тем, отправляют ли наблюдатели текущее значение состояния сразу при подписке
  - Полезно для синхронизации модулей и сценариев инициализации компонентов
  - Обратная совместимость - по умолчанию false для безопасного поведения

### 🛠 Улучшено

- Сборка только для ESM: Переход на дистрибуцию только ESM для современной экосистемы JavaScript
  - Удалена сборка CommonJS для уменьшения размера бандла и сложности
  - Улучшены возможности tree shaking и статического анализа
  - Более быстрые сборки и меньший размер библиотеки
  - Критическое изменение: Требуется Node.js 14+ с "type": "module" в package.json

### 📖 Примеры использования

```typescript
// Наблюдатель с немедленной отправкой текущего значения
watchCurrentUserProfile: createWatcher({
  type: 'watchCurrentUserProfile',
  selector: (state) => state.currentUserProfile?.user_info,
  shouldTrigger: (prev, curr) => JSON.stringify(prev) !== JSON.stringify(curr),
  startWithCurrentValue: true, // Отправлять текущее значение при подписке
  meta: { description: 'Синхронизация профиля пользователя между модулями' },
})

// Наблюдатель только для отслеживания изменений (поведение по умолчанию)
watchUserActions: createWatcher({
  type: 'watchUserActions', 
  selector: (state) => state.user.lastAction,
  shouldTrigger: (prev, curr) => prev?.id !== curr?.id,
  startWithCurrentValue: false, // Отправлять только при изменениях (по умолчанию)
  meta: { description: 'Отслеживать только новые действия пользователя' },
})
```

### 🚨 Критические изменения

- Только ESM: Библиотека теперь требует современную среду JavaScript
  - Node.js 14+ с поддержкой ESM
  - Современные бандлеры (Webpack 5+, Vite, Rollup)
  - Обновите ваш package.json, добавив "type": "module"

---
---
## [3.0.12] - 2025-06-01

### ✨ Добавлено

- Отслеживание статуса хранилища: Мониторинг прогресса инициализации с помощью onStatusChange() и waitForReady()`
- Управление зависимостями: Контроль порядка инициализации синапсов с помощью свойства dependencies
- EventBus: Новая утилита createEventBus() для слабосвязанной коммуникации между модулями
- Валидация конфигурации: Комплексная валидация с подробными сообщениями об ошибках

### 🛠 Улучшено

- Улучшена обработка ошибок во время инициализации хранилища
- Лучшая поддержка TypeScript и вывод типов
- Улучшены очистка и управление памятью

### 📖 Примеры использования

```typescript
// Отслеживание статуса
const storage = new MemoryStorage(config)
storage.onStatusChange(status => console.log(status.status))
await storage.initialize()

// Зависимости
const synapse = await createSynapse({
  dependencies: [coreSynapse], // Ожидать зависимости
  // ... конфигурация
})

// EventBus
const eventBus = await createEventBus({ name: 'app-events' })
eventBus.dispatcher.publish({ event: 'USER_UPDATED', data: {...} })
```

---
