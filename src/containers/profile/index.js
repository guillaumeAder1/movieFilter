import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getMovie,
    getSearch,
    stopSearch,
    getToken,
    getSession
} from '../../modules/profile'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class Profile extends React.Component {
   
    componentWillMount(){
        if(this.props.match.params[0] !== "approved"){
        } else {
            const urlParams = new URLSearchParams(this.props.location.search);
            const auth = urlParams.get('request_token');
            this.props.getSession(auth)
        }
    }
    login (){
        this.props.getToken();
    }
    render() {      
        const list =  (this.props.results.length > 0 ) ? this.props.results : false ;
        let html;
        if(list){
            html = list.map((item, i) => {
                return <p key={i}>{item.title}</p>
            });
        }
        const session = (this.props.sessionid) ? this.props.sessionid.session_id : false;
       
        return (
            <div className='jumbotron'>
                <h3>Profile Page</h3>               

                {(session) ? <div><span>Identified   </span><Glyphicon glyph="ok"/></div> : <button type="button" className="btn btn-secondary" onClick={() => this.login()} >Login</button> }

                {this.props.search }

                {/* <nav className='nav nav-underline'> */}
                <button type="button" className="btn btn-light" onClick={() => this.props.getSearch()} >Already Watched</button>
                <button type="button" className="btn btn-light" onClick={() => this.props.stopSearch()} >Stop</button>
                <button type="button" className="btn btn-light" onClick={() => this.props.getMovie()} >Query</button>               
                       
                {/* </nav>         */}
                {html}               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    results: state.profile.results,
    search: state.profile.search,
    isFetching: state.profile.isFetching,
    token: state.profile.token,
    sessionid: state.profile.sessionid
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getMovie,
    getSearch,
    stopSearch,
    getToken,
    getSession
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

