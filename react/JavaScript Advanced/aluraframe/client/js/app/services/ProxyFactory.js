class ProxyFactory {
    static create(object, props, action){
        return new Proxy(object, {
            get(target, prop, receiver){
                if(props.includes(prop) 
                && ProxyFactory._isFunction(target[prop])){
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
                if(props.includes(prop)){
                    action(target); 
                } 
                return Reflect.set(target, prop, value, receiver);
             }
        });
    }

    static _isFunction(param){
        return typeof(param) == typeof(Function);
    }
}