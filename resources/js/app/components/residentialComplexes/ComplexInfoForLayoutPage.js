import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { ClickAwayListener, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Trans } from '@lingui/macro';

import DeveloperInfoPanel from './DeveloperInfoPanel';
import NearestSubwayStation from '../common/NearestSubwayStation';
import Text, { TextColors, TextWeight } from '../common/Text';
import StyledButton from '../common/StyledButton';
import CloseableModal from '../common/CloseableModal';
import VerifiedLabel from '$app/components/flat-list/VerifiedLabel';
import { getNearestSubwayStation } from '$app/utlis/realEstateDevelopers';
import Routes from '$app/utlis/routes';
import useGetFullRoute from '$app/hooks/useGetFullRoute';
import { formatToCorrectPrice } from '$app/utlis/price';
import useIsMobile from '$app/hooks/useIsMobile';

const useStyles = (backgroundLink) =>
  makeStyles((theme) => ({
    image: {
      minHeight: '304px',
      borderRadius: '16px',
      maxWidth: '100%',
      background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backgroundLink})`,
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 608px',
      [theme.breakpoints.down('sm')]: {
        borderRadius: '0',
        overflow: 'hidden',
      },
    },
    container: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '64px 48px 48px 48px',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: '32px 8px 24px 8px',
      },
    },
    description: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#fff',
      fontFamily: 'Roboto',
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    price: {
      fontSize: '22px',
      marginBottom: 8,
    },
    complexName: {
      padding: '16px 0',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '36px',
      lineHeight: '32px',
      letterSpacing: '-0.214286px',
    },
    promo: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      top: 0,
      left: 48,
      [theme.breakpoints.down('sm')]: {
        left: 16,
      },
    },
    contactButtonWrapper: {
      position: 'relative',
    },
    developer_button: {
      padding: 10,
    },
  }))();

function ComplexInfoForLayoutPage({
  complexData,
  subwayStations,
  isVerified,
  setShowForm,
  setShowCallbackForm,
  setShowPhoneNumberForm,
}) {
  const styles = useStyles(complexData.images[0]);
  const [showContactVariants, setShowContactVariants] = useState(false);
  const history = useHistory();
  const isMobile = useIsMobile();

  const currentRcUrl = useGetFullRoute(Routes.residentialComplex(complexData.id));

  const nearestSubway =
    complexData &&
    complexData.subwaysDistance &&
    getNearestSubwayStation(complexData.subwaysDistance, subwayStations);

  const onAboutRCClick = useCallback(() => {
    history.push(currentRcUrl);
  }, [history, currentRcUrl]);

  return (
    <div className={styles.image}>
      <div className={styles.container}>
        <div className={styles.promo}>{isVerified && <VerifiedLabel isRC showText />}</div>
        <div className={styles.description}>
          <div>
            <Text color={TextColors.contrast} size={14}>
              <Trans>
                Nearest due date - in {complexData.completionQuarter} q.{' '}
                {complexData.completionYear}
              </Trans>
              , {complexData.status}
            </Text>
            <div className={styles.complexName}>{complexData.name}</div>
            <Text size={22} mb={'4px'} color={TextColors.contrast}>
              <Trans>
                from {formatToCorrectPrice(complexData.minimalPriceUah)} UAH/m{'\u00B2'}
              </Trans>
            </Text>
            <Text color={TextColors.contrast} size={16} weight={TextWeight.light}>
              {complexData.address}
            </Text>
            <Text color={TextColors.contrast} size={16} weight={TextWeight.light}>
              {nearestSubway && <NearestSubwayStation nearestSubway={nearestSubway} advType={'complex'} />}
            </Text>
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="outlined"
                style={{
                  borderRadius: '20px',
                  color: '#fff',
                  borderColor: '#fff',
                  textTransform: 'none',
                }}
                onClick={onAboutRCClick}
              >
                <Trans>More details about RC</Trans>
              </Button>
            </div>
          </div>
          <DeveloperInfoPanel
            complexData={complexData}
            button={
              <ClickAwayListener
                onClickAway={() => {
                  setShowContactVariants(false);
                }}
              >
                <Box className={styles.contactButtonWrapper}>
                  <StyledButton
                    fullWidth
                    className={styles.developer_button}
                    onClick={() => {
                      setShowContactVariants((value) => !value);
                    }}
                  >
                    <Text size={16}>
                      <Trans>Contact a consultant</Trans>{' '}
                      {showContactVariants ? '\u25b4' : '\u25be'}
                    </Text>
                  </StyledButton>
                  {!isMobile && (
                    <Paper
                      style={{
                        display: showContactVariants ? 'block' : 'none', // TODO: remove code duplication
                        position: 'absolute',
                        top: '48px',
                        width: '285px',
                        borderRadius: '20px',
                        zIndex: 1,
                      }}
                      elevation={2}
                    >
                      <Box
                        height={'48px'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => {
                          setShowForm(true);
                          setShowContactVariants(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Trans>Send a request</Trans>
                      </Box>
                      <Box
                        height={'48px'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => {
                          ReactGA.event({
                            category: 'request',
                            action: 'web_complex_layout_request_call',
                          });
                          setShowPhoneNumberForm(true);
                          setShowContactVariants(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Trans>Call</Trans>
                      </Box>
                      <Box
                        height={'48px'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => {
                          setShowCallbackForm(true);
                          setShowContactVariants(false);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Trans>Callback</Trans>
                      </Box>
                    </Paper>
                  )}
                </Box>
              </ClickAwayListener>
            }
          />
          {isMobile && (
            <CloseableModal
              isOpen={showContactVariants}
              onClose={() => {
                setShowContactVariants(false);
              }}
            >
              <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Paper
                  style={{
                    width: 'calc(100% - 32px)',
                    borderRadius: '20px',
                  }}
                  elevation={2}
                >
                  <Box
                    height={'48px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={() => {
                      setShowForm(true);
                      setShowContactVariants(false);
                    }}
                  >
                    <Text size={16}>
                      <Trans>Send a request</Trans>
                    </Text>
                  </Box>
                  <Box
                    height={'48px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={() => {
                      ReactGA.event({
                        category: 'request',
                        action: 'web_complex_layout_request_call',
                      });
                      if (isMobile) {
                        window.open(`tel:${complexData.callbackPhone}`, '_blank');
                      } else {
                        setShowPhoneNumberForm(true);
                        setShowContactVariants(false);
                      }
                    }}
                  >
                    <Text size={16}>
                      <Trans>Call</Trans>
                    </Text>
                  </Box>
                  <Box
                    height={'48px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={() => {
                      setShowCallbackForm(true);
                      setShowContactVariants(false);
                    }}
                  >
                    <Text size={16}>
                      <Trans>Callback</Trans>
                    </Text>
                  </Box>
                </Paper>
              </Box>
            </CloseableModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComplexInfoForLayoutPage;
