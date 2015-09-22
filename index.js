var inherits = require('inherits')
var EventEmitter = require('events').EventEmitter

var router = require('./lib/router.js')
var ecstatic = require('ecstatic')
var path = require('path')
var fs = require('fs')
var hyperstream = require('hyperstream')
var xtend = require('xtend')
var createElement = require('virtual-dom/create-element')
var db = require('./lib/db.js')

inherits(Server, EventEmitter)
module.exports = Server

function Server (opts) {
  if (!(this instanceof Server)) return new Server(opts)
  if (!opts) opts = {}
  this.st = ecstatic(path.join(__dirname, 'public'))
}

Server.prototype.handle = function (req, res) {
  var r, m = router.match(req.url)
  var mx = xtend(m, { state: { url: req.url } })
  if (m && (r = m.fn(mx))) {
    read('layout.html').pipe(hyperstream({
      '#content': createElement(r).toString()
    })).pipe(res)
  } else this.st(req, res)
}

Server.prototype.createStream = function () {
  // websocket feed goes here
}

Server.prototype.setup = function (cb) {
  db.setup(cb)
}

function read (file) {
  return fs.createReadStream(path.join(__dirname, 'public', file))
}
