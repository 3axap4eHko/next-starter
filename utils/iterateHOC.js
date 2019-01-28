function getInner(Component) {
  return Component.InnerComponent || Component.WrappedComponent;
}

export default function (Component) {
  let value = Component;
  let done = !value || !getInner(Component);
  return {
    next: () => {
      try {
        return {
          value,
          done,
        };
      } finally {
        value = getInner(value);
        done = !value || !getInner(value);
      }
    },
  };
}
