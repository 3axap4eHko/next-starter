import React, { useMemo } from 'react';
import { pathToRegexp, compile,  } from 'path-to-regexp';
import { useRouter } from 'next/router';

export const isActive = (pattern, exact) => {
  const router = useRouter();
  return useMemo(() => {
    const regexp = pathToRegexp(pattern);
    return regexp.test(router.pathname) || (!exact && router.pathname.startsWith(pattern));
  }, [pattern, router.pathname]);
};

export default function makeLink(to, params) {
  return useMemo(() => {
    const keys = [];
    pathToRegexp(to, keys);
    const build = compile(to);
    const hrefValues = keys.reduce((result, key) => {
      return { ...result, [key.name]: `[${key.name}]` };
    }, {});
    const href = decodeURIComponent(build(hrefValues));
    const as = build(params);
    return {
      href,
      as,
    };
  }, [to, JSON.stringify(params)]);
}
