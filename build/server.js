"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//Require express
var express = require('express');
var session = require('express-session');
var app = express();
//Require cookieParser
var cookieParser = require('cookie-parser');
//Require connect Mongo
var MongoStore = require('connect-mongo');
//Require File Session Store
// const FileStore = require('session-file-store')(session)
//Require http
var _require = require('http'),
  HttpServer = _require.Server;
var httpServer = new HttpServer(app);
//Require socket.Io
var _require2 = require('socket.io'),
  IOServer = _require2.Server;
var io = new IOServer(httpServer);
//Require moment
var moment = require('moment/moment.js');
//Require Normalizr
var _require3 = require("normalizr"),
  normalize = _require3.normalize,
  schema = _require3.schema;
//Require Passpprt
var passport = require('passport');
var _require4 = require('passport-local'),
  LocalStrategy = _require4.Strategy;
//Require Facebook
var _require5 = require('passport-facebook'),
  FacebookStrategy = _require5.Strategy;
//Require jsonwebtoken
var jwt = require('jsonwebtoken');
//cluster
var cluster = require('cluster');
//os
var os = require('os');
var procesadores = os.cpus().length;

//Routes
var apiInfo = require('./routes/info.js');
var apiRandoms = require('./routes/randoms.js');
app.use('/api/info', apiInfo);
var PRIVATE_KEY = 'sdf#R"#$&/(/(';
var yargs = require("yargs")(process.argv.slice(2));

// args//
var _yargs$alias$default$ = yargs.alias({
    p: 'puerto'
  })["default"]({
    puerto: 8080
  }).argv,
  puerto = _yargs$alias$default$.puerto,
  _ = _yargs$alias$default$._;
var advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://rooteado:YXhF8AC7AKYzPEI5@cluster0.i7qjgjd.mongodb.net/session?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 10 * 60
  }),
  // store: new FileStore({path: './sessiones', ttl: 30000, retries: 0}),

  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

//export contructor productos
var Productos = require('./container/constructor.js');
var contenedor = new Productos('./src/db/productos.txt');
var mensajes = new Productos('./src/db/mensajes.txt');

//Carpeta views ejs
app.set('view engine', 'ejs');

//puerto y rutas
var PORT = puerto;
// const PORT = process.argv[2] || 8080
var publicRoot = 'public';

//Unlecoded
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//carpeta public
app.use(express["static"](publicRoot));

//usuarios en memoria
var usuarios = [];

//Configurar funciones passport
passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  var direccion = req.body.direccion;
  var usuario = usuarios.find(function (usuario) {
    return usuario.username == username;
  });
  if (usuario) {
    return done(null, false);
  }
  var user = {
    username: username,
    password: password,
    direccion: direccion
  };
  usuarios.push(user);
  var access_token = generateToken(user);
  return done(null, access_token);
}));
passport.use('login', new LocalStrategy(function (username, password, done) {
  var usuario = usuarios.find(function (usuario) {
    return usuario.username == username && usuario.password == password;
  });
  if (!usuario) {
    return done(null, false);
  }
  usuario.contador = 0;
  return done(null, usuario);
}));

//Credenciales 
var FACEOBOOK_CLIENT_ID = '1505181936633231';
var FACEOBOOK_CLIENT_SECRET = '5ec69e6ca06a87ddf0daed7a45fe4511';
passport.use(new FacebookStrategy({
  clientID: FACEOBOOK_CLIENT_ID,
  clientSecret: FACEOBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
  scope: ['email']
}, function (accessToken, refreshToken, userProfile, done) {
  return done(null, userProfile);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

//Endpoints Facebook

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/loginError'
}));

//middelware jwt
var generateToken = function generateToken(usuario) {
  var token = jwt.sign({
    data: usuario
  }, PRIVATE_KEY, {
    expiresIn: "10m"
  });
  return token;
};

//Render

app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/datos");
  } else {
    res.redirect("/login");
  }
});
app.get('/register', function (req, res) {
  res.render("pages/register");
});
app.post('/register', passport.authenticate('register', {
  failureRedirect: 'registerError',
  successRedirect: '/login'
}));
app.get('/registerError', function (req, res) {
  res.render("pages/register-error");
});
app.get('/login', function (req, res) {
  res.render("pages/login");
});
app.post('/login', passport.authenticate('login', {
  failureRedirect: '/loginError',
  successRedirect: '/datos'
}));
app.get('/loginError', function (req, res) {
  res.render("pages/login-error");
});
app.get('/datos', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('pages/index', {
      nombre: req.user.username
    });
  } else {
    res.redirect('/login');
  }
});
app.get('/logout', function (req, res) {
  req.logout(function () {});
  res.redirect('/');
});

// pm2 start server.js --name:"Server1" --watch -- 8081
// pm2 start server.js --name:"Server2" --watch -- 8082

if (cluster.isPrimary) {
  console.log("Proceso maestro ".concat(process.pid, " trabajando"));
  for (var i = 0; i < procesadores; i++) {
    cluster.fork();
  }
  cluster.on('exit', function (worker, code, signal) {
    console.log("Trabajador ".concat(worker.process.pid, " ha caido"));
  });
} else {
  app.use('/api/randoms', apiRandoms);
  //Servidor
  var server = httpServer.listen(PORT, function () {
    console.log("servidor escuchando: ".concat(server.address().port));
  });
  server.on('error', function (error) {
    return console.log("Error: ".concat(error));
  });
  console.log("Trabajador ".concat(process.pid, " comenzado"));
}

//Socket
io.on('connection', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(socket) {
    var lista, listMensajes;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log('nuevo cliente conect');
          // lista formulario
          _context3.next = 3;
          return contenedor.getAll();
        case 3:
          lista = _context3.sent;
          socket.emit('new-connection', lista);
          socket.on('new-product', /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return contenedor.save(data);
                  case 2:
                    io.sockets.emit("product", data);
                  case 3:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());

          //mensajeria
          _context3.next = 8;
          return mensajes.getAll();
        case 8:
          listMensajes = _context3.sent;
          _context3.t0 = socket;
          _context3.next = 12;
          return obtenerMensajesNormalizados();
        case 12:
          _context3.t1 = _context3.sent;
          _context3.t0.emit.call(_context3.t0, 'mensajes', _context3.t1);
          socket.on('nuevo-mensaje', /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    data.time = moment(new Date()).format('DD/MM/YYY hh:mm:ss');
                    _context2.next = 3;
                    return mensajes.save(data);
                  case 3:
                    _context2.t0 = io.sockets;
                    _context2.next = 6;
                    return obtenerMensajesNormalizados();
                  case 6:
                    _context2.t1 = _context2.sent;
                    _context2.t0.emit.call(_context2.t0, 'mensajes', _context2.t1);
                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

// -------------------------------------------
// Definicion de esquemas

var autorSchema = new schema.Entity('autor', {}, {
  idAttribute: 'email'
});
var mensajeSchema = new schema.Entity('post', {
  autor: autorSchema
}, {
  idAttribute: 'id'
});
var mensajesSchema = new schema.Entity('posts', {
  mensajes: [mensajeSchema]
}, {
  idAttribute: 'id'
});

// -------------------------------------------
// Funciones custom

var obtenerMensajesNormalizados = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var arregloMensajes;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return mensajes.getAll();
        case 2:
          arregloMensajes = _context4.sent;
          return _context4.abrupt("return", normalize({
            id: 'mensajes',
            mensajes: arregloMensajes
          }, mensajesSchema));
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function obtenerMensajesNormalizados() {
    return _ref4.apply(this, arguments);
  };
}();