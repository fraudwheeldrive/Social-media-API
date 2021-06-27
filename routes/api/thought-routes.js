

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
.route('/:thoughtID')
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