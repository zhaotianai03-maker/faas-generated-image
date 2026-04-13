import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

// 通过addDomainList添加请求接口的域名
fieldDecoratorKit.setDomainList(['dingding-faas.surfin.sg', 'ai-table-oss.oss-cn-beijing.aliyuncs.com']);

fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  // 定义捷径的i18n语言资源
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令',
    },
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'refImage',
      label: t('ref_image'),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: 'multiple',
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
        placeholder: '例如：用logo作为中心图形的一部分，提升品牌识别度。\n\n如有参考图，请严格参考原图的logo、产品外观、禁止瞎编生成。如无参考图，则不在图中生成logo或logo占位符',
        enableFieldReference: true,
      },
      validator: {
        required: true,
      }
    }
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment,
  },
  execute: async (context, formData: { refImage: { url: string, tmp_url: string, name: string, type: string }[][], aiInstruction: any }) => {
    const { refImage, aiInstruction } = formData;
    
    console.log('=== 开始执行 AI 图片生成 ===');
    console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
    console.log('');
    console.log('=== aiInstruction 详细信息 ===');
    console.log('类型:', typeof aiInstruction);
    console.log('是否为数组:', Array.isArray(aiInstruction));
    console.log('内容:', aiInstruction);
    console.log('JSON 格式:', JSON.stringify(aiInstruction, null, 2));
    console.log('');
    
    if (!refImage || refImage.length === 0) {
      return {
        code: FieldExecuteCode.Error,
        message: '请至少选择一个参考图片字段',
      };
    }

    console.log(`选择的字段数量: ${refImage.length}`);
    console.log(`所有参考图片完整信息:`, JSON.stringify(refImage, null, 2));
    
    // 收集所有字段的所有图片的 tmp_url
    const imageUrls: string[] = [];
    for (let i = 0; i < refImage.length; i++) {
      const field = refImage[i];
      if (field && field.length > 0) {
        console.log(`字段 ${i + 1} 包含 ${field.length} 张图片`);
        for (let j = 0; j < field.length; j++) {
          const attachment = field[j];
          if (attachment.tmp_url) {
            imageUrls.push(attachment.tmp_url);
            console.log(`  - 图片 ${j + 1}: ${attachment.name}, tmp_url: ${attachment.tmp_url}`);
          } else {
            console.warn(`  - 图片 ${j + 1}: ${attachment.name}, tmp_url 为空，跳过`);
          }
        }
      } else {
        console.warn(`字段 ${i + 1} 没有有效的图片`);
      }
    }
    
    if (imageUrls.length === 0) {
      return {
        code: FieldExecuteCode.Error,
        message: '无法获取图片的临时下载链接（tmp_url 为空）。请确保选择的是已上传的图片附件。',
      };
    }

    console.log(`=== 收集完成 ===`);
     console.log(`总共收集到 ${imageUrls.length} 张有效图片`);
     console.log(`所有图片 URLs:`, imageUrls);
 
     try {
       console.log('正在调用 Python 代理服务生成图片...');
       
       // 将 aiInstruction 转换为字符串（如果它不是字符串的话）
       const promptText = typeof aiInstruction === 'string' 
         ? aiInstruction 
         : JSON.stringify(aiInstruction);
       
       console.log('最终使用的 prompt:', promptText);
       
       // 构建请求体 - 始终发送 image_urls 数组
       const requestBody = {
         image_urls: imageUrls,
         prompt: promptText
       };
      
      console.log('发送到代理服务的请求体:', JSON.stringify(requestBody, null, 2));
      console.log(`  - image_urls 数量: ${imageUrls.length}`);
      console.log(`  - prompt: ${aiInstruction}`);
      
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
