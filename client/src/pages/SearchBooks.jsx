import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../queries';
import { REMOVE_BOOK } from '../mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { data: userData, loading, error } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      cache.modify({
        fields: {
          getMe(existingUserData = {}) {
            const newUserData = {
              ...existingUserData,
              savedBooks: existingUserData.savedBooks.filter(
                book => book.bookId !== removeBook.bookId
              ),
            };
            return newUserData;
          },
        },
      });
    },
  });

  const handleDeleteBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await removeBook({ variables: { bookId } });
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    return <p>Error! {error.message}</p>;
  }

  if (!userData?.getMe?.savedBooks.length) {
    return <h2>You have no saved books!</h2>;
  }

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <h1>Viewing saved books!</h1>
      </Container>
      <Container>
        <h2 className='pt-5'>
          Viewing {userData.getMe.savedBooks.length} saved 
          {userData.getMe.savedBooks.length === 1 ? ' book:' : ' books:'}
        </h2>
        <Row>
          {userData.getMe.savedBooks.map((book) => (
            <Col md="4" key={book.bookId}>
              <Card border='dark'>
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
