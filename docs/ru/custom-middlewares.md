> [🏠 Главная](./README.md)
> [🏠 Журнал изменений](../../CHANGELOG.md)
 
# Создание пользовательских middlewares

Synapse предоставляет две системы расширения функциональности: middleware и плагины. Они выполняют разные роли и имеют разную область применения.

Middleware в Synapse работают по принципу "цепочки обработчиков" и позволяют перехватывать любые операции хранилища. Каждое middleware может модифицировать действия до и после их обработки базовым хранилищем.


### Порядок выполнения middleware

Middleware выполняются в порядке их объявления в массиве:
1. Действие проходит через все middleware сверху вниз
2. Затем выполняется базовая операция хранилища
3. Результат проходит через middleware снизу вверх

```
Action → BroadcastMiddleware → ShallowCompare → Batching → Base Operation
Result ← BroadcastMiddleware ← ShallowCompare ← Batching ← Base Operation
```

> ⚠️ Важно: Порядок middleware имеет значение!
> - BroadcastMiddleware должен быть первым для синхронизации между вкладками
> - ShallowCompare оптимизирует повторные вызовы
> - Batching группирует операции для производительности

#### Создание пользовательского middleware

```typescript
import { Middleware } from 'synapse-storage/core';

const loggingMiddleware = (): Middleware => ({
  // Уникальное имя middleware
  name: 'logging',
  
  // Инициализация при добавлении middleware к хранилищу
  setup: (api) => {
    console.log('Logging middleware initialized');
  },
  
  // Основная логика перехвата и обработки действий
  reducer: (api) => (next) => async (action) => {
    console.log('Before action:', action);
    
    try {
      // Вызов следующего middleware в цепочке
      const result = await next(action);
      
      console.log('After action:', {
        action,
        result,
      });
      
      return result;
    } catch (error) {
      console.error('Action error:', error);
      throw error;
    }
  },
  
  // Очистка ресурсов при уничтожении хранилища
  cleanup: () => {
    console.log('Logging middleware cleanup');
  }
});
```

Позже добавлю более детализированные примеры

___


## 📚 Навигация

- [🏠 Главная](./README.md)
- [📖 Все разделы документации](./README.md#-документация)

### Связанные разделы:
- [⚙️ Middlewares](./middlewares.md)
- [🔌 Создание пользовательских плагинов](./custom-plugins.md)
- [🚀 Базовое использование](./basic-usage.md)
