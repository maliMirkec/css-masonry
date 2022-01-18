/*
 * css-masonry <https://github.com/maliMirkec/css-masonry>
 *
 * Copyright (c) 2022, Silvestar Bistrović.
 * Released under the MIT License.
 */

'use strict';

let selector = '.js-css-masonry',
  elems = [],
  iteration = 0,
  maxIteration = 0,
  watched = false;

const getColNum = ($cols) => {
  if (!$cols) {
    return false
  }

  let colNum = 0

  $cols.forEach(($elem, i) => {
    if ($elem.getBoundingClientRect().top <= $cols[0].getBoundingClientRect().top) {
      colNum++
    }
  })

  return colNum
}

const watch = () => {
  if (!watched) {
    let resizeTimer;

    window.onresize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        trigger();
      }, 100);
    }

    watched = true
  }
}

const calculate = ($cols, colNum) => {
  if (!$cols) {
    return false
  }

  if (colNum <= 1) {
    return false
  }

  let $mostBottomElem = false
  let mostBottomElem = 0
  let $leastBottomElem = false
  let leastBottomElem = 9999999999999999
  let $emptyCol = false

  $cols.forEach($col => {
    if (!$col.children.length) {
      if ($cols[0].getBoundingClientRect().top === $col.getBoundingClientRect().top) {
        $emptyCol = $col
      }

      return false
    }

    let $elem = Array.from($col.children).slice(-1).pop()

    if (!$elem) {
      return false
    }

    let rect = $elem.getBoundingClientRect()

    if (rect.bottom >= mostBottomElem) {
      mostBottomElem = rect.bottom
      $mostBottomElem = {
        elem: $elem,
        rect: rect
      }
    }

    if (rect.bottom <= leastBottomElem) {
      leastBottomElem = rect.bottom
      $leastBottomElem = {
        elem: $elem,
        rect: rect
      }
    }
  })

  if (!$mostBottomElem || !$leastBottomElem) {
    return false;
  }

  const mTop = $mostBottomElem.rect.top
  const mBottom = $mostBottomElem.rect.bottom
  const lTop = $leastBottomElem.rect.top
  const lBottom = $leastBottomElem.rect.bottom

  if (mTop > lBottom || $emptyCol) {
    if ($emptyCol) {
      $emptyCol.appendChild($mostBottomElem.elem)
    } else if (mTop !== lTop && mBottom !== lBottom) {
      $leastBottomElem.elem.parentNode.appendChild($mostBottomElem.elem)
    }

    iteration++

    if (iteration < maxIteration) {
      calculate($cols, colNum)
    }
  }
}

const reset = ($elem) => {
  $elem.parent.innerHTML = $elem.html

  elems = []

  init()
}

const trigger = (reload) => {
  if (!elems.length) {
    return false
  }

  iteration = 0
  maxIteration = 0

  elems.forEach(($elem, i) => {
    $elem.columns.forEach($col => {
      maxIteration += $col.children.length ? $col.children.length : 0
    })

    const thisColNum = getColNum($elem.columns)

    if($elem.colNum !== thisColNum || reload) {
      reset($elem)
    }

    elems[i].colNum = thisColNum

    calculate($elem.columns, thisColNum)
  })
}

const init = (options) => {
  if (options && options.selector) {
    selector = options.selector
  }

  const $elems = document.querySelectorAll(selector)

  if ($elems.length) {
    $elems.forEach(($elem) => {
      const cols = $elem.children ? Array.from($elem.children) : []
      elems.push({
        html: $elem.innerHTML,
        parent: $elem,
        columns: cols,
        colNum: 0
      })
    })
  }

  trigger()
  watch()
}

module.exports = {
  init,
  trigger
}
