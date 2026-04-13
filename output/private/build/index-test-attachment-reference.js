"use strict";

var _dingtalkDocsCoolApp = require("dingtalk-docs-cool-app");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var t = _dingtalkDocsCoolApp.fieldDecoratorKit.t;
_dingtalkDocsCoolApp.fieldDecoratorKit.setDomainList(['alidocs.dingtalk.com']);
_dingtalkDocsCoolApp.fieldDecoratorKit.setDecorator({
  name: '测试附件字段引用',
  i18nMap: {
    'zh-CN': {
      'promptLabel': '请输入指令或引用附件字段',
      'promptPlaceholder': '尝试输入 @ 符号，看是否能引用附件字段'
    }
  },
  formItems: [{
    key: 'aiInstruction',
    label: t('promptLabel'),
    component: _dingtalkDocsCoolApp.FormItemComponent.Textarea,
    props: {
      placeholder: t('promptPlaceholder'),
      enableFieldReference: true
    },
    validator: {
      required: true
    }
  }],
  resultType: {
    type: _dingtalkDocsCoolApp.FieldType.Text
  },
  execute: function () {
    var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(context, formData) {
      var aiInstruction, resultText, parsed;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            aiInstruction = formData.aiInstruction;
            console.log('=== 测试附件字段引用 ===');
            console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
            console.log('');
            console.log('=== aiInstruction 详细分析 ===');
            console.log('类型:', _typeof(aiInstruction));
            console.log('是否为数组:', Array.isArray(aiInstruction));
            console.log('原始内容:', aiInstruction);
            console.log('JSON 格式:', JSON.stringify(aiInstruction, null, 2));
            console.log('字符串长度:', typeof aiInstruction === 'string' ? aiInstruction.length : 'N/A');
            console.log('');
            resultText = '';
            try {
              parsed = JSON.parse(aiInstruction);
              console.log('✅ 成功解析为 JSON');
              console.log('解析后的类型:', _typeof(parsed));
              console.log('是否为数组:', Array.isArray(parsed));
              console.log('解析后的内容:', JSON.stringify(parsed, null, 2));
              if (Array.isArray(parsed)) {
                console.log("\u6570\u7EC4\u957F\u5EA6: ".concat(parsed.length));
                parsed.forEach(function (item, index) {
                  console.log("\u6570\u7EC4\u9879 ".concat(index, ":"), JSON.stringify(item, null, 2));
                  if (item.tmp_url) {
                    console.log("  \u2705 \u627E\u5230 tmp_url: ".concat(item.tmp_url.substring(0, 100), "..."));
                  }
                });
                resultText = "\u2705 \u6210\u529F\u89E3\u6790\u4E3A\u9644\u4EF6\u6570\u7EC4\uFF01\n\u5171 ".concat(parsed.length, " \u4E2A\u9644\u4EF6\n\n");
                parsed.forEach(function (item, index) {
                  resultText += "\u9644\u4EF6 ".concat(index + 1, ":\n");
                  resultText += "  - \u6587\u4EF6\u540D: ".concat(item.name || 'N/A', "\n");
                  resultText += "  - \u7C7B\u578B: ".concat(item.type || 'N/A', "\n");
                  resultText += "  - \u5927\u5C0F: ".concat(item.size || 'N/A', " bytes\n");
                  resultText += "  - tmp_url: ".concat(item.tmp_url ? '✅ 存在' : '❌ 不存在', "\n");
                  if (item.tmp_url) {
                    resultText += "  - URL \u957F\u5EA6: ".concat(item.tmp_url.length, " \u5B57\u7B26\n");
                  }
                  resultText += '\n';
                });
              } else if (_typeof(parsed) === 'object' && parsed !== null) {
                console.log('解析为单个对象');
                if (parsed.tmp_url) {
                  console.log("  \u2705 \u627E\u5230 tmp_url: ".concat(parsed.tmp_url.substring(0, 100), "..."));
                }
                resultText = "\u2705 \u6210\u529F\u89E3\u6790\u4E3A\u5355\u4E2A\u9644\u4EF6\u5BF9\u8C61\uFF01\n\n";
                resultText += "\u6587\u4EF6\u540D: ".concat(parsed.name || 'N/A', "\n");
                resultText += "\u7C7B\u578B: ".concat(parsed.type || 'N/A', "\n");
                resultText += "\u5927\u5C0F: ".concat(parsed.size || 'N/A', " bytes\n");
                resultText += "tmp_url: ".concat(parsed.tmp_url ? '✅ 存在' : '❌ 不存在', "\n");
                if (parsed.tmp_url) {
                  resultText += "URL \u957F\u5EA6: ".concat(parsed.tmp_url.length, " \u5B57\u7B26\n");
                }
              } else {
                resultText = "\u26A0\uFE0F \u89E3\u6790\u4E3A JSON\uFF0C\u4F46\u4E0D\u662F\u9644\u4EF6\u683C\u5F0F\n\u7C7B\u578B: ".concat(_typeof(parsed), "\n\u5185\u5BB9: ").concat(JSON.stringify(parsed));
              }
            } catch (e) {
              console.log('❌ 无法解析为 JSON，可能是普通文本');
              console.log('错误信息:', String(e));
              resultText = "\u274C \u4E0D\u662F\u9644\u4EF6\u5F15\u7528\uFF08\u65E0\u6CD5\u89E3\u6790\u4E3A JSON\uFF09\n\n";
              resultText += "\u63A5\u6536\u5230\u7684\u539F\u59CB\u6587\u672C:\n".concat(aiInstruction, "\n\n");
              resultText += "\u8FD9\u53EF\u80FD\u662F\uFF1A\n";
              resultText += "1. \u666E\u901A\u6587\u672C\u8F93\u5165\n";
              resultText += "2. \u5F15\u7528\u4E86\u6587\u672C\u5B57\u6BB5\uFF08\u5982\u6807\u9898\uFF09\n";
              resultText += "3. \u9644\u4EF6\u5B57\u6BB5\u5F15\u7528\u529F\u80FD\u4E0D\u53EF\u7528\n";
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Success,
              data: resultText
            });
        }
      }, _callee);
    }));
    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }
    return execute;
  }()
});