import dataMock from '../../data/data.json'
import _ from 'lodash'
import mongoose from 'mongoose'

const Hotels = mongoose.model('Hotels');

class HotelsController {
    list = async ({query}, res) => {
        let response = [];
        if(process.env.DEV == "true" || process.env.DEV == "TRUE") response = dataMock;
        else response = await Hotels.find();
        if(!_.isEmpty(query)){
            if(query.stars){
                query.stars = JSON.parse(query.stars);
            }
            if(query.stars || query.name){
                response = response.filter(({name, stars}) => {
                    if(query.stars && query.stars.length && !(query.stars.includes(stars))) return false;
                    if(query.name && !(name.toLowerCase().includes(query.name.toLowerCase()))) 
                        return false;
                    return true;
                })
            }
        }
        res.json(response);
    };

    get = async ({params: {id}}, res) => res.json(await Hotels.findById(id));

    create = async ({body}, res) => res.json(await Hotels.create(body));

    update = async ({body, params: {id}}, res) => 
        res.json(await Hotels.findByIdAndUpdate(id, body, {new: true}));

    delete = async ({params: {id: _id}}, res) => {
        await Hotels.remove({_id});
        res.json({msj: "Hotel eliminado con exito"});
    }
}

export default new HotelsController