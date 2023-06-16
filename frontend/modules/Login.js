import validator from "validator";
// const login = new Login('form-login');
// const register = new Login('.form-register');
// register.init();

export default class Login {
    constructor(formClass){
        this.form = document.querySelector(formClass);
    }
    init(){
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }
    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        
        let error = false;
        
        if(!validator.isEmail(emailInput.value)) {
            alert('E-mail inválido');
            error = true;
        }
        
        if(passwordInput.value.length < 8 || passwordInput.value.length > 50) {
            alert('Sua senha tem que estar entre 8 e 50 caracteres');
            error = true;
        }

        if(el.querySelector('input[name="repeatPassword"]')){
            const repeatPasswordInput = el.querySelector('input[name="repeatPassword"]');
            if(passwordInput.value != repeatPasswordInput.value){
                alert('As senhas não coincidem');
                error = true;
            }
        }

        if(!error) el.submit();
    }
}

const login = new Login('.form-login');
const register = new Login('.form-register');
login.init();
register.init();