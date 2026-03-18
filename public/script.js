async function shortenUrl() {
  const input = document.getElementById('urlInput').value.trim();
  const resultDiv = document.getElementById('result');
  const shortLink = document.getElementById('shortLink');
  const errorEl = document.getElementById('error');

  resultDiv.classList.add('hidden');
  errorEl.classList.add('hidden');

  if (!input) {
    showError('// ERROR: NO URL PROVIDED');
    return;
  }

  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: input })
    });

    const data = await response.json();

    if (data.error) {
      showError('// ERROR: ' + data.error.toUpperCase());
      return;
    }

    shortLink.href = data.shortUrl;
    shortLink.textContent = data.shortUrl;
    resultDiv.classList.remove('hidden');

    // Update link count
    updateLinkCount();

  } catch (err) {
    showError('// ERROR: CONNECTION FAILED');
  }
}

async function updateLinkCount() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();
    document.getElementById('totalLinks').textContent = data.total;
  } catch (e) {}
}

function copyLink() {
  const link = document.getElementById('shortLink').textContent;
  navigator.clipboard.writeText(link);
  const btn = document.querySelector('.copy-btn');
  btn.textContent = '[ COPIED! ]';
  setTimeout(() => btn.textContent = '[ COPY ]', 2000);
}

function showError(msg) {
  const errorEl = document.getElementById('error');
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
}

// Load count on page load
updateLinkCount();