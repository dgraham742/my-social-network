const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../Controllers/thoughts-controllers');

router.route('/').get(getAllThoughts);

router.route(':id').get(getThoughtById).put(updateThoughts).delete(deleteThoughts);

router.route('/:userId').post(addThoughts);

router.route('/thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reaactionsId').delete(deleteReaction)

module.exports = router