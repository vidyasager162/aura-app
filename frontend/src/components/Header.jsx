import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h1 className="navbar-brand">Library</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button type="button" className="btn btn-transparent">
                Home
              </button>
            </li>
            <li class="nav-item">
              <button type="button" className="btn btn-transparent">
                Books
              </button>
            </li>
            <li class="nav-item">
              <button type="button" className="btn btn-transparent">
                Authors
              </button>
            </li>
            <li class="nav-item">
              <button type="button" className="btn btn-transparent">
                Publishers
              </button>
            </li>
            <li class="nav-item">
              <button type="button" className="btn btn-transparent">
                Genres
              </button>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
