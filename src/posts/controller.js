const db = require('../configs/sequelize');
const Post = require('./model');
const { Op } = require("sequelize");
const User = require('../users/model');

exports.create = (req, res) => {
    Post.create({
        content: req.body.content,
        user: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    }, {
        include: [{
            association: Post.User
        }]
    }).then((post) => {
        res.send(post);
    }).catch((err) => {
        console.log("Erro", + err);
    })
}

exports.findAll = (req,res) => {
    Post.findAll({include: User, order: ['createdAt']}).then(posts => {
        res.send(posts);
    });
}

exports.update = (req,res) => {
    Post.update(
        {
            content : req.body.content
        },
            {where: {
                id: req.body.id
            }
        }).then(() => {
            res.send({"message": "ok"});
        })
}

exports.remove = (req,res) => {
    Post.destroy({
        where: {
            id: req.body.id
        }
    }).then((affectedRows) => {
        res.send({'message': 'ok', 'affectedRows': affectedRows});
    })
}

exports.search = (req, res) => {
    Post.findAll({
      include: User,
      where: {
        content: db.sequelize.where(
            db.Sequelize.fn('upper', db.sequelize.col('content')),
            {
                [Op.like]: '%' + req.body.content.toUpperCase() + '%'
            }
        )
    }
  }).then(data => {
      res.send(data)
    }).catch(err => {
      console.log('Erro: ' + err)
    });
  }