// scss
import './styles.scss';

// ts
import { modal } from './assets/ts/dialog';


declare global {
   interface Window {
     modalActions: typeof modal;
    }
}

window.modalActions = modal;


