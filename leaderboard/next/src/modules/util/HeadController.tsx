import React from 'react'
import Head from 'next/head'

interface ControllerProps {
  title?: string
  description?: string
}

const Controller: React.FC<ControllerProps> = ({
  title,
  description = 'A legendary leaderboard for legendary palm holders 🏝️',
}) => (
  <Head>
    {title ? <title>Nifty | {title}</title> : <title>Nifty</title>}
    <meta name="description" content={description} />
    <meta name="og:title" content={title || 'Nifty'} />
    <meta name="og:type" content="website" />
    <meta name="og:description" content={description} />
    <meta name="og:site_name" content="Nifty" />
    <meta name="og:image" content="/embed.png" />
  </Head>
)

export default Controller
