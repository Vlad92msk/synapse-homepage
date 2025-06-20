// src/i18n/config.ts
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

// Переводы для UI элементов (не для документации!)
const resources = {
  ru: {
    translation: {
      // Навигация
      'nav.home': 'Главная',
      'nav.docs': 'Документация',
      'nav.examples': 'Примеры',
      'nav.github': 'GitHub',

      // Homepage
      'homepage.hero.title': 'Synapse Storage',
      'homepage.hero.subtitle': 'Управление состоянием нового поколения',
      'homepage.hero.getStarted': 'Документация',
      'homepage.hero.learnMore': 'Ключевые особенности',

      'homepage.features.title': 'Почему Synapse Storage?',

      // Features
      'homepage.features.modular.title': 'Модульная архитектура',
      'homepage.features.modular.description': 'Используйте только нужные модули. Начните с core (~42KB), добавляйте функциональность по мере необходимости',

      'homepage.features.frameworkAgnostic.title': 'Не привязан к фреймворку',
      'homepage.features.frameworkAgnostic.description': 'Можно использовать с любым фреймворком или без него',

      'homepage.features.universalStorage.title': 'Универсальные хранилища',
      'homepage.features.universalStorage.description': 'Memory, LocalStorage, IndexedDB - единый API для работы с любым типом хранилища с поддержкой middleware',

      'homepage.features.readyMiddlewares.title': 'Готовые middlewares',
      'homepage.features.readyMiddlewares.description':
        'Используйте готовые middlewares для оптимизации с помощью batching, shallow-compare и шаринга состояния между вкладками с помощью broadcast',

      'homepage.features.layeredLogic.title': 'Разделяйте логику на слои',
      'homepage.features.layeredLogic.description':
        'Вы можете разделять логику на слои (context, dispatcher, effects, selectors, store) затем с помощью встроенной утилиты createSynapse создать из этих слоев synapse. А затем при необходимости связывать synapse между собой как с помощью прямого инжектирования или с помощью паттерна EventBus!',

      'homepage.features.api.title': 'HTTP клиент + кэширование',
      'homepage.features.api.description': 'Встроенный API-клиент с умным кэшированием, как RTK Query, но проще и быстрее',

      'homepage.features.reactive.title': 'Реактивные эффекты',
      'homepage.features.reactive.description': 'RxJS-powered эффекты в стиле Redux-Observable для сложной асинхронной логики',

      'homepage.features.selectors.title': 'Вычисляемые селекторы',
      'homepage.features.selectors.description': 'Мемоизированные селекторы в стиле Reselect с автоматической оптимизацией пересчетов',

      'homepage.features.react.title': 'React Ready',
      'homepage.features.react.description': 'Готовые хуки для React с оптимизированными ререндерами и поддержкой Suspense',

      // Секции документации
      'nav.sections.gettingStarted': 'Начало работы',
      'nav.sections.gettingStarted.description': 'Общее',
      'nav.sections.gettingStarted.installation': 'Установка',
      'nav.sections.gettingStarted.quick-start': 'Быстрый старт',

      'nav.sections.core': 'Основные возможности',
      'nav.sections.core.create-storages': 'Создание хранилищ',
      'nav.sections.core.value-updates': 'Обновление значений',
      'nav.sections.core.subscriptions': 'Подписки',
      'nav.sections.core.redux-selectors': 'Вычисляемые селекторы',
      'nav.sections.core.middlewares': 'middlewares',

      'nav.sections.advanced': 'Продвинутые возможности',
      'nav.sections.advanced.api-client': 'API-client',
      'nav.sections.advanced.create-dispatcher': 'Создание диспетчеров',
      'nav.sections.advanced.create-effects': 'Создание эффектов',
      'nav.sections.advanced.create-effects-module': 'Конфигурация модуля эффектов',

      'nav.sections.utilities': 'Утилиты',
      'nav.sections.utilities.create-synapse': 'createSynapse',
      'nav.sections.utilities.custom-plugins': 'Кастомные плагины',
      'nav.sections.utilities.custom-middlewares': 'Кастомные middlewares',
      'nav.sections.utilities.additional': 'Дополнительно',

      'nav.sections.changelog': '___',
      'nav.sections.changelog.changelog': 'Журнал изменений',

      // Общие элементы
      'common.readingTime': '{{time}} мин чтения',
      'common.wordCount': '{{count}} слов',
      'common.lastUpdated': 'Обновлено {{date}}',
      'common.tableOfContents': 'Содержание',

      // Метаданные документов
      'docs.readingTime': 'Время чтения: {{time}} мин',
      'docs.wordCount': '{{count}} слов',
      'docs.lastUpdated': 'Обновлено: {{date}}',

      // Кнопки и действия
      'actions.viewDocs': 'Посмотреть документацию',
      'actions.tryNow': 'Попробовать сейчас',
      'actions.downloadExample': 'Скачать пример',
      'actions.copyCode': 'Копировать код',

      // Сообщения
      'messages.copiedToClipboard': 'Скопировано в буфер обмена',
      'messages.failedToCopy': 'Не удалось скопировать',

      // Поиск
      'search.placeholder': 'Поиск в документации...',
      'search.noResults': 'Ничего не найдено',
      'search.results': 'Результаты поиска',

      'quickStart.createStorage': 'Создание хранилища',
      'quickStart.updateValue': 'Обновление значения',
      'quickStart.subscribe': 'Подписка',
    },
  },
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.docs': 'Documentation',
      'nav.examples': 'Examples',
      'nav.github': 'GitHub',

      // Homepage
      'homepage.hero.title': 'Synapse Storage',
      'homepage.hero.subtitle': 'Next generation state management',
      'homepage.hero.getStarted': 'Documentation',
      'homepage.hero.learnMore': 'Key features',

      'homepage.features.title': 'Why Synapse Storage?',

      // Features
      'homepage.features.modular.title': 'Modular Architecture',
      'homepage.features.modular.description': 'Use only the modules you need. Start with core (~42KB), add functionality as needed',

      'homepage.features.frameworkAgnostic.title': 'Framework agnostic',
      'homepage.features.frameworkAgnostic.description': 'Can be used with or without any framework',

      'homepage.features.universalStorage.title': 'Universal Storage',
      'homepage.features.universalStorage.description': 'Memory, LocalStorage, IndexedDB - unified API for working with any type of storage with middleware support',

      'homepage.features.readyMiddlewares.title': 'Ready Middlewares',
      'homepage.features.readyMiddlewares.description': 'Use ready-made middlewares for optimization with batching, shallow-compare and state sharing between tabs via broadcast',

      'homepage.features.layeredLogic.title': 'Separate Logic into Layers',
      'homepage.features.layeredLogic.description':
        'You can separate logic into layers (context, dispatcher, effects, selectors, store) then use the built-in createSynapse utility to create a synapse from these layers. Then, if necessary, connect synapses to each other either through direct injection or using the EventBus pattern!',

      'homepage.features.api.title': 'HTTP Client + Caching',
      'homepage.features.api.description': 'Built-in API client with smart caching, like RTK Query but simpler and faster',

      'homepage.features.reactive.title': 'Reactive Effects',
      'homepage.features.reactive.description': 'RxJS-powered effects in Redux-Observable style for complex async logic',

      'homepage.features.selectors.title': 'Computed Selectors',
      'homepage.features.selectors.description': 'Memoized selectors in Reselect style with automatic recalculation optimization',

      'homepage.features.react.title': 'React Ready',
      'homepage.features.react.description': 'Ready-to-use React hooks with optimized re-renders and Suspense support',

      // Documentation sections
      'nav.sections.gettingStarted': 'Getting started',
      'nav.sections.gettingStarted.description': 'Overview',
      'nav.sections.gettingStarted.installation': 'Installation',
      'nav.sections.gettingStarted.quick-start': 'Quick start',

      'nav.sections.core': 'Core features',
      'nav.sections.core.create-storages': 'Storage create',
      'nav.sections.core.value-updates': 'Value updates',
      'nav.sections.core.subscriptions': 'Subscriptions',
      'nav.sections.core.redux-selectors': 'Computed selectors',
      'nav.sections.core.middlewares': 'Middlewares',

      'nav.sections.advanced': 'Advanced Features',
      'nav.sections.advanced.api-client': 'API Client',
      'nav.sections.advanced.create-dispatcher': 'Creating dispatchers',
      'nav.sections.advanced.create-effects': 'Creating effects',
      'nav.sections.advanced.create-effects-module': 'Effects module configuration',

      'nav.sections.utilities': 'Utilities',
      'nav.sections.utilities.create-synapse': 'createSynapse',
      'nav.sections.utilities.custom-plugins': 'Custom plugins',
      'nav.sections.utilities.custom-middlewares': 'Custom middlewares',
      'nav.sections.utilities.additional': 'Additional',

      'nav.sections.changelog': '___',
      'nav.sections.changelog.changelog': 'Changelog',

      // Common elements
      'common.readingTime': '{{time}} min read',
      'common.wordCount': '{{count}} words',
      'common.lastUpdated': 'Updated {{date}}',
      'common.tableOfContents': 'Table of Contents',

      // Document metadata (добавлено)
      'docs.readingTime': 'Reading time: {{time}} min',
      'docs.wordCount': '{{count}} words',
      'docs.lastUpdated': 'Updated: {{date}}',

      // Actions
      'actions.viewDocs': 'View Documentation',
      'actions.tryNow': 'Try Now',
      'actions.downloadExample': 'Download Example',
      'actions.copyCode': 'Copy Code',

      // Messages
      'messages.copiedToClipboard': 'Copied to clipboard',
      'messages.failedToCopy': 'Failed to copy',

      // Search
      'search.placeholder': 'Search documentation...',
      'search.noResults': 'No results found',
      'search.results': 'Search Results',

      'quickStart.createStorage': 'Create storage',
      'quickStart.updateValue': 'Update value',
      'quickStart.subscribe': 'Subscribe',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('preferred-locale') || 'en',
  react: {
    useSuspense: false,
  },
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },

  // Настройки для корректной работы с проверкой существования переводов
  returnEmptyString: false,
  returnNull: false,
})

// Обновляем lang атрибут при каждой смене языка
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng

  // Обновляем мета-теги
  const description = document.querySelector('meta[name="description"]')
  const ogDescription = document.querySelector('meta[property="og:description"]')

  if (lng === 'ru') {
    description?.setAttribute('content', 'Мощный TypeScript инструмент для управления состоянием с API клиентом, адаптерами хранения и реактивными возможностями.')
    ogDescription?.setAttribute('content', 'Мощный TypeScript инструмент для управления состоянием с API клиентом, адаптерами хранения и реактивными возможностями.')
  } else {
    description?.setAttribute('content', 'Powerful TypeScript state management toolkit with API client, storage adapters, and reactive capabilities.')
    ogDescription?.setAttribute('content', 'Powerful TypeScript state management toolkit with API client, storage adapters, and reactive capabilities.')
  }
})

export default i18n
