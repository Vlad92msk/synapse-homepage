// Auto-generated types for structured documentation
// Generated at: 2025-06-26T05:37:43.515Z
// Master locale: en

export type Locale = 'en' | 'ru'

export type DocKey = 'CHANGELOG' | 'README' | 'additional' | 'api-client' | 'basic-usage' | 'create-dispatcher' | 'create-effects-module' | 'create-effects' | 'create-synapse' | 'custom-middlewares' | 'custom-plugins' | 'middlewares' | 'redux-selectors' | 'storage-creation'


// ✅ ТОЧНЫЕ ТИПЫ ДЛЯ SECTION ID
export interface DocSectionIds {
  'CHANGELOG': 'changelog' | '3014-2025-06-21' | '3013-2024-12-xx' | '3012-2024-12-27'
  'README': 'synapse-storage' | 'key-features' | 'author' | 'ps-not-recommended-for-production-use-yet-as-i-develop-this-in-my-free-time-the-library-works-in-general-but-i-can-provide-guarantees-only-after-full-integration-into-my-pet-project-social-network-this-wont-happen-before-changing-my-current-workplace-and-country-of-residence' | 'installation' | 'requirements' | 'documentation' | 'examples' | 'modular-usage'
  'additional': 'additional' | 'navigation'
  'api-client': 'api-client' | 'navigation'
  'basic-usage': 'basic-usage' | 'creating-storage' | 'ways-to-change-values-main' | 'creating-subscriptions' | 'navigation'
  'create-dispatcher': 'creating-dispatcher' | 'navigation'
  'create-effects-module': 'creating-effects-module' | 'prerequisites' | 'creating-effects-module' | 'linking-modules' | 'usage-in-effects' | 'lifecycle-management' | 'when-to-use' | 'navigation'
  'create-effects': 'creating-effects' | 'navigation'
  'create-synapse': 'code-organization-example-and-createsynapse-utility-usage' | 'connecting-synapse-to-each-other' | 'navigation'
  'custom-middlewares': 'creating-custom-middlewares' | 'navigation'
  'custom-plugins': 'creating-custom-plugins' | 'navigation'
  'middlewares': 'middlewares' | 'navigation'
  'redux-selectors': 'creating-redux-style-computed-subscriptions' | 'getting-values-from-computed-selectors' | 'navigation'
  'storage-creation': 'creating-storage'
}

// Вспомогательные типы для извлечения section ID
export type SectionIdOf<T extends DocKey> = DocSectionIds[T]
export type AllSectionIds = DocSectionIds[DocKey]

// Utility type для проверки принадлежности section ID к документу
export type ValidSectionId<TDoc extends DocKey, TSection extends string> = 
    TSection extends DocSectionIds[TDoc] ? TSection : never


export interface CodeBlock {
  language: string
  code: string
  filename?: string
  meta?: string
}

export interface ListItem {
  content: ContentBlock[] | string // ✅ Обновлено для поддержки форматирования
  level: number
  type: 'ordered' | 'unordered'
  children?: ListItem[]
  checked?: boolean // Для task lists
}

export interface TableRow {
  cells: string[]
  type: 'header' | 'data'
}

export interface Table {
  headers: string[]
  rows: TableRow[]
  caption?: string
}

export interface Link {
  text: string
  url: string
  title?: string
}

export interface Blockquote {
  content: ContentBlock[]
  type?: 'tip' | 'warning' | 'info' | 'note'
  emoji?: string
}

export interface Paragraph {
  text: string
  formatting: {
    bold: Array<{ start: number; end: number }>
    italic: Array<{ start: number; end: number }>
    code: Array<{ start: number; end: number }>
    strikethrough: Array<{ start: number; end: number }> // ✅ НОВОЕ
    links: Array<{ start: number; end: number; url: string; title?: string }>
  }
}

export interface DiagramBlock {
    code: string; 
    title?: string
}

// ✅ НОВЫЙ ТИП ДЛЯ ИЗОБРАЖЕНИЙ
export interface Image {
    url: string
    alt: string
    title?: string
    width?: number
    height?: number
}

export type ContentBlock =
  | { type: 'paragraph'; data: Paragraph }
  | { type: 'heading'; data: { text: string; level: number; id: string } }
  | { type: 'list'; data: ListItem[] }
  | { type: 'taskList'; data: any[] }
  | { type: 'diagram'; data: DiagramBlock }
  | { type: 'table'; data: Table }
  | { type: 'code'; data: CodeBlock }
  | { type: 'blockquote'; data: Blockquote }
  | { type: 'image'; data: Image } // ✅ НОВОЕ
  | { type: 'divider'; data: {} }
  | { type: 'break'; data: {} }
  | { type: 'html'; data: { content: string } }

export interface DocSection {
  id: string
  title: string
  level: number
  content: ContentBlock[]
  metadata?: {
    wordCount: number
    codeBlocksCount: number
    hasTable: boolean
    hasBlockquotes: boolean
  }
}

export interface DocContent {
  title: string
  description?: string
  sections: DocSection[]
  features?: string[]
  frontMatter?: Record<string, any>
  metadata: {
    lastModified: string
    wordCount: number
    readingTime: number
    sectionsCount: number
    codeBlocksCount: number
  }
}

export interface DocsData {
  [locale: string]: {
    [filename: string]: DocContent
  }
}

// Constants
export const AVAILABLE_LOCALES: Locale[] = ['en', 'ru']
export const AVAILABLE_DOC_KEYS: DocKey[] = ['CHANGELOG', 'README', 'additional', 'api-client', 'basic-usage', 'create-dispatcher', 'create-effects-module', 'create-effects', 'create-synapse', 'custom-middlewares', 'custom-plugins', 'middlewares', 'redux-selectors', 'storage-creation']
export const MASTER_LOCALE: Locale = 'en'
