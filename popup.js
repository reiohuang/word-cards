window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['words'], 
    result => {
      const words = Object.keys(result.words);
      document.getElementById('words-count').textContent = words.length;
      document.getElementById('words').textContent = words.join(', ');
    }
  );
});
