'use client';

import React, { useState } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Clock, Briefcase, X } from 'lucide-react';

export interface Job {
    id: string;
    title: string;
    location: string;
    type: string;
    description: {
        intro?: string;
        requirements?: string[];
        responsibilities?: string[];
    };
    published_at: string;
}

export default function JobsList({ initialJobs, onApplyClick }: { initialJobs: Job[], onApplyClick?: (jobId: string) => void }) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Helper to handle apply click
    const handleApply = (jobId: string) => {
        // If onApplyClick provided, use it (closes modal if open)
        if (onApplyClick) {
            setSelectedJob(null);
            onApplyClick(jobId);
        }
    };

    if (initialJobs.length === 0) {
        return (
            <div className="bg-muted/50 rounded-xl p-12 text-center">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                    Nenhuma oportunidade disponível
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    De momento não temos posições em aberto, mas encorajamos candidaturas espontâneas.
                    Mantemos o seu CV na nossa base de dados para futuras oportunidades.
                </p>
                <Button variant="outline" asChild className="hover:bg-primary hover:text-primary-foreground">
                    <a href="mailto:geral@medisigma.pt?subject=Candidatura espontânea">Enviar Candidatura Espontânea</a>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {initialJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                        <div className="p-6 md:flex-grow">
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    {job.type}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                    <MapPin className="w-3 h-3 mr-1" /> {job.location}
                                </span>
                            </div>
                            <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                            <p className="text-muted-foreground line-clamp-2 mb-4">
                                {job.description.intro || "Consulte os detalhes desta oportunidade e junte-se à nossa equipa."}
                            </p>

                            <div className="flex items-center text-sm text-muted-foreground gap-4">
                                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Publicado em {new Date(job.published_at).toLocaleDateString('pt-PT')}</span>
                            </div>
                        </div>
                        <div className="p-6 bg-muted/30 md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l">
                            <Button onClick={() => setSelectedJob(job)} variant="outline" className="w-full">
                                Ver Detalhes
                            </Button>
                            <Button onClick={() => handleApply(job.id)} className="w-full">
                                Enviar Candidatura
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}

            {/* Modal de Detalhes */}
            {selectedJob && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl flex flex-col">
                        <div className="sticky top-0 bg-background z-10 px-6 py-4 border-b flex items-center justify-between">
                            <h2 className="text-xl font-bold">Detalhes da Vaga</h2>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="p-1 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-1">{selectedJob.title}</h3>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {selectedJob.location}</span>
                                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {selectedJob.type}</span>
                                    </div>
                                </div>

                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <p>{selectedJob.description.intro}</p>

                                    {selectedJob.description.requirements && (
                                        <>
                                            <h4 className="font-bold text-foreground mt-4 mb-2">Requisitos:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {selectedJob.description.requirements.map((req, i) => (
                                                    <li key={i}>{req}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {selectedJob.description.responsibilities && (
                                        <>
                                            <h4 className="font-bold text-foreground mt-4 mb-2">Responsabilidades:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {selectedJob.description.responsibilities.map((res, i) => (
                                                    <li key={i}>{res}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>

                                <div className="pt-6 border-t flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => handleApply(selectedJob.id)} size="lg" className="flex-grow">
                                        Enviar Candidatura
                                    </Button>
                                    <Button onClick={() => setSelectedJob(null)} variant="ghost" size="lg">
                                        Fechar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
