import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    getMovie
} from '../../modules/profile'

class Profile extends React.Component {
    render() {
        return (
            <div>
                <h1>Profile Page</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Profile)

export default Profile