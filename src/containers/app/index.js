import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Profile from '../profile'
import Search from '../search'

const App = () => (
    <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <span className="navbar-brand" href="">Top navbar</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <div className="nav-link" ><Link to="/">Home</Link> <span className="sr-only">(current)</span></div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" ><Link to="/about-us">About</Link> </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" ><Link to="/my-profile/"> My Profile</Link></div>
                </li>
                </ul>
                <Search/>               
            </div>
            </nav>
        {/* <header> */}
            {/* <Link to="/">Home</Link> */}
            {/* <Link to="/about-us">About</Link> */}
            {/* <Link to="/my-profile/"> My Profile</Link> */}
            {/* <Search/> */}
        {/* </header> */}

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/about-us/:id/:type" component={About} />
            <Route path="/my-profile/*" component={Profile} />
        </main>
    </div>
)

export default App