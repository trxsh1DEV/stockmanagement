export default class Actions {
    constructor() {
        this.copyBtn = document.querySelectorAll('#copyID');
    }
    init() {
        this.events();
    }

    events() {
        // const radios = document.querySelectorAll('.radio-index');

        this.copyBtn.forEach(item => {
            item.addEventListener('click', e => {
                this.copyingId(e);
            });
        });

        // radios.forEach((item,index) => item.addEventListener('change', e => {

        // }));
    }
    copyingId(e){
        const currentProduct = e.target;
        this.copyBtn = currentProduct.nextElementSibling.innerHTML;
        navigator.clipboard.writeText(this.copyBtn);
    }
}

const copyId = new Actions();
copyId.init();



// const form = document.createElement('form');
// form.method="post";                
// form.action="/product/copyid";
// form.setAttribute('class', 'test');
                
// document.querySelector('.formCopy').appendChild(form);

// Esse deu certo kaskdjask
// const form = document.querySelector('.formCopy');
// form.method="post";
// form.action="/product/copyid";
                
// console.log(form, this.copyBtn);
// form.submit();