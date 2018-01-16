import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { push } from 'react-router-redux'
import {startSearch} from '../../modules/search'

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          inputValue: 'tom'
        };
    }
    updateValue(e){
        this.setState({
            inputValue: e.target.value
        });
    }
    
    sendSearch(val, e){
        e.preventDefault();
        this.props.startSearch(val)
    }
    render() {

         {/* <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form> */}
        const list = this.props.results.results || false;
        let html = list ? list.map((res,i) => {
            return <li 
                key={i} 
                onClick={() => this.props.changePage(res.id, res.media_type)}>
                    {res.name || res.original_title}
                </li>
        }) : false;

        const res = <div className="floating show"><ul>{html}</ul></div> || false
        return (
            <div>     
                <span>{this.props.detailsValue}</span>           
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
