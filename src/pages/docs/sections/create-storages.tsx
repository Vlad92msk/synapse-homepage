import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const CreateStorages = () => {
  const { getSection } = useDocumentation()

  const createStorages = getSection('storage-creation', 'creating-storage')
  const universalCreationMethod = getSection('additional', 'universal-creation-method')
  const readyToUseTemplates = getSection('additional', 'ready-to-use-templates')

  return (
    <>
      {createStorages && (
        <>
          <h1>{createStorages.title}</h1>
          {createStorages.content.map((block, index) => (
            <Block key={`${createStorages.id}-${index}`} block={block} />
          ))}
        </>
      )}
      {readyToUseTemplates && (
        <>
          <h1>{readyToUseTemplates.title}</h1>
          {readyToUseTemplates.content.map((block, index) => (
            <Block key={`${readyToUseTemplates.id}-${index}`} block={block} />
          ))}
        </>
      )}
      {universalCreationMethod && (
        <>
          <h1>{universalCreationMethod.title}</h1>
          {universalCreationMethod.content.map((block, index) => (
            <Block key={`${universalCreationMethod.id}-${index}`} block={block} />
          ))}
        </>
      )}
    </>
  )
}
