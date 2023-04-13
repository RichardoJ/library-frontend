import { NavLink } from 'react-router-dom';
import classes from './PaperNavigation.module.css'

function PaperNavigation(){
    return(
        <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/paper"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Papers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/paper/publish"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Publish Papers
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    );
}

export default PaperNavigation