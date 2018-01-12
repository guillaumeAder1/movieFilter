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
        const session = (this.props.sessionid) ? this.props.sessionid.session_id : "no seesion";
       
        return (
            <div>
                <h1>Profile Page</h1>
                
                {this.props.search}
                {session}
                <button onClick={() => this.props.getSearch()} >Search</button>
                <button onClick={() => this.props.stopSearch()} >Stop</button>
                <button onClick={() => this.props.getMovie()} >Query</button>               
                <button onClick={() => this.login()} >Login</button>               
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

