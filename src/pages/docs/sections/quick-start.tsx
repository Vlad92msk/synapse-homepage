import { CodeBlock } from '@shared/components/ui/code-block'
import { useDocumentation } from '@shared/hooks'
import { Block } from '@shared/utils/md-render/block'
import { Paragraph } from '@shared/utils/md-render/paragraph'

export const QuickStart = () => {
  const { getSection, t } = useDocumentation()
  const basicUsage = getSection('basic-usage', 'basic-usage')

  return (
    <>
      <Paragraph
        //@ts-ignore
        data={{ text: t('quickStart.createStorage') }}
      />
      <CodeBlock>
        {'const counter1 = await new MemoryStorage<Counter>({\n' + "  name: 'counter1',\n" + '  initialState: {\n' + '    value: 100,\n' + '  },\n' + '}).initialize()'}
      </CodeBlock>
      <Paragraph
        //@ts-ignore
        data={{ text: t('quickStart.updateValue') }}
      />
      <CodeBlock>
        {'    const updateCounter1 = async () => {\n' + '        await counter1.update((state) => {\n' + '            state.value = state.value + 1\n' + '        })\n' + '    }'}
      </CodeBlock>
      <Paragraph
        //@ts-ignore
        data={{ text: t('quickStart.subscribe') }}
      />
      <CodeBlock>{'  counter1.subscribe((state) => state.value, (value) => {\n' + '    setCounter1Value(value)\n' + '  })'}</CodeBlock>
      <hr />
      {basicUsage && (
        <>
          {basicUsage.content.map((block, index) => (
            <Block key={`${basicUsage.id}-${index}`} block={block} />
          ))}
        </>
      )}
    </>
  )
}
