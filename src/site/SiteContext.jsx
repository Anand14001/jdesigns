import { createContext, useCallback, useContext, useMemo, useState } from "react";

const SiteContext = createContext(null);

/** Site-wide popups: the enquiry form and the brochure form. */
export function SiteProvider({ children }) {
  const [enquiry, setEnquiry] = useState({ open: false, course: null });
  const [brochure, setBrochure] = useState({ open: false, course: null });

  const openEnquiry = useCallback((course = null) => setEnquiry({ open: true, course }), []);
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), []);
  const openBrochure = useCallback((course = null) => setBrochure({ open: true, course }), []);
  const closeBrochure = useCallback(() => setBrochure((b) => ({ ...b, open: false })), []);

  const value = useMemo(
    () => ({ enquiry, openEnquiry, closeEnquiry, brochure, openBrochure, closeBrochure }),
    [enquiry, openEnquiry, closeEnquiry, brochure, openBrochure, closeBrochure]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
