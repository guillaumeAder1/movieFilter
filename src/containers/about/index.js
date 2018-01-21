import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import {bindActionCreators} from 'redux'
import {getDetails} from '../../modules/about'

class About extends React.Component{
    constructor(props) {
        super(props);
        
       //Here ya go
        // this.props.history.listen((location, action) => {
        //   console.log("on route change");
        //   const {type, id} = this.props.match.params
        //   this.res = this.props.getDetails(type, id)
        // });
      }
    extractData(data, recursively){
        /**
         * get data recursively
         */
        let html;
        if(recursively){
            html = Object.keys(data).map((e,i)=>{
                if(typeof data[e] !== 'object' && !Array.isArray(data)){
                    return <div key={i}><b>{e.replace(/_/g, ' ')}:</b> {data[e].toString()}</div>                
                } else if(typeof data[e] === 'object' || typeof data[e] === 'array' ) {
                    if(data[e] !== null){                   
                        return <div key={i} className='space'><b>{e.replace(/_/g, ' ')}:</b>{this.extractData(data[e])}</div>
                    }
                }  
            },this);
        } else {
            const isImg = data.poster_path || data.backdrop_path;
            const img = `https://image.tmdb.org/t/p/original/${isImg}`;
            html = <div>
                <h4>{data.title || data.original_title || data.name || data.original_name}</h4>
                <div className='row' >                
                {isImg ? <div className='col-sm-2'><img src={img} width='150px' /></div>  : false}       
                 <div className='col-sm-10'> 
                <h5>{data.release_date ? data.release_date.slice(0,4) : false}</h5>
                <p><em>{data.tagline}</em></p>
                <p>{data.overview}</p>           
                <span className='imdb-vote'>{data.vote_average}</span>
                </div> 
                </div>    
            </div>
            
        }     
        return html;
    }

    initData(){
        const d = (this.props.results) ? this.extractData(this.props.results, false) : false;
        if(d){return d}
        const url = (this.props.match.params && !d) ? this.props.getDetails(this.props.match.params.type, this.props.match.params.id) : false;
        if(url) {return url} else {return false}
    }
    
    render(){
        const data = this.initData();

        return(
            <div className='container'>                 
                <div className='jumbotron'>
                    <h3>
                        {/* {this.props.results.name || this.props.results.original_name } */}
                    </h3>
                    {data}
                </div>
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