async function injectBootstrap() {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.href = chrome.runtime.getURL('lib/css/bootstrap.min.css');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('lib/js/bootstrap.bundle.min.js');
        script.onload = function() {
            this.remove();
            resolve();
        };
        (document.head || document.documentElement).appendChild(script);
    });
}

function removeUnwantedElements() {
    const elementsToRemove = [
      'td[bgcolor="#000000"][width="1"]',
      '#correo',
      '#bloqueo',
      '.titulo',
      'td[width="251"]',
      'td[colspan="3"]',
      'table[align="center"][class="auto-style1"][style="width: 70%"]',
      'table[width="600"][border="0"][cellspacing="0"][cellpadding="0"][align="center"]'
    ];
  
    elementsToRemove.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
  }


function setBackgroundImage() {
    document.body.style.backgroundImage = `url('${IMAGE_PATHS.background}')`;
    document.body.classList.add('background');
  }