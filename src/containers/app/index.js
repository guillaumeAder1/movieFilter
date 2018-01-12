import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Profile from '../profile'

const App = () => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/about-us">About</Link>
            <Link to="/my-profile"> My Profile</Link>
        </header>

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about-us" component={About} />
            <Route path="/my-profile/*" component={Profile} />
        </main>
    </div>
)

export default App