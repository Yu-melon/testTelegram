const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ success: false, error: '訊息內容不可為空' });
      return;
    }

    try {
      await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
      res.status(200).json({ success: true, message: '訊息已成功發送至 Telegram！' });
    } catch (error) {
      console.error('發送訊息時發生錯誤：', error);
      res.status(500).json({ success: false, error: '無法發送訊息至 Telegram' });
    }
  } else {
    res.status(405).json({ success: false, error: '僅允許 POST 請求' });
  }
};
