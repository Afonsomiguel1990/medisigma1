"use client";
import React from "react";
import { trackContactClick } from "@/lib/analytics/client";
interface ContactLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
 type: "email" | "phone" | "whatsapp"; pagina?: string; serviceKey?: string; children: React.ReactNode;
}
export function ContactLink({ type, pagina: _pagina, serviceKey, children, onClick, ...props }: ContactLinkProps) {
 void _pagina;
 return <a {...props} onClick={e => { onClick?.(e); if (!e.defaultPrevented) trackContactClick(type, serviceKey); }}>{children}</a>;
}
