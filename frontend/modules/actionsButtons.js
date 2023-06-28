export default class Actions {
    constructor() {
        this.copyBtn = document.querySelectorAll('#copyID');
    }
    init() {
        this.events();
    }

    events() {
        this.copyBtn.forEach(item => {
            item.addEventListener('click', e => {
                const currentProduct = e.target;
                this.copyBtn = currentProduct.nextElementSibling.innerHTML;
                navigator.clipboard.writeText(this.copyBtn);

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
            });
        });
    }
}

const login = new Actions();
login.init();