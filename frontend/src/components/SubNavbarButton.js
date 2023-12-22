import './components_css/SubNavbar.css'

function SubNavbarButton(props) {
    return (
        <button class="subnavbarbutton" onClick={props.handleClick}>{props.label}</button>
    );
}

export default SubNavbarButton