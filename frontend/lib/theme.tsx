"use client"

import { createContext, useContext, useLayoutEffect, useSyncExternalStore } from "react"

export type AppTheme = "light" | "dark"

const STORAGE_KEY = "theme"
const listeners = new Set<() => void>()

function readStoredTheme(): AppTheme {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light"
}

function emitThemeChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      listener()
    }
  }

  window.addEventListener("storage", handleStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorage)
  }
}

function applyTheme(theme: AppTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

function setStoredTheme(theme: AppTheme) {
  window.localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
  emitThemeChange()
}

const ThemeContext = createContext<{
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
}>({
  theme: "light",
  setTheme: () => {},
})

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore<AppTheme>(subscribe, readStoredTheme, () => "light")

  useLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setStoredTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useAppTheme = () => useContext(ThemeContext)
