# Use Python to Build a BTC Auto Trader on Poloniex

![](https://i.imgur.com/7NX4KQ2.png)

This post would show how to create a auto trader that trades **BTC/USDT** with a simple strategy using **Poloniex's API** and **Python**.

## Strategy for Auto Trader

### Simple Moving Average Strategy

Check long-term moving average ( MA ) price and short-term moving average price to determinate buy or sell. If the short-term MA **crossed above long-term MA then buy** else 
    if the short-term MA **crossed below long-term MA then sell**, the rest of time just hold.

This trading-bot does not make decision of the ordering amount and the ordering price. The trading-bot **detects the trading signals and take all amount in with the current mid-price**.

### Procedure

- Main Loop

    $\textsf{Check if } ma_{short-term} \textsf{ cross above } ma_{long-term}$

    $\begin{cases}
    \Rightarrow \textsf{True: Buy BTC}
    \\
    \\
    \Rightarrow  \textsf{False: Hold}
    \end{cases}$

    $\textsf{Check if } ma_{short-term} \textsf{ cross below } ma_{long-term}$

    $\begin{cases}
    \Rightarrow \textsf{True: Sell BTC}
    \\
    \\
    \Rightarrow  \textsf{False: Hold}
    \end{cases}$

- Buy BTC

    $p = Percentage Profit$

    $Price_{target} = Price_{lastSell} \times (1-p\%)$

    $\textsf{Check if } Price_{current} < Price_{target}$

    $\begin{cases}
    \Rightarrow \textsf{True: Submit order}
    \\
    \\
    \Rightarrow  \textsf{False: Skip}
    \end{cases}$ 

- Sell BTC

    $p = Percentage Profit$

    $Price_{target} = Price_{lastBuy} \times (1+p\%)$

    $\textsf{Check if } Price_{current} > Price_{target}$

    $\begin{cases}
    \Rightarrow \textsf{True: Submit order}
    \\
    \\
    \Rightarrow  \textsf{False: Skip}
    \end{cases}$

- Information should be obtained from Poloniex API
    - Current price
    - History price
    - Trade history

## Prepare for Poloniex API

Check the [Poloniex API documents](https://docs.poloniex.com/#introduction) to get the **API key** and **secret** and test the API with some simple code to make sure it works.

### Test Public API

- Import packages

    ``` python
    import requests
    import json
    import time
    import hmac
    import hashlib
    import urllib
    ```

- Get current order book

    code
    ```python
    def byte_to_dict(byte_string):
        original_string = byte_string.decode('utf-8')
        res = json.loads(original_string)
        return res
    ```

    ```python
    order_book_content = requests.get("https://poloniex.com/public?command=returnOrderBook&currencyPair=USDT_BTC&depth=10").content
    order_book_json = byte_to_dict(order_book_content)
    print(order_book_json)
    ```
    result
    ```json
    {'asks': [['9318.89475755', 0.09252694], ['9319.04858468', 3.99403487], ['9322.26699272', 0.285], ['9322.26699273', 0.1], ['9322.26699274', 1.40348881], ['9324.26460000', 0.15805678], ['9325.17310216', 0.4], ['9326.32620000', 0.153], ['9326.34779061', 3.7], ['9326.45721488', 0.05]], 'bids': [['9316.82429884', 4], ['9316.35841743', 0.2], ['9314.89340003', 0.1], ['9314.89340002', 0.11025108], ['9314.89340001', 0.0439853], ['9314.89340000', 0.1515], ['9314.53638739', 0.32516935], ['9314.34852268', 0.86869921], ['9313.02440145', 0.00505678], ['9313.02440144', 0.86527705]], 'isFrozen': '0', 'seq': 806436142}
    ```

- Get trade history

    code
    ```python
    # The period betwwen start and end should be less than one month
    # Only last one year data is avalible
    trade_history_content = requests.get("https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_BTC&start=1589332530&end=1589432530").content
    trade_history_json = byte_to_dict(trade_history_content)
    print(trade_history_json)
    ```
    result
    ```json
    [
      {
        "amount": "0.03843633",
        "date": "2020-05-14 05:02:10",
        "globalTradeID": 465005544,
        "orderNumber": 586267027240,
        "rate": "9297.02741898",
        "total": "357.34361389",
        "tradeID": 34992782,
        "type": "sell"
      },
      {
        "amount": "0.00140147",
        "date": "2020-05-14 05:02:08",
        "globalTradeID": 465005542,
        "orderNumber": 586267001266,
        "rate": "9297.02741898",
        "total": "13.02950501",
        "tradeID": 34992781,
        "type": "buy"
      },
    ...
    ```

### Test Private API

- Prepare API key and secret

    Create a new file `private.py`
    ```python
    API_KEY = "API key here"
    SECRET = "Secret here"
    ```
    Import the key and secret
    ```python
    from private import API_KEY, SECRET
    ```

- Get current balance

    code
    ```python
    data = {'command': 'returnBalances', 'nonce': str(time.time()).replace(".", "")}
    data = urllib.parse.urlencode(data).encode()
    SIGN = hmac.new(str.encode(SECRET), data, digestmod=hashlib.sha512).hexdigest()
    headers = {'Key': API_KEY, 'Sign': SIGN, 'Content-Type': 'application/x-www-form-urlencoded'}
    balance_content = requests.post('https://poloniex.com/tradingApi', headers=headers, data=data).content
    balance = byte_to_dict(balance_content)
    print(balance)
    ```
    result
    ```json
    {
      "1CR": "0.00000000",
      "ABY": "0.00000000",
      "AC": "0.00000000",
      "ACH": "0.00000000",
      "ADN": "0.00000000",
      "AEON": "0.00000000",
      "AERO": "0.00000000",
      "AIR": "0.00000000",
      "AMP": "0.00000000",
      "APH": "0.00000000",
      "ARCH": "0.00000000",
      "ARDR": "0.00000000",
      "ATOM": "0.00000000",
      "AUR": "0.00000000",
      "AVA": "0.00000000",
    ...
    ```
    
- Get trade history ( private )

    code
    ```python
    num_days = 7
    data = {'command': 'returnTradeHistory', 
            'currencyPair': 'USDT_BTC', 
            'nonce': str(time.time()).replace(".", "").ljust(17, '0'), 
            'start': str(round(time.time())-86400*num_days)}
    data = urllib.parse.urlencode(data).encode()
    SIGN = hmac.new(str.encode(SECRET), data, digestmod=hashlib.sha512).hexdigest()
    headers = {'Key': API_KEY, 'Sign': SIGN, 'Content-Type': 'application/x-www-form-urlencoded'}

    trade_history_content = requests.post('https://poloniex.com/tradingApi', headers=headers, data=data).content
    trade_history_json = byte_to_dict(trade_history_content)
    print(trade_history_json)
    ```
    result
    ```json
    [{'globalTradeID': 464681918, 'tradeID': '34951123', 'date': '2020-05-12 10:03:13', 'rate': '8810.677447190000', 'amount': '0.01061987', 'total': '93.56824910', 'fee': '0.00090000', 'orderNumber': '583492490554', 'type': 'sell', 'category': 'exchange'}, {'globalTradeID': 464535218, 'tradeID': '34925366', 'date': '2020-05-11 16:38:49', 'rate': '8653.601503260000', 'amount': '0.01062943', 'total': '91.98285142', 'fee': '0.00090000', 'orderNumber': '582233880424', 'type': 'buy', 'category': 'exchange'}, {'globalTradeID': 464485689, 'tradeID': '34914199', 'date': '2020-05-11 11:00:22', 'rate': '8821.148339700000', 'amount': '0.01043686', 'total': '92.06509026', 'fee': '0.00090000', 'orderNumber': '581847652039', 'type': 'sell', 'category': 'exchange'}, {'globalTradeID': 464459140, 'tradeID': '34910130', 'date': '2020-05-11 08:21:42', 'rate': '8629.859432990000', 'amount': '0.00004626', 'total': '0.39921729', 'fee': '0.00090000', 'orderNumber': '581658260620', 'type': 'buy', 'category': 'exchange'}, {'globalTradeID': 464459138, 'tradeID': '34910129', 'date': '2020-05-11 08:21:41', 'rate': '8629.859432990000', 'amount': '0.01040000', 'total': '89.75053810', 'fee': '0.00090000', 'orderNumber': '581658260620', 'type': 'buy', 'category': 'exchange'}, {'globalTradeID': 464426661, 'tradeID': '34906981', 'date': '2020-05-11 02:47:06', 'rate': '8742.892692120000', 'amount': '0.01032057', 'total': '90.23163603', 'fee': '0.00090000', 'orderNumber': '581335729474', 'type': 'sell', 'category': 'exchange'}]
    ```
    
## Moving Average

Get history price data and calculate the moving average for different period then plot and see what it looks like.



### History Price Data

- Import packages

    ```python
    import pandas as pd
    import matplotlib.pyplot as plt
    ```

- Get data
    
    code
    ```python
    num_days = 14
    # 300, 900, 1800, 7200, 14400, and 86400 are provided
    period = 1800
    currencyPair = "USDT_BTC"
    end = time.time()
    start = end - 86400*num_days

    history_price_content = requests.get("https://poloniex.com/public?command=returnChartData&currencyPair=%s&start=%s&end=%s&period=%s" % (currencyPair, start, end, period)).content
    history_prices_json = byte_to_dict(history_price_content)
    print(history_prices_json)
    ```
    result
    ```json
    [{'date': 1588231780, 'high': 9107.44474999, 'low': 9107.44474999, 'open': 9107.44474999, 'close': 9107.44474999, 'volume': 0, 'quoteVolume': 0, 'weightedAverage': 9107.44474999}, {'date': 1588231800, 'high': 9217.79300218, 'low': 9081, 'open': 9108, 'close': 9177.95, 'volume': 747483.69114099, 'quoteVolume': 81.59637853, 'weightedAverage': 9160.74591308}, {'date': 1588233600, 'high': 9218.25378739, 'low': 9138.00000001, 'open': 9177, 'close': 9173.36322646, 'volume': 553201.1535739, 'quoteVolume': 60.30271617, 'weightedAverage': 9173.73525952}, {'date': 1588235400, 'high': 9189, 'low': 9094, 'open': 9174.67971596, 'close': 9119.99979999, 'volume': 782094.87248126, 'quoteVolume': 85.47964046, 'weightedAverage': 9149.48715591}, {'date': 1588237200, 'high': 9115.3760337, 'low': 8800.00000001, 'open': 9115.3760337, 'close': 8924.10768635, 'volume': 2762824.1406579, 'quoteVolume': 308.5864659, 'weightedAverage': 8953.16044597},...
    ```

### Plot and See the Data

- Convert json to pandas dataframe

    code
    ```python
    data = pd.DataFrame(history_prices_json)
    data
    ```
    result
    ![](https://i.imgur.com/GHuGaFH.png)

- Plot the price data
    
    code
    ```python
    num_data = 20
    plt.figure(figsize=(10, 6))
    data["high"][-num_data:].plot(style='.-', ms=10)
    data["low"][-num_data:].plot(style='.-', ms=10)
    data["close"][-num_data:].plot(style='.-', ms=10)
    plt.legend()
    plt.grid()
    plt.show()
    ```
    result
    ![](https://i.imgur.com/FJ1IbYS.png)


### Calculate Moving Average

- Calculate MA

    ```python
    DATA_NUM_DAYS = 2
    DATA_PERIOD = 300
    data = get_data(num_days=DATA_NUM_DAYS, period=DATA_PERIOD, currency_pair=CURRENCY_PAIR)
    data["ma_short"]=data["close"].rolling(window=24).mean()
    data["ma_long"]=data["close"].rolling(window=48).mean()
    ```

- Plot the MA with close price
    
    ```python
    num_data = 400
    plt.figure(figsize=(10, 6))
    data["close"][-num_data:].plot(style='.-', ms=3)
    data["ma_short"][-num_data:].plot()
    data["ma_long"][-num_data:].plot()
    plt.legend()
    plt.grid()
    plt.show()
    ```
    ![](https://i.imgur.com/aQpsPzG.png)


As you can see in the graph, the **short-term MA ( ma_12hour )** crossed above the **long-term MA ( ma_24hour )** then the price keeps going up and **It's over 9000 !**

## Auto Trader


### Submit Order

- Buy
    code
    ```python
    currencyPair = 'USDT_BTC'
    balance = float(get_balance("USDT"))
    # divide by 2 to avoid actually buying in
    rate = get_current_price(currencyPair)/2
    amount = balance/rate
    clientOrderId = str(randint(0, 99999)).zfill(5)
    ```

    ```python
    data = {
            'command': 'buy', 
            'currencyPair': currencyPair, 
            'rate': str(rate),
            'amount': str(amount),
            'clientOrderId':clientOrderId,
            'nonce': str(time.time()).replace(".", "").ljust(17, '0'), 
            }
    data = urllib.parse.urlencode(data).encode()
    SIGN = hmac.new(str.encode(SECRET), data, digestmod=hashlib.sha512).hexdigest()
    headers = {'Key': API_KEY, 'Sign': SIGN, 'Content-Type': 'application/x-www-form-urlencoded'}

    buy_order_content = requests.post('https://poloniex.com/tradingApi', headers=headers, data=data).content
    byte_to_dict(buy_order_content)
    ```
    result
    ```json
    {'clientOrderId': '3474',
     'currencyPair': 'USDT_BTC',
     'fee': '0.00090000',
     'orderNumber': '588173116243',
     'resultingTrades': []}
    ```
- Sell

    code
    ```python
    currencyPair = 'USDT_BTC'
    amount = float(get_balance("BTC"))
    # divide by 2 to avoid actually selling out
    rate = get_current_price(currencyPair)*2
    clientOrderId = str(randint(0, 99999)).zfill(5)
    ```
    ```python
    data = {
        'command': 'sell', 
        'currencyPair': currencyPair, 
        'rate': str(rate),
        'amount': str(balance),
        'clientOrderId':clientOrderId,
        'nonce': str(time.time()).replace(".", "").ljust(17, '0'), 
        }
    data = urllib.parse.urlencode(data).encode()
    SIGN = hmac.new(str.encode(SECRET), data, digestmod=hashlib.sha512).hexdigest()
    headers = {'Key': API_KEY, 'Sign': SIGN, 'Content-Type': 'application/x-www-form-urlencoded'}

    sell_order_content = requests.post('https://poloniex.com/tradingApi', headers=headers, data=data).content
    byte_to_dict(sell_order_content)
    ```
    
### Confirm profit before submit order
- Get last trade info
    code
    ```python
    last_trade = get_last_trade(currency_pair=CURRENCY_PAIR, num_days=5)
    current_price = get_current_price(currency_pair=CURRENCY_PAIR)
    last_trade
    ```
    ```json
    {'amount': '0.01061987',
     'category': 'exchange',
     'date': '2020-05-12 10:03:13',
     'fee': '0.00090000',
     'globalTradeID': 464681918,
     'orderNumber': '583492490554',
     'rate': '8810.677447190000',
     'total': '93.56824910',
     'tradeID': '34951123',
     'type': 'sell'}
    ```
- Set a save profit range and check 
    code
    ```python
    PROFIT_PERCENTAGE=1
    if last_trade["type"] == "sell":
        target_price = float(last_trade["rate"]) * (1 - PROFIT_PERCENTAGE * 0.01)
        print("Expect target price to buy is %s, current price is %s" % (target_price, current_price))
        if current_price < target_price:
            print("Submit buy order")
        else:
            print("Not submit buy order")
    else:
        target_price = float(last_trade["rate"]) * (1 + PROFIT_PERCENTAGE * 0.01)
        print("Expect target price to sell is %s, current price is %s" % (target_price, current_price))
        if current_price > target_price:
            print("Submit sell order")
        else:
            print("Not submit sell order")
    ```
    result
    ```
    Expect target price to buy is 8722.5706727181, current price is 9608.48394732
    Not submit buy order
    ```

### Check MA signal

- Find crossover point

    ```python
    data = get_data(num_days=DATA_NUM_DAYS, period=DATA_PERIOD, currency_pair=CURRENCY_PAIR)
    data["ma_short"] = calculate_moving_average(data.close, 4)
    data["ma_long"] = calculate_moving_average(data.close, 10)
    previous_short = data["ma_short"].shift(1)
    previous_long = data["ma_long"].shift(1)
    cross_below = (data["ma_short"] < data["ma_long"]) & (previous_short >= previous_long)
    cross_above = (data["ma_short"] > data["ma_long"]) & (previous_short <= previous_long)
    ```

- Plot and see

    ```python
    start = 527
    num_data = 50
    plt.figure(figsize=(10, 6))
    ax = data["close"][start:start+num_data].plot(style='.-', ms=5)
    data["ma_short"][start:start+num_data].plot()
    data["ma_long"][start:start+num_data].plot()
    [ax.axvline(i, color="red", linestyle="-.") for i in data[start:start+num_data].index[cross_above[start:start+num_data]].tolist()]
    [ax.axvline(i, color="green", linestyle="-.") for i in data[start:start+num_data].index[cross_below[start:start+num_data]].tolist()]
    plt.ylabel("BTC Price")
    plt.xlabel("Date")
    plt.legend()
    plt.grid()
    plt.show()
    ```
    ![](https://i.imgur.com/dI1NK47.png)

### Assemble above Functions to Build the Bot

`trading_bot.py`
```python
from utils import *
from trading_bot_config import *


def start_trading_bot():
    while True:
        data = get_data(num_days=DATA_NUM_DAYS, period=DATA_PERIOD, currency_pair=CURRENCY_PAIR)
        action = decide_action(data, SIGNALS)
        if action == "buy":
            current_price = get_current_price(currency_pair=CURRENCY_PAIR)
            last_trade = get_last_trade(currency_pair=CURRENCY_PAIR, num_days=TRADE_HISTORY_NUM_DAYS)
            is_profit = confirm_profit(last_trade, current_price, PROFIT_PERCENTAGE)
            if is_profit:
                balance = float(get_balance(currency="USDT"))
                amount = balance / current_price
                try:
                    buy(currency_pair=CURRENCY_PAIR, buy_price=current_price, amount=amount)
                except Exception as e:
                    print("Fail to submit order\n%s" % e)
        elif action == "sell":
            current_price = get_current_price(currency_pair=CURRENCY_PAIR)
            last_trade = get_last_trade(currency_pair=CURRENCY_PAIR, num_days=TRADE_HISTORY_NUM_DAYS)
            is_profit = confirm_profit(last_trade, current_price, PROFIT_PERCENTAGE)
            if is_profit:
                balance = float(get_balance(currency="BTC"))
                amount = balance
                try:
                    sell(currency_pair=CURRENCY_PAIR, sell_price=current_price, amount=amount)
                except Exception as e:
                    print("Fail to submit order\n%s" % e)
        else:
            pass
        print("%s [Log] Action: %s" % (time.strftime("%Y/%m/%d %H:%M:%S"), action))


if __name__ == '__main__':
    start_trading_bot()

```

