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
    
    sendSearch(val){
        this.props.startSearch(val)
    }
    render() {
        const list = this.props.results.results || false;
        let html = list ? list.map((res,i) => {
            return <li 
                key={i} 
                onClick={() => this.props.changePage(res.id, res.media_type)}>
                    {res.name || res.original_title}
                </li>
        }) : false
        return (
            <div>
                <h2>Selected from about: {this.props.detailsValue}</h2>
                <input id="search-movies"  type="text" value={this.state.inputValue} onChange={e => this.updateValue(e)}/>
                <button onClick={e => this.sendSearch(this.state.inputValue)}>Ok</button>
                <ul>{html}</ul>
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
