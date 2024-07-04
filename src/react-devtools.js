//prevent react devTools from being loaded in production
if (import.meta.env.PROD) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {};
}
