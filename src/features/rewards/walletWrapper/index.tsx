/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import {
  StyledWrapper,
  StyledHeader,
  StyledTitle,
  StyledBalance,
  StyledBalanceTokens,
  StyledContent,
  StyledAction,
  StyledActionIcon,
  StyledCopy,
  StyledCopyImage,
  StyledIconAction,
  StyledBalanceConverted,
  StyledGrantWrapper,
  StyledGrant,
  StyledActionWrapper,
  StyledBalanceCurrency,
  StyledCurve,
  StyledAlertWrapper,
  StyledAlertClose,
  StyleGrantButton,
  StyledActionText,
  StyledBAT,
  StyledNotificationIcon,
  StyledNotificationCloseIcon,
  StyledTypeText,
  StyledMessageText,
  StyledDateText,
  StyledNotificationContent,
  StyledButtonWrapper,
  StyledButton,
  StyledNotificationMessage,
  StyledPipe
} from './style'
import { getLocale } from '../../../helpers'
import { GrantCaptcha, GrantComplete, GrantError, GrantWrapper } from '../'
import Alert, { Type as AlertType } from '../alert'
import { Button } from '../../../components'
import {
  CaratDownIcon,
  CaratUpIcon,
  CloseCircleOIcon,
  SettingsAdvancedIcon,
  UpholdColorIcon,
  UpholdSystemIcon
} from '../../../components/icons'

import giftIconUrl from './assets/gift.svg'
import loveIconUrl from './assets/love.svg'
import megaphoneIconUrl from './assets/megaphone.svg'

type Grant = {
  tokens: string,
  expireDate: string,
  type: string
}

type GrantClaim = {
  promotionId?: string
  altcurrency?: string
  probi: string
  expiryTime: number
  captcha?: string
  hint?: string
  status?: 'wrongPosition' | 'grantGone' | 'generalError' | 'grantAlreadyClaimed' | number | null
  finishTokenTitle?: string
  finishTitle?: string
  finishText?: string
}

export interface AlertWallet {
  node: React.ReactNode
  type: AlertType
  onAlertClose?: () => void
}

export interface ActionWallet {
  icon: React.ReactNode
  name: string
  action: () => void
  testId?: string
}

export type NotificationType =
  'ads' |
  'ads-launch' |
  'backupWallet' |
  'contribute' |
  'grant' |
  'insufficientFunds' |
  'tipsProcessed' |
  'error' |
  'pendingContribution' |
  ''

export interface Notification {
  id: string
  date?: string
  type: NotificationType
  text: React.ReactNode
  onCloseNotification: (id: string) => void
}

export interface Props {
  balance: string
  converted: string | null
  actions: ActionWallet[]
  connectedWallet?: boolean
  compact?: boolean
  contentPadding?: boolean
  showCopy?: boolean
  children?: React.ReactNode
  showSecActions?: boolean
  onSettingsClick?: () => void
  onActivityClick?: () => void
  grants?: Grant[]
  grant?: GrantClaim
  alert?: AlertWallet | null
  id?: string
  gradientTop?: string
  isMobile?: boolean
  notification?: Notification
  onNotificationClick?: () => void
  onGrantHide?: () => void
  onFinish?: () => void
  onSolution?: (x: number, y: number) => void
  convertProbiToFixed?: (probi: string, place: number) => string
}

export type Step = '' | 'captcha' | 'complete'

interface State {
  grantDetails: boolean
}

export default class WalletWrapper extends React.PureComponent<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      grantDetails: false
    }
  }

  generateActions (actions: { icon: React.ReactNode, name: string, testId?: string, action: () => void }[], id?: string) {
    return actions && actions.map((action, i: number) => {
      return (
        <StyledAction key={`${id}-${i}`} onClick={action.action} data-test-id={action.testId}>
          <StyledActionIcon>{action.icon}</StyledActionIcon>
          <StyledActionText>{action.name}</StyledActionText>
        </StyledAction>
      )
    })
  }

  onNotificationClick = () => {
    if (this.props.onNotificationClick) {
      this.props.onNotificationClick()
    }
  }

  onGrantHide = () => {
    if (this.props.onGrantHide) {
      this.props.onGrantHide()
    }
  }

  onFinish = () => {
    if (this.props.onFinish) {
      this.props.onFinish()
    }
  }

  onSolution = (x: number, y: number) => {
    if (this.props.onSolution) {
      this.props.onSolution(x, y)
    }
  }

  grantCaptcha = () => {
    const { grant } = this.props
    const status = grant && grant.status

    if (!grant || !grant.promotionId) {
      return
    }

    if (status === 'grantGone') {
      return (
        <GrantWrapper
          onClose={this.onFinish}
          title={getLocale('grantGoneTitle')}
          text={''}
        >
          <GrantError
            buttonText={getLocale('grantGoneButton')}
            text={getLocale('grantGoneText')}
            onButtonClick={this.onFinish}
          />
        </GrantWrapper>
      )
    }

    if (status === 'grantAlreadyClaimed') {
      return (
        <GrantWrapper
          onClose={this.onFinish}
          title={getLocale('grantGoneTitle')}
          text={''}
        >
          <GrantError
            buttonText={getLocale('grantGoneButton')}
            text={getLocale('grantAlreadyClaimedText')}
            onButtonClick={this.onFinish}
          />
        </GrantWrapper>
      )
    }

    if (status === 'generalError') {
      return (
        <GrantWrapper
          onClose={this.onGrantHide}
          title={getLocale('grantGeneralErrorTitle')}
          text={''}
        >
          <GrantError
            buttonText={getLocale('grantGeneralErrorButton')}
            text={getLocale('grantGeneralErrorText')}
            onButtonClick={this.onGrantHide}
          />
        </GrantWrapper>
      )
    }

    if (!grant.captcha || !grant.hint) {
      return
    }

    return (
      <GrantWrapper
        isPanel={true}
        onClose={this.onGrantHide}
        title={status === 'wrongPosition' ? getLocale('captchaMissedTarget') : getLocale('captchaProveHuman')}
        text={getLocale('proveHuman')}
        hint={grant.hint}
      >
        <GrantCaptcha
          isPanel={true}
          onSolution={this.onSolution}
          dropBgImage={grant.captcha}
          hint={grant.hint}
          isWindows={window.navigator.platform === 'Win32'}
        />
      </GrantWrapper>
    )
  }

  getNotificationButton = (type: NotificationType, onClose: any) => {
    let buttonText = 'OK'
    let buttonAction = onClose

    switch (type) {
      case 'grant':
        buttonText = getLocale('claim')
        buttonAction = this.onNotificationClick
        break
      case 'ads-launch':
        buttonText = getLocale('turnOnAds')
        buttonAction = this.onNotificationClick
        break
      case 'backupWallet':
        buttonText = getLocale('backupNow')
        buttonAction = this.onNotificationClick
        break
      case 'insufficientFunds':
        buttonText = getLocale('addFunds')
        buttonAction = this.onNotificationClick
        break
      default:
        buttonText = getLocale('ok').toUpperCase()
        break
    }

    return (
      <StyledButton
        size={'small'}
        type={'accent'}
        level={'primary'}
        onClick={buttonAction}
        text={buttonText}
      />
    )
  }

  generateNotification = (notification: Notification | undefined) => {
    if (!notification) {
      return null
    }

    const onClose = notification.onCloseNotification.bind(this, notification.id)

    return (
      <>
        <StyledNotificationCloseIcon data-test-id={'notification-close'} onClick={onClose}>
          <CloseCircleOIcon />
        </StyledNotificationCloseIcon>
        <StyledNotificationContent>
          {this.getNotificationIcon(notification)}
          {this.getNotificationMessage(notification)}

          <StyledButtonWrapper>
            {this.getNotificationButton(notification.type, onClose)}
          </StyledButtonWrapper>
        </StyledNotificationContent>
      </>
    )
  }

  toggleGrantDetails = () => {
    this.setState({ grantDetails: !this.state.grantDetails })
  }

  hasGrants = (grants?: Grant[]) => {
    return grants && grants.length > 0
  }

  getNotificationIcon = (notification: Notification) => {
    let icon

    switch (notification.type) {
      case 'ads':
      case 'ads-launch':
      case 'backupWallet':
        icon = megaphoneIconUrl
        break
      case 'contribute':
      case 'tipsProcessed':
      case 'pendingContribution':
        icon = loveIconUrl
        break
      case 'grant':
        icon = giftIconUrl
        break
      case 'insufficientFunds':
        icon = megaphoneIconUrl
        break
      default:
        icon = ''
        break
    }

    if (!icon) {
      return null
    }

    return (
      <StyledNotificationIcon src={icon} />
    )
  }

  getNotificationMessage = (notification: Notification) => {
    let typeText

    switch (notification.type) {
      case 'ads':
        typeText = getLocale('braveAdsTitle')
        break
      case 'ads-launch':
        typeText = getLocale('braveAdsLaunchTitle')
        break
      case 'backupWallet':
        typeText = getLocale('backupWalletTitle')
        break
      case 'contribute':
        typeText = getLocale('braveContributeTitle')
        break
      case 'grant':
        typeText = getLocale('tokenGrant')
        break
      case 'insufficientFunds':
        typeText = getLocale('insufficientFunds')
        break
      case 'tipsProcessed':
        typeText = getLocale('contributionTips')
        break
      case 'pendingContribution':
        typeText = getLocale('pendingContributionTitle')
        break
      default:
        typeText = ''
        break
    }

    return (
      <StyledNotificationMessage>
        <StyledTypeText>{typeText}</StyledTypeText> <StyledPipe>|</StyledPipe>
        <StyledMessageText>{notification.text}</StyledMessageText>
        {
          notification.date
          ? <StyledDateText>{notification.date}</StyledDateText>
          : null
        }
      </StyledNotificationMessage>
    )
  }

  render () {
    const {
      id,
      children,
      balance,
      converted,
      actions,
      showCopy,
      connectedWallet,
      compact,
      contentPadding,
      showSecActions,
      grants,
      grant,
      onSettingsClick,
      alert,
      gradientTop,
      notification,
      isMobile,
      convertProbiToFixed
    } = this.props

    const hasGrants = this.hasGrants(grants)

    let tokens = '0.0'
    if (grant && grant.probi && convertProbiToFixed) {
      tokens = convertProbiToFixed(grant.probi, 1)
    }

    let date = ''
    if (grant && grant.expiryTime !== 0) {
      date = new Date(grant.expiryTime).toLocaleDateString()
    }

    return (
      <>
        <StyledWrapper
          id={id}
          compact={compact}
          isMobile={isMobile}
          notification={notification}
        >
          {
            grant && !grant.probi
              ? this.grantCaptcha()
              : null
          }
          {
            grant && grant.probi
              ? <GrantWrapper
                isPanel={true}
                onClose={this.onFinish}
                title={grant.finishTitle || ''}
                text={grant.finishText}
              >
                <GrantComplete isMobile={true} onClose={this.onFinish} amount={tokens} date={date} tokenTitle={grant.finishTokenTitle} />
              </GrantWrapper>
              : null
          }
          <StyledHeader>
            {
              !notification
                ? <>
                  {
                    alert && alert.node
                      ? <StyledAlertWrapper>
                        {
                          alert.onAlertClose
                            ? <StyledAlertClose onClick={alert.onAlertClose}>
                              <CloseCircleOIcon />
                            </StyledAlertClose>
                            : null
                        }
                        <Alert type={alert.type} bg={true}>
                          {alert.node}
                        </Alert>
                      </StyledAlertWrapper>
                      : null
                  }
                  <StyledTitle>{getLocale('yourWallet')}</StyledTitle>
                  {
                    showSecActions
                      ? <StyledIconAction onClick={onSettingsClick} data-test-id='settingsButton'>
                        <SettingsAdvancedIcon />
                      </StyledIconAction>
                      : null
                  }
                  <StyledBalance>
                    <StyledBalanceTokens data-test-id='balance'>
                      {balance} <StyledBalanceCurrency>BAT</StyledBalanceCurrency>
                    </StyledBalanceTokens>
                    {
                      converted
                        ? <StyledBalanceConverted>{converted}</StyledBalanceConverted>
                        : null
                    }
                    {
                      hasGrants
                        ? <StyleGrantButton>
                          <Button
                            text={getLocale('grants')}
                            size={'small'}
                            type={'subtle'}
                            level={'secondary'}
                            onClick={this.toggleGrantDetails}
                            icon={{ position: 'after', image: this.state.grantDetails ? <CaratUpIcon /> : <CaratDownIcon /> }}
                          />
                        </StyleGrantButton>
                        : null
                    }
                  </StyledBalance>
                  {
                    this.state.grantDetails && hasGrants
                      ? <StyledGrantWrapper>
                        {
                          grants && grants.map((grant: Grant, i: number) => {
                            return <StyledGrant key={`${id}-grant-${i}`}>
                              <b>{grant.tokens} BAT</b>
                              {
                                grant.type === 'ads'
                                ? <span>{getLocale('adsEarnings')}</span>
                                : <span>{getLocale('expiresOn')} {grant.expireDate}</span>
                              }
                            </StyledGrant>
                          })
                        }
                      </StyledGrantWrapper>
                      : null
                  }
                  <StyledActionWrapper>
                    {this.generateActions(actions, id)}
                  </StyledActionWrapper>
                </>
                : this.generateNotification(notification)
            }
            <StyledCurve background={gradientTop} />
          </StyledHeader>
          <StyledContent
            contentPadding={contentPadding}
          >
            {children}
          </StyledContent>
          {
            showCopy
              ? <StyledCopy connected={connectedWallet}>
                {
                  connectedWallet
                    ? <>
                      <StyledCopyImage>
                        <UpholdColorIcon />
                      </StyledCopyImage>
                      {getLocale('rewardsPanelText1')} <b>Uphold</b>.
                  </>
                    : <>
                      <StyledCopyImage>
                        <UpholdSystemIcon />
                      </StyledCopyImage>
                      {getLocale('rewardsPanelText2')} <b>Uphold</b>.
                  </>
                }
              </StyledCopy>
              : null
          }
        </StyledWrapper>
        {
          showCopy
            ? <StyledBAT>
              {getLocale('rewardsPanelText3')} <a href={'https://basicattentiontoken.org/'} target={'_blank'}>{getLocale('rewardsPanelText4')}</a>
            </StyledBAT>
            : null
        }
      </>
    )
  }
}
