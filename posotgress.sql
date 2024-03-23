CREATE TABLE student (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    username VARCHAR(244) NOT NULL, 
    first_name VARCHAR(255) NOT NULL, 

)

-- creating a foreign key in order to link tables 
CREATE TABLE books (
    book_name VARCHAR(255) NOT NULL,
    comment TEXT, 
    book_id INT REFERENCES student(id) ON DELETE CASCADE
)



--//--------------------------------- JSONB -----------------------------//

SELECT meta -> 'tags' -> 0 recipes
-- this will get all the list of the first column for you 

SELECT recipe_id, title, meta -> 'tags' FROM recipes WHERE meta -> 'tags' ? 'cake'