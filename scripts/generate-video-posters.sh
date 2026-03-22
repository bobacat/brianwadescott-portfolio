#!/bin/bash
# Generate poster frames from WebM videos (for mobile iOS — canvas-based generation produces black)
# Requires ffmpeg: brew install ffmpeg
# Usage: ./scripts/generate-video-posters.sh [project-slug]
# Example: ./scripts/generate-video-posters.sh dr-pepper

set -e
PROJECT="${1:-dr-pepper}"
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/work/$PROJECT"

if [[ ! -d "$DIR" ]]; then
  echo "Directory not found: $DIR"
  exit 1
fi

for webm in "$DIR"/*.webm; do
  [[ -f "$webm" ]] || continue
  base=$(basename "$webm" .webm)
  out="$DIR/${base}_poster.jpg"
  echo "Generating poster for $base..."
  ffmpeg -y -i "$webm" -ss 0.5 -vframes 1 -q:v 2 "$out" 2>/dev/null || \
  ffmpeg -y -i "$webm" -ss 0 -vframes 1 -q:v 2 "$out" 2>/dev/null
  echo "  -> ${base}_poster.jpg"
done

echo "Done. Add poster: /work/$PROJECT/[name]_poster.jpg to each video in content/work/$PROJECT.mdx"
