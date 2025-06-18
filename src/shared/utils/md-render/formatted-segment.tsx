interface FormattedSegmentProps {
  segment: any
}

// Компонент для рендеринга форматированного сегмента
export const FormattedSegment = (props: FormattedSegmentProps) => {
  const { segment } = props

  let element = <span>{segment.text}</span>

  // Применяем форматирование слоями
  if (segment.bold) {
    element = <strong>{element}</strong>
  }

  if (segment.italic) {
    element = <em>{element}</em>
  }

  if (segment.code) {
    element = (
      <code
        style={{
          backgroundColor: '#f1f1f1',
          padding: '0.2rem 0.4rem',
          borderRadius: '3px',
          fontFamily: 'monospace',
          fontSize: '0.9em',
        }}
      >
        {segment.text}
      </code>
    )
  }

  if (segment.link) {
    element = (
      <a
        href={segment.link.url}
        title={segment.link.title}
        style={{ color: '#0080ff', textDecoration: 'none' }}
        target={segment.link.url.startsWith('http') ? '_blank' : undefined}
        rel={segment.link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {element}
      </a>
    )
  }

  if (segment.strikethrough) {
    element = <del>{element}</del>
  }

  return element
}
