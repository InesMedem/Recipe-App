import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/user.js";
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push();
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("savedRecepies/ids", async (req, res) => {
  try {
    const user = await UserModel.findyId(req.body.userID);
    res.json({ savedRecepies: user?.savedRecepies });
  } catch (err) {
    res.json(err);
  }
});

router.get("savedRecepies", async (req, res) => {
  try {
    const user = await UserModel.findyId(req.body.userID);
    const savedRecepies = await ReceipeModel.find({
      _id: { $in: user.savedRecepies },
    });

    res.json({ savedRecepies: savedRecepies });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipeRouter };
