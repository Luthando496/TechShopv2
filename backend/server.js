import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieparser from 'cookie-parser'
// local imports
import productRoutes from './Routes/ProductRoutes.js'
import db from './config/db.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/OrderRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'



dotenv.config()
db();


const port = process.env.PORT || 8000

const node_env = process.env.NODE_ENV

const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// cookie middleware
app.use(cookieparser())


app.use(morgan('dev'))



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


app.use(notFound)
app.use(errorHandler)



app.listen(port,()=>console.log(`server runnning on  ${port}  ${node_env} ` ))