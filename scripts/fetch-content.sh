#!/usr/bin/env bash
set -euo pipefail

if [ -f ".env" ]; then
  set -o allexport
  source .env
  set +o allexport
fi

CONTENT_OWNER="${CONTENT_OWNER:-acwilan}"
CONTENT_REPO="${CONTENT_REPO:-chords-content}"
CONTENT_VERSION="${CONTENT_VERSION:-v0.1.0}"
CONTENT_FILENAME="${CONTENT_FILENAME:-content.zip}"
CONTENT_SHA256="${CONTENT_SHA256:-}"

URL="https://github.com/${CONTENT_OWNER}/${CONTENT_REPO}/releases/download/${CONTENT_VERSION}/${CONTENT_FILENAME}"

mkdir -p tmp
echo "Downloading $URL"
curl -L "$URL" -o tmp/content.zip

if [ -n "$CONTENT_SHA256" ]; then
  echo "Verifying checksum..."
  if [[ "$CONTENT_SHA256" == *" "* ]]; then
    echo "$CONTENT_SHA256" | (cd tmp && shasum -a 256 -c -)
  else
    echo "$CONTENT_SHA256  content.zip" | (cd tmp && shasum -a 256 -c -)
  fi
fi

rm -rf tmp/content
unzip -q tmp/content.zip -d tmp/content

mkdir -p src/content/songs public/charts

if [ -d tmp/content/songs ]; then
  rsync -a --delete --exclude '.keep' tmp/content/songs/ src/content/songs/
fi
if [ -d tmp/content/pdfs ]; then
  rsync -a --delete --exclude '.keep' tmp/content/pdfs/ public/charts/
fi

song_count=$(find src/content/songs -type f ! -name '.keep' | wc -l | tr -d ' ')
pdf_count=$(find public/charts -type f ! -name '.keep' | wc -l | tr -d ' ')
echo "Fetched ${song_count} songs and ${pdf_count} pdfs."
