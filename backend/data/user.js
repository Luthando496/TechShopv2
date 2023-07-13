import bcrypt from 'bcryptjs'



const users = [
    {
        name: 'admin user',
        password: bcrypt.hashSync('123456', 10),
        email: 'admin@gmail.com',
        isAdmin:true
    },
    {
        name: 'John Doe',
        password: bcrypt.hashSync('123456', 10),
        email: 'johndoe@example.com',
        isAdmin:false
    },
    {
        name: 'Adam Smith',
        password: bcrypt.hashSync('123456', 10),
        email: 'adam@example.com',
        isAdmin:false
    }
]



export default users;