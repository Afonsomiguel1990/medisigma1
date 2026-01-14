'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function RecruitmentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar se o utilizador já fechou o banner nesta sessão
        const bannerClosed = sessionStorage.getItem('recruitment-banner-closed');
        if (!bannerClosed) {
            setIsVisible(true);
        }
    }, []);

    const closeBanner = () => {
        setIsVisible(false);
        sessionStorage.setItem('recruitment-banner-closed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-primary px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm leading-6 text-primary-foreground flex items-center gap-2">
                    <Briefcase className="h-4 w-4 animate-bounce" />
                    <strong className="font-semibold">Estamos a contratar!</strong>
                    <svg viewBox="0 0 2 2" className="mx-auto h-0.5 w-0.5 fill-current" aria-hidden="true">
                        <circle cx="1" cy="1" r="1" />
                    </svg>
                    Junte-se à nossa equipa e faça a diferença.
                </p>
                <Button asChild variant="secondary" size="sm" className="rounded-full px-3.5 py-1 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-white text-primary hover:bg-gray-100">
                    <Link href="/recrutamento">
                        Ver Ofertas <span aria-hidden="true">&rarr;</span>
                    </Link>
                </Button>
            </div>
            <div className="flex flex-1 justify-end">
                <button
                    onClick={closeBanner}
                    type="button"
                    className="-m-3 p-3 focus-visible:outline-offset-[-4px] text-primary-foreground/80 hover:text-white"
                >
                    <span className="sr-only">Fechar</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
