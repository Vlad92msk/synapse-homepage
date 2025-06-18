import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/components/ui/button/Button.tsx'
import { useDocumentation } from '@shared/hooks/useDocumentation'

import style from './DocsContent.module.css'

interface DocsContentProps {
  sectionKey: string
  section: ReactNode
  isSidebarOpen: boolean
  isMobile: boolean
}

// Компонент контента документации
export const DocsContent = (props: DocsContentProps) => {
  const { sectionKey, section, isSidebarOpen, isMobile } = props
  const { t } = useDocumentation()
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleDocsClick = () => {
    navigate('/docs#description') // или просто '/docs'
  }

  return (
    <div className={`${style.docsContent} ${isSidebarOpen && !isMobile ? style.withSidebar : style.fullWidth}`}>
      <div className={style.container}>
        {/* Breadcrumb навигация */}
        <nav className={style.breadcrumb} aria-label="Breadcrumb navigation">
          <span className={style.breadcrumbLink} aria-label="Перейти к документации">
            {t('nav.docs')}
          </span>
          <span className={style.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={style.breadcrumbCurrent} aria-current="page">
            {t(sectionKey)}
          </span>
        </nav>

        {/* Основной контент */}
        <main className={style.content}>
          {section || (
            <div className={style.placeholder}>
              <div className={style.placeholderIcon} aria-hidden="true">
                📝
              </div>
              <h2>Раздел в разработке</h2>
              <p>Этот раздел документации еще не готов. Мы работаем над его созданием.</p>
              <div className={style.placeholderActions}>
                <button onClick={() => navigate('/docs#description')} className={style.placeholderButton}>
                  Вернуться к началу
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
