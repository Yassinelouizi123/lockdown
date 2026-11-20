"""Generates public/audio/<lang>/<hash>.mp3 from scripts/audio-manifest.json using edge-tts.
The sentences are public game content (no personal data). Existing files are skipped.
Usage: python scripts/gen-audio.py"""
import asyncio, json, os, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICES = {"fr": "fr-FR-DeniseNeural", "en": "en-US-AriaNeural", "ar": "ar-SA-ZariyahNeural"}

async def one(sem, item):
    path = os.path.join(ROOT, "public", "audio", item["lang"], item["hash"] + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 500:
        return True
    os.makedirs(os.path.dirname(path), exist_ok=True)
    async with sem:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(item["text"], VOICES[item["lang"]]).save(path)
                return True
            except Exception as e:  # network hiccup: retry
                err = e
                await asyncio.sleep(1.5)
        print("FAILED", item["lang"], item["hash"], err, file=sys.stderr)
        return False

async def main():
    items = json.load(open(os.path.join(ROOT, "scripts", "audio-manifest.json"), encoding="utf-8"))
    sem = asyncio.Semaphore(4)
    results = await asyncio.gather(*(one(sem, i) for i in items))
    print(sum(results), "/", len(items), "ok")

asyncio.run(main())
