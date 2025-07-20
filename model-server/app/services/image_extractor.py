import fitz
import os
from PIL import Image
import io


def extract_images(pdf_path):
    doc = fitz.open(pdf_path)
    image_paths = []

    for page_index in range(len(doc)):
        page = doc[page_index]
        images = page.get_images(full=True)

        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            ext = base_image["ext"]
            image = Image.open(io.BytesIO(image_bytes))

            filename = f"page{page_index+1}_img{img_index+1}.{ext}"
            path = os.path.join("uploads", filename)
            image.save(path)
            image_paths.append(path)

    return image_paths
