import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { push } from 'react-router-redux'
import {startSearch} from '../../modules/search'

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          inputValue: 'tom',
          cssClass:'floating show'
        };
    }
    updateValue(e){
        this.setState({
            inputValue: e.target.value
        });
    }

    select(id, media_type){
        this.props.changePage(id, media_type);
        this.setState({
            cssClass: 'floating'
        });
    }
    
    sendSearch(val, e){
        e.preventDefault();
        this.props.startSearch(val)       
        this.setState({
            cssClass: 'floating show'
        });
        
    }
    render() {

        
        const list = this.props.results.results || false;
        const html = list ? list.map((res,i) => {
            return <li className='item-search'
                key={i} 
                onClick={() => this.select(res.id, res.media_type)}>
                    <span>{res.name || res.original_title}</span>                    
                    <span>{(res.release_date) ? res.release_date.slice(0,4) : false}</span>
                    <span>{res.media_type}</span>
                    <span>{res.vote_average}</span>
                </li>
        }) : false;
        const res = <div className={this.state.cssClass}><ul>{html}</ul></div> || false;

        return (
            <div>                   
                <form className="form-inline mt-2 mt-md-0">
                    <input id="search-movies" className="form-control mr-sm-2"  type="text" value={this.state.inputValue} onChange={e => this.updateValue(e)}/>
                    <button className="btn btn-outline-success my-2 my-sm-0"  onClick={e => this.sendSearch(this.state.inputValue, e)}>Ok</button>
                </form>                
                {res}
            </div>
        );
    }
}



const mapStateToProps = state => ({
    results: state.search.results,
    searching: state.search.searching,
    value: state.search.value,
    detailsValue: state.about.value
})

const mapDispatchToProps = dispatch => bindActionCreators({
   startSearch,
   changePage: (e,t) => push(`/about-us/${e}/${t}`)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)
