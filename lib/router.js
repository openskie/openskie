var Routes = require('routes')
var router = Routes()
module.exports = router

var h = require('virtual-dom/h')

router.addRoute('/', function (m) {
  return h('h1', 'wow')
})

router.addRoute('/section/:pg', function (m) {
  return <div>
    <div id="section">{m.params.pg}</div>
    <div id="other">temp</div>
  </div>
})
