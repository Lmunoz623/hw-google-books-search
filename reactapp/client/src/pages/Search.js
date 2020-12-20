import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})


  function handleSearch(event) {
    event.preventDefault();
    API.search(formObject.title)
      .then(res => setBooks(res.data.items))
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event, book) {
    event.preventDefault();
    API.saveBook({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.small,
      link: book.volumeInfo.infoLink
    })
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Enter Book Title</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleSearch}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results Found from Search</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                    <Card
                    key={book.id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    link={book.volumeInfo.infoLink}
                    save={(e) => handleFormSubmit(e, book)}
                    icon= "save"
                    />
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
