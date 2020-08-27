import json
import glob
import os
import platform
import time

from bs4 import BeautifulSoup
import markdown

DESCRIPTION_MAX_LENGTH = 150
RES_JSON_PATH = os.path.join('src', 'article_list.json')
ALL_ARTICLE_PATH = glob.glob(os.path.join('public', 'articles', '*.md'))
ALL_ARTICLE_PATH.sort()


def get_title(html_parsed):
    title = html_parsed.h1.text
    return title


def get_description(html_parsed):
    description = html_parsed.p.text[:DESCRIPTION_MAX_LENGTH]
    return description


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
    cover_image = html_parsed.img.attrs['src']
    return cover_image


def parse_md(path):
    with open(path, 'r', encoding='utf-8') as file:
        raw_text = file.read()
    html = markdown.markdown(raw_text)
    html_parsed = BeautifulSoup(html, 'html.parser')
    return html_parsed


if __name__ == '__main__':
    res_json = []
    for article_path in ALL_ARTICLE_PATH:
        article_parsed = parse_md(article_path)
        item = dict()
        item['article_title'] = get_title(article_parsed)
        item['article_description'] = get_description(article_parsed)
        item['article_datetime'] = get_datetime(article_path)
        item['article_cover_image_url'] = get_cover_image_url(article_parsed)
        res_json.append(item)
        print(item['article_title'])
    res_json.sort(key=lambda x: x['article_datetime'])
    for i in range(len(res_json)): res_json[i]['article_datetime'] = time.ctime(res_json[i]['article_datetime'])

    res_json = json.dumps(res_json, indent=4)
    with open(RES_JSON_PATH, 'w') as outfile:
        json.dump(res_json, outfile)

    with open(RES_JSON_PATH) as f:
        data = json.load(f)
