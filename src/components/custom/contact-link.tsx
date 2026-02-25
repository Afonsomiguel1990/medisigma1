"use client";

import React from "react";

type ContactType = "email" | "phone" | "whatsapp";

interface ContactLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    type: ContactType;
    pagina?: string;
    children: React.ReactNode;
}

// GA4 event names (snake_case, as per GA4 best practices)
const GA4_EVENT_MAP: Record<ContactType, string> = {
    whatsapp: "whatsapp_click",
    phone: "phone_click",
    email: "email_click",
};

export function ContactLink({ type, pagina, children, onClick, ...props }: ContactLinkProps) {
    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Executar a função onClick original se existir
        if (onClick) {
            onClick(e);
        }

        const pageLabel = pagina || document.title || "";
        const pageUrl = window.location.pathname || "";

        // 1. Send GA4 event
        try {
            if (typeof window !== "undefined" && typeof window.gtag === "function") {
                window.gtag("event", GA4_EVENT_MAP[type], {
                    event_category: "contact",
                    contact_method: type,
                    page_title: pageLabel,
                    page_location: pageUrl,
                });

                // Also send generate_lead for better GA4 attribution
                window.gtag("event", "generate_lead", {
                    currency: "EUR",
                    value: 0,
                    lead_source: type,
                    page_title: pageLabel,
                });
            }
        } catch (gaError) {
            console.error("GA4 tracking error:", gaError);
        }

        // 2. Send to Supabase tracking
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
                    pagina: pageLabel,
                    url: pageUrl,
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
