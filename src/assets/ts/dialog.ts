export const modal = {
  callOpen: () => {
    //  Store the element that has focus when the modal opens. This is necessary in order to put the focus back where it was, once the user closes the modal.
    modal.opener = document.activeElement;
    modal.target = document.activeElement.getAttribute('data-modal');
    openModal();
  },
  callClose: () => {
    closeModal(modal.opener);
  },
  handleOverlayClick: (event) => {
    if (event.target.className === 'cxoverlay') {
      closeModal(modal.opener);
    }
  }
}

function openModal() {
  setVisibile(true);
  setFocus(); 
  setInertBehindModal(true);
}

function closeModal(opener) {
  setVisibile(false);
  setInertBehindModal(false);
  opener.focus();
}

function setVisibile(visible, el) {
  const display = visible ? 'block' : 'none';

  // this need to accept an element id to know which modal to toggle
  //document.querySelector('.cxoverlay').style.display = display;
  document.getElementById(modal.target).style.display = display;
}

function setFocus() {
  // Look also for other elements that can receive focus and could be in a modal dialog. Set focus on the first element we find.
  document.querySelectorAll('.cxmodal button, cxmodal input, cxmodal textarea, cxmodal select')[0].focus();
}

function setInertBehindModal(inert) {  
  const element = document.querySelector('main');
  element.inert = inert;
  element.setAttribute('aria-hidden', inert);
}

function clallIfEscPress(event) {
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
