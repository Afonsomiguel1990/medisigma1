import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resolução Amigável de Litígios | Medisigma',
  description: 'Informações sobre a Resolução Alternativa de Litígios de Consumo (RAL) e as entidades competentes em Portugal.',
};

const litgiosData = [
    {
        title: "CNIACC – Centro Nacional de Informação e Arbitragem de Conflitos de Consumo",
        details: "Competência genérica",
        email: "cniacc@unl.pt",
        web: "http://www.arbitragemdeconsumo.org"
    },
    {
        title: "Centro de Informação, Medição e arbitragem de Conflitos de Consumo do Algarve",
        details: "Área geográfica abrangida – contratos celebrados no Distrito de Faro",
        email: "apoio@consumidoronline.pt",
        web: "http://www.consumidoronline.pt/"
    },
    {
        title: "Centro de Arbitragem de Conflitos de Consumo do Distrito de Coimbra",
        details: "Área geográfica abrangida – contratos celebrados nos municípios de: Arganil, Cantanhede, Coimbra, Condeixa-a-Nova, Figueira da Foz, Góis, Lousã, Mira, Miranda do Corvo, Montemor-o-Velho, Oliveira do Hospital, Penacova, Penela, Soure, Tábua, Vila Nova de Poiares.",
        email: "geral@centrodearbitragemdecoimbra.com",
        web: "http://www.centrodearbitragemdecoimbra.com"
    },
    {
        title: "Centro de Arbitragem de Conflitos de Consumo de Lisboa",
        details: "Área geográfica de abrangência – contratos celebrados na Área Metropolitana de Lisboa: Lisboa, Alcochete, Almada, Amadora, Azambuja, Barreiro, Cascais, Lisboa, Loures, Mafra, Moita, Montijo, Odivelas, Oeiras, Palmela, Seixal, Sesimbra, Setúbal, Sintra e Vila Franca de Xira.",
        email: "juridico@centroarbitragemlisboa.pt / director@centroarbitragemlisboa.pt",
        web: "http://www.centroarbitragemlisboa.pt"
    },
    {
        title: "Centro de Informação de Consumo e Arbitragem do Porto",
        details: "Área geográfica de abrangência – contratos celebrados na Área Metropolitana do Porto: Arouca, Espinho, Gondomar, Maia, Matosinhos, Oliveira de Azeméis, Porto, Póvoa de Varzim, Santa Maria da Feira, Santo Tirso, São João da Madeira, Trofa, Vale de Cambra, Valongo, Vila do Conde e Vila Nova de Gaia.",
        email: "cicap@mail.telepac.pt",
        web: "http://www.cicap.pt"
    },
    {
        title: "Centro de Arbitragem de Conflitos de Consumo do Vale do Ave / Tribunal Arbitral",
        details: "Área geográfica de abrangência – contratos celebrados nos municípios de: Cabeceiras de Basto, Fafe, Felgueiras, Guimarães, Póvoa de Lanhoso, Póvoa de Varzim, Santo Tirso, Trofa, Vila do Conde, Vila Nova de Famalicão, Vizela, Vieira do Minho e Vizela.",
        email: "triave@gmail.com",
        web: "http://www.triave.pt"
    },
    {
        title: "CIAB – Centro de Informação, Arbitragem e Conflitos do Consumo",
        details: "Área geográfica de Amares, Arcos de Valdevez, Barcelos, Braga, Caminha, Esposende, Melgaço, Monção, Montalegre, Paredes de Coura, Ponte da Barca, Póvoa do Lanhoso, Terras do Bouro, Valença, Viana do Castelo, Vila Nova de Cerveira, Vieira do Minho e Vila Verde.",
        email: "geral@ciab.pt",
        web: "http://www.ciab.pt"
    },
    {
        title: "Centro de Arbitragem de Conflitos de Consumo da Madeira",
        details: "",
        email: "centroarbitragem.sras@gov-madeira.pt",
        web: "http://www.srrh.gov-madeira.pt"
    }
];

export default function ResolucaoLitigiosPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Resolução Amigável de Litígios
      </h1>
      <div className="prose dark:prose-invert max-w-none text-justify">
        <p>
          Em caso de litígio, informamos que o consumidor pode recorrer às entidades de Resolução Alternativa de Litígios de consumo identificadas no portal do consumidor, no sítio eletrónico <a href="http://www.consumidor.pt" target="_blank" rel="noopener noreferrer">www.consumidor.pt</a>, ou de Resolução de Litígios de consumo em Linha identificadas no sítio eletrónico <a href="https://webgate.ec.europa.eu/odr" target="_blank" rel="noopener noreferrer">https://webgate.ec.europa.eu/odr</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Entidades de Resolução Alternativa de Litígios</h2>

        <div className="space-y-6">
          {litgiosData.map((entidade, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold">{entidade.title}</h3>
              {entidade.details && <p className="mt-2 text-muted-foreground">{entidade.details}</p>}
              <p className="mt-2"><strong>E-mail:</strong> {entidade.email}</p>
              <p><strong>Web:</strong> <a href={entidade.web} target="_blank" rel="noopener noreferrer">{entidade.web}</a></p>
            </div>
          ))}
        </div>
        
        <p className="mt-8">
            Mais informações em Portal do Consumidor – <a href="http://www.consumidor.pt" target="_blank" rel="noopener noreferrer">www.consumidor.pt</a>
        </p>
      </div>
    </div>
  );
} 