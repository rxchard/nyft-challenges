import React from 'react'
import NextLink from 'next/link'

interface LinkProps {
  external?: boolean
  url: string
}

export const Link: React.FC<LinkProps> = ({
  children,
  external = false,
  url,
  ...rest
}) =>
  external ? (
    <a href={url} rel="noreferrer noopener" target="_blank" {...rest}>
      {children}
    </a>
  ) : (
    <NextLink href={url}>{children}</NextLink>
  )
