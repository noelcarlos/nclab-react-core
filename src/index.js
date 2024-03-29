import React from 'react'
import styles from './styles.module.css'

export * as AfeFields from './components/AfeFields';
export { LOADSTATE, SUBMITSTATE } from './components/AfeFields';
export {default as ListFragmentComponent, FilterTagList, ListFragmentViewType, ListFragmentFilterBuilder } from './components/ListFragmentComponent';
export {default as EditPopupFragmentComponent} from './components/EditPopupFragmentComponent';
export {default as Pagination} from './components/Pagination';

export * as Card from './components/Card';
export * as AfeForms from './util/AfeForms';
export * as AfeFormatter from './util/AfeFormatter';
export * as ErrorManagement from './util/ErrorManagement';
export {default as EventManager} from './util/EventManager';
export {default as MessageBox} from './util/MessageBox';
export {setI18nConfig, _t} from './util/Translator';
export {default as MenuGroupButtons} from './components/MenuGroupButtons';
export {default as MenuStageButtons} from './components/MenuStageButtons';
export { TabList, TabItem } from './components/Tabs';
export { StaticField } from './components/StaticField';
export { AfeFormMessage, AfeLoading } from './components/AfeFormMessage';
export {default as AfePopupComponent} from './components/AfePopupComponent';

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component definitvo: {text}</div>
}
