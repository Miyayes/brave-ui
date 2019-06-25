/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

// Helpers
import { getLocale } from '../../../helpers'

// Styled Components
import {
  StyledContent,
  StyledDialog,
  StyledHeader,
  StyledIcon,
  StyledStatus,
  StyledWrapper
} from './style'
import {
  UpholdColorIcon
} from '../../../components/icons'

export interface Props {
  children: React.ReactNode
  onClose: () => void
  username: string
  id?: string
}

export default class WalletPopup extends React.PureComponent<Props, {}> {
  insideClick = (e: React.SyntheticEvent) => {
    // Don't propogate click to container, which will close it
    e.stopPropagation()
  }

  render () {
    const {
      children,
      onClose,
      username,
      id
    } = this.props
    return (
      <StyledWrapper onClick={onClose} id={id}>
        <StyledDialog onClick={this.insideClick}>
          <StyledContent>
            <StyledHeader>
              <StyledIcon>
                <UpholdColorIcon />
              </StyledIcon>
              {'@' + username}
              <StyledStatus>
                {getLocale('walletVerified')}
              </StyledStatus>
            </StyledHeader>
            {children}
          </StyledContent>
        </StyledDialog>
      </StyledWrapper>
    )
  }
}
