import express from 'express'
import { Exercise } from '../models/exerciseModel.js';
const router = express.Router();
router.post('/exercises', async (request, response) => {
    try {
        if (
            !request.body.Exercise ||
            !request.body.Weight ||
            !request.body.NumOfSet ||
            !request.body.NumOfRep
        ){
            return response.status(400).send({
                message: 'Send all required fields: excercise name, weight, set and repetitons',
            });
        }
        const newExercise = {
            Exercise: request.body.Exercise,
            Weight: request.body.Weight,
            NumOfSet: request.body.NumOfSet,
            NumOfRep: request.body.NumOfRep,
        };
        const exercise = await Exercise.create(newExercise);
        return response.status(201).send(exercise);
        //return response.status(201).send('hello');
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.get('/', async (request, response) => {
    try{
        const exercises = await Exercise.find({});
        return response.status(200).json({
            count: exercises.length,
            data: exercises
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const exercise = await Exercise.findById(id);
        return response.status(200).json(exercise);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.Exercise ||
            !request.body.Weight ||
            !request.body.NumOfSet ||
            !request.body.NumOfRep
        ){
        return response.status(400).send({message: 'Send all required fields: excercise name, weight, set and repetitons',}); 
        }
        const { id } = request.params;
        const result = await Exercise.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Exercise not found'});
        }
        return response.status(200).send({message: 'Exercise updated successfully'});
    } 
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});
router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Exercise.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Book not found'});
        }
        return response.status(200).send({message: 'Exercise deleted succesfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message : error.message});
    }
});

export default router;