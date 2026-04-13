import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

fieldDecoratorKit.setDomainList(['dingding-faas.surfin.sg', 'ai-table-oss.oss-cn-beijing.aliyuncs.com']);

fieldDecoratorKit.setDecorator({
  name: 'AI图片生成',
  i18nMap: {
    'zh-CN': {
      'ref_image': '参考图片',
      'ai_instruction': '自定义 AI 任务指令',
      'aspect_ratio': '宽高比例',
      'resolution': '倍率',
      'temperature': '温度',
      'api_key': 'API 密钥',
    },
  },
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
        placeholder: '例如：用logo作为中心图形的一部分，提升品牌识别度。\n\n如有参考图，请严格参考原图的logo、产品外观、禁止瞎编生成。如无参考图，则不在图中生成logo或logo占位符\n\n提示：可以使用 @ 符号引用其他文本字段（如图片描述、标题等）',
        enableFieldReference: true,
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'aspectRatio',
      label: t('aspect_ratio'),
      component: FormItemComponent.SingleSelect,
      props: {
        options: [
          { key: '1:1', title: '1:1' },
          { key: '16:9', title: '16:9' },
          { key: '9:16', title: '9:16' },
          { key: '4:5', title: '4:5' },
          { key: '5:4', title: '5:4' },
        ],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'resolution',
      label: t('resolution'),
      component: FormItemComponent.SingleSelect,
      props: {
        options: [
          { key: '2K', title: '2K' },
          { key: '4K', title: '4K' },
        ],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'temperature',
      label: t('temperature'),
      component: FormItemComponent.SingleSelect,
      props: {
        options: [
          { key: '0.1', title: '0.1' },
          { key: '0.2', title: '0.2' },
          { key: '0.3', title: '0.3' },
          { key: '0.4', title: '0.4' },
          { key: '0.5', title: '0.5' },
          { key: '0.6', title: '0.6' },
          { key: '0.7', title: '0.7' },
          { key: '0.8', title: '0.8' },
          { key: '0.9', title: '0.9' },
          { key: '1.0', title: '1.0' },
          { key: '1.1', title: '1.1' },
          { key: '1.2', title: '1.2' },
          { key: '1.3', title: '1.3' },
          { key: '1.4', title: '1.4' },
          { key: '1.5', title: '1.5' },
          { key: '1.6', title: '1.6' },
          { key: '1.7', title: '1.7' },
          { key: '1.8', title: '1.8' },
          { key: '1.9', title: '1.9' },
          { key: '2.0', title: '2.0' },
        ],
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'apiKey',
      label: t('api_key'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: '请输入 API 密钥',
      },
      validator: {
        required: true,
      }
    }
  ],
  resultType: {
    type: FieldType.Attachment,
  },
  execute: async (context, formData: { refImage: { url: string, tmp_url: string, name: string, type: string }[][], aiInstruction: string, aspectRatio: string, resolution: string, temperature: string, apiKey: string }) => {
    const { refImage, aiInstruction, aspectRatio, resolution, temperature, apiKey } = formData;
    
    console.log('=== 开始执行 AI 图片生成 ===');
    console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
    console.log('');
    
    const imageUrls: string[] = [];
    
    console.log('=== 收集图片 URL ===');
    for (let i = 0; i < refImage.length; i++) {
      const field = refImage[i];
      console.log(`字段 ${i}:`, field);
      
      if (field && field.length > 0) {
        for (let j = 0; j < field.length; j++) {
          const attachment = field[j];
          console.log(`  附件 ${j}:`, attachment);
          
          if (attachment.tmp_url) {
            imageUrls.push(attachment.tmp_url);
            console.log(`    ✅ 添加 tmp_url: ${attachment.tmp_url.substring(0, 100)}...`);
          }
        }
      }
    }
    
    console.log('');
    console.log(`共收集到 ${imageUrls.length} 个图片 URL`);
    console.log('');
    console.log('AI 指令:', aiInstruction);
    console.log('宽高比例:', aspectRatio);
    console.log('倍率:', resolution);
    console.log('温度:', temperature);
    console.log('API 密钥:', apiKey ? `${apiKey.substring(0, 10)}...` : '未提供');
    console.log('');
    
    if (imageUrls.length === 0) {
      console.log('❌ 没有找到任何图片 URL');
      return {
        code: FieldExecuteCode.Error,
        errorMessage: '未找到参考图片，请确保选择的字段中包含图片附件',
      };
    }
    
    const requestBody = {
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
    
    try {
      const response = await context.fetch('https://dingding-faas.surfin.sg/api/v1/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('响应状态码:', response.status);
      const responseData = await response.json();
      console.log('响应数据:', JSON.stringify(responseData, null, 2));
      console.log('');
      
      if (response.status === 200 && responseData.success && responseData.data?.new_image_url) {
        console.log('✅ 图片生成成功！');
        console.log('新图片 URL:', responseData.data.new_image_url);
        
        return {
          code: FieldExecuteCode.Success,
          data: [{
            fileName: `generated-${Date.now()}.png`,
            type: 'image/png',
            url: responseData.data.new_image_url,
          }],
        };
      }
      
      console.log('❌ 服务返回失败');
      
      let errorMessage = '图片生成失败';
      
      if (response.status === 422) {
        console.log('参数验证错误 (422)');
        if (responseData.detail && Array.isArray(responseData.detail)) {
          const errors = responseData.detail.map((err: any) => {
            const field = err.loc ? err.loc.join('.') : 'unknown';
            return `${field}: ${err.msg}`;
          }).join('; ');
          errorMessage = `参数验证失败: ${errors}`;
        } else {
          errorMessage = '参数验证失败，请检查输入参数';
        }
      } else if (response.status === 400) {
        console.log('客户端错误 (400)');
        if (responseData.detail?.error) {
          const error = responseData.detail.error;
          errorMessage = error.message || '请求参数错误';
          if (error.code === 'IMAGE_DOWNLOAD_ERROR') {
            errorMessage = `参考图片下载失败: ${error.message}`;
          }
        } else {
          errorMessage = '请求参数错误';
        }
      } else if (response.status === 500) {
        console.log('服务器错误 (500)');
        if (responseData.detail?.error) {
          const error = responseData.detail.error;
          const errorCode = error.code || 'UNKNOWN_ERROR';
          
          switch (errorCode) {
            case 'GEMINI_API_ERROR':
              errorMessage = 'AI 图片生成服务异常，请稍后重试';
              break;
            case 'OSS_UPLOAD_ERROR':
              errorMessage = '图片上传失败，请稍后重试';
              break;
            case 'INTERNAL_SERVER_ERROR':
              errorMessage = '服务器内部错误，请稍后重试';
              break;
            default:
              errorMessage = error.message || '服务器处理失败';
          }
          
          console.log(`错误代码: ${errorCode}`);
          console.log(`错误信息: ${error.message}`);
        } else {
          errorMessage = '服务器内部错误，请稍后重试';
        }
      } else {
        errorMessage = responseData.message || responseData.detail?.error?.message || `服务返回错误 (HTTP ${response.status})`;
      }
      
      return {
        code: FieldExecuteCode.Error,
        errorMessage: errorMessage,
        extra: responseData,
      };
      
    } catch (error) {
      console.log('❌ 请求异常:', error);
      
      let errorMessage = '调用图片生成服务失败';
      
      if (error instanceof Error) {
        if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
          errorMessage = '请求超时，图片生成可能需要较长时间，请稍后重试';
        } else if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
          errorMessage = '网络连接失败，请检查网络或稍后重试';
        } else {
          errorMessage = `请求失败: ${error.message}`;
        }
      }
      
      return {
        code: FieldExecuteCode.Error,
        errorMessage: errorMessage,
        extra: { error: String(error) },
      };
    }
  },
});

export default fieldDecoratorKit;
