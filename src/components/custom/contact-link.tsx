"use client";

import React from "react";

type ContactType = "email" | "phone" | "whatsapp";

interface ContactLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type: ContactType;
    children: React.ReactNode;
}

export function ContactLink({ type, children, onClick, ...props }: ContactLinkProps) {
    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Ejecutar la función onClick original si existe
        if (onClick) {
            onClick(e);
        }

        // Determinar el endpoint basado en el tipo
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
                // Enviar el request sin esperar la respuesta para no bloquear la navegación
                fetch(endpoint, { method: "POST" }).catch((err) =>
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
