'use client';

import { useEffect, useState } from 'react';
import { Contact, Candidatura, Application } from '@/lib/forms';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AdminFormsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch('/api/admin/forms');
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Resposta inválida da API');
      }
      
      if (!response.ok) {
        // Tenta usar a mensagem de erro da API, senão usa mensagem genérica
        throw new Error(data.error || 'Erro ao carregar formulários');
      }
      
      setContacts(data.contacts || []);
      setCandidaturas(data.candidaturas || []);
      setApplications(data.applications || []);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Erro ao carregar formulários:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const showMessage = (message: string) => {
    alert(message);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <p>A carregar formulários...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Formulários Preenchidos</h1>
        <Button onClick={fetchForms} variant="outline">
          Atualizar
        </Button>
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList>
          <TabsTrigger value="contacts">
            Contactos ({contacts.length})
          </TabsTrigger>
          <TabsTrigger value="candidaturas">
            Candidaturas Espontâneas ({candidaturas.length})
          </TabsTrigger>
          <TabsTrigger value="applications">
            Candidaturas ({applications.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab Contactos */}
        <TabsContent value="contacts" className="space-y-4">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Ainda não existem contactos.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Página</TableHead>
                    <TableHead className="text-right">Mensagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="text-sm">
                        {formatDate(contact.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {contact.empresa || '-'}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {contact.email || '-'}
                        </a>
                      </TableCell>
                      <TableCell>
                        {contact.telefone ? (
                          <a
                            href={`tel:${contact.telefone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {contact.telefone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{contact.servico || '-'}</TableCell>
                      <TableCell className="text-sm">
                        {contact.pagina || '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        {contact.mensagem ? (
                          <button
                            onClick={() => showMessage(contact.mensagem || '')}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Ver
                          </button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Tab Candidaturas Espontâneas */}
        <TabsContent value="candidaturas" className="space-y-4">
          {candidaturas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Ainda não existem candidaturas espontâneas.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Área de Interesse</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead className="text-right">Mensagem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidaturas.map((candidatura) => (
                    <TableRow key={candidatura.id}>
                      <TableCell className="text-sm">
                        {formatDate(candidatura.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {candidatura.nome || '-'}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${candidatura.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {candidatura.email || '-'}
                        </a>
                      </TableCell>
                      <TableCell>
                        {candidatura.telefone ? (
                          <a
                            href={`tel:${candidatura.telefone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {candidatura.telefone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{candidatura.area_interesse || '-'}</TableCell>
                      <TableCell>
                        {candidatura.cv_link ? (
                          <a
                            href={candidatura.cv_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ver CV
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {candidatura.mensagem ? (
                          <button
                            onClick={() => showMessage(candidatura.mensagem || '')}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Ver
                          </button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Tab Candidaturas */}
        <TabsContent value="applications" className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Ainda não existem candidaturas para vagas específicas.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Vaga</TableHead>
                    <TableHead>CV</TableHead>
                    <TableHead className="text-right">Carta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="text-sm">
                        {formatDate(application.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {application.name || '-'}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${application.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {application.email || '-'}
                        </a>
                      </TableCell>
                      <TableCell>
                        {application.phone ? (
                          <a
                            href={`tel:${application.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {application.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        {application.job_id ? (
                          <Badge variant="outline">{application.job_id}</Badge>
                        ) : (
                          <span className="text-gray-500">Espontânea</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {application.cv_url ? (
                          <a
                            href={application.cv_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ver CV
                          </a>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {application.cover_letter ? (
                          <button
                            onClick={() => showMessage(application.cover_letter || '')}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            Ver
                          </button>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

