const { Thought } = require("../models");

const thoughtController = {

     // get all Thoughts

  getAllThought(req, res) {
    Thought.find({})
    .populate({ 
        path: 'thought',
        select: '-__v'
    })
    .select('-__v')
    .sort({_id: -1})
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log (err);
        res.sendStatus(400);
    }
    );
},


// get one Thought by id 
getThoughtById ({ params }, res) {
  Thought.findOne({ _id: params.thoughtId })
  .populate({
      path: "friends",
      path: "thoughts",
      select: "-__v"
  })
  .select(-__v)
  .then(dbThoughtData => {
      if(!dbThoughtData) {
          res.status(404).json({ message: ' No Thought found with this id'});
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
},
//create Thought

addThought({ body }, res) {
    Thought.create(body)
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            {_id: body.userId},
            { $push: { thoughts: dbThoughtData } },
            { new: true }
        );
    })
    .then(dbuserData=> {
        if (!dbuserData) {
            res.status(404).json({ message: ' no user found with this id'});
            return
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));

},

//update Thought by id 
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({_id: params.id }, body, {new: true, runValidators: true })
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'no Thought found with this id'});
          return;
      }
      res.json(dbThoughtData);
  })
      .catch(err => res.status(400).json(err));
  
},

// delete Thought 
removeThought({ params}, res) {
  Thought.findOneAndDelete({_id: params.id })
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => res.json(err));
},



//add reaction 

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        {id: params.thoughtId },
        {$push: { reactions: body }},
        {new: true, runValidators: true}
    )
 .then (dbToughtData => {
     if (!dbThoughtData) {
         res.status(404).json({ message: 'no thought available with this ID'});
         return;
     }
     res.json(dbThoughtData);
 })
 .catch(err => res.json (err));
},

//remove reaction  
removeReaction({ params } , res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId },
        { $pull: { reactions: { reactionId: [params.reactionId]}}},
        {new: true}
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
}

};

module.exports = thoughtController;
