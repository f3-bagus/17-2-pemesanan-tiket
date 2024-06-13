export const loadCSS = (href) => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      link.setAttribute('data-dynamic', 'true');
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Gagal memuat stylesheet: ${href}`));
      document.head.appendChild(link);
    });
  };
  
  export const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-dynamic', 'true');
      script.onload = () => resolve();
      script.onerror = () => {
        console.error(`Gagal memuat script: ${src}`);
        reject(new Error(`Gagal memuat script: ${src}`));
      };
      document.body.appendChild(script);
    });
  };
  
  export const cleanUpFiles = (fileNames) => {
    document.querySelectorAll('link[data-dynamic="true"]').forEach(link => {
      if (fileNames.some(fileName => link.href.includes(fileName))) {
        link.parentElement.removeChild(link);
      }
    });
    document.querySelectorAll('script[data-dynamic="true"]').forEach(script => {
      if (fileNames.some(fileName => script.src.includes(fileName))) {
        script.parentElement.removeChild(script);
      }
    });
  };
  