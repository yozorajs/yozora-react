import React from 'react'
import styled from 'styled-components'


/**
 * Props for creating thematic-break
 */
export interface ThematicBreakProps extends React.HTMLAttributes<HTMLHRElement> {

}


const Container = styled.hr`
  overflow: hidden;
  display: block;
  box-sizing: content-box;
  height: 0;
  width: 100%;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--md-thematic-break-bg-color, #e1e4e8);
  outline: 0;
  margin: var(--md-thematic-margin, 1.5em 0);
`


/**
 * Render thematic-break content
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


ThematicBreak.propTypes = {

}


ThematicBreak.displayName = 'ThematicBreak'


export default ThematicBreak
