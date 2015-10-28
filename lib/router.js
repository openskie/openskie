var Routes = require('routes')
var router = Routes()
module.exports = router

var h = require('virtual-dom/h')

router.addRoute('/', function (m) {
  return h('div', h('h1', 'wow'))
})

router.addRoute('/test', function (m) {
  return h('div', h('h1', 'test'), h('h2', 'test2'))
})

router.addRoute('/section/:pg', function (m) {
  return <div>
    <div id="section">{m.params.pg}</div>
    <div id="other">temp</div>
  </div>
})
