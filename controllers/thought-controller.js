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
  Thought.findOne({ _id: params.id })
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
    .then(dbThoughtData => res.json(dbThoughtData))
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
DeleteThought({ params}, res) {
  Pizza.findOneAndDelete({_id: params.id })
  .then(dbPizzaData => res.json(dbPizzaData))
  .catch(err => res.json(err));
}

//add friend 
//remove friend 

};






module.exports = thoughtController;
