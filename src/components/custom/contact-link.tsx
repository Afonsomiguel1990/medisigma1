"use client";

import React from "react";

type ContactType = "email" | "phone" | "whatsapp";

interface ContactLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type: ContactType;
    pagina?: string;
    children: React.ReactNode;
}

export function ContactLink({ type, pagina, children, onClick, ...props }: ContactLinkProps) {
    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Executar a função onClick original se existir
        if (onClick) {
            onClick(e);
        }

        // Determinar o endpoint baseado no tipo
        let endpoint = "";
        switch (type) {
            case "email":
                endpoint = "/api/track-email";
                break;
            case "phone":
                endpoint = "/api/track-phone";
                break;
            case "whatsapp":
                endpoint = "/api/track-whatsapp";
                break;
        }

        if (endpoint) {
            try {
                const trackingData = {
                    pagina: pagina || document.title || "",
                    url: window.location.pathname || "",
                };

                fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(trackingData),
                }).catch((err) =>
                    console.error(`Failed to track ${type} click:`, err)
                );
            } catch (error) {
                console.error(`Error initiating ${type} tracking:`, error);
            }
        }
    };

    return (
        <a {...props} onClick={handleClick}>
            {children}
        </a>
    );
}
