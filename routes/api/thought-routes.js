
// /api/thoughts
// get all 
// get single by __id
// post to create new thought -> push to associated users thoughts array Field
// put to upde thought by __id
// delete to remove a thought by its _id 

const ThoughtSchema = require("../../models/Thought")

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');
const router = require("./user-routes");

router
.route('/')
.get(getAllThought)
.post(addThought)

router
route('/:thoughtID')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

router
.route('/:thoughtId/reactions')
.post(addReaction)

router
.route('/:thoughtId/reactions/:reactionID')
.delete(removeReaction)

module.exports = router; 