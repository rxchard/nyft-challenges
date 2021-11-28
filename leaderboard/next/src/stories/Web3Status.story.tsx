import { Story, Meta } from '@storybook/react'

import {
  Web3StatusBase,
  Web3StatusProps,
} from '../components/interface/Web3Status/Status'

export default {
  title: 'Web3Status',
  component: Web3StatusBase,
} as Meta

const Template: Story<Web3StatusProps> = ({ ...props }) => (
  <Web3StatusBase {...props} />
)

export const Main = Template.bind({})

export const Connected = Template.bind({})

Connected.args = {
  address: '0x0000000000000000000000000000000000000000',
  info: { idx: 0, updateAllowed: false },
}

export const WithError = Template.bind({})

WithError.args = {
  error: 'Storybook Fictional Error',
}
