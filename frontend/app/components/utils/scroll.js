export const scrollParent = (element) => {
  const parents = (node, ps) => {
    if (node.parentNode === null) {
      return ps;
    }

    return parents(node.parentNode, ps.concat([node]));
  };
  const style = (node, prop) =>
    getComputedStyle(node, null).getPropertyValue(prop);
  const overflow = (node) =>
    style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x');
  const scroll = (node) => /(auto|scroll)/.test(overflow(node));

  if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
    return null;
  }

  const ps = parents(element.parentNode, []);

  for (let i = 0; i < ps.length; i += 1) {
    if (scroll(ps[i])) {
      return ps[i];
    }
  }

  return document.scrollingElement || document.documentElement;
};

/* eslint no-param-reassign: 0 */
export const scrollTo = (node, top, args = {}) => {
  if (!node) {
    return;
  }

  if (node.scrollTo) {
    node.scrollTo({ top, ...args });
  } else {
    node.scrollTop = top;
  }
};

export const scrollTop = (node, args = {}) => {
  if (node) {
    scrollTo(node, 0, args);
  }
};

export const scrollBottom = (node, args = {}) => {
  if (node) {
    scrollTo(node, node.scrollHeight, args);
  }
};
