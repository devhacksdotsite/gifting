// scss
import './styles.scss';

// ts
import { modal } from './assets/ts/dialog';

console.log(modal);

// give access to window scope
/*declare global {
   interface Window {
     modalActions: typeof modal;
    }
}

window.modalActions = modal;
*/

