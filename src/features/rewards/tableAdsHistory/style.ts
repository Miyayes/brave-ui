/* This Source Code Form is subject to the terms of the Mozilla Public
* License. v. 2.0. If a copy of the MPL was not distributed with this file.
* You can obtain one at http://mozilla.org/MPL/2.0/. */

import styled from 'styled-components'

export const StyledTHOther = styled<{}, 'th'>('th')`
  text-transform: uppercase;
  text-align: left;
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 12px;
  font-weight: 500;
  border-bottom: 2px solid #dedfe4;
  border-top: 2px solid #dedfe4;
  color: #4B4C5C;
  padding: 12px 0;
  width: 70%;
`

export const StyledOuterTD = styled<{}, 'td'>('td')`
  width: 100%;
`

export const StyledTR = styled<{}, 'tr'>('tr')`
  text-align: left;
`

export const StyledTHLast = styled(StyledTHOther)`
  text-transform: uppercase;
  text-align: left;
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 12px;
  font-weight: 500;
  border-bottom: 2px solid #dedfe4;
  border-top: 2px solid #dedfe4;
  color: #4B4C5C;
  padding: 12px 0;
  width: 15%;
`

export const StyledTHFirst = styled<{}, 'th'>('th')`
  text-transform: uppercase;
  text-align: left;
  font-family: ${p => p.theme.fontFamily.body};
  font-size: 12px;
  font-weight: 500;
  border-bottom: 2px solid #dedfe4;
  border-top: 2px solid #dedfe4;
  color: #4B4C5C;
  padding: 12px 0;
  width: 15%;
`

export const StyledToggleWrap = styled<{}, 'div'>('div')`
  text-align: right;
`

export const StyledToggle = styled<{}, 'div'>('div')`
  font-family: Poppins, sans-serif;
  font-size: 13px;
  color: #4c54d2;
  text-transform: capitalize;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const StyledAdLink = styled<{}, 'a'>('a')`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  color: #686978
`

export const StyledAdTable = styled<{}, 'table'>('table')`
  min-width: 100%;
  margin: 24px 0;
  padding-top: 15px;
`
export const StyledAdContentDiv = styled<{}, 'div'>('div')`
  min-width: 550px;
  border: 1px solid;
  border-collapse: separate;
  border-radius: 5px;
  border-color: #DADCE8;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  height: 85px;
`

export const StyledLogo = styled<{}, 'img'>('img') `
  width: 64px;
  height: 64px;
`

// TODO(jsadler): 'display: none' becomes 'display: inline-block' once icons are in place
export const StyledLogoDiv = styled<{}, 'div'>('div')`
  display: inline-block;
  width: 64px;
  height: 64px;
  padding: 1px;
  padding-right: 10px;
`

export const StyledNoLogoDiv = styled<{}, 'div'>('div')`
  display: none;
`

export const StyledAdInfoDiv = styled<{}, 'div'>('div')`
  padding-left: 20px;
  display: inline-block;
`
export const StyledAdInfo = styled<{}, 'div'>('div')`
  display: block;
  color: #AEB1C2;
  padding-bottom: 2px;
`

export const StyledAdBrand = styled<{}, 'div'>('div')`
  font-family: Poppins, sans-serif;
  font-weight: 600;
  padding-bottom: 2px;
`

export const StyledAdStatDiv = styled<{}, 'div'>('div')`
  margin-left: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 5px;
`

export const StyledAdStat = styled<{}, 'div'>('div')`
  padding-left: 2px;
`

export const StyledAdStatActions = styled<{}, 'div'>('div')`
  margin-top: auto;
`

export const StyledCategoryContentDiv = styled<{}, 'div'>('div')`
  display: flex;
  flex-direction: column;
  height: 85px;
  min-width: 125px;
`

export const StyledCategoryName = styled<{}, 'div'>('div')`
  font-size: 16px;
  font-weight: 600;
  margin: auto;
`

export const StyledCategoryActions = styled<{}, 'div'>('div')`
  margin: auto;
`

export const StyledNoAdHistoryDiv = styled<{}, 'div'>('div')`
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  padding-top: 24px;
`

export const StyledTD = styled<{}, 'td'>('td')`
  width: '15%';
  border: 'none';
`
