// "use client";

// import { ThemeProvider } from "next-themes";

// export function Providers({ children }) {
//   return (
//     <ThemeProvider
//       attribute="class"
//       defaultTheme="dark"
//       enableSystem={false}
//       disableTransitionOnChange
//     >
//       {children}
//     </ThemeProvider>
//   );
// }

"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}