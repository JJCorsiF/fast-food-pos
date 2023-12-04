import React from "react";

/** We recommend using Layouts unless you have a specific reason to use Template.
 * templates would be a more suitable option than layouts if you need:
 * - Enter/exit animations using CSS or animation libraries.
 * - Features that rely on useEffect (e.g logging page views) and useState (e.g a per-page feedback form).
 * - To change the default framework behavior.
 * For example, Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded
 * and not when switching pages. For templates, the fallback is shown on each navigation.
 */

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
