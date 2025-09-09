import telebot
from telebot import types
import json
import os
from flask import Flask, request

# Замени 'YOUR_BOT_TOKEN' на свой токен
TOKEN = '8385623418:AAFiyXpTPpPKqs924hb2ETdubtE9ZWZArdQ'
WEB_APP_URL = 'https://grif399-a11y.github.io/my-mini-app/' 
bot = telebot.TeleBot(TOKEN)
app = Flask(__name__)

# Файл для хранения баланса
BALANCE_FILE = 'user_balances.json'

def load_balances():
    if not os.path.exists(BALANCE_FILE):
        return {}
    with open(BALANCE_FILE, 'r') as f:
        return json.load(f)

def save_balances(balances):
    with open(BALANCE_FILE, 'w') as f:
        json.dump(balances, f, indent=4)

user_balances = load_balances()

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def handle_start(message):
    user_id = str(message.from_user.id)
    if user_id not in user_balances:
        user_balances[user_id] = 0  # ИЗМЕНЕНИЕ: начальный баланс теперь 0
        save_balances(user_balances)

    keyboard = types.InlineKeyboardMarkup()
    web_app_button = types.WebAppInfo(WEB_APP_URL)
    keyboard.add(types.InlineKeyboardButton(text="Открыть NFT-приложение 💎", web_app=web_app_button))

    bot.send_message(
        message.chat.id,
        f"Добро пожаловать в наше NFT-приложение! Ваш баланс: {user_balances[user_id]}",
        reply_markup=keyboard
    )

# --- Добавляем логику платежей за звезды и обработки данных из Web App ---

@bot.message_handler(content_types=['web_app_data'])
def handle_web_app_data(message):
    data = json.loads(message.web_app_data.data)
    user_id = str(message.from_user.id)

    if data.get('type') == 'sellGift' and 'value' in data:
        sell_value = data['value']
        if user_id in user_balances:
            user_balances[user_id] += sell_value
            save_balances(user_balances)
            bot.send_message(message.chat.id, f"🎁 Вы успешно продали подарок! Ваш новый баланс: {user_balances[user_id]} ⭐")
    elif data.get('type') == 'openCase' and 'price' in data:
        case_price = data['price']
        if user_id in user_balances and user_balances[user_id] >= case_price:
            user_balances[user_id] -= case_price
            save_balances(user_balances)
            # Отправка сообщения, что кейс открыт
            bot.send_message(message.chat.id, f"🎉 Вы открыли кейс. Ваш текущий баланс: {user_balances[user_id]} ⭐")
        else:
            bot.send_message(message.chat.id, "💰 Недостаточно средств для открытия кейса!")
    elif 'amount' in data:
        amount = int(data['amount'])
        bot.send_invoice(
            chat_id=message.chat.id,
            title=f"Купить {amount} Укусов",
            description=f"Купить {amount} Укусов за {amount/100} ⭐",
            payload=user_id,
            provider_token='381764672:TEST:7000',
            currency='XTR', 
            prices=[types.LabeledPrice(label=f"Укусы ({amount})", amount=int(amount))]
        )

# Обработчик успешного платежа
@bot.pre_checkout_query_handler(func=lambda query: True)
def handle_pre_checkout_query(pre_checkout_query):
    bot.answer_pre_checkout_query(pre_checkout_query.id, ok=True)
    
@bot.message_handler(content_types=['successful_payment'])
def handle_successful_payment(message):
    user_id = str(message.from_user.id)
    amount_in_stars = message.successful_payment.total_amount
    
    if user_id in user_balances:
        user_balances[user_id] += amount_in_stars
    else:
        user_balances[user_id] = amount_in_stars
    
    save_balances(user_balances)
    
    bot.send_message(
        message.chat.id,
        f"🎉 Платеж прошел успешно! Ваш баланс: {user_balances[user_id]} ⭐"
    )

# --- Настройка Flask-приложения для вебхука ---

@app.route('/', methods=['POST'])
def webhook():
    if request.headers.get('content-type') == 'application/json':
        json_string = request.get_data().decode('utf-8')
        update = telebot.types.Update.de_json(json_string)
        bot.process_new_updates([update])
        return '', 200
    else:
        return '', 403

if __name__ == '__main__':
    bot.polling(none_stop=True)