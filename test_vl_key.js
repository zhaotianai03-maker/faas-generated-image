const https = require('https');

const apiKey = 'sk-1cea6d4b37f14d1bb713e379b9dfa176';

// 使用一个公共的图片URL进行测试
const imageUrl = 'https://dashscope.oss-cn-beijing.aliyuncs.com/images/dog_and_girl.jpeg';

const postData = JSON.stringify({
    model: 'qwen-vl-max',
    input: {
        messages: [
            {
                role: 'user',
                content: [
                    { image: imageUrl },
                    { text: '请描述这张图片里的内容。' }
                ]
            }
        ]
    },
    parameters: {
        result_format: 'message'
    }
});

const options = {
    hostname: 'dashscope.aliyuncs.com',
    path: '/api/v1/services/aigc/multimodal/generation',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('正在向通义千问 qwen-vl-plus 模型发送测试请求...');

const req = https.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('返回内容:');
        try {
            console.log(JSON.stringify(JSON.parse(data), null, 2));
        } catch (e) {
            console.log(data);
        }
    });
});

req.on('error', (error) => {
    console.error('请求出错:', error);
});

req.write(postData);
req.end();
