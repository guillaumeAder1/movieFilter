import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import {bindActionCreators} from 'redux'
import {getDetails} from '../../modules/about'

class About extends React.Component{
    constructor(props) {
        super(props);
        
       //Here ya go
        this.props.history.listen((location, action) => {
          console.log("on route change");
          const {type, id} = this.props.match.params
          this.res = this.props.getDetails(type, id)
        });
      }
    
    render(){
        const data = Object.keys(this.props.results).map((e,i)=>{
            if(typeof this.props.results[e] !== 'object'){
                return <div key={i}><b>{e.replace('_', ' ')}:</b> {this.props.results[e].toString()}</div>
                
            }
            // let label = <b>{e.replace('_', ' ')}:</b>

        },this)
        return(
            <div>
                <h1>About this show</h1>
                <h3>{this.props.results.title || this.props.results.original_title }</h3>
                <div>{data}</div>
            </div>
        )
    } 
}

const mapStateToProps = state => ({
    results: state.about.results,
    searching: state.about.searching,
    value: state.about.value
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getDetails   
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(About))