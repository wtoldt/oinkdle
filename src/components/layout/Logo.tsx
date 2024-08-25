import * as React from 'react';
import oinkleLogo from '@/assets/oinkdle-logo.svg';

const Logo = (props: React.ComponentPropsWithoutRef<'img'>) => {
  return <img src={oinkleLogo} alt="Oinkdle logo" {...props} />;
};

Logo.displayName = 'Logo';
export { Logo };
