import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const Description = () => {
  const { getSection } = useDocumentation()

  const requirements = getSection('README', 'requirements')
  const examples = getSection('README', 'examples')
  const modularArchitecture = getSection('README', 'modular-usage')

  return (
    <>
      {requirements && (
        <>
          <h1>{requirements.title}</h1>
          {requirements.content.map((block, index) => (
            <Block key={`${requirements.id}-${index}`} block={block} />
          ))}
        </>
      )}
      {examples && (
        <>
          <h1>{examples.title}</h1>
          {examples.content.map((block, index) => (
            <Block key={`${examples.id}-${index}`} block={block} />
          ))}
        </>
      )}
      {modularArchitecture && (
        <>
          <h1>{modularArchitecture.title}</h1>
          {modularArchitecture.content.map((block, index) => (
            <Block key={`${modularArchitecture.id}-${index}`} block={block} />
          ))}
        </>
      )}
    </>
  )
}
