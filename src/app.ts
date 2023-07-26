import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { userController } from './controller/user-controller';
import { annonceController } from './controller/annonce-controller';
import { empruntController } from './controller/emprunt-controller';




const port = process.env.PORT || 8000;


const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/user', userController);
app.use('/api/annonce', annonceController);
app.use('/api/emprunt', empruntController);


app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});