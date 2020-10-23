// import { create } from "domain";
import {request, Request, Response} from "express";
import {getRepository} from "typeorm"
import Orphanage from "../models/Orphanage";
import OrphanageView from "../views/Orphanages_views";


export default{
  
    async show(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);
        const {id} = req.params;
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        });
 
        return res.json(OrphanageView.render(orphanage));
    },
    async index(req: Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        });

        return res.json(OrphanageView.renderMany(orphanages));
    },
    async create(req: Request, res: Response){
        const {
            name,
            latitude,
            longitude,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;
        
        const orphanagesRepository = getRepository(Orphanage);

        const requestImg = req.files as Express.Multer.File[];
        const images = requestImg.map(image => {
            return {path: image.filename}
        } )
        console.log(images);

        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            open_on_weekends,
            opening_hours,
            instructions,
            images
        });
    
        await orphanagesRepository.save(orphanage);
        return res.json({message: "Dados salvos com sucesso"})
         
    }
}