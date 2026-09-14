'use client';
import * as CookieConsent from 'vanilla-cookieconsent';

export function CookiePreferencesButton() {
  return <button type="button" className="cc__btn" onClick={() => CookieConsent.showPreferences()}>
    Alterar Consentimento de Cookies
  </button>;
}
