const { thoughts, users } = require('../Models');

const thoughtController = {
    //add thoughts
    addThoughts({ params,body }, res) {
        console.log(body);
        thoughts.create(body)
        .then(({_id})=> {
            return users.findOneAndUpdate(
                {_id:params.pizzaId},
                {new:true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No User Found with this ID!'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err));
    },
    //remove thought by id
    removeThought({ params}, res) {
        thoughts.findOneAndDelete({_id:params.thoughtsId})
        .then(deletedThoughts => {
            if(!deletedThoughts) {
                return res.status(404).json ({ message: 'No thought with this ID!'});
            }
        return users.findByIdAndUpdate(
            {_id:params.usersId},
            {$pull:{thoughts: params.thoughtsId}},
            {new:true}
        );
        })
        .then(dbUserData=> {
            if(!dbUserData) {
                res.status(404).json({ Message:'No User Found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //get all thoughts
    getAllThoughts({params,body}, res) {
        thoughts.findAll({})
        .populate({path:'reactions', select:'-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            print(err);
            res.status(500).json(err)
        })
        .then(dbUserData=> {
            if(!dbUserData) {
                res.status(404).json({ Message:'No thought Found with this ID!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //get a thought by ID
    getThoughtById({params}, res) {
        thoughts.findOne({_id:params.id})
        .populate({path:'user',select:"-__v"})
        select("-__v")
        .then(dbUserData => {
            if(dbUserData) {
                res.status(404).json({message:'No thoughts found with this ID'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //update a thought by id
    updateThought({params,body}, res){
        thoughts.findOneAndUpdate({_id:params.id},body,{new:true,runValidators:true})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message:'No thought found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err))

    },

    // Delete a reaction by ID
    deleteReaction({params}, res) {
        thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }
};
module.export=thoughtController