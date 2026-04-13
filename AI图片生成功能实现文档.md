# AI 图片生成功能实现文档

## 项目概述

本项目实现了一个钉钉 AI 表格的字段装饰器（Field Decorator），用于基于参考图片和 AI 指令生成新图片。该功能通过调用外部 Python 代理服务来完成图片生成任务。

## 技术架构

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  钉钉 AI 表格   │ ───> │  FaaS 函数       │ ───> │ Python 代理服务 │
│  (前端界面)     │      │  (Node.js 16.x)  │      │ (图片生成 API)  │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

### 组件说明

1. **钉钉 AI 表格**：提供用户界面，用户可以选择参考图片和输入 AI 指令
2. **FaaS 函数**：运行在钉钉云端的 Node.js 函数，负责数据处理和 API 调用
3. **Python 代理服务**：外部服务，负责实际的 AI 图片生成

## 核心实现

### 1. 域名白名单配置

```typescript
fieldDecoratorKit.setDomainList([
  'dingding-faas.surfin.sg',           // Python 代理服务域名
  'ai-table-oss.oss-cn-beijing.aliyuncs.com'  // OSS 存储域名
]);
```

**说明**：
- 钉钉 FaaS 环境要求所有外部请求的域名必须预先声明
- 只需要配置主域名，不需要协议和路径
- 支持子域名通配（配置 `example.com` 可访问 `*.example.com`）

### 2. 字段装饰器配置

#### 2.1 基本信息

```typescript
fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令',
    },
  },
  // ...
});
```

#### 2.2 表单配置项（formItems）

定义用户界面的输入组件：

```typescript
formItems: [
  {
    key: 'refImage',
    label: t('ref_image'),
    component: FormItemComponent.FieldSelect,  // 字段选择组件
    props: {
      mode: 'single',                          // 单选模式
      supportTypes: [FieldType.Attachment],    // 只支持附件字段
    },
    validator: {
      required: true,                          // 必填
    }
  },
  {
    key: 'aiInstruction',
    label: t('ai_instruction'),
    component: FormItemComponent.Textarea,     // 多行文本输入
    props: {
      placeholder: '例如：用或作为中心图形的一部分...',
      enableFieldReference: true,              // 支持引用其他字段
    },
    validator: {
      required: true,
    }
  }
]
```

**关键点**：
- `FieldSelect` 组件用于选择表格中的附件字段
- `supportTypes: [FieldType.Attachment]` 限制只能选择附件类型的字段
- `enableFieldReference: true` 允许在文本框中引用其他字段的值

#### 2.3 返回结果类型

```typescript
resultType: {
  type: FieldType.Attachment,  // 返回附件类型
}
```

### 3. 执行函数（execute）

#### 3.1 函数签名

```typescript
execute: async (
  context: Context,
  formData: {
    refImage: Array<{
      name: string;
      type: string;
      size: number;
      tmp_url: string;  // 临时下载链接
      url: string;
      thumbUrl: string;
      resourceId: string;
    }>;
    aiInstruction: string;
  }
) => Promise<ExecuteResult>
```

#### 3.2 参数验证

```typescript
// 1. 检查是否选择了参考图片
if (!refImage || refImage.length === 0) {
  return {
    code: FieldExecuteCode.Error,
    message: '请选择一张参考图片',
  };
}

// 2. 获取图片的临时下载链接
const imageUrl = refImage[0].tmp_url;

// 3. 验证 tmp_url 是否存在
if (!imageUrl) {
  return {
    code: FieldExecuteCode.Error,
    message: '无法获取图片的临时下载链接（tmp_url 为空）。请确保选择的是已上传的图片附件。',
  };
}
```

**重要提示**：
- 必须使用 `tmp_url` 字段，这是钉钉提供的带时效性的公开下载链接
- `url` 字段是相对路径，无法直接用于外部服务访问
- **只有钉钉原生的附件字段才会有 `tmp_url`**，自定义字段可能返回 `null`

#### 3.3 调用 Python 代理服务

```typescript
const requestBody = {
  image_url: imageUrl,      // 参考图片的临时下载链接
  prompt: aiInstruction     // AI 生成指令
};

const response = await context.fetch(
  'https://dingding-faas.surfin.sg/api/v1/generate-image',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  }
).then(res => res.json());
```

**API 规范**：

**请求**：
```json
{
  "image_url": "https://alidocs2-zjk-cdn.dingtalk.com/res/...",
  "prompt": "根据蓝色格子衫程序员，戴着蓝色框眼镜，旁边有一杯冒着热气的咖啡生成一张图片"
}
```

**成功响应**：
```json
{
  "success": true,
  "data": {
    "new_image_url": "https://ai-table-oss.oss-cn-beijing.aliyuncs.com/..."
  }
}
```

**失败响应**：
```json
{
  "success": false,
  "error": {
    "code": "IMAGE_DOWNLOAD_ERROR",
    "message": "Failed to download image..."
  }
}
```

#### 3.4 处理响应结果

```typescript
if (response.success) {
  const newImageUrl = response.data.new_image_url;
  
  return {
    code: FieldExecuteCode.Success,
    data: [{
      fileName: `generated-${Date.now()}.png`,  // 生成唯一文件名
      type: 'image/png',                        // 文件类型
      url: newImageUrl,                         // 生成的图片 URL
    }],
  };
} else {
  return {
    code: FieldExecuteCode.Error,
    message: `生成失败: ${response.error?.message || '未知错误'}`,
  };
}
```

**返回数据格式**：
- `fileName`: 附件名称
- `type`: MIME 类型
- `url`: 公开可访问的图片 URL（由 Python 服务返回）

#### 3.5 异常处理

```typescript
try {
  // ... 主要逻辑
} catch (e) {
  console.error('请求代理服务异常:', String(e));
  return {
    code: FieldExecuteCode.Error,
    message: `生成异常: ${String(e)}`,
  };
}
```

### 4. 日志记录

为了便于调试，代码中添加了详细的日志：

```typescript
console.log('=== 开始执行 AI 图片生成 ===');
console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
console.log('接收到的 AI 指令（已替换字段引用）:', aiInstruction);
console.log('参考图片完整信息:', JSON.stringify(refImage[0], null, 2));
console.log('tmp_url 值:', imageUrl);
console.log('发送到代理服务的请求体:', JSON.stringify(requestBody, null, 2));
console.log('代理服务完整响应:', JSON.stringify(response, null, 2));
```

## 关键问题与解决方案

### 问题 1：图片 URL 格式错误

**现象**：
```
Invalid URL '/core/api/resources/img/...': No scheme supplied
```

**原因**：
- 使用了 `refImage[0].url`，这是一个相对路径
- Python 服务需要完整的 HTTP/HTTPS URL

**解决方案**：
- 使用 `refImage[0].tmp_url` 代替 `url`
- `tmp_url` 是钉钉提供的完整 URL，格式如：
  ```
  https://alidocs2-zjk-cdn.dingtalk.com/res/...?Expires=...&OSSAccessKeyId=...
  ```

### 问题 2：tmp_url 为 null

**现象**：
```json
{
  "tmp_url": null,
  "url": "/core/api/resources/img/..."
}
```

**原因**：
- 选择的字段不是钉钉原生的附件字段
- 可能是自定义字段装饰器生成的附件

**解决方案**：
- 确保用户选择的是钉钉原生的附件字段
- 添加 `tmp_url` 为空的验证和错误提示
- 引导用户使用正确的字段类型

### 问题 3：域名白名单配置

**错误示例**：
```typescript
// ❌ 错误：包含协议
setDomainList(['https://example.com'])

// ❌ 错误：包含路径
setDomainList(['example.com/api'])

// ✅ 正确
setDomainList(['example.com'])
```

## 数据流程图

```
用户操作
  │
  ├─ 选择参考图片字段（必须是原生附件字段）
  │   └─ 获取 tmp_url（临时下载链接）
  │
  ├─ 输入 AI 指令（支持字段引用）
  │   └─ 钉钉自动替换字段引用为实际值
  │
  └─ 点击执行
      │
      ├─ FaaS 函数验证输入
      │   ├─ 检查 refImage 是否为空
      │   └─ 检查 tmp_url 是否存在
      │
      ├─ 调用 Python 代理服务
      │   ├─ POST /api/v1/generate-image
      │   ├─ 传递 image_url 和 prompt
      │   └─ 等待响应
      │
      ├─ 处理响应
      │   ├─ 成功：返回新图片 URL
      │   └─ 失败：返回错误信息
      │
      └─ 钉钉将结果写入目标字段
```

## 使用说明

### 前置条件

1. 钉钉 AI 表格中必须有：
   - 至少一个**原生附件字段**（用于选择参考图片）
   - 可选：文本字段（用于字段引用）

2. Python 代理服务必须：
   - 可公网访问
   - 域名已添加到白名单
   - 实现了 `/api/v1/generate-image` 接口

### 操作步骤

1. **创建字段**：在表格中添加一个使用 "AI图片生成" 装饰器的字段

2. **配置参数**：
   - 参考图片：选择包含原生附件的字段
   - AI 指令：输入生成指令，可以引用其他字段

3. **执行生成**：点击执行按钮，等待图片生成完成

4. **查看结果**：生成的图片会自动保存到当前字段

### 注意事项

1. **字段类型限制**：
   - 参考图片必须选择钉钉原生的附件字段
   - 自定义字段装饰器生成的附件可能无法使用

2. **网络要求**：
   - Python 代理服务必须能访问钉钉的 CDN（下载参考图片）
   - 生成的图片 URL 必须公开可访问

3. **性能考虑**：
   - FaaS 函数超时时间：15 分钟
   - 建议 Python 服务在 10 分钟内完成图片生成

4. **错误处理**：
   - 所有错误都会显示在钉钉界面上
   - 详细日志可在钉钉开发者控制台查看

## 完整代码

```typescript
import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

fieldDecoratorKit.setDomainList(['dingding-faas.surfin.sg', 'ai-table-oss.oss-cn-beijing.aliyuncs.com']);

fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令',
    },
  },
  formItems: [
    {
      key: 'refImage',
      label: t('ref_image'),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'single',
        supportTypes: [FieldType.Attachment],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'aiInstruction',
      label: t('ai_instruction'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '例如：用或作为中心图形的一部分，开标特品牌识别度。\n\n如有参考图，请格参考原图的logo、产品外观、禁止瞎测生成。如无参考图，则不在图中生成logo或logo占位符',
        enableFieldReference: true,
      },
      validator: {
        required: true,
      }
    }
  ],
  resultType: {
    type: FieldType.Attachment,
  },
  execute: async (context, formData: { refImage: { url: string, tmp_url: string, name: string, type: string }[], aiInstruction: string }) => {
    const { refImage, aiInstruction } = formData;
    
    console.log('=== 开始执行 AI 图片生成 ===');
    console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
    console.log('接收到的 AI 指令（已替换字段引用）:', aiInstruction);
    
    if (!refImage || refImage.length === 0) {
      return {
        code: FieldExecuteCode.Error,
        message: '请选择一张参考图片',
      };
    }

    console.log(`参考图片完整信息:`, JSON.stringify(refImage[0], null, 2));
    
    const imageUrl = refImage[0].tmp_url;
    console.log(`tmp_url 值: ${imageUrl}`);
    
    if (!imageUrl) {
      return {
        code: FieldExecuteCode.Error,
        message: '无法获取图片的临时下载链接（tmp_url 为空）。请确保选择的是已上传的图片附件。',
      };
    }

    try {
      console.log('正在调用 Python 代理服务生成图片...');
      
      const requestBody = {
        image_url: imageUrl,
        prompt: aiInstruction
      };
      
      console.log('发送到代理服务的请求体:', JSON.stringify(requestBody, null, 2));
      console.log('image_url 类型:', typeof imageUrl, '值:', imageUrl);
      console.log('prompt 类型:', typeof aiInstruction, '值:', aiInstruction);
      
      const response: any = await context.fetch('https://dingding-faas.surfin.sg/api/v1/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then(res => res.json());

      console.log('代理服务完整响应:', JSON.stringify(response, null, 2));

      if (response.success) {
        const newImageUrl = response.data.new_image_url;
        console.log(`生成图片成功: ${newImageUrl}`);
        
        return {
          code: FieldExecuteCode.Success,
          data: [{
            fileName: `generated-${Date.now()}.png`,
            type: 'image/png',
            url: newImageUrl,
          }],
        };
      } else {
        console.error('代理服务返回错误:', response.error);
        return {
          code: FieldExecuteCode.Error,
          message: `生成失败: ${response.error?.message || '未知错误'}`,
        };
      }
    } catch (e) {
      console.error('请求代理服务异常:', String(e));
      return {
        code: FieldExecuteCode.Error,
        message: `生成异常: ${String(e)}`,
      };
    }
  },
});

export default fieldDecoratorKit;
```

## 扩展建议

### 1. 支持多张参考图片

修改 `formItems` 配置：
```typescript
{
  key: 'refImage',
  props: {
    mode: 'multiple',  // 改为多选
    supportTypes: [FieldType.Attachment],
  }
}
```

### 2. 添加图片生成参数

增加更多配置项：
```typescript
{
  key: 'imageSize',
  label: '图片尺寸',
  component: FormItemComponent.SingleSelect,
  props: {
    options: [
      { key: '512x512', title: '512x512' },
      { key: '1024x1024', title: '1024x1024' },
    ]
  }
}
```

### 3. 添加进度提示

使用轮询机制查询生成进度：
```typescript
// 1. 提交任务获取 task_id
// 2. 轮询查询任务状态
// 3. 完成后返回结果
```

### 4. 缓存优化

对相同的输入进行缓存，避免重复生成：
```typescript
const cacheKey = `${imageUrl}_${aiInstruction}`;
// 检查缓存...
```

## 总结

本实现展示了如何在钉钉 AI 表格中创建一个完整的 AI 图片生成功能，关键点包括：

1. ✅ 正确使用 `tmp_url` 获取图片下载链接
2. ✅ 配置域名白名单以访问外部服务
3. ✅ 完善的参数验证和错误处理
4. ✅ 详细的日志记录便于调试
5. ✅ 符合钉钉 FaaS 规范的代码结构

通过本文档，你可以快速理解整个实现的原理和细节，并根据实际需求进行扩展和优化。
