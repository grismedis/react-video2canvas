import { connect } from 'react-redux'
import Kanvas from '../components/Kanvas';


const mapStateToProps = state => ({
  videoEl: state.player.videoEl,
  canvasEl: state.player.canvasEl,
})

const KanvasContainer = connect (null, null)(Kanvas)

export default KanvasContainer
