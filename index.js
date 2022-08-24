/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys,objects) => {

    return Array.from(objects).map((obj)=>{

        return Object.keys(obj)
                    .filter(k=>keys.indexOf(k) < 0)
                    .reduce((pre,curr)=>{
                        return {...pre,[curr]:obj[curr]}
                    },{})

    })

};
exports.excludeByProperty = (excludeKey,objects) => {

    return objects.filter((obj)=>{
        return Object.keys(obj)
                    .indexOf(excludeKey) < 0 
    })

};
exports.sumDeep = (objects) => {

        return objects.map((obj)=>{
            return {
                objects:Array.from(obj.objects).reduce((pre,curr)=>{
                    return pre + curr.val
                },0)
            }
        })
};
exports.applyStatusColor = (colorObj,objects) => {

    const colorMap = Object.keys(colorObj).reduce((pre,curr)=>{
        return {...pre,...colorObj[curr].reduce((p,c)=>{
            return {
                ...p,
                [c]:curr
            }
        },{})} 
    },{})
    
    return objects.filter(x=>colorMap[x.status]).map((obj)=>{
        return {
            ...obj
            ,color:colorMap[obj.status]
        }
    })

};
exports.createGreeting = (fn,greeting) => {
    return function(name){
        return fn(greeting,name)
    }
};
exports.setDefaults = (defaults) => {

    return (obj)=>{
            return {
                ...defaults,
                ...obj
        }
    }

};
exports.fetchUserByNameAndUsersCompany = (name,services) => {
    return new Promise(async(resolve,reject) =>{
       const user = (await services.fetchUsers()).filter(u=>u.name == name)[0]
       const company = await services.fetchCompanyById(user.companyId)
        const status = await services.fetchStatus() 
        resolve({
            company,
            status,
            user
        })
    })
};
