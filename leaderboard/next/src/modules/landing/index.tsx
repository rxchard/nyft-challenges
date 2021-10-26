import type { NextPage } from 'next'

import { HeadController } from '../control/HeadController'
import { DefaultLayout } from '../layouts/Default'
import { PalmHolder } from '../../components/interface/PalmHolder'

export const LandingPage: NextPage = () => (
  <>
    <HeadController title="Leaderboard" />
    <DefaultLayout>
      <div className="h-full bg-ndark text-white flex flex-col items-center pt-8">
        <div className="w-1/4 relative">
          <h1 className="text-center text-4xl mt-4 uppercase">
            Legendary Leaderboard
          </h1>
        </div>
        <div className="w-1/2 mt-24">
          <PalmHolder />
        </div>
      </div>
    </DefaultLayout>
  </>
)
