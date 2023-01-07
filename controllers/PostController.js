import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    console.log(PostModel);
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed to get all posts',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: 'Failed to get a post',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Article dont existe',
          });
        }

        res.json(doc);
      },
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed to get all posts',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Cant Create Article',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: 'Failed remove a post',
          });
        }

        if (!doc) {
          console.log(err);
          res.status(404).json({
            message: 'Failed to get a post',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed to get all posts',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },

      (err, doc) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: 'Failed remove a post',
          });
        }

        if (!doc) {
          console.log(err);
          res.status(404).json({
            message: 'Failed to get a post',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed to update post',
    });
  }
};
