(function(d){
  var   form          = d.forms.builder,
        outputElement = d.getElementById('builder-output'),
        outputCss,
        outputMinified;

  form.onsubmit = function(e) {
    e = e || event;
    (e.preventDefault) ? e.preventDefault() : e.returnValue = false;

    var i,
        span    = '',
        push    = '',
        pull    = '',
        prepend = '',
        append  = '',
        n           = parseInt(form.columns.value),
        columnWidth = parseFloat(form.column.value),
        gutterWidth = parseFloat(form.gutter.value),
        totalWidth  = n * columnWidth + (n - 1) * gutterWidth;

    if (n < 1 ||
        columnWidth <= 0 ||
        gutterWidth <= 0) {
      outputElement.innerHTML = 'Awww... you broke the grid!  (╯°□°)╯  ┻┻';
      return;
    }

    // calculate percentages
    for (i = 1; i < n; i++) {
      var width = 100 * (i * columnWidth + (i - 1) * gutterWidth) / totalWidth;
      width = width.toFixed(5).replace(/\.?0+$/, '');

      span += '.span-' + i + ' { width: ' + width + '%; }\n';

      width = 100 * i * (columnWidth + gutterWidth) / totalWidth;
      width = width.toFixed(5).replace(/\.?0+$/, '');

      push += '.push-' + i + ' { left: '  + width + '%; }\n';
      pull += '.pull-' + i + ' { left: -' + width + '%; }\n';
      prepend += '.prepend-' + i + ' { margin-left: '  + width + '%; }\n';
      append  += '.append-'  + i + ' { margin-right: ' + width + '%; }\n';
    }

    // extended - add extra classes
    if (form.xt.checked)
      outputCss = '[class*="push-"], [class*="pull-"] {\n  position: relative;\n}\n' + span + push + pull + prepend + append;
    else
      outputCss = span;

    // include media query
    if (form.mq.checked)
      outputCss =
        '@media screen and (min-width: 48em) {\n  ' +
          outputCss.replace(/\n(?!$)/g, '\n  ') +
        '}\n';

    // support old ie (6&7)
    if (form.ie.checked) {
      outputCss =
        '.lt-ie8 .grid {\n' +
        '  zoom: expression(this.runtimeStyle.zoom="1", this.appendChild( document.createElement("span") ).style.fontSize="0");\n' +
        '}\n' +
        '.lt-ie8 .grid > * {\n' +
        '  display: inline;\n' +
        '  zoom: 1;\n' +
        '}\n' + outputCss;
    }

    // justify grid base
    outputCss =
      '.grid {\n' +
      '  text-align: justify !important;\n' +
      '  text-justify: distribute-all-lines;\n' +
      '  font-size: 0 !important;\n' +
      '}\n' +
      '.grid:after {\n' +
      '  content: "";\n' +
      '  display: inline-block;\n' +
      '  width: 100%;\n' +
      '}\n' +
      '.grid > * {\n' +
      '  vertical-align: top;\n' +
      '  display: inline-block;\n' +
      '  width: 100%;\n' +
      '  text-align: left;\n' +
      '  font-size: medium;\n' +
      '}\n' + outputCss;

    // minify
    outputMinified = outputCss.replace(/\n/g, ' ');
    outputMinified = outputMinified.replace(/\s+/g, ' ');
    outputMinified = outputMinified.replace(/\s?([{}()>:;,])\s?/g, '$1');
    outputMinified = outputMinified.replace(/and\(/g, 'and ('); // fix space issue in mq
    outputMinified = outputMinified.replace(/;}/g, '}');

    //console.log(outputCss.length + ' bytes');
    //console.log(outputMinified.length + ' bytes minified');

    // parsed values
    form.columns.value = n;
    form.column.value  = columnWidth;
    form.gutter.value  = gutterWidth;

    output();
  };

  form.minify.onchange = function() {
    if (outputCss) output();
  };

  function output() {
    outputElement.innerHTML = (form.minify.checked) ? outputMinified : outputCss;
    Prism.highlightElement(outputElement);
  }
})(document);