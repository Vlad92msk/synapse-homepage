import { Fragment } from 'react'
import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const CreateEffectsModule = () => {
  const { getDoc } = useDocumentation()
  const doc = getDoc('create-effects-module')
  return (
    <div>
      {doc?.sections
        .filter(({ id }) => !['navigation', 'prerequisites'].includes(id))
        ?.map(({ content, id, level, title, metadata }) => {
          return (
            <Fragment key={id}>
              <h1>{title}</h1>
              {content.map((block, index) => (
                <Block key={`${id}-${index}`} block={block} />
              ))}
            </Fragment>
          )
        })}
    </div>
  )
}
