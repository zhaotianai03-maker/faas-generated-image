"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dingtalkDocsCoolApp = require("dingtalk-docs-cool-app");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var t = _dingtalkDocsCoolApp.fieldDecoratorKit.t;

// 通过addDomainList添加请求接口的域名
_dingtalkDocsCoolApp.fieldDecoratorKit.setDomainList(['dingding-faas.surfin.sg', 'ai-table-oss.oss-cn-beijing.aliyuncs.com']);
_dingtalkDocsCoolApp.fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  // 定义捷径的i18n语言资源
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令'
    }
  },
  // 定义捷径的入参
  formItems: [{
    key: 'refImage',
    label: t('ref_image'),
    component: _dingtalkDocsCoolApp.FormItemComponent.FieldSelect,
    props: {
      mode: 'multiple',
      supportTypes: [_dingtalkDocsCoolApp.FieldType.Attachment]
    },
    validator: {
      required: true
    }
  }, {
    key: 'aiInstruction',
    label: t('ai_instruction'),
    component: _dingtalkDocsCoolApp.FormItemComponent.Textarea,
    props: {
      placeholder: '例如：用logo作为中心图形的一部分，提升品牌识别度。\n\n如有参考图，请严格参考原图的logo、产品外观、禁止瞎编生成。如无参考图，则不在图中生成logo或logo占位符',
      enableFieldReference: true
    },
    validator: {
      required: true
    }
  }],
  // 定义捷径的返回结果类型
  resultType: {
    type: _dingtalkDocsCoolApp.FieldType.Attachment
  },
  execute: function () {
    var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(context, formData) {
      var refImage, aiInstruction, imageUrls, i, field, j, attachment, promptText, requestBody, response, newImageUrl, _response$error, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            refImage = formData.refImage, aiInstruction = formData.aiInstruction;
            console.log('=== 开始执行 AI 图片生成 ===');
            console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
            console.log('');
            console.log('=== aiInstruction 详细信息 ===');
            console.log('类型:', _typeof(aiInstruction));
            console.log('是否为数组:', Array.isArray(aiInstruction));
            console.log('内容:', aiInstruction);
            console.log('JSON 格式:', JSON.stringify(aiInstruction, null, 2));
            console.log('');
            if (!(!refImage || refImage.length === 0)) {
              _context.n = 1;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              message: '请至少选择一个参考图片字段'
            });
          case 1:
            console.log("\u9009\u62E9\u7684\u5B57\u6BB5\u6570\u91CF: ".concat(refImage.length));
            console.log("\u6240\u6709\u53C2\u8003\u56FE\u7247\u5B8C\u6574\u4FE1\u606F:", JSON.stringify(refImage, null, 2));

            // 收集所有字段的所有图片的 tmp_url
            imageUrls = [];
            for (i = 0; i < refImage.length; i++) {
              field = refImage[i];
              if (field && field.length > 0) {
                console.log("\u5B57\u6BB5 ".concat(i + 1, " \u5305\u542B ").concat(field.length, " \u5F20\u56FE\u7247"));
                for (j = 0; j < field.length; j++) {
                  attachment = field[j];
                  if (attachment.tmp_url) {
                    imageUrls.push(attachment.tmp_url);
                    console.log("  - \u56FE\u7247 ".concat(j + 1, ": ").concat(attachment.name, ", tmp_url: ").concat(attachment.tmp_url));
                  } else {
                    console.warn("  - \u56FE\u7247 ".concat(j + 1, ": ").concat(attachment.name, ", tmp_url \u4E3A\u7A7A\uFF0C\u8DF3\u8FC7"));
                  }
                }
              } else {
                console.warn("\u5B57\u6BB5 ".concat(i + 1, " \u6CA1\u6709\u6709\u6548\u7684\u56FE\u7247"));
              }
            }
            if (!(imageUrls.length === 0)) {
              _context.n = 2;
              break;
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              message: '无法获取图片的临时下载链接（tmp_url 为空）。请确保选择的是已上传的图片附件。'
            });
          case 2:
            console.log("=== \u6536\u96C6\u5B8C\u6210 ===");
            console.log("\u603B\u5171\u6536\u96C6\u5230 ".concat(imageUrls.length, " \u5F20\u6709\u6548\u56FE\u7247"));
            console.log("\u6240\u6709\u56FE\u7247 URLs:", imageUrls);
            _context.p = 3;
            console.log('正在调用 Python 代理服务生成图片...');

            // 将 aiInstruction 转换为字符串（如果它不是字符串的话）
            promptText = typeof aiInstruction === 'string' ? aiInstruction : JSON.stringify(aiInstruction);
            console.log('最终使用的 prompt:', promptText);

            // 构建请求体 - 始终发送 image_urls 数组
            requestBody = {
              image_urls: imageUrls,
              prompt: promptText
            };
            console.log('发送到代理服务的请求体:', JSON.stringify(requestBody, null, 2));
            console.log("  - image_urls \u6570\u91CF: ".concat(imageUrls.length));
            console.log("  - prompt: ".concat(aiInstruction));
            _context.n = 4;
            return context.fetch('https://dingding-faas.surfin.sg/api/v1/generate-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            }).then(function (res) {
              return res.json();
            });
          case 4:
            response = _context.v;
            console.log('代理服务完整响应:', JSON.stringify(response, null, 2));
            if (!response.success) {
              _context.n = 5;
              break;
            }
            newImageUrl = response.data.new_image_url;
            console.log("\u751F\u6210\u56FE\u7247\u6210\u529F: ".concat(newImageUrl));
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Success,
              data: [{
                fileName: "generated-".concat(Date.now(), ".png"),
                type: 'image/png',
                url: newImageUrl
              }]
            });
          case 5:
            console.error('代理服务返回错误:', response.error);
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              message: "\u751F\u6210\u5931\u8D25: ".concat(((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.message) || '未知错误')
            });
          case 6:
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            console.error('请求代理服务异常:', String(_t));
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              message: "\u751F\u6210\u5F02\u5E38: ".concat(String(_t))
            });
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[3, 7]]);
    }));
    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }
    return execute;
  }()
});
var _default = exports["default"] = _dingtalkDocsCoolApp.fieldDecoratorKit;