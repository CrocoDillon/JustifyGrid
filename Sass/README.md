[Justify Grid home page](http://justifygrid.com/)

# Sass helpers

## Quick start

1. Get a copy of the file `_justifygrid.scss` and import it using
   `@import "path/to/justifygrid";`
2. Extend the placeholders `%grid` and `%grid-cell` where needed outside of
   Media Queries.
3. Set the width of the cells using the function `grid-span`, using the column
   span as parameter. You probably want this inside Media Queries if you use a
   mobile first approach.