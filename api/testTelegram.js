const axios = require('axios');

module.exports = async (req, res) => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: "這是一條測試消息，確認 Telegram Bot 是否可用。",
    });

    console.log('Telegram 測試消息已發送！', response.data);

    res.status(200).json({ message: 'Telegram 測試消息已發送！', result: response.data });
  } catch (error) {
    console.error('Telegram 測試失敗：', error.message);

    res.status(500).json({ message: 'Telegram 測試失敗', error: error.message });
  }
};