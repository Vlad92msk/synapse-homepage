import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const CreateStorages = () => {
  const { getSection } = useDocumentation()

  const createStorages = getSection('storage-creation', 'creating-storage')

  return (
    <div>
      {createStorages && (
        <>
          <h1>{createStorages.title}</h1>
          {createStorages.content.map((block, index) => (
            <Block key={`${createStorages.id}-${index}`} block={block} />
          ))}
        </>
      )}
    </div>
  )
}
