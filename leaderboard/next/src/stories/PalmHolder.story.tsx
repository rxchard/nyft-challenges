import { Story, Meta } from '@storybook/react'

import { PalmHolder, PalmHolderProps } from '../components/interface/PalmHolder'

export default {
  title: 'PalmHolder',
  component: PalmHolder,
} as Meta

const Template: Story<PalmHolderProps> = ({ ...props }) => (
  <PalmHolder {...props} />
)

export const Main = Template.bind({})
