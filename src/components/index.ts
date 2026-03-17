/**
 * Exportação centralizada dos componentes
 * 
 * Permite importar assim:
 * import { ConsultaCard } from './src/components';
 * 
 * Em vez de:
 * import ConsultaCard from './src/components/ConsultaCard';
 */

export { default as ConsultaCard } from "./ConsultaCard";

/**
 * Conforme criarmos mais componentes, adicionaremos aqui:
 * 
 * export { default as Loading } from "./Loading";
 * export { default as EmptyState } from "./EmptyState";
 * export { default as Header } from "./Header";
 */