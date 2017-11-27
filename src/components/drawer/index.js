import {
    Component
} from 'react';
import renderer from './renderer'


export default class AppDrawer extends Component {
    render() {
        return renderer.call(this)
    }
}