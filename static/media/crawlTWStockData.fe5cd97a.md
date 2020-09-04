# Crawling Stock Data from TWSE Using Python

Crawling historical stock data from TWSE using Python in few lines of code.

## TWSE 臺灣證券交易所

在 [臺灣證券交易所](https://www.twse.com.tw/zh/) 所取得的資料是非常完整的，但是卻只能逐月下載，這會讓人點到天荒地老啊！這時候爬蟲就派上用場了，我們來看看如何快速方便地取得這些資料吧！一開始進入到下圖的頁面後發現了"列印 / HTML"這個選項。

![](https://i.imgur.com/XxU3xdi.png)

一點進去就是一個簡單的表格頁面，再觀察一下 url 發現可以填入日期讓我們找到不同月份的資料，太好了！這下可以讓電腦自己抓取全部的資料了，我們開始撰寫程式吧！

![](https://i.imgur.com/c8zCiCt.png)

## Code

Install the package `fake_useragent` in advanced to prevent `Max retries exceeded with url` error。

```pip install fake_useragent```

- Version 1
    ```python
    import requests
    import datetime
    import pandas as pd
    import time
    import random
    from bs4 import BeautifulSoup
    from fake_useragent import UserAgent

    # 設定 request 之限制 重試 5 次 關閉 session
    requests.DEFAULT_RETRIES = 5
    s = requests.session()
    s.keep_alive = False


    def get_data():
        # 假 User
        user_agent = UserAgent()
        # 產生日期列表
        date_list = [datetime.datetime.strftime(x, '%Y%m01') for x in
                     list(pd.date_range(start="19990101", end="20190901", freq="M"))]
        all_data = pd.DataFrame()
        for date in date_list:
            print(date)
            # 嘗試獲取資料
            try:
                res = requests.get("https://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=html&date=" + date,
                                   headers={'Connection': 'close',
                                            'User-Agent': user_agent.random})
                print("status_code:", res.status_code)
            except Exception as e:
                res = None
                print(date, e)
            if res:
                content = BeautifulSoup(res.text, 'html.parser')
                # 找到所有列並去除第一行標題
                content = [row.text.strip() for row in content.findAll("tr")][1:]
                # 分割出每個值並且去掉 comma
                content = [[e.replace(",", "") for e in row.split("\n")] for row in content]
                # 轉換成 DataFrame
                content = pd.DataFrame(content[1:], index=None, columns=content[0])
                # 連接新資料到 DataFrame
                all_data = pd.concat([all_data, content], ignore_index=True, sort=False)
                # 避免頻率過高
                time.sleep(random.uniform(3, 5.5))
            else:
                print(date, "request error, response is none.")

        print(all_data)
        all_data.to_csv('twii_1.csv', index=False, header=True)


    if __name__ == '__main__':
        get_data()
    ```

在爬完之後，發現原來可以直接 request csv 的資料！下面提供另外一個版本的程式。

- Version 2
    ```python
    import requests
    import datetime
    import pandas as pd
    import time
    import random
    from bs4 import BeautifulSoup
    from fake_useragent import UserAgent

    # 設定 request 之限制 重試 5 次 關閉 session
    requests.DEFAULT_RETRIES = 5
    s = requests.session()
    s.keep_alive = False


    def get_data():
        # 假 User
        user_agent = UserAgent()
        # 產生日期列表
        date_list = [datetime.datetime.strftime(x, '%Y%m01') for x in
                     list(pd.date_range(start="19990101", end="20190901", freq="M"))]
        all_data = pd.DataFrame()
        for date in date_list:
            print(date)
            # 嘗試獲取資料
            try:
                res = requests.get("https://www.twse.com.tw/indicesReport/MI_5MINS_HIST?response=csv&date=" + date,
                                   headers={'Connection': 'close',
                                            'User-Agent': user_agent.random})
                print("status_code:", res.status_code)
            except Exception as e:
                res = None
                print(date, e)
            if res:
                try:
                    content = convert_to_df(res)
                    # 連接新資料到 DataFrame
                    all_data = pd.concat([all_data, content], ignore_index=True, sort=False)
                    # 避免頻率過高
                    time.sleep(random.uniform(3, 5.5))
                except Exception as e:
                    print(date, e)
                    print(res)
            else:
                print(date, "request error, response is none.")

        print(all_data)
        all_data.to_csv('twii_2.csv', index=False, header=True)


    def convert_to_df(res):
        # 以換行符號切割每列並剔除第一列標題
        content = res.text.strip().split("\n")[1:]
        # 將多餘的符號去除
        content = [row.strip().replace(" ", "")[:-1] for row in content]
        content = [row.split("\",") for row in content]
        content = [[element.replace("\"", "").replace(",", "") for element in row] for row in content]
        # 轉換成 pandas DataFrame 格式並串接
        content = pd.DataFrame(content[1:], index=None, columns=content[0])
        return content


    if __name__ == '__main__':
        get_data()
    ```

在撰寫這次的爬蟲範例時遇到了 `Max retries exceeded with url` 這個錯誤訊息，原來是一開始忘記在 request 加一些條件了！在爬蟲時需要注意目標網站是否會封鎖 IP 以及什麼狀況下會封鎖 IP，撰寫時要考慮到 request 的頻率、Header 的設定或是 proxy 等等來避免被目標網站封鎖。另外，爬蟲有時候會遇到用 JavaScript 產生的內容無法直接抓取的問題，每個網站的寫法不同，都會有不同的解法。

總之順利取得資料了！接下來就開始探索我們的資料吧！


###### tags: `others`