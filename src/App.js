import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Categories from "./components/categories";
import Search from "./components/SearchBook";
import { getAll, update } from "./components/BookAPI";
import AddBook from "./components/Addbook";
import SignIn from "./components/SignIn";
import LogOut from "./components/LogOut";
import LoginHeader from "./components/LoginHead";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  const updateBookShelf = (book, whereToMove) => {
    let a = true;
    const updateBook = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = whereToMove;
        a = false;
      }
      return b;
    });

    if (a) {
      book.shelf = whereToMove;
      updateBook.push(book);
    }

    setBooks(updateBook);
    update(book, whereToMove);
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginHeader />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/search">
            <Search updateBookShelf={updateBookShelf} />
          </Route>
          <Route path="/shelf">
            <div className="list-books">
              <Header />
              <LogOut />
              <div className="list-books-content">
                <Categories books={books} updateBookShelf={updateBookShelf} />
                <div className="open-search">
                  <Link to="/search">
                    <AddBook />
                  </Link>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
