/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

export default function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2 py-10">
      {menu.map(function (pizza) {
        return <MenuItem key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
