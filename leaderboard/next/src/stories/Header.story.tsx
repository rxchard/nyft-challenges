import { Story, Meta } from '@storybook/react'

import { Header } from '../components/interface/Header'

export default {
  title: 'Header',
  component: Header,
} as Meta

const Template: Story = ({ ...props }) => <Header {...props} />

export const Main = Template.bind({})
