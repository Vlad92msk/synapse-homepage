import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MarkdownParser } from './markdown-parser'
import type {
    ContentBlock,
    DocSection,
    DocContent,
    DocsData
} from './types'

interface SectionIdMapping {
    [filename: string]: {
        [sectionIndex: number]: string
    }
}

class DocsGenerator {
    private parser = new MarkdownParser()
    private readonly MASTER_LOCALE = 'en' // Главный язык для маппинга
    private readonly locales = ['en', 'ru']

    /**
     * Создает мастер-маппинг секций на основе английской версии
     */
    private createMasterSectionMapping(englishDocs: { [filename: string]: DocContent }): SectionIdMapping {
        const mapping: SectionIdMapping = {}

        Object.entries(englishDocs).forEach(([filename, doc]) => {
            mapping[filename] = {}
            doc.sections.forEach((section, index) => {
                // Очищаем заголовок от эмодзи и создаем стабильный ID
                const cleanTitle = section.title
                    .replace(/[🏠📚📖🧮⚙️🛠️💡⚡🚀💾🌐⚛️🔌✨🎨📦🔧⭐🎯]/g, '')
                    .trim()

                const sectionId = this.createSlug(cleanTitle) || `section-${index}`
                mapping[filename][index] = sectionId
            })
        })

        return mapping
    }

    /**
     * Применяет мастер-маппинг ко всем языкам
     */
    private applySectionMapping(docsData: DocsData, mapping: SectionIdMapping): DocsData {
        Object.keys(docsData).forEach(locale => {
            Object.keys(docsData[locale]).forEach(filename => {
                const doc = docsData[locale][filename]
                if (mapping[filename]) {
                    doc.sections = doc.sections.map((section, index) => ({
                        ...section,
                        id: mapping[filename][index] || `section-${index}`
                    }))
                }
            })
        })

        return docsData
    }

    /**
     * Создает slug из текста
     */
    private createSlug(text: string): string {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
    }

    /**
     * Проверяет консистентность секций между языками
     */
    private validateConsistency(docsData: DocsData, mapping: SectionIdMapping): void {
        console.log('🔍 Validating section consistency...')

        Object.entries(mapping).forEach(([filename, sections]) => {
            console.log(`\n📄 ${filename}:`)

            Object.entries(sections).forEach(([index, id]) => {
                const idx = parseInt(index)
                const consistencyReport: Record<string, string | undefined> = {}

                this.locales.forEach(locale => {
                    const section = docsData[locale]?.[filename]?.sections[idx]
                    consistencyReport[locale] = section?.title
                })

                console.log(`   [${index}] ${id}`)
                Object.entries(consistencyReport).forEach(([locale, title]) => {
                    const status = title ? '✅' : '❌'
                    console.log(`     ${status} ${locale.toUpperCase()}: "${title || 'MISSING'}"`)
                })

                // Предупреждения о несоответствиях
                const titles = Object.values(consistencyReport).filter(Boolean)
                if (titles.length !== this.locales.length) {
                    console.warn(`   ⚠️  Inconsistent section count for ${filename}[${index}]`)
                }
            })
        })
    }

    /**
     * Основной метод генерации документации
     */
    async generateStructuredDocsData(): Promise<void> {
        const docsData: DocsData = {}

        console.log('🚀 Starting structured documentation generation...')
        console.log(`📋 Master locale: ${this.MASTER_LOCALE}`)
        console.log(`🌐 Processing locales: ${this.locales.join(', ')}`)

        // Первый проход - собираем все данные
        for (const locale of this.locales) {
            const docsDir = path.join(process.cwd(), 'docs', locale)

            if (!fs.existsSync(docsDir)) {
                console.warn(`⚠️  Directory ${docsDir} does not exist`)
                continue
            }

            console.log(`\n📂 Processing locale: ${locale}`)
            docsData[locale] = {}
            const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.md'))

            for (const file of files) {
                const filePath = path.join(docsDir, file)
                const fileContent = fs.readFileSync(filePath, 'utf8')
                const { data: frontMatter, content } = matter(fileContent)

                const filename = file.replace('.md', '')
                const sections = this.parser.extractSections(content)
                const features = this.parser.extractFeatures(content)
                const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
                const codeBlocksCount = sections.reduce((sum, section) =>
                    sum + (section.metadata?.codeBlocksCount || 0), 0
                )

                docsData[locale][filename] = {
                    title: frontMatter.title || sections[0]?.title || filename,
                    description: frontMatter.description,
                    sections,
                    features,
                    frontMatter,
                    metadata: {
                        lastModified: fs.statSync(filePath).mtime.toISOString(),
                        wordCount,
                        readingTime: Math.ceil(wordCount / 200),
                        sectionsCount: sections.length,
                        codeBlocksCount
                    }
                }

                console.log(`   ✅ ${filename}: ${sections.length} sections, ${codeBlocksCount} code blocks`)
            }
        }

        // Проверяем, что мастер-язык существует
        if (!docsData[this.MASTER_LOCALE]) {
            console.error(`❌ Master locale '${this.MASTER_LOCALE}' not found!`)
            console.error('   Master locale is required for consistent section IDs.')
            return
        }

        // Создаем мастер-маппинг на основе главного языка
        console.log(`\n🔧 Creating master section mapping from '${this.MASTER_LOCALE}' locale...`)
        const sectionMapping = this.createMasterSectionMapping(docsData[this.MASTER_LOCALE])

        // Применяем маппинг ко всем языкам
        console.log('🔄 Applying consistent section IDs across all locales...')
        const synchronizedData = this.applySectionMapping(docsData, sectionMapping)

        // Проверяем консистентность
        this.validateConsistency(synchronizedData, sectionMapping)

        // Создаем директории для вывода
        const dataDir = path.join(process.cwd(), 'src', 'data')
        const typesDir = path.join(process.cwd(), 'src', 'types')

        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        if (!fs.existsSync(typesDir)) {
            fs.mkdirSync(typesDir, { recursive: true })
        }

        // Сохраняем данные
        fs.writeFileSync(
            path.join(dataDir, 'structured-docs.json'),
            JSON.stringify(synchronizedData, null, 2)
        )

        // Сохраняем маппинг для отладки и повторного использования
        fs.writeFileSync(
            path.join(dataDir, 'section-mapping.json'),
            JSON.stringify(sectionMapping, null, 2)
        )

        // Генерируем типы TypeScript
        this.generateTypes(synchronizedData, typesDir)

        // Финальный отчет
        console.log('\n✅ Documentation data generated successfully!')
        console.log(`📊 Total locales: ${Object.keys(synchronizedData).length}`)

        Object.entries(synchronizedData).forEach(([locale, docs]) => {
            const totalSections = Object.values(docs).reduce((sum, doc) => sum + doc.sections.length, 0)
            const totalCodeBlocks = Object.values(docs).reduce((sum, doc) => sum + doc.metadata.codeBlocksCount, 0)
            const totalWords = Object.values(docs).reduce((sum, doc) => sum + doc.metadata.wordCount, 0)
            console.log(`   📄 ${locale}: ${Object.keys(docs).length} docs, ${totalSections} sections, ${totalCodeBlocks} code blocks, ${totalWords} words`)
        })

        console.log(`\n📁 Generated files:`)
        console.log(`   📄 ${path.join(dataDir, 'structured-docs.json')}`)
        console.log(`   📄 ${path.join(dataDir, 'section-mapping.json')}`)
        console.log(`   📄 ${path.join(typesDir, 'docs.ts')}`)
    }

    /**
     * Генерирует TypeScript типы
     */
    private generateTypes(docsData: DocsData, outputDir: string): void {
        const locales = Object.keys(docsData)
        const docKeys = Object.keys(docsData[locales[0]] || {})

        // ✅ НОВОЕ: Генерируем маппинг section ID для каждого документа
        const generateSectionIdsTypes = () => {
            const sectionMappings: Record<string, string[]> = {}

            // Используем мастер-локаль для получения section ID
            const masterLocaleData = docsData[this.MASTER_LOCALE]
            if (!masterLocaleData) return ''

            Object.entries(masterLocaleData).forEach(([docKey, docContent]) => {
                sectionMappings[docKey] = docContent.sections.map(section => section.id)
            })

            // Генерируем union типы для каждого документа
            const sectionUnions = Object.entries(sectionMappings)
                .map(([docKey, sectionIds]) => {
                    const unionType = sectionIds.map(id => `'${id}'`).join(' | ')
                    return `  '${docKey}': ${unionType || 'never'}`
                })
                .join('\n')

            return `
// ✅ ТОЧНЫЕ ТИПЫ ДЛЯ SECTION ID
export interface DocSectionIds {
${sectionUnions}
}

// Вспомогательные типы для извлечения section ID
export type SectionIdOf<T extends DocKey> = DocSectionIds[T]
export type AllSectionIds = DocSectionIds[DocKey]

// Utility type для проверки принадлежности section ID к документу
export type ValidSectionId<TDoc extends DocKey, TSection extends string> = 
    TSection extends DocSectionIds[TDoc] ? TSection : never
`
        }

        const typesContent = `// Auto-generated types for structured documentation
// Generated at: ${new Date().toISOString()}
// Master locale: ${this.MASTER_LOCALE}

export type Locale = ${locales.map(l => `'${l}'`).join(' | ')}

export type DocKey = ${docKeys.map(k => `'${k}'`).join(' | ')}

${generateSectionIdsTypes()}

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
export const AVAILABLE_LOCALES: Locale[] = [${locales.map(l => `'${l}'`).join(', ')}]
export const AVAILABLE_DOC_KEYS: DocKey[] = [${docKeys.map(k => `'${k}'`).join(', ')}]
export const MASTER_LOCALE: Locale = '${this.MASTER_LOCALE}'
`

        fs.writeFileSync(path.join(outputDir, 'docs.ts'), typesContent)
        console.log('📝 Generated TypeScript types with precise section IDs')
    }
}

// Запуск генерации
const generator = new DocsGenerator()
generator.generateStructuredDocsData().catch(console.error)
