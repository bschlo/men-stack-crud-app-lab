import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import methodOverride from "method-override";


dotenv.config();

import "./db/connection.js";
import Recipe from "./models/recipe.js"

const app = express();

app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

app.get("/recipes/new", async (req, res) => {
    res.render("recipes/new.ejs");
  });

app.get("/recipes", async (req, res) => {
    const allRecipes = await Recipe.find()
    res.render("recipes/index.ejs", { recipes: allRecipes})
})

app.get("/recipes/:recipeId", async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    res.render("recipes/show.ejs", { recipe: foundRecipe})
})

app.get("/recipes/:recipeId/edit", async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId)
    res.render("recipes/edit.ejs", { recipe: foundRecipe})
})

app.post("/recipes", async (req, res) => {
    await Recipe.create(req.body)
    res.redirect("/recipes/new")
})

app.put("/recipes/:recipeId", async (req, res) => {
    const id = req.params.recipeId
    const updateData = req.body
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData)
    res.redirect("/recipes")
})

app.delete("/recipes/:recipeId", async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId)
    res.redirect("/recipes")
})


app.listen(3000, () => {
    console.log("Listening on 3000...");
  });
  