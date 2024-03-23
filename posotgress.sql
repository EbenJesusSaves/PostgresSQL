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

