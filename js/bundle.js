!function(){"use strict";function e(e,t){const n=document.querySelector(e);n.classList.add("show"),n.classList.remove("hide"),document.body.style.overflow="hidden",t&&clearInterval(t)}function t(e){const t=document.querySelector(e);t.classList.add("hide"),t.classList.remove("show"),document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>e(".modal",n)),2e5);(function(e,t,n,o){const s=document.querySelectorAll(e),a=document.querySelectorAll(t),r=document.querySelector(n);function c(){a.forEach((e=>{e.classList.add("hide"),e.classList.remove("show")})),s.forEach((e=>{e.classList.remove(o)}))}function i(e=0){a[e].classList.add("show","fade"),a[e].classList.remove("hide"),s[e].classList.add(o)}c(),i(),r.addEventListener("click",(t=>{const n=t.target;n&&n.classList.contains(e.slice(1))&&s.forEach(((e,t)=>{n===e&&(c(),i(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(n,o,s){const a=document.querySelectorAll(n),r=document.querySelector(o);r.addEventListener("click",(e=>{e.target!==r&&""!==e.target.getAttribute("data-close")||t(o)})),a.forEach((t=>{t.addEventListener("click",(()=>e(o,s)))})),document.addEventListener("keydown",(e=>{"Escape"===e.code&&r.classList.contains("show")&&t(o)})),window.addEventListener("scroll",(function t(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight&&(e(o,s),window.removeEventListener("scroll",t))}))}("[data-modal]",".modal",n),function(e,t){function n(e){return e>=0&&e<10?"0"+e:e}!function(e,t){const o=document.querySelector(e),s=o.querySelector("#days"),a=o.querySelector("#hours"),r=o.querySelector("#minutes"),c=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const e=function(e){const t=Date.parse(e)-Date.parse(new Date),n=Math.floor(t/864e5),o=Math.floor(t/1e3%60),s=Math.floor(t/1e3/60%60);return{total:t,days:n,hours:Math.floor(t/36e5%24),minutes:s,seconds:o}}(t);s.innerHTML=n(e.days),a.innerHTML=n(e.hours),r.innerHTML=n(e.minutes),c.innerHTML=n(e.seconds),e.total<=0&&clearInterval(i)}l()}(e,t)}(".timer","2021-04-20"),function(){const e=document.querySelector(".calculating__result span");let t,n,o,s,a;function r(){e.textContent=t&&n&&o&&s&&a?"female"===t?Math.round(447.6+9.2*o+3.1*n-4.3*s*a):Math.round(88.36+13.4*o+4.8*n-5.7*s*a):"Insert all data"}function c(e,t){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t)}))}function i(e,n){const o=document.querySelectorAll(`${e} div`);o.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(a=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"))):(t=e.target.getAttribute("id"),localStorage.setItem("sex",e.target.getAttribute("id"))),o.forEach((e=>{e.classList.remove(n)})),e.target.classList.add(n),r()}))}))}function l(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?t.style.border="1px solid red":t.style.border="none",t.getAttribute("id")){case"height":n=+t.value;break;case"weight":o=+t.value;break;case"age":s=+t.value}r()}))}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?a=localStorage.getItem("ratio"):(a=1.375,localStorage.setItem("ratio",1.375)),r(),c("#gender div","calculating__choose-item_active"),c(".calculating__choose_big div","calculating__choose-item_active"),i("#gender","calculating__choose-item_active"),i(".calculating__choose_big","calculating__choose-item_active"),l("#height"),l("#weight"),l("#age")}(),function(){class e{constructor(e,t,n,o,s,a,...r){this.img=e,this.altimg=t,this.title=n,this.descr=o,this.price=s,this.parent=document.querySelector(a),this.classes=r,this.rate=28,this.exchangeToUAH()}exchangeToUAH(){this.price*=this.rate}render(){const e=document.createElement("div");0===this.classes.length?(this.element="menu__item",e.classList.add(this.element)):this.classes.forEach((t=>{e.classList.add(t),this.element="menu__item",e.classList.add(this.element)})),e.innerHTML=`\n                <img src=${this.img} alt=${this.altimg}>\n                <h3 class="menu__item-subtitle">${this.title}</h3>\n                <div class="menu__item-descr">${this.descr}</div>\n                    <div class="menu__item-divider"></div>\n                    <div class="menu__item-price">\n                        <div class="menu__item-cost">Цена:</div>\n                        <div class="menu__item-total"><span>${this.price}</span> UAH/день</div>\n            `,this.parent.append(e)}}(async function(e){const t=await fetch(e);if(!t.ok)throw new Error(`Could not fetch ${e}, status: ${t.status}`);return await t.json()})("http://localhost:3000/menu").then((t=>{t.forEach((({img:t,altimg:n,title:o,descr:s,price:a})=>{new e(t,n,o,s,a,".menu .container").render()}))}))}(),function(n,o){function s(n){const s=document.querySelector(".modal__dialog");s.classList.add("hide"),e(".modal",o);const a=document.createElement("div");a.classList.add("modal__dialog"),a.innerHTML=`\n            <div class="modal__content">\n                 <div class="modal__close" data-close>&#10006;</div>\n                <div class="modal__title">${n}</div>\n            </div>\n       `,document.querySelector(".modal").append(a),setTimeout((()=>{a.remove(),s.classList.add("show"),s.classList.remove("hide"),t(".modal")}),4e3)}document.querySelectorAll(n).forEach((e=>{var t;(t=e).addEventListener("submit",(e=>{e.preventDefault();const n=document.createElement("div");n.classList.add("status"),n.textContent="loading..",t.append(n);const o=new FormData(t);(async(e,t)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:t});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((e=>{console.log(e),s("Thanks"),n.remove()})).catch((()=>{s("404")})).finally((()=>{t.reset()}))}))})),fetch("http://localhost:3000/menu").then((e=>e.json())).then((e=>console.log(e))),fetch("http://localhost:3000/requests").then((e=>e.json())).then((e=>console.log(e)))}("form",n),function({container:e,nextArrow:t,prevArrow:n,slide:o,totalCounter:s,currentCounter:a,wrapper:r,inner:c}){const i=document.querySelectorAll(o),l=document.querySelector(e),d=document.querySelector(n),u=document.querySelector(t),m=document.querySelector(a),h=document.querySelector(s),g=document.querySelector(r),f=document.querySelector(c),p=window.getComputedStyle(g).width;let v=1,y=0;i.length<10?h.textContent=`0${i.length}`:(h.textContent=i.length,m.textContent=`0${v}`),l.style.position="relative",f.style.width=100*i.length+"%",f.style.display="flex",f.style.transition="0.5s all",g.style.overflow="hidden",i.forEach((e=>{e.style.width=p}));const _=document.createElement("ol"),L=[];function w(e){return+e.replaceAll("px","")}u.addEventListener("click",(()=>{y===w(p)*(i.length-1)?y=0:y+=w(p),v===i.length&&(v=0),v++,S()})),d.addEventListener("click",(()=>{0===y?y=w(p)*(i.length-1):y-=w(p),1===v&&(v=i.length+1),v--,S()})),_.style.cssText="\n                position: absolute;\n                right: 0;\n                bottom: 0;\n                left: 0;\n                z-index: 15;\n                display: flex;\n                justify-content: center;\n                margin-right: 15%;\n                margin-left: 15%;\n                list-style: none;\n    ",l.append(_);for(let e=0;e<i.length;e++){const t=document.createElement("li");t.setAttribute("data-slide-to",e+1),t.style.cssText="\n                box-sizing: content-box;\n                flex: 0 1 auto;\n                width: 30px;\n                height: 6px;\n                margin-right: 3px;\n                margin-left: 3px;\n                cursor: pointer;\n                background-color: #fff;\n                background-clip: padding-box;\n                border-top: 10px solid transparent;\n                border-bottom: 10px solid transparent;\n                opacity: .5;\n                transition: opacity .6s ease;\n        ",_.append(t),0===e&&(t.style.opacity="1"),L.push(t)}function S(){m.textContent=v<10?`0${v}`:v,L.forEach((e=>e.style.opacity="0.5")),L[v-1].style.opacity="1",f.style.transform=`translateX(-${y}px)`}L.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-slide-to");v=t,y=w(p)*(t-1),S()}))}))}({container:".offer__slider",nextArrow:".offer__slider-next",prevArrow:".offer__slider-prev",slide:".offer__slide",totalCounter:"#total",currentCounter:"#current",wrapper:".offer__slider-wrapper",inner:".offer__slider-inner"})}))}();
//# sourceMappingURL=bundle.js.map