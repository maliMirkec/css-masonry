# CSS Masonry

A JavaScript recalculation for the CSS Grid masonry layout.

## About

Why CSS Masonry?

Because doing masonry layout in CSS could be messed up.

![HTML structure](/assets/Masonry2@2x.jpg)

## Installation

`yarn add css-masonry`

`npm install css-masonry`

## Usage

### Quick start

```js
const Masonry = require('./css-masonry')

Masonry.init({
  parentSelector: '.js-css-masonry', // wrapper selector
  itemSelector: '.js-css-masonry-item' // item selector
})
```

### HTML

Required HTML structure:

- wrapper
- columns
- items

```html
<div class="css-masonry js-css-masonry">
  <div class="css-masonry__column">
    <div class="css-masonry__item js-css-masonry-item">
      ...
    </div>
    ...
  </div>
  <div class="css-masonry__column">
    <div class="css-masonry__item js-css-masonry-item">
      ...
    </div>
    ...
  </div>
  <div class="css-masonry__column">
    <div class="css-masonry__item js-css-masonry-item">
      ...
    </div>
    ...
  </div>
  <div class="css-masonry__column">
    <div class="css-masonry__item js-css-masonry-item">
      ...
    </div>
    ...
  </div>
</div>
```

Here's the preview:

![HTML structure](/assets/Masonry@2x.jpg)

### CSS

You could use your CSS or you could use the following CSS:

```css
.css-masonry {
  --css-masonry-wrapper: 1000px;
  --css-masonry-gap: 20px;
  --css-masonry-min: 200px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--css-masonry-min), 1fr));
  grid-gap: var(--css-masonry-gap);
  max-width: var(--css-masonry-wrapper);
  margin-right: auto;
  margin-left: auto;
}
```

_This CSS is also available as a file in this project (`/src/css-masonry.css`)._

Adjust CSS variables per your needs.

### JavaScript



```js
const Masonry = require('./css-masonry')

Masonry.init({
  parentSelector: '.js-css-masonry',
  itemSelector: '.js-css-masonry-item'
})
```

### Options

| Option | Default value | Description |
|---|---|---|
| `parentSelector` | `'.js-css-masonry'` | CSS Masonry wrapper selector |
| `itemSelector` | `'.js-css-masonry-item'` | CSS Masonry item selector |

### Known issues

Resizing the window messes up the order of the items.
