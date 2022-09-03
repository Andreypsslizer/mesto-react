import logo from '../Vector.svg'

function Header() {
    return(
      <header className="header">
        <img alt="" className="header__logo" src={logo} />
      </header>
    );
}

export default Header