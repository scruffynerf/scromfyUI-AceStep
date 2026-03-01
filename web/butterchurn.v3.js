(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("butterchurn", [], factory);
	else if(typeof exports === 'object')
		exports["butterchurn"] = factory();
	else
		root["butterchurn"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@assemblyscript/loader/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@assemblyscript/loader/index.js ***!
  \******************************************************/
/*! exports provided: instantiate, instantiateSync, instantiateStreaming, demangle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instantiate", function() { return instantiate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instantiateSync", function() { return instantiateSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "instantiateStreaming", function() { return instantiateStreaming; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "demangle", function() { return demangle; });
// Runtime header offsets
const ID_OFFSET = -8;
const SIZE_OFFSET = -4;

// Runtime ids
const ARRAYBUFFER_ID = 0;
const STRING_ID = 1;
// const ARRAYBUFFERVIEW_ID = 2;

// Runtime type information
const ARRAYBUFFERVIEW = 1 << 0;
const ARRAY = 1 << 1;
const STATICARRAY = 1 << 2;
// const SET = 1 << 3;
// const MAP = 1 << 4;
const VAL_ALIGN_OFFSET = 6;
// const VAL_ALIGN = 1 << VAL_ALIGN_OFFSET;
const VAL_SIGNED = 1 << 11;
const VAL_FLOAT = 1 << 12;
// const VAL_NULLABLE = 1 << 13;
const VAL_MANAGED = 1 << 14;
// const KEY_ALIGN_OFFSET = 15;
// const KEY_ALIGN = 1 << KEY_ALIGN_OFFSET;
// const KEY_SIGNED = 1 << 20;
// const KEY_FLOAT = 1 << 21;
// const KEY_NULLABLE = 1 << 22;
// const KEY_MANAGED = 1 << 23;

// Array(BufferView) layout
const ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
const ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
const ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8;
const ARRAYBUFFERVIEW_SIZE = 12;
const ARRAY_LENGTH_OFFSET = 12;
const ARRAY_SIZE = 16;

const BIGINT = typeof BigUint64Array !== "undefined";
const THIS = Symbol();

const STRING_DECODE_THRESHOLD = 32;
const decoder = new TextDecoder("utf-16le");

/** Gets a string from an U32 and an U16 view on a memory. */
function getStringImpl(buffer, ptr) {
  const len = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2] >>> 1;
  const arr = new Uint16Array(buffer, ptr, len);
  if (len <= STRING_DECODE_THRESHOLD) {
    return String.fromCharCode.apply(String, arr);
  }
  return decoder.decode(arr);
}

/** Prepares the base module prior to instantiation. */
function preInstantiate(imports) {
  const extendedExports = {};

  function getString(memory, ptr) {
    if (!memory) return "<yet unknown>";
    return getStringImpl(memory.buffer, ptr);
  }

  // add common imports used by stdlib for convenience
  const env = (imports.env = imports.env || {});
  env.abort = env.abort || function abort(msg, file, line, colm) {
    const memory = extendedExports.memory || env.memory; // prefer exported, otherwise try imported
    throw Error(`abort: ${getString(memory, msg)} at ${getString(memory, file)}:${line}:${colm}`);
  };
  env.trace = env.trace || function trace(msg, n, ...args) {
    const memory = extendedExports.memory || env.memory;
    console.log(`trace: ${getString(memory, msg)}${n ? " " : ""}${args.slice(0, n).join(", ")}`);
  };
  env.seed = env.seed || Date.now;
  imports.Math = imports.Math || Math;
  imports.Date = imports.Date || Date;

  return extendedExports;
}

/** Prepares the final module once instantiation is complete. */
function postInstantiate(extendedExports, instance) {
  const exports = instance.exports;
  const memory = exports.memory;
  const table = exports.table;
  const __new = exports["__new"];
  const __retain = exports["__retain"];
  const __rtti_base = exports["__rtti_base"] || ~0; // oob if not present

  /** Gets the runtime type info for the given id. */
  function getInfo(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[__rtti_base >>> 2];
    if ((id >>>= 0) >= count) throw Error(`invalid id: ${id}`);
    return U32[(__rtti_base + 4 >>> 2) + id * 2];
  }

  /** Gets and validate runtime type info for the given id for array like objects */
  function getArrayInfo(id) {
    const info = getInfo(id);
    if (!(info & (ARRAYBUFFERVIEW | ARRAY | STATICARRAY))) throw Error(`not an array: ${id}, flags=${info}`);
    return info;
  }

  /** Gets the runtime base id for the given id. */
  function getBase(id) {
    const U32 = new Uint32Array(memory.buffer);
    const count = U32[__rtti_base >>> 2];
    if ((id >>>= 0) >= count) throw Error(`invalid id: ${id}`);
    return U32[(__rtti_base + 4 >>> 2) + id * 2 + 1];
  }

  /** Gets the runtime alignment of a collection's values. */
  function getValueAlign(info) {
    return 31 - Math.clz32((info >>> VAL_ALIGN_OFFSET) & 31); // -1 if none
  }

  /** Gets the runtime alignment of a collection's keys. */
  // function getKeyAlign(info) {
  //   return 31 - Math.clz32((info >>> KEY_ALIGN_OFFSET) & 31); // -1 if none
  // }

  /** Allocates a new string in the module's memory and returns its retained pointer. */
  function __newString(str) {
    if (str == null) return 0;
    const length = str.length;
    const ptr = __new(length << 1, STRING_ID);
    const U16 = new Uint16Array(memory.buffer);
    for (var i = 0, p = ptr >>> 1; i < length; ++i) U16[p + i] = str.charCodeAt(i);
    return ptr;
  }

  extendedExports.__newString = __newString;

  /** Reads a string from the module's memory by its pointer. */
  function __getString(ptr) {
    if (!ptr) return null;
    const buffer = memory.buffer;
    const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
    if (id !== STRING_ID) throw Error(`not a string: ${ptr}`);
    return getStringImpl(buffer, ptr);
  }

  extendedExports.__getString = __getString;

  /** Gets the view matching the specified alignment, signedness and floatness. */
  function getView(alignLog2, signed, float) {
    const buffer = memory.buffer;
    if (float) {
      switch (alignLog2) {
        case 2: return new Float32Array(buffer);
        case 3: return new Float64Array(buffer);
      }
    } else {
      switch (alignLog2) {
        case 0: return new (signed ? Int8Array : Uint8Array)(buffer);
        case 1: return new (signed ? Int16Array : Uint16Array)(buffer);
        case 2: return new (signed ? Int32Array : Uint32Array)(buffer);
        case 3: return new (signed ? BigInt64Array : BigUint64Array)(buffer);
      }
    }
    throw Error(`unsupported align: ${alignLog2}`);
  }

  /** Allocates a new array in the module's memory and returns its retained pointer. */
  function __newArray(id, values) {
    const info = getArrayInfo(id);
    const align = getValueAlign(info);
    const length = values.length;
    const buf = __new(length << align, info & STATICARRAY ? id : ARRAYBUFFER_ID);
    let result;
    if (info & STATICARRAY) {
      result = buf;
    } else {
      const arr = __new(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
      const U32 = new Uint32Array(memory.buffer);
      U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = __retain(buf);
      U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
      U32[arr + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = length << align;
      if (info & ARRAY) U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length;
      result = arr;
    }
    const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
    if (info & VAL_MANAGED) {
      for (let i = 0; i < length; ++i) view[(buf >>> align) + i] = __retain(values[i]);
    } else {
      view.set(values, buf >>> align);
    }
    return result;
  }

  extendedExports.__newArray = __newArray;

  /** Gets a live view on an array's values in the module's memory. Infers the array type from RTTI. */
  function __getArrayView(arr) {
    const U32 = new Uint32Array(memory.buffer);
    const id = U32[arr + ID_OFFSET >>> 2];
    const info = getArrayInfo(id);
    const align = getValueAlign(info);
    let buf = info & STATICARRAY
      ? arr
      : U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    const length = info & ARRAY
      ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2]
      : U32[buf + SIZE_OFFSET >>> 2] >>> align;
    return getView(align, info & VAL_SIGNED, info & VAL_FLOAT).subarray(buf >>>= align, buf + length);
  }

  extendedExports.__getArrayView = __getArrayView;

  /** Copies an array's values from the module's memory. Infers the array type from RTTI. */
  function __getArray(arr) {
    const input = __getArrayView(arr);
    const len = input.length;
    const out = new Array(len);
    for (let i = 0; i < len; i++) out[i] = input[i];
    return out;
  }

  extendedExports.__getArray = __getArray;

  /** Copies an ArrayBuffer's value from the module's memory. */
  function __getArrayBuffer(ptr) {
    const buffer = memory.buffer;
    const length = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2];
    return buffer.slice(ptr, ptr + length);
  }

  extendedExports.__getArrayBuffer = __getArrayBuffer;

  /** Copies a typed array's values from the module's memory. */
  function getTypedArray(Type, alignLog2, ptr) {
    return new Type(getTypedArrayView(Type, alignLog2, ptr));
  }

  /** Gets a live view on a typed array's values in the module's memory. */
  function getTypedArrayView(Type, alignLog2, ptr) {
    const buffer = memory.buffer;
    const U32 = new Uint32Array(buffer);
    const bufPtr = U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
    return new Type(buffer, bufPtr, U32[bufPtr + SIZE_OFFSET >>> 2] >>> alignLog2);
  }

  /** Attach a set of get TypedArray and View functions to the exports. */
  function attachTypedArrayFunctions(ctor, name, align) {
    extendedExports[`__get${name}`] = getTypedArray.bind(null, ctor, align);
    extendedExports[`__get${name}View`] = getTypedArrayView.bind(null, ctor, align);
  }

  [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array
  ].forEach(ctor => {
    attachTypedArrayFunctions(ctor, ctor.name, 31 - Math.clz32(ctor.BYTES_PER_ELEMENT));
  });

  if (BIGINT) {
    [BigUint64Array, BigInt64Array].forEach(ctor => {
      attachTypedArrayFunctions(ctor, ctor.name.slice(3), 3);
    });
  }

  /** Tests whether an object is an instance of the class represented by the specified base id. */
  function __instanceof(ptr, baseId) {
    const U32 = new Uint32Array(memory.buffer);
    let id = U32[ptr + ID_OFFSET >>> 2];
    if (id <= U32[__rtti_base >>> 2]) {
      do {
        if (id == baseId) return true;
        id = getBase(id);
      } while (id);
    }
    return false;
  }

  extendedExports.__instanceof = __instanceof;

  // Pull basic exports to extendedExports so code in preInstantiate can use them
  extendedExports.memory = extendedExports.memory || memory;
  extendedExports.table  = extendedExports.table  || table;

  // Demangle exports and provide the usual utility on the prototype
  return demangle(exports, extendedExports);
}

function isResponse(src) {
  return typeof Response !== "undefined" && src instanceof Response;
}

function isModule(src) {
  return src instanceof WebAssembly.Module;
}

/** Asynchronously instantiates an AssemblyScript module from anything that can be instantiated. */
async function instantiate(source, imports = {}) {
  if (isResponse(source = await source)) return instantiateStreaming(source, imports);
  const module = isModule(source) ? source : await WebAssembly.compile(source);
  const extended = preInstantiate(imports);
  const instance = await WebAssembly.instantiate(module, imports);
  const exports = postInstantiate(extended, instance);
  return { module, instance, exports };
}

/** Synchronously instantiates an AssemblyScript module from a WebAssembly.Module or binary buffer. */
function instantiateSync(source, imports = {}) {
  const module = isModule(source) ? source : new WebAssembly.Module(source);
  const extended = preInstantiate(imports);
  const instance = new WebAssembly.Instance(module, imports);
  const exports = postInstantiate(extended, instance);
  return { module, instance, exports };
}

/** Asynchronously instantiates an AssemblyScript module from a response, i.e. as obtained by `fetch`. */
async function instantiateStreaming(source, imports = {}) {
  if (!WebAssembly.instantiateStreaming) {
    return instantiate(
      isResponse(source = await source)
        ? source.arrayBuffer()
        : source,
      imports
    );
  }
  const extended = preInstantiate(imports);
  const result = await WebAssembly.instantiateStreaming(source, imports);
  const exports = postInstantiate(extended, result.instance);
  return { ...result, exports };
}

/** Demangles an AssemblyScript module's exports to a friendly object structure. */
function demangle(exports, extendedExports = {}) {
  const setArgumentsLength = exports["__argumentsLength"]
    ? length => { exports["__argumentsLength"].value = length; }
    : exports["__setArgumentsLength"] || exports["__setargc"] || (() => { /* nop */ });
  for (let internalName in exports) {
    if (!Object.prototype.hasOwnProperty.call(exports, internalName)) continue;
    const elem = exports[internalName];
    let parts = internalName.split(".");
    let curr = extendedExports;
    while (parts.length > 1) {
      let part = parts.shift();
      if (!Object.prototype.hasOwnProperty.call(curr, part)) curr[part] = {};
      curr = curr[part];
    }
    let name = parts[0];
    let hash = name.indexOf("#");
    if (hash >= 0) {
      const className = name.substring(0, hash);
      const classElem = curr[className];
      if (typeof classElem === "undefined" || !classElem.prototype) {
        const ctor = function(...args) {
          return ctor.wrap(ctor.prototype.constructor(0, ...args));
        };
        ctor.prototype = {
          valueOf() { return this[THIS]; }
        };
        ctor.wrap = function(thisValue) {
          return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
        };
        if (classElem) Object.getOwnPropertyNames(classElem).forEach(name =>
          Object.defineProperty(ctor, name, Object.getOwnPropertyDescriptor(classElem, name))
        );
        curr[className] = ctor;
      }
      name = name.substring(hash + 1);
      curr = curr[className].prototype;
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          let getter = exports[internalName.replace("set:", "get:")];
          let setter = exports[internalName.replace("get:", "set:")];
          Object.defineProperty(curr, name, {
            get() { return getter(this[THIS]); },
            set(value) { setter(this[THIS], value); },
            enumerable: true
          });
        }
      } else {
        if (name === 'constructor') {
          (curr[name] = (...args) => {
            setArgumentsLength(args.length);
            return elem(...args);
          }).original = elem;
        } else { // instance method
          (curr[name] = function(...args) { // !
            setArgumentsLength(args.length);
            return elem(this[THIS], ...args);
          }).original = elem;
        }
      }
    } else {
      if (/^(get|set):/.test(name)) {
        if (!Object.prototype.hasOwnProperty.call(curr, name = name.substring(4))) {
          Object.defineProperty(curr, name, {
            get: exports[internalName.replace("set:", "get:")],
            set: exports[internalName.replace("get:", "set:")],
            enumerable: true
          });
        }
      } else if (typeof elem === "function" && elem !== setArgumentsLength) {
        (curr[name] = (...args) => {
          setArgumentsLength(args.length);
          return elem(...args);
        }).original = elem;
      } else {
        curr[name] = elem;
      }
    }
  }
  return extendedExports;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  instantiate,
  instantiateSync,
  instantiateStreaming,
  demangle
});


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/ecma-proposal-math-extensions/reference-implementation/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/ecma-proposal-math-extensions/reference-implementation/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


{
  const defineMath = (name, assignment) => {
    var configurable = typeof assignment === "function" ? true : false;
    var writable = typeof assignment === "function" ? true : false;
    var enumerable = typeof assignment === "function" ? true : false;

    Object.defineProperty(Math, name, {
      configurable: configurable,
      enumerable: enumerable,
      writable: writable,
      value: assignment
    });
  };

  defineMath("DEG_PER_RAD", Math.PI / 180);
  defineMath("RAD_PER_DEG", 180 / Math.PI);

  const f32A = new Float32Array(1);

  defineMath("scale", function scale(x, inLow, inHigh, outLow, outHigh) {
    if (arguments.length === 0) {
      return NaN;
    }

    if (Number.isNaN(x) ||
        Number.isNaN(inLow) ||
        Number.isNaN(inHigh) ||
        Number.isNaN(outLow) ||
        Number.isNaN(outHigh)) {
      return NaN;
    }

    if (x === Infinity ||
        x === -Infinity) {
      return x;
    }

    return (x - inLow) * (outHigh - outLow) /
      (inHigh - inLow) + outLow;
  });

  defineMath("fscale", function fscale(x, inLow, inHigh, outLow, outHigh) {
    f32A[0] = Math.scale(x, inLow, inHigh, outLow, outHigh);
    return f32A[0];
  });

  defineMath("clamp", function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  });

  defineMath("radians", function radians(degrees) {
    return degrees * Math.DEG_PER_RAD;
  });

  defineMath("degrees", function degrees(radians) {
    return radians * Math.RAD_PER_DEG;
  });
}


/***/ }),

/***/ "./node_modules/eel-wasm/dist/build/parser.js":
/*!****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/build/parser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, process) {/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 18], $V1 = [1, 7], $V2 = [1, 19], $V3 = [1, 20], $V4 = [1, 14], $V5 = [1, 15], $V6 = [1, 16], $V7 = [1, 33], $V8 = [1, 31], $V9 = [1, 23], $Va = [1, 22], $Vb = [1, 24], $Vc = [1, 25], $Vd = [1, 26], $Ve = [1, 27], $Vf = [1, 28], $Vg = [1, 29], $Vh = [1, 30], $Vi = [5, 8, 15, 18, 20, 28, 29, 32, 33, 34, 35, 36, 37, 38], $Vj = [5, 15, 18], $Vk = [5, 12, 15, 17, 18, 24, 25, 28, 29, 30], $Vl = [1, 57], $Vm = [5, 8, 12, 15, 17, 18, 24, 25, 28, 29, 30], $Vn = [15, 18], $Vo = [5, 8, 15, 18, 28, 29, 38], $Vp = [5, 8, 15, 18, 28, 29, 32, 33, 38], $Vq = [5, 8, 15, 18, 28, 29, 32, 33, 34, 37, 38], $Vr = [5, 8, 15, 18, 28, 29, 32, 33, 34, 35, 36, 37, 38], $Vs = [5, 8, 15, 18], $Vt = [5, 8, 15, 18, 20, 22, 28, 29, 32, 33, 34, 35, 36, 37, 38];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "SCRIPT": 3, "expression": 4, "EOF": 5, "expressionsOptionalTrailingSemi": 6, "separator": 7, ";": 8, "expressions": 9, "EXPRESSION_BLOCK": 10, "IDENTIFIER": 11, "IDENTIFIER_TOKEN": 12, "argument": 13, "arguments": 14, ",": 15, "FUNCTION_CALL": 16, "(": 17, ")": 18, "LOGICAL_EXPRESSION": 19, "LOGICAL_OPERATOR_TOKEN": 20, "ASSIGNMENT": 21, "ASSIGNMENT_OPERATOR_TOKEN": 22, "number": 23, "DIGITS_TOKEN": 24, ".": 25, "NUMBER_LITERAL": 26, "UNARY_EXPRESSION": 27, "-": 28, "+": 29, "!": 30, "BINARY_EXPRESSION": 31, "*": 32, "/": 33, "%": 34, "&": 35, "|": 36, "^": 37, "COMPARISON_TOKEN": 38, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 8: ";", 12: "IDENTIFIER_TOKEN", 15: ",", 17: "(", 18: ")", 20: "LOGICAL_OPERATOR_TOKEN", 22: "ASSIGNMENT_OPERATOR_TOKEN", 24: "DIGITS_TOKEN", 25: ".", 28: "-", 29: "+", 30: "!", 32: "*", 33: "/", 34: "%", 35: "&", 36: "|", 37: "^", 38: "COMPARISON_TOKEN" },
        productions_: [0, [3, 2], [3, 2], [3, 1], [7, 1], [7, 2], [9, 2], [9, 3], [6, 1], [6, 2], [10, 1], [11, 1], [13, 1], [13, 1], [14, 1], [14, 3], [16, 3], [16, 4], [19, 3], [21, 3], [21, 3], [23, 1], [23, 2], [23, 3], [23, 2], [23, 1], [26, 1], [27, 2], [27, 2], [27, 2], [31, 3], [31, 3], [31, 3], [31, 3], [31, 3], [31, 3], [31, 3], [31, 3], [31, 3], [4, 1], [4, 1], [4, 3], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return { type: 'SCRIPT', body: [$$[$0 - 1]], loc: this._$ };
                    break;
                case 2:
                    return { type: 'SCRIPT', body: $$[$0 - 1], loc: this._$ };
                    break;
                case 3:
                    return { type: 'SCRIPT', body: [], loc: this._$ };
                    break;
                case 6:
                    this.$ = [$$[$0 - 1]];
                    break;
                case 7:
                    this.$ = $$[$0 - 2].concat([$$[$0 - 1]]);
                    break;
                case 8:
                    this.$ = $$[$0];
                    break;
                case 9:
                    this.$ = $$[$0 - 1].concat([$$[$0]]);
                    break;
                case 10:
                    this.$ = { type: 'EXPRESSION_BLOCK', body: $$[$0], loc: this._$ };
                    break;
                case 11:
                    this.$ = { type: 'IDENTIFIER', value: $$[$0].toLowerCase(), loc: this._$ };
                    break;
                case 14:
                    this.$ = [$$[$0]];
                    break;
                case 15:
                    this.$ = $$[$0 - 2].concat([$$[$0]]);
                    break;
                case 16:
                    this.$ = { type: 'CALL_EXPRESSION', callee: $$[$0 - 2], arguments: [], loc: this._$ };
                    break;
                case 17:
                    this.$ = { type: 'CALL_EXPRESSION', callee: $$[$0 - 3], arguments: $$[$0 - 1], loc: this._$ };
                    break;
                case 18:
                    this.$ = { type: 'LOGICAL_EXPRESSION', left: $$[$0 - 2], right: $$[$0], operator: $$[$0 - 1], loc: this._$ };
                    break;
                case 19:
                case 20:
                    this.$ = { type: 'ASSIGNMENT_EXPRESSION', left: $$[$0 - 2], operator: $$[$0 - 1], right: $$[$0], loc: this._$ };
                    break;
                case 21:
                    this.$ = Number($$[$0]);
                    break;
                case 22:
                    this.$ = Number($$[$0 - 1]);
                    break;
                case 23:
                    this.$ = Number($$[$0 - 2] + $$[$0 - 1] + $$[$0]);
                    break;
                case 24:
                    this.$ = Number('0' + $$[$0 - 1] + $$[$0]);
                    break;
                case 25:
                    this.$ = 0;
                    break;
                case 26:
                    this.$ = { type: 'NUMBER_LITERAL', value: $$[$0], loc: this._$ };
                    break;
                case 27:
                case 28:
                case 29:
                    this.$ = { type: 'UNARY_EXPRESSION', value: $$[$0], operator: $$[$0 - 1], loc: this._$ };
                    break;
                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                case 37:
                case 38:
                    this.$ = { type: 'BINARY_EXPRESSION', left: $$[$0 - 2], right: $$[$0], operator: $$[$0 - 1], loc: this._$ };
                    break;
                case 41:
                case 47:
                    this.$ = $$[$0 - 1];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [1, 4], 6: 3, 9: 13, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 1: [3] }, { 5: [1, 21], 7: 32, 8: $V7, 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }, { 5: [1, 34] }, { 1: [2, 3] }, o($Vi, [2, 39]), o($Vi, [2, 40]), { 4: 35, 6: 37, 9: 13, 10: 36, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, o($Vi, [2, 42]), o($Vi, [2, 43]), o($Vi, [2, 44], { 22: [1, 38] }), o($Vi, [2, 45], { 17: [1, 40], 22: [1, 39] }), o($Vi, [2, 46]), o($Vj, [2, 8], { 31: 5, 27: 6, 26: 8, 21: 9, 16: 10, 11: 11, 19: 12, 23: 17, 4: 41, 12: $V0, 17: $V1, 24: $V2, 25: $V3, 28: $V4, 29: $V5, 30: $V6 }), { 4: 42, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 43, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 44, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, o($Vi, [2, 26]), o([5, 8, 15, 17, 18, 20, 22, 28, 29, 32, 33, 34, 35, 36, 37, 38], [2, 11]), o($Vi, [2, 21], { 25: [1, 45] }), o($Vi, [2, 25], { 24: [1, 46] }), { 1: [2, 1] }, { 4: 47, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 48, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 49, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 50, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 51, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 52, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 53, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 54, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 55, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 56, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, o($Vk, [2, 6], { 8: $Vl }), o($Vm, [2, 4]), { 1: [2, 2] }, { 7: 32, 8: $V7, 18: [1, 58], 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }, { 18: [1, 59] }, o($Vn, [2, 10]), { 4: 60, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 61, 11: 11, 12: $V0, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, { 4: 65, 6: 37, 9: 13, 10: 66, 11: 11, 12: $V0, 13: 64, 14: 63, 16: 10, 17: $V1, 18: [1, 62], 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, o($Vj, [2, 9], { 7: 67, 8: $V7, 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }), o($Vo, [2, 27], { 20: $V8, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vo, [2, 28], { 20: $V8, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vo, [2, 29], { 20: $V8, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vi, [2, 22], { 24: [1, 68] }), o($Vi, [2, 24]), o($Vo, [2, 30], { 20: $V8, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vo, [2, 31], { 20: $V8, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vp, [2, 32], { 20: $V8, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vp, [2, 33], { 20: $V8, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg }), o($Vq, [2, 34], { 20: $V8, 35: $Ve, 36: $Vf }), o($Vr, [2, 35], { 20: $V8 }), o($Vr, [2, 36], { 20: $V8 }), o($Vq, [2, 37], { 20: $V8, 35: $Ve, 36: $Vf }), o($Vs, [2, 38], { 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }), o($Vi, [2, 18]), o($Vm, [2, 5]), o($Vi, [2, 41]), o($Vi, [2, 47]), o($Vs, [2, 20], { 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }), o($Vs, [2, 19], { 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }), o($Vt, [2, 16]), { 15: [1, 70], 18: [1, 69] }, o($Vn, [2, 14]), o($Vn, [2, 12], { 7: 32, 8: $V7, 20: $V8, 28: $V9, 29: $Va, 32: $Vb, 33: $Vc, 34: $Vd, 35: $Ve, 36: $Vf, 37: $Vg, 38: $Vh }), o($Vn, [2, 13]), o($Vk, [2, 7], { 8: $Vl }), o($Vi, [2, 23]), o($Vt, [2, 17]), { 4: 65, 6: 37, 9: 13, 10: 66, 11: 11, 12: $V0, 13: 71, 16: 10, 17: $V1, 19: 12, 21: 9, 23: 17, 24: $V2, 25: $V3, 26: 8, 27: 6, 28: $V4, 29: $V5, 30: $V6, 31: 5 }, o($Vn, [2, 15])],
        defaultActions: { 4: [2, 3], 21: [2, 1], 34: [2, 2] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* skip whitespace */
                        break;
                    case 1:
                        return 24;
                        break;
                    case 2:
                        return 38;
                        break;
                    case 3:
                        return 22;
                        break;
                    case 4:
                        return 20;
                        break;
                    case 5:
                        return 12;
                        break;
                    case 6:
                        return 5;
                        break;
                    case 7:
                        return yy_.yytext[0];
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:[0-9]+)/, /^(?:(==|!=|<=|>=|<|>))/, /^(?:[+\-*/%]?=)/, /^(?:(\&\&)|\|\|)/, /^(?:[a-zA-Z_][a-zA-Z0-9._]*)/, /^(?:$)/, /^(?:.)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () { return parser.parse.apply(parser, arguments); };
    exports.main = () => { };
    if ( true && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
//# sourceMappingURL=parser.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/astUtils.js":
/*!****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/astUtils.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CHILDREN = {
    ASSIGNMENT_EXPRESSION: [
        { type: "NODE", key: "right" },
    ],
    SCRIPT: [{ type: "ARRAY", key: "body" }],
    EXPRESSION_BLOCK: [{ type: "ARRAY", key: "body" }],
    UNARY_EXPRESSION: [{ type: "NODE", key: "value" }],
    NUMBER_LITERAL: [],
    IDENTIFIER: [],
    CALL_EXPRESSION: [
        { type: "ARRAY", key: "arguments" },
        { type: "NODE", key: "callee" },
    ],
    BINARY_EXPRESSION: [
        { type: "NODE", key: "left" },
        { type: "NODE", key: "right" },
    ],
    LOGICAL_EXPRESSION: [
        { type: "NODE", key: "left" },
        { type: "NODE", key: "right" },
    ],
};
function mapAst(ast, cb) {
    const children = CHILDREN[ast.type];
    let newAst = ast;
    if (children == null) {
        throw new Error(`Unknown children definition for ${ast.type}`);
    }
    children.forEach(child => {
        if (child.type === "NODE") {
            const orignalChild = ast[child.key];
            const newChild = mapAst(orignalChild, cb);
            if (newChild !== orignalChild) {
                newAst = Object.assign(Object.assign({}, newAst), { [child.key]: newChild });
            }
        }
        else if (child.type === "ARRAY") {
            const orignalChildren = ast[child.key];
            const newChildren = orignalChildren.map(originalChild => mapAst(originalChild, cb));
            const childrenHaveChanged = orignalChildren.some((child, i) => child !== newChildren[i]);
            if (childrenHaveChanged) {
                newAst = Object.assign(Object.assign({}, newAst), { [child.key]: newChildren });
            }
        }
    });
    return cb(newAst);
}
exports.mapAst = mapAst;
//# sourceMappingURL=astUtils.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/compiler.js":
/*!****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/compiler.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __webpack_require__(/*! ./parser */ "./node_modules/eel-wasm/dist/src/parser.js");
const emitter_1 = __webpack_require__(/*! ./emitter */ "./node_modules/eel-wasm/dist/src/emitter.js");
const encoding_1 = __webpack_require__(/*! ./encoding */ "./node_modules/eel-wasm/dist/src/encoding.js");
const shims_1 = __importDefault(__webpack_require__(/*! ./shims */ "./node_modules/eel-wasm/dist/src/shims.js"));
const Utils = __importStar(__webpack_require__(/*! ./utils */ "./node_modules/eel-wasm/dist/src/utils.js"));
const wasmFunctions_1 = __webpack_require__(/*! ./wasmFunctions */ "./node_modules/eel-wasm/dist/src/wasmFunctions.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/eel-wasm/dist/src/constants.js");
function compileModule({ pools, functions: funcs, eelVersion = 2, preParsed = false, }) {
    if (Object.keys(pools).includes("shims")) {
        throw new Error('You may not name a pool "shims". "shims" is reserved for injected JavaScript functions.');
    }
    // Collect all the globals that we expect to get as imports.
    const importedVars = [];
    Object.entries(pools).forEach(([poolName, pool]) => {
        pool.forEach(variableName => {
            importedVars.push([poolName, variableName]);
        });
    });
    // Ensure all the imported globals get the first ids.
    const varResolver = new Utils.ScopedIdMap();
    importedVars.forEach(([poolName, variableName]) => {
        varResolver.get(poolName, variableName);
    });
    const functionImports = Object.entries(shims_1.default).map(([name, func]) => {
        return {
            args: new Array(func.length).fill(null).map(_ => encoding_1.VAL_TYPE.f64),
            // Shims implicitly always return a number
            returns: [encoding_1.VAL_TYPE.f64],
            name,
        };
    });
    const localFuncOrder = [];
    const moduleFuncs = [];
    Object.entries(funcs).forEach(([name, { pool, code }]) => {
        if (pools[pool] == null) {
            const poolsList = Object.keys(pools);
            if (poolsList.length === 0) {
                throw new Error(`The function "${name}" was declared as using a variable ` +
                    `pool named "${pool}" but no pools were defined.`);
            }
            throw new Error(`The function "${name}" was declared as using a variable ` +
                `pool named "${pool}" which is not among the variable ` +
                `pools defined. The defined variable pools are: ` +
                `${Utils.formatList(poolsList)}.`);
        }
        const ast = preParsed ? code : parser_1.parse(code);
        if (typeof ast === "string") {
            // TODO: Change the API so this can be enforced by types
            throw new Error("Got passed unparsed code without setting the preParsed flag");
        }
        if (ast.type !== "SCRIPT") {
            throw new Error("Invalid AST");
        }
        if (ast.body.length === 0) {
            return;
        }
        const localVariables = [];
        const context = {
            resolveVar: name => {
                // The `reg00`-`reg99` variables are special in that they are shared between all pools.
                if (/^reg\d\d$/.test(name)) {
                    return varResolver.get(null, name);
                }
                return varResolver.get(pool, name);
            },
            resolveLocal: type => {
                // TODO: We could provide a way for the emitter to release a local
                // variable so that we can reuse it, much in the same way a traditional
                // compiler does in register allocation.
                localVariables.push(type);
                return localVariables.length - 1;
            },
            resolveFunc: name => {
                // If this is a shim, return the shim index.
                const shimdex = functionImports.findIndex(func => func.name === name);
                if (shimdex !== -1) {
                    const call = encoding_1.op.call(shimdex);
                    if (name === "rand" && eelVersion === 1) {
                        return [...call, encoding_1.op.f64_floor];
                    }
                    return call;
                }
                // If it's not a shim and it's not a defined function, return null.
                // The emitter will generate a nice error.
                if (wasmFunctions_1.localFuncMap[name] == null) {
                    return null;
                }
                let index = localFuncOrder.indexOf(name);
                if (index === -1) {
                    localFuncOrder.push(name);
                    index = localFuncOrder.length - 1;
                }
                return encoding_1.op.call(index + functionImports.length);
            },
            rawSource: code,
        };
        const binary = emitter_1.emit(ast, context);
        moduleFuncs.push({
            binary,
            exportName: name,
            args: [],
            returns: [],
            localVariables,
        });
    });
    const localFuncs = localFuncOrder.map(name => {
        const func = wasmFunctions_1.localFuncMap[name];
        // This check is technicaly redundant since we check inside resolveLocalFunc
        // in the compiler context. It's here just to catch potential compiler bugs.
        if (func == null) {
            throw new Error(`Undefined local function "${name}"`);
        }
        return func;
    });
    // Given a function definition, return a hashable string representation of its signature.
    const getSignatureKey = (func) => {
        return [...func.args, "|", ...func.returns].join("-");
    };
    // https://webassembly.github.io/spec/core/binary/modules.html#type-section
    const types = [];
    const typeIndexByKey = new Map();
    [...functionImports, ...localFuncs, ...moduleFuncs].forEach(func => {
        const key = getSignatureKey(func);
        if (typeIndexByKey.has(key)) {
            return;
        }
        types.push([
            encoding_1.FUNCTION_TYPE,
            ...encoding_1.encodeFlatVector(func.args),
            ...encoding_1.encodeFlatVector(func.returns),
        ]);
        typeIndexByKey.set(key, types.length - 1);
    });
    function getTypeIndex(func) {
        const key = getSignatureKey(func);
        const typeIndex = typeIndexByKey.get(key);
        if (typeIndex == null) {
            throw new Error(`Failed to get a type index for key ${key}`);
        }
        return typeIndex;
    }
    // https://webassembly.github.io/spec/core/binary/modules.html#import-section
    const imports = [
        ...importedVars.map(([namespace, name]) => {
            return [
                ...encoding_1.encodeString(namespace),
                ...encoding_1.encodeString(name),
                ...[encoding_1.GLOBAL_TYPE, encoding_1.VAL_TYPE.f64, encoding_1.MUTABILITY.var],
            ];
        }),
        ...functionImports.map((func, i) => {
            const typeIndex = getTypeIndex(func);
            return [
                ...encoding_1.encodeString("shims"),
                ...encoding_1.encodeString(func.name),
                ...[encoding_1.TYPE_IDX, ...encoding_1.unsignedLEB128(typeIndex)],
            ];
        }),
    ];
    // https://webassembly.github.io/spec/core/binary/modules.html#function-section
    //
    // > Functions are referenced through function indices, starting with the smallest
    // > index not referencing a function import.
    const functions = [...localFuncs, ...moduleFuncs].map(func => {
        const typeIndex = getTypeIndex(func);
        return encoding_1.unsignedLEB128(typeIndex);
    });
    const memories = [
        // Only one memory
        [
            0x01,
            ...encoding_1.unsignedLEB128(constants_1.WASM_MEMORY_SIZE),
            ...encoding_1.unsignedLEB128(constants_1.WASM_MEMORY_SIZE),
        ],
    ];
    // https://webassembly.github.io/spec/core/binary/modules.html#global-section
    const globalCount = varResolver.size() - importedVars.length;
    const globals = Utils.times(globalCount, () => {
        return [
            encoding_1.VAL_TYPE.f64,
            encoding_1.MUTABILITY.var,
            ...encoding_1.op.f64_const(0),
            encoding_1.op.end,
        ];
    });
    // https://webassembly.github.io/spec/core/binary/modules.html#binary-exportsec
    const xports = [...moduleFuncs].map((func, i) => {
        const funcIndex = i + functionImports.length + localFuncs.length;
        return [
            ...encoding_1.encodeString(func.exportName),
            encoding_1.EXPORT_TYPE.FUNC,
            ...encoding_1.unsignedLEB128(funcIndex),
        ];
    });
    /* Uncomment this to expose memory
    xports.push([
      ...encodeString("memory"),
      EXPORT_TYPE.MEMORY,
      ...unsignedLEB128(0),
    ]);
    */
    // https://webassembly.github.io/spec/core/binary/modules.html#code-section
    const codes = [...localFuncs, ...moduleFuncs].map(func => {
        var _a;
        // TODO: We could collapose consecutive types here, or even move to a two
        // pass approach where ids are resolved after the emitter is run.
        const localTypes = ((_a = func.localVariables) !== null && _a !== void 0 ? _a : []).map(type => {
            return [...encoding_1.unsignedLEB128(1), type];
        });
        // It's a bit odd that every other section is an array of arrays and this
        // one is an array of vectors. The spec says this is so that when navigating
        // the binary functions can be skipped efficiently.
        return encoding_1.encodeFlatVector([
            ...encoding_1.encodeNestedVector(localTypes),
            ...func.binary,
            encoding_1.op.end,
        ]);
    });
    return new Uint8Array([
        // Magic module header
        ...encoding_1.MAGIC,
        // Version number
        ...encoding_1.WASM_VERSION,
        ...encoding_1.encodeSection(encoding_1.SECTION.TYPE, types),
        ...encoding_1.encodeSection(encoding_1.SECTION.IMPORT, imports),
        ...encoding_1.encodeSection(encoding_1.SECTION.FUNC, functions),
        ...encoding_1.encodeSection(encoding_1.SECTION.MEMORY, memories),
        ...encoding_1.encodeSection(encoding_1.SECTION.GLOBAL, globals),
        ...encoding_1.encodeSection(encoding_1.SECTION.EXPORT, xports),
        ...encoding_1.encodeSection(encoding_1.SECTION.CODE, codes),
    ]);
}
exports.compileModule = compileModule;
//# sourceMappingURL=compiler.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/constants.js":
/*!*****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/constants.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// https://webassembly.github.io/spec/core/exec/runtime.html#page-size
const WASM_PAGE_SIZE = 65536;
const BYTES_PER_F64 = 8;
const BUFFER_COUNT = 2;
// https://github.com/WACUP/vis_milk2/blob/de9625a89e724afe23ed273b96b8e48496095b6c/ns-eel2/ns-eel.h#L136
exports.MAX_LOOP_COUNT = 1048576;
// The number of items allowed in each buffer (megabuf/gmegabuf).
// https://github.com/WACUP/vis_milk2/blob/de9625a89e724afe23ed273b96b8e48496095b6c/ns-eel2/ns-eel.h#L145
exports.BUFFER_SIZE = 65536 * 128;
exports.WASM_MEMORY_SIZE = Math.ceil((exports.BUFFER_SIZE * BYTES_PER_F64 * BUFFER_COUNT) / WASM_PAGE_SIZE);
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/emitter.js":
/*!***************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/emitter.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = __webpack_require__(/*! ./encoding */ "./node_modules/eel-wasm/dist/src/encoding.js");
const shims_1 = __importDefault(__webpack_require__(/*! ./shims */ "./node_modules/eel-wasm/dist/src/shims.js"));
const errorUtils_1 = __webpack_require__(/*! ./errorUtils */ "./node_modules/eel-wasm/dist/src/errorUtils.js");
const wasmFunctions_1 = __webpack_require__(/*! ./wasmFunctions */ "./node_modules/eel-wasm/dist/src/wasmFunctions.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/eel-wasm/dist/src/utils.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/eel-wasm/dist/src/constants.js");
function emit(ast, context) {
    var _a, _b, _c;
    switch (ast.type) {
        case "SCRIPT": {
            const body = ast.body.map((statement, i) => {
                return [...emit(statement, context), encoding_1.op.drop];
            });
            return utils_1.flatten(body);
        }
        case "EXPRESSION_BLOCK": {
            return emitExpressionBlock(ast.body, context);
        }
        case "BINARY_EXPRESSION": {
            const left = emit(ast.left, context);
            const right = emit(ast.right, context);
            const operatorToOps = {
                "+": [encoding_1.op.f64_add],
                "-": [encoding_1.op.f64_sub],
                "*": [encoding_1.op.f64_mul],
                "/": context.resolveFunc("div"),
                "%": context.resolveFunc("mod"),
                "|": context.resolveFunc("bitwiseOr"),
                "&": context.resolveFunc("bitwiseAnd"),
                "^": context.resolveFunc("pow"),
                // Comparison operators
                "==": [encoding_1.op.f64_sub, ...encoding_1.IS_ZEROISH, encoding_1.op.f64_convert_i32_s],
                "!=": [encoding_1.op.f64_sub, ...encoding_1.IS_NOT_ZEROISH, encoding_1.op.f64_convert_i32_s],
                "<": [encoding_1.op.f64_lt, encoding_1.op.f64_convert_i32_s],
                ">": [encoding_1.op.f64_gt, encoding_1.op.f64_convert_i32_s],
                "<=": [encoding_1.op.f64_le, encoding_1.op.f64_convert_i32_s],
                ">=": [encoding_1.op.f64_ge, encoding_1.op.f64_convert_i32_s],
            };
            const code = operatorToOps[ast.operator];
            if (code == null) {
                throw errorUtils_1.createCompilerError(`Unknown binary expression operator ${ast.operator}`, ast.loc, context.rawSource);
            }
            return [...left, ...right, ...code];
        }
        case "CALL_EXPRESSION": {
            const functionName = ast.callee.value;
            // Destructure this so that TypeScript knows it won't get mutated.
            const argList = ast.arguments;
            const assertArity = (arity) => {
                if (argList.length < arity) {
                    throw errorUtils_1.createUserError(`Too few arguments passed to \`${functionName}()\`. Expected ${arity} but only got ${argList.length}.`, ast.loc, context.rawSource);
                }
                if (argList.length > arity) {
                    throw errorUtils_1.createUserError(`Too many arguments passed to \`${functionName}()\`. Expected ${arity} but got ${argList.length}.`, argList[arity].loc, context.rawSource);
                }
            };
            // Some functions have special behavior
            switch (functionName) {
                case "exec2":
                    assertArity(2);
                    return emitExpressionBlock(ast.arguments, context);
                case "exec3":
                    assertArity(3);
                    return emitExpressionBlock(ast.arguments, context);
                case "if":
                    assertArity(3);
                    const [test, consiquent, alternate] = ast.arguments;
                    return emitConditional(test, consiquent, alternate, context);
                case "while":
                    assertArity(1);
                    return emitWhile(ast.arguments[0], context);
                case "loop":
                    assertArity(2);
                    return emitLoop(ast.arguments[0], ast.arguments[1], context);
                case "megabuf":
                case "gmegabuf":
                    assertArity(1);
                    const index = context.resolveLocal(encoding_1.VAL_TYPE.i32);
                    return [
                        ...emit(ast.arguments[0], context),
                        ...((_a = context.resolveFunc("_getBufferIndex")) !== null && _a !== void 0 ? _a : []),
                        ...encoding_1.op.local_tee(index),
                        ...encoding_1.op.i32_const(-1),
                        encoding_1.op.i32_ne,
                        // STACK: [in range]
                        ...encoding_1.op.if(encoding_1.BLOCK.f64),
                        ...encoding_1.op.local_get(index),
                        ...encoding_1.op.f64_load(3, emitAddMemoryOffset(functionName)),
                        encoding_1.op.else,
                        ...encoding_1.op.f64_const(0),
                        encoding_1.op.end,
                    ];
                case "assign":
                    assertArity(2);
                    const variableIdentifier = ast.arguments[0];
                    if (variableIdentifier.type != "IDENTIFIER") {
                        throw errorUtils_1.createUserError("Expected the first argument of `assign()` to be an identifier.", variableIdentifier.loc, context.rawSource);
                    }
                    const resolvedName = context.resolveVar(variableIdentifier.value);
                    return [
                        ...emit(ast.arguments[1], context),
                        ...encoding_1.op.global_set(resolvedName),
                        ...encoding_1.op.global_get(resolvedName),
                    ];
            }
            // Function calls which can be linlined
            const args = utils_1.flatten(ast.arguments.map(node => emit(node, context)));
            // This is just a continuation of the above switch statement, but it's for functions which all parse their args the same.
            switch (functionName) {
                case "abs":
                    assertArity(1);
                    return [...args, encoding_1.op.f64_abs];
                case "sqrt":
                    assertArity(1);
                    return [...args, encoding_1.op.f64_abs, encoding_1.op.f64_sqrt];
                case "int":
                    assertArity(1);
                    return [...args, encoding_1.op.f64_floor];
                case "min":
                    assertArity(2);
                    return [...args, encoding_1.op.f64_min];
                case "max":
                    assertArity(2);
                    return [...args, encoding_1.op.f64_max];
                case "above":
                    assertArity(2);
                    return [...args, encoding_1.op.f64_gt, encoding_1.op.f64_convert_i32_s];
                case "below":
                    assertArity(2);
                    return [...args, encoding_1.op.f64_lt, encoding_1.op.f64_convert_i32_s];
                case "equal":
                    assertArity(2);
                    return [...args, encoding_1.op.f64_sub, ...encoding_1.IS_ZEROISH, encoding_1.op.f64_convert_i32_s];
                case "bnot":
                    assertArity(1);
                    return [...args, ...encoding_1.IS_ZEROISH, encoding_1.op.f64_convert_i32_s];
                case "floor":
                    assertArity(1);
                    return [...args, encoding_1.op.f64_floor];
                case "ceil":
                    assertArity(1);
                    return [...args, encoding_1.op.f64_ceil];
            }
            const invocation = context.resolveFunc(functionName);
            if (invocation == null ||
                // Ensure this isn't a private function. This is a bit awkward becuase
                // Eel does implement some _ functions but while they are _intended_ to be
                // private, they accidentally expose them. We should find a cleaner way
                // to defining user accessible functions vs utility functions used by
                // the compiler.
                functionName.startsWith("_")) {
                throw errorUtils_1.createUserError(`"${functionName}" is not defined.`, ast.callee.loc, context.rawSource);
            }
            if (shims_1.default[functionName] != null) {
                assertArity(shims_1.default[functionName].length);
            }
            else if (wasmFunctions_1.localFuncMap[functionName] != null) {
                assertArity(wasmFunctions_1.localFuncMap[functionName].args.length);
            }
            else {
                throw errorUtils_1.createCompilerError(`Missing arity information for the function \`${functionName}()\``, ast.callee.loc, context.rawSource);
            }
            return [...args, ...invocation];
        }
        case "ASSIGNMENT_EXPRESSION": {
            const { left } = ast;
            const rightCode = emit(ast.right, context);
            const mutationCode = getAssignmentOperatorMutation(ast, context);
            if (left.type === "IDENTIFIER") {
                const resolvedName = context.resolveVar(left.value);
                // TODO: In lots of cases we don't care about the return value. In those
                // cases we should try to find a way to omit the `get/drop` combo.
                // Peephole optimization seems to be the conventional way to do this.
                // https://en.wikipedia.org/wiki/Peephole_optimization
                const get = encoding_1.op.global_get(resolvedName);
                const set = encoding_1.op.global_set(resolvedName);
                // `=` is a special case in that it does not need the original value.
                if (mutationCode === null) {
                    return [...rightCode, ...set, ...get];
                }
                return [...get, ...rightCode, ...mutationCode, ...set, ...get];
            }
            if (left.type !== "CALL_EXPRESSION") {
                throw errorUtils_1.createCompilerError(
                // @ts-ignore This is a guard in case the parser has an error
                `Unexpected left hand side type for assignment: ${left.type}`, ast.loc, context.rawSource);
            }
            // Special assignment case for `megabuf(n) = e` and `gmegabuf(n) = e`.
            const localIndex = context.resolveLocal(encoding_1.VAL_TYPE.i32);
            if (left.arguments.length !== 1) {
                throw errorUtils_1.createUserError(`Expected 1 argument when assinging to a buffer but got ${left.arguments.length}.`, left.arguments.length === 0 ? left.loc : left.arguments[1].loc, context.rawSource);
            }
            const bufferName = left.callee.value;
            if (bufferName !== "gmegabuf" && bufferName !== "megabuf") {
                throw errorUtils_1.createUserError("The only function calls which may be assigned to are `gmegabuf()` and `megabuf()`.", left.callee.loc, context.rawSource);
            }
            const addOffset = emitAddMemoryOffset(bufferName);
            if (mutationCode === null) {
                // TODO: Move this to wasmFunctions once we know how to call functions
                // from within functions (need to get the offset).
                const unnormalizedIndex = context.resolveLocal(encoding_1.VAL_TYPE.i32);
                const rightValue = context.resolveLocal(encoding_1.VAL_TYPE.f64);
                return [
                    // Emit the right hand side unconditionally to ensure it always runs.
                    ...rightCode,
                    ...encoding_1.op.local_set(rightValue),
                    ...emit(left.arguments[0], context),
                    ...((_b = context.resolveFunc("_getBufferIndex")) !== null && _b !== void 0 ? _b : []),
                    ...encoding_1.op.local_tee(unnormalizedIndex),
                    ...encoding_1.op.i32_const(0),
                    encoding_1.op.i32_lt_s,
                    // STACK: [is the index out of range?]
                    ...encoding_1.op.if(encoding_1.BLOCK.f64),
                    ...encoding_1.op.f64_const(0),
                    encoding_1.op.else,
                    ...encoding_1.op.local_get(unnormalizedIndex),
                    ...encoding_1.op.local_tee(localIndex),
                    // STACK: [buffer index]
                    ...encoding_1.op.local_get(rightValue),
                    // STACK: [buffer index, right]
                    ...encoding_1.op.f64_store(3, addOffset),
                    // STACK: []
                    ...encoding_1.op.local_get(rightValue),
                    // STACK: [Right/Buffer value]
                    encoding_1.op.end,
                ];
            }
            // TODO: Move this to wasmFunctions once we know how to call functions
            // from within functions (need to get the offset).
            const index = context.resolveLocal(encoding_1.VAL_TYPE.i32);
            const inBounds = context.resolveLocal(encoding_1.VAL_TYPE.i32);
            const rightValue = context.resolveLocal(encoding_1.VAL_TYPE.f64);
            const result = context.resolveLocal(encoding_1.VAL_TYPE.f64);
            return [
                ...rightCode,
                ...encoding_1.op.local_set(rightValue),
                ...emit(left.arguments[0], context),
                ...((_c = context.resolveFunc("_getBufferIndex")) !== null && _c !== void 0 ? _c : []),
                ...encoding_1.op.local_tee(index),
                // STACK: [index]
                ...encoding_1.op.i32_const(-1),
                encoding_1.op.i32_ne,
                ...encoding_1.op.local_tee(inBounds),
                ...encoding_1.op.if(encoding_1.BLOCK.f64),
                ...encoding_1.op.local_get(index),
                ...encoding_1.op.f64_load(3, addOffset),
                encoding_1.op.else,
                ...encoding_1.op.f64_const(0),
                encoding_1.op.end,
                // STACK: [current value from memory || 0]
                // Apply the mutation
                ...encoding_1.op.local_get(rightValue),
                ...mutationCode,
                ...encoding_1.op.local_tee(result),
                // STACK: [new value]
                ...encoding_1.op.local_get(inBounds),
                ...encoding_1.op.if(encoding_1.BLOCK.void),
                ...encoding_1.op.local_get(index),
                ...encoding_1.op.local_get(result),
                ...encoding_1.op.f64_store(3, addOffset),
                encoding_1.op.end,
            ];
        }
        case "LOGICAL_EXPRESSION": {
            const left = emit(ast.left, context);
            const right = emit(ast.right, context);
            const behaviorMap = {
                "&&": {
                    comparison: encoding_1.IS_ZEROISH,
                    shortCircutValue: 0,
                },
                "||": {
                    comparison: encoding_1.IS_NOT_ZEROISH,
                    shortCircutValue: 1,
                },
            };
            const behavior = behaviorMap[ast.operator];
            if (behavior == null) {
                throw errorUtils_1.createCompilerError(`Unknown logical expression operator ${ast.operator}`, ast.loc, context.rawSource);
            }
            const { comparison, shortCircutValue } = behavior;
            return [
                ...left,
                ...comparison,
                ...encoding_1.op.if(encoding_1.BLOCK.f64),
                ...encoding_1.op.f64_const(shortCircutValue),
                encoding_1.op.else,
                ...right,
                ...encoding_1.IS_NOT_ZEROISH,
                encoding_1.op.f64_convert_i32_s,
                encoding_1.op.end,
            ];
        }
        case "UNARY_EXPRESSION": {
            const value = emit(ast.value, context);
            const operatorToCode = {
                "-": [encoding_1.op.f64_neg],
                "+": [],
                "!": [...encoding_1.IS_ZEROISH, encoding_1.op.f64_convert_i32_s],
            };
            const code = operatorToCode[ast.operator];
            if (code == null) {
                throw errorUtils_1.createCompilerError(`Unknown logical unary operator ${ast.operator}`, ast.loc, context.rawSource);
            }
            return [...value, ...code];
        }
        case "IDENTIFIER":
            const variableName = ast.value;
            // TODO: It's a bit odd that not every IDENTIFIER node gets emitted. In
            // function calls and assignments we just peek at the name and never emit
            // it.
            return encoding_1.op.global_get(context.resolveVar(variableName));
        case "NUMBER_LITERAL":
            return encoding_1.op.f64_const(ast.value);
        default:
            throw errorUtils_1.createCompilerError(
            // @ts-ignore This runtime check is here because the caller may not be type-checked
            `Unknown AST node type ${ast.type}`, 
            // @ts-ignore This runtime check is here because the caller may not be type-checked
            ast.loc, context.rawSource);
    }
}
exports.emit = emit;
function emitExpressionBlock(body, context) {
    const statements = body.map((statement, i) => {
        return emit(statement, context);
    });
    return utils_1.flatten(utils_1.arrayJoin(statements, [encoding_1.op.drop]));
}
function emitWhile(expression, context) {
    const body = emit(expression, context);
    const iterationCount = context.resolveLocal(encoding_1.VAL_TYPE.i32);
    return [
        ...encoding_1.op.i32_const(0),
        ...encoding_1.op.local_set(iterationCount),
        ...encoding_1.op.loop(encoding_1.BLOCK.void),
        // Increment and check loop count
        ...encoding_1.op.local_get(iterationCount),
        ...encoding_1.op.i32_const(1),
        encoding_1.op.i32_add,
        ...encoding_1.op.local_tee(iterationCount),
        // STACK: [iteration count]
        ...encoding_1.op.i32_const(constants_1.MAX_LOOP_COUNT),
        encoding_1.op.i32_lt_u,
        // STACK: [loop in range]
        ...body,
        ...encoding_1.IS_NOT_ZEROISH,
        // STACK: [loop in range, body is truthy]
        encoding_1.op.i32_and,
        // STACK: [can continue]
        ...encoding_1.op.br_if(0),
        encoding_1.op.end,
        ...encoding_1.op.f64_const(0),
    ];
}
function emitLoop(count, expression, context) {
    const body = emit(expression, context);
    const localIndex = context.resolveLocal(encoding_1.VAL_TYPE.i32);
    return [
        ...encoding_1.op.block(encoding_1.BLOCK.void),
        // Assign the count to a variable
        ...emit(count, context),
        encoding_1.op.i32_trunc_f64_s,
        ...encoding_1.op.local_tee(localIndex),
        ...encoding_1.op.i32_const(0),
        encoding_1.op.i32_le_s,
        ...encoding_1.op.br_if(1),
        ...encoding_1.op.loop(encoding_1.BLOCK.void),
        // Run the body
        ...body,
        encoding_1.op.drop,
        // Decrement the count
        ...encoding_1.op.local_get(localIndex),
        ...encoding_1.op.i32_const(1),
        encoding_1.op.i32_sub,
        ...encoding_1.op.local_tee(localIndex),
        ...encoding_1.op.i32_const(0),
        encoding_1.op.i32_ne,
        ...encoding_1.op.br_if(0),
        encoding_1.op.end,
        encoding_1.op.end,
        ...encoding_1.op.f64_const(0),
    ];
}
function emitConditional(test, consiquent, alternate, context) {
    // TODO: In some cases https://webassembly.studio/ compiles these to use `select`.
    // Is that an optimization that we might want as well?
    return [
        ...emit(test, context),
        ...encoding_1.IS_NOT_ZEROISH,
        ...encoding_1.op.if(encoding_1.BLOCK.f64),
        ...emit(consiquent, context),
        encoding_1.op.else,
        ...emit(alternate, context),
        encoding_1.op.end,
    ];
}
// There are two sections of memory. This function emits code to add the correct
// offset to an i32 index already on the stack.
function emitAddMemoryOffset(name) {
    switch (name) {
        case "gmegabuf":
            return constants_1.BUFFER_SIZE * 8;
        case "megabuf":
            return 0;
    }
}
function getAssignmentOperatorMutation(ast, context) {
    const operatorToCode = {
        "+=": [encoding_1.op.f64_add],
        "-=": [encoding_1.op.f64_sub],
        "*=": [encoding_1.op.f64_mul],
        "/=": [encoding_1.op.f64_div],
        "%=": context.resolveFunc("mod"),
        "=": null,
    };
    const operatorCode = operatorToCode[ast.operator];
    if (operatorCode === undefined) {
        throw errorUtils_1.createCompilerError(`Unknown assignment operator "${ast.operator}"`, ast.loc, context.rawSource);
    }
    return operatorCode;
}
//# sourceMappingURL=emitter.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/encoding.js":
/*!****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/encoding.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ieee754 = __importStar(__webpack_require__(/*! ./ieee754 */ "./node_modules/eel-wasm/dist/src/ieee754.js"));
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/eel-wasm/dist/src/utils.js");
exports.MAGIC = [0x00, 0x61, 0x73, 0x6d];
exports.WASM_VERSION = [0x01, 0x00, 0x00, 0x00];
exports.EPSILON = 0.00001;
// An intial attempt to construct a Wasm binary by hand.
/*
0	custom section
1	type section
2	import section
3	function section
4	table section
5	memory section
6	global section
7	export section
8	start section
9	element section
10	code section
11	data section
*/
// https://webassembly.github.io/spec/core/binary/modules.html#sections
exports.SECTION = {
    TYPE: 1,
    IMPORT: 2,
    FUNC: 3,
    MEMORY: 5,
    GLOBAL: 6,
    EXPORT: 7,
    CODE: 10,
};
exports.EXPORT_TYPE = {
    FUNC: 0x00,
    TABLE: 0x01,
    MEMORY: 0x02,
    GLOBAL: 0x03,
};
exports.op = {
    /*
     * Control Instructions
     * https://webassembly.github.io/spec/core/binary/instructions.html#control-instructions
     */
    // unreachable: 0x00,
    // nop: 0x01,
    block: (blockType) => [0x02, blockType],
    loop: (blockType) => [0x03, blockType],
    if: (retType) => [0x04, retType],
    else: 0x05,
    end: 0x0b,
    // br: (i: number) => [0x0c, ...signedLEB128(i)],
    br_if: (i) => [0x0d, ...unsignedLEB128(i)],
    // br_table: 0x0d,
    // return: 0x0f,
    call: (i) => [0x10, ...unsignedLEB128(i)],
    // call_indirect: 0x11,
    /*
     * Parametric Instructions
     * https://webassembly.github.io/spec/core/binary/instructions.html#parametric-instructions
     */
    drop: 0x1a,
    select: 0x1b,
    /*
     * Variable Instructions
     * https://webassembly.github.io/spec/core/binary/instructions.html#variable-instructions
     */
    local_get: (i) => [0x20, ...unsignedLEB128(i)],
    local_set: (i) => [0x21, ...unsignedLEB128(i)],
    local_tee: (i) => [0x22, ...unsignedLEB128(i)],
    global_get: (i) => [0x23, ...unsignedLEB128(i)],
    global_set: (i) => [0x24, ...unsignedLEB128(i)],
    /*
     * Memory Instructions
     * https://webassembly.github.io/spec/core/binary/instructions.html#memory-instructions
     */
    f64_load: (align, offset) => [
        0x2b,
        ...unsignedLEB128(align),
        ...unsignedLEB128(offset),
    ],
    f64_store: (align, offset) => [
        0x39,
        ...unsignedLEB128(align),
        ...unsignedLEB128(offset),
    ],
    /*
     * Numeric Instructions
     * https://webassembly.github.io/spec/core/binary/instructions.html#numeric-instructions
     */
    i32_const: (i) => [0x41, ...signedLEB128(i)],
    // i64_const: 0x42,
    // f32_const: 0x43,
    f64_const: (i) => [0x44, ...encodef64(i)],
    i32_eqz: 0x45,
    // i32_eq: 0x46,
    i32_ne: 0x47,
    i32_lt_s: 0x48,
    i32_lt_u: 0x49,
    i32_gt_s: 0x4a,
    // i32_gt_u: 0x4b,
    i32_le_s: 0x4c,
    i32_le_u: 0x4d,
    i32_ge_s: 0x4e,
    // i32_ge_u: 0x4f,
    // [0x50...0x5a] i64
    // [0x5b...0x60] f32
    f64_eq: 0x61,
    f64_ne: 0x62,
    f64_lt: 0x63,
    f64_gt: 0x64,
    f64_le: 0x65,
    f64_ge: 0x66,
    // i32_clz: 0x67,
    // i32_ctz: 0x68,
    // i32_popcnt: 0x69,
    i32_add: 0x6a,
    i32_sub: 0x6b,
    i32_mul: 0x6c,
    // i32_div_s: 0x6d,
    // i32_div_u: 0x6e,
    i32_rem_s: 0x6f,
    // i32_rem_u: 0x70,
    i32_and: 0x71,
    i32_or: 0x72,
    // [0x73...0x78] More i32
    // [0x79...0x8a] More i64
    i64_rem_s: 0x81,
    i64_and: 0x83,
    i64_or: 0x84,
    // [0x8b...0x98] More f32
    f64_abs: 0x99,
    f64_neg: 0x9a,
    f64_ceil: 0x9b,
    f64_floor: 0x9c,
    // f64_trunc: 0x9d,
    // f64_nearest: 0x9e,
    f64_sqrt: 0x9f,
    f64_add: 0xa0,
    f64_sub: 0xa1,
    f64_mul: 0xa2,
    f64_div: 0xa3,
    f64_min: 0xa4,
    f64_max: 0xa5,
    // f64_copysign: 0xa6,
    i32_trunc_f64_s: 0xaa,
    i32_trunc_f64_u: 0xab,
    i64_trunc_s_f64: 0xb0,
    f64_convert_i64_s: 0xb9,
    f64_convert_i32_s: 0xb7,
};
// https://webassembly.github.io/spec/core/binary/instructions.html#binary-blocktype
exports.VAL_TYPE = {
    i32: 0x7f,
    i64: 0x7e,
    f32: 0x7d,
    f64: 0x7c,
};
exports.MUTABILITY = {
    const: 0x00,
    var: 0x01,
};
exports.BLOCK = {
    void: 0x40,
    i32: 0x7f,
    i64: 0x7e,
    f32: 0x7d,
    f64: 0x7c,
};
// http://webassembly.github.io/spec/core/binary/types.html#function-types
exports.FUNCTION_TYPE = 0x60;
// I think these might actually be specific to importdesc
exports.MEMORY_IDX = 0x02;
exports.GLOBAL_TYPE = 0x03;
exports.TYPE_IDX = 0x00;
// Takes an f64 on the stack and leaves an int32 boolean representing if it's
// within epsilon of zero.
exports.IS_ZEROISH = [
    exports.op.f64_abs,
    ...exports.op.f64_const(exports.EPSILON),
    exports.op.f64_lt,
];
exports.IS_NOT_ZEROISH = [
    exports.op.f64_abs,
    ...exports.op.f64_const(exports.EPSILON),
    exports.op.f64_gt,
];
// f64
function encodef64(num) {
    const arr = new Uint8Array(8);
    ieee754.write(arr, num);
    return arr;
}
exports.encodef64 = encodef64;
exports.encodeString = (str) => [str.length].concat(str.split("").map(s => s.charCodeAt(0)));
function unsignedLEB128(n) {
    const buffer = [];
    do {
        let byte = n & 0x7f;
        n >>>= 7;
        if (n !== 0) {
            byte |= 0x80;
        }
        buffer.push(byte);
    } while (n !== 0);
    return buffer;
}
exports.unsignedLEB128 = unsignedLEB128;
// https://github.com/shmishtopher/wasm-LEB128/blob/2f1039636e758293e571f996e8012c4d69f4b58f/lib/index.js#L6
function signedLEB128(value) {
    let bytes = [];
    let byte = 0x00;
    let size = Math.ceil(Math.log2(Math.abs(value)));
    let negative = value < 0;
    let more = true;
    while (more) {
        byte = value & 127;
        value = value >> 7;
        if (negative) {
            value = value | -(1 << (size - 7));
        }
        if ((value == 0 && (byte & 0x40) == 0) ||
            (value == -1 && (byte & 0x40) == 0x40)) {
            more = false;
        }
        else {
            byte = byte | 128;
        }
        bytes.push(byte);
    }
    return bytes;
}
exports.signedLEB128 = signedLEB128;
// https://webassembly.github.io/spec/core/binary/conventions.html#binary-vec
// Vectors are encoded with their length followed by their element sequence
exports.encodeFlatVector = (data) => unsignedLEB128(data.length).concat(data);
exports.encodeNestedVector = (data) => unsignedLEB128(data.length).concat(utils_1.flatten(data));
// subSections is an array of arrays
function encodeSection(type, subSections) {
    // Sections are all optional, so if we get an empty vector of subSections, we
    // can omit the whole section.
    if (subSections.length === 0) {
        return [];
    }
    // The size of this vector is not needed for decoding, but can be
    // used to skip sections when navigating through a binary.
    // TODO: Remove this assertion once we are more confident in our output.
    const vec = exports.encodeFlatVector(exports.encodeNestedVector(subSections));
    vec.unshift(type);
    return vec;
}
exports.encodeSection = encodeSection;
//# sourceMappingURL=encoding.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/envParser.js":
/*!*****************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/envParser.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// This module is in charge of selecting either the pre-built module or the one
// that builds it a runtime with jison.
let parserImpl = __webpack_require__(/*! ../build/parser */ "./node_modules/eel-wasm/dist/build/parser.js");
/*
let parserImpl = null;
// Always use the dynamic one, while we figure out why the built one doens't work.
if (process.env.NODE_ENV === "production") {
  parserImpl = require("../build/parser");
} else {
  parserImpl = require("../tools/buildParser");
}
*/
module.exports = { parse: parserImpl.parse };
//# sourceMappingURL=envParser.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/errorUtils.js":
/*!******************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/errorUtils.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/eel-wasm/dist/src/utils.js");
/* Build up a string showing a formatted source location in context with line numbers.
 *
 *   2 | z = sqr(y, 10);
 * > 3 | x = wat();
 *     |     ^^^
 *   4 | y = 100;
 */
function printLoc(loc, rawSource, contextLines = 1) {
    const firstIndex = Math.max(loc.first_line - 1 - contextLines, 0);
    const lastIndex = loc.last_line + contextLines;
    const sourceLines = rawSource.split("\n").slice(firstIndex, lastIndex);
    const annotatedLines = sourceLines.map((line, i) => {
        const lineNumber = i + firstIndex + 1;
        const inRange = lineNumber >= loc.first_line && lineNumber <= loc.last_line;
        const gutter = inRange ? ">" : " ";
        return `${gutter} ${lineNumber} | ${line}`;
    });
    if (loc.first_line === loc.last_line) {
        const padding = utils_1.repeat(loc.first_column, " ");
        const underline = utils_1.repeat(loc.last_column - loc.first_column, "^");
        const insertIndex = loc.first_line - firstIndex;
        annotatedLines.splice(insertIndex, 0, `    | ${padding}${underline}`);
    }
    return annotatedLines.join("\n");
}
exports.printLoc = printLoc;
class CompilerError extends Error {
    constructor(message, loc, rawSource) {
        super(message);
        // TODO: Create an error message that encourages users to open an issue at
        // https://github.com/captbaritone/eel-wasm/issues is they see this, and gives
        // Them an easy way to attach the right context.
        this.sourceContext = printLoc(loc, rawSource);
        this.loc = loc;
    }
}
class UserError extends CompilerError {
}
function createUserError(message, loc, rawSource) {
    return new UserError(message, loc, rawSource);
}
exports.createUserError = createUserError;
function createCompilerError(message, loc, rawSource) {
    return new CompilerError(message, loc, rawSource);
}
exports.createCompilerError = createCompilerError;
//# sourceMappingURL=errorUtils.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/ieee754.js":
/*!***************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/ieee754.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copied from https://github.com/feross/ieee754/blob/master/index.js
function write(buffer, value) {
    // Originally these four were arguments, but we only ever use it like this.
    const offset = 0;
    const isLE = true;
    let mLen = 52;
    const nBytes = 8;
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    }
    else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        }
        else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        }
        else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        }
        else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) { }
    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) { }
    buffer[offset + i - d] |= s * 128;
}
exports.write = write;
//# sourceMappingURL=ieee754.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __webpack_require__(/*! ./parser */ "./node_modules/eel-wasm/dist/src/parser.js");
exports.parse = parser_1.parse;
const compiler_1 = __webpack_require__(/*! ./compiler */ "./node_modules/eel-wasm/dist/src/compiler.js");
exports.compileModule = compiler_1.compileModule;
const shims_1 = __importDefault(__webpack_require__(/*! ./shims */ "./node_modules/eel-wasm/dist/src/shims.js"));
exports.shims = shims_1.default;
const loader_1 = __webpack_require__(/*! ./loader */ "./node_modules/eel-wasm/dist/src/loader.js");
exports.loadModule = loader_1.loadModule;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/loader.js":
/*!**************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/loader.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shims_1 = __importDefault(__webpack_require__(/*! ./shims */ "./node_modules/eel-wasm/dist/src/shims.js"));
const compiler_1 = __webpack_require__(/*! ./compiler */ "./node_modules/eel-wasm/dist/src/compiler.js");
async function loadModule({ pools, functions, eelVersion = 2, }) {
    let compilerPools = {};
    Object.entries(pools).forEach(([key, globals]) => {
        compilerPools[key] = new Set(Object.keys(globals));
    });
    const buffer = compiler_1.compileModule({
        pools: compilerPools,
        functions,
        eelVersion,
    });
    const mod = await WebAssembly.compile(buffer);
    var importObject = Object.assign(Object.assign({}, pools), { shims: shims_1.default });
    return await WebAssembly.instantiate(mod, importObject);
}
exports.loadModule = loadModule;
//# sourceMappingURL=loader.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/parser.js":
/*!**************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/parser.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const preProcessor_1 = __webpack_require__(/*! ./preProcessor */ "./node_modules/eel-wasm/dist/src/preProcessor.js");
const envParser_1 = __webpack_require__(/*! ./envParser */ "./node_modules/eel-wasm/dist/src/envParser.js");
const astUtils_1 = __webpack_require__(/*! ./astUtils */ "./node_modules/eel-wasm/dist/src/astUtils.js");
const errorUtils_1 = __webpack_require__(/*! ./errorUtils */ "./node_modules/eel-wasm/dist/src/errorUtils.js");
function mapLoc(loc, mapper) {
    const first = preProcessor_1.getLoc(mapper, loc.first_column);
    const last = preProcessor_1.getLoc(mapper, loc.last_column);
    return {
        first_column: first.column,
        last_column: last.column,
        first_line: first.line,
        last_line: last.line,
    };
}
function parse(code) {
    const [processedCode, mapper] = preProcessor_1.preProcess(code);
    try {
        const ast = envParser_1.parse(processedCode);
        return astUtils_1.mapAst(ast, (node) => {
            if (node.loc.first_line !== 1 || node.loc.last_line != 1) {
                throw errorUtils_1.createCompilerError("Unexpected multiline", node.loc, code);
            }
            return Object.assign(Object.assign({}, node), { loc: mapLoc(node.loc, mapper) });
        });
    }
    catch (e) {
        if (e.hash == null) {
            throw e;
        }
        throw errorUtils_1.createUserError(`Parse Error: ${e.message.split("\n")[3]}`, mapLoc(e.hash.loc, mapper), code);
    }
}
exports.parse = parse;
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/preProcessor.js":
/*!********************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/preProcessor.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getLoc(mapper, destCol) {
    let previousAnchor = { destCol: 1, srcCol: 1, srcLine: 1 };
    // Find the last anchor with a destCol > destCol.
    // Reversed: Find the first anchor with a destCol <= destCol
    // TODO: Use binary search
    mapper.forEach(anchor => {
        if (anchor.destCol > destCol) {
            return;
        }
        previousAnchor = anchor;
    });
    const remainingColumns = destCol - previousAnchor.destCol;
    return {
        column: previousAnchor.srcCol + remainingColumns,
        line: previousAnchor.srcLine,
    };
}
exports.getLoc = getLoc;
// Started with this function: https://github.com/WACUP/vis_milk2/blob/cc2e85aed44373d0b6b2115c0806ec035856860a/vis_milk2/state.cpp#L1532-L1557
function preProcess(src) {
    const mapper = [];
    let srcLine = 1;
    let dest = "";
    let lineStart = 0;
    let inlineComment = false;
    let blockComment = false;
    let emitAnchor = false;
    for (let i = 0; i < src.length; i++) {
        const char = src[i];
        if (emitAnchor) {
            const destCol = dest.length + 1;
            const srcCol = i - lineStart + 1;
            mapper.push({ destCol, srcCol, srcLine });
            emitAnchor = false;
        }
        if (char === "\n") {
            inlineComment = false;
            srcLine++;
            lineStart = i + 1;
            emitAnchor = true;
        }
        else if (char === "\r" && src[i + 1] === "\n") {
            i++;
            inlineComment = false;
            srcLine++;
            lineStart = i + 1;
            emitAnchor = true;
        }
        else if (blockComment && char === "*" && src[i + 1] === "/") {
            // TODO: What if we are not currently in a block comment?
            blockComment = false;
            i++;
            emitAnchor = true;
        }
        else if ((char === "\\" && src[i + 1] === "\\") ||
            (char === "/" && src[i + 1] === "/")) {
            inlineComment = true;
            i++;
        }
        else if (char === "/" && src[i + 1] === "*") {
            blockComment = true;
            i++;
        }
        else if (!inlineComment && !blockComment) {
            dest += char;
        }
    }
    return [dest, mapper];
}
exports.preProcess = preProcess;
//# sourceMappingURL=preProcessor.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/shims.js":
/*!*************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/shims.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EPSILON = 0.00001;
const shims = {
    // TODO: Reimplement some of these functions natively in Wasm?
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    atan2: Math.atan2,
    rand: a => Math.random() * a,
    pow: Math.pow,
    log: Math.log,
    log10: Math.log10,
    exp: Math.exp,
    sigmoid: function (x, y) {
        const t = 1 + Math.exp(-x * y);
        return Math.abs(t) > EPSILON ? 1.0 / t : 0;
    },
};
exports.default = shims;
//# sourceMappingURL=shims.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/utils.js":
/*!*************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/utils.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function arrayJoin(arr, joiner) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
        const last = i === arr.length - 1;
        if (!last) {
            newArr.push(joiner);
        }
    }
    return newArr;
}
exports.arrayJoin = arrayJoin;
function flatten(arr) {
    return [].concat.apply([], arr);
}
exports.flatten = flatten;
function times(n, cb) {
    return new Array(n).fill(null).map((_, i) => cb(i));
}
exports.times = times;
function repeat(n, char) {
    return new Array(n).fill(char).join("");
}
exports.repeat = repeat;
// Maintain an ordered list of indexes for namespace/key pairs.
// In Wasm binary variables are referenced by their index. In our emitter we
// want to emit variables indexes as we encounter their names. This data
// structure lets us issue variable indexes on demmand and then iterate through
// them post facto.
//
// `null` may be passed for the namespace argument in order to get a global
// variable that exists in all namespaces.
class ScopedIdMap {
    constructor() {
        this._map = new Map();
    }
    // Get the index of a given namespace/key pair
    get(namespace, key) {
        const jointKey = namespace == null ? key : `${namespace}::${key}`;
        if (!this._map.has(jointKey)) {
            this._map.set(jointKey, this._map.size);
        }
        // @ts-ignore We know the key is here.
        return this._map.get(jointKey);
    }
    size() {
        return this._map.size;
    }
}
exports.ScopedIdMap = ScopedIdMap;
function formatList(list) {
    if (list.length === 0) {
        throw new Error("Cannot format an empty list");
    }
    if (list.length === 1) {
        return list[0];
    }
    const quoted = list.map(name => `"${name}"`);
    const last = quoted.pop();
    return quoted.join(", ") + ` and ${last}`;
}
exports.formatList = formatList;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/eel-wasm/dist/src/wasmFunctions.js":
/*!*********************************************************!*\
  !*** ./node_modules/eel-wasm/dist/src/wasmFunctions.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = __webpack_require__(/*! ./encoding */ "./node_modules/eel-wasm/dist/src/encoding.js");
const constants_1 = __webpack_require__(/*! ./constants */ "./node_modules/eel-wasm/dist/src/constants.js");
exports.localFuncMap = {
    sqr: {
        args: [encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [...encoding_1.op.local_get(0), ...encoding_1.op.local_get(0), encoding_1.op.f64_mul],
    },
    bor: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [
            ...encoding_1.op.local_get(0),
            ...encoding_1.IS_NOT_ZEROISH,
            ...encoding_1.op.local_get(1),
            ...encoding_1.IS_NOT_ZEROISH,
            encoding_1.op.i32_or,
            ...encoding_1.op.i32_const(0),
            encoding_1.op.i32_ne,
            encoding_1.op.f64_convert_i32_s,
        ],
    },
    band: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [
            ...encoding_1.op.local_get(0),
            ...encoding_1.IS_NOT_ZEROISH,
            ...encoding_1.op.local_get(1),
            ...encoding_1.IS_NOT_ZEROISH,
            encoding_1.op.i32_and,
            ...encoding_1.op.i32_const(0),
            encoding_1.op.i32_ne,
            encoding_1.op.f64_convert_i32_s,
        ],
    },
    sign: {
        args: [encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [
            ...encoding_1.op.f64_const(0),
            ...encoding_1.op.local_get(0),
            encoding_1.op.f64_lt,
            ...encoding_1.op.local_get(0),
            ...encoding_1.op.f64_const(0),
            encoding_1.op.f64_lt,
            encoding_1.op.i32_sub,
            encoding_1.op.f64_convert_i32_s,
        ],
    },
    mod: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        localVariables: [encoding_1.VAL_TYPE.i32],
        // TODO: Simplify all this type coersion
        binary: [
            ...encoding_1.op.local_get(1),
            encoding_1.op.i32_trunc_f64_s,
            ...encoding_1.op.local_tee(2),
            ...encoding_1.op.i32_const(0),
            encoding_1.op.i32_ne,
            ...encoding_1.op.if(encoding_1.BLOCK.f64),
            ...encoding_1.op.local_get(0),
            encoding_1.op.i32_trunc_f64_s,
            ...encoding_1.op.local_get(2),
            encoding_1.op.i32_rem_s,
            encoding_1.op.f64_convert_i32_s,
            encoding_1.op.else,
            ...encoding_1.op.f64_const(0),
            encoding_1.op.end,
        ],
    },
    bitwiseOr: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [
            ...encoding_1.op.local_get(0),
            encoding_1.op.i64_trunc_s_f64,
            ...encoding_1.op.local_get(1),
            encoding_1.op.i64_trunc_s_f64,
            encoding_1.op.i64_or,
            encoding_1.op.f64_convert_i64_s,
        ],
    },
    bitwiseAnd: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        binary: [
            ...encoding_1.op.local_get(0),
            encoding_1.op.i64_trunc_s_f64,
            ...encoding_1.op.local_get(1),
            encoding_1.op.i64_trunc_s_f64,
            encoding_1.op.i64_and,
            encoding_1.op.f64_convert_i64_s,
        ],
    },
    div: {
        args: [encoding_1.VAL_TYPE.f64, encoding_1.VAL_TYPE.f64],
        returns: [encoding_1.VAL_TYPE.f64],
        localVariables: [encoding_1.VAL_TYPE.i32],
        binary: [
            ...encoding_1.op.local_get(1),
            ...encoding_1.op.f64_const(0),
            encoding_1.op.f64_ne,
            ...encoding_1.op.if(encoding_1.BLOCK.f64),
            ...encoding_1.op.local_get(0),
            ...encoding_1.op.local_get(1),
            encoding_1.op.f64_div,
            encoding_1.op.else,
            ...encoding_1.op.f64_const(0),
            encoding_1.op.end,
        ],
    },
    // Takes a float buffer index and converts it to an int. Values out of range
    // are returned as `-1`.
    //
    // NOTE: There's actually a subtle bug that exists in Milkdrop's Eel
    // implementation, which we reproduce here.
    //
    // Wasm's `trunc()` rounds towards zero. This means that for index `-1` we
    // will return zero, since: `roundTowardZero(-1 + EPSILON) == 0`
    //
    // A subsequent check handles negative indexes, so negative indexes > than
    // `-1` are not affected.
    _getBufferIndex: {
        args: [encoding_1.VAL_TYPE.f64 /* 0: $index */],
        returns: [encoding_1.VAL_TYPE.i32 /* $noramlizedIndex */],
        localVariables: [
            encoding_1.VAL_TYPE.f64,
            encoding_1.VAL_TYPE.i32,
        ],
        binary: [
            ...encoding_1.op.f64_const(encoding_1.EPSILON),
            ...encoding_1.op.local_get(0),
            encoding_1.op.f64_add,
            // STACK: [$i + EPSILON]
            ...encoding_1.op.local_tee(1),
            encoding_1.op.i32_trunc_f64_s,
            // TODO We could probably make this a tee and get rid of the next get if we swap the final condition
            ...encoding_1.op.local_set(2),
            // STACK: []
            ...encoding_1.op.i32_const(-1),
            ...encoding_1.op.local_get(2),
            // STACK: [-1, $truncated]
            ...encoding_1.op.i32_const(8),
            encoding_1.op.i32_mul,
            // STACK: [-1, $truncated * 8]
            ...encoding_1.op.local_get(2),
            ...encoding_1.op.i32_const(0),
            // STACK: [-1, $truncated * 8, $truncated, 0]
            encoding_1.op.i32_lt_s,
            // STACK: [-1, $truncated * 8, <is index less than 0>]
            ...encoding_1.op.local_get(2),
            ...encoding_1.op.i32_const(constants_1.BUFFER_SIZE - 1),
            encoding_1.op.i32_gt_s,
            // STACK: [-1, $truncated * 8, <is index less than 0>, <is index more than MAX>]
            encoding_1.op.i32_or,
            // STACK: [-1, $truncated * 8, <is index out of range>]
            encoding_1.op.select,
        ],
    },
};
//# sourceMappingURL=wasmFunctions.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/assemblyscript/presetFunctions.ts":
/*!***********************************************!*\
  !*** ./src/assemblyscript/presetFunctions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var data = "AGFzbQEAAAABPQpgAABgAXwBfGACfHwBfGACf38AYAR/f39/AGAJf39/f3x8fHx8AGADf399AGABfwF/YAJ/fwF/YAF+AX8CuBWMAQNlbnYFYWJvcnQABAhwaXhlbEVxcwtwZXJQaXhlbEVxcwAADHBpeGVsVmFyUG9vbAR3YXJwA3wBDHBpeGVsVmFyUG9vbAR6b29tA3wBDHBpeGVsVmFyUG9vbAd6b29tZXhwA3wBDHBpeGVsVmFyUG9vbAJjeAN8AQxwaXhlbFZhclBvb2wCY3kDfAEMcGl4ZWxWYXJQb29sAnN4A3wBDHBpeGVsVmFyUG9vbAJzeQN8AQxwaXhlbFZhclBvb2wCZHgDfAEMcGl4ZWxWYXJQb29sAmR5A3wBDHBpeGVsVmFyUG9vbANyb3QDfAEMcGl4ZWxWYXJQb29sA3JhZAN8AQxwaXhlbFZhclBvb2wDYW5nA3wBDHBpeGVsVmFyUG9vbAF4A3wBDHBpeGVsVmFyUG9vbAF5A3wBCHFWYXJQb29sAnExA3wBCHFWYXJQb29sAnEyA3wBCHFWYXJQb29sAnEzA3wBCHFWYXJQb29sAnE0A3wBCHFWYXJQb29sAnE1A3wBCHFWYXJQb29sAnE2A3wBCHFWYXJQb29sAnE3A3wBCHFWYXJQb29sAnE4A3wBCHFWYXJQb29sAnE5A3wBCHFWYXJQb29sA3ExMAN8AQhxVmFyUG9vbANxMTEDfAEIcVZhclBvb2wDcTEyA3wBCHFWYXJQb29sA3ExMwN8AQhxVmFyUG9vbANxMTQDfAEIcVZhclBvb2wDcTE1A3wBCHFWYXJQb29sA3ExNgN8AQhxVmFyUG9vbANxMTcDfAEIcVZhclBvb2wDcTE4A3wBCHFWYXJQb29sA3ExOQN8AQhxVmFyUG9vbANxMjADfAEIcVZhclBvb2wDcTIxA3wBCHFWYXJQb29sA3EyMgN8AQhxVmFyUG9vbANxMjMDfAEIcVZhclBvb2wDcTI0A3wBCHFWYXJQb29sA3EyNQN8AQhxVmFyUG9vbANxMjYDfAEIcVZhclBvb2wDcTI3A3wBCHFWYXJQb29sA3EyOAN8AQhxVmFyUG9vbANxMjkDfAEIcVZhclBvb2wDcTMwA3wBCHFWYXJQb29sA3EzMQN8AQhxVmFyUG9vbANxMzIDfAEIdFZhclBvb2wCdDEDfAEIdFZhclBvb2wCdDIDfAEIdFZhclBvb2wCdDMDfAEIdFZhclBvb2wCdDQDfAEIdFZhclBvb2wCdDUDfAEIdFZhclBvb2wCdDYDfAEIdFZhclBvb2wCdDcDfAEIdFZhclBvb2wCdDgDfAEKc2hhcGVQb29sMAN4XzADfAEKc2hhcGVQb29sMAN5XzADfAEKc2hhcGVQb29sMAVyYWRfMAN8AQpzaGFwZVBvb2wwBWFuZ18wA3wBCnNoYXBlUG9vbDADcl8wA3wBCnNoYXBlUG9vbDADZ18wA3wBCnNoYXBlUG9vbDADYl8wA3wBCnNoYXBlUG9vbDADYV8wA3wBCnNoYXBlUG9vbDAEcjJfMAN8AQpzaGFwZVBvb2wwBGcyXzADfAEKc2hhcGVQb29sMARiMl8wA3wBCnNoYXBlUG9vbDAEYTJfMAN8AQpzaGFwZVBvb2wwCmJvcmRlcl9yXzADfAEKc2hhcGVQb29sMApib3JkZXJfZ18wA3wBCnNoYXBlUG9vbDAKYm9yZGVyX2JfMAN8AQpzaGFwZVBvb2wwCmJvcmRlcl9hXzADfAEKc2hhcGVQb29sMA50aGlja291dGxpbmVfMAN8AQpzaGFwZVBvb2wwCnRleHR1cmVkXzADfAEKc2hhcGVQb29sMAp0ZXhfem9vbV8wA3wBCnNoYXBlUG9vbDAJdGV4X2FuZ18wA3wBCnNoYXBlUG9vbDAKYWRkaXRpdmVfMAN8AQpzaGFwZVBvb2wxA3hfMQN8AQpzaGFwZVBvb2wxA3lfMQN8AQpzaGFwZVBvb2wxBXJhZF8xA3wBCnNoYXBlUG9vbDEFYW5nXzEDfAEKc2hhcGVQb29sMQNyXzEDfAEKc2hhcGVQb29sMQNnXzEDfAEKc2hhcGVQb29sMQNiXzEDfAEKc2hhcGVQb29sMQNhXzEDfAEKc2hhcGVQb29sMQRyMl8xA3wBCnNoYXBlUG9vbDEEZzJfMQN8AQpzaGFwZVBvb2wxBGIyXzEDfAEKc2hhcGVQb29sMQRhMl8xA3wBCnNoYXBlUG9vbDEKYm9yZGVyX3JfMQN8AQpzaGFwZVBvb2wxCmJvcmRlcl9nXzEDfAEKc2hhcGVQb29sMQpib3JkZXJfYl8xA3wBCnNoYXBlUG9vbDEKYm9yZGVyX2FfMQN8AQpzaGFwZVBvb2wxDnRoaWNrb3V0bGluZV8xA3wBCnNoYXBlUG9vbDEKdGV4dHVyZWRfMQN8AQpzaGFwZVBvb2wxCnRleF96b29tXzEDfAEKc2hhcGVQb29sMQl0ZXhfYW5nXzEDfAEKc2hhcGVQb29sMQphZGRpdGl2ZV8xA3wBCnNoYXBlUG9vbDIDeF8yA3wBCnNoYXBlUG9vbDIDeV8yA3wBCnNoYXBlUG9vbDIFcmFkXzIDfAEKc2hhcGVQb29sMgVhbmdfMgN8AQpzaGFwZVBvb2wyA3JfMgN8AQpzaGFwZVBvb2wyA2dfMgN8AQpzaGFwZVBvb2wyA2JfMgN8AQpzaGFwZVBvb2wyA2FfMgN8AQpzaGFwZVBvb2wyBHIyXzIDfAEKc2hhcGVQb29sMgRnMl8yA3wBCnNoYXBlUG9vbDIEYjJfMgN8AQpzaGFwZVBvb2wyBGEyXzIDfAEKc2hhcGVQb29sMgpib3JkZXJfcl8yA3wBCnNoYXBlUG9vbDIKYm9yZGVyX2dfMgN8AQpzaGFwZVBvb2wyCmJvcmRlcl9iXzIDfAEKc2hhcGVQb29sMgpib3JkZXJfYV8yA3wBCnNoYXBlUG9vbDIOdGhpY2tvdXRsaW5lXzIDfAEKc2hhcGVQb29sMgp0ZXh0dXJlZF8yA3wBCnNoYXBlUG9vbDIKdGV4X3pvb21fMgN8AQpzaGFwZVBvb2wyCXRleF9hbmdfMgN8AQpzaGFwZVBvb2wyCmFkZGl0aXZlXzIDfAEKc2hhcGVQb29sMwN4XzMDfAEKc2hhcGVQb29sMwN5XzMDfAEKc2hhcGVQb29sMwVyYWRfMwN8AQpzaGFwZVBvb2wzBWFuZ18zA3wBCnNoYXBlUG9vbDMDcl8zA3wBCnNoYXBlUG9vbDMDZ18zA3wBCnNoYXBlUG9vbDMDYl8zA3wBCnNoYXBlUG9vbDMDYV8zA3wBCnNoYXBlUG9vbDMEcjJfMwN8AQpzaGFwZVBvb2wzBGcyXzMDfAEKc2hhcGVQb29sMwRiMl8zA3wBCnNoYXBlUG9vbDMEYTJfMwN8AQpzaGFwZVBvb2wzCmJvcmRlcl9yXzMDfAEKc2hhcGVQb29sMwpib3JkZXJfZ18zA3wBCnNoYXBlUG9vbDMKYm9yZGVyX2JfMwN8AQpzaGFwZVBvb2wzCmJvcmRlcl9hXzMDfAEKc2hhcGVQb29sMw50aGlja291dGxpbmVfMwN8AQpzaGFwZVBvb2wzCnRleHR1cmVkXzMDfAEKc2hhcGVQb29sMwp0ZXhfem9vbV8zA3wBCnNoYXBlUG9vbDMJdGV4X2FuZ18zA3wBCnNoYXBlUG9vbDMKYWRkaXRpdmVfMwN8AQMZGAgDBwkBAQICAQYFAAAAAAAAAAAAAAAAAAUDAQABBuwMigF8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt8AUQAAAAAAAAAAAt/AUEAC3wBRAAAAAAAAAAAC3wBRAAAAAAAAAAAC34BQgALB9kBDwZtZW1vcnkCABJjcmVhdGVGbG9hdDMyQXJyYXkABBFydW5QaXhlbEVxdWF0aW9ucwAMBnNhdmVRcwANCXJlc3RvcmVRcwAOBnNhdmVUcwAPCXJlc3RvcmVUcwAQC3NoYXBlMF9zYXZlABEOc2hhcGUwX3Jlc3RvcmUAEgtzaGFwZTFfc2F2ZQATDnNoYXBlMV9yZXN0b3JlABQLc2hhcGUyX3NhdmUAFQ5zaGFwZTJfcmVzdG9yZQAWC3NoYXBlM19zYXZlABcOc2hhcGUzX3Jlc3RvcmUAGAgBGQraQRi0AQEGfyAAQez///8DSwRAAAsgAEEQaiICQfz///8DSwRAAAsjkAIhBiOQAkEEaiIEIAJBE2pBcHFBBGsiB2oiAj8AIgVBEHRBD2pBcHEiA0sEQCAFIAIgA2tB//8DakGAgHxxQRB2IgMgAyAFSBtAAEEASARAIANAAEEASARAAAsLCyACJJACIAYgBzYCACAEQQRrIgJBADYCBCACQQA2AgggAiABNgIMIAIgADYCECAEQRBqC7sCAQF/AkAgAUUNACAAQQA6AAAgACABakEEayICQQA6AAMgAUECTQ0AIABBADoAASAAQQA6AAIgAkEAOgACIAJBADoAASABQQZNDQAgAEEAOgADIAJBADoAACABQQhNDQAgAEEAIABrQQNxIgJqIgBBADYCACAAIAEgAmtBfHEiAmpBHGsiAUEANgIYIAJBCE0NACAAQQA2AgQgAEEANgIIIAFBADYCECABQQA2AhQgAkEYTQ0AIABBADYCDCAAQQA2AhAgAEEANgIUIABBADYCGCABQQA2AgAgAUEANgIEIAFBADYCCCABQQA2AgwgACAAQQRxQRhqIgFqIQAgAiABayEBA0AgAUEgTwRAIABCADcDACAAQgA3AwggAEIANwMQIABCADcDGCABQSBrIQEgAEEgaiEADAELCwsLdwECfwJ/QQxBAxACIgFFBEBBDEECEAIhAQsgAQtBADYCACABQQA2AgQgAUEANgIIIABB/////wBLBEBBoAhB0AhBEkE5EAAACyAAQQJ0IgBBABACIgIgABADIAEoAgAaIAEgAjYCACABIAI2AgQgASAANgIIIAELuwQDAX8KfgF8IABC////////////AINCNIhClQh9IgVCBoenQQN0QYAJaiIBKQMAIQcgASkDCCEEIAEpAxAhAiAFQj+DIgVCAFIEQAJ+IAcgBYYgBELAACAFfSIDiIQhByAEIAWGIAIgA4iEIQQgAiAFhiABKQMYIAOIhAshAgsgAEL/////////B4NCgICAgICAgAiEIgVC/////w+DIgMgBEIgiCIIfiAEQv////8PgyIGIAN+IglCIIh8IQQgBiAFQiCIIgZ+IARC/////w+DfCEDIAYgCH4gBEIgiHwgA0IgiHwkkwIgBUIghyACQiCIfiIEIAlC/////w+DIANCIIZ8fCECIAIgBFStI5MCIAUgB358fCIIQgKGIAJCPoiEIgdCP4ciBUIBhyAHhSIDeSEEIAMgBIYgBSACQgKGhSIGQsAAIAR9iIQiAkL/////D4MhAyACQiCIIglCtISjiwJ+IANCorW/yAx+IANCtISjiwJ+IgpCIIh8IgtC/////w+DfCEDIAlCorW/yAx+IAtCIIh8IANCIIh8JJMCIApC/////w+DIANCIIZ8IgMgArpEhBtwUcyYOD+iIAYgBIa6RBgtRFT7ITk/oqCxIgJUrSOTAiIGQguIfLokkQIgAiAGQjWGIANCC4iEfLpEAAAAAAAA8DuiJJICI5ECQoCAgICAgIDYPCAEQjSGfSAAIAeFQoCAgICAgICAgH+DhL8iDKIkkQIjkgIgDKIkkgIgCEI+hyAFfacLlQYDAn8BfgR8IAC9IgNCIIinIgFBH3YhAiABQf////8HcSIBQfvDpP8DTQRAIAFBnsGa8gNJBEBEAAAAAAAA8D8PC0QAAAAAAADwPyAAIACiIgVEAAAAAAAA4D+iIgahIgREAAAAAAAA8D8gBKEgBqEgBSAFIAUgBUSQFcsZoAH6PqJEd1HBFmzBVr+gokRMVVVVVVWlP6CiIAUgBaIiBiAGoiAFIAVE1DiIvun6qL2iRMSxtL2e7iE+oKJErVKcgE9+kr6goqCiIABEAAAAAAAAAACioaCgDwsgAUGAgMD/B08EQCAAIAChDwsCfyADQiCIp0H/////B3EiAUH7w+SJBEkEQAJ8IAFBFHYiAiAAIABEg8jJbTBf5D+iniIFRAAAQFT7Ifk/oqEiACAFRDFjYhphtNA9oiIGoSIEvUIgiKdBFHZB/w9xa0EQSwRAAnwgBURzcAMuihmjO6IgACAAIAVEAABgGmG00D2iIgahIgChIAahoSEGIAIgACAGoSIEvUIgiKdBFHZB/w9xa0ExSwR8IAVEwUkgJZqDezmiIAAgACAFRAAAAC6KGaM7oiIGoSIAoSAGoaEhBiAAIAahBSAECwshBAsgBAskkQIgACAEoSAGoSSSAiAFqgwBC0EAIAMQBSIBayABIAIbCyECI5ECIQUjkgIhBiACQQFxBHwgBSAFoiIAIAWiIQQgBSAAIAZEAAAAAAAA4D+iIAQgACAARH3+sVfjHcc+okTVYcEZoAEqv6CiRKb4EBEREYE/oCAAIAAgAKKiIABEfNXPWjrZ5T2iROucK4rm5Vq+oKKgoqGiIAahIARESVVVVVVVxb+ioaEFRAAAAAAAAPA/IAUgBaIiAEQAAAAAAADgP6IiBKEiB0QAAAAAAADwPyAHoSAEoSAAIAAgACAARJAVyxmgAfo+okR3UcEWbMFWv6CiRExVVVVVVaU/oKIgACAAoiIEIASiIAAgAETUOIi+6fqovaJExLG0vZ7uIT6gokStUpyAT36SvqCioKIgBSAGoqGgoAsiAJogACACQQFqQQJxGwu8BAICfwN8IAAhAyAAvUIgiKdB/////wdxIgFBgIDAoARPBEAgACAAYgRAIAAPC0QYLURU+yH5PyADpg8LIAFBgIDw/gNJBEAgAUGAgIDyA0kEQCAADwtBfyECBSAAmSEAIAFBgIDM/wNJBHwgAUGAgJj/A0kEfCAAIACgRAAAAAAAAPA/oSAARAAAAAAAAABAoKMFQQEhAiAARAAAAAAAAPA/oSAARAAAAAAAAPA/oKMLBSABQYCAjoAESQR8QQIhAiAARAAAAAAAAPg/oSAARAAAAAAAAPg/okQAAAAAAADwP6CjBUEDIQJEAAAAAAAA8L8gAKMLCyEACyAAIACiIgUgBaIhBCAAIAUgBCAEIAQgBCAERBHaIuM6rZA/okTrDXYkS3upP6CiRFE90KBmDbE/oKJEbiBMxc1Ftz+gokT/gwCSJEnCP6CiRA1VVVVVVdU/oKIgBCAEIAQgBCAERC9saixEtKK/okSa/d5SLd6tv6CiRG2adK/ysLO/oKJEcRYj/sZxvL+gokTE65iZmZnJv6CioKIhBCACQQBIBEAgACAEoQ8LAkACQAJAAkACQAJAIAIOBAABAgMEC0RPu2EFZ6zdPyAEROJlLyJ/K3o8oSAAoaEhAAwEC0QYLURU+yHpPyAERAdcFDMmpoE8oSAAoaEhAAwDC0Sb9oHSC3PvPyAERL3L8HqIB3A8oSAAoaEhAAwCC0QYLURU+yH5PyAERAdcFDMmppE8oSAAoaEhAAwBCwALIAAgA6YLvgMCBX8BfkEBIAAgAGIgASABYhsEQCABIACgDwsgAL0iB0IgiKchBCAHpyEDIAG9IgenIgYgB0IgiKciBUGAgMD/A2tyRQRAIAAQBw8LIAVBHnZBAnEgBEEfdnIhAiAFQf////8HcSEFIARB/////wdxIgQgA3JFBEACQAJAAkACQCACRQ0AAkAgAkEBaw4DAQIDAAsMAwsgAA8LRBgtRFT7IQlADwtEGC1EVPshCcAPCwsCQCAFIAZyRQ0AIAVBgIDA/wdGBEBE0iEzf3zZAkBEGC1EVPsh6T8gAkECcRtEGC1EVPshCUBEAAAAAAAAAAAgAkECcRsgBEGAgMD/B0YbIgCaIAAgAkEBcRsPC0EBIARBgIDA/wdGIAQgBUGAgIAgaksbDQAgBSAEQYCAgCBqS0EAIAJBAnEbBHxEAAAAAAAAAAAFIAAgAaOZEAcLIQACQAJAAkACQCACIgMEQCADQQFrDgMBAgMECyAADwsgAJoPC0QYLURU+yEJQCAARAdcFDMmpqE8oaEPCyAARAdcFDMmpqE8oUQYLURU+yEJQKEPCwALRBgtRFT7Ifm/RBgtRFT7Ifk/IAJBAXEbC4ESAwl/AX4IfAJAAkACQAJAIAGZRAAAAAAAAABAZQRAIAFEAAAAAAAAAEBhDQEgAUQAAAAAAADgP2EEQCAAn5lEAAAAAAAA8H8gAEQAAAAAAADw/2IbDwsgAUQAAAAAAADwv2ENAiABRAAAAAAAAPA/YQRAIAAPCyABRAAAAAAAAAAAYQRARAAAAAAAAPA/DwsLIAC9IgunIQcgC0IgiKciBkH/////B3EhBCABvSILQiCIpyIDQf////8HcSIFIAunIghyRQRARAAAAAAAAPA/DwtBASAIQQAgBUGAgMD/B0YbQQEgBUGAgMD/B0tBASAHQQAgBEGAgMD/B0YbIARBgIDA/wdKGxsbBEAgACABoA8LIAZBAEgEfyAFQYCAgJoETwR/QQIFIAVBgIDA/wNPBH9BAiAIIAUgBUEUdkH/B2siAkEUSiIJGyIKQTRBFCAJGyACayICdiIJQQFxa0EAIAogCSACdEYbBUEACwsFQQALIQIgCEUEQCAFQYCAwP8HRgRAIAcgBEGAgMD/A2tyBEAgBEGAgMD/A04EQCABRAAAAAAAAAAAIANBAE4bDwVEAAAAAAAAAAAgAZogA0EAThsPCwAFRAAAAAAAAPh/DwsACyAFQYCAwP8DRgRAIANBAE4EQCAADwsMAwsgA0GAgICABEYNASADQYCAgP8DRgRAIAZBAE4EQCAAnw8LCwsgAJkhDCAHRQRAQQEgBEGAgMD/A0YgBEGAgMD/B0ZBASAEGxsEQEQAAAAAAADwPyAMoyAMIANBAEgbIQAgBkEASAR8IAIgBEGAgMD/A2tyBHwgAJogACACQQFGGwUgACAAoSIAIACjCwUgAAsPCwsgBkEASAR8IAJFBEAgACAAoSIAIACjDwtEAAAAAAAA8L9EAAAAAAAA8D8gAkEBRhsFRAAAAAAAAPA/CyEOIAVBgICAjwRLBHwgBUGAgMCfBEsEQCAEQf//v/8DTARARAAAAAAAAPB/RAAAAAAAAAAAIANBAEgbDwsgBEGAgMD/A04EQEQAAAAAAADwf0QAAAAAAAAAACADQQBKGw8LCyAEQf//v/8DSARAIA5EnHUAiDzkN36iRJx1AIg85Dd+oiAORFnz+MIfbqUBokRZ8/jCH26lAaIgA0EASBsPCyAEQYCAwP8DSgRAIA5EnHUAiDzkN36iRJx1AIg85Dd+oiAORFnz+MIfbqUBokRZ8/jCH26lAaIgA0EAShsPCyAMRAAAAAAAAPA/oSIARAAAAGBHFfc/oiIMIABERN9d+AuuVD6iIAAgAKJEAAAAAAAA4D8gAERVVVVVVVXVPyAARAAAAAAAANA/oqGioaJE/oIrZUcV9z+ioSINoL1CgICAgHCDvyEAIA0gACAMoaEFIARBgIDAAEgEfyAMRAAAAAAAAEBDoiIMvUIgiKchBEFLBUEACyAEQRR1Qf8Ha2ohAyAEQf//P3EiAkGAgMD/A3IhBCACQY6xDkwEf0EABSACQfrsLkgEf0EBBSADQQFqIQMgBEGAgEBqIQRBAAsLIQIgDL1C/////w+DIASsQiCGhL8iD0QAAAAAAAD4P0QAAAAAAADwPyACGyIQoSISRAAAAAAAAPA/IA8gEKCjIhOiIg29QoCAgIBwg78iDCAMoiERIAwgEUQAAAAAAAAIQKAgDSANoiIAIACiIAAgACAAIAAgAETvTkVKKH7KP6JEZdvJk0qGzT+gokQBQR2pYHTRP6CiRE0mj1FVVdU/oKJE/6tv27Zt2z+gokQDMzMzMzPjP6CiIBMgEiAMIARBAXVBgICAgAJyQYCAIGogAkESdGqsQiCGvyIAoqEgDCAPIAAgEKGhoqGiIg8gDCANoKKgIgygvUKAgICAcIO/IgCiIhAgDyAAoiAMIABEAAAAAAAACEChIBGhoSANoqAiDKC9QoCAgIBwg78iAEQAAADgCcfuP6IiDSAARPUBWxTgLz6+oiAMIAAgEKGhRP0DOtwJx+4/oqBEBtDPQ+v9TD5EAAAAAAAAAAAgAhugIgygRAAAAEADuOI/RAAAAAAAAAAAIAIbIg+gIAO3IhCgvUKAgICAcIO/IQAgDCAAIBChIA+hIA2hoQshDCABIAG9QoCAgIBwg78iDaEgAKIgASAMoqAiASANIACiIgCgIgy9IgunIQMgC0IgiKciAkGAgMCEBE4EQCADIAJBgIDAhARrciABRP6CK2VHFZc8oCAMIAChZHINAwUgAkH/////B3FBgJjDhARPQQAgAyACQYCYw4R8a3IgASAMIAChZXIbDQQLIAJB/////wdxIgRBFHZB/wdrIQVBACEDIAECfCAEQYCAgP8DSgRAAnwgAkGAgMAAIAVBAWp1aiIEQf////8HcUEUdkH/B2shBUEAIARB//8/cUGAgMAAckEUIAVrdSIDayADIAJBAEgbIQMgACAEQf//PyAFdUF/c3GsQiCGv6ELIQALIAALoL1CgICAgHCDvyIMRAAAAABDLuY/oiINIAEgDCAAoaFE7zn6/kIu5j+iIAxEOWyoDGFcIL6ioCIMoCIAIACiIQEgDkQAAAAAAADwPyAAIAAgASABIAEgASABRNCkvnJpN2Y+okTxa9LFQb27vqCiRCzeJa9qVhE/oKJEk72+FmzBZr+gokQ+VVVVVVXFP6CioSIBoiABRAAAAAAAAABAoaMgDCAAIA2hoSIBIAAgAaKgoSAAoaEiAL1CIIinIANBFHRqIgJBFHVBAEwEfCADIgJB/wdKBHwgAEQAAAAAAADgf6IhACACQf8HayICQf8HSgR8IAJB/wdrIgJB/wcgAkH/B0gbIQIgAEQAAAAAAADgf6IFIAALBSACQYJ4SAR8IABEAAAAAAAAYAOiIQAgAkHJB2oiAkGCeEgEfCACQckHaiICQYJ4IAJBgnhKGyECIABEAAAAAAAAYAOiBSAACwUgAAsLIAKsQv8HfEI0hr+iBSAAvUL/////D4MgAqxCIIaEvwuiDwsgACAAog8LRAAAAAAAAPA/IACjDwsgDkScdQCIPOQ3fqJEnHUAiDzkN36iDwsgDkRZ8/jCH26lAaJEWfP4wh9upQGiC9QFAwJ/AX4EfCAAvSIDQiCIpyIBQR92IQIgAUH/////B3EiAUH7w6T/A00EQCABQYCAwPIDSQRAIAAPCyAAIAAgAKIiBSAAoiAFIAUgBUR9/rFX4x3HPqJE1WHBGaABKr+gokSm+BARERGBP6AgBSAFIAWioiAFRHzVz1o62eU9okTrnCuK5uVavqCioKJESVVVVVVVxb+goqAPCyABQYCAwP8HTwRAIAAgAKEPCwJ/IANCIIinQf////8HcSIBQfvD5IkESQRAAnwgAUEUdiICIAAgAESDyMltMF/kP6KeIgVEAABAVPsh+T+ioSIAIAVEMWNiGmG00D2iIgahIgS9QiCIp0EUdkH/D3FrQRBLBEACfCAFRHNwAy6KGaM7oiAAIAAgBUQAAGAaYbTQPaIiBqEiAKEgBqGhIQYgAiAAIAahIgS9QiCIp0EUdkH/D3FrQTFLBHwgBUTBSSAlmoN7OaIgACAAIAVEAAAALooZozuiIgahIgChIAahoSEGIAAgBqEFIAQLCyEECyAECySRAiAAIAShIAahJJICIAWqDAELQQAgAxAFIgFrIAEgAhsLIQIjkQIhBSOSAiEGIAJBAXEEfEQAAAAAAADwPyAFIAWiIgBEAAAAAAAA4D+iIgShIgdEAAAAAAAA8D8gB6EgBKEgACAAIAAgAESQFcsZoAH6PqJEd1HBFmzBVr+gokRMVVVVVVWlP6CiIAAgAKIiBCAEoiAAIABE1DiIvun6qL2iRMSxtL2e7iE+oKJErVKcgE9+kr6goqCiIAUgBqKhoKAFIAUgBaIiACAFoiEEIAUgACAGRAAAAAAAAOA/oiAEIAAgAER9/rFX4x3HPqJE1WHBGaABKr+gokSm+BARERGBP6AgACAAIACioiAARHzVz1o62eU9okTrnCuK5uVavqCioKKhoiAGoSAERElVVVVVVcW/oqGhCyIAmiAAIAJBAnEbCxIAIAAoAgQgAUECdGogAjgCAAuTCAIFfwl8IAJBAWohDCADQQFqIQ1EAAAAAAAA8D8gBqMhECAEIAWiIgVEz/dT46Wb9j+iRAAAAAAAACRAoBAGRAAAAAAAABBAokRcj8L1KFwnQKAhFCAFRAIrhxbZzvE/okQAAAAAAAAcQKAQBkQAAAAAAAAIQKJECtejcD2KIUCgIRIgBUTufD81XrrzP6JEAAAAAAAACECgEAZEAAAAAAAACECiRBSuR+F6FCVAoCETIAVEQmDl0CLb7T+iRAAAAAAAABRAoBAGRAAAAAAAABBAokR7FK5H4fomQKAhFSMAJIoBIwEkiwEjAiSMASMDJI0BIwQkjgEjBSSPASMGJJABIwckkQEjCCSSASMJJJMBA0AgCiANSARAQQAhCQNAIAkgDEgEQCAJtyACt6MiBCAEoEQAAAAAAADwP6EiBiAGoiAHoiAHoiAKtyADt6MiBCAEoEQAAAAAAADwP6EiDyAPoiAIoiAIoqCfJAogAQRAIAm3IAK3RAAAAAAAAOA/omFBACAKtyADt0QAAAAAAADgP6JhGwRARAAAAAAAAAAAJAsFIA8gCKIgBiAHohAIIgREAAAAAAAAAABjBHwgBEQYLURU+yEZQKAFIAQLJAsLIAZEAAAAAAAA4D+iIAeiRAAAAAAAAOA/oCQMIA9EAAAAAAAA4L+iIAiiRAAAAAAAAOA/oCQNI4oBJAAjiwEkASOMASQCI40BJAMjjgEkBCOPASQFI5ABJAYjkQEkByOSASQII5MBJAkQAQsgBkQAAAAAAADgP6IgB6JEAAAAAAAA8D8jASMCIwoiBCAEoEQAAAAAAADwP6EQCRAJoyIOokQAAAAAAADgP6AjA6EjBaMjA6AhBCAPRAAAAAAAAOC/oiAIoiAOokQAAAAAAADgP6AjBKEjBqMjBKAhDiMARAAAAAAAAAAAYgRAAnwgBCMARHnpJjEIrGw/oiAFRB1aZDvfT9U/oiAQIAYgFKIiESAPIBWiIhahoqAQCqKgIQQgDiMARHnpJjEIrGw/oiAFRAAAAAAAANg/oiAQIAYgE6IgDyASoqCioRAGoqAhDiAEIwBEeekmMQisbD+iIAVEf2q8dJMY6D+iIBAgBiASoiAPIBOioaKhEAaioCEEIA4jAER56SYxCKxsP6IgBURmZmZmZmbqP6IgECARIBagoqAQCqKgCyEOCyAEIwOhIQQgDiMEoSEGIwkQBiEPIAQjCRAKIg6iIAYgD6KgIwSgIwihRAAAAAAAAOA/oSAIo0QAAAAAAADgP6AhESAAIAsgBCAPoiAGIA6ioSMDoCMHoUQAAAAAAADgP6EgB6NEAAAAAAAA4D+gthALIAAgC0EBaiARthALIAtBAmohCyAJQQFqIQkMAQsLIApBAWohCgwBCwsLogEAIw4klAEjDySVASMQJJYBIxEklwEjEiSYASMTJJkBIxQkmgEjFSSbASMWJJwBIxcknQEjGCSeASMZJJ8BIxokoAEjGyShASMcJKIBIx0kowEjHiSkASMfJKUBIyAkpgEjISSnASMiJKgBIyMkqQEjJCSqASMlJKsBIyYkrAEjJyStASMoJK4BIykkrwEjKiSwASMrJLEBIywksgEjLSSzAQuiAQAjlAEkDiOVASQPI5YBJBAjlwEkESOYASQSI5kBJBMjmgEkFCObASQVI5wBJBYjnQEkFyOeASQYI58BJBkjoAEkGiOhASQbI6IBJBwjowEkHSOkASQeI6UBJB8jpgEkICOnASQhI6gBJCIjqQEkIyOqASQkI6sBJCUjrAEkJiOtASQnI64BJCgjrwEkKSOwASQqI7EBJCsjsgEkLCOzASQtCyoAIy4ktAEjLyS1ASMwJLYBIzEktwEjMiS4ASMzJLkBIzQkugEjNSS7AQsqACO0ASQuI7UBJC8jtgEkMCO3ASQxI7gBJDIjuQEkMyO6ASQ0I7sBJDULawAjNiS8ASM3JL0BIzgkvgEjOSS/ASM6JMABIzskwQEjPCTCASM9JMMBIz4kxAEjPyTFASNAJMYBI0EkxwEjQiTIASNDJMkBI0QkygEjRSTLASNGJMwBI0ckzQEjSCTOASNJJM8BI0ok0AELawAjvAEkNiO9ASQ3I74BJDgjvwEkOSPAASQ6I8EBJDsjwgEkPCPDASQ9I8QBJD4jxQEkPyPGASRAI8cBJEEjyAEkQiPJASRDI8oBJEQjywEkRSPMASRGI80BJEcjzgEkSCPPASRJI9ABJEoLawAjSyTRASNMJNIBI00k0wEjTiTUASNPJNUBI1Ak1gEjUSTXASNSJNgBI1Mk2QEjVCTaASNVJNsBI1Yk3AEjVyTdASNYJN4BI1kk3wEjWiTgASNbJOEBI1wk4gEjXSTjASNeJOQBI18k5QELawAj0QEkSyPSASRMI9MBJE0j1AEkTiPVASRPI9YBJFAj1wEkUSPYASRSI9kBJFMj2gEkVCPbASRVI9wBJFYj3QEkVyPeASRYI98BJFkj4AEkWiPhASRbI+IBJFwj4wEkXSPkASReI+UBJF8LawAjYCTmASNhJOcBI2Ik6AEjYyTpASNkJOoBI2Uk6wEjZiTsASNnJO0BI2gk7gEjaSTvASNqJPABI2sk8QEjbCTyASNtJPMBI24k9AEjbyT1ASNwJPYBI3Ek9wEjciT4ASNzJPkBI3Qk+gELawAj5gEkYCPnASRhI+gBJGIj6QEkYyPqASRkI+sBJGUj7AEkZiPtASRnI+4BJGgj7wEkaSPwASRqI/EBJGsj8gEkbCPzASRtI/QBJG4j9QEkbyP2ASRwI/cBJHEj+AEkciP5ASRzI/oBJHQLdQAjdST7ASN2JPwBI3ck/QEjeCT+ASN5JP8BI3okgAIjeySBAiN8JIICI30kgwIjfiSEAiN/JIUCI4ABJIYCI4EBJIcCI4IBJIgCI4MBJIkCI4QBJIoCI4UBJIsCI4YBJIwCI4cBJI0CI4gBJI4CI4kBJI8CC3UAI/sBJHUj/AEkdiP9ASR3I/4BJHgj/wEkeSOAAiR6I4ECJHsjggIkfCODAiR9I4QCJH4jhQIkfyOGAiSAASOHAiSBASOIAiSCASOJAiSDASOKAiSEASOLAiSFASOMAiSGASONAiSHASOOAiSIASOPAiSJAQsIAEHMCiSQAgsLvAIDAEGMCAsvLAAAAAEAAAAAAAAAAQAAABwAAABJAG4AdgBhAGwAaQBkACAAbABlAG4AZwB0AGgAQbwICzk8AAAAAQAAAAAAAAABAAAAJgAAAH4AbABpAGIALwBhAHIAcgBhAHkAYgB1AGYAZgBlAHIALgB0AHMAQYAJC8ABboP5ogAAAADRVyf8KRVETpmVYtvA3TT1q2NR/kGQQzw6biS3YcW73uouSQbg0k1CHOsd/hyS0Qn1NYLoPqcpsSZwnOmERLsuOdaROUF+X7SLX4Sc9DlTg/+X+B87KPm9ixEv7w+YBd7PfjZtH20KWmY/Rk+3Ccsnx7ondS3qX573OQc9e/Hl67Ff+2vqklKKRjADVghdjR8gvM/wq2t7/GGR46kdNvSaX4WZZQgb5l6A2P+NQGigFFcVBgYxJ3NN";

module.exports = () => data;


/***/ }),

/***/ "./src/audio/audioLevels.js":
/*!**********************************!*\
  !*** ./src/audio/audioLevels.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AudioLevels; });
class AudioLevels {
  constructor(audio) {
    this.audio = audio;
    let sampleRate;

    if (this.audio.audioContext) {
      sampleRate = this.audio.audioContext.sampleRate;
    } else {
      sampleRate = 44100;
    }

    const bucketHz = sampleRate / this.audio.fftSize;
    const bassLow = Math.clamp(Math.round(20 / bucketHz) - 1, 0, this.audio.numSamps - 1);
    const bassHigh = Math.clamp(Math.round(320 / bucketHz) - 1, 0, this.audio.numSamps - 1);
    const midHigh = Math.clamp(Math.round(2800 / bucketHz) - 1, 0, this.audio.numSamps - 1);
    const trebHigh = Math.clamp(Math.round(11025 / bucketHz) - 1, 0, this.audio.numSamps - 1);
    this.starts = [bassLow, bassHigh, midHigh];
    this.stops = [bassHigh, midHigh, trebHigh];
    this.val = new Float32Array(3);
    this.imm = new Float32Array(3);
    this.att = new Float32Array(3);
    this.avg = new Float32Array(3);
    this.longAvg = new Float32Array(3);
    this.att.fill(1);
    this.avg.fill(1);
    this.longAvg.fill(1);
  }
  /* eslint-disable camelcase */


  get bass() {
    return this.val[0];
  }

  get bass_att() {
    return this.att[0];
  }

  get mid() {
    return this.val[1];
  }

  get mid_att() {
    return this.att[1];
  }

  get treb() {
    return this.val[2];
  }

  get treb_att() {
    return this.att[2];
  }
  /* eslint-enable camelcase */


  static isFiniteNumber(num) {
    return Number.isFinite(num) && !Number.isNaN(num);
  }

  static adjustRateToFPS(rate, baseFPS, FPS) {
    return rate ** (baseFPS / FPS);
  }

  updateAudioLevels(fps, frame) {
    if (this.audio.freqArray.length > 0) {
      let effectiveFPS = fps;

      if (!AudioLevels.isFiniteNumber(effectiveFPS) || effectiveFPS < 15) {
        effectiveFPS = 15;
      } else if (effectiveFPS > 144) {
        effectiveFPS = 144;
      } // Clear for next loop


      this.imm.fill(0);

      for (let i = 0; i < 3; i++) {
        for (let j = this.starts[i]; j < this.stops[i]; j++) {
          this.imm[i] += this.audio.freqArray[j];
        }
      }

      for (let i = 0; i < 3; i++) {
        let rate;

        if (this.imm[i] > this.avg[i]) {
          rate = 0.2;
        } else {
          rate = 0.5;
        }

        rate = AudioLevels.adjustRateToFPS(rate, 30.0, effectiveFPS);
        this.avg[i] = this.avg[i] * rate + this.imm[i] * (1 - rate);

        if (frame < 50) {
          rate = 0.9;
        } else {
          rate = 0.992;
        }

        rate = AudioLevels.adjustRateToFPS(rate, 30.0, effectiveFPS);
        this.longAvg[i] = this.longAvg[i] * rate + this.imm[i] * (1 - rate);

        if (this.longAvg[i] < 0.001) {
          this.val[i] = 1.0;
          this.att[i] = 1.0;
        } else {
          this.val[i] = this.imm[i] / this.longAvg[i];
          this.att[i] = this.avg[i] / this.longAvg[i];
        }
      }
    }
  }

}

/***/ }),

/***/ "./src/audio/audioProcessor.js":
/*!*************************************!*\
  !*** ./src/audio/audioProcessor.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AudioProcessor; });
/* harmony import */ var _fft__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fft */ "./src/audio/fft.js");

class AudioProcessor {
  constructor(context) {
    this.numSamps = 512;
    this.fftSize = this.numSamps * 2;
    this.fft = new _fft__WEBPACK_IMPORTED_MODULE_0__["default"](this.fftSize, 512, true);

    if (context) {
      this.audioContext = context;
      this.audible = context.createDelay();
      this.analyser = context.createAnalyser();
      this.analyser.smoothingTimeConstant = 0.0;
      this.analyser.fftSize = this.fftSize;
      this.audible.connect(this.analyser); // Split channels

      this.analyserL = context.createAnalyser();
      this.analyserL.smoothingTimeConstant = 0.0;
      this.analyserL.fftSize = this.fftSize;
      this.analyserR = context.createAnalyser();
      this.analyserR.smoothingTimeConstant = 0.0;
      this.analyserR.fftSize = this.fftSize;
      this.splitter = context.createChannelSplitter(2);
      this.audible.connect(this.splitter);
      this.splitter.connect(this.analyserL, 0);
      this.splitter.connect(this.analyserR, 1);
    } // Initialised once as typed arrays
    // Used for webaudio API raw (time domain) samples. 0 -> 255


    this.timeByteArray = new Uint8Array(this.fftSize);
    this.timeByteArrayL = new Uint8Array(this.fftSize);
    this.timeByteArrayR = new Uint8Array(this.fftSize); // Signed raw samples shifted to -128 -> 127

    this.timeArray = new Int8Array(this.fftSize);
    this.timeByteArraySignedL = new Int8Array(this.fftSize);
    this.timeByteArraySignedR = new Int8Array(this.fftSize); // Temporary array for smoothing

    this.tempTimeArrayL = new Int8Array(this.fftSize);
    this.tempTimeArrayR = new Int8Array(this.fftSize); // Undersampled from this.fftSize to this.numSamps

    this.timeArrayL = new Int8Array(this.numSamps);
    this.timeArrayR = new Int8Array(this.numSamps);
  }

  sampleAudio() {
    this.analyser.getByteTimeDomainData(this.timeByteArray);
    this.analyserL.getByteTimeDomainData(this.timeByteArrayL);
    this.analyserR.getByteTimeDomainData(this.timeByteArrayR);
    this.processAudio();
  }

  updateAudio(timeByteArray, timeByteArrayL, timeByteArrayR) {
    this.timeByteArray.set(timeByteArray);
    this.timeByteArrayL.set(timeByteArrayL);
    this.timeByteArrayR.set(timeByteArrayR);
    this.processAudio();
  }
  /* eslint-disable no-bitwise */


  processAudio() {
    for (let i = 0, j = 0, lastIdx = 0; i < this.fftSize; i++) {
      // Shift Unsigned to Signed about 0
      this.timeArray[i] = this.timeByteArray[i] - 128;
      this.timeByteArraySignedL[i] = this.timeByteArrayL[i] - 128;
      this.timeByteArraySignedR[i] = this.timeByteArrayR[i] - 128;
      this.tempTimeArrayL[i] = 0.5 * (this.timeByteArraySignedL[i] + this.timeByteArraySignedL[lastIdx]);
      this.tempTimeArrayR[i] = 0.5 * (this.timeByteArraySignedR[i] + this.timeByteArraySignedR[lastIdx]); // Undersampled

      if (i % 2 === 0) {
        this.timeArrayL[j] = this.tempTimeArrayL[i];
        this.timeArrayR[j] = this.tempTimeArrayR[i];
        j += 1;
      }

      lastIdx = i;
    } // Use full width samples for the FFT


    this.freqArray = this.fft.timeToFrequencyDomain(this.timeArray);
    this.freqArrayL = this.fft.timeToFrequencyDomain(this.timeByteArraySignedL);
    this.freqArrayR = this.fft.timeToFrequencyDomain(this.timeByteArraySignedR);
  }

  connectAudio(audionode) {
    audionode.connect(this.audible);
  }

  disconnectAudio(audionode) {
    audionode.disconnect(this.audible);
  }
  /* eslint-enable no-bitwise */


}

/***/ }),

/***/ "./src/audio/fft.js":
/*!**************************!*\
  !*** ./src/audio/fft.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FFT; });
class FFT {
  constructor(samplesIn, samplesOut, equalize = false) {
    this.samplesIn = samplesIn;
    this.samplesOut = samplesOut;
    this.equalize = equalize;
    this.NFREQ = samplesOut * 2;

    if (this.equalize) {
      this.initEqualizeTable();
    }

    this.initBitRevTable();
    this.initCosSinTable();
  }

  initEqualizeTable() {
    this.equalizeArr = new Float32Array(this.samplesOut);
    const invHalfNFREQ = 1.0 / this.samplesOut;

    for (let i = 0; i < this.samplesOut; i++) {
      this.equalizeArr[i] = -0.02 * Math.log((this.samplesOut - i) * invHalfNFREQ);
    }
  }
  /* eslint-disable no-bitwise */


  initBitRevTable() {
    this.bitrevtable = new Uint16Array(this.NFREQ);

    for (let i = 0; i < this.NFREQ; i++) {
      this.bitrevtable[i] = i;
    }

    let j = 0;

    for (let i = 0; i < this.NFREQ; i++) {
      if (j > i) {
        const temp = this.bitrevtable[i];
        this.bitrevtable[i] = this.bitrevtable[j];
        this.bitrevtable[j] = temp;
      }

      let m = this.NFREQ >> 1;

      while (m >= 1 && j >= m) {
        j -= m;
        m >>= 1;
      }

      j += m;
    }
  }

  initCosSinTable() {
    let dftsize = 2;
    let tabsize = 0;

    while (dftsize <= this.NFREQ) {
      tabsize += 1;
      dftsize <<= 1;
    }

    this.cossintable = [new Float32Array(tabsize), new Float32Array(tabsize)];
    dftsize = 2;
    let i = 0;

    while (dftsize <= this.NFREQ) {
      const theta = -2.0 * Math.PI / dftsize;
      this.cossintable[0][i] = Math.cos(theta);
      this.cossintable[1][i] = Math.sin(theta);
      i += 1;
      dftsize <<= 1;
    }
  }

  timeToFrequencyDomain(waveDataIn) {
    const real = new Float32Array(this.NFREQ);
    const imag = new Float32Array(this.NFREQ);

    for (let i = 0; i < this.NFREQ; i++) {
      const idx = this.bitrevtable[i];

      if (idx < this.samplesIn) {
        real[i] = waveDataIn[idx];
      } else {
        real[i] = 0;
      }

      imag[i] = 0;
    }

    let dftsize = 2;
    let t = 0;

    while (dftsize <= this.NFREQ) {
      const wpr = this.cossintable[0][t];
      const wpi = this.cossintable[1][t];
      let wr = 1.0;
      let wi = 0.0;
      const hdftsize = dftsize >> 1;

      for (let m = 0; m < hdftsize; m++) {
        for (let i = m; i < this.NFREQ; i += dftsize) {
          const j = i + hdftsize;
          const tempr = wr * real[j] - wi * imag[j];
          const tempi = wr * imag[j] + wi * real[j];
          real[j] = real[i] - tempr;
          imag[j] = imag[i] - tempi;
          real[i] += tempr;
          imag[i] += tempi;
        }

        const wtemp = wr;
        wr = wtemp * wpr - wi * wpi;
        wi = wi * wpr + wtemp * wpi;
      }

      dftsize <<= 1;
      t += 1;
    }

    const spectralDataOut = new Float32Array(this.samplesOut);

    if (this.equalize) {
      for (let i = 0; i < this.samplesOut; i++) {
        spectralDataOut[i] = this.equalizeArr[i] * Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
      }
    } else {
      for (let i = 0; i < this.samplesOut; i++) {
        spectralDataOut[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i]);
      }
    }

    return spectralDataOut;
  }
  /* eslint-enable no-bitwise */


}

/***/ }),

/***/ "./src/blankPreset.js":
/*!****************************!*\
  !*** ./src/blankPreset.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* eslint-disable */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  "use strict;";

  var pmap = {
    baseVals: {
      gammaadj: 1.25,
      wave_g: 0.5,
      mv_x: 12.0,
      warpscale: 1.0,
      brighten: 0.0,
      mv_y: 9.0,
      wave_scale: 1.0,
      echo_alpha: 0.0,
      additivewave: 0.0,
      sx: 1.0,
      sy: 1.0,
      warp: 0.01,
      red_blue: 0.0,
      wave_mode: 0.0,
      wave_brighten: 0.0,
      wrap: 0.0,
      zoomexp: 1.0,
      fshader: 0.0,
      wave_r: 0.5,
      echo_zoom: 1.0,
      wave_smoothing: 0.75,
      warpanimspeed: 1.0,
      wave_dots: 0.0,
      wave_x: 0.5,
      wave_y: 0.5,
      zoom: 1.0,
      solarize: 0.0,
      modwavealphabyvolume: 0.0,
      dx: 0.0,
      cx: 0.5,
      dy: 0.0,
      darken_center: 0.0,
      cy: 0.5,
      invert: 0.0,
      bmotionvectorson: 0.0,
      rot: 0.0,
      modwavealphaend: 0.95,
      wave_mystery: -0.2,
      decay: 0.9,
      wave_a: 1.0,
      wave_b: 0.5,
      rating: 5.0,
      modwavealphastart: 0.75,
      darken: 0.0,
      echo_orient: 0.0,
      ib_r: 0.5,
      ib_g: 0.5,
      ib_b: 0.5,
      ib_a: 0.0,
      ib_size: 0.0,
      ob_r: 0.5,
      ob_g: 0.5,
      ob_b: 0.5,
      ob_a: 0.0,
      ob_size: 0.0,
      mv_dx: 0.0,
      mv_dy: 0.0,
      mv_a: 0.0,
      mv_r: 0.5,
      mv_g: 0.5,
      mv_b: 0.5,
      mv_l: 0.0
    },
    init_eqs: function () {
      var m = {};
      return m;
    },
    frame_eqs: function (m) {
      m.rkeys = ["warp"];
      m.zoom = 1.01 + 0.02 * m.treb_att;
      m.warp = 0.15 + 0.25 * m.bass_att;
      return m;
    },
    pixel_eqs: function (m) {
      m.warp = m.warp + m.rad * 0.15;
      return m;
    },
    waves: [{
      baseVals: {
        a: 1.0,
        enabled: 0.0,
        b: 1.0,
        g: 1.0,
        scaling: 1.0,
        samples: 512.0,
        additive: 0.0,
        usedots: 0.0,
        spectrum: 0.0,
        r: 1.0,
        smoothing: 0.5,
        thick: 0.0,
        sep: 0.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: ""
    }, {
      baseVals: {
        a: 1.0,
        enabled: 0.0,
        b: 1.0,
        g: 1.0,
        scaling: 1.0,
        samples: 512.0,
        additive: 0.0,
        usedots: 0.0,
        spectrum: 0.0,
        r: 1.0,
        smoothing: 0.5,
        thick: 0.0,
        sep: 0.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: ""
    }, {
      baseVals: {
        a: 1.0,
        enabled: 0.0,
        b: 1.0,
        g: 1.0,
        scaling: 1.0,
        samples: 512.0,
        additive: 0.0,
        usedots: 0.0,
        spectrum: 0.0,
        r: 1.0,
        smoothing: 0.5,
        thick: 0.0,
        sep: 0.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: ""
    }, {
      baseVals: {
        a: 1.0,
        enabled: 0.0,
        b: 1.0,
        g: 1.0,
        scaling: 1.0,
        samples: 512.0,
        additive: 0.0,
        usedots: 0.0,
        spectrum: 0.0,
        r: 1.0,
        smoothing: 0.5,
        thick: 0.0,
        sep: 0.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      },
      point_eqs: ""
    }],
    shapes: [{
      baseVals: {
        r2: 0.0,
        a: 1.0,
        enabled: 0.0,
        b: 0.0,
        tex_ang: 0.0,
        thickoutline: 0.0,
        g: 0.0,
        textured: 0.0,
        g2: 1.0,
        tex_zoom: 1.0,
        additive: 0.0,
        border_a: 0.1,
        border_b: 1.0,
        b2: 0.0,
        a2: 0.0,
        r: 1.0,
        border_g: 1.0,
        rad: 0.1,
        x: 0.5,
        y: 0.5,
        ang: 0.0,
        sides: 4.0,
        border_r: 1.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      }
    }, {
      baseVals: {
        r2: 0.0,
        a: 1.0,
        enabled: 0.0,
        b: 0.0,
        tex_ang: 0.0,
        thickoutline: 0.0,
        g: 0.0,
        textured: 0.0,
        g2: 1.0,
        tex_zoom: 1.0,
        additive: 0.0,
        border_a: 0.1,
        border_b: 1.0,
        b2: 0.0,
        a2: 0.0,
        r: 1.0,
        border_g: 1.0,
        rad: 0.1,
        x: 0.5,
        y: 0.5,
        ang: 0.0,
        sides: 4.0,
        border_r: 1.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      }
    }, {
      baseVals: {
        r2: 0.0,
        a: 1.0,
        enabled: 0.0,
        b: 0.0,
        tex_ang: 0.0,
        thickoutline: 0.0,
        g: 0.0,
        textured: 0.0,
        g2: 1.0,
        tex_zoom: 1.0,
        additive: 0.0,
        border_a: 0.1,
        border_b: 1.0,
        b2: 0.0,
        a2: 0.0,
        r: 1.0,
        border_g: 1.0,
        rad: 0.1,
        x: 0.5,
        y: 0.5,
        ang: 0.0,
        sides: 4.0,
        border_r: 1.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      }
    }, {
      baseVals: {
        r2: 0.0,
        a: 1.0,
        enabled: 0.0,
        b: 0.0,
        tex_ang: 0.0,
        thickoutline: 0.0,
        g: 0.0,
        textured: 0.0,
        g2: 1.0,
        tex_zoom: 1.0,
        additive: 0.0,
        border_a: 0.1,
        border_b: 1.0,
        b2: 0.0,
        a2: 0.0,
        r: 1.0,
        border_g: 1.0,
        rad: 0.1,
        x: 0.5,
        y: 0.5,
        ang: 0.0,
        sides: 4.0,
        border_r: 1.0
      },
      init_eqs: function (m) {
        m.rkeys = [];
        return m;
      },
      frame_eqs: function (m) {
        return m;
      }
    }],
    warp: "shader_body {\nret = texture2D(sampler_main, uv).rgb;\nret -= 0.004;\n}\n",
    comp: "shader_body {\nret = texture2D(sampler_main, uv).rgb;\nret *= hue_shader;\n}\n"
  };
  return pmap;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* eslint-enable */

/***/ }),

/***/ "./src/equations/presetEquationRunner.js":
/*!***********************************************!*\
  !*** ./src/equations/presetEquationRunner.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PresetEquationRunner; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

class PresetEquationRunner {
  constructor(preset, globalVars, opts) {
    this.preset = preset;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.qs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(1, 33).map(x => `q${x}`);
    this.ts = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(1, 9).map(x => `t${x}`);
    this.regs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(100).map(x => {
      if (x < 10) {
        return `reg0${x}`;
      }

      return `reg${x}`;
    });
    this.initializeEquations(globalVars);
  }

  initializeEquations(globalVars) {
    this.runVertEQs = this.preset.pixel_eqs !== "";
    this.mdVSQInit = null;
    this.mdVSRegs = null;
    this.mdVSFrame = null;
    this.mdVSUserKeys = null;
    this.mdVSFrameMap = null;
    this.mdVSShapes = null;
    this.mdVSUserKeysShapes = null;
    this.mdVSFrameMapShapes = null;
    this.mdVSWaves = null;
    this.mdVSUserKeysWaves = null;
    this.mdVSFrameMapWaves = null;
    this.mdVSQAfterFrame = null;
    this.gmegabuf = new Array(1048576).fill(0);
    const mdVSBase = {
      frame: globalVars.frame,
      time: globalVars.time,
      fps: globalVars.fps,
      bass: globalVars.bass,
      bass_att: globalVars.bass_att,
      mid: globalVars.mid,
      mid_att: globalVars.mid_att,
      treb: globalVars.treb,
      treb_att: globalVars.treb_att,
      meshx: this.mesh_width,
      meshy: this.mesh_height,
      aspectx: this.invAspectx,
      aspecty: this.invAspecty,
      pixelsx: this.texsizeX,
      pixelsy: this.texsizeY,
      gmegabuf: this.gmegabuf
    };
    this.mdVS = Object.assign({}, this.preset.baseVals, mdVSBase);
    this.mdVS.megabuf = new Array(1048576).fill(0);
    this.mdVS.rand_start = new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]);
    this.mdVS.rand_preset = new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]);
    const nonUserKeys = this.qs.concat(this.regs, Object.keys(this.mdVS));
    const mdVSAfterInit = this.preset.init_eqs(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].cloneVars(this.mdVS)); // qs need to be initialized to there init values every frame

    this.mdVSQInit = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSAfterInit, this.qs);
    this.mdVSRegs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSAfterInit, this.regs);
    const initUserVars = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSAfterInit, Object.keys(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].omit(mdVSAfterInit, nonUserKeys)));
    initUserVars.megabuf = mdVSAfterInit.megabuf;
    initUserVars.gmegabuf = mdVSAfterInit.gmegabuf;
    this.mdVSFrame = this.preset.frame_eqs(Object.assign({}, this.mdVS, this.mdVSQInit, this.mdVSRegs, initUserVars)); // user vars need to be copied between frames

    this.mdVSUserKeys = Object.keys(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].omit(this.mdVSFrame, nonUserKeys)); // Determine vars to carry over between frames

    this.mdVSFrameMap = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSFrame, this.mdVSUserKeys); // qs for shapes

    this.mdVSQAfterFrame = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSFrame, this.qs);
    this.mdVSRegs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSFrame, this.regs);
    this.mdVSWaves = [];
    this.mdVSTWaveInits = [];
    this.mdVSUserKeysWaves = [];
    this.mdVSFrameMapWaves = [];

    if (this.preset.waves && this.preset.waves.length > 0) {
      for (let i = 0; i < this.preset.waves.length; i++) {
        const wave = this.preset.waves[i];
        const baseVals = wave.baseVals;

        if (baseVals.enabled !== 0) {
          let mdVSWave = Object.assign({}, baseVals, mdVSBase);
          const nonUserWaveKeys = this.qs.concat(this.ts, this.regs, Object.keys(mdVSWave));
          Object.assign(mdVSWave, this.mdVSQAfterFrame, this.mdVSRegs);
          mdVSWave.megabuf = new Array(1048576).fill(0);

          if (wave.init_eqs) {
            mdVSWave = wave.init_eqs(mdVSWave);
            this.mdVSRegs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSWave, this.regs); // base vals need to be reset

            Object.assign(mdVSWave, baseVals);
          }

          this.mdVSWaves.push(mdVSWave);
          this.mdVSTWaveInits.push(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSWave, this.ts));
          this.mdVSUserKeysWaves.push(Object.keys(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].omit(mdVSWave, nonUserWaveKeys)));
          this.mdVSFrameMapWaves.push(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSWave, this.mdVSUserKeysWaves[i]));
        } else {
          this.mdVSWaves.push({});
          this.mdVSTWaveInits.push({});
          this.mdVSUserKeysWaves.push([]);
          this.mdVSFrameMapWaves.push({});
        }
      }
    }

    this.mdVSShapes = [];
    this.mdVSTShapeInits = [];
    this.mdVSUserKeysShapes = [];
    this.mdVSFrameMapShapes = [];

    if (this.preset.shapes && this.preset.shapes.length > 0) {
      for (let i = 0; i < this.preset.shapes.length; i++) {
        const shape = this.preset.shapes[i];
        const baseVals = shape.baseVals;

        if (baseVals.enabled !== 0) {
          let mdVSShape = Object.assign({}, baseVals, mdVSBase);
          const nonUserShapeKeys = this.qs.concat(this.ts, this.regs, Object.keys(mdVSShape));
          Object.assign(mdVSShape, this.mdVSQAfterFrame, this.mdVSRegs);
          mdVSShape.megabuf = new Array(1048576).fill(0);

          if (shape.init_eqs) {
            mdVSShape = shape.init_eqs(mdVSShape);
            this.mdVSRegs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSShape, this.regs); // base vals need to be reset

            Object.assign(mdVSShape, baseVals);
          }

          this.mdVSShapes.push(mdVSShape);
          this.mdVSTShapeInits.push(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSShape, this.ts));
          this.mdVSUserKeysShapes.push(Object.keys(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].omit(mdVSShape, nonUserShapeKeys)));
          this.mdVSFrameMapShapes.push(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSShape, this.mdVSUserKeysShapes[i]));
        } else {
          this.mdVSShapes.push({});
          this.mdVSTShapeInits.push({});
          this.mdVSUserKeysShapes.push([]);
          this.mdVSFrameMapShapes.push({});
        }
      }
    }
  }

  updatePreset(preset, globalVars) {
    this.preset = preset;
    this.initializeEquations(globalVars);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  runFrameEquations(globalVars) {
    this.mdVSFrame = Object.assign({}, this.mdVS, this.mdVSQInit, this.mdVSFrameMap, globalVars);
    this.mdVSFrame = this.preset.frame_eqs(this.mdVSFrame);
    this.mdVSFrameMap = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSFrame, this.mdVSUserKeys);
    this.mdVSQAfterFrame = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSFrame, this.qs);
    return this.mdVSFrame;
  }

  runPixelEquations(mdVSVertex) {
    return this.preset.pixel_eqs(mdVSVertex);
  }

  runShapeFrameEquations(shapeIdx, mdVSShape) {
    return this.preset.shapes[shapeIdx].frame_eqs(mdVSShape);
  }

  runWaveFrameEquations(waveIdx, mdVSWave) {
    return this.preset.waves[waveIdx].frame_eqs(mdVSWave);
  }

  runWavePointEquations(waveIdx, mdVSWaveFrame) {
    return this.preset.waves[waveIdx].point_eqs(mdVSWaveFrame);
  }

}

/***/ }),

/***/ "./src/equations/presetEquationRunnerWASM.js":
/*!***************************************************!*\
  !*** ./src/equations/presetEquationRunnerWASM.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PresetEquationRunnerWASM; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

class PresetEquationRunnerWASM {
  constructor(preset, globalVars, opts) {
    this.preset = preset;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.qs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(1, 33).map(x => `q${x}`);
    this.ts = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(1, 9).map(x => `t${x}`);
    this.regs = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].range(100).map(x => {
      if (x < 10) {
        return `reg0${x}`;
      }

      return `reg${x}`;
    });
    this.globalKeys = ["frame", "time", "fps", "bass", "bass_att", "mid", "mid_att", "treb", "treb_att", "meshx", "meshy", "aspectx", "aspecty", "pixelsx", "pixelsy"];
    this.frameKeys = ["decay", "wave_a", "wave_r", "wave_g", "wave_b", "wave_x", "wave_y", "wave_scale", "wave_smoothing", "wave_mode", "old_wave_mode", "wave_mystery", "ob_size", "ob_r", "ob_g", "ob_b", "ob_a", "ib_size", "ib_r", "ib_g", "ib_b", "ib_a", "mv_x", "mv_y", "mv_dx", "mv_dy", "mv_l", "mv_r", "mv_g", "mv_b", "mv_a", "echo_zoom", "echo_alpha", "echo_orient", "wave_dots", "wave_thick", "additivewave", "wave_brighten", "modwavealphabyvolume", "modwavealphastart", "modwavealphaend", "darken_center", "gammaadj", "warp", "warpanimspeed", "warpscale", "zoom", "zoomexp", "rot", "cx", "cy", "dx", "dy", "sx", "sy", "fshader", "wrap", "invert", "brighten", "darken", "solarize", "bmotionvectorson", "b1n", "b2n", "b3n", "b1x", "b2x", "b3x", "b1ed"];
    this.waveFrameKeys = ["samples", "sep", "scaling", "spectrum", "smoothing", "r", "g", "b", "a"];
    this.waveFrameInputKeys = ["samples", "r", "g", "b", "a"];
    this.initializeEquations(globalVars);
  }

  getQVars(pool) {
    return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pickWasm(this.preset.globalPools[pool], this.qs);
  }

  getTVars(pool) {
    return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pickWasm(this.preset.globalPools[pool], this.ts);
  }

  initializeEquations(globalVars) {
    this.runVertEQs = !!this.preset.pixel_eqs;
    this.mdVSQInit = null;
    this.mdVSQAfterFrame = null;
    const mdVSBase = {
      frame: globalVars.frame,
      time: globalVars.time,
      fps: globalVars.fps,
      bass: globalVars.bass,
      bass_att: globalVars.bass_att,
      mid: globalVars.mid,
      mid_att: globalVars.mid_att,
      treb: globalVars.treb,
      treb_att: globalVars.treb_att,
      meshx: this.mesh_width,
      meshy: this.mesh_height,
      aspectx: this.invAspectx,
      aspecty: this.invAspecty,
      pixelsx: this.texsizeX,
      pixelsy: this.texsizeY
    };
    this.mdVS = Object.assign({}, this.preset.baseVals, mdVSBase); // eslint-disable-next-line max-len

    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools.perFrame, this.mdVS, Object.keys(this.mdVS));
    this.rand_start = new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]);
    this.rand_preset = new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]);
    this.preset.init_eqs(); // qs need to be initialized to there init values every frame

    this.mdVSQInit = this.getQVars("perFrame");
    this.preset.frame_eqs();
    this.mdVSQAfterFrame = this.getQVars("perFrame");
    this.mdVSTWaveInits = [];

    if (this.preset.waves && this.preset.waves.length > 0) {
      for (let i = 0; i < this.preset.waves.length; i++) {
        const wave = this.preset.waves[i];
        const baseVals = wave.baseVals;

        if (baseVals.enabled !== 0) {
          // eslint-disable-next-line max-len
          _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${i}`], baseVals, Object.keys(baseVals));

          if (wave.init_eqs) {
            wave.init_eqs(); // base vals need to be reset
            // eslint-disable-next-line max-len

            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${i}`], baseVals, Object.keys(baseVals));
          }

          this.mdVSTWaveInits.push(this.getTVars(`wavePerFrame${i}`));
        } else {
          this.mdVSTWaveInits.push({});
        }
      }
    }

    this.mdVSTShapeInits = [];

    if (this.preset.shapes && this.preset.shapes.length > 0) {
      for (let i = 0; i < this.preset.shapes.length; i++) {
        const shape = this.preset.shapes[i];
        const baseVals = shape.baseVals;

        if (baseVals.enabled !== 0) {
          // eslint-disable-next-line max-len
          _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`shapePerFrame${i}`], baseVals, Object.keys(baseVals));

          if (shape.init_eqs) {
            shape.init_eqs(); // base vals need to be reset
            // eslint-disable-next-line max-len

            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`shapePerFrame${i}`], baseVals, Object.keys(baseVals));
          }

          this.mdVSTShapeInits.push(this.getTVars(`shapePerFrame${i}`));
        } else {
          this.mdVSTShapeInits.push({});
        }
      }
    }
  }

  updatePreset(preset, globalVars) {
    this.preset = preset;
    this.initializeEquations(globalVars);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  runFrameEquations(globalVars) {
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools.perFrame, this.mdVS, this.frameKeys);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools.perFrame, this.mdVSQInit, this.qs);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools.perFrame, globalVars, this.globalKeys);
    this.preset.frame_eqs();
    this.preset.save_qs();
    this.mdVSQAfterFrame = this.getQVars("perFrame"); // eslint-disable-next-line max-len

    const mdVSFrame = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pickWasm(this.preset.globalPools.perFrame, [...this.frameKeys, ...this.globalKeys]);
    mdVSFrame.rand_preset = this.rand_preset;
    mdVSFrame.rand_start = this.rand_start;
    return mdVSFrame;
  }
  /* eslint-disable max-len */


  runWaveFrameEquations(waveIdx, globalVars) {
    const baseVals = this.preset.waves[waveIdx].baseVals;
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${waveIdx}`], baseVals, this.waveFrameInputKeys);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${waveIdx}`], this.mdVSQAfterFrame, this.qs);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${waveIdx}`], this.mdVSTWaveInits[waveIdx], this.ts);
    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(this.preset.globalPools[`wavePerFrame${waveIdx}`], globalVars, this.globalKeys);
    this.preset.waves[waveIdx].frame_eqs();
    return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pickWasm(this.preset.globalPools[`wavePerFrame${waveIdx}`], this.waveFrameKeys);
  }
  /* eslint-enable max-len */


}

/***/ }),

/***/ "./src/image/imageTextures.js":
/*!************************************!*\
  !*** ./src/image/imageTextures.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ImageTextures; });
class ImageTextures {
  constructor(gl) {
    this.gl = gl;
    this.anisoExt = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    this.samplers = {};
    /* eslint-disable max-len */

    this.clouds2Image = new Image();

    this.clouds2Image.onload = () => {
      this.samplers.clouds2 = this.gl.createTexture();
      this.bindTexture(this.samplers.clouds2, this.clouds2Image, 128, 128);
    };

    this.clouds2Image.src = "data:image/jpeg;base64,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";
    this.emptyImage = new Image();

    this.emptyImage.onload = () => {
      this.samplers.empty = this.gl.createTexture();
      this.bindTexture(this.samplers.empty, this.emptyImage, 1, 1);
    };

    this.emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    /* eslint-enable max-len */
  }

  bindTexture(texture, data, width, height) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    if (this.anisoExt) {
      const max = this.gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.gl.TEXTURE_2D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }
  }

  loadExtraImages(imageData) {
    Object.keys(imageData).forEach(imageName => {
      const {
        data,
        width,
        height
      } = imageData[imageName];

      if (!this.samplers[imageName]) {
        const image = new Image();

        image.onload = () => {
          this.samplers[imageName] = this.gl.createTexture();
          this.bindTexture(this.samplers[imageName], image, width, height);
        };

        image.src = data;
      }
    });
  }

  getTexture(sampler) {
    const tex = this.samplers[sampler];

    if (tex) {
      return tex;
    }

    return this.samplers.clouds2;
  }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Butterchurn; });
/* harmony import */ var ecma_proposal_math_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ecma-proposal-math-extensions */ "./node_modules/ecma-proposal-math-extensions/reference-implementation/index.js");
/* harmony import */ var ecma_proposal_math_extensions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ecma_proposal_math_extensions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _presetBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presetBase */ "./src/presetBase.js");
/* harmony import */ var _presetBase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_presetBase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _visualizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visualizer */ "./src/visualizer.js");



class Butterchurn {
  static createVisualizer(context, canvas, opts) {
    return new _visualizer__WEBPACK_IMPORTED_MODULE_2__["default"](context, canvas, opts);
  }

}

/***/ }),

/***/ "./src/noise/noise.js":
/*!****************************!*\
  !*** ./src/noise/noise.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Noise; });
class Noise {
  constructor(gl) {
    this.gl = gl;
    this.anisoExt = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    this.noiseTexLQ = this.gl.createTexture();
    this.noiseTexLQLite = this.gl.createTexture();
    this.noiseTexMQ = this.gl.createTexture();
    this.noiseTexHQ = this.gl.createTexture();
    this.noiseTexVolLQ = this.gl.createTexture();
    this.noiseTexVolHQ = this.gl.createTexture();
    this.nTexArrLQ = Noise.createNoiseTex(256, 1);
    this.nTexArrLQLite = Noise.createNoiseTex(32, 1);
    this.nTexArrMQ = Noise.createNoiseTex(256, 4);
    this.nTexArrHQ = Noise.createNoiseTex(256, 8);
    this.nTexArrVolLQ = Noise.createNoiseVolTex(32, 1);
    this.nTexArrVolHQ = Noise.createNoiseVolTex(32, 4);
    this.bindTexture(this.noiseTexLQ, this.nTexArrLQ, 256, 256);
    this.bindTexture(this.noiseTexLQLite, this.nTexArrLQLite, 32, 32);
    this.bindTexture(this.noiseTexMQ, this.nTexArrMQ, 256, 256);
    this.bindTexture(this.noiseTexHQ, this.nTexArrHQ, 256, 256);
    this.bindTexture3D(this.noiseTexVolLQ, this.nTexArrVolLQ, 32, 32, 32);
    this.bindTexture3D(this.noiseTexVolHQ, this.nTexArrVolHQ, 32, 32, 32);
    this.noiseTexPointLQ = this.gl.createSampler();
    gl.samplerParameteri(this.noiseTexPointLQ, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.samplerParameteri(this.noiseTexPointLQ, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.samplerParameteri(this.noiseTexPointLQ, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.noiseTexPointLQ, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  bindTexture(texture, data, width, height) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    if (this.anisoExt) {
      const max = this.gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.gl.TEXTURE_2D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }
  }

  bindTexture3D(texture, data, width, height, depth) {
    this.gl.bindTexture(this.gl.TEXTURE_3D, texture);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texImage3D(this.gl.TEXTURE_3D, 0, this.gl.RGBA, width, height, depth, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.generateMipmap(this.gl.TEXTURE_3D);
    this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_WRAP_R, this.gl.REPEAT);
    this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_3D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    if (this.anisoExt) {
      const max = this.gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.gl.TEXTURE_3D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }
  }

  static fCubicInterpolate(y0, y1, y2, y3, t) {
    const t2 = t * t;
    const t3 = t * t2;
    const a0 = y3 - y2 - y0 + y1;
    const a1 = y0 - y1 - a0;
    const a2 = y2 - y0;
    const a3 = y1;
    return a0 * t3 + a1 * t2 + a2 * t + a3;
  }

  static dwCubicInterpolate(y0, y1, y2, y3, t) {
    const ret = [];

    for (let i = 0; i < 4; i++) {
      let f = Noise.fCubicInterpolate(y0[i] / 255.0, y1[i] / 255.0, y2[i] / 255.0, y3[i] / 255.0, t);
      f = Math.clamp(f, 0, 1);
      ret[i] = f * 255;
    }

    return ret;
  }

  static createNoiseVolTex(noiseSize, zoom) {
    const nsize = noiseSize * noiseSize * noiseSize;
    const texArr = new Uint8Array(nsize * 4);
    const texRange = zoom > 1 ? 216 : 256;
    const halfTexRange = texRange * 0.5;

    for (let i = 0; i < nsize; i++) {
      texArr[i * 4 + 0] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 1] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 2] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 3] = Math.floor(Math.random() * texRange + halfTexRange);
    }

    const wordsPerSlice = noiseSize * noiseSize;
    const wordsPerLine = noiseSize;

    if (zoom > 1) {
      for (let z = 0; z < noiseSize; z += zoom) {
        for (let y = 0; y < noiseSize; y += zoom) {
          for (let x = 0; x < noiseSize; x++) {
            if (x % zoom !== 0) {
              const baseX = Math.floor(x / zoom) * zoom + noiseSize;
              const baseY = z * wordsPerSlice + y * wordsPerLine;
              const y0 = [];
              const y1 = [];
              const y2 = [];
              const y3 = [];

              for (let i = 0; i < 4; i++) {
                y0[i] = texArr[baseY * 4 + (baseX - zoom) % noiseSize * 4 + i];
                y1[i] = texArr[baseY * 4 + baseX % noiseSize * 4 + i];
                y2[i] = texArr[baseY * 4 + (baseX + zoom) % noiseSize * 4 + i];
                y3[i] = texArr[baseY * 4 + (baseX + zoom * 2) % noiseSize * 4 + i];
              }

              const t = x % zoom / zoom;
              const result = Noise.dwCubicInterpolate(y0, y1, y2, y3, t);

              for (let i = 0; i < 4; i++) {
                const offset = x * 4 + i;
                texArr[z * wordsPerSlice * 4 + y * wordsPerLine * 4 + offset] = result[i];
              }
            }
          }
        }
      }

      for (let z = 0; z < noiseSize; z += zoom) {
        for (let x = 0; x < noiseSize; x++) {
          for (let y = 0; y < noiseSize; y++) {
            if (y % zoom !== 0) {
              const baseY = Math.floor(y / zoom) * zoom + noiseSize;
              const baseZ = z * wordsPerSlice;
              const y0 = [];
              const y1 = [];
              const y2 = [];
              const y3 = [];

              for (let i = 0; i < 4; i++) {
                const offset = x * 4 + baseZ * 4 + i;
                y0[i] = texArr[(baseY - zoom) % noiseSize * wordsPerLine * 4 + offset];
                y1[i] = texArr[baseY % noiseSize * wordsPerLine * 4 + offset];
                y2[i] = texArr[(baseY + zoom) % noiseSize * wordsPerLine * 4 + offset];
                y3[i] = texArr[(baseY + zoom * 2) % noiseSize * wordsPerLine * 4 + offset];
              }

              const t = y % zoom / zoom;
              const result = Noise.dwCubicInterpolate(y0, y1, y2, y3, t);

              for (let i = 0; i < 4; i++) {
                const offset = x * 4 + baseZ * 4 + i;
                texArr[y * wordsPerLine * 4 + offset] = result[i];
              }
            }
          }
        }
      }

      for (let x = 0; x < noiseSize; x++) {
        for (let y = 0; y < noiseSize; y++) {
          for (let z = 0; z < noiseSize; z++) {
            if (z % zoom !== 0) {
              const baseY = y * wordsPerLine;
              const baseZ = Math.floor(z / zoom) * zoom + noiseSize;
              const y0 = [];
              const y1 = [];
              const y2 = [];
              const y3 = [];

              for (let i = 0; i < 4; i++) {
                const offset = x * 4 + baseY * 4 + i;
                y0[i] = texArr[(baseZ - zoom) % noiseSize * wordsPerSlice * 4 + offset];
                y1[i] = texArr[baseZ % noiseSize * wordsPerSlice * 4 + offset];
                y2[i] = texArr[(baseZ + zoom) % noiseSize * wordsPerSlice * 4 + offset];
                y3[i] = texArr[(baseZ + zoom * 2) % noiseSize * wordsPerSlice * 4 + offset];
              }

              const t = y % zoom / zoom;
              const result = Noise.dwCubicInterpolate(y0, y1, y2, y3, t);

              for (let i = 0; i < 4; i++) {
                const offset = x * 4 + baseY * 4 + i;
                texArr[z * wordsPerSlice * 4 + offset] = result[i];
              }
            }
          }
        }
      }
    }

    return texArr;
  }

  static createNoiseTex(noiseSize, zoom) {
    const nsize = noiseSize * noiseSize;
    const texArr = new Uint8Array(nsize * 4);
    const texRange = zoom > 1 ? 216 : 256;
    const halfTexRange = texRange * 0.5;

    for (let i = 0; i < nsize; i++) {
      texArr[i * 4 + 0] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 1] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 2] = Math.floor(Math.random() * texRange + halfTexRange);
      texArr[i * 4 + 3] = Math.floor(Math.random() * texRange + halfTexRange);
    }

    if (zoom > 1) {
      for (let y = 0; y < noiseSize; y += zoom) {
        for (let x = 0; x < noiseSize; x++) {
          if (x % zoom !== 0) {
            const baseX = Math.floor(x / zoom) * zoom + noiseSize;
            const baseY = y * noiseSize;
            const y0 = [];
            const y1 = [];
            const y2 = [];
            const y3 = [];

            for (let z = 0; z < 4; z++) {
              y0[z] = texArr[baseY * 4 + (baseX - zoom) % noiseSize * 4 + z];
              y1[z] = texArr[baseY * 4 + baseX % noiseSize * 4 + z];
              y2[z] = texArr[baseY * 4 + (baseX + zoom) % noiseSize * 4 + z];
              y3[z] = texArr[baseY * 4 + (baseX + zoom * 2) % noiseSize * 4 + z];
            }

            const t = x % zoom / zoom;
            const result = Noise.dwCubicInterpolate(y0, y1, y2, y3, t);

            for (let z = 0; z < 4; z++) {
              texArr[y * noiseSize * 4 + x * 4 + z] = result[z];
            }
          }
        }
      }

      for (let x = 0; x < noiseSize; x++) {
        for (let y = 0; y < noiseSize; y++) {
          if (y % zoom !== 0) {
            const baseY = Math.floor(y / zoom) * zoom + noiseSize;
            const y0 = [];
            const y1 = [];
            const y2 = [];
            const y3 = [];

            for (let z = 0; z < 4; z++) {
              y0[z] = texArr[(baseY - zoom) % noiseSize * noiseSize * 4 + x * 4 + z];
              y1[z] = texArr[baseY % noiseSize * noiseSize * 4 + x * 4 + z];
              y2[z] = texArr[(baseY + zoom) % noiseSize * noiseSize * 4 + x * 4 + z];
              y3[z] = texArr[(baseY + zoom * 2) % noiseSize * noiseSize * 4 + x * 4 + z];
            }

            const t = y % zoom / zoom;
            const result = Noise.dwCubicInterpolate(y0, y1, y2, y3, t);

            for (let z = 0; z < 4; z++) {
              texArr[y * noiseSize * 4 + x * 4 + z] = result[z];
            }
          }
        }
      }
    }

    return texArr;
  }

}

/***/ }),

/***/ "./src/presetBase.js":
/*!***************************!*\
  !*** ./src/presetBase.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable */
var EPSILON = 0.00001;

window.sqr = function sqr(x) {
  return x * x;
};

window.sqrt = function sqrt(x) {
  return Math.sqrt(Math.abs(x));
};

window.log10 = function log10(val) {
  return Math.log(val) * Math.LOG10E;
};

window.sign = function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
};

window.rand = function rand(x) {
  var xf = Math.floor(x);

  if (xf < 1) {
    return Math.random();
  }

  return Math.random() * xf;
};

window.randint = function randint(x) {
  return Math.floor(rand(x));
};

window.bnot = function bnot(x) {
  return Math.abs(x) < EPSILON ? 1 : 0;
};

function isFiniteNumber(num) {
  return isFinite(num) && !isNaN(num);
}

window.pow = function pow(x, y) {
  var z = Math.pow(x, y);

  if (!isFiniteNumber(z)) {
    // mostly from complex results
    return 0;
  }

  return z;
};

window.div = function div(x, y) {
  if (y === 0) {
    return 0;
  }

  return x / y;
};

window.mod = function mod(x, y) {
  if (y === 0) {
    return 0;
  }

  var z = Math.floor(x) % Math.floor(y);
  return z;
};

window.bitor = function bitor(x, y) {
  var z = Math.floor(x) | Math.floor(y);
  return z;
};

window.bitand = function bitand(x, y) {
  var z = Math.floor(x) & Math.floor(y);
  return z;
};

window.sigmoid = function sigmoid(x, y) {
  var t = 1 + Math.exp(-x * y);
  return Math.abs(t) > EPSILON ? 1.0 / t : 0;
};

window.bor = function bor(x, y) {
  return Math.abs(x) > EPSILON || Math.abs(y) > EPSILON ? 1 : 0;
};

window.band = function band(x, y) {
  return Math.abs(x) > EPSILON && Math.abs(y) > EPSILON ? 1 : 0;
};

window.equal = function equal(x, y) {
  return Math.abs(x - y) < EPSILON ? 1 : 0;
};

window.above = function above(x, y) {
  return x > y ? 1 : 0;
};

window.below = function below(x, y) {
  return x < y ? 1 : 0;
};

window.ifcond = function ifcond(x, y, z) {
  return Math.abs(x) > EPSILON ? y : z;
};

window.memcpy = function memcpy(megabuf, dst, src, len) {
  let destOffset = dst;
  let srcOffset = src;
  let copyLen = len;

  if (srcOffset < 0) {
    copyLen += srcOffset;
    destOffset -= srcOffset;
    srcOffset = 0;
  }

  if (destOffset < 0) {
    copyLen += destOffset;
    srcOffset -= destOffset;
    destOffset = 0;
  }

  if (copyLen > 0) {
    megabuf.copyWithin(destOffset, srcOffset, copyLen);
  }

  return dst;
};
/* eslint-enable */

/***/ }),

/***/ "./src/rendering/blendPattern.js":
/*!***************************************!*\
  !*** ./src/rendering/blendPattern.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlendPattern; });
class BlendPattern {
  constructor(opts) {
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.vertInfoA = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1));
    this.vertInfoC = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1));
    this.createBlendPattern();
  }

  static resizeMatrixValues(oldMat, oldWidth, oldHeight, newWidth, newHeight) {
    const newMat = new Float32Array((newWidth + 1) * (newHeight + 1));
    let nVert = 0;

    for (let j = 0; j < newHeight + 1; j++) {
      for (let i = 0; i < newWidth + 1; i++) {
        let x = i / newHeight;
        let y = j / newWidth;
        x *= oldWidth + 1;
        y *= oldHeight + 1;
        x = Math.clamp(x, 0, oldWidth - 1);
        y = Math.clamp(y, 0, oldHeight - 1);
        const nx = Math.floor(x);
        const ny = Math.floor(y);
        const dx = x - nx;
        const dy = y - ny;
        const val00 = oldMat[ny * (oldWidth + 1) + nx];
        const val01 = oldMat[ny * (oldWidth + 1) + (nx + 1)];
        const val10 = oldMat[(ny + 1) * (oldWidth + 1) + nx];
        const val11 = oldMat[(ny + 1) * (oldWidth + 1) + (nx + 1)];
        newMat[nVert] = val00 * (1 - dx) * (1 - dy) + val01 * dx * (1 - dy) + val10 * (1 - dx) * dy + val11 * dx * dy;
        nVert += 1;
      }
    }

    return newMat;
  }

  updateGlobals(opts) {
    const oldMeshWidth = this.mesh_width;
    const oldMeshHeight = this.mesh_height;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;

    if (this.mesh_width !== oldMeshWidth || this.mesh_height !== oldMeshHeight) {
      this.vertInfoA = BlendPattern.resizeMatrixValues(this.vertInfoA, oldMeshWidth, oldMeshHeight, this.mesh_width, this.mesh_height);
      this.vertInfoC = BlendPattern.resizeMatrixValues(this.vertInfoC, oldMeshWidth, oldMeshHeight, this.mesh_width, this.mesh_height);
    }
  }

  genPlasma(x0, x1, y0, y1, dt) {
    const midx = Math.floor((x0 + x1) / 2);
    const midy = Math.floor((y0 + y1) / 2);
    let t00 = this.vertInfoC[y0 * (this.mesh_width + 1) + x0];
    let t01 = this.vertInfoC[y0 * (this.mesh_width + 1) + x1];
    let t10 = this.vertInfoC[y1 * (this.mesh_width + 1) + x0];
    let t11 = this.vertInfoC[y1 * (this.mesh_width + 1) + x1];

    if (y1 - y0 >= 2) {
      if (x0 === 0) {
        this.vertInfoC[midy * (this.mesh_width + 1) + x0] = 0.5 * (t00 + t10) + (Math.random() * 2 - 1) * dt * this.aspecty;
      }

      this.vertInfoC[midy * (this.mesh_width + 1) + x1] = 0.5 * (t01 + t11) + (Math.random() * 2 - 1) * dt * this.aspecty;
    }

    if (x1 - x0 >= 2) {
      if (y0 === 0) {
        this.vertInfoC[y0 * (this.mesh_width + 1) + midx] = 0.5 * (t00 + t01) + (Math.random() * 2 - 1) * dt * this.aspectx;
      }

      this.vertInfoC[y1 * (this.mesh_width + 1) + midx] = 0.5 * (t10 + t11) + (Math.random() * 2 - 1) * dt * this.aspectx;
    }

    if (y1 - y0 >= 2 && x1 - x0 >= 2) {
      t00 = this.vertInfoC[midy * (this.mesh_width + 1) + x0];
      t01 = this.vertInfoC[midy * (this.mesh_width + 1) + x1];
      t10 = this.vertInfoC[y0 * (this.mesh_width + 1) + midx];
      t11 = this.vertInfoC[y1 * (this.mesh_width + 1) + midx];
      this.vertInfoC[midy * (this.mesh_width + 1) + midx] = 0.25 * (t10 + t11 + t00 + t01) + (Math.random() * 2 - 1) * dt;
      this.genPlasma(x0, midx, y0, midy, dt * 0.5);
      this.genPlasma(midx, x1, y0, midy, dt * 0.5);
      this.genPlasma(x0, midx, midy, y1, dt * 0.5);
      this.genPlasma(midx, x1, midy, y1, dt * 0.5);
    }
  }

  createBlendPattern() {
    const mixType = 1 + Math.floor(Math.random() * 3);

    if (mixType === 0) {
      // not currently used
      let nVert = 0;

      for (let y = 0; y <= this.mesh_height; y++) {
        for (let x = 0; x <= this.mesh_width; x++) {
          this.vertInfoA[nVert] = 1;
          this.vertInfoC[nVert] = 0;
          nVert += 1;
        }
      }
    } else if (mixType === 1) {
      const ang = Math.random() * 6.28;
      const vx = Math.cos(ang);
      const vy = Math.sin(ang);
      const band = 0.1 + 0.2 * Math.random();
      const invBand = 1.0 / band;
      let nVert = 0;

      for (let y = 0; y <= this.mesh_height; y++) {
        const fy = y / this.mesh_height * this.aspecty;

        for (let x = 0; x <= this.mesh_width; x++) {
          const fx = x / this.mesh_width * this.aspectx;
          let t = (fx - 0.5) * vx + (fy - 0.5) * vy + 0.5;
          t = (t - 0.5) / Math.sqrt(2) + 0.5;
          this.vertInfoA[nVert] = invBand * (1 + band);
          this.vertInfoC[nVert] = -invBand + invBand * t;
          nVert += 1;
        }
      }
    } else if (mixType === 2) {
      const band = 0.12 + 0.13 * Math.random();
      const invBand = 1.0 / band;
      this.vertInfoC[0] = Math.random();
      this.vertInfoC[this.mesh_width] = Math.random();
      this.vertInfoC[this.mesh_height * (this.mesh_width + 1)] = Math.random();
      this.vertInfoC[this.mesh_height * (this.mesh_width + 1) + this.mesh_width] = Math.random();
      this.genPlasma(0, this.mesh_width, 0, this.mesh_height, 0.25);
      let minc = this.vertInfoC[0];
      let maxc = this.vertInfoC[0];
      let nVert = 0;

      for (let y = 0; y <= this.mesh_height; y++) {
        for (let x = 0; x <= this.mesh_width; x++) {
          if (minc > this.vertInfoC[nVert]) {
            minc = this.vertInfoC[nVert];
          }

          if (maxc < this.vertInfoC[nVert]) {
            maxc = this.vertInfoC[nVert];
          }

          nVert += 1;
        }
      }

      const mult = 1.0 / (maxc - minc);
      nVert = 0;

      for (let y = 0; y <= this.mesh_height; y++) {
        for (let x = 0; x <= this.mesh_width; x++) {
          const t = (this.vertInfoC[nVert] - minc) * mult;
          this.vertInfoA[nVert] = invBand * (1 + band);
          this.vertInfoC[nVert] = -invBand + invBand * t;
          nVert += 1;
        }
      }
    } else if (mixType === 3) {
      const band = 0.02 + 0.14 * Math.random() + 0.34 * Math.random();
      const invBand = 1.0 / band;
      const dir = Math.floor(Math.random() * 2) * 2 - 1;
      let nVert = 0;

      for (let y = 0; y <= this.mesh_height; y++) {
        const dy = (y / this.mesh_height - 0.5) * this.aspecty;

        for (let x = 0; x <= this.mesh_width; x++) {
          const dx = (x / this.mesh_width - 0.5) * this.aspectx;
          let t = Math.sqrt(dx * dx + dy * dy) * 1.41421;

          if (dir === -1) {
            t = 1 - t;
          }

          this.vertInfoA[nVert] = invBand * (1 + band);
          this.vertInfoC[nVert] = -invBand + invBand * t;
          nVert += 1;
        }
      }
    }
  }

}

/***/ }),

/***/ "./src/rendering/motionVectors/motionVectors.js":
/*!******************************************************!*\
  !*** ./src/rendering/motionVectors/motionVectors.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MotionVectors; });
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class MotionVectors {
  constructor(gl, opts) {
    this.gl = gl;
    this.maxX = 64;
    this.maxY = 48;
    this.positions = new Float32Array(this.maxX * this.maxY * 2 * 3);
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.positionVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aPos;
      void main(void) {
        gl_Position = vec4(aPos, 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      out vec4 fragColor;
      uniform vec4 u_color;
      void main(void) {
        fragColor = u_color;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLoc = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.colorLoc = this.gl.getUniformLocation(this.shaderProgram, "u_color");
  }

  getMotionDir(warpUVs, fx, fy) {
    const y0 = Math.floor(fy * this.mesh_height);
    const dy = fy * this.mesh_height - y0;
    const x0 = Math.floor(fx * this.mesh_width);
    const dx = fx * this.mesh_width - x0;
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    const gridX1 = this.mesh_width + 1;
    let fx2;
    let fy2;
    fx2 = warpUVs[(y0 * gridX1 + x0) * 2 + 0] * (1 - dx) * (1 - dy);
    fy2 = warpUVs[(y0 * gridX1 + x0) * 2 + 1] * (1 - dx) * (1 - dy);
    fx2 += warpUVs[(y0 * gridX1 + x1) * 2 + 0] * dx * (1 - dy);
    fy2 += warpUVs[(y0 * gridX1 + x1) * 2 + 1] * dx * (1 - dy);
    fx2 += warpUVs[(y1 * gridX1 + x0) * 2 + 0] * (1 - dx) * dy;
    fy2 += warpUVs[(y1 * gridX1 + x0) * 2 + 1] * (1 - dx) * dy;
    fx2 += warpUVs[(y1 * gridX1 + x1) * 2 + 0] * dx * dy;
    fy2 += warpUVs[(y1 * gridX1 + x1) * 2 + 1] * dx * dy;
    return [fx2, 1.0 - fy2];
  }

  generateMotionVectors(mdVSFrame, warpUVs) {
    const mvOn = mdVSFrame.bmotionvectorson;
    const mvA = mvOn === 0 ? 0 : mdVSFrame.mv_a;
    let nX = Math.floor(mdVSFrame.mv_x);
    let nY = Math.floor(mdVSFrame.mv_y);

    if (mvA > 0.001 && nX > 0 && nY > 0) {
      let dx = mdVSFrame.mv_x - nX;
      let dy = mdVSFrame.mv_y - nY;

      if (nX > this.maxX) {
        nX = this.maxX;
        dx = 0;
      }

      if (nY > this.maxY) {
        nY = this.maxY;
        dy = 0;
      }

      const dx2 = mdVSFrame.mv_dx;
      const dy2 = mdVSFrame.mv_dy;
      const lenMult = mdVSFrame.mv_l;
      const minLen = 1.0 / this.texsizeX;
      this.numVecVerts = 0;

      for (let j = 0; j < nY; j++) {
        let fy = (j + 0.25) / (nY + dy + 0.25 - 1.0);
        fy -= dy2;

        if (fy > 0.0001 && fy < 0.9999) {
          for (let i = 0; i < nX; i++) {
            let fx = (i + 0.25) / (nX + dx + 0.25 - 1.0);
            fx += dx2;

            if (fx > 0.0001 && fx < 0.9999) {
              const fx2arr = this.getMotionDir(warpUVs, fx, fy);
              let fx2 = fx2arr[0];
              let fy2 = fx2arr[1];
              let dxi = fx2 - fx;
              let dyi = fy2 - fy;
              dxi *= lenMult;
              dyi *= lenMult;
              let fdist = Math.sqrt(dxi * dxi + dyi * dyi);

              if (fdist < minLen && fdist > 0.00000001) {
                fdist = minLen / fdist;
                dxi *= fdist;
                dyi *= fdist;
              } else {
                dxi = minLen;
                dxi = minLen;
              }

              fx2 = fx + dxi;
              fy2 = fy + dyi;
              const vx1 = 2.0 * fx - 1.0;
              const vy1 = 2.0 * fy - 1.0;
              const vx2 = 2.0 * fx2 - 1.0;
              const vy2 = 2.0 * fy2 - 1.0;
              this.positions[this.numVecVerts * 3 + 0] = vx1;
              this.positions[this.numVecVerts * 3 + 1] = vy1;
              this.positions[this.numVecVerts * 3 + 2] = 0;
              this.positions[(this.numVecVerts + 1) * 3 + 0] = vx2;
              this.positions[(this.numVecVerts + 1) * 3 + 1] = vy2;
              this.positions[(this.numVecVerts + 1) * 3 + 2] = 0;
              this.numVecVerts += 2;
            }
          }
        }
      }

      if (this.numVecVerts > 0) {
        this.color = [mdVSFrame.mv_r, mdVSFrame.mv_g, mdVSFrame.mv_b, mvA];
        return true;
      }
    }

    return false;
  }

  drawMotionVectors(mdVSFrame, warpUVs) {
    if (this.generateMotionVectors(mdVSFrame, warpUVs)) {
      this.gl.useProgram(this.shaderProgram);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aPosLoc, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aPosLoc);
      this.gl.uniform4fv(this.colorLoc, this.color);
      this.gl.lineWidth(1);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.drawArrays(this.gl.LINES, 0, this.numVecVerts);
    }
  }

}

/***/ }),

/***/ "./src/rendering/renderer.js":
/*!***********************************!*\
  !*** ./src/rendering/renderer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Renderer; });
/* harmony import */ var _audio_audioLevels__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../audio/audioLevels */ "./src/audio/audioLevels.js");
/* harmony import */ var _blankPreset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blankPreset */ "./src/blankPreset.js");
/* harmony import */ var _blankPreset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blankPreset__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _equations_presetEquationRunner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../equations/presetEquationRunner */ "./src/equations/presetEquationRunner.js");
/* harmony import */ var _equations_presetEquationRunnerWASM__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../equations/presetEquationRunnerWASM */ "./src/equations/presetEquationRunnerWASM.js");
/* harmony import */ var _waves_basicWaveform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./waves/basicWaveform */ "./src/rendering/waves/basicWaveform.js");
/* harmony import */ var _waves_customWaveform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./waves/customWaveform */ "./src/rendering/waves/customWaveform.js");
/* harmony import */ var _shapes_customShape__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shapes/customShape */ "./src/rendering/shapes/customShape.js");
/* harmony import */ var _sprites_border__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sprites/border */ "./src/rendering/sprites/border.js");
/* harmony import */ var _sprites_darkenCenter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sprites/darkenCenter */ "./src/rendering/sprites/darkenCenter.js");
/* harmony import */ var _motionVectors_motionVectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./motionVectors/motionVectors */ "./src/rendering/motionVectors/motionVectors.js");
/* harmony import */ var _shaders_warp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shaders/warp */ "./src/rendering/shaders/warp.js");
/* harmony import */ var _shaders_comp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shaders/comp */ "./src/rendering/shaders/comp.js");
/* harmony import */ var _shaders_output__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shaders/output */ "./src/rendering/shaders/output.js");
/* harmony import */ var _shaders_resample__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shaders/resample */ "./src/rendering/shaders/resample.js");
/* harmony import */ var _shaders_blur_blur__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shaders/blur/blur */ "./src/rendering/shaders/blur/blur.js");
/* harmony import */ var _noise_noise__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../noise/noise */ "./src/noise/noise.js");
/* harmony import */ var _image_imageTextures__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../image/imageTextures */ "./src/image/imageTextures.js");
/* harmony import */ var _text_titleText__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./text/titleText */ "./src/rendering/text/titleText.js");
/* harmony import */ var _blendPattern__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./blendPattern */ "./src/rendering/blendPattern.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../utils */ "./src/utils.js");




















class Renderer {
  constructor(gl, audio, opts) {
    this.gl = gl;
    this.audio = audio;
    this.frameNum = 0;
    this.fps = 30;
    this.time = 0;
    this.presetTime = 0;
    this.lastTime = performance.now();
    this.timeHist = [0];
    this.timeHistMax = 120;
    this.blending = false;
    this.blendStartTime = 0;
    this.blendProgress = 0;
    this.blendDuration = 0;
    this.width = opts.width || 1200;
    this.height = opts.height || 900;
    this.mesh_width = opts.meshWidth || 48;
    this.mesh_height = opts.meshHeight || 36;
    this.pixelRatio = opts.pixelRatio || window.devicePixelRatio || 1;
    this.textureRatio = opts.textureRatio || 1;
    this.outputFXAA = opts.outputFXAA || false;
    this.texsizeX = this.width * this.pixelRatio * this.textureRatio;
    this.texsizeY = this.height * this.pixelRatio * this.textureRatio;
    this.aspectx = this.texsizeY > this.texsizeX ? this.texsizeX / this.texsizeY : 1;
    this.aspecty = this.texsizeX > this.texsizeY ? this.texsizeY / this.texsizeX : 1;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.qs = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(1, 33).map(x => `q${x}`);
    this.ts = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(1, 9).map(x => `t${x}`);
    this.regs = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(0, 100).map(x => {
      if (x < 10) {
        return `reg0${x}`;
      }

      return `reg${x}`;
    });
    this.blurRatios = [[0.5, 0.25], [0.125, 0.125], [0.0625, 0.0625]];
    this.audioLevels = new _audio_audioLevels__WEBPACK_IMPORTED_MODULE_0__["default"](this.audio);
    this.prevFrameBuffer = this.gl.createFramebuffer();
    this.targetFrameBuffer = this.gl.createFramebuffer();
    this.prevTexture = this.gl.createTexture();
    this.targetTexture = this.gl.createTexture();
    this.compFrameBuffer = this.gl.createFramebuffer();
    this.compTexture = this.gl.createTexture();
    this.anisoExt = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    this.bindFrameBufferTexture(this.prevFrameBuffer, this.prevTexture);
    this.bindFrameBufferTexture(this.targetFrameBuffer, this.targetTexture);
    this.bindFrameBufferTexture(this.compFrameBuffer, this.compTexture);
    const params = {
      pixelRatio: this.pixelRatio,
      textureRatio: this.textureRatio,
      texsizeX: this.texsizeX,
      texsizeY: this.texsizeY,
      mesh_width: this.mesh_width,
      mesh_height: this.mesh_height,
      aspectx: this.aspectx,
      aspecty: this.aspecty
    };
    this.noise = new _noise_noise__WEBPACK_IMPORTED_MODULE_15__["default"](gl);
    this.image = new _image_imageTextures__WEBPACK_IMPORTED_MODULE_16__["default"](gl);
    this.warpShader = new _shaders_warp__WEBPACK_IMPORTED_MODULE_10__["default"](gl, this.noise, this.image, params);
    this.compShader = new _shaders_comp__WEBPACK_IMPORTED_MODULE_11__["default"](gl, this.noise, this.image, params);
    this.outputShader = new _shaders_output__WEBPACK_IMPORTED_MODULE_12__["default"](gl, params);
    this.prevWarpShader = new _shaders_warp__WEBPACK_IMPORTED_MODULE_10__["default"](gl, this.noise, this.image, params);
    this.prevCompShader = new _shaders_comp__WEBPACK_IMPORTED_MODULE_11__["default"](gl, this.noise, this.image, params);
    this.numBlurPasses = 0;
    this.blurShader1 = new _shaders_blur_blur__WEBPACK_IMPORTED_MODULE_14__["default"](0, this.blurRatios, gl, params);
    this.blurShader2 = new _shaders_blur_blur__WEBPACK_IMPORTED_MODULE_14__["default"](1, this.blurRatios, gl, params);
    this.blurShader3 = new _shaders_blur_blur__WEBPACK_IMPORTED_MODULE_14__["default"](2, this.blurRatios, gl, params);
    this.blurTexture1 = this.blurShader1.blurVerticalTexture;
    this.blurTexture2 = this.blurShader2.blurVerticalTexture;
    this.blurTexture3 = this.blurShader3.blurVerticalTexture;
    this.basicWaveform = new _waves_basicWaveform__WEBPACK_IMPORTED_MODULE_4__["default"](gl, params);
    this.customWaveforms = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(4).map(i => new _waves_customWaveform__WEBPACK_IMPORTED_MODULE_5__["default"](i, gl, params));
    this.customShapes = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(4).map(i => new _shapes_customShape__WEBPACK_IMPORTED_MODULE_6__["default"](i, gl, params));
    this.prevCustomWaveforms = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(4).map(i => new _waves_customWaveform__WEBPACK_IMPORTED_MODULE_5__["default"](i, gl, params));
    this.prevCustomShapes = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].range(4).map(i => new _shapes_customShape__WEBPACK_IMPORTED_MODULE_6__["default"](i, gl, params));
    this.darkenCenter = new _sprites_darkenCenter__WEBPACK_IMPORTED_MODULE_8__["default"](gl, params);
    this.innerBorder = new _sprites_border__WEBPACK_IMPORTED_MODULE_7__["default"](gl, params);
    this.outerBorder = new _sprites_border__WEBPACK_IMPORTED_MODULE_7__["default"](gl, params);
    this.motionVectors = new _motionVectors_motionVectors__WEBPACK_IMPORTED_MODULE_9__["default"](gl, params);
    this.titleText = new _text_titleText__WEBPACK_IMPORTED_MODULE_17__["default"](gl, params);
    this.blendPattern = new _blendPattern__WEBPACK_IMPORTED_MODULE_18__["default"](params);
    this.resampleShader = new _shaders_resample__WEBPACK_IMPORTED_MODULE_13__["default"](gl);
    this.supertext = {
      startTime: -1
    };
    this.warpUVs = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1) * 2);
    this.warpColor = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1) * 4);
    this.gl.clearColor(0, 0, 0, 1);
    this.blankPreset = _blankPreset__WEBPACK_IMPORTED_MODULE_1___default.a;
    const globalVars = {
      frame: 0,
      time: 0,
      fps: 45,
      bass: 1,
      bass_att: 1,
      mid: 1,
      mid_att: 1,
      treb: 1,
      treb_att: 1
    };
    this.preset = _blankPreset__WEBPACK_IMPORTED_MODULE_1___default.a;
    this.prevPreset = this.preset;
    this.presetEquationRunner = new _equations_presetEquationRunner__WEBPACK_IMPORTED_MODULE_2__["default"](this.preset, globalVars, params);
    this.prevPresetEquationRunner = new _equations_presetEquationRunner__WEBPACK_IMPORTED_MODULE_2__["default"](this.prevPreset, globalVars, params);

    if (!this.preset.useWASM) {
      this.regVars = this.presetEquationRunner.mdVSRegs;
    }
  }

  static getHighestBlur(t) {
    if (/sampler_blur3/.test(t)) {
      return 3;
    } else if (/sampler_blur2/.test(t)) {
      return 2;
    } else if (/sampler_blur1/.test(t)) {
      return 1;
    }

    return 0;
  }

  loadPreset(preset, blendTime) {
    this.blendPattern.createBlendPattern();
    this.blending = true;
    this.blendStartTime = this.time;
    this.blendDuration = blendTime;
    this.blendProgress = 0;
    this.prevPresetEquationRunner = this.presetEquationRunner;
    this.prevPreset = this.preset;
    this.preset = preset;
    this.presetTime = this.time;
    const globalVars = {
      frame: this.frameNum,
      time: this.time,
      fps: this.fps,
      bass: this.audioLevels.bass,
      bass_att: this.audioLevels.bass_att,
      mid: this.audioLevels.mid,
      mid_att: this.audioLevels.mid_att,
      treb: this.audioLevels.treb,
      treb_att: this.audioLevels.treb_att
    };
    const params = {
      pixelRatio: this.pixelRatio,
      textureRatio: this.textureRatio,
      texsizeX: this.texsizeX,
      texsizeY: this.texsizeY,
      mesh_width: this.mesh_width,
      mesh_height: this.mesh_height,
      aspectx: this.aspectx,
      aspecty: this.aspecty
    };

    if (preset.useWASM) {
      this.preset.globalPools.perFrame.old_wave_mode.value = this.prevPreset.baseVals.wave_mode;
      this.preset.baseVals.old_wave_mode = this.prevPreset.baseVals.wave_mode;
      this.presetEquationRunner = new _equations_presetEquationRunnerWASM__WEBPACK_IMPORTED_MODULE_3__["default"](this.preset, globalVars, params);

      if (this.preset.pixel_eqs_initialize_array) {
        this.preset.pixel_eqs_initialize_array(this.mesh_width, this.mesh_height);
      }
    } else {
      this.preset.baseVals.old_wave_mode = this.prevPreset.baseVals.wave_mode;
      this.presetEquationRunner = new _equations_presetEquationRunner__WEBPACK_IMPORTED_MODULE_2__["default"](this.preset, globalVars, params);
      this.regVars = this.presetEquationRunner.mdVSRegs;
    }

    const tmpWarpShader = this.prevWarpShader;
    this.prevWarpShader = this.warpShader;
    this.warpShader = tmpWarpShader;
    const tmpCompShader = this.prevCompShader;
    this.prevCompShader = this.compShader;
    this.compShader = tmpCompShader;
    const warpText = this.preset.warp.trim();
    const compText = this.preset.comp.trim();
    this.warpShader.updateShader(warpText);
    this.compShader.updateShader(compText);

    if (warpText.length === 0) {
      this.numBlurPasses = 0;
    } else {
      this.numBlurPasses = Renderer.getHighestBlur(warpText);
    }

    if (compText.length !== 0) {
      this.numBlurPasses = Math.max(this.numBlurPasses, Renderer.getHighestBlur(compText));
    }
  }

  loadExtraImages(imageData) {
    this.image.loadExtraImages(imageData);
  }

  setRendererSize(width, height, opts) {
    const oldTexsizeX = this.texsizeX;
    const oldTexsizeY = this.texsizeY;
    this.width = width;
    this.height = height;
    this.mesh_width = opts.meshWidth || this.mesh_width;
    this.mesh_height = opts.meshHeight || this.mesh_height;
    this.pixelRatio = opts.pixelRatio || this.pixelRatio;
    this.textureRatio = opts.textureRatio || this.textureRatio;
    this.texsizeX = width * this.pixelRatio * this.textureRatio;
    this.texsizeY = height * this.pixelRatio * this.textureRatio;
    this.aspectx = this.texsizeY > this.texsizeX ? this.texsizeX / this.texsizeY : 1;
    this.aspecty = this.texsizeX > this.texsizeY ? this.texsizeY / this.texsizeX : 1;

    if (this.texsizeX !== oldTexsizeX || this.texsizeY !== oldTexsizeY) {
      // copy target texture, because we flip prev/target at start of render
      const targetTextureNew = this.gl.createTexture();
      this.bindFrameBufferTexture(this.targetFrameBuffer, targetTextureNew);
      this.bindFrambufferAndSetViewport(this.targetFrameBuffer, this.texsizeX, this.texsizeY);
      this.resampleShader.renderQuadTexture(this.targetTexture);
      this.targetTexture = targetTextureNew;
      this.bindFrameBufferTexture(this.prevFrameBuffer, this.prevTexture);
      this.bindFrameBufferTexture(this.compFrameBuffer, this.compTexture);
    }

    this.updateGlobals(); // rerender current frame at new size

    if (this.frameNum > 0) {
      this.renderToScreen();
    }
  }

  setInternalMeshSize(width, height) {
    this.mesh_width = width;
    this.mesh_height = height;
    this.updateGlobals();
  }

  setOutputAA(useAA) {
    this.outputFXAA = useAA;
  }

  updateGlobals() {
    const params = {
      pixelRatio: this.pixelRatio,
      textureRatio: this.textureRatio,
      texsizeX: this.texsizeX,
      texsizeY: this.texsizeY,
      mesh_width: this.mesh_width,
      mesh_height: this.mesh_height,
      aspectx: this.aspectx,
      aspecty: this.aspecty
    };
    this.presetEquationRunner.updateGlobals(params);
    this.prevPresetEquationRunner.updateGlobals(params);
    this.warpShader.updateGlobals(params);
    this.prevWarpShader.updateGlobals(params);
    this.compShader.updateGlobals(params);
    this.prevCompShader.updateGlobals(params);
    this.outputShader.updateGlobals(params);
    this.blurShader1.updateGlobals(params);
    this.blurShader2.updateGlobals(params);
    this.blurShader3.updateGlobals(params);
    this.basicWaveform.updateGlobals(params);
    this.customWaveforms.forEach(wave => wave.updateGlobals(params));
    this.customShapes.forEach(shape => shape.updateGlobals(params));
    this.prevCustomWaveforms.forEach(wave => wave.updateGlobals(params));
    this.prevCustomShapes.forEach(shape => shape.updateGlobals(params));
    this.darkenCenter.updateGlobals(params);
    this.innerBorder.updateGlobals(params);
    this.outerBorder.updateGlobals(params);
    this.motionVectors.updateGlobals(params);
    this.titleText.updateGlobals(params);
    this.blendPattern.updateGlobals(params);
    this.warpUVs = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1) * 2);
    this.warpColor = new Float32Array((this.mesh_width + 1) * (this.mesh_height + 1) * 4);

    if (this.preset.pixel_eqs_initialize_array) {
      this.preset.pixel_eqs_initialize_array(this.mesh_width, this.mesh_height);
    }
  }

  calcTimeAndFPS(elapsedTime) {
    let elapsed;

    if (elapsedTime) {
      elapsed = elapsedTime;
    } else {
      const newTime = performance.now();
      elapsed = (newTime - this.lastTime) / 1000.0;

      if (elapsed > 1.0 || elapsed < 0.0 || this.frame < 2) {
        elapsed = 1.0 / 30.0;
      }

      this.lastTime = newTime;
    }

    this.time += 1.0 / this.fps;

    if (this.blending) {
      this.blendProgress = (this.time - this.blendStartTime) / this.blendDuration;

      if (this.blendProgress > 1.0) {
        this.blending = false;
      }
    }

    const newHistTime = this.timeHist[this.timeHist.length - 1] + elapsed;
    this.timeHist.push(newHistTime);

    if (this.timeHist.length > this.timeHistMax) {
      this.timeHist.shift();
    }

    const newFPS = this.timeHist.length / (newHistTime - this.timeHist[0]);

    if (Math.abs(newFPS - this.fps) > 3.0 && this.frame > this.timeHistMax) {
      this.fps = newFPS;
    } else {
      const damping = 0.93;
      this.fps = damping * this.fps + (1.0 - damping) * newFPS;
    }
  }

  runPixelEquations(presetEquationRunner, mdVSFrame, globalVars, blending) {
    const gridX = this.mesh_width;
    const gridZ = this.mesh_height;
    const gridX1 = gridX + 1;
    const gridZ1 = gridZ + 1;
    const warpTimeV = this.time * mdVSFrame.warpanimspeed;
    const warpScaleInv = 1.0 / mdVSFrame.warpscale;
    const warpf0 = 11.68 + 4.0 * Math.cos(warpTimeV * 1.413 + 10);
    const warpf1 = 8.77 + 3.0 * Math.cos(warpTimeV * 1.113 + 7);
    const warpf2 = 10.54 + 3.0 * Math.cos(warpTimeV * 1.233 + 3);
    const warpf3 = 11.49 + 4.0 * Math.cos(warpTimeV * 0.933 + 5);
    const texelOffsetX = 0.0 / this.texsizeX;
    const texelOffsetY = 0.0 / this.texsizeY;
    const aspectx = this.aspectx;
    const aspecty = this.aspecty;
    let offset = 0;
    let offsetColor = 0;

    if (!presetEquationRunner.preset.useWASM) {
      let mdVSVertex = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].cloneVars(mdVSFrame);
      let warp = mdVSVertex.warp;
      let zoom = mdVSVertex.zoom;
      let zoomExp = mdVSVertex.zoomexp;
      let cx = mdVSVertex.cx;
      let cy = mdVSVertex.cy;
      let sx = mdVSVertex.sx;
      let sy = mdVSVertex.sy;
      let dx = mdVSVertex.dx;
      let dy = mdVSVertex.dy;
      let rot = mdVSVertex.rot;

      for (let iz = 0; iz < gridZ1; iz++) {
        for (let ix = 0; ix < gridX1; ix++) {
          const x = ix / gridX * 2.0 - 1.0;
          const y = iz / gridZ * 2.0 - 1.0;
          const rad = Math.sqrt(x * x * aspectx * aspectx + y * y * aspecty * aspecty);

          if (presetEquationRunner.runVertEQs) {
            let ang;

            if (iz === gridZ / 2 && ix === gridX / 2) {
              ang = 0;
            } else {
              ang = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].atan2(y * aspecty, x * aspectx);
            }

            mdVSVertex.x = x * 0.5 * aspectx + 0.5;
            mdVSVertex.y = y * -0.5 * aspecty + 0.5;
            mdVSVertex.rad = rad;
            mdVSVertex.ang = ang;
            mdVSVertex.zoom = mdVSFrame.zoom;
            mdVSVertex.zoomexp = mdVSFrame.zoomexp;
            mdVSVertex.rot = mdVSFrame.rot;
            mdVSVertex.warp = mdVSFrame.warp;
            mdVSVertex.cx = mdVSFrame.cx;
            mdVSVertex.cy = mdVSFrame.cy;
            mdVSVertex.dx = mdVSFrame.dx;
            mdVSVertex.dy = mdVSFrame.dy;
            mdVSVertex.sx = mdVSFrame.sx;
            mdVSVertex.sy = mdVSFrame.sy;
            mdVSVertex = presetEquationRunner.runPixelEquations(mdVSVertex);
            warp = mdVSVertex.warp;
            zoom = mdVSVertex.zoom;
            zoomExp = mdVSVertex.zoomexp;
            cx = mdVSVertex.cx;
            cy = mdVSVertex.cy;
            sx = mdVSVertex.sx;
            sy = mdVSVertex.sy;
            dx = mdVSVertex.dx;
            dy = mdVSVertex.dy;
            rot = mdVSVertex.rot;
          }

          const zoom2V = zoom ** zoomExp ** (rad * 2.0 - 1.0);
          const zoom2Inv = 1.0 / zoom2V;
          let u = x * 0.5 * aspectx * zoom2Inv + 0.5;
          let v = -y * 0.5 * aspecty * zoom2Inv + 0.5;
          u = (u - cx) / sx + cx;
          v = (v - cy) / sy + cy;

          if (warp !== 0) {
            u += warp * 0.0035 * Math.sin(warpTimeV * 0.333 + warpScaleInv * (x * warpf0 - y * warpf3));
            v += warp * 0.0035 * Math.cos(warpTimeV * 0.375 - warpScaleInv * (x * warpf2 + y * warpf1));
            u += warp * 0.0035 * Math.cos(warpTimeV * 0.753 - warpScaleInv * (x * warpf1 - y * warpf2));
            v += warp * 0.0035 * Math.sin(warpTimeV * 0.825 + warpScaleInv * (x * warpf0 + y * warpf3));
          }

          const u2 = u - cx;
          const v2 = v - cy;
          const cosRot = Math.cos(rot);
          const sinRot = Math.sin(rot);
          u = u2 * cosRot - v2 * sinRot + cx;
          v = u2 * sinRot + v2 * cosRot + cy;
          u -= dx;
          v -= dy;
          u = (u - 0.5) / aspectx + 0.5;
          v = (v - 0.5) / aspecty + 0.5;
          u += texelOffsetX;
          v += texelOffsetY;

          if (!blending) {
            this.warpUVs[offset] = u;
            this.warpUVs[offset + 1] = v;
            this.warpColor[offsetColor + 0] = 1;
            this.warpColor[offsetColor + 1] = 1;
            this.warpColor[offsetColor + 2] = 1;
            this.warpColor[offsetColor + 3] = 1;
          } else {
            let mix2 = this.blendPattern.vertInfoA[offset / 2] * this.blendProgress + this.blendPattern.vertInfoC[offset / 2];
            mix2 = Math.clamp(mix2, 0, 1);
            this.warpUVs[offset] = this.warpUVs[offset] * mix2 + u * (1 - mix2);
            this.warpUVs[offset + 1] = this.warpUVs[offset + 1] * mix2 + v * (1 - mix2);
            this.warpColor[offsetColor + 0] = 1;
            this.warpColor[offsetColor + 1] = 1;
            this.warpColor[offsetColor + 2] = 1;
            this.warpColor[offsetColor + 3] = mix2;
          }

          offset += 2;
          offsetColor += 4;
        }
      }

      this.mdVSVertex = mdVSVertex;
    } else {
      const varPool = presetEquationRunner.preset.globalPools.perVertex;
      _utils__WEBPACK_IMPORTED_MODULE_19__["default"].setWasm(varPool, globalVars, presetEquationRunner.globalKeys);
      _utils__WEBPACK_IMPORTED_MODULE_19__["default"].setWasm(varPool, presetEquationRunner.mdVSQAfterFrame, presetEquationRunner.qs);
      varPool.zoom.value = mdVSFrame.zoom;
      varPool.zoomexp.value = mdVSFrame.zoomexp;
      varPool.rot.value = mdVSFrame.rot;
      varPool.warp.value = mdVSFrame.warp;
      varPool.cx.value = mdVSFrame.cx;
      varPool.cy.value = mdVSFrame.cy;
      varPool.dx.value = mdVSFrame.dx;
      varPool.dy.value = mdVSFrame.dy;
      varPool.sx.value = mdVSFrame.sx;
      varPool.sy.value = mdVSFrame.sy;
      presetEquationRunner.preset.pixel_eqs_wasm(presetEquationRunner.runVertEQs, this.mesh_width, this.mesh_height, this.time, mdVSFrame.warpanimspeed, mdVSFrame.warpscale, this.aspectx, this.aspecty);

      if (!blending) {
        this.warpUVs = presetEquationRunner.preset.pixel_eqs_get_array();
        this.warpColor.fill(1);
      } else {
        const newWarpUVs = presetEquationRunner.preset.pixel_eqs_get_array();
        let offset = 0;
        let offsetColor = 0;

        for (let iz = 0; iz < gridZ1; iz++) {
          for (let ix = 0; ix < gridX1; ix++) {
            const u = newWarpUVs[offset];
            const v = newWarpUVs[offset + 1];
            let mix2 = this.blendPattern.vertInfoA[offset / 2] * this.blendProgress + this.blendPattern.vertInfoC[offset / 2];
            mix2 = Math.clamp(mix2, 0, 1);
            this.warpUVs[offset] = this.warpUVs[offset] * mix2 + u * (1 - mix2);
            this.warpUVs[offset + 1] = this.warpUVs[offset + 1] * mix2 + v * (1 - mix2);
            this.warpColor[offsetColor + 0] = 1;
            this.warpColor[offsetColor + 1] = 1;
            this.warpColor[offsetColor + 2] = 1;
            this.warpColor[offsetColor + 3] = mix2;
            offset += 2;
            offsetColor += 4;
          }
        }
      }
    }
  }

  static mixFrameEquations(blendProgress, mdVSFrame, mdVSFramePrev) {
    const mix = 0.5 - 0.5 * Math.cos(blendProgress * Math.PI);
    const mix2 = 1 - mix;
    const snapPoint = 0.5;
    const mixedFrame = _utils__WEBPACK_IMPORTED_MODULE_19__["default"].cloneVars(mdVSFrame);
    mixedFrame.decay = mix * mdVSFrame.decay + mix2 * mdVSFramePrev.decay;
    mixedFrame.wave_a = mix * mdVSFrame.wave_a + mix2 * mdVSFramePrev.wave_a;
    mixedFrame.wave_r = mix * mdVSFrame.wave_r + mix2 * mdVSFramePrev.wave_r;
    mixedFrame.wave_g = mix * mdVSFrame.wave_g + mix2 * mdVSFramePrev.wave_g;
    mixedFrame.wave_b = mix * mdVSFrame.wave_b + mix2 * mdVSFramePrev.wave_b;
    mixedFrame.wave_x = mix * mdVSFrame.wave_x + mix2 * mdVSFramePrev.wave_x;
    mixedFrame.wave_y = mix * mdVSFrame.wave_y + mix2 * mdVSFramePrev.wave_y;
    mixedFrame.wave_mystery = mix * mdVSFrame.wave_mystery + mix2 * mdVSFramePrev.wave_mystery;
    mixedFrame.ob_size = mix * mdVSFrame.ob_size + mix2 * mdVSFramePrev.ob_size;
    mixedFrame.ob_r = mix * mdVSFrame.ob_r + mix2 * mdVSFramePrev.ob_r;
    mixedFrame.ob_g = mix * mdVSFrame.ob_g + mix2 * mdVSFramePrev.ob_g;
    mixedFrame.ob_b = mix * mdVSFrame.ob_b + mix2 * mdVSFramePrev.ob_b;
    mixedFrame.ob_a = mix * mdVSFrame.ob_a + mix2 * mdVSFramePrev.ob_a;
    mixedFrame.ib_size = mix * mdVSFrame.ib_size + mix2 * mdVSFramePrev.ib_size;
    mixedFrame.ib_r = mix * mdVSFrame.ib_r + mix2 * mdVSFramePrev.ib_r;
    mixedFrame.ib_g = mix * mdVSFrame.ib_g + mix2 * mdVSFramePrev.ib_g;
    mixedFrame.ib_b = mix * mdVSFrame.ib_b + mix2 * mdVSFramePrev.ib_b;
    mixedFrame.ib_a = mix * mdVSFrame.ib_a + mix2 * mdVSFramePrev.ib_a;
    mixedFrame.mv_x = mix * mdVSFrame.mv_x + mix2 * mdVSFramePrev.mv_x;
    mixedFrame.mv_y = mix * mdVSFrame.mv_y + mix2 * mdVSFramePrev.mv_y;
    mixedFrame.mv_dx = mix * mdVSFrame.mv_dx + mix2 * mdVSFramePrev.mv_dx;
    mixedFrame.mv_dy = mix * mdVSFrame.mv_dy + mix2 * mdVSFramePrev.mv_dy;
    mixedFrame.mv_l = mix * mdVSFrame.mv_l + mix2 * mdVSFramePrev.mv_l;
    mixedFrame.mv_r = mix * mdVSFrame.mv_r + mix2 * mdVSFramePrev.mv_r;
    mixedFrame.mv_g = mix * mdVSFrame.mv_g + mix2 * mdVSFramePrev.mv_g;
    mixedFrame.mv_b = mix * mdVSFrame.mv_b + mix2 * mdVSFramePrev.mv_b;
    mixedFrame.mv_a = mix * mdVSFrame.mv_a + mix2 * mdVSFramePrev.mv_a;
    mixedFrame.echo_zoom = mix * mdVSFrame.echo_zoom + mix2 * mdVSFramePrev.echo_zoom;
    mixedFrame.echo_alpha = mix * mdVSFrame.echo_alpha + mix2 * mdVSFramePrev.echo_alpha;
    mixedFrame.echo_orient = mix * mdVSFrame.echo_orient + mix2 * mdVSFramePrev.echo_orient;
    mixedFrame.wave_dots = mix < snapPoint ? mdVSFramePrev.wave_dots : mdVSFrame.wave_dots;
    mixedFrame.wave_thick = mix < snapPoint ? mdVSFramePrev.wave_thick : mdVSFrame.wave_thick;
    mixedFrame.additivewave = mix < snapPoint ? mdVSFramePrev.additivewave : mdVSFrame.additivewave;
    mixedFrame.wave_brighten = mix < snapPoint ? mdVSFramePrev.wave_brighten : mdVSFrame.wave_brighten;
    mixedFrame.darken_center = mix < snapPoint ? mdVSFramePrev.darken_center : mdVSFrame.darken_center;
    mixedFrame.gammaadj = mix < snapPoint ? mdVSFramePrev.gammaadj : mdVSFrame.gammaadj;
    mixedFrame.wrap = mix < snapPoint ? mdVSFramePrev.wrap : mdVSFrame.wrap;
    mixedFrame.invert = mix < snapPoint ? mdVSFramePrev.invert : mdVSFrame.invert;
    mixedFrame.brighten = mix < snapPoint ? mdVSFramePrev.brighten : mdVSFrame.brighten;
    mixedFrame.darken = mix < snapPoint ? mdVSFramePrev.darken : mdVSFrame.darken;
    mixedFrame.solarize = mix < snapPoint ? mdVSFramePrev.brighten : mdVSFrame.solarize;
    mixedFrame.b1n = mix * mdVSFrame.b1n + mix2 * mdVSFramePrev.b1n;
    mixedFrame.b2n = mix * mdVSFrame.b2n + mix2 * mdVSFramePrev.b2n;
    mixedFrame.b3n = mix * mdVSFrame.b3n + mix2 * mdVSFramePrev.b3n;
    mixedFrame.b1x = mix * mdVSFrame.b1x + mix2 * mdVSFramePrev.b1x;
    mixedFrame.b2x = mix * mdVSFrame.b2x + mix2 * mdVSFramePrev.b2x;
    mixedFrame.b3x = mix * mdVSFrame.b3x + mix2 * mdVSFramePrev.b3x;
    mixedFrame.b1ed = mix * mdVSFrame.b1ed + mix2 * mdVSFramePrev.b1ed;
    return mixedFrame;
  }

  static getBlurValues(mdVSFrame) {
    let blurMin1 = mdVSFrame.b1n;
    let blurMin2 = mdVSFrame.b2n;
    let blurMin3 = mdVSFrame.b3n;
    let blurMax1 = mdVSFrame.b1x;
    let blurMax2 = mdVSFrame.b2x;
    let blurMax3 = mdVSFrame.b3x;
    const fMinDist = 0.1;

    if (blurMax1 - blurMin1 < fMinDist) {
      const avg = (blurMin1 + blurMax1) * 0.5;
      blurMin1 = avg - fMinDist * 0.5;
      blurMax1 = avg - fMinDist * 0.5;
    }

    blurMax2 = Math.min(blurMax1, blurMax2);
    blurMin2 = Math.max(blurMin1, blurMin2);

    if (blurMax2 - blurMin2 < fMinDist) {
      const avg = (blurMin2 + blurMax2) * 0.5;
      blurMin2 = avg - fMinDist * 0.5;
      blurMax2 = avg - fMinDist * 0.5;
    }

    blurMax3 = Math.min(blurMax2, blurMax3);
    blurMin3 = Math.max(blurMin2, blurMin3);

    if (blurMax3 - blurMin3 < fMinDist) {
      const avg = (blurMin3 + blurMax3) * 0.5;
      blurMin3 = avg - fMinDist * 0.5;
      blurMax3 = avg - fMinDist * 0.5;
    }

    return {
      blurMins: [blurMin1, blurMin2, blurMin3],
      blurMaxs: [blurMax1, blurMax2, blurMax3]
    };
  }

  bindFrambufferAndSetViewport(fb, width, height) {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
    this.gl.viewport(0, 0, width, height);
  }

  bindFrameBufferTexture(targetFrameBuffer, targetTexture) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, targetTexture);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.texsizeX, this.texsizeY, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(this.texsizeX * this.texsizeY * 4));
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    if (this.anisoExt) {
      const max = this.gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.gl.TEXTURE_2D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, targetFrameBuffer);
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, targetTexture, 0);
  }

  render({
    audioLevels,
    elapsedTime
  } = {}) {
    this.calcTimeAndFPS(elapsedTime);
    this.frameNum += 1;

    if (audioLevels) {
      this.audio.updateAudio(audioLevels.timeByteArray, audioLevels.timeByteArrayL, audioLevels.timeByteArrayR);
    } else {
      this.audio.sampleAudio();
    }

    this.audioLevels.updateAudioLevels(this.fps, this.frameNum);
    const globalVars = {
      frame: this.frameNum,
      time: this.time,
      fps: this.fps,
      bass: this.audioLevels.bass,
      bass_att: this.audioLevels.bass_att,
      mid: this.audioLevels.mid,
      mid_att: this.audioLevels.mid_att,
      treb: this.audioLevels.treb,
      treb_att: this.audioLevels.treb_att,
      meshx: this.mesh_width,
      meshy: this.mesh_height,
      aspectx: this.invAspectx,
      aspecty: this.invAspecty,
      pixelsx: this.texsizeX,
      pixelsy: this.texsizeY
    };
    const prevGlobalVars = Object.assign({}, globalVars);

    if (!this.prevPreset.useWASM) {
      prevGlobalVars.gmegabuf = this.prevPresetEquationRunner.gmegabuf;
    }

    if (!this.preset.useWASM) {
      globalVars.gmegabuf = this.presetEquationRunner.gmegabuf;
      Object.assign(globalVars, this.regVars);
    }

    const mdVSFrame = this.presetEquationRunner.runFrameEquations(globalVars);
    this.runPixelEquations(this.presetEquationRunner, mdVSFrame, globalVars, false);

    if (!this.preset.useWASM) {
      Object.assign(this.regVars, _utils__WEBPACK_IMPORTED_MODULE_19__["default"].pick(this.mdVSVertex, this.regs));
      Object.assign(globalVars, this.regVars);
    }

    let mdVSFrameMixed;

    if (this.blending) {
      this.prevMDVSFrame = this.prevPresetEquationRunner.runFrameEquations(prevGlobalVars);
      this.runPixelEquations(this.prevPresetEquationRunner, this.prevMDVSFrame, prevGlobalVars, true);
      mdVSFrameMixed = Renderer.mixFrameEquations(this.blendProgress, mdVSFrame, this.prevMDVSFrame);
    } else {
      mdVSFrameMixed = mdVSFrame;
    }

    const swapTexture = this.targetTexture;
    this.targetTexture = this.prevTexture;
    this.prevTexture = swapTexture;
    const swapFrameBuffer = this.targetFrameBuffer;
    this.targetFrameBuffer = this.prevFrameBuffer;
    this.prevFrameBuffer = swapFrameBuffer;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.prevTexture);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.bindFrambufferAndSetViewport(this.targetFrameBuffer, this.texsizeX, this.texsizeY);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendEquation(this.gl.FUNC_ADD);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    const {
      blurMins,
      blurMaxs
    } = Renderer.getBlurValues(mdVSFrameMixed);

    if (!this.blending) {
      this.warpShader.renderQuadTexture(false, this.prevTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, mdVSFrame, this.presetEquationRunner.mdVSQAfterFrame, this.warpUVs, this.warpColor);
    } else {
      this.prevWarpShader.renderQuadTexture(false, this.prevTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, this.prevMDVSFrame, this.prevPresetEquationRunner.mdVSQAfterFrame, this.warpUVs, this.warpColor);
      this.warpShader.renderQuadTexture(true, this.prevTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, mdVSFrameMixed, this.presetEquationRunner.mdVSQAfterFrame, this.warpUVs, this.warpColor);
    }

    if (this.numBlurPasses > 0) {
      this.blurShader1.renderBlurTexture(this.targetTexture, mdVSFrame, blurMins, blurMaxs);

      if (this.numBlurPasses > 1) {
        this.blurShader2.renderBlurTexture(this.blurTexture1, mdVSFrame, blurMins, blurMaxs);

        if (this.numBlurPasses > 2) {
          this.blurShader3.renderBlurTexture(this.blurTexture2, mdVSFrame, blurMins, blurMaxs);
        }
      } // rebind target texture framebuffer


      this.bindFrambufferAndSetViewport(this.targetFrameBuffer, this.texsizeX, this.texsizeY);
    }

    this.motionVectors.drawMotionVectors(mdVSFrameMixed, this.warpUVs);

    if (this.preset.shapes && this.preset.shapes.length > 0) {
      this.customShapes.forEach((shape, i) => {
        shape.drawCustomShape(this.blending ? this.blendProgress : 1, globalVars, this.presetEquationRunner, this.preset.shapes[i], this.prevTexture);
      });
    }

    if (this.preset.waves && this.preset.waves.length > 0) {
      this.customWaveforms.forEach((waveform, i) => {
        waveform.drawCustomWaveform(this.blending ? this.blendProgress : 1, this.audio.timeArrayL, this.audio.timeArrayR, this.audio.freqArrayL, this.audio.freqArrayR, globalVars, this.presetEquationRunner, this.preset.waves[i]);
      });
    }

    if (this.blending) {
      if (this.prevPreset.shapes && this.prevPreset.shapes.length > 0) {
        this.prevCustomShapes.forEach((shape, i) => {
          shape.drawCustomShape(1.0 - this.blendProgress, prevGlobalVars, this.prevPresetEquationRunner, this.prevPreset.shapes[i], this.prevTexture);
        });
      }

      if (this.prevPreset.waves && this.prevPreset.waves.length > 0) {
        this.prevCustomWaveforms.forEach((waveform, i) => {
          waveform.drawCustomWaveform(1.0 - this.blendProgress, this.audio.timeArrayL, this.audio.timeArrayR, this.audio.freqArrayL, this.audio.freqArrayR, prevGlobalVars, this.prevPresetEquationRunner, this.prevPreset.waves[i]);
        });
      }
    }

    this.basicWaveform.drawBasicWaveform(this.blending, this.blendProgress, this.audio.timeArrayL, this.audio.timeArrayR, mdVSFrameMixed);
    this.darkenCenter.drawDarkenCenter(mdVSFrameMixed);
    const outerColor = [mdVSFrameMixed.ob_r, mdVSFrameMixed.ob_g, mdVSFrameMixed.ob_b, mdVSFrameMixed.ob_a];
    this.outerBorder.drawBorder(outerColor, mdVSFrameMixed.ob_size, 0);
    const innerColor = [mdVSFrameMixed.ib_r, mdVSFrameMixed.ib_g, mdVSFrameMixed.ib_b, mdVSFrameMixed.ib_a];
    this.innerBorder.drawBorder(innerColor, mdVSFrameMixed.ib_size, mdVSFrameMixed.ob_size);

    if (this.supertext.startTime >= 0) {
      const progress = (this.time - this.supertext.startTime) / this.supertext.duration;

      if (progress >= 1) {
        this.titleText.renderTitle(progress, true, globalVars);
      }
    } // Store variables in case we need to rerender


    this.globalVars = globalVars;
    this.mdVSFrame = mdVSFrame;
    this.mdVSFrameMixed = mdVSFrameMixed;
    this.renderToScreen();
  }

  renderToScreen() {
    if (this.outputFXAA) {
      this.bindFrambufferAndSetViewport(this.compFrameBuffer, this.texsizeX, this.texsizeY);
    } else {
      this.bindFrambufferAndSetViewport(null, this.width, this.height);
    }

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendEquation(this.gl.FUNC_ADD);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    const {
      blurMins,
      blurMaxs
    } = Renderer.getBlurValues(this.mdVSFrameMixed);

    if (!this.blending) {
      this.compShader.renderQuadTexture(false, this.targetTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, this.mdVSFrame, this.presetEquationRunner.mdVSQAfterFrame, this.warpColor);
    } else {
      this.prevCompShader.renderQuadTexture(false, this.targetTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, this.prevMDVSFrame, this.prevPresetEquationRunner.mdVSQAfterFrame, this.warpColor);
      this.compShader.renderQuadTexture(true, this.targetTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, this.mdVSFrameMixed, this.presetEquationRunner.mdVSQAfterFrame, this.warpColor);
    }

    if (this.supertext.startTime >= 0) {
      const progress = (this.time - this.supertext.startTime) / this.supertext.duration;
      this.titleText.renderTitle(progress, false, this.globalVars);

      if (progress >= 1) {
        this.supertext.startTime = -1;
      }
    }

    if (this.outputFXAA) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.compTexture);
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
      this.bindFrambufferAndSetViewport(null, this.width, this.height);
      this.outputShader.renderQuadTexture(this.compTexture);
    }
  }

  launchSongTitleAnim(text) {
    this.supertext = {
      startTime: this.time,
      duration: 1.7
    };
    this.titleText.generateTitleTexture(text);
  }

  toDataURL() {
    const data = new Uint8Array(this.texsizeX * this.texsizeY * 4);
    const compFrameBuffer = this.gl.createFramebuffer();
    const compTexture = this.gl.createTexture();
    this.bindFrameBufferTexture(compFrameBuffer, compTexture);
    const {
      blurMins,
      blurMaxs
    } = Renderer.getBlurValues(this.mdVSFrameMixed);
    this.compShader.renderQuadTexture(false, this.targetTexture, this.blurTexture1, this.blurTexture2, this.blurTexture3, blurMins, blurMaxs, this.mdVSFrame, this.presetEquationRunner.mdVSQAfterFrame, this.warpColor);
    this.gl.readPixels(0, 0, this.texsizeX, this.texsizeY, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data); // flip data

    Array.from({
      length: this.texsizeY
    }, (val, i) => data.slice(i * this.texsizeX * 4, (i + 1) * this.texsizeX * 4)).forEach((val, i) => data.set(val, (this.texsizeY - i - 1) * this.texsizeX * 4));
    const canvas = document.createElement("canvas");
    canvas.width = this.texsizeX;
    canvas.height = this.texsizeY;
    const context = canvas.getContext("2d");
    const imageData = context.createImageData(this.texsizeX, this.texsizeY);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);
    this.gl.deleteTexture(compTexture);
    this.gl.deleteFramebuffer(compFrameBuffer);
    return canvas.toDataURL();
  }

  warpBufferToDataURL() {
    const data = new Uint8Array(this.texsizeX * this.texsizeY * 4);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.targetFrameBuffer);
    this.gl.readPixels(0, 0, this.texsizeX, this.texsizeY, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    const canvas = document.createElement("canvas");
    canvas.width = this.texsizeX;
    canvas.height = this.texsizeY;
    const context = canvas.getContext("2d");
    const imageData = context.createImageData(this.texsizeX, this.texsizeY);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

}

/***/ }),

/***/ "./src/rendering/shaders/blur/blur.js":
/*!********************************************!*\
  !*** ./src/rendering/shaders/blur/blur.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlurShader; });
/* harmony import */ var _blurVertical__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blurVertical */ "./src/rendering/shaders/blur/blurVertical.js");
/* harmony import */ var _blurHorizontal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blurHorizontal */ "./src/rendering/shaders/blur/blurHorizontal.js");


class BlurShader {
  constructor(blurLevel, blurRatios, gl, opts = {}) {
    this.blurLevel = blurLevel;
    this.blurRatios = blurRatios;
    this.gl = gl;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.anisoExt = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
    this.blurHorizontalFrameBuffer = this.gl.createFramebuffer();
    this.blurVerticalFrameBuffer = this.gl.createFramebuffer();
    this.blurHorizontalTexture = this.gl.createTexture();
    this.blurVerticalTexture = this.gl.createTexture();
    this.setupFrameBufferTextures();
    this.blurHorizontal = new _blurHorizontal__WEBPACK_IMPORTED_MODULE_1__["default"](gl, this.blurLevel, opts);
    this.blurVertical = new _blurVertical__WEBPACK_IMPORTED_MODULE_0__["default"](gl, this.blurLevel, opts);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.setupFrameBufferTextures();
  }

  getTextureSize(sizeRatio) {
    let sizeX = Math.max(this.texsizeX * sizeRatio, 16);
    sizeX = Math.floor((sizeX + 3) / 16) * 16;
    let sizeY = Math.max(this.texsizeY * sizeRatio, 16);
    sizeY = Math.floor((sizeY + 3) / 4) * 4;
    return [sizeX, sizeY];
  }

  setupFrameBufferTextures() {
    const srcBlurRatios = this.blurLevel > 0 ? this.blurRatios[this.blurLevel - 1] : [1, 1];
    const dstBlurRatios = this.blurRatios[this.blurLevel];
    const srcTexsizeHorizontal = this.getTextureSize(srcBlurRatios[1]);
    const dstTexsizeHorizontal = this.getTextureSize(dstBlurRatios[0]);
    this.bindFrameBufferTexture(this.blurHorizontalFrameBuffer, this.blurHorizontalTexture, dstTexsizeHorizontal);
    const srcTexsizeVertical = dstTexsizeHorizontal;
    const dstTexsizeVertical = this.getTextureSize(dstBlurRatios[1]);
    this.bindFrameBufferTexture(this.blurVerticalFrameBuffer, this.blurVerticalTexture, dstTexsizeVertical);
    this.horizontalTexsizes = [srcTexsizeHorizontal, dstTexsizeHorizontal];
    this.verticalTexsizes = [srcTexsizeVertical, dstTexsizeVertical];
  }

  bindFrambufferAndSetViewport(fb, texsize) {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
    this.gl.viewport(0, 0, texsize[0], texsize[1]);
  }

  bindFrameBufferTexture(targetFrameBuffer, targetTexture, texsize) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, targetTexture);
    this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, texsize[0], texsize[1], 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(texsize[0] * texsize[1] * 4));
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    if (this.anisoExt) {
      const max = this.gl.getParameter(this.anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.gl.TEXTURE_2D, this.anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, targetFrameBuffer);
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, targetTexture, 0);
  }

  renderBlurTexture(prevTexture, mdVSFrame, blurMins, blurMaxs) {
    this.bindFrambufferAndSetViewport(this.blurHorizontalFrameBuffer, this.horizontalTexsizes[1]);
    this.blurHorizontal.renderQuadTexture(prevTexture, mdVSFrame, blurMins, blurMaxs, this.horizontalTexsizes[0]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.blurHorizontalTexture);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.bindFrambufferAndSetViewport(this.blurVerticalFrameBuffer, this.verticalTexsizes[1]);
    this.blurVertical.renderQuadTexture(this.blurHorizontalTexture, mdVSFrame, this.verticalTexsizes[0]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.blurVerticalTexture);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
  }

}

/***/ }),

/***/ "./src/rendering/shaders/blur/blurHorizontal.js":
/*!******************************************************!*\
  !*** ./src/rendering/shaders/blur/blurHorizontal.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlurHorizontal; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class BlurHorizontal {
  constructor(gl, blurLevel) {
    this.gl = gl;
    this.blurLevel = blurLevel;
    const w = [4.0, 3.8, 3.5, 2.9, 1.9, 1.2, 0.7, 0.3];
    const w1H = w[0] + w[1];
    const w2H = w[2] + w[3];
    const w3H = w[4] + w[5];
    const w4H = w[6] + w[7];
    const d1H = 0 + 2 * w[1] / w1H;
    const d2H = 2 + 2 * w[3] / w2H;
    const d3H = 4 + 2 * w[5] / w3H;
    const d4H = 6 + 2 * w[7] / w4H;
    this.ws = new Float32Array([w1H, w2H, w3H, w4H]);
    this.ds = new Float32Array([d1H, d2H, d3H, d4H]);
    this.wDiv = 0.5 / (w1H + w2H + w3H + w4H);
    this.positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    this.vertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      const vec2 halfmad = vec2(0.5);
      in vec2 aPos;
      out vec2 uv;
      void main(void) {
        gl_Position = vec4(aPos, 0.0, 1.0);
        uv = aPos * halfmad + halfmad;
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 uv;
       out vec4 fragColor;
       uniform sampler2D uTexture;
       uniform vec4 texsize;
       uniform float scale;
       uniform float bias;
       uniform vec4 ws;
       uniform vec4 ds;
       uniform float wdiv;

       void main(void) {
         float w1 = ws[0];
         float w2 = ws[1];
         float w3 = ws[2];
         float w4 = ws[3];
         float d1 = ds[0];
         float d2 = ds[1];
         float d3 = ds[2];
         float d4 = ds[3];

         vec2 uv2 = uv.xy;

         vec3 blur =
           ( texture(uTexture, uv2 + vec2( d1 * texsize.z,0.0) ).xyz
           + texture(uTexture, uv2 + vec2(-d1 * texsize.z,0.0) ).xyz) * w1 +
           ( texture(uTexture, uv2 + vec2( d2 * texsize.z,0.0) ).xyz
           + texture(uTexture, uv2 + vec2(-d2 * texsize.z,0.0) ).xyz) * w2 +
           ( texture(uTexture, uv2 + vec2( d3 * texsize.z,0.0) ).xyz
           + texture(uTexture, uv2 + vec2(-d3 * texsize.z,0.0) ).xyz) * w3 +
           ( texture(uTexture, uv2 + vec2( d4 * texsize.z,0.0) ).xyz
           + texture(uTexture, uv2 + vec2(-d4 * texsize.z,0.0) ).xyz) * w4;

         blur.xyz *= wdiv;
         blur.xyz = blur.xyz * scale + bias;

         fragColor = vec4(blur, 1.0);
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
    this.texsizeLocation = this.gl.getUniformLocation(this.shaderProgram, "texsize");
    this.scaleLoc = this.gl.getUniformLocation(this.shaderProgram, "scale");
    this.biasLoc = this.gl.getUniformLocation(this.shaderProgram, "bias");
    this.wsLoc = this.gl.getUniformLocation(this.shaderProgram, "ws");
    this.dsLocation = this.gl.getUniformLocation(this.shaderProgram, "ds");
    this.wdivLoc = this.gl.getUniformLocation(this.shaderProgram, "wdiv");
  }

  getScaleAndBias(blurMins, blurMaxs) {
    const scale = [1, 1, 1];
    const bias = [0, 0, 0];
    let tempMin;
    let tempMax;
    scale[0] = 1.0 / (blurMaxs[0] - blurMins[0]);
    bias[0] = -blurMins[0] * scale[0];
    tempMin = (blurMins[1] - blurMins[0]) / (blurMaxs[0] - blurMins[0]);
    tempMax = (blurMaxs[1] - blurMins[0]) / (blurMaxs[0] - blurMins[0]);
    scale[1] = 1.0 / (tempMax - tempMin);
    bias[1] = -tempMin * scale[1];
    tempMin = (blurMins[2] - blurMins[1]) / (blurMaxs[1] - blurMins[1]);
    tempMax = (blurMaxs[2] - blurMins[1]) / (blurMaxs[1] - blurMins[1]);
    scale[2] = 1.0 / (tempMax - tempMin);
    bias[2] = -tempMin * scale[2];
    return {
      scale: scale[this.blurLevel],
      bias: bias[this.blurLevel]
    };
  }

  renderQuadTexture(texture, mdVSFrame, blurMins, blurMaxs, srcTexsize) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.uniform1i(this.textureLoc, 0);
    const {
      scale,
      bias
    } = this.getScaleAndBias(blurMins, blurMaxs);
    this.gl.uniform4fv(this.texsizeLocation, [srcTexsize[0], srcTexsize[1], 1.0 / srcTexsize[0], 1.0 / srcTexsize[1]]);
    this.gl.uniform1f(this.scaleLoc, scale);
    this.gl.uniform1f(this.biasLoc, bias);
    this.gl.uniform4fv(this.wsLoc, this.ws);
    this.gl.uniform4fv(this.dsLocation, this.ds);
    this.gl.uniform1f(this.wdivLoc, this.wDiv);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

}

/***/ }),

/***/ "./src/rendering/shaders/blur/blurVertical.js":
/*!****************************************************!*\
  !*** ./src/rendering/shaders/blur/blurVertical.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlurVertical; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class BlurVertical {
  constructor(gl, blurLevel) {
    this.gl = gl;
    this.blurLevel = blurLevel;
    const w = [4.0, 3.8, 3.5, 2.9, 1.9, 1.2, 0.7, 0.3];
    const w1V = w[0] + w[1] + w[2] + w[3];
    const w2V = w[4] + w[5] + w[6] + w[7];
    const d1V = 0 + 2 * ((w[2] + w[3]) / w1V);
    const d2V = 2 + 2 * ((w[6] + w[7]) / w2V);
    this.wds = new Float32Array([w1V, w2V, d1V, d2V]);
    this.wDiv = 1.0 / ((w1V + w2V) * 2);
    this.positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    this.vertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      const vec2 halfmad = vec2(0.5);
      in vec2 aPos;
      out vec2 uv;
      void main(void) {
        gl_Position = vec4(aPos, 0.0, 1.0);
        uv = aPos * halfmad + halfmad;
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 uv;
       out vec4 fragColor;
       uniform sampler2D uTexture;
       uniform vec4 texsize;
       uniform float ed1;
       uniform float ed2;
       uniform float ed3;
       uniform vec4 wds;
       uniform float wdiv;

       void main(void) {
         float w1 = wds[0];
         float w2 = wds[1];
         float d1 = wds[2];
         float d2 = wds[3];

         vec2 uv2 = uv.xy;

         vec3 blur =
           ( texture(uTexture, uv2 + vec2(0.0, d1 * texsize.w) ).xyz
           + texture(uTexture, uv2 + vec2(0.0,-d1 * texsize.w) ).xyz) * w1 +
           ( texture(uTexture, uv2 + vec2(0.0, d2 * texsize.w) ).xyz
           + texture(uTexture, uv2 + vec2(0.0,-d2 * texsize.w) ).xyz) * w2;

         blur.xyz *= wdiv;

         float t = min(min(uv.x, uv.y), 1.0 - max(uv.x, uv.y));
         t = sqrt(t);
         t = ed1 + ed2 * clamp(t * ed3, 0.0, 1.0);
         blur.xyz *= t;

         fragColor = vec4(blur, 1.0);
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
    this.texsizeLocation = this.gl.getUniformLocation(this.shaderProgram, "texsize");
    this.ed1Loc = this.gl.getUniformLocation(this.shaderProgram, "ed1");
    this.ed2Loc = this.gl.getUniformLocation(this.shaderProgram, "ed2");
    this.ed3Loc = this.gl.getUniformLocation(this.shaderProgram, "ed3");
    this.wdsLocation = this.gl.getUniformLocation(this.shaderProgram, "wds");
    this.wdivLoc = this.gl.getUniformLocation(this.shaderProgram, "wdiv");
  }

  renderQuadTexture(texture, mdVSFrame, srcTexsize) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.uniform1i(this.textureLoc, 0);
    const b1ed = this.blurLevel === 0 ? mdVSFrame.b1ed : 0.0;
    this.gl.uniform4fv(this.texsizeLocation, [srcTexsize[0], srcTexsize[1], 1.0 / srcTexsize[0], 1.0 / srcTexsize[1]]);
    this.gl.uniform1f(this.ed1Loc, 1.0 - b1ed);
    this.gl.uniform1f(this.ed2Loc, b1ed);
    this.gl.uniform1f(this.ed3Loc, 5.0);
    this.gl.uniform4fv(this.wdsLocation, this.wds);
    this.gl.uniform1f(this.wdivLoc, this.wDiv);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

}

/***/ }),

/***/ "./src/rendering/shaders/comp.js":
/*!***************************************!*\
  !*** ./src/rendering/shaders/comp.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompShader; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class CompShader {
  constructor(gl, noise, image, opts = {}) {
    this.gl = gl;
    this.noise = noise;
    this.image = image;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.compWidth = 32;
    this.compHeight = 24;
    this.buildPositions();
    this.indexBuf = gl.createBuffer();
    this.positionVertexBuf = this.gl.createBuffer();
    this.compColorVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
    this.mainSampler = this.gl.createSampler();
    this.mainSamplerFW = this.gl.createSampler();
    this.mainSamplerFC = this.gl.createSampler();
    this.mainSamplerPW = this.gl.createSampler();
    this.mainSamplerPC = this.gl.createSampler();
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  } // based on https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js


  buildPositions() {
    const width = 2;
    const height = 2;
    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const gridX = this.compWidth;
    const gridY = this.compHeight;
    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;
    const segmentWidth = width / gridX;
    const segmentHeight = height / gridY;
    const vertices = [];

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf;

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf;
        vertices.push(x, -y, 0);
      }
    }

    const indices = [];

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy;
        const b = ix + gridX1 * (iy + 1);
        const c = ix + 1 + gridX1 * (iy + 1);
        const d = ix + 1 + gridX1 * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.vertices = new Float32Array(vertices);
    this.indices = new Uint16Array(indices);
  }

  updateGlobals(opts) {
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.buildPositions();
  }

  createShader(shaderText = "") {
    let fragShaderText;
    let fragShaderHeaderText;

    if (shaderText.length === 0) {
      fragShaderText = `float orient_horiz = mod(echo_orientation, 2.0);
                        float orient_x = (orient_horiz != 0.0) ? -1.0 : 1.0;
                        float orient_y = (echo_orientation >= 2.0) ? -1.0 : 1.0;
                        vec2 uv_echo = ((uv - 0.5) *
                                        (1.0 / echo_zoom) *
                                        vec2(orient_x, orient_y)) + 0.5;

                        ret = mix(texture(sampler_main, uv).rgb,
                                  texture(sampler_main, uv_echo).rgb,
                                  echo_alpha);

                        ret *= gammaAdj;

                        if(fShader >= 1.0) {
                          ret *= hue_shader;
                        } else if(fShader > 0.001) {
                          ret *= (1.0 - fShader) + (fShader * hue_shader);
                        }

                        if(brighten != 0) ret = sqrt(ret);
                        if(darken != 0) ret = ret*ret;
                        if(solarize != 0) ret = ret * (1.0 - ret) * 4.0;
                        if(invert != 0) ret = 1.0 - ret;`;
      fragShaderHeaderText = "";
    } else {
      const shaderParts = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getShaderParts(shaderText);
      fragShaderHeaderText = shaderParts[0];
      fragShaderText = shaderParts[1];
    }

    fragShaderText = fragShaderText.replace(/texture2D/g, "texture");
    fragShaderText = fragShaderText.replace(/texture3D/g, "texture");
    this.userTextures = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getUserSamplers(fragShaderHeaderText);
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      const vec2 halfmad = vec2(0.5);
      in vec2 aPos;
      in vec4 aCompColor;
      out vec2 vUv;
      out vec4 vColor;
      void main(void) {
        gl_Position = vec4(aPos, 0.0, 1.0);
        vUv = aPos * halfmad + halfmad;
        vColor = aCompColor;
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      precision mediump sampler3D;

      vec3 lum(vec3 v){
          return vec3(dot(v, vec3(0.32,0.49,0.29)));
      }

      in vec2 vUv;
      in vec4 vColor;
      out vec4 fragColor;
      uniform sampler2D sampler_main;
      uniform sampler2D sampler_fw_main;
      uniform sampler2D sampler_fc_main;
      uniform sampler2D sampler_pw_main;
      uniform sampler2D sampler_pc_main;
      uniform sampler2D sampler_blur1;
      uniform sampler2D sampler_blur2;
      uniform sampler2D sampler_blur3;
      uniform sampler2D sampler_noise_lq;
      uniform sampler2D sampler_noise_lq_lite;
      uniform sampler2D sampler_noise_mq;
      uniform sampler2D sampler_noise_hq;
      uniform sampler2D sampler_pw_noise_lq;
      uniform sampler3D sampler_noisevol_lq;
      uniform sampler3D sampler_noisevol_hq;

      uniform float time;
      uniform float gammaAdj;
      uniform float echo_zoom;
      uniform float echo_alpha;
      uniform float echo_orientation;
      uniform int invert;
      uniform int brighten;
      uniform int darken;
      uniform int solarize;
      uniform vec2 resolution;
      uniform vec4 aspect;
      uniform vec4 texsize;
      uniform vec4 texsize_noise_lq;
      uniform vec4 texsize_noise_mq;
      uniform vec4 texsize_noise_hq;
      uniform vec4 texsize_noise_lq_lite;
      uniform vec4 texsize_noisevol_lq;
      uniform vec4 texsize_noisevol_hq;

      uniform float bass;
      uniform float mid;
      uniform float treb;
      uniform float vol;
      uniform float bass_att;
      uniform float mid_att;
      uniform float treb_att;
      uniform float vol_att;

      uniform float frame;
      uniform float fps;

      uniform vec4 _qa;
      uniform vec4 _qb;
      uniform vec4 _qc;
      uniform vec4 _qd;
      uniform vec4 _qe;
      uniform vec4 _qf;
      uniform vec4 _qg;
      uniform vec4 _qh;

      #define q1 _qa.x
      #define q2 _qa.y
      #define q3 _qa.z
      #define q4 _qa.w
      #define q5 _qb.x
      #define q6 _qb.y
      #define q7 _qb.z
      #define q8 _qb.w
      #define q9 _qc.x
      #define q10 _qc.y
      #define q11 _qc.z
      #define q12 _qc.w
      #define q13 _qd.x
      #define q14 _qd.y
      #define q15 _qd.z
      #define q16 _qd.w
      #define q17 _qe.x
      #define q18 _qe.y
      #define q19 _qe.z
      #define q20 _qe.w
      #define q21 _qf.x
      #define q22 _qf.y
      #define q23 _qf.z
      #define q24 _qf.w
      #define q25 _qg.x
      #define q26 _qg.y
      #define q27 _qg.z
      #define q28 _qg.w
      #define q29 _qh.x
      #define q30 _qh.y
      #define q31 _qh.z
      #define q32 _qh.w

      uniform vec4 slow_roam_cos;
      uniform vec4 roam_cos;
      uniform vec4 slow_roam_sin;
      uniform vec4 roam_sin;

      uniform float blur1_min;
      uniform float blur1_max;
      uniform float blur2_min;
      uniform float blur2_max;
      uniform float blur3_min;
      uniform float blur3_max;

      uniform float scale1;
      uniform float scale2;
      uniform float scale3;
      uniform float bias1;
      uniform float bias2;
      uniform float bias3;

      uniform vec4 rand_frame;
      uniform vec4 rand_preset;

      uniform float fShader;

      float PI = ${Math.PI};

      ${fragShaderHeaderText}

      void main(void) {
        vec3 ret;
        vec2 uv = vUv;
        vec2 uv_orig = vUv;
        uv.y = 1.0 - uv.y;
        uv_orig.y = 1.0 - uv_orig.y;
        float rad = length(uv - 0.5);
        float ang = atan(uv.x - 0.5, uv.y - 0.5);
        vec3 hue_shader = vColor.rgb;

        ${fragShaderText}

        fragColor = vec4(ret, vColor.a);
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.compColorLocation = this.gl.getAttribLocation(this.shaderProgram, "aCompColor");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_main");
    this.textureFWLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_fw_main");
    this.textureFCLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_fc_main");
    this.texturePWLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pw_main");
    this.texturePCLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pc_main");
    this.blurTexture1Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur1");
    this.blurTexture2Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur2");
    this.blurTexture3Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur3");
    this.noiseLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_lq");
    this.noiseMQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_mq");
    this.noiseHQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_hq");
    this.noiseLQLiteLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_lq_lite");
    this.noisePointLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pw_noise_lq");
    this.noiseVolLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noisevol_lq");
    this.noiseVolHQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noisevol_hq");
    this.timeLoc = this.gl.getUniformLocation(this.shaderProgram, "time");
    this.gammaAdjLoc = this.gl.getUniformLocation(this.shaderProgram, "gammaAdj");
    this.echoZoomLoc = this.gl.getUniformLocation(this.shaderProgram, "echo_zoom");
    this.echoAlphaLoc = this.gl.getUniformLocation(this.shaderProgram, "echo_alpha");
    this.echoOrientationLoc = this.gl.getUniformLocation(this.shaderProgram, "echo_orientation");
    this.invertLoc = this.gl.getUniformLocation(this.shaderProgram, "invert");
    this.brightenLoc = this.gl.getUniformLocation(this.shaderProgram, "brighten");
    this.darkenLoc = this.gl.getUniformLocation(this.shaderProgram, "darken");
    this.solarizeLoc = this.gl.getUniformLocation(this.shaderProgram, "solarize");
    this.texsizeLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize");
    this.texsizeNoiseLQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_lq");
    this.texsizeNoiseMQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_mq");
    this.texsizeNoiseHQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_hq");
    this.texsizeNoiseLQLiteLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_lq_lite");
    this.texsizeNoiseVolLQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noisevol_lq");
    this.texsizeNoiseVolHQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noisevol_hq");
    this.resolutionLoc = this.gl.getUniformLocation(this.shaderProgram, "resolution");
    this.aspectLoc = this.gl.getUniformLocation(this.shaderProgram, "aspect");
    this.bassLoc = this.gl.getUniformLocation(this.shaderProgram, "bass");
    this.midLoc = this.gl.getUniformLocation(this.shaderProgram, "mid");
    this.trebLoc = this.gl.getUniformLocation(this.shaderProgram, "treb");
    this.volLoc = this.gl.getUniformLocation(this.shaderProgram, "vol");
    this.bassAttLoc = this.gl.getUniformLocation(this.shaderProgram, "bass_att");
    this.midAttLoc = this.gl.getUniformLocation(this.shaderProgram, "mid_att");
    this.trebAttLoc = this.gl.getUniformLocation(this.shaderProgram, "treb_att");
    this.volAttLoc = this.gl.getUniformLocation(this.shaderProgram, "vol_att");
    this.frameLoc = this.gl.getUniformLocation(this.shaderProgram, "frame");
    this.fpsLoc = this.gl.getUniformLocation(this.shaderProgram, "fps");
    this.blur1MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur1_min");
    this.blur1MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur1_max");
    this.blur2MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur2_min");
    this.blur2MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur2_max");
    this.blur3MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur3_min");
    this.blur3MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur3_max");
    this.scale1Loc = this.gl.getUniformLocation(this.shaderProgram, "scale1");
    this.scale2Loc = this.gl.getUniformLocation(this.shaderProgram, "scale2");
    this.scale3Loc = this.gl.getUniformLocation(this.shaderProgram, "scale3");
    this.bias1Loc = this.gl.getUniformLocation(this.shaderProgram, "bias1");
    this.bias2Loc = this.gl.getUniformLocation(this.shaderProgram, "bias2");
    this.bias3Loc = this.gl.getUniformLocation(this.shaderProgram, "bias3");
    this.randPresetLoc = this.gl.getUniformLocation(this.shaderProgram, "rand_preset");
    this.randFrameLoc = this.gl.getUniformLocation(this.shaderProgram, "rand_frame");
    this.fShaderLoc = this.gl.getUniformLocation(this.shaderProgram, "fShader");
    this.qaLoc = this.gl.getUniformLocation(this.shaderProgram, "_qa");
    this.qbLoc = this.gl.getUniformLocation(this.shaderProgram, "_qb");
    this.qcLoc = this.gl.getUniformLocation(this.shaderProgram, "_qc");
    this.qdLoc = this.gl.getUniformLocation(this.shaderProgram, "_qd");
    this.qeLoc = this.gl.getUniformLocation(this.shaderProgram, "_qe");
    this.qfLoc = this.gl.getUniformLocation(this.shaderProgram, "_qf");
    this.qgLoc = this.gl.getUniformLocation(this.shaderProgram, "_qg");
    this.qhLoc = this.gl.getUniformLocation(this.shaderProgram, "_qh");
    this.slowRoamCosLoc = this.gl.getUniformLocation(this.shaderProgram, "slow_roam_cos");
    this.roamCosLoc = this.gl.getUniformLocation(this.shaderProgram, "roam_cos");
    this.slowRoamSinLoc = this.gl.getUniformLocation(this.shaderProgram, "slow_roam_sin");
    this.roamSinLoc = this.gl.getUniformLocation(this.shaderProgram, "roam_sin");

    for (let i = 0; i < this.userTextures.length; i++) {
      const userTexture = this.userTextures[i];
      userTexture.textureLoc = this.gl.getUniformLocation(this.shaderProgram, `sampler_${userTexture.sampler}`);
    }
  }

  updateShader(shaderText) {
    this.createShader(shaderText);
  }

  bindBlurVals(blurMins, blurMaxs) {
    const blurMin1 = blurMins[0];
    const blurMin2 = blurMins[1];
    const blurMin3 = blurMins[2];
    const blurMax1 = blurMaxs[0];
    const blurMax2 = blurMaxs[1];
    const blurMax3 = blurMaxs[2];
    const scale1 = blurMax1 - blurMin1;
    const bias1 = blurMin1;
    const scale2 = blurMax2 - blurMin2;
    const bias2 = blurMin2;
    const scale3 = blurMax3 - blurMin3;
    const bias3 = blurMin3;
    this.gl.uniform1f(this.blur1MinLoc, blurMin1);
    this.gl.uniform1f(this.blur1MaxLoc, blurMax1);
    this.gl.uniform1f(this.blur2MinLoc, blurMin2);
    this.gl.uniform1f(this.blur2MaxLoc, blurMax2);
    this.gl.uniform1f(this.blur3MinLoc, blurMin3);
    this.gl.uniform1f(this.blur3MaxLoc, blurMax3);
    this.gl.uniform1f(this.scale1Loc, scale1);
    this.gl.uniform1f(this.scale2Loc, scale2);
    this.gl.uniform1f(this.scale3Loc, scale3);
    this.gl.uniform1f(this.bias1Loc, bias1);
    this.gl.uniform1f(this.bias2Loc, bias2);
    this.gl.uniform1f(this.bias3Loc, bias3);
  }

  static generateHueBase(mdVSFrame) {
    const hueBase = new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    /* eslint-disable max-len */

    for (let i = 0; i < 4; i++) {
      hueBase[i * 3 + 0] = 0.6 + 0.3 * Math.sin(mdVSFrame.time * 30.0 * 0.0143 + 3 + i * 21 + mdVSFrame.rand_start[3]);
      hueBase[i * 3 + 1] = 0.6 + 0.3 * Math.sin(mdVSFrame.time * 30.0 * 0.0107 + 1 + i * 13 + mdVSFrame.rand_start[1]);
      hueBase[i * 3 + 2] = 0.6 + 0.3 * Math.sin(mdVSFrame.time * 30.0 * 0.0129 + 6 + i * 9 + mdVSFrame.rand_start[2]);
      const maxshade = Math.max(hueBase[i * 3], hueBase[i * 3 + 1], hueBase[i * 3 + 2]);

      for (let k = 0; k < 3; k++) {
        hueBase[i * 3 + k] = hueBase[i * 3 + k] / maxshade;
        hueBase[i * 3 + k] = 0.5 + 0.5 * hueBase[i * 3 + k];
      }
    }
    /* eslint-enable max-len */


    return hueBase;
  }

  generateCompColors(blending, mdVSFrame, warpColor) {
    const hueBase = CompShader.generateHueBase(mdVSFrame);
    const gridX1 = this.compWidth + 1;
    const gridY1 = this.compHeight + 1;
    const compColor = new Float32Array(gridX1 * gridY1 * 4);
    let offsetColor = 0;

    for (let j = 0; j < gridY1; j++) {
      for (let i = 0; i < gridX1; i++) {
        let x = i / this.compWidth;
        let y = j / this.compHeight;
        const col = [1, 1, 1];

        for (let c = 0; c < 3; c++) {
          col[c] = hueBase[0 + c] * x * y + hueBase[3 + c] * (1 - x) * y + hueBase[6 + c] * x * (1 - y) + hueBase[9 + c] * (1 - x) * (1 - y);
        }

        let alpha = 1;

        if (blending) {
          x *= this.mesh_width + 1;
          y *= this.mesh_height + 1;
          x = Math.clamp(x, 0, this.mesh_width - 1);
          y = Math.clamp(y, 0, this.mesh_height - 1);
          const nx = Math.floor(x);
          const ny = Math.floor(y);
          const dx = x - nx;
          const dy = y - ny;
          const alpha00 = warpColor[(ny * (this.mesh_width + 1) + nx) * 4 + 3];
          const alpha01 = warpColor[(ny * (this.mesh_width + 1) + (nx + 1)) * 4 + 3];
          const alpha10 = warpColor[((ny + 1) * (this.mesh_width + 1) + nx) * 4 + 3];
          const alpha11 = warpColor[((ny + 1) * (this.mesh_width + 1) + (nx + 1)) * 4 + 3];
          alpha = alpha00 * (1 - dx) * (1 - dy) + alpha01 * dx * (1 - dy) + alpha10 * (1 - dx) * dy + alpha11 * dx * dy;
        }

        compColor[offsetColor + 0] = col[0];
        compColor[offsetColor + 1] = col[1];
        compColor[offsetColor + 2] = col[2];
        compColor[offsetColor + 3] = alpha;
        offsetColor += 4;
      }
    }

    return compColor;
  }

  renderQuadTexture(blending, texture, blurTexture1, blurTexture2, blurTexture3, blurMins, blurMaxs, mdVSFrame, mdVSQs, warpColor) {
    const compColors = this.generateCompColors(blending, mdVSFrame, warpColor);
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.compColorVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, compColors, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.compColorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.compColorLocation);
    const wrapping = mdVSFrame.wrap !== 0 ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_S, wrapping);
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_T, wrapping);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(0, this.mainSampler);
    this.gl.uniform1i(this.textureLoc, 0);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(1, this.mainSamplerFW);
    this.gl.uniform1i(this.textureFWLoc, 1);
    this.gl.activeTexture(this.gl.TEXTURE2);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(2, this.mainSamplerFC);
    this.gl.uniform1i(this.textureFCLoc, 2);
    this.gl.activeTexture(this.gl.TEXTURE3);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(3, this.mainSamplerPW);
    this.gl.uniform1i(this.texturePWLoc, 3);
    this.gl.activeTexture(this.gl.TEXTURE4);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(4, this.mainSamplerPC);
    this.gl.uniform1i(this.texturePCLoc, 4);
    this.gl.activeTexture(this.gl.TEXTURE5);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture1);
    this.gl.uniform1i(this.blurTexture1Loc, 5);
    this.gl.activeTexture(this.gl.TEXTURE6);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture2);
    this.gl.uniform1i(this.blurTexture2Loc, 6);
    this.gl.activeTexture(this.gl.TEXTURE7);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture3);
    this.gl.uniform1i(this.blurTexture3Loc, 7);
    this.gl.activeTexture(this.gl.TEXTURE8);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQ);
    this.gl.uniform1i(this.noiseLQLoc, 8);
    this.gl.activeTexture(this.gl.TEXTURE9);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexMQ);
    this.gl.uniform1i(this.noiseMQLoc, 9);
    this.gl.activeTexture(this.gl.TEXTURE10);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexHQ);
    this.gl.uniform1i(this.noiseHQLoc, 10);
    this.gl.activeTexture(this.gl.TEXTURE11);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQLite);
    this.gl.uniform1i(this.noiseLQLiteLoc, 11);
    this.gl.activeTexture(this.gl.TEXTURE12);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQ);
    this.gl.bindSampler(12, this.noise.noiseTexPointLQ);
    this.gl.uniform1i(this.noisePointLQLoc, 12);
    this.gl.activeTexture(this.gl.TEXTURE13);
    this.gl.bindTexture(this.gl.TEXTURE_3D, this.noise.noiseTexVolLQ);
    this.gl.uniform1i(this.noiseVolLQLoc, 13);
    this.gl.activeTexture(this.gl.TEXTURE14);
    this.gl.bindTexture(this.gl.TEXTURE_3D, this.noise.noiseTexVolHQ);
    this.gl.uniform1i(this.noiseVolHQLoc, 14);

    for (let i = 0; i < this.userTextures.length; i++) {
      const userTexture = this.userTextures[i];
      this.gl.activeTexture(this.gl.TEXTURE15 + i);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.image.getTexture(userTexture.sampler));
      this.gl.uniform1i(userTexture.textureLoc, 15 + i);
    }

    this.gl.uniform1f(this.timeLoc, mdVSFrame.time);
    this.gl.uniform1f(this.gammaAdjLoc, mdVSFrame.gammaadj);
    this.gl.uniform1f(this.echoZoomLoc, mdVSFrame.echo_zoom);
    this.gl.uniform1f(this.echoAlphaLoc, mdVSFrame.echo_alpha);
    this.gl.uniform1f(this.echoOrientationLoc, mdVSFrame.echo_orient);
    this.gl.uniform1i(this.invertLoc, mdVSFrame.invert);
    this.gl.uniform1i(this.brightenLoc, mdVSFrame.brighten);
    this.gl.uniform1i(this.darkenLoc, mdVSFrame.darken);
    this.gl.uniform1i(this.solarizeLoc, mdVSFrame.solarize);
    this.gl.uniform2fv(this.resolutionLoc, [this.texsizeX, this.texsizeY]);
    this.gl.uniform4fv(this.aspectLoc, [this.aspectx, this.aspecty, this.invAspectx, this.invAspecty]);
    this.gl.uniform4fv(this.texsizeLoc, new Float32Array([this.texsizeX, this.texsizeY, 1.0 / this.texsizeX, 1.0 / this.texsizeY]));
    this.gl.uniform4fv(this.texsizeNoiseLQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseMQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseHQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseLQLiteLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform4fv(this.texsizeNoiseVolLQLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform4fv(this.texsizeNoiseVolHQLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform1f(this.bassLoc, mdVSFrame.bass);
    this.gl.uniform1f(this.midLoc, mdVSFrame.mid);
    this.gl.uniform1f(this.trebLoc, mdVSFrame.treb);
    this.gl.uniform1f(this.volLoc, (mdVSFrame.bass + mdVSFrame.mid + mdVSFrame.treb) / 3);
    this.gl.uniform1f(this.bassAttLoc, mdVSFrame.bass_att);
    this.gl.uniform1f(this.midAttLoc, mdVSFrame.mid_att);
    this.gl.uniform1f(this.trebAttLoc, mdVSFrame.treb_att);
    this.gl.uniform1f(this.volAttLoc, (mdVSFrame.bass_att + mdVSFrame.mid_att + mdVSFrame.treb_att) / 3);
    this.gl.uniform1f(this.frameLoc, mdVSFrame.frame);
    this.gl.uniform1f(this.fpsLoc, mdVSFrame.fps);
    this.gl.uniform4fv(this.randPresetLoc, mdVSFrame.rand_preset);
    this.gl.uniform4fv(this.randFrameLoc, new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]));
    this.gl.uniform1f(this.fShaderLoc, mdVSFrame.fshader);
    this.gl.uniform4fv(this.qaLoc, new Float32Array([mdVSQs.q1 || 0, mdVSQs.q2 || 0, mdVSQs.q3 || 0, mdVSQs.q4 || 0]));
    this.gl.uniform4fv(this.qbLoc, new Float32Array([mdVSQs.q5 || 0, mdVSQs.q6 || 0, mdVSQs.q7 || 0, mdVSQs.q8 || 0]));
    this.gl.uniform4fv(this.qcLoc, new Float32Array([mdVSQs.q9 || 0, mdVSQs.q10 || 0, mdVSQs.q11 || 0, mdVSQs.q12 || 0]));
    this.gl.uniform4fv(this.qdLoc, new Float32Array([mdVSQs.q13 || 0, mdVSQs.q14 || 0, mdVSQs.q15 || 0, mdVSQs.q16 || 0]));
    this.gl.uniform4fv(this.qeLoc, new Float32Array([mdVSQs.q17 || 0, mdVSQs.q18 || 0, mdVSQs.q19 || 0, mdVSQs.q20 || 0]));
    this.gl.uniform4fv(this.qfLoc, new Float32Array([mdVSQs.q21 || 0, mdVSQs.q22 || 0, mdVSQs.q23 || 0, mdVSQs.q24 || 0]));
    this.gl.uniform4fv(this.qgLoc, new Float32Array([mdVSQs.q25 || 0, mdVSQs.q26 || 0, mdVSQs.q27 || 0, mdVSQs.q28 || 0]));
    this.gl.uniform4fv(this.qhLoc, new Float32Array([mdVSQs.q29 || 0, mdVSQs.q30 || 0, mdVSQs.q31 || 0, mdVSQs.q32 || 0]));
    this.gl.uniform4fv(this.slowRoamCosLoc, [0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.005), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.008), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.013), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.022)]);
    this.gl.uniform4fv(this.roamCosLoc, [0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.3), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 1.3), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 5.0), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 20.0)]);
    this.gl.uniform4fv(this.slowRoamSinLoc, [0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.005), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.008), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.013), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.022)]);
    this.gl.uniform4fv(this.roamSinLoc, [0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.3), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 1.3), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 5.0), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 20.0)]);
    this.bindBlurVals(blurMins, blurMaxs);

    if (blending) {
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);

    if (!blending) {
      this.gl.enable(this.gl.BLEND);
    }
  }

}

/***/ }),

/***/ "./src/rendering/shaders/output.js":
/*!*****************************************!*\
  !*** ./src/rendering/shaders/output.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OutputShader; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class OutputShader {
  constructor(gl, opts) {
    this.gl = gl;
    this.textureRatio = opts.textureRatio;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    this.vertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);

    if (this.useFXAA()) {
      this.createFXAAShader();
    } else {
      this.createShader();
    }
  }

  useFXAA() {
    return this.textureRatio <= 1;
  }

  updateGlobals(opts) {
    this.textureRatio = opts.textureRatio;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.gl.deleteProgram(this.shaderProgram);

    if (this.useFXAA()) {
      this.createFXAAShader();
    } else {
      this.createShader();
    }
  } // based on https://github.com/mattdesl/glsl-fxaa


  createFXAAShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `#version 300 es
       const vec2 halfmad = vec2(0.5);
       in vec2 aPos;
       out vec2 v_rgbM;
       out vec2 v_rgbNW;
       out vec2 v_rgbNE;
       out vec2 v_rgbSW;
       out vec2 v_rgbSE;
       uniform vec4 texsize;
       void main(void) {
         gl_Position = vec4(aPos, 0.0, 1.0);

         v_rgbM = aPos * halfmad + halfmad;
         v_rgbNW = v_rgbM + (vec2(-1.0, -1.0) * texsize.zx);
         v_rgbNE = v_rgbM + (vec2(1.0, -1.0) * texsize.zx);
         v_rgbSW = v_rgbM + (vec2(-1.0, 1.0) * texsize.zx);
         v_rgbSE = v_rgbM + (vec2(1.0, 1.0) * texsize.zx);
       }`);
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 v_rgbM;
       in vec2 v_rgbNW;
       in vec2 v_rgbNE;
       in vec2 v_rgbSW;
       in vec2 v_rgbSE;
       out vec4 fragColor;
       uniform vec4 texsize;
       uniform sampler2D uTexture;

       #ifndef FXAA_REDUCE_MIN
         #define FXAA_REDUCE_MIN   (1.0/ 128.0)
       #endif
       #ifndef FXAA_REDUCE_MUL
         #define FXAA_REDUCE_MUL   (1.0 / 8.0)
       #endif
       #ifndef FXAA_SPAN_MAX
         #define FXAA_SPAN_MAX     8.0
       #endif

       void main(void) {
         vec4 color;
         vec3 rgbNW = textureLod(uTexture, v_rgbNW, 0.0).xyz;
         vec3 rgbNE = textureLod(uTexture, v_rgbNE, 0.0).xyz;
         vec3 rgbSW = textureLod(uTexture, v_rgbSW, 0.0).xyz;
         vec3 rgbSE = textureLod(uTexture, v_rgbSE, 0.0).xyz;
         vec3 rgbM  = textureLod(uTexture, v_rgbM, 0.0).xyz;
         vec3 luma = vec3(0.299, 0.587, 0.114);
         float lumaNW = dot(rgbNW, luma);
         float lumaNE = dot(rgbNE, luma);
         float lumaSW = dot(rgbSW, luma);
         float lumaSE = dot(rgbSE, luma);
         float lumaM  = dot(rgbM,  luma);
         float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
         float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

         mediump vec2 dir;
         dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
         dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

         float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                               (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

         float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
         dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
                   max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                   dir * rcpDirMin)) * texsize.zw;

         vec3 rgbA = 0.5 * (
             textureLod(uTexture, v_rgbM + dir * (1.0 / 3.0 - 0.5), 0.0).xyz +
             textureLod(uTexture, v_rgbM + dir * (2.0 / 3.0 - 0.5), 0.0).xyz);
         vec3 rgbB = rgbA * 0.5 + 0.25 * (
             textureLod(uTexture, v_rgbM + dir * -0.5, 0.0).xyz +
             textureLod(uTexture, v_rgbM + dir * 0.5, 0.0).xyz);

         float lumaB = dot(rgbB, luma);
         if ((lumaB < lumaMin) || (lumaB > lumaMax))
           color = vec4(rgbA, 1.0);
         else
           color = vec4(rgbB, 1.0);

         fragColor = color;
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
    this.texsizeLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize");
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `#version 300 es
       const vec2 halfmad = vec2(0.5);
       in vec2 aPos;
       out vec2 uv;
       void main(void) {
         gl_Position = vec4(aPos, 0.0, 1.0);
         uv = aPos * halfmad + halfmad;
       }`);
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 uv;
       out vec4 fragColor;
       uniform sampler2D uTexture;

       void main(void) {
         fragColor = vec4(texture(uTexture, uv).rgb, 1.0);
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
  }

  renderQuadTexture(texture) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.uniform1i(this.textureLoc, 0);

    if (this.useFXAA()) {
      this.gl.uniform4fv(this.texsizeLoc, new Float32Array([this.texsizeX, this.texsizeY, 1.0 / this.texsizeX, 1.0 / this.texsizeY]));
    }

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

}

/***/ }),

/***/ "./src/rendering/shaders/resample.js":
/*!*******************************************!*\
  !*** ./src/rendering/shaders/resample.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResampleShader; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class ResampleShader {
  constructor(gl) {
    this.gl = gl;
    this.positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    this.vertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `#version 300 es
       const vec2 halfmad = vec2(0.5);
       in vec2 aPos;
       out vec2 uv;
       void main(void) {
         gl_Position = vec4(aPos, 0.0, 1.0);
         uv = aPos * halfmad + halfmad;
       }`);
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 uv;
       out vec4 fragColor;
       uniform sampler2D uTexture;

       void main(void) {
         fragColor = vec4(texture(uTexture, uv).rgb, 1.0);
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
  }

  renderQuadTexture(texture) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.uniform1i(this.textureLoc, 0);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }

}

/***/ }),

/***/ "./src/rendering/shaders/shaderUtils.js":
/*!**********************************************!*\
  !*** ./src/rendering/shaders/shaderUtils.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShaderUtils; });
const lineMatcher = /uniform sampler2D sampler_(?:.+?);/g;
const samplerMatcher = /uniform sampler2D sampler_(.+?);/;
class ShaderUtils {
  static getShaderParts(t) {
    const sbIndex = t.indexOf("shader_body");

    if (t && sbIndex > -1) {
      const beforeShaderBody = t.substring(0, sbIndex);
      const afterShaderBody = t.substring(sbIndex);
      const firstCurly = afterShaderBody.indexOf("{");
      const lastCurly = afterShaderBody.lastIndexOf("}");
      const shaderBody = afterShaderBody.substring(firstCurly + 1, lastCurly);
      return [beforeShaderBody, shaderBody];
    }

    return ["", t];
  }

  static getFragmentFloatPrecision(gl) {
    if (gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
      return "highp";
    } else if (gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
      return "mediump";
    }

    return "lowp";
  }

  static getUserSamplers(text) {
    const samplers = [];
    const lineMatches = text.match(lineMatcher);

    if (lineMatches && lineMatches.length > 0) {
      for (let i = 0; i < lineMatches.length; i++) {
        const samplerMatches = lineMatches[i].match(samplerMatcher);

        if (samplerMatches && samplerMatches.length > 0) {
          const sampler = samplerMatches[1];
          samplers.push({
            sampler
          });
        }
      }
    }

    return samplers;
  }

}

/***/ }),

/***/ "./src/rendering/shaders/warp.js":
/*!***************************************!*\
  !*** ./src/rendering/shaders/warp.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WarpShader; });
/* harmony import */ var _shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class WarpShader {
  constructor(gl, noise, image, opts = {}) {
    this.gl = gl;
    this.noise = noise;
    this.image = image;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.buildPositions();
    this.indexBuf = gl.createBuffer();
    this.positionVertexBuf = this.gl.createBuffer();
    this.warpUvVertexBuf = this.gl.createBuffer();
    this.warpColorVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
    this.mainSampler = this.gl.createSampler();
    this.mainSamplerFW = this.gl.createSampler();
    this.mainSamplerFC = this.gl.createSampler();
    this.mainSamplerPW = this.gl.createSampler();
    this.mainSamplerPC = this.gl.createSampler();
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFW, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerFC, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerPW, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.samplerParameteri(this.mainSamplerPC, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  } // based on https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js


  buildPositions() {
    const width = 2;
    const height = 2;
    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const gridX = this.mesh_width;
    const gridY = this.mesh_height;
    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;
    const segmentWidth = width / gridX;
    const segmentHeight = height / gridY;
    const vertices = [];

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf;

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf;
        vertices.push(x, -y, 0);
      }
    }

    const indices = [];

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy;
        const b = ix + gridX1 * (iy + 1);
        const c = ix + 1 + gridX1 * (iy + 1);
        const d = ix + 1 + gridX1 * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.vertices = new Float32Array(vertices);
    this.indices = new Uint16Array(indices);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.buildPositions();
  }

  createShader(shaderText = "") {
    let fragShaderText;
    let fragShaderHeaderText;

    if (shaderText.length === 0) {
      fragShaderText = "ret = texture(sampler_main, uv).rgb * decay;";
      fragShaderHeaderText = "";
    } else {
      const shaderParts = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getShaderParts(shaderText);
      fragShaderHeaderText = shaderParts[0];
      fragShaderText = shaderParts[1];
    }

    fragShaderText = fragShaderText.replace(/texture2D/g, "texture");
    fragShaderText = fragShaderText.replace(/texture3D/g, "texture");
    this.userTextures = _shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getUserSamplers(fragShaderHeaderText);
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      const vec2 halfmad = vec2(0.5);
      in vec2 aPos;
      in vec2 aWarpUv;
      in vec4 aWarpColor;
      out vec2 uv;
      out vec2 uv_orig;
      out vec4 vColor;
      void main(void) {
        gl_Position = vec4(aPos, 0.0, 1.0);
        uv_orig = aPos * halfmad + halfmad;
        uv = aWarpUv;
        vColor = aWarpColor;
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      precision mediump sampler3D;

      in vec2 uv;
      in vec2 uv_orig;
      in vec4 vColor;
      out vec4 fragColor;
      uniform sampler2D sampler_main;
      uniform sampler2D sampler_fw_main;
      uniform sampler2D sampler_fc_main;
      uniform sampler2D sampler_pw_main;
      uniform sampler2D sampler_pc_main;
      uniform sampler2D sampler_blur1;
      uniform sampler2D sampler_blur2;
      uniform sampler2D sampler_blur3;
      uniform sampler2D sampler_noise_lq;
      uniform sampler2D sampler_noise_lq_lite;
      uniform sampler2D sampler_noise_mq;
      uniform sampler2D sampler_noise_hq;
      uniform sampler2D sampler_pw_noise_lq;
      uniform sampler3D sampler_noisevol_lq;
      uniform sampler3D sampler_noisevol_hq;
      uniform float time;
      uniform float decay;
      uniform vec2 resolution;
      uniform vec4 aspect;
      uniform vec4 texsize;
      uniform vec4 texsize_noise_lq;
      uniform vec4 texsize_noise_mq;
      uniform vec4 texsize_noise_hq;
      uniform vec4 texsize_noise_lq_lite;
      uniform vec4 texsize_noisevol_lq;
      uniform vec4 texsize_noisevol_hq;

      uniform float bass;
      uniform float mid;
      uniform float treb;
      uniform float vol;
      uniform float bass_att;
      uniform float mid_att;
      uniform float treb_att;
      uniform float vol_att;

      uniform float frame;
      uniform float fps;

      uniform vec4 _qa;
      uniform vec4 _qb;
      uniform vec4 _qc;
      uniform vec4 _qd;
      uniform vec4 _qe;
      uniform vec4 _qf;
      uniform vec4 _qg;
      uniform vec4 _qh;

      #define q1 _qa.x
      #define q2 _qa.y
      #define q3 _qa.z
      #define q4 _qa.w
      #define q5 _qb.x
      #define q6 _qb.y
      #define q7 _qb.z
      #define q8 _qb.w
      #define q9 _qc.x
      #define q10 _qc.y
      #define q11 _qc.z
      #define q12 _qc.w
      #define q13 _qd.x
      #define q14 _qd.y
      #define q15 _qd.z
      #define q16 _qd.w
      #define q17 _qe.x
      #define q18 _qe.y
      #define q19 _qe.z
      #define q20 _qe.w
      #define q21 _qf.x
      #define q22 _qf.y
      #define q23 _qf.z
      #define q24 _qf.w
      #define q25 _qg.x
      #define q26 _qg.y
      #define q27 _qg.z
      #define q28 _qg.w
      #define q29 _qh.x
      #define q30 _qh.y
      #define q31 _qh.z
      #define q32 _qh.w

      uniform vec4 slow_roam_cos;
      uniform vec4 roam_cos;
      uniform vec4 slow_roam_sin;
      uniform vec4 roam_sin;

      uniform float blur1_min;
      uniform float blur1_max;
      uniform float blur2_min;
      uniform float blur2_max;
      uniform float blur3_min;
      uniform float blur3_max;

      uniform float scale1;
      uniform float scale2;
      uniform float scale3;
      uniform float bias1;
      uniform float bias2;
      uniform float bias3;

      uniform vec4 rand_frame;
      uniform vec4 rand_preset;

      float PI = ${Math.PI};

      ${fragShaderHeaderText}

      void main(void) {
        vec3 ret;
        float rad = length(uv_orig - 0.5);
        float ang = atan(uv_orig.x - 0.5, uv_orig.y - 0.5);

        ${fragShaderText}

        fragColor = vec4(ret, 1.0) * vColor;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.warpUvLocation = this.gl.getAttribLocation(this.shaderProgram, "aWarpUv");
    this.warpColorLocation = this.gl.getAttribLocation(this.shaderProgram, "aWarpColor");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_main");
    this.textureFWLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_fw_main");
    this.textureFCLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_fc_main");
    this.texturePWLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pw_main");
    this.texturePCLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pc_main");
    this.blurTexture1Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur1");
    this.blurTexture2Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur2");
    this.blurTexture3Loc = this.gl.getUniformLocation(this.shaderProgram, "sampler_blur3");
    this.noiseLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_lq");
    this.noiseMQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_mq");
    this.noiseHQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_hq");
    this.noiseLQLiteLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noise_lq_lite");
    this.noisePointLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_pw_noise_lq");
    this.noiseVolLQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noisevol_lq");
    this.noiseVolHQLoc = this.gl.getUniformLocation(this.shaderProgram, "sampler_noisevol_hq");
    this.decayLoc = this.gl.getUniformLocation(this.shaderProgram, "decay");
    this.texsizeLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize");
    this.texsizeNoiseLQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_lq");
    this.texsizeNoiseMQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_mq");
    this.texsizeNoiseHQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_hq");
    this.texsizeNoiseLQLiteLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noise_lq_lite");
    this.texsizeNoiseVolLQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noisevol_lq");
    this.texsizeNoiseVolHQLoc = this.gl.getUniformLocation(this.shaderProgram, "texsize_noisevol_hq");
    this.resolutionLoc = this.gl.getUniformLocation(this.shaderProgram, "resolution");
    this.aspectLoc = this.gl.getUniformLocation(this.shaderProgram, "aspect");
    this.bassLoc = this.gl.getUniformLocation(this.shaderProgram, "bass");
    this.midLoc = this.gl.getUniformLocation(this.shaderProgram, "mid");
    this.trebLoc = this.gl.getUniformLocation(this.shaderProgram, "treb");
    this.volLoc = this.gl.getUniformLocation(this.shaderProgram, "vol");
    this.bassAttLoc = this.gl.getUniformLocation(this.shaderProgram, "bass_att");
    this.midAttLoc = this.gl.getUniformLocation(this.shaderProgram, "mid_att");
    this.trebAttLoc = this.gl.getUniformLocation(this.shaderProgram, "treb_att");
    this.volAttLoc = this.gl.getUniformLocation(this.shaderProgram, "vol_att");
    this.timeLoc = this.gl.getUniformLocation(this.shaderProgram, "time");
    this.frameLoc = this.gl.getUniformLocation(this.shaderProgram, "frame");
    this.fpsLoc = this.gl.getUniformLocation(this.shaderProgram, "fps");
    this.blur1MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur1_min");
    this.blur1MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur1_max");
    this.blur2MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur2_min");
    this.blur2MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur2_max");
    this.blur3MinLoc = this.gl.getUniformLocation(this.shaderProgram, "blur3_min");
    this.blur3MaxLoc = this.gl.getUniformLocation(this.shaderProgram, "blur3_max");
    this.scale1Loc = this.gl.getUniformLocation(this.shaderProgram, "scale1");
    this.scale2Loc = this.gl.getUniformLocation(this.shaderProgram, "scale2");
    this.scale3Loc = this.gl.getUniformLocation(this.shaderProgram, "scale3");
    this.bias1Loc = this.gl.getUniformLocation(this.shaderProgram, "bias1");
    this.bias2Loc = this.gl.getUniformLocation(this.shaderProgram, "bias2");
    this.bias3Loc = this.gl.getUniformLocation(this.shaderProgram, "bias3");
    this.randPresetLoc = this.gl.getUniformLocation(this.shaderProgram, "rand_preset");
    this.randFrameLoc = this.gl.getUniformLocation(this.shaderProgram, "rand_frame");
    this.qaLoc = this.gl.getUniformLocation(this.shaderProgram, "_qa");
    this.qbLoc = this.gl.getUniformLocation(this.shaderProgram, "_qb");
    this.qcLoc = this.gl.getUniformLocation(this.shaderProgram, "_qc");
    this.qdLoc = this.gl.getUniformLocation(this.shaderProgram, "_qd");
    this.qeLoc = this.gl.getUniformLocation(this.shaderProgram, "_qe");
    this.qfLoc = this.gl.getUniformLocation(this.shaderProgram, "_qf");
    this.qgLoc = this.gl.getUniformLocation(this.shaderProgram, "_qg");
    this.qhLoc = this.gl.getUniformLocation(this.shaderProgram, "_qh");
    this.slowRoamCosLoc = this.gl.getUniformLocation(this.shaderProgram, "slow_roam_cos");
    this.roamCosLoc = this.gl.getUniformLocation(this.shaderProgram, "roam_cos");
    this.slowRoamSinLoc = this.gl.getUniformLocation(this.shaderProgram, "slow_roam_sin");
    this.roamSinLoc = this.gl.getUniformLocation(this.shaderProgram, "roam_sin");

    for (let i = 0; i < this.userTextures.length; i++) {
      const userTexture = this.userTextures[i];
      userTexture.textureLoc = this.gl.getUniformLocation(this.shaderProgram, `sampler_${userTexture.sampler}`);
    }
  }

  updateShader(shaderText) {
    this.createShader(shaderText);
  }

  bindBlurVals(blurMins, blurMaxs) {
    const blurMin1 = blurMins[0];
    const blurMin2 = blurMins[1];
    const blurMin3 = blurMins[2];
    const blurMax1 = blurMaxs[0];
    const blurMax2 = blurMaxs[1];
    const blurMax3 = blurMaxs[2];
    const scale1 = blurMax1 - blurMin1;
    const bias1 = blurMin1;
    const scale2 = blurMax2 - blurMin2;
    const bias2 = blurMin2;
    const scale3 = blurMax3 - blurMin3;
    const bias3 = blurMin3;
    this.gl.uniform1f(this.blur1MinLoc, blurMin1);
    this.gl.uniform1f(this.blur1MaxLoc, blurMax1);
    this.gl.uniform1f(this.blur2MinLoc, blurMin2);
    this.gl.uniform1f(this.blur2MaxLoc, blurMax2);
    this.gl.uniform1f(this.blur3MinLoc, blurMin3);
    this.gl.uniform1f(this.blur3MaxLoc, blurMax3);
    this.gl.uniform1f(this.scale1Loc, scale1);
    this.gl.uniform1f(this.scale2Loc, scale2);
    this.gl.uniform1f(this.scale3Loc, scale3);
    this.gl.uniform1f(this.bias1Loc, bias1);
    this.gl.uniform1f(this.bias2Loc, bias2);
    this.gl.uniform1f(this.bias3Loc, bias3);
  }

  renderQuadTexture(blending, texture, blurTexture1, blurTexture2, blurTexture3, blurMins, blurMaxs, mdVSFrame, mdVSQs, warpUVs, warpColor) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.warpUvVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, warpUVs, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.warpUvLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.warpUvLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.warpColorVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, warpColor, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.warpColorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.warpColorLocation);
    const wrapping = mdVSFrame.wrap !== 0 ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_S, wrapping);
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_T, wrapping);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(0, this.mainSampler);
    this.gl.uniform1i(this.textureLoc, 0);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(1, this.mainSamplerFW);
    this.gl.uniform1i(this.textureFWLoc, 1);
    this.gl.activeTexture(this.gl.TEXTURE2);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(2, this.mainSamplerFC);
    this.gl.uniform1i(this.textureFCLoc, 2);
    this.gl.activeTexture(this.gl.TEXTURE3);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(3, this.mainSamplerPW);
    this.gl.uniform1i(this.texturePWLoc, 3);
    this.gl.activeTexture(this.gl.TEXTURE4);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.bindSampler(4, this.mainSamplerPC);
    this.gl.uniform1i(this.texturePCLoc, 4);
    this.gl.activeTexture(this.gl.TEXTURE5);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture1);
    this.gl.uniform1i(this.blurTexture1Loc, 5);
    this.gl.activeTexture(this.gl.TEXTURE6);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture2);
    this.gl.uniform1i(this.blurTexture2Loc, 6);
    this.gl.activeTexture(this.gl.TEXTURE7);
    this.gl.bindTexture(this.gl.TEXTURE_2D, blurTexture3);
    this.gl.uniform1i(this.blurTexture3Loc, 7);
    this.gl.activeTexture(this.gl.TEXTURE8);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQ);
    this.gl.uniform1i(this.noiseLQLoc, 8);
    this.gl.activeTexture(this.gl.TEXTURE9);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexMQ);
    this.gl.uniform1i(this.noiseMQLoc, 9);
    this.gl.activeTexture(this.gl.TEXTURE10);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexHQ);
    this.gl.uniform1i(this.noiseHQLoc, 10);
    this.gl.activeTexture(this.gl.TEXTURE11);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQLite);
    this.gl.uniform1i(this.noiseLQLiteLoc, 11);
    this.gl.activeTexture(this.gl.TEXTURE12);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.noise.noiseTexLQ);
    this.gl.bindSampler(12, this.noise.noiseTexPointLQ);
    this.gl.uniform1i(this.noisePointLQLoc, 12);
    this.gl.activeTexture(this.gl.TEXTURE13);
    this.gl.bindTexture(this.gl.TEXTURE_3D, this.noise.noiseTexVolLQ);
    this.gl.uniform1i(this.noiseVolLQLoc, 13);
    this.gl.activeTexture(this.gl.TEXTURE14);
    this.gl.bindTexture(this.gl.TEXTURE_3D, this.noise.noiseTexVolHQ);
    this.gl.uniform1i(this.noiseVolHQLoc, 14);

    for (let i = 0; i < this.userTextures.length; i++) {
      const userTexture = this.userTextures[i];
      this.gl.activeTexture(this.gl.TEXTURE15 + i);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.image.getTexture(userTexture.sampler));
      this.gl.uniform1i(userTexture.textureLoc, 15 + i);
    }

    this.gl.uniform1f(this.decayLoc, mdVSFrame.decay);
    this.gl.uniform2fv(this.resolutionLoc, [this.texsizeX, this.texsizeY]);
    this.gl.uniform4fv(this.aspectLoc, [this.aspectx, this.aspecty, this.invAspectx, this.invAspecty]);
    this.gl.uniform4fv(this.texsizeLoc, [this.texsizeX, this.texsizeY, 1.0 / this.texsizeX, 1.0 / this.texsizeY]);
    this.gl.uniform4fv(this.texsizeNoiseLQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseMQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseHQLoc, [256, 256, 1 / 256, 1 / 256]);
    this.gl.uniform4fv(this.texsizeNoiseLQLiteLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform4fv(this.texsizeNoiseVolLQLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform4fv(this.texsizeNoiseVolHQLoc, [32, 32, 1 / 32, 1 / 32]);
    this.gl.uniform1f(this.bassLoc, mdVSFrame.bass);
    this.gl.uniform1f(this.midLoc, mdVSFrame.mid);
    this.gl.uniform1f(this.trebLoc, mdVSFrame.treb);
    this.gl.uniform1f(this.volLoc, (mdVSFrame.bass + mdVSFrame.mid + mdVSFrame.treb) / 3);
    this.gl.uniform1f(this.bassAttLoc, mdVSFrame.bass_att);
    this.gl.uniform1f(this.midAttLoc, mdVSFrame.mid_att);
    this.gl.uniform1f(this.trebAttLoc, mdVSFrame.treb_att);
    this.gl.uniform1f(this.volAttLoc, (mdVSFrame.bass_att + mdVSFrame.mid_att + mdVSFrame.treb_att) / 3);
    this.gl.uniform1f(this.timeLoc, mdVSFrame.time);
    this.gl.uniform1f(this.frameLoc, mdVSFrame.frame);
    this.gl.uniform1f(this.fpsLoc, mdVSFrame.fps);
    this.gl.uniform4fv(this.randPresetLoc, mdVSFrame.rand_preset);
    this.gl.uniform4fv(this.randFrameLoc, new Float32Array([Math.random(), Math.random(), Math.random(), Math.random()]));
    this.gl.uniform4fv(this.qaLoc, new Float32Array([mdVSQs.q1 || 0, mdVSQs.q2 || 0, mdVSQs.q3 || 0, mdVSQs.q4 || 0]));
    this.gl.uniform4fv(this.qbLoc, new Float32Array([mdVSQs.q5 || 0, mdVSQs.q6 || 0, mdVSQs.q7 || 0, mdVSQs.q8 || 0]));
    this.gl.uniform4fv(this.qcLoc, new Float32Array([mdVSQs.q9 || 0, mdVSQs.q10 || 0, mdVSQs.q11 || 0, mdVSQs.q12 || 0]));
    this.gl.uniform4fv(this.qdLoc, new Float32Array([mdVSQs.q13 || 0, mdVSQs.q14 || 0, mdVSQs.q15 || 0, mdVSQs.q16 || 0]));
    this.gl.uniform4fv(this.qeLoc, new Float32Array([mdVSQs.q17 || 0, mdVSQs.q18 || 0, mdVSQs.q19 || 0, mdVSQs.q20 || 0]));
    this.gl.uniform4fv(this.qfLoc, new Float32Array([mdVSQs.q21 || 0, mdVSQs.q22 || 0, mdVSQs.q23 || 0, mdVSQs.q24 || 0]));
    this.gl.uniform4fv(this.qgLoc, new Float32Array([mdVSQs.q25 || 0, mdVSQs.q26 || 0, mdVSQs.q27 || 0, mdVSQs.q28 || 0]));
    this.gl.uniform4fv(this.qhLoc, new Float32Array([mdVSQs.q29 || 0, mdVSQs.q30 || 0, mdVSQs.q31 || 0, mdVSQs.q32 || 0]));
    this.gl.uniform4fv(this.slowRoamCosLoc, [0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.005), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.008), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.013), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.022)]);
    this.gl.uniform4fv(this.roamCosLoc, [0.5 + 0.5 * Math.cos(mdVSFrame.time * 0.3), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 1.3), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 5.0), 0.5 + 0.5 * Math.cos(mdVSFrame.time * 20.0)]);
    this.gl.uniform4fv(this.slowRoamSinLoc, [0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.005), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.008), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.013), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.022)]);
    this.gl.uniform4fv(this.roamSinLoc, [0.5 + 0.5 * Math.sin(mdVSFrame.time * 0.3), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 1.3), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 5.0), 0.5 + 0.5 * Math.sin(mdVSFrame.time * 20.0)]);
    this.bindBlurVals(blurMins, blurMaxs);

    if (blending) {
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);

    if (!blending) {
      this.gl.enable(this.gl.BLEND);
    }
  }

}

/***/ }),

/***/ "./src/rendering/shapes/customShape.js":
/*!*********************************************!*\
  !*** ./src/rendering/shapes/customShape.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomShape; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");


class CustomShape {
  constructor(index, gl, opts) {
    this.index = index;
    this.gl = gl;
    const maxSides = 101;
    this.positions = new Float32Array((maxSides + 2) * 3);
    this.colors = new Float32Array((maxSides + 2) * 4);
    this.uvs = new Float32Array((maxSides + 2) * 2);
    this.borderPositions = new Float32Array((maxSides + 1) * 3);
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.positionVertexBuf = this.gl.createBuffer();
    this.colorVertexBuf = this.gl.createBuffer();
    this.uvVertexBuf = this.gl.createBuffer();
    this.borderPositionVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_1__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
    this.createBorderShader();
    this.mainSampler = this.gl.createSampler();
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.samplerParameteri(this.mainSampler, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aPos;
      in vec4 aColor;
      in vec2 aUv;
      out vec4 vColor;
      out vec2 vUv;
      void main(void) {
        vColor = aColor;
        vUv = aUv;
        gl_Position = vec4(aPos, 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      uniform sampler2D uTexture;
      uniform float uTextured;
      in vec4 vColor;
      in vec2 vUv;
      out vec4 fragColor;
      void main(void) {
        if (uTextured != 0.0) {
          fragColor = texture(uTexture, vUv) * vColor;
        } else {
          fragColor = vColor;
        }
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.aColorLocation = this.gl.getAttribLocation(this.shaderProgram, "aColor");
    this.aUvLocation = this.gl.getAttribLocation(this.shaderProgram, "aUv");
    this.texturedLoc = this.gl.getUniformLocation(this.shaderProgram, "uTextured");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
  }

  createBorderShader() {
    this.borderShaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aBorderPos;
      uniform vec2 thickOffset;
      void main(void) {
        gl_Position = vec4(aBorderPos +
                            vec3(thickOffset, 0.0), 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      out vec4 fragColor;
      uniform vec4 uBorderColor;
      void main(void) {
        fragColor = uBorderColor;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.borderShaderProgram, vertShader);
    this.gl.attachShader(this.borderShaderProgram, fragShader);
    this.gl.linkProgram(this.borderShaderProgram);
    this.aBorderPosLoc = this.gl.getAttribLocation(this.borderShaderProgram, "aBorderPos");
    this.uBorderColorLoc = this.gl.getUniformLocation(this.borderShaderProgram, "uBorderColor");
    this.thickOffsetLoc = this.gl.getUniformLocation(this.shaderProgram, "thickOffset");
  }

  drawCustomShape(blendProgress, globalVars, presetEquationRunner, shapeEqs, prevTexture) {
    if (shapeEqs.baseVals.enabled !== 0) {
      if (!presetEquationRunner.preset.useWASM) {
        this.setupShapeBuffers(presetEquationRunner.mdVSFrame.wrap);
        let mdVSShape = Object.assign({}, presetEquationRunner.mdVSShapes[this.index], presetEquationRunner.mdVSFrameMapShapes[this.index], globalVars); // If we aren't setting these every instance, set them initially

        if (presetEquationRunner.preset.shapes[this.index].frame_eqs_str === "") {
          mdVSShape = Object.assign(mdVSShape, presetEquationRunner.mdVSQAfterFrame, presetEquationRunner.mdVSTShapeInits[this.index]);
        }

        const baseVals = presetEquationRunner.preset.shapes[this.index].baseVals;
        const numInst = Math.clamp(baseVals.num_inst, 1, 1024);

        for (let j = 0; j < numInst; j++) {
          mdVSShape.instance = j;
          mdVSShape.x = baseVals.x;
          mdVSShape.y = baseVals.y;
          mdVSShape.rad = baseVals.rad;
          mdVSShape.ang = baseVals.ang;
          mdVSShape.r = baseVals.r;
          mdVSShape.g = baseVals.g;
          mdVSShape.b = baseVals.b;
          mdVSShape.a = baseVals.a;
          mdVSShape.r2 = baseVals.r2;
          mdVSShape.g2 = baseVals.g2;
          mdVSShape.b2 = baseVals.b2;
          mdVSShape.a2 = baseVals.a2;
          mdVSShape.border_r = baseVals.border_r;
          mdVSShape.border_g = baseVals.border_g;
          mdVSShape.border_b = baseVals.border_b;
          mdVSShape.border_a = baseVals.border_a;
          mdVSShape.thickoutline = baseVals.thickoutline;
          mdVSShape.textured = baseVals.textured;
          mdVSShape.tex_zoom = baseVals.tex_zoom;
          mdVSShape.tex_ang = baseVals.tex_ang;
          mdVSShape.additive = baseVals.additive;
          let mdVSShapeFrame;

          if (presetEquationRunner.preset.shapes[this.index].frame_eqs_str !== "") {
            mdVSShape = Object.assign(mdVSShape, presetEquationRunner.mdVSQAfterFrame, presetEquationRunner.mdVSTShapeInits[this.index]);
            mdVSShapeFrame = presetEquationRunner.runShapeFrameEquations(this.index, mdVSShape);
          } else {
            mdVSShapeFrame = mdVSShape;
          }

          let sides = mdVSShapeFrame.sides;
          sides = Math.clamp(sides, 3, 100);
          sides = Math.floor(sides);
          const rad = mdVSShapeFrame.rad;
          const ang = mdVSShapeFrame.ang;
          const x = mdVSShapeFrame.x * 2 - 1;
          const y = mdVSShapeFrame.y * -2 + 1;
          const r = mdVSShapeFrame.r;
          const g = mdVSShapeFrame.g;
          const b = mdVSShapeFrame.b;
          const a = mdVSShapeFrame.a;
          const r2 = mdVSShapeFrame.r2;
          const g2 = mdVSShapeFrame.g2;
          const b2 = mdVSShapeFrame.b2;
          const a2 = mdVSShapeFrame.a2;
          const borderR = mdVSShapeFrame.border_r;
          const borderG = mdVSShapeFrame.border_g;
          const borderB = mdVSShapeFrame.border_b;
          const borderA = mdVSShapeFrame.border_a;
          this.borderColor = [borderR, borderG, borderB, borderA * blendProgress];
          const thickoutline = mdVSShapeFrame.thickoutline;
          const textured = mdVSShapeFrame.textured;
          const texZoom = mdVSShapeFrame.tex_zoom;
          const texAng = mdVSShapeFrame.tex_ang;
          const additive = mdVSShapeFrame.additive;
          const hasBorder = this.borderColor[3] > 0;
          const isTextured = Math.abs(textured) >= 1;
          const isBorderThick = Math.abs(thickoutline) >= 1;
          const isAdditive = Math.abs(additive) >= 1;
          this.positions[0] = x;
          this.positions[1] = y;
          this.positions[2] = 0;
          this.colors[0] = r;
          this.colors[1] = g;
          this.colors[2] = b;
          this.colors[3] = a * blendProgress;

          if (isTextured) {
            this.uvs[0] = 0.5;
            this.uvs[1] = 0.5;
          }

          const quarterPi = Math.PI * 0.25;

          for (let k = 1; k <= sides + 1; k++) {
            const p = (k - 1) / sides;
            const pTwoPi = p * 2 * Math.PI;
            const angSum = pTwoPi + ang + quarterPi;
            this.positions[k * 3 + 0] = x + rad * Math.cos(angSum) * this.aspecty;
            this.positions[k * 3 + 1] = y + rad * Math.sin(angSum);
            this.positions[k * 3 + 2] = 0;
            this.colors[k * 4 + 0] = r2;
            this.colors[k * 4 + 1] = g2;
            this.colors[k * 4 + 2] = b2;
            this.colors[k * 4 + 3] = a2 * blendProgress;

            if (isTextured) {
              const texAngSum = pTwoPi + texAng + quarterPi;
              this.uvs[k * 2 + 0] = 0.5 + 0.5 * Math.cos(texAngSum) / texZoom * this.aspecty;
              this.uvs[k * 2 + 1] = 0.5 + 0.5 * Math.sin(texAngSum) / texZoom;
            }

            if (hasBorder) {
              this.borderPositions[(k - 1) * 3 + 0] = this.positions[k * 3 + 0];
              this.borderPositions[(k - 1) * 3 + 1] = this.positions[k * 3 + 1];
              this.borderPositions[(k - 1) * 3 + 2] = this.positions[k * 3 + 2];
            }
          }

          this.mdVSShapeFrame = mdVSShapeFrame;
          this.drawCustomShapeInstance(prevTexture, sides, isTextured, hasBorder, isBorderThick, isAdditive);
        }

        const mdVSUserKeysShape = presetEquationRunner.mdVSUserKeysShapes[this.index];
        const mdVSNewFrameMapShape = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(this.mdVSShapeFrame, mdVSUserKeysShape); // eslint-disable-next-line no-param-reassign

        presetEquationRunner.mdVSFrameMapShapes[this.index] = mdVSNewFrameMapShape;
      } else {
        // eslint-disable-next-line max-len
        this.setupShapeBuffers(presetEquationRunner.preset.globalPools.perFrame.wrap.value);
        const baseVals = presetEquationRunner.preset.shapes[this.index].baseVals;
        const varPool = presetEquationRunner.preset.globalPools[`shapePerFrame${this.index}`];
        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(varPool, globalVars, presetEquationRunner.globalKeys); // If we aren't setting these every instance, set them initially

        if (!presetEquationRunner.preset.shapes[this.index].frame_eqs) {
          presetEquationRunner.preset.restore_qs();
        }

        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].setWasm(varPool, presetEquationRunner.mdVSTShapeInits[this.index], presetEquationRunner.ts);
        presetEquationRunner.preset.save_ts();
        varPool.x.value = baseVals.x;
        varPool.y.value = baseVals.y;
        varPool.rad.value = baseVals.rad;
        varPool.ang.value = baseVals.ang;
        varPool.r.value = baseVals.r;
        varPool.g.value = baseVals.g;
        varPool.b.value = baseVals.b;
        varPool.a.value = baseVals.a;
        varPool.r2.value = baseVals.r2;
        varPool.g2.value = baseVals.g2;
        varPool.b2.value = baseVals.b2;
        varPool.a2.value = baseVals.a2;
        varPool.border_r.value = baseVals.border_r;
        varPool.border_g.value = baseVals.border_g;
        varPool.border_b.value = baseVals.border_b;
        varPool.border_a.value = baseVals.border_a;
        varPool.thickoutline.value = baseVals.thickoutline;
        varPool.textured.value = baseVals.textured;
        varPool.tex_zoom.value = baseVals.tex_zoom;
        varPool.tex_ang.value = baseVals.tex_ang;
        varPool.additive.value = baseVals.additive;
        presetEquationRunner.preset.shapes[this.index].frame_eqs_save();
        const numInst = Math.clamp(baseVals.num_inst, 1, 1024);

        for (let j = 0; j < numInst; j++) {
          varPool.instance.value = j; // this condition should check the JS equations because of comments

          if (presetEquationRunner.preset.shapes[this.index].frame_eqs) {
            presetEquationRunner.preset.shapes[this.index].frame_eqs_restore();
            presetEquationRunner.preset.restore_qs();
            presetEquationRunner.preset.restore_ts();
            presetEquationRunner.preset.shapes[this.index].frame_eqs();
          }

          let sides = varPool.sides.value;
          sides = Math.clamp(sides, 3, 100);
          sides = Math.floor(sides);
          const rad = varPool.rad.value;
          const ang = varPool.ang.value;
          const x = varPool.x.value * 2 - 1;
          const y = varPool.y.value * -2 + 1;
          const r = varPool.r.value;
          const g = varPool.g.value;
          const b = varPool.b.value;
          const a = varPool.a.value;
          const r2 = varPool.r2.value;
          const g2 = varPool.g2.value;
          const b2 = varPool.b2.value;
          const a2 = varPool.a2.value;
          const borderR = varPool.border_r.value;
          const borderG = varPool.border_g.value;
          const borderB = varPool.border_b.value;
          const borderA = varPool.border_a.value;
          this.borderColor = [borderR, borderG, borderB, borderA * blendProgress];
          const thickoutline = varPool.thickoutline.value;
          const textured = varPool.textured.value;
          const texZoom = varPool.tex_zoom.value;
          const texAng = varPool.tex_ang.value;
          const additive = varPool.additive.value;
          const hasBorder = this.borderColor[3] > 0;
          const isTextured = Math.abs(textured) >= 1;
          const isBorderThick = Math.abs(thickoutline) >= 1;
          const isAdditive = Math.abs(additive) >= 1;
          this.positions[0] = x;
          this.positions[1] = y;
          this.positions[2] = 0;
          this.colors[0] = r;
          this.colors[1] = g;
          this.colors[2] = b;
          this.colors[3] = a * blendProgress;

          if (isTextured) {
            this.uvs[0] = 0.5;
            this.uvs[1] = 0.5;
          }

          const quarterPi = Math.PI * 0.25;

          for (let k = 1; k <= sides + 1; k++) {
            const p = (k - 1) / sides;
            const pTwoPi = p * 2 * Math.PI;
            const angSum = pTwoPi + ang + quarterPi;
            this.positions[k * 3 + 0] = x + rad * Math.cos(angSum) * this.aspecty;
            this.positions[k * 3 + 1] = y + rad * Math.sin(angSum);
            this.positions[k * 3 + 2] = 0;
            this.colors[k * 4 + 0] = r2;
            this.colors[k * 4 + 1] = g2;
            this.colors[k * 4 + 2] = b2;
            this.colors[k * 4 + 3] = a2 * blendProgress;

            if (isTextured) {
              const texAngSum = pTwoPi + texAng + quarterPi;
              this.uvs[k * 2 + 0] = 0.5 + 0.5 * Math.cos(texAngSum) / texZoom * this.aspecty;
              this.uvs[k * 2 + 1] = 0.5 + 0.5 * Math.sin(texAngSum) / texZoom;
            }

            if (hasBorder) {
              this.borderPositions[(k - 1) * 3 + 0] = this.positions[k * 3 + 0];
              this.borderPositions[(k - 1) * 3 + 1] = this.positions[k * 3 + 1];
              this.borderPositions[(k - 1) * 3 + 2] = this.positions[k * 3 + 2];
            }
          }

          this.drawCustomShapeInstance(prevTexture, sides, isTextured, hasBorder, isBorderThick, isAdditive);
        }
      }
    }
  }

  setupShapeBuffers(wrap) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.aPosLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aPosLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colors, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.aColorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aColorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.uvs, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.aUvLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aUvLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.borderPositionVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.borderPositions, this.gl.DYNAMIC_DRAW);
    this.gl.vertexAttribPointer(this.aBorderPosLoc, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aBorderPosLoc);
    const wrapping = wrap !== 0 ? this.gl.REPEAT : this.gl.CLAMP_TO_EDGE;
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_S, wrapping);
    this.gl.samplerParameteri(this.mainSampler, this.gl.TEXTURE_WRAP_T, wrapping);
  }

  drawCustomShapeInstance(prevTexture, sides, isTextured, hasBorder, isBorderThick, isAdditive) {
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.positions, 0, (sides + 2) * 3);
    this.gl.vertexAttribPointer(this.aPosLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aPosLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVertexBuf);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.colors, 0, (sides + 2) * 4);
    this.gl.vertexAttribPointer(this.aColorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.aColorLocation);

    if (isTextured) {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.uvVertexBuf);
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.uvs, 0, (sides + 2) * 2);
      this.gl.vertexAttribPointer(this.aUvLocation, 2, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aUvLocation);
    }

    this.gl.uniform1f(this.texturedLoc, isTextured ? 1 : 0);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, prevTexture);
    this.gl.bindSampler(0, this.mainSampler);
    this.gl.uniform1i(this.textureLoc, 0);

    if (isAdditive) {
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
    } else {
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, sides + 2);

    if (hasBorder) {
      this.gl.useProgram(this.borderShaderProgram);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.borderPositionVertexBuf);
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.borderPositions, 0, (sides + 1) * 3);
      this.gl.vertexAttribPointer(this.aBorderPosLoc, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aBorderPosLoc);
      this.gl.uniform4fv(this.uBorderColorLoc, this.borderColor); // TODO: use drawArraysInstanced

      const instances = isBorderThick ? 4 : 1;

      for (let i = 0; i < instances; i++) {
        const offset = 2;

        if (i === 0) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, 0]);
        } else if (i === 1) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, 0]);
        } else if (i === 2) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, offset / this.texsizeY]);
        } else if (i === 3) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, offset / this.texsizeY]);
        }

        this.gl.drawArrays(this.gl.LINE_STRIP, 0, sides + 1);
      }
    }
  }

}

/***/ }),

/***/ "./src/rendering/sprites/border.js":
/*!*****************************************!*\
  !*** ./src/rendering/sprites/border.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Border; });
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class Border {
  constructor(gl, opts = {}) {
    this.gl = gl;
    this.positions = new Float32Array(72);
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
    this.vertexBuf = this.gl.createBuffer();
  }

  updateGlobals(opts) {
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aPos;
      void main(void) {
        gl_Position = vec4(aPos, 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      out vec4 fragColor;
      uniform vec4 u_color;
      void main(void) {
        fragColor = u_color;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLoc = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.colorLoc = this.gl.getUniformLocation(this.shaderProgram, "u_color");
  }

  addTriangle(offset, point1, point2, point3) {
    this.positions[offset + 0] = point1[0];
    this.positions[offset + 1] = point1[1];
    this.positions[offset + 2] = point1[2];
    this.positions[offset + 3] = point2[0];
    this.positions[offset + 4] = point2[1];
    this.positions[offset + 5] = point2[2];
    this.positions[offset + 6] = point3[0];
    this.positions[offset + 7] = point3[1];
    this.positions[offset + 8] = point3[2];
  } // based on https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js


  generateBorder(borderColor, borderSize, prevBorderSize) {
    if (borderSize > 0 && borderColor[3] > 0) {
      const width = 2;
      const height = 2;
      const widthHalf = width / 2;
      const heightHalf = height / 2;
      const prevBorderWidth = prevBorderSize / 2;
      const borderWidth = borderSize / 2 + prevBorderWidth;
      const prevBorderWidthWidth = prevBorderWidth * width;
      const prevBorderWidthHeight = prevBorderWidth * height;
      const borderWidthWidth = borderWidth * width;
      const borderWidthHeight = borderWidth * height; // 1st side

      let point1 = [-widthHalf + prevBorderWidthWidth, -heightHalf + borderWidthHeight, 0];
      let point2 = [-widthHalf + prevBorderWidthWidth, heightHalf - borderWidthHeight, 0];
      let point3 = [-widthHalf + borderWidthWidth, heightHalf - borderWidthHeight, 0];
      let point4 = [-widthHalf + borderWidthWidth, -heightHalf + borderWidthHeight, 0];
      this.addTriangle(0, point4, point2, point1);
      this.addTriangle(9, point4, point3, point2); // 2nd side

      point1 = [widthHalf - prevBorderWidthWidth, -heightHalf + borderWidthHeight, 0];
      point2 = [widthHalf - prevBorderWidthWidth, heightHalf - borderWidthHeight, 0];
      point3 = [widthHalf - borderWidthWidth, heightHalf - borderWidthHeight, 0];
      point4 = [widthHalf - borderWidthWidth, -heightHalf + borderWidthHeight, 0];
      this.addTriangle(18, point1, point2, point4);
      this.addTriangle(27, point2, point3, point4); // Top

      point1 = [-widthHalf + prevBorderWidthWidth, -heightHalf + prevBorderWidthHeight, 0];
      point2 = [-widthHalf + prevBorderWidthWidth, borderWidthHeight - heightHalf, 0];
      point3 = [widthHalf - prevBorderWidthWidth, borderWidthHeight - heightHalf, 0];
      point4 = [widthHalf - prevBorderWidthWidth, -heightHalf + prevBorderWidthHeight, 0];
      this.addTriangle(36, point4, point2, point1);
      this.addTriangle(45, point4, point3, point2); // Bottom

      point1 = [-widthHalf + prevBorderWidthWidth, heightHalf - prevBorderWidthHeight, 0];
      point2 = [-widthHalf + prevBorderWidthWidth, heightHalf - borderWidthHeight, 0];
      point3 = [widthHalf - prevBorderWidthWidth, heightHalf - borderWidthHeight, 0];
      point4 = [widthHalf - prevBorderWidthWidth, heightHalf - prevBorderWidthHeight, 0];
      this.addTriangle(54, point1, point2, point4);
      this.addTriangle(63, point2, point3, point4);
      return true;
    }

    return false;
  }

  drawBorder(borderColor, borderSize, prevBorderSize) {
    if (this.generateBorder(borderColor, borderSize, prevBorderSize)) {
      this.gl.useProgram(this.shaderProgram);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aPosLoc, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aPosLoc);
      this.gl.uniform4fv(this.colorLoc, borderColor);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.positions.length / 3);
    }
  }

}

/***/ }),

/***/ "./src/rendering/sprites/darkenCenter.js":
/*!***********************************************!*\
  !*** ./src/rendering/sprites/darkenCenter.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomShape; });
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class CustomShape {
  constructor(gl, opts) {
    this.gl = gl;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.generatePositions();
    this.colors = new Float32Array([0, 0, 0, 3 / 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.positionVertexBuf = this.gl.createBuffer();
    this.colorVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  updateGlobals(opts) {
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.generatePositions();
  }

  generatePositions() {
    const halfSize = 0.05;
    this.positions = new Float32Array([0, 0, 0, -halfSize * this.aspecty, 0, 0, 0, -halfSize, 0, halfSize * this.aspecty, 0, 0, 0, halfSize, 0, -halfSize * this.aspecty, 0, 0]);
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aPos;
      in vec4 aColor;
      out vec4 vColor;
      void main(void) {
        vColor = aColor;
        gl_Position = vec4(aPos, 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      in vec4 vColor;
      out vec4 fragColor;
      void main(void) {
        fragColor = vColor;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.aColorLocation = this.gl.getAttribLocation(this.shaderProgram, "aColor");
  }

  drawDarkenCenter(mdVSFrame) {
    if (mdVSFrame.darken_center !== 0) {
      this.gl.useProgram(this.shaderProgram);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.positions, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aPosLocation, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aPosLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.colors, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aColorLocation, 4, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aColorLocation);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, this.positions.length / 3);
    }
  }

}

/***/ }),

/***/ "./src/rendering/text/titleText.js":
/*!*****************************************!*\
  !*** ./src/rendering/text/titleText.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TitleText; });
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");

class TitleText {
  constructor(gl, opts = {}) {
    this.gl = gl;
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.buildPositions();
    this.textTexture = this.gl.createTexture();
    this.indexBuf = gl.createBuffer();
    this.positionVertexBuf = this.gl.createBuffer();
    this.vertexBuf = this.gl.createBuffer();
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.texsizeX;
    this.canvas.height = this.texsizeY;
    this.context2D = this.canvas.getContext("2d");
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  generateTitleTexture(text) {
    this.context2D.clearRect(0, 0, this.texsizeX, this.texsizeY);
    this.fontSize = Math.floor(16 * (this.texsizeX / 256));
    this.fontSize = Math.max(this.fontSize, 6);
    this.context2D.font = `italic ${this.fontSize}px Times New Roman`;
    let titleText = text;
    let textLength = this.context2D.measureText(titleText).width;

    if (textLength > this.texsizeX) {
      const percentToKeep = 0.91 * (this.texsizeX / textLength);
      titleText = `${titleText.substring(0, Math.floor(titleText.length * percentToKeep))}...`;
      textLength = this.context2D.measureText(titleText).width;
    }

    this.context2D.fillStyle = "#FFFFFF";
    this.context2D.fillText(titleText, (this.texsizeX - textLength) / 2, this.texsizeY / 2);
    const imageData = new Uint8Array(this.context2D.getImageData(0, 0, this.texsizeX, this.texsizeY).data.buffer);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textTexture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.texsizeX, this.texsizeY, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, imageData);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.canvas.width = this.texsizeX;
    this.canvas.height = this.texsizeY;
  } // based on https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js


  buildPositions() {
    const width = 2;
    const height = 2;
    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const gridX = 15;
    const gridY = 7;
    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;
    const segmentWidth = width / gridX;
    const segmentHeight = height / gridY;
    const vertices = [];

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf;

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf;
        vertices.push(x, -y, 0);
      }
    }

    const indices = [];

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iy;
        const b = ix + gridX1 * (iy + 1);
        const c = ix + 1 + gridX1 * (iy + 1);
        const d = ix + 1 + gridX1 * iy;
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    this.vertices = new Float32Array(vertices);
    this.indices = new Uint16Array(indices);
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `#version 300 es
       const vec2 halfmad = vec2(0.5);
       in vec2 aPos;
       in vec2 aUv;
       out vec2 uv_orig;
       out vec2 uv;
       void main(void) {
         gl_Position = vec4(aPos, 0.0, 1.0);
         uv_orig = aPos * halfmad + halfmad;
         uv = aUv;
       }`);
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `#version 300 es
       precision ${this.floatPrecision} float;
       precision highp int;
       precision mediump sampler2D;

       in vec2 uv_orig;
       in vec2 uv;
       out vec4 fragColor;
       uniform sampler2D uTexture;
       uniform float textColor;

       void main(void) {
         fragColor = texture(uTexture, uv) * vec4(textColor);
       }`);
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.positionLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.uvLocation = this.gl.getAttribLocation(this.shaderProgram, "aUv");
    this.textureLoc = this.gl.getUniformLocation(this.shaderProgram, "uTexture");
    this.textColorLoc = this.gl.getUniformLocation(this.shaderProgram, "textColor");
  }

  generateUvs(progress, flip, globalVars) {
    const gridX = 15;
    const gridY = 7;
    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;
    const uvs = [];
    const vertClip = 0.75;

    for (let j = 0; j < gridY1; j++) {
      for (let i = 0; i < gridX1; i++) {
        const u = i / gridX;
        const v = (j / gridY - 0.5) * vertClip + 0.5;
        const x = u * 2.0 - 1.0;
        let y = v * 2.0 - 1.0;

        if (progress >= 1) {
          y += 1.0 / this.texsizeY;
        }

        uvs.push(x, flip ? y : -y);
      }
    }

    const rampedProgress = Math.max(0, 1 - progress * 1.5);
    const t2 = rampedProgress ** 1.8 * 1.3;

    for (let j = 0; j < gridY1; j++) {
      for (let i = 0; i < gridX1; i++) {
        const idx = j * gridX1 + i;
        uvs[idx] += t2 * 0.07 * Math.sin(globalVars.time * 0.31 + uvs[idx] * 0.39 - uvs[idx + 1] * 1.94);
        uvs[idx] += t2 * 0.044 * Math.sin(globalVars.time * 0.81 - uvs[idx] * 1.91 + uvs[idx + 1] * 0.27);
        uvs[idx] += t2 * 0.061 * Math.sin(globalVars.time * 1.31 + uvs[idx] * 0.61 + uvs[idx + 1] * 0.74);
        uvs[idx + 1] += t2 * 0.061 * Math.sin(globalVars.time * 0.37 + uvs[idx] * 1.83 + uvs[idx + 1] * 0.69);
        uvs[idx + 1] += t2 * 0.07 * Math.sin(globalVars.time * 0.67 + uvs[idx] * 0.42 - uvs[idx + 1] * 1.39);
        uvs[idx + 1] += t2 * 0.087 * Math.sin(globalVars.time * 1.07 + uvs[idx] * 3.55 + uvs[idx + 1] * 0.89);
      }
    }

    const scale = 1.01 / (progress ** 0.21 + 0.01);

    for (let i = 0; i < uvs.length / 2; i++) {
      uvs[i * 2] *= scale;
      uvs[i * 2 + 1] *= scale * this.invAspecty; // get back UVs

      uvs[i * 2] = (uvs[i * 2] + 1) / 2.0;
      uvs[i * 2 + 1] = (uvs[i * 2 + 1] + 1) / 2.0;
    }

    return new Float32Array(uvs);
  }

  renderTitle(progress, flip, globalVars) {
    this.gl.useProgram(this.shaderProgram);
    const progressUvs = this.generateUvs(progress, flip, globalVars);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuf);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, progressUvs, this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(this.uvLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.uvLocation);
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textTexture);
    this.gl.uniform1i(this.textureLoc, 0);
    this.gl.uniform1f(this.textColorLoc, progress ** 0.3);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);
  }

}

/***/ }),

/***/ "./src/rendering/waves/basicWaveform.js":
/*!**********************************************!*\
  !*** ./src/rendering/waves/basicWaveform.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BasicWaveform; });
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");
/* harmony import */ var _waveUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waveUtils */ "./src/rendering/waves/waveUtils.js");


class BasicWaveform {
  constructor(gl, opts = {}) {
    this.gl = gl;
    const numAudioSamples = 512;
    this.positions = new Float32Array(numAudioSamples * 3);
    this.positions2 = new Float32Array(numAudioSamples * 3);
    this.oldPositions = new Float32Array(numAudioSamples * 3);
    this.oldPositions2 = new Float32Array(numAudioSamples * 3);
    this.smoothedPositions = new Float32Array((numAudioSamples * 2 - 1) * 3);
    this.smoothedPositions2 = new Float32Array((numAudioSamples * 2 - 1) * 3);
    this.color = [0, 0, 0, 1];
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
    this.vertexBuf = this.gl.createBuffer();
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      in vec3 aPos;
      uniform vec2 thickOffset;
      void main(void) {
        gl_Position = vec4(aPos + vec3(thickOffset, 0.0), 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      out vec4 fragColor;
      uniform vec4 u_color;
      void main(void) {
        fragColor = u_color;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLoc = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.colorLoc = this.gl.getUniformLocation(this.shaderProgram, "u_color");
    this.thickOffsetLoc = this.gl.getUniformLocation(this.shaderProgram, "thickOffset");
  }

  static processWaveform(timeArray, mdVSFrame) {
    const waveform = [];
    const scale = mdVSFrame.wave_scale / 128.0;
    const smooth = mdVSFrame.wave_smoothing;
    const smooth2 = scale * (1.0 - smooth);
    waveform.push(timeArray[0] * scale);

    for (let i = 1; i < timeArray.length; i++) {
      waveform.push(timeArray[i] * smooth2 + waveform[i - 1] * smooth);
    }

    return waveform;
  }

  generateWaveform(blending, blendProgress, timeArrayL, timeArrayR, mdVSFrame) {
    let alpha = mdVSFrame.wave_a;
    const vol = (mdVSFrame.bass + mdVSFrame.mid + mdVSFrame.treb) / 3.0;

    if (vol > -0.01 && alpha > 0.001 && timeArrayL.length > 0) {
      const waveL = BasicWaveform.processWaveform(timeArrayL, mdVSFrame);
      const waveR = BasicWaveform.processWaveform(timeArrayR, mdVSFrame);
      const newWaveMode = Math.floor(mdVSFrame.wave_mode) % 8;
      const oldWaveMode = Math.floor(mdVSFrame.old_wave_mode) % 8;
      const wavePosX = mdVSFrame.wave_x * 2.0 - 1.0;
      const wavePosY = mdVSFrame.wave_y * 2.0 - 1.0;
      this.numVert = 0;
      this.oldNumVert = 0;
      const its = blending && newWaveMode !== oldWaveMode ? 2 : 1;

      for (let it = 0; it < its; it++) {
        const waveMode = it === 0 ? newWaveMode : oldWaveMode;
        let fWaveParam2 = mdVSFrame.wave_mystery;

        if ((waveMode === 0 || waveMode === 1 || waveMode === 4) && (fWaveParam2 < -1 || fWaveParam2 > 1)) {
          fWaveParam2 = fWaveParam2 * 0.5 + 0.5;
          fWaveParam2 -= Math.floor(fWaveParam2);
          fWaveParam2 = Math.abs(fWaveParam2);
          fWaveParam2 = fWaveParam2 * 2 - 1;
        }

        let numVert;
        let positions;
        let positions2;

        if (it === 0) {
          positions = this.positions;
          positions2 = this.positions2;
        } else {
          positions = this.oldPositions;
          positions2 = this.oldPositions2;
        }

        alpha = mdVSFrame.wave_a;

        if (waveMode === 0) {
          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = Math.floor(waveL.length / 2) + 1;
          const numVertInv = 1.0 / (numVert - 1);
          const sampleOffset = Math.floor((waveL.length - numVert) / 2);

          for (let i = 0; i < numVert - 1; i++) {
            let rad = 0.5 + 0.4 * waveR[i + sampleOffset] + fWaveParam2;
            const ang = i * numVertInv * 2 * Math.PI + mdVSFrame.time * 0.2;

            if (i < numVert / 10) {
              let mix = i / (numVert * 0.1);
              mix = 0.5 - 0.5 * Math.cos(mix * Math.PI);
              const rad2 = 0.5 + 0.4 * waveR[i + numVert + sampleOffset] + fWaveParam2;
              rad = (1.0 - mix) * rad2 + rad * mix;
            }

            positions[i * 3 + 0] = rad * Math.cos(ang) * this.aspecty + wavePosX;
            positions[i * 3 + 1] = rad * Math.sin(ang) * this.aspectx + wavePosY;
            positions[i * 3 + 2] = 0;
          } // connect the loop


          positions[(numVert - 1) * 3 + 0] = positions[0];
          positions[(numVert - 1) * 3 + 1] = positions[1];
          positions[(numVert - 1) * 3 + 2] = 0;
        } else if (waveMode === 1) {
          alpha *= 1.25;

          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = Math.floor(waveL.length / 2);

          for (let i = 0; i < numVert; i++) {
            const rad = 0.53 + 0.43 * waveR[i] + fWaveParam2;
            const ang = waveL[i + 32] * 0.5 * Math.PI + mdVSFrame.time * 2.3;
            positions[i * 3 + 0] = rad * Math.cos(ang) * this.aspecty + wavePosX;
            positions[i * 3 + 1] = rad * Math.sin(ang) * this.aspectx + wavePosY;
            positions[i * 3 + 2] = 0;
          }
        } else if (waveMode === 2) {
          if (this.texsizeX < 1024) {
            alpha *= 0.09;
          } else if (this.texsizeX >= 1024 && this.texsizeX < 2048) {
            alpha *= 0.11;
          } else {
            alpha *= 0.13;
          }

          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = waveL.length;

          for (let i = 0; i < waveL.length; i++) {
            positions[i * 3 + 0] = waveR[i] * this.aspecty + wavePosX;
            positions[i * 3 + 1] = waveL[(i + 32) % waveL.length] * this.aspectx + wavePosY;
            positions[i * 3 + 2] = 0;
          }
        } else if (waveMode === 3) {
          if (this.texsizeX < 1024) {
            alpha *= 0.15;
          } else if (this.texsizeX >= 1024 && this.texsizeX < 2048) {
            alpha *= 0.22;
          } else {
            alpha *= 0.33;
          }

          alpha *= 1.3;
          alpha *= mdVSFrame.treb * mdVSFrame.treb; // should be treb_imm

          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = waveL.length;

          for (let i = 0; i < waveL.length; i++) {
            positions[i * 3 + 0] = waveR[i] * this.aspecty + wavePosX;
            positions[i * 3 + 1] = waveL[(i + 32) % waveL.length] * this.aspectx + wavePosY;
            positions[i * 3 + 2] = 0;
          }
        } else if (waveMode === 4) {
          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = waveL.length;

          if (numVert > this.texsizeX / 3) {
            numVert = Math.floor(this.texsizeX / 3);
          }

          const numVertInv = 1.0 / numVert;
          const sampleOffset = Math.floor((waveL.length - numVert) / 2);
          const w1 = 0.45 + 0.5 * (fWaveParam2 * 0.5 + 0.5);
          const w2 = 1.0 - w1;

          for (let i = 0; i < numVert; i++) {
            let x = 2.0 * i * numVertInv + (wavePosX - 1) + waveR[(i + 25 + sampleOffset) % waveL.length] * 0.44;
            let y = waveL[i + sampleOffset] * 0.47 + wavePosY; // momentum

            if (i > 1) {
              x = x * w2 + w1 * (positions[(i - 1) * 3 + 0] * 2.0 - positions[(i - 2) * 3 + 0]);
              y = y * w2 + w1 * (positions[(i - 1) * 3 + 1] * 2.0 - positions[(i - 2) * 3 + 1]);
            }

            positions[i * 3 + 0] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = 0;
          }
        } else if (waveMode === 5) {
          if (this.texsizeX < 1024) {
            alpha *= 0.09;
          } else if (this.texsizeX >= 1024 && this.texsizeX < 2048) {
            alpha *= 0.11;
          } else {
            alpha *= 0.13;
          }

          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          const cosRot = Math.cos(mdVSFrame.time * 0.3);
          const sinRot = Math.sin(mdVSFrame.time * 0.3);
          numVert = waveL.length;

          for (let i = 0; i < waveL.length; i++) {
            const ioff = (i + 32) % waveL.length;
            const x0 = waveR[i] * waveL[ioff] + waveL[i] * waveR[ioff];
            const y0 = waveR[i] * waveR[i] - waveL[ioff] * waveL[ioff];
            positions[i * 3 + 0] = (x0 * cosRot - y0 * sinRot) * (this.aspecty + wavePosX);
            positions[i * 3 + 1] = (x0 * sinRot + y0 * cosRot) * (this.aspectx + wavePosY);
            positions[i * 3 + 2] = 0;
          }
        } else if (waveMode === 6 || waveMode === 7) {
          if (mdVSFrame.modwavealphabyvolume > 0) {
            const alphaDiff = mdVSFrame.modwavealphaend - mdVSFrame.modwavealphastart;
            alpha *= (vol - mdVSFrame.modwavealphastart) / alphaDiff;
          }

          alpha = Math.clamp(alpha, 0, 1);
          numVert = Math.floor(waveL.length / 2);

          if (numVert > this.texsizeX / 3) {
            numVert = Math.floor(this.texsizeX / 3);
          }

          const sampleOffset = Math.floor((waveL.length - numVert) / 2);
          const ang = Math.PI * 0.5 * fWaveParam2;
          let dx = Math.cos(ang);
          let dy = Math.sin(ang);
          const edgex = [wavePosX * Math.cos(ang + Math.PI * 0.5) - dx * 3.0, wavePosX * Math.cos(ang + Math.PI * 0.5) + dx * 3.0];
          const edgey = [wavePosX * Math.sin(ang + Math.PI * 0.5) - dy * 3.0, wavePosX * Math.sin(ang + Math.PI * 0.5) + dy * 3.0];

          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 4; j++) {
              let t;
              let bClip = false;

              switch (j) {
                case 0:
                  if (edgex[i] > 1.1) {
                    t = (1.1 - edgex[1 - i]) / (edgex[i] - edgex[1 - i]);
                    bClip = true;
                  }

                  break;

                case 1:
                  if (edgex[i] < -1.1) {
                    t = (-1.1 - edgex[1 - i]) / (edgex[i] - edgex[1 - i]);
                    bClip = true;
                  }

                  break;

                case 2:
                  if (edgey[i] > 1.1) {
                    t = (1.1 - edgey[1 - i]) / (edgey[i] - edgey[1 - i]);
                    bClip = true;
                  }

                  break;

                case 3:
                  if (edgey[i] < -1.1) {
                    t = (-1.1 - edgey[1 - i]) / (edgey[i] - edgey[1 - i]);
                    bClip = true;
                  }

                  break;

                default:
              }

              if (bClip) {
                const dxi = edgex[i] - edgex[1 - i];
                const dyi = edgey[i] - edgey[1 - i];
                edgex[i] = edgex[1 - i] + dxi * t;
                edgey[i] = edgey[1 - i] + dyi * t;
              }
            }
          }

          dx = (edgex[1] - edgex[0]) / numVert;
          dy = (edgey[1] - edgey[0]) / numVert;
          const ang2 = Math.atan2(dy, dx);
          const perpDx = Math.cos(ang2 + Math.PI * 0.5);
          const perpDy = Math.sin(ang2 + Math.PI * 0.5);

          if (waveMode === 6) {
            for (let i = 0; i < numVert; i++) {
              const sample = waveL[i + sampleOffset];
              positions[i * 3 + 0] = edgex[0] + dx * i + perpDx * 0.25 * sample;
              positions[i * 3 + 1] = edgey[0] + dy * i + perpDy * 0.25 * sample;
              positions[i * 3 + 2] = 0;
            }
          } else if (waveMode === 7) {
            const sep = (wavePosY * 0.5 + 0.5) ** 2;

            for (let i = 0; i < numVert; i++) {
              const sample = waveL[i + sampleOffset];
              positions[i * 3 + 0] = edgex[0] + dx * i + perpDx * (0.25 * sample + sep);
              positions[i * 3 + 1] = edgey[0] + dy * i + perpDy * (0.25 * sample + sep);
              positions[i * 3 + 2] = 0;
            }

            for (let i = 0; i < numVert; i++) {
              const sample = waveR[i + sampleOffset];
              positions2[i * 3 + 0] = edgex[0] + dx * i + perpDx * (0.25 * sample - sep);
              positions2[i * 3 + 1] = edgey[0] + dy * i + perpDy * (0.25 * sample - sep);
              positions2[i * 3 + 2] = 0;
            }
          }
        }

        if (it === 0) {
          this.positions = positions;
          this.positions2 = positions2;
          this.numVert = numVert;
          this.alpha = alpha;
        } else {
          this.oldPositions = positions;
          this.oldPositions2 = positions2;
          this.oldNumVert = numVert;
          this.oldAlpha = alpha;
        }
      }

      const mix = 0.5 - 0.5 * Math.cos(blendProgress * Math.PI);
      const mix2 = 1 - mix;

      if (this.oldNumVert > 0) {
        alpha = mix * this.alpha + mix2 * this.oldAlpha;
      }

      let r = Math.clamp(mdVSFrame.wave_r, 0, 1);
      let g = Math.clamp(mdVSFrame.wave_g, 0, 1);
      let b = Math.clamp(mdVSFrame.wave_b, 0, 1);

      if (mdVSFrame.wave_brighten !== 0) {
        const maxc = Math.max(r, g, b);

        if (maxc > 0.01) {
          r /= maxc;
          g /= maxc;
          b /= maxc;
        }
      }

      this.color = [r, g, b, alpha];

      if (this.oldNumVert > 0) {
        if (newWaveMode === 7) {
          const m = (this.oldNumVert - 1) / (this.numVert * 2);

          for (let i = 0; i < this.numVert; i++) {
            const fIdx = i * m;
            const nIdx = Math.floor(fIdx);
            const t = fIdx - nIdx;
            const x = this.oldPositions[nIdx * 3 + 0] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 0] * t;
            const y = this.oldPositions[nIdx * 3 + 1] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 1] * t;
            this.positions[i * 3 + 0] = this.positions[i * 3 + 0] * mix + x * mix2;
            this.positions[i * 3 + 1] = this.positions[i * 3 + 1] * mix + y * mix2;
            this.positions[i * 3 + 2] = 0;
          }

          for (let i = 0; i < this.numVert; i++) {
            const fIdx = (i + this.numVert) * m;
            const nIdx = Math.floor(fIdx);
            const t = fIdx - nIdx;
            const x = this.oldPositions[nIdx * 3 + 0] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 0] * t;
            const y = this.oldPositions[nIdx * 3 + 1] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 1] * t;
            this.positions2[i * 3 + 0] = this.positions2[i * 3 + 0] * mix + x * mix2;
            this.positions2[i * 3 + 1] = this.positions2[i * 3 + 1] * mix + y * mix2;
            this.positions2[i * 3 + 2] = 0;
          }
        } else if (oldWaveMode === 7) {
          const halfNumVert = this.numVert / 2;
          const m = (this.oldNumVert - 1) / halfNumVert;

          for (let i = 0; i < halfNumVert; i++) {
            const fIdx = i * m;
            const nIdx = Math.floor(fIdx);
            const t = fIdx - nIdx;
            const x = this.oldPositions[nIdx * 3 + 0] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 0] * t;
            const y = this.oldPositions[nIdx * 3 + 1] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 1] * t;
            this.positions[i * 3 + 0] = this.positions[i * 3 + 0] * mix + x * mix2;
            this.positions[i * 3 + 1] = this.positions[i * 3 + 1] * mix + y * mix2;
            this.positions[i * 3 + 2] = 0;
          }

          for (let i = 0; i < halfNumVert; i++) {
            const fIdx = i * m;
            const nIdx = Math.floor(fIdx);
            const t = fIdx - nIdx;
            const x = this.oldPositions2[nIdx * 3 + 0] * (1 - t) + this.oldPositions2[(nIdx + 1) * 3 + 0] * t;
            const y = this.oldPositions2[nIdx * 3 + 1] * (1 - t) + this.oldPositions2[(nIdx + 1) * 3 + 1] * t;
            this.positions2[i * 3 + 0] = this.positions[(i + halfNumVert) * 3 + 0] * mix + x * mix2;
            this.positions2[i * 3 + 1] = this.positions[(i + halfNumVert) * 3 + 1] * mix + y * mix2;
            this.positions2[i * 3 + 2] = 0;
          }
        } else {
          const m = (this.oldNumVert - 1) / this.numVert;

          for (let i = 0; i < this.numVert; i++) {
            const fIdx = i * m;
            const nIdx = Math.floor(fIdx);
            const t = fIdx - nIdx;
            const x = this.oldPositions[nIdx * 3 + 0] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 0] * t;
            const y = this.oldPositions[nIdx * 3 + 1] * (1 - t) + this.oldPositions[(nIdx + 1) * 3 + 1] * t;
            this.positions[i * 3 + 0] = this.positions[i * 3 + 0] * mix + x * mix2;
            this.positions[i * 3 + 1] = this.positions[i * 3 + 1] * mix + y * mix2;
            this.positions[i * 3 + 2] = 0;
          }
        }
      }

      for (let i = 0; i < this.numVert; i++) {
        this.positions[i * 3 + 1] = -this.positions[i * 3 + 1];
      }

      this.smoothedNumVert = this.numVert * 2 - 1;
      _waveUtils__WEBPACK_IMPORTED_MODULE_1__["default"].smoothWave(this.positions, this.smoothedPositions, this.numVert);

      if (newWaveMode === 7 || oldWaveMode === 7) {
        for (let i = 0; i < this.numVert; i++) {
          this.positions2[i * 3 + 1] = -this.positions2[i * 3 + 1];
        }

        _waveUtils__WEBPACK_IMPORTED_MODULE_1__["default"].smoothWave(this.positions2, this.smoothedPositions2, this.numVert);
      }

      return true;
    }

    return false;
  }

  drawBasicWaveform(blending, blendProgress, timeArrayL, timeArrayR, mdVSFrame) {
    if (this.generateWaveform(blending, blendProgress, timeArrayL, timeArrayR, mdVSFrame)) {
      this.gl.useProgram(this.shaderProgram);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, this.smoothedPositions, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aPosLoc, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aPosLoc);
      this.gl.uniform4fv(this.colorLoc, this.color);
      let instances = 1;

      if (mdVSFrame.wave_thick !== 0 || mdVSFrame.wave_dots !== 0) {
        instances = 4;
      }

      if (mdVSFrame.additivewave !== 0) {
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
      } else {
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      }

      const drawMode = mdVSFrame.wave_dots !== 0 ? this.gl.POINTS : this.gl.LINE_STRIP; // TODO: use drawArraysInstanced

      for (let i = 0; i < instances; i++) {
        const offset = 2;

        if (i === 0) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, 0]);
        } else if (i === 1) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, 0]);
        } else if (i === 2) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, offset / this.texsizeY]);
        } else if (i === 3) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, offset / this.texsizeY]);
        }

        this.gl.drawArrays(drawMode, 0, this.smoothedNumVert);
      }

      const waveMode = Math.floor(mdVSFrame.wave_mode) % 8;

      if (waveMode === 7) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuf);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.smoothedPositions2, this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.aPosLoc, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.aPosLoc);

        for (let i = 0; i < instances; i++) {
          const offset = 2;

          if (i === 0) {
            this.gl.uniform2fv(this.thickOffsetLoc, [0, 0]);
          } else if (i === 1) {
            this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, 0]);
          } else if (i === 2) {
            this.gl.uniform2fv(this.thickOffsetLoc, [0, offset / this.texsizeY]);
          } else if (i === 3) {
            this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, offset / this.texsizeY]);
          }

          this.gl.drawArrays(drawMode, 0, this.smoothedNumVert);
        }
      }
    }
  }

}

/***/ }),

/***/ "./src/rendering/waves/customWaveform.js":
/*!***********************************************!*\
  !*** ./src/rendering/waves/customWaveform.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomWaveform; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.js");
/* harmony import */ var _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/shaderUtils */ "./src/rendering/shaders/shaderUtils.js");
/* harmony import */ var _waveUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./waveUtils */ "./src/rendering/waves/waveUtils.js");



class CustomWaveform {
  constructor(index, gl, opts) {
    this.index = index;
    this.gl = gl;
    const maxSamples = 512;
    this.pointsData = [new Float32Array(maxSamples), new Float32Array(maxSamples)];
    this.positions = new Float32Array(maxSamples * 3);
    this.colors = new Float32Array(maxSamples * 4);
    this.smoothedPositions = new Float32Array((maxSamples * 2 - 1) * 3);
    this.smoothedColors = new Float32Array((maxSamples * 2 - 1) * 4);
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
    this.positionVertexBuf = this.gl.createBuffer();
    this.colorVertexBuf = this.gl.createBuffer();
    this.floatPrecision = _shaders_shaderUtils__WEBPACK_IMPORTED_MODULE_1__["default"].getFragmentFloatPrecision(this.gl);
    this.createShader();
  }

  updateGlobals(opts) {
    this.texsizeX = opts.texsizeX;
    this.texsizeY = opts.texsizeY;
    this.mesh_width = opts.mesh_width;
    this.mesh_height = opts.mesh_height;
    this.aspectx = opts.aspectx;
    this.aspecty = opts.aspecty;
    this.invAspectx = 1.0 / this.aspectx;
    this.invAspecty = 1.0 / this.aspecty;
  }

  createShader() {
    this.shaderProgram = this.gl.createProgram();
    const vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vertShader, `
      #version 300 es
      uniform float uSize;
      uniform vec2 thickOffset;
      in vec3 aPos;
      in vec4 aColor;
      out vec4 vColor;
      void main(void) {
        vColor = aColor;
        gl_PointSize = uSize;
        gl_Position = vec4(aPos + vec3(thickOffset, 0.0), 1.0);
      }
      `.trim());
    this.gl.compileShader(vertShader);
    const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(fragShader, `
      #version 300 es
      precision ${this.floatPrecision} float;
      precision highp int;
      precision mediump sampler2D;
      in vec4 vColor;
      out vec4 fragColor;
      void main(void) {
        fragColor = vColor;
      }
      `.trim());
    this.gl.compileShader(fragShader);
    this.gl.attachShader(this.shaderProgram, vertShader);
    this.gl.attachShader(this.shaderProgram, fragShader);
    this.gl.linkProgram(this.shaderProgram);
    this.aPosLocation = this.gl.getAttribLocation(this.shaderProgram, "aPos");
    this.aColorLocation = this.gl.getAttribLocation(this.shaderProgram, "aColor");
    this.sizeLoc = this.gl.getUniformLocation(this.shaderProgram, "uSize");
    this.thickOffsetLoc = this.gl.getUniformLocation(this.shaderProgram, "thickOffset");
  }

  generateWaveform(timeArrayL, timeArrayR, freqArrayL, freqArrayR, globalVars, presetEquationRunner, waveEqs, alphaMult) {
    if (waveEqs.baseVals.enabled !== 0 && timeArrayL.length > 0) {
      let mdVSWaveFrame;

      if (presetEquationRunner.preset.useWASM) {
        mdVSWaveFrame = presetEquationRunner.runWaveFrameEquations(this.index, globalVars);
      } else {
        const mdVSWave = Object.assign({}, presetEquationRunner.mdVSWaves[this.index], presetEquationRunner.mdVSFrameMapWaves[this.index], presetEquationRunner.mdVSQAfterFrame, presetEquationRunner.mdVSTWaveInits[this.index], globalVars);
        mdVSWaveFrame = presetEquationRunner.runWaveFrameEquations(this.index, mdVSWave);
      }

      const maxSamples = 512;

      if (Object.prototype.hasOwnProperty.call(mdVSWaveFrame, "samples")) {
        this.samples = mdVSWaveFrame.samples;
      } else {
        this.samples = maxSamples;
      }

      if (this.samples > maxSamples) {
        this.samples = maxSamples;
      }

      this.samples = Math.floor(this.samples);
      const baseVals = presetEquationRunner.preset.waves[this.index].baseVals;
      const sep = Math.floor(mdVSWaveFrame.sep);
      const scaling = mdVSWaveFrame.scaling;
      const spectrum = mdVSWaveFrame.spectrum;
      const smoothing = mdVSWaveFrame.smoothing;
      const usedots = baseVals.usedots;
      const frameR = mdVSWaveFrame.r;
      const frameG = mdVSWaveFrame.g;
      const frameB = mdVSWaveFrame.b;
      const frameA = mdVSWaveFrame.a;
      const waveScale = presetEquationRunner.preset.baseVals.wave_scale;
      this.samples -= sep;

      if (this.samples >= 2 || usedots !== 0 && this.samples >= 1) {
        const useSpectrum = spectrum !== 0;
        const scale = (useSpectrum ? 0.15 : 0.004) * scaling * waveScale;
        const pointsLeft = useSpectrum ? freqArrayL : timeArrayL;
        const pointsRight = useSpectrum ? freqArrayR : timeArrayR;
        const j0 = useSpectrum ? 0 : Math.floor((maxSamples - this.samples) / 2 - sep / 2);
        const j1 = useSpectrum ? 0 : Math.floor((maxSamples - this.samples) / 2 + sep / 2);
        const t = useSpectrum ? (maxSamples - sep) / this.samples : 1;
        const mix1 = (smoothing * 0.98) ** 0.5;
        const mix2 = 1 - mix1; // Milkdrop smooths waveform forward, backward and then scales

        this.pointsData[0][0] = pointsLeft[j0];
        this.pointsData[1][0] = pointsRight[j1];

        for (let j = 1; j < this.samples; j++) {
          const left = pointsLeft[Math.floor(j * t + j0)];
          const right = pointsRight[Math.floor(j * t + j1)];
          this.pointsData[0][j] = left * mix2 + this.pointsData[0][j - 1] * mix1;
          this.pointsData[1][j] = right * mix2 + this.pointsData[1][j - 1] * mix1;
        }

        for (let j = this.samples - 2; j >= 0; j--) {
          this.pointsData[0][j] = this.pointsData[0][j] * mix2 + this.pointsData[0][j + 1] * mix1;
          this.pointsData[1][j] = this.pointsData[1][j] * mix2 + this.pointsData[1][j + 1] * mix1;
        }

        for (let j = 0; j < this.samples; j++) {
          this.pointsData[0][j] *= scale;
          this.pointsData[1][j] *= scale;
        }

        if (!presetEquationRunner.preset.useWASM) {
          for (let j = 0; j < this.samples; j++) {
            const value1 = this.pointsData[0][j];
            const value2 = this.pointsData[1][j];
            mdVSWaveFrame.sample = j / (this.samples - 1);
            mdVSWaveFrame.value1 = value1;
            mdVSWaveFrame.value2 = value2;
            mdVSWaveFrame.x = 0.5 + value1;
            mdVSWaveFrame.y = 0.5 + value2;
            mdVSWaveFrame.r = frameR;
            mdVSWaveFrame.g = frameG;
            mdVSWaveFrame.b = frameB;
            mdVSWaveFrame.a = frameA;

            if (waveEqs.point_eqs !== "") {
              mdVSWaveFrame = presetEquationRunner.runWavePointEquations(this.index, mdVSWaveFrame);
            }

            const x = (mdVSWaveFrame.x * 2 - 1) * this.invAspectx;
            const y = (mdVSWaveFrame.y * -2 + 1) * this.invAspecty;
            const r = mdVSWaveFrame.r;
            const g = mdVSWaveFrame.g;
            const b = mdVSWaveFrame.b;
            const a = mdVSWaveFrame.a;
            this.positions[j * 3 + 0] = x;
            this.positions[j * 3 + 1] = y;
            this.positions[j * 3 + 2] = 0;
            this.colors[j * 4 + 0] = r;
            this.colors[j * 4 + 1] = g;
            this.colors[j * 4 + 2] = b;
            this.colors[j * 4 + 3] = a * alphaMult;
          }
        } else {
          const varPool = presetEquationRunner.preset.globalPools[`wavePerFrame${this.index}`];

          for (let j = 0; j < this.samples; j++) {
            const value1 = this.pointsData[0][j];
            const value2 = this.pointsData[1][j];
            varPool.sample.value = j / (this.samples - 1);
            varPool.value1.value = value1;
            varPool.value2.value = value2;
            varPool.x.value = 0.5 + value1;
            varPool.y.value = 0.5 + value2;
            varPool.r.value = frameR;
            varPool.g.value = frameG;
            varPool.b.value = frameB;
            varPool.a.value = frameA;

            if (waveEqs.point_eqs) {
              presetEquationRunner.preset.waves[this.index].point_eqs();
            }

            const x = (varPool.x.value * 2 - 1) * this.invAspectx;
            const y = (varPool.y.value * -2 + 1) * this.invAspecty;
            const r = varPool.r.value;
            const g = varPool.g.value;
            const b = varPool.b.value;
            const a = varPool.a.value;
            this.positions[j * 3 + 0] = x;
            this.positions[j * 3 + 1] = y;
            this.positions[j * 3 + 2] = 0;
            this.colors[j * 4 + 0] = r;
            this.colors[j * 4 + 1] = g;
            this.colors[j * 4 + 2] = b;
            this.colors[j * 4 + 3] = a * alphaMult;
          }
        } // this needs to be after per point (check fishbrain - witchcraft)


        if (!presetEquationRunner.preset.useWASM) {
          const mdvsUserKeysWave = presetEquationRunner.mdVSUserKeysWaves[this.index];
          const mdVSNewFrameMapWave = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].pick(mdVSWaveFrame, mdvsUserKeysWave); // eslint-disable-next-line no-param-reassign

          presetEquationRunner.mdVSFrameMapWaves[this.index] = mdVSNewFrameMapWave;
        } else {
          mdVSWaveFrame.usedots = usedots;
          mdVSWaveFrame.thick = baseVals.thick;
          mdVSWaveFrame.additive = baseVals.additive;
        }

        this.mdVSWaveFrame = mdVSWaveFrame;

        if (usedots === 0) {
          _waveUtils__WEBPACK_IMPORTED_MODULE_2__["default"].smoothWaveAndColor(this.positions, this.colors, this.smoothedPositions, this.smoothedColors, this.samples);
        }

        return true;
      }
    }

    return false;
  }

  drawCustomWaveform(blendProgress, timeArrayL, timeArrayR, freqArrayL, freqArrayR, globalVars, presetEquationRunner, waveEqs) {
    if (waveEqs && this.generateWaveform(timeArrayL, timeArrayR, freqArrayL, freqArrayR, globalVars, presetEquationRunner, waveEqs, blendProgress)) {
      this.gl.useProgram(this.shaderProgram);
      const waveUseDots = this.mdVSWaveFrame.usedots !== 0;
      const waveThick = this.mdVSWaveFrame.thick !== 0;
      const waveAdditive = this.mdVSWaveFrame.additive !== 0;
      let positions;
      let colors;
      let numVerts;

      if (!waveUseDots) {
        positions = this.smoothedPositions;
        colors = this.smoothedColors;
        numVerts = this.samples * 2 - 1;
      } else {
        positions = this.positions;
        colors = this.colors;
        numVerts = this.samples;
      }

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionVertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aPosLocation, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aPosLocation);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorVertexBuf);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, colors, this.gl.STATIC_DRAW);
      this.gl.vertexAttribPointer(this.aColorLocation, 4, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(this.aColorLocation);
      let instances = 1;

      if (waveUseDots) {
        if (waveThick) {
          this.gl.uniform1f(this.sizeLoc, 2 + (this.texsizeX >= 1024 ? 1 : 0));
        } else {
          this.gl.uniform1f(this.sizeLoc, 1 + (this.texsizeX >= 1024 ? 1 : 0));
        }
      } else {
        this.gl.uniform1f(this.sizeLoc, 1);

        if (waveThick) {
          instances = 4;
        }
      }

      if (waveAdditive) {
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
      } else {
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      }

      const drawMode = waveUseDots ? this.gl.POINTS : this.gl.LINE_STRIP; // TODO: use drawArraysInstanced

      for (let i = 0; i < instances; i++) {
        const offset = 2;

        if (i === 0) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, 0]);
        } else if (i === 1) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, 0]);
        } else if (i === 2) {
          this.gl.uniform2fv(this.thickOffsetLoc, [0, offset / this.texsizeY]);
        } else if (i === 3) {
          this.gl.uniform2fv(this.thickOffsetLoc, [offset / this.texsizeX, offset / this.texsizeY]);
        }

        this.gl.drawArrays(drawMode, 0, numVerts);
      }
    }
  }

}

/***/ }),

/***/ "./src/rendering/waves/waveUtils.js":
/*!******************************************!*\
  !*** ./src/rendering/waves/waveUtils.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WaveUtils; });
class WaveUtils {
  /* eslint-disable no-param-reassign */
  static smoothWave(positions, positionsSmoothed, nVertsIn, zCoord = false) {
    const c1 = -0.15;
    const c2 = 1.15;
    const c3 = 1.15;
    const c4 = -0.15;
    const invSum = 1.0 / (c1 + c2 + c3 + c4);
    let j = 0;
    let iBelow = 0;
    let iAbove;
    let iAbove2 = 1;

    for (let i = 0; i < nVertsIn - 1; i++) {
      iAbove = iAbove2;
      iAbove2 = Math.min(nVertsIn - 1, i + 2);

      for (let k = 0; k < 3; k++) {
        positionsSmoothed[j * 3 + k] = positions[i * 3 + k];
      }

      if (zCoord) {
        for (let k = 0; k < 3; k++) {
          positionsSmoothed[(j + 1) * 3 + k] = (c1 * positions[iBelow * 3 + k] + c2 * positions[i * 3 + k] + c3 * positions[iAbove * 3 + k] + c4 * positions[iAbove2 * 3 + k]) * invSum;
        }
      } else {
        for (let k = 0; k < 2; k++) {
          positionsSmoothed[(j + 1) * 3 + k] = (c1 * positions[iBelow * 3 + k] + c2 * positions[i * 3 + k] + c3 * positions[iAbove * 3 + k] + c4 * positions[iAbove2 * 3 + k]) * invSum;
        }

        positionsSmoothed[(j + 1) * 3 + 2] = 0;
      }

      iBelow = i;
      j += 2;
    }

    for (let k = 0; k < 3; k++) {
      positionsSmoothed[j * 3 + k] = positions[(nVertsIn - 1) * 3 + k];
    }
  }

  static smoothWaveAndColor(positions, colors, positionsSmoothed, colorsSmoothed, nVertsIn, zCoord = false) {
    const c1 = -0.15;
    const c2 = 1.15;
    const c3 = 1.15;
    const c4 = -0.15;
    const invSum = 1.0 / (c1 + c2 + c3 + c4);
    let j = 0;
    let iBelow = 0;
    let iAbove;
    let iAbove2 = 1;

    for (let i = 0; i < nVertsIn - 1; i++) {
      iAbove = iAbove2;
      iAbove2 = Math.min(nVertsIn - 1, i + 2);

      for (let k = 0; k < 3; k++) {
        positionsSmoothed[j * 3 + k] = positions[i * 3 + k];
      }

      if (zCoord) {
        for (let k = 0; k < 3; k++) {
          positionsSmoothed[(j + 1) * 3 + k] = (c1 * positions[iBelow * 3 + k] + c2 * positions[i * 3 + k] + c3 * positions[iAbove * 3 + k] + c4 * positions[iAbove2 * 3 + k]) * invSum;
        }
      } else {
        for (let k = 0; k < 2; k++) {
          positionsSmoothed[(j + 1) * 3 + k] = (c1 * positions[iBelow * 3 + k] + c2 * positions[i * 3 + k] + c3 * positions[iAbove * 3 + k] + c4 * positions[iAbove2 * 3 + k]) * invSum;
        }

        positionsSmoothed[(j + 1) * 3 + 2] = 0;
      }

      for (let k = 0; k < 4; k++) {
        colorsSmoothed[j * 4 + k] = colors[i * 4 + k];
        colorsSmoothed[(j + 1) * 4 + k] = colors[i * 4 + k];
      }

      iBelow = i;
      j += 2;
    }

    for (let k = 0; k < 3; k++) {
      positionsSmoothed[j * 3 + k] = positions[(nVertsIn - 1) * 3 + k];
    }

    for (let k = 0; k < 4; k++) {
      colorsSmoothed[j * 4 + k] = colors[(nVertsIn - 1) * 4 + k];
    }
  }
  /* eslint-enable no-param-reassign */


}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Utils; });
class Utils {
  static atan2(x, y) {
    let a = Math.atan2(x, y);

    if (a < 0) {
      a += 2 * Math.PI;
    }

    return a;
  }

  static cloneVars(vars) {
    return Object.assign({}, vars);
  }

  static range(start, end) {
    if (end === undefined) {
      return [...Array(start).keys()];
    }

    return Array.from({
      length: end - start
    }, (_, i) => i + start);
  }

  static pick(obj, keys) {
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      newObj[key] = obj[key] || 0;
    }

    return newObj;
  }

  static omit(obj, keys) {
    const newObj = Object.assign({}, obj);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      delete newObj[key];
    }

    return newObj;
  }

  static setWasm(wasmGlobals, obj, keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]; // eslint-disable-next-line no-param-reassign

      wasmGlobals[key].value = obj[key];
    }
  }

  static pickWasm(wasmGlobals, keys) {
    const newObj = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      newObj[key] = wasmGlobals[key].value;
    }

    return newObj;
  }

}

/***/ }),

/***/ "./src/visualizer.js":
/*!***************************!*\
  !*** ./src/visualizer.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Visualizer; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var eel_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eel-wasm */ "./node_modules/eel-wasm/dist/src/index.js");
/* harmony import */ var eel_wasm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eel_wasm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assemblyscript_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @assemblyscript/loader */ "./node_modules/@assemblyscript/loader/index.js");
/* harmony import */ var _audio_audioProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio/audioProcessor */ "./src/audio/audioProcessor.js");
/* harmony import */ var _rendering_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rendering/renderer */ "./src/rendering/renderer.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _assemblyscript_presetFunctions_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assemblyscript/presetFunctions.ts */ "./src/assemblyscript/presetFunctions.ts");
/* harmony import */ var _assemblyscript_presetFunctions_ts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assemblyscript_presetFunctions_ts__WEBPACK_IMPORTED_MODULE_6__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







class Visualizer {
  constructor(audioContext, canvas, opts) {
    this.opts = opts;
    this.audio = new _audio_audioProcessor__WEBPACK_IMPORTED_MODULE_3__["default"](audioContext);
    const vizWidth = opts.width || 1200;
    const vizHeight = opts.height || 900;
    this.internalCanvas = document.createElement("canvas");
    this.internalCanvas.width = vizWidth;
    this.internalCanvas.height = vizHeight;
    this.gl = this.internalCanvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false
    });
    this.outputGl = canvas.getContext('2d');
    this.baseValsDefaults = {
      decay: 0.98,
      gammaadj: 2,
      echo_zoom: 2,
      echo_alpha: 0,
      echo_orient: 0,
      red_blue: 0,
      brighten: 0,
      darken: 0,
      wrap: 1,
      darken_center: 0,
      solarize: 0,
      invert: 0,
      bmotionvectorson: 1,
      fshader: 0,
      b1n: 0,
      b2n: 0,
      b3n: 0,
      b1x: 1,
      b2x: 1,
      b3x: 1,
      b1ed: 0.25,
      wave_mode: 0,
      additivewave: 0,
      wave_dots: 0,
      wave_thick: 0,
      wave_a: 0.8,
      wave_scale: 1,
      wave_smoothing: 0.75,
      wave_mystery: 0,
      modwavealphabyvolume: 0,
      modwavealphastart: 0.75,
      modwavealphaend: 0.95,
      wave_r: 1,
      wave_g: 1,
      wave_b: 1,
      wave_x: 0.5,
      wave_y: 0.5,
      wave_brighten: 1,
      mv_x: 12,
      mv_y: 9,
      mv_dx: 0,
      mv_dy: 0,
      mv_l: 0.9,
      mv_r: 1,
      mv_g: 1,
      mv_b: 1,
      mv_a: 1,
      warpanimspeed: 1,
      warpscale: 1,
      zoomexp: 1,
      zoom: 1,
      rot: 0,
      cx: 0.5,
      cy: 0.5,
      dx: 0,
      dy: 0,
      warp: 1,
      sx: 1,
      sy: 1,
      ob_size: 0.01,
      ob_r: 0,
      ob_g: 0,
      ob_b: 0,
      ob_a: 0,
      ib_size: 0.01,
      ib_r: 0.25,
      ib_g: 0.25,
      ib_b: 0.25,
      ib_a: 0
    };
    this.shapeBaseValsDefaults = {
      enabled: 0,
      sides: 4,
      additive: 0,
      thickoutline: 0,
      textured: 0,
      num_inst: 1,
      tex_zoom: 1,
      tex_ang: 0,
      x: 0.5,
      y: 0.5,
      rad: 0.1,
      ang: 0,
      r: 1,
      g: 0,
      b: 0,
      a: 1,
      r2: 0,
      g2: 1,
      b2: 0,
      a2: 0,
      border_r: 1,
      border_g: 1,
      border_b: 1,
      border_a: 0.1
    };
    this.waveBaseValsDefaults = {
      enabled: 0,
      samples: 512,
      sep: 0,
      scaling: 1,
      smoothing: 0.5,
      r: 1,
      g: 1,
      b: 1,
      a: 1,
      spectrum: 0,
      usedots: 0,
      thick: 0,
      additive: 0
    };
    this.qs = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].range(1, 33).map(x => `q${x}`);
    this.ts = _utils__WEBPACK_IMPORTED_MODULE_5__["default"].range(1, 9).map(x => `t${x}`);
    this.globalPerFrameVars = ["old_wave_mode", // globals
    "frame", "time", "fps", "bass", "bass_att", "mid", "mid_att", "treb", "treb_att", "meshx", "meshy", "aspectx", "aspecty", "pixelsx", "pixelsy", "rand_start", "rand_preset"];
    this.globalPerPixelVars = [// globals
    "frame", "time", "fps", "bass", "bass_att", "mid", "mid_att", "treb", "treb_att", "meshx", "meshy", "aspectx", "aspecty", "pixelsx", "pixelsy", "rand_start", "rand_preset", // for pixel eqs
    "x", "y", "rad", "ang"];
    this.globalShapeVars = [// globals
    "frame", "time", "fps", "bass", "bass_att", "mid", "mid_att", "treb", "treb_att", "meshx", "meshy", "aspectx", "aspecty", "pixelsx", "pixelsy", "rand_start", "rand_preset", // for shape eqs
    "instance"];
    this.shapeBaseVars = ["x", "y", "rad", "ang", "r", "g", "b", "a", "r2", "g2", "b2", "a2", "border_r", "border_g", "border_b", "border_a", "thickoutline", "textured", "tex_zoom", "tex_ang", "additive"];
    this.globalWaveVars = [// globals
    "frame", "time", "fps", "bass", "bass_att", "mid", "mid_att", "treb", "treb_att", "meshx", "meshy", "aspectx", "aspecty", "pixelsx", "pixelsy", "rand_start", "rand_preset", // for wave eqs
    "x", "y", "sample", "value1", "value2"];
    this.renderer = new _rendering_renderer__WEBPACK_IMPORTED_MODULE_4__["default"](this.gl, this.audio, opts);
  }

  loseGLContext() {
    this.gl.getExtension("WEBGL_lose_context").loseContext();
    this.outputGl = null;
  }

  connectAudio(audioNode) {
    this.audioNode = audioNode;
    this.audio.connectAudio(audioNode);
  }

  disconnectAudio(audioNode) {
    this.audio.disconnectAudio(audioNode);
  } // Override defaults, but only include variables in default map


  static overrideDefaultVars(baseValsDefaults, baseVals) {
    const combinedVals = {};
    Object.keys(baseValsDefaults).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(baseVals, key)) {
        combinedVals[key] = baseVals[key];
      } else {
        combinedVals[key] = baseValsDefaults[key];
      }
    });
    return combinedVals;
  }

  createQVars() {
    const wasmVars = {};
    this.qs.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  createTVars() {
    const wasmVars = {};
    this.ts.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  createPerFramePool(baseVals) {
    const wasmVars = {};
    Object.keys(this.baseValsDefaults).forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, baseVals[key]);
    });
    this.globalPerFrameVars.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  createPerPixelPool(baseVals) {
    const wasmVars = {};
    Object.keys(this.baseValsDefaults).forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, baseVals[key]);
    });
    this.globalPerPixelVars.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  createCustomShapePerFramePool(baseVals) {
    const wasmVars = {};
    Object.keys(this.shapeBaseValsDefaults).forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, baseVals[key]);
    });
    this.globalShapeVars.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  createCustomWavePerFramePool(baseVals) {
    const wasmVars = {};
    Object.keys(this.waveBaseValsDefaults).forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, baseVals[key]);
    });
    this.globalWaveVars.forEach(key => {
      wasmVars[key] = new WebAssembly.Global({
        value: "f64",
        mutable: true
      }, 0);
    });
    return wasmVars;
  }

  static makeShapeResetPool(pool, variables, idx) {
    return variables.reduce((acc, variable) => {
      return _objectSpread(_objectSpread({}, acc), {}, {
        [`${variable}_${idx}`]: pool[variable]
      });
    }, {});
  }

  static base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }

  async loadPreset(presetMap, blendTime = 0) {
    const preset = JSON.parse(JSON.stringify(presetMap));
    preset.baseVals = Visualizer.overrideDefaultVars(this.baseValsDefaults, preset.baseVals);

    for (let i = 0; i < preset.shapes.length; i++) {
      preset.shapes[i].baseVals = Visualizer.overrideDefaultVars(this.shapeBaseValsDefaults, preset.shapes[i].baseVals);
    }

    for (let i = 0; i < preset.waves.length; i++) {
      preset.waves[i].baseVals = Visualizer.overrideDefaultVars(this.waveBaseValsDefaults, preset.waves[i].baseVals);
    }

    const forceJS = preset.useJS && !this.opts.onlyUseWASM;

    if (Object.prototype.hasOwnProperty.call(preset, "init_eqs_eel") && !forceJS) {
      preset.useWASM = true;
      await this.loadWASMPreset(preset, blendTime);
    } else if (!this.opts.onlyUseWASM) {
      if (Object.prototype.hasOwnProperty.call(preset, "init_eqs_str")) {
        this.loadJSPreset(preset, blendTime);
      } else {
        console.warn("Tried to load a JS preset that doesn't have converted strings");
      }
    } else {
      console.warn("Tried to load a preset that doesn't support WASM with onlyUseWASM on");
    }
  }

  async loadWASMPreset(preset, blendTime) {
    const qWasmVars = this.createQVars();
    const tWasmVars = this.createTVars();
    const wasmVarPools = {
      perFrame: _objectSpread(_objectSpread({}, qWasmVars), this.createPerFramePool(preset.baseVals)),
      perVertex: _objectSpread(_objectSpread({}, qWasmVars), this.createPerPixelPool(preset.baseVals))
    };
    const wasmFunctions = {
      presetInit: {
        pool: "perFrame",
        code: preset.init_eqs_eel
      },
      perFrame: {
        pool: "perFrame",
        code: preset.frame_eqs_eel
      }
    };

    if (preset.pixel_eqs_eel !== "") {
      wasmFunctions.perPixel = {
        pool: "perVertex",
        code: preset.pixel_eqs_eel
      };
    }

    for (let i = 0; i < preset.shapes.length; i++) {
      wasmVarPools[`shapePerFrame${i}`] = _objectSpread(_objectSpread(_objectSpread({}, qWasmVars), tWasmVars), this.createCustomShapePerFramePool(preset.shapes[i].baseVals));

      if (preset.shapes[i].baseVals.enabled !== 0) {
        wasmFunctions[`shapes_${i}_init_eqs`] = {
          pool: `shapePerFrame${i}`,
          code: preset.shapes[i].init_eqs_eel
        };
        wasmFunctions[`shapes_${i}_frame_eqs`] = {
          pool: `shapePerFrame${i}`,
          code: preset.shapes[i].frame_eqs_eel
        };
      }
    }

    for (let i = 0; i < preset.waves.length; i++) {
      if (preset.waves[i].baseVals.enabled !== 0) {
        wasmVarPools[`wavePerFrame${i}`] = _objectSpread(_objectSpread(_objectSpread({}, qWasmVars), tWasmVars), this.createCustomWavePerFramePool(preset.waves[i].baseVals));
        wasmFunctions[`waves_${i}_init_eqs`] = {
          pool: `wavePerFrame${i}`,
          code: preset.waves[i].init_eqs_eel
        };
        wasmFunctions[`waves_${i}_frame_eqs`] = {
          pool: `wavePerFrame${i}`,
          code: preset.waves[i].frame_eqs_eel
        };

        if (preset.waves[i].point_eqs_eel && preset.waves[i].point_eqs_eel !== "") {
          wasmFunctions[`waves_${i}_point_eqs`] = {
            pool: `wavePerFrame${i}`,
            code: preset.waves[i].point_eqs_eel
          };
        }
      }
    }

    const mod = await Object(eel_wasm__WEBPACK_IMPORTED_MODULE_1__["loadModule"])({
      pools: wasmVarPools,
      functions: wasmFunctions,
      eelVersion: preset.version || 2
    }); // eel-wasm returns null if the function was empty

    const handleEmptyFunction = f => {
      return f ? f : () => {};
    };

    const presetFunctionsMod = await _assemblyscript_loader__WEBPACK_IMPORTED_MODULE_2__["default"].instantiate(Visualizer.base64ToArrayBuffer(_assemblyscript_presetFunctions_ts__WEBPACK_IMPORTED_MODULE_6___default()()), {
      pixelEqs: {
        perPixelEqs: handleEmptyFunction(mod.exports.perPixel)
      },
      // For resetting pixel eq vars
      pixelVarPool: {
        warp: wasmVarPools.perVertex.warp,
        zoom: wasmVarPools.perVertex.zoom,
        zoomexp: wasmVarPools.perVertex.zoomexp,
        cx: wasmVarPools.perVertex.cx,
        cy: wasmVarPools.perVertex.cy,
        sx: wasmVarPools.perVertex.sx,
        sy: wasmVarPools.perVertex.sy,
        dx: wasmVarPools.perVertex.dx,
        dy: wasmVarPools.perVertex.dy,
        rot: wasmVarPools.perVertex.rot,
        x: wasmVarPools.perVertex.x,
        y: wasmVarPools.perVertex.y,
        ang: wasmVarPools.perVertex.ang,
        rad: wasmVarPools.perVertex.rad
      },
      // For resetting qs/ts
      qVarPool: qWasmVars,
      tVarPool: tWasmVars,
      // For resetting shape vars
      shapePool0: Visualizer.makeShapeResetPool(wasmVarPools["shapePerFrame0"], this.shapeBaseVars, 0),
      shapePool1: Visualizer.makeShapeResetPool(wasmVarPools["shapePerFrame1"], this.shapeBaseVars, 1),
      shapePool2: Visualizer.makeShapeResetPool(wasmVarPools["shapePerFrame2"], this.shapeBaseVars, 2),
      shapePool3: Visualizer.makeShapeResetPool(wasmVarPools["shapePerFrame3"], this.shapeBaseVars, 3),
      console: {
        logi: value => {
          // eslint-disable-next-line no-console
          console.log("logi: " + value);
        },
        logf: value => {
          // eslint-disable-next-line no-console
          console.log("logf: " + value);
        }
      },
      env: {
        abort: () => {// No idea why we need this.
        }
      }
    });
    preset.globalPools = wasmVarPools;
    preset.init_eqs = handleEmptyFunction(mod.exports.presetInit);
    preset.frame_eqs = handleEmptyFunction(mod.exports.perFrame);
    preset.save_qs = presetFunctionsMod.exports.saveQs;
    preset.restore_qs = presetFunctionsMod.exports.restoreQs;
    preset.save_ts = presetFunctionsMod.exports.saveTs;
    preset.restore_ts = presetFunctionsMod.exports.restoreTs;

    if (mod.exports.perPixel) {
      preset.pixel_eqs = mod.exports.perPixel;
    }

    preset.pixel_eqs_initialize_array = (meshWidth, meshHeight) => {
      const arrPtr = presetFunctionsMod.exports.createFloat32Array((meshWidth + 1) * (meshHeight + 1) * 2);
      preset.pixel_eqs_array = arrPtr;
    };

    preset.pixel_eqs_get_array = () => {
      return presetFunctionsMod.exports.__getFloat32ArrayView(preset.pixel_eqs_array);
    };

    preset.pixel_eqs_wasm = (...args) => presetFunctionsMod.exports.runPixelEquations(preset.pixel_eqs_array, ...args);

    for (let i = 0; i < preset.shapes.length; i++) {
      if (preset.shapes[i].baseVals.enabled !== 0) {
        preset.shapes[i].init_eqs = handleEmptyFunction(mod.exports[`shapes_${i}_init_eqs`]); // Not wrapped because we check if null in customShapes

        preset.shapes[i].frame_eqs = mod.exports[`shapes_${i}_frame_eqs`];

        preset.shapes[i].frame_eqs_save = () => presetFunctionsMod.exports[`shape${i}_save`]();

        preset.shapes[i].frame_eqs_restore = () => presetFunctionsMod.exports[`shape${i}_restore`]();
      }
    }

    for (let i = 0; i < preset.waves.length; i++) {
      if (preset.waves[i].baseVals.enabled !== 0) {
        const wave = {
          init_eqs: handleEmptyFunction(mod.exports[`waves_${i}_init_eqs`]),
          frame_eqs: handleEmptyFunction(mod.exports[`waves_${i}_frame_eqs`])
        };

        if (preset.waves[i].point_eqs_eel && preset.waves[i].point_eqs_eel !== "") {
          // Not wrapped because we check if null in customWaves
          wave.point_eqs = mod.exports[`waves_${i}_point_eqs`];
        } else {
          wave.point_eqs = "";
        }

        preset.waves[i] = Object.assign({}, preset.waves[i], wave);
      }
    }

    this.renderer.loadPreset(preset, blendTime);
  }

  loadJSPreset(preset, blendTime) {
    // If init_eqs is already a function, it means we've already prepared the preset to run
    if (typeof preset.init_eqs !== "function") {
      /* eslint-disable no-param-reassign, no-new-func */
      preset.init_eqs = new Function("a", `${preset.init_eqs_str} return a;`);
      preset.frame_eqs = new Function("a", `${preset.frame_eqs_str} return a;`);

      if (preset.pixel_eqs_str && preset.pixel_eqs_str !== "") {
        preset.pixel_eqs = new Function("a", `${preset.pixel_eqs_str} return a;`);
      } else {
        preset.pixel_eqs = "";
      }

      for (let i = 0; i < preset.shapes.length; i++) {
        if (preset.shapes[i].baseVals.enabled !== 0) {
          preset.shapes[i] = Object.assign({}, preset.shapes[i], {
            init_eqs: new Function("a", `${preset.shapes[i].init_eqs_str} return a;`),
            frame_eqs: new Function("a", `${preset.shapes[i].frame_eqs_str} return a;`)
          });
        }
      }

      for (let i = 0; i < preset.waves.length; i++) {
        if (preset.waves[i].baseVals.enabled !== 0) {
          const wave = {
            init_eqs: new Function("a", `${preset.waves[i].init_eqs_str} return a;`),
            frame_eqs: new Function("a", `${preset.waves[i].frame_eqs_str} return a;`)
          };

          if (preset.waves[i].point_eqs_str && preset.waves[i].point_eqs_str !== "") {
            wave.point_eqs = new Function("a", `${preset.waves[i].point_eqs_str} return a;`);
          } else {
            wave.point_eqs = "";
          }

          preset.waves[i] = Object.assign({}, preset.waves[i], wave);
        }
      }
      /* eslint-enable no-param-reassign, no-new-func */

    }

    this.renderer.loadPreset(preset, blendTime);
  }

  loadExtraImages(imageData) {
    this.renderer.loadExtraImages(imageData);
  }

  setRendererSize(width, height, opts = {}) {
    this.internalCanvas.width = width;
    this.internalCanvas.height = height;
    this.renderer.setRendererSize(width, height, opts);
  }

  setInternalMeshSize(width, height) {
    this.renderer.setInternalMeshSize(width, height);
  }

  setOutputAA(useAA) {
    this.renderer.setOutputAA(useAA);
  }

  setCanvas(canvas) {
    this.outputGl = canvas.getContext('2d');
  }

  render(opts) {
    const renderOutput = this.renderer.render(opts);

    if (this.outputGl) {
      this.outputGl.drawImage(this.internalCanvas, 0, 0);
    }

    return renderOutput;
  }

  launchSongTitleAnim(text) {
    this.renderer.launchSongTitleAnim(text);
  }

  toDataURL() {
    return this.renderer.toDataURL();
  }

  warpBufferToDataURL() {
    return this.renderer.warpBufferToDataURL();
  }

}

/***/ })

/******/ });
});
//# sourceMappingURL=butterchurn.js.map