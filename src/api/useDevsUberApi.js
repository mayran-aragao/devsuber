
export default () => ({

    signin:(email,password) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                    token:'123',
                    name:'Mayran aragão'
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
                    json.name = name;
                }
                resolve(json);
            },1000);
        });
    },
    getRequestPrice:(distance)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                };
                
                json.price = distance * 2.5;

                resolve(json);
            },1000);
        });
    },

    findDriver:(options) => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                };
                
                json.driver = {
                    name:'Mayran Aragão',
                    avatar:require('../assets/avatar.jpg'),
                    stars:5,
                    carName:'Civic',
                    carColor:'Branco',
                    carPlate:'AAA-0000'
                }

                resolve(json);
            },1000);
        });
    },
    setRating: () => {
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                let json = {
                    error:'',
                };
                

                resolve(json);
            },1000);
        });
    }

});
