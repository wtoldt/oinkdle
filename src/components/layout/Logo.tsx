import * as React from 'react';
import oinkleLogo from '@/assets/oinkdle-logo.svg';

const Logo: React.FC<React.ComponentPropsWithoutRef<'img'>> = (props) => {
  return <img src={oinkleLogo} alt="Oinkdle logo" {...props} />;
};

export { Logo };
