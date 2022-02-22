import React from 'react';
import Box from '@material-ui/core/Box';
import LogoIcon from '$app/icons/new/Logo';

function LoaderWithLogo() {
  return (
    <Box>
      <style>{`
    .logo-spinner {
    width: 64px;
    height: 64px;
    // background-color: #FFE36F;
    border-radius: 16px;

    margin: 32px auto;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }

    @-webkit-keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }

    @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
  }
  `}</style>
      <div className={'logo-spinner'} style={{padding: '8px'}}>

        <LogoIcon />
        <div
          style={{
            borderRadius: '50%',
            height: '100%',
            width: '100%',
            background: '#fff',
            padding: '8px',
          }}
        >
          {/*<div*/}
          {/*  style={{*/}
          {/*    borderRadius: '50%',*/}
          {/*    height: '100%',*/}
          {/*    width: '100%',*/}
          {/*    background: '#02A3BB',*/}
          {/*  }}*/}
          {/*></div>*/}
        </div>
      </div>
    </Box>
  );
}

export default React.memo(LoaderWithLogo);
