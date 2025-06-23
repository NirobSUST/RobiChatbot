
# 🤖 Robi Chatbot - WhatsApp Integration using Twilio, Ngrok, and Langchain

This project connects a WhatsApp chatbot to Twilio's sandbox using `ngrok`, and integrates a Langchain-powered backend API. Follow the steps below to configure, run, and test the application successfully.

---

## 📁 Project Setup & Execution

### 1. Open Project in VS Code

```bash
code .
```

---

### 2. Connect to Database

- Open **SSMS (SQL Server Management Studio)**.
- Connect to your local or cloud-hosted database as required.

---

### 3. Start Mock Service

```bash
cd mock_service/ssl_commerce
node app.js
```

---

### 4. Start WhatsApp Channel Service

```bash
cd channels_service/whats_app
npm run dev
```

---

### 5. Expose Localhost with Ngrok

```bash
cd channels_service/whats_app
ngrok http 3000
```

> 🔗 **Copy the forwarding address** from ngrok terminal (e.g. `https://02dc-103-72-212-242.ngrok-free.app`).

---

## 🔧 Twilio Sandbox Configuration

1. Visit:  
   [Twilio WhatsApp Sandbox](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1)

2. Under **Sandbox Settings**, set:
   ```
   When a message comes in:
   https://<your-ngrok-url>/api/message
   ```

   Example:
   ```
   https://02dc-103-72-212-242.ngrok-free.app/api/message
   ```

3. Save the changes.

4. Below the settings, you'll find a **"Sandbox Participants"** section with:
   - Phone number (e.g., `+14155238886`)
   - Join code (e.g., `join xyz-abc`)

---

### 6. Start Langchain Service

```bash
cd bot_service/langchain
pip install -r requirements.txt
python api.py
```

---

### 7. Send WhatsApp Message

- Save the Twilio number on your phone.
- Send the **join code** via WhatsApp to join the sandbox.
- Start chatting with the bot.

---

## 🛠 Troubleshooting & Blockers

### 1. Update Environment Variables

If you face issues in chat, configure the `.env.local` file:

```env
TWILLO_ACCOUNT_SID=your_twilio_sid
TWILLO_ACCOUNT_TOKEN=your_twilio_token
OPENAI_API_KEY=your_openai_key
```

- Twilio credentials: [https://console.twilio.com/](https://console.twilio.com/)
- OpenAI key: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

> ✅ After updating, **save the file** and restart the services.

---

### 2. ETIMEDOUT Issue Fix

If you get an `ETIMEDOUT` error:

- Navigate to:
  ```
  channels_service/whats_app/pages/api/config.js
  ```
- Update `config.bot_api` with the local backend API address running in Step 6.

---

## 📺 Demo

Watch setup and demo on YouTube:  
👉 [https://youtu.be/CtzuhxyrAgM](https://youtu.be/CtzuhxyrAgM)

---

## 📦 Tech Stack

- **Node.js** (Express) for WhatsApp service
- **Python + Flask** with Langchain
- **Ngrok** for exposing local APIs
- **Twilio Sandbox** for WhatsApp messaging
- **SQL Server** (via SSMS) for database connection

---
