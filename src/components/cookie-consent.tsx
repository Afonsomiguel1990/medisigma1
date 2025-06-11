"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          readOnly: true,
          enabled: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              {
                name: /^_ga/,
              },
              {
                name: "_gid",
              },
            ],
          },
        },
        marketing: {},
      },
      language: {
        default: "pt",
        translations: {
          pt: {
            consentModal: {
              title: "Este site utiliza cookies",
              description:
                'Utilizamos cookies para personalizar conteúdo, fornecer funcionalidades de redes sociais e analisar o nosso tráfego. Ao clicar em "Aceitar", concorda com a nossa <a href="/politica-de-privacidade" target="_blank">Política de Privacidade</a> e <a href="/cookies" target="_blank">Política de Cookies</a>.',
              acceptAllBtn: "Aceitar todos",
              acceptNecessaryBtn: "Rejeitar todos",
              showPreferencesBtn: "Gerir preferências",
            },
            preferencesModal: {
              title: "Preferências de Consentimento",
              acceptAllBtn: "Aceitar todos",
              acceptNecessaryBtn: "Rejeitar todos",
              savePreferencesBtn: "Guardar preferências",
              closeIconLabel: "Fechar modal",
              sections: [
                {
                  title: "Utilização de Cookies",
                  description:
                    "Utilizamos cookies para garantir as funcionalidades básicas do website e para melhorar a sua experiência online. Pode escolher, para cada categoria, se pretende ou não dar o seu consentimento a qualquer momento. Para mais detalhes sobre cookies e outros dados sensíveis, por favor leia a nossa <a href='/politica-de-privacidade' class='cc__link'>política de privacidade</a>.",
                },
                {
                  title: "Cookies estritamente necessários",
                  description:
                    "Estes cookies são essenciais para o funcionamento adequado do nosso site. Sem estes cookies, o site não funcionaria corretamente.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies de Análise e Desempenho",
                  description:
                    "Estes cookies permitem-nos recolher informações sobre como os utilizadores interagem com o nosso site, para que possamos medir e melhorar o desempenho do mesmo.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Cookies de Marketing e Publicidade",
                  description:
                    "Estes cookies são utilizados para lhe apresentar anúncios que sejam relevantes para si e para os seus interesses. Podem também ser utilizados para limitar o número de vezes que vê um anúncio e para ajudar a medir a eficácia de uma campanha publicitária.",
                  linkedCategory: "marketing",
                },
                {
                  title: "Mais informações",
                  description:
                    'Para qualquer questão relacionada com a nossa política de cookies e as suas escolhas, por favor <a class="cc__link" href="/contact">contacte-nos</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}; 