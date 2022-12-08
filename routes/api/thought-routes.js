const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThoughts,
    updateThought,
    removeThought,
    addReaction,
    deleteReaction
} = require('../../Controllers/thoughts-controllers');

router.route('/').get(getAllThoughts);

router.route(':id').get(getThoughtById).put(updateThought).delete(removeThought);

router.route('/:userId').post(addThoughts);

router.route('/thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction)

module.exports = router