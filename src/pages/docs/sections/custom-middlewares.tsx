import { Fragment } from 'react'
import { useDocumentation } from '@shared/hooks/useDocumentation'
import { Block } from '@shared/utils/md-render/block'

export const CustomMiddlewares = () => {
  const { getDoc } = useDocumentation()
  const doc = getDoc('custom-middlewares')

  return (
    <div>
      {doc?.sections
        .filter(({ id }) => id !== 'navigation')
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
