/*
 * css-masonry <https://github.com/maliMirkec/css-masonry>
 *
 * Copyright (c) 2022, Silvestar Bistrović.
 * Released under the MIT License.
 */

'use strict';

let parentSelector = '.js-css-masonry',
  itemSelector = '.js-css-masonry-item',
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

const getLastElement = ($col) => {
  if(!$col) {
    return false
  }

  const $elems = $col.querySelectorAll(itemSelector)

  if(!$elems.length) {
    return false
  }

  const $elem = $elems[$elems.length - 1]

  return {
    elem: $elem,
    rect: $elem.getBoundingClientRect()
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

    const $elem = getLastElement($col)

    if(!$elem) {
      return false
    }

    if ($elem.rect.bottom >= mostBottomElem) {
      mostBottomElem = $elem.rect.bottom
      $mostBottomElem = {
        elem: $elem.elem,
        rect: $elem.rect
      }
    }

    if ($elem.rect.bottom <= leastBottomElem) {
      leastBottomElem = $elem.rect.bottom
      $leastBottomElem = {
        elem: $elem.elem,
        rect: $elem.rect
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

// const reset = ($elem) => {
//   console.log('reset');
//   $elem.parent.innerHTML = $elem.html

//   elems = []

//   init()
// }

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

    // if(($elem.colNum !== 0 && $elem.colNum !== thisColNum) || reload) {
    //   reset($elem)
    // }

    // elems[i].colNum = thisColNum

    calculate($elem.columns, thisColNum)
  })
}

const init = (options) => {
  if (options && options.parentSelector) {
    parentSelector = options.parentSelector
  }

  if (options && options.itemSelector) {
    itemSelector = options.itemSelector
  }

  const $elems = document.querySelectorAll(parentSelector)

  if ($elems.length) {
    $elems.forEach(($elem) => {
      const $cols = $elem.children ? Array.from($elem.children) : []
      elems.push({
        html: $elem.innerHTML,
        parent: $elem,
        columns: $cols,
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
