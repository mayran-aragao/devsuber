export default () => ({

    signin:(email,password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                    token:'123',
                };
                resolve(json);
            },1000);
        });
    },

    signup:(name,email,password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                };
                if(email == 'error@hotmail.com'){
                    json.error = 'E-mail já existente!';
                }else{
                    json.token='123';
                }
                resolve(json);
            },1000);
        });
    }

});
