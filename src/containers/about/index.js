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
    extractData(data){
        let html = Object.keys(data).map((e,i)=>{
            if(typeof data[e] !== 'object' && !Array.isArray(data)){
                return <div key={i}><b>{e.replace(/_/g, ' ')}:</b> {data[e].toString()}</div>                
            } else if(typeof data[e] === 'object' || typeof data[e] === 'array' ) {
                if(data[e] !== null){                   
                    return <div key={i} className='space'><b>{e.replace(/_/g, ' ')}:</b>{this.extractData(data[e])}</div>
                }
            }  
        },this);
     
        return html;
    }
    
    render(){
        // const data = (this.props.match.params) ? this.extractData(this.props.results) : this.extractData(this.props.results);
        const data = this.extractData(this.props.results)

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