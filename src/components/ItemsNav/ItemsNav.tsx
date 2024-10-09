import './ItemsNav.css'
import ItemNav from '../ItemNav/ItemNav'

interface Item {
    icon: string;
    para: string;
    link?: string;
}

interface ItemsNavProps {
    items: Array<Item>;
}
export default function ItemsNav({ items }: ItemsNavProps) {
    return (
        <div>
            {items.map((item, index) => (
                <ItemNav key={index} image={item.icon} para={item.para} link={item.link}/>
            ))}
        </div>
    )
}
