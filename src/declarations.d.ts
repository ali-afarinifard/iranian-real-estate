// CSS Modules
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// CSS side-effect imports (e.g. import './globals.css')
declare module '*.css';

// SCSS Modules
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// Image files
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}