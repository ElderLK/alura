export class ProxyFactory {
    static create(objeto, props, action) {

        return new Proxy(objeto, {

            get(target, prop, receiver){

                if(props.includes(prop) 
                && ProxyFactory._ehFuncao(target[prop])){

                    return function() {
                        console.log(`O methodo ${prop} foi interceptado`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        action(target); 
                        return retorno;
                    }
                }
                
                return Reflect.get(target, prop, receiver);
             },

             set(target, prop, value, receiver){
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)){
                    action(target); 
                } 
                return retorno;
             }
        });
    }

    static _ehFuncao(func) {
        
        return typeof(func) == typeof(Function);
    }
}