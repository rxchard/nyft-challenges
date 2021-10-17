import type { NextPage } from 'next'

import HeadController from '../HeadController'
import DefaultLayout from '../layouts/Default'

const Index: NextPage = () => (
  <>
    <HeadController title="Leaderboard" />
    <DefaultLayout>
      <div>Leaderboard</div>
    </DefaultLayout>
  </>
)

export default Index
