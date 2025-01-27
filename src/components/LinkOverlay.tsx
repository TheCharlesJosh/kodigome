import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import Link, { LinkProps } from 'next/link'
import { cn } from '@lib/utils'
import styles from './link-overlay.module.css'

/**
 * Cheap implementation of @chakra-ui's LinkOverlay
 */

export interface LinkBoxProps extends React.HTMLProps<HTMLDivElement> {
  asChild?: boolean
  as?: string
}

export interface LinkOverlayProps extends LinkProps {
  className?: string
  children?: React.ReactNode
}

export interface LinkOverlayNativeProps {
  className?: string
  children?: React.ReactNode
}

/**
 * LinkBox: Defines total clickable area for a component
 *
 * `styles.linkBox` defines rules for raising z-index of `<a>` and `<button>` tags
 *
 * @prop asChild - Render component as child
 * @prop as - HTML tag; defaults to "div" (string)
 */

export const LinkBox = React.forwardRef<HTMLDivElement, LinkBoxProps>(
  ({ className, asChild, as = 'div', children, ...props }, ref) => {
    const Comp = asChild ? Slot : as

    return (
      <Comp
        className={cn('relative', styles.linkBox, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
LinkBox.displayName = 'LinkBox'

/**
 * LinkOverlay: Wraps LinkBox in a next/link. Takes normal next/link props.
 *
 * `styles.linkOverlay` exempts LinkOverlay from being raised to z-index: 1
 *
 */

export const LinkOverlay = React.forwardRef<
  HTMLAnchorElement,
  LinkOverlayProps
>(({ className, children, ...props }, ref) => {
  return (
    <>
      <Link {...props}>{children}</Link>
      <Link
        className={cn('absolute inset-0', styles.linkOverlay, className)}
        ref={ref}
        {...props}
      />
    </>
  )
})
LinkOverlay.displayName = 'LinkOverlay'

/**
 * LinkOverlayNative: Wraps LinkBox in an <a> tag. Takes normal anchor tag props.
 */

export const LinkOverlayNative = React.forwardRef<
  HTMLAnchorElement,
  LinkOverlayNativeProps
>(({ className, children, ...props }, ref) => {
  return (
    <>
      <a {...props}>{children}</a>
      <a
        className={cn('absolute inset-0', styles.linkOverlay, className)}
        ref={ref}
        {...props}
      />
    </>
  )
})
LinkOverlayNative.displayName = 'LinkOverlayNative'
