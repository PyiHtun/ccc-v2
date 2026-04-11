import React, { useEffect, useMemo, useState } from "react";
import en from "./en";
import my from "./my";
import el from "./el";
import tr from "./tr";
import { I18nContext } from "./context";

const LS_LANG_KEY = "ccc-lang";
const dictionaries = { en, my, el, tr };

function getByPath(source, path) {
  if (!path) return source;
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), source);
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(LS_LANG_KEY);
    return saved && dictionaries[saved] ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem(LS_LANG_KEY, language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const value = useMemo(() => {
    const dictionary = dictionaries[language] || dictionaries.en;
    const t = (key, fallback) => {
      const resolved = getByPath(dictionary, key);
      return resolved !== undefined ? resolved : fallback ?? key;
    };
    return { language, setLanguage, t };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
