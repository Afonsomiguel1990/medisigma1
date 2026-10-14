import React, { type ComponentProps } from 'react';

export function ArticleTable(props: ComponentProps<'table'>) {
  return <div className="my-6 max-w-full overflow-x-auto" role="region" aria-label="Tabela do artigo; deslize para ver todas as colunas" tabIndex={0}>
    <table {...props} className={`min-w-[28rem] ${props.className || ''}`} />
  </div>;
}
