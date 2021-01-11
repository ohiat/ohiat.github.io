# Requires pillow and pyyaml, iptcinfo3
# example: python3 -m gallery-script -i ~/Desktop/website -n tanzania
import argparse
import shutil
from pathlib import Path


import yaml
from iptcinfo3 import IPTCInfo
from PIL import ExifTags
from PIL import Image

sizes = [1500]


def main(indir, imgdir, gallery_dir, gallery_name):
    inpath = Path(indir)
    outpath = Path(imgdir) / gallery_name
    gpath = Path(gallery_dir)

    gpath.mkdir(exist_ok=True)
    outpath.mkdir(exist_ok=True)

    img_ymls = []
    for thumbnail in inpath.glob('*-thumbnail.jpg'):
        [title, suffix] = thumbnail.name.split('-thumbnail')
        original = inpath / (title + suffix)
        img = Image.open(original)
        exif = get_exif(img)
        keywords = get_keywords(thumbnail)
        width, height = img.size
        base_name = title.lower().replace(' ', '-')
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
            'caption': exif['ImageDescription'],
            'title': title,
            'keywords': keywords
        }
        img_ymls.append(yml)

    with open(gpath / f"{gallery_name}.yml", 'w') as f:
        f.write(yaml.dump(
            {
                'picture_path': gallery_name,
                'preview': img_ymls[0],
                'pictures': img_ymls
            }
        ))


def get_exif(img):
    return {
        ExifTags.TAGS[k]: v
        for k, v in img.getexif().items()
        if k in ExifTags.TAGS
    }


def get_keywords(file_path):
    return [k.decode('utf-8') for k in IPTCInfo(file_path)['keywords']]


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('-i', '--input-dir', help='Input directory of images to process')
    parser.add_argument('-o', '--image-dir', default='assets/photos', help='Where to write photos')
    parser.add_argument('-g', '--gallery-dir', default='_data/galleries', help='Where to write the gallery yml file')
    parser.add_argument('-n', '--name', help="Name of the gallery")

    args = parser.parse_args()
    main(args.input_dir, args.image_dir, args.gallery_dir, args.name)
