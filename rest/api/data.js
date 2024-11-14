import { Router } from "express"; 
let router = Router()

let data = [
    {"id": "1", "Firstname": "Jyri", "Surname": "Kemppainen"},
    {"id": "2","Firstname": "Petri", "Surname": "Laitinen"}

]

/*let filtered = data.find(item => item.id === '1');

let fid = data.findIndex(item => item.id === '2');
data[fid].Firstname = 'Nuevo Nombre';  // Modificar cualquier campo.

let fid = data.findIndex(item => item.id === '2');
data.splice(fid, 1);  // Elimina el registro en el índice encontrado.
*/

router.get('/', (req, res) => {
    res.json( data )
})

router.get('/:id', (req, res) => {
    res.json( data.find(b => b.id ===req.params.id ) )
}) 



router.post('/', (req, res) => {
    
    if (!req.is('application/json')) {
        return res.status(415).json({ "error": "Unsupported Media Type" });  // If it's not JSON, give 415
    }

   
    if (data.find(b => b.id === req.body.id)) {
        return res.status(409).json({ "error": "Record already exists" });  // If it already exists give 409
    }
 
    data.push(req.body);

    res.status(201).json(req.body);
});


// Delete an alament by ID
router.delete('/:id', (req, res) => {
    const placeId = req.params.id;  // Obtain the ID of the URL

    

    const index = data.findIndex(b => b.id === placeId);

    if (index === -1) {
        return res.status(404).json({ "error": "Place not found" });
    }

    
    data.splice(index, 1);
    res.status(200).json({ "message": `Place with ID ${placeId} has been deleted` });
});

router.put('/:id', (req, res) => {
   //Check if the media file is in Json format
    if (!req.is('application/json')) {
        return res.status(415).json({ "error": "Unsupported Media Type" }); 
    }

    const placeId = req.params.id;
    const index = data.findIndex(b => b.id === placeId);  // Find the id to replace

    if (index === -1) {
        // If the id doesn't exist we create it
        const newPlace = { id: placeId, ...req.body };  
        data.push(newPlace);  // We add it in the database
        return res.status(201).json(newPlace);  // Answering with 201 created instead of 200
    }

    // If the ID exists, we replace the info.
    data[index] = { ...data[index], ...req.body };  //  We update the value with the new one
    return res.status(200).json(data[index]);  //We answer with 200 ok and the provided data
});



export default router;