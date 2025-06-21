import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const Installation = () => {
  const { getSection } = useDocumentation()
  const installation = getSection('README', 'installation')

  return (
    <>
      {installation && (
        <>
          <h1>{installation.title}</h1>
          {installation.content.map((block, index) => (
            <Block key={`${installation.id}-${index}`} block={block} />
          ))}
        </>
      )}
    </>
  )
}
