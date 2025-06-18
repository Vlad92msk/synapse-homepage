import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

import styles from './diagram.module.css'

export interface DiagramProps {
  code: string
  title?: string
}

export const Diagram = (props: DiagramProps) => {
  const { code, title } = props
  const elementRef = useRef<HTMLDivElement>(null)
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const renderDiagram = async () => {
      try {
        mermaid.initialize({ startOnLoad: false })
        const id = `mermaid-${Date.now()}`
        const { svg } = await mermaid.render(id, code)
        if (elementRef.current) {
          elementRef.current.innerHTML = svg
        }
      } catch (err) {
        setError('Failed to render diagram')
        console.error('Mermaid error:', err)
      }
    }

    renderDiagram()
  }, [code])

  if (error) {
    return (
      <div
        style={{
          padding: '1rem',
          border: '1px solid red',
          color: 'red',
        }}
      >
        Error rendering diagram
      </div>
    )
  }

  return (
    <div className={`${styles.container}`}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.diagramContainer}>
        <div ref={elementRef} className={styles.diagramContent} />
      </div>
    </div>
  )
}
