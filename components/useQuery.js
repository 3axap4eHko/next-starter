import { useState } from 'react';
import * as hooks from '@apollo/react-hooks'
import NProgress from 'nprogress';

export default function useQuery(query, options) {
  const [loading, setState] = useState(false);
  const result = hooks.useQuery(query, options);
  if (process.browser) {
    if (!loading && result.loading) {
      setState(result.loading);
      NProgress.start();
    } else if (loading && !result.loading) {
      setState(result.loading);
      NProgress.done();
    }
  }

  return result;
}
