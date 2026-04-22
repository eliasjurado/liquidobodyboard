#!/usr/bin/env python3
"""
Descarga imágenes de Unsplash (libre de derechos, Unsplash License)
para el catálogo de Liquido Bodyboard y las guarda como .webp en /img/
"""
import urllib.request
import os
import sys
from PIL import Image
import io

# Unsplash CDN: parámetros ?w=800&h=600&fit=crop&fm=jpg
# Las fotos son de Unsplash bajo su licencia libre (https://unsplash.com/license)

PHOTOS = {
    # Pro PP Bodyboards — acción en ola
    "1":  "photo-1544551763-77ef2d0cfc6c",  # surfista ola fuerte
    "2":  "photo-1505118380757-91f5f5632de0",  # ola grande azul
    "3":  "photo-1559827291-72ee739d0d9a",  # bodyboard acción
    # Entry PE Bodyboards — iniciación/playa
    "4":  "photo-1502680390469-be75c86b636f",  # surf playa
    "5":  "photo-1507525428034-b723cf961d3e",  # playa tropical clara
    # Leash muñeca / bícep — accesorios
    "6":  "photo-1476673160081-cf065607f449",  # close-up ola
    "7":  "photo-1520390138845-fd2d229dd553",  # agua azul turquesa
    # Wax frío / templado — textura / producto
    "8":  "photo-1519642918688-7e43b19245d8",  # olas espuma blanca
    "9":  "photo-1504825987-f62f1c088b88",  # olas desde arriba
    # Kit iniciación — equipo completo
    "10": "photo-1559827260-4d1b57af4343",  # surf con equipamiento
    # Sección Sobre Nosotros
    "about": "photo-1484965045830-a29a2f0ce1c0",  # grupo de surfers / playa Perú
}

W, H = 800, 600
OUT_DIR = os.path.join(os.path.dirname(__file__), "img")
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
}

def download(photo_id: str, out_path: str):
    import subprocess, tempfile
    url = f"https://images.unsplash.com/{photo_id}?w={W}&h={H}&fit=crop&q=82&fm=jpg"
    print(f"  ↓  {out_path.split('/')[-1]}  ←  {photo_id[:12]}…", end="", flush=True)
    # Usar curl para evitar problemas de certificados SSL en Python 3.9 macOS
    tmp = out_path + ".jpg"
    result = subprocess.run(
        ["curl", "-sL", "-A", "Mozilla/5.0", "--max-time", "30", "-o", tmp, url],
        capture_output=True
    )
    if result.returncode != 0 or not os.path.exists(tmp) or os.path.getsize(tmp) < 1000:
        raise RuntimeError(f"curl falló (código {result.returncode})")
    img = Image.open(tmp).convert("RGB")
    img.save(out_path, "WEBP", quality=82, method=4)
    os.remove(tmp)
    kb = os.path.getsize(out_path) // 1024
    print(f"  ✔  {kb} KB")

errors = []
for key, photo_id in PHOTOS.items():
    out = os.path.join(OUT_DIR, f"{key}.webp")
    try:
        download(photo_id, out)
    except Exception as e:
        print(f"  ✗  ERROR: {e}")
        errors.append(key)

if errors:
    print(f"\n⚠ Fallaron: {errors}. Generando placeholders…")
    for key in errors:
        out = os.path.join(OUT_DIR, f"{key}.webp")
        img = Image.new("RGB", (W, H), color=(26, 26, 26))
        img.save(out, "WEBP", quality=70)
        print(f"  ✔  placeholder  {key}.webp")

print(f"\n✅ Imágenes listas en {OUT_DIR}")
