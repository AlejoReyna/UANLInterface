(function() {
    // Create and add a container for the React application
    const root = document.createElement('div');
    root.id = 'react-chrome-app';
    document.body.appendChild(root);
  
    // Load React and ReactDOM from CDN
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@17/umd/react.production.min.js';
    document.head.appendChild(reactScript);
  
    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
    document.head.appendChild(reactDOMScript);
  
    // Load your App component
    const appScript = document.createElement('script');
    appScript.src = chrome.runtime.getURL('App.jsx');
    document.head.appendChild(appScript);
  
    // Wait for scripts to load, then render the app
    reactDOMScript.onload = function() {
      const renderScript = document.createElement('script');
      renderScript.textContent = `
        ReactDOM.render(
          React.createElement(React.StrictMode, null,
            React.createElement(App, null)
          ),
          document.getElementById('react-chrome-app')
        );
      `;
      document.body.appendChild(renderScript);
    };
  
    // Create and inject a <style> tag with CSS
    const style = document.createElement('style');
    style.textContent = `
      /* Here are your custom styles */
      body {
        background-color: #f0f0f0; /* Change background color */
      }
      /* More custom styles */
    `;
    document.head.appendChild(style);
  })();