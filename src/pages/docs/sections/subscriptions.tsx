import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const Subscriptions = () => {
  const { getSection } = useDocumentation()

  const createStorages = getSection('basic-usage', 'creating-subscriptions')

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
