import { Fragment } from 'react'
import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'

export const Changelog = () => {
  const { getDoc } = useDocumentation()
  const doc = getDoc('CHANGELOG')

  return (
    <>
      {doc?.sections
        .filter(({ id }) => id !== 'navigation')
        ?.map(({ content, id, title }) => {
          return (
            <Fragment key={id}>
              <h1>{title}</h1>
              {content.map((block, index) => (
                <Block key={`${id}-${index}`} block={block} />
              ))}
            </Fragment>
          )
        })}
    </>
  )
}
