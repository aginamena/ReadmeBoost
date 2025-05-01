

const filesAndFoldersToIgnore = [
    ".jpg",
    ".png",
    ".css",
    ".scss",
    ".svg",
    ".jpeg",
    ".webp",
    ".ttf",
    ".bluej",
    ".pkg",
    ".ctxt",
    ".xml",
    ".properties",
    ".mf",
    ".class",
    ".ico",
    ".gitignore",
    "node_modules/",
    "package-lock.json",
    ".env",
    "build/",
    "dist/",
    ".vscode/",
    ".DS_Store",
    ".log",
    ".vscode",
    ".pyc",
    ".pyo",
    "__pycache__/",
    "dist/",
  ];
  
  
  export function shouldIgnoreFileOrFolder(path: string): boolean {
  // Regex to allow valid folder and file path extension at the end
    const filePattern = /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9._-]+\.[a-zA-Z0-9]+$/;
      if(!filePattern.test(path))
      return true;
  
    return filesAndFoldersToIgnore.some(
      (ignoreItem) => path.endsWith(ignoreItem) || path.includes(ignoreItem)
    );
  }
  
  export function timeout(milliseconds:number){
      return new Promise((resolve) => setTimeout(resolve, milliseconds)); 
  }
  