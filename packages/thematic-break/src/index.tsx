import React from 'react'
import styled from 'styled-components'
import './styled-components'
import { defaultThematicBreakTheme, getThematicBreakStyle } from './theme'
export * from './theme'


/**
 * Props for creating thematic-break
 */
export interface ThematicBreakProps extends React.HTMLAttributes<HTMLHRElement> {

}


/**
 * Render `thematicBreak` content
 *
 * @param props
 */
export const ThematicBreak = React.forwardRef<HTMLHRElement, ThematicBreakProps>(
  (props, forwardRef): React.ReactElement => {
    return (
      <Container { ...props } ref={ forwardRef } />
    )
  }
)


ThematicBreak.propTypes = {}


ThematicBreak.displayName = 'YozoraThematicBreak'
export default ThematicBreak


const Container = styled.hr`
  overflow: hidden;
  display: block;
  box-sizing: content-box;
  height: 0;
  width: 100%;
  padding: 0;
  border: 0;
  border-bottom: 1px solid ${ getThematicBreakStyle('borderColor') };
  outline: ${ getThematicBreakStyle('outline') };
  margin: ${ getThematicBreakStyle('margin') };
`


Container.defaultProps = {
  theme: { yozora: { thematicBreak: defaultThematicBreakTheme } }
}


export const ThematicBreakClasses = {
  container: `${ Container }`,
}
