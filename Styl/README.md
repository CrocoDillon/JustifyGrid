[Justify Grid home page](http://justifygrid.com/)

# Styl helpers

## Quick start

1. Get a copy of the file `_justifygrid.styl` and import
   it using `@import "path/to/justifygrid";`
2. Extend the blocks `{grid}` and `{grid-cell}` where needed outside of
   Media Queries.
3. Set the width of the cells using the function `grid-span`, using the column
   span as parameter. You probably want this inside Media Queries if you use a
   mobile first approach.
4. Optional mixins `grid-push`, `grid-pull`, `grid-prepend` and `grid-append`.
   Push and pull need `position: relative` on the element to work.

## Example

To create a simple 3-column layout:

```html
<div class="grid">
  <div class="col col-1">...</div>
  <div class="col col-2">...</div>
  <div class="col col-3">...</div>
</div>
```

```styl
.grid
  {grid}

.col
  {grid-cell}
  width grid-span(4)
```

Or, mobile first using a Media Query:

```styl
.grid
  {grid}
.col
  {grid-cell}
  @media screen and (min-width: 48em) {
    width grid-span(4)
  }
```

To swap column 1 and column 2:

```styl
.col-1
  position relative
  grid-push(4)
.col-2
  position relative
  grid-pull(4)
```