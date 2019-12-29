export default abstract class Component {
}

export type ComponentType<T extends Component> = { new(): T }
