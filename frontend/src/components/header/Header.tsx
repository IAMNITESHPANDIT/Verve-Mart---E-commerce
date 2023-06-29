import "./header.style.scss"; // Import the SCSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Your Logo</div>
      <nav className="navigation">
        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
