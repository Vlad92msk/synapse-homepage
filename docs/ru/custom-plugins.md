> [🏠 Главная](./README.md)
> [🏠 Журнал изменений](../../CHANGELOG.md)

# Создание пользовательских плагинов

Плагины в Synapse представляют собой систему обработчиков событий хранилища с определенным жизненным циклом. В отличие от middleware, они не формируют цепочку, а работают как независимые "наблюдатели" за операциями хранилища.

```typescript
import { IStoragePlugin, StoragePluginModule } from 'synapse-storage/core';

// Создаем модуль плагинов
const plugins = new StoragePluginModule(
  undefined,      // Родительский модуль плагинов (опционально)
  console,        // Логгер
  'appStorage'    // Имя хранилища
);

// Пример плагина валидации
class ValidationPlugin implements IStoragePlugin {
  name = 'validation';
  private validators = new Map();
  private options: any;

  constructor(options = {}) {
    this.options = options;
  }

  // Добавление правила валидации для ключа
  addValidator(key, validator) {
    this.validators.set(key, validator);
    return this;
  }

  // Вызывается перед сохранением значения
  async onBeforeSet(value, context) {
    const { key } = context.metadata || {};
    
    if (key && this.validators.has(key)) {
      const validator = this.validators.get(key);
      const result = validator(value);
      
      if (!result.valid) {
        if (this.options.throwOnInvalid) {
          throw new Error(`Validation failed for ${key}: ${result.message}`);
        }
        
        this.options.onValidationError?.(key, value, result.message);
      }
    }
    
    return value;
  }
  
  // Инициализация плагина
  async initialize() {
    console.log('Validation plugin initialized');
  }
  
  // Очистка ресурсов
  async destroy() {
    this.validators.clear();
  }
}

// Добавление плагинов в модуль
await plugins.add(new ValidationPlugin({
  throwOnInvalid: true,
  onValidationError: (key, value, message) => {
    console.error(`Validation error: ${message}`);
  }
}));

// Создание хранилища с плагинами
const storage = await new MemoryStorage(
  { name: 'app-storage' },
  plugins  // Передаем модуль плагинов
).initialize();
```

#### Жизненный цикл плагинов

Плагины имеют следующие методы жизненного цикла:

1. Инициализация: initialize() - вызывается при добавлении плагина в хранилище
2. Операции хранилища:
    - onBeforeSet / onAfterSet - до/после сохранения значения
    - onBeforeGet / onAfterGet - до/после получения значения
    - onBeforeDelete / onAfterDelete - до/после удаления значения
    - onClear - при очистке хранилища
3. Уничтожение: destroy() - вызывается при удалении плагина или уничтожении хранилища

#### Когда использовать middleware, а когда плагины?

- Middleware лучше использовать для:
    - Перехвата всех операций хранилища в одном месте
    - Изменения поведения базовых операций хранилища
    - Оптимизации (батчинг, дедупликация)
    - Синхронизации между хранилищами/вкладками

- Плагины лучше использовать для:
    - Обработки конкретных событий хранилища
    - Валидации данных
    - Логирования операций
    - Реализации бизнес-логики, связанной с хранением данных
    - Интеграции с внешними сервисами


Позже добавлю более детализированные примеры

___

## 📚 Навигация

- [🏠 Главная](./README.md)
- [📖 Все разделы документации](./README.md#-документация)

### Связанные разделы:
- [⚙️ Middlewares](./middlewares.md)
- [⚙️ Создание пользовательских middlewares](./custom-middlewares.md)
- [🚀 Базовое использование](./basic-usage.md)
