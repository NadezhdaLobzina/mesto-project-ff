(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),p=o.querySelector(".card__image"),c=o.querySelector(".card__title");return p.src=e.link,p.alt=e.name,c.textContent=e.name,o.querySelector(".card__delete-button").addEventListener("click",t),o.querySelector(".card__like-button").addEventListener("click",n),p.addEventListener("click",r),o}function t(e){e.target.closest(".places__item").remove(),e.target.removeEventListener("click",t)}function n(e){e.target.classList.toggle("card__like-button_is-active")}function r(e){if(e.target.classList.contains("popup__close")||e.target.classList.contains("popup")||e.target.classList.contains("popup__button")){var t=document.querySelector(".popup_is-opened");t&&c(t)}}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}function p(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),e.addEventListener("click",r)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),e.removeEventListener("click",r)}var i=document.querySelector(".places__list"),u=(document.querySelectorAll(".popup"),document.querySelector(".popup_type_edit")),a=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),l=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__add-button"),_=u.querySelector(".popup__form"),m=u.querySelector(".popup__input"),y=m.querySelector(".form__input-error"),v=_.querySelector(".popup__input_type_name"),f=_.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=a.querySelector(".popup__form"),g=S.querySelector(".popup__input_type_card-name"),L=S.querySelector(".popup__input_type_url"),E=s.querySelector(".popup__image"),x=s.querySelector(".popup__caption");function b(e){E.src=e.target.src,x.textContent=e.target.alt,E.alt=e.target.alt,p(s)}m.addEventListener("input",(function(){var e;m.validity.valid?function(e){e.classList.remove("popup__input_type_error")}(m):(e=m,m.validationMessage,e.classList.add("popup__input_type_error"),console.log(y))})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,t,n,b);i.append(o)})),l.addEventListener("click",(function(){p(u),v.value=k.textContent,f.value=q.textContent})),d.addEventListener("click",(function(){p(a)})),S.addEventListener("submit",(function(r){r.preventDefault();var o=e({name:g.value,link:L.value},t,n,b);i.prepend(o),c(a),S.reset()})),_.addEventListener("submit",(function e(t){t.preventDefault(),k.textContent=v.value,q.textContent=f.value,t.target.removeEventListener("click",e)}))})();
//# sourceMappingURL=main.js.map