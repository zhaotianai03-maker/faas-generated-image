import { FieldType, fieldDecoratorKit, FormItemComponent, FieldExecuteCode } from 'dingtalk-docs-cool-app';
const { t } = fieldDecoratorKit;

fieldDecoratorKit.setDomainList(['alidocs.dingtalk.com']);

fieldDecoratorKit.setDecorator({
  name: '测试附件字段引用',
  i18nMap: {
    'zh-CN': {
      'promptLabel': '请输入指令或引用附件字段',
      'promptPlaceholder': '尝试输入 @ 符号，看是否能引用附件字段',
    },
  },
  formItems: [
    {
      key: 'aiInstruction',
      label: t('promptLabel'),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: t('promptPlaceholder'),
        enableFieldReference: true,
      },
      validator: {
        required: true,
      },
    },
  ],
  resultType: {
    type: FieldType.Text,
  },
  execute: async (context, formData: { aiInstruction: any }) => {
    const { aiInstruction } = formData;
    
    console.log('=== 测试附件字段引用 ===');
    console.log('接收到的 formData:', JSON.stringify(formData, null, 2));
    console.log('');
    console.log('=== aiInstruction 详细分析 ===');
    console.log('类型:', typeof aiInstruction);
    console.log('是否为数组:', Array.isArray(aiInstruction));
    console.log('原始内容:', aiInstruction);
    console.log('JSON 格式:', JSON.stringify(aiInstruction, null, 2));
    console.log('字符串长度:', typeof aiInstruction === 'string' ? aiInstruction.length : 'N/A');
    console.log('');
    
    let resultText = '';
    
    try {
      const parsed = JSON.parse(aiInstruction);
      console.log('✅ 成功解析为 JSON');
      console.log('解析后的类型:', typeof parsed);
      console.log('是否为数组:', Array.isArray(parsed));
      console.log('解析后的内容:', JSON.stringify(parsed, null, 2));
      
      if (Array.isArray(parsed)) {
        console.log(`数组长度: ${parsed.length}`);
        parsed.forEach((item, index) => {
          console.log(`数组项 ${index}:`, JSON.stringify(item, null, 2));
          if (item.tmp_url) {
            console.log(`  ✅ 找到 tmp_url: ${item.tmp_url.substring(0, 100)}...`);
          }
        });
        
        resultText = `✅ 成功解析为附件数组！\n共 ${parsed.length} 个附件\n\n`;
        parsed.forEach((item, index) => {
          resultText += `附件 ${index + 1}:\n`;
          resultText += `  - 文件名: ${item.name || 'N/A'}\n`;
          resultText += `  - 类型: ${item.type || 'N/A'}\n`;
          resultText += `  - 大小: ${item.size || 'N/A'} bytes\n`;
          resultText += `  - tmp_url: ${item.tmp_url ? '✅ 存在' : '❌ 不存在'}\n`;
          if (item.tmp_url) {
            resultText += `  - URL 长度: ${item.tmp_url.length} 字符\n`;
          }
          resultText += '\n';
        });
      } else if (typeof parsed === 'object' && parsed !== null) {
        console.log('解析为单个对象');
        if (parsed.tmp_url) {
          console.log(`  ✅ 找到 tmp_url: ${parsed.tmp_url.substring(0, 100)}...`);
        }
        
        resultText = `✅ 成功解析为单个附件对象！\n\n`;
        resultText += `文件名: ${parsed.name || 'N/A'}\n`;
        resultText += `类型: ${parsed.type || 'N/A'}\n`;
        resultText += `大小: ${parsed.size || 'N/A'} bytes\n`;
        resultText += `tmp_url: ${parsed.tmp_url ? '✅ 存在' : '❌ 不存在'}\n`;
        if (parsed.tmp_url) {
          resultText += `URL 长度: ${parsed.tmp_url.length} 字符\n`;
        }
      } else {
        resultText = `⚠️ 解析为 JSON，但不是附件格式\n类型: ${typeof parsed}\n内容: ${JSON.stringify(parsed)}`;
      }
    } catch (e) {
      console.log('❌ 无法解析为 JSON，可能是普通文本');
      console.log('错误信息:', String(e));
      resultText = `❌ 不是附件引用（无法解析为 JSON）\n\n`;
      resultText += `接收到的原始文本:\n${aiInstruction}\n\n`;
      resultText += `这可能是：\n`;
      resultText += `1. 普通文本输入\n`;
      resultText += `2. 引用了文本字段（如标题）\n`;
      resultText += `3. 附件字段引用功能不可用\n`;
    }
    
    return {
      code: FieldExecuteCode.Success,
      data: resultText,
    };
  },
});
