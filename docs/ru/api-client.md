> [🏠 Главная](./README.md)
> [🏠 Журнал изменений](../../CHANGELOG.md)
# API-клиент

Synapse включает в себя API-клиент с поддержкой кеширования:

```typescript
const api = new ApiClient({
  // Настройка кеширования запросов
  cacheableHeaderKeys: ['X-Auth-Token'],
  storage: API, // Передаем экземпляр готового хранилища
  // Настройки кеша
  cache: {
    ttl: 5 * 60 * 1000, // Время жизни кеша: 5 минут
    invalidateOnError: true, // Инвалидация кеша при ошибке
    cleanup: {
      enabled: true, // Периодическая очистка кеша
      interval: 10 * 60 * 1000, // Интервал очистки: 10 минут
    },
  },
  // Базовые настройки запроса
  baseQuery: {
    baseUrl: 'https://api.example.com',
    timeout: 10000, // 10 секунд
    prepareHeaders: async (headers, context) => {
      // Установка заголовков
      headers.set('X-Auth-Token', 'some-token');
      // Получение данных из хранилища или cookies
      const token = context.getCookie('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'same-origin',
  },
  // Определение эндпоинтов
  endpoints: async (create) => ({
    getData: create({
      request: (params, context) => ({
        path: '/data',
        method: 'GET',
        query: params,
      }),
      // Можно указать специфичные настройки кеша для эндпоинта
      cache: {
        ttl: 60 * 1000, // 1 минута для этого эндпоинта
      },
    }),
  }),
});

// Инициализация
const myApi = await api.init();

// Использование с подпиской на состояние запроса
const request = myApi.getEndpoints().getData.request({ id: 1 }, {
  // Можно передать дополнительные свойства в контекст
  context: {
    someKey: 'someValue',
  },
  // Можно отключить кэш для конкретного вызова
  // disableCache: true,
  // Можно указать заголовки, которые будут участвовать в формировании ключа (перетирают все остальные настройки)
  // cacheableHeaderKeys: ['header-key'],
  // и тд...
  // Некоторые аспекты еще будут дорабатываться
});

// Вариант 1: Подписка на изменения состояния запроса
request.subscribe((state) => {
  switch (state.status) {
    case 'idle':
      console.log('Запрос неактивен');
      break;
    case 'loading':
      console.log('Загрузка данных...');
      break;
    case 'success':
      console.log('Данные получены:', state.data);
      break;
    case 'error':
      console.log('Ошибка:', state.error);
      break;
  }
});

// Вариант 2: Ожидание результата запроса
const response = await request.wait();

// Вариант 3: Ожидание с колбеками для разных состояний
await request.waitWithCallbacks({
  loading: () => console.log('Загрузка...'),
  success: (data) => console.log('Данные:', data),
  error: (error) => console.error('Ошибка:', error),
});
```

___

## 📚 Навигация

- [🏠 Главная](./README.md)
- [📖 Все разделы документации](./README.md#-документация)

### Связанные разделы:
- [🚀 Базовое использование](./basic-usage.md)
- [⚡ Создание Эффектов](./create-effects.md)
- [🛠️ Утилита createSynapse](./create-synapse.md)
