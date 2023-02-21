// fix types 
export const modal:any = {
  opener: null,
  target: null,
  callOpen: () => {
    //  Store the element that has focus when the modal opens. This is necessary in order to put the focus back where it was, once the user closes the modal.
    modal.opener = document.activeElement;
    modal.target = document.activeElement.getAttribute('data-modal');
    resetModal();
    openModal();
  },
  callClose: () => {
    closeModal(modal.opener);
  },
  handleOverlayClick: (event:any) => {
    if (event.target.className === 'cxoverlay') {
      closeModal(modal.opener);
    }
  }
}

function resetModal() {
  document.querySelectorAll('.cxoverlay').forEach(el => {
    el.style.display = 'none';
  })
}

function openModal() {
  setVisibile(true);
  setFocus(); 
  setInertBehindModal(true);
}

function closeModal(opener:any) {
  setVisibile(false);
  setInertBehindModal(false);
  opener.focus();
}

function setVisibile(visible:any) {
  const display = visible ? 'block' : 'none';

  console.log(modal.target);
  document.getElementById(modal.target).style.display = display;
}

function setFocus() {
  // Look also for other elements that can receive focus and could be in a modal dialog. Set focus on the first element we find.
  document.querySelectorAll('.cxmodal button, cxmodal input, cxmodal textarea, cxmodal select')[0].focus();
}

function setInertBehindModal(inert:any) {  
  const element = document.querySelector('main');
  element.inert = inert;
  element.setAttribute('aria-hidden', inert);
}

function clallIfEscPress(event:any) {
  if(event.key === 'Escape') {
    modal.callClose();
  }
}

function attachEventListener(openButtons, closeButtons, overlay) {
  openButtons.forEach(b => {
    b.addEventListener('click', modal.callOpen);
  });
  closeButtons.forEach(b => {
    b.addEventListener('click', modal.callClose);
  });
  overlay.addEventListener('click', modal.handleOverlayClick);
  window.addEventListener('keydown', clallIfEscPress);
}

const openButtons = document.querySelectorAll('.cxmodal__open');
const closeButtons = document.querySelectorAll('.cxmodal__close');
const overlay = document.querySelector('.cxoverlay');
attachEventListener(openButtons, closeButtons, overlay);
