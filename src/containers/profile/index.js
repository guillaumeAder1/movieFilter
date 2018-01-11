import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getMovie,
    getSearch,
    stopSearch
} from '../../modules/profile'

class Profile extends React.Component {
    // constructor(){
    //     super()
    // }
    render() {      
        const list =  (this.props.results.length > 0 ) ? this.props.results : false ;
        let html;
        if(list){
            html = list.map((item, i) => {
                return <p key={i}>{item.title}</p>
            });
        }
       
        return (
            <div>
                <h1>Profile Page</h1>
                {this.props.search}
                <button onClick={() => this.props.getSearch()} >Search</button>
                <button onClick={() => this.props.stopSearch()} >Stop</button>
                <button onClick={() => this.props.getMovie()} >Query</button>               
                {html}               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    results: state.profile.results,
    search: state.profile.search
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getMovie,
    getSearch,
    stopSearch
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

// export default Profile