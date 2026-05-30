import urllib.request
import json
import os

images_to_fetch = {
    "fries": "French_fries",
    "mozzarella": "Mozzarella_sticks",
    "nuggets": "Chicken_nuggets",
    "falafel": "Falafel",
    "olive": "Olive_ascolane",
    "onionrings": "Onion_rings",
    "crab": "Crab_meat",
    "chickenwings": "Buffalo_wings",
    "jalapeno": "Jalapeno_poppers",
    "friedfood": "Fritto_misto"
}

os.makedirs('assets', exist_ok=True)

for key, title in images_to_fetch.items():
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=400"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'thumbnail' in page:
                img_url = page['thumbnail']['source']
                urllib.request.urlretrieve(img_url, f"assets/frittura_{key}.jpg")
                print(f"Downloaded {key} from {img_url}")
            else:
                print(f"No image found for {title}")
    except Exception as e:
        print(f"Failed to fetch {key}: {e}")
