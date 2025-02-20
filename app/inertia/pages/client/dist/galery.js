'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
var react_1 = require('react')
var DisplayGalery = react_1['default'].lazy(function () {
  return Promise.resolve().then(function () {
    return require('~/components/display_galery')
  })
})
var galery_module_css_1 = require('#css/galery.module.css')
var header_1 = require('./header')
var react_2 = require('@inertiajs/react')
var Dialog = react_1['default'].lazy(function () {
  return Promise.resolve().then(function () {
    return require('~/components/dialog')
  })
})
var Galery = function (props) {
  var filter = location.search.split('=')[1]
  function changeFilter(e) {
    var value = e.target.value
    if (value === 'all') return react_2.router.visit('?filter=all')
    if (value === 'liked') return react_2.router.visit('?filter=liked')
    if (value === 'comment') return react_2.router.visit('?filter=comment')
    return react_2.router.visit('?filter=all')
  }
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      react_1.Suspense,
      { fallback: react_1['default'].createElement(react_1['default'].Fragment, null) },
      react_1['default'].createElement(Dialog, null)
    ),
    react_1['default'].createElement(header_1['default'], __assign({}, props)),
    react_1['default'].createElement(
      'label',
      { htmlFor: 'filter', className: galery_module_css_1['default'].filter },
      react_1['default'].createElement(
        'select',
        { name: 'filter', onChange: changeFilter, value: filter },
        react_1['default'].createElement('option', { value: 'all' }, 'Tout'),
        react_1['default'].createElement('option', { value: 'liked' }, 'Favoris'),
        react_1['default'].createElement('option', { value: 'comment' }, 'Comment\u00E9s')
      )
    ),
    react_1['default'].createElement(
      'main',
      { className: galery_module_css_1['default'].main },
      react_1['default'].createElement(
        react_1.Suspense,
        { fallback: react_1['default'].createElement(react_1['default'].Fragment, null) },
        react_1['default'].createElement(DisplayGalery, {
          imagesTarget: undefined,
          setImagesTarget: undefined,
          className: galery_module_css_1['default'].galery,
          images: props.images,
          _csrf: props._csrf,
          type: 'client',
          urlData: props.urlData,
        })
      )
    )
  )
}
exports['default'] = Galery
