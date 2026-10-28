#!/usr/bin/env bash
# Render resume/Stanley_resume.html to public/resume/Stanley_resume.pdf with headless Chrome.
set -euo pipefail
cd "$(dirname "$0")/.."
google-chrome --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 \
  --print-to-pdf=public/resume/Stanley_resume.pdf "file://$PWD/resume/Stanley_resume.html"
pdfinfo public/resume/Stanley_resume.pdf | grep Pages
