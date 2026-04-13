"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dingtalkDocsCoolApp = require("dingtalk-docs-cool-app");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var t = _dingtalkDocsCoolApp.fieldDecoratorKit.t;
_dingtalkDocsCoolApp.fieldDecoratorKit.setDomainList(['dingding-faas.surfin.sg', 'ai-table-oss.oss-cn-beijing.aliyuncs.com']);
_dingtalkDocsCoolApp.fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令',
      'aspect_ratio': '宽高比例',
      'resolution': '倍率',
      'temperature': '温度',
      'api_key': 'API 密钥'
    }
  },
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
      placeholder: '例如：用logo作为中心图形的一部分，提升品牌识别度。\n\n如有参考图，请严格参考原图的logo、产品外观、禁止瞎编生成。如无参考图，则不在图中生成logo或logo占位符\n\n提示：可以使用 @ 符号引用其他文本字段（如图片描述、标题等）',
      enableFieldReference: true
    },
    validator: {
      required: true
    }
  }, {
    key: 'aspectRatio',
    label: t('aspect_ratio'),
    component: _dingtalkDocsCoolApp.FormItemComponent.SingleSelect,
    props: {
      options: [{
        key: '1:1',
        title: '1:1'
      }, {
        key: '16:9',
        title: '16:9'
      }, {
        key: '9:16',
        title: '9:16'
      }, {
        key: '4:5',
        title: '4:5'
      }, {
        key: '5:4',
        title: '5:4'
      }]
    },
    validator: {
      required: true
    }
  }, {
    key: 'resolution',
    label: t('resolution'),
    component: _dingtalkDocsCoolApp.FormItemComponent.SingleSelect,
    props: {
      options: [{
        key: '2K',
        title: '2K'
      }, {
        key: '4K',
        title: '4K'
      }]
    },
    validator: {
      required: true
    }
  }, {
    key: 'temperature',
    label: t('temperature'),
    component: _dingtalkDocsCoolApp.FormItemComponent.SingleSelect,
    props: {
      options: [{
        key: '0.1',
        title: '0.1'
      }, {
        key: '0.2',
        title: '0.2'
      }, {
        key: '0.3',
        title: '0.3'
      }, {
        key: '0.4',
        title: '0.4'
      }, {
        key: '0.5',
        title: '0.5'
      }, {
        key: '0.6',
        title: '0.6'
      }, {
        key: '0.7',
        title: '0.7'
      }, {
        key: '0.8',
        title: '0.8'
      }, {
        key: '0.9',
        title: '0.9'
      }, {
        key: '1.0',
        title: '1.0'
      }, {
        key: '1.1',
        title: '1.1'
      }, {
        key: '1.2',
        title: '1.2'
      }, {
        key: '1.3',
        title: '1.3'
      }, {
        key: '1.4',
        title: '1.4'
      }, {
        key: '1.5',
        title: '1.5'
      }, {
        key: '1.6',
        title: '1.6'
      }, {
        key: '1.7',
        title: '1.7'
      }, {
        key: '1.8',
        title: '1.8'
      }, {
        key: '1.9',
        title: '1.9'
      }, {
        key: '2.0',
        title: '2.0'
      }]
    },
    validator: {
      required: true
    }
  }, {
    key: 'apiKey',
    label: t('api_key'),
    component: _dingtalkDocsCoolApp.FormItemComponent.Textarea,
    props: {
      placeholder: '请输入 API 密钥'
    },
    validator: {
      required: true
    }
  }],
  resultType: {
    type: _dingtalkDocsCoolApp.FieldType.Attachment
  },
  execute: function () {
    var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(context, formData) {
      var refImage, aiInstruction, aspectRatio, resolution, temperature, apiKey, imageUrls, i, field, j, attachment, requestBody, _responseData$data, response, responseData, errorMessage, errors, _responseData$detail, error, _responseData$detail2, _error, errorCode, _responseData$detail3, _errorMessage, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            refImage = formData.refImage, aiInstruction = formData.aiInstruction, aspectRatio = formData.aspectRatio, resolution = formData.resolution, temperature = formData.temperature, apiKey = formData.apiKey;
            console.log('=== 开始执行 AI 图片生成 ===');
            console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
            console.log('');
            imageUrls = [];
            console.log('=== 收集图片 URL ===');
            for (i = 0; i < refImage.length; i++) {
              field = refImage[i];
              console.log("\u5B57\u6BB5 ".concat(i, ":"), field);
              if (field && field.length > 0) {
                for (j = 0; j < field.length; j++) {
                  attachment = field[j];
                  console.log("  \u9644\u4EF6 ".concat(j, ":"), attachment);
                  if (attachment.tmp_url) {
                    imageUrls.push(attachment.tmp_url);
                    console.log("    \u2705 \u6DFB\u52A0 tmp_url: ".concat(attachment.tmp_url.substring(0, 100), "..."));
                  }
                }
              }
            }
            console.log('');
            console.log("\u5171\u6536\u96C6\u5230 ".concat(imageUrls.length, " \u4E2A\u56FE\u7247 URL"));
            console.log('');
            console.log('AI 指令:', aiInstruction);
            console.log('宽高比例:', aspectRatio);
            console.log('倍率:', resolution);
            console.log('温度:', temperature);
            console.log('API 密钥:', apiKey ? "".concat(apiKey.substring(0, 10), "...") : '未提供');
            console.log('');
            if (!(imageUrls.length === 0)) {
              _context.n = 1;
              break;
            }
            console.log('❌ 没有找到任何图片 URL');
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: '未找到参考图片，请确保选择的字段中包含图片附件'
            });
          case 1:
            requestBody = {
              image_urls: imageUrls,
              prompt: aiInstruction,
              aspect_ratio: aspectRatio,
              resolution: resolution,
              temperature: parseFloat(temperature)
            };
            console.log('=== 调用 Python 服务 ===');
            console.log('请求 URL: https://dingding-faas.surfin.sg/api/v1/generate-image');
            console.log('请求体:', JSON.stringify(requestBody, null, 2));
            console.log('');
            _context.p = 2;
            _context.n = 3;
            return context.fetch('https://dingding-faas.surfin.sg/api/v1/generate-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
              },
              body: JSON.stringify(requestBody)
            });
          case 3:
            response = _context.v;
            console.log('响应状态码:', response.status);
            _context.n = 4;
            return response.json();
          case 4:
            responseData = _context.v;
            console.log('响应数据:', JSON.stringify(responseData, null, 2));
            console.log('');
            if (!(response.status === 200 && responseData.success && (_responseData$data = responseData.data) !== null && _responseData$data !== void 0 && _responseData$data.new_image_url)) {
              _context.n = 5;
              break;
            }
            console.log('✅ 图片生成成功！');
            console.log('新图片 URL:', responseData.data.new_image_url);
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Success,
              data: [{
                fileName: "generated-".concat(Date.now(), ".png"),
                type: 'image/png',
                url: responseData.data.new_image_url
              }]
            });
          case 5:
            console.log('❌ 服务返回失败');
            errorMessage = '图片生成失败';
            if (!(response.status === 422)) {
              _context.n = 6;
              break;
            }
            console.log('参数验证错误 (422)');
            if (responseData.detail && Array.isArray(responseData.detail)) {
              errors = responseData.detail.map(function (err) {
                var field = err.loc ? err.loc.join('.') : 'unknown';
                return "".concat(field, ": ").concat(err.msg);
              }).join('; ');
              errorMessage = "\u53C2\u6570\u9A8C\u8BC1\u5931\u8D25: ".concat(errors);
            } else {
              errorMessage = '参数验证失败，请检查输入参数';
            }
            _context.n = 16;
            break;
          case 6:
            if (!(response.status === 400)) {
              _context.n = 7;
              break;
            }
            console.log('客户端错误 (400)');
            if ((_responseData$detail = responseData.detail) !== null && _responseData$detail !== void 0 && _responseData$detail.error) {
              error = responseData.detail.error;
              errorMessage = error.message || '请求参数错误';
              if (error.code === 'IMAGE_DOWNLOAD_ERROR') {
                errorMessage = "\u53C2\u8003\u56FE\u7247\u4E0B\u8F7D\u5931\u8D25: ".concat(error.message);
              }
            } else {
              errorMessage = '请求参数错误';
            }
            _context.n = 16;
            break;
          case 7:
            if (!(response.status === 500)) {
              _context.n = 15;
              break;
            }
            console.log('服务器错误 (500)');
            if (!((_responseData$detail2 = responseData.detail) !== null && _responseData$detail2 !== void 0 && _responseData$detail2.error)) {
              _context.n = 13;
              break;
            }
            _error = responseData.detail.error;
            errorCode = _error.code || 'UNKNOWN_ERROR';
            _t = errorCode;
            _context.n = _t === 'GEMINI_API_ERROR' ? 8 : _t === 'OSS_UPLOAD_ERROR' ? 9 : _t === 'INTERNAL_SERVER_ERROR' ? 10 : 11;
            break;
          case 8:
            errorMessage = 'AI 图片生成服务异常，请稍后重试';
            return _context.a(3, 12);
          case 9:
            errorMessage = '图片上传失败，请稍后重试';
            return _context.a(3, 12);
          case 10:
            errorMessage = '服务器内部错误，请稍后重试';
            return _context.a(3, 12);
          case 11:
            errorMessage = _error.message || '服务器处理失败';
          case 12:
            console.log("\u9519\u8BEF\u4EE3\u7801: ".concat(errorCode));
            console.log("\u9519\u8BEF\u4FE1\u606F: ".concat(_error.message));
            _context.n = 14;
            break;
          case 13:
            errorMessage = '服务器内部错误，请稍后重试';
          case 14:
            _context.n = 16;
            break;
          case 15:
            errorMessage = responseData.message || ((_responseData$detail3 = responseData.detail) === null || _responseData$detail3 === void 0 || (_responseData$detail3 = _responseData$detail3.error) === null || _responseData$detail3 === void 0 ? void 0 : _responseData$detail3.message) || "\u670D\u52A1\u8FD4\u56DE\u9519\u8BEF (HTTP ".concat(response.status, ")");
          case 16:
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: errorMessage,
              extra: responseData
            });
          case 17:
            _context.p = 17;
            _t2 = _context.v;
            console.log('❌ 请求异常:', _t2);
            _errorMessage = '调用图片生成服务失败';
            if (_t2 instanceof Error) {
              if (_t2.message.includes('timeout') || _t2.message.includes('ETIMEDOUT')) {
                _errorMessage = '请求超时，图片生成可能需要较长时间，请稍后重试';
              } else if (_t2.message.includes('network') || _t2.message.includes('ECONNREFUSED')) {
                _errorMessage = '网络连接失败，请检查网络或稍后重试';
              } else {
                _errorMessage = "\u8BF7\u6C42\u5931\u8D25: ".concat(_t2.message);
              }
            }
            return _context.a(2, {
              code: _dingtalkDocsCoolApp.FieldExecuteCode.Error,
              errorMessage: _errorMessage,
              extra: {
                error: String(_t2)
              }
            });
        }
      }, _callee, null, [[2, 17]]);
    }));
    function execute(_x, _x2) {
      return _execute.apply(this, arguments);
    }
    return execute;
  }()
});
var _default = exports["default"] = _dingtalkDocsCoolApp.fieldDecoratorKit;