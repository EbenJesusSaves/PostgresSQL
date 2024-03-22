const path = require("path");
const express = require("express");
const router = express.Router();

// client side static assets
router.get("/", (_, res) => res.sendFile(path.join(__dirname, "./index.html")));
router.get("/client.js", (_, res) =>
  res.sendFile(path.join(__dirname, "./client.js"))
);
router.get("/detail-client.js", (_, res) =>
  res.sendFile(path.join(__dirname, "./detail-client.js"))
);
router.get("/style.css", (_, res) =>
  res.sendFile(path.join(__dirname, "../style.css"))
);
router.get("/detail", (_, res) =>
  res.sendFile(path.join(__dirname, "./detail.html"))
);

/**
 * Student code starts here
 */

const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "recipeguru",
  password: "password",
  port: 5432,
});

router.get("/search", async function (req, res) {
  console.log("search recipes");

  // return recipe_id, title, and the first photo as url
  //
  // for recipes without photos, return url as default.jpg

  const { rows } = await pool.query(
    `SELECT DISTINCT ON (rp.photo_id) COALESCE(rp.url, 'default.jpg'), i.title, i.id AS recipe_id FROM ingredients i INNER JOIN recipes_photos rp ON i.id = rp.photo_id;`
  );

  res.status(200).json({ status: "implemented successfully", rows });
});

router.get("/get", async (req, res) => {
  const recipeId = req.query.id ? +req.query.id : 1;
  console.log("recipe get", recipeId);

  // return all ingredient rows as ingredients
  //    name the ingredient image `ingredient_image`
  //    name the ingredient type `ingredient_type`
  //    name the ingredient title `ingredient_title`
  //
  const { rows } = await pool.query(
    ` SELECT title AS recipe_title, image AS recipe_image, type AS recipe_type FROM ingredients`
  );

  //
  // return all photo rows as photos
  //    return the title, body, and url (named the same)
  //
  const photos = await pool.query(
    `SELECT r.title, r.body rp.url  FROM recipes r INNER JOIN recipes_photos rp on r.id = rp.recipe_id;`
  );

  //
  // return the title as title
  // return the body as body
  // if no row[0] has no photo, return it as default.jpg

  res
    .status(201)
    .json({ status: "not implemented", rows, Photos: photos.rows });
});
/**
 * Student code ends here
 */

module.exports = router;
