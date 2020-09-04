import json
import glob
import os
import platform
import time

from bs4 import BeautifulSoup
import markdown
import uuid

DESCRIPTION_MAX_LENGTH = 150
RES_JSON_PATH = os.path.join('src', 'article_list.json')
ALL_ARTICLE_PATH = glob.glob(os.path.join('src', 'articles', '*.md'))
ALL_ARTICLE_PATH.sort()


def get_title(html_parsed):
    try:
        title = html_parsed.h1.text
        return title
    except:
        return ""

def get_description(html_parsed):
    try:
        all_text = ''.join([x.text for x in html_parsed.find_all('p')])
        description = all_text[:DESCRIPTION_MAX_LENGTH]
        return description
    except:
        return ""


def get_datetime(path):
    if platform.system() == 'Windows':
        publish_time = os.path.getmtime(path)
    else:
        stat = os.stat(path)
        try:
            publish_time = stat.st_birthtime
        except AttributeError:
            publish_time = stat.st_mtime
    return round(publish_time)


def get_cover_image_url(html_parsed):
    try:
        cover_image = html_parsed.img.attrs['src']
    except:
        cover_image = 'https://miro.medium.com/max/3118/1*iwPLQjyFYRTVeQ2cb4S9rA.png'
    return cover_image


def parse_md(path):
    with open(path, 'r', encoding='utf-8') as file:
        raw_text = file.read()
    html = markdown.markdown(raw_text)
    html_parsed = BeautifulSoup(html, 'html.parser')
    return html_parsed


if __name__ == '__main__':
    with open(RES_JSON_PATH) as f:
        exist_data = json.loads(json.load(f))
    [print(data) for data in exist_data]
    res_json = []
    for article_path in ALL_ARTICLE_PATH:
        article_parsed = parse_md(article_path)
        item = dict()
        item['article_title'] = get_title(article_parsed)
        item['article_description'] = get_description(article_parsed)
        item['article_datetime'] = get_datetime(article_path)
        item['article_cover_image_url'] = get_cover_image_url(article_parsed)
        item['article_md_path'] = article_path.split(os.sep)[-1].replace('.md', '')
        item['uuid'] = uuid.uuid4().hex[:6]
        for article in exist_data:
            if item["article_md_path"] == article["article_md_path"]:
                item['uuid'] = article['uuid']
                break
        res_json.append(item)
    res_json.sort(key=lambda x: -x['article_datetime'])
    for i in range(len(res_json)): res_json[i]['article_datetime'] = time.ctime(res_json[i]['article_datetime'])
    res_json = json.dumps(res_json, indent=4)
    with open(RES_JSON_PATH, 'w') as outfile:
        json.dump(res_json, outfile)

    with open(RES_JSON_PATH) as f:
        data = json.load(f)
    print(data)
