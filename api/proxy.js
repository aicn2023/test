const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // 你的GitLab配置文件URL
  const configUrl = "https://gitlab.com/api/v4/projects/56467109/repository/files/2025_03_03%2F7I1jU5fq.yaml/raw?ref=main&private_token=glpat-xUQyWis7a9FCXFfyiW1T";
  
  try {
    const response = await fetch(configUrl);
    if (!response.ok) {
      throw new Error(`获取失败: ${response.status}`);
    }
    
    const config = await response.text();
    
    // 添加必要的HTTP头
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=86400');
    
    // 添加更新信息到配置顶部
    const now = new Date();
    const updatedConfig = 
      `# NAME: 自动更新配置\n` +
      `# UPDATED: ${now.toISOString()}\n` + 
      `# INTERVAL: 86400\n\n` +
      config;
    
    return res.status(200).send(updatedConfig);
  } catch (error) {
    return res.status(500).send(`Error: ${error.message}`);
  }
};
