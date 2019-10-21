import React, { useMemo } from 'react';
import PTRE from 'path-to-regexp';
import { useRouter } from 'next/router';

export const isActive = (pattern, exact) => {
  const router = useRouter();
  return useMemo(() => {
    const regexp = PTRE(pattern);
    return regexp.test(router.pathname) || (!exact && router.pathname.startsWith(pattern));
  }, [pattern, router.pathname]);
};

export default function (to, params) {
  return useMemo(() => {
    const keys = [];
    PTRE(to, keys);
    const build = PTRE.compile(to);
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
