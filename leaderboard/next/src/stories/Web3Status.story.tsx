import { Story, Meta } from '@storybook/react'

import { Web3Status } from '../components/interface/Web3Status'

export default {
  title: 'Web3Status',
  component: Web3Status,
} as Meta

const Template: Story = ({ ...props }) => <Web3Status {...props} />

export const Main = Template.bind({})
