// assets
import { LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import MenuItems from '../models/menuItems';

// icons
const icons = {
    LineChartOutlined,
    PieChartOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages: MenuItems = {
    id: 'year',
    title: 'Year Highlights',
    type: 'group',
    children: [
        {
            id: 'year21',
            title: '2021',
            type: 'item',
            url: '/2021',
            icon: icons.LineChartOutlined,
            target: false,
        },
        {
            id: 'year22',
            title: '2022',
            type: 'item',
            url: '/2022',
            icon: icons.PieChartOutlined,
            target: false,
        },
    ],
};

export default pages;
