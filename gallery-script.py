# Requires pillow and pyyaml, iptcinfo3
# example: python3 -m gallery-script -i ~/website -n all
import argparse
import shutil
from datetime import datetime
from pathlib import Path


import yaml
from iptcinfo3 import IPTCInfo
from PIL import ExifTags
from PIL import Image


GALLERY_MARKDOWN = """---
layout: gallery
title: {capname}
support: [jquery, gallery]
---

{{% include gallery-layout.html gallery=site.data.galleries.{name} %}}
"""

GALLERY_TAGS = [
    'bird',
    'mammal',
    'nature',
    'reptile',
    # 'tanzania',
    # 'alaska',
    # 'british columbia',
    # 'montana',
    # 'california',
    # 'washington',
    # 'antartica',
    # 'south georgia',
    # 'falklands'
]

TAG_TO_NAME = {
    'bird': 'Birds',
    'mammal': 'Mammals',
    'reptile': 'Reptiles',
    'nature': 'Nature',
    'tanzania': 'Tanzania',
    'alaska': 'Alaska',
    'british columbia': 'British Columbia',
    'montana': 'Montana',
    'california': 'California',
    'washington': 'Washington',
    'antartica': 'Antartica',
    'south georgia': 'South Georgia',
    'falklands': 'The Falklands'
}


def main(indir, imgdir, page_dir, gallery_dir, picture_path):
    inpath = Path(indir)
    outpath = Path(imgdir) / picture_path
    gpath = Path(gallery_dir)
    ppath = Path(page_dir)

    ppath.mkdir(exist_ok=True)
    gpath.mkdir(exist_ok=True)
    outpath.mkdir(exist_ok=True)

    img_ymls = []
    for thumbnail in inpath.glob('*-thumbnail.jpg'):
        [fname, suffix] = thumbnail.name.split('-thumbnail')
        original = inpath / (fname + suffix)
        img = Image.open(original)
        exif = get_exif(img)
        caption = get_exif_caption(exif)
        dt = get_exif_dt(exif)
        keywords = get_keywords(thumbnail)
        title = get_title(thumbnail)
        width, height = img.size
        base_name = fname.lower().replace(' ', '-')
        rename_original = outpath / f"{base_name}-{width}x{height}{suffix}"
        rename_thumbnail = outpath / f"{base_name}-thumbnail{suffix}"

        shutil.copyfile(original, rename_original)
        shutil.copyfile(thumbnail, rename_thumbnail)
        yml = {
            'filename': base_name,
            'original': rename_original.name,
            'sizes': [rename_original.name],
            'thumbnail': rename_thumbnail.name,
            'orientation': 'landscape' if width > height else 'portrait',
            'caption': caption,
            'title': title,
            'keywords': keywords,
            'datetime': dt
        }
        img_ymls.append(yml)

    # newest first
    img_ymls = sorted(img_ymls, key=lambda x: x['datetime'], reverse=True)

    # overview page
    ov = []

    # Create all gallery
    ovg = build_gallery('all', 'All', img_ymls, gpath, ppath, picture_path)
    ov.append(ovg)

    # For each gallery tag create gallery data
    for tag in GALLERY_TAGS:
        ovg = build_gallery(tag, TAG_TO_NAME[tag], img_ymls, gpath, ppath, picture_path)
        ov.append(ovg)

    with open(gpath / "overview.yml", 'w') as f:
        f.write(yaml.dump(ov))


def build_gallery(tag, gallery_name, all_imgs, gpath, ppath, picture_path):
    if tag == 'all':
        ymls = all_imgs
    else:
        ymls = [yml for yml in all_imgs if tag in yml['keywords']]

    try:
        preview = next(p for p in ymls if p['orientation'] == 'landscape')
    except:
        preview = ymls[0]
    with open(gpath / f"{tag}.yml", 'w') as f:
        f.write(yaml.dump(
            {
                'picture_path': picture_path,
                'preview': preview,
                'pictures': ymls
            }
        ))
    with open(ppath / f"{tag}.md", 'w') as f:
        f.write(GALLERY_MARKDOWN.format(capname=gallery_name, name=tag))

    # return overview yaml
    return {
        'title': gallery_name,
        'directory': picture_path,
        'preview': preview,
        'link': tag
    }


def first(itr):
    for i in itr:
        return i


def get_exif(img):
    return {
        ExifTags.TAGS[k]: v
        for k, v in img.getexif().items()
        if k in ExifTags.TAGS
    }


def get_exif_dt(exif):
    return datetime.strptime(exif['DateTimeOriginal'], '%Y:%m:%d %H:%M:%S').strftime(
        '%Y-%m-%d %H:%M:%S'
    )


def get_exif_caption(exif):
    return exif.get('ImageDescription', '')


def get_keywords(file_path):
    return [
        k.decode('utf-8') for k in IPTCInfo(file_path)['keywords']
    ]


def get_title(file_path):
    title = IPTCInfo(file_path)['object name']
    if title:
        return title.decode('utf-8')
    else:
        return ''


def get_overview_yaml(file_path):
    with open(file_path) as f:
        return yaml.safe_load(f)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('-i', '--input-dir', help='Input directory of images to process')
    parser.add_argument('-o', '--image-dir', default='assets/photos', help='Where to write photos')
    parser.add_argument('-g', '--gallery-dir', default='_data/galleries', help='Where to write the gallery yaml data file')
    parser.add_argument('-p', '--page-dir', default='photography/', help='Where to write the page markdown for the gallery')
    parser.add_argument('-n', '--name', help="Name of the gallery")

    args = parser.parse_args()
    main(args.input_dir, args.image_dir, args.page_dir, args.gallery_dir, args.name)
