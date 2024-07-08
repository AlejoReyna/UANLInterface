document.getElementById('changeColor').addEventListener('click', () => {
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="red"'
    });
  });