import React from 'react'
import styles from './styles.module.css'
export * as AfeFields from './components/AfeFields';
export { LOADSTATE, SUBMITSTATE } from './components/AfeFields';
export {default as ListFragmentComponent} from './components/ListFragmentComponent';
export {default as EditPopupFragmentComponent} from './components/EditPopupFragmentComponent';
export {default as Pagination} from './components/Pagination';

export * as AfeFormatter from './util/AfeFormatter';
export * as ErrorManagement from './util/ErrorManagement';
export {default as EventManager} from './util/EventManager';
export {default as MessageBox} from './util/MessageBox';
export {setI18nConfig, _t} from './util/Translator';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component definitvo: {text}</div>
}
