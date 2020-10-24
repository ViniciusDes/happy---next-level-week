// import { create } from "domain";
import {Request, Response} from "express";
import {getRepository} from "typeorm"
import Orphanage from "../models/Orphanage";
import OrphanageView from "../views/Orphanages_views";
import * as Yup from "yup";

export default{
  
    async show(req: Request, res: Response){//so retorna um orfanato
        const orphanagesRepository = getRepository(Orphanage);
        const {id} = req.params;//pegando a id do parametro passado na requisição
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

        const data = {
            name,
            latitude,
            longitude,
            open_on_weekends,
            opening_hours,
            instructions,
            images
        }
        
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required("instrução é obrigadore"),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false,//para retornar o erro de todos os campos e nao somente de um em um
        })
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
        return res.json({message: "Dados salvos com sucesso"})
         
    }
}