import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productRoutes from './Routes/ProductRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
import db from './config/db.js'
db();


const port = process.env.PORT || 8000

const node_env = process.env.NODE_ENV

const app = express()

app.use(express.json())

app.use(morgan('dev'))



app.use('/api/products', productRoutes)


app.use(notFound)
app.use(errorHandler)



app.listen(port,()=>console.log(`server runnning on  ${port}  ${node_env} ` ))