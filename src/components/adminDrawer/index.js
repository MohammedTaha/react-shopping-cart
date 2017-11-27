import {
    Component
} from 'react';
import renderer from './renderer'


export default class AdminDrawer extends Component {
    render() {
        return renderer.call(this)
    }
}