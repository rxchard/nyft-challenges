import { Story, Meta } from '@storybook/react'

import { Owner, OwnerProps } from '../components/interface/Leaderboard/Owner'

export default {
  title: 'Owner',
  component: Owner,
} as Meta

const Template: Story<OwnerProps> = ({ ...props }) => <Owner {...props} />

export const Main = Template.bind({})

Main.args = {
  address: '0x0000000000000000000000000000000000000000',
  valuation: 117,
  name: 'Custom Name',
  text: 'Custom Text',
}
