[Justify Grid home page](http://justifygrid.com/)

# Sass helpers

## Quick start

1. Get a copy of the file `_justifygrid.scss` or `_justifygrid.sass` and import
   it using `@import "path/to/justifygrid";`
2. Extend the placeholders `%grid` and `%grid-cell` where needed outside of
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

```scss
.grid {
  @extend %grid;
}
.col {
  @extend %grid-cell;
  width: grid-span(4);
}
```

To swap column 1 and column 2:

```scss
.col-1 {
  position: relative;
  @include grid-push(4);
}
.col-2 {
  position: relative;
  @include grid-pull(4);
}
```